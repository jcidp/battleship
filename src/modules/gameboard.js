import Ship from "./ship";

class Gameboard {
  constructor() {
    // this.board = Array(10).fill(Array(10).fill(null));
    this.board = this.constructor.fillBoard();
  }

  static fillBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push({ attacked: false, ship: null });
      }
      board.push(row);
    }
    return board;
  }

  placeShip(start, end) {
    const [startCol, startRow] =
      this.constructor.getIndexesFromCoordinates(start);
    if (!end) {
      this.board[startRow][startCol].ship = new Ship(1);
      return;
    }
    const [endCol, endRow] = this.constructor.getIndexesFromCoordinates(end);
    const distance =
      startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    const ship = new Ship(distance);
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) this.board[startRow][startCol + i].ship = ship;
      else this.board[startRow + i][startCol].ship = ship;
    }
  }

  static getIndexesFromCoordinates(coordinates) {
    return [coordinates.charCodeAt(0) - 65, +coordinates.slice(1) - 1];
  }

  getCoordinates(coordinates) {
    const [col, row] = this.constructor.getIndexesFromCoordinates(coordinates);
    return this.board[row][col];
  }

  receiveAttack(coordinates) {
    const cell = this.getCoordinates(coordinates);
    if (cell.attacked) throw new Error("Repeated coordinates");
    if (cell.ship) {
      cell.ship.hit();
    }
    const [col, row] = this.constructor.getIndexesFromCoordinates(coordinates);
    this.board[row][col].attacked = true;
  }

  haveAllShipsSunk() {
    return this.board.every((row) =>
      row.every((cell) => !cell.ship || cell.ship.isSunk()),
    );
  }
}

export default Gameboard;
