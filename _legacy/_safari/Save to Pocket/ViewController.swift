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
    @IBOutlet var header: NSTextField!
    @IBOutlet var buttonContainer: NSButton!
    @IBOutlet var buttonTitle: NSTextField!
    @IBOutlet var gestureRecognizer: NSGestureRecognizer!
    @IBOutlet var needHelp: NSButton!
    
    private var observation: NSKeyValueObservation? = nil
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.view.wantsLayer = true
        self.buttonContainer.wantsLayer = true
    }
    
    deinit {
        observation = nil
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if #available(macOS 10.14, *) {
            // On 10.14+, observe the effective appearance of the view and set the UI appropriately.
            observation = observe(\.view.effectiveAppearance, options: .new) { (_, change) in
                if self.view.isDarkMode {
                    self.view.layer?.backgroundColor = CGColor(red: 26/255, green: 26/255, blue: 26/255, alpha: 1)
                } else {
                    self.view.layer?.backgroundColor = CGColor(red: 1, green: 1, blue: 1, alpha: 1)
                }
                
                self.needHelp.attributedTitle = self.needHelpTitle(for: .normal)
            }
        } else {
            self.view.layer?.backgroundColor = CGColor(red: 1, green: 1, blue: 1, alpha: 1)
        }
        
        self.buttonContainer.layer?.backgroundColor = CGColor(red: 255/255, green: 51/255, blue: 85/255, alpha: 1)
        self.buttonContainer.layer?.cornerRadius = 3
        
        let actionButtonArea = NSTrackingArea(
            rect: buttonContainer.bounds,
            options: [NSTrackingArea.Options.mouseEnteredAndExited, NSTrackingArea.Options.activeAlways],
            owner: self,
            userInfo: ["sender": buttonContainer!])
        buttonContainer.addTrackingArea(actionButtonArea)
        
        let helpArea = NSTrackingArea(
            rect: needHelp.bounds,
            options: [NSTrackingArea.Options.mouseEnteredAndExited, NSTrackingArea.Options.activeAlways],
            owner: self,
            userInfo: ["sender": needHelp!])
        needHelp.addTrackingArea(helpArea)
    }
  
    override func mouseEntered(with event: NSEvent) {
        guard let sender = event.trackingArea?.userInfo?["sender"] as? NSView else {
            return
        }
        
        switch sender {
        case buttonContainer:
            self.buttonContainer.layer?.backgroundColor = CGColor(red: 144/255, green: 20/255, blue: 36/255, alpha: 1)
        case needHelp:
            needHelp.attributedTitle = needHelpTitle(for: .hover)
        default:
            break
        }
    }

    override func mouseExited(with event: NSEvent) {
        guard let sender = event.trackingArea?.userInfo?["sender"] as? NSView else {
            return
        }
        
        switch sender {
        case buttonContainer:
            self.buttonContainer.layer?.backgroundColor = CGColor(red: 255/255, green: 51/255, blue: 85/255, alpha: 1)
        case needHelp:
            needHelp.attributedTitle = needHelpTitle(for: .normal)
        default:
            break
        }
    }
  
    @IBAction func didClickButton(click: NSClickGestureRecognizer) -> Void {
        if click.state == .recognized {
            self.buttonTitle.textColor = NSColor(red: 1, green: 1, blue: 1, alpha: 0.5)
            self.buttonContainer.layer?.backgroundColor = CGColor(red: 108/255, green: 0/255, blue: 14/255, alpha: 1)
        }
        if click.state == .ended {
            self.buttonTitle.textColor = NSColor(red: 1, green: 1, blue: 1, alpha: 1)
            self.buttonContainer.layer?.backgroundColor = CGColor(red: 255/255, green: 51/255, blue: 85/255, alpha: 1)
            self.openSafariExtensionPreferences(click)
        }
    }
  
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "com.pocket.safari.save.extension") { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.

            }
        }
    }
    
    @IBAction func didClickNeedHelpButton(click: NSButton) {
        needHelp.attributedTitle = needHelpTitle(for: .clicked)
        NSWorkspace.shared.open(URL(string: "https://getpocket.com/howto-pocket-for-safari")!)
    }
    
    private func needHelpTitle(for state: NSButton.State) -> NSAttributedString {
        let color: NSColor
        var attributes: [NSAttributedString.Key : Any] = [
            .font : NSFont(name: "Graphik LCG", size: 12)!
        ]
        if view.isDarkMode {
            color = NSColor(red: 1, green: 1, blue: 1, alpha: 1)
        } else {
            color = NSColor(red: 22/255, green: 73/255, blue: 172/255, alpha: 1)
        }
        
        attributes[.foregroundColor] = color
        if state != .normal {
            attributes[.underlineStyle] = NSUnderlineStyle.single.rawValue
            attributes[.underlineColor] = color
        }
        
        return NSAttributedString(string: NSLocalizedString("Need help?", comment: ""), attributes: attributes)
    }
}

extension NSButton {
    enum State {
        case normal
        case hover
        case clicked
    }
}

extension NSView {
    var isDarkMode: Bool {
        if #available(macOS 10.14, *) {
            return effectiveAppearance.name == .darkAqua || effectiveAppearance.name == .vibrantDark
        }
        
        return false
    }
}
