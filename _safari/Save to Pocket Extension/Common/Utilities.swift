//
//  SaveToPocketUtilities.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/17/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

class Utilities {
  
  static let queue: DispatchQueue = {
    DispatchQueue(label: "Utilities.Queue", qos: .background)
  }()
  
  class func closeTab(from page: SFSafariPage, userInfo: [String : Any]?) {
    page.getContainingTab { (tab) in
      tab.close()
    }
  }
  
  class func openBackgroundTab(from page: SFSafariPage, userInfo: [String : Any]?) {
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
  
  class func request(from page: SFSafariPage, userInfo: [String : Any]?, completion: @escaping (Result<Data, RequestError>) -> Void) -> Void {
    
    guard let uri: String = userInfo?["url"] as? String, let url = URL(string: uri) else {
      completion(.failure(.url))
      return
    }
    
    // Use a dedicated serial queue for executing requests.
    // This queue will run on a background thread.
        
    queue.async {
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
        
        // Make the request and capure the response
        _ = URLSession.shared.dataTask(with: urlRequest){ data, response, error in
          // Once we get the response, check that it's valid?
          if let restResponse = response as? HTTPURLResponse, restResponse.statusCode > 300 {
            completion(.failure(.statusCode))
          }
          guard let responseData = data else {
            completion(.failure(.error))
            return
          }
          // Excellent—Pass on the data
          let string = String(data: responseData, encoding: String.Encoding.utf8)
          NSLog("Auth Success (string): (\(String(describing: string!)))")
          completion(.success(responseData))
        }.resume()
      }
    }
}
