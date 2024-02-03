console.log("spotify_auth.js loaded");





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


      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('error')) {
        console.log("an error was returned");
      }
      let code = urlParams.get('code');



}


async function getToken(code) {

    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    };

    console.log("le payload is");
    console.log(payload);

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    localStorage.setItem('access_token', response.access_token);
}


async function getTopTracks(accessToken,offsetVal) {
  
    const response = await fetch('https://api.spotify.com/v1/me/top?limit=50&offset=${offsetVal}', {
    method:'GET',  
    headers: {
        Authorization: 'Bearer ' + accessToken
      },
      mode: 'cors'

    });
  
    const data = await response.json();
    return(data);
  }

