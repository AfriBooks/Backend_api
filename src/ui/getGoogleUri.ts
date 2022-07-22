

const getGoogleUri = ()=>{
   const rootUrl = ''

   const options ={
    redirect_url: process.env.PUBLIC_GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: process.env.PUBLIC_GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ].join(" ")
   }

   console.log({options});
   

   const qs = new URLSearchParams(options);

   console.log({qs});
   

   return `${rootUrl}?${qs.toString()}`;
}