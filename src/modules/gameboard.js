import Ship from "./ship";

class Gameboard {
  constructor() {
    this.board = this.fillBoard();
  }

  fillBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const obj = {};
      for (let j = 0; j < 10; j++) {
        obj[String.fromCharCode(65 + j)] = null;
      }
      board.push(obj);
    }
    return board;
  }

  placeShip(startCol, startRow, endCol, endRow) {
    const rowDistance = !endRow ? 1 : endRow - startRow + 1;
    const colDistance = !endCol
      ? 1
      : endCol.charCodeAt(0) - startCol.charCodeAt(0) + 1;
    const direction = rowDistance === 1 ? "column" : "row";
    const distance = direction === "row" ? rowDistance : colDistance;
    const ship = new Ship(distance);
    if (direction === "row") {
      for (let i = 0; i < distance; i++) {
        this.board[startRow - 1 + i][startCol] = ship;
      }
    } else {
      for (let i = 0; i < distance; i++) {
        this.board[startRow - 1][
          String.fromCharCode(startCol.charCodeAt(0) + i)
        ] = ship;
      }
    }
  }

  getCoordinates(col, row) {
    return this.board[row - 1][col];
  }

  receiveAttack(col, row) {
    const ship = this.getCoordinates(col, row);
    if (ship) {
      ship.hit();
    } else {
      this.board[row - 1][col] = "miss";
    }
  }

  haveAllShipsSunk() {
    return this.board
      .map((row) =>
        Object.keys(row)
          .map((cell) => row[cell])
          .filter((cell) => cell !== null && cell !== "miss")
          .every((ship) => ship.isSunk()),
      )
      .every((row) => row);
  }
}

export default Gameboard;
