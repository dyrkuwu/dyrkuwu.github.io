// Get audio element and control buttons
const audio = document.getElementById("song");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const seekSlider = document.querySelector("seekSlider");
const timeLabel = document.querySelector(".time-crnt");
const songTitle = document.querySelector(".song-title");

let isSeeking = false; // Flag to track if the slider is being actively dragged

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}

// Play audio
playBtn.addEventListener("click", function() {
  if (audio.currentTime === 0) {
    audio.currentTime = seekSlider.value; // Set the current time to the slider value
  }
  audio.play();
  songTitle.textContent = 'Pet in TV OST - M2'
});

// Pause audio
pauseBtn.addEventListener("click", function() {
  audio.pause();
});

// Stop audio and reset slider
stopBtn.addEventListener("click", function() {
  audio.pause();
  audio.currentTime = 0;
  seekSlider.value = 0;
});

// Update slider position as audio plays
audio.addEventListener("timeupdate", function() {
  if (!isSeeking) {
    seekSlider.value = audio.currentTime;
  }
  timeLabel.textContent = formatTime(audio.currentTime);
});

// Update audio position when slider is moved
seekSlider.addEventListener("input", function() {
  isSeeking = true;
  audio.currentTime = Math.floor(seekSlider.value);
  console.log(audio.currentTime);
});

// Update slider max value when audio is loaded
audio.addEventListener("loadedmetadata", function() {
  seekSlider.max = audio.duration;
});

// Update isSeeking flag when slider drag ends
seekSlider.addEventListener("change", function() {
  isSeeking = false;
});

