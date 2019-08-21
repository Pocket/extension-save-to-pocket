//
//  Actions.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/20/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

class Actions {

  static func logIn(from page: SFSafariPage){

    Utilities.openBackgroundTab(
      from: page,
      userInfo: ["url" : "https://getpocket.com/signup?src=extension&route=/extension_login_success"]
    )

  }

  static func logOut(from page: SFSafariPage) {

    let defaults = UserDefaults.standard
    defaults.removeObject(forKey: "access_token")

  }

  static func auth(from page: SFSafariPage, userInfo: [String : Any]?){

    // Since we got the Auth Code from the passed in page, we close that page
    Utilities.closeTab(from: page, userInfo: userInfo)

    // Make an API call to validate the extension
    SaveToPocketAPI.validateAuthCode(from: page, userInfo: userInfo) { result in

      switch result {

        case .success(let access_token):
          NSLog("Validated auth code: \(access_token)")

          SFSafariApplication.getActiveWindow { (window) in
            window?.getActiveTab { (tab) in
              tab?.getActivePage(completionHandler: { (page) in
                self.savePage(from: page!, access_token: access_token)
              })
            }
          }

        case .failure(let error):
          NSLog("Failed to validate auth code: \(error)")

      }

    }

  }



} // End Actions
