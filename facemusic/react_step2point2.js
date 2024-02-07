const Reactstep2point2 = () => {


    async function createPlaylistParent() {
        console.log("create playlist");
    }
    return (

<div id="step2point2">
    <div id="songRecContainer">
      

 

    </div>
    <button className="roundButton" onClick={createPlaylistParent}>Click to add playlist to Spotify</button>
    <p><small><i>Don't worry: the playlist will be private by default</i></small></p>
</div>

    )
};