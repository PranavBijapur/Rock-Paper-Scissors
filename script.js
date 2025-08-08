// ===== Screen Elements =====
const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const howToPlayScreen = document.getElementById("howToPlayScreen");

// High Score Screen (created dynamically)
let highScoreScreen = document.createElement("div");
highScoreScreen.classList.add("screen");
highScoreScreen.innerHTML = `
    <div class="info-panel">
        <h2 class="pixel-title-small">HIGH SCORE</h2>
        <div id="highScoreDisplay" class="pixel-text"></div>
        <button id="backFromHighScore" class="pixel-btn primary">
            <span class="btn-icon">◄</span> BACK TO MENU
        </button>
    </div>
`;
document.getElementById("gameContainer").appendChild(highScoreScreen);

// ===== Buttons =====
const startBtn = document.getElementById("startBtn");
const howToPlayBtn = document.getElementById("howToPlayBtn");
const highScoreBtn = document.getElementById("highScoreBtn");
const backToMenuBtn = document.getElementById("backToMenuBtn");
const resetBtn = document.getElementById("resetBtn");
const menuBtn = document.getElementById("menuBtn");
const weaponButtons = document.querySelectorAll(".weapon-btn");

// ===== Game Elements =====
const playerChoiceDisplay = document.getElementById("playerChoiceDisplay");
const computerChoiceDisplay = document.getElementById("computerChoiceDisplay");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const roundNumberEl = document.getElementById("roundNumber");
const resultEl = document.getElementById("result");
const livesContainer = document.getElementById("livesContainer");
const battleAnimation = document.getElementById("battleAnimation");

// ===== Game State =====
let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;
let playerLives = 3;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;

// Weapon mapping
const weapons = {
    1: "🪨",
    2: "📄",
    3: "✂️"
};

// ===== Utility: Switch Screens =====
function showScreen(screen) {
    [menuScreen, gameScreen, howToPlayScreen, highScoreScreen].forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

// ===== Game Functions =====
function startGame() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    playerLives = 3;
    updateScores();
    updateLives();
    playerChoiceDisplay.textContent = "?";
    computerChoiceDisplay.textContent = "?";
    resultEl.textContent = "";
    resultEl.className = "result-display";
    showScreen(gameScreen);
}

function updateScores() {
    playerScoreEl.textContent = playerScore.toString().padStart(4, "0");
    computerScoreEl.textContent = computerScore.toString().padStart(4, "0");
    roundNumberEl.textContent = roundNumber.toString().padStart(2, "0");
}

function updateLives() {
    livesContainer.innerHTML = "♥".repeat(playerLives)
        .split("")
        .map(heart => `<span class="heart">${heart}</span>`)
        .join("");
}

function computerChoice() {
    return Math.floor(Math.random() * 3) + 1;
}

function playRound(playerChoiceNum) {
    const compChoiceNum = computerChoice();

    playerChoiceDisplay.textContent = weapons[playerChoiceNum];
    computerChoiceDisplay.textContent = weapons[compChoiceNum];

    triggerBattleAnimation();

    // Determine winner
    if (playerChoiceNum === compChoiceNum) {
        showResult("It's a Tie!", "tie");
    } else if (
        (playerChoiceNum === 1 && compChoiceNum === 3) ||
        (playerChoiceNum === 2 && compChoiceNum === 1) ||
        (playerChoiceNum === 3 && compChoiceNum === 2)
    ) {
        playerScore += 100;
        showResult("You Win!", "win");
    } else {
        computerScore += 100;
        playerLives--;
        showResult("You Lose!", "lose");
        if (playerLives <= 0) {
            gameOver();
            return;
        }
    }

    roundNumber++;
    updateScores();
    updateLives();
}

function triggerBattleAnimation() {
    battleAnimation.style.opacity = "1";
    battleAnimation.style.animation = "battleEffect 0.5s ease-in-out";
    setTimeout(() => {
        battleAnimation.style.opacity = "0";
        battleAnimation.style.animation = "";
    }, 500);
}

function showResult(message, resultClass) {
    resultEl.textContent = message;
    resultEl.className = `result-display ${resultClass}`;
}

function gameOver() {
    if (playerScore > highScore) {
        highScore = playerScore;
        localStorage.setItem("highScore", highScore);
        resultEl.textContent = "NEW HIGH SCORE!";
    } else {
        resultEl.textContent = "Game Over!";
    }
    resultEl.className = "result-display lose";

    // Wait 2 seconds, then return to menu
    setTimeout(() => {
        showScreen(menuScreen);
    }, 5000);
}

// ===== High Score Functions =====
function showHighScore() {
    document.getElementById("highScoreDisplay").textContent =
        highScore > 0 ? `Your High Score: ${highScore}` : "No games played yet.";
    showScreen(highScoreScreen);
}

// ===== Event Listeners =====
startBtn.addEventListener("click", startGame);
howToPlayBtn.addEventListener("click", () => showScreen(howToPlayScreen));
highScoreBtn.addEventListener("click", showHighScore);
backToMenuBtn.addEventListener("click", () => showScreen(menuScreen));
menuBtn.addEventListener("click", () => showScreen(menuScreen));
resetBtn.addEventListener("click", startGame);
document.getElementById("backFromHighScore").addEventListener("click", () => showScreen(menuScreen));

weaponButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const choice = parseInt(btn.dataset.choice);
        playRound(choice);
    });
});

// Keyboard controls: [1], [2], [3]
document.addEventListener("keydown", (event) => {
    if (["1", "2", "3"].includes(event.key) && gameScreen.classList.contains("active")) {
        playRound(parseInt(event.key));
    }
});
