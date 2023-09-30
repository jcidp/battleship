import Player from "./player";
import events from "./pubsub";

const gameController = (() => {
  let player;
  let computer;
  let activeGame = false;

  const getPlayer = () => player;
  const getComputer = () => computer;

  const createPlayerShips = (player) => {
    player.board.placeShipRandomly(5);
    player.board.placeShipRandomly(4);
    player.board.placeShipRandomly(3);
    player.board.placeShipRandomly(3);
    player.board.placeShipRandomly(2);
  };

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
    computer = new Player("The enemy");
    activeGame = true;

    createPlayerShips(player);
    createPlayerShips(computer);

    events.on("playerAttack", playTurn);
    events.emit("gameStarted", {
      player: getPlayer().getBoard(),
      computer: getComputer().getBoard(),
    });
    events.on("restartGame", setupGame);
  };

  events.on("setupGame", setupGame);
  events.on("renderDummy", createPlayerShips);

  return {
    setupGame,
    getPlayer,
    getComputer,
    playTurn,
  };
})();

export default gameController;
