

const Reactstep2 = ( {curState, setCurState }) => {
    
    const { useEffect, useRef, useState, useMemo } = React;
    accessToken = localStorage.getItem("access_token")


    const [tracksPoolDone, setTracksPoolDone] = useState(false);


    const [loading, setLoading] = useState(() => {


        return true;
    });

    console.log("about to call getmusic with access token " + accessToken)
    if (curState == 2 && !tracksPoolDone) {
        getMusic();
        //setTracksPoolDone(true);
       // setLoading( false );
    }


    var tracksPool = [];

        const tracksPoolReal = useMemo(() => {
            console.log("This is the memo thing apparently i just got called");
            console.log("tracks pool is length " + tracksPool.length)
            console.log("tracksPool:")
            console.log(tracksPool)

          return tracksPool;
        }, [curState]);


    async function getMusic() {
        console.log("hi it's getmusic with accesstoken" + accessToken);
        //document.getElementById("loading").style.display="block";
        
    
        const terms = ["short_term","medium_term","long_term"];
    
        for (let i = 0; i < 2; i++) { // Loop through twice: once to get top 50 songs, then again to get next 50 songs
           // await getTopArtists(accessToken,49*i).then((value) => {
                // To implement: add to tracksPool top 5 songs of all the top artists
            //});
    
            for (let k=0;k<terms.length;k++) { // Loop through short term, medium term, and long term top songs
                console.log("abouta do a getTopTracks");
                await getTopTracks(accessToken,49*i,terms[k]).then((value) => {
                    console.log(value)
                    for (let j=0;j<50;j++) {
                        const alreadyInTracksPool = tracksPool.some(el => el.id === value[j].id || (el.artists[0].name === value[j].artists[0].name && el.name === value[j].name)); //Make sure we don't have duplicate songs. Duplicates have same track ID, or both same name and same artist
                        if (!alreadyInTracksPool) {
                            tracksPool.push(value[j]);
                       }
                    }
                });
            }
        
        }





        
        var tracksPoolWithValence = [];
        for (let j=0;j<tracksPool.length/50;j++) {
            let comSepList = "";
            for (let i=j*50; i<Math.min(j*50+50,tracksPool.length); i++) {
                comSepList += (i%50 == 0) ? tracksPool[i].id : "," + tracksPool[i].id; //append id to comSepList, with a comma preceding it if it's not the first element
            }
            let audFeatures = await getAudioFeatures(accessToken,comSepList);
            audFeatures.forEach(function(val){
                tracksPoolWithValence.push(val);
            });
        
        }

        for (let i=0; i<tracksPool.length;i++) { // For tracksPoolWithValence, pull names from tracksPool 
            tracksPool[i].valence = tracksPoolWithValence[i].valence;
        }


       // localStorage.setItem("tracksPool",tracksPool);
        // musicGotten = true;
        console.log(tracksPool);
        console.log("music obtained; that up there was tracksPool");
        console.log("is trackspoooldone true or false")
        console.log(tracksPoolDone);
        console.log(tracksPoolDone === true)
        setTracksPoolDone(true);
        console.log("now");
        console.log(tracksPoolDone);
        setCurState(9)
        console.log("just set curstate to 9");







    }






    function logout() {
        localStorage.clear();
        setCurState(0);
        //window.location.reload();
    }

    // if (curState == 2) {
    //     startVideo();
    // }
 
        // const myImg = document.getElementById("myImg");
        // const canvas = document.getElementById("canvas");
        // const context = canvas.getContext("2d");


    async function startVideoParent() {
        setCurState(12); // try to ensure tracksPool gets updated inline
        console.log("it was 12 right there..")

        setCurState(8);
        console.log("about to startvideo");
        //startVideo();
    }

    
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
    <p>uhh hey it's step2 and curstate is {curState} and tracksPoolDone is {tracksPoolDone}</p>
<p id="sucesssaccess">Successfully accessed Spotify.</p>

{loading && <p>loading</p>}

{curState == 9 && <button className="roundButton" onClick={startVideoParent} id="webcamButton">Click to enable webcam</button>}

<p>tracksPoolDone {tracksPoolDone}</p>
<p>Is it true? {tracksPoolDone === true}</p>
{ ( (curState == 8 || curState == 7) ) && <Reactstep2point1 curState={curState} setCurState={setCurState}  tracksPool={tracksPoolReal} />  }
<p>{tracksPoolReal[0].name}</p>
<p>p above is trrakspollroeal[0].name</p>

{curState == 6 && <Reactstep2point2 curState={curState} setCurState={setCurState} /> }


 <button className="roundButton" onClick={logout}>Log out</button> 
    

</div>

    );
};