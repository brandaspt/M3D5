import { updatePlayerInfo, togglePlay, previousTrack, nextTrack, changeVolume, secsToMins } from "./assets/common/js/player.js"

import { fetchSearch, fetchTopRadios, fetchRadioTracks } from "./assets/common/js/fetch.js"

const throwbackCards = [
  {
    img: "./assets/home/images/throwback/tile01.jpeg",
    name: "Millenium Radio",
  },
  {
    img: "./assets/home/images/throwback/tile02.jpeg",
    name: "Bloodflow Radio",
  },
  {
    img: "./assets/home/images/throwback/tile03.jpeg",
    name: "David Bowie Radio",
  },
  {
    img: "./assets/home/images/throwback/tile04.jpeg",
    name: "Bonobo Radio",
  },
  {
    img: "./assets/home/images/throwback/tile05.jpeg",
    name: "M83 Radio",
  },
  {
    img: "./assets/home/images/throwback/tile06.jpeg",
    name: "Repeat Rewind",
  },
  {
    img: "./assets/home/images/throwback/tile07.jpeg",
    name: "This is Supertramp",
  },
  {
    img: "./assets/home/images/throwback/tile08.jpeg",
    name: "Where is My Mind Radio",
  },
  {
    img: "./assets/home/images/throwback/tile09.jpeg",
    name: "Calyx & TeebBee",
  },
  {
    img: "./assets/home/images/throwback/tile10.jpeg",
    name: "Radiohead Radio",
  },
  {
    img: "./assets/home/images/throwback/tile11.jpeg",
    name: "The Police Radio",
  },
  {
    img: "./assets/home/images/throwback/tile12.jpeg",
    name: "Sigma Radio",
  },
]
const showsCards = [
  {
    img: "./assets/home/images/shows/show01.jpeg",
    name: "The Joe Rogan Experience",
  },
  {
    img: "./assets/home/images/shows/show02.jpeg",
    name: "Casefile True Crime",
  },
  {
    img: "./assets/home/images/shows/show03.jpeg",
    name: "No Such Thing As A Fish",
  },
  {
    img: "./assets/home/images/shows/show04.jpeg",
    name: "Stuff You Know",
  },
  {
    img: "./assets/home/images/shows/show05.jpeg",
    name: "Hamish $ Andy",
  },
  {
    img: "./assets/home/images/shows/show06.jpeg",
    name: "The Tim Ferriss Show",
  },
  {
    img: "./assets/home/images/shows/show07.jpeg",
    name: "The Grade Cricketer",
  },
  {
    img: "./assets/home/images/shows/show08.jpeg",
    name: "Economist Radio",
  },
  {
    img: "./assets/home/images/shows/show09.jpeg",
    name: "Making Sense with Sam Harris",
  },
  {
    img: "./assets/home/images/shows/show10.jpeg",
    name: "The Ricky Gervais Show",
  },
  {
    img: "./assets/home/images/shows/show11.jpeg",
    name: "The History of Rome",
  },
  {
    img: "./assets/home/images/shows/show12.jpeg",
    name: "The Jordan B. Peterson Podcast",
  },
]

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

// Search
const searchInput = document.getElementById("search-input")
const spinner = document.querySelector(".spinner-border")
const searchGrid = document.querySelector(".search-grid")

// Player
const playerPlayBtn = document.getElementById("player-play-btn")
const playerPreviousBtn = document.getElementById("previous-track-btn")
const playerNextBtn = document.getElementById("next-track-btn")
const volumeInput = document.getElementById("volume-input")

let audioEls = []

window.onload = () => {
  // Set full urls to links
  // if (window.location.host[0].match(/[a-z]/)) {
  //   artistLink.href = `${window.location.href}artist/index.html`;
  //   loginLink.href = `${window.location.href}login/index.html`;
  // }
  // Add ev listener to main nav links
  for (const link of mainNavLinks) {
    link.addEventListener("click", activeNavLink)
  }

  // Populate sections

  fetchTopRadios(populateRadios)
  populateShows()

  // Add ev listener to search input
  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 2) {
      spinner.classList.remove("d-none")
      fetchSearch(searchInput.value, populateSearch)
    }
  })

  // Volume Input range
  volumeInput.addEventListener("change", () => {
    changeVolume(audioEls)
  })

  // Add event listener to player control buttons
  playerPlayBtn.addEventListener("click", event => {
    const trackId = event.currentTarget.dataset.trackId
    togglePlay(searchGrid.querySelector(`[data-track-id="${trackId}"]`))
  })

  playerPreviousBtn.addEventListener("click", () => {
    nextTrack(audioEls)
  })
  playerNextBtn.addEventListener("click", () => {
    previousTrack(audioEls)
  })
}

const populateRadios = topRadiosArray => {
  const cardsGrid = document.querySelector("#radios > .radios-cards")

  cardsGrid.innerHTML = topRadiosArray
    .map(
      radio =>
        `
        <div class="col p-0">
          <div class="card border-0 p-2 mx-1">
            <img
              src="${radio.picture_big}"
              class="card-img-top"
              alt="${radio.title} radio cover"
            />
            <div class="card-body text-center p-1">
              <p class="card-title fw-bold">${radio.title}</p>                
            </div>
          </div>
        </div>
      `
    )
    .join("")
}
const populateShows = () => {
  const cardsGrid = document.querySelector("#shows > .shows-cards")
  for (const card of showsCards) {
    cardsGrid.innerHTML += `
        <div class="col p-0">
                <div class="card border-0 p-2 mx-1">
                  <img
                    src="${card.img}"
                    class="card-img-top"
                    alt="${card.name}"
                  />
                  <div class="card-body text-center p-1">
                    <p class="card-title fw-bold">${card.name}</p>
                    
                  </div>
                </div>
              </div>
        `
  }
}

// Populate search section
const populateSearch = data => {
  // If no results found display alert message
  if (data.length === 0) {
    spinner.classList.add("d-none")
    document.getElementById("no-results-alert").classList.add("show")
    setTimeout(() => {
      document.getElementById("no-results-alert").classList.remove("show")
    }, 4000)
    return
  }

  searchGrid.innerHTML = data
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
              <a href="./artist/index.html?${track.artist.id}_${track.artist.name}"><p class="track-artist fw-bold">${
        track.artist.name
      }</p></a>
              <a href="./album/index.html?${track.album.id}"><p class="track-album my-2">${track.album.title}</p></a>
              <p class="card-text">${secsToMins(track.duration)}</p>
            </div>
          </div>
        </div>`
    )
    .join("")
  spinner.classList.add("d-none")

  searchGrid.querySelectorAll(".toggle-play-btn").forEach(button => {
    button.addEventListener("click", () => {
      togglePlay(button.querySelector("audio"))
    })
  })

  audioEls = Array.from(searchGrid.querySelectorAll("audio"))
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
  if (mainSection.scrollTop > 45) {
    if (!mainNav.classList.contains("bg-on")) {
      mainNav.classList.add("bg-on")
    }
  } else if (mainNav.classList.contains("bg-on")) {
    mainNav.classList.remove("bg-on")
  }
})
