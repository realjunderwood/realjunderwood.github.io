// Has connect to Spotify button

const Reactstep1 = ( { curState, setCurState } ) => {
    async function connectSpot() {

        generateCodeChallenge(); // Function in react_spotify_auth.js; takes user to Spotify.

    }
    return (
        <div id="step1">
            <button id="connectspotButton" className="roundButton" onClick={connectSpot}>Connect to Spotify to get started</button>
        </div>
    );
  };