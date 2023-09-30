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
    if (e.target.classList.contains("ship")) e.dataTransfer.dropEffect = "none";
  }
  function drop(e) {
    e.preventDefault();
    const sourceCoordinates = e.dataTransfer.getData("text/coordinates");
    const offSet = e.dataTransfer.getData("text/offset");
    const sourceCell = document.getElementById(sourceCoordinates);
    const {
      direction
    } = sourceCell.firstElementChild.dataset;
    console.log(sourceCoordinates);
    const targetCoordinates = getCoordinatesOffset(e.target.id, offSet, direction);
    console.log(targetCoordinates);
    const newParent = document.getElementById(targetCoordinates);
    newParent.appendChild(sourceCell.firstElementChild);
    // Add event that moves the ship in the underlying board,
    // and maybe change the move from the drag to a re-render
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
    const displayText = buttonClass === "new-game" ? "Click on the enemy's board to attack" : "Drag and click on your ships, then click the button above to start the game";
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
    const container = document.querySelector("section.player.setup");
    cleanElement(container);
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
  _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("gameSetup", setupBoards);
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
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("gameSetup", {
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
  };
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("startGame", startGame);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNvQjtBQUNFO0FBQ047QUFFdENqQixxREFBYyxDQUFDWSxTQUFTLENBQUMsQ0FBQztBQUMxQjVILG9EQUFhLENBQUN1RyxnQkFBZ0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcHVic3ViLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzPzc1YmEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHJlbmRlckxpbmtJY29uIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IGRvbUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBsZXQgYm9hcmRzO1xuXG4gIGZ1bmN0aW9uIHNldHVwQm9hcmRzKG5ld0JvYXJkcykge1xuICAgIGJvYXJkcyA9IG5ld0JvYXJkcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMocm93LCBjb2wpIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZShjb2wgKyA2NSl9JHtyb3cgKyAxfWA7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5KG1lc3NhZ2UpIHtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5X190ZXh0XCIpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0dhbWVPdmVyKHdpbm5lcikge1xuICAgIGRpc3BsYXkoYFRoZSBnYW1lIGlzIG92ZXIuICR7d2lubmVyLm5hbWV9IHdvbiFgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF0dGFja0NlbGwoZSkge1xuICAgIGV2ZW50cy5lbWl0KFwicGxheWVyQXR0YWNrXCIsIGUudGFyZ2V0LmlkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzT2Zmc2V0KGNvb3JkaW5hdGVzLCBvZmZzZXQsIGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaFwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSBvZmZzZXQpICtcbiAgICAgICAgY29vcmRpbmF0ZXMuc2xpY2UoMSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlc1swXSArICgrY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSBvZmZzZXQpO1xuICB9XG5cbiAgLy8gRHJhZyAmIGRyb3AgaGFuZGxlcnNcbiAgZnVuY3Rpb24gZHJhZyhlKSB7XG4gICAgLy9lLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvY29vcmRpbmF0ZXNcIiwgZS50YXJnZXQuY2xvc2VzdChcIi5jZWxsXCIpLmlkKTtcbiAgICBjb25zdCBsZW5ndGhYID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhcIlxuICAgICAgICA/IGUudGFyZ2V0Lm9mZnNldFdpZHRoIC8gK2UudGFyZ2V0LmRhdGFzZXQubGVuZ3RoXG4gICAgICAgIDogZS50YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbGVuZ3RoWSA9XG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJ2XCJcbiAgICAgICAgPyBlLnRhcmdldC5vZmZzZXRIZWlnaHQgLyArZS50YXJnZXQuZGF0YXNldC5sZW5ndGhcbiAgICAgICAgOiBlLnRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3Qgc3F1YXJlT2Zmc2V0ID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhcIlxuICAgICAgICA/IE1hdGguZmxvb3IoZS5vZmZzZXRYIC8gbGVuZ3RoWClcbiAgICAgICAgOiBNYXRoLmZsb29yKGUub2Zmc2V0WSAvIGxlbmd0aFkpO1xuICAgIGNvbnNvbGUubG9nKHNxdWFyZU9mZnNldCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvb2Zmc2V0XCIsIHNxdWFyZU9mZnNldCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsb3dEcm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJub25lXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkcm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc291cmNlQ29vcmRpbmF0ZXMgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9jb29yZGluYXRlc1wiKTtcbiAgICBjb25zdCBvZmZTZXQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9vZmZzZXRcIik7XG4gICAgY29uc3Qgc291cmNlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNvdXJjZUNvb3JkaW5hdGVzKTtcbiAgICBjb25zdCB7IGRpcmVjdGlvbiB9ID0gc291cmNlQ2VsbC5maXJzdEVsZW1lbnRDaGlsZC5kYXRhc2V0O1xuICAgIGNvbnNvbGUubG9nKHNvdXJjZUNvb3JkaW5hdGVzKTtcbiAgICBjb25zdCB0YXJnZXRDb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzT2Zmc2V0KFxuICAgICAgZS50YXJnZXQuaWQsXG4gICAgICBvZmZTZXQsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyh0YXJnZXRDb29yZGluYXRlcyk7XG4gICAgY29uc3QgbmV3UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0Q29vcmRpbmF0ZXMpO1xuICAgIG5ld1BhcmVudC5hcHBlbmRDaGlsZChzb3VyY2VDZWxsLmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAvLyBBZGQgZXZlbnQgdGhhdCBtb3ZlcyB0aGUgc2hpcCBpbiB0aGUgdW5kZXJseWluZyBib2FyZCxcbiAgICAvLyBhbmQgbWF5YmUgY2hhbmdlIHRoZSBtb3ZlIGZyb20gdGhlIGRyYWcgdG8gYSByZS1yZW5kZXJcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJvYXJkKGJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCBib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgYCR7cGxheWVyfSBib2FyZGApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgY29uc3QgY29sTGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgY29sXCIpO1xuICAgICAgY29sTGFiZWwuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgPT09IDAgPyBcIlwiIDogU3RyaW5nLmZyb21DaGFyQ29kZShpICsgNjQpKSxcbiAgICAgICk7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb2xMYWJlbCk7XG4gICAgfVxuICAgIGJvYXJkLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgY29uc3Qgcm93TGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgcm93XCIpO1xuICAgICAgcm93TGFiZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgaSArIDEpKTtcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0xhYmVsKTtcbiAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gXCJjZWxsXCI7XG4gICAgICAgIGlmIChjZWxsLmF0dGFja2VkKSBjbGFzc2VzICs9IFwiIGF0dGFja2VkXCI7XG4gICAgICAgIGlmIChjZWxsLnNoaXAgJiYgcGxheWVyID09PSBcInBsYXllclwiKSBjbGFzc2VzICs9IFwiIHNoaXBcIjtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzKGksIGopO1xuICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgY2xhc3NlcywgW1xuICAgICAgICAgIFtcImlkXCIsIGNvb3JkaW5hdGVzXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDZWxsKTtcbiAgICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCAmJiBjZWxsLnNoaXApIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiZHVtbXlcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBhbGxvd0Ryb3ApO1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3ApO1xuICAgICAgICB9XG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJkdW1teVwiICYmIGNlbGwuc2hpcCkge1xuICAgICAgICAgIGlmIChjZWxsLnNoaXAuc3RhcnRDb29yZGluYXRlcyA9PT0gY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiZHJhZy1zaGlwXCIsIFtcbiAgICAgICAgICAgICAgW1wiZHJhZ2dhYmxlXCIsIHRydWVdLFxuICAgICAgICAgICAgICBbXCJkYXRhLWxlbmd0aFwiLCBjZWxsLnNoaXAubGVuZ3RoXSxcbiAgICAgICAgICAgICAgW1wiZGF0YS1kaXJlY3Rpb25cIiwgY2VsbC5zaGlwLmRpcmVjdGlvbl0sXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnKTtcbiAgICAgICAgICAgIGlmIChjZWxsLnNoaXAuZGlyZWN0aW9uID09PSBcImhcIilcbiAgICAgICAgICAgICAgc2hpcC5zdHlsZS53aWR0aCA9XG4gICAgICAgICAgICAgICAgY2VsbC5zaGlwLmxlbmd0aCA9PT0gNSA/IFwiNTYwJVwiIDogYCR7Y2VsbC5zaGlwLmxlbmd0aCAqIDExMX0lYDtcbiAgICAgICAgICAgIGVsc2Ugc2hpcC5zdHlsZS5oZWlnaHQgPSBgJHtjZWxsLnNoaXAubGVuZ3RoICogMTF9MCVgO1xuICAgICAgICAgICAgY2VsbEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm9hcmRDb250YWluZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJzdGFydEdhbWVcIik7XG4gICAgcmVuZGVyR2FtZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQ29udHJvbHMoYnV0dG9uQ2xhc3MpIHtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIiA/IFwiKyBOZXcgR2FtZVwiIDogXCJTdGFydCBHYW1lXCI7XG4gICAgY29uc3QgZGlzcGxheVRleHQgPVxuICAgICAgYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIlxuICAgICAgICA/IFwiQ2xpY2sgb24gdGhlIGVuZW15J3MgYm9hcmQgdG8gYXR0YWNrXCJcbiAgICAgICAgOiBcIkRyYWcgYW5kIGNsaWNrIG9uIHlvdXIgc2hpcHMsIHRoZW4gY2xpY2sgdGhlIGJ1dHRvbiBhYm92ZSB0byBzdGFydCB0aGUgZ2FtZVwiO1xuICAgIGNvbnN0IGZuID0gYnV0dG9uQ2xhc3MgPT09IFwibmV3LWdhbWVcIiA/IHJlc3RhcnRHYW1lIDogc3RhcnRHYW1lO1xuICAgIGNvbnN0IGNvbnRyb2xTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCwgXCJjb250cm9sc1wiKTtcbiAgICBjb25zdCBidG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIGJ1dHRvblRleHQsIGJ1dHRvbkNsYXNzKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZuKTtcbiAgICBjb250cm9sU2VjdGlvbi5hcHBlbmRDaGlsZChidG4pO1xuICAgIGNvbnN0IHRleHREaXNwbGF5ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImRpc3BsYXlcIik7XG4gICAgdGV4dERpc3BsYXkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInBcIiwgZGlzcGxheVRleHQsIFwiZGlzcGxheV9fdGV4dFwiKSk7XG4gICAgY29udHJvbFNlY3Rpb24uYXBwZW5kQ2hpbGQodGV4dERpc3BsYXkpO1xuICAgIHJldHVybiBjb250cm9sU2VjdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckdhbWVTY3JlZW4oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgIGNsZWFuRWxlbWVudChtYWluKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHJlbmRlckNvbnRyb2xzKFwibmV3LWdhbWVcIikpO1xuXG4gICAgY29uc3QgcGxheWVyU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiWW91ciBCb2FyZFwiKSk7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChib2FyZHMucGxheWVyLCBcInBsYXllclwiKSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChwbGF5ZXJTZWN0aW9uKTtcblxuICAgIGNvbnN0IGVuZW15U2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJFbmVteSdzIEJvYXJkXCIpKTtcbiAgICBlbmVteVNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLmNvbXB1dGVyLCBcImNvbXB1dGVyXCIpKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGVuZW15U2VjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbkVsZW1lbnQocGFyZW50KSB7XG4gICAgbGV0IGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNjcmVlbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgY2xlYW5FbGVtZW50KG1haW4pO1xuICAgIHJlbmRlckdhbWVTY3JlZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIGV2ZW50cy5lbWl0KFwicmVzdGFydEdhbWVcIik7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICAgIGNsZWFuRWxlbWVudChib2R5KTtcbiAgICByZW5kZXJQYWdlTGF5b3V0KCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5kb21pemVQbGF5ZXJCb2FyZCgpIHtcbiAgICBldmVudHMuZW1pdChcIlJhbmRvbWl6ZVBsYXllckJvYXJkXCIpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uLnBsYXllci5zZXR1cFwiKTtcbiAgICBjbGVhbkVsZW1lbnQoY29udGFpbmVyKTtcbiAgICByZW5kZXJTZXR1cEJvYXJkKCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJTZXR1cEJvYXJkKCkge1xuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi5wbGF5ZXIuc2V0dXBcIik7XG4gICAgY2xlYW5FbGVtZW50KHBsYXllclNlY3Rpb24pO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiWW91ciBCb2FyZFwiKSk7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChib2FyZHMucGxheWVyLCBcImR1bW15XCIpKTtcbiAgICBjb25zdCByYW5kb21pemVCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiUmFuZG9taXplXCIsIFwicmFuZG9taXplXCIpO1xuICAgIHJhbmRvbWl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmFuZG9taXplUGxheWVyQm9hcmQpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmFuZG9taXplQnRuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclBhZ2VMYXlvdXQoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgxXCIsIFwiQmF0dGxlc2hpcFwiKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocmVuZGVyQ29udHJvbHMoXCJzdGFydC1nYW1lXCIpKTtcblxuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcInBsYXllciBzZXR1cFwiKTtcblxuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxheWVyU2VjdGlvbik7XG5cbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICBjb25zdCBhID0gY3JlYXRlRWxlbWVudChcImFcIiwgXCJcIiwgXCJcIiwgW1xuICAgICAgW1wiaHJlZlwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9qY2lkcFwiXSxcbiAgICAgIFtcInRhcmdldFwiLCBcIl9ibGFua1wiXSxcbiAgICBdKTtcbiAgICBhLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJwXCIsIFwiQ3JlYXRlZCBieSBqY2lkcFwiKSk7XG4gICAgYS5hcHBlbmRDaGlsZChcbiAgICAgIHJlbmRlckxpbmtJY29uKFxuICAgICAgICBcImdpdGh1YlwiLFxuICAgICAgICBcIjAgMCAyNCAyNFwiLFxuICAgICAgICBcIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiLFxuICAgICAgKSxcbiAgICApO1xuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChhKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cbiAgICByZW5kZXJTZXR1cEJvYXJkKCk7XG4gIH1cblxuICBldmVudHMub24oXCJnYW1lU2V0dXBcIiwgc2V0dXBCb2FyZHMpO1xuICBldmVudHMub24oXCJ0dXJuRW5kXCIsIHVwZGF0ZVNjcmVlbik7XG4gIGV2ZW50cy5vbihcImdhbWVPdmVyXCIsIHNob3dHYW1lT3Zlcik7XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQYWdlTGF5b3V0LFxuICAgIHJlbmRlckdhbWVTY3JlZW4sXG4gICAgdXBkYXRlU2NyZWVuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tQ29udHJvbGxlcjtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXI7XG4gIGxldCBjb21wdXRlcjtcbiAgbGV0IGFjdGl2ZUdhbWUgPSBmYWxzZTtcblxuICBjb25zdCBnZXRQbGF5ZXIgPSAoKSA9PiBwbGF5ZXI7XG4gIGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAod2lubmVyKSA9PiB7XG4gICAgYWN0aXZlR2FtZSA9IGZhbHNlO1xuICAgIGV2ZW50cy5lbWl0KFwiZ2FtZU92ZXJcIiwgd2lubmVyKTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXkgPSBnZXRQbGF5ZXIoKTtcbiAgICBnZXRDb21wdXRlcigpLm1ha2VSYW5kb21BdHRhY2soZW5lbXkpO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRDb21wdXRlcigpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheVR1cm4gPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUdhbWUpIHJldHVybjtcbiAgICBjb25zdCBlbmVteSA9IGdldENvbXB1dGVyKCk7XG4gICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IGdldFBsYXllcigpLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdmFsaWRDb29yZGluYXRlcykgcmV0dXJuO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcblxuICAgIGlmIChlbmVteS5ib2FyZC5oYXZlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGdhbWVPdmVyKGdldFBsYXllcigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJZb3VcIik7XG4gICAgcGxheWVyLmJvYXJkLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBjb21wdXRlci5ib2FyZC5maWxsQm9hcmRXaXRoU2hpcHMoKTtcbiAgICBldmVudHMuZW1pdChcImdhbWVTZXR1cFwiLCB7XG4gICAgICBwbGF5ZXI6IGdldFBsYXllcigpLmdldEJvYXJkKCksXG4gICAgICBjb21wdXRlcjogZ2V0Q29tcHV0ZXIoKS5nZXRCb2FyZCgpLFxuICAgIH0pO1xuICAgIGV2ZW50cy5vbihcbiAgICAgIFwiUmFuZG9taXplUGxheWVyQm9hcmRcIixcbiAgICAgIHBsYXllci5ib2FyZC5yZXNldEJvYXJkLmJpbmQocGxheWVyLmJvYXJkKSxcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBhY3RpdmVHYW1lID0gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCByZXN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBwbGF5ZXIuYm9hcmQucmVzZXRCb2FyZCgpO1xuICAgIGNvbXB1dGVyLmJvYXJkLnJlc2V0Qm9hcmQoKTtcbiAgfTtcblxuICBldmVudHMub24oXCJzdGFydEdhbWVcIiwgc3RhcnRHYW1lKTtcbiAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgcmVzdGFydEdhbWUpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0dXBHYW1lLFxuICAgIHN0YXJ0R2FtZSxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0Q29tcHV0ZXIsXG4gICAgcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jb25zdHJ1Y3Rvci5maWxsQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWxsQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKHsgYXR0YWNrZWQ6IGZhbHNlLCBzaGlwOiBudWxsIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBmaWxsQm9hcmRXaXRoU2hpcHMoKSB7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSg1KTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDQpO1xuICAgIHRoaXMucGxhY2VTaGlwUmFuZG9tbHkoMyk7XG4gICAgdGhpcy5wbGFjZVNoaXBSYW5kb21seSgzKTtcbiAgICB0aGlzLnBsYWNlU2hpcFJhbmRvbWx5KDIpO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmNsZWFuQm9hcmQoKTtcbiAgICB0aGlzLmZpbGxCb2FyZFdpdGhTaGlwcygpO1xuICB9XG5cbiAgY2xlYW5Cb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93LmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hdHRhY2tlZCA9IGZhbHNlO1xuICAgICAgICBjZWxsLnNoaXAgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgaWYgKCFlbmQpIHtcbiAgICAgIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sXS5zaGlwID0gbmV3IFNoaXAoMSwgc3RhcnQsIFwiaFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgW2VuZENvbCwgZW5kUm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhlbmQpO1xuICAgIGNvbnN0IGRpc3RhbmNlID1cbiAgICAgIHN0YXJ0Um93ID09PSBlbmRSb3cgPyBlbmRDb2wgLSBzdGFydENvbCArIDEgOiBlbmRSb3cgLSBzdGFydFJvdyArIDE7XG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGRpc3RhbmNlLCBzdGFydCwgc3RhcnRSb3cgPT09IGVuZFJvdyA/IFwiaFwiIDogXCJ2XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICBlbHNlIHRoaXMuYm9hcmRbc3RhcnRSb3cgKyBpXVtzdGFydENvbF0uc2hpcCA9IHNoaXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvckVhY2hQb3NpdGlvbkNlbGwoc3RhcnRDb29yZGluYXRlcywgc2hpcCwgZm4pIHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICB0aGlzLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnRDb29yZGluYXRlcyk7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaFwiKSByZXN1bHQucHVzaChmbihzdGFydFJvdywgc3RhcnRDb2wgKyBpKSk7XG4gICAgICBlbHNlIHJlc3VsdC5wdXNoKGZuKHN0YXJ0Um93ICsgaSwgc3RhcnRDb2wpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIG1vdmVTaGlwKHNvdXJjZUNvb3JkaW5hdGVzLCB0YXJnZXRDb29yZGluYXRlcykge1xuICAgIGNvbnN0IHsgc2hpcCB9ID0gdGhpcy5nZXRDb29yZGluYXRlcyhzb3VyY2VDb29yZGluYXRlcyk7XG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmZvckVhY2hQb3NpdGlvbkNlbGwoXG4gICAgICB0YXJnZXRDb29yZGluYXRlcyxcbiAgICAgIHNoaXAsXG4gICAgICAocm93LCBjb2wpID0+IHRoaXMuaXNDb29yZGluYXRlRnJlZShyb3csIGNvbCwgc2hpcCksXG4gICAgKTtcbiAgICBpZiAoIW5ld0Nvb3JkaW5hdGVzLmV2ZXJ5KChjZWxsKSA9PiBjZWxsKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRhcmdldCBwb3NpdGlvbiBpcyBvY2N1cGllZFwiKTtcbiAgICB0aGlzLmNvbnN0cnVjdG9yLmZvckVhY2hQb3NpdGlvbkNlbGwoXG4gICAgICBzb3VyY2VDb29yZGluYXRlcyxcbiAgICAgIHNoaXAsXG4gICAgICAocm93LCBjb2wpID0+IHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uc2hpcCA9IG51bGw7XG4gICAgICB9LFxuICAgICk7XG4gICAgdGhpcy5jb25zdHJ1Y3Rvci5mb3JFYWNoUG9zaXRpb25DZWxsKFxuICAgICAgdGFyZ2V0Q29vcmRpbmF0ZXMsXG4gICAgICBzaGlwLFxuICAgICAgKHJvdywgY29sKSA9PiB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXAgPSBzaGlwO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgaXNDb29yZGluYXRlRnJlZShyb3csIGNvbCwgc2hpcCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXAgJiZcbiAgICAgICghc2hpcCB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICByb3cgPiAwICYmXG4gICAgICB0aGlzLmJvYXJkW3JvdyAtIDFdW2NvbF0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93IC0gMV1bY29sXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBjb2wgPCA5ICYmXG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sICsgMV0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2wgKyAxXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICByb3cgPCA5ICYmXG4gICAgICB0aGlzLmJvYXJkW3JvdyArIDFdW2NvbF0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93ICsgMV1bY29sXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBjb2wgPiAwICYmXG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sIC0gMV0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2wgLSAxXS5zaGlwICE9PSBzaGlwKVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzUG9zaXRpb25WYWxpZChzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgW3N0YXJ0Q29sLCBzdGFydFJvd10gPVxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKHN0YXJ0KTtcbiAgICBjb25zdCBbZW5kQ29sLCBlbmRSb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGVuZCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPVxuICAgICAgc3RhcnRSb3cgPT09IGVuZFJvdyA/IGVuZENvbCAtIHN0YXJ0Q29sICsgMSA6IGVuZFJvdyAtIHN0YXJ0Um93ICsgMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3RhbmNlOyBpKyspIHtcbiAgICAgIGlmIChzdGFydFJvdyA9PT0gZW5kUm93KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Nvb3JkaW5hdGVGcmVlKHN0YXJ0Um93LCBzdGFydENvbCArIGkpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQ29vcmRpbmF0ZUZyZWUoc3RhcnRSb3cgKyBpLCBzdGFydENvbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcFJhbmRvbWx5KGxlbmd0aCkge1xuICAgIGxldCBpbml0aWFsUG9zaXRpb247XG4gICAgbGV0IGZpbmFsUG9zaXRpb247XG4gICAgbGV0IHZhbGlkUG9zaXRpb24gPSBmYWxzZTtcbiAgICB3aGlsZSAoIXZhbGlkUG9zaXRpb24pIHtcbiAgICAgIGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuY29uc3RydWN0b3IuZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKFxuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMSxcbiAgICAgICk7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBmaW5hbFBvc2l0aW9uID1cbiAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgICAgaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgKyBsZW5ndGggLSAxIDw9IDc0XG4gICAgICAgICAgICAgID8gaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgKyBsZW5ndGggLSAxXG4gICAgICAgICAgICAgIDogaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgLSBsZW5ndGggKyAxLFxuICAgICAgICAgICkgKyBpbml0aWFsUG9zaXRpb24uc2xpY2UoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbml0aWFsTnVtYmVyID0gK2luaXRpYWxQb3NpdGlvbi5zbGljZSgxKTtcbiAgICAgICAgZmluYWxQb3NpdGlvbiA9XG4gICAgICAgICAgaW5pdGlhbFBvc2l0aW9uWzBdICtcbiAgICAgICAgICAoaW5pdGlhbE51bWJlciArIGxlbmd0aCAtIDEgPD0gMTBcbiAgICAgICAgICAgID8gaW5pdGlhbE51bWJlciArIGxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogaW5pdGlhbE51bWJlciAtIGxlbmd0aCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSA+IGZpbmFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSB8fFxuICAgICAgICAraW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpID4gK2ZpbmFsUG9zaXRpb24uc2xpY2UoMSlcbiAgICAgICkge1xuICAgICAgICBbaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uXSA9IFtmaW5hbFBvc2l0aW9uLCBpbml0aWFsUG9zaXRpb25dO1xuICAgICAgfVxuICAgICAgdmFsaWRQb3NpdGlvbiA9IHRoaXMuaXNQb3NpdGlvblZhbGlkKGluaXRpYWxQb3NpdGlvbiwgZmluYWxQb3NpdGlvbik7XG4gICAgfVxuICAgIHRoaXMucGxhY2VTaGlwKGluaXRpYWxQb3NpdGlvbiwgZmluYWxQb3NpdGlvbik7XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNvbEluZGV4ID0gY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY1O1xuICAgIGNvbnN0IHJvd0luZGV4ID0gK2Nvb3JkaW5hdGVzLnNsaWNlKDEpIC0gMTtcbiAgICBpZiAoY29sSW5kZXggPCAwIHx8IGNvbEluZGV4ID4gOSB8fCByb3dJbmRleCA8IDAgfHwgcm93SW5kZXggPiA5KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBDb29yZGluYXRlc1wiKTtcbiAgICByZXR1cm4gW2NvbEluZGV4LCByb3dJbmRleF07XG4gIH1cblxuICBzdGF0aWMgZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSA2NCArICtjb29yZGluYXRlcy5zbGljZSgxKSAqIDEwIC0gMTA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKG4pIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgobiAlIDEwID09PSAwID8gMTAgOiBuICUgMTApICsgNjQpfSR7XG4gICAgICBNYXRoLmZsb29yKG4gLyAxMCkgKyAobiAlIDEwID09PSAwID8gMCA6IDEpXG4gICAgfWA7XG4gIH1cblxuICBnZXRDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtjb2wsIHJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiB0aGlzLmJvYXJkW3Jvd11bY29sXTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHRocm93IG5ldyBFcnJvcihcIlJlcGVhdGVkIGNvb3JkaW5hdGVzXCIpO1xuICAgIGlmIChjZWxsLnNoaXApIHtcbiAgICAgIGNlbGwuc2hpcC5oaXQoKTtcbiAgICB9XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uYXR0YWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgaGF2ZUFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5ldmVyeSgocm93KSA9PlxuICAgICAgcm93LmV2ZXJ5KChjZWxsKSA9PiAhY2VsbC5zaGlwIHx8IGNlbGwuc2hpcC5pc1N1bmsoKSksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gKGVsZW1lbnQsIGNvbnRlbnQsIGNsYXNzZXMsIGF0dHJpYnV0ZXMpID0+IHtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgaWYgKGNvbnRlbnQpIGVsZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgY2xhc3Nlcy5zcGxpdChcIiBcIikuZm9yRWFjaCgobXlDbGFzcykgPT4gZWxlLmNsYXNzTGlzdC5hZGQobXlDbGFzcykpO1xuICB9XG4gIGlmIChhdHRyaWJ1dGVzKVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKSA9PlxuICAgICAgZWxlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVbMF0sIGF0dHJpYnV0ZVsxXSksXG4gICAgKTtcbiAgcmV0dXJuIGVsZTtcbn07XG5cbmNvbnN0IHJlbmRlckxpbmtJY29uID0gKG5hbWUsIHZpZXdCb3gsIHBhdGgsIG15Q2xhc3MpID0+IHtcbiAgY29uc3QgaWNvblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICBjb25zdCBpY29uUGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgXCJwYXRoXCIsXG4gICk7XG5cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcbiAgaWNvblN2Zy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgaWNvblN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuXG4gIGljb25QYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgcGF0aCk7XG5cbiAgaWNvblN2Zy5hcHBlbmRDaGlsZChpY29uUGF0aCk7XG5cbiAgaWYgKG5hbWUgPT09IFwicGVuY2lsXCIgfHwgbmFtZSA9PT0gXCJkZWxldGVcIikgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICBpZiAobXlDbGFzcykgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG15Q2xhc3MpO1xuXG4gIHJldHVybiBpY29uU3ZnO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IEFycmF5LmZyb20oQXJyYXkoMTAwKS5maWxsKCksIChfLCBpKSA9PiBpICsgMSk7XG4gIH1cblxuICBhdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hvdE51bWJlciA9XG4gICAgICB0aGlzLmJvYXJkLmNvbnN0cnVjdG9yLmdldE51bWJlckZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKCF0aGlzLnNob3RzQXZhaWxhYmxlLmluY2x1ZGVzKHNob3ROdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgZW5lbXkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IHRoaXMuc2hvdHNBdmFpbGFibGUuZmlsdGVyKChuKSA9PiBuICE9PSBzaG90TnVtYmVyKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG1ha2VSYW5kb21BdHRhY2soZW5lbXkpIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuYm9hcmQuY29uc3RydWN0b3IuZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKFxuICAgICAgdGhpcy5zaG90c0F2YWlsYWJsZVtcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zaG90c0F2YWlsYWJsZS5sZW5ndGgpXG4gICAgICBdLFxuICAgICk7XG4gICAgdGhpcy5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5ib2FyZDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBldmVudHMgPSAoKCkgPT4ge1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBjb25zdCBvbiA9IChldmVudE5hbWUsIGZuKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKVxuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgfTtcblxuICBjb25zdCBvZmYgPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSkgcmV0dXJuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZW1pdCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGVtaXQsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBldmVudHM7XG4iLCJjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCBkaXJlY3Rpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN0YXJ0Q29vcmRpbmF0ZXMgPSBzdGFydENvb3JkaW5hdGVzO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMrKztcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBkdmg7XFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gNHJlbSk7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxufVxcbmZvb3RlciBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbmZvb3RlciBzdmcge1xcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gIGZpbGw6IHdoaXRlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG59XFxuc2VjdGlvbiBoMiB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5idXR0b246aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY29udHJvbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcm93LWdhcDogMWVtO1xcbn1cXG4uY29udHJvbHMgYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmNvbnRyb2xzIC5kaXNwbGF5IHtcXG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKS9yZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMThlbSkgLyAyKTtcXG59XFxuLmJvYXJkIC5sYWJlbCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG4uYm9hcmQgLmNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5ib2FyZCAuY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG59XFxuLmJvYXJkIC5jZWxsLnNoaXAuYXR0YWNrZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhMzIzMjtcXG59XFxuLmJvYXJkIC5jZWxsLmF0dGFja2VkOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiJ1xcXCI7XFxuICB3aWR0aDogMC41ZW07XFxuICBoZWlnaHQ6IDAuNWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbi5ib2FyZCAuY2VsbCAuZHJhZy1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDE7XFxufVxcblxcbi5wbGF5ZXIuc2V0dXAge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4ucGxheWVyLnNldHVwIC5kdW1teS5ib2FyZCB7XFxuICBwYWRkaW5nLWJvdHRvbTogMDtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwc3ZoIC0gMThlbSk7XFxufVxcbi5wbGF5ZXIuc2V0dXAgLnJhbmRvbWl6ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBTUE7RUFDRSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBTEY7O0FBVUE7RUFDRSxhQUFBO0VBQ0EsK0NBQUE7RUFDQSxjQUFBO0FBUEY7O0FBVUE7RUFDRSw2QkFBQTtFQUNBLG1CQUFBO0FBUEY7O0FBVUE7RUFDRSxzQkF6QmdCO0VBMEJoQixZQXZCYTtFQXdCYixrQkFBQTtFQUNBLGdCQUFBO0FBUEY7O0FBVUE7RUFDRSxzQkFoQ2dCO0VBaUNoQixpQkFBQTtBQVBGO0FBU0U7RUFDRSxZQWpDVztFQWtDWCxxQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBUEo7QUFVRTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQTNDVztBQW1DZjs7QUFjQTtFQUNFLGVBQUE7QUFYRjtBQWFFO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtBQVhKOztBQWVBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQVpGO0FBY0U7RUFDRSxlQUFBO0FBWko7O0FBa0JBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtBQWZGO0FBaUJFO0VBQ0UsMkJBbkZZO0VBb0ZaLFlBaEZXO0FBaUVmO0FBa0JFO0VBQ0UsbUJBQUE7QUFoQko7O0FBc0JBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsMEVBQUE7RUFDQSxpQkFBQTtFQUNBLHFDQUFBO0FBbkJGO0FBcUJFO0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0FBbkJKO0FBc0JFO0VBQ0Usc0JBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQXBCSjtBQXNCSTtFQUNFLDJCQWxIVTtBQThGaEI7QUFxQk07RUFDRSx5QkFsSFU7QUErRmxCO0FBdUJJO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQXJCTjtBQXdCSTtFQUNFLDJCQWpJVTtFQWtJVixNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FBdEJOOztBQTJCQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQXhCRjtBQTBCRTtFQUNFLGlCQUFBO0VBQ0EsK0JBQUE7QUF4Qko7QUEyQkU7RUFDRSw2QkFBQTtBQXpCSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkcHJpbWFyeS1jb2xvcjogc3RlZWxibHVlO1xcbiRzZWNvbmRhcnktY29sb3I6ICM1NTU7XFxuJGhpZ2hsaWdodC1jb2xvcjogI2ZhMzIzMjtcXG4kcHJpbWFyeS1mYzogYmxhY2s7XFxuJHNlY29uZGFyeS1mYzogd2hpdGU7XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLy8gR2VuZXJhbCBsYXlvdXRcXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwZHZoOyAgLy8gVGVzdCBvdGhlciBiZWhhdmlvcnNcXG59XFxuXFxubWFpbiB7XFxuICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSA0cmVtKTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcblxcbiAgYSB7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgICBmaWxsOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcbn1cXG5cXG4vLyBHYW1lIHZpZXdcXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG5cXG4gIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcblxcbmJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgXFxuICAmOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcbn1cXG5cXG4vLyBDb250cm9sc1xcblxcbi5jb250cm9scyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICByb3ctZ2FwOiAxZW07XFxuXFxuICBidXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB9XFxuXFxuICAuZGlzcGxheSB7XFxuICAgIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxuICB9XFxufVxcblxcbi8vIEJvYXJkc1xcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKSAvIHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTsgLy8gVGhlIHBvc2l0aW9uIGlzbid0IHJpZ2h0LiBGaXggaXQgbGF0ZXIuXFxuICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSAvIDIpO1xcblxcbiAgLmxhYmVsIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgfVxcblxcbiAgLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgJi5zaGlwIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgICAmLmF0dGFja2VkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRoaWdobGlnaHQtY29sb3I7XFxuICAgICAgfVxcbiAgICB9XFxuICBcXG4gICAgJi5hdHRhY2tlZDo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCInXFxcIjtcXG4gICAgICB3aWR0aDogMC41ZW07XFxuICAgICAgaGVpZ2h0OiAwLjVlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIH1cXG5cXG4gICAgLmRyYWctc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIGxlZnQ6IDA7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB6LWluZGV4OiAxO1xcbiAgICB9XFxuICB9XFxufVxcblxcbi5wbGF5ZXIuc2V0dXAge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcbiAgLmR1bW15LmJvYXJkIHtcXG4gICAgcGFkZGluZy1ib3R0b206IDA7XFxuICAgIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDE4ZW0pKTtcXG4gIH1cXG5cXG4gIC5yYW5kb21pemUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgLy9ib3JkZXI6IDFweCBzb2xpZCAkcHJpbWFyeS1jb2xvcjtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLnNjc3NcIjtcbmltcG9ydCBkb21Db250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5pbXBvcnQgZ2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9nYW1lXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL21vZHVsZXMvcHVic3ViXCI7XG5cbmdhbWVDb250cm9sbGVyLnNldHVwR2FtZSgpO1xuZG9tQ29udHJvbGxlci5yZW5kZXJQYWdlTGF5b3V0KCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsInJlbmRlckxpbmtJY29uIiwiUGxheWVyIiwiZXZlbnRzIiwiZG9tQ29udHJvbGxlciIsImJvYXJkcyIsInNldHVwQm9hcmRzIiwibmV3Qm9hcmRzIiwiZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyIsInJvdyIsImNvbCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImRpc3BsYXkiLCJtZXNzYWdlIiwidGV4dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50Iiwic2hvd0dhbWVPdmVyIiwid2lubmVyIiwibmFtZSIsImF0dGFja0NlbGwiLCJlIiwiZW1pdCIsInRhcmdldCIsImlkIiwiZ2V0Q29vcmRpbmF0ZXNPZmZzZXQiLCJjb29yZGluYXRlcyIsIm9mZnNldCIsImRpcmVjdGlvbiIsImNoYXJDb2RlQXQiLCJzbGljZSIsImRyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiY2xvc2VzdCIsImxlbmd0aFgiLCJkYXRhc2V0Iiwib2Zmc2V0V2lkdGgiLCJsZW5ndGgiLCJsZW5ndGhZIiwib2Zmc2V0SGVpZ2h0Iiwic3F1YXJlT2Zmc2V0IiwiTWF0aCIsImZsb29yIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJjb25zb2xlIiwibG9nIiwiZWZmZWN0QWxsb3dlZCIsImFsbG93RHJvcCIsInByZXZlbnREZWZhdWx0IiwiZHJvcEVmZmVjdCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZHJvcCIsInNvdXJjZUNvb3JkaW5hdGVzIiwiZ2V0RGF0YSIsIm9mZlNldCIsInNvdXJjZUNlbGwiLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0RWxlbWVudENoaWxkIiwidGFyZ2V0Q29vcmRpbmF0ZXMiLCJuZXdQYXJlbnQiLCJhcHBlbmRDaGlsZCIsInJlbmRlckJvYXJkIiwiYm9hcmQiLCJwbGF5ZXIiLCJib2FyZENvbnRhaW5lciIsImkiLCJjb2xMYWJlbCIsImZvckVhY2giLCJyb3dMYWJlbCIsImNlbGwiLCJqIiwiY2xhc3NlcyIsImF0dGFja2VkIiwic2hpcCIsImNlbGxFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsInN0YXJ0Q29vcmRpbmF0ZXMiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhcnRHYW1lIiwicmVuZGVyR2FtZVNjcmVlbiIsInJlbmRlckNvbnRyb2xzIiwiYnV0dG9uQ2xhc3MiLCJidXR0b25UZXh0IiwiZGlzcGxheVRleHQiLCJmbiIsInJlc3RhcnRHYW1lIiwiY29udHJvbFNlY3Rpb24iLCJidG4iLCJ0ZXh0RGlzcGxheSIsIm1haW4iLCJjbGVhbkVsZW1lbnQiLCJwbGF5ZXJTZWN0aW9uIiwiZW5lbXlTZWN0aW9uIiwiY29tcHV0ZXIiLCJwYXJlbnQiLCJjaGlsZCIsInJlbW92ZUNoaWxkIiwidXBkYXRlU2NyZWVuIiwiYm9keSIsInJlbmRlclBhZ2VMYXlvdXQiLCJyYW5kb21pemVQbGF5ZXJCb2FyZCIsImNvbnRhaW5lciIsInJlbmRlclNldHVwQm9hcmQiLCJyYW5kb21pemVCdG4iLCJoZWFkZXIiLCJmb290ZXIiLCJhIiwib24iLCJnYW1lQ29udHJvbGxlciIsImFjdGl2ZUdhbWUiLCJnZXRQbGF5ZXIiLCJnZXRDb21wdXRlciIsImdhbWVPdmVyIiwiY29tcHV0ZXJUdXJuIiwiZW5lbXkiLCJtYWtlUmFuZG9tQXR0YWNrIiwiaGF2ZUFsbFNoaXBzU3VuayIsInBsYXlUdXJuIiwidmFsaWRDb29yZGluYXRlcyIsImF0dGFjayIsInNldHVwR2FtZSIsImZpbGxCb2FyZFdpdGhTaGlwcyIsImdldEJvYXJkIiwicmVzZXRCb2FyZCIsImJpbmQiLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJmaWxsQm9hcmQiLCJwdXNoIiwicGxhY2VTaGlwUmFuZG9tbHkiLCJjbGVhbkJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnQiLCJlbmQiLCJzdGFydENvbCIsInN0YXJ0Um93IiwiZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyIsImVuZENvbCIsImVuZFJvdyIsImRpc3RhbmNlIiwiZm9yRWFjaFBvc2l0aW9uQ2VsbCIsInJlc3VsdCIsIm1vdmVTaGlwIiwiZ2V0Q29vcmRpbmF0ZXMiLCJuZXdDb29yZGluYXRlcyIsImlzQ29vcmRpbmF0ZUZyZWUiLCJldmVyeSIsIkVycm9yIiwiaXNQb3NpdGlvblZhbGlkIiwiaW5pdGlhbFBvc2l0aW9uIiwiZmluYWxQb3NpdGlvbiIsInZhbGlkUG9zaXRpb24iLCJnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIiLCJyYW5kb20iLCJpbml0aWFsTnVtYmVyIiwiY29sSW5kZXgiLCJyb3dJbmRleCIsImdldE51bWJlckZyb21Db29yZGluYXRlcyIsIm4iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiZWxlbWVudCIsImNvbnRlbnQiLCJhdHRyaWJ1dGVzIiwiZWxlIiwic3BsaXQiLCJteUNsYXNzIiwiYXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidmlld0JveCIsInBhdGgiLCJpY29uU3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiaWNvblBhdGgiLCJ0aXRsZSIsInNob3RzQXZhaWxhYmxlIiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsIl8iLCJzaG90TnVtYmVyIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJnZXROYW1lIiwiZXZlbnROYW1lIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwib2ZmIiwic3BsaWNlIiwiZGF0YSIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9