// Has connect to Spotify button

const Reactstep1 = ( { curState, setCurState } ) => {
    async function connectSpot() {
        generateCodeChallenge(); // Function in react_spotify_auth.js; takes user to Spotify.
    }
    
    return (
        <div id="step1">
            <button id="connectspotButton" className="roundButton" onClick={connectSpot}>Connect to Spotify to get started</button>
        <p id="disclaimerr">Note: Spotify currently marks this app as in "developer mode," meaning I have to give enter beta testers into Spotify's developer portal. If you're not able to connect your account, you can send me the email address associated with your Spotify account and I'll add you ASAP.</p>
        </div>
    );
  };
