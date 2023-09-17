import Player from "./player";

const gameController = (() => {
  let player;
  let computer;

  const getPlayer = () => player;
  const getComputer = () => computer;

  const createPlayerShips = (player) => {
    player.board.placeShip("F2", "J2");
    player.board.placeShip("A4", "D4");
    player.board.placeShip("D6", "F6");
    player.board.placeShip("I4", "I6");
    player.board.placeShip("F9", "G9");
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
      return;
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
