import { experiments } from "webpack";
import Gameboard from "../modules/gameboard";

test("Gameboard places ship of length 1 on A1", () => {
  const board = new Gameboard();
  board.placeShip("A", 1);
  expect(board.getCoordinates("A", 1).length).toBe(1);
});

test("Gameboard places ship of length 1 on J10", () => {
  const board = new Gameboard();
  board.placeShip("J", 10);
  expect(board.getCoordinates("J", 10).length).toBe(1);
});

test("getCoordinates returns null if there's no ship there", () => {
  const board = new Gameboard();
  expect(board.getCoordinates("A", 1)).toBeNull();
});

test("Gameboard places ship of length 2 vertically from A1 to A2", () => {
  const board = new Gameboard();
  board.placeShip("A", 1, "A", 2);
  expect(board.getCoordinates("A", 2)).toEqual(board.getCoordinates("A", 1));
  expect(board.getCoordinates("A", 2).length).toBe(2);
  expect(board.getCoordinates("A", 1).length).toBe(2);
});

test("Gameboard places ship of length 5 horizontally", () => {
  const board = new Gameboard();
  board.placeShip("F", 10, "J", 10);
  expect(board.getCoordinates("J", 10)).toEqual(board.getCoordinates("F", 10));
  expect(board.getCoordinates("H", 10).length).toBe(5);
});

test("Gameboard receives attack on ship of length 1 on A1", () => {
  const board = new Gameboard();
  board.placeShip("A", 1);
  board.receiveAttack("A", 1);
  expect(board.getCoordinates("A", 1).isSunk()).toBe(true);
});

test("A ship along different coordinates is the same ship", () => {
  const board = new Gameboard();
  board.placeShip("A", 1, "A", 2);
  board.placeShip("J", 10);
  board.receiveAttack("A", 2);
  expect(board.getCoordinates("A", 1).hits).toBe(1);
  expect(board.getCoordinates("J", 10).hits).toBe(0);
});

test("Gameboard receives records missed shot", () => {
  const board = new Gameboard();
  board.receiveAttack("A", 1);
  expect(board.getCoordinates("A", 1)).toBe("miss");
});

test("haveAllShipsSunk() returns false if they haven't", () => {
  const board = new Gameboard();
  board.placeShip("A", 1);
  expect(board.haveAllShipsSunk()).toBe(false);
});

test("haveAllShipsSunk() returns true if they for 1 sunk ship", () => {
  const board = new Gameboard();
  board.placeShip("A", 1);
  board.receiveAttack("A", 1);
  expect(board.haveAllShipsSunk()).toBe(true);
});

test("haveAllShipsSunk() returns true if they for 2 sunk ships of length 2 & 3", () => {
  const board = new Gameboard();
  board.placeShip("A", 1, "A", 2);
  board.placeShip("F", 10, "H", 10);
  board.receiveAttack("A", 1);
  board.receiveAttack("A", 2);
  board.receiveAttack("F", 10);
  board.receiveAttack("H", 10);
  expect(board.haveAllShipsSunk()).toBe(false);
  board.receiveAttack("G", 10);
  expect(board.haveAllShipsSunk()).toBe(true);
});
