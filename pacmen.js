// This array holds all the pacmen
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
const pacMen = [];
const intervals = [];

const btn = document.querySelector("button.start");
var direction = 0;
var pos = 0;
var motion = null;

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  newimg.style.position = "absolute";
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  newimg.style.zIndex = -1;
  newimg.direction = 0;
  newimg.chomp = 0;
  newimg.src = pacArray[newimg.direction][newimg.chomp];
  game.appendChild(newimg);
  // return details in an object
  return { position, velocity, newimg };
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

function update() {
  btn.disabled = true;
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    item.newimg.src = pacArray[item.newimg.direction][item.newimg.chomp];
    item.newimg.chomp = (item.newimg.chomp + 1) % 2;
  });
  motion = setTimeout(update, 75);
  intervals.push(motion);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
    item.newimg.direction = (item.newimg.direction + 1) % 2;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function hyperSpeed() {
  motion = setInterval(update, 75);
  intervals.push(motion);
}

function stop() {
  for (var i = 0; i < intervals.length; i++) {
    clearInterval(intervals[i]);
  }
  btn.disabled = false;
}

function reset() {
  for (var j = 0; j < pacMen.length; j++) {
    pacMen[j].newimg.remove();
  }
  stop();
}
