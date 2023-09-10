import Ship from "../modules/ship.js";

test("Ship initializes with proper length", () => {
  const ship = new Ship(5);
  expect(ship.length).toBe(5);
});

test("Ship counts 3 hits", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(3);
});

test("Ship limits hits to its length", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(3);
});

test("isSunk returns false on 2 hits on a ship of length 3", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("isSunk returns true on 3 hits on a ship of length 3", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
