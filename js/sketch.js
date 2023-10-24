var w = window.innerWidth;
var h = window.innerHeight;
var cells = 3;
var xUnit = Math.floor(w / cells);
var yUnit = Math.floor(h / cells);
var sounds = {
  "piano": new Array(cells),
  "band": new Array(cells)
}
var selectedMusicType = "piano";

function preload() {
  Object.keys(sounds).forEach(key => {
    for (let i = 0; i < cells; i++) {
      sounds[key][i] = new Array(cells);
      for (let j = 0; j < cells; j++) {
        let loadMusic = loadSound(`./assets/${key}${i}${j}.mp3`);
        sounds[key][i][j] = loadMusic;
      }
    }
  });
}

function setup() {
  // Create full screen responsive canvas
  canvas = createCanvas(w, h);
  background(108, 117, 125);
  noStroke();
  fill(238, 238, 228);

}

function draw() {
  if (mouseIsPressed) {
    let xCell = Math.floor(mouseX / xUnit);
    let yCell = Math.floor(mouseY / yUnit);
    ellipse(mouseX, mouseY, 40, 40);
    if (!sounds[selectedMusicType][xCell][yCell]?.isPlaying()) {
      // If music is not playing, play it
      sounds[selectedMusicType][xCell][yCell]?.play();
    }
  }
}

function resetSketch() {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      sounds[selectedMusicType][i][j].stop();
    }
  }
  background(108, 117, 125);
}

function changePen(colour) {
  resetSketch();
  if (colour === 'yellow') {
    selectedMusicType = "piano";
    fill(231, 180, 117);
  } else if (colour === 'white') {
    selectedMusicType = "band";
    fill(238, 238, 228);
  }
}
