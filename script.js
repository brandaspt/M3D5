import {
  initMusicPlayer,
  playTrack,
  pauseTrack,
  playerSongCard,
  secsToMins,
  activeNavLink,
} from "./assets/common/js/player.js";
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
];
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
];

/*
##############################
Global Selectors
##############################
*/
// Main nav
const mainNav = document.querySelector(".main-nav");
const mainNavLinks = document.querySelectorAll(".main-nav a");

// Main section
const mainSection = document.querySelector("main");

// Search
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchGrid = document.querySelector(".search-grid");

// Player
const playerPlayBtn = document.getElementById("player-play-btn");
const playerPauseBtn = document.getElementById("player-pause-btn");
const playerPreviousBtn = document.getElementById("previous-track-btn");
const playerNextBtn = document.getElementById("next-track-btn");
const volumeInput = document.getElementById("volume-input");

// Links
const artistLink = document.getElementById("artist-link");
const loginLink = document.getElementById("login-link");

window.onload = () => {
  // Set full urls to links
  // if (window.location.host[0].match(/[a-z]/)) {
  //   artistLink.href = `${window.location.href}artist/index.html`;
  //   loginLink.href = `${window.location.href}login/index.html`;
  // }
  // Add ev listener to main nav links
  for (const link of mainNavLinks) {
    link.addEventListener("click", activeNavLink);
  }

  // Populate sections
  populateThrowback();
  populateShows();

  // Add ev listener to search form
  searchForm.addEventListener("submit", (e) => {
    fetchSearch();
    e.preventDefault();
  });

  // Volume Input range
  volumeInput.addEventListener("change", (e) => {
    console.log("changed");
    volumeInput.style.setProperty("--value", volumeInput.value);
    volumeInput.style.setProperty(
      "--min",
      volumeInput.min === "" ? "0" : volumeInput.min
    );
    volumeInput.style.setProperty(
      "--max",
      volumeInput.max === "" ? "100" : volumeInput.max
    );
    volumeInput.style.setProperty("--value", volumeInput.value);
  });

  // Add event listener to player control buttons
  playerPlayBtn.addEventListener("click", () => {
    playTrack(playerSongCard(searchGrid));
  });
  playerPauseBtn.addEventListener("click", pauseTrack);
  playerPreviousBtn.addEventListener("click", () => {
    const previousCard =
      playerSongCard(
        searchGrid
      ).parentElement.previousElementSibling.querySelector(".card");
    playTrack(previousCard);
  });
  playerNextBtn.addEventListener("click", () => {
    const nextCard =
      playerSongCard(searchGrid).parentElement.nextElementSibling.querySelector(
        ".card"
      );
    playTrack(nextCard);
  });
};

const populateThrowback = () => {
  const cardsGrid = document.querySelector("#throwback > .throwback-cards");
  for (const card of throwbackCards) {
    cardsGrid.innerHTML += `
        <div class="col p-0">
                <div class="card border-0 p-2 mx-1 h-100">
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
        `;
  }
};
const populateShows = () => {
  const cardsGrid = document.querySelector("#shows > .shows-cards");
  for (const card of showsCards) {
    cardsGrid.innerHTML += `
        <div class="col p-0">
                <div class="card border-0 p-2 mx-1 h-100">
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
        `;
  }
};

// Fetch tracks from API using user's search string
const fetchSearch = () => {
  const searchString = searchInput.value;
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchString}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYzMWYwNDQyNGY0NzAwMTUzZGVmY2MiLCJpYXQiOjE2MTkxNjYyNTMsImV4cCI6MTYyMDM3NTg1M30.qqMlSKGggXQ_6F_5dyAsIxEFzCFsQZUF6LHGbFMz3Is",
      },
    }
  )
    .then((response) => response.json())
    .then((fetchedTracks) => {
      populateSearch(fetchedTracks.data);
    })
    .catch((error) => console.log(error));
};

// Populate search section
const populateSearch = (data) => {
  // If no results found display alert message
  if (data.length === 0) {
    document.getElementById("no-results-alert").classList.add("show");
    setTimeout(() => {
      document.getElementById("no-results-alert").classList.remove("show");
    }, 2000);
    return;
  }
  searchGrid.innerHTML = "";
  let counter = 0;
  for (const track of data) {
    counter++;
    searchGrid.innerHTML += `
        <div class="col p-0">
          <div class="card border-0 p-2 mx-1 h-100">
              <div class="w-100 position-relative">
                <img src="${track.album.cover_big}" class="card-img-top" alt="${
      track.title
    }"/>
                <button class="btn rounded-circle card-play-btn">
                  <svg height="16" role="img" width="16" viewBox="0 0 24 24" aria-hidden="true">
                    <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon>
                  </svg>                 
                </button>
                <button class="btn rounded-circle card-pause-btn">
                  <svg height="16" role="img" width="16" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="3" width="4" height="18" fill="currentColor"></rect>
                    <rect x="15" y="3" width="4" height="18" fill="currentColor"></rect>
                  </svg>
                </button>
              </div>
              <div class="card-body text-center p-1 d-flex flex-column justify-content-between">
                <p class="card-title fw-bold">${track.title}</p>
                <p class="track-artist fw-bold">${track.artist.name}</p>
                <p class="card-text">${secsToMins(track.duration)}</p>
              </div>
              <audio src="${track.preview}"></audio>
          </div>
        </div>`;
    if (counter === 12) break;
  }

  searchGrid.querySelectorAll(".card-play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const closestCard = button.closest(".card");
      playTrack(closestCard);
    });
  });
  searchGrid.querySelectorAll(".card-pause-btn").forEach((button) => {
    button.addEventListener("click", pauseTrack);
  });

  initMusicPlayer(searchGrid);
};

// Set bg color for main nav upon scroll
mainSection.addEventListener("scroll", () => {
  if (mainSection.scrollTop > 45) {
    if (!mainNav.classList.contains("bg-on")) {
      mainNav.classList.add("bg-on");
    }
  } else if (mainNav.classList.contains("bg-on")) {
    mainNav.classList.remove("bg-on");
  }
});
