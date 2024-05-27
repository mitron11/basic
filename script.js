const boardElement = document.getElementById('board');
const playerHealthElement = document.getElementById('player-health');
const enemyHealthElement = document.getElementById('enemy-health');
const upButton = document.getElementById('up-btn');
const downButton = document.getElementById('down-btn');
const leftButton = document.getElementById('left-btn');
const rightButton = document.getElementById('right-btn');

const boardSize = 5;
const initialPlayerHealth = 100;
const initialEnemyHealth = 50;

let playerHealth = initialPlayerHealth;
let enemyHealth = initialEnemyHealth;
let playerPosition = { x: 0, y: 0 };
let enemyPosition = { x: 4, y: 4 };

function createBoard() {
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;
            boardElement.appendChild(cell);
        }
    }
    updateBoard();
}

function updateBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('player', 'enemy');
    });
    const playerCell = document.querySelector(`.cell[data-x='${playerPosition.x}'][data-y='${playerPosition.y}']`);
    const enemyCell = document.querySelector(`.cell[data-x='${enemyPosition.x}'][data-y='${enemyPosition.y}']`);
    playerCell.classList.add('player');
    enemyCell.classList.add('enemy');
}

function updateHealth() {
    playerHealthElement.textContent = `Salud: ${playerHealth}`;
    enemyHealthElement.textContent = `Salud: ${enemyHealth}`;
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        if (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y) {
            startCombat();
        }
        updateBoard();
    }
}

function startCombat() {
    const playerAttack = Math.floor(Math.random() * 20) + 1;
    const enemyAttack = Math.floor(Math.random() * 15) + 1;

    enemyHealth -= playerAttack;
    playerHealth -= enemyAttack;

    if (enemyHealth <= 0) {
        enemyHealth = 0;
        alert('¡Has derrotado al enemigo!');
        resetGame();
    } else if (playerHealth <= 0) {
        playerHealth = 0;
        alert('¡Has sido derrotado!');
        resetGame();
    }

    updateHealth();
}

function resetGame() {
    playerHealth = initialPlayerHealth;
    enemyHealth = initialEnemyHealth;
    playerPosition = { x: 0, y: 0 };
    enemyPosition = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    updateBoard();
    updateHealth();
}

upButton.addEventListener('click', () => movePlayer(0, -1));
downButton.addEventListener('click', () => movePlayer(0, 1));
leftButton.addEventListener('click', () => movePlayer(-1, 0));
rightButton.addEventListener('click', () => movePlayer(1, 0));

createBoard();
updateHealth();
