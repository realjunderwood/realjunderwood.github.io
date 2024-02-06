const Reactstep1 = ( { curState, setCurState } ) => {
    async function connectSpot() {

        await setCurState(1);

        generateCodeChallenge();
    }
    return (
        <div id="step1">
            <p>This is step1 and teh cur state is { curState }</p>
            <button id="connectspotButton" className="roundButton" onClick={connectSpot}>Connect to Spotify to get started</button>
        </div>
    );
  };