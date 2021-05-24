import { updatePlayerInfo, togglePlay, previousTrack, nextTrack, changeVolume, secsToMins } from "../assets/common/js/player.js"

import { fetchAlbum } from "../assets/common/js/fetch.js"

const songsList = document.querySelector(".songs-list")

const playerPlayBtn = document.getElementById("player-play-btn")
const playerPreviousBtn = document.getElementById("previous-track-btn")
const playerNextBtn = document.getElementById("next-track-btn")
const volumeInput = document.getElementById("volume-input")

let audioEls = []

let windowSearch = window.location.search.slice(1)
console.log(windowSearch)

// dynamic populating part
window.onload = () => {
  fetchAlbum(windowSearch, addCover)
  fetchAlbum(windowSearch, populateSongs)

  volumeInput.addEventListener("change", () => {
    changeVolume(audioEls)
  })

  // Add event listener to player control buttons
  playerPlayBtn.addEventListener("click", event => {
    const trackId = event.currentTarget.dataset.trackId
    togglePlay(songsList.querySelector(`[data-track-id="${trackId}"]`))
  })

  playerPreviousBtn.addEventListener("click", () => {
    nextTrack(audioEls)
  })
  playerNextBtn.addEventListener("click", () => {
    previousTrack(audioEls)
  })
}

const addCover = album => {
  document.querySelector(".album-cover").innerHTML = `
      <img
        src=${album.cover_xl}
        class="img-fluid w-100"
        alt=""
      />
      <h3 class="mt-2">${album.title}</h3>
      <a href="../artist/index.html?${album.artist.id}_${album.artist.name}"<p>${album.artist.name}</p></a>
      <button type="button" class="btn rounded-pill my-3 px-5 text-light" id="btn-play">PLAY</button>
      <p>${album.release_date} | ${album.nb_tracks} SONGS</p>
      <!-- heart -->
      <i class="far fa-heart"></i>
      <!-- three points -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-three-dots"
        viewBox="0 0 16 16"
      >
        <path
          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
        />
      </svg>
  `
}

const populateSongs = album => {
  songsList.innerHTML = album.tracks.data
    .map(
      track => `
      <div class="row song my-1">
        <div class="col-md-1 song-col d-flex align-items-center justify-content-center">
          <i class="fas fa-play-circle toggle-play-btn"><audio data-track-id="${track.id}" data-track-artist="${
        track.artist.name
      }" data-track-title="${track.title}" data-album-cover-url="${album.cover_small}" src="${track.preview}"></audio></i>  
        </div>
        <div class="col-12 col-md-9 my-2">
          <div class="d-flex align-items-center">
            <h6 class="d-inline-block m-0 me-2 card-title">${track.title}</h6>
            <p class="d-inline-block track-artist">${track.artist.name}</p>
          </div>
        </div>
        <div class="col-12 col-md-2 d-flex align-items-center">
          <p class="card-text">${secsToMins(track.duration)}</p>
        </div>
      </div>`
    )
    .join("")

  songsList.querySelectorAll(".toggle-play-btn").forEach(button => {
    button.addEventListener("click", () => {
      togglePlay(button.querySelector("audio"))
    })
  })

  audioEls = Array.from(songsList.querySelectorAll("audio"))
  console.log(audioEls)
  audioEls[0].addEventListener("loadedmetadata", () => {
    updatePlayerInfo(audioEls[0])
  })
}

// rest

let heart = document.querySelector(".fa-heart")
heart.addEventListener("click", function () {
  if (heart.classList.contains("far")) {
    heart.classList.remove("far")
    heart.classList.add("fas")
    heart.style.color = "green"
  } else {
    heart.classList.remove("fas")
    heart.classList.add("far")
    heart.style.color = "#b4b8b2"
  }
})
