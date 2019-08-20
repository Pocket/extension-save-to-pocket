//
//  SafariExtensionViewController.swift
//  Save to Pocket Extension
//
//  Created by Nicholas Zeltzer on 5/13/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
  
  static let shared: SafariExtensionViewController = {
    let shared = SafariExtensionViewController()
    shared.preferredContentSize = NSSize(width:320, height:240)
    return shared
  }()
  
}
