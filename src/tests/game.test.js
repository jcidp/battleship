import gameController from "../modules/game";

test("Controller setups game correctly", () => {
  gameController.setupGame();
  expect(gameController.getPlayer().name).toBe("player1");
  expect(gameController.getComputer().name).toBe("computer");
  //   expect(gameController.getPlayer().board.getCoordinates("J8").ship).toEqual({
  //     hits: 0,
  //     length: 1,
  //   });
  //   expect(
  //     gameController.getComputer().board.getCoordinates("D3").ship.length,
  //   ).toBe(4);
  //   expect(
  //     gameController.getComputer().board.getCoordinates("E5").ship,
  //   ).toBeNull();
});

test("Player can play a turn", () => {
  gameController.setupGame();
  expect(gameController.getComputer().board.getCoordinates("C4").attacked).toBe(
    false,
  );
  gameController.playTurn("C4");
  expect(gameController.getComputer().board.getCoordinates("C4").attacked).toBe(
    true,
  );
});
