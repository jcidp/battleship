import Player from "./player";

const gameController = (() => {
  let player;
  let computer;

  const getPlayer = () => player;
  const getComputer = () => computer;

  const createPlayerShips = (player) => {
    player.board.placeShip("B6", "B10");
    player.board.placeShip("D1", "D4");
    player.board.placeShip("F4", "F6");
    player.board.placeShip("H2", "H3");
    player.board.placeShip("H8", "H9");
    player.board.placeShip("J3");
    player.board.placeShip("J8");
  };

  const setupGame = () => {
    player = new Player("player1");
    computer = new Player("computer");

    createPlayerShips(player);
    createPlayerShips(computer);
  };

  const gameOver = (winner) => {
    console.log(`${winner.name} has won!`);
    return winner;
  };

  const computerTurn = () => {
    const enemy = getPlayer();
    getComputer().makeRandomAttack(enemy);
    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getPlayer());
    }
  };

  const playTurn = (coordinates) => {
    const enemy = getComputer();
    getPlayer().attack(enemy, coordinates);

    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getPlayer());
    }
    computerTurn();
  };

  return {
    setupGame,
    getPlayer,
    getComputer,
    playTurn,
  };
})();

export default gameController;
