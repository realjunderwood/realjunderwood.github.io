const Reactstep2 = ( {curState, setCurState }) => {
    
    const { useEffect, useRef } = React;

    function logout() {
        localStorage.clear();
        setCurState(0);
        //window.location.reload();
    }

    // if (curState == 2) {
    //     startVideo();
    // }
    const videoRef = useRef(null);
    const videoElement = (
    <video
    autoPlay={true}
    id="videoElement" 
    ref={videoRef}
    />
    );
        // const myImg = document.getElementById("myImg");
        // const canvas = document.getElementById("canvas");
        // const context = canvas.getContext("2d");


    async function startVideoParent() {
        setCurState(2);
        console.log("about to startvideo");
        //startVideo();
    }



    useEffect(() => {
        console.log("this is useeffect and cur state is " + curState);
        const startVideo = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            videoRef.current.srcObject = stream;
          } catch (err) {
            console.log(err);
            console.log("Above: webcam error")
          }
        };
        if (curState == 2 || curState == 3) {
        startVideo();
        }
      }, [curState]);

    // async function startVideo()  {


    //     //context.drawImage(myImg, 0, 0,500,375);



    //     console.log("start video friend get videoelement" + videoElement);




    //     // document.getElementById("sucesssaccess").style.visibility = "hidden";
    //     // document.getElementById("webcamButton").style.display = "none";
    //     // document.getElementById("loading").style.display = "block";
        
    //     if (navigator.mediaDevices.getUserMedia) {
    //     navigator.mediaDevices.getUserMedia({ video: true })
    //         .then(function (stream) {
    //             videoElement.srcObject = stream;
                

    //         })
    //         .catch(function (err0r) {
    //         console.log("Couldn't get webcam");
    //         console.log(err0r);
    //         });
    //     }


    // }
    
    
    
    
    
    return (

<div id="step2">
    <p>uhh hey it's step2 and curstate is {curState} </p>
<p id="sucesssaccess">Successfully accessed Spotify.</p>

{curState == 1 && <button className="roundButton" onClick={startVideoParent} id="webcamButton">Click to enable webcam</button>}

{/* {curState >= 1 && <Reactstep2point1 curState={curState} setCurState={setCurState}  videoElement={videoElement} myImg={myImg} canvas={canvas} context={context}/> } */}
{ curState >= 2 && <Reactstep2point1 curState={curState} setCurState={setCurState} videoElement={videoElement} />  }


{curState >= 2 && <Reactstep2point2 curState={curState} setCurState={setCurState} /> }


<button className="roundButton" onClick={logout}>Log out</button>
    

</div>

    );
};