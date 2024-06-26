// Deprecated

console.log("DEPRECATED spotify_auth.js loaded");



async function generateCodeChallenge(length=64) { // Adapted from spotify api documentation

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
    console.log("codeChallenge: " + codeChallenge);
  
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

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
}


async function getTopTracks(accessToken,offsetVal) {
  
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&offset=' + offsetVal, {
    method:'GET',  
    headers: {
        Authorization: 'Bearer ' + accessToken
      },
      //mode: 'cors'

    });

    const data = await response.json();
    return(data.items);
  }

  async function getTopArtists(accessToken,offsetVal) {
  
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&offset=' + offsetVal, {
    method:'GET',  
    headers: {
        Authorization: 'Bearer ' + accessToken
      },
      //mode: 'cors'

    });
  
    const data = await response.json();
    console.log(data);
    return(data.items);
  }



  async function getTopTracks(accessToken,offsetVal,timerange) {
  
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


  async function getAudioFeatures(accessToken,comSepList) { // Take a comseplist and get audiofeatures (specifically interested in valence/happiness) of the songs
    const response = await fetch('https://api.spotify.com/v1/audio-features?ids=' + comSepList, {
    method:'GET',  
    headers: {
        Authorization: 'Bearer ' + accessToken
      },
      //mode: 'cors'
    });
  
    const data = await response.json();

    return(data.audio_features);

  }


  async function createPlaylistEtc(accessToken,howFeeling,uriArray) {

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
    console.log("Created a playlist with ID" + newPlaylistID);


    const payload2 = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
           // uris:comSepTracks
           uris:uriArray
        })
    };
    
    const addToPlaylist = await fetch("https://api.spotify.com/v1/playlists/" + newPlaylistID + "/tracks", payload2);
    console.log(addToPlaylist);
    

    setTimeout(async function(){
    const jpegUrl = canvas.toDataURL("image/jpeg").slice(23); // first 23 characters are junk / break things
  
    const uploadImage = await fetch('https://api.spotify.com/v1/playlists/' + newPlaylistID + "/images", {
      method: "PUT",  
    headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'image/jpeg'
      },
      body: jpegUrl
    });
  
    const data = await uploadImage.json();
  },500); // Little delay to make sure the playlist has been properly created on Spotify's end, even though we use async functions/await

}


async function getProfile(accessToken) { //Helper function for createPlaylist: it requires User ID
  
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return(data)
}
