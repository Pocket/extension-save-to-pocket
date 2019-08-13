# Safari 12 Share Extension Prospectus  

## Background

It was Apple’s intent with the creation of Safari App Extensions that developers would migrate their old javascript-based extensions to ones that re-implemented existing functionality in Swift using native APIs. Our intent runs contrary: we would like to continue our existing javascript implementation, which is shared across several different browsers. 

## Caveat

I’m not a web engineer, and I’m a total toddler with Javascript. Take everything here with a tablespoon of salt (and, please, drink plenty of water).

## Can we re-use any of the existing code?

Based on my examination of primary and secondary sources, I believe we can re-use, _at least_, the business logic of our existing extension. The methodology  here requires using message passing between the native and web components through some sort of serialized data format. (It seems as though some of the legacy bridging components used in the Javascript to message Safari have been removed from v12). The basic wrapper application that I’m providing uses a mechanism provided by Apple for exactly this purpose. 

An alternative approach would have us embed a miniature web browser into the extension, and using that environment to run the existing code. There is a basic example of this sort of implementation [available on Github](https://github.com/yimingliu/safari-app-ext-global-js-demo). 

## But what about the UI?
  
This part’s trickier. It’s not clear to me (without more insight into how the existing Javascript code works) how one injects the existing save extension’s UI into the Safari web window. That’s not to say that it isn’t possible: it may be easy; it may be hard. But, given that Apple does allow Safari App Extensions to inject scripts into the document object, it seems entirely feasible. The big question mark here for me is whether we relied on any Safari-specific presentation APIs that may have been disabled alongside the legacy Safari extensions themselves. I’ll defer to the experts on this.

From the documentation, it’s clear that Apple intends developers to use the native “popover” code to present a modal window element from the extension’s button in the Safari toolbar area, and to draw the UI using standard Cocoa drawing elements. This isn’t terribly difficult, but it cuts against our desire to maximize code share across targets. Additionally, if we wandered down Apple’s route, we’d need Design to develop (and maintain!) UI designs for the Safari popover window. 

## What have you been able to do?
  
I have been able to generate an Xcode project that contains a Safari App Extension (the “wrapper” app). This extension, when run, will add a button to the extension area in the Safari toolbar. Clicking on that button will  signal the `message` function within our existing scripts (proving that the extension button properly directs to the native executable code, and that the native executable code can message the Safari).   
  
I’ve looked at the legacy extension’s property list for some guidance on which scripts included in the repo might be relevant to the extension’s functionality. Only four scripts were listed in the bundle inventory. I have configured the extension to load these scripts when the extension loads. This probably isn’t where we want them (the extension is loaded once for each tab, when the page loads, and may be reloaded several times, depending on system conditions), but it validates that we are correctly embedding our `src` bundle and capable of loading resources from it.

## What are the next steps?

For next steps, I will document the existing wrapper project, how to run and debug it, what and how resources are loaded, how message passing works between the extension and our javascript files, and provide a small bibliography of resources that seem relevant or helpful to our particular situation. I think it then falls to Nelson, our resident expert, to see if the existing wrapper is sufficient to bootstrap the legacy extension code, or if more will be required. 

# Project Documentation  

## Running/Debugging the Project

The project is located in the `safari` directory, at the root of the repo. Within the project, there are two targets: (1) **Save to Pocket**, which is a macOS application that acts as the “parent” for the Safari extension, and; (2) **Save to Pocket Extension**, which is the extension itself. Both are macOS applications, written in Swift.   

The **Save to Pocket** target is the “parent” application that wraps the **Save to Pocket Extension** target. When you build and run **Save to Pocket**, you will be presented with a minimalist macOS UI, that looks exactly like this:

![](https://www.dropbox.com/s/xujs6uahhvo42hd/Screen%20Shot%202019-05-16%20at%2012.28.57.jpg?dl=0)
  
The preexisting extension code is bundled with the **Save to Pocket Extension** target, and is loaded from the `src` directory.

### Logging

There are three possible consoles for debugging the Safari App Extension: the Xcode console window, for Swift code; the system console (e.g., the Console app), also for Swift code; and the Safari Javascript Console, for Javascript. 

The Safari Javascript Console “just works”. The other two logging methods are mutually exclusive. By default, the run target for the project is the wrapper application, **Save to Pocket**. This should be the preferred route for development.  However, please be aware that when you run this target, the Xcode console will not work; you will need to use the Console app to view messages logged from Swift code. This is only feasible if you filter the console log history (e.g.,  `any:save to pocket extension`) (_See, e.g.,_ [Why Aren’t my Safari App Extension NSLog messages showing up in the console in Xcode?](https://stackoverflow.com/questions/41044018/why-aren-t-my-safari-app-extension-nslog-messages-showing-up-in-the-console-in-x)). 

## Injecting Scripts

After the user has enabled the Save to Pocket Extension, the extension will be loaded, once for every tab the user has open. During load, scripts can be injected into the Javascript environment. Which scripts are injected is determined by a list within the extension’s `Info.plist` file (_see, e.g.,_ [[About Content Script and Style Sheet Keys](https://developer.apple.com/documentation/safariservices/safari_app_extensions/safari_app_extension_info_property_list_keys/about_content_script_and_style_sheet_keys). Working from the legacy extension, I identified four script files in that extension’s inventory list and added them to the Save to Pocket Extension. 

			<key>SFSafariContentScript</key>
			<array>
	            <dict>
	                <key>Script</key>
	                <string>./src/js/jquery-2.1.1.min.js</string>
	            </dict>
	            <dict>
	                <key>Script</key>
	                <string>./src/js/safari-content.js</string>
	            </dict>
	            <dict>
	                <key>Script</key>
	                <string>./src/js/shared.js</string>
	            </dict>
	            <dict>
	                <key>Script</key>
	                <string>./src/js/keyboard-shortcut.js</string>
	            </dict>
			</array>

The syntax here speaks for itself. I expect these scripts are loaded in the order they are listed here.

## The Swift/Javascript Bridge

Communication between the Safari App Extension (i.e., the Swift “wrapper”) and the legacy extension code is handled via message passing through the `SafariExtensionHandler` Swift class.

The extension proxy manifests in Javascript as the `safari.extension` object. Messages can be dispatched into the extension via `safari.extension.dispatchMessage` and received from the extension by registering an event handler. These two methods  comprise the Javascript \<-\> Swift bridge from within our scripts. (_See_, How to[Passing Messages Between Safari App Extension and Injected Scripts](https://developer.apple.com/documentation/safariservices/safari_app_extensions/passing_messages_between_safari_app_extensions_and_injected_scripts)). 

On the Swift side, messages are sent with the `dispatchMessageToScript(name, userInfo)` function, where the user info is a dictionary; messages are received through the `messageReceived(name, fromPage, userInfo)` function.   
  
On the Javascript side, messages are received through an event handler. A handler is added via `safari.self.addEventListener("name", handleMessage) { ... }`function; messages are dispatched using `safari.extension.dispatchMessage()`.   

## Running the Project

You can run the project with the Build and Run button in the upper-right corner of the project window (it looks like a play button). This will update the extension, and launch the parent application.

Any changes to the Swift code will be reflected each time you build and run. However, in my testing, it appears that changes to the Javascript code will require you to clean and rebuild the project from scratch each time. Better yet, sometimes re-building the app from scratch will cause the extension’s button to disappear from Safari’s toolbar. If this happens, rebuilding the project again will usually resolve the issue. 

Tapping on the extension’s button in Safari will call through to the Swift extension’s `toolbarItemClicked` function. Currently, this function merely passes a message back to the javascript environment, throwing up an alert box:

	dispatchMessageToScript(withName: "message", userInfo: 
		[
		"name" : "executeScript", 
		"message" : "window.alert(\"Hello from Swift!\")"
		]
	)

When the extension is loaded, all of its scripts will load. I’ve replaced all of the calls to ` safari.self.tab.dispatchMessage("message", message);` with `safari.extension.dispatchMessage("message", message);`, which seems to be the closest parallel to the existing call within the app extension domain. These messages will be received as Swift calls in `SafariExensionHandler` through the `messageReceived()` function.  The userInfo object will be a JSON representation of the received message. 

Currently, I’ve simply configured this function to pass the message back into the Javascript, with all original parameters intact. 

# Bibliography

[Creating Safari App Extensions and porting old Safari extensions](https://blog.yimingliu.com/2018/11/14/notes-on-porting-a-safari-extension-to-a-safari-app-extension/)

[Converting a Legacy Safari Extension to a Safari App Extension](https://developer.apple.com/documentation/safariservices/safari_app_extensions/converting_a_legacy_safari_extension_to_a_safari_app_extension)

[Injecting a Script into a Webpage](https://developer.apple.com/documentation/safariservices/safari_app_extensions/injecting_a_script_into_a_webpage)

[About Content Script and Style Sheet Keys](https://developer.apple.com/documentation/safariservices/safari_app_extensions/safari_app_extension_info_property_list_keys/about_content_script_and_style_sheet_keys)

[Troubleshooting Your Safari App Extension](https://developer.apple.com/documentation/safariservices/safari_app_extensions/troubleshooting_your_safari_app_extension)