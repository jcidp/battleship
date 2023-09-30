class Ship {
  constructor(length, startCoordinates, direction) {
    this.length = length;
    this.startCoordinates = startCoordinates;
    this.direction = direction;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) this.hits++;
    return this.hits;
  }

  isSunk() {
    return this.hits === this.length;
  }
}

export default Ship;
