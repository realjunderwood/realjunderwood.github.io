// step2point1:

const Reactstep2point1 = ({curState, setCurState, videoElement, tracksPool }) => {

    const { useRef, useEffect, useState } = React;


    // if no trackspool passed through, then try getting it from local storage
    // meaning, also set it into local storage in react_step2

    console.log("The trackspool i have:")
    console.log(tracksPool);


    async function loadModels() {
        console.log("Loading models...")
        await faceapi.loadFaceExpressionModel('/facemusic/models');
        console.log("Loaded faceexpressionmodel")
        await faceapi.loadSsdMobilenetv1Model('/facemusic/models')
        console.log("loaded ssdmobilenet model")
    }

    console.log("Hi my name is reactstep2point1")
    loadModels();




    const [happinessCalcedWord, setHappinessCalcedWord] = useState(() => {
        // Initialize state from local storage or use a default value
        return "";
      });
    




var happinessCalced = 0;
var emoticon = "";

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


    function compareSongs(a,b) {
        const aconst = (Math.random()-0.5)/5
        if (Math.abs(a.valence+aconst-happinessCalced) > Math.abs(b.valence-happinessCalced)) {
            return 1;
        }
        if (Math.abs(a.valence+aconst-happinessCalced) < Math.abs(b.valence-happinessCalced)) {
            return -1;
        }
        return 0;
    }

    
async function face() {

    const input = myImg.ref.current;
        
    const detectionWithExpressions = await faceapi.detectSingleFace(input).withFaceExpressions();
console.log(detectionWithExpressions);
    const hapsadneutSum = detectionWithExpressions.expressions.happy + detectionWithExpressions.expressions.sad + detectionWithExpressions.expressions.neutral;
    const happy = detectionWithExpressions.expressions.happy / hapsadneutSum;
    const sad = detectionWithExpressions.expressions.sad / hapsadneutSum;
    const neutral = detectionWithExpressions.expressions.neutral / hapsadneutSum;
    
    var constant = 0;
    if (neutral > happy && neutral > sad) {
        constant = (happy/(happy+sad)-0.5)/6
    }

    happinessCalced = happy + 0.5*neutral + constant;
    if (happinessCalced<0.2) {
        setHappinessCalcedWord("very sad");
        emoticon = ":,("
    } else if (happinessCalced<0.42) {
        setHappinessCalcedWord("fairly sad");
        emoticon = ":("
    } else if (happinessCalced<0.48) {
        setHappinessCalcedWord("slightly sad");
        emoticon = ":/"
    } else if (happinessCalced<0.58) {
        setHappinessCalcedWord("pretty neutral");
        emoticon = ":|"
    } else if (happinessCalced<0.65) {
        setHappinessCalcedWord("slightly happy");
        emoticon = ":)"
    } else if (happinessCalced<0.93) {
        setHappinessCalcedWord("fairly happy");
        emoticon = ":))"
    } else {
        setHappinessCalcedWord("very happy");
        emoticon = ":DD"
    }

    console.log(happinessCalcedWord);
    happinessCalced = Math.min(happinessCalced,0.92)

    tracksPool.sort(compareSongs);

    console.log("trackspool sorted");
    console.log(tracksPool);

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
        <p>You're looking  <span id="happiness">{happinessCalcedWord}</span></p>
    </div>
    <p>hidden image</p>
    {myImg}
</div>
</div>

)
};