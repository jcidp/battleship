import Player from "./player";
import events from "./pubsub";

const gameController = (() => {
  let player;
  let computer;
  let activeGame = false;

  const getPlayer = () => player;
  const getComputer = () => computer;

  const gameOver = (winner) => {
    activeGame = false;
    events.emit("gameOver", winner);
  };

  const computerTurn = () => {
    const enemy = getPlayer();
    getComputer().makeRandomAttack(enemy);
    events.emit("turnEnd");
    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getComputer());
    }
  };

  const playTurn = (coordinates) => {
    if (!activeGame) return;
    const enemy = getComputer();
    const validCoordinates = getPlayer().attack(enemy, coordinates);
    if (!validCoordinates) return;
    events.emit("turnEnd");

    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getPlayer());
      return;
    }
    computerTurn();
  };

  const setupGame = () => {
    player = new Player("You");
    player.board.fillBoardWithShips();
    computer = new Player("The enemy");
    computer.board.fillBoardWithShips();
    events.emit("setupBoards", {
      player: getPlayer().getBoard(),
      computer: getComputer().getBoard(),
    });
    events.on(
      "RandomizePlayerBoard",
      player.board.resetBoard.bind(player.board),
    );
  };

  const startGame = () => {
    activeGame = true;
  };

  const restartGame = () => {
    player.board.resetBoard();
    computer.board.resetBoard();
    player.resetShotsAvailable();
    computer.resetShotsAvailable();
  };

  const moveShip = (coordinates) => {
    player.board.moveShip(coordinates[0], coordinates[1]);
  };

  events.on("startGame", startGame);
  events.on("moveShip", moveShip);
  events.on("playerAttack", playTurn);
  events.on("restartGame", restartGame);

  return {
    setupGame,
    startGame,
    getPlayer,
    getComputer,
    playTurn,
    gameOver,
  };
})();

export default gameController;
