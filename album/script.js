import {
  initMusicPlayer,
  playTrack,
  pauseTrack,
  playerSongCard,
  secsToMins,
  activeNavLink,
} from "../assets/common/js/player.js"

import { fetchData } from "../assets/common/js/fetch.js"

const playerPlayBtn = document.getElementById("player-play-btn")
const playerPauseBtn = document.getElementById("player-pause-btn")
const playerPreviousBtn = document.getElementById("previous-track-btn")
const playerNextBtn = document.getElementById("next-track-btn")
const volumeInput = document.getElementById("volume-input")

let hash

window.onload = () => {
  hash = window.location.hash.replace("#", "")
  console.log(hash)
}
// dynamic populating part
function giveData(data) {
  addCover(data)
  populateSongs(data)
}
fetchData(hash, giveData, true)

// fetch("https://deezerdevs-deezer.p.rapidapi.com/album/84191982", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "0750e50bdfmsh5caa63f730b70d9p1a24d2jsn08753afd75e9",
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     addCover(data)
//     populateSongs(data)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

const addCover = (album) => {
  const coverCol = document.createElement("div")
  coverCol.classList = "col-md-12 col-lg-4 album-cover"

  coverCol.innerHTML = `
      <img
        src=${album.cover_xl}
        class="img-fluid w-100"
        alt=""
      />
      <h3 class="mt-2">${album.title}</h3>
      <a href="../artist/index.html#${album.artist.id}_${album.artist.name}"<p>${album.artist.name}</p>
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

  document.querySelector(".cover").appendChild(coverCol)
}

const populateSongs = (album) => {
  const songsCol = document.createElement("div")
  songsCol.classList = "col-md-12 col-lg-8 songs-list"

  album.tracks.data.forEach((e) => {
    songsCol.innerHTML += `
      <div class="row song my-1">
        <div class="col-md-1 song-col d-flex align-items-center justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-fill pause" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
        </div>
        <div class="col-12 col-md-9 my-2">
          <div class="d-flex align-items-center">
            <h6 class="d-inline-block m-0 me-2 card-title">${e.title}</h6>
            <p class="d-inline-block track-artist">${e.artist.name}</p>
          </div>
        </div>
        <div class="col-12 col-md-2 d-flex align-items-center">
          <p class="card-text">${secsToMins(e.duration)}</p>
        </div>
        <audio src="${e.preview}"></audio>
      </div>`
  })

  document.querySelector(".cover").appendChild(songsCol)

  document.querySelectorAll(".song-col > svg").forEach((e) =>
    e.addEventListener("click", () => {
      if (e.classList.contains("pause")) {
        playTrack(e.closest(".row"))
        e.classList.remove("pause")
        e.innerHTML =
          '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>'
        e.classList.add("play")
      } else {
        pauseTrack()
        e.classList.remove("play")
        e.innerHTML =
          '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>'
        e.classList.add("pause")
      }
    })
  )

  const topTracksGrid = document.getElementsByClassName("songs-list")[0]

  initMusicPlayer(topTracksGrid)

  playerPlayBtn.addEventListener("click", () => {
    playTrack(playerSongCard(topTracksGrid))
  })
  playerPauseBtn.addEventListener("click", pauseTrack)
  playerPreviousBtn.addEventListener("click", () => {
    const previousCard = playerSongCard(topTracksGrid).previousElementSibling
    playTrack(previousCard)
  })
  playerNextBtn.addEventListener("click", () => {
    const nextCard = playerSongCard(topTracksGrid).nextElementSibling
    playTrack(nextCard)
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
