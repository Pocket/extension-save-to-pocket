//
//  SaveToPocket.structures.swift
//  Save to Pocket Extension
//
//  Created by Joel Kelly on 8/19/19.
//  Copyright © 2019 Pocket. All rights reserved.
//

struct GuidResponse: Decodable {
  let guid: String
}

struct ActionResults: Codable {
    let action_results: [ActionResult]?
}

struct ActionResult: Codable {
    let item_id: String?
    let resolved_url: String?
}

struct Item: Decodable{
  let item_id: String?
  let resolved_url: String?
}

struct SuggestedTags {
  let suggestedTags: [SuggestedTag]?
  let status, error: Int?
}

struct SuggestedTag {
  let tag: String?
}

struct StoredTags: Decodable{
  let since: Int?
}

struct AuthResponse: Decodable{
  let access_token: String
  let username: String?
  let account: Account?
}

struct Account: Decodable{
  let user_id: String
  let username: String?
  let email: String?
  let birth: String?
  let first_name: String?
  let last_name: String?
  let premium_status: String?
  let profile: Profile?
}

struct Profile: Decodable{
  let username: String?
  let name: String?
  let description: String?
  let avatar_url: String?
}



struct Dispatch {
  static let SAVE_TO_POCKET_REQUEST: String = "SAVE_TO_POCKET_REQUEST"
  static let SAVE_TO_POCKET_SUCCESS: String = "SAVE_TO_POCKET_SUCCESS"
  static let SAVE_TO_POCKET_FAILURE: String = "SAVE_TO_POCKET_FAILURE"
  static let ARCHIVE_ITEM_SUCCESS: String = "ARCHIVE_ITEM_SUCCESS"
  static let ARCHIVE_ITEM_FAILURE: String = "ARCHIVE_ITEM_FAILURE"
  static let REMOVE_ITEM_SUCCESS: String = "REMOVE_ITEM_SUCCESS"
  static let REMOVE_ITEM_FAILURE: String = "REMOVE_ITEM_FAILURE"
  static let TAGS_ADDED_SUCCESS: String = "TAGS_ADDED_SUCCESS"
  static let TAGS_ADDED_FAILURE: String = "TAGS_ADDED_FAILURE"
  static let SUGGESTED_TAGS_REQUEST: String = "SUGGESTED_TAGS_REQUEST"
  static let SUGGESTED_TAGS_SUCCESS: String = "SUGGESTED_TAGS_SUCCESS"
  static let SUGGESTED_TAGS_FAILURE: String = "SUGGESTED_TAGS_FAILURE"
  static let USER_LOG_IN_SUCCESS: String = "USER_LOG_IN_SUCCESS"
  static let USER_LOG_IN_FAILURE: String = "USER_LOG_IN_FAILURE"
  static let USER_LOG_OUT_SUCCESS: String = "USER_LOG_OUT_SUCCESS"
  static let USER_LOG_OUT_FAILURE: String = "USER_LOG_OUT_FAILURE"
  static let UPDATE_STORED_TAGS: String = "UPDATE_STORED_TAGS"
}

struct Receive {
  static let MAIN_SCRIPT_INJECTED: String = "MAIN_SCRIPT_INJECTED"
  static let AUTH_CODE_RECEIVED: String = "AUTH_CODE_RECEIVED"
  static let USER_LOG_IN: String = "USER_LOG_IN"
  static let USER_LOG_OUT: String = "USER_LOG_OUT"
  static let SAVE_TO_POCKET_CONTEXT: String = "SAVE_TO_POCKET_CONTEXT"
  static let SAVE_PAGE_TO_POCKET: String = "SAVE_PAGE_TO_POCKET"
  static let SAVE_URL_TO_POCKET: String = "SAVE_URL_TO_POCKET"
  static let ARCHIVE_ITEM_REQUEST: String = "ARCHIVE_ITEM_REQUEST"
  static let REMOVE_ITEM_REQUEST: String = "REMOVE_ITEM_REQUEST"
  static let TAGS_SYNC: String = "TAGS_SYNC"
  static let OPEN_POCKET: String = "OPEN_POCKET"
  static let LOGGED_OUT_OF_POCKET: String = "LOGGED_OUT_OF_POCKET"
}
