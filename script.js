document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        if (!boardState.includes("")) {
            return "Tie";
        }

        return null;
    }

    function updateBoard() {
        board.innerHTML = "";
        message.innerText = `Player ${currentPlayer}'s turn`;
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = boardState[i];
            cell.addEventListener("click", () => {
                if (!boardState[i] && !checkWinner()) {
                    boardState[i] = currentPlayer;
                    cell.textContent = currentPlayer;
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    message.innerText = `Player ${currentPlayer}'s turn`;
                    const winner = checkWinner();
                    if (winner) {
                        if (winner === "Tie") {
                            message.innerText = "It's a tie!";
                            resetButton.innerText = "New Game"
                        } else {
                            message.innerText = `Player ${winner} wins!`;
                            resetButton.innerText = "New Game"
                        }
                    }
                }
                
            });
            board.appendChild(cell);
        }
    }

    resetButton.addEventListener("click", () => {
        currentPlayer = "X";
        boardState = ["", "", "", "", "", "", "", "", ""];
        message.innerText = "";
        resetButton.innerText = "Reset";
        updateBoard();
    });

    updateBoard();
});
