class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (this.hits < this.length) return this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}

export default Ship;
