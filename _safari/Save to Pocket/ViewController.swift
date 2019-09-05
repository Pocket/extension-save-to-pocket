//
//  ViewController.swift
//  Save to Pocket
//
//  Created by Nicholas Zeltzer on 5/13/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var window: NSWindow!
    @IBOutlet var buttonContainer: NSButton!
    @IBOutlet var buttonTitle: NSTextField!
    @IBOutlet var gestureRecognizer: NSGestureRecognizer!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.view.wantsLayer = true
        self.buttonContainer.wantsLayer = true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.layer?.backgroundColor = CGColor.init(red: 1, green: 1, blue: 1, alpha: 1)
        self.buttonContainer.layer?.backgroundColor = CGColor(red: 1, green: 0.2, blue: 0.33, alpha: 1)
        self.buttonContainer.layer?.cornerRadius = 3
      
      let area = NSTrackingArea.init(
        rect: buttonContainer.bounds,
        options: [NSTrackingArea.Options.mouseEnteredAndExited, NSTrackingArea.Options.activeAlways],
        owner: self,
        userInfo: nil)
      
      buttonContainer.addTrackingArea(area)
    }
  
    override func mouseEntered(with event: NSEvent) {
      self.buttonContainer.layer?.backgroundColor = CGColor(red: 0.56, green: 0.08, blue: 0.14, alpha: 1)
    }

    override func mouseExited(with event: NSEvent) {
      self.buttonContainer.layer?.backgroundColor = CGColor(red: 1, green: 0.2, blue: 0.33, alpha: 1)
    }
  
    @IBAction func didClickButton(click: NSClickGestureRecognizer) -> Void {
        if click.state == .recognized {
            self.buttonTitle.textColor = NSColor(red: 1, green: 1, blue: 1, alpha: 0.5)
            self.buttonContainer.layer?.backgroundColor = CGColor(red: 0.42, green: 0, blue: 0.05, alpha: 1)
        }
        if click.state == .ended {
            self.buttonTitle.textColor = NSColor(red: 1, green: 1, blue: 1, alpha: 1)
            self.buttonContainer.layer?.backgroundColor = CGColor(red: 1, green: 0.2, blue: 0.33, alpha: 1)
            self.openSafariExtensionPreferences(click)
        }
    }
  
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "com.pocket.safari.save") { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.

            }
        }
    }

}
