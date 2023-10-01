/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/modules/helpers.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubsub */ "./src/modules/pubsub.js");


const domController = (() => {
  let boards;
  function setupBoards(newBoards) {
    boards = newBoards;
  }
  function getCoordinatesFromIndexes(row, col) {
    return `${String.fromCharCode(col + 65)}${row + 1}`;
  }
  function display(message) {
    const text = document.querySelector(".display__text");
    text.textContent = message;
  }
  function showGameOver(winner) {
    display(`The game is over. ${winner.name} won!`);
  }
  function attackCell(e) {
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("playerAttack", e.target.id);
  }
  function rotateShip(e) {
    try {
      _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("moveShip", [e.target.closest(".cell").id]);
      renderSetupBoard();
      display("Drag your ships to move them. Click them to rotate them.");
    } catch (error) {
      if (error.message === "Target position is occupied") display("Not enough space to rotate that ship. Ships can't touch.");else if (error.message === "Invalid Coordinates") display("There's not enough space to rotate your ship");else console.log(error);
    }
  }
  function getCoordinatesOffset(coordinates, offset, direction) {
    if (direction === "h") {
      return String.fromCharCode(coordinates.charCodeAt(0) - offset) + coordinates.slice(1);
    }
    return coordinates[0] + (+coordinates.slice(1) - offset);
  }

  // Drag & drop handlers
  function drag(e) {
    //e.preventDefault();
    e.dataTransfer.setData("text/coordinates", e.target.closest(".cell").id);
    const lengthX = e.target.dataset.direction === "h" ? e.target.offsetWidth / +e.target.dataset.length : e.target.offsetWidth;
    const lengthY = e.target.dataset.direction === "v" ? e.target.offsetHeight / +e.target.dataset.length : e.target.offsetHeight;
    const squareOffset = e.target.dataset.direction === "h" ? Math.floor(e.offsetX / lengthX) : Math.floor(e.offsetY / lengthY);
    e.dataTransfer.setData("text/offset", squareOffset);
    e.dataTransfer.effectAllowed = "move";
  }
  function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    // if (something) e.dataTransfer.dropEffect = "none";
    if (e.target.classList.contains("drag-ship")) e.target.style.zIndex = -1;
  }
  function drop(e) {
    e.preventDefault();
    try {
      const sourceCoordinates = e.dataTransfer.getData("text/coordinates");
      const offSet = e.dataTransfer.getData("text/offset");
      const sourceCell = document.getElementById(sourceCoordinates);
      const {
        direction
      } = sourceCell.firstElementChild.dataset;
      const targetCoordinates = getCoordinatesOffset(e.target.id, offSet, direction);
      _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("moveShip", [sourceCoordinates, targetCoordinates]);
      renderSetupBoard();
      display("Drag your ships to move them. Click them to rotate them.");
    } catch (error) {
      if (error.message === "Target position is occupied") display("Not enough space there for your ship. Ships can't touch.");else if (error.message === "Invalid Coordinates") display("The position you're trying to move your ship to is invalid.");else console.log(error);
    }
  }
  function dragend(e) {
    const ships = document.querySelectorAll(".drag-ship");
    ships.forEach(ship => ship.style.zIndex = 1);
  }
  function renderBoard(board, player) {
    const boardContainer = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, `${player} board`);
    for (let i = 0; i < 11; i++) {
      const colLabel = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "label col");
      colLabel.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", i === 0 ? "" : String.fromCharCode(i + 64)));
      boardContainer.appendChild(colLabel);
    }
    board.forEach((row, i) => {
      const rowLabel = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "label row");
      rowLabel.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", i + 1));
      boardContainer.appendChild(rowLabel);
      row.forEach((cell, j) => {
        let classes = "cell";
        if (cell.attacked) classes += " attacked";
        if (cell.ship && player === "player") classes += " ship";
        const coordinates = getCoordinatesFromIndexes(i, j);
        const cellElement = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, classes, [["id", coordinates]]);
        if (player === "computer") {
          cellElement.addEventListener("click", attackCell);
          if (cell.attacked && cell.ship) cellElement.classList.add("ship");
        }
        if (player === "dummy") {
          cellElement.addEventListener("dragover", allowDrop);
          cellElement.addEventListener("drop", drop);
        }
        boardContainer.appendChild(cellElement);
        if (player === "dummy" && cell.ship) {
          if (cell.ship.startCoordinates === coordinates) {
            const ship = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "drag-ship", [["draggable", true], ["data-length", cell.ship.length], ["data-direction", cell.ship.direction]]);
            ship.addEventListener("click", rotateShip);
            ship.addEventListener("dragstart", drag);
            ship.addEventListener("dragend", dragend);
            if (cell.ship.direction === "h") ship.style.width = `calc(${cell.ship.length * 100}% + ${cell.ship.length * 2 - 2}px`;else ship.style.height = `calc(${cell.ship.length * 100}% + ${cell.ship.length * 2 - 2}px`;
            cellElement.appendChild(ship);
          }
        }
      });
    });
    return boardContainer;
  }
  function startGame() {
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("startGame");
    renderGameScreen();
  }
  function renderControls(buttonClass) {
    const buttonText = buttonClass === "new-game" ? "+ New Game" : "Start Game";
    const displayText = buttonClass === "new-game" ? "Click on the enemy's board to attack" : "Drag your ships to move them. Click them to rotate them.";
    const fn = buttonClass === "new-game" ? restartGame : startGame;
    const controlSection = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", null, "controls");
    const btn = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", buttonText, buttonClass);
    btn.addEventListener("click", fn);
    controlSection.appendChild(btn);
    const textDisplay = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "display");
    textDisplay.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", displayText, "display__text"));
    controlSection.appendChild(textDisplay);
    return controlSection;
  }
  function renderGameScreen() {
    const main = document.querySelector("main");
    cleanElement(main);
    main.appendChild(renderControls("new-game"));
    const playerSection = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("section");
    playerSection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", "Your Board"));
    playerSection.appendChild(renderBoard(boards.player, "player"));
    main.appendChild(playerSection);
    const enemySection = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("section");
    enemySection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", "Enemy's Board"));
    enemySection.appendChild(renderBoard(boards.computer, "computer"));
    main.appendChild(enemySection);
  }
  function cleanElement(parent) {
    let child = parent.firstElementChild;
    while (child) {
      parent.removeChild(child);
      child = parent.firstElementChild;
    }
  }
  function updateScreen() {
    const main = document.querySelector("main");
    cleanElement(main);
    renderGameScreen();
  }
  function restartGame() {
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("restartGame");
    const body = document.querySelector("body");
    cleanElement(body);
    renderPageLayout();
  }
  function randomizePlayerBoard() {
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("RandomizePlayerBoard");
    renderSetupBoard();
  }
  function renderSetupBoard() {
    const playerSection = document.querySelector("section.player.setup");
    cleanElement(playerSection);
    playerSection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", "Your Board"));
    playerSection.appendChild(renderBoard(boards.player, "dummy"));
    const randomizeBtn = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", "Randomize", "randomize");
    randomizeBtn.addEventListener("click", randomizePlayerBoard);
    const btnContainer = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "btn-container");
    btnContainer.appendChild(randomizeBtn);
    playerSection.appendChild(btnContainer);
  }
  function renderPageLayout() {
    const body = document.querySelector("body");
    const header = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("header");
    header.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", "Battleship"));
    body.appendChild(header);
    const main = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("main");
    main.appendChild(renderControls("start-game"));
    const playerSection = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", null, "player setup");
    main.appendChild(playerSection);
    body.appendChild(main);
    const footer = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer");
    const a = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", "", "", [["href", "https://github.com/jcidp"], ["target", "_blank"]]);
    a.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", "Created by jcidp"));
    a.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.renderLinkIcon)("github", "0 0 24 24", "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"));
    footer.appendChild(a);
    body.appendChild(footer);
    renderSetupBoard();
  }
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("setupBoards", setupBoards);
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("turnEnd", updateScreen);
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("gameOver", showGameOver);
  return {
    renderPageLayout,
    renderGameScreen,
    updateScreen
  };
})();
/* harmony default export */ __webpack_exports__["default"] = (domController);

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubsub */ "./src/modules/pubsub.js");


const gameController = (() => {
  let player;
  let computer;
  let activeGame = false;
  const getPlayer = () => player;
  const getComputer = () => computer;
  const gameOver = winner => {
    activeGame = false;
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("gameOver", winner);
  };
  const computerTurn = () => {
    const enemy = getPlayer();
    getComputer().makeRandomAttack(enemy);
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("turnEnd");
    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getComputer());
    }
  };
  const playTurn = coordinates => {
    if (!activeGame) return;
    const enemy = getComputer();
    const validCoordinates = getPlayer().attack(enemy, coordinates);
    if (!validCoordinates) return;
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("turnEnd");
    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getPlayer());
      return;
    }
    computerTurn();
  };
  const setupGame = () => {
    player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("You");
    player.board.fillBoardWithShips();
    computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("The enemy");
    computer.board.fillBoardWithShips();
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("setupBoards", {
      player: getPlayer().getBoard(),
      computer: getComputer().getBoard()
    });
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("RandomizePlayerBoard", player.board.resetBoard.bind(player.board));
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
  const moveShip = coordinates => {
    player.board.moveShip(coordinates[0], coordinates[1]);
  };
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("startGame", startGame);
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("moveShip", moveShip);
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("playerAttack", playTurn);
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("restartGame", restartGame);
  return {
    setupGame,
    startGame,
    getPlayer,
    getComputer,
    playTurn
  };
})();
/* harmony default export */ __webpack_exports__["default"] = (gameController);

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

