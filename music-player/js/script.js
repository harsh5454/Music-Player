const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");

// Check if playing
let isPlaying = false;
// Current Song Index
let songIndex = 0;

// Music
const songs = [
  {
    name: "song-1",
    displayName: "Кажи ми",
    artist: "Atanas Kolev",
  },
  {
    name: "song-2",
    displayName: "Забележки",
    artist: "Dim4ou",
  },
  {
    name: "song-3",
    displayName: "Не те забравям",
    artist: "Preslava",
  },
  {
    name: "song-4",
    displayName: "Един на брой",
    artist: "Galin",
  },
  {
    name: "song-5",
    displayName: "I've Been Thinking",
    artist: "Sevenhills",
  }
];

// Random Background Color
const randomBgColor = function () {
  // Get a random number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color with the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

// Update DOM
const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
  randomBgColor();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Mute/Unmute
const toggleMute = function () {
  if (music.muted) {
    music.muted = false;
    volumeSlider.value = 50;
    volumeBtn.classList.replace("fa-volume-mute", "fa-volume-up");
    volumeBtn.setAttribute("title", "Mute");
  } else {
    music.muted = true;
    volumeSlider.value = 0;
    volumeBtn.classList.replace("fa-volume-up", "fa-volume-mute");
    volumeBtn.setAttribute("title", "Unmute");
  }
}

// Update Progress Bar & Time
const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Next Song
const nextSong = function () {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Previous Song
const prevSong = function () {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Set Progress Bar
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
};

// Set Volume
const setVolume = function () {
  music.volume = volumeSlider.value / 100;
};

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
volumeBtn.addEventListener("click", toggleMute);
progressContainer.addEventListener("click", setProgressBar);