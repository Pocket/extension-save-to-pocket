//
//  API.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/19/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

// ✅ SUPPORT THESE FOR MVP
// ---------------------------------------
// authorize
// getGuid

// saveToPocket
// getOnSaveTags

// syncItemTags
// fetchStoredTags

// archiveItem
// removeItem

// sendAnalytics

// 🙈 FAST FOLLOW WITH THESE
// ---------------------------------------
// getFeatures

// getRecommendations
// saveRecToPocket
// openRecommendation

// sendSurvey
// sendSurveyAnalytics

import SafariServices

class SaveToPocketAPI: SafariExtensionHandler{
  
  static func getGuid(from page: SFSafariPage, completion: @escaping (Result<String, RequestError>) -> Void) -> Void {
    // Get authorized from server
    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": "70018-b83d4728573df682a7c50b3d",
      "abt": "1"
    ]
    
    let requestInfo: [String : Any] = ["url" : "https://getpocket.com/v3/guid/",
                                       "method" : "GET",
                                       "parameters" : requestData
    ];
    
    NSLog("Request Guid: (\(String(describing: requestInfo)))")
    Utilities.request(from: page, userInfo: requestInfo) { result in
      switch result {
      case .success(let data):
        guard let guidJSON = try? JSONDecoder().decode(GuidResponse.self, from: data) else {
          completion(.failure(.json))
          return
        }
        completion(.success(guidJSON.guid))
      case .failure(let error):
        NSLog("Request Failed: (\(String(describing: requestInfo)))")
        completion(.failure(error))
      }
    }
  }
  
  static func validateAuthCode(from page: SFSafariPage, userInfo: [String : Any]?, completion: @escaping (Result<String, RequestError>) -> Void) -> Void {
    
    // Since we got the Auth Code from the passed in page, we close that page
    Utilities.closeTab(from: page, userInfo: userInfo)
    
    guard let userId = userInfo!["userId"] as? String, let token = userInfo!["token"] as? String  else {
      NSLog("Auth Tokens Missing: \(String(describing: userInfo))")
      return
    }
    NSLog("User ID: (\(String(describing: userId))) - Token: (\(String(describing: token))")
    
    // Create a serial queue.
    let queue = DispatchQueue(label: "API.validateAuthCode")
    
    // Run all requests within queue.
    queue.async {
      
      var guid: String? = nil
      var error: RequestError = .undefined
      
      let waitOnGuid = DispatchSemaphore(value: 0)
      
      getGuid(from: page) { result in
        switch result {
        case .failure(let e):
          error = e
        case .success(let g):
          guid = g
          NSLog("GUID: \(String(describing: guid))")
          // Signal semaphore to unblock this queue.
          waitOnGuid.signal()
        }
      }
      
      // We can block this queue without affecting the main thread.
      _ = waitOnGuid.wait(timeout: .distantFuture)
      
      guard guid != nil else {
        completion(.failure(error))
        return
      }
      
      // Get authorized from server
      // Build request data dictionary
      let requestData: [String : Any] = [
        "consumer_key": "70018-b83d4728573df682a7c50b3d",
        "guid": guid as Any,
        "token": token,
        "user_id" : userId,
        "account": "1",
        "grant_type": "extension"
      ]
      
      
      let requestInfo: [String : Any] = ["url" : "https://getpocket.com/v3/oauth/authorize.php",
                                         "method" : "POST",
                                         "parameters" : requestData
      ];
      
      NSLog("Auth Request: (\(String(describing: requestInfo)))")
      Utilities.request(from: page, userInfo: requestInfo) { result in
        switch result {
        case .failure(_):
          NSLog("Auth Failed: (\(String(describing: requestInfo)))")
        case .success(let data):
          guard let authJSON = try? JSONDecoder().decode(AuthResponse.self, from: data) else {
            NSLog("Auth Failed: (\(String(describing: requestInfo)))")
            completion(.failure(.auth))
            return
          }
          // Store Account data
          let defaults = UserDefaults.standard
          defaults.set(authJSON.access_token, forKey: "access_token")
          completion(.success(authJSON.access_token))
        }
      }
    }
  }
}
