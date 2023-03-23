const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
var score = 0;
var level = 1;
var lastCactusPosition = -1;
let previousScoreCheckpoint = 0;

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300);
    }
}

function updateLevel() {
    document.getElementById("level").innerHTML = "Level: " + level;
  }

  updateLevel();

function updateScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
    if (score - previousScoreCheckpoint >= 5) {
        previousScoreCheckpoint = score;
        updateCactusSpeed();
    }
}

function updateCactusSpeed() {
    const initialSpeed = 1.5;
    const speedFactor = 1.05;
    const speedIncreaseCount = Math.floor(previousScoreCheckpoint / 5);
    const updatedSpeed = initialSpeed / Math.pow(speedFactor, speedIncreaseCount);
    level++;
    updateLevel();
    setTimeout(() => {
        cactus.style.setProperty("--cactus-animation-duration", `${updatedSpeed}s`);
    }, 1200); // You can adjust the delay duration as needed
}

let checkAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Check for collision
    if (cactusLeft > 15 && cactusLeft < 30 && dinoTop >= 143) {
        dino.style.animationPlayState = 'paused';
        cactus.style.animationPlayState = 'paused';
        alert("You died, Your score is " + score + ", Level: " + level);
        window.location.reload();
    } else {
        if (cactusLeft >= 570 && cactusLeft <= 600 && !hasScoreUpdated) {
            score++;
            updateScore();
            hasScoreUpdated = true;
        } else if (cactusLeft < 570) {
            hasScoreUpdated = false;
        }
    }
}
, 10);

document.addEventListener("keydown", function (event) {
    jump();
});
