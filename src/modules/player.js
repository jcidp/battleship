import Gameboard from "./gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
    this.shotsAvailable = Array.from(Array(100).fill(), (_, i) => i + 1);
  }

  attack(enemy, coordinates) {
    const shotNumber =
      this.board.constructor.getNumberFromCoordinates(coordinates);
    if (!this.shotsAvailable.includes(shotNumber)) return false;
    enemy.board.receiveAttack(coordinates);
    this.shotsAvailable = this.shotsAvailable.filter((n) => n !== shotNumber);
    return true;
  }

  makeRandomAttack(enemy) {
    const coordinates = this.board.constructor.getCoordinatesFromNumber(
      this.shotsAvailable[
        Math.floor(Math.random() * this.shotsAvailable.length)
      ],
    );
    this.attack(enemy, coordinates);
    return coordinates;
  }

  getName() {
    return this.name;
  }

  getBoard() {
    return this.board.board;
  }
}

export default Player;
