console.log("spotify_auth.js loaded");



const clientId = 'b5ac45b92b3243668cdb8390ab51a04d';
const redirectUri = 'https://www.jamesunderwood.net/facemusic';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")


// 

async function generateCodeChallenge(length) {

    function generateRandomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-~';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
    async function sha256(plain) {
        console.log("sha256")
        const encoder = new TextEncoder()
        console.log("hiii")
        const data = encoder.encode(plain)
        console.log("sdfoij")
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        return hashBuffer;
    }

    function base64encode(input) {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }  

    const codeVerifier  = generateRandomString(length);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);
  
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      }
      
      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString()




}


 generateCodeChallenge(64)


