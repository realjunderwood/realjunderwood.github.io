const Reactstep2 = () => {
    return (

<div id="step2">
    <p>uhh hey</p>
<p id="sucesssaccess">Successfully accessed Spotify.</p>

{curState == 1 && <button className="roundButton" onClick={startVideo} id="webcamButton">Click to enable webcam</button>}

{curState > 1 && <Reactstep2point1 /> }


{curState == 3 && <Reactstep2point2 /> }
    

</div>

    );
};