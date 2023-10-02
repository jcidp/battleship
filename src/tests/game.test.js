jest.mock("../modules/pubsub");
import gameController from "../modules/game";
import events from "../modules/pubsub";

events.emit.mockImplementation((x) => `Called with ${x}`);

test("Controller setups game correctly", () => {
  gameController.setupGame();
  expect(gameController.getPlayer().name).toBe("You");
  expect(gameController.getComputer().name).toBe("The enemy");
});

test("Player can play a turn", () => {
  gameController.startGame();
  expect(gameController.getComputer().board.getCoordinates("C4").attacked).toBe(
    false,
  );
  gameController.playTurn("C4");
  expect(gameController.getComputer().board.getCoordinates("C4").attacked).toBe(
    true,
  );
});

test("setupGame() emits setupBoards with the player and computer boards", () => {
  expect(events.emit.mock.calls[0][0]).toBe("setupBoards");
});

test("playTurn() emits turnEnd twice", () => {
  expect(events.emit.mock.calls[1][0]).toBe("turnEnd");
  expect(events.emit.mock.calls[1][1]).toBeUndefined();
  expect(events.emit.mock.calls[2][0]).toBe("turnEnd");
  expect(events.emit.mock.calls[2][1]).toBeUndefined();
});

test("gameOver() emits gameOver w winner", () => {
  gameController.gameOver(gameController.getPlayer());
  expect(events.emit.mock.calls[3][0]).toBe("gameOver");
  expect(events.emit.mock.calls[3][1]).toBe(gameController.getPlayer());
});
