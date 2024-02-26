const circle = document.querySelectorAll(".circlecontainer");
const c4Row = document.querySelectorAll(".row-container");
const Modal = document.getElementById("ResponseModal");

const playerObject = [
  {
    Id: 1,
    color: "red",
    wins: 0,
  },
  {
    Id: 2,
    color: "yellow",
    wins: 0,
  },
];
const checkWin = function (grid) {
  // Check rows
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col <= grid[row].length - 4; col++) {
      if (
        grid[row][col] !== 0 &&
        grid[row][col] === grid[row][col + 1] &&
        grid[row][col] === grid[row][col + 2] &&
        grid[row][col] === grid[row][col + 3]
      ) {
        return true; // Found a win in the row
      }
    }
  }

  // Check columns
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 0; row <= grid.length - 4; row++) {
      if (
        grid[row][col] !== 0 &&
        grid[row][col] === grid[row + 1][col] &&
        grid[row][col] === grid[row + 2][col] &&
        grid[row][col] === grid[row + 3][col]
      ) {
        return true; // Found a win in the column
      }
    }
  }

  // Check diagonals (from bottom-left to top-right)
  for (let row = 3; row < grid.length; row++) {
    for (let col = 0; col <= grid[row].length - 4; col++) {
      if (
        grid[row][col] !== 0 &&
        grid[row][col] === grid[row - 1][col + 1] &&
        grid[row][col] === grid[row - 2][col + 2] &&
        grid[row][col] === grid[row - 3][col + 3]
      ) {
        return true; // Found a win in the diagonal
      }
    }
  }

  // Check diagonals (from top-left to bottom-right)
  for (let row = 0; row <= grid.length - 4; row++) {
    for (let col = 0; col <= grid[row].length - 4; col++) {
      if (
        grid[row][col] !== 0 &&
        grid[row][col] === grid[row + 1][col + 1] &&
        grid[row][col] === grid[row + 2][col + 2] &&
        grid[row][col] === grid[row + 3][col + 3]
      ) {
        return true; // Found a win in the diagonal
      }
    }
  }

  return false; // No win condition found
};

let currentPlayer = 0;

const grid = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const currentTurn = function () {
  if (currentPlayer >= 1) {
    currentPlayer = 0;
  } else {
    currentPlayer++;
  }
};
const ReturnEmptyPosition = function (rowToGet) {
  const targetRow = grid[rowToGet];
  for (let i = targetRow.length - 1; i >= 0; i--) {
    if (targetRow[i] == 0) {
      return i;
    }
  }
};
const playerWin = document.createElement("p");

for (let i = 0; i < c4Row.length; i++) {
  c4Row[i].addEventListener("click", (e) => {
    const { Id, color } = playerObject[currentPlayer];

    if (checkWin(grid) == true) {
      Modal.classList.remove("hidden");
      Modal.appendChild(playerWin);
    } else {
      const children = c4Row[i].children;
      const test = ReturnEmptyPosition(i);
      grid[i][test] = Id;
      children[test].classList.add(color);
      if (checkWin(grid) != true) {
        currentTurn();
      } else {
        playerWin.textContent = `Player ${Id} wins`;

        Modal.appendChild(playerWin);
        Modal.classList.remove("hidden");
      }
    }
  });
}
