//
//  SafariExtensionHandler.swift
//  Save to Pocket Extension
//
//  Created by Nicholas Zeltzer on 5/13/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {

    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // This method will be called when a content script provided by your extension calls safari.extension.dispatchMessage("<some message name>").
        NSLog("Message received: \(messageName), with userInfo: \(String(describing: userInfo))")
        switch messageName {
        case "openBackgroundTab":
            openBackgroundTab(from: page, userInfo: userInfo)
        case "executeScript":
            executeScript(from: page, userInfo: userInfo)
        case "closeTab":
            closeTab(from: page, userInfo: userInfo)
        case "callPocket":
            callPocket(from: page, userInfo: userInfo)
        default:
//            NSLog("Matched no known message name: \(messageName). Will reflect message back into JS environment.")
            page.getPropertiesWithCompletionHandler { properties in
//                NSLog("The extension received a message (\(messageName)) from a script injected into (\(String(describing: properties?.url))) with userInfo (\(userInfo ?? [:]))")
                page.dispatchMessageToScript(withName: messageName, userInfo: userInfo)
            }
        }
    }

    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
        window.getActiveTab { (tab) in
            tab?.getActivePage(completionHandler: { (page) in
                page?.dispatchMessageToScript(withName: "message",
                                              userInfo: ["name" : "toolbarItemClicked", "message" : ""])
            })
        }
        
        // Sample callPocket method invocation
        /**
         window.getActiveTab { (tab) in
             guard tab != nil else { return }
             tab?.getActivePage(completionHandler: { (page) in
                 guard page != nil else { return }
                 let userInfo: [String : Any] = ["url" : "https://getpocket.com/v3/get",
                                                         "method" : "GET",
                                                         "callback" : "clientAPICallback",
                                                         "parameters" : [ ]
                 ];
                 self.callPocket(from: page!, userInfo: userInfo)
             })
         }
         */
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

    func save() -> Void {

    }
    
    func closeTab(from page: SFSafariPage, userInfo: [String : Any]?) {
        page.getContainingTab { (tab) in
            tab.close()
        }
    }
    
    func executeScript(from page: SFSafariPage, userInfo: [String : Any]?) {
        
    }

    func openBackgroundTab(from page: SFSafariPage, userInfo: [String : Any]?) {
        guard let uri: String = userInfo?["url"] as? String, let url = URL(string: uri) else {
            NSLog("Invalid URI: \(String(describing: userInfo))")
            return
        }
        page.getContainingTab { (tab) in
            tab.getContainingWindow(completionHandler: { (window) in
                window?.openTab(with: url, makeActiveIfPossible: false, completionHandler: { (tab) in
                    if tab != nil {
                        NSLog("opened tab")
                    }
                })
            })
        }
    }
    
    /// UserInfo object must contain a `url` key describing the API URL; `parameters` a `JSON` object describing request parameters; `method` a `String` describing the HTTP method to be used; and `callback`, which will be the name of the message sent to the Javascript event listener.
    
    func callPocket(from page: SFSafariPage, userInfo: [String : Any]?) {
        NSLog("API Parameters: \(String(describing: userInfo))")
        // Extract URL
        guard let uri: String = userInfo?["url"] as? String, let url = URL(string: uri) else {
            NSLog("Invalid URI: \(String(describing: userInfo))")
            return
        }
        // Extract request method
        guard let httpMethod = userInfo?["method"] as? String else {
            NSLog("Invalid HTTP method: \(String(describing: userInfo))")
            return
        }
        // Build request
        var request = URLRequest(url: url)
        request.httpMethod = httpMethod
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        // Add request parameters
        if let parameters = userInfo?["parameters"] as? [ String : Any],
            JSONSerialization.isValidJSONObject(parameters),
            let jsonData = try? JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted) {
            request.httpBody = jsonData
            request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        }
        if let headers = userInfo?["headers"] as? [String : String],
            JSONSerialization.isValidJSONObject(headers) {
            for (field, value) in headers {
                request.setValue(value, forHTTPHeaderField: field)
            }
        }
        // Configure request
        let configuration = URLSessionConfiguration.default
        let session = URLSession(configuration: configuration)
        let task = session.dataTask(with: request) { (data, response, error) in
            if error != nil {
                NSLog("Received error: \(String(describing: error))")
            }
            else if let httpResponse = response as? HTTPURLResponse {
                switch httpResponse.statusCode {
                case 200:
                    NSLog("Receieved 200: \(httpResponse)")
                default:
                    NSLog("Unhandled response code: \(httpResponse.statusCode)")
                }
                // Build responseInfo dictionary
                var responseInfo: [String : Any] = [
                    "status_code" : httpResponse.statusCode,
                    "url" : uri,
                    "method" : httpMethod
                ]

                if data != nil, let jsonResponseInfo: [String : Any] = try? JSONSerialization.jsonObject(with: data!, options: .mutableLeaves) as? [String : Any] {
                    NSLog("Received JSON response: \(jsonResponseInfo)")
                    responseInfo["response"] = jsonResponseInfo
                }
                else if data != nil, let string = String(data: data!, encoding: .utf8) {
                    NSLog("Received unexpected response: \(string)")
                    responseInfo["response_message"] = string
                }
                let responseHeaders = httpResponse.allHeaderFields
                if let callback = userInfo?["callback"] as? String {
                    NSLog("\(page) will execute callback: \(callback) with userInfo: \(String(describing: responseInfo))")
                    page.dispatchMessageToScript(withName: callback,
                                                 userInfo: [
                                                    "name" : callback,
                                                    "message" : callback,
                                                    "headers" : responseHeaders,
                                                    "userInfo" : responseInfo ]
                    )
                }
                else {
                    NSLog("Nil callback");
                }
            }
        }
        // Dispatch request
        DispatchQueue.global(qos: .userInitiated).async {
            NSLog("Calling Pocket")
            task.resume()
        }
    }
    
}
