const Reactstep2point1 = ({curState, setCurState, videoElement }) => {

    async function loadModels() {
        await faceapi.loadFaceExpressionModel('/facemusic/models');
        await faceapi.loadSsdMobilenetv1Model('/facemusic/models')
    }
    loadModels();



    const { useRef, useEffect } = React;

    const canvasRef = useRef(null);

    const theCanvas = (
    <canvas id="canvas"
    ref={canvasRef}></canvas>
    );

    const imgRef = useRef(null);

const myImg = (
<img
ref={imgRef} />
);
console.log(myImg.ref)

    async function takepicParent() {
        

        const context = canvasRef.current.getContext("2d");
        
        
        
        console.log("pic taken");
        setCurState(3);


        

    
   
        canvasRef.current.width = 500;
        canvasRef.current.height = 375;
      
           context.translate(500, 0);
           context.scale(-1, 1);
           console.log(videoElement.ref.current);
           context.drawImage(videoElement.ref.current, 0, 0,500,375);
           // context.restore();
        
        
            const data = canvasRef.current.toDataURL("image/png");
            myImg.ref.current.setAttribute("src",data);
            //myImg.setAttribute("src", data);
            //imgSrc = data;
      
      
          
       







        face();

    }

async function face() {

    const input = myImg.ref.current;
        
    const detectionWithExpressions = await faceapi.detectSingleFace(input).withFaceExpressions();
}














    return (

<div id="step2point1">
    <div id="videoPlusSnapButton">
        <div id="videoContainer">
            {videoElement}
        </div>
        <button id="snappicButton" onClick={takepicParent}><h3 style={{display:'inline-block'}}>snap picture</h3><img src="camsvg.svg" id="camImg" /></button>
    </div>
    <div id="canvasPlusHappiness">
    {theCanvas}
    <div id="howyourelooking">
        <p>You're looking  <span id="happiness"></span></p>
    </div>
    <p>hidden image</p>
    {myImg}
</div>
</div>

)
};