let currentPlayer = 1;
let gameStarted = false;
let player1Ships = [];
let player2Ships = [];
let player1Shots = [];
let player2Shots = [];
let player1Hits = [];
let player2Hits = [];

const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let placedShips = 0;

function createBoard(player, type) {
    const grid = document.getElementById(`player${player}-${type}`);
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        if (type === 'ships') {
            cell.addEventListener('click', () => placeShip(player, i));
        } else if (type === 'shots') {
            cell.addEventListener('click', () => shoot(player, i));
        }
        grid.appendChild(cell);
    }
}

function placeShip(player, index) {
    if (gameStarted || placedShips >= shipLengths.length) return;

    const grid = document.getElementById(`player${player}-ships`);
    const cell = grid.children[index];

    if (cell.classList.contains('ship')) {
        cell.classList.remove('ship');
        placedShips--;
        if (player === 1) {
            player1Ships.splice(player1Ships.indexOf(index), 1);
        } else {
            player2Ships.splice(player2Ships.indexOf(index), 1);
        }
    } else {
        cell.classList.add('ship');
        placedShips++;
        if (player === 1) {
            player1Ships.push(index);
        } else {
            player2Ships.push(index);
        }
    }
}

function submitShips(player) {
    if (gameStarted || placedShips !== shipLengths.length) return;

    const button = document.getElementById(`player${player}-submit`);
    button.disabled = true;

    if (player === 1) {
        currentPlayer = 2;
        window.location.href = 'setup_player2.html';
    } else {
        gameStarted = true;
        window.location.href = 'play.html';
    }
}

function shoot(player, index) {
    if (!gameStarted || currentPlayer !== player) return;

    const shotsGrid = document.getElementById(`player${player}-shots`);
    const cell = shotsGrid.children[index];

    if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

    const opponentShips = player === 1 ? player2Ships : player1Ships;
    const shots = player === 1 ? player1Shots : player2Shots;

    shots.push(index);

    if (opponentShips.includes(index)) {
        cell.classList.add('hit');
        (player === 1 ? player1Hits : player2Hits).push(index);
        checkGameEnd();
    } else {
        cell.classList.add('miss');
        changeTurn();
    }
}

function changeTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-turn').innerText = currentPlayer;
    setTimeout(() => {
        alert(`Zmiana gracza na Gracza ${currentPlayer}`);
    }, 3000);
}

function checkGameEnd() {
    const totalHits = (player) => document.querySelectorAll(`#player${player}-shots .hit`).length;
    const player1Hits = totalHits(1);
    const player2Hits = totalHits(2);

    if (player1Hits === shipLengths.reduce((a, b) => a + b, 0)) {
        endGame(1);
    } else if (player2Hits === shipLengths.reduce((a, b) => a + b, 0)) {
        endGame(2);
    }
}

function endGame(winner) {
    gameStarted = false;
    sessionStorage.setItem('winner', winner);
    window.location.href = 'endgame.php';
}

document.getElementById('player1-submit').addEventListener('click', () => submitShips(1));
document.getElementById('player2-submit').addEventListener('click', () => submitShips(2));
document.getElementById('end-turn').addEventListener('click', changeTurn);

createBoard(1, 'ships');
createBoard(1, 'shots');
createBoard(2, 'ships');
createBoard(2, 'shots');