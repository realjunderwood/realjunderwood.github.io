const Reactstep2point1 = ({curState, setCurState, videoElement }) => {



  

    async function takepicParent() {

        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const myImg = document.getElementById("myImg");
        
        
        console.log("pic taken");
        setCurState(3);


        

    
   
            canvas.width = 500;
            canvas.height = 375;
      
           // context.translate(500, 0);
           // context.scale(-1, 1);
           context.drawImage(videoElement, 0, 0,500,375);
           // context.restore();
        
        
            const data = canvas.toDataURL("image/png");
            //myImg.setAttribute("src", data);
      
      
          
       







        face();

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
    <canvas id="canvas"></canvas>
    <div id="howyourelooking">
        <p>You're looking  <span id="happiness"></span></p>
    </div>
</div>
</div>

)
};