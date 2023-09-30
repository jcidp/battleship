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
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("setupGame");
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
  function renderInitialScreen() {
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
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("gameOver", showGameOver);
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
    renderInitialScreen();
  }
  function restartGame() {
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("restartGame");
    updateScreen();
  }
  function renderRandomBoard() {
    const playerSection = document.querySelector("section.player.setup");
    cleanElement(playerSection);
    const dummyPlayer = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]("dummy");
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("renderDummy", dummyPlayer);
    playerSection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", "Your Board"));
    playerSection.appendChild(renderBoard(dummyPlayer.getBoard(), "dummy"));
    const randomizeBtn = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", "Randomize", "randomize");
    randomizeBtn.addEventListener("click", renderRandomBoard);
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
    renderRandomBoard();
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("gameStarted", setupBoards);
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("gameStarted", renderInitialScreen);
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].on("turnEnd", updateScreen);
  }
  return {
    renderPageLayout,
    renderInitialScreen,
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
  const createPlayerShips = player => {
    player.board.placeShipRandomly(5);
    player.board.placeShipRandomly(4);
    player.board.placeShipRandomly(3);
    player.board.placeShipRandomly(3);
    player.board.placeShipRandomly(2);
  };
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
    computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("The enemy");
    activeGame = true;
    createPlayerShips(player);
    createPlayerShips(computer);
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("playerAttack", playTurn);
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("gameStarted", {
      player: getPlayer().getBoard(),
      computer: getComputer().getBoard()
    });
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("restartGame", setupGame);
  };
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("setupGame", setupGame);
  _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("renderDummy", createPlayerShips);
  return {
    setupGame,
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 1em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n}\nbutton:hover {\n  cursor: pointer;\n}\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n}\n.controls button {\n  background-color: steelblue;\n  color: white;\n}\n.controls .display {\n  min-height: 2.25rem;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr))/repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 18em) / 2);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n  display: grid;\n  place-content: center;\n  position: relative;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}\n.board .cell.ship.attacked {\n  background-color: #fa3232;\n}\n.board .cell.attacked::after {\n  content: \"'\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: black;\n  border-radius: 50%;\n}\n.board .cell .drag-ship {\n  background-color: steelblue;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 1;\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n}\n.player.setup .dummy.board {\n  padding-bottom: 0;\n  max-height: calc(100svh - 18em);\n}\n.player.setup .randomize {\n  background-color: transparent;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,6BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,sBAzBgB;EA0BhB,YAvBa;EAwBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBAhCgB;EAiChB,iBAAA;AAPF;AASE;EACE,YAjCW;EAkCX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WA3CW;AAmCf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAeA;EACE,kBAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;AAZF;AAcE;EACE,eAAA;AAZJ;;AAkBA;EACE,aAAA;EACA,uBAAA;EACA,YAAA;AAfF;AAiBE;EACE,2BAnFY;EAoFZ,YAhFW;AAiEf;AAkBE;EACE,mBAAA;AAhBJ;;AAsBA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;AAnBF;AAqBE;EACE,aAAA;EACA,qBAAA;AAnBJ;AAsBE;EACE,sBAAA;EACA,aAAA;EACA,qBAAA;EACA,kBAAA;AApBJ;AAsBI;EACE,2BAlHU;AA8FhB;AAqBM;EACE,yBAlHU;AA+FlB;AAuBI;EACE,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AArBN;AAwBI;EACE,2BAjIU;EAkIV,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,UAAA;AAtBN;;AA2BA;EACE,aAAA;EACA,uBAAA;AAxBF;AA0BE;EACE,iBAAA;EACA,+BAAA;AAxBJ;AA2BE;EACE,6BAAA;AAzBJ","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: #fa3232;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;  // Test other behaviors\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 1em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n  \n  &:hover {\n    cursor: pointer;\n  }\n}\n\n// Controls\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n\n  button {\n    background-color: $primary-color;\n    color: $secondary-fc;\n  }\n\n  .display {\n    min-height: 2.25rem;\n  }\n}\n\n// Boards\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr)) / repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1 / 1; // The position isn't right. Fix it later.\n  max-height: calc((100svh - 18em) / 2);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n    display: grid;\n    place-content: center;\n    position: relative;\n\n    &.ship {\n      background-color: $primary-color;\n      &.attacked {\n        background-color: $highlight-color;\n      }\n    }\n  \n    &.attacked::after {\n      content: \"'\";\n      width: 0.5em;\n      height: 0.5em;\n      background-color: black;\n      border-radius: 50%;\n    }\n\n    .drag-ship {\n      background-color: $primary-color;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      z-index: 1;\n    }\n  }\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n\n  .dummy.board {\n    padding-bottom: 0;\n    max-height: calc((100svh - 18em));\n  }\n\n  .randomize {\n    background-color: transparent;\n    //border: 1px solid $primary-color;\n  }\n}"],"sourceRoot":""}]);
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




_modules_dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderPageLayout();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTBEO0FBQzVCO0FBQ0E7QUFFOUIsTUFBTUksYUFBYSxHQUFHLENBQUMsTUFBTTtFQUMzQixJQUFJQyxNQUFNO0VBRVYsU0FBU0MsV0FBV0EsQ0FBQ0MsU0FBUyxFQUFFO0lBQzlCRixNQUFNLEdBQUdFLFNBQVM7RUFDcEI7RUFFQSxTQUFTQyx5QkFBeUJBLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzNDLE9BQVEsR0FBRUMsTUFBTSxDQUFDQyxZQUFZLENBQUNGLEdBQUcsR0FBRyxFQUFFLENBQUUsR0FBRUQsR0FBRyxHQUFHLENBQUUsRUFBQztFQUNyRDtFQUVBLFNBQVNJLE9BQU9BLENBQUNDLE9BQU8sRUFBRTtJQUN4QixNQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3JERixJQUFJLENBQUNHLFdBQVcsR0FBR0osT0FBTztFQUM1QjtFQUVBLFNBQVNLLFlBQVlBLENBQUNDLE1BQU0sRUFBRTtJQUM1QlAsT0FBTyxDQUFFLHFCQUFvQk8sTUFBTSxDQUFDQyxJQUFLLE9BQU0sQ0FBQztFQUNsRDtFQUVBLFNBQVNDLFVBQVVBLENBQUNDLENBQUMsRUFBRTtJQUNyQnBCLCtDQUFNLENBQUNxQixJQUFJLENBQUMsY0FBYyxFQUFFRCxDQUFDLENBQUNFLE1BQU0sQ0FBQ0MsRUFBRSxDQUFDO0VBQzFDO0VBRUEsU0FBU0Msb0JBQW9CQSxDQUFDQyxXQUFXLEVBQUVDLE1BQU0sRUFBRUMsU0FBUyxFQUFFO0lBQzVELElBQUlBLFNBQVMsS0FBSyxHQUFHLEVBQUU7TUFDckIsT0FDRW5CLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDZ0IsV0FBVyxDQUFDRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUdGLE1BQU0sQ0FBQyxHQUN2REQsV0FBVyxDQUFDSSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXhCO0lBQ0EsT0FBT0osV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUNBLFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHSCxNQUFNLENBQUM7RUFDMUQ7O0VBRUE7RUFDQSxTQUFTSSxJQUFJQSxDQUFDVixDQUFDLEVBQUU7SUFDZjtJQUNBQSxDQUFDLENBQUNXLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLGtCQUFrQixFQUFFWixDQUFDLENBQUNFLE1BQU0sQ0FBQ1csT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDVixFQUFFLENBQUM7SUFDeEUsTUFBTVcsT0FBTyxHQUNYZCxDQUFDLENBQUNFLE1BQU0sQ0FBQ2EsT0FBTyxDQUFDUixTQUFTLEtBQUssR0FBRyxHQUM5QlAsQ0FBQyxDQUFDRSxNQUFNLENBQUNjLFdBQVcsR0FBRyxDQUFDaEIsQ0FBQyxDQUFDRSxNQUFNLENBQUNhLE9BQU8sQ0FBQ0UsTUFBTSxHQUMvQ2pCLENBQUMsQ0FBQ0UsTUFBTSxDQUFDYyxXQUFXO0lBQzFCLE1BQU1FLE9BQU8sR0FDWGxCLENBQUMsQ0FBQ0UsTUFBTSxDQUFDYSxPQUFPLENBQUNSLFNBQVMsS0FBSyxHQUFHLEdBQzlCUCxDQUFDLENBQUNFLE1BQU0sQ0FBQ2lCLFlBQVksR0FBRyxDQUFDbkIsQ0FBQyxDQUFDRSxNQUFNLENBQUNhLE9BQU8sQ0FBQ0UsTUFBTSxHQUNoRGpCLENBQUMsQ0FBQ0UsTUFBTSxDQUFDaUIsWUFBWTtJQUMzQixNQUFNQyxZQUFZLEdBQ2hCcEIsQ0FBQyxDQUFDRSxNQUFNLENBQUNhLE9BQU8sQ0FBQ1IsU0FBUyxLQUFLLEdBQUcsR0FDOUJjLElBQUksQ0FBQ0MsS0FBSyxDQUFDdEIsQ0FBQyxDQUFDdUIsT0FBTyxHQUFHVCxPQUFPLENBQUMsR0FDL0JPLElBQUksQ0FBQ0MsS0FBSyxDQUFDdEIsQ0FBQyxDQUFDd0IsT0FBTyxHQUFHTixPQUFPLENBQUM7SUFDckNPLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixZQUFZLENBQUM7SUFDekJwQixDQUFDLENBQUNXLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLGFBQWEsRUFBRVEsWUFBWSxDQUFDO0lBQ25EcEIsQ0FBQyxDQUFDVyxZQUFZLENBQUNnQixhQUFhLEdBQUcsTUFBTTtFQUN2QztFQUVBLFNBQVNDLFNBQVNBLENBQUM1QixDQUFDLEVBQUU7SUFDcEJBLENBQUMsQ0FBQzZCLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCN0IsQ0FBQyxDQUFDVyxZQUFZLENBQUNtQixVQUFVLEdBQUcsTUFBTTtJQUNsQyxJQUFJOUIsQ0FBQyxDQUFDRSxNQUFNLENBQUM2QixTQUFTLENBQUNDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRWhDLENBQUMsQ0FBQ1csWUFBWSxDQUFDbUIsVUFBVSxHQUFHLE1BQU07RUFDN0U7RUFFQSxTQUFTRyxJQUFJQSxDQUFDakMsQ0FBQyxFQUFFO0lBQ2ZBLENBQUMsQ0FBQzZCLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCLE1BQU1LLGlCQUFpQixHQUFHbEMsQ0FBQyxDQUFDVyxZQUFZLENBQUN3QixPQUFPLENBQUMsa0JBQWtCLENBQUM7SUFDcEUsTUFBTUMsTUFBTSxHQUFHcEMsQ0FBQyxDQUFDVyxZQUFZLENBQUN3QixPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3BELE1BQU1FLFVBQVUsR0FBRzVDLFFBQVEsQ0FBQzZDLGNBQWMsQ0FBQ0osaUJBQWlCLENBQUM7SUFDN0QsTUFBTTtNQUFFM0I7SUFBVSxDQUFDLEdBQUc4QixVQUFVLENBQUNFLGlCQUFpQixDQUFDeEIsT0FBTztJQUMxRFUsT0FBTyxDQUFDQyxHQUFHLENBQUNRLGlCQUFpQixDQUFDO0lBQzlCLE1BQU1NLGlCQUFpQixHQUFHcEMsb0JBQW9CLENBQzVDSixDQUFDLENBQUNFLE1BQU0sQ0FBQ0MsRUFBRSxFQUNYaUMsTUFBTSxFQUNON0IsU0FDRixDQUFDO0lBQ0RrQixPQUFPLENBQUNDLEdBQUcsQ0FBQ2MsaUJBQWlCLENBQUM7SUFDOUIsTUFBTUMsU0FBUyxHQUFHaEQsUUFBUSxDQUFDNkMsY0FBYyxDQUFDRSxpQkFBaUIsQ0FBQztJQUM1REMsU0FBUyxDQUFDQyxXQUFXLENBQUNMLFVBQVUsQ0FBQ0UsaUJBQWlCLENBQUM7SUFDbkQ7SUFDQTtFQUNGOztFQUVBLFNBQVNJLFdBQVdBLENBQUNDLEtBQUssRUFBRUMsTUFBTSxFQUFFO0lBQ2xDLE1BQU1DLGNBQWMsR0FBR3JFLHVEQUFhLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRyxHQUFFb0UsTUFBTyxRQUFPLENBQUM7SUFDcEUsS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUMzQixNQUFNQyxRQUFRLEdBQUd2RSx1REFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO01BQ3hEdUUsUUFBUSxDQUFDTixXQUFXLENBQ2xCakUsdURBQWEsQ0FBQyxNQUFNLEVBQUVzRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRzNELE1BQU0sQ0FBQ0MsWUFBWSxDQUFDMEQsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUNsRSxDQUFDO01BQ0RELGNBQWMsQ0FBQ0osV0FBVyxDQUFDTSxRQUFRLENBQUM7SUFDdEM7SUFDQUosS0FBSyxDQUFDSyxPQUFPLENBQUMsQ0FBQy9ELEdBQUcsRUFBRTZELENBQUMsS0FBSztNQUN4QixNQUFNRyxRQUFRLEdBQUd6RSx1REFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO01BQ3hEeUUsUUFBUSxDQUFDUixXQUFXLENBQUNqRSx1REFBYSxDQUFDLE1BQU0sRUFBRXNFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUNsREQsY0FBYyxDQUFDSixXQUFXLENBQUNRLFFBQVEsQ0FBQztNQUNwQ2hFLEdBQUcsQ0FBQytELE9BQU8sQ0FBQyxDQUFDRSxJQUFJLEVBQUVDLENBQUMsS0FBSztRQUN2QixJQUFJQyxPQUFPLEdBQUcsTUFBTTtRQUNwQixJQUFJRixJQUFJLENBQUNHLFFBQVEsRUFBRUQsT0FBTyxJQUFJLFdBQVc7UUFDekMsSUFBSUYsSUFBSSxDQUFDSSxJQUFJLElBQUlWLE1BQU0sS0FBSyxRQUFRLEVBQUVRLE9BQU8sSUFBSSxPQUFPO1FBQ3hELE1BQU1oRCxXQUFXLEdBQUdwQix5QkFBeUIsQ0FBQzhELENBQUMsRUFBRUssQ0FBQyxDQUFDO1FBQ25ELE1BQU1JLFdBQVcsR0FBRy9FLHVEQUFhLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTRFLE9BQU8sRUFBRSxDQUN0RCxDQUFDLElBQUksRUFBRWhELFdBQVcsQ0FBQyxDQUNwQixDQUFDO1FBQ0YsSUFBSXdDLE1BQU0sS0FBSyxVQUFVLEVBQUU7VUFDekJXLFdBQVcsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFMUQsVUFBVSxDQUFDO1VBQ2pELElBQUlvRCxJQUFJLENBQUNHLFFBQVEsSUFBSUgsSUFBSSxDQUFDSSxJQUFJLEVBQUVDLFdBQVcsQ0FBQ3pCLFNBQVMsQ0FBQzJCLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDbkU7UUFDQSxJQUFJYixNQUFNLEtBQUssT0FBTyxFQUFFO1VBQ3RCVyxXQUFXLENBQUNDLGdCQUFnQixDQUFDLFVBQVUsRUFBRTdCLFNBQVMsQ0FBQztVQUNuRDRCLFdBQVcsQ0FBQ0MsZ0JBQWdCLENBQUMsTUFBTSxFQUFFeEIsSUFBSSxDQUFDO1FBQzVDO1FBQ0FhLGNBQWMsQ0FBQ0osV0FBVyxDQUFDYyxXQUFXLENBQUM7UUFDdkMsSUFBSVgsTUFBTSxLQUFLLE9BQU8sSUFBSU0sSUFBSSxDQUFDSSxJQUFJLEVBQUU7VUFDbkMsSUFBSUosSUFBSSxDQUFDSSxJQUFJLENBQUNJLGdCQUFnQixLQUFLdEQsV0FBVyxFQUFFO1lBQzlDLE1BQU1rRCxJQUFJLEdBQUc5RSx1REFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQ25ELENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUNuQixDQUFDLGFBQWEsRUFBRTBFLElBQUksQ0FBQ0ksSUFBSSxDQUFDdEMsTUFBTSxDQUFDLEVBQ2pDLENBQUMsZ0JBQWdCLEVBQUVrQyxJQUFJLENBQUNJLElBQUksQ0FBQ2hELFNBQVMsQ0FBQyxDQUN4QyxDQUFDO1lBQ0ZnRCxJQUFJLENBQUNFLGdCQUFnQixDQUFDLFdBQVcsRUFBRS9DLElBQUksQ0FBQztZQUN4QyxJQUFJeUMsSUFBSSxDQUFDSSxJQUFJLENBQUNoRCxTQUFTLEtBQUssR0FBRyxFQUM3QmdELElBQUksQ0FBQ0ssS0FBSyxDQUFDQyxLQUFLLEdBQ2RWLElBQUksQ0FBQ0ksSUFBSSxDQUFDdEMsTUFBTSxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUksR0FBRWtDLElBQUksQ0FBQ0ksSUFBSSxDQUFDdEMsTUFBTSxHQUFHLEdBQUksR0FBRSxDQUFDLEtBQzlEc0MsSUFBSSxDQUFDSyxLQUFLLENBQUNFLE1BQU0sR0FBSSxHQUFFWCxJQUFJLENBQUNJLElBQUksQ0FBQ3RDLE1BQU0sR0FBRyxFQUFHLElBQUc7WUFDckR1QyxXQUFXLENBQUNkLFdBQVcsQ0FBQ2EsSUFBSSxDQUFDO1VBQy9CO1FBQ0Y7TUFDRixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFDRixPQUFPVCxjQUFjO0VBQ3ZCO0VBRUEsU0FBU2lCLFNBQVNBLENBQUEsRUFBRztJQUNuQm5GLCtDQUFNLENBQUNxQixJQUFJLENBQUMsV0FBVyxDQUFDO0VBQzFCO0VBRUEsU0FBUytELGNBQWNBLENBQUNDLFdBQVcsRUFBRTtJQUNuQyxNQUFNQyxVQUFVLEdBQUdELFdBQVcsS0FBSyxVQUFVLEdBQUcsWUFBWSxHQUFHLFlBQVk7SUFDM0UsTUFBTUUsV0FBVyxHQUNmRixXQUFXLEtBQUssVUFBVSxHQUN0QixzQ0FBc0MsR0FDdEMsNkVBQTZFO0lBQ25GLE1BQU1HLEVBQUUsR0FBR0gsV0FBVyxLQUFLLFVBQVUsR0FBR0ksV0FBVyxHQUFHTixTQUFTO0lBQy9ELE1BQU1PLGNBQWMsR0FBRzdGLHVEQUFhLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUM7SUFDakUsTUFBTThGLEdBQUcsR0FBRzlGLHVEQUFhLENBQUMsUUFBUSxFQUFFeUYsVUFBVSxFQUFFRCxXQUFXLENBQUM7SUFDNURNLEdBQUcsQ0FBQ2QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFVyxFQUFFLENBQUM7SUFDakNFLGNBQWMsQ0FBQzVCLFdBQVcsQ0FBQzZCLEdBQUcsQ0FBQztJQUMvQixNQUFNQyxXQUFXLEdBQUcvRix1REFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDO0lBQ3pEK0YsV0FBVyxDQUFDOUIsV0FBVyxDQUFDakUsdURBQWEsQ0FBQyxHQUFHLEVBQUUwRixXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDekVHLGNBQWMsQ0FBQzVCLFdBQVcsQ0FBQzhCLFdBQVcsQ0FBQztJQUN2QyxPQUFPRixjQUFjO0VBQ3ZCO0VBRUEsU0FBU0csbUJBQW1CQSxDQUFBLEVBQUc7SUFDN0IsTUFBTUMsSUFBSSxHQUFHakYsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQzNDaUYsWUFBWSxDQUFDRCxJQUFJLENBQUM7SUFDbEJBLElBQUksQ0FBQ2hDLFdBQVcsQ0FBQ3NCLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU1QyxNQUFNWSxhQUFhLEdBQUduRyx1REFBYSxDQUFDLFNBQVMsQ0FBQztJQUM5Q21HLGFBQWEsQ0FBQ2xDLFdBQVcsQ0FBQ2pFLHVEQUFhLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzVEbUcsYUFBYSxDQUFDbEMsV0FBVyxDQUFDQyxXQUFXLENBQUM3RCxNQUFNLENBQUMrRCxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0Q2QixJQUFJLENBQUNoQyxXQUFXLENBQUNrQyxhQUFhLENBQUM7SUFFL0IsTUFBTUMsWUFBWSxHQUFHcEcsdURBQWEsQ0FBQyxTQUFTLENBQUM7SUFDN0NvRyxZQUFZLENBQUNuQyxXQUFXLENBQUNqRSx1REFBYSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM5RG9HLFlBQVksQ0FBQ25DLFdBQVcsQ0FBQ0MsV0FBVyxDQUFDN0QsTUFBTSxDQUFDZ0csUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFSixJQUFJLENBQUNoQyxXQUFXLENBQUNtQyxZQUFZLENBQUM7SUFFOUJqRywrQ0FBTSxDQUFDbUcsRUFBRSxDQUFDLFVBQVUsRUFBRW5GLFlBQVksQ0FBQztFQUNyQztFQUVBLFNBQVMrRSxZQUFZQSxDQUFDSyxNQUFNLEVBQUU7SUFDNUIsSUFBSUMsS0FBSyxHQUFHRCxNQUFNLENBQUN6QyxpQkFBaUI7SUFDcEMsT0FBTzBDLEtBQUssRUFBRTtNQUNaRCxNQUFNLENBQUNFLFdBQVcsQ0FBQ0QsS0FBSyxDQUFDO01BQ3pCQSxLQUFLLEdBQUdELE1BQU0sQ0FBQ3pDLGlCQUFpQjtJQUNsQztFQUNGO0VBRUEsU0FBUzRDLFlBQVlBLENBQUEsRUFBRztJQUN0QixNQUFNVCxJQUFJLEdBQUdqRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDM0NpRixZQUFZLENBQUNELElBQUksQ0FBQztJQUNsQkQsbUJBQW1CLENBQUMsQ0FBQztFQUN2QjtFQUVBLFNBQVNKLFdBQVdBLENBQUEsRUFBRztJQUNyQnpGLCtDQUFNLENBQUNxQixJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzFCa0YsWUFBWSxDQUFDLENBQUM7RUFDaEI7RUFFQSxTQUFTQyxpQkFBaUJBLENBQUEsRUFBRztJQUMzQixNQUFNUixhQUFhLEdBQUduRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztJQUNwRWlGLFlBQVksQ0FBQ0MsYUFBYSxDQUFDO0lBQzNCLE1BQU1TLFdBQVcsR0FBRyxJQUFJMUcsK0NBQU0sQ0FBQyxPQUFPLENBQUM7SUFDdkNDLCtDQUFNLENBQUNxQixJQUFJLENBQUMsYUFBYSxFQUFFb0YsV0FBVyxDQUFDO0lBQ3ZDVCxhQUFhLENBQUNsQyxXQUFXLENBQUNqRSx1REFBYSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1RG1HLGFBQWEsQ0FBQ2xDLFdBQVcsQ0FBQ0MsV0FBVyxDQUFDMEMsV0FBVyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZFLE1BQU1DLFlBQVksR0FBRzlHLHVEQUFhLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7SUFDdEU4RyxZQUFZLENBQUM5QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUyQixpQkFBaUIsQ0FBQztJQUN6RFIsYUFBYSxDQUFDbEMsV0FBVyxDQUFDNkMsWUFBWSxDQUFDO0VBQ3pDO0VBRUEsU0FBU0MsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDMUIsTUFBTUMsSUFBSSxHQUFHaEcsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBRTNDLE1BQU1nRyxNQUFNLEdBQUdqSCx1REFBYSxDQUFDLFFBQVEsQ0FBQztJQUN0Q2lILE1BQU0sQ0FBQ2hELFdBQVcsQ0FBQ2pFLHVEQUFhLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3JEZ0gsSUFBSSxDQUFDL0MsV0FBVyxDQUFDZ0QsTUFBTSxDQUFDO0lBRXhCLE1BQU1oQixJQUFJLEdBQUdqRyx1REFBYSxDQUFDLE1BQU0sQ0FBQztJQUNsQ2lHLElBQUksQ0FBQ2hDLFdBQVcsQ0FBQ3NCLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUU5QyxNQUFNWSxhQUFhLEdBQUduRyx1REFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDO0lBRXBFaUcsSUFBSSxDQUFDaEMsV0FBVyxDQUFDa0MsYUFBYSxDQUFDO0lBRS9CYSxJQUFJLENBQUMvQyxXQUFXLENBQUNnQyxJQUFJLENBQUM7SUFFdEIsTUFBTWlCLE1BQU0sR0FBR2xILHVEQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3RDLE1BQU1tSCxDQUFDLEdBQUduSCx1REFBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ25DLENBQUMsTUFBTSxFQUFFLDBCQUEwQixDQUFDLEVBQ3BDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUNyQixDQUFDO0lBQ0ZtSCxDQUFDLENBQUNsRCxXQUFXLENBQUNqRSx1REFBYSxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3JEbUgsQ0FBQyxDQUFDbEQsV0FBVyxDQUNYaEUsd0RBQWMsQ0FDWixRQUFRLEVBQ1IsV0FBVyxFQUNYLDZ1QkFDRixDQUNGLENBQUM7SUFDRGlILE1BQU0sQ0FBQ2pELFdBQVcsQ0FBQ2tELENBQUMsQ0FBQztJQUNyQkgsSUFBSSxDQUFDL0MsV0FBVyxDQUFDaUQsTUFBTSxDQUFDO0lBRXhCUCxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25CeEcsK0NBQU0sQ0FBQ21HLEVBQUUsQ0FBQyxhQUFhLEVBQUVoRyxXQUFXLENBQUM7SUFDckNILCtDQUFNLENBQUNtRyxFQUFFLENBQUMsYUFBYSxFQUFFTixtQkFBbUIsQ0FBQztJQUM3QzdGLCtDQUFNLENBQUNtRyxFQUFFLENBQUMsU0FBUyxFQUFFSSxZQUFZLENBQUM7RUFDcEM7RUFFQSxPQUFPO0lBQ0xLLGdCQUFnQjtJQUNoQmYsbUJBQW1CO0lBQ25CVTtFQUNGLENBQUM7QUFDSCxDQUFDLEVBQUUsQ0FBQztBQUVKLCtEQUFldEcsYUFBYTs7Ozs7Ozs7Ozs7OztBQ3pQRTtBQUNBO0FBRTlCLE1BQU1nSCxjQUFjLEdBQUcsQ0FBQyxNQUFNO0VBQzVCLElBQUloRCxNQUFNO0VBQ1YsSUFBSWlDLFFBQVE7RUFDWixJQUFJZ0IsVUFBVSxHQUFHLEtBQUs7RUFFdEIsTUFBTUMsU0FBUyxHQUFHQSxDQUFBLEtBQU1sRCxNQUFNO0VBQzlCLE1BQU1tRCxXQUFXLEdBQUdBLENBQUEsS0FBTWxCLFFBQVE7RUFFbEMsTUFBTW1CLGlCQUFpQixHQUFJcEQsTUFBTSxJQUFLO0lBQ3BDQSxNQUFNLENBQUNELEtBQUssQ0FBQ3NELGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNqQ3JELE1BQU0sQ0FBQ0QsS0FBSyxDQUFDc0QsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2pDckQsTUFBTSxDQUFDRCxLQUFLLENBQUNzRCxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDakNyRCxNQUFNLENBQUNELEtBQUssQ0FBQ3NELGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNqQ3JELE1BQU0sQ0FBQ0QsS0FBSyxDQUFDc0QsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0VBQ25DLENBQUM7RUFFRCxNQUFNQyxRQUFRLEdBQUl0RyxNQUFNLElBQUs7SUFDM0JpRyxVQUFVLEdBQUcsS0FBSztJQUNsQmxILCtDQUFNLENBQUNxQixJQUFJLENBQUMsVUFBVSxFQUFFSixNQUFNLENBQUM7RUFDakMsQ0FBQztFQUVELE1BQU11RyxZQUFZLEdBQUdBLENBQUEsS0FBTTtJQUN6QixNQUFNQyxLQUFLLEdBQUdOLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCQyxXQUFXLENBQUMsQ0FBQyxDQUFDTSxnQkFBZ0IsQ0FBQ0QsS0FBSyxDQUFDO0lBQ3JDekgsK0NBQU0sQ0FBQ3FCLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdEIsSUFBSW9HLEtBQUssQ0FBQ3pELEtBQUssQ0FBQzJELGdCQUFnQixDQUFDLENBQUMsRUFBRTtNQUNsQ0osUUFBUSxDQUFDSCxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3pCO0VBQ0YsQ0FBQztFQUVELE1BQU1RLFFBQVEsR0FBSW5HLFdBQVcsSUFBSztJQUNoQyxJQUFJLENBQUN5RixVQUFVLEVBQUU7SUFDakIsTUFBTU8sS0FBSyxHQUFHTCxXQUFXLENBQUMsQ0FBQztJQUMzQixNQUFNUyxnQkFBZ0IsR0FBR1YsU0FBUyxDQUFDLENBQUMsQ0FBQ1csTUFBTSxDQUFDTCxLQUFLLEVBQUVoRyxXQUFXLENBQUM7SUFDL0QsSUFBSSxDQUFDb0csZ0JBQWdCLEVBQUU7SUFDdkI3SCwrQ0FBTSxDQUFDcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUV0QixJQUFJb0csS0FBSyxDQUFDekQsS0FBSyxDQUFDMkQsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFO01BQ2xDSixRQUFRLENBQUNKLFNBQVMsQ0FBQyxDQUFDLENBQUM7TUFDckI7SUFDRjtJQUNBSyxZQUFZLENBQUMsQ0FBQztFQUNoQixDQUFDO0VBRUQsTUFBTU8sU0FBUyxHQUFHQSxDQUFBLEtBQU07SUFDdEI5RCxNQUFNLEdBQUcsSUFBSWxFLCtDQUFNLENBQUMsS0FBSyxDQUFDO0lBQzFCbUcsUUFBUSxHQUFHLElBQUluRywrQ0FBTSxDQUFDLFdBQVcsQ0FBQztJQUNsQ21ILFVBQVUsR0FBRyxJQUFJO0lBRWpCRyxpQkFBaUIsQ0FBQ3BELE1BQU0sQ0FBQztJQUN6Qm9ELGlCQUFpQixDQUFDbkIsUUFBUSxDQUFDO0lBRTNCbEcsK0NBQU0sQ0FBQ21HLEVBQUUsQ0FBQyxjQUFjLEVBQUV5QixRQUFRLENBQUM7SUFDbkM1SCwrQ0FBTSxDQUFDcUIsSUFBSSxDQUFDLGFBQWEsRUFBRTtNQUN6QjRDLE1BQU0sRUFBRWtELFNBQVMsQ0FBQyxDQUFDLENBQUNULFFBQVEsQ0FBQyxDQUFDO01BQzlCUixRQUFRLEVBQUVrQixXQUFXLENBQUMsQ0FBQyxDQUFDVixRQUFRLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBQ0YxRywrQ0FBTSxDQUFDbUcsRUFBRSxDQUFDLGFBQWEsRUFBRTRCLFNBQVMsQ0FBQztFQUNyQyxDQUFDO0VBRUQvSCwrQ0FBTSxDQUFDbUcsRUFBRSxDQUFDLFdBQVcsRUFBRTRCLFNBQVMsQ0FBQztFQUNqQy9ILCtDQUFNLENBQUNtRyxFQUFFLENBQUMsYUFBYSxFQUFFa0IsaUJBQWlCLENBQUM7RUFFM0MsT0FBTztJQUNMVSxTQUFTO0lBQ1RaLFNBQVM7SUFDVEMsV0FBVztJQUNYUTtFQUNGLENBQUM7QUFDSCxDQUFDLEVBQUUsQ0FBQztBQUVKLCtEQUFlWCxjQUFjOzs7Ozs7Ozs7Ozs7QUMxRUg7QUFFMUIsTUFBTWdCLFNBQVMsQ0FBQztFQUNkQyxXQUFXQSxDQUFBLEVBQUc7SUFDWjtJQUNBLElBQUksQ0FBQ2xFLEtBQUssR0FBRyxJQUFJLENBQUNrRSxXQUFXLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQzNDO0VBRUEsT0FBT0EsU0FBU0EsQ0FBQSxFQUFHO0lBQ2pCLE1BQU1uRSxLQUFLLEdBQUcsRUFBRTtJQUNoQixLQUFLLElBQUlHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO01BQzNCLE1BQU03RCxHQUFHLEdBQUcsRUFBRTtNQUNkLEtBQUssSUFBSWtFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQzNCbEUsR0FBRyxDQUFDOEgsSUFBSSxDQUFDO1VBQUUxRCxRQUFRLEVBQUUsS0FBSztVQUFFQyxJQUFJLEVBQUU7UUFBSyxDQUFDLENBQUM7TUFDM0M7TUFDQVgsS0FBSyxDQUFDb0UsSUFBSSxDQUFDOUgsR0FBRyxDQUFDO0lBQ2pCO0lBQ0EsT0FBTzBELEtBQUs7RUFDZDtFQUVBcUUsU0FBU0EsQ0FBQ0MsS0FBSyxFQUFFQyxHQUFHLEVBQUU7SUFDcEIsTUFBTSxDQUFDQyxRQUFRLEVBQUVDLFFBQVEsQ0FBQyxHQUN4QixJQUFJLENBQUNQLFdBQVcsQ0FBQ1EseUJBQXlCLENBQUNKLEtBQUssQ0FBQztJQUNuRCxJQUFJLENBQUNDLEdBQUcsRUFBRTtNQUNSLElBQUksQ0FBQ3ZFLEtBQUssQ0FBQ3lFLFFBQVEsQ0FBQyxDQUFDRCxRQUFRLENBQUMsQ0FBQzdELElBQUksR0FBRyxJQUFJcUQsNkNBQUksQ0FBQyxDQUFDLEVBQUVNLEtBQUssRUFBRSxHQUFHLENBQUM7TUFDN0Q7SUFDRjtJQUNBLE1BQU0sQ0FBQ0ssTUFBTSxFQUFFQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUNWLFdBQVcsQ0FBQ1EseUJBQXlCLENBQUNILEdBQUcsQ0FBQztJQUN4RSxNQUFNTSxRQUFRLEdBQ1pKLFFBQVEsS0FBS0csTUFBTSxHQUFHRCxNQUFNLEdBQUdILFFBQVEsR0FBRyxDQUFDLEdBQUdJLE1BQU0sR0FBR0gsUUFBUSxHQUFHLENBQUM7SUFDckUsTUFBTTlELElBQUksR0FBRyxJQUFJcUQsNkNBQUksQ0FBQ2EsUUFBUSxFQUFFUCxLQUFLLEVBQUVHLFFBQVEsS0FBS0csTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdkUsS0FBSyxJQUFJekUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHMEUsUUFBUSxFQUFFMUUsQ0FBQyxFQUFFLEVBQUU7TUFDakMsSUFBSXNFLFFBQVEsS0FBS0csTUFBTSxFQUFFLElBQUksQ0FBQzVFLEtBQUssQ0FBQ3lFLFFBQVEsQ0FBQyxDQUFDRCxRQUFRLEdBQUdyRSxDQUFDLENBQUMsQ0FBQ1EsSUFBSSxHQUFHQSxJQUFJLENBQUMsS0FDbkUsSUFBSSxDQUFDWCxLQUFLLENBQUN5RSxRQUFRLEdBQUd0RSxDQUFDLENBQUMsQ0FBQ3FFLFFBQVEsQ0FBQyxDQUFDN0QsSUFBSSxHQUFHQSxJQUFJO0lBQ3JEO0VBQ0Y7RUFFQSxPQUFPbUUsbUJBQW1CQSxDQUFDL0QsZ0JBQWdCLEVBQUVKLElBQUksRUFBRWEsRUFBRSxFQUFFO0lBQ3JELE1BQU0sQ0FBQ2dELFFBQVEsRUFBRUMsUUFBUSxDQUFDLEdBQ3hCLElBQUksQ0FBQ0MseUJBQXlCLENBQUMzRCxnQkFBZ0IsQ0FBQztJQUNsRCxNQUFNZ0UsTUFBTSxHQUFHLEVBQUU7SUFDakIsS0FBSyxJQUFJNUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUSxJQUFJLENBQUN0QyxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtNQUNwQyxJQUFJUSxJQUFJLENBQUNoRCxTQUFTLEtBQUssR0FBRyxFQUFFb0gsTUFBTSxDQUFDWCxJQUFJLENBQUM1QyxFQUFFLENBQUNpRCxRQUFRLEVBQUVELFFBQVEsR0FBR3JFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FDL0Q0RSxNQUFNLENBQUNYLElBQUksQ0FBQzVDLEVBQUUsQ0FBQ2lELFFBQVEsR0FBR3RFLENBQUMsRUFBRXFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDO0lBQ0EsT0FBT08sTUFBTTtFQUNmO0VBRUFDLFFBQVFBLENBQUMxRixpQkFBaUIsRUFBRU0saUJBQWlCLEVBQUU7SUFDN0MsTUFBTTtNQUFFZTtJQUFLLENBQUMsR0FBRyxJQUFJLENBQUNzRSxjQUFjLENBQUMzRixpQkFBaUIsQ0FBQztJQUN2RCxNQUFNNEYsY0FBYyxHQUFHLElBQUksQ0FBQ2hCLFdBQVcsQ0FBQ1ksbUJBQW1CLENBQ3pEbEYsaUJBQWlCLEVBQ2pCZSxJQUFJLEVBQ0osQ0FBQ3JFLEdBQUcsRUFBRUMsR0FBRyxLQUFLLElBQUksQ0FBQzRJLGdCQUFnQixDQUFDN0ksR0FBRyxFQUFFQyxHQUFHLEVBQUVvRSxJQUFJLENBQ3BELENBQUM7SUFDRCxJQUFJLENBQUN1RSxjQUFjLENBQUNFLEtBQUssQ0FBRTdFLElBQUksSUFBS0EsSUFBSSxDQUFDLEVBQ3ZDLE1BQU0sSUFBSThFLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQztJQUNoRCxJQUFJLENBQUNuQixXQUFXLENBQUNZLG1CQUFtQixDQUNsQ3hGLGlCQUFpQixFQUNqQnFCLElBQUksRUFDSixDQUFDckUsR0FBRyxFQUFFQyxHQUFHLEtBQUs7TUFDWixJQUFJLENBQUN5RCxLQUFLLENBQUMxRCxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUNvRSxJQUFJLEdBQUcsSUFBSTtJQUNsQyxDQUNGLENBQUM7SUFDRCxJQUFJLENBQUN1RCxXQUFXLENBQUNZLG1CQUFtQixDQUNsQ2xGLGlCQUFpQixFQUNqQmUsSUFBSSxFQUNKLENBQUNyRSxHQUFHLEVBQUVDLEdBQUcsS0FBSztNQUNaLElBQUksQ0FBQ3lELEtBQUssQ0FBQzFELEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQ29FLElBQUksR0FBR0EsSUFBSTtJQUNsQyxDQUNGLENBQUM7RUFDSDtFQUVBd0UsZ0JBQWdCQSxDQUFDN0ksR0FBRyxFQUFFQyxHQUFHLEVBQUVvRSxJQUFJLEVBQUU7SUFDL0IsSUFDRSxJQUFJLENBQUNYLEtBQUssQ0FBQzFELEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQ29FLElBQUksS0FDeEIsQ0FBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQ1gsS0FBSyxDQUFDMUQsR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxDQUFDb0UsSUFBSSxLQUFLQSxJQUFJLENBQUMsRUFFN0MsT0FBTyxLQUFLO0lBQ2QsSUFDRXJFLEdBQUcsR0FBRyxDQUFDLElBQ1AsSUFBSSxDQUFDMEQsS0FBSyxDQUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQ29FLElBQUksS0FDNUIsQ0FBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQ1gsS0FBSyxDQUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQ29FLElBQUksS0FBS0EsSUFBSSxDQUFDLEVBRWpELE9BQU8sS0FBSztJQUNkLElBQ0VwRSxHQUFHLEdBQUcsQ0FBQyxJQUNQLElBQUksQ0FBQ3lELEtBQUssQ0FBQzFELEdBQUcsQ0FBQyxDQUFDQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUNvRSxJQUFJLEtBQzVCLENBQUNBLElBQUksSUFBSSxJQUFJLENBQUNYLEtBQUssQ0FBQzFELEdBQUcsQ0FBQyxDQUFDQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUNvRSxJQUFJLEtBQUtBLElBQUksQ0FBQyxFQUVqRCxPQUFPLEtBQUs7SUFDZCxJQUNFckUsR0FBRyxHQUFHLENBQUMsSUFDUCxJQUFJLENBQUMwRCxLQUFLLENBQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxDQUFDb0UsSUFBSSxLQUM1QixDQUFDQSxJQUFJLElBQUksSUFBSSxDQUFDWCxLQUFLLENBQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxDQUFDb0UsSUFBSSxLQUFLQSxJQUFJLENBQUMsRUFFakQsT0FBTyxLQUFLO0lBQ2QsSUFDRXBFLEdBQUcsR0FBRyxDQUFDLElBQ1AsSUFBSSxDQUFDeUQsS0FBSyxDQUFDMUQsR0FBRyxDQUFDLENBQUNDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQ29FLElBQUksS0FDNUIsQ0FBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQ1gsS0FBSyxDQUFDMUQsR0FBRyxDQUFDLENBQUNDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQ29FLElBQUksS0FBS0EsSUFBSSxDQUFDLEVBRWpELE9BQU8sS0FBSztJQUNkLE9BQU8sSUFBSTtFQUNiO0VBRUEyRSxlQUFlQSxDQUFDaEIsS0FBSyxFQUFFQyxHQUFHLEVBQUU7SUFDMUIsTUFBTSxDQUFDQyxRQUFRLEVBQUVDLFFBQVEsQ0FBQyxHQUN4QixJQUFJLENBQUNQLFdBQVcsQ0FBQ1EseUJBQXlCLENBQUNKLEtBQUssQ0FBQztJQUNuRCxNQUFNLENBQUNLLE1BQU0sRUFBRUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDVixXQUFXLENBQUNRLHlCQUF5QixDQUFDSCxHQUFHLENBQUM7SUFDeEUsTUFBTU0sUUFBUSxHQUNaSixRQUFRLEtBQUtHLE1BQU0sR0FBR0QsTUFBTSxHQUFHSCxRQUFRLEdBQUcsQ0FBQyxHQUFHSSxNQUFNLEdBQUdILFFBQVEsR0FBRyxDQUFDO0lBQ3JFLEtBQUssSUFBSXRFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzBFLFFBQVEsRUFBRTFFLENBQUMsRUFBRSxFQUFFO01BQ2pDLElBQUlzRSxRQUFRLEtBQUtHLE1BQU0sRUFBRTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDTyxnQkFBZ0IsQ0FBQ1YsUUFBUSxFQUFFRCxRQUFRLEdBQUdyRSxDQUFDLENBQUMsRUFBRSxPQUFPLEtBQUs7TUFDbEUsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUNnRixnQkFBZ0IsQ0FBQ1YsUUFBUSxHQUFHdEUsQ0FBQyxFQUFFcUUsUUFBUSxDQUFDLEVBQUU7UUFDekQsT0FBTyxLQUFLO01BQ2Q7SUFDRjtJQUNBLE9BQU8sSUFBSTtFQUNiO0VBRUFsQixpQkFBaUJBLENBQUNqRixNQUFNLEVBQUU7SUFDeEIsSUFBSWtILGVBQWU7SUFDbkIsSUFBSUMsYUFBYTtJQUNqQixJQUFJQyxhQUFhLEdBQUcsS0FBSztJQUN6QixPQUFPLENBQUNBLGFBQWEsRUFBRTtNQUNyQkYsZUFBZSxHQUFHLElBQUksQ0FBQ3JCLFdBQVcsQ0FBQ3dCLHdCQUF3QixDQUN6RGpILElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNrSCxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQ3BDLENBQUM7TUFDRCxNQUFNaEksU0FBUyxHQUFHYyxJQUFJLENBQUNrSCxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxZQUFZLEdBQUcsVUFBVTtNQUNqRSxJQUFJaEksU0FBUyxLQUFLLFlBQVksRUFBRTtRQUM5QjZILGFBQWEsR0FDWGhKLE1BQU0sQ0FBQ0MsWUFBWSxDQUNqQjhJLGVBQWUsQ0FBQzNILFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBR1MsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQzVDa0gsZUFBZSxDQUFDM0gsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHUyxNQUFNLEdBQUcsQ0FBQyxHQUMxQ2tILGVBQWUsQ0FBQzNILFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBR1MsTUFBTSxHQUFHLENBQy9DLENBQUMsR0FBR2tILGVBQWUsQ0FBQzFILEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDaEMsQ0FBQyxNQUFNO1FBQ0wsTUFBTStILGFBQWEsR0FBRyxDQUFDTCxlQUFlLENBQUMxSCxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9DMkgsYUFBYSxHQUNYRCxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQ2pCSyxhQUFhLEdBQUd2SCxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FDN0J1SCxhQUFhLEdBQUd2SCxNQUFNLEdBQUcsQ0FBQyxHQUMxQnVILGFBQWEsR0FBR3ZILE1BQU0sR0FBRyxDQUFDLENBQUM7TUFDbkM7TUFDQSxJQUNFa0gsZUFBZSxDQUFDM0gsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHNEgsYUFBYSxDQUFDNUgsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUMzRCxDQUFDMkgsZUFBZSxDQUFDMUgsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMySCxhQUFhLENBQUMzSCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ25EO1FBQ0EsQ0FBQzBILGVBQWUsRUFBRUMsYUFBYSxDQUFDLEdBQUcsQ0FBQ0EsYUFBYSxFQUFFRCxlQUFlLENBQUM7TUFDckU7TUFDQUUsYUFBYSxHQUFHLElBQUksQ0FBQ0gsZUFBZSxDQUFDQyxlQUFlLEVBQUVDLGFBQWEsQ0FBQztJQUN0RTtJQUNBLElBQUksQ0FBQ25CLFNBQVMsQ0FBQ2tCLGVBQWUsRUFBRUMsYUFBYSxDQUFDO0VBQ2hEO0VBRUEsT0FBT2QseUJBQXlCQSxDQUFDakgsV0FBVyxFQUFFO0lBQzVDLE1BQU1vSSxRQUFRLEdBQUdwSSxXQUFXLENBQUNHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQy9DLE1BQU1rSSxRQUFRLEdBQUcsQ0FBQ3JJLFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDMUMsSUFBSWdJLFFBQVEsR0FBRyxDQUFDLElBQUlBLFFBQVEsR0FBRyxDQUFDLElBQUlDLFFBQVEsR0FBRyxDQUFDLElBQUlBLFFBQVEsR0FBRyxDQUFDLEVBQzlELE1BQU0sSUFBSVQsS0FBSyxDQUFDLHFCQUFxQixDQUFDO0lBQ3hDLE9BQU8sQ0FBQ1EsUUFBUSxFQUFFQyxRQUFRLENBQUM7RUFDN0I7RUFFQSxPQUFPQyx3QkFBd0JBLENBQUN0SSxXQUFXLEVBQUU7SUFDM0MsT0FBT0EsV0FBVyxDQUFDRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUNILFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0VBQ3pFO0VBRUEsT0FBTzZILHdCQUF3QkEsQ0FBQ00sQ0FBQyxFQUFFO0lBQ2pDLE9BQVEsR0FBRXhKLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLENBQUN1SixDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUdBLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFFLEdBQy9EdkgsSUFBSSxDQUFDQyxLQUFLLENBQUNzSCxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUlBLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQzNDLEVBQUM7RUFDSjtFQUVBZixjQUFjQSxDQUFDeEgsV0FBVyxFQUFFO0lBQzFCLE1BQU0sQ0FBQ2xCLEdBQUcsRUFBRUQsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDNEgsV0FBVyxDQUFDUSx5QkFBeUIsQ0FBQ2pILFdBQVcsQ0FBQztJQUMxRSxPQUFPLElBQUksQ0FBQ3VDLEtBQUssQ0FBQzFELEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUM7RUFDN0I7RUFFQTBKLGFBQWFBLENBQUN4SSxXQUFXLEVBQUU7SUFDekIsTUFBTThDLElBQUksR0FBRyxJQUFJLENBQUMwRSxjQUFjLENBQUN4SCxXQUFXLENBQUM7SUFDN0MsSUFBSThDLElBQUksQ0FBQ0csUUFBUSxFQUFFLE1BQU0sSUFBSTJFLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztJQUMxRCxJQUFJOUUsSUFBSSxDQUFDSSxJQUFJLEVBQUU7TUFDYkosSUFBSSxDQUFDSSxJQUFJLENBQUN1RixHQUFHLENBQUMsQ0FBQztJQUNqQjtJQUNBLE1BQU0sQ0FBQzNKLEdBQUcsRUFBRUQsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDNEgsV0FBVyxDQUFDUSx5QkFBeUIsQ0FBQ2pILFdBQVcsQ0FBQztJQUMxRSxJQUFJLENBQUN1QyxLQUFLLENBQUMxRCxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUNtRSxRQUFRLEdBQUcsSUFBSTtFQUN0QztFQUVBaUQsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsT0FBTyxJQUFJLENBQUMzRCxLQUFLLENBQUNvRixLQUFLLENBQUU5SSxHQUFHLElBQzFCQSxHQUFHLENBQUM4SSxLQUFLLENBQUU3RSxJQUFJLElBQUssQ0FBQ0EsSUFBSSxDQUFDSSxJQUFJLElBQUlKLElBQUksQ0FBQ0ksSUFBSSxDQUFDd0YsTUFBTSxDQUFDLENBQUMsQ0FDdEQsQ0FBQztFQUNIO0FBQ0Y7QUFFQSwrREFBZWxDLFNBQVM7Ozs7Ozs7Ozs7Ozs7OztBQ3JNeEIsTUFBTXBJLGFBQWEsR0FBR0EsQ0FBQ3VLLE9BQU8sRUFBRUMsT0FBTyxFQUFFNUYsT0FBTyxFQUFFNkYsVUFBVSxLQUFLO0VBQy9ELE1BQU1DLEdBQUcsR0FBRzFKLFFBQVEsQ0FBQ2hCLGFBQWEsQ0FBQ3VLLE9BQU8sQ0FBQztFQUMzQyxJQUFJQyxPQUFPLEVBQUVFLEdBQUcsQ0FBQ3hKLFdBQVcsR0FBR3NKLE9BQU87RUFDdEMsSUFBSTVGLE9BQU8sSUFBSUEsT0FBTyxDQUFDcEMsTUFBTSxFQUFFO0lBQzdCb0MsT0FBTyxDQUFDK0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDbkcsT0FBTyxDQUFFb0csT0FBTyxJQUFLRixHQUFHLENBQUNwSCxTQUFTLENBQUMyQixHQUFHLENBQUMyRixPQUFPLENBQUMsQ0FBQztFQUNyRTtFQUNBLElBQUlILFVBQVUsRUFDWkEsVUFBVSxDQUFDakcsT0FBTyxDQUFFcUcsU0FBUyxJQUMzQkgsR0FBRyxDQUFDSSxZQUFZLENBQUNELFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUM3QyxDQUFDO0VBQ0gsT0FBT0gsR0FBRztBQUNaLENBQUM7QUFFRCxNQUFNekssY0FBYyxHQUFHQSxDQUFDb0IsSUFBSSxFQUFFMEosT0FBTyxFQUFFQyxJQUFJLEVBQUVKLE9BQU8sS0FBSztFQUN2RCxNQUFNSyxPQUFPLEdBQUdqSyxRQUFRLENBQUNrSyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDO0VBQzdFLE1BQU1DLFFBQVEsR0FBR25LLFFBQVEsQ0FBQ2tLLGVBQWUsQ0FDdkMsNEJBQTRCLEVBQzVCLE1BQ0YsQ0FBQztFQUVELE1BQU1FLEtBQUssR0FBR3BLLFFBQVEsQ0FBQ2hCLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDN0NvTCxLQUFLLENBQUNsSyxXQUFXLEdBQUdHLElBQUk7RUFDeEI0SixPQUFPLENBQUNoSCxXQUFXLENBQUNtSCxLQUFLLENBQUM7RUFFMUJILE9BQU8sQ0FBQ0gsWUFBWSxDQUFDLFNBQVMsRUFBRUMsT0FBTyxDQUFDO0VBRXhDSSxRQUFRLENBQUNMLFlBQVksQ0FBQyxHQUFHLEVBQUVFLElBQUksQ0FBQztFQUVoQ0MsT0FBTyxDQUFDaEgsV0FBVyxDQUFDa0gsUUFBUSxDQUFDO0VBRTdCLElBQUk5SixJQUFJLEtBQUssUUFBUSxJQUFJQSxJQUFJLEtBQUssUUFBUSxFQUFFNEosT0FBTyxDQUFDM0gsU0FBUyxDQUFDMkIsR0FBRyxDQUFDNUQsSUFBSSxDQUFDO0VBQ3ZFLElBQUl1SixPQUFPLEVBQUVLLE9BQU8sQ0FBQzNILFNBQVMsQ0FBQzJCLEdBQUcsQ0FBQzJGLE9BQU8sQ0FBQztFQUUzQyxPQUFPSyxPQUFPO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNsQ21DO0FBRXBDLE1BQU0vSyxNQUFNLENBQUM7RUFDWG1JLFdBQVdBLENBQUNoSCxJQUFJLEVBQUU7SUFDaEIsSUFBSSxDQUFDQSxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDOEMsS0FBSyxHQUFHLElBQUlpRSxrREFBUyxDQUFDLENBQUM7SUFDNUIsSUFBSSxDQUFDaUQsY0FBYyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUNDLENBQUMsRUFBRW5ILENBQUMsS0FBS0EsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN0RTtFQUVBMkQsTUFBTUEsQ0FBQ0wsS0FBSyxFQUFFaEcsV0FBVyxFQUFFO0lBQ3pCLE1BQU04SixVQUFVLEdBQ2QsSUFBSSxDQUFDdkgsS0FBSyxDQUFDa0UsV0FBVyxDQUFDNkIsd0JBQXdCLENBQUN0SSxXQUFXLENBQUM7SUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQ3lKLGNBQWMsQ0FBQ00sUUFBUSxDQUFDRCxVQUFVLENBQUMsRUFBRSxPQUFPLEtBQUs7SUFDM0Q5RCxLQUFLLENBQUN6RCxLQUFLLENBQUNpRyxhQUFhLENBQUN4SSxXQUFXLENBQUM7SUFDdEMsSUFBSSxDQUFDeUosY0FBYyxHQUFHLElBQUksQ0FBQ0EsY0FBYyxDQUFDTyxNQUFNLENBQUV6QixDQUFDLElBQUtBLENBQUMsS0FBS3VCLFVBQVUsQ0FBQztJQUN6RSxPQUFPLElBQUk7RUFDYjtFQUVBN0QsZ0JBQWdCQSxDQUFDRCxLQUFLLEVBQUU7SUFDdEIsTUFBTWhHLFdBQVcsR0FBRyxJQUFJLENBQUN1QyxLQUFLLENBQUNrRSxXQUFXLENBQUN3Qix3QkFBd0IsQ0FDakUsSUFBSSxDQUFDd0IsY0FBYyxDQUNqQnpJLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNrSCxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQ3VCLGNBQWMsQ0FBQzdJLE1BQU0sQ0FBQyxDQUUxRCxDQUFDO0lBQ0QsSUFBSSxDQUFDeUYsTUFBTSxDQUFDTCxLQUFLLEVBQUVoRyxXQUFXLENBQUM7SUFDL0IsT0FBT0EsV0FBVztFQUNwQjtFQUVBaUssT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsT0FBTyxJQUFJLENBQUN4SyxJQUFJO0VBQ2xCO0VBRUF3RixRQUFRQSxDQUFBLEVBQUc7SUFDVCxPQUFPLElBQUksQ0FBQzFDLEtBQUssQ0FBQ0EsS0FBSztFQUN6QjtBQUNGO0FBRUEsK0RBQWVqRSxNQUFNOzs7Ozs7Ozs7OztBQ3JDckIsTUFBTUMsTUFBTSxHQUFHLENBQUMsTUFBTTtFQUNwQixNQUFNQSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0VBRWpCLE1BQU1tRyxFQUFFLEdBQUdBLENBQUN3RixTQUFTLEVBQUVuRyxFQUFFLEtBQUs7SUFDNUIsSUFBSSxDQUFDb0csTUFBTSxDQUFDQyxTQUFTLENBQUNDLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDL0wsTUFBTSxFQUFFMkwsU0FBUyxDQUFDLEVBQzFEM0wsTUFBTSxDQUFDMkwsU0FBUyxDQUFDLEdBQUcsRUFBRTtJQUN4QjNMLE1BQU0sQ0FBQzJMLFNBQVMsQ0FBQyxDQUFDdkQsSUFBSSxDQUFDNUMsRUFBRSxDQUFDO0VBQzVCLENBQUM7RUFFRCxNQUFNd0csR0FBRyxHQUFHQSxDQUFDTCxTQUFTLEVBQUVuRyxFQUFFLEtBQUs7SUFDN0IsSUFBSSxDQUFDb0csTUFBTSxDQUFDQyxTQUFTLENBQUNDLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDL0wsTUFBTSxFQUFFMkwsU0FBUyxDQUFDLEVBQUU7SUFDOUQsS0FBSyxJQUFJeEgsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHbkUsTUFBTSxDQUFDMkwsU0FBUyxDQUFDLENBQUN0SixNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtNQUNqRCxJQUFJbkUsTUFBTSxDQUFDMkwsU0FBUyxDQUFDLENBQUN4SCxDQUFDLENBQUMsS0FBS3FCLEVBQUUsRUFBRTtRQUMvQnhGLE1BQU0sQ0FBQzJMLFNBQVMsQ0FBQyxDQUFDTSxNQUFNLENBQUM5SCxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCO01BQ0Y7SUFDRjtFQUNGLENBQUM7RUFFRCxNQUFNOUMsSUFBSSxHQUFHQSxDQUFDc0ssU0FBUyxFQUFFTyxJQUFJLEtBQUs7SUFDaEMsSUFBSSxDQUFDTixNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUMvTCxNQUFNLEVBQUUyTCxTQUFTLENBQUMsRUFBRTtJQUM5RDNMLE1BQU0sQ0FBQzJMLFNBQVMsQ0FBQyxDQUFDdEgsT0FBTyxDQUFFbUIsRUFBRSxJQUFLQSxFQUFFLENBQUMwRyxJQUFJLENBQUMsQ0FBQztFQUM3QyxDQUFDO0VBRUQsT0FBTztJQUNML0YsRUFBRTtJQUNGNkYsR0FBRztJQUNIM0s7RUFDRixDQUFDO0FBQ0gsQ0FBQyxFQUFFLENBQUM7QUFFSiwrREFBZXJCLE1BQU07Ozs7Ozs7Ozs7O0FDL0JyQixNQUFNZ0ksSUFBSSxDQUFDO0VBQ1RFLFdBQVdBLENBQUM3RixNQUFNLEVBQUUwQyxnQkFBZ0IsRUFBRXBELFNBQVMsRUFBRTtJQUMvQyxJQUFJLENBQUNVLE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUMwQyxnQkFBZ0IsR0FBR0EsZ0JBQWdCO0lBQ3hDLElBQUksQ0FBQ3BELFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUN3SyxJQUFJLEdBQUcsQ0FBQztFQUNmO0VBRUFqQyxHQUFHQSxDQUFBLEVBQUc7SUFDSixJQUFJLElBQUksQ0FBQ2lDLElBQUksR0FBRyxJQUFJLENBQUM5SixNQUFNLEVBQUUsSUFBSSxDQUFDOEosSUFBSSxFQUFFO0lBQ3hDLE9BQU8sSUFBSSxDQUFDQSxJQUFJO0VBQ2xCO0VBRUFoQyxNQUFNQSxDQUFBLEVBQUc7SUFDUCxPQUFPLElBQUksQ0FBQ2dDLElBQUksS0FBSyxJQUFJLENBQUM5SixNQUFNO0VBQ2xDO0FBQ0Y7QUFFQSwrREFBZTJGLElBQUk7Ozs7Ozs7Ozs7Ozs7OztBQ2xCbkI7QUFDMEc7QUFDakI7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLDZDQUE2QywyQkFBMkIsY0FBYyxlQUFlLEdBQUcsVUFBVSxrQkFBa0Isb0RBQW9ELG1CQUFtQixHQUFHLFVBQVUsa0NBQWtDLHdCQUF3QixHQUFHLFlBQVksMkJBQTJCLGlCQUFpQix1QkFBdUIscUJBQXFCLEdBQUcsWUFBWSwyQkFBMkIsc0JBQXNCLEdBQUcsWUFBWSxpQkFBaUIsMEJBQTBCLGtCQUFrQiw0QkFBNEIsd0JBQXdCLEdBQUcsY0FBYyx1QkFBdUIscUJBQXFCLGdCQUFnQixHQUFHLGFBQWEsb0JBQW9CLEdBQUcsY0FBYyx1QkFBdUIsdUJBQXVCLEdBQUcsWUFBWSx1QkFBdUIsdUJBQXVCLG1CQUFtQix1QkFBdUIsaUJBQWlCLHNCQUFzQixHQUFHLGdCQUFnQixvQkFBb0IsR0FBRyxlQUFlLGtCQUFrQiw0QkFBNEIsaUJBQWlCLEdBQUcsb0JBQW9CLGdDQUFnQyxpQkFBaUIsR0FBRyxzQkFBc0Isd0JBQXdCLEdBQUcsWUFBWSxtQkFBbUIsaUJBQWlCLGtCQUFrQiwrRUFBK0Usc0JBQXNCLDBDQUEwQyxHQUFHLGlCQUFpQixrQkFBa0IsMEJBQTBCLEdBQUcsZ0JBQWdCLDJCQUEyQixrQkFBa0IsMEJBQTBCLHVCQUF1QixHQUFHLHFCQUFxQixnQ0FBZ0MsR0FBRyw4QkFBOEIsOEJBQThCLEdBQUcsZ0NBQWdDLG1CQUFtQixpQkFBaUIsa0JBQWtCLDRCQUE0Qix1QkFBdUIsR0FBRywyQkFBMkIsZ0NBQWdDLFdBQVcsWUFBWSxnQkFBZ0IsaUJBQWlCLHVCQUF1QixlQUFlLEdBQUcsbUJBQW1CLGtCQUFrQiw0QkFBNEIsR0FBRyw4QkFBOEIsc0JBQXNCLG9DQUFvQyxHQUFHLDRCQUE0QixrQ0FBa0MsR0FBRyxPQUFPLGlGQUFpRixXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsV0FBVyxNQUFNLEtBQUssYUFBYSxhQUFhLFlBQVksV0FBVyxNQUFNLEtBQUssYUFBYSxhQUFhLEtBQUssS0FBSyxXQUFXLFlBQVksVUFBVSxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLE9BQU8sS0FBSyxVQUFVLEtBQUssS0FBSyxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLEtBQUssS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsVUFBVSxLQUFLLE1BQU0sWUFBWSxZQUFZLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxZQUFZLE9BQU8sTUFBTSxZQUFZLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLG9EQUFvRCx5QkFBeUIsNEJBQTRCLHFCQUFxQix1QkFBdUIsT0FBTywyQkFBMkIsY0FBYyxlQUFlLEdBQUcsK0JBQStCLGtCQUFrQixvREFBb0QscUJBQXFCLDBCQUEwQixVQUFVLGtDQUFrQyx3QkFBd0IsR0FBRyxZQUFZLHVDQUF1Qyx5QkFBeUIsdUJBQXVCLHFCQUFxQixHQUFHLFlBQVksdUNBQXVDLHNCQUFzQixTQUFTLDJCQUEyQiw0QkFBNEIsb0JBQW9CLDhCQUE4QiwwQkFBMEIsS0FBSyxXQUFXLHlCQUF5Qix1QkFBdUIsMEJBQTBCLEtBQUssR0FBRyw2QkFBNkIsb0JBQW9CLFVBQVUseUJBQXlCLHlCQUF5QixLQUFLLEdBQUcsWUFBWSx1QkFBdUIsdUJBQXVCLG1CQUFtQix1QkFBdUIsaUJBQWlCLHNCQUFzQixpQkFBaUIsc0JBQXNCLEtBQUssR0FBRyw4QkFBOEIsa0JBQWtCLDRCQUE0QixpQkFBaUIsY0FBYyx1Q0FBdUMsMkJBQTJCLEtBQUssZ0JBQWdCLDBCQUEwQixLQUFLLEdBQUcseUJBQXlCLG1CQUFtQixpQkFBaUIsa0JBQWtCLGlGQUFpRix5QkFBeUIsb0ZBQW9GLGNBQWMsb0JBQW9CLDRCQUE0QixLQUFLLGFBQWEseUNBQXlDLG9CQUFvQiw0QkFBNEIseUJBQXlCLGdCQUFnQix5Q0FBeUMsb0JBQW9CLDZDQUE2QyxTQUFTLE9BQU8sNkJBQTZCLHVCQUF1QixxQkFBcUIsc0JBQXNCLGdDQUFnQywyQkFBMkIsT0FBTyxvQkFBb0IseUNBQXlDLGVBQWUsZ0JBQWdCLG9CQUFvQixxQkFBcUIsMkJBQTJCLG1CQUFtQixPQUFPLEtBQUssR0FBRyxtQkFBbUIsa0JBQWtCLDRCQUE0QixvQkFBb0Isd0JBQXdCLHdDQUF3QyxLQUFLLGtCQUFrQixvQ0FBb0MseUNBQXlDLEtBQUssR0FBRyxtQkFBbUI7QUFDdHdMO0FBQ0EsK0RBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUE0STtBQUM1STtBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLDRIQUFPOzs7O0FBSXNGO0FBQzlHLE9BQU8sK0RBQWUsNEhBQU8sSUFBSSw0SEFBTyxVQUFVLDRIQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFDb0I7QUFDRTtBQUNOO0FBRXRDL0gsb0RBQWEsQ0FBQzJHLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBib2FyZHM7XG5cbiAgZnVuY3Rpb24gc2V0dXBCb2FyZHMobmV3Qm9hcmRzKSB7XG4gICAgYm9hcmRzID0gbmV3Qm9hcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhyb3csIGNvbCkge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbCArIDY1KX0ke3JvdyArIDF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXkobWVzc2FnZSkge1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlfX3RleHRcIik7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93R2FtZU92ZXIod2lubmVyKSB7XG4gICAgZGlzcGxheShgVGhlIGdhbWUgaXMgb3Zlci4gJHt3aW5uZXIubmFtZX0gd29uIWApO1xuICB9XG5cbiAgZnVuY3Rpb24gYXR0YWNrQ2VsbChlKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJwbGF5ZXJBdHRhY2tcIiwgZS50YXJnZXQuaWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNPZmZzZXQoY29vcmRpbmF0ZXMsIG9mZnNldCwgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJoXCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIG9mZnNldCkgK1xuICAgICAgICBjb29yZGluYXRlcy5zbGljZSgxKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzWzBdICsgKCtjb29yZGluYXRlcy5zbGljZSgxKSAtIG9mZnNldCk7XG4gIH1cblxuICAvLyBEcmFnICYgZHJvcCBoYW5kbGVyc1xuICBmdW5jdGlvbiBkcmFnKGUpIHtcbiAgICAvL2UucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9jb29yZGluYXRlc1wiLCBlLnRhcmdldC5jbG9zZXN0KFwiLmNlbGxcIikuaWQpO1xuICAgIGNvbnN0IGxlbmd0aFggPVxuICAgICAgZS50YXJnZXQuZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaFwiXG4gICAgICAgID8gZS50YXJnZXQub2Zmc2V0V2lkdGggLyArZS50YXJnZXQuZGF0YXNldC5sZW5ndGhcbiAgICAgICAgOiBlLnRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBsZW5ndGhZID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcInZcIlxuICAgICAgICA/IGUudGFyZ2V0Lm9mZnNldEhlaWdodCAvICtlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aFxuICAgICAgICA6IGUudGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBzcXVhcmVPZmZzZXQgPVxuICAgICAgZS50YXJnZXQuZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaFwiXG4gICAgICAgID8gTWF0aC5mbG9vcihlLm9mZnNldFggLyBsZW5ndGhYKVxuICAgICAgICA6IE1hdGguZmxvb3IoZS5vZmZzZXRZIC8gbGVuZ3RoWSk7XG4gICAgY29uc29sZS5sb2coc3F1YXJlT2Zmc2V0KTtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9vZmZzZXRcIiwgc3F1YXJlT2Zmc2V0KTtcbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxvd0Ryb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJtb3ZlXCI7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBzb3VyY2VDb29yZGluYXRlcyA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L2Nvb3JkaW5hdGVzXCIpO1xuICAgIGNvbnN0IG9mZlNldCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L29mZnNldFwiKTtcbiAgICBjb25zdCBzb3VyY2VDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc291cmNlQ29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IHsgZGlyZWN0aW9uIH0gPSBzb3VyY2VDZWxsLmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQ7XG4gICAgY29uc29sZS5sb2coc291cmNlQ29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IHRhcmdldENvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXNPZmZzZXQoXG4gICAgICBlLnRhcmdldC5pZCxcbiAgICAgIG9mZlNldCxcbiAgICAgIGRpcmVjdGlvbixcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKHRhcmdldENvb3JkaW5hdGVzKTtcbiAgICBjb25zdCBuZXdQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRDb29yZGluYXRlcyk7XG4gICAgbmV3UGFyZW50LmFwcGVuZENoaWxkKHNvdXJjZUNlbGwuZmlyc3RFbGVtZW50Q2hpbGQpO1xuICAgIC8vIEFkZCBldmVudCB0aGF0IG1vdmVzIHRoZSBzaGlwIGluIHRoZSB1bmRlcmx5aW5nIGJvYXJkLFxuICAgIC8vIGFuZCBtYXliZSBjaGFuZ2UgdGhlIG1vdmUgZnJvbSB0aGUgZHJhZyB0byBhIHJlLXJlbmRlclxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQm9hcmQoYm9hcmQsIHBsYXllcikge1xuICAgIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBgJHtwbGF5ZXJ9IGJvYXJkYCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICBjb25zdCBjb2xMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJsYWJlbCBjb2xcIik7XG4gICAgICBjb2xMYWJlbC5hcHBlbmRDaGlsZChcbiAgICAgICAgY3JlYXRlRWxlbWVudChcInNwYW5cIiwgaSA9PT0gMCA/IFwiXCIgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGkgKyA2NCkpLFxuICAgICAgKTtcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbExhYmVsKTtcbiAgICB9XG4gICAgYm9hcmQuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBjb25zdCByb3dMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJsYWJlbCByb3dcIik7XG4gICAgICByb3dMYWJlbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwic3BhblwiLCBpICsgMSkpO1xuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93TGFiZWwpO1xuICAgICAgcm93LmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBcImNlbGxcIjtcbiAgICAgICAgaWYgKGNlbGwuYXR0YWNrZWQpIGNsYXNzZXMgKz0gXCIgYXR0YWNrZWRcIjtcbiAgICAgICAgaWYgKGNlbGwuc2hpcCAmJiBwbGF5ZXIgPT09IFwicGxheWVyXCIpIGNsYXNzZXMgKz0gXCIgc2hpcFwiO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMoaSwgaik7XG4gICAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBjbGFzc2VzLCBbXG4gICAgICAgICAgW1wiaWRcIiwgY29vcmRpbmF0ZXNdLFxuICAgICAgICBdKTtcbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGF0dGFja0NlbGwpO1xuICAgICAgICAgIGlmIChjZWxsLmF0dGFja2VkICYmIGNlbGwuc2hpcCkgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJkdW1teVwiKSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGFsbG93RHJvcCk7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgICAgICBpZiAocGxheWVyID09PSBcImR1bW15XCIgJiYgY2VsbC5zaGlwKSB7XG4gICAgICAgICAgaWYgKGNlbGwuc2hpcC5zdGFydENvb3JkaW5hdGVzID09PSBjb29yZGluYXRlcykge1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJkcmFnLXNoaXBcIiwgW1xuICAgICAgICAgICAgICBbXCJkcmFnZ2FibGVcIiwgdHJ1ZV0sXG4gICAgICAgICAgICAgIFtcImRhdGEtbGVuZ3RoXCIsIGNlbGwuc2hpcC5sZW5ndGhdLFxuICAgICAgICAgICAgICBbXCJkYXRhLWRpcmVjdGlvblwiLCBjZWxsLnNoaXAuZGlyZWN0aW9uXSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcpO1xuICAgICAgICAgICAgaWYgKGNlbGwuc2hpcC5kaXJlY3Rpb24gPT09IFwiaFwiKVxuICAgICAgICAgICAgICBzaGlwLnN0eWxlLndpZHRoID1cbiAgICAgICAgICAgICAgICBjZWxsLnNoaXAubGVuZ3RoID09PSA1ID8gXCI1NjAlXCIgOiBgJHtjZWxsLnNoaXAubGVuZ3RoICogMTExfSVgO1xuICAgICAgICAgICAgZWxzZSBzaGlwLnN0eWxlLmhlaWdodCA9IGAke2NlbGwuc2hpcC5sZW5ndGggKiAxMX0wJWA7XG4gICAgICAgICAgICBjZWxsRWxlbWVudC5hcHBlbmRDaGlsZChzaGlwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBib2FyZENvbnRhaW5lcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICBldmVudHMuZW1pdChcInNldHVwR2FtZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckNvbnRyb2xzKGJ1dHRvbkNsYXNzKSB7XG4gICAgY29uc3QgYnV0dG9uVGV4dCA9IGJ1dHRvbkNsYXNzID09PSBcIm5ldy1nYW1lXCIgPyBcIisgTmV3IEdhbWVcIiA6IFwiU3RhcnQgR2FtZVwiO1xuICAgIGNvbnN0IGRpc3BsYXlUZXh0ID1cbiAgICAgIGJ1dHRvbkNsYXNzID09PSBcIm5ldy1nYW1lXCJcbiAgICAgICAgPyBcIkNsaWNrIG9uIHRoZSBlbmVteSdzIGJvYXJkIHRvIGF0dGFja1wiXG4gICAgICAgIDogXCJEcmFnIGFuZCBjbGljayBvbiB5b3VyIHNoaXBzLCB0aGVuIGNsaWNrIHRoZSBidXR0b24gYWJvdmUgdG8gc3RhcnQgdGhlIGdhbWVcIjtcbiAgICBjb25zdCBmbiA9IGJ1dHRvbkNsYXNzID09PSBcIm5ldy1nYW1lXCIgPyByZXN0YXJ0R2FtZSA6IHN0YXJ0R2FtZTtcbiAgICBjb25zdCBjb250cm9sU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIG51bGwsIFwiY29udHJvbHNcIik7XG4gICAgY29uc3QgYnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBidXR0b25UZXh0LCBidXR0b25DbGFzcyk7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmbik7XG4gICAgY29udHJvbFNlY3Rpb24uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBjb25zdCB0ZXh0RGlzcGxheSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJkaXNwbGF5XCIpO1xuICAgIHRleHREaXNwbGF5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJwXCIsIGRpc3BsYXlUZXh0LCBcImRpc3BsYXlfX3RleHRcIikpO1xuICAgIGNvbnRyb2xTZWN0aW9uLmFwcGVuZENoaWxkKHRleHREaXNwbGF5KTtcbiAgICByZXR1cm4gY29udHJvbFNlY3Rpb247XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJbml0aWFsU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChyZW5kZXJDb250cm9scyhcIm5ldy1nYW1lXCIpKTtcblxuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIllvdXIgQm9hcmRcIikpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLnBsYXllciwgXCJwbGF5ZXJcIikpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxheWVyU2VjdGlvbik7XG5cbiAgICBjb25zdCBlbmVteVNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBlbmVteVNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiRW5lbXkncyBCb2FyZFwiKSk7XG4gICAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGJvYXJkcy5jb21wdXRlciwgXCJjb21wdXRlclwiKSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChlbmVteVNlY3Rpb24pO1xuXG4gICAgZXZlbnRzLm9uKFwiZ2FtZU92ZXJcIiwgc2hvd0dhbWVPdmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFuRWxlbWVudChwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgcmVuZGVySW5pdGlhbFNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJyZXN0YXJ0R2FtZVwiKTtcbiAgICB1cGRhdGVTY3JlZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclJhbmRvbUJvYXJkKCkge1xuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi5wbGF5ZXIuc2V0dXBcIik7XG4gICAgY2xlYW5FbGVtZW50KHBsYXllclNlY3Rpb24pO1xuICAgIGNvbnN0IGR1bW15UGxheWVyID0gbmV3IFBsYXllcihcImR1bW15XCIpO1xuICAgIGV2ZW50cy5lbWl0KFwicmVuZGVyRHVtbXlcIiwgZHVtbXlQbGF5ZXIpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiWW91ciBCb2FyZFwiKSk7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChkdW1teVBsYXllci5nZXRCb2FyZCgpLCBcImR1bW15XCIpKTtcbiAgICBjb25zdCByYW5kb21pemVCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiUmFuZG9taXplXCIsIFwicmFuZG9taXplXCIpO1xuICAgIHJhbmRvbWl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyUmFuZG9tQm9hcmQpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmFuZG9taXplQnRuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclBhZ2VMYXlvdXQoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgxXCIsIFwiQmF0dGxlc2hpcFwiKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocmVuZGVyQ29udHJvbHMoXCJzdGFydC1nYW1lXCIpKTtcblxuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcInBsYXllciBzZXR1cFwiKTtcblxuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxheWVyU2VjdGlvbik7XG5cbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICBjb25zdCBhID0gY3JlYXRlRWxlbWVudChcImFcIiwgXCJcIiwgXCJcIiwgW1xuICAgICAgW1wiaHJlZlwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9qY2lkcFwiXSxcbiAgICAgIFtcInRhcmdldFwiLCBcIl9ibGFua1wiXSxcbiAgICBdKTtcbiAgICBhLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJwXCIsIFwiQ3JlYXRlZCBieSBqY2lkcFwiKSk7XG4gICAgYS5hcHBlbmRDaGlsZChcbiAgICAgIHJlbmRlckxpbmtJY29uKFxuICAgICAgICBcImdpdGh1YlwiLFxuICAgICAgICBcIjAgMCAyNCAyNFwiLFxuICAgICAgICBcIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiLFxuICAgICAgKSxcbiAgICApO1xuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChhKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cbiAgICByZW5kZXJSYW5kb21Cb2FyZCgpO1xuICAgIGV2ZW50cy5vbihcImdhbWVTdGFydGVkXCIsIHNldHVwQm9hcmRzKTtcbiAgICBldmVudHMub24oXCJnYW1lU3RhcnRlZFwiLCByZW5kZXJJbml0aWFsU2NyZWVuKTtcbiAgICBldmVudHMub24oXCJ0dXJuRW5kXCIsIHVwZGF0ZVNjcmVlbik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbmRlclBhZ2VMYXlvdXQsXG4gICAgcmVuZGVySW5pdGlhbFNjcmVlbixcbiAgICB1cGRhdGVTY3JlZW4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb21Db250cm9sbGVyO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgbGV0IGNvbXB1dGVyO1xuICBsZXQgYWN0aXZlR2FtZSA9IGZhbHNlO1xuXG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcbiAgY29uc3QgZ2V0Q29tcHV0ZXIgPSAoKSA9PiBjb21wdXRlcjtcblxuICBjb25zdCBjcmVhdGVQbGF5ZXJTaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwUmFuZG9tbHkoNSk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcFJhbmRvbWx5KDQpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXBSYW5kb21seSgzKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwUmFuZG9tbHkoMyk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcFJhbmRvbWx5KDIpO1xuICB9O1xuXG4gIGNvbnN0IGdhbWVPdmVyID0gKHdpbm5lcikgPT4ge1xuICAgIGFjdGl2ZUdhbWUgPSBmYWxzZTtcbiAgICBldmVudHMuZW1pdChcImdhbWVPdmVyXCIsIHdpbm5lcik7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15ID0gZ2V0UGxheWVyKCk7XG4gICAgZ2V0Q29tcHV0ZXIoKS5tYWtlUmFuZG9tQXR0YWNrKGVuZW15KTtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG4gICAgaWYgKGVuZW15LmJvYXJkLmhhdmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZ2FtZU92ZXIoZ2V0Q29tcHV0ZXIoKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlUdXJuID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgaWYgKCFhY3RpdmVHYW1lKSByZXR1cm47XG4gICAgY29uc3QgZW5lbXkgPSBnZXRDb21wdXRlcigpO1xuICAgIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSBnZXRQbGF5ZXIoKS5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIXZhbGlkQ29vcmRpbmF0ZXMpIHJldHVybjtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG5cbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRQbGF5ZXIoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbXB1dGVyVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwR2FtZSA9ICgpID0+IHtcbiAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiWW91XCIpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBhY3RpdmVHYW1lID0gdHJ1ZTtcblxuICAgIGNyZWF0ZVBsYXllclNoaXBzKHBsYXllcik7XG4gICAgY3JlYXRlUGxheWVyU2hpcHMoY29tcHV0ZXIpO1xuXG4gICAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgICBldmVudHMuZW1pdChcImdhbWVTdGFydGVkXCIsIHtcbiAgICAgIHBsYXllcjogZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSxcbiAgICAgIGNvbXB1dGVyOiBnZXRDb21wdXRlcigpLmdldEJvYXJkKCksXG4gICAgfSk7XG4gICAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgc2V0dXBHYW1lKTtcbiAgfTtcblxuICBldmVudHMub24oXCJzZXR1cEdhbWVcIiwgc2V0dXBHYW1lKTtcbiAgZXZlbnRzLm9uKFwicmVuZGVyRHVtbXlcIiwgY3JlYXRlUGxheWVyU2hpcHMpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0dXBHYW1lLFxuICAgIGdldFBsYXllcixcbiAgICBnZXRDb21wdXRlcixcbiAgICBwbGF5VHVybixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzLmJvYXJkID0gQXJyYXkoMTApLmZpbGwoQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIHRoaXMuYm9hcmQgPSB0aGlzLmNvbnN0cnVjdG9yLmZpbGxCb2FyZCgpO1xuICB9XG5cbiAgc3RhdGljIGZpbGxCb2FyZCgpIHtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goeyBhdHRhY2tlZDogZmFsc2UsIHNoaXA6IG51bGwgfSk7XG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIHBsYWNlU2hpcChzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgW3N0YXJ0Q29sLCBzdGFydFJvd10gPVxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKHN0YXJ0KTtcbiAgICBpZiAoIWVuZCkge1xuICAgICAgdGhpcy5ib2FyZFtzdGFydFJvd11bc3RhcnRDb2xdLnNoaXAgPSBuZXcgU2hpcCgxLCBzdGFydCwgXCJoXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBbZW5kQ29sLCBlbmRSb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGVuZCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPVxuICAgICAgc3RhcnRSb3cgPT09IGVuZFJvdyA/IGVuZENvbCAtIHN0YXJ0Q29sICsgMSA6IGVuZFJvdyAtIHN0YXJ0Um93ICsgMTtcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZGlzdGFuY2UsIHN0YXJ0LCBzdGFydFJvdyA9PT0gZW5kUm93ID8gXCJoXCIgOiBcInZcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXN0YW5jZTsgaSsrKSB7XG4gICAgICBpZiAoc3RhcnRSb3cgPT09IGVuZFJvdykgdGhpcy5ib2FyZFtzdGFydFJvd11bc3RhcnRDb2wgKyBpXS5zaGlwID0gc2hpcDtcbiAgICAgIGVsc2UgdGhpcy5ib2FyZFtzdGFydFJvdyArIGldW3N0YXJ0Q29sXS5zaGlwID0gc2hpcDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZm9yRWFjaFBvc2l0aW9uQ2VsbChzdGFydENvb3JkaW5hdGVzLCBzaGlwLCBmbikge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydENvb3JkaW5hdGVzKTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJoXCIpIHJlc3VsdC5wdXNoKGZuKHN0YXJ0Um93LCBzdGFydENvbCArIGkpKTtcbiAgICAgIGVsc2UgcmVzdWx0LnB1c2goZm4oc3RhcnRSb3cgKyBpLCBzdGFydENvbCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbW92ZVNoaXAoc291cmNlQ29vcmRpbmF0ZXMsIHRhcmdldENvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgeyBzaGlwIH0gPSB0aGlzLmdldENvb3JkaW5hdGVzKHNvdXJjZUNvb3JkaW5hdGVzKTtcbiAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IHRoaXMuY29uc3RydWN0b3IuZm9yRWFjaFBvc2l0aW9uQ2VsbChcbiAgICAgIHRhcmdldENvb3JkaW5hdGVzLFxuICAgICAgc2hpcCxcbiAgICAgIChyb3csIGNvbCkgPT4gdGhpcy5pc0Nvb3JkaW5hdGVGcmVlKHJvdywgY29sLCBzaGlwKSxcbiAgICApO1xuICAgIGlmICghbmV3Q29vcmRpbmF0ZXMuZXZlcnkoKGNlbGwpID0+IGNlbGwpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFyZ2V0IHBvc2l0aW9uIGlzIG9jY3VwaWVkXCIpO1xuICAgIHRoaXMuY29uc3RydWN0b3IuZm9yRWFjaFBvc2l0aW9uQ2VsbChcbiAgICAgIHNvdXJjZUNvb3JkaW5hdGVzLFxuICAgICAgc2hpcCxcbiAgICAgIChyb3csIGNvbCkgPT4ge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gbnVsbDtcbiAgICAgIH0sXG4gICAgKTtcbiAgICB0aGlzLmNvbnN0cnVjdG9yLmZvckVhY2hQb3NpdGlvbkNlbGwoXG4gICAgICB0YXJnZXRDb29yZGluYXRlcyxcbiAgICAgIHNoaXAsXG4gICAgICAocm93LCBjb2wpID0+IHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uc2hpcCA9IHNoaXA7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBpc0Nvb3JkaW5hdGVGcmVlKHJvdywgY29sLCBzaGlwKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uc2hpcCAmJlxuICAgICAgKCFzaGlwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHJvdyA+IDAgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93IC0gMV1bY29sXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3cgLSAxXVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIGNvbCA8IDkgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyAxXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbCArIDFdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHJvdyA8IDkgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93ICsgMV1bY29sXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3cgKyAxXVtjb2xdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIGNvbCA+IDAgJiZcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgLSAxXS5zaGlwICYmXG4gICAgICAoIXNoaXAgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbCAtIDFdLnNoaXAgIT09IHNoaXApXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNQb3NpdGlvblZhbGlkKHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnQpO1xuICAgIGNvbnN0IFtlbmRDb2wsIGVuZFJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoZW5kKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9XG4gICAgICBzdGFydFJvdyA9PT0gZW5kUm93ID8gZW5kQ29sIC0gc3RhcnRDb2wgKyAxIDogZW5kUm93IC0gc3RhcnRSb3cgKyAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29vcmRpbmF0ZUZyZWUoc3RhcnRSb3csIHN0YXJ0Q29sICsgaSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNDb29yZGluYXRlRnJlZShzdGFydFJvdyArIGksIHN0YXJ0Q29sKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcGxhY2VTaGlwUmFuZG9tbHkobGVuZ3RoKSB7XG4gICAgbGV0IGluaXRpYWxQb3NpdGlvbjtcbiAgICBsZXQgZmluYWxQb3NpdGlvbjtcbiAgICBsZXQgdmFsaWRQb3NpdGlvbiA9IGZhbHNlO1xuICAgIHdoaWxlICghdmFsaWRQb3NpdGlvbikge1xuICAgICAgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRDb29yZGluYXRlc0Zyb21OdW1iZXIoXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIGZpbmFsUG9zaXRpb24gPVxuICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgICAgICBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDEgPD0gNzRcbiAgICAgICAgICAgICAgPyBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgOiBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSAtIGxlbmd0aCArIDEsXG4gICAgICAgICAgKSArIGluaXRpYWxQb3NpdGlvbi5zbGljZSgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxOdW1iZXIgPSAraW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpO1xuICAgICAgICBmaW5hbFBvc2l0aW9uID1cbiAgICAgICAgICBpbml0aWFsUG9zaXRpb25bMF0gK1xuICAgICAgICAgIChpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMSA8PSAxMFxuICAgICAgICAgICAgPyBpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMVxuICAgICAgICAgICAgOiBpbml0aWFsTnVtYmVyIC0gbGVuZ3RoICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGluaXRpYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApID4gZmluYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApIHx8XG4gICAgICAgICtpbml0aWFsUG9zaXRpb24uc2xpY2UoMSkgPiArZmluYWxQb3NpdGlvbi5zbGljZSgxKVxuICAgICAgKSB7XG4gICAgICAgIFtpbml0aWFsUG9zaXRpb24sIGZpbmFsUG9zaXRpb25dID0gW2ZpbmFsUG9zaXRpb24sIGluaXRpYWxQb3NpdGlvbl07XG4gICAgICB9XG4gICAgICB2YWxpZFBvc2l0aW9uID0gdGhpcy5pc1Bvc2l0aW9uVmFsaWQoaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5wbGFjZVNoaXAoaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgY29sSW5kZXggPSBjb29yZGluYXRlcy5jaGFyQ29kZUF0KDApIC0gNjU7XG4gICAgY29uc3Qgcm93SW5kZXggPSArY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSAxO1xuICAgIGlmIChjb2xJbmRleCA8IDAgfHwgY29sSW5kZXggPiA5IHx8IHJvd0luZGV4IDwgMCB8fCByb3dJbmRleCA+IDkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIENvb3JkaW5hdGVzXCIpO1xuICAgIHJldHVybiBbY29sSW5kZXgsIHJvd0luZGV4XTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY0ICsgK2Nvb3JkaW5hdGVzLnNsaWNlKDEpICogMTAgLSAxMDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIobikge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKChuICUgMTAgPT09IDAgPyAxMCA6IG4gJSAxMCkgKyA2NCl9JHtcbiAgICAgIE1hdGguZmxvb3IobiAvIDEwKSArIChuICUgMTAgPT09IDAgPyAwIDogMSlcbiAgICB9YDtcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVwZWF0ZWQgY29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKGNlbGwuc2hpcCkge1xuICAgICAgY2VsbC5zaGlwLmhpdCgpO1xuICAgIH1cbiAgICBjb25zdCBbY29sLCByb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5hdHRhY2tlZCA9IHRydWU7XG4gIH1cblxuICBoYXZlQWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmV2ZXJ5KChyb3cpID0+XG4gICAgICByb3cuZXZlcnkoKGNlbGwpID0+ICFjZWxsLnNoaXAgfHwgY2VsbC5zaGlwLmlzU3VuaygpKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY29udGVudCwgY2xhc3NlcywgYXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBpZiAoY29udGVudCkgZWxlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGUuY2xhc3NMaXN0LmFkZChteUNsYXNzKSk7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMpXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKSxcbiAgICApO1xuICByZXR1cm4gZWxlO1xufTtcblxuY29uc3QgcmVuZGVyTGlua0ljb24gPSAobmFtZSwgdmlld0JveCwgcGF0aCwgbXlDbGFzcykgPT4ge1xuICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBcInBhdGhcIixcbiAgKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG5cbiAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBwYXRoKTtcblxuICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcblxuICBpZiAobmFtZSA9PT0gXCJwZW5jaWxcIiB8fCBuYW1lID09PSBcImRlbGV0ZVwiKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIGlmIChteUNsYXNzKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobXlDbGFzcyk7XG5cbiAgcmV0dXJuIGljb25Tdmc7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmZpbGwoKSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBzaG90TnVtYmVyID1cbiAgICAgIHRoaXMuYm9hcmQuY29uc3RydWN0b3IuZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIXRoaXMuc2hvdHNBdmFpbGFibGUuaW5jbHVkZXMoc2hvdE51bWJlcikpIHJldHVybiBmYWxzZTtcbiAgICBlbmVteS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gdGhpcy5zaG90c0F2YWlsYWJsZS5maWx0ZXIoKG4pID0+IG4gIT09IHNob3ROdW1iZXIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbWFrZVJhbmRvbUF0dGFjayhlbmVteSkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5ib2FyZC5jb25zdHJ1Y3Rvci5nZXRDb29yZGluYXRlc0Zyb21OdW1iZXIoXG4gICAgICB0aGlzLnNob3RzQXZhaWxhYmxlW1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNob3RzQXZhaWxhYmxlLmxlbmd0aClcbiAgICAgIF0sXG4gICAgKTtcbiAgICB0aGlzLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmJvYXJkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IGV2ZW50cyA9ICgoKSA9PiB7XG4gIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gIGNvbnN0IG9uID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpXG4gICAgICBldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICB9O1xuXG4gIGNvbnN0IG9mZiA9IChldmVudE5hbWUsIGZuKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdW2ldID09PSBmbikge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbWl0ID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSkgcmV0dXJuO1xuICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGZuKSA9PiBmbihkYXRhKSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBvbixcbiAgICBvZmYsXG4gICAgZW1pdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGV2ZW50cztcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMsIGRpcmVjdGlvbikge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuc3RhcnRDb29yZGluYXRlcyA9IHN0YXJ0Q29vcmRpbmF0ZXM7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHRoaXMuaGl0cysrO1xuICAgIHJldHVybiB0aGlzLmhpdHM7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCAxZnIgbWF4LWNvbnRlbnQ7XFxuICBoZWlnaHQ6IDEwMGx2aDtcXG59XFxuXFxubWFpbiB7XFxuICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSA0cmVtKTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC41ZW0gMDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XFxuICBwYWRkaW5nOiAwLjI1ZW0gMDtcXG59XFxuZm9vdGVyIGEge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuZm9vdGVyIHN2ZyB7XFxuICBtYXJnaW4tbGVmdDogMC41ZW07XFxuICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgZmlsbDogd2hpdGU7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLXRvcDogMWVtO1xcbn1cXG5zZWN0aW9uIGgyIHtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDAuNWVtIDFlbTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbmJ1dHRvbjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jb250cm9scyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICByb3ctZ2FwOiAxZW07XFxufVxcbi5jb250cm9scyBidXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogc3RlZWxibHVlO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4uY29udHJvbHMgLmRpc3BsYXkge1xcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpL3JlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSAvIDIpO1xcbn1cXG4uYm9hcmQgLmxhYmVsIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5ib2FyZCAuY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNTU1O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmJvYXJkIC5jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogc3RlZWxibHVlO1xcbn1cXG4uYm9hcmQgLmNlbGwuc2hpcC5hdHRhY2tlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmEzMjMyO1xcbn1cXG4uYm9hcmQgLmNlbGwuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCInXFxcIjtcXG4gIHdpZHRoOiAwLjVlbTtcXG4gIGhlaWdodDogMC41ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLmJvYXJkIC5jZWxsIC5kcmFnLXNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogc3RlZWxibHVlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogMTtcXG59XFxuXFxuLnBsYXllci5zZXR1cCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5wbGF5ZXIuc2V0dXAgLmR1bW15LmJvYXJkIHtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgbWF4LWhlaWdodDogY2FsYygxMDBzdmggLSAxOGVtKTtcXG59XFxuLnBsYXllci5zZXR1cCAucmFuZG9taXplIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFNQTtFQUNFLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFMRjs7QUFVQTtFQUNFLGFBQUE7RUFDQSwrQ0FBQTtFQUNBLGNBQUE7QUFQRjs7QUFVQTtFQUNFLDZCQUFBO0VBQ0EsbUJBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQXpCZ0I7RUEwQmhCLFlBdkJhO0VBd0JiLGtCQUFBO0VBQ0EsZ0JBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQWhDZ0I7RUFpQ2hCLGlCQUFBO0FBUEY7QUFTRTtFQUNFLFlBakNXO0VBa0NYLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFQSjtBQVVFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBM0NXO0FBbUNmOztBQWNBO0VBQ0UsZUFBQTtBQVhGO0FBYUU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0FBWEo7O0FBZUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBWkY7QUFjRTtFQUNFLGVBQUE7QUFaSjs7QUFrQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBZkY7QUFpQkU7RUFDRSwyQkFuRlk7RUFvRlosWUFoRlc7QUFpRWY7QUFrQkU7RUFDRSxtQkFBQTtBQWhCSjs7QUFzQkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwRUFBQTtFQUNBLGlCQUFBO0VBQ0EscUNBQUE7QUFuQkY7QUFxQkU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFuQko7QUFzQkU7RUFDRSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBcEJKO0FBc0JJO0VBQ0UsMkJBbEhVO0FBOEZoQjtBQXFCTTtFQUNFLHlCQWxIVTtBQStGbEI7QUF1Qkk7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBckJOO0FBd0JJO0VBQ0UsMkJBaklVO0VBa0lWLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUF0Qk47O0FBMkJBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBeEJGO0FBMEJFO0VBQ0UsaUJBQUE7RUFDQSwrQkFBQTtBQXhCSjtBQTJCRTtFQUNFLDZCQUFBO0FBekJKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiRwcmltYXJ5LWNvbG9yOiBzdGVlbGJsdWU7XFxuJHNlY29uZGFyeS1jb2xvcjogIzU1NTtcXG4kaGlnaGxpZ2h0LWNvbG9yOiAjZmEzMjMyO1xcbiRwcmltYXJ5LWZjOiBibGFjaztcXG4kc2Vjb25kYXJ5LWZjOiB3aGl0ZTtcXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vLyBHZW5lcmFsIGxheW91dFxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBsdmg7ICAvLyBUZXN0IG90aGVyIGJlaGF2aW9yc1xcbn1cXG5cXG5tYWluIHtcXG4gIHdpZHRoOiBtaW4oNzBjaCwgMTAwJSAtIDRyZW0pO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWNvbmRhcnktY29sb3I7XFxuICBjb2xvcjogJHNlY29uZGFyeS1mYztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxuXFxuICBhIHtcXG4gICAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICBzdmcge1xcbiAgICBtYXJnaW4tbGVmdDogMC41ZW07XFxuICAgIG1heC13aWR0aDogMS41ZW07XFxuICAgIGZpbGw6ICRzZWNvbmRhcnktZmM7XFxuICB9XFxufVxcblxcbi8vIEdhbWUgdmlld1xcblxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLXRvcDogMWVtO1xcblxcbiAgaDIge1xcbiAgICBmb250LXNpemU6IDEuMjVyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG59XFxuXFxuYnV0dG9uIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDAuNWVtIDFlbTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBcXG4gICY6aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICB9XFxufVxcblxcbi8vIENvbnRyb2xzXFxuXFxuLmNvbnRyb2xzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHJvdy1nYXA6IDFlbTtcXG5cXG4gIGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xcbiAgICBjb2xvcjogJHNlY29uZGFyeS1mYztcXG4gIH1cXG5cXG4gIC5kaXNwbGF5IHtcXG4gICAgbWluLWhlaWdodDogMi4yNXJlbTtcXG4gIH1cXG59XFxuXFxuLy8gQm9hcmRzXFxuXFxuLmJvYXJkIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpIC8gcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSk7XFxuICBhc3BlY3QtcmF0aW86IDEgLyAxOyAvLyBUaGUgcG9zaXRpb24gaXNuJ3QgcmlnaHQuIEZpeCBpdCBsYXRlci5cXG4gIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDE4ZW0pIC8gMik7XFxuXFxuICAubGFiZWwge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuXFxuICAuY2VsbCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRzZWNvbmRhcnktY29sb3I7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgICAmLnNoaXAge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xcbiAgICAgICYuYXR0YWNrZWQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGhpZ2hsaWdodC1jb2xvcjtcXG4gICAgICB9XFxuICAgIH1cXG4gIFxcbiAgICAmLmF0dGFja2VkOjphZnRlciB7XFxuICAgICAgY29udGVudDogXFxcIidcXFwiO1xcbiAgICAgIHdpZHRoOiAwLjVlbTtcXG4gICAgICBoZWlnaHQ6IDAuNWVtO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgfVxcblxcbiAgICAuZHJhZy1zaGlwIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgICB0b3A6IDA7XFxuICAgICAgbGVmdDogMDtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHotaW5kZXg6IDE7XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuLnBsYXllci5zZXR1cCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFxuICAuZHVtbXkuYm9hcmQge1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcXG4gICAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMThlbSkpO1xcbiAgfVxcblxcbiAgLnJhbmRvbWl6ZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAvL2JvcmRlcjogMXB4IHNvbGlkICRwcmltYXJ5LWNvbG9yO1xcbiAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuc2Nzc1wiO1xuaW1wb3J0IGRvbUNvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcbmltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vbW9kdWxlcy9wdWJzdWJcIjtcblxuZG9tQ29udHJvbGxlci5yZW5kZXJQYWdlTGF5b3V0KCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsInJlbmRlckxpbmtJY29uIiwiUGxheWVyIiwiZXZlbnRzIiwiZG9tQ29udHJvbGxlciIsImJvYXJkcyIsInNldHVwQm9hcmRzIiwibmV3Qm9hcmRzIiwiZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyIsInJvdyIsImNvbCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImRpc3BsYXkiLCJtZXNzYWdlIiwidGV4dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50Iiwic2hvd0dhbWVPdmVyIiwid2lubmVyIiwibmFtZSIsImF0dGFja0NlbGwiLCJlIiwiZW1pdCIsInRhcmdldCIsImlkIiwiZ2V0Q29vcmRpbmF0ZXNPZmZzZXQiLCJjb29yZGluYXRlcyIsIm9mZnNldCIsImRpcmVjdGlvbiIsImNoYXJDb2RlQXQiLCJzbGljZSIsImRyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiY2xvc2VzdCIsImxlbmd0aFgiLCJkYXRhc2V0Iiwib2Zmc2V0V2lkdGgiLCJsZW5ndGgiLCJsZW5ndGhZIiwib2Zmc2V0SGVpZ2h0Iiwic3F1YXJlT2Zmc2V0IiwiTWF0aCIsImZsb29yIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJjb25zb2xlIiwibG9nIiwiZWZmZWN0QWxsb3dlZCIsImFsbG93RHJvcCIsInByZXZlbnREZWZhdWx0IiwiZHJvcEVmZmVjdCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZHJvcCIsInNvdXJjZUNvb3JkaW5hdGVzIiwiZ2V0RGF0YSIsIm9mZlNldCIsInNvdXJjZUNlbGwiLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0RWxlbWVudENoaWxkIiwidGFyZ2V0Q29vcmRpbmF0ZXMiLCJuZXdQYXJlbnQiLCJhcHBlbmRDaGlsZCIsInJlbmRlckJvYXJkIiwiYm9hcmQiLCJwbGF5ZXIiLCJib2FyZENvbnRhaW5lciIsImkiLCJjb2xMYWJlbCIsImZvckVhY2giLCJyb3dMYWJlbCIsImNlbGwiLCJqIiwiY2xhc3NlcyIsImF0dGFja2VkIiwic2hpcCIsImNlbGxFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsInN0YXJ0Q29vcmRpbmF0ZXMiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhcnRHYW1lIiwicmVuZGVyQ29udHJvbHMiLCJidXR0b25DbGFzcyIsImJ1dHRvblRleHQiLCJkaXNwbGF5VGV4dCIsImZuIiwicmVzdGFydEdhbWUiLCJjb250cm9sU2VjdGlvbiIsImJ0biIsInRleHREaXNwbGF5IiwicmVuZGVySW5pdGlhbFNjcmVlbiIsIm1haW4iLCJjbGVhbkVsZW1lbnQiLCJwbGF5ZXJTZWN0aW9uIiwiZW5lbXlTZWN0aW9uIiwiY29tcHV0ZXIiLCJvbiIsInBhcmVudCIsImNoaWxkIiwicmVtb3ZlQ2hpbGQiLCJ1cGRhdGVTY3JlZW4iLCJyZW5kZXJSYW5kb21Cb2FyZCIsImR1bW15UGxheWVyIiwiZ2V0Qm9hcmQiLCJyYW5kb21pemVCdG4iLCJyZW5kZXJQYWdlTGF5b3V0IiwiYm9keSIsImhlYWRlciIsImZvb3RlciIsImEiLCJnYW1lQ29udHJvbGxlciIsImFjdGl2ZUdhbWUiLCJnZXRQbGF5ZXIiLCJnZXRDb21wdXRlciIsImNyZWF0ZVBsYXllclNoaXBzIiwicGxhY2VTaGlwUmFuZG9tbHkiLCJnYW1lT3ZlciIsImNvbXB1dGVyVHVybiIsImVuZW15IiwibWFrZVJhbmRvbUF0dGFjayIsImhhdmVBbGxTaGlwc1N1bmsiLCJwbGF5VHVybiIsInZhbGlkQ29vcmRpbmF0ZXMiLCJhdHRhY2siLCJzZXR1cEdhbWUiLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJmaWxsQm9hcmQiLCJwdXNoIiwicGxhY2VTaGlwIiwic3RhcnQiLCJlbmQiLCJzdGFydENvbCIsInN0YXJ0Um93IiwiZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyIsImVuZENvbCIsImVuZFJvdyIsImRpc3RhbmNlIiwiZm9yRWFjaFBvc2l0aW9uQ2VsbCIsInJlc3VsdCIsIm1vdmVTaGlwIiwiZ2V0Q29vcmRpbmF0ZXMiLCJuZXdDb29yZGluYXRlcyIsImlzQ29vcmRpbmF0ZUZyZWUiLCJldmVyeSIsIkVycm9yIiwiaXNQb3NpdGlvblZhbGlkIiwiaW5pdGlhbFBvc2l0aW9uIiwiZmluYWxQb3NpdGlvbiIsInZhbGlkUG9zaXRpb24iLCJnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIiLCJyYW5kb20iLCJpbml0aWFsTnVtYmVyIiwiY29sSW5kZXgiLCJyb3dJbmRleCIsImdldE51bWJlckZyb21Db29yZGluYXRlcyIsIm4iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiZWxlbWVudCIsImNvbnRlbnQiLCJhdHRyaWJ1dGVzIiwiZWxlIiwic3BsaXQiLCJteUNsYXNzIiwiYXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidmlld0JveCIsInBhdGgiLCJpY29uU3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiaWNvblBhdGgiLCJ0aXRsZSIsInNob3RzQXZhaWxhYmxlIiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsIl8iLCJzaG90TnVtYmVyIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJnZXROYW1lIiwiZXZlbnROYW1lIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwib2ZmIiwic3BsaWNlIiwiZGF0YSIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9