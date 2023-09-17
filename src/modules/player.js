import Gameboard from "./gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
    this.shotsAvailable = Array.from(Array(100).fill(), (_, i) => i + 1);
  }

  attack(enemy, coordinates) {
    const shotIndex = this.constructor.getNumberFromCoordinates(coordinates);
    if (!this.shotsAvailable.includes(shotIndex)) return;
    enemy.board.receiveAttack(coordinates);
    this.shotsAvailable = this.shotsAvailable.filter((n) => n !== shotIndex);
  }

  static getNumberFromCoordinates(coordinates) {
    return (coordinates.charCodeAt(0) - 65) * 10 + +coordinates.slice(1);
  }

  static getCoordinatesFromNumber(n) {
    return `${String.fromCharCode(Math.floor((n - 1) / 10) + 65)}${n % 10}`;
  }

  makeRandomAttack(enemy) {
    const coordinates = this.constructor.getCoordinatesFromNumber(
      this.shotsAvailable[
        Math.floor(Math.random() * this.shotsAvailable.length) + 1
      ],
    );
    this.attack(enemy, coordinates);
    return coordinates;
  }

  getPlayerName() {
    return this.name;
  }
}

export default Player;
