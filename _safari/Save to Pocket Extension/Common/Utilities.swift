//
//  SaveToPocketUtilities.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/17/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

class Utilities: SafariExtensionHandler {
  
  static func closeTab(from page: SFSafariPage, userInfo: [String : Any]?) {
    page.getContainingTab { (tab) in
      tab.close()
    }
  }
  
  static func openBackgroundTab(from page: SFSafariPage, userInfo: [String : Any]?) {
    guard let uri: String = userInfo?["url"] as? String, let url = URL(string: uri) else {
      NSLog("Invalid URI: \(String(describing: userInfo))")
      return
    }
    page.getContainingTab { (tab) in
      tab.getContainingWindow(completionHandler: { (window) in
        window?.openTab(with: url, makeActiveIfPossible: true, completionHandler: { (tab) in
          if tab != nil {
            NSLog("opened tab")
          }
        })
      })
    }
  }

  static func request(from page: SFSafariPage, userInfo: [String : Any]?) throws -> Data? {
    guard let uri: String = userInfo?["url"] as? String, let url = URL(string: uri) else {
      throw RequestErrors.url
    }
    
    // Semaphor gives us the ability to emulate async/await
    let semaphore = DispatchSemaphore(value: 0)
    
    // Construct the URLRequest
    var urlRequest = URLRequest(url: url)
    urlRequest.httpMethod = "POST"
    
    // Add request parameters
    if let parameters = userInfo?["parameters"] as? [ String : Any],
      JSONSerialization.isValidJSONObject(parameters),
      let jsonData = try? JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted) {
      urlRequest.httpBody = jsonData
      urlRequest.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
      urlRequest.setValue("application/json", forHTTPHeaderField: "X-Accept")
    }
    
    // Variables to hold response
    var data: Data?
    var response: URLResponse?
    var error: Error?
    
    // Make the request and capure the response
    _ = URLSession.shared.dataTask(with: urlRequest){ rData, rResponse, rError in
      data = rData
      response = rResponse
      error = rError
      semaphore.signal()
      }.resume()
    
    // Pause execution until we get the signal from the semaphore
    _ = semaphore.wait(timeout: .distantFuture)
    
    // Once we get the response, check that it's valid?
    if let restResponse = response as? HTTPURLResponse, restResponse.statusCode > 300 {
      throw RequestErrors.statusCode
    }
    
    // Are there any errors?
    if error != nil {
      throw RequestErrors.error
    }
    
    // Excellent—Pass on the data
    let string = String(data: data!, encoding: String.Encoding.utf8)
    NSLog("Auth Success (string): (\(String(describing: string!)))")
    return data
  }
}
