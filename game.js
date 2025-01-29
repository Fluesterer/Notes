document.addEventListener("DOMContentLoaded", function() {
    const rows = 6;
    const cols = 7;
    const board = document.getElementById("board");
    const statusEl = document.getElementById("status");

    let currentPlayer = 'red'; // 'red' für den menschlichen Spieler und 'blue' für die KI
    let gameOver = false;
    let grid = Array.from(Array(rows), () => Array(cols).fill(null));

    // Funktion, um das Spielfeld zu erstellen
    function createBoard() {
        board.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let col = 0; col < cols; col++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.row = row;
                cellDiv.dataset.col = col;
                rowDiv.appendChild(cellDiv);
            }
            board.appendChild(rowDiv);
        }
    }

    // Funktion, um einen Zug zu machen
    function makeMove(row, col, player) {
        if (grid[row][col] === null) {
            grid[row][col] = player;
            return true;
        }
        return false;
    }

    // Funktion, um zu prüfen, ob der aktuelle Spieler gewonnen hat
    function checkWin(player) {
        // Überprüfe horizontale, vertikale und diagonale Linien
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (grid[row][col] === player) {
                    if (checkDirection(row, col, 1, 0, player) || // Horizontal
                        checkDirection(row, col, 0, 1, player) || // Vertikal
                        checkDirection(row, col, 1, 1, player) || // Diagonal /
                        checkDirection(row, col, 1, -1, player)) { // Diagonal \
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Funktion, um zu überprüfen, ob es eine Gewinnlinie in einer bestimmten Richtung gibt
    function checkDirection(row, col, dRow, dCol, player) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
            let r = row + dRow * i;
            let c = col + dCol * i;
            if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        return count === 4;
    }

    // KI-Zug (Wählt eine zufällige Spalte)
    function aiMove() {
        let availableCols = [];
        for (let col = 0; col < cols; col++) {
            if (grid[0][col] === null) {
                availableCols.push(col);
            }
        }

        // Wähle eine zufällige Spalte und setze den Zug
        const col = availableCols[Math.floor(Math.random() * availableCols.length)];
        for (let row = rows - 1; row >= 0; row--) {
            if (grid[row][col] === null) {
                makeMove(row, col, 'blue');
                break;
            }
        }

        // Überprüfe, ob KI gewonnen hat
        if (checkWin('blue')) {
            statusEl.textContent = "Die KI hat gewonnen!";
            gameOver = true;
        } else {
            currentPlayer = 'red';
            statusEl.textContent = "Dein Zug!";
        }
    }

    // Event Listener für Benutzerzug
    board.addEventListener("click", function(event) {
        if (gameOver) return;

        const cell = event.target;
        const col = parseInt(cell.dataset.col);

        // Finde den ersten freien Platz in der Spalte
        for (let row = rows - 1; row >= 0; row--) {
            if (grid[row][col] === null) {
                makeMove(row, col, currentPlayer);
                break;
            }
        }

        // Überprüfe, ob der Spieler gewonnen hat
        if (checkWin('red')) {
            statusEl.textContent = "Du hast gewonnen!";
            gameOver = true;
        } else {
            currentPlayer = 'blue';
            statusEl.textContent = "KI ist am Zug...";
            aiMove();
        }
    });

    // Initialisiere das Spiel
    createBoard();
});
