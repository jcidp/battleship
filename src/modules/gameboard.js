import Ship from "./ship";

class Gameboard {
  constructor() {
    this.board = Array(10).fill(Array(10).fill(null));
  }

  placeShip(start, end) {
    const [startCol, startRow] =
      this.constructor.getIndexesFromCoordinates(start);
    if (!end) {
      this.board[startRow][startCol] = new Ship(1);
      return;
    }
    const [endCol, endRow] = this.constructor.getIndexesFromCoordinates(end);
    const distance =
      startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    const ship = new Ship(distance);
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) this.board[startRow][startCol + i] = ship;
      else this.board[startRow + i][startCol] = ship;
    }
  }

  static getIndexesFromCoordinates(coordinates) {
    return [coordinates.charCodeAt(0) - 65, +coordinates[1] - 1];
  }

  getCoordinates(coordinates) {
    const [col, row] = this.constructor.getIndexesFromCoordinates(coordinates);
    return this.board[row][col];
  }

  receiveAttack(coordinates) {
    // TODO: How will I ensure I don't attack the same ship in the same coordinates twice?
    const ship = this.getCoordinates(coordinates);
    if (ship) {
      ship.hit();
    } else {
      const [col, row] =
        this.constructor.getIndexesFromCoordinates(coordinates);
      this.board[row][col] = "miss";
    }
  }

  haveAllShipsSunk() {
    return this.board.every((row) =>
      row.every((cell) => cell === null || cell === "miss" || cell.isSunk()),
    );
  }
}

export default Gameboard;
