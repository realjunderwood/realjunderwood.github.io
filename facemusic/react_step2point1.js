const Reactstep2point1 = ({curState, setCurState }) => {

    async function takepicParent() {
        console.log("pic taken");
        setCurState(3);

    }


    return (

<div id="step2point1">
    <div id="videoPlusSnapButton">
        <div id="videoContainer">
            <video autoPlay={true} id="videoElement">
            </video>
        </div>
        <button id="snappicButton" onClick={takepicParent}><h3 style={{display:'inline-block'}}>snap picture</h3><img src="camsvg.svg" id="camImg" /></button>
    </div>
    <div id="canvasPlusHappiness">
    <canvas id="canvas"></canvas>
    <div id="howyourelooking">
        <p>You're looking  <span id="happiness"></span></p>
    </div>
</div>
</div>

)
};