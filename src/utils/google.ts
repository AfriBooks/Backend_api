import passport from "passport";
import {Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    scope: ['email', 'profile'],
}, async (
    accessTOken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
) =>{
 console.log(accessTOken);
 console.log(profile);
 
}))