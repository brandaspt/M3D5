let heart = document.querySelector(".fa-heart");
heart.addEventListener("click", function () {
  if(heart.classList.contains("far"))
  {
     heart.classList.remove("far")
  heart.classList.add("fas")
  heart.style.color = "green";
 
  }
  else{
    heart.classList.remove("fas")
    heart.classList.add("far")
    heart.style.color = "#b4b8b2";

  }
 
});
// Music Player
let audioElement = document.getElementById("audio-OneRepublic-Run");
let btnPlayPause = document.getElementById("btn-play");
let playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", function () {
  if (
    audioElement.paused &&
    playBtn.classList.contains("fa-play-circle")
  ) {
    audioElement.play();
    playBtn.classList.remove("fas", "fa-play-circle");
    playBtn.classList.add("fas", "fa-pause-circle");
  } else {
    audioElement.pause();
    playBtn.classList.remove("fas", "fa-pause-circle");
    playBtn.classList.add("fas", "fa-play-circle");
  }
});
const mainSection = document.querySelector("main");
const mainNav = document.querySelector(".main-nav");
mainSection.addEventListener("scroll", () => {
  if (mainSection.scrollTop > 120) {
    if (!mainNav.classList.contains("bg-on")) {
      mainNav.classList.add("bg-on");
    }
  } else if (mainNav.classList.contains("bg-on")) {
    mainNav.classList.remove("bg-on");
  }
});

