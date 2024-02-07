// step2point1:

const Reactstep2point1 = ({curState, setCurState, tracksPool  }) => {

    const { useRef, useEffect, useState } = React;


    // if no trackspool passed through, then try getting it from local storage
    // meaning, also set it into local storage in react_step2
    // nm

    console.log("The trackspool i have:")
    console.log(tracksPool);
    //console.log("The localstorage version");
    //console.log(localStorage.getItem("tracksPool"));


    async function loadModels() {
        console.log("Loading models...")
        await faceapi.loadFaceExpressionModel('/facemusic/models');
        console.log("Loaded faceexpressionmodel")
        await faceapi.loadSsdMobilenetv1Model('/facemusic/models')
        console.log("loaded ssdmobilenet model")
    }

    console.log("Hi my name is reactstep2point1")


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
        console.log("this is useeffect and cur state is " + curState);
        console.log("tryna activate camera rn...")
        const startVideo = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            videoRef.current.srcObject = stream;
          } catch (err) {
            console.log(err);
            console.log("Above: webcam error")
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


      useEffect(() => {
        if (curState == 6) {
            audioRef.current.pause();
        let audPreviewUrlNull = true;
        let i = 0;
        while (audPreviewUrlNull  && i<10) {
            if (tracksPool[i].preview_url != null) {
                audioRef.current.src = tracksPool[i].preview_url;
                audPreviewUrlNull = false;
            }
            i++
        }
       
        audioRef.current.play();
    }
// better to not use curstate
      },[curState]);
      



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
id="myImg"
ref={imgRef} />
);
console.log(myImg.ref)

    async function takepicParent() {
        

        const context = canvasRef.current.getContext("2d");
        
        
        
        console.log("pic taken");
        setCurState(7);


        

    
   
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
    setCurState(6);

}




async function getProfile(accessToken) {
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    return(data)
  }



async function createPlaylistEtc(accessToken,howFeeling,uriArray) {
    const payload = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: "Generated by FaceMusic",  
          name: "feeling " + howFeeling,
          public: false
        })
    };

    // console.log("le payload is");
    // console.log(payload);
    
    const user = await getProfile(accessToken);
    const userID = user.id;

    const body = await fetch("https://api.spotify.com/v1/users/" + userID + "/playlists", payload);
    const response = await body.json();
    const newPlaylistID = response.id
    console.log("Created a playlist with ID" + newPlaylistID);


    const payload2 = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
           // uris:comSepTracks
           uris:uriArray
        })
    };
    
    const addToPlaylist = await fetch("https://api.spotify.com/v1/playlists/" + newPlaylistID + "/tracks", payload2);
    console.log(addToPlaylist);
    

    setTimeout(async function(){
    const jpegUrl = canvas.toDataURL("image/jpeg").slice(23); 
    //const sampleImage = "/9j/2wCEABoZGSccJz4lJT5CLy8vQkc9Ozs9R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHCcnMyYzPSYmPUc9Mj1HR0dEREdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//dAAQAAf/uAA5BZG9iZQBkwAAAAAH/wAARCAABAAEDACIAAREBAhEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAYBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwAAARECEQA/AJgAH//Z";

  
    const uploadImage = await fetch('https://api.spotify.com/v1/playlists/' + newPlaylistID + "/images", {
      method: "PUT",  
    headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'image/jpeg'
      },
      body: jpegUrl
    });
  
    const data = await uploadImage.json();
  },500);


}





async function createPlaylistParent() {
    //comSepTracksList = "";
    //for (i=0; i<10; i++) {
    //    comSepTracksList += (i == 0) ? tracksPool[i].uri : "," + tracksPool[i].uri; //append id to comSepList, with a comma preceding it if it's not the first element
    //}
    let trackURIsToAddToPlaylist = [];
    for (let i=0; i<10; i++) {
        trackURIsToAddToPlaylist.push(tracksPool[i].uri);
    }

    // Future work: Maybe access_token should be a param to the component rather than just getting from local storage
    createPlaylistEtc(localStorage.getItem("access_token"),happinessCalcedWord + " " + emoticon,trackURIsToAddToPlaylist)
}

















    return (

<div id="step2point1">
    {audSnippet}
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
<p>and now, songs</p>
    { curState == 6 && <Reactsong myTracksPool={tracksPool.slice(0,15)} /> }
    { curState == 6 && <button className="roundButton" onClick={createPlaylistParent}>Click to add playlist to Spotify</button>}
</div>

)
};