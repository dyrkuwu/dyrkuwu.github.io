// Get audio element and control buttons
const audio = document.getElementById("song");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const seekSlider = document.getElementById("seekSlider");
const volumeSlider = document.getElementById("volumeSlider");
const timeLabel = document.querySelector(".time-crnt");
const songTitle = document.querySelector(".song-title");
const volumeLabel = document.getElementById("volumeLabel");

let isSeeking = false; // Flag to track if the slider is being actively dragged

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}

if (playBtn && audio && seekSlider) {
  playBtn.addEventListener("click", function() {
    if (audio.currentTime === 0) {
      audio.currentTime = seekSlider.value; // Set the current time to the slider value
    }
    audio.play();
    songTitle.textContent = 'Pet in TV OST - M2';
  });
}

if (pauseBtn && audio) {
  pauseBtn.addEventListener("click", function() {
    audio.pause();
  });
}

if (stopBtn && audio && seekSlider) {
  stopBtn.addEventListener("click", function() {
    audio.pause();
    audio.currentTime = 0;
    seekSlider.value = 0;
  });
}

if (audio && timeLabel && seekSlider) {
  audio.addEventListener("timeupdate", function() {
    if (!isSeeking) {
      seekSlider.value = audio.currentTime;
    }
    timeLabel.textContent = formatTime(audio.currentTime);
  });
}

if (seekSlider && audio) {
  seekSlider.addEventListener("input", function() {
    isSeeking = true;
    audio.currentTime = Math.floor(seekSlider.value);
  });
}

if (audio && seekSlider) {
  if (audio.readyState >= 1) {
    // Metadata already loaded
    seekSlider.max = audio.duration;
  } else {
    // Wait for metadata to load
    audio.addEventListener("loadedmetadata", function() {
      seekSlider.max = audio.duration;
    });
  }
}

if (seekSlider) {
  seekSlider.addEventListener("change", function() {
    isSeeking = false;
  });
}

if (volumeSlider && audio && volumeLabel) {
  volumeSlider.addEventListener("input", function() {
    audio.volume = volumeSlider.value;
    const volumePercentage = Math.floor(volumeSlider.value * 100);
    volumeLabel.textContent = `${volumePercentage}%`;
  });
}

function simulateTyping() {
  var characters = 'abcdefghijklmnopqrstuvwxyz    ';
  var typingSpeed = 100;
  var pauseDuration = 2000;
  var typingElement = document.getElementById('typingbox');
  var currentText = typingElement.value;
  var randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
  typingElement.value = currentText + (randomCharacter);
  var isSpace = (randomCharacter === ' ');
  var typingDelay = Math.floor(Math.random() * typingSpeed) + 50;
  typingElement.scrollTop = typingElement.scrollHeight;

  setTimeout(function () {
    if (isSpace) {
      setTimeout(simulateTyping, pauseDuration);
    } else {
      simulateTyping();
    }
  }, typingDelay);
}

window.onload = simulateTyping;