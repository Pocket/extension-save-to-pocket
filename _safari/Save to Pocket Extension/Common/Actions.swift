//
//  Actions.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/20/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

import SafariServices

var postAuthSave:SFSafariPage? = nil
var postAuthLink:String? = nil

class Actions {

  static func logIn(from page: SFSafariPage){

    Utilities.openTab(
      from: page,
      userInfo: ["url" : "https://getpocket.com/signup?src=extension&route=/extension_login_success"],
      makeActive: false
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

  static func openPocket(from page: SFSafariPage) {

    Utilities.openTab(
      from: page,
      userInfo: ["url" : "https://app.getpocket.com/"],
      makeActive: true
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

              if((postAuthLink) != nil){
                // Save the correct link
                self.saveLink(from: postAuthSave!, url: postAuthLink!)
                postAuthLink = nil
              }
              else{
                // Save the correct page
                self.savePage(from: postAuthSave!)
              }

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

  static func saveFromContext(from page: SFSafariPage, userInfo: [String : Any]?){

    let url = userInfo!["urlToSave"] as! String
    NSLog("Saving from context")

    if url == "page" {
      NSLog("Context without a link")
      Actions.savePage(from: page)
      return
    }

    NSLog("Context with link")
    Actions.saveLink(from: page, url: url)
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

      let premium_status = defaults.string(forKey: "premium_status") ?? ""

      // Status should be replaced with relevant data
      page.dispatchMessageToScript(
        withName: Dispatch.SAVE_TO_POCKET_REQUEST,
        userInfo: nil
      )


        SaveToPocketAPI.saveToPocket(from: page, url: url, access_token: access_token, premium_status: premium_status) { result in

        switch result {

        case .success(let item_id):

          NSLog("Page Saved: \(item_id)")

          // Pass item_id to client side (to operate on saved item)
          page.dispatchMessageToScript(
            withName: Dispatch.SAVE_TO_POCKET_SUCCESS,
            userInfo: ["item_id":item_id]
          )

          // Get suggested tags (if applicable)
          self.getSuggestedTags(from: page, saved_url: url )

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
        postAuthSave = page
        postAuthLink = url
        Actions.logIn(from: page)
        return
      }

      let premium_status = defaults.string(forKey: "premium_status") ?? ""

    // Status should be replaced with relevant data
    page.dispatchMessageToScript(
      withName: Dispatch.SAVE_TO_POCKET_REQUEST,
      userInfo: nil
    )


    SaveToPocketAPI.saveToPocket(from: page, url: url, access_token: access_token, premium_status: premium_status) { result in

      switch result {

      case .success(let item_id):

        NSLog("Link Saved: \(item_id)")

        // Pass item_id to client side (to operate on saved item)
        page.dispatchMessageToScript(
          withName: Dispatch.SAVE_TO_POCKET_SUCCESS,
          userInfo: ["item_id":item_id]
        )

        // Get suggested tags (if applicable)
        self.getSuggestedTags(from: page, saved_url: url )

      case .failure(let error):
        NSLog("Link failed to save: \(error)")

        // Status should be replaced with relevant data
        page.dispatchMessageToScript(
          withName: Dispatch.SAVE_TO_POCKET_FAILURE,
          userInfo: nil
        )

      }

    }

    NSLog("Saving Link: \(String(describing: url))")

  }

  static func archiveItem(from page: SFSafariPage, userInfo: [String : Any]?){
    guard let item_id = userInfo!["item_id"] else {
        NSLog("No item id to archive: \(String(describing: userInfo))")
        return
    }

    let defaults = UserDefaults.standard

    // Do we have an auth token?
    guard let access_token = defaults.string(forKey: "access_token") else {
      // No auth token.  Save reference to the page and log
      postAuthSave = page
      Actions.logIn(from: page)
      return
    }

    let premium_status = defaults.string(forKey: "premium_status") ?? ""

    NSLog("Archive page with item id: \(String(describing: item_id))")

    // Make an API call to validate the extension
    SaveToPocketAPI.archiveItem(from: page, item_id: item_id as! String, access_token: access_token, premium_status: premium_status) { result in

      switch result {

      case .success(let response):
        NSLog("Item Archived: \(response)")

        // Status should be replaced with relevant data
        page.dispatchMessageToScript(
          withName: Dispatch.ARCHIVE_ITEM_SUCCESS,
          userInfo: nil
        )

      case .failure(let error):
        NSLog("Item Archive Failed: \(error)")

        // Status should be replaced with relevant data
        page.dispatchMessageToScript(
          withName: Dispatch.ARCHIVE_ITEM_FAILURE,
          userInfo: nil
        )
      }

    }

  }

  static func removeItem(from page: SFSafariPage, userInfo: [String : Any]?){

    guard let item_id = userInfo!["item_id"] else {
      NSLog("No item id to archive: \(String(describing: userInfo))")
      return
    }

    let defaults = UserDefaults.standard

    // Do we have an auth token?
    guard let access_token = defaults.string(forKey: "access_token") else {
      // No auth token.  Save reference to the page and log
      postAuthSave = page
      Actions.logIn(from: page)
      return
    }

    let premium_status = defaults.string(forKey: "premium_status") ?? ""

    NSLog("Removing page with item id: \(String(describing: item_id))")

    // Make an API call to validate the extension
    SaveToPocketAPI.removeItem(from: page, item_id: item_id as! String, access_token: access_token, premium_status: premium_status) { result in

      switch result {

      case .success(let response):
        NSLog("Item Removed: \(response)")

        // Status should be replaced with relevant data
        page.dispatchMessageToScript(
          withName: Dispatch.REMOVE_ITEM_SUCCESS,
          userInfo: nil
        )

      case .failure(let error):
        NSLog("Item Remove Failed: \(error)")

        // Status should be replaced with relevant data
        page.dispatchMessageToScript(
          withName: Dispatch.REMOVE_ITEM_FAILURE,
          userInfo: nil
        )
      }

    }

  }

  static func getSuggestedTags(from page: SFSafariPage, saved_url: String){
    let defaults = UserDefaults.standard

    // Is the user premium?
    let premium_status = defaults.string(forKey: "premium_status")

    if premium_status != "1" {
      NSLog("No suggested tags: premium_status (\(String(describing: premium_status)))")
      return
    }

    // Do we have an auth token?
    guard let access_token = defaults.string(forKey: "access_token") else {
      // No auth token.  Save reference to the page and log
      postAuthSave = page
      Actions.logIn(from: page)
      return
    }

    // Let the client side know we are fetching tags
    page.dispatchMessageToScript(
      withName: Dispatch.SUGGESTED_TAGS_REQUEST,
      userInfo: nil
    )

    // Make an API call to validate the extension
    SaveToPocketAPI.getOnSaveTags(
      from: page,
      saved_url: saved_url,
      access_token: access_token) { result in

      switch result {

      case .success(let response):
        NSLog("Suggested tags \(response)")

        // Pass Suggested Tags to client side
        page.dispatchMessageToScript(
          withName: Dispatch.SUGGESTED_TAGS_SUCCESS,
          userInfo: ["response": response]
        )

      case .failure(let error):
        NSLog("Suggested tags Failed: \(error)")

        // Status should be replaced with relevant data
        page.dispatchMessageToScript(
          withName: Dispatch.SUGGESTED_TAGS_FAILURE,
          userInfo: nil
        )
      }

    }


  }

  static func tagsSync(from page: SFSafariPage, userInfo: [String : Any]?){
    let defaults = UserDefaults.standard

    // Do we have an auth token?
    guard let access_token = defaults.string(forKey: "access_token") else {
      // No auth token.  Save reference to the page and log
      postAuthSave = page
      Actions.logIn(from: page)
      return
    }

    let premium_status = defaults.string(forKey: "premium_status") ?? ""

    guard let item_id = userInfo!["item_id"] as? String else {
        NSLog("No item id to sync tags: \(String(describing: userInfo))")
        return
    }

    guard let tags: Array<Any> = userInfo?["tags"] as? Array<String> else {
      NSLog("No tags to sync: \(String(describing: userInfo))")
      return
    }

    NSLog("Sync tags: \(String(describing: tags))")

    // Make an API call to validate the extension
    SaveToPocketAPI.syncItemTags(
      from: page,
      item_id: item_id,
      tags: tags,
      access_token: access_token,
      premium_status: premium_status) { result in

      switch result {

      case .success(let response):
        NSLog("Sync Tags Sucess \(response)")

         // Pass Suggested Tags to client side
         page.dispatchMessageToScript(
           withName: Dispatch.TAGS_ADDED_SUCCESS,
           userInfo: ["response": response]
         )

      case .failure(let error):
        NSLog("Sync Tags Failed: \(error)")

         // Status should be replaced with relevant data
         page.dispatchMessageToScript(
           withName: Dispatch.TAGS_ADDED_FAILURE,
           userInfo: nil
         )
      }

    }
  }

} // End Actions