class Gameboard {
  constructor() {
    // this.board = Array(10).fill(Array(10).fill(null));
    this.board = this.constructor.fillBoard();
  }
  static fillBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push({
          attacked: false,
          ship: null
        });
      }
      board.push(row);
    }
    return board;
  }
  fillBoardWithShips() {
    this.placeShipRandomly(5);
    this.placeShipRandomly(4);
    this.placeShipRandomly(3);
    this.placeShipRandomly(3);
    this.placeShipRandomly(2);
  }
  resetBoard() {
    this.cleanBoard();
    this.fillBoardWithShips();
  }
  cleanBoard() {
    this.board.forEach(row => {
      row.forEach(cell => {
        cell.attacked = false;
        cell.ship = null;
      });
    });
  }
  placeShip(start, end) {
    const [startCol, startRow] = this.constructor.getIndexesFromCoordinates(start);
    if (!end) {
      this.board[startRow][startCol].ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](1, start, "h");
      return;
    }
    const [endCol, endRow] = this.constructor.getIndexesFromCoordinates(end);
    const distance = startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](distance, start, startRow === endRow ? "h" : "v");
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) this.board[startRow][startCol + i].ship = ship;else this.board[startRow + i][startCol].ship = ship;
    }
  }
  static forEachPositionCell(startCoordinates, direction, length, fn) {
    const [startCol, startRow] = this.getIndexesFromCoordinates(startCoordinates);
    const result = [];
    for (let i = 0; i < length; i++) {
      if (direction === "h") result.push(fn(startRow, startCol + i));else result.push(fn(startRow + i, startCol));
    }
    return result;
  }
  moveShip(sourceCoordinates, targetCoordinates) {
    const {
      ship
    } = this.getCoordinates(sourceCoordinates);
    const direction = targetCoordinates ? ship.direction : null;
    const newCoordinates = this.constructor.forEachPositionCell(targetCoordinates || sourceCoordinates, direction || (ship.direction === "h" ? "v" : "h"), ship.length, (row, col) => this.isCoordinateFree(row, col, ship));
    if (!newCoordinates.every(cell => cell)) throw new Error("Target position is occupied");
    this.constructor.forEachPositionCell(sourceCoordinates, ship.direction, ship.length, (row, col) => {
      this.board[row][col].ship = null;
    });
    if (targetCoordinates) ship.startCoordinates = targetCoordinates;else ship.direction = ship.direction === "h" ? "v" : "h";
    this.constructor.forEachPositionCell(targetCoordinates || sourceCoordinates, ship.direction, ship.length, (row, col) => {
      this.board[row][col].ship = ship;
    });
  }
  rotateShip(sourceCoordinates) {
    const {
      ship
    } = this.getCoordinates(sourceCoordinates);
    const newCoordinates = this.constructor.forEachPositionCell(sourceCoordinates, ship.direction === "h" ? "v" : "h", ship.length, (row, col) => this.isCoordinateFree(row, col, ship));
    if (!newCoordinates.every(cell => cell)) throw new Error("Target position is occupied");
  }
  isCoordinateFree(row, col, ship) {
    if (col < 0 || col > 9 || row < 0 || row > 9) throw new Error("Invalid Coordinates");
    if (this.board[row][col].ship && (!ship || this.board[row][col].ship !== ship)) return false;
    if (row > 0 && this.board[row - 1][col].ship && (!ship || this.board[row - 1][col].ship !== ship)) return false;
    if (col < 9 && this.board[row][col + 1].ship && (!ship || this.board[row][col + 1].ship !== ship)) return false;
    if (row < 9 && this.board[row + 1][col].ship && (!ship || this.board[row + 1][col].ship !== ship)) return false;
    if (col > 0 && this.board[row][col - 1].ship && (!ship || this.board[row][col - 1].ship !== ship)) return false;
    return true;
  }
  isPositionValid(start, end) {
    const [startCol, startRow] = this.constructor.getIndexesFromCoordinates(start);
    const [endCol, endRow] = this.constructor.getIndexesFromCoordinates(end);
    const distance = startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) {
        if (!this.isCoordinateFree(startRow, startCol + i)) return false;
      } else if (!this.isCoordinateFree(startRow + i, startCol)) {
        return false;
      }
    }
    return true;
  }
  placeShipRandomly(length) {
    let initialPosition;
    let finalPosition;
    let validPosition = false;
    while (!validPosition) {
      initialPosition = this.constructor.getCoordinatesFromNumber(Math.floor(Math.random() * 100) + 1);
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      if (direction === "horizontal") {
        finalPosition = String.fromCharCode(initialPosition.charCodeAt(0) + length - 1 <= 74 ? initialPosition.charCodeAt(0) + length - 1 : initialPosition.charCodeAt(0) - length + 1) + initialPosition.slice(1);
      } else {
        const initialNumber = +initialPosition.slice(1);
        finalPosition = initialPosition[0] + (initialNumber + length - 1 <= 10 ? initialNumber + length - 1 : initialNumber - length + 1);
      }
      if (initialPosition.charCodeAt(0) > finalPosition.charCodeAt(0) || +initialPosition.slice(1) > +finalPosition.slice(1)) {
        [initialPosition, finalPosition] = [finalPosition, initialPosition];
      }
      validPosition = this.isPositionValid(initialPosition, finalPosition);
    }
    this.placeShip(initialPosition, finalPosition);
  }
  static getIndexesFromCoordinates(coordinates) {
    const colIndex = coordinates.charCodeAt(0) - 65;
    const rowIndex = +coordinates.slice(1) - 1;
    if (colIndex < 0 || colIndex > 9 || rowIndex < 0 || rowIndex > 9) throw new Error("Invalid Coordinates");
    return [colIndex, rowIndex];
  }
  static getNumberFromCoordinates(coordinates) {
    return coordinates.charCodeAt(0) - 64 + +coordinates.slice(1) * 10 - 10;
  }
  static getCoordinatesFromNumber(n) {
    return `${String.fromCharCode((n % 10 === 0 ? 10 : n % 10) + 64)}${Math.floor(n / 10) + (n % 10 === 0 ? 0 : 1)}`;
  }
  getCoordinates(coordinates) {
    const [col, row] = this.constructor.getIndexesFromCoordinates(coordinates);
    return this.board[row][col];
  }
  receiveAttack(coordinates) {
    const cell = this.getCoordinates(coordinates);
    if (cell.attacked) throw new Error("Repeated coordinates");
    if (cell.ship) {
      cell.ship.hit();
    }
    const [col, row] = this.constructor.getIndexesFromCoordinates(coordinates);
    this.board[row][col].attacked = true;
  }
  haveAllShipsSunk() {
    return this.board.every(row => row.every(cell => !cell.ship || cell.ship.isSunk()));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Gameboard);

/***/ }),

/***/ "./src/modules/helpers.js":
/*!********************************!*\
  !*** ./src/modules/helpers.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElement: function() { return /* binding */ createElement; },
/* harmony export */   renderLinkIcon: function() { return /* binding */ renderLinkIcon; }
/* harmony export */ });
const createElement = (element, content, classes, attributes) => {
  const ele = document.createElement(element);
  if (content) ele.textContent = content;
  if (classes && classes.length) {
    classes.split(" ").forEach(myClass => ele.classList.add(myClass));
  }
  if (attributes) attributes.forEach(attribute => ele.setAttribute(attribute[0], attribute[1]));
  return ele;
};
const renderLinkIcon = (name, viewBox, path, myClass) => {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const title = document.createElement("title");
  title.textContent = name;
  iconSvg.appendChild(title);
  iconSvg.setAttribute("viewBox", viewBox);
  iconPath.setAttribute("d", path);
  iconSvg.appendChild(iconPath);
  if (name === "pencil" || name === "delete") iconSvg.classList.add(name);
  if (myClass) iconSvg.classList.add(myClass);
  return iconSvg;
};


/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");

