// step2point1: facemodel, webcam stuff, canvas, sort songs by happiness and display them with react_song.js

const Reactstep2point1 = ({curState, setCurState, tracksPool  }) => {

    const { useRef, useEffect, useState } = React;



    async function loadModels() {
        console.log("Loading models...")
        await faceapi.loadFaceExpressionModel('/facemusic/models');
        console.log("Loaded faceexpressionmodel")
        await faceapi.loadSsdMobilenetv1Model('/facemusic/models')
        console.log("loaded ssdmobilenet model")
    }



var newSong = 0;
    const videoRef = useRef(null);
    const videoElement = (
    <video
    autoPlay={true}
    id="videoElement" 
    ref={videoRef}
    />
    );

    useEffect(() => {
        const startVideo = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            videoRef.current.srcObject = stream;
          } catch (err) {
            console.log(err);
            console.log("Above: webcam error");
            window.alert("webcam error");
          }
        };
        if (curState == 8) {
        startVideo();
        }
      }, [curState]);

      useEffect(() => {
        loadModels();

      }, []);




const audioRef = useRef(null);
const audSnippet = (
    <audio loop={true}
    ref={audioRef}
    />
)

// Play audio
      useEffect(() => {
        if (curState == 6) {
            audioRef.current.pause();
        let audPreviewUrlNull = true;
        let i = 0;
        while (audPreviewUrlNull  && i<10) { // For some songs the API doesn't have a preview mp3 URL (copyright issues, etc), so go through the first 10 songs and see if they have a preview URL
            if (tracksPool[i].preview_url != null) {
                audioRef.current.src = tracksPool[i].preview_url;
                audPreviewUrlNull = false;
            }
            i++
        }
       
        audioRef.current.play();
    }
      },[curState]);
      



    const [happinessCalcedWord, setHappinessCalcedWord] = useState(() => {
        return "";
      });
    

var happinessCalced = 0;

    const canvasRef = useRef(null);

    const theCanvas = (
    <canvas id="canvas"
    ref={canvasRef}></canvas>
    );

    const imgRef = useRef(null);

const myImg = (
<img
id="myImg"
src="clickSnapPicture.png"
ref={imgRef} />
);

    async function takepicParent() {

        const context = canvasRef.current.getContext("2d");
        
        setCurState(7);
    
        canvasRef.current.width = 500;
        canvasRef.current.height = 375;
      
           context.translate(500, 0);
           context.scale(-1, 1);
           context.drawImage(videoElement.ref.current, 0, 0,500,375);
        
            const data = canvasRef.current.toDataURL("image/png");
            myImg.ref.current.setAttribute("src",data);

        face();
         

    }


    function compareSongs(a,b) {
        const aconst = (Math.random()-0.5)/5 // Add a random number between -0.1 and 0.1.
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
    var detectionWithExpressions;
        try {
    detectionWithExpressions = await faceapi.detectSingleFace(input).withFaceExpressions();
    console.log(detectionWithExpressions);

        }    catch(error) {
            window.alert("Couldn't find a face. Try again.")
        }
    const hapsadneutSum = detectionWithExpressions.expressions.happy + detectionWithExpressions.expressions.sad + detectionWithExpressions.expressions.neutral;
    const happy = detectionWithExpressions.expressions.happy / hapsadneutSum;
    const sad = detectionWithExpressions.expressions.sad / hapsadneutSum;
    const neutral = detectionWithExpressions.expressions.neutral / hapsadneutSum;
    
    var constant = 0;
    if (neutral > happy && neutral > sad) { // Finetuning
        constant = (happy/(happy+sad)-0.5)/6
    }

    happinessCalced = happy + 0.5*neutral + constant;
    if (happinessCalced<0.2) {
        setHappinessCalcedWord("very sad");
    } else if (happinessCalced<0.42) {
        setHappinessCalcedWord("fairly sad");
    } else if (happinessCalced<0.48) {
        setHappinessCalcedWord("slightly sad");
    } else if (happinessCalced<0.58) {
        setHappinessCalcedWord("pretty neutral");
    } else if (happinessCalced<0.65) {
        setHappinessCalcedWord("slightly happy");
    } else if (happinessCalced<0.93) {
        setHappinessCalcedWord("fairly happy");
    } else {
        setHappinessCalcedWord("very happy");
    }

    happinessCalced = Math.min(happinessCalced,0.92)

    tracksPool.sort(compareSongs);

    setCurState(6);

}



