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
  case json  // Received invalid or unexpected JSON response data
}

class SafariExtensionHandler: SFSafariExtensionHandler {

  override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {

    // This method will be called when a content script provided by your extension calls
    NSLog("Message received: \(messageName), with userInfo: \(String(describing: userInfo))")

    switch messageName {
    case Receive.MAIN_SCRIPT_INJECTED:
      return

    case Receive.AUTH_CODE_RECEIVED:
      Actions.auth(from: page, userInfo: userInfo)
      return

    case Receive.USER_LOG_IN:
      Actions.logIn(from: page)
      return

    case Receive.USER_LOG_OUT:
      Actions.logOut(from: page)
      return

    case Receive.LOGGED_OUT_OF_POCKET:
      Actions.logOut(from: page)
      return

    case Receive.SAVE_PAGE_TO_POCKET:
      Actions.savePage(from: page)
      return

    case Receive.SAVE_URL_TO_POCKET:
      Actions.savePage(from: page)
      return

    case Receive.ARCHIVE_ITEM_REQUEST:
      Actions.archiveItem(from: page, userInfo: userInfo)
      return

    case Receive.REMOVE_ITEM_REQUEST:
      Actions.removeItem(from: page, userInfo: userInfo)
      return

    case Receive.TAGS_SYNC:
      Actions.tagsSync(from: page, userInfo: userInfo)
      return

    case Receive.OPEN_POCKET:
      Actions.openPocket(from: page)
      return

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

  override func contextMenuItemSelected(withCommand command: String, in page: SFSafariPage, userInfo: [String : Any]? = nil){

    if(command == Receive.SAVE_TO_POCKET_CONTEXT){
      NSLog("Save to pocket context with userInfo: \(String(describing: userInfo!))")
    }

    Actions.saveFromContext(from: page, userInfo: userInfo, is_menu: true)
  }

  override func messageReceivedFromContainingApp(withName messageName: String, userInfo: [String : Any]? = nil) {
    NSLog(messageName)
  }

  override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
    // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
    validationHandler(true, "")
  }

  override func toolbarItemClicked(in window: SFSafariWindow) {
    // This method will be called when your toolbar item is clicked.
    NSLog("The extension's toolbar item was clicked.")

    // Save Page
    window.getActiveTab { (tab) in
      tab?.getActivePage(completionHandler: { (page) in
        Actions.savePage(from: page!)
      })
    }
  }
}
