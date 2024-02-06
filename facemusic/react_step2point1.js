const Reactstep2point1 = ({curState, setCurState, videoElement }) => {

    async function loadModels() {
        await faceapi.loadFaceExpressionModel('/facemusic/models');
        await faceapi.loadSsdMobilenetv1Model('/facemusic/models')
    }
    loadModels();

    getMusic(accessToken);
    console.log("about to call getmusic with access token " + accessToken)




var happinessCalced = 0;
var happinessCalcedWord = "";
var emoticon = "";
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
    happinessCalcedWord = "";
    if (happinessCalced<0.2) {
        happinessCalcedWord = "very sad";
        emoticon = ":,("
    } else if (happinessCalced<0.42) {
        happinessCalcedWord = "fairly sad";
        emoticon = ":("
    } else if (happinessCalced<0.48) {
        happinessCalcedWord = "slightly sad";
        emoticon = ":/"
    } else if (happinessCalced<0.58) {
        happinessCalcedWord = "pretty neutral";
        emoticon = ":|"
    } else if (happinessCalced<0.65) {
        happinessCalcedWord = "slightly happy";
        emoticon = ":)"
    } else if (happinessCalced<0.93) {
        happinessCalcedWord = "fairly happy";
        emoticon = ":))"
    } else {
        happinessCalcedWord = "very happy";
        emoticon = ":DD"
    }

    happinessCalced = Math.min(happinessCalced,0.92)

}





async function getMusic(accessToken) {
    console.log("hi it's getmusic with accesstoken" + accessToken);
    //document.getElementById("loading").style.display="block";
    

    tracksPool = [];
    const terms = ["short_term","medium_term","long_term"];


    for (i = 0; i < 2; i++) { // Loop through twice: once to get top 50 songs, then again to get next 50 songs
       // await getTopArtists(accessToken,49*i).then((value) => {
            // To implement: add to tracksPool top 5 songs of all the top artists
        //});

        for (k=0;k<terms.length;k++) { // Loop through short term, medium term, and long term top songs
            await getTopTracks(accessToken,49*i,terms[k]).then((value) => {
                for (j=0;j<50;j++) {
                    const alreadyInTracksPool = tracksPool.some(el => el.id === value[j].id || (el.artists[0].name === value[j].artists[0].name && el.name === value[j].name)); //Make sure we don't have duplicate songs. Duplicates have same track ID, or both same name and same artist
                    if (!alreadyInTracksPool) {
                        tracksPool.push(value[j]);
                   }
                }
            });
        }
    
    }
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
        <p>You're looking  {<span id="happiness">happinessCalcedWord</span>}</p>
    </div>
    <p>hidden image</p>
    {myImg}
</div>
</div>

)
};