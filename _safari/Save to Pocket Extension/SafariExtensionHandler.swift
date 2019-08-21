//
//  SafariExtensionHandler.swift
//  Save to Pocket Extension
//
//  Created by Nicholas Zeltzer on 5/13/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

enum RequestError: Error {
  case undefined
  case auth
  case url
  case statusCode
  case error
  /// Received invalid or unexpected JSON response data
  case json
}

class SafariExtensionHandler: SFSafariExtensionHandler {

  override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {

    // This method will be called when a content script provided by your extension calls
    NSLog("Message received: \(messageName), with userInfo: \(String(describing: userInfo))")

    switch messageName {

    case "AUTH_CODE_RECEIVED":
      Actions.auth(from: page, userInfo: userInfo)

    default:
      page.getPropertiesWithCompletionHandler { properties in
        NSLog("""
          The extension received a message (\(messageName))
          from a script injected into (\(String(describing: properties?.url)))
          with userInfo (\(userInfo ?? [:]))
          """)
      }
    }
  }

  override func messageReceivedFromContainingApp(withName messageName: String, userInfo: [String : Any]? = nil) {
    NSLog(messageName)
  }

  override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
    // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
    validationHandler(true, "")
  }

  override func popoverViewController() -> SFSafariExtensionViewController {
    return SafariExtensionViewController.shared
  }

  override func toolbarItemClicked(in window: SFSafariWindow) {
    // This method will be called when your toolbar item is clicked.
    NSLog("The extension's toolbar item was clicked.")

    // Open Auth Page
    window.getActiveTab { (tab) in
      tab?.getActivePage(completionHandler: { (page) in

        // Grab our stored values
        let defaults = UserDefaults.standard

        // Do we have an auth token?
        guard let access_token = defaults.string(forKey: "access_token") else {

          // No auth token, need to log in
          Actions.logIn(from: page!)
          return

        }

        // Hey AuthToken exists! Save the page
        // MAKE CALL TO SAVE

        // DEV ONLY:  Remove that auth token
        Actions.logOut(from: page!)
      })
    }
  }
}
