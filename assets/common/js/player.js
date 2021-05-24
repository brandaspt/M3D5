/*
##############################
Global Selectors
##############################
*/
const playerTrackTitle = document.getElementById("player-track-title")
const playerTrackImg = document.getElementById("player-track-img")
const playerTrackArtist = document.getElementById("player-track-artist")
const playerDuration = document.getElementById("player-duration")
const playerPlayBtn = document.getElementById("player-play-btn")
const volumeInput = document.getElementById("volume-input")

// Toggle play function
// Audio element must be inside an <i class="fa-play-circle"> font awesome icon
export const togglePlay = audioEl => {
  const parentI = audioEl.parentElement

  const currPlaying = document.querySelector(".playing")

  if (audioEl.paused) {
    if (currPlaying) {
      currPlaying.querySelector("audio").pause()
      currPlaying.classList.remove("playing")
      currPlaying.classList.remove("fa-pause-circle")
      currPlaying.classList.add("fa-play-circle")
    }
    audioEl.play()
    parentI.classList.add("playing")
    parentI.classList.add("fa-pause-circle")
    parentI.classList.remove("fa-play-circle")
    playerPlayBtn.setAttribute("data-track-id", `${audioEl.dataset.trackId}`)
    playerPlayBtn.className = "fas fa-pause-circle"

    updatePlayerInfo(audioEl)
  } else {
    audioEl.pause()
    parentI.classList.remove("playing")
    parentI.classList.remove("fa-pause-circle")
    parentI.classList.add("fa-play-circle")
    playerPlayBtn.className = "fas fa-play-circle"
  }
}

export const updatePlayerInfo = audioEl => {
  playerTrackImg.src = audioEl.dataset.albumCoverUrl
  playerTrackTitle.innerText = audioEl.dataset.trackTitle
  playerTrackArtist.innerText = audioEl.dataset.trackArtist
  playerPlayBtn.setAttribute("data-track-id", `${audioEl.dataset.trackId}`)
  playerDuration.innerText = secsToMins(Math.round(audioEl.duration))
}

export const previousTrack = audioElsArray => {
  const currAudioIndex = audioElsArray.findIndex(audioEl => audioEl.dataset.trackId === playerPlayBtn.dataset.trackId)
  if (currAudioIndex === audioElsArray.length - 1) {
    togglePlay(audioElsArray[0])
  } else {
    togglePlay(audioElsArray[currAudioIndex + 1])
  }
}

export const nextTrack = audioElsArray => {
  const currAudioIndex = audioElsArray.findIndex(audioEl => audioEl.dataset.trackId === playerPlayBtn.dataset.trackId)
  if (currAudioIndex === 0) {
    togglePlay(audioElsArray[audioElsArray.length - 1])
  } else {
    togglePlay(audioElsArray[currAudioIndex - 1])
  }
}

export const changeVolume = audioElsArray => {
  volumeInput.style.setProperty("--value", volumeInput.value)
  volumeInput.style.setProperty("--min", volumeInput.min === "" ? "0" : volumeInput.min)
  volumeInput.style.setProperty("--max", volumeInput.max === "" ? "100" : volumeInput.max)
  volumeInput.style.setProperty("--value", volumeInput.value)
  audioElsArray.forEach(audioEl => {
    audioEl.volume = volumeInput.value / 100
  })
}

/*
##############################
Helper Functions
##############################
*/

export const secsToMins = seconds => {
  const intMins = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60

  return `${intMins}:${("0" + remainingSecs).slice(-2)}`
}
