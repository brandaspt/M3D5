
let heart=document.querySelector(".fa-heart")
heart.addEventListener("click",function(){
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
    
})
let btnPlay=document.getElementById("btn-play")
let audioElement = document.getElementById("audio-OneRepublic-Run");
btnPlay.addEventListener("click",function(){
    if (audioElement.paused) {
        audioElement.play();
       btnPlay.innerText="PAUSE"
      } else {
        audioElement.pause();
        btnPlay.innerText="PLAY"
      }
    
})

