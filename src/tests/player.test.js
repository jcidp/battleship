import Player from "../modules/player";

test("Player gets initiated with a board", () => {
  const player = new Player();
  expect(player.board).not.toBeNull();
});

test("Player can initiate an attack on the enemy", () => {
  const player = new Player();
  const enemy = new Player();
  expect(enemy.board.getCoordinates("C5").attacked).toBe(false);
  player.attack(enemy, "C5");
  expect(enemy.board.getCoordinates("C5").attacked).toBe(true);
});

test("Attacking the enemy removes coordinates from available shots", () => {
  const player = new Player();
  const enemy = new Player();
  expect(player.shotsAvailable.includes(20)).toBe(true);
  player.attack(enemy, "J2");
  expect(player.shotsAvailable.includes(20)).toBe(false);
  expect(player.shotsAvailable.includes(78)).toBe(true);
  player.attack(enemy, "H8");
  expect(player.shotsAvailable.includes(78)).toBe(false);
});

test("Players can make random attacks", () => {
  const computer = new Player();
  const enemy = new Player();
  const coordinates = computer.makeRandomAttack(enemy);
  expect(enemy.board.getCoordinates(coordinates).attacked).toBe(true);
});
