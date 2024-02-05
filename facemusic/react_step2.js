const Reactstep2 = ( {curState, setCurState }) => {
    
    async function startVideo()  {
        setCurState(2);

    }
    
    
    
    
    
    return (

<div id="step2">
    <p>uhh hey it's step2 and curstate is {curState} </p>
<p id="sucesssaccess">Successfully accessed Spotify.</p>

{curState == 1 && <button className="roundButton" onClick={startVideo} id="webcamButton">Click to enable webcam</button>}

{curState > 1 && <Reactstep2point1 curState={curState} setCurState={setCurState} /> }


{curState == 3 && <Reactstep2point2 curState={curState} setCurState={setCurState} /> }
    

</div>

    );
};