
videoElement = document.getElementById("videoElement");
myImg = document.getElementById("myImg");
canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

streaming = false;

function startVideo() {


    curState = 2;
    context.drawImage(myImg, 0, 0,500,375);







    document.getElementById("sucesssaccess").style.visibility = "hidden";
    document.getElementById("webcamButton").style.display = "none";
    document.getElementById("loading").style.display = "block";
    if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            videoElement.srcObject = stream;
            document.getElementById("step2point1").style.display = "block";
            document.getElementById("loading").style.display = "none";
            
        })
        .catch(function (err0r) {
        console.log("Couldn't get webcam");
        });
    }
}


videoElement.addEventListener(
    "canplay",
    (ev) => {
      if (!streaming) {
        // height = (video.videoHeight / video.videoWidth) * width;
  
        // video.setAttribute("width", width);
        // video.setAttribute("height", height);
        // canvas.setAttribute("width", width);
        // canvas.setAttribute("height", height);
        streaming = true;
      }
    },
    false,
  );
  

  function takepicture() {
    
   
      canvas.width = 500;
      canvas.height = 375;

     // context.translate(500, 0);
     // context.scale(-1, 1);
     context.drawImage(videoElement, 0, 0,500,375);
     // context.restore();
  
  
      const data = canvas.toDataURL("image/png");
      myImg.setAttribute("src", data);


    
 
  }



