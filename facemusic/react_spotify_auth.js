console.log("spotify_auth.js loaded");

async function generateCodeChallenge(length=64) { // Generate a codeChallenge and redirect the user to Spotify authorization

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

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }
      
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString() // Redirect the user to Spotify

}


async function getToken(code) { // Get access token from the code given by Spotify

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
    
    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    await localStorage.setItem('access_token', response.access_token);
    await localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem("expiresIn", response.expires_in)
    localStorage.setItem("curTime",Math.floor(Date.now()/1000));

}

async function getRefreshToken() { // Refresh token after time is done
    
    const refreshToken = localStorage.getItem('refresh_token');
    const url06 = "https://accounts.spotify.com/api/token";
 
    const payload06 = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         Authorization: 'Bearer ' + localStorage.getItem("access_token")
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
         client_id: clientId
       }),
    }
    const body = await fetch(url06, payload06);
    const response = await body.json();
 
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
}

// Never called, but could be useful in future for making a bigger tracks pool (get these artists top songs, for example)
async function getTopArtists(accessToken,offsetVal) {
  
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&offset=' + offsetVal, {
        method:'GET',  
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
    });
  
    const data = await response.json();
    return(data.items);
}


async function getTopTracks(accessToken,offsetVal,timerange) { // get top songs within a top-range, with a certain offset value
  
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&offset=' + offsetVal + "&time_range=" + timerange, {
    method:'GET',  
    headers: {
        Authorization: 'Bearer ' + accessToken
      },
      //mode: 'cors'

    });
  
    const data = await response.json();
    return(data.items);
}

async function getAudioFeatures(accessToken,comSepList) { // Get audio features -- including valence (happiness) -- of a list of comma separated list of songs (up to 50 songs)
    
    const response = await fetch('https://api.spotify.com/v1/audio-features?ids=' + comSepList, {
    method:'GET',  
    headers: {
        Authorization: 'Bearer ' + accessToken
      },

    });
  
    const data = await response.json();
    return(data.audio_features);

}


async function createPlaylistEtc(accessToken,howFeeling,uriArray) { // Create a playlist titled "Feeling ${howFeeling}" and add uriArray songs; also add snapshot photo 

    const payload = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: "Generated by FaceMusic",  
          name: "feeling " + howFeeling,
          public: false
            
        })
    };
    
    const user = await getProfile(accessToken);
    const userID = user.id;

    const body = await fetch("https://api.spotify.com/v1/users/" + userID + "/playlists", payload);
    const response = await body.json();
    const newPlaylistID = response.id

    const payload2 = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris:uriArray
        })
    };
    
    const addToPlaylist = await fetch("https://api.spotify.com/v1/playlists/" + newPlaylistID + "/tracks", payload2);

    setTimeout(async function(){ // Delay 500 ms before setting image of playlist: async function / await should make this unnecessary, but just make sure Spotify has time to fully "create" the new playlist
    const jpegUrl = canvas.toDataURL("image/jpeg").slice(23); 
  
    const uploadImage = await fetch('https://api.spotify.com/v1/playlists/' + newPlaylistID + "/images", {
      method: "PUT",  
    headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'image/jpeg'
      },
      body: jpegUrl
    });
  
    const data = await uploadImage.json();
  },500);


}

async function getProfile(accessToken) { // Helper function for createPlaylistEtc, which needs the current user's user ID.
  
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return(data)
}
