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
    console.log(squareOffset);
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
      console.log(sourceCoordinates);
      const targetCoordinates = getCoordinatesOffset(e.target.id, offSet, direction);
      console.log(targetCoordinates);
      _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("moveShip", [sourceCoordinates, targetCoordinates]);
      renderSetupBoard();
      display("Drag your ships to move them. Click them to rotate them.");
    } catch (error) {
      if (error.message === "Target position is occupied") display(error.message);
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
  static forEachPositionCell(startCoordinates, ship, fn) {
    const [startCol, startRow] = this.getIndexesFromCoordinates(startCoordinates);
    const result = [];
    for (let i = 0; i < ship.length; i++) {
      if (ship.direction === "h") result.push(fn(startRow, startCol + i));else result.push(fn(startRow + i, startCol));
    }
    return result;
  }
  moveShip(sourceCoordinates, targetCoordinates) {
    const {
      ship
    } = this.getCoordinates(sourceCoordinates);
    const newCoordinates = this.constructor.forEachPositionCell(targetCoordinates, ship, (row, col) => this.isCoordinateFree(row, col, ship));
    if (!newCoordinates.every(cell => cell)) throw new Error("Target position is occupied");
    this.constructor.forEachPositionCell(sourceCoordinates, ship, (row, col) => {
      this.board[row][col].ship = null;
    });
    ship.startCoordinates = targetCoordinates;
    this.constructor.forEachPositionCell(targetCoordinates, ship, (row, col) => {
      this.board[row][col].ship = ship;
    });
  }
  isCoordinateFree(row, col, ship) {
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100dvh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 1em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n}\nbutton:hover {\n  cursor: pointer;\n}\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n}\n.controls button {\n  background-color: steelblue;\n  color: white;\n}\n.controls .display {\n  min-height: 2.25rem;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr))/repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 18em) / 2);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n  display: grid;\n  place-content: center;\n  position: relative;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}\n.board .cell.ship.attacked {\n  background-color: #fa3232;\n}\n.board .cell.attacked::after {\n  content: \"'\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: black;\n  border-radius: 50%;\n}\n.board .cell .drag-ship {\n  background-color: steelblue;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 1;\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n}\n.player.setup .dummy.board {\n  padding-bottom: 0;\n  max-height: calc(100svh - 18em);\n}\n.player.setup .randomize {\n  background-color: transparent;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,6BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,sBAzBgB;EA0BhB,YAvBa;EAwBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBAhCgB;EAiChB,iBAAA;AAPF;AASE;EACE,YAjCW;EAkCX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WA3CW;AAmCf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAeA;EACE,kBAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;AAZF;AAcE;EACE,eAAA;AAZJ;;AAkBA;EACE,aAAA;EACA,uBAAA;EACA,YAAA;AAfF;AAiBE;EACE,2BAnFY;EAoFZ,YAhFW;AAiEf;AAkBE;EACE,mBAAA;AAhBJ;;AAsBA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;AAnBF;AAqBE;EACE,aAAA;EACA,qBAAA;AAnBJ;AAsBE;EACE,sBAAA;EACA,aAAA;EACA,qBAAA;EACA,kBAAA;AApBJ;AAsBI;EACE,2BAlHU;AA8FhB;AAqBM;EACE,yBAlHU;AA+FlB;AAuBI;EACE,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AArBN;AAwBI;EACE,2BAjIU;EAkIV,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,UAAA;AAtBN;;AA2BA;EACE,aAAA;EACA,uBAAA;AAxBF;AA0BE;EACE,iBAAA;EACA,+BAAA;AAxBJ;AA2BE;EACE,6BAAA;AAzBJ","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: #fa3232;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100dvh;  // Test other behaviors\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 1em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n  \n  &:hover {\n    cursor: pointer;\n  }\n}\n\n// Controls\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n\n  button {\n    background-color: $primary-color;\n    color: $secondary-fc;\n  }\n\n  .display {\n    min-height: 2.25rem;\n  }\n}\n\n// Boards\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr)) / repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1 / 1; // The position isn't right. Fix it later.\n  max-height: calc((100svh - 18em) / 2);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n    display: grid;\n    place-content: center;\n    position: relative;\n\n    &.ship {\n      background-color: $primary-color;\n      &.attacked {\n        background-color: $highlight-color;\n      }\n    }\n  \n    &.attacked::after {\n      content: \"'\";\n      width: 0.5em;\n      height: 0.5em;\n      background-color: black;\n      border-radius: 50%;\n    }\n\n    .drag-ship {\n      background-color: $primary-color;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      z-index: 1;\n    }\n  }\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n\n  .dummy.board {\n    padding-bottom: 0;\n    max-height: calc((100svh - 18em));\n  }\n\n  .randomize {\n    background-color: transparent;\n    //border: 1px solid $primary-color;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ29CO0FBQ0U7QUFDTjtBQUV0Q25CLHFEQUFjLENBQUNZLFNBQVMsQ0FBQyxDQUFDO0FBQzFCL0gsb0RBQWEsQ0FBQzRHLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBib2FyZHM7XG5cbiAgZnVuY3Rpb24gc2V0dXBCb2FyZHMobmV3Qm9hcmRzKSB7XG4gICAgYm9hcmRzID0gbmV3Qm9hcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhyb3csIGNvbCkge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbCArIDY1KX0ke3JvdyArIDF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXkobWVzc2FnZSkge1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlfX3RleHRcIik7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93R2FtZU92ZXIod2lubmVyKSB7XG4gICAgZGlzcGxheShgVGhlIGdhbWUgaXMgb3Zlci4gJHt3aW5uZXIubmFtZX0gd29uIWApO1xuICB9XG5cbiAgZnVuY3Rpb24gYXR0YWNrQ2VsbChlKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJwbGF5ZXJBdHRhY2tcIiwgZS50YXJnZXQuaWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNPZmZzZXQoY29vcmRpbmF0ZXMsIG9mZnNldCwgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJoXCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIG9mZnNldCkgK1xuICAgICAgICBjb29yZGluYXRlcy5zbGljZSgxKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzWzBdICsgKCtjb29yZGluYXRlcy5zbGljZSgxKSAtIG9mZnNldCk7XG4gIH1cblxuICAvLyBEcmFnICYgZHJvcCBoYW5kbGVyc1xuICBmdW5jdGlvbiBkcmFnKGUpIHtcbiAgICAvL2UucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9jb29yZGluYXRlc1wiLCBlLnRhcmdldC5jbG9zZXN0KFwiLmNlbGxcIikuaWQpO1xuICAgIGNvbnN0IGxlbmd0aFggPVxuICAgICAgZS50YXJnZXQuZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaFwiXG4gICAgICAgID8gZS50YXJnZXQub2Zmc2V0V2lkdGggLyArZS50YXJnZXQuZGF0YXNldC5sZW5ndGhcbiAgICAgICAgOiBlLnRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBsZW5ndGhZID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcInZcIlxuICAgICAgICA/IGUudGFyZ2V0Lm9mZnNldEhlaWdodCAvICtlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aFxuICAgICAgICA6IGUudGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBzcXVhcmVPZmZzZXQgPVxuICAgICAgZS50YXJnZXQuZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaFwiXG4gICAgICAgID8gTWF0aC5mbG9vcihlLm9mZnNldFggLyBsZW5ndGhYKVxuICAgICAgICA6IE1hdGguZmxvb3IoZS5vZmZzZXRZIC8gbGVuZ3RoWSk7XG4gICAgY29uc29sZS5sb2coc3F1YXJlT2Zmc2V0KTtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9vZmZzZXRcIiwgc3F1YXJlT2Zmc2V0KTtcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxvd0Ryb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJtb3ZlXCI7XG4gICAgLy8gaWYgKHNvbWV0aGluZykgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibm9uZVwiO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcmFnLXNoaXBcIikpIGUudGFyZ2V0LnN0eWxlLnpJbmRleCA9IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzb3VyY2VDb29yZGluYXRlcyA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L2Nvb3JkaW5hdGVzXCIpO1xuICAgICAgY29uc3Qgb2ZmU2V0ID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvb2Zmc2V0XCIpO1xuICAgICAgY29uc3Qgc291cmNlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNvdXJjZUNvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnN0IHsgZGlyZWN0aW9uIH0gPSBzb3VyY2VDZWxsLmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQ7XG4gICAgICBjb25zb2xlLmxvZyhzb3VyY2VDb29yZGluYXRlcyk7XG4gICAgICBjb25zdCB0YXJnZXRDb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzT2Zmc2V0KFxuICAgICAgICBlLnRhcmdldC5pZCxcbiAgICAgICAgb2ZmU2V0LFxuICAgICAgICBkaXJlY3Rpb24sXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2codGFyZ2V0Q29vcmRpbmF0ZXMpO1xuICAgICAgZXZlbnRzLmVtaXQoXCJtb3ZlU2hpcFwiLCBbc291cmNlQ29vcmRpbmF0ZXMsIHRhcmdldENvb3JkaW5hdGVzXSk7XG4gICAgICByZW5kZXJTZXR1cEJvYXJkKCk7XG4gICAgICBkaXNwbGF5KFwiRHJhZyB5b3VyIHNoaXBzIHRvIG1vdmUgdGhlbS4gQ2xpY2sgdGhlbSB0byByb3RhdGUgdGhlbS5cIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlID09PSBcIlRhcmdldCBwb3NpdGlvbiBpcyBvY2N1cGllZFwiKVxuICAgICAgICBkaXNwbGF5KGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYWdlbmQoZSkge1xuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnLXNoaXBcIik7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuc3R5bGUuekluZGV4ID0gMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQm9hcmQoYm9hcmQsIHBsYXllcikge1xuICAgIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBgJHtwbGF5ZXJ9IGJvYXJkYCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICBjb25zdCBjb2xMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJsYWJlbCBjb2xcIik7XG4gICAgICBjb2xMYWJlbC5hcHBlbmRDaGlsZChcbiAgICAgICAgY3JlYXRlRWxlbWVudChcInNwYW5cIiwgaSA9PT0gMCA/IFwiXCIgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGkgKyA2NCkpLFxuICAgICAgKTtcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbExhYmVsKTtcbiAgICB9XG4gICAgYm9hcmQuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBjb25zdCByb3dMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJsYWJlbCByb3dcIik7XG4gICAgICByb3dMYWJlbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwic3BhblwiLCBpICsgMSkpO1xuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93TGFiZWwpO1xuICAgICAgcm93LmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBcImNlbGxcIjtcbiAgICAgICAgaWYgKGNlbGwuYXR0YWNrZWQpIGNsYXNzZXMgKz0gXCIgYXR0YWNrZWRcIjtcbiAgICAgICAgaWYgKGNlbGwuc2hpcCAmJiBwbGF5ZXIgPT09IFwicGxheWVyXCIpIGNsYXNzZXMgKz0gXCIgc2hpcFwiO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMoaSwgaik7XG4gICAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBjbGFzc2VzLCBbXG4gICAgICAgICAgW1wiaWRcIiwgY29vcmRpbmF0ZXNdLFxuICAgICAgICBdKTtcbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGF0dGFja0NlbGwpO1xuICAgICAgICAgIGlmIChjZWxsLmF0dGFja2VkICYmIGNlbGwuc2hpcCkgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJkdW1teVwiKSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGFsbG93RHJvcCk7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgICAgICBpZiAocGxheWVyID09PSBcImR1bW15XCIgJiYgY2VsbC5zaGlwKSB7XG4gICAgICAgICAgaWYgKGNlbGwuc2hpcC5zdGFydENvb3JkaW5hdGVzID09PSBjb29yZGluYXRlcykge1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJkcmFnLXNoaXBcIiwgW1xuICAgICAgICAgICAgICBbXCJkcmFnZ2FibGVcIiwgdHJ1ZV0sXG4gICAgICAgICAgICAgIFtcImRhdGEtbGVuZ3RoXCIsIGNlbGwuc2hpcC5sZW5ndGhdLFxuICAgICAgICAgICAgICBbXCJkYXRhLWRpcmVjdGlvblwiLCBjZWxsLnNoaXAuZGlyZWN0aW9uXSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcpO1xuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnZW5kKTtcbiAgICAgICAgICAgIGlmIChjZWxsLnNoaXAuZGlyZWN0aW9uID09PSBcImhcIilcbiAgICAgICAgICAgICAgc2hpcC5zdHlsZS53aWR0aCA9XG4gICAgICAgICAgICAgICAgY2VsbC5zaGlwLmxlbmd0aCA9PT0gNSA/IFwiNTYwJVwiIDogYCR7Y2VsbC5zaGlwLmxlbmd0aCAqIDExMX0lYDtcbiAgICAgICAgICAgIGVsc2Ugc2hpcC5zdHlsZS5oZWlnaHQgPSBgJHtjZWxsLnNoaXAubGVuZ3RoICogMTF9MCVgO1xuICAgICAgICAgICAgY2VsbEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm9hcmRDb250YWluZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJzdGFydEdhbWVcIik7XG4gICAgcmVuZGVyR2FtZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQ29udHJvbHMoYnV0dG9uQ2xhc3MpIHtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIiA/IFwiKyBOZXcgR2FtZVwiIDogXCJTdGFydCBHYW1lXCI7XG4gICAgY29uc3QgZGlzcGxheVRleHQgPVxuICAgICAgYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIlxuICAgICAgICA/IFwiQ2xpY2sgb24gdGhlIGVuZW15J3MgYm9hcmQgdG8gYXR0YWNrXCJcbiAgICAgICAgOiBcIkRyYWcgeW91ciBzaGlwcyB0byBtb3ZlIHRoZW0uIENsaWNrIHRoZW0gdG8gcm90YXRlIHRoZW0uXCI7XG4gICAgY29uc3QgZm4gPSBidXR0b25DbGFzcyA9PT0gXCJuZXctZ2FtZVwiID8gcmVzdGFydEdhbWUgOiBzdGFydEdhbWU7XG4gICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcImNvbnRyb2xzXCIpO1xuICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgYnV0dG9uVGV4dCwgYnV0dG9uQ2xhc3MpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm4pO1xuICAgIGNvbnRyb2xTZWN0aW9uLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgY29uc3QgdGV4dERpc3BsYXkgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiZGlzcGxheVwiKTtcbiAgICB0ZXh0RGlzcGxheS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBkaXNwbGF5VGV4dCwgXCJkaXNwbGF5X190ZXh0XCIpKTtcbiAgICBjb250cm9sU2VjdGlvbi5hcHBlbmRDaGlsZCh0ZXh0RGlzcGxheSk7XG4gICAgcmV0dXJuIGNvbnRyb2xTZWN0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyR2FtZVNjcmVlbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgY2xlYW5FbGVtZW50KG1haW4pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocmVuZGVyQ29udHJvbHMoXCJuZXctZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJZb3VyIEJvYXJkXCIpKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgY29uc3QgZW5lbXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIkVuZW15J3MgQm9hcmRcIikpO1xuICAgIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChib2FyZHMuY29tcHV0ZXIsIFwiY29tcHV0ZXJcIikpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlTZWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFuRWxlbWVudChwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgcmVuZGVyR2FtZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJyZXN0YXJ0R2FtZVwiKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgY2xlYW5FbGVtZW50KGJvZHkpO1xuICAgIHJlbmRlclBhZ2VMYXlvdXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbWl6ZVBsYXllckJvYXJkKCkge1xuICAgIGV2ZW50cy5lbWl0KFwiUmFuZG9taXplUGxheWVyQm9hcmRcIik7XG4gICAgcmVuZGVyU2V0dXBCb2FyZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyU2V0dXBCb2FyZCgpIHtcbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24ucGxheWVyLnNldHVwXCIpO1xuICAgIGNsZWFuRWxlbWVudChwbGF5ZXJTZWN0aW9uKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIllvdXIgQm9hcmRcIikpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLnBsYXllciwgXCJkdW1teVwiKSk7XG4gICAgY29uc3QgcmFuZG9taXplQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIlJhbmRvbWl6ZVwiLCBcInJhbmRvbWl6ZVwiKTtcbiAgICByYW5kb21pemVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJhbmRvbWl6ZVBsYXllckJvYXJkKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJhbmRvbWl6ZUJ0bik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJQYWdlTGF5b3V0KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcIkJhdHRsZXNoaXBcIikpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHJlbmRlckNvbnRyb2xzKFwic3RhcnQtZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCwgXCJwbGF5ZXIgc2V0dXBcIik7XG5cbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcblxuICAgIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgY29uc3QgYSA9IGNyZWF0ZUVsZW1lbnQoXCJhXCIsIFwiXCIsIFwiXCIsIFtcbiAgICAgIFtcImhyZWZcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vamNpZHBcIl0sXG4gICAgICBbXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIl0sXG4gICAgXSk7XG4gICAgYS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBcIkNyZWF0ZWQgYnkgamNpZHBcIikpO1xuICAgIGEuYXBwZW5kQ2hpbGQoXG4gICAgICByZW5kZXJMaW5rSWNvbihcbiAgICAgICAgXCJnaXRodWJcIixcbiAgICAgICAgXCIwIDAgMjQgMjRcIixcbiAgICAgICAgXCJNMTIsMkExMCwxMCAwIDAsMCAyLDEyQzIsMTYuNDIgNC44NywyMC4xNyA4Ljg0LDIxLjVDOS4zNCwyMS41OCA5LjUsMjEuMjcgOS41LDIxQzkuNSwyMC43NyA5LjUsMjAuMTQgOS41LDE5LjMxQzYuNzMsMTkuOTEgNi4xNCwxNy45NyA2LjE0LDE3Ljk3QzUuNjgsMTYuODEgNS4wMywxNi41IDUuMDMsMTYuNUM0LjEyLDE1Ljg4IDUuMSwxNS45IDUuMSwxNS45QzYuMSwxNS45NyA2LjYzLDE2LjkzIDYuNjMsMTYuOTNDNy41LDE4LjQ1IDguOTcsMTggOS41NCwxNy43NkM5LjYzLDE3LjExIDkuODksMTYuNjcgMTAuMTcsMTYuNDJDNy45NSwxNi4xNyA1LjYyLDE1LjMxIDUuNjIsMTEuNUM1LjYyLDEwLjM5IDYsOS41IDYuNjUsOC43OUM2LjU1LDguNTQgNi4yLDcuNSA2Ljc1LDYuMTVDNi43NSw2LjE1IDcuNTksNS44OCA5LjUsNy4xN0MxMC4yOSw2Ljk1IDExLjE1LDYuODQgMTIsNi44NEMxMi44NSw2Ljg0IDEzLjcxLDYuOTUgMTQuNSw3LjE3QzE2LjQxLDUuODggMTcuMjUsNi4xNSAxNy4yNSw2LjE1QzE3LjgsNy41IDE3LjQ1LDguNTQgMTcuMzUsOC43OUMxOCw5LjUgMTguMzgsMTAuMzkgMTguMzgsMTEuNUMxOC4zOCwxNS4zMiAxNi4wNCwxNi4xNiAxMy44MSwxNi40MUMxNC4xNywxNi43MiAxNC41LDE3LjMzIDE0LjUsMTguMjZDMTQuNSwxOS42IDE0LjUsMjAuNjggMTQuNSwyMUMxNC41LDIxLjI3IDE0LjY2LDIxLjU5IDE1LjE3LDIxLjVDMTkuMTQsMjAuMTYgMjIsMTYuNDIgMjIsMTJBMTAsMTAgMCAwLDAgMTIsMlpcIixcbiAgICAgICksXG4gICAgKTtcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4gICAgcmVuZGVyU2V0dXBCb2FyZCgpO1xuICB9XG5cbiAgZXZlbnRzLm9uKFwic2V0dXBCb2FyZHNcIiwgc2V0dXBCb2FyZHMpO1xuICBldmVudHMub24oXCJ0dXJuRW5kXCIsIHVwZGF0ZVNjcmVlbik7XG4gIGV2ZW50cy5vbihcImdhbWVPdmVyXCIsIHNob3dHYW1lT3Zlcik7XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQYWdlTGF5b3V0LFxuICAgIHJlbmRlckdhbWVTY3JlZW4sXG4gICAgdXBkYXRlU2NyZWVuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tQ29udHJvbGxlcjtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXI7XG4gIGxldCBjb21wdXRlcjtcbiAgbGV0IGFjdGl2ZUdhbWUgPSBmYWxzZTtcblxuICBjb25zdCBnZXRQbGF5ZXIgPSAoKSA9PiBwbGF5ZXI7XG4gIGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAod2lubmVyKSA9PiB7XG4gICAgYWN0aXZlR2FtZSA9IGZhbHNlO1xuICAgIGV2ZW50cy5lbWl0KFwiZ2FtZU92ZXJcIiwgd2lubmVyKTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXkgPSBnZXRQbGF5ZXIoKTtcbiAgICBnZXRDb21wdXRlcigpLm1ha2VSYW5kb21BdHRhY2soZW5lbXkpO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRDb21wdXRlcigpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheVR1cm4gPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUdhbWUpIHJldHVybjtcbiAgICBjb25zdCBlbmVteSA9IGdldENvbXB1dGVyKCk7XG4gICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IGdldFBsYXllcigpLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdmFsaWRDb29yZGluYXRlcykgcmV0dXJuO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcblxuICAgIGlmIChlbmVteS5ib2FyZC5oYXZlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGdhbWVPdmVyKGdldFBsYXllcigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJZb3VcIik7XG4gICAgcGxheWVyLmJvYXJkLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBjb21wdXRlci5ib2FyZC5maWxsQm9hcmRXaXRoU2hpcHMoKTtcbiAgICBldmVudHMuZW1pdChcInNldHVwQm9hcmRzXCIsIHtcbiAgICAgIHBsYXllcjogZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSxcbiAgICAgIGNvbXB1dGVyOiBnZXRDb21wdXRlcigpLmdldEJvYXJkKCksXG4gICAgfSk7XG4gICAgZXZlbnRzLm9uKFxuICAgICAgXCJSYW5kb21pemVQbGF5ZXJCb2FyZFwiLFxuICAgICAgcGxheWVyLmJvYXJkLnJlc2V0Qm9hcmQuYmluZChwbGF5ZXIuYm9hcmQpLFxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGFjdGl2ZUdhbWUgPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllci5ib2FyZC5yZXNldEJvYXJkKCk7XG4gICAgY29tcHV0ZXIuYm9hcmQucmVzZXRCb2FyZCgpO1xuICAgIHBsYXllci5yZXNldFNob3RzQXZhaWxhYmxlKCk7XG4gICAgY29tcHV0ZXIucmVzZXRTaG90c0F2YWlsYWJsZSgpO1xuICB9O1xuXG4gIGNvbnN0IG1vdmVTaGlwID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcGxheWVyLmJvYXJkLm1vdmVTaGlwKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSk7XG4gIH07XG5cbiAgZXZlbnRzLm9uKFwic3RhcnRHYW1lXCIsIHN0YXJ0R2FtZSk7XG4gIGV2ZW50cy5vbihcIm1vdmVTaGlwXCIsIG1vdmVTaGlwKTtcbiAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgcmVzdGFydEdhbWUpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0dXBHYW1lLFxuICAgIHN0YXJ0R2FtZSxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0Q29tcHV0ZXIsXG4gICAgcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jb25zdHJ1Y3Rvci5maWxsQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWxsQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKHsgYXR0YWNrZWQ6IGZhbHNlLCBzaGlwOiBudWxsIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBmaWxsQm9hcmRXaXRoU2hpcHMoKSB7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSg1KTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDQpO1xuICAgIHRoaXMucGxhY2VTaGlwUmFuZG9tbHkoMyk7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSgzKTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDIpO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmNsZWFuQm9hcmQoKTtcbiAgICB0aGlzLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICB9XG5cbiAgY2xlYW5Cb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93LmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hdHRhY2tlZCA9IGZhbHNlO1xuICAgICAgICBjZWxsLnNoaXAgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgaWYgKCFlbmQpIHtcbiAgICAgIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sXS5zaGlwID0gbmV3IFNoaXAoMSwgc3RhcnQsIFwiaFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgW2VuZENvbCwgZW5kUm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhlbmQpO1xuICAgIGNvbnN0IGRpc3RhbmNlID1cbiAgICAgIHN0YXJ0Um93ID09PSBlbmRSb3cgPyBlbmRDb2wgLSBzdGFydENvbCArIDEgOiBlbmRSb3cgLSBzdGFydFJvdyArIDE7XG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGRpc3RhbmNlLCBzdGFydCwgc3RhcnRSb3cgPT09IGVuZFJvdyA/IFwiaFwiIDogXCJ2XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICBlbHNlIHRoaXMuYm9hcmRbc3RhcnRSb3cgKyBpXVtzdGFydENvbF0uc2hpcCA9IHNoaXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvckVhY2hQb3NpdGlvbkNlbGwoc3RhcnRDb29yZGluYXRlcywgc2hpcCwgZm4pIHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICB0aGlzLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnRDb29yZGluYXRlcyk7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaFwiKSByZXN1bHQucHVzaChmbihzdGFydFJvdywgc3RhcnRDb2wgKyBpKSk7XG4gICAgICBlbHNlIHJlc3VsdC5wdXNoKGZuKHN0YXJ0Um93ICsgaSwgc3RhcnRDb2wpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIG1vdmVTaGlwKHNvdXJjZUNvb3JkaW5hdGVzLCB0YXJnZXRDb29yZGluYXRlcykge1xuICAgIGNvbnN0IHsgc2hpcCB9ID0gdGhpcy5nZXRDb29yZGluYXRlcyhzb3VyY2VDb29yZGluYXRlcyk7XG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmZvckVhY2hQb3NpdGlvbkNlbGwoXG4gICAgICB0YXJnZXRDb29yZGluYXRlcyxcbiAgICAgIHNoaXAsXG4gICAgICAocm93LCBjb2wpID0+IHRoaXMuaXNDb29yZGluYXRlRnJlZShyb3csIGNvbCwgc2hpcCksXG4gICAgKTtcbiAgICBpZiAoIW5ld0Nvb3JkaW5hdGVzLmV2ZXJ5KChjZWxsKSA9PiBjZWxsKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRhcmdldCBwb3NpdGlvbiBpcyBvY2N1cGllZFwiKTtcbiAgICB0aGlzLmNvbnN0cnVjdG9yLmZvckVhY2hQb3NpdGlvbkNlbGwoXG4gICAgICBzb3VyY2VDb29yZGluYXRlcyxcbiAgICAgIHNoaXAsXG4gICAgICAocm93LCBjb2wpID0+IHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uc2hpcCA9IG51bGw7XG4gICAgICB9LFxuICAgICk7XG4gICAgc2hpcC5zdGFydENvb3JkaW5hdGVzID0gdGFyZ2V0Q29vcmRpbmF0ZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3Rvci5mb3JFYWNoUG9zaXRpb25DZWxsKFxuICAgICAgdGFyZ2V0Q29vcmRpbmF0ZXMsXG4gICAgICBzaGlwLFxuICAgICAgKHJvdywgY29sKSA9PiB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXAgPSBzaGlwO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgaXNDb29yZGluYXRlRnJlZShyb3csIGNvbCwgc2hpcCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXAgJiZcbiAgICAgICghc2hpcCB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICByb3cgPiAwICYmXG4gICAgICB0aGlzLmJvYXJkW3JvdyAtIDFdW2NvbF0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93IC0gMV1bY29sXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBjb2wgPCA5ICYmXG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sICsgMV0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2wgKyAxXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICByb3cgPCA5ICYmXG4gICAgICB0aGlzLmJvYXJkW3JvdyArIDFdW2NvbF0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93ICsgMV1bY29sXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBjb2wgPiAwICYmXG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sIC0gMV0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2wgLSAxXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzUG9zaXRpb25WYWxpZChzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgW3N0YXJ0Q29sLCBzdGFydFJvd10gPVxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKHN0YXJ0KTtcbiAgICBjb25zdCBbZW5kQ29sLCBlbmRSb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGVuZCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPVxuICAgICAgc3RhcnRSb3cgPT09IGVuZFJvdyA/IGVuZENvbCAtIHN0YXJ0Q29sICsgMSA6IGVuZFJvdyAtIHN0YXJ0Um93ICsgMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3RhbmNlOyBpKyspIHtcbiAgICAgIGlmIChzdGFydFJvdyA9PT0gZW5kUm93KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Nvb3JkaW5hdGVGcmVlKHN0YXJ0Um93LCBzdGFydENvbCArIGkpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQ29vcmRpbmF0ZUZyZWUoc3RhcnRSb3cgKyBpLCBzdGFydENvbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcFJhbmRvbWx5KGxlbmd0aCkge1xuICAgIGxldCBpbml0aWFsUG9zaXRpb247XG4gICAgbGV0IGZpbmFsUG9zaXRpb247XG4gICAgbGV0IHZhbGlkUG9zaXRpb24gPSBmYWxzZTtcbiAgICB3aGlsZSAoIXZhbGlkUG9zaXRpb24pIHtcbiAgICAgIGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuY29uc3RydWN0b3IuZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKFxuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMSxcbiAgICAgICk7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBmaW5hbFBvc2l0aW9uID1cbiAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgICAgaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgKyBsZW5ndGggLSAxIDw9IDc0XG4gICAgICAgICAgICAgID8gaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgKyBsZW5ndGggLSAxXG4gICAgICAgICAgICAgIDogaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgLSBsZW5ndGggKyAxLFxuICAgICAgICAgICkgKyBpbml0aWFsUG9zaXRpb24uc2xpY2UoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbml0aWFsTnVtYmVyID0gK2luaXRpYWxQb3NpdGlvbi5zbGljZSgxKTtcbiAgICAgICAgZmluYWxQb3NpdGlvbiA9XG4gICAgICAgICAgaW5pdGlhbFBvc2l0aW9uWzBdICtcbiAgICAgICAgICAoaW5pdGlhbE51bWJlciArIGxlbmd0aCAtIDEgPD0gMTBcbiAgICAgICAgICAgID8gaW5pdGlhbE51bWJlciArIGxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogaW5pdGlhbE51bWJlciAtIGxlbmd0aCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSA+IGZpbmFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSB8fFxuICAgICAgICAraW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpID4gK2ZpbmFsUG9zaXRpb24uc2xpY2UoMSlcbiAgICAgICkge1xuICAgICAgICBbaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uXSA9IFtmaW5hbFBvc2l0aW9uLCBpbml0aWFsUG9zaXRpb25dO1xuICAgICAgfVxuICAgICAgdmFsaWRQb3NpdGlvbiA9IHRoaXMuaXNQb3NpdGlvblZhbGlkKGluaXRpYWxQb3NpdGlvbiwgZmluYWxQb3NpdGlvbik7XG4gICAgfVxuICAgIHRoaXMucGxhY2VTaGlwKGluaXRpYWxQb3NpdGlvbiwgZmluYWxQb3NpdGlvbik7XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNvbEluZGV4ID0gY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY1O1xuICAgIGNvbnN0IHJvd0luZGV4ID0gK2Nvb3JkaW5hdGVzLnNsaWNlKDEpIC0gMTtcbiAgICBpZiAoY29sSW5kZXggPCAwIHx8IGNvbEluZGV4ID4gOSB8fCByb3dJbmRleCA8IDAgfHwgcm93SW5kZXggPiA5KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBDb29yZGluYXRlc1wiKTtcbiAgICByZXR1cm4gW2NvbEluZGV4LCByb3dJbmRleF07XG4gIH1cblxuICBzdGF0aWMgZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSA2NCArICtjb29yZGluYXRlcy5zbGljZSgxKSAqIDEwIC0gMTA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKG4pIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgobiAlIDEwID09PSAwID8gMTAgOiBuICUgMTApICsgNjQpfSR7XG4gICAgICBNYXRoLmZsb29yKG4gLyAxMCkgKyAobiAlIDEwID09PSAwID8gMCA6IDEpXG4gICAgfWA7XG4gIH1cblxuICBnZXRDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtjb2wsIHJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiB0aGlzLmJvYXJkW3Jvd11bY29sXTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHRocm93IG5ldyBFcnJvcihcIlJlcGVhdGVkIGNvb3JkaW5hdGVzXCIpO1xuICAgIGlmIChjZWxsLnNoaXApIHtcbiAgICAgIGNlbGwuc2hpcC5oaXQoKTtcbiAgICB9XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uYXR0YWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgaGF2ZUFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5ldmVyeSgocm93KSA9PlxuICAgICAgcm93LmV2ZXJ5KChjZWxsKSA9PiAhY2VsbC5zaGlwIHx8IGNlbGwuc2hpcC5pc1N1bmsoKSksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gKGVsZW1lbnQsIGNvbnRlbnQsIGNsYXNzZXMsIGF0dHJpYnV0ZXMpID0+IHtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgaWYgKGNvbnRlbnQpIGVsZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgY2xhc3Nlcy5zcGxpdChcIiBcIikuZm9yRWFjaCgobXlDbGFzcykgPT4gZWxlLmNsYXNzTGlzdC5hZGQobXlDbGFzcykpO1xuICB9XG4gIGlmIChhdHRyaWJ1dGVzKVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKSA9PlxuICAgICAgZWxlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVbMF0sIGF0dHJpYnV0ZVsxXSksXG4gICAgKTtcbiAgcmV0dXJuIGVsZTtcbn07XG5cbmNvbnN0IHJlbmRlckxpbmtJY29uID0gKG5hbWUsIHZpZXdCb3gsIHBhdGgsIG15Q2xhc3MpID0+IHtcbiAgY29uc3QgaWNvblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICBjb25zdCBpY29uUGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgXCJwYXRoXCIsXG4gICk7XG5cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcbiAgaWNvblN2Zy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgaWNvblN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuXG4gIGljb25QYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgcGF0aCk7XG5cbiAgaWNvblN2Zy5hcHBlbmRDaGlsZChpY29uUGF0aCk7XG5cbiAgaWYgKG5hbWUgPT09IFwicGVuY2lsXCIgfHwgbmFtZSA9PT0gXCJkZWxldGVcIikgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICBpZiAobXlDbGFzcykgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG15Q2xhc3MpO1xuXG4gIHJldHVybiBpY29uU3ZnO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IEFycmF5LmZyb20oQXJyYXkoMTAwKS5maWxsKCksIChfLCBpKSA9PiBpICsgMSk7XG4gIH1cblxuICByZXNldFNob3RzQXZhaWxhYmxlKCkge1xuICAgIHRoaXMuc2hvdHNBdmFpbGFibGUgPSBBcnJheS5mcm9tKEFycmF5KDEwMCkuZmlsbCgpLCAoXywgaSkgPT4gaSArIDEpO1xuICB9XG5cbiAgYXR0YWNrKGVuZW15LCBjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHNob3ROdW1iZXIgPVxuICAgICAgdGhpcy5ib2FyZC5jb25zdHJ1Y3Rvci5nZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdGhpcy5zaG90c0F2YWlsYWJsZS5pbmNsdWRlcyhzaG90TnVtYmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgIGVuZW15LmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgIHRoaXMuc2hvdHNBdmFpbGFibGUgPSB0aGlzLnNob3RzQXZhaWxhYmxlLmZpbHRlcigobikgPT4gbiAhPT0gc2hvdE51bWJlcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBtYWtlUmFuZG9tQXR0YWNrKGVuZW15KSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmJvYXJkLmNvbnN0cnVjdG9yLmdldENvb3JkaW5hdGVzRnJvbU51bWJlcihcbiAgICAgIHRoaXMuc2hvdHNBdmFpbGFibGVbXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2hvdHNBdmFpbGFibGUubGVuZ3RoKVxuICAgICAgXSxcbiAgICApO1xuICAgIHRoaXMuYXR0YWNrKGVuZW15LCBjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQuYm9hcmQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgZXZlbnRzID0gKCgpID0+IHtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgY29uc3Qgb24gPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSlcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gIH07XG5cbiAgY29uc3Qgb2ZmID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVtaXQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IGZuKGRhdGEpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBlbWl0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgc3RhcnRDb29yZGluYXRlcywgZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5zdGFydENvb3JkaW5hdGVzID0gc3RhcnRDb29yZGluYXRlcztcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkgdGhpcy5oaXRzKys7XG4gICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwZHZoO1xcbn1cXG5cXG5tYWluIHtcXG4gIHdpZHRoOiBtaW4oNzBjaCwgMTAwJSAtIDRyZW0pO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcbn1cXG5mb290ZXIgYSB7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5mb290ZXIgc3ZnIHtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVlbTtcXG4gIG1heC13aWR0aDogMS41ZW07XFxuICBmaWxsOiB3aGl0ZTtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAxZW07XFxufVxcbnNlY3Rpb24gaDIge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuYnV0dG9uOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbnRyb2xzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHJvdy1nYXA6IDFlbTtcXG59XFxuLmNvbnRyb2xzIGJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5jb250cm9scyAuZGlzcGxheSB7XFxuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAxZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSkvcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSk7XFxuICBhc3BlY3QtcmF0aW86IDEvMTtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDE4ZW0pIC8gMik7XFxufVxcbi5ib2FyZCAubGFiZWwge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmJvYXJkIC5jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM1NTU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uYm9hcmQgLmNlbGwuc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxufVxcbi5ib2FyZCAuY2VsbC5zaGlwLmF0dGFja2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYTMyMzI7XFxufVxcbi5ib2FyZCAuY2VsbC5hdHRhY2tlZDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIidcXFwiO1xcbiAgd2lkdGg6IDAuNWVtO1xcbiAgaGVpZ2h0OiAwLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4uYm9hcmQgLmNlbGwgLmRyYWctc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4ucGxheWVyLnNldHVwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLnBsYXllci5zZXR1cCAuZHVtbXkuYm9hcmQge1xcbiAgcGFkZGluZy1ib3R0b206IDA7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHN2aCAtIDE4ZW0pO1xcbn1cXG4ucGxheWVyLnNldHVwIC5yYW5kb21pemUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQU1BO0VBQ0Usc0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUxGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLCtDQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0UsNkJBQUE7RUFDQSxtQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBekJnQjtFQTBCaEIsWUF2QmE7RUF3QmIsa0JBQUE7RUFDQSxnQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBaENnQjtFQWlDaEIsaUJBQUE7QUFQRjtBQVNFO0VBQ0UsWUFqQ1c7RUFrQ1gscUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0EzQ1c7QUFtQ2Y7O0FBY0E7RUFDRSxlQUFBO0FBWEY7QUFhRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFYSjs7QUFlQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFaRjtBQWNFO0VBQ0UsZUFBQTtBQVpKOztBQWtCQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFmRjtBQWlCRTtFQUNFLDJCQW5GWTtFQW9GWixZQWhGVztBQWlFZjtBQWtCRTtFQUNFLG1CQUFBO0FBaEJKOztBQXNCQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDBFQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQ0FBQTtBQW5CRjtBQXFCRTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQW5CSjtBQXNCRTtFQUNFLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFwQko7QUFzQkk7RUFDRSwyQkFsSFU7QUE4RmhCO0FBcUJNO0VBQ0UseUJBbEhVO0FBK0ZsQjtBQXVCSTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFyQk47QUF3Qkk7RUFDRSwyQkFqSVU7RUFrSVYsTUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQXRCTjs7QUEyQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUF4QkY7QUEwQkU7RUFDRSxpQkFBQTtFQUNBLCtCQUFBO0FBeEJKO0FBMkJFO0VBQ0UsNkJBQUE7QUF6QkpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiJHByaW1hcnktY29sb3I6IHN0ZWVsYmx1ZTtcXG4kc2Vjb25kYXJ5LWNvbG9yOiAjNTU1O1xcbiRoaWdobGlnaHQtY29sb3I6ICNmYTMyMzI7XFxuJHByaW1hcnktZmM6IGJsYWNrO1xcbiRzZWNvbmRhcnktZmM6IHdoaXRlO1xcblxcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8vIEdlbmVyYWwgbGF5b3V0XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCAxZnIgbWF4LWNvbnRlbnQ7XFxuICBoZWlnaHQ6IDEwMGR2aDsgIC8vIFRlc3Qgb3RoZXIgYmVoYXZpb3JzXFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gNHJlbSk7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC41ZW0gMDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWNvbmRhcnktY29sb3I7XFxuICBwYWRkaW5nOiAwLjI1ZW0gMDtcXG5cXG4gIGEge1xcbiAgICBjb2xvcjogJHNlY29uZGFyeS1mYztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIHN2ZyB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwLjVlbTtcXG4gICAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gICAgZmlsbDogJHNlY29uZGFyeS1mYztcXG4gIH1cXG59XFxuXFxuLy8gR2FtZSB2aWV3XFxuXFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAxZW07XFxuXFxuICBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbn1cXG5cXG5idXR0b24ge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIFxcbiAgJjpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gIH1cXG59XFxuXFxuLy8gQ29udHJvbHNcXG5cXG4uY29udHJvbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcm93LWdhcDogMWVtO1xcblxcbiAgYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcblxcbiAgLmRpc3BsYXkge1xcbiAgICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xcbiAgfVxcbn1cXG5cXG4vLyBCb2FyZHNcXG5cXG4uYm9hcmQge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAxZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSkgLyByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7IC8vIFRoZSBwb3NpdGlvbiBpc24ndCByaWdodC4gRml4IGl0IGxhdGVyLlxcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMThlbSkgLyAyKTtcXG5cXG4gIC5sYWJlbCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5jZWxsIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgJHNlY29uZGFyeS1jb2xvcjtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICAgICYuc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgICAgJi5hdHRhY2tlZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgXFxuICAgICYuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiJ1xcXCI7XFxuICAgICAgd2lkdGg6IDAuNWVtO1xcbiAgICAgIGhlaWdodDogMC41ZW07XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICB9XFxuXFxuICAgIC5kcmFnLXNoaXAge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgei1pbmRleDogMTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4ucGxheWVyLnNldHVwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gIC5kdW1teS5ib2FyZCB7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSk7XFxuICB9XFxuXFxuICAucmFuZG9taXplIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIC8vYm9yZGVyOiAxcHggc29saWQgJHByaW1hcnktY29sb3I7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL3B1YnN1YlwiO1xuXG5nYW1lQ29udHJvbGxlci5zZXR1cEdhbWUoKTtcbmRvbUNvbnRyb2xsZXIucmVuZGVyUGFnZUxheW91dCgpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJyZW5kZXJMaW5rSWNvbiIsIlBsYXllciIsImV2ZW50cyIsImRvbUNvbnRyb2xsZXIiLCJib2FyZHMiLCJzZXR1cEJvYXJkcyIsIm5ld0JvYXJkcyIsImdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMiLCJyb3ciLCJjb2wiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJkaXNwbGF5IiwibWVzc2FnZSIsInRleHQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsInNob3dHYW1lT3ZlciIsIndpbm5lciIsIm5hbWUiLCJhdHRhY2tDZWxsIiwiZSIsImVtaXQiLCJ0YXJnZXQiLCJpZCIsImdldENvb3JkaW5hdGVzT2Zmc2V0IiwiY29vcmRpbmF0ZXMiLCJvZmZzZXQiLCJkaXJlY3Rpb24iLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImNsb3Nlc3QiLCJsZW5ndGhYIiwiZGF0YXNldCIsIm9mZnNldFdpZHRoIiwibGVuZ3RoIiwibGVuZ3RoWSIsIm9mZnNldEhlaWdodCIsInNxdWFyZU9mZnNldCIsIk1hdGgiLCJmbG9vciIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29uc29sZSIsImxvZyIsImVmZmVjdEFsbG93ZWQiLCJhbGxvd0Ryb3AiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3BFZmZlY3QiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInN0eWxlIiwiekluZGV4IiwiZHJvcCIsInNvdXJjZUNvb3JkaW5hdGVzIiwiZ2V0RGF0YSIsIm9mZlNldCIsInNvdXJjZUNlbGwiLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0RWxlbWVudENoaWxkIiwidGFyZ2V0Q29vcmRpbmF0ZXMiLCJyZW5kZXJTZXR1cEJvYXJkIiwiZXJyb3IiLCJkcmFnZW5kIiwic2hpcHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNoaXAiLCJyZW5kZXJCb2FyZCIsImJvYXJkIiwicGxheWVyIiwiYm9hcmRDb250YWluZXIiLCJpIiwiY29sTGFiZWwiLCJhcHBlbmRDaGlsZCIsInJvd0xhYmVsIiwiY2VsbCIsImoiLCJjbGFzc2VzIiwiYXR0YWNrZWQiLCJjZWxsRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGQiLCJzdGFydENvb3JkaW5hdGVzIiwid2lkdGgiLCJoZWlnaHQiLCJzdGFydEdhbWUiLCJyZW5kZXJHYW1lU2NyZWVuIiwicmVuZGVyQ29udHJvbHMiLCJidXR0b25DbGFzcyIsImJ1dHRvblRleHQiLCJkaXNwbGF5VGV4dCIsImZuIiwicmVzdGFydEdhbWUiLCJjb250cm9sU2VjdGlvbiIsImJ0biIsInRleHREaXNwbGF5IiwibWFpbiIsImNsZWFuRWxlbWVudCIsInBsYXllclNlY3Rpb24iLCJlbmVteVNlY3Rpb24iLCJjb21wdXRlciIsInBhcmVudCIsImNoaWxkIiwicmVtb3ZlQ2hpbGQiLCJ1cGRhdGVTY3JlZW4iLCJib2R5IiwicmVuZGVyUGFnZUxheW91dCIsInJhbmRvbWl6ZVBsYXllckJvYXJkIiwicmFuZG9taXplQnRuIiwiaGVhZGVyIiwiZm9vdGVyIiwiYSIsIm9uIiwiZ2FtZUNvbnRyb2xsZXIiLCJhY3RpdmVHYW1lIiwiZ2V0UGxheWVyIiwiZ2V0Q29tcHV0ZXIiLCJnYW1lT3ZlciIsImNvbXB1dGVyVHVybiIsImVuZW15IiwibWFrZVJhbmRvbUF0dGFjayIsImhhdmVBbGxTaGlwc1N1bmsiLCJwbGF5VHVybiIsInZhbGlkQ29vcmRpbmF0ZXMiLCJhdHRhY2siLCJzZXR1cEdhbWUiLCJmaWxsQm9hcmRXaXRoU2hpcHMiLCJnZXRCb2FyZCIsInJlc2V0Qm9hcmQiLCJiaW5kIiwicmVzZXRTaG90c0F2YWlsYWJsZSIsIm1vdmVTaGlwIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwiZmlsbEJvYXJkIiwicHVzaCIsInBsYWNlU2hpcFJhbmRvbWx5IiwiY2xlYW5Cb2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0IiwiZW5kIiwic3RhcnRDb2wiLCJzdGFydFJvdyIsImdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMiLCJlbmRDb2wiLCJlbmRSb3ciLCJkaXN0YW5jZSIsImZvckVhY2hQb3NpdGlvbkNlbGwiLCJyZXN1bHQiLCJnZXRDb29yZGluYXRlcyIsIm5ld0Nvb3JkaW5hdGVzIiwiaXNDb29yZGluYXRlRnJlZSIsImV2ZXJ5IiwiRXJyb3IiLCJpc1Bvc2l0aW9uVmFsaWQiLCJpbml0aWFsUG9zaXRpb24iLCJmaW5hbFBvc2l0aW9uIiwidmFsaWRQb3NpdGlvbiIsImdldENvb3JkaW5hdGVzRnJvbU51bWJlciIsInJhbmRvbSIsImluaXRpYWxOdW1iZXIiLCJjb2xJbmRleCIsInJvd0luZGV4IiwiZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzIiwibiIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJpc1N1bmsiLCJlbGVtZW50IiwiY29udGVudCIsImF0dHJpYnV0ZXMiLCJlbGUiLCJzcGxpdCIsIm15Q2xhc3MiLCJhdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ2aWV3Qm94IiwicGF0aCIsImljb25TdmciLCJjcmVhdGVFbGVtZW50TlMiLCJpY29uUGF0aCIsInRpdGxlIiwic2hvdHNBdmFpbGFibGUiLCJBcnJheSIsImZyb20iLCJmaWxsIiwiXyIsInNob3ROdW1iZXIiLCJpbmNsdWRlcyIsImZpbHRlciIsImdldE5hbWUiLCJldmVudE5hbWUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJvZmYiLCJzcGxpY2UiLCJkYXRhIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=