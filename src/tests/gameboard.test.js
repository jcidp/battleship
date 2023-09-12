import { experiments } from "webpack";
import Gameboard from "../modules/gameboard";

test("Gameboard places ship of length 1 on A1", () => {
  const board = new Gameboard();
  board.placeShip("A1");
  expect(board.getCoordinates("A1").length).toBe(1);
});

test("Gameboard places ship of length 1 on J10", () => {
  const board = new Gameboard();
  board.placeShip("J10");
  expect(board.getCoordinates("J10").length).toBe(1);
});

test("getCoordinates returns null if there's no ship there", () => {
  const board = new Gameboard();
  expect(board.getCoordinates("A1")).toBeNull();
});

test("Gameboard places ship of length 2 vertically from A1 to A2", () => {
  const board = new Gameboard();
  board.placeShip("A1", "A2");
  expect(board.getCoordinates("A2")).toEqual(board.getCoordinates("A1"));
  expect(board.getCoordinates("A2").length).toBe(2);
  expect(board.getCoordinates("A1").length).toBe(2);
});

test("Gameboard places ship of length 5 horizontally", () => {
  const board = new Gameboard();
  board.placeShip("F10", "J10");
  expect(board.getCoordinates("J10")).toEqual(board.getCoordinates("F10"));
  expect(board.getCoordinates("H10").length).toBe(5);
});

test("Gameboard receives attack on ship of length 1 on A1", () => {
  const board = new Gameboard();
  board.placeShip("A1");
  board.receiveAttack("A1");
  expect(board.getCoordinates("A1").isSunk()).toBe(true);
});

test("A ship along different coordinates is the same ship", () => {
  const board = new Gameboard();
  board.placeShip("A1", "A2");
  board.placeShip("J10");
  board.receiveAttack("A2");
  expect(board.getCoordinates("A1").hits).toBe(1);
  expect(board.getCoordinates("J10").hits).toBe(0);
});

test("Gameboard receives records missed shot", () => {
  const board = new Gameboard();
  board.receiveAttack("A1");
  expect(board.getCoordinates("A1")).toBe("miss");
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
