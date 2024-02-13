// Downloads all the tracks and has enable webcam button, but webcam interface is in react_step2point1.js

const Reactstep2 = ( {curState, setCurState }) => {
    
    const { useEffect, useRef, useState, useMemo } = React;
    
    accessToken = localStorage.getItem("access_token");

    const [loading, setLoading] = useState(() => {
        return true;
    });

    if (curState == 3) { // just got Spotify auth => curState 3
        getMusic();
    }

    var tracksPool = useRef([]);

    const tracksPoolReal = useMemo(() => {
          return tracksPool.current;
    }, [curState]);


    async function getMusic() {
                
    
    const terms = ["short_term","medium_term","long_term"];
    
    for (let i = 0; i < 2; i++) { // Loop through twice: once to get top 50 songs, then again to get next 50 songs
            for (let k=0;k<terms.length;k++) { // Loop through short term, medium term, and long term top songs
                await getTopTracks(accessToken,49*i,terms[k]).then((value) => { // Defined inreact_spotify_auth.js
                    console.log(value)
                    for (let j=0;j<50;j++) {
                        const alreadyInTracksPool = tracksPool.current.some(el => el.id === value[j].id || (el.artists[0].name === value[j].artists[0].name && el.name === value[j].name));
                        // ^ Make sure we don't have duplicate songs. Duplicates have same track ID, or both same name and same artist
                        if (!alreadyInTracksPool) {
                            tracksPool.current.push(value[j]);
                       }
                    }
                });
            }
    }

        //Next, get happiness scores for everything
        var tracksPoolWithValence = [];
        for (let j=0;j<tracksPool.current.length/50;j++) {
            let comSepList = "";
            for (let i=j*50; i<Math.min(j*50+50,tracksPool.current.length); i++) { // We have to do it in installments of 50 (Spotify API constraint)
                comSepList += (i%50 == 0) ? tracksPool.current[i].id : "," + tracksPool.current[i].id; //append id to comSepList, with a comma preceding it if it's not the first element
            }
            let audFeatures = await getAudioFeatures(accessToken,comSepList);
            audFeatures.forEach(function(val){
                tracksPoolWithValence.push(val);
            });
        }

        for (let i=0; i<tracksPool.current.length;i++) { // Basically, "merge" valence scores from tracksPoolWithValence into tracksPool
            tracksPool.current[i].valence = tracksPoolWithValence[i].valence;
        }

        localStorage.setItem("tracksPool", JSON.stringify(tracksPool.current));

        setCurState(9); //Ready to display "start webcam" button

    }



    function logout() {
        localStorage.clear();
        setCurState(0);
        window.location.reload();
    }

    async function startVideoParent() {
        setCurState(8);
    }

    return (

<div id="step2">
{/* <p id="sucesssaccess">Successfully accessed Spotify.</p> */}

{curState == 3 && <h1>Loading...</h1>}

{curState == 9 && <button className="roundButton" onClick={startVideoParent} id="webcamButton">Click to enable webcam</button>}

{ ( (curState == 8 || curState == 7 || curState == 6) ) && <Reactstep2point1 curState={curState} setCurState={setCurState}  tracksPool={tracksPoolReal} />  }

<div id="logoutDiv">
 <button id="logout" className="roundButton" onClick={logout}>Log out</button> 
 </div>

</div>

    );
};
