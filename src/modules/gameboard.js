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

  fillBoardWithShips() {
    this.placeShipRandomly(5);
    this.placeShipRandomly(4);
    this.placeShipRandomly(3);
    this.placeShipRandomly(3);
    this.placeShipRandomly(2);
  }

  resetBoard() {
    this.cleanBoard();
    this.fillBoardWithShips();
  }

  cleanBoard() {
    this.board.forEach((row) => {
      row.forEach((cell) => {
        cell.attacked = false;
        cell.ship = null;
      });
    });
  }

  placeShip(start, end) {
    const [startCol, startRow] =
      this.constructor.getIndexesFromCoordinates(start);
    if (!end) {
      this.board[startRow][startCol].ship = new Ship(1, start, "h");
      return;
    }
    const [endCol, endRow] = this.constructor.getIndexesFromCoordinates(end);
    const distance =
      startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    const ship = new Ship(distance, start, startRow === endRow ? "h" : "v");
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) this.board[startRow][startCol + i].ship = ship;
      else this.board[startRow + i][startCol].ship = ship;
    }
  }

  static forEachPositionCell(startCoordinates, ship, fn) {
    const [startCol, startRow] =
      this.getIndexesFromCoordinates(startCoordinates);
    const result = [];
    for (let i = 0; i < ship.length; i++) {
      if (ship.direction === "h") result.push(fn(startRow, startCol + i));
      else result.push(fn(startRow + i, startCol));
    }
    return result;
  }

  moveShip(sourceCoordinates, targetCoordinates) {
    const { ship } = this.getCoordinates(sourceCoordinates);
    const newCoordinates = this.constructor.forEachPositionCell(
      targetCoordinates,
      ship,
      (row, col) => this.isCoordinateFree(row, col, ship),
    );
    if (!newCoordinates.every((cell) => cell))
      throw new Error("Target position is occupied");
    this.constructor.forEachPositionCell(
      sourceCoordinates,
      ship,
      (row, col) => {
        this.board[row][col].ship = null;
      },
    );
    this.constructor.forEachPositionCell(
      targetCoordinates,
      ship,
      (row, col) => {
        this.board[row][col].ship = ship;
      },
    );
  }

  isCoordinateFree(row, col, ship) {
    if (
      this.board[row][col].ship &&
      (!ship || this.board[row][col].ship !== ship)
    )
      return false;
    if (
      row > 0 &&
      this.board[row - 1][col].ship &&
      (!ship || this.board[row - 1][col].ship !== ship)
    )
      return false;
    if (
      col < 9 &&
      this.board[row][col + 1].ship &&
      (!ship || this.board[row][col + 1].ship !== ship)
    )
      return false;
    if (
      row < 9 &&
      this.board[row + 1][col].ship &&
      (!ship || this.board[row + 1][col].ship !== ship)
    )
      return false;
    if (
      col > 0 &&
      this.board[row][col - 1].ship &&
      (!ship || this.board[row][col - 1].ship !== ship)
    )
      return false;
    return true;
  }

  isPositionValid(start, end) {
    const [startCol, startRow] =
      this.constructor.getIndexesFromCoordinates(start);
    const [endCol, endRow] = this.constructor.getIndexesFromCoordinates(end);
    const distance =
      startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) {
        if (!this.isCoordinateFree(startRow, startCol + i)) return false;
      } else if (!this.isCoordinateFree(startRow + i, startCol)) {
        return false;
      }
    }
    return true;
  }

  placeShipRandomly(length) {
    let initialPosition;
    let finalPosition;
    let validPosition = false;
    while (!validPosition) {
      initialPosition = this.constructor.getCoordinatesFromNumber(
        Math.floor(Math.random() * 100) + 1,
      );
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      if (direction === "horizontal") {
        finalPosition =
          String.fromCharCode(
            initialPosition.charCodeAt(0) + length - 1 <= 74
              ? initialPosition.charCodeAt(0) + length - 1
              : initialPosition.charCodeAt(0) - length + 1,
          ) + initialPosition.slice(1);
      } else {
        const initialNumber = +initialPosition.slice(1);
        finalPosition =
          initialPosition[0] +
          (initialNumber + length - 1 <= 10
            ? initialNumber + length - 1
            : initialNumber - length + 1);
      }
      if (
        initialPosition.charCodeAt(0) > finalPosition.charCodeAt(0) ||
        +initialPosition.slice(1) > +finalPosition.slice(1)
      ) {
        [initialPosition, finalPosition] = [finalPosition, initialPosition];
      }
      validPosition = this.isPositionValid(initialPosition, finalPosition);
    }
    this.placeShip(initialPosition, finalPosition);
  }

  static getIndexesFromCoordinates(coordinates) {
    const colIndex = coordinates.charCodeAt(0) - 65;
    const rowIndex = +coordinates.slice(1) - 1;
    if (colIndex < 0 || colIndex > 9 || rowIndex < 0 || rowIndex > 9)
      throw new Error("Invalid Coordinates");
    return [colIndex, rowIndex];
  }

  static getNumberFromCoordinates(coordinates) {
    return coordinates.charCodeAt(0) - 64 + +coordinates.slice(1) * 10 - 10;
  }

  static getCoordinatesFromNumber(n) {
    return `${String.fromCharCode((n % 10 === 0 ? 10 : n % 10) + 64)}${
      Math.floor(n / 10) + (n % 10 === 0 ? 0 : 1)
    }`;
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
