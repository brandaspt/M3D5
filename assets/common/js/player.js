/*
##############################
Global Selectors
##############################
*/
const playerTrackTitle = document.getElementById("player-track-title");
const playerTrackImg = document.getElementById("player-track-img");
const playerTrackArtist = document.getElementById("player-track-artist");
const playerDuration = document.getElementById("player-duration");

// Initialize music player
export const initMusicPlayer = (tracksGrid) => {
  let firstCard = tracksGrid.querySelector(".card");
  if(!firstCard) {
    firstCard = tracksGrid.querySelector('.song')
  }
  updatePlayerInfo(firstCard);
};

// Play track
export const playTrack = (card) => {
  const previousPlaying = document.querySelector(".playing");
  if (previousPlaying) {
    previousPlaying.querySelector("audio").pause();
    previousPlaying.classList.remove("playing");
  }

  // Card containing the clicked butto
  card.classList.add("playing");

  // Audio element associated with the clicked button
  const audioEl = card.querySelector("audio");

  // Start playing audio
  audioEl.play();

  // Update footer player
  // Track Info
  updatePlayerInfo(card);
  
  // Player controls
  document.querySelector(".music-player").classList.add("playing");
};

// Pause track
export const pauseTrack = () => {
  const nowPlaying = document.querySelector(".playing");
  nowPlaying.querySelector("audio").pause();
  nowPlaying.classList.remove("playing");
  document.querySelector(".music-player").classList.remove("playing");
};

export const playerSongCard = (cardsGrid) => {
  const trackName = playerTrackTitle.innerText;

  const allCards = cardsGrid.querySelectorAll(".card").length !== 0 ? cardsGrid.querySelectorAll(".card") : cardsGrid.querySelectorAll(".row");
  for (const card of allCards) {
    if (card.querySelector(".card-title").innerText === trackName) {
      return card;
    }
  }
};

// Change active link on main nav
export const activeNavLink = (e) => {
  // Remove class from previous active
  const previousActive = document.querySelector(".main-nav a.active");
  previousActive.classList.remove("active");

  // Add class to new active
  e.currentTarget.classList.add("active");
};

/*
##############################
Helper Functions
##############################
*/
const updatePlayerInfo = (card) => {
  card.querySelector(".card-img-top") ? playerTrackImg.src = card.querySelector(".card-img-top").src : null
  playerTrackTitle.innerText = card.querySelector(".card-title") ? card.querySelector(".card-title").innerText : card.querySelector('h6').innerText
  playerTrackArtist.innerText = document.querySelector("h1")
    ? document.querySelector("h1").innerText
    : card.querySelector(".track-artist").innerText;
  playerDuration.innerText = card.querySelector(".card-text").innerText;
};

export const secsToMins = (seconds) => {
  const intMins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;

  return `${intMins}:${("0" + remainingSecs).slice(-2)}`;
};