class Player {
  constructor(name) {
    this.name = name;
    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.shotsAvailable = Array.from(Array(100).fill(), (_, i) => i + 1);
  }
  resetShotsAvailable() {
    this.shotsAvailable = Array.from(Array(100).fill(), (_, i) => i + 1);
  }
  attack(enemy, coordinates) {
    const shotNumber = this.board.constructor.getNumberFromCoordinates(coordinates);
    if (!this.shotsAvailable.includes(shotNumber)) return false;
    enemy.board.receiveAttack(coordinates);
    this.shotsAvailable = this.shotsAvailable.filter(n => n !== shotNumber);
    return true;
  }
  makeRandomAttack(enemy) {
    const coordinates = this.board.constructor.getCoordinatesFromNumber(this.shotsAvailable[Math.floor(Math.random() * this.shotsAvailable.length)]);
    this.attack(enemy, coordinates);
    return coordinates;
  }
  getName() {
    return this.name;
  }
  getBoard() {
    return this.board.board;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/modules/pubsub.js":
/*!*******************************!*\
  !*** ./src/modules/pubsub.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const events = (() => {
  const events = {};
  const on = (eventName, fn) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName)) events[eventName] = [];
    events[eventName].push(fn);
  };
  const off = (eventName, fn) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName)) return;
    for (let i = 0; i < events[eventName].length; i++) {
      if (events[eventName][i] === fn) {
        events[eventName].splice(i, 1);
        break;
      }
    }
  };
  const emit = (eventName, data) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName)) return;
    events[eventName].forEach(fn => fn(data));
  };
  return {
    on,
    off,
    emit
  };
})();
/* harmony default export */ __webpack_exports__["default"] = (events);

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class Ship {
  constructor(length, startCoordinates, direction) {
    this.length = length;
    this.startCoordinates = startCoordinates;
    this.direction = direction;
    this.hits = 0;
  }
  hit() {
    if (this.hits < this.length) this.hits++;
    return this.hits;
  }
  isSunk() {
    return this.hits === this.length;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! explosion.png */ "./src/explosion.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100svh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 1em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n}\nbutton:hover {\n  cursor: pointer;\n}\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n}\n.controls button {\n  background-color: steelblue;\n  color: white;\n}\n.controls .display {\n  min-height: 2.25rem;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr))/repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 17em) / 2);\n  transform: translateX(-3%);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n  display: grid;\n  place-content: center;\n  position: relative;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}\n.board .cell.ship.attacked {\n  background-color: #fa3232;\n}\n.board .cell.attacked:not(.ship)::after {\n  content: \"'\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: black;\n  border-radius: 50%;\n}\n.board .cell.attacked.ship::after {\n  content: \"\";\n  width: 1em;\n  height: 1em;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center/contain;\n}\n.board .cell .drag-ship {\n  background-color: steelblue;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 1;\n}\n.board .cell .drag-ship:hover {\n  cursor: pointer;\n}\n\n.player.setup .dummy.board {\n  padding-bottom: 0;\n}\n.player.setup .btn-container {\n  display: flex;\n  justify-content: center;\n}\n.player.setup .randomize {\n  background-color: transparent;\n}\n\n@media (min-width: 800px) {\n  main {\n    display: grid;\n    grid-template: repeat(2, max-content)/repeat(2, 1fr);\n    width: min(1200px, 100% - 4rem);\n  }\n  main section:first-of-type, main section.player.setup {\n    grid-column: 1/-1;\n  }\n  .board {\n    max-height: calc(100svh - 18em);\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,6BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,sBAzBgB;EA0BhB,YAvBa;EAwBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBAhCgB;EAiChB,iBAAA;AAPF;AASE;EACE,YAjCW;EAkCX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WA3CW;AAmCf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAeA;EACE,kBAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;AAZF;AAcE;EACE,eAAA;AAZJ;;AAkBA;EACE,aAAA;EACA,uBAAA;EACA,YAAA;AAfF;AAiBE;EACE,2BAnFY;EAoFZ,YAhFW;AAiEf;AAkBE;EACE,mBAAA;AAhBJ;;AAsBA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;EACA,0BAAA;AAnBF;AAqBE;EACE,aAAA;EACA,qBAAA;AAnBJ;AAsBE;EACE,sBAAA;EACA,aAAA;EACA,qBAAA;EACA,kBAAA;AApBJ;AAsBI;EACE,2BAnHU;AA+FhB;AAqBM;EACE,yBAnHU;AAgGlB;AAuBI;EACE,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AArBN;AAwBI;EACE,WAAA;EACA,UAAA;EACA,WAAA;EACA,4EAAA;AAtBN;AAyBI;EACE,2BAzIU;EA0IV,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,UAAA;AAvBN;AAyBM;EACE,eAAA;AAvBR;;AA8BE;EACE,iBAAA;AA3BJ;AA8BE;EACE,aAAA;EACA,uBAAA;AA5BJ;AA+BE;EACE,6BAAA;AA7BJ;;AAkCA;EACE;IACE,aAAA;IACA,oDAAA;IACA,+BAAA;EA/BF;EAiCE;IACE,iBAAA;EA/BJ;EAmCA;IACE,+BAAA;EAjCF;AACF","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: #fa3232;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100svh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 1em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n  \n  &:hover {\n    cursor: pointer;\n  }\n}\n\n// Controls\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n\n  button {\n    background-color: $primary-color;\n    color: $secondary-fc;\n  }\n\n  .display {\n    min-height: 2.25rem;\n  }\n}\n\n// Boards\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr)) / repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1 / 1;\n  max-height: calc((100svh - 17em) / 2);\n  transform: translateX(-3%);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n    display: grid;\n    place-content: center;\n    position: relative;\n\n    &.ship {\n      background-color: $primary-color;\n      &.attacked {\n        background-color: $highlight-color;\n      }\n    }\n  \n    &.attacked:not(.ship)::after {\n      content: \"'\";\n      width: 0.5em;\n      height: 0.5em;\n      background-color: black;\n      border-radius: 50%;\n    }\n\n    &.attacked.ship::after {\n      content: \"\";\n      width: 1em;\n      height: 1em;\n      background: url(explosion.png) no-repeat center/contain;\n    }\n\n    .drag-ship {\n      background-color: $primary-color;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      z-index: 1;\n\n      &:hover {\n        cursor: pointer;\n      }\n    }\n  }\n}\n\n.player.setup {\n  .dummy.board {\n    padding-bottom: 0;\n  }\n\n  .btn-container {\n    display: flex;\n    justify-content: center;\n  }\n\n  .randomize {\n    background-color: transparent;\n    //border: 1px solid $primary-color;\n  }\n}\n\n@media (min-width: 800px) {\n  main {\n    display: grid;\n    grid-template: repeat(2, max-content) / repeat(2, 1fr);\n    width: min(1200px, 100% - 4rem);\n\n    section:first-of-type, section.player.setup {\n      grid-column: 1 / -1;\n    }\n  }\n\n  .board {\n    max-height: calc(100svh - 18em);\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ (function(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/explosion.png":
/*!***************************!*\
  !*** ./src/explosion.png ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0873c78131540bf92b80.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");



_modules_game__WEBPACK_IMPORTED_MODULE_2__["default"].setupGame();
_modules_dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderPageLayout();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFDb0I7QUFDRTtBQUU1Q25CLHFEQUFjLENBQUNZLFNBQVMsQ0FBQyxDQUFDO0FBQzFCbEksb0RBQWEsQ0FBQzZHLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IGRvbUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBsZXQgYm9hcmRzO1xuXG4gIGZ1bmN0aW9uIHNldHVwQm9hcmRzKG5ld0JvYXJkcykge1xuICAgIGJvYXJkcyA9IG5ld0JvYXJkcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMocm93LCBjb2wpIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZShjb2wgKyA2NSl9JHtyb3cgKyAxfWA7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5KG1lc3NhZ2UpIHtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5X190ZXh0XCIpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0dhbWVPdmVyKHdpbm5lcikge1xuICAgIGRpc3BsYXkoYFRoZSBnYW1lIGlzIG92ZXIuICR7d2lubmVyLm5hbWV9IHdvbiFgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF0dGFja0NlbGwoZSkge1xuICAgIGV2ZW50cy5lbWl0KFwicGxheWVyQXR0YWNrXCIsIGUudGFyZ2V0LmlkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJvdGF0ZVNoaXAoZSkge1xuICAgIHRyeSB7XG4gICAgICBldmVudHMuZW1pdChcIm1vdmVTaGlwXCIsIFtlLnRhcmdldC5jbG9zZXN0KFwiLmNlbGxcIikuaWRdKTtcbiAgICAgIHJlbmRlclNldHVwQm9hcmQoKTtcbiAgICAgIGRpc3BsYXkoXCJEcmFnIHlvdXIgc2hpcHMgdG8gbW92ZSB0aGVtLiBDbGljayB0aGVtIHRvIHJvdGF0ZSB0aGVtLlwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFwiVGFyZ2V0IHBvc2l0aW9uIGlzIG9jY3VwaWVkXCIpXG4gICAgICAgIGRpc3BsYXkoXCJOb3QgZW5vdWdoIHNwYWNlIHRvIHJvdGF0ZSB0aGF0IHNoaXAuIFNoaXBzIGNhbid0IHRvdWNoLlwiKTtcbiAgICAgIGVsc2UgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFwiSW52YWxpZCBDb29yZGluYXRlc1wiKVxuICAgICAgICBkaXNwbGF5KFwiVGhlcmUncyBub3QgZW5vdWdoIHNwYWNlIHRvIHJvdGF0ZSB5b3VyIHNoaXBcIik7XG4gICAgICBlbHNlIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb29yZGluYXRlc09mZnNldChjb29yZGluYXRlcywgb2Zmc2V0LCBkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcImhcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZShjb29yZGluYXRlcy5jaGFyQ29kZUF0KDApIC0gb2Zmc2V0KSArXG4gICAgICAgIGNvb3JkaW5hdGVzLnNsaWNlKDEpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXNbMF0gKyAoK2Nvb3JkaW5hdGVzLnNsaWNlKDEpIC0gb2Zmc2V0KTtcbiAgfVxuXG4gIC8vIERyYWcgJiBkcm9wIGhhbmRsZXJzXG4gIGZ1bmN0aW9uIGRyYWcoZSkge1xuICAgIC8vZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L2Nvb3JkaW5hdGVzXCIsIGUudGFyZ2V0LmNsb3Nlc3QoXCIuY2VsbFwiKS5pZCk7XG4gICAgY29uc3QgbGVuZ3RoWCA9XG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJoXCJcbiAgICAgICAgPyBlLnRhcmdldC5vZmZzZXRXaWR0aCAvICtlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aFxuICAgICAgICA6IGUudGFyZ2V0Lm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGxlbmd0aFkgPVxuICAgICAgZS50YXJnZXQuZGF0YXNldC5kaXJlY3Rpb24gPT09IFwidlwiXG4gICAgICAgID8gZS50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gK2UudGFyZ2V0LmRhdGFzZXQubGVuZ3RoXG4gICAgICAgIDogZS50YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHNxdWFyZU9mZnNldCA9XG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJoXCJcbiAgICAgICAgPyBNYXRoLmZsb29yKGUub2Zmc2V0WCAvIGxlbmd0aFgpXG4gICAgICAgIDogTWF0aC5mbG9vcihlLm9mZnNldFkgLyBsZW5ndGhZKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9vZmZzZXRcIiwgc3F1YXJlT2Zmc2V0KTtcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxvd0Ryb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJtb3ZlXCI7XG4gICAgLy8gaWYgKHNvbWV0aGluZykgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibm9uZVwiO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcmFnLXNoaXBcIikpIGUudGFyZ2V0LnN0eWxlLnpJbmRleCA9IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzb3VyY2VDb29yZGluYXRlcyA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L2Nvb3JkaW5hdGVzXCIpO1xuICAgICAgY29uc3Qgb2ZmU2V0ID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvb2Zmc2V0XCIpO1xuICAgICAgY29uc3Qgc291cmNlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNvdXJjZUNvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnN0IHsgZGlyZWN0aW9uIH0gPSBzb3VyY2VDZWxsLmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQ7XG4gICAgICBjb25zdCB0YXJnZXRDb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzT2Zmc2V0KFxuICAgICAgICBlLnRhcmdldC5pZCxcbiAgICAgICAgb2ZmU2V0LFxuICAgICAgICBkaXJlY3Rpb24sXG4gICAgICApO1xuICAgICAgZXZlbnRzLmVtaXQoXCJtb3ZlU2hpcFwiLCBbc291cmNlQ29vcmRpbmF0ZXMsIHRhcmdldENvb3JkaW5hdGVzXSk7XG4gICAgICByZW5kZXJTZXR1cEJvYXJkKCk7XG4gICAgICBkaXNwbGF5KFwiRHJhZyB5b3VyIHNoaXBzIHRvIG1vdmUgdGhlbS4gQ2xpY2sgdGhlbSB0byByb3RhdGUgdGhlbS5cIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlID09PSBcIlRhcmdldCBwb3NpdGlvbiBpcyBvY2N1cGllZFwiKVxuICAgICAgICBkaXNwbGF5KFwiTm90IGVub3VnaCBzcGFjZSB0aGVyZSBmb3IgeW91ciBzaGlwLiBTaGlwcyBjYW4ndCB0b3VjaC5cIik7XG4gICAgICBlbHNlIGlmIChlcnJvci5tZXNzYWdlID09PSBcIkludmFsaWQgQ29vcmRpbmF0ZXNcIilcbiAgICAgICAgZGlzcGxheShcIlRoZSBwb3NpdGlvbiB5b3UncmUgdHJ5aW5nIHRvIG1vdmUgeW91ciBzaGlwIHRvIGlzIGludmFsaWQuXCIpO1xuICAgICAgZWxzZSBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhZ2VuZChlKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyYWctc2hpcFwiKTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS56SW5kZXggPSAxKSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCb2FyZChib2FyZCwgcGxheWVyKSB7XG4gICAgY29uc3QgYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGAke3BsYXllcn0gYm9hcmRgKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbExhYmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImxhYmVsIGNvbFwiKTtcbiAgICAgIGNvbExhYmVsLmFwcGVuZENoaWxkKFxuICAgICAgICBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBpID09PSAwID8gXCJcIiA6IFN0cmluZy5mcm9tQ2hhckNvZGUoaSArIDY0KSksXG4gICAgICApO1xuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29sTGFiZWwpO1xuICAgIH1cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIGNvbnN0IHJvd0xhYmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImxhYmVsIHJvd1wiKTtcbiAgICAgIHJvd0xhYmVsLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgKyAxKSk7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dMYWJlbCk7XG4gICAgICByb3cuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBsZXQgY2xhc3NlcyA9IFwiY2VsbFwiO1xuICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCkgY2xhc3NlcyArPSBcIiBhdHRhY2tlZFwiO1xuICAgICAgICBpZiAoY2VsbC5zaGlwICYmIHBsYXllciA9PT0gXCJwbGF5ZXJcIikgY2xhc3NlcyArPSBcIiBzaGlwXCI7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhpLCBqKTtcbiAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGNsYXNzZXMsIFtcbiAgICAgICAgICBbXCJpZFwiLCBjb29yZGluYXRlc10sXG4gICAgICAgIF0pO1xuICAgICAgICBpZiAocGxheWVyID09PSBcImNvbXB1dGVyXCIpIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ2VsbCk7XG4gICAgICAgICAgaWYgKGNlbGwuYXR0YWNrZWQgJiYgY2VsbC5zaGlwKSBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxheWVyID09PSBcImR1bW15XCIpIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgYWxsb3dEcm9wKTtcbiAgICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjZWxsRWxlbWVudCk7XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiZHVtbXlcIiAmJiBjZWxsLnNoaXApIHtcbiAgICAgICAgICBpZiAoY2VsbC5zaGlwLnN0YXJ0Q29vcmRpbmF0ZXMgPT09IGNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImRyYWctc2hpcFwiLCBbXG4gICAgICAgICAgICAgIFtcImRyYWdnYWJsZVwiLCB0cnVlXSxcbiAgICAgICAgICAgICAgW1wiZGF0YS1sZW5ndGhcIiwgY2VsbC5zaGlwLmxlbmd0aF0sXG4gICAgICAgICAgICAgIFtcImRhdGEtZGlyZWN0aW9uXCIsIGNlbGwuc2hpcC5kaXJlY3Rpb25dLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3RhdGVTaGlwKTtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnKTtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ2VuZCk7XG4gICAgICAgICAgICBpZiAoY2VsbC5zaGlwLmRpcmVjdGlvbiA9PT0gXCJoXCIpXG4gICAgICAgICAgICAgIHNoaXAuc3R5bGUud2lkdGggPSBgY2FsYygke2NlbGwuc2hpcC5sZW5ndGggKiAxMDB9JSArICR7XG4gICAgICAgICAgICAgICAgY2VsbC5zaGlwLmxlbmd0aCAqIDIgLSAyXG4gICAgICAgICAgICAgIH1weGA7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIHNoaXAuc3R5bGUuaGVpZ2h0ID0gYGNhbGMoJHtjZWxsLnNoaXAubGVuZ3RoICogMTAwfSUgKyAke1xuICAgICAgICAgICAgICAgIGNlbGwuc2hpcC5sZW5ndGggKiAyIC0gMlxuICAgICAgICAgICAgICB9cHhgO1xuICAgICAgICAgICAgY2VsbEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm9hcmRDb250YWluZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJzdGFydEdhbWVcIik7XG4gICAgcmVuZGVyR2FtZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQ29udHJvbHMoYnV0dG9uQ2xhc3MpIHtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIiA/IFwiKyBOZXcgR2FtZVwiIDogXCJTdGFydCBHYW1lXCI7XG4gICAgY29uc3QgZGlzcGxheVRleHQgPVxuICAgICAgYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIlxuICAgICAgICA/IFwiQ2xpY2sgb24gdGhlIGVuZW15J3MgYm9hcmQgdG8gYXR0YWNrXCJcbiAgICAgICAgOiBcIkRyYWcgeW91ciBzaGlwcyB0byBtb3ZlIHRoZW0uIENsaWNrIHRoZW0gdG8gcm90YXRlIHRoZW0uXCI7XG4gICAgY29uc3QgZm4gPSBidXR0b25DbGFzcyA9PT0gXCJuZXctZ2FtZVwiID8gcmVzdGFydEdhbWUgOiBzdGFydEdhbWU7XG4gICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcImNvbnRyb2xzXCIpO1xuICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgYnV0dG9uVGV4dCwgYnV0dG9uQ2xhc3MpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm4pO1xuICAgIGNvbnRyb2xTZWN0aW9uLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgY29uc3QgdGV4dERpc3BsYXkgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiZGlzcGxheVwiKTtcbiAgICB0ZXh0RGlzcGxheS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBkaXNwbGF5VGV4dCwgXCJkaXNwbGF5X190ZXh0XCIpKTtcbiAgICBjb250cm9sU2VjdGlvbi5hcHBlbmRDaGlsZCh0ZXh0RGlzcGxheSk7XG4gICAgcmV0dXJuIGNvbnRyb2xTZWN0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyR2FtZVNjcmVlbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgY2xlYW5FbGVtZW50KG1haW4pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocmVuZGVyQ29udHJvbHMoXCJuZXctZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJZb3VyIEJvYXJkXCIpKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgY29uc3QgZW5lbXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIkVuZW15J3MgQm9hcmRcIikpO1xuICAgIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChib2FyZHMuY29tcHV0ZXIsIFwiY29tcHV0ZXJcIikpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlTZWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFuRWxlbWVudChwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgcmVuZGVyR2FtZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJyZXN0YXJ0R2FtZVwiKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgY2xlYW5FbGVtZW50KGJvZHkpO1xuICAgIHJlbmRlclBhZ2VMYXlvdXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbWl6ZVBsYXllckJvYXJkKCkge1xuICAgIGV2ZW50cy5lbWl0KFwiUmFuZG9taXplUGxheWVyQm9hcmRcIik7XG4gICAgcmVuZGVyU2V0dXBCb2FyZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyU2V0dXBCb2FyZCgpIHtcbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24ucGxheWVyLnNldHVwXCIpO1xuICAgIGNsZWFuRWxlbWVudChwbGF5ZXJTZWN0aW9uKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIllvdXIgQm9hcmRcIikpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLnBsYXllciwgXCJkdW1teVwiKSk7XG4gICAgY29uc3QgcmFuZG9taXplQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIlJhbmRvbWl6ZVwiLCBcInJhbmRvbWl6ZVwiKTtcbiAgICByYW5kb21pemVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJhbmRvbWl6ZVBsYXllckJvYXJkKTtcbiAgICBjb25zdCBidG5Db250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiYnRuLWNvbnRhaW5lclwiKTtcbiAgICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQocmFuZG9taXplQnRuKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGJ0bkNvbnRhaW5lcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJQYWdlTGF5b3V0KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcIkJhdHRsZXNoaXBcIikpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHJlbmRlckNvbnRyb2xzKFwic3RhcnQtZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCwgXCJwbGF5ZXIgc2V0dXBcIik7XG5cbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcblxuICAgIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgY29uc3QgYSA9IGNyZWF0ZUVsZW1lbnQoXCJhXCIsIFwiXCIsIFwiXCIsIFtcbiAgICAgIFtcImhyZWZcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vamNpZHBcIl0sXG4gICAgICBbXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIl0sXG4gICAgXSk7XG4gICAgYS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBcIkNyZWF0ZWQgYnkgamNpZHBcIikpO1xuICAgIGEuYXBwZW5kQ2hpbGQoXG4gICAgICByZW5kZXJMaW5rSWNvbihcbiAgICAgICAgXCJnaXRodWJcIixcbiAgICAgICAgXCIwIDAgMjQgMjRcIixcbiAgICAgICAgXCJNMTIsMkExMCwxMCAwIDAsMCAyLDEyQzIsMTYuNDIgNC44NywyMC4xNyA4Ljg0LDIxLjVDOS4zNCwyMS41OCA5LjUsMjEuMjcgOS41LDIxQzkuNSwyMC43NyA5LjUsMjAuMTQgOS41LDE5LjMxQzYuNzMsMTkuOTEgNi4xNCwxNy45NyA2LjE0LDE3Ljk3QzUuNjgsMTYuODEgNS4wMywxNi41IDUuMDMsMTYuNUM0LjEyLDE1Ljg4IDUuMSwxNS45IDUuMSwxNS45QzYuMSwxNS45NyA2LjYzLDE2LjkzIDYuNjMsMTYuOTNDNy41LDE4LjQ1IDguOTcsMTggOS41NCwxNy43NkM5LjYzLDE3LjExIDkuODksMTYuNjcgMTAuMTcsMTYuNDJDNy45NSwxNi4xNyA1LjYyLDE1LjMxIDUuNjIsMTEuNUM1LjYyLDEwLjM5IDYsOS41IDYuNjUsOC43OUM2LjU1LDguNTQgNi4yLDcuNSA2Ljc1LDYuMTVDNi43NSw2LjE1IDcuNTksNS44OCA5LjUsNy4xN0MxMC4yOSw2Ljk1IDExLjE1LDYuODQgMTIsNi44NEMxMi44NSw2Ljg0IDEzLjcxLDYuOTUgMTQuNSw3LjE3QzE2LjQxLDUuODggMTcuMjUsNi4xNSAxNy4yNSw2LjE1QzE3LjgsNy41IDE3LjQ1LDguNTQgMTcuMzUsOC43OUMxOCw5LjUgMTguMzgsMTAuMzkgMTguMzgsMTEuNUMxOC4zOCwxNS4zMiAxNi4wNCwxNi4xNiAxMy44MSwxNi40MUMxNC4xNywxNi43MiAxNC41LDE3LjMzIDE0LjUsMTguMjZDMTQuNSwxOS42IDE0LjUsMjAuNjggMTQuNSwyMUMxNC41LDIxLjI3IDE0LjY2LDIxLjU5IDE1LjE3LDIxLjVDMTkuMTQsMjAuMTYgMjIsMTYuNDIgMjIsMTJBMTAsMTAgMCAwLDAgMTIsMlpcIixcbiAgICAgICksXG4gICAgKTtcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4gICAgcmVuZGVyU2V0dXBCb2FyZCgpO1xuICB9XG5cbiAgZXZlbnRzLm9uKFwic2V0dXBCb2FyZHNcIiwgc2V0dXBCb2FyZHMpO1xuICBldmVudHMub24oXCJ0dXJuRW5kXCIsIHVwZGF0ZVNjcmVlbik7XG4gIGV2ZW50cy5vbihcImdhbWVPdmVyXCIsIHNob3dHYW1lT3Zlcik7XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQYWdlTGF5b3V0LFxuICAgIHJlbmRlckdhbWVTY3JlZW4sXG4gICAgdXBkYXRlU2NyZWVuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tQ29udHJvbGxlcjtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXI7XG4gIGxldCBjb21wdXRlcjtcbiAgbGV0IGFjdGl2ZUdhbWUgPSBmYWxzZTtcblxuICBjb25zdCBnZXRQbGF5ZXIgPSAoKSA9PiBwbGF5ZXI7XG4gIGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAod2lubmVyKSA9PiB7XG4gICAgYWN0aXZlR2FtZSA9IGZhbHNlO1xuICAgIGV2ZW50cy5lbWl0KFwiZ2FtZU92ZXJcIiwgd2lubmVyKTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXkgPSBnZXRQbGF5ZXIoKTtcbiAgICBnZXRDb21wdXRlcigpLm1ha2VSYW5kb21BdHRhY2soZW5lbXkpO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRDb21wdXRlcigpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheVR1cm4gPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUdhbWUpIHJldHVybjtcbiAgICBjb25zdCBlbmVteSA9IGdldENvbXB1dGVyKCk7XG4gICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IGdldFBsYXllcigpLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdmFsaWRDb29yZGluYXRlcykgcmV0dXJuO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcblxuICAgIGlmIChlbmVteS5ib2FyZC5oYXZlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGdhbWVPdmVyKGdldFBsYXllcigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJZb3VcIik7XG4gICAgcGxheWVyLmJvYXJkLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBjb21wdXRlci5ib2FyZC5maWxsQm9hcmRXaXRoU2hpcHMoKTtcbiAgICBldmVudHMuZW1pdChcInNldHVwQm9hcmRzXCIsIHtcbiAgICAgIHBsYXllcjogZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSxcbiAgICAgIGNvbXB1dGVyOiBnZXRDb21wdXRlcigpLmdldEJvYXJkKCksXG4gICAgfSk7XG4gICAgZXZlbnRzLm9uKFxuICAgICAgXCJSYW5kb21pemVQbGF5ZXJCb2FyZFwiLFxuICAgICAgcGxheWVyLmJvYXJkLnJlc2V0Qm9hcmQuYmluZChwbGF5ZXIuYm9hcmQpLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGFjdGl2ZUdhbWUgPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllci5ib2FyZC5yZXNldEJvYXJkKCk7XG4gICAgY29tcHV0ZXIuYm9hcmQucmVzZXRCb2FyZCgpO1xuICAgIHBsYXllci5yZXNldFNob3RzQXZhaWxhYmxlKCk7XG4gICAgY29tcHV0ZXIucmVzZXRTaG90c0F2YWlsYWJsZSgpO1xuICB9O1xuXG4gIGNvbnN0IG1vdmVTaGlwID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcGxheWVyLmJvYXJkLm1vdmVTaGlwKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSk7XG4gIH07XG5cbiAgZXZlbnRzLm9uKFwic3RhcnRHYW1lXCIsIHN0YXJ0R2FtZSk7XG4gIGV2ZW50cy5vbihcIm1vdmVTaGlwXCIsIG1vdmVTaGlwKTtcbiAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgcmVzdGFydEdhbWUpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0dXBHYW1lLFxuICAgIHN0YXJ0R2FtZSxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0Q29tcHV0ZXIsXG4gICAgcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jb25zdHJ1Y3Rvci5maWxsQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWxsQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKHsgYXR0YWNrZWQ6IGZhbHNlLCBzaGlwOiBudWxsIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBmaWxsQm9hcmRXaXRoU2hpcHMoKSB7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSg1KTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDQpO1xuICAgIHRoaXMucGxhY2VTaGlwUmFuZG9tbHkoMyk7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSgzKTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDIpO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmNsZWFuQm9hcmQoKTtcbiAgICB0aGlzLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICB9XG5cbiAgY2xlYW5Cb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93LmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hdHRhY2tlZCA9IGZhbHNlO1xuICAgICAgICBjZWxsLnNoaXAgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgaWYgKCFlbmQpIHtcbiAgICAgIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sXS5zaGlwID0gbmV3IFNoaXAoMSwgc3RhcnQsIFwiaFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgW2VuZENvbCwgZW5kUm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhlbmQpO1xuICAgIGNvbnN0IGRpc3RhbmNlID1cbiAgICAgIHN0YXJ0Um93ID09PSBlbmRSb3cgPyBlbmRDb2wgLSBzdGFydENvbCArIDEgOiBlbmRSb3cgLSBzdGFydFJvdyArIDE7XG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGRpc3RhbmNlLCBzdGFydCwgc3RhcnRSb3cgPT09IGVuZFJvdyA/IFwiaFwiIDogXCJ2XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICBlbHNlIHRoaXMuYm9hcmRbc3RhcnRSb3cgKyBpXVtzdGFydENvbF0uc2hpcCA9IHNoaXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvckVhY2hQb3NpdGlvbkNlbGwoc3RhcnRDb29yZGluYXRlcywgZGlyZWN0aW9uLCBsZW5ndGgsIGZuKSB7XG4gICAgY29uc3QgW3N0YXJ0Q29sLCBzdGFydFJvd10gPVxuICAgICAgdGhpcy5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKHN0YXJ0Q29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaFwiKSByZXN1bHQucHVzaChmbihzdGFydFJvdywgc3RhcnRDb2wgKyBpKSk7XG4gICAgICBlbHNlIHJlc3VsdC5wdXNoKGZuKHN0YXJ0Um93ICsgaSwgc3RhcnRDb2wpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIG1vdmVTaGlwKHNvdXJjZUNvb3JkaW5hdGVzLCB0YXJnZXRDb29yZGluYXRlcykge1xuICAgIGNvbnN0IHsgc2hpcCB9ID0gdGhpcy5nZXRDb29yZGluYXRlcyhzb3VyY2VDb29yZGluYXRlcyk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGFyZ2V0Q29vcmRpbmF0ZXMgPyBzaGlwLmRpcmVjdGlvbiA6IG51bGw7XG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmZvckVhY2hQb3NpdGlvbkNlbGwoXG4gICAgICB0YXJnZXRDb29yZGluYXRlcyB8fCBzb3VyY2VDb29yZGluYXRlcyxcbiAgICAgIGRpcmVjdGlvbiB8fCAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaFwiID8gXCJ2XCIgOiBcImhcIiksXG4gICAgICBzaGlwLmxlbmd0aCxcbiAgICAgIChyb3csIGNvbCkgPT4gdGhpcy5pc0Nvb3JkaW5hdGVGcmVlKHJvdywgY29sLCBzaGlwKSxcbiAgICApO1xuICAgIGlmICghbmV3Q29vcmRpbmF0ZXMuZXZlcnkoKGNlbGwpID0+IGNlbGwpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFyZ2V0IHBvc2l0aW9uIGlzIG9jY3VwaWVkXCIpO1xuICAgIHRoaXMuY29uc3RydWN0b3IuZm9yRWFjaFBvc2l0aW9uQ2VsbChcbiAgICAgIHNvdXJjZUNvb3JkaW5hdGVzLFxuICAgICAgc2hpcC5kaXJlY3Rpb24sXG4gICAgICBzaGlwLmxlbmd0aCxcbiAgICAgIChyb3csIGNvbCkgPT4ge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gbnVsbDtcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAodGFyZ2V0Q29vcmRpbmF0ZXMpIHNoaXAuc3RhcnRDb29yZGluYXRlcyA9IHRhcmdldENvb3JkaW5hdGVzO1xuICAgIGVsc2Ugc2hpcC5kaXJlY3Rpb24gPSBzaGlwLmRpcmVjdGlvbiA9PT0gXCJoXCIgPyBcInZcIiA6IFwiaFwiO1xuICAgIHRoaXMuY29uc3RydWN0b3IuZm9yRWFjaFBvc2l0aW9uQ2VsbChcbiAgICAgIHRhcmdldENvb3JkaW5hdGVzIHx8IHNvdXJjZUNvb3JkaW5hdGVzLFxuICAgICAgc2hpcC5kaXJlY3Rpb24sXG4gICAgICBzaGlwLmxlbmd0aCxcbiAgICAgIChyb3csIGNvbCkgPT4ge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gc2hpcDtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIHJvdGF0ZVNoaXAoc291cmNlQ29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCB7IHNoaXAgfSA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXMoc291cmNlQ29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5mb3JFYWNoUG9zaXRpb25DZWxsKFxuICAgICAgc291cmNlQ29vcmRpbmF0ZXMsXG4gICAgICBzaGlwLmRpcmVjdGlvbiA9PT0gXCJoXCIgPyBcInZcIiA6IFwiaFwiLFxuICAgICAgc2hpcC5sZW5ndGgsXG4gICAgICAocm93LCBjb2wpID0+IHRoaXMuaXNDb29yZGluYXRlRnJlZShyb3csIGNvbCwgc2hpcCksXG4gICAgKTtcbiAgICBpZiAoIW5ld0Nvb3JkaW5hdGVzLmV2ZXJ5KChjZWxsKSA9PiBjZWxsKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRhcmdldCBwb3NpdGlvbiBpcyBvY2N1cGllZFwiKTtcbiAgfVxuXG4gIGlzQ29vcmRpbmF0ZUZyZWUocm93LCBjb2wsIHNoaXApIHtcbiAgICBpZiAoY29sIDwgMCB8fCBjb2wgPiA5IHx8IHJvdyA8IDAgfHwgcm93ID4gOSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgQ29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHJvdyA+IDAgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93IC0gMV1bY29sXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3cgLSAxXVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIGNvbCA8IDkgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyAxXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbCArIDFdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHJvdyA8IDkgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93ICsgMV1bY29sXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3cgKyAxXVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIGNvbCA+IDAgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgLSAxXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbCAtIDFdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNQb3NpdGlvblZhbGlkKHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnQpO1xuICAgIGNvbnN0IFtlbmRDb2wsIGVuZFJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoZW5kKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9XG4gICAgICBzdGFydFJvdyA9PT0gZW5kUm93ID8gZW5kQ29sIC0gc3RhcnRDb2wgKyAxIDogZW5kUm93IC0gc3RhcnRSb3cgKyAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29vcmRpbmF0ZUZyZWUoc3RhcnRSb3csIHN0YXJ0Q29sICsgaSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNDb29yZGluYXRlRnJlZShzdGFydFJvdyArIGksIHN0YXJ0Q29sKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcGxhY2VTaGlwUmFuZG9tbHkobGVuZ3RoKSB7XG4gICAgbGV0IGluaXRpYWxQb3NpdGlvbjtcbiAgICBsZXQgZmluYWxQb3NpdGlvbjtcbiAgICBsZXQgdmFsaWRQb3NpdGlvbiA9IGZhbHNlO1xuICAgIHdoaWxlICghdmFsaWRQb3NpdGlvbikge1xuICAgICAgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRDb29yZGluYXRlc0Zyb21OdW1iZXIoXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIGZpbmFsUG9zaXRpb24gPVxuICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgICAgICBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDEgPD0gNzRcbiAgICAgICAgICAgICAgPyBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgOiBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSAtIGxlbmd0aCArIDEsXG4gICAgICAgICAgKSArIGluaXRpYWxQb3NpdGlvbi5zbGljZSgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxOdW1iZXIgPSAraW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpO1xuICAgICAgICBmaW5hbFBvc2l0aW9uID1cbiAgICAgICAgICBpbml0aWFsUG9zaXRpb25bMF0gK1xuICAgICAgICAgIChpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMSA8PSAxMFxuICAgICAgICAgICAgPyBpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMVxuICAgICAgICAgICAgOiBpbml0aWFsTnVtYmVyIC0gbGVuZ3RoICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGluaXRpYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApID4gZmluYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApIHx8XG4gICAgICAgICtpbml0aWFsUG9zaXRpb24uc2xpY2UoMSkgPiArZmluYWxQb3NpdGlvbi5zbGljZSgxKVxuICAgICAgKSB7XG4gICAgICAgIFtpbml0aWFsUG9zaXRpb24sIGZpbmFsUG9zaXRpb25dID0gW2ZpbmFsUG9zaXRpb24sIGluaXRpYWxQb3NpdGlvbl07XG4gICAgICB9XG4gICAgICB2YWxpZFBvc2l0aW9uID0gdGhpcy5pc1Bvc2l0aW9uVmFsaWQoaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5wbGFjZVNoaXAoaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgY29sSW5kZXggPSBjb29yZGluYXRlcy5jaGFyQ29kZUF0KDApIC0gNjU7XG4gICAgY29uc3Qgcm93SW5kZXggPSArY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSAxO1xuICAgIGlmIChjb2xJbmRleCA8IDAgfHwgY29sSW5kZXggPiA5IHx8IHJvd0luZGV4IDwgMCB8fCByb3dJbmRleCA+IDkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIENvb3JkaW5hdGVzXCIpO1xuICAgIHJldHVybiBbY29sSW5kZXgsIHJvd0luZGV4XTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY0ICsgK2Nvb3JkaW5hdGVzLnNsaWNlKDEpICogMTAgLSAxMDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIobikge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKChuICUgMTAgPT09IDAgPyAxMCA6IG4gJSAxMCkgKyA2NCl9JHtcbiAgICAgIE1hdGguZmxvb3IobiAvIDEwKSArIChuICUgMTAgPT09IDAgPyAwIDogMSlcbiAgICB9YDtcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVwZWF0ZWQgY29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKGNlbGwuc2hpcCkge1xuICAgICAgY2VsbC5zaGlwLmhpdCgpO1xuICAgIH1cbiAgICBjb25zdCBbY29sLCByb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5hdHRhY2tlZCA9IHRydWU7XG4gIH1cblxuICBoYXZlQWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmV2ZXJ5KChyb3cpID0+XG4gICAgICByb3cuZXZlcnkoKGNlbGwpID0+ICFjZWxsLnNoaXAgfHwgY2VsbC5zaGlwLmlzU3VuaygpKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY29udGVudCwgY2xhc3NlcywgYXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBpZiAoY29udGVudCkgZWxlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGUuY2xhc3NMaXN0LmFkZChteUNsYXNzKSk7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMpXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKSxcbiAgICApO1xuICByZXR1cm4gZWxlO1xufTtcblxuY29uc3QgcmVuZGVyTGlua0ljb24gPSAobmFtZSwgdmlld0JveCwgcGF0aCwgbXlDbGFzcykgPT4ge1xuICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBcInBhdGhcIixcbiAgKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG5cbiAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBwYXRoKTtcblxuICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcblxuICBpZiAobmFtZSA9PT0gXCJwZW5jaWxcIiB8fCBuYW1lID09PSBcImRlbGV0ZVwiKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIGlmIChteUNsYXNzKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobXlDbGFzcyk7XG5cbiAgcmV0dXJuIGljb25Tdmc7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmZpbGwoKSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgfVxuXG4gIHJlc2V0U2hvdHNBdmFpbGFibGUoKSB7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IEFycmF5LmZyb20oQXJyYXkoMTAwKS5maWxsKCksIChfLCBpKSA9PiBpICsgMSk7XG4gIH1cblxuICBhdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hvdE51bWJlciA9XG4gICAgICB0aGlzLmJvYXJkLmNvbnN0cnVjdG9yLmdldE51bWJlckZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKCF0aGlzLnNob3RzQXZhaWxhYmxlLmluY2x1ZGVzKHNob3ROdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgZW5lbXkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IHRoaXMuc2hvdHNBdmFpbGFibGUuZmlsdGVyKChuKSA9PiBuICE9PSBzaG90TnVtYmVyKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG1ha2VSYW5kb21BdHRhY2soZW5lbXkpIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuYm9hcmQuY29uc3RydWN0b3IuZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKFxuICAgICAgdGhpcy5zaG90c0F2YWlsYWJsZVtcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zaG90c0F2YWlsYWJsZS5sZW5ndGgpXG4gICAgICBdLFxuICAgICk7XG4gICAgdGhpcy5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5ib2FyZDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBldmVudHMgPSAoKCkgPT4ge1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBjb25zdCBvbiA9IChldmVudE5hbWUsIGZuKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKVxuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgfTtcblxuICBjb25zdCBvZmYgPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSkgcmV0dXJuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZW1pdCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGVtaXQsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBldmVudHM7XG4iLCJjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCBkaXJlY3Rpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN0YXJ0Q29vcmRpbmF0ZXMgPSBzdGFydENvb3JkaW5hdGVzO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMrKztcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiZXhwbG9zaW9uLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBzdmg7XFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gNHJlbSk7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxufVxcbmZvb3RlciBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbmZvb3RlciBzdmcge1xcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gIGZpbGw6IHdoaXRlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG59XFxuc2VjdGlvbiBoMiB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5idXR0b246aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY29udHJvbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcm93LWdhcDogMWVtO1xcbn1cXG4uY29udHJvbHMgYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmNvbnRyb2xzIC5kaXNwbGF5IHtcXG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKS9yZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMTdlbSkgLyAyKTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMyUpO1xcbn1cXG4uYm9hcmQgLmxhYmVsIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5ib2FyZCAuY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNTU1O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmJvYXJkIC5jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogc3RlZWxibHVlO1xcbn1cXG4uYm9hcmQgLmNlbGwuc2hpcC5hdHRhY2tlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmEzMjMyO1xcbn1cXG4uYm9hcmQgLmNlbGwuYXR0YWNrZWQ6bm90KC5zaGlwKTo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIidcXFwiO1xcbiAgd2lkdGg6IDAuNWVtO1xcbiAgaGVpZ2h0OiAwLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4uYm9hcmQgLmNlbGwuYXR0YWNrZWQuc2hpcDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogMWVtO1xcbiAgaGVpZ2h0OiAxZW07XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIvY29udGFpbjtcXG59XFxuLmJvYXJkIC5jZWxsIC5kcmFnLXNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogc3RlZWxibHVlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogMTtcXG59XFxuLmJvYXJkIC5jZWxsIC5kcmFnLXNoaXA6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucGxheWVyLnNldHVwIC5kdW1teS5ib2FyZCB7XFxuICBwYWRkaW5nLWJvdHRvbTogMDtcXG59XFxuLnBsYXllci5zZXR1cCAuYnRuLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5wbGF5ZXIuc2V0dXAgLnJhbmRvbWl6ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICBtYWluIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDIsIG1heC1jb250ZW50KS9yZXBlYXQoMiwgMWZyKTtcXG4gICAgd2lkdGg6IG1pbigxMjAwcHgsIDEwMCUgLSA0cmVtKTtcXG4gIH1cXG4gIG1haW4gc2VjdGlvbjpmaXJzdC1vZi10eXBlLCBtYWluIHNlY3Rpb24ucGxheWVyLnNldHVwIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICB9XFxuICAuYm9hcmQge1xcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHN2aCAtIDE4ZW0pO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFNQTtFQUNFLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFMRjs7QUFVQTtFQUNFLGFBQUE7RUFDQSwrQ0FBQTtFQUNBLGNBQUE7QUFQRjs7QUFVQTtFQUNFLDZCQUFBO0VBQ0EsbUJBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQXpCZ0I7RUEwQmhCLFlBdkJhO0VBd0JiLGtCQUFBO0VBQ0EsZ0JBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQWhDZ0I7RUFpQ2hCLGlCQUFBO0FBUEY7QUFTRTtFQUNFLFlBakNXO0VBa0NYLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFQSjtBQVVFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBM0NXO0FBbUNmOztBQWNBO0VBQ0UsZUFBQTtBQVhGO0FBYUU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0FBWEo7O0FBZUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBWkY7QUFjRTtFQUNFLGVBQUE7QUFaSjs7QUFrQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBZkY7QUFpQkU7RUFDRSwyQkFuRlk7RUFvRlosWUFoRlc7QUFpRWY7QUFrQkU7RUFDRSxtQkFBQTtBQWhCSjs7QUFzQkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwRUFBQTtFQUNBLGlCQUFBO0VBQ0EscUNBQUE7RUFDQSwwQkFBQTtBQW5CRjtBQXFCRTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQW5CSjtBQXNCRTtFQUNFLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFwQko7QUFzQkk7RUFDRSwyQkFuSFU7QUErRmhCO0FBcUJNO0VBQ0UseUJBbkhVO0FBZ0dsQjtBQXVCSTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFyQk47QUF3Qkk7RUFDRSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSw0RUFBQTtBQXRCTjtBQXlCSTtFQUNFLDJCQXpJVTtFQTBJVixNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FBdkJOO0FBeUJNO0VBQ0UsZUFBQTtBQXZCUjs7QUE4QkU7RUFDRSxpQkFBQTtBQTNCSjtBQThCRTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQTVCSjtBQStCRTtFQUNFLDZCQUFBO0FBN0JKOztBQWtDQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLG9EQUFBO0lBQ0EsK0JBQUE7RUEvQkY7RUFpQ0U7SUFDRSxpQkFBQTtFQS9CSjtFQW1DQTtJQUNFLCtCQUFBO0VBakNGO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiJHByaW1hcnktY29sb3I6IHN0ZWVsYmx1ZTtcXG4kc2Vjb25kYXJ5LWNvbG9yOiAjNTU1O1xcbiRoaWdobGlnaHQtY29sb3I6ICNmYTMyMzI7XFxuJHByaW1hcnktZmM6IGJsYWNrO1xcbiRzZWNvbmRhcnktZmM6IHdoaXRlO1xcblxcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8vIEdlbmVyYWwgbGF5b3V0XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCAxZnIgbWF4LWNvbnRlbnQ7XFxuICBoZWlnaHQ6IDEwMHN2aDtcXG59XFxuXFxubWFpbiB7XFxuICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSA0cmVtKTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcblxcbiAgYSB7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgICBmaWxsOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcbn1cXG5cXG4vLyBHYW1lIHZpZXdcXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG5cXG4gIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcblxcbmJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgXFxuICAmOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcbn1cXG5cXG4vLyBDb250cm9sc1xcblxcbi5jb250cm9scyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICByb3ctZ2FwOiAxZW07XFxuXFxuICBidXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB9XFxuXFxuICAuZGlzcGxheSB7XFxuICAgIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxuICB9XFxufVxcblxcbi8vIEJvYXJkc1xcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKSAvIHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDE3ZW0pIC8gMik7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTMlKTtcXG5cXG4gIC5sYWJlbCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5jZWxsIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgJHNlY29uZGFyeS1jb2xvcjtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICAgICYuc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgICAgJi5hdHRhY2tlZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgXFxuICAgICYuYXR0YWNrZWQ6bm90KC5zaGlwKTo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCInXFxcIjtcXG4gICAgICB3aWR0aDogMC41ZW07XFxuICAgICAgaGVpZ2h0OiAwLjVlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIH1cXG5cXG4gICAgJi5hdHRhY2tlZC5zaGlwOjphZnRlciB7XFxuICAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICAgd2lkdGg6IDFlbTtcXG4gICAgICBoZWlnaHQ6IDFlbTtcXG4gICAgICBiYWNrZ3JvdW5kOiB1cmwoZXhwbG9zaW9uLnBuZykgbm8tcmVwZWF0IGNlbnRlci9jb250YWluO1xcbiAgICB9XFxuXFxuICAgIC5kcmFnLXNoaXAge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgei1pbmRleDogMTtcXG5cXG4gICAgICAmOmhvdmVyIHtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuLnBsYXllci5zZXR1cCB7XFxuICAuZHVtbXkuYm9hcmQge1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcXG4gIH1cXG5cXG4gIC5idG4tY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuXFxuICAucmFuZG9taXplIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIC8vYm9yZGVyOiAxcHggc29saWQgJHByaW1hcnktY29sb3I7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA4MDBweCkge1xcbiAgbWFpbiB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgyLCBtYXgtY29udGVudCkgLyByZXBlYXQoMiwgMWZyKTtcXG4gICAgd2lkdGg6IG1pbigxMjAwcHgsIDEwMCUgLSA0cmVtKTtcXG5cXG4gICAgc2VjdGlvbjpmaXJzdC1vZi10eXBlLCBzZWN0aW9uLnBsYXllci5zZXR1cCB7XFxuICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgfVxcbiAgfVxcblxcbiAgLmJvYXJkIHtcXG4gICAgbWF4LWhlaWdodDogY2FsYygxMDBzdmggLSAxOGVtKTtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuXG5nYW1lQ29udHJvbGxlci5zZXR1cEdhbWUoKTtcbmRvbUNvbnRyb2xsZXIucmVuZGVyUGFnZUxheW91dCgpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJyZW5kZXJMaW5rSWNvbiIsImV2ZW50cyIsImRvbUNvbnRyb2xsZXIiLCJib2FyZHMiLCJzZXR1cEJvYXJkcyIsIm5ld0JvYXJkcyIsImdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMiLCJyb3ciLCJjb2wiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJkaXNwbGF5IiwibWVzc2FnZSIsInRleHQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsInNob3dHYW1lT3ZlciIsIndpbm5lciIsIm5hbWUiLCJhdHRhY2tDZWxsIiwiZSIsImVtaXQiLCJ0YXJnZXQiLCJpZCIsInJvdGF0ZVNoaXAiLCJjbG9zZXN0IiwicmVuZGVyU2V0dXBCb2FyZCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImdldENvb3JkaW5hdGVzT2Zmc2V0IiwiY29vcmRpbmF0ZXMiLCJvZmZzZXQiLCJkaXJlY3Rpb24iLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImxlbmd0aFgiLCJkYXRhc2V0Iiwib2Zmc2V0V2lkdGgiLCJsZW5ndGgiLCJsZW5ndGhZIiwib2Zmc2V0SGVpZ2h0Iiwic3F1YXJlT2Zmc2V0IiwiTWF0aCIsImZsb29yIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJlZmZlY3RBbGxvd2VkIiwiYWxsb3dEcm9wIiwicHJldmVudERlZmF1bHQiLCJkcm9wRWZmZWN0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJzdHlsZSIsInpJbmRleCIsImRyb3AiLCJzb3VyY2VDb29yZGluYXRlcyIsImdldERhdGEiLCJvZmZTZXQiLCJzb3VyY2VDZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInRhcmdldENvb3JkaW5hdGVzIiwiZHJhZ2VuZCIsInNoaXBzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzaGlwIiwicmVuZGVyQm9hcmQiLCJib2FyZCIsInBsYXllciIsImJvYXJkQ29udGFpbmVyIiwiaSIsImNvbExhYmVsIiwiYXBwZW5kQ2hpbGQiLCJyb3dMYWJlbCIsImNlbGwiLCJqIiwiY2xhc3NlcyIsImF0dGFja2VkIiwiY2VsbEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkIiwic3RhcnRDb29yZGluYXRlcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhcnRHYW1lIiwicmVuZGVyR2FtZVNjcmVlbiIsInJlbmRlckNvbnRyb2xzIiwiYnV0dG9uQ2xhc3MiLCJidXR0b25UZXh0IiwiZGlzcGxheVRleHQiLCJmbiIsInJlc3RhcnRHYW1lIiwiY29udHJvbFNlY3Rpb24iLCJidG4iLCJ0ZXh0RGlzcGxheSIsIm1haW4iLCJjbGVhbkVsZW1lbnQiLCJwbGF5ZXJTZWN0aW9uIiwiZW5lbXlTZWN0aW9uIiwiY29tcHV0ZXIiLCJwYXJlbnQiLCJjaGlsZCIsInJlbW92ZUNoaWxkIiwidXBkYXRlU2NyZWVuIiwiYm9keSIsInJlbmRlclBhZ2VMYXlvdXQiLCJyYW5kb21pemVQbGF5ZXJCb2FyZCIsInJhbmRvbWl6ZUJ0biIsImJ0bkNvbnRhaW5lciIsImhlYWRlciIsImZvb3RlciIsImEiLCJvbiIsIlBsYXllciIsImdhbWVDb250cm9sbGVyIiwiYWN0aXZlR2FtZSIsImdldFBsYXllciIsImdldENvbXB1dGVyIiwiZ2FtZU92ZXIiLCJjb21wdXRlclR1cm4iLCJlbmVteSIsIm1ha2VSYW5kb21BdHRhY2siLCJoYXZlQWxsU2hpcHNTdW5rIiwicGxheVR1cm4iLCJ2YWxpZENvb3JkaW5hdGVzIiwiYXR0YWNrIiwic2V0dXBHYW1lIiwiZmlsbEJvYXJkV2l0aFNoaXBzIiwiZ2V0Qm9hcmQiLCJyZXNldEJvYXJkIiwiYmluZCIsInJlc2V0U2hvdHNBdmFpbGFibGUiLCJtb3ZlU2hpcCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsImZpbGxCb2FyZCIsInB1c2giLCJwbGFjZVNoaXBSYW5kb21seSIsImNsZWFuQm9hcmQiLCJwbGFjZVNoaXAiLCJzdGFydCIsImVuZCIsInN0YXJ0Q29sIiwic3RhcnRSb3ciLCJnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzIiwiZW5kQ29sIiwiZW5kUm93IiwiZGlzdGFuY2UiLCJmb3JFYWNoUG9zaXRpb25DZWxsIiwicmVzdWx0IiwiZ2V0Q29vcmRpbmF0ZXMiLCJuZXdDb29yZGluYXRlcyIsImlzQ29vcmRpbmF0ZUZyZWUiLCJldmVyeSIsIkVycm9yIiwiaXNQb3NpdGlvblZhbGlkIiwiaW5pdGlhbFBvc2l0aW9uIiwiZmluYWxQb3NpdGlvbiIsInZhbGlkUG9zaXRpb24iLCJnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIiLCJyYW5kb20iLCJpbml0aWFsTnVtYmVyIiwiY29sSW5kZXgiLCJyb3dJbmRleCIsImdldE51bWJlckZyb21Db29yZGluYXRlcyIsIm4iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiZWxlbWVudCIsImNvbnRlbnQiLCJhdHRyaWJ1dGVzIiwiZWxlIiwic3BsaXQiLCJteUNsYXNzIiwiYXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidmlld0JveCIsInBhdGgiLCJpY29uU3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiaWNvblBhdGgiLCJ0aXRsZSIsInNob3RzQXZhaWxhYmxlIiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsIl8iLCJzaG90TnVtYmVyIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJnZXROYW1lIiwiZXZlbnROYW1lIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwib2ZmIiwic3BsaWNlIiwiZGF0YSIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9