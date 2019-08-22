//
//  API.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/19/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

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

  static func getGuid(
    from page: SFSafariPage,
    completion: @escaping (Result<String, RequestError>) -> Void
    ) -> Void {

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": "70018-b83d4728573df682a7c50b3d",
      "abt": "1"
    ]

    let requestInfo: [String : Any] = [
      "url" : "https://getpocket.com/v3/guid/",
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

  static func validateAuthCode(
    from page: SFSafariPage,
    userInfo: [String : Any]?,
    completion: @escaping (Result<String, RequestError>) -> Void
    ) -> Void {

    // Check that tokens were properly returned
    guard let userId = userInfo!["userId"] as? String, let token = userInfo!["token"] as? String  else {
      NSLog("Auth Tokens Missing: \(String(describing: userInfo))")
      return
    }

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


      let requestInfo: [String : Any] = [
        "url" : "https://getpocket.com/v3/oauth/authorize.php",
        "method" : "POST",
        "parameters" : requestData
      ];

      //
      NSLog("Request Auth: (\(String(describing: requestInfo)))")
      Utilities.request(from: page, userInfo: requestInfo) { result in
        switch result {

        case .failure(_):
          NSLog("Auth Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.auth))
          return

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

  static func saveToPocket(
    from page: SFSafariPage,
    url: String,
    access_token: String,
    completion: @escaping (Result<Any, RequestError>) -> Void
    ) -> Void {


    // Build Action
    let saveAction: [String : Any] = [
      "action": "add",
      "url": url
    ]

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": "70018-b83d4728573df682a7c50b3d",
      "access_token": access_token,
      "actions": [saveAction]
    ]


    let requestInfo: [String : Any] = [
      "url" : "https://getpocket.com/v3/send/",
      "method" : "POST",
      "parameters" : requestData
    ];

    Utilities.request(from: page, userInfo: requestInfo) { result in
      switch result {

      case .failure(let error):
        NSLog("Save Failed: (\(String(describing: requestInfo)))")
        completion(.failure(error))
        return

      case .success(let data):
        guard let saveJSON = try? JSONDecoder().decode(AddResponse.self, from: data) else {
          NSLog("Save Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.json))
          return
        }

        completion(.success(saveJSON))

      }
    }

    // Make call to save item to Pocket
    NSLog("""
      Attempt to save (\(String(describing: url)))
      with access_token: (\(String(describing: access_token)))
      """)


  }

  static func removeItem(){}

  static func archiveItem(){}

  static func getOnSaveTags(){}

  static func syncItemTags(){}

  static func fetchStoredTags(){}

}

