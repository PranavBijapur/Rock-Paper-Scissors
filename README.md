# 8-Bit Rock Paper Scissors

A small retro-styled Rock-Paper-Scissors browser game with keyboard controls, animated battle effects, score/lives, and persistent high score via `localStorage`.

---

## Features
- Pixel/8-bit UI (HTML + CSS)
- Click or keyboard controls: `[1]` = Rock, `[2]` = Paper, `[3]` = Scissors
- Round counter, player & CPU scores, and 3 lives
- Battle animation for each round
- High score persisted in `localStorage`
- Game Over overlay that waits for a click to return to the menu

---

## Files
```
index.html       # Game UI and screen layout
styles.css       # Styling and animations
script.js        # Game logic, screen handling, high score, animations
README.md        # This file
```

---

## How to run
1. Open `index.html` in a modern browser (Chrome/Edge/Firefox).  
   OR (recommended) serve via a simple local server:
```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

---

## Controls
- Click Rock / Paper / Scissors buttons  
- Keyboard: press **1**, **2**, or **3** while playing  
- Menu: **START GAME**, **HOW TO PLAY**, **HIGH SCORE**, **RESET**, **MENU**

---

## Behavior notes
- Player starts with 3 hearts (lives). Each loss reduces one heart.
- When lives reach 0 the Game Over overlay appears. Click anywhere to return to the main menu.
- High score updates automatically when you beat your previous best and is stored in the browser (`localStorage`).

---

## Quick customization
- Change starting lives: edit `playerLives` initial value in `script.js`.
- Change scoring: modify the points added on win/lose in `playRound()`.
- Change keyboard keys: update the `keydown` handler in `script.js`.

---

## Troubleshooting
- If high score doesn’t update, check browser settings — `localStorage` must be enabled.
- If visuals look broken, clear cache or try a modern browser.

---

## License
MIT — feel free to use and modify.
