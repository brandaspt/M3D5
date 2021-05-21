import {
  initMusicPlayer,
  playTrack,
  pauseTrack,
  playerSongCard,
  secsToMins,
  activeNavLink,
} from "../assets/common/js/player.js";

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
const heroContent = document.querySelector("main .hero-content");

// Albums section
const albumsGrid = document.querySelector("#albums > .albums-cards");

// Top tracks section
const topTracksGrid = document.querySelector("#top-tracks > .top-tracks-cards");

// Player section
const playerPlayBtn = document.getElementById("player-play-btn");
const playerPauseBtn = document.getElementById("player-pause-btn");
const playerPreviousBtn = document.getElementById("previous-track-btn");
const playerNextBtn = document.getElementById("next-track-btn");
const volumeInput = document.getElementById("volume-input");

window.onload = () => {
  // Add ev listener to main nav links
  for (const link of mainNavLinks) {
    link.addEventListener("click", activeNavLink);
  }

  // Fetch artist data
  fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/2108", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYzMWYwNDQyNGY0NzAwMTUzZGVmY2MiLCJpYXQiOjE2MTkxNjYyNTMsImV4cCI6MTYyMDM3NTg1M30.qqMlSKGggXQ_6F_5dyAsIxEFzCFsQZUF6LHGbFMz3Is",
    },
  })
    .then((response) => response.json())
    .then((fetchedArtist) => {
      populateHeroContent(fetchedArtist);
    })
    .catch((error) => console.log(error));

  // Fetch albums
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/2108/albums",
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYzMWYwNDQyNGY0NzAwMTUzZGVmY2MiLCJpYXQiOjE2MTkxNjYyNTMsImV4cCI6MTYyMDM3NTg1M30.qqMlSKGggXQ_6F_5dyAsIxEFzCFsQZUF6LHGbFMz3Is",
      },
    }
  )
    .then((response) => response.json())
    .then((fetchedAlbums) => {
      populateAlbums(fetchedAlbums.data);
    })
    .catch((error) => console.log(error));

  // Fetch Top Tracks
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=bonobo", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYzMWYwNDQyNGY0NzAwMTUzZGVmY2MiLCJpYXQiOjE2MTkxNjYyNTMsImV4cCI6MTYyMDM3NTg1M30.qqMlSKGggXQ_6F_5dyAsIxEFzCFsQZUF6LHGbFMz3Is",
    },
  })
    .then((response) => response.json())
    .then((fetchedTracks) => {
      populateTopTracks(fetchedTracks.data);
    })
    .catch((error) => console.log(error));

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
    playTrack(playerSongCard(topTracksGrid));
  });
  playerPauseBtn.addEventListener("click", pauseTrack);
  playerPreviousBtn.addEventListener("click", () => {
    const previousCard =
      playerSongCard(
        topTracksGrid
      ).parentElement.previousElementSibling.querySelector(".card");
    playTrack(previousCard);
  });
  playerNextBtn.addEventListener("click", () => {
    const nextCard =
      playerSongCard(
        topTracksGrid
      ).parentElement.nextElementSibling.querySelector(".card");
    playTrack(nextCard);
  });
};

const populateHeroContent = (artistData) => {
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
  `;

  // Add ev listener to hero play btn
  heroContent.querySelector(".hero-play-btn").addEventListener("click", () => {
    playTrack(playerSongCard(topTracksGrid));
  });

  // Add ev listener to hero follow btn
  heroContent
    .querySelector(".hero-follow-btn")
    .addEventListener("click", (event) => {
      const heroFollowBtn = event.currentTarget;
      heroFollowBtn.classList.toggle("followed");
      if (heroFollowBtn.classList.contains("followed")) {
        heroFollowBtn.innerText = "FOLLOWED";
      } else {
        heroFollowBtn.innerText = "FOLLOW";
      }
    });

  // Populate About section listeners
  document.getElementById("about-listeners").innerText = `${
    document.querySelector(".listeners").innerText
  } monthly listeners`;
};

const populateAlbums = (albumsData) => {
  let counter = 0;
  for (const album of albumsData) {
    counter++;
    albumsGrid.innerHTML += `
        <div class="col p-0">
                <div class="card border-0 p-2 mx-1 h-100">
                <div class="w-100 position-relative">
                  <img
                    src="${album.cover_big}"
                    class="card-img-top"
                    alt="${album.title}"
                  />
                  <button class="btn rounded-circle card-play-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
                      <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                      <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                      <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                      <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
                  </div>
                  <div class="card-body text-center p-1 d-flex flex-column justify-content-between">
                    <p class="card-title fw-bold">${album.title}</p>
                    <p class="card-text fw-bold">${album.release_date.slice(
                      0,
                      4
                    )}</p>
                  </div>
                  
                </div>
              </div>
        `;
    if (counter === 12) break;
  }
};

const populateTopTracks = (tracksData) => {
  let counter = 0;
  for (const track of tracksData) {
    counter++;
    topTracksGrid.innerHTML += `
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
                <p class="track-album fw-bold">${track.album.title}</p>
                <p class="card-text">${secsToMins(track.duration)}</p>
              </div>
              <audio src="${track.preview}"></audio>
          </div>
        </div>`;
    if (counter === 12) break;
  }
  topTracksGrid.querySelectorAll(".card-play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const closestCard = button.closest(".card");
      playTrack(closestCard);
    });
  });
  topTracksGrid.querySelectorAll(".card-pause-btn").forEach((button) => {
    button.addEventListener("click", pauseTrack);
  });

  initMusicPlayer(topTracksGrid);
};

// Set bg color for main nav upon scroll
mainSection.addEventListener("scroll", () => {
  if (mainSection.scrollTop > 340) {
    if (!mainNav.classList.contains("bg-on")) {
      mainNav.classList.add("bg-on");
    }
  } else if (mainNav.classList.contains("bg-on")) {
    mainNav.classList.remove("bg-on");
  }
});