async function createPlaylistParent() {

    let trackURIsToAddToPlaylist = [];
    for (let i=0; i<15; i++) {
        trackURIsToAddToPlaylist.push(tracksPool[i].uri);
    }
    let emoticon = "";
    if (happinessCalcedWord == "very sad")  {
        emoticon = ":,("
    } else if (happinessCalcedWord == "fairly sad")  {
        emoticon = ":("
    } else if (happinessCalcedWord == "slightly sad")  {
        emoticon = ":/"
    } else if (happinessCalcedWord == "pretty neutral")  {
        emoticon = ":|"
    } else if (happinessCalcedWord == "slightly happy")  {
        emoticon = ":)"
    } else if (happinessCalcedWord == "fairly happy")  {
        emoticon = ":))"
    } else if (happinessCalcedWord == "very happy")  {
        emoticon = ":DD"
    }
    
    // Future work: Maybe access_token should be a param to the component rather than just getting from localstorage (probably would be better practice?)
    createPlaylistEtc(localStorage.getItem("access_token"),happinessCalcedWord + " " + emoticon,trackURIsToAddToPlaylist) // react_spotify_auth.js
window.alert("Playlist created :)")
}

if (curState ==8) {
    setTimeout(function(){ // Ideally this would be a separate state
canvasRef.current.getContext("2d").drawImage(myImg.ref.current, 0, 0,300,150);
    },800);
}


    return (

<div id="step2point1">
    {audSnippet}
    <div id="videoPlusSnapButton">
        <div id="videoContainer">
            {videoElement}
        </div>
        <button id="snappicButton" className="roundButton" onClick={takepicParent}><h3 style={{display:'inline-block'}}>snap picture</h3><img src="camsvg.svg" id="camImg" /></button>
    </div>
    <div id="canvasPlusHappiness">
    {theCanvas}
    <div id="howyourelooking">
        { curState == 6 && <p>You're looking  <span id="happiness">{happinessCalcedWord}</span>.</p> }
        { (curState == 7 || curState == 8) && <small id="havingtrouble">Having trouble? FaceMusic will not work unless your face is clearly visible in the frame.</small>}
    </div>
    {myImg}
  
</div>
{/* Might this be better as a proper component? */}

    { curState == 6 && (<div>
    <div>
        <h1>Songs you might be in the mood for</h1>
        <Reactsong myTracksPool={tracksPool.slice(0,15).concat(tracksPool.slice(0,15))} />
        <button className="roundButton" onClick={createPlaylistParent}>Add playlist to Spotify</button>
        <p><small><i>Don't worry: the playlist will be private by default</i></small></p> 
    </div>
    <hr />
    <p><b>How it works</b></p>
    <p><small>FaceMusic uses the <a href="https://developer.spotify.com/documentation/web-api">Spotify API</a> as well as <a href="https://justadudewhohacks.github.io/face-api.js/docs/index.html">Face-API</a>, which is a client-side JavaScript API.</small></p>
        <p><small>The Spotify API provides a user's favorite songs (top 100 songs of past month, past 6 months, and all time, with duplicated removed), as well as happiness scores from 0 to 1. Face-API then provides confidence scores for different emotions a user might be showing. FaceMusic combines these two APIs to give 15 songs that match a user's mood.</small></p>
</div>
    )}

</div>

)
};