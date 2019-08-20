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

  static func getGuid(from page: SFSafariPage) -> String {
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
    do{
      let data = try Utilities.request(from: page, userInfo: requestInfo)
      let guidJSON = try JSONDecoder().decode(GuidResponse.self, from: data!)
      return guidJSON.guid
    } catch {
      NSLog("Request Failed: (\(String(describing: requestInfo)))")
      return "This is not my guid"
    }
  }

  static func validateAuthCode(from page: SFSafariPage, userInfo: [String : Any]?) -> Void {

    // Since we got the Auth Code from the passed in page, we close that page
    Utilities.closeTab(from: page, userInfo: userInfo)

    guard let userId = userInfo!["userId"] as? String, let token = userInfo!["token"] as? String  else {
      NSLog("Auth Tokens Missing: \(String(describing: userInfo))")
      return
    }
    NSLog("User ID: (\(String(describing: userId))) - Token: (\(String(describing: token))")

    let guid = self.getGuid(from: page)
    NSLog("GUID: \(String(describing: guid))")

    // Get authorized from server
    // Build request data dictionary
    let requestData: [String : Any] = [
      "consumer_key": "70018-b83d4728573df682a7c50b3d",
      "guid": guid,
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
    do{
      guard let data = try Utilities.request(from: page, userInfo: requestInfo) else {
        throw RequestErrors.auth
      }

      let authJSON = try JSONDecoder().decode(AuthResponse.self, from: data)

      // Store Account data
      let defaults = UserDefaults.standard
      defaults.set(authJSON.access_token, forKey: "access_token")

    } catch {
      NSLog("Auth Failed: (\(String(describing: requestInfo)))")
    }
  }

}
