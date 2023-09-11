import Player from "../modules/player";

test("Player gets initiated with a board", () => {
  const player = new Player();
  expect(player.board).not.toBeNull();
});
