import { updatePlayerInfo, togglePlay, previousTrack, nextTrack, changeVolume, secsToMins } from "../assets/common/js/player.js"

import { fetchArtist, fetchArtistAlbums, fetchArtistTracks } from "../assets/common/js/fetch.js"

/*
##############################
Global Selectors
##############################
*/
// Main nav
const mainNav = document.querySelector(".main-nav")
const mainNavLinks = document.querySelectorAll(".main-nav a")

// Main section
const mainSection = document.querySelector("main")
const heroContent = document.querySelector("main .hero-content")

// Albums section
const albumsGrid = document.querySelector("#albums > .albums-cards")

// Top tracks section
const topTracksGrid = document.querySelector("#top-tracks > .top-tracks-cards")

// Player section
const playerPlayBtn = document.getElementById("player-play-btn")
const playerPreviousBtn = document.getElementById("previous-track-btn")
const playerNextBtn = document.getElementById("next-track-btn")
const volumeInput = document.getElementById("volume-input")

let audioEls = []
let windowSearch

window.onload = () => {
  windowSearch = window.location.search.slice(1).replace("%20", " ").split("_")
  console.log(windowSearch)
  // Add ev listener to main nav links
  for (const link of mainNavLinks) {
    link.addEventListener("click", activeNavLink)
  }

  // Fetch artist data
  fetchArtist(windowSearch[0], populateHeroContent)

  // Fetch albums
  fetchArtistAlbums(windowSearch[0], populateAlbums)

  // Fetch Top Tracks
  fetchArtistTracks(windowSearch[1], populateTopTracks)

  // Volume Input range
  volumeInput.addEventListener("change", () => {
    changeVolume(audioEls)
  })

  // Add event listener to player control buttons
  playerPlayBtn.addEventListener("click", event => {
    const trackId = event.currentTarget.dataset.trackId
    togglePlay(topTracksGrid.querySelector(`[data-track-id="${trackId}"]`))
  })

  playerPreviousBtn.addEventListener("click", () => {
    nextTrack(audioEls)
  })
  playerNextBtn.addEventListener("click", () => {
    previousTrack(audioEls)
  })
}

const populateHeroContent = artistData => {
  document.querySelector("header").setAttribute("style", `background-image: url(${artistData.picture_xl})`)
  heroContent.innerHTML = `
    <p class="listeners fw-bold m-0">${artistData.nb_fan.toLocaleString()}</p>
    <h1 class="artist-name my-5">${artistData.name}</h1>
    <div class="d-flex align-items-center header-btns">
        <button type="button" class="btn rounded-pill hero-play-btn">PLAY</button>
        <button
            type="button"
            class="btn btn-outline-secondary rounded-pill hero-follow-btn"
        >FOLLOW</button>
        <i class="fas fa-ellipsis-h"></i>
    </div>
  `

  // Add ev listener to hero play btn
  // heroContent.querySelector(".hero-play-btn").addEventListener("click", () => {
  //   playTrack(playerSongCard(topTracksGrid))
  // })

  // Add ev listener to hero follow btn
  heroContent.querySelector(".hero-follow-btn").addEventListener("click", event => {
    const heroFollowBtn = event.currentTarget
    heroFollowBtn.classList.toggle("followed")
    if (heroFollowBtn.classList.contains("followed")) {
      heroFollowBtn.innerText = "FOLLOWED"
    } else {
      heroFollowBtn.innerText = "FOLLOW"
    }
  })

  // Populate About section
  document.getElementById("about-listeners").innerText = `${document.querySelector(".listeners").innerText} monthly listeners`
  document.querySelector("#about > div").setAttribute("style", `background-image: url(${artistData.picture_xl})`)
}

const populateAlbums = albumsData => {
  albumsGrid.innerHTML = albumsData
    .sort((a, b) => a.release_date.slice(0, 4) - b.release_date.slice(0, 4))
    .map(
      album => `
        <div class="col p-0">
                <div class="card border-0 p-2 mx-1">
                <div class="w-100 position-relative">
                  <img
                    src="${album.cover_big}"
                    class="card-img-top"
                    alt="${album.title}"
                  />
                  <a href="../album/index.html?${album.id}"><i class="fas fa-stream tracklist-btn"></i></a>
                  </div>
                  <div class="card-body text-center p-1 d-flex flex-column justify-content-between">
                    <p class="card-title fw-bold">${album.title}</p>
                    <p class="card-text fw-bold">${album.release_date.slice(0, 4)}</p>
                  </div>
                  
                </div>
              </div>
        `
    )
    .join("")
}

const populateTopTracks = tracksData => {
  const filteredTracks = tracksData.filter(track => track.artist.name.toLowerCase().includes(windowSearch[1].toLowerCase()))
  console.log(filteredTracks)
  topTracksGrid.innerHTML = filteredTracks
    .map(
      track => `
        <div class="col p-0">
          <div class="card border-0 p-2 mx-1">
            <div class="w-100 position-relative">
              <img src="${track.album.cover_big}" class="card-img-top" alt="${track.title}"/>
                <i class="fas fa-play-circle toggle-play-btn"><audio data-track-id="${track.id}" data-track-artist="${
        track.artist.name
      }" data-track-title="${track.title}" data-album-cover-url="${track.album.cover_small}" src="${
        track.preview
      }"></audio></i>                 
            </div>
            <div class="card-body text-center p-1 d-flex flex-column justify-content-between">
              <p class="card-title fw-bold">${track.title}</p>
              <a href="./album/index.html?${track.album.id}"><p class="track-album">${track.album.title}</p></a>
              <p class="card-text">${secsToMins(track.duration)}</p>
            </div>
          </div>
        </div>`
    )
    .join("")

  topTracksGrid.querySelectorAll(".toggle-play-btn").forEach(button => {
    button.addEventListener("click", () => {
      togglePlay(button.querySelector("audio"))
    })
  })

  audioEls = Array.from(topTracksGrid.querySelectorAll("audio"))
  console.log(audioEls)
  audioEls[0].addEventListener("loadedmetadata", () => {
    updatePlayerInfo(audioEls[0])
  })
}

// Change active link on main nav
const activeNavLink = e => {
  // Remove class from previous active
  const previousActive = document.querySelector(".main-nav a.active")
  previousActive.classList.remove("active")

  // Add class to new active
  e.currentTarget.classList.add("active")
}

// Set bg color for main nav upon scroll
mainSection.addEventListener("scroll", () => {
  if (mainSection.scrollTop > 340) {
    if (!mainNav.classList.contains("bg-on")) {
      mainNav.classList.add("bg-on")
    }
  } else if (mainNav.classList.contains("bg-on")) {
    mainNav.classList.remove("bg-on")
  }
})
