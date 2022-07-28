import axios, { Axios } from "axios";
import { env } from "process";
import config from ".../config";
import qs from "qs";
import { FilterQuery, Query, QueryOptions, UpdateQuery } from "mongoose";
import User, { UserData } from "../models/user";

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getGoogleOauthTokens = async ({ code,}: {
  code: string;
}): Promise<GoogleTokensResult> => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: config.get("googleClientId"),
    client_secret: config.get("googleClientSecret"),
    redirect_url: config.get("googleOauthRedirectUrl"),
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.log(error, "Failed to fetch Google Oauth Tokens");
    throw new Error(error.message);
  }
};

export const getGoogleUser = async (
  id_token: string,
  access_token: string,
): Promise<GoogleUserResult>=> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data
  } catch (error) {
    console.log(error, "Error fetching google user");
  }
};

export const findAndUpdateUser = async (query: FilterQuery<UserData>, update: UpdateQuery<UserData>, options: QueryOptions = {})=>{
 return User.findOneAndUpdate(query, update, options)
}