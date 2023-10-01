import Gameboard from "../modules/gameboard";

test("Gameboard places ship of length 1 on A1", () => {
  const board = new Gameboard();
  board.placeShip("A1");
  expect(board.getCoordinates("A1").ship.length).toBe(1);
});

test("Gameboard places ship of length 1 on J10", () => {
  const board = new Gameboard();
  board.placeShip("J10");
  expect(board.getCoordinates("J10").ship.length).toBe(1);
});

test("getCoordinates returns null if there's no ship there", () => {
  const board = new Gameboard();
  expect(board.getCoordinates("A1").ship).toBeNull();
});

test("Gameboard places ship of length 2 vertically from A1 to A2", () => {
  const board = new Gameboard();
  board.placeShip("A1", "A2");
  expect(board.getCoordinates("A2").ship).toEqual(
    board.getCoordinates("A1").ship,
  );
  expect(board.getCoordinates("A2").ship.length).toBe(2);
  expect(board.getCoordinates("A1").ship.length).toBe(2);
});

test("Gameboard places ship of length 5 horizontally", () => {
  const board = new Gameboard();
  board.placeShip("F10", "J10");
  expect(board.getCoordinates("J10").ship).toEqual(
    board.getCoordinates("F10").ship,
  );
  expect(board.getCoordinates("H10").ship.length).toBe(5);
});

test("Gameboard receives attack on ship of length 1 on A1", () => {
  const board = new Gameboard();
  board.placeShip("A1");
  board.receiveAttack("A1");
  expect(board.getCoordinates("A1").ship.isSunk()).toBe(true);
});

test("A ship along different coordinates is the same ship", () => {
  const board = new Gameboard();
  board.placeShip("A1", "A2");
  board.placeShip("J10");
  board.receiveAttack("A2");
  expect(board.getCoordinates("A1").ship.hits).toBe(1);
  expect(board.getCoordinates("J10").ship.hits).toBe(0);
});

test("Gameboard receives records missed shot", () => {
  const board = new Gameboard();
  board.receiveAttack("A1");
  expect(board.getCoordinates("A1").attacked).toBe(true);
  expect(board.getCoordinates("A1").ship).toBeNull();
});

test("Gameboard throws error on repeated coordinates", () => {
  const board = new Gameboard();
  board.receiveAttack("A1");
  expect(() => board.receiveAttack("A1")).toThrow("Repeated coordinates");
});

test("haveAllShipsSunk() returns false if they haven't", () => {
  const board = new Gameboard();
  board.placeShip("A1");
  expect(board.haveAllShipsSunk()).toBe(false);
});

test("haveAllShipsSunk() returns true if they for 1 sunk ship", () => {
  const board = new Gameboard();
  board.placeShip("A1");
  board.receiveAttack("A1");
  expect(board.haveAllShipsSunk()).toBe(true);
});

test("haveAllShipsSunk() returns true if they for 2 sunk ships of length 2 & 3", () => {
  const board = new Gameboard();
  board.placeShip("A1", "A2");
  board.placeShip("F10", "H10");
  board.receiveAttack("A1");
  board.receiveAttack("A2");
  board.receiveAttack("F10");
  board.receiveAttack("H10");
  expect(board.haveAllShipsSunk()).toBe(false);
  board.receiveAttack("G10");
  expect(board.haveAllShipsSunk()).toBe(true);
});

test("Board can move ship", () => {
  const board = new Gameboard();
  board.placeShip("A1", "A3");
  board.moveShip("A1", "J8");
  expect(board.getCoordinates("A1").ship).toBeNull();
  expect(board.getCoordinates("A2").ship).toBeNull();
  expect(board.getCoordinates("A3").ship).toBeNull();
  expect(board.getCoordinates("J8").ship.length).toBe(3);
  expect(board.getCoordinates("J9").ship.length).toBe(3);
  expect(board.getCoordinates("J10").ship.length).toBe(3);
});

test("Board can't move ship to occupied space", () => {
  const board = new Gameboard();
  board.placeShip("A10", "D10");
  board.placeShip("F3", "F7");
  expect(() => board.moveShip("A10", "D6")).toThrow(
    "Target position is occupied",
  );
});

test("Board can move ship to a position occupied by itself", () => {
  const board = new Gameboard();
  board.placeShip("C2", "C4");
  board.moveShip("C2", "C3");
  expect(board.getCoordinates("C2").ship).toBeNull();
  expect(board.getCoordinates("C3").ship.length).toBe(3);
  expect(board.getCoordinates("C4").ship.length).toBe(3);
  expect(board.getCoordinates("C5").ship.length).toBe(3);
});

test("Board gets cleaned properly", () => {
  const board = new Gameboard();
  board.placeShip("D8", "G8");
  board.receiveAttack("E8");
  board.receiveAttack("B2");
  board.cleanBoard();
  expect(board.getCoordinates("E8").attacked).toBe(false);
  expect(board.getCoordinates("B2").attacked).toBe(false);
  expect(board.getCoordinates("D8").ship).toBeNull();
  expect(board.getCoordinates("E8").ship).toBeNull();
  expect(board.getCoordinates("F8").ship).toBeNull();
  expect(board.getCoordinates("G8").ship).toBeNull();
});

test("Board can rotate ships", () => {
  const board = new Gameboard();
  board.placeShip("A1", "A4");
  expect(board.getCoordinates("A1").ship.direction).toBe("v");
  board.moveShip("A1");
  expect(board.getCoordinates("A1").ship.direction).toBe("h");
  expect(board.getCoordinates("A2").ship).toBeNull();
  expect(board.getCoordinates("A3").ship).toBeNull();
  expect(board.getCoordinates("A4").ship).toBeNull();
  expect(board.getCoordinates("B1").ship.length).toBe(4);
  expect(board.getCoordinates("C1").ship.length).toBe(4);
  expect(board.getCoordinates("D1").ship.length).toBe(4);
});
