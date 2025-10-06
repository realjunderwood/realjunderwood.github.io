

  document.getElementById("REEnter").setAttribute('src', "audio/REEnter.wav");
  document.getElementById("REEnterAudio").load();

  document.getElementById("hellorrwp").setAttribute('src', "audio/hellorrwp.wav");
  document.getElementById("hellorrwpAudio").load();


  document.getElementById("leave").setAttribute('src', "audio/leave.wav");
  document.getElementById("leaveAudio").load();


var toggleBtn = document.getElementById("toggleAnnouncements");
var allContainer = document.getElementById("allContainer");
var aCC = document.getElementById("allContainerCover");

var whetherOoO = document.getElementById("whetherOoO");

var announcements = true;
toggleBtn.onclick = function() {

  if (announcements === true) {
    announcements = false;
    toggleBtn.innerHTML = "turn on";
    aCC.classList.remove("aCCon");
    aCC.classList.add("aCCoff");
    whetherOoO.innerHTML = "off";

  } else {
    announcements = true;

    toggleBtn.innerHTML = "turn off";
    aCC.classList.remove("aCCoff");
    aCC.classList.add("aCCon");
    whetherOoO.innerHTML = "on";

  }
};
toggleBtn.click();

function playStart(time) {
  document.getElementById("hellorrwpAudio").play();
  setTimeout(function() {
    var msg = new SpeechSynthesisUtterance();

    msg.text = time;
    window.speechSynthesis.speak(msg);
    setTimeout(function() {
      document.getElementById("leaveAudio").play();
    }, 1500);
  }, 2800);
}

function playEnd() {
  document.getElementById("REEnterAudio").play();
}

function startTimer(numomins, nomosecs) {
  var min = document.getElementById("min");
  var sec = document.getElementById("sec");
  var minVal = numomins;
  var secVal = nomosecs;
  const timerInterval = setInterval(function() {

    var d = Math.random();
    if (d > 0.94) {

      clearInterval(timerInterval);
      let d2 = new Date();

      startTimer(((d2.getMinutes() < 45) ? 44 - d2.getMinutes() : 59 - d2.getMinutes()), 60 - d2.getSeconds());

    }
    if (secVal == 1 && minVal == 0) {
      clearInterval(timerInterval);
      let d2 = new Date();

      startTimer(((d2.getMinutes() < 45) ? 44 - d2.getMinutes() : 59 - d2.getMinutes()), 60 - d2.getSeconds());
      if (announcements) {
        if (d2.getMinutes() == 44 || d2.getMinutes() == 45) {


          playStart(((d2.getHours() + 24) % 12 || 12) + ":45");

        }
        if (d2.getMinutes() == 59 || d2.getMinutes() == 0) {
          playEnd();
        }
      }
    }

    if (secVal > 0) {
      secVal--;
    } else {
      secVal = 59;
      minVal--;
    }
    min.innerHTML = ((minVal < 10) ? "0" + minVal : minVal);
    sec.innerHTML = ((secVal < 10) ? "0" + secVal : secVal);
  }, 1000);
}

let d2 = new Date();
startTimer(((d2.getMinutes() < 45) ? 44 - d2.getMinutes() : 59 - d2.getMinutes()), 60 - d2.getSeconds());






var modal = document.getElementById("manualModal");


var btn = document.getElementById("manualBtn");

var closeModal = document.getElementById("closeModal");

btn.onclick = function() {
  modal.style.display = "block";

  document.getElementById("manualTime").value = ((new Date().getMinutes() < 50) ? (((new Date().getHours() + 24) % 12 || 12) + ":45") : (((new Date().getHours() + 25) % 12 || 12) + ":45"));

}

closeModal.onclick = function() {
  modal.style.display = "none";
}

document.getElementById("manualStartBtn").onclick = function() {
  playStart(document.getElementById("manualTime").value);
};

document.getElementById("manualEndBtn").onclick = function() {
  playEnd();
};
