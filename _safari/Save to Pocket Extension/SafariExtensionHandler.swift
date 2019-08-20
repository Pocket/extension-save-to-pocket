//
//  SafariExtensionHandler.swift
//  Save to Pocket Extension
//
//  Created by Nicholas Zeltzer on 5/13/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

enum RequestErrors: Error {
  case auth
  case url
  case statusCode
  case error
}

class SafariExtensionHandler: SFSafariExtensionHandler {

  override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
    // This method will be called when a content script provided by your extension calls
    // safari.extension.dispatchMessage("<some message name>").

    NSLog("Message received: \(messageName), with userInfo: \(String(describing: userInfo))")

    switch messageName {
    case "MAIN_SCRIPT_INJECTED":
      NSLog("Main Script Injected")

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

  }

}
