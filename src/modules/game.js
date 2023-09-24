import Player from "./player";
import events from "./pubsub";

const gameController = (() => {
  let player;
  let computer;
  let activeGame = false;

  const getPlayer = () => player;
  const getComputer = () => computer;

  const isCoordinateFree = (board, row, col) => {
    if (board[row][col].ship) return false;
    if (row > 0 && board[row - 1][col].ship) return false;
    if (col < 9 && board[row][col + 1].ship) return false;
    if (row < 9 && board[row + 1][col].ship) return false;
    if (col > 0 && board[row][col - 1].ship) return false;
    return true;
  };

  const isPositionValid = (board, start, end) => {
    const [startCol, startRow] =
      board.constructor.getIndexesFromCoordinates(start);
    const [endCol, endRow] = board.constructor.getIndexesFromCoordinates(end);
    const distance =
      startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) {
        if (!isCoordinateFree(board.board, startRow, startCol + i))
          return false;
      } else if (!isCoordinateFree(board.board, startRow + i, startCol)) {
        return false;
      }
    }
    return true;
  };

  const getRandomShipPosition = (player, length) => {
    let initialPosition;
    let finalPosition;
    let validPosition = false;
    while (!validPosition) {
      initialPosition = Player.getCoordinatesFromNumber(
        Math.floor(Math.random() * 100) + 1,
      );
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      if (direction === "horizontal") {
        finalPosition =
          String.fromCharCode(
            initialPosition.charCodeAt(0) + length - 1 <= 74
              ? initialPosition.charCodeAt(0) + length - 1
              : initialPosition.charCodeAt(0) - length + 1,
          ) + initialPosition.slice(1);
      } else {
        const initialNumber = +initialPosition.slice(1);
        finalPosition =
          initialPosition[0] +
          (initialNumber + length - 1 <= 10
            ? initialNumber + length - 1
            : initialNumber - length + 1);
      }
      if (
        initialPosition.charCodeAt(0) > finalPosition.charCodeAt(0) ||
        +initialPosition.slice(1) > +finalPosition.slice(1)
      ) {
        [initialPosition, finalPosition] = [finalPosition, initialPosition];
      }
      validPosition = isPositionValid(
        player.board,
        initialPosition,
        finalPosition,
      );
    }
    return [initialPosition, finalPosition];
  };

  const createPlayerShips = (player) => {
    player.board.placeShip(...getRandomShipPosition(player, 5));
    player.board.placeShip(...getRandomShipPosition(player, 4));
    player.board.placeShip(...getRandomShipPosition(player, 3));
    player.board.placeShip(...getRandomShipPosition(player, 3));
    player.board.placeShip(...getRandomShipPosition(player, 2));
  };

  const gameOver = (winner) => {
    console.log(`${winner.name} won!`);
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

  return {
    setupGame,
    getPlayer,
    getComputer,
    playTurn,
  };
})();

export default gameController;
