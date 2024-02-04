
videoElement = document.getElementById("videoElement");
myImg = document.getElementById("myImg");
canvas = document.getElementById("canvas");

streaming = false;

function startVideo() {
    if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            initCanvas();
            videoElement.srcObject = stream;
            document.getElementById("step2point1").style.display = "block";
            document.getElementById("webcamButton").style.display = "none";
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
    const context = canvas.getContext("2d");
   
      canvas.width = 500;
      canvas.height = 375;
      context.drawImage(videoElement, 0, 0, 500, 375);
  
      const data = canvas.toDataURL("image/png");
      myImg.setAttribute("src", data);

    
 
  }

function initCanvas() {
    const context = canvas.getContext("2d");
   
    canvas.width = 500;
    canvas.height = 375;
    context.drawImage(myImg, 0, 0, 500, 375);



}
