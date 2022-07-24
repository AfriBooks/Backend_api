import axios, { Axios} from 'axios'
import { env } from 'process';
import config from ".../config";
import qs from "qs"






export const getGoogleOauthTokens = async ({code}:{code: string})=>{

    const url = 'http://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: config.get('googleClientId'),
        client_secret: config.get('googleClientSecret'),
        redirect_url: config.get('googleOauthRedirectUrl'),
        grant_type: "authorization_code"
    };

    try {
        const res = await axios.post(url, qs.stringify(values),{
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           } 
        })
        return res.data;
    } catch (error: any) {
        console.log(error, 'Failed to fetch Google Oauth Tokens');
        throw new Error(error.message)
    }
}