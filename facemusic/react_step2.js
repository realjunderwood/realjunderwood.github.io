const Reactstep2 = () => {
    return (

<div id="step2">
<p id="sucesssaccess">Successfully accessed Spotify.</p>
<button class="roundButton" onclick="startVideo()" id="webcamButton">Click to enable webcam</button>
<div id="step2point1">
    <div id="videoPlusSnapButton">
        <div id="videoContainer">
            <video autoplay="true" id="videoElement">
            </video>
        </div>
        <button id="snappicButton" onclick="takepicParent()"><h3 style="display:inline-block">snap picture</h3><img src="camsvg.svg" style="margin-left:10px;vertical-align:middle;" width="30px" /></button>
    </div>
    <div id="canvasPlusHappiness">
    <canvas id="canvas"></canvas>
    <div id="howyourelooking">
        <p>You're looking  <span id="happiness"></span></p>
    </div>
</div>

<div id="step2point2">
    <div id="songRecContainer">
        <div class="songrec">
            <p></p>
            <p></p>
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
            
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
            
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
            
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
            
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
            
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
            
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
            
        </div>
        <div class="songrec">
            <p></p>
            <p></p>
        </div>

 

    </div>
    <button class="roundButton" onclick="createPlaylistParent()">Click to add playlist to Spotify</button>
    <p><small><i>Don't worry: the playlist will be private by default</i></small></p>
</div>
    

</div>
</div>
    );
};