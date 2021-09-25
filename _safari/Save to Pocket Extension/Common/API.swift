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

  static var CONSUMER_KEY: String {
    return Bundle.main.object(forInfoDictionaryKey: "consumerKey") as! String
  }

  static func getGuid(
    from page: SFSafariPage,
    completion: @escaping (Result<String, RequestError>) -> Void
    ) -> Void {

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": CONSUMER_KEY,
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
        "consumer_key": CONSUMER_KEY,
        "guid": guid!,
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
          NSLog("Auth Success: (\(String(describing: authJSON)))")
          let defaults = UserDefaults.standard

          defaults.set(authJSON.access_token, forKey: "access_token")
          defaults.set(authJSON.account?.premium_status, forKey: "premium_status")

          completion(.success(authJSON.access_token))

        }
      }
    }
  }

  static func saveToPocket(
    from page: SFSafariPage,
    url: String,
    access_token: String,
    premium_status: String,
    ui_context: String,
    completion: @escaping (Result<Any, RequestError>) -> Void
    ) -> Void {


    // Build Action
    let saveAction: [String : Any] = [
      "action": "add",
      "url": url,
      "cxt_ui": ui_context,
      "cxt_view": "ext_popover",
      "cxt_premium_status": premium_status
    ]

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": CONSUMER_KEY,
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

        guard let actionResults = try? JSONDecoder().decode(ActionResults.self, from: data) else {
          completion(.failure(.json))
          return
        }

        let item_id = actionResults.action_results![0].item_id!
        NSLog("Save Success (Item ID): (\(String(describing: item_id)))")
        completion(.success(item_id))
      }
    }
  }

  static func removeItem(
    from page: SFSafariPage,
    item_id: String,
    access_token: String,
    premium_status: String,
    completion: @escaping (Result<Any, RequestError>) -> Void
    ) -> Void {

    // Build Action
    let removeAction: [String : Any] = [
      "action": "delete",
      "item_id": item_id,
      "cxt_ui": "toolbar",
      "cxt_view": "ext_popover",
      "cxt_premium_status": premium_status
    ]

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": CONSUMER_KEY,
      "access_token": access_token,
      "actions": [removeAction]
    ]


    let requestInfo: [String : Any] = [
      "url" : "https://getpocket.com/v3/send/",
      "method" : "POST",
      "parameters" : requestData
    ];

    Utilities.request(from: page, userInfo: requestInfo) { result in
      switch result {

      case .failure(let error):
        NSLog("Remove Failed: (\(String(describing: requestInfo)))")
        completion(.failure(error))
        return

      case .success(let data):
        guard let removeJSON = try? JSONSerialization.jsonObject(with: data) else {
          NSLog("Remove Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.json))
          return
        }

        completion(.success(removeJSON))

      }
    }
  }

  static func archiveItem(
    from page: SFSafariPage,
    item_id: String,
    access_token: String,
    premium_status: String,
    completion: @escaping (Result<Any, RequestError>) -> Void
    ) -> Void {

    // Build Action
    let archiveAction: [String : Any] = [
      "action": "archive",
      "item_id": item_id,
      "cxt_ui": "toolbar",
      "cxt_view": "ext_popover",
      "cxt_premium_status": premium_status
    ]

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": CONSUMER_KEY,
      "access_token": access_token,
      "actions": [archiveAction]
    ]


    let requestInfo: [String : Any] = [
      "url" : "https://getpocket.com/v3/send/",
      "method" : "POST",
      "parameters" : requestData
    ];

    Utilities.request(from: page, userInfo: requestInfo) { result in
      switch result {

      case .failure(let error):
        NSLog("Archive Failed: (\(String(describing: requestInfo)))")
        completion(.failure(error))
        return

      case .success(let data):
        guard let archiveJSON = try? JSONSerialization.jsonObject(with: data) else {
          NSLog("Archive Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.json))
          return
        }

        completion(.success(archiveJSON))

      }
    }
  }

  static func getStoredTags(
    from page: SFSafariPage,
    since: Int,
    access_token: String,
    completion: @escaping (Result<Any, RequestError>) -> Void
    ) -> Void {

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": CONSUMER_KEY,
      "access_token": access_token,
      "since": since,
      "forcetaglist": 1,
      "taglist": 1
    ]

    let requestInfo: [String : Any] = [
      "url" : "https://getpocket.com/v3/get/",
      "method" : "POST",
      "parameters" : requestData
    ];

    Utilities.request(from: page, userInfo: requestInfo) { result in
      switch result {

      case .failure(let error):
        NSLog("Stored Tags Failed: (\(String(describing: requestInfo)))")
        completion(.failure(error))
        return

      case .success(let data):

        guard let storedTagDecoded = try? JSONDecoder().decode(StoredTags.self, from: data) else {
          NSLog("Decode Stored Tags Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.json))
          return
        }
      
        // Save since value
        let defaults = UserDefaults.standard
        defaults.set(storedTagDecoded.since, forKey: "tags_fetched_timestamp")

        guard let storedTagJson = try? JSONSerialization.jsonObject(with: data) else {
          NSLog("Stored Tags Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.json))
          return
        }

        completion(.success(storedTagJson))

      }
    }
    
  }
  
  static func getOnSaveTags(
    from page: SFSafariPage,
    saved_url: String,
    access_token: String,
    completion: @escaping (Result<Any, RequestError>) -> Void
    ) -> Void {

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": CONSUMER_KEY,
      "access_token": access_token,
      "url": saved_url
    ]

    let requestInfo: [String : Any] = [
      "url" : "https://getpocket.com/v3/suggested_tags/",
      "method" : "POST",
      "parameters" : requestData
    ];

    Utilities.request(from: page, userInfo: requestInfo) { result in
      switch result {

      case .failure(let error):
        NSLog("On Save Tags Failed: (\(String(describing: requestInfo)))")
        completion(.failure(error))
        return

      case .success(let data):
        guard let onSaveTagsJson = try? JSONSerialization.jsonObject(with: data) else {
          NSLog("On Save Tags Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.json))
          return
        }

        completion(.success(onSaveTagsJson))

      }
    }
  }

  static func syncItemTags(
    from page: SFSafariPage,
    item_id: String,
    tags: Array<Any>,
    suggestedCount: Int,
    usedSuggestedCount: Int,
    access_token: String,
    premium_status: String,
    completion: @escaping (Result<Any, RequestError>) -> Void
    ) -> Void {

    // Build Action
    let addTagsAction: [String : Any] = [
      "action": "tags_add",
      "item_id": item_id,
      "tags": tags,
      "cxt_ui": "toolbar",
      "cxt_view": "ext_popover",
      "cxt_premium_status": premium_status,
      "cxt_remove_cnt": 0,
      "cxt_enter_cnt": tags.count,
      "cxt_suggested_available": suggestedCount,
      "cxt_suggested_cnt": usedSuggestedCount
    ]

    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": CONSUMER_KEY,
      "access_token": access_token,
      "actions": [addTagsAction]
    ]


    let requestInfo: [String : Any] = [
      "url" : "https://getpocket.com/v3/send/",
      "method" : "POST",
      "parameters" : requestData
    ];

    NSLog("Request Add Tags: (\(String(describing: requestInfo)))")

    Utilities.request(from: page, userInfo: requestInfo) { result in
      switch result {

      case .failure(let error):
        NSLog("Add Tags Failed: (\(String(describing: requestInfo)))")
        completion(.failure(error))
        return

      case .success(let data):
        guard let addTagsJson = try? JSONSerialization.jsonObject(with: data) else {
          NSLog("Add Tags Failed: (\(String(describing: requestInfo)))")
          completion(.failure(.json))
          return
        }

        completion(.success(addTagsJson))

      }
    }
  }

  static func fetchStoredTags(){}

}

