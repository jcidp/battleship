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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pubsub */ "./src/modules/pubsub.js");



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
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("playerAttack", e.target.id);
  }
  function rotateShip(e) {
    try {
      _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("moveShip", [e.target.closest(".cell").id]);
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
      _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("moveShip", [sourceCoordinates, targetCoordinates]);
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
            if (cell.ship.direction === "h") ship.style.width = cell.ship.length === 5 ? "560%" : `${cell.ship.length * 111}%`;else ship.style.height = `${cell.ship.length * 11}0%`;
            cellElement.appendChild(ship);
          }
        }
      });
    });
    return boardContainer;
  }
  function startGame() {
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("startGame");
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
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("restartGame");
    const body = document.querySelector("body");
    cleanElement(body);
    renderPageLayout();
  }
  function randomizePlayerBoard() {
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("RandomizePlayerBoard");
    renderSetupBoard();
  }
  function renderSetupBoard() {
    const playerSection = document.querySelector("section.player.setup");
    cleanElement(playerSection);
    playerSection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", "Your Board"));
    playerSection.appendChild(renderBoard(boards.player, "dummy"));
    const randomizeBtn = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", "Randomize", "randomize");
    randomizeBtn.addEventListener("click", randomizePlayerBoard);
    playerSection.appendChild(randomizeBtn);
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
  _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("setupBoards", setupBoards);
  _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("turnEnd", updateScreen);
  _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("gameOver", showGameOver);
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100dvh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 1em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n}\nbutton:hover {\n  cursor: pointer;\n}\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n}\n.controls button {\n  background-color: steelblue;\n  color: white;\n}\n.controls .display {\n  min-height: 2.25rem;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr))/repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 18em) / 2);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n  display: grid;\n  place-content: center;\n  position: relative;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}\n.board .cell.ship.attacked {\n  background-color: #fa3232;\n}\n.board .cell.attacked::after {\n  content: \"'\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: black;\n  border-radius: 50%;\n}\n.board .cell .drag-ship {\n  background-color: steelblue;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 1;\n}\n.board .cell .drag-ship:hover {\n  cursor: pointer;\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n}\n.player.setup .dummy.board {\n  padding-bottom: 0;\n  max-height: calc(100svh - 18em);\n}\n.player.setup .randomize {\n  background-color: transparent;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,6BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,sBAzBgB;EA0BhB,YAvBa;EAwBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBAhCgB;EAiChB,iBAAA;AAPF;AASE;EACE,YAjCW;EAkCX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WA3CW;AAmCf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAeA;EACE,kBAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;AAZF;AAcE;EACE,eAAA;AAZJ;;AAkBA;EACE,aAAA;EACA,uBAAA;EACA,YAAA;AAfF;AAiBE;EACE,2BAnFY;EAoFZ,YAhFW;AAiEf;AAkBE;EACE,mBAAA;AAhBJ;;AAsBA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;AAnBF;AAqBE;EACE,aAAA;EACA,qBAAA;AAnBJ;AAsBE;EACE,sBAAA;EACA,aAAA;EACA,qBAAA;EACA,kBAAA;AApBJ;AAsBI;EACE,2BAlHU;AA8FhB;AAqBM;EACE,yBAlHU;AA+FlB;AAuBI;EACE,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AArBN;AAwBI;EACE,2BAjIU;EAkIV,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,UAAA;AAtBN;AAwBM;EACE,eAAA;AAtBR;;AA4BA;EACE,aAAA;EACA,uBAAA;AAzBF;AA2BE;EACE,iBAAA;EACA,+BAAA;AAzBJ;AA4BE;EACE,6BAAA;AA1BJ","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: #fa3232;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100dvh;  // Test other behaviors\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 1em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n  \n  &:hover {\n    cursor: pointer;\n  }\n}\n\n// Controls\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n\n  button {\n    background-color: $primary-color;\n    color: $secondary-fc;\n  }\n\n  .display {\n    min-height: 2.25rem;\n  }\n}\n\n// Boards\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr)) / repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1 / 1; // The position isn't right. Fix it later.\n  max-height: calc((100svh - 18em) / 2);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n    display: grid;\n    place-content: center;\n    position: relative;\n\n    &.ship {\n      background-color: $primary-color;\n      &.attacked {\n        background-color: $highlight-color;\n      }\n    }\n  \n    &.attacked::after {\n      content: \"'\";\n      width: 0.5em;\n      height: 0.5em;\n      background-color: black;\n      border-radius: 50%;\n    }\n\n    .drag-ship {\n      background-color: $primary-color;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      z-index: 1;\n\n      &:hover {\n        cursor: pointer;\n      }\n    }\n  }\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n\n  .dummy.board {\n    padding-bottom: 0;\n    max-height: calc((100svh - 18em));\n  }\n\n  .randomize {\n    background-color: transparent;\n    //border: 1px solid $primary-color;\n  }\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _modules_pubsub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/pubsub */ "./src/modules/pubsub.js");




_modules_game__WEBPACK_IMPORTED_MODULE_2__["default"].setupGame();
_modules_dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderPageLayout();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ29CO0FBQ0U7QUFDTjtBQUV0Q25CLHFEQUFjLENBQUNZLFNBQVMsQ0FBQyxDQUFDO0FBQzFCaEksb0RBQWEsQ0FBQzZHLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBib2FyZHM7XG5cbiAgZnVuY3Rpb24gc2V0dXBCb2FyZHMobmV3Qm9hcmRzKSB7XG4gICAgYm9hcmRzID0gbmV3Qm9hcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhyb3csIGNvbCkge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbCArIDY1KX0ke3JvdyArIDF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXkobWVzc2FnZSkge1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlfX3RleHRcIik7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93R2FtZU92ZXIod2lubmVyKSB7XG4gICAgZGlzcGxheShgVGhlIGdhbWUgaXMgb3Zlci4gJHt3aW5uZXIubmFtZX0gd29uIWApO1xuICB9XG5cbiAgZnVuY3Rpb24gYXR0YWNrQ2VsbChlKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJwbGF5ZXJBdHRhY2tcIiwgZS50YXJnZXQuaWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcm90YXRlU2hpcChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGV2ZW50cy5lbWl0KFwibW92ZVNoaXBcIiwgW2UudGFyZ2V0LmNsb3Nlc3QoXCIuY2VsbFwiKS5pZF0pO1xuICAgICAgcmVuZGVyU2V0dXBCb2FyZCgpO1xuICAgICAgZGlzcGxheShcIkRyYWcgeW91ciBzaGlwcyB0byBtb3ZlIHRoZW0uIENsaWNrIHRoZW0gdG8gcm90YXRlIHRoZW0uXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSA9PT0gXCJUYXJnZXQgcG9zaXRpb24gaXMgb2NjdXBpZWRcIilcbiAgICAgICAgZGlzcGxheShcIk5vdCBlbm91Z2ggc3BhY2UgdG8gcm90YXRlIHRoYXQgc2hpcC4gU2hpcHMgY2FuJ3QgdG91Y2guXCIpO1xuICAgICAgZWxzZSBpZiAoZXJyb3IubWVzc2FnZSA9PT0gXCJJbnZhbGlkIENvb3JkaW5hdGVzXCIpXG4gICAgICAgIGRpc3BsYXkoXCJUaGVyZSdzIG5vdCBlbm91Z2ggc3BhY2UgdG8gcm90YXRlIHlvdXIgc2hpcFwiKTtcbiAgICAgIGVsc2UgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzT2Zmc2V0KGNvb3JkaW5hdGVzLCBvZmZzZXQsIGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaFwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSBvZmZzZXQpICtcbiAgICAgICAgY29vcmRpbmF0ZXMuc2xpY2UoMSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlc1swXSArICgrY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSBvZmZzZXQpO1xuICB9XG5cbiAgLy8gRHJhZyAmIGRyb3AgaGFuZGxlcnNcbiAgZnVuY3Rpb24gZHJhZyhlKSB7XG4gICAgLy9lLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvY29vcmRpbmF0ZXNcIiwgZS50YXJnZXQuY2xvc2VzdChcIi5jZWxsXCIpLmlkKTtcbiAgICBjb25zdCBsZW5ndGhYID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhcIlxuICAgICAgICA/IGUudGFyZ2V0Lm9mZnNldFdpZHRoIC8gK2UudGFyZ2V0LmRhdGFzZXQubGVuZ3RoXG4gICAgICAgIDogZS50YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbGVuZ3RoWSA9XG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJ2XCJcbiAgICAgICAgPyBlLnRhcmdldC5vZmZzZXRIZWlnaHQgLyArZS50YXJnZXQuZGF0YXNldC5sZW5ndGhcbiAgICAgICAgOiBlLnRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3Qgc3F1YXJlT2Zmc2V0ID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhcIlxuICAgICAgICA/IE1hdGguZmxvb3IoZS5vZmZzZXRYIC8gbGVuZ3RoWClcbiAgICAgICAgOiBNYXRoLmZsb29yKGUub2Zmc2V0WSAvIGxlbmd0aFkpO1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L29mZnNldFwiLCBzcXVhcmVPZmZzZXQpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSBcIm1vdmVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFsbG93RHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcIm1vdmVcIjtcbiAgICAvLyBpZiAoc29tZXRoaW5nKSBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJub25lXCI7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyYWctc2hpcFwiKSkgZS50YXJnZXQuc3R5bGUuekluZGV4ID0gLTE7XG4gIH1cblxuICBmdW5jdGlvbiBkcm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNvdXJjZUNvb3JkaW5hdGVzID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvY29vcmRpbmF0ZXNcIik7XG4gICAgICBjb25zdCBvZmZTZXQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9vZmZzZXRcIik7XG4gICAgICBjb25zdCBzb3VyY2VDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc291cmNlQ29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgeyBkaXJlY3Rpb24gfSA9IHNvdXJjZUNlbGwuZmlyc3RFbGVtZW50Q2hpbGQuZGF0YXNldDtcbiAgICAgIGNvbnN0IHRhcmdldENvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXNPZmZzZXQoXG4gICAgICAgIGUudGFyZ2V0LmlkLFxuICAgICAgICBvZmZTZXQsXG4gICAgICAgIGRpcmVjdGlvbixcbiAgICAgICk7XG4gICAgICBldmVudHMuZW1pdChcIm1vdmVTaGlwXCIsIFtzb3VyY2VDb29yZGluYXRlcywgdGFyZ2V0Q29vcmRpbmF0ZXNdKTtcbiAgICAgIHJlbmRlclNldHVwQm9hcmQoKTtcbiAgICAgIGRpc3BsYXkoXCJEcmFnIHlvdXIgc2hpcHMgdG8gbW92ZSB0aGVtLiBDbGljayB0aGVtIHRvIHJvdGF0ZSB0aGVtLlwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFwiVGFyZ2V0IHBvc2l0aW9uIGlzIG9jY3VwaWVkXCIpXG4gICAgICAgIGRpc3BsYXkoXCJOb3QgZW5vdWdoIHNwYWNlIHRoZXJlIGZvciB5b3VyIHNoaXAuIFNoaXBzIGNhbid0IHRvdWNoLlwiKTtcbiAgICAgIGVsc2UgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFwiSW52YWxpZCBDb29yZGluYXRlc1wiKVxuICAgICAgICBkaXNwbGF5KFwiVGhlIHBvc2l0aW9uIHlvdSdyZSB0cnlpbmcgdG8gbW92ZSB5b3VyIHNoaXAgdG8gaXMgaW52YWxpZC5cIik7XG4gICAgICBlbHNlIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmFnZW5kKGUpIHtcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZy1zaGlwXCIpO1xuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IChzaGlwLnN0eWxlLnpJbmRleCA9IDEpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJvYXJkKGJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCBib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgYCR7cGxheWVyfSBib2FyZGApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgY29uc3QgY29sTGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgY29sXCIpO1xuICAgICAgY29sTGFiZWwuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgPT09IDAgPyBcIlwiIDogU3RyaW5nLmZyb21DaGFyQ29kZShpICsgNjQpKSxcbiAgICAgICk7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb2xMYWJlbCk7XG4gICAgfVxuICAgIGJvYXJkLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgY29uc3Qgcm93TGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgcm93XCIpO1xuICAgICAgcm93TGFiZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgaSArIDEpKTtcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0xhYmVsKTtcbiAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gXCJjZWxsXCI7XG4gICAgICAgIGlmIChjZWxsLmF0dGFja2VkKSBjbGFzc2VzICs9IFwiIGF0dGFja2VkXCI7XG4gICAgICAgIGlmIChjZWxsLnNoaXAgJiYgcGxheWVyID09PSBcInBsYXllclwiKSBjbGFzc2VzICs9IFwiIHNoaXBcIjtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzKGksIGopO1xuICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgY2xhc3NlcywgW1xuICAgICAgICAgIFtcImlkXCIsIGNvb3JkaW5hdGVzXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDZWxsKTtcbiAgICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCAmJiBjZWxsLnNoaXApIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiZHVtbXlcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBhbGxvd0Ryb3ApO1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3ApO1xuICAgICAgICB9XG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJkdW1teVwiICYmIGNlbGwuc2hpcCkge1xuICAgICAgICAgIGlmIChjZWxsLnNoaXAuc3RhcnRDb29yZGluYXRlcyA9PT0gY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiZHJhZy1zaGlwXCIsIFtcbiAgICAgICAgICAgICAgW1wiZHJhZ2dhYmxlXCIsIHRydWVdLFxuICAgICAgICAgICAgICBbXCJkYXRhLWxlbmd0aFwiLCBjZWxsLnNoaXAubGVuZ3RoXSxcbiAgICAgICAgICAgICAgW1wiZGF0YS1kaXJlY3Rpb25cIiwgY2VsbC5zaGlwLmRpcmVjdGlvbl0sXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJvdGF0ZVNoaXApO1xuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcpO1xuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnZW5kKTtcbiAgICAgICAgICAgIGlmIChjZWxsLnNoaXAuZGlyZWN0aW9uID09PSBcImhcIilcbiAgICAgICAgICAgICAgc2hpcC5zdHlsZS53aWR0aCA9XG4gICAgICAgICAgICAgICAgY2VsbC5zaGlwLmxlbmd0aCA9PT0gNSA/IFwiNTYwJVwiIDogYCR7Y2VsbC5zaGlwLmxlbmd0aCAqIDExMX0lYDtcbiAgICAgICAgICAgIGVsc2Ugc2hpcC5zdHlsZS5oZWlnaHQgPSBgJHtjZWxsLnNoaXAubGVuZ3RoICogMTF9MCVgO1xuICAgICAgICAgICAgY2VsbEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm9hcmRDb250YWluZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJzdGFydEdhbWVcIik7XG4gICAgcmVuZGVyR2FtZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQ29udHJvbHMoYnV0dG9uQ2xhc3MpIHtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIiA/IFwiKyBOZXcgR2FtZVwiIDogXCJTdGFydCBHYW1lXCI7XG4gICAgY29uc3QgZGlzcGxheVRleHQgPVxuICAgICAgYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIlxuICAgICAgICA/IFwiQ2xpY2sgb24gdGhlIGVuZW15J3MgYm9hcmQgdG8gYXR0YWNrXCJcbiAgICAgICAgOiBcIkRyYWcgeW91ciBzaGlwcyB0byBtb3ZlIHRoZW0uIENsaWNrIHRoZW0gdG8gcm90YXRlIHRoZW0uXCI7XG4gICAgY29uc3QgZm4gPSBidXR0b25DbGFzcyA9PT0gXCJuZXctZ2FtZVwiID8gcmVzdGFydEdhbWUgOiBzdGFydEdhbWU7XG4gICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcImNvbnRyb2xzXCIpO1xuICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgYnV0dG9uVGV4dCwgYnV0dG9uQ2xhc3MpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm4pO1xuICAgIGNvbnRyb2xTZWN0aW9uLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgY29uc3QgdGV4dERpc3BsYXkgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiZGlzcGxheVwiKTtcbiAgICB0ZXh0RGlzcGxheS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBkaXNwbGF5VGV4dCwgXCJkaXNwbGF5X190ZXh0XCIpKTtcbiAgICBjb250cm9sU2VjdGlvbi5hcHBlbmRDaGlsZCh0ZXh0RGlzcGxheSk7XG4gICAgcmV0dXJuIGNvbnRyb2xTZWN0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyR2FtZVNjcmVlbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgY2xlYW5FbGVtZW50KG1haW4pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocmVuZGVyQ29udHJvbHMoXCJuZXctZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJZb3VyIEJvYXJkXCIpKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgY29uc3QgZW5lbXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIkVuZW15J3MgQm9hcmRcIikpO1xuICAgIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChib2FyZHMuY29tcHV0ZXIsIFwiY29tcHV0ZXJcIikpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlTZWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFuRWxlbWVudChwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgcmVuZGVyR2FtZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJyZXN0YXJ0R2FtZVwiKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgY2xlYW5FbGVtZW50KGJvZHkpO1xuICAgIHJlbmRlclBhZ2VMYXlvdXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbWl6ZVBsYXllckJvYXJkKCkge1xuICAgIGV2ZW50cy5lbWl0KFwiUmFuZG9taXplUGxheWVyQm9hcmRcIik7XG4gICAgcmVuZGVyU2V0dXBCb2FyZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyU2V0dXBCb2FyZCgpIHtcbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24ucGxheWVyLnNldHVwXCIpO1xuICAgIGNsZWFuRWxlbWVudChwbGF5ZXJTZWN0aW9uKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIllvdXIgQm9hcmRcIikpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLnBsYXllciwgXCJkdW1teVwiKSk7XG4gICAgY29uc3QgcmFuZG9taXplQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIlJhbmRvbWl6ZVwiLCBcInJhbmRvbWl6ZVwiKTtcbiAgICByYW5kb21pemVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJhbmRvbWl6ZVBsYXllckJvYXJkKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJhbmRvbWl6ZUJ0bik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJQYWdlTGF5b3V0KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcIkJhdHRsZXNoaXBcIikpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHJlbmRlckNvbnRyb2xzKFwic3RhcnQtZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCwgXCJwbGF5ZXIgc2V0dXBcIik7XG5cbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcblxuICAgIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgY29uc3QgYSA9IGNyZWF0ZUVsZW1lbnQoXCJhXCIsIFwiXCIsIFwiXCIsIFtcbiAgICAgIFtcImhyZWZcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vamNpZHBcIl0sXG4gICAgICBbXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIl0sXG4gICAgXSk7XG4gICAgYS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBcIkNyZWF0ZWQgYnkgamNpZHBcIikpO1xuICAgIGEuYXBwZW5kQ2hpbGQoXG4gICAgICByZW5kZXJMaW5rSWNvbihcbiAgICAgICAgXCJnaXRodWJcIixcbiAgICAgICAgXCIwIDAgMjQgMjRcIixcbiAgICAgICAgXCJNMTIsMkExMCwxMCAwIDAsMCAyLDEyQzIsMTYuNDIgNC44NywyMC4xNyA4Ljg0LDIxLjVDOS4zNCwyMS41OCA5LjUsMjEuMjcgOS41LDIxQzkuNSwyMC43NyA5LjUsMjAuMTQgOS41LDE5LjMxQzYuNzMsMTkuOTEgNi4xNCwxNy45NyA2LjE0LDE3Ljk3QzUuNjgsMTYuODEgNS4wMywxNi41IDUuMDMsMTYuNUM0LjEyLDE1Ljg4IDUuMSwxNS45IDUuMSwxNS45QzYuMSwxNS45NyA2LjYzLDE2LjkzIDYuNjMsMTYuOTNDNy41LDE4LjQ1IDguOTcsMTggOS41NCwxNy43NkM5LjYzLDE3LjExIDkuODksMTYuNjcgMTAuMTcsMTYuNDJDNy45NSwxNi4xNyA1LjYyLDE1LjMxIDUuNjIsMTEuNUM1LjYyLDEwLjM5IDYsOS41IDYuNjUsOC43OUM2LjU1LDguNTQgNi4yLDcuNSA2Ljc1LDYuMTVDNi43NSw2LjE1IDcuNTksNS44OCA5LjUsNy4xN0MxMC4yOSw2Ljk1IDExLjE1LDYuODQgMTIsNi44NEMxMi44NSw2Ljg0IDEzLjcxLDYuOTUgMTQuNSw3LjE3QzE2LjQxLDUuODggMTcuMjUsNi4xNSAxNy4yNSw2LjE1QzE3LjgsNy41IDE3LjQ1LDguNTQgMTcuMzUsOC43OUMxOCw5LjUgMTguMzgsMTAuMzkgMTguMzgsMTEuNUMxOC4zOCwxNS4zMiAxNi4wNCwxNi4xNiAxMy44MSwxNi40MUMxNC4xNywxNi43MiAxNC41LDE3LjMzIDE0LjUsMTguMjZDMTQuNSwxOS42IDE0LjUsMjAuNjggMTQuNSwyMUMxNC41LDIxLjI3IDE0LjY2LDIxLjU5IDE1LjE3LDIxLjVDMTkuMTQsMjAuMTYgMjIsMTYuNDIgMjIsMTJBMTAsMTAgMCAwLDAgMTIsMlpcIixcbiAgICAgICksXG4gICAgKTtcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4gICAgcmVuZGVyU2V0dXBCb2FyZCgpO1xuICB9XG5cbiAgZXZlbnRzLm9uKFwic2V0dXBCb2FyZHNcIiwgc2V0dXBCb2FyZHMpO1xuICBldmVudHMub24oXCJ0dXJuRW5kXCIsIHVwZGF0ZVNjcmVlbik7XG4gIGV2ZW50cy5vbihcImdhbWVPdmVyXCIsIHNob3dHYW1lT3Zlcik7XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQYWdlTGF5b3V0LFxuICAgIHJlbmRlckdhbWVTY3JlZW4sXG4gICAgdXBkYXRlU2NyZWVuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tQ29udHJvbGxlcjtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXI7XG4gIGxldCBjb21wdXRlcjtcbiAgbGV0IGFjdGl2ZUdhbWUgPSBmYWxzZTtcblxuICBjb25zdCBnZXRQbGF5ZXIgPSAoKSA9PiBwbGF5ZXI7XG4gIGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAod2lubmVyKSA9PiB7XG4gICAgYWN0aXZlR2FtZSA9IGZhbHNlO1xuICAgIGV2ZW50cy5lbWl0KFwiZ2FtZU92ZXJcIiwgd2lubmVyKTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXkgPSBnZXRQbGF5ZXIoKTtcbiAgICBnZXRDb21wdXRlcigpLm1ha2VSYW5kb21BdHRhY2soZW5lbXkpO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRDb21wdXRlcigpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheVR1cm4gPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUdhbWUpIHJldHVybjtcbiAgICBjb25zdCBlbmVteSA9IGdldENvbXB1dGVyKCk7XG4gICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IGdldFBsYXllcigpLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdmFsaWRDb29yZGluYXRlcykgcmV0dXJuO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcblxuICAgIGlmIChlbmVteS5ib2FyZC5oYXZlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGdhbWVPdmVyKGdldFBsYXllcigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJZb3VcIik7XG4gICAgcGxheWVyLmJvYXJkLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBjb21wdXRlci5ib2FyZC5maWxsQm9hcmRXaXRoU2hpcHMoKTtcbiAgICBldmVudHMuZW1pdChcInNldHVwQm9hcmRzXCIsIHtcbiAgICAgIHBsYXllcjogZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSxcbiAgICAgIGNvbXB1dGVyOiBnZXRDb21wdXRlcigpLmdldEJvYXJkKCksXG4gICAgfSk7XG4gICAgZXZlbnRzLm9uKFxuICAgICAgXCJSYW5kb21pemVQbGF5ZXJCb2FyZFwiLFxuICAgICAgcGxheWVyLmJvYXJkLnJlc2V0Qm9hcmQuYmluZChwbGF5ZXIuYm9hcmQpLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGFjdGl2ZUdhbWUgPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllci5ib2FyZC5yZXNldEJvYXJkKCk7XG4gICAgY29tcHV0ZXIuYm9hcmQucmVzZXRCb2FyZCgpO1xuICAgIHBsYXllci5yZXNldFNob3RzQXZhaWxhYmxlKCk7XG4gICAgY29tcHV0ZXIucmVzZXRTaG90c0F2YWlsYWJsZSgpO1xuICB9O1xuXG4gIGNvbnN0IG1vdmVTaGlwID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcGxheWVyLmJvYXJkLm1vdmVTaGlwKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSk7XG4gIH07XG5cbiAgZXZlbnRzLm9uKFwic3RhcnRHYW1lXCIsIHN0YXJ0R2FtZSk7XG4gIGV2ZW50cy5vbihcIm1vdmVTaGlwXCIsIG1vdmVTaGlwKTtcbiAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgcmVzdGFydEdhbWUpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0dXBHYW1lLFxuICAgIHN0YXJ0R2FtZSxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0Q29tcHV0ZXIsXG4gICAgcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jb25zdHJ1Y3Rvci5maWxsQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWxsQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKHsgYXR0YWNrZWQ6IGZhbHNlLCBzaGlwOiBudWxsIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBmaWxsQm9hcmRXaXRoU2hpcHMoKSB7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSg1KTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDQpO1xuICAgIHRoaXMucGxhY2VTaGlwUmFuZG9tbHkoMyk7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSgzKTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDIpO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmNsZWFuQm9hcmQoKTtcbiAgICB0aGlzLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICB9XG5cbiAgY2xlYW5Cb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93LmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hdHRhY2tlZCA9IGZhbHNlO1xuICAgICAgICBjZWxsLnNoaXAgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgaWYgKCFlbmQpIHtcbiAgICAgIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sXS5zaGlwID0gbmV3IFNoaXAoMSwgc3RhcnQsIFwiaFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgW2VuZENvbCwgZW5kUm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhlbmQpO1xuICAgIGNvbnN0IGRpc3RhbmNlID1cbiAgICAgIHN0YXJ0Um93ID09PSBlbmRSb3cgPyBlbmRDb2wgLSBzdGFydENvbCArIDEgOiBlbmRSb3cgLSBzdGFydFJvdyArIDE7XG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGRpc3RhbmNlLCBzdGFydCwgc3RhcnRSb3cgPT09IGVuZFJvdyA/IFwiaFwiIDogXCJ2XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICBlbHNlIHRoaXMuYm9hcmRbc3RhcnRSb3cgKyBpXVtzdGFydENvbF0uc2hpcCA9IHNoaXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvckVhY2hQb3NpdGlvbkNlbGwoc3RhcnRDb29yZGluYXRlcywgZGlyZWN0aW9uLCBsZW5ndGgsIGZuKSB7XG4gICAgY29uc3QgW3N0YXJ0Q29sLCBzdGFydFJvd10gPVxuICAgICAgdGhpcy5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKHN0YXJ0Q29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaFwiKSByZXN1bHQucHVzaChmbihzdGFydFJvdywgc3RhcnRDb2wgKyBpKSk7XG4gICAgICBlbHNlIHJlc3VsdC5wdXNoKGZuKHN0YXJ0Um93ICsgaSwgc3RhcnRDb2wpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIG1vdmVTaGlwKHNvdXJjZUNvb3JkaW5hdGVzLCB0YXJnZXRDb29yZGluYXRlcykge1xuICAgIGNvbnN0IHsgc2hpcCB9ID0gdGhpcy5nZXRDb29yZGluYXRlcyhzb3VyY2VDb29yZGluYXRlcyk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGFyZ2V0Q29vcmRpbmF0ZXMgPyBzaGlwLmRpcmVjdGlvbiA6IG51bGw7XG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmZvckVhY2hQb3NpdGlvbkNlbGwoXG4gICAgICB0YXJnZXRDb29yZGluYXRlcyB8fCBzb3VyY2VDb29yZGluYXRlcyxcbiAgICAgIGRpcmVjdGlvbiB8fCAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaFwiID8gXCJ2XCIgOiBcImhcIiksXG4gICAgICBzaGlwLmxlbmd0aCxcbiAgICAgIChyb3csIGNvbCkgPT4gdGhpcy5pc0Nvb3JkaW5hdGVGcmVlKHJvdywgY29sLCBzaGlwKSxcbiAgICApO1xuICAgIGlmICghbmV3Q29vcmRpbmF0ZXMuZXZlcnkoKGNlbGwpID0+IGNlbGwpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFyZ2V0IHBvc2l0aW9uIGlzIG9jY3VwaWVkXCIpO1xuICAgIHRoaXMuY29uc3RydWN0b3IuZm9yRWFjaFBvc2l0aW9uQ2VsbChcbiAgICAgIHNvdXJjZUNvb3JkaW5hdGVzLFxuICAgICAgc2hpcC5kaXJlY3Rpb24sXG4gICAgICBzaGlwLmxlbmd0aCxcbiAgICAgIChyb3csIGNvbCkgPT4ge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gbnVsbDtcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAodGFyZ2V0Q29vcmRpbmF0ZXMpIHNoaXAuc3RhcnRDb29yZGluYXRlcyA9IHRhcmdldENvb3JkaW5hdGVzO1xuICAgIGVsc2Ugc2hpcC5kaXJlY3Rpb24gPSBzaGlwLmRpcmVjdGlvbiA9PT0gXCJoXCIgPyBcInZcIiA6IFwiaFwiO1xuICAgIHRoaXMuY29uc3RydWN0b3IuZm9yRWFjaFBvc2l0aW9uQ2VsbChcbiAgICAgIHRhcmdldENvb3JkaW5hdGVzIHx8IHNvdXJjZUNvb3JkaW5hdGVzLFxuICAgICAgc2hpcC5kaXJlY3Rpb24sXG4gICAgICBzaGlwLmxlbmd0aCxcbiAgICAgIChyb3csIGNvbCkgPT4ge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gc2hpcDtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIHJvdGF0ZVNoaXAoc291cmNlQ29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCB7IHNoaXAgfSA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXMoc291cmNlQ29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5mb3JFYWNoUG9zaXRpb25DZWxsKFxuICAgICAgc291cmNlQ29vcmRpbmF0ZXMsXG4gICAgICBzaGlwLmRpcmVjdGlvbiA9PT0gXCJoXCIgPyBcInZcIiA6IFwiaFwiLFxuICAgICAgc2hpcC5sZW5ndGgsXG4gICAgICAocm93LCBjb2wpID0+IHRoaXMuaXNDb29yZGluYXRlRnJlZShyb3csIGNvbCwgc2hpcCksXG4gICAgKTtcbiAgICBpZiAoIW5ld0Nvb3JkaW5hdGVzLmV2ZXJ5KChjZWxsKSA9PiBjZWxsKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRhcmdldCBwb3NpdGlvbiBpcyBvY2N1cGllZFwiKTtcbiAgfVxuXG4gIGlzQ29vcmRpbmF0ZUZyZWUocm93LCBjb2wsIHNoaXApIHtcbiAgICBpZiAoY29sIDwgMCB8fCBjb2wgPiA5IHx8IHJvdyA8IDAgfHwgcm93ID4gOSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgQ29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHJvdyA+IDAgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93IC0gMV1bY29sXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3cgLSAxXVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIGNvbCA8IDkgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyAxXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbCArIDFdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHJvdyA8IDkgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93ICsgMV1bY29sXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3cgKyAxXVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIGNvbCA+IDAgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgLSAxXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbCAtIDFdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNQb3NpdGlvblZhbGlkKHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnQpO1xuICAgIGNvbnN0IFtlbmRDb2wsIGVuZFJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoZW5kKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9XG4gICAgICBzdGFydFJvdyA9PT0gZW5kUm93ID8gZW5kQ29sIC0gc3RhcnRDb2wgKyAxIDogZW5kUm93IC0gc3RhcnRSb3cgKyAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29vcmRpbmF0ZUZyZWUoc3RhcnRSb3csIHN0YXJ0Q29sICsgaSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNDb29yZGluYXRlRnJlZShzdGFydFJvdyArIGksIHN0YXJ0Q29sKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcGxhY2VTaGlwUmFuZG9tbHkobGVuZ3RoKSB7XG4gICAgbGV0IGluaXRpYWxQb3NpdGlvbjtcbiAgICBsZXQgZmluYWxQb3NpdGlvbjtcbiAgICBsZXQgdmFsaWRQb3NpdGlvbiA9IGZhbHNlO1xuICAgIHdoaWxlICghdmFsaWRQb3NpdGlvbikge1xuICAgICAgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRDb29yZGluYXRlc0Zyb21OdW1iZXIoXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIGZpbmFsUG9zaXRpb24gPVxuICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgICAgICBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDEgPD0gNzRcbiAgICAgICAgICAgICAgPyBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgOiBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSAtIGxlbmd0aCArIDEsXG4gICAgICAgICAgKSArIGluaXRpYWxQb3NpdGlvbi5zbGljZSgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxOdW1iZXIgPSAraW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpO1xuICAgICAgICBmaW5hbFBvc2l0aW9uID1cbiAgICAgICAgICBpbml0aWFsUG9zaXRpb25bMF0gK1xuICAgICAgICAgIChpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMSA8PSAxMFxuICAgICAgICAgICAgPyBpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMVxuICAgICAgICAgICAgOiBpbml0aWFsTnVtYmVyIC0gbGVuZ3RoICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGluaXRpYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApID4gZmluYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApIHx8XG4gICAgICAgICtpbml0aWFsUG9zaXRpb24uc2xpY2UoMSkgPiArZmluYWxQb3NpdGlvbi5zbGljZSgxKVxuICAgICAgKSB7XG4gICAgICAgIFtpbml0aWFsUG9zaXRpb24sIGZpbmFsUG9zaXRpb25dID0gW2ZpbmFsUG9zaXRpb24sIGluaXRpYWxQb3NpdGlvbl07XG4gICAgICB9XG4gICAgICB2YWxpZFBvc2l0aW9uID0gdGhpcy5pc1Bvc2l0aW9uVmFsaWQoaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5wbGFjZVNoaXAoaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgY29sSW5kZXggPSBjb29yZGluYXRlcy5jaGFyQ29kZUF0KDApIC0gNjU7XG4gICAgY29uc3Qgcm93SW5kZXggPSArY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSAxO1xuICAgIGlmIChjb2xJbmRleCA8IDAgfHwgY29sSW5kZXggPiA5IHx8IHJvd0luZGV4IDwgMCB8fCByb3dJbmRleCA+IDkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIENvb3JkaW5hdGVzXCIpO1xuICAgIHJldHVybiBbY29sSW5kZXgsIHJvd0luZGV4XTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY0ICsgK2Nvb3JkaW5hdGVzLnNsaWNlKDEpICogMTAgLSAxMDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIobikge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKChuICUgMTAgPT09IDAgPyAxMCA6IG4gJSAxMCkgKyA2NCl9JHtcbiAgICAgIE1hdGguZmxvb3IobiAvIDEwKSArIChuICUgMTAgPT09IDAgPyAwIDogMSlcbiAgICB9YDtcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVwZWF0ZWQgY29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKGNlbGwuc2hpcCkge1xuICAgICAgY2VsbC5zaGlwLmhpdCgpO1xuICAgIH1cbiAgICBjb25zdCBbY29sLCByb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5hdHRhY2tlZCA9IHRydWU7XG4gIH1cblxuICBoYXZlQWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmV2ZXJ5KChyb3cpID0+XG4gICAgICByb3cuZXZlcnkoKGNlbGwpID0+ICFjZWxsLnNoaXAgfHwgY2VsbC5zaGlwLmlzU3VuaygpKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY29udGVudCwgY2xhc3NlcywgYXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBpZiAoY29udGVudCkgZWxlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGUuY2xhc3NMaXN0LmFkZChteUNsYXNzKSk7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMpXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKSxcbiAgICApO1xuICByZXR1cm4gZWxlO1xufTtcblxuY29uc3QgcmVuZGVyTGlua0ljb24gPSAobmFtZSwgdmlld0JveCwgcGF0aCwgbXlDbGFzcykgPT4ge1xuICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBcInBhdGhcIixcbiAgKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG5cbiAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBwYXRoKTtcblxuICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcblxuICBpZiAobmFtZSA9PT0gXCJwZW5jaWxcIiB8fCBuYW1lID09PSBcImRlbGV0ZVwiKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIGlmIChteUNsYXNzKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobXlDbGFzcyk7XG5cbiAgcmV0dXJuIGljb25Tdmc7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmZpbGwoKSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgfVxuXG4gIHJlc2V0U2hvdHNBdmFpbGFibGUoKSB7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IEFycmF5LmZyb20oQXJyYXkoMTAwKS5maWxsKCksIChfLCBpKSA9PiBpICsgMSk7XG4gIH1cblxuICBhdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hvdE51bWJlciA9XG4gICAgICB0aGlzLmJvYXJkLmNvbnN0cnVjdG9yLmdldE51bWJlckZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKCF0aGlzLnNob3RzQXZhaWxhYmxlLmluY2x1ZGVzKHNob3ROdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgZW5lbXkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IHRoaXMuc2hvdHNBdmFpbGFibGUuZmlsdGVyKChuKSA9PiBuICE9PSBzaG90TnVtYmVyKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG1ha2VSYW5kb21BdHRhY2soZW5lbXkpIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuYm9hcmQuY29uc3RydWN0b3IuZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKFxuICAgICAgdGhpcy5zaG90c0F2YWlsYWJsZVtcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zaG90c0F2YWlsYWJsZS5sZW5ndGgpXG4gICAgICBdLFxuICAgICk7XG4gICAgdGhpcy5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5ib2FyZDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBldmVudHMgPSAoKCkgPT4ge1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBjb25zdCBvbiA9IChldmVudE5hbWUsIGZuKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKVxuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgfTtcblxuICBjb25zdCBvZmYgPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSkgcmV0dXJuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZW1pdCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGVtaXQsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBldmVudHM7XG4iLCJjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCBkaXJlY3Rpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN0YXJ0Q29vcmRpbmF0ZXMgPSBzdGFydENvb3JkaW5hdGVzO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMrKztcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBkdmg7XFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gNHJlbSk7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxufVxcbmZvb3RlciBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbmZvb3RlciBzdmcge1xcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gIGZpbGw6IHdoaXRlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG59XFxuc2VjdGlvbiBoMiB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5idXR0b246aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY29udHJvbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcm93LWdhcDogMWVtO1xcbn1cXG4uY29udHJvbHMgYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmNvbnRyb2xzIC5kaXNwbGF5IHtcXG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKS9yZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMThlbSkgLyAyKTtcXG59XFxuLmJvYXJkIC5sYWJlbCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG4uYm9hcmQgLmNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5ib2FyZCAuY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG59XFxuLmJvYXJkIC5jZWxsLnNoaXAuYXR0YWNrZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhMzIzMjtcXG59XFxuLmJvYXJkIC5jZWxsLmF0dGFja2VkOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiJ1xcXCI7XFxuICB3aWR0aDogMC41ZW07XFxuICBoZWlnaHQ6IDAuNWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbi5ib2FyZCAuY2VsbCAuZHJhZy1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5ib2FyZCAuY2VsbCAuZHJhZy1zaGlwOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBsYXllci5zZXR1cCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5wbGF5ZXIuc2V0dXAgLmR1bW15LmJvYXJkIHtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgbWF4LWhlaWdodDogY2FsYygxMDBzdmggLSAxOGVtKTtcXG59XFxuLnBsYXllci5zZXR1cCAucmFuZG9taXplIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFNQTtFQUNFLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFMRjs7QUFVQTtFQUNFLGFBQUE7RUFDQSwrQ0FBQTtFQUNBLGNBQUE7QUFQRjs7QUFVQTtFQUNFLDZCQUFBO0VBQ0EsbUJBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQXpCZ0I7RUEwQmhCLFlBdkJhO0VBd0JiLGtCQUFBO0VBQ0EsZ0JBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQWhDZ0I7RUFpQ2hCLGlCQUFBO0FBUEY7QUFTRTtFQUNFLFlBakNXO0VBa0NYLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFQSjtBQVVFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBM0NXO0FBbUNmOztBQWNBO0VBQ0UsZUFBQTtBQVhGO0FBYUU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0FBWEo7O0FBZUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBWkY7QUFjRTtFQUNFLGVBQUE7QUFaSjs7QUFrQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBZkY7QUFpQkU7RUFDRSwyQkFuRlk7RUFvRlosWUFoRlc7QUFpRWY7QUFrQkU7RUFDRSxtQkFBQTtBQWhCSjs7QUFzQkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwRUFBQTtFQUNBLGlCQUFBO0VBQ0EscUNBQUE7QUFuQkY7QUFxQkU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFuQko7QUFzQkU7RUFDRSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBcEJKO0FBc0JJO0VBQ0UsMkJBbEhVO0FBOEZoQjtBQXFCTTtFQUNFLHlCQWxIVTtBQStGbEI7QUF1Qkk7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBckJOO0FBd0JJO0VBQ0UsMkJBaklVO0VBa0lWLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUF0Qk47QUF3Qk07RUFDRSxlQUFBO0FBdEJSOztBQTRCQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQXpCRjtBQTJCRTtFQUNFLGlCQUFBO0VBQ0EsK0JBQUE7QUF6Qko7QUE0QkU7RUFDRSw2QkFBQTtBQTFCSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkcHJpbWFyeS1jb2xvcjogc3RlZWxibHVlO1xcbiRzZWNvbmRhcnktY29sb3I6ICM1NTU7XFxuJGhpZ2hsaWdodC1jb2xvcjogI2ZhMzIzMjtcXG4kcHJpbWFyeS1mYzogYmxhY2s7XFxuJHNlY29uZGFyeS1mYzogd2hpdGU7XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLy8gR2VuZXJhbCBsYXlvdXRcXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwZHZoOyAgLy8gVGVzdCBvdGhlciBiZWhhdmlvcnNcXG59XFxuXFxubWFpbiB7XFxuICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSA0cmVtKTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcblxcbiAgYSB7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgICBmaWxsOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcbn1cXG5cXG4vLyBHYW1lIHZpZXdcXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG5cXG4gIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcblxcbmJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgXFxuICAmOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcbn1cXG5cXG4vLyBDb250cm9sc1xcblxcbi5jb250cm9scyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICByb3ctZ2FwOiAxZW07XFxuXFxuICBidXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB9XFxuXFxuICAuZGlzcGxheSB7XFxuICAgIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxuICB9XFxufVxcblxcbi8vIEJvYXJkc1xcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKSAvIHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTsgLy8gVGhlIHBvc2l0aW9uIGlzbid0IHJpZ2h0LiBGaXggaXQgbGF0ZXIuXFxuICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSAvIDIpO1xcblxcbiAgLmxhYmVsIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgfVxcblxcbiAgLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgJi5zaGlwIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgICAmLmF0dGFja2VkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRoaWdobGlnaHQtY29sb3I7XFxuICAgICAgfVxcbiAgICB9XFxuICBcXG4gICAgJi5hdHRhY2tlZDo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCInXFxcIjtcXG4gICAgICB3aWR0aDogMC41ZW07XFxuICAgICAgaGVpZ2h0OiAwLjVlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIH1cXG5cXG4gICAgLmRyYWctc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIGxlZnQ6IDA7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB6LWluZGV4OiAxO1xcblxcbiAgICAgICY6aG92ZXIge1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4ucGxheWVyLnNldHVwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gIC5kdW1teS5ib2FyZCB7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSk7XFxuICB9XFxuXFxuICAucmFuZG9taXplIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIC8vYm9yZGVyOiAxcHggc29saWQgJHByaW1hcnktY29sb3I7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL3B1YnN1YlwiO1xuXG5nYW1lQ29udHJvbGxlci5zZXR1cEdhbWUoKTtcbmRvbUNvbnRyb2xsZXIucmVuZGVyUGFnZUxheW91dCgpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJyZW5kZXJMaW5rSWNvbiIsIlBsYXllciIsImV2ZW50cyIsImRvbUNvbnRyb2xsZXIiLCJib2FyZHMiLCJzZXR1cEJvYXJkcyIsIm5ld0JvYXJkcyIsImdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMiLCJyb3ciLCJjb2wiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJkaXNwbGF5IiwibWVzc2FnZSIsInRleHQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsInNob3dHYW1lT3ZlciIsIndpbm5lciIsIm5hbWUiLCJhdHRhY2tDZWxsIiwiZSIsImVtaXQiLCJ0YXJnZXQiLCJpZCIsInJvdGF0ZVNoaXAiLCJjbG9zZXN0IiwicmVuZGVyU2V0dXBCb2FyZCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImdldENvb3JkaW5hdGVzT2Zmc2V0IiwiY29vcmRpbmF0ZXMiLCJvZmZzZXQiLCJkaXJlY3Rpb24iLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImxlbmd0aFgiLCJkYXRhc2V0Iiwib2Zmc2V0V2lkdGgiLCJsZW5ndGgiLCJsZW5ndGhZIiwib2Zmc2V0SGVpZ2h0Iiwic3F1YXJlT2Zmc2V0IiwiTWF0aCIsImZsb29yIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJlZmZlY3RBbGxvd2VkIiwiYWxsb3dEcm9wIiwicHJldmVudERlZmF1bHQiLCJkcm9wRWZmZWN0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJzdHlsZSIsInpJbmRleCIsImRyb3AiLCJzb3VyY2VDb29yZGluYXRlcyIsImdldERhdGEiLCJvZmZTZXQiLCJzb3VyY2VDZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInRhcmdldENvb3JkaW5hdGVzIiwiZHJhZ2VuZCIsInNoaXBzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzaGlwIiwicmVuZGVyQm9hcmQiLCJib2FyZCIsInBsYXllciIsImJvYXJkQ29udGFpbmVyIiwiaSIsImNvbExhYmVsIiwiYXBwZW5kQ2hpbGQiLCJyb3dMYWJlbCIsImNlbGwiLCJqIiwiY2xhc3NlcyIsImF0dGFja2VkIiwiY2VsbEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkIiwic3RhcnRDb29yZGluYXRlcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhcnRHYW1lIiwicmVuZGVyR2FtZVNjcmVlbiIsInJlbmRlckNvbnRyb2xzIiwiYnV0dG9uQ2xhc3MiLCJidXR0b25UZXh0IiwiZGlzcGxheVRleHQiLCJmbiIsInJlc3RhcnRHYW1lIiwiY29udHJvbFNlY3Rpb24iLCJidG4iLCJ0ZXh0RGlzcGxheSIsIm1haW4iLCJjbGVhbkVsZW1lbnQiLCJwbGF5ZXJTZWN0aW9uIiwiZW5lbXlTZWN0aW9uIiwiY29tcHV0ZXIiLCJwYXJlbnQiLCJjaGlsZCIsInJlbW92ZUNoaWxkIiwidXBkYXRlU2NyZWVuIiwiYm9keSIsInJlbmRlclBhZ2VMYXlvdXQiLCJyYW5kb21pemVQbGF5ZXJCb2FyZCIsInJhbmRvbWl6ZUJ0biIsImhlYWRlciIsImZvb3RlciIsImEiLCJvbiIsImdhbWVDb250cm9sbGVyIiwiYWN0aXZlR2FtZSIsImdldFBsYXllciIsImdldENvbXB1dGVyIiwiZ2FtZU92ZXIiLCJjb21wdXRlclR1cm4iLCJlbmVteSIsIm1ha2VSYW5kb21BdHRhY2siLCJoYXZlQWxsU2hpcHNTdW5rIiwicGxheVR1cm4iLCJ2YWxpZENvb3JkaW5hdGVzIiwiYXR0YWNrIiwic2V0dXBHYW1lIiwiZmlsbEJvYXJkV2l0aFNoaXBzIiwiZ2V0Qm9hcmQiLCJyZXNldEJvYXJkIiwiYmluZCIsInJlc2V0U2hvdHNBdmFpbGFibGUiLCJtb3ZlU2hpcCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsImZpbGxCb2FyZCIsInB1c2giLCJwbGFjZVNoaXBSYW5kb21seSIsImNsZWFuQm9hcmQiLCJwbGFjZVNoaXAiLCJzdGFydCIsImVuZCIsInN0YXJ0Q29sIiwic3RhcnRSb3ciLCJnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzIiwiZW5kQ29sIiwiZW5kUm93IiwiZGlzdGFuY2UiLCJmb3JFYWNoUG9zaXRpb25DZWxsIiwicmVzdWx0IiwiZ2V0Q29vcmRpbmF0ZXMiLCJuZXdDb29yZGluYXRlcyIsImlzQ29vcmRpbmF0ZUZyZWUiLCJldmVyeSIsIkVycm9yIiwiaXNQb3NpdGlvblZhbGlkIiwiaW5pdGlhbFBvc2l0aW9uIiwiZmluYWxQb3NpdGlvbiIsInZhbGlkUG9zaXRpb24iLCJnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIiLCJyYW5kb20iLCJpbml0aWFsTnVtYmVyIiwiY29sSW5kZXgiLCJyb3dJbmRleCIsImdldE51bWJlckZyb21Db29yZGluYXRlcyIsIm4iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiZWxlbWVudCIsImNvbnRlbnQiLCJhdHRyaWJ1dGVzIiwiZWxlIiwic3BsaXQiLCJteUNsYXNzIiwiYXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidmlld0JveCIsInBhdGgiLCJpY29uU3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiaWNvblBhdGgiLCJ0aXRsZSIsInNob3RzQXZhaWxhYmxlIiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsIl8iLCJzaG90TnVtYmVyIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJnZXROYW1lIiwiZXZlbnROYW1lIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwib2ZmIiwic3BsaWNlIiwiZGF0YSIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9