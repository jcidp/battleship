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
