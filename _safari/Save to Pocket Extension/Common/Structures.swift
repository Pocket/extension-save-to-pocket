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

struct AddResponse: Decodable{
  let status: Int
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

