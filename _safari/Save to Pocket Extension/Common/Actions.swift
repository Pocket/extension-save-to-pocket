//
//  Actions.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/20/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

var postAuthSave:SFSafariPage? = nil

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

    // Status should be replaced with relevant data
    page.dispatchMessageToScript(
      withName: Dispatch.USER_LOG_OUT_SUCCESS,
      userInfo: nil
    )

  }

  static func auth(from page: SFSafariPage, userInfo: [String : Any]?){

    // Make an API call to validate the extension
    SaveToPocketAPI.validateAuthCode(from: page, userInfo: userInfo) { result in

      switch result {

        case .success(let access_token):
          NSLog("Validated auth code: \(access_token)")

          // Activate tab
          postAuthSave?.getContainingTab(completionHandler: { tab in
            tab.activate(completionHandler: {
              // Save the correct page
              self.savePage(from: postAuthSave!)
              // Since we got the Auth Code from the passed in page, we close that page
              Utilities.closeTab(from: page, userInfo: userInfo)
            })
          })

        case .failure(let error):
          // Since we got the Auth Code from the passed in page, we close that page
          Utilities.closeTab(from: page, userInfo: userInfo)
          NSLog("Failed to validate auth code: \(error)")

      }

    }

  }

  static func savePage(from page: SFSafariPage){

    page.getPropertiesWithCompletionHandler { properties in

        let defaults = UserDefaults.standard

        // Do we have an auth token?
        guard let access_token = defaults.string(forKey: "access_token") else {
          // No auth token.  Save reference to the page and log
          postAuthSave = page
          Actions.logIn(from: page)
          return
        }

      // Check we have a URL
      guard let url = properties?.url?.absoluteString else {
        NSLog("Invalid URL")
        return
      }

      // Status should be replaced with relevant data
      page.dispatchMessageToScript(
        withName: Dispatch.SAVE_TO_POCKET_REQUEST,
        userInfo: nil
      )


      SaveToPocketAPI.saveToPocket(from: page, url: url, access_token: access_token) { result in

        switch result {

        case .success(let status):

          NSLog("Page Saved: \(status)")

          // Status should be replaced with relevant data
          page.dispatchMessageToScript(
            withName: Dispatch.SAVE_TO_POCKET_SUCCESS,
            userInfo: nil // FIX: passing anything other than nil breaks this
          )

        case .failure(let error):
          NSLog("Page failed to save: \(error)")

          // Status should be replaced with relevant data
          page.dispatchMessageToScript(
            withName: Dispatch.SAVE_TO_POCKET_FAILURE,
            userInfo: nil
          )

        }

      }

    }

  }

  static func saveLink(from page: SFSafariPage, url: String){
        let defaults = UserDefaults.standard

        // Do we have an auth token?
        guard let access_token = defaults.string(forKey: "access_token") else {
          // No auth token, need to log in
          Actions.logIn(from: page)
          return
        }

        NSLog("Save page with access token: \(access_token)")
  }

  static func archiveItem(from page: SFSafariPage, userInfo: [String : Any]?){

  }

  static func removeItem(from page: SFSafariPage, userInfo: [String : Any]?){

  }

  static func editTags(from page: SFSafariPage, userInfo: [String : Any]?){

  }

} // End Actions
