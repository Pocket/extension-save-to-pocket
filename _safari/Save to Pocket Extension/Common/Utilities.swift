//
//  SaveToPocketUtilities.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/17/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

class Utilities: SafariExtensionHandler {
  
  static func closeTab(from page: SFSafariPage, userInfo: [String : Any]?) {
    page.getContainingTab { (tab) in
      tab.close()
    }
  }
  
  static func openBackgroundTab(from page: SFSafariPage, userInfo: [String : Any]?) {
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
  
}
