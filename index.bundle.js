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
  const isCoordinateFree = (board, row, col) => {
    if (board[row][col].ship) return false;
    if (row > 0 && board[row - 1][col].ship) return false;
    if (col < 9 && board[row][col + 1].ship) return false;
    if (row < 9 && board[row + 1][col].ship) return false;
    if (col > 0 && board[row][col - 1].ship) return false;
    return true;
  };
  const isPositionValid = (board, start, end) => {
    const [startCol, startRow] = board.constructor.getIndexesFromCoordinates(start);
    const [endCol, endRow] = board.constructor.getIndexesFromCoordinates(end);
    const distance = startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    for (let i = 0; i < distance; i++) {
      if (startRow === endRow) {
        if (!isCoordinateFree(board.board, startRow, startCol + i)) return false;
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
      initialPosition = _player__WEBPACK_IMPORTED_MODULE_0__["default"].getCoordinatesFromNumber(Math.floor(Math.random() * 100) + 1);
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
      validPosition = isPositionValid(player.board, initialPosition, finalPosition);
    }
    return [initialPosition, finalPosition];
  };
  const createPlayerShips = player => {
    player.board.placeShip(...getRandomShipPosition(player, 5));
    player.board.placeShip(...getRandomShipPosition(player, 4));
    player.board.placeShip(...getRandomShipPosition(player, 3));
    player.board.placeShip(...getRandomShipPosition(player, 3));
    player.board.placeShip(...getRandomShipPosition(player, 2));
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
  static getIndexesFromCoordinates(coordinates) {
    return [coordinates.charCodeAt(0) - 65, +coordinates.slice(1) - 1];
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
    const shotNumber = this.constructor.getNumberFromCoordinates(coordinates);
    if (!this.shotsAvailable.includes(shotNumber)) return false;
    enemy.board.receiveAttack(coordinates);
    this.shotsAvailable = this.shotsAvailable.filter(n => n !== shotNumber);
    return true;
  }
  static getNumberFromCoordinates(coordinates) {
    return coordinates.charCodeAt(0) - 64 + +coordinates.slice(1) * 10 - 10;
  }
  static getCoordinatesFromNumber(n) {
    return `${String.fromCharCode((n % 10 === 0 ? 10 : n % 10) + 64)}${Math.floor(n / 10) + (n % 10 === 0 ? 0 : 1)}`;
  }
  makeRandomAttack(enemy) {
    const coordinates = this.constructor.getCoordinatesFromNumber(this.shotsAvailable[Math.floor(Math.random() * this.shotsAvailable.length)]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ29CO0FBQ0U7QUFDTjtBQUV0Q2pKLG9EQUFhLENBQUMyRyxnQkFBZ0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcHVic3ViLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzPzc1YmEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHJlbmRlckxpbmtJY29uIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IGRvbUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBsZXQgYm9hcmRzO1xuXG4gIGZ1bmN0aW9uIHNldHVwQm9hcmRzKG5ld0JvYXJkcykge1xuICAgIGJvYXJkcyA9IG5ld0JvYXJkcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMocm93LCBjb2wpIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZShjb2wgKyA2NSl9JHtyb3cgKyAxfWA7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5KG1lc3NhZ2UpIHtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5X190ZXh0XCIpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0dhbWVPdmVyKHdpbm5lcikge1xuICAgIGRpc3BsYXkoYFRoZSBnYW1lIGlzIG92ZXIuICR7d2lubmVyLm5hbWV9IHdvbiFgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF0dGFja0NlbGwoZSkge1xuICAgIGV2ZW50cy5lbWl0KFwicGxheWVyQXR0YWNrXCIsIGUudGFyZ2V0LmlkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzT2Zmc2V0KGNvb3JkaW5hdGVzLCBvZmZzZXQsIGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaFwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSBvZmZzZXQpICtcbiAgICAgICAgY29vcmRpbmF0ZXMuc2xpY2UoMSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlc1swXSArICgrY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSBvZmZzZXQpO1xuICB9XG5cbiAgLy8gRHJhZyAmIGRyb3AgaGFuZGxlcnNcbiAgZnVuY3Rpb24gZHJhZyhlKSB7XG4gICAgLy9lLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvY29vcmRpbmF0ZXNcIiwgZS50YXJnZXQuY2xvc2VzdChcIi5jZWxsXCIpLmlkKTtcbiAgICBjb25zdCBsZW5ndGhYID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhcIlxuICAgICAgICA/IGUudGFyZ2V0Lm9mZnNldFdpZHRoIC8gK2UudGFyZ2V0LmRhdGFzZXQubGVuZ3RoXG4gICAgICAgIDogZS50YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbGVuZ3RoWSA9XG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJ2XCJcbiAgICAgICAgPyBlLnRhcmdldC5vZmZzZXRIZWlnaHQgLyArZS50YXJnZXQuZGF0YXNldC5sZW5ndGhcbiAgICAgICAgOiBlLnRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3Qgc3F1YXJlT2Zmc2V0ID1cbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhcIlxuICAgICAgICA/IE1hdGguZmxvb3IoZS5vZmZzZXRYIC8gbGVuZ3RoWClcbiAgICAgICAgOiBNYXRoLmZsb29yKGUub2Zmc2V0WSAvIGxlbmd0aFkpO1xuICAgIGNvbnNvbGUubG9nKHNxdWFyZU9mZnNldCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvb2Zmc2V0XCIsIHNxdWFyZU9mZnNldCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsb3dEcm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJub25lXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkcm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc291cmNlQ29vcmRpbmF0ZXMgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9jb29yZGluYXRlc1wiKTtcbiAgICBjb25zdCBvZmZTZXQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9vZmZzZXRcIik7XG4gICAgY29uc3Qgc291cmNlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNvdXJjZUNvb3JkaW5hdGVzKTtcbiAgICBjb25zdCB7IGRpcmVjdGlvbiB9ID0gc291cmNlQ2VsbC5maXJzdEVsZW1lbnRDaGlsZC5kYXRhc2V0O1xuICAgIGNvbnNvbGUubG9nKHNvdXJjZUNvb3JkaW5hdGVzKTtcbiAgICBjb25zdCB0YXJnZXRDb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzT2Zmc2V0KFxuICAgICAgZS50YXJnZXQuaWQsXG4gICAgICBvZmZTZXQsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyh0YXJnZXRDb29yZGluYXRlcyk7XG4gICAgY29uc3QgbmV3UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0Q29vcmRpbmF0ZXMpO1xuICAgIG5ld1BhcmVudC5hcHBlbmRDaGlsZChzb3VyY2VDZWxsLmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAvLyBBZGQgZXZlbnQgdGhhdCBtb3ZlcyB0aGUgc2hpcCBpbiB0aGUgdW5kZXJseWluZyBib2FyZCxcbiAgICAvLyBhbmQgbWF5YmUgY2hhbmdlIHRoZSBtb3ZlIGZyb20gdGhlIGRyYWcgdG8gYSByZS1yZW5kZXJcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJvYXJkKGJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCBib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgYCR7cGxheWVyfSBib2FyZGApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgY29uc3QgY29sTGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgY29sXCIpO1xuICAgICAgY29sTGFiZWwuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgPT09IDAgPyBcIlwiIDogU3RyaW5nLmZyb21DaGFyQ29kZShpICsgNjQpKSxcbiAgICAgICk7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb2xMYWJlbCk7XG4gICAgfVxuICAgIGJvYXJkLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgY29uc3Qgcm93TGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgcm93XCIpO1xuICAgICAgcm93TGFiZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgaSArIDEpKTtcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0xhYmVsKTtcbiAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gXCJjZWxsXCI7XG4gICAgICAgIGlmIChjZWxsLmF0dGFja2VkKSBjbGFzc2VzICs9IFwiIGF0dGFja2VkXCI7XG4gICAgICAgIGlmIChjZWxsLnNoaXAgJiYgcGxheWVyID09PSBcInBsYXllclwiKSBjbGFzc2VzICs9IFwiIHNoaXBcIjtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzKGksIGopO1xuICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgY2xhc3NlcywgW1xuICAgICAgICAgIFtcImlkXCIsIGNvb3JkaW5hdGVzXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDZWxsKTtcbiAgICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCAmJiBjZWxsLnNoaXApIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiZHVtbXlcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBhbGxvd0Ryb3ApO1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3ApO1xuICAgICAgICB9XG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJkdW1teVwiICYmIGNlbGwuc2hpcCkge1xuICAgICAgICAgIGlmIChjZWxsLnNoaXAuc3RhcnRDb29yZGluYXRlcyA9PT0gY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiZHJhZy1zaGlwXCIsIFtcbiAgICAgICAgICAgICAgW1wiZHJhZ2dhYmxlXCIsIHRydWVdLFxuICAgICAgICAgICAgICBbXCJkYXRhLWxlbmd0aFwiLCBjZWxsLnNoaXAubGVuZ3RoXSxcbiAgICAgICAgICAgICAgW1wiZGF0YS1kaXJlY3Rpb25cIiwgY2VsbC5zaGlwLmRpcmVjdGlvbl0sXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnKTtcbiAgICAgICAgICAgIGlmIChjZWxsLnNoaXAuZGlyZWN0aW9uID09PSBcImhcIilcbiAgICAgICAgICAgICAgc2hpcC5zdHlsZS53aWR0aCA9XG4gICAgICAgICAgICAgICAgY2VsbC5zaGlwLmxlbmd0aCA9PT0gNSA/IFwiNTYwJVwiIDogYCR7Y2VsbC5zaGlwLmxlbmd0aCAqIDExMX0lYDtcbiAgICAgICAgICAgIGVsc2Ugc2hpcC5zdHlsZS5oZWlnaHQgPSBgJHtjZWxsLnNoaXAubGVuZ3RoICogMTF9MCVgO1xuICAgICAgICAgICAgY2VsbEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm9hcmRDb250YWluZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJzZXR1cEdhbWVcIik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJDb250cm9scyhidXR0b25DbGFzcykge1xuICAgIGNvbnN0IGJ1dHRvblRleHQgPSBidXR0b25DbGFzcyA9PT0gXCJuZXctZ2FtZVwiID8gXCIrIE5ldyBHYW1lXCIgOiBcIlN0YXJ0IEdhbWVcIjtcbiAgICBjb25zdCBkaXNwbGF5VGV4dCA9XG4gICAgICBidXR0b25DbGFzcyA9PT0gXCJuZXctZ2FtZVwiXG4gICAgICAgID8gXCJDbGljayBvbiB0aGUgZW5lbXkncyBib2FyZCB0byBhdHRhY2tcIlxuICAgICAgICA6IFwiRHJhZyBhbmQgY2xpY2sgb24geW91ciBzaGlwcywgdGhlbiBjbGljayB0aGUgYnV0dG9uIGFib3ZlIHRvIHN0YXJ0IHRoZSBnYW1lXCI7XG4gICAgY29uc3QgZm4gPSBidXR0b25DbGFzcyA9PT0gXCJuZXctZ2FtZVwiID8gcmVzdGFydEdhbWUgOiBzdGFydEdhbWU7XG4gICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcImNvbnRyb2xzXCIpO1xuICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgYnV0dG9uVGV4dCwgYnV0dG9uQ2xhc3MpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm4pO1xuICAgIGNvbnRyb2xTZWN0aW9uLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgY29uc3QgdGV4dERpc3BsYXkgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwiZGlzcGxheVwiKTtcbiAgICB0ZXh0RGlzcGxheS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBkaXNwbGF5VGV4dCwgXCJkaXNwbGF5X190ZXh0XCIpKTtcbiAgICBjb250cm9sU2VjdGlvbi5hcHBlbmRDaGlsZCh0ZXh0RGlzcGxheSk7XG4gICAgcmV0dXJuIGNvbnRyb2xTZWN0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySW5pdGlhbFNjcmVlbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgY2xlYW5FbGVtZW50KG1haW4pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocmVuZGVyQ29udHJvbHMoXCJuZXctZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJZb3VyIEJvYXJkXCIpKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgY29uc3QgZW5lbXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIkVuZW15J3MgQm9hcmRcIikpO1xuICAgIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChib2FyZHMuY29tcHV0ZXIsIFwiY29tcHV0ZXJcIikpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlTZWN0aW9uKTtcblxuICAgIGV2ZW50cy5vbihcImdhbWVPdmVyXCIsIHNob3dHYW1lT3Zlcik7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbkVsZW1lbnQocGFyZW50KSB7XG4gICAgbGV0IGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNjcmVlbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgY2xlYW5FbGVtZW50KG1haW4pO1xuICAgIHJlbmRlckluaXRpYWxTY3JlZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIGV2ZW50cy5lbWl0KFwicmVzdGFydEdhbWVcIik7XG4gICAgdXBkYXRlU2NyZWVuKCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJSYW5kb21Cb2FyZCgpIHtcbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24ucGxheWVyLnNldHVwXCIpO1xuICAgIGNsZWFuRWxlbWVudChwbGF5ZXJTZWN0aW9uKTtcbiAgICBjb25zdCBkdW1teVBsYXllciA9IG5ldyBQbGF5ZXIoXCJkdW1teVwiKTtcbiAgICBldmVudHMuZW1pdChcInJlbmRlckR1bW15XCIsIGR1bW15UGxheWVyKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIllvdXIgQm9hcmRcIikpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoZHVtbXlQbGF5ZXIuZ2V0Qm9hcmQoKSwgXCJkdW1teVwiKSk7XG4gICAgY29uc3QgcmFuZG9taXplQnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIlJhbmRvbWl6ZVwiLCBcInJhbmRvbWl6ZVwiKTtcbiAgICByYW5kb21pemVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbmRlclJhbmRvbUJvYXJkKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJhbmRvbWl6ZUJ0bik7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJQYWdlTGF5b3V0KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcIkJhdHRsZXNoaXBcIikpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHJlbmRlckNvbnRyb2xzKFwic3RhcnQtZ2FtZVwiKSk7XG5cbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCwgXCJwbGF5ZXIgc2V0dXBcIik7XG5cbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gICAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcblxuICAgIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgY29uc3QgYSA9IGNyZWF0ZUVsZW1lbnQoXCJhXCIsIFwiXCIsIFwiXCIsIFtcbiAgICAgIFtcImhyZWZcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vamNpZHBcIl0sXG4gICAgICBbXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIl0sXG4gICAgXSk7XG4gICAgYS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBcIkNyZWF0ZWQgYnkgamNpZHBcIikpO1xuICAgIGEuYXBwZW5kQ2hpbGQoXG4gICAgICByZW5kZXJMaW5rSWNvbihcbiAgICAgICAgXCJnaXRodWJcIixcbiAgICAgICAgXCIwIDAgMjQgMjRcIixcbiAgICAgICAgXCJNMTIsMkExMCwxMCAwIDAsMCAyLDEyQzIsMTYuNDIgNC44NywyMC4xNyA4Ljg0LDIxLjVDOS4zNCwyMS41OCA5LjUsMjEuMjcgOS41LDIxQzkuNSwyMC43NyA5LjUsMjAuMTQgOS41LDE5LjMxQzYuNzMsMTkuOTEgNi4xNCwxNy45NyA2LjE0LDE3Ljk3QzUuNjgsMTYuODEgNS4wMywxNi41IDUuMDMsMTYuNUM0LjEyLDE1Ljg4IDUuMSwxNS45IDUuMSwxNS45QzYuMSwxNS45NyA2LjYzLDE2LjkzIDYuNjMsMTYuOTNDNy41LDE4LjQ1IDguOTcsMTggOS41NCwxNy43NkM5LjYzLDE3LjExIDkuODksMTYuNjcgMTAuMTcsMTYuNDJDNy45NSwxNi4xNyA1LjYyLDE1LjMxIDUuNjIsMTEuNUM1LjYyLDEwLjM5IDYsOS41IDYuNjUsOC43OUM2LjU1LDguNTQgNi4yLDcuNSA2Ljc1LDYuMTVDNi43NSw2LjE1IDcuNTksNS44OCA5LjUsNy4xN0MxMC4yOSw2Ljk1IDExLjE1LDYuODQgMTIsNi44NEMxMi44NSw2Ljg0IDEzLjcxLDYuOTUgMTQuNSw3LjE3QzE2LjQxLDUuODggMTcuMjUsNi4xNSAxNy4yNSw2LjE1QzE3LjgsNy41IDE3LjQ1LDguNTQgMTcuMzUsOC43OUMxOCw5LjUgMTguMzgsMTAuMzkgMTguMzgsMTEuNUMxOC4zOCwxNS4zMiAxNi4wNCwxNi4xNiAxMy44MSwxNi40MUMxNC4xNywxNi43MiAxNC41LDE3LjMzIDE0LjUsMTguMjZDMTQuNSwxOS42IDE0LjUsMjAuNjggMTQuNSwyMUMxNC41LDIxLjI3IDE0LjY2LDIxLjU5IDE1LjE3LDIxLjVDMTkuMTQsMjAuMTYgMjIsMTYuNDIgMjIsMTJBMTAsMTAgMCAwLDAgMTIsMlpcIixcbiAgICAgICksXG4gICAgKTtcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4gICAgcmVuZGVyUmFuZG9tQm9hcmQoKTtcbiAgICBldmVudHMub24oXCJnYW1lU3RhcnRlZFwiLCBzZXR1cEJvYXJkcyk7XG4gICAgZXZlbnRzLm9uKFwiZ2FtZVN0YXJ0ZWRcIiwgcmVuZGVySW5pdGlhbFNjcmVlbik7XG4gICAgZXZlbnRzLm9uKFwidHVybkVuZFwiLCB1cGRhdGVTY3JlZW4pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQYWdlTGF5b3V0LFxuICAgIHJlbmRlckluaXRpYWxTY3JlZW4sXG4gICAgdXBkYXRlU2NyZWVuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tQ29udHJvbGxlcjtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXI7XG4gIGxldCBjb21wdXRlcjtcbiAgbGV0IGFjdGl2ZUdhbWUgPSBmYWxzZTtcblxuICBjb25zdCBnZXRQbGF5ZXIgPSAoKSA9PiBwbGF5ZXI7XG4gIGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cbiAgY29uc3QgaXNDb29yZGluYXRlRnJlZSA9IChib2FyZCwgcm93LCBjb2wpID0+IHtcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdLnNoaXApIHJldHVybiBmYWxzZTtcbiAgICBpZiAocm93ID4gMCAmJiBib2FyZFtyb3cgLSAxXVtjb2xdLnNoaXApIHJldHVybiBmYWxzZTtcbiAgICBpZiAoY29sIDwgOSAmJiBib2FyZFtyb3ddW2NvbCArIDFdLnNoaXApIHJldHVybiBmYWxzZTtcbiAgICBpZiAocm93IDwgOSAmJiBib2FyZFtyb3cgKyAxXVtjb2xdLnNoaXApIHJldHVybiBmYWxzZTtcbiAgICBpZiAoY29sID4gMCAmJiBib2FyZFtyb3ddW2NvbCAtIDFdLnNoaXApIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBpc1Bvc2l0aW9uVmFsaWQgPSAoYm9hcmQsIHN0YXJ0LCBlbmQpID0+IHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICBib2FyZC5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKHN0YXJ0KTtcbiAgICBjb25zdCBbZW5kQ29sLCBlbmRSb3ddID0gYm9hcmQuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhlbmQpO1xuICAgIGNvbnN0IGRpc3RhbmNlID1cbiAgICAgIHN0YXJ0Um93ID09PSBlbmRSb3cgPyBlbmRDb2wgLSBzdGFydENvbCArIDEgOiBlbmRSb3cgLSBzdGFydFJvdyArIDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXN0YW5jZTsgaSsrKSB7XG4gICAgICBpZiAoc3RhcnRSb3cgPT09IGVuZFJvdykge1xuICAgICAgICBpZiAoIWlzQ29vcmRpbmF0ZUZyZWUoYm9hcmQuYm9hcmQsIHN0YXJ0Um93LCBzdGFydENvbCArIGkpKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzQ29vcmRpbmF0ZUZyZWUoYm9hcmQuYm9hcmQsIHN0YXJ0Um93ICsgaSwgc3RhcnRDb2wpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tU2hpcFBvc2l0aW9uID0gKHBsYXllciwgbGVuZ3RoKSA9PiB7XG4gICAgbGV0IGluaXRpYWxQb3NpdGlvbjtcbiAgICBsZXQgZmluYWxQb3NpdGlvbjtcbiAgICBsZXQgdmFsaWRQb3NpdGlvbiA9IGZhbHNlO1xuICAgIHdoaWxlICghdmFsaWRQb3NpdGlvbikge1xuICAgICAgaW5pdGlhbFBvc2l0aW9uID0gUGxheWVyLmdldENvb3JkaW5hdGVzRnJvbU51bWJlcihcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEsXG4gICAgICApO1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgZmluYWxQb3NpdGlvbiA9XG4gICAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgICAgIGluaXRpYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApICsgbGVuZ3RoIC0gMSA8PSA3NFxuICAgICAgICAgICAgICA/IGluaXRpYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApICsgbGVuZ3RoIC0gMVxuICAgICAgICAgICAgICA6IGluaXRpYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApIC0gbGVuZ3RoICsgMSxcbiAgICAgICAgICApICsgaW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbE51bWJlciA9ICtpbml0aWFsUG9zaXRpb24uc2xpY2UoMSk7XG4gICAgICAgIGZpbmFsUG9zaXRpb24gPVxuICAgICAgICAgIGluaXRpYWxQb3NpdGlvblswXSArXG4gICAgICAgICAgKGluaXRpYWxOdW1iZXIgKyBsZW5ndGggLSAxIDw9IDEwXG4gICAgICAgICAgICA/IGluaXRpYWxOdW1iZXIgKyBsZW5ndGggLSAxXG4gICAgICAgICAgICA6IGluaXRpYWxOdW1iZXIgLSBsZW5ndGggKyAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgPiBmaW5hbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgfHxcbiAgICAgICAgK2luaXRpYWxQb3NpdGlvbi5zbGljZSgxKSA+ICtmaW5hbFBvc2l0aW9uLnNsaWNlKDEpXG4gICAgICApIHtcbiAgICAgICAgW2luaXRpYWxQb3NpdGlvbiwgZmluYWxQb3NpdGlvbl0gPSBbZmluYWxQb3NpdGlvbiwgaW5pdGlhbFBvc2l0aW9uXTtcbiAgICAgIH1cbiAgICAgIHZhbGlkUG9zaXRpb24gPSBpc1Bvc2l0aW9uVmFsaWQoXG4gICAgICAgIHBsYXllci5ib2FyZCxcbiAgICAgICAgaW5pdGlhbFBvc2l0aW9uLFxuICAgICAgICBmaW5hbFBvc2l0aW9uLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtpbml0aWFsUG9zaXRpb24sIGZpbmFsUG9zaXRpb25dO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBsYXllclNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoLi4uZ2V0UmFuZG9tU2hpcFBvc2l0aW9uKHBsYXllciwgNSkpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoLi4uZ2V0UmFuZG9tU2hpcFBvc2l0aW9uKHBsYXllciwgNCkpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoLi4uZ2V0UmFuZG9tU2hpcFBvc2l0aW9uKHBsYXllciwgMykpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoLi4uZ2V0UmFuZG9tU2hpcFBvc2l0aW9uKHBsYXllciwgMykpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoLi4uZ2V0UmFuZG9tU2hpcFBvc2l0aW9uKHBsYXllciwgMikpO1xuICB9O1xuXG4gIGNvbnN0IGdhbWVPdmVyID0gKHdpbm5lcikgPT4ge1xuICAgIGFjdGl2ZUdhbWUgPSBmYWxzZTtcbiAgICBldmVudHMuZW1pdChcImdhbWVPdmVyXCIsIHdpbm5lcik7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15ID0gZ2V0UGxheWVyKCk7XG4gICAgZ2V0Q29tcHV0ZXIoKS5tYWtlUmFuZG9tQXR0YWNrKGVuZW15KTtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG4gICAgaWYgKGVuZW15LmJvYXJkLmhhdmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZ2FtZU92ZXIoZ2V0Q29tcHV0ZXIoKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlUdXJuID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgaWYgKCFhY3RpdmVHYW1lKSByZXR1cm47XG4gICAgY29uc3QgZW5lbXkgPSBnZXRDb21wdXRlcigpO1xuICAgIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSBnZXRQbGF5ZXIoKS5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIXZhbGlkQ29vcmRpbmF0ZXMpIHJldHVybjtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG5cbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRQbGF5ZXIoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbXB1dGVyVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwR2FtZSA9ICgpID0+IHtcbiAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiWW91XCIpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBhY3RpdmVHYW1lID0gdHJ1ZTtcblxuICAgIGNyZWF0ZVBsYXllclNoaXBzKHBsYXllcik7XG4gICAgY3JlYXRlUGxheWVyU2hpcHMoY29tcHV0ZXIpO1xuXG4gICAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgICBldmVudHMuZW1pdChcImdhbWVTdGFydGVkXCIsIHtcbiAgICAgIHBsYXllcjogZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSxcbiAgICAgIGNvbXB1dGVyOiBnZXRDb21wdXRlcigpLmdldEJvYXJkKCksXG4gICAgfSk7XG4gICAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgc2V0dXBHYW1lKTtcbiAgfTtcblxuICBldmVudHMub24oXCJzZXR1cEdhbWVcIiwgc2V0dXBHYW1lKTtcbiAgZXZlbnRzLm9uKFwicmVuZGVyRHVtbXlcIiwgY3JlYXRlUGxheWVyU2hpcHMpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0dXBHYW1lLFxuICAgIGdldFBsYXllcixcbiAgICBnZXRDb21wdXRlcixcbiAgICBwbGF5VHVybixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzLmJvYXJkID0gQXJyYXkoMTApLmZpbGwoQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIHRoaXMuYm9hcmQgPSB0aGlzLmNvbnN0cnVjdG9yLmZpbGxCb2FyZCgpO1xuICB9XG5cbiAgc3RhdGljIGZpbGxCb2FyZCgpIHtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goeyBhdHRhY2tlZDogZmFsc2UsIHNoaXA6IG51bGwgfSk7XG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIHBsYWNlU2hpcChzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgW3N0YXJ0Q29sLCBzdGFydFJvd10gPVxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKHN0YXJ0KTtcbiAgICBpZiAoIWVuZCkge1xuICAgICAgdGhpcy5ib2FyZFtzdGFydFJvd11bc3RhcnRDb2xdLnNoaXAgPSBuZXcgU2hpcCgxLCBzdGFydCwgXCJoXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBbZW5kQ29sLCBlbmRSb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGVuZCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPVxuICAgICAgc3RhcnRSb3cgPT09IGVuZFJvdyA/IGVuZENvbCAtIHN0YXJ0Q29sICsgMSA6IGVuZFJvdyAtIHN0YXJ0Um93ICsgMTtcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZGlzdGFuY2UsIHN0YXJ0LCBzdGFydFJvdyA9PT0gZW5kUm93ID8gXCJoXCIgOiBcInZcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXN0YW5jZTsgaSsrKSB7XG4gICAgICBpZiAoc3RhcnRSb3cgPT09IGVuZFJvdykgdGhpcy5ib2FyZFtzdGFydFJvd11bc3RhcnRDb2wgKyBpXS5zaGlwID0gc2hpcDtcbiAgICAgIGVsc2UgdGhpcy5ib2FyZFtzdGFydFJvdyArIGldW3N0YXJ0Q29sXS5zaGlwID0gc2hpcDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIHJldHVybiBbY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY1LCArY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSAxXTtcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVwZWF0ZWQgY29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKGNlbGwuc2hpcCkge1xuICAgICAgY2VsbC5zaGlwLmhpdCgpO1xuICAgIH1cbiAgICBjb25zdCBbY29sLCByb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5hdHRhY2tlZCA9IHRydWU7XG4gIH1cblxuICBoYXZlQWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmV2ZXJ5KChyb3cpID0+XG4gICAgICByb3cuZXZlcnkoKGNlbGwpID0+ICFjZWxsLnNoaXAgfHwgY2VsbC5zaGlwLmlzU3VuaygpKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY29udGVudCwgY2xhc3NlcywgYXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBpZiAoY29udGVudCkgZWxlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGUuY2xhc3NMaXN0LmFkZChteUNsYXNzKSk7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMpXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKSxcbiAgICApO1xuICByZXR1cm4gZWxlO1xufTtcblxuY29uc3QgcmVuZGVyTGlua0ljb24gPSAobmFtZSwgdmlld0JveCwgcGF0aCwgbXlDbGFzcykgPT4ge1xuICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBcInBhdGhcIixcbiAgKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG5cbiAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBwYXRoKTtcblxuICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcblxuICBpZiAobmFtZSA9PT0gXCJwZW5jaWxcIiB8fCBuYW1lID09PSBcImRlbGV0ZVwiKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIGlmIChteUNsYXNzKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobXlDbGFzcyk7XG5cbiAgcmV0dXJuIGljb25Tdmc7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmZpbGwoKSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBzaG90TnVtYmVyID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdGhpcy5zaG90c0F2YWlsYWJsZS5pbmNsdWRlcyhzaG90TnVtYmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgIGVuZW15LmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgIHRoaXMuc2hvdHNBdmFpbGFibGUgPSB0aGlzLnNob3RzQXZhaWxhYmxlLmZpbHRlcigobikgPT4gbiAhPT0gc2hvdE51bWJlcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSA2NCArICtjb29yZGluYXRlcy5zbGljZSgxKSAqIDEwIC0gMTA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKG4pIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgobiAlIDEwID09PSAwID8gMTAgOiBuICUgMTApICsgNjQpfSR7XG4gICAgICBNYXRoLmZsb29yKG4gLyAxMCkgKyAobiAlIDEwID09PSAwID8gMCA6IDEpXG4gICAgfWA7XG4gIH1cblxuICBtYWtlUmFuZG9tQXR0YWNrKGVuZW15KSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmdldENvb3JkaW5hdGVzRnJvbU51bWJlcihcbiAgICAgIHRoaXMuc2hvdHNBdmFpbGFibGVbXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2hvdHNBdmFpbGFibGUubGVuZ3RoKVxuICAgICAgXSxcbiAgICApO1xuICAgIHRoaXMuYXR0YWNrKGVuZW15LCBjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQuYm9hcmQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgZXZlbnRzID0gKCgpID0+IHtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgY29uc3Qgb24gPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSlcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gIH07XG5cbiAgY29uc3Qgb2ZmID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVtaXQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IGZuKGRhdGEpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBlbWl0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgc3RhcnRDb29yZGluYXRlcywgZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5zdGFydENvb3JkaW5hdGVzID0gc3RhcnRDb29yZGluYXRlcztcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkgdGhpcy5oaXRzKys7XG4gICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwbHZoO1xcbn1cXG5cXG5tYWluIHtcXG4gIHdpZHRoOiBtaW4oNzBjaCwgMTAwJSAtIDRyZW0pO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcbn1cXG5mb290ZXIgYSB7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5mb290ZXIgc3ZnIHtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVlbTtcXG4gIG1heC13aWR0aDogMS41ZW07XFxuICBmaWxsOiB3aGl0ZTtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAxZW07XFxufVxcbnNlY3Rpb24gaDIge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuYnV0dG9uOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbnRyb2xzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHJvdy1nYXA6IDFlbTtcXG59XFxuLmNvbnRyb2xzIGJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5jb250cm9scyAuZGlzcGxheSB7XFxuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAxZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSkvcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSk7XFxuICBhc3BlY3QtcmF0aW86IDEvMTtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDE4ZW0pIC8gMik7XFxufVxcbi5ib2FyZCAubGFiZWwge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmJvYXJkIC5jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM1NTU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uYm9hcmQgLmNlbGwuc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxufVxcbi5ib2FyZCAuY2VsbC5zaGlwLmF0dGFja2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYTMyMzI7XFxufVxcbi5ib2FyZCAuY2VsbC5hdHRhY2tlZDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIidcXFwiO1xcbiAgd2lkdGg6IDAuNWVtO1xcbiAgaGVpZ2h0OiAwLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4uYm9hcmQgLmNlbGwgLmRyYWctc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4ucGxheWVyLnNldHVwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLnBsYXllci5zZXR1cCAuZHVtbXkuYm9hcmQge1xcbiAgcGFkZGluZy1ib3R0b206IDA7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHN2aCAtIDE4ZW0pO1xcbn1cXG4ucGxheWVyLnNldHVwIC5yYW5kb21pemUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQU1BO0VBQ0Usc0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUxGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLCtDQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0UsNkJBQUE7RUFDQSxtQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBekJnQjtFQTBCaEIsWUF2QmE7RUF3QmIsa0JBQUE7RUFDQSxnQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBaENnQjtFQWlDaEIsaUJBQUE7QUFQRjtBQVNFO0VBQ0UsWUFqQ1c7RUFrQ1gscUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0EzQ1c7QUFtQ2Y7O0FBY0E7RUFDRSxlQUFBO0FBWEY7QUFhRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFYSjs7QUFlQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFaRjtBQWNFO0VBQ0UsZUFBQTtBQVpKOztBQWtCQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFmRjtBQWlCRTtFQUNFLDJCQW5GWTtFQW9GWixZQWhGVztBQWlFZjtBQWtCRTtFQUNFLG1CQUFBO0FBaEJKOztBQXNCQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDBFQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQ0FBQTtBQW5CRjtBQXFCRTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQW5CSjtBQXNCRTtFQUNFLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFwQko7QUFzQkk7RUFDRSwyQkFsSFU7QUE4RmhCO0FBcUJNO0VBQ0UseUJBbEhVO0FBK0ZsQjtBQXVCSTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFyQk47QUF3Qkk7RUFDRSwyQkFqSVU7RUFrSVYsTUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQXRCTjs7QUEyQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUF4QkY7QUEwQkU7RUFDRSxpQkFBQTtFQUNBLCtCQUFBO0FBeEJKO0FBMkJFO0VBQ0UsNkJBQUE7QUF6QkpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiJHByaW1hcnktY29sb3I6IHN0ZWVsYmx1ZTtcXG4kc2Vjb25kYXJ5LWNvbG9yOiAjNTU1O1xcbiRoaWdobGlnaHQtY29sb3I6ICNmYTMyMzI7XFxuJHByaW1hcnktZmM6IGJsYWNrO1xcbiRzZWNvbmRhcnktZmM6IHdoaXRlO1xcblxcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8vIEdlbmVyYWwgbGF5b3V0XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCAxZnIgbWF4LWNvbnRlbnQ7XFxuICBoZWlnaHQ6IDEwMGx2aDsgIC8vIFRlc3Qgb3RoZXIgYmVoYXZpb3JzXFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gNHJlbSk7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC41ZW0gMDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWNvbmRhcnktY29sb3I7XFxuICBwYWRkaW5nOiAwLjI1ZW0gMDtcXG5cXG4gIGEge1xcbiAgICBjb2xvcjogJHNlY29uZGFyeS1mYztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIHN2ZyB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwLjVlbTtcXG4gICAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gICAgZmlsbDogJHNlY29uZGFyeS1mYztcXG4gIH1cXG59XFxuXFxuLy8gR2FtZSB2aWV3XFxuXFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAxZW07XFxuXFxuICBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbn1cXG5cXG5idXR0b24ge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIFxcbiAgJjpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gIH1cXG59XFxuXFxuLy8gQ29udHJvbHNcXG5cXG4uY29udHJvbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcm93LWdhcDogMWVtO1xcblxcbiAgYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcblxcbiAgLmRpc3BsYXkge1xcbiAgICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xcbiAgfVxcbn1cXG5cXG4vLyBCb2FyZHNcXG5cXG4uYm9hcmQge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAxZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSkgLyByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7IC8vIFRoZSBwb3NpdGlvbiBpc24ndCByaWdodC4gRml4IGl0IGxhdGVyLlxcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMThlbSkgLyAyKTtcXG5cXG4gIC5sYWJlbCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5jZWxsIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgJHNlY29uZGFyeS1jb2xvcjtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICAgICYuc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgICAgJi5hdHRhY2tlZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgXFxuICAgICYuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiJ1xcXCI7XFxuICAgICAgd2lkdGg6IDAuNWVtO1xcbiAgICAgIGhlaWdodDogMC41ZW07XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICB9XFxuXFxuICAgIC5kcmFnLXNoaXAge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgei1pbmRleDogMTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4ucGxheWVyLnNldHVwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gIC5kdW1teS5ib2FyZCB7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSk7XFxuICB9XFxuXFxuICAucmFuZG9taXplIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIC8vYm9yZGVyOiAxcHggc29saWQgJHByaW1hcnktY29sb3I7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL3B1YnN1YlwiO1xuXG5kb21Db250cm9sbGVyLnJlbmRlclBhZ2VMYXlvdXQoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwicmVuZGVyTGlua0ljb24iLCJQbGF5ZXIiLCJldmVudHMiLCJkb21Db250cm9sbGVyIiwiYm9hcmRzIiwic2V0dXBCb2FyZHMiLCJuZXdCb2FyZHMiLCJnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzIiwicm93IiwiY29sIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZGlzcGxheSIsIm1lc3NhZ2UiLCJ0ZXh0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJzaG93R2FtZU92ZXIiLCJ3aW5uZXIiLCJuYW1lIiwiYXR0YWNrQ2VsbCIsImUiLCJlbWl0IiwidGFyZ2V0IiwiaWQiLCJnZXRDb29yZGluYXRlc09mZnNldCIsImNvb3JkaW5hdGVzIiwib2Zmc2V0IiwiZGlyZWN0aW9uIiwiY2hhckNvZGVBdCIsInNsaWNlIiwiZHJhZyIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJjbG9zZXN0IiwibGVuZ3RoWCIsImRhdGFzZXQiLCJvZmZzZXRXaWR0aCIsImxlbmd0aCIsImxlbmd0aFkiLCJvZmZzZXRIZWlnaHQiLCJzcXVhcmVPZmZzZXQiLCJNYXRoIiwiZmxvb3IiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImNvbnNvbGUiLCJsb2ciLCJlZmZlY3RBbGxvd2VkIiwiYWxsb3dEcm9wIiwicHJldmVudERlZmF1bHQiLCJkcm9wRWZmZWN0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJkcm9wIiwic291cmNlQ29vcmRpbmF0ZXMiLCJnZXREYXRhIiwib2ZmU2V0Iiwic291cmNlQ2VsbCIsImdldEVsZW1lbnRCeUlkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJ0YXJnZXRDb29yZGluYXRlcyIsIm5ld1BhcmVudCIsImFwcGVuZENoaWxkIiwicmVuZGVyQm9hcmQiLCJib2FyZCIsInBsYXllciIsImJvYXJkQ29udGFpbmVyIiwiaSIsImNvbExhYmVsIiwiZm9yRWFjaCIsInJvd0xhYmVsIiwiY2VsbCIsImoiLCJjbGFzc2VzIiwiYXR0YWNrZWQiLCJzaGlwIiwiY2VsbEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkIiwic3RhcnRDb29yZGluYXRlcyIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJzdGFydEdhbWUiLCJyZW5kZXJDb250cm9scyIsImJ1dHRvbkNsYXNzIiwiYnV0dG9uVGV4dCIsImRpc3BsYXlUZXh0IiwiZm4iLCJyZXN0YXJ0R2FtZSIsImNvbnRyb2xTZWN0aW9uIiwiYnRuIiwidGV4dERpc3BsYXkiLCJyZW5kZXJJbml0aWFsU2NyZWVuIiwibWFpbiIsImNsZWFuRWxlbWVudCIsInBsYXllclNlY3Rpb24iLCJlbmVteVNlY3Rpb24iLCJjb21wdXRlciIsIm9uIiwicGFyZW50IiwiY2hpbGQiLCJyZW1vdmVDaGlsZCIsInVwZGF0ZVNjcmVlbiIsInJlbmRlclJhbmRvbUJvYXJkIiwiZHVtbXlQbGF5ZXIiLCJnZXRCb2FyZCIsInJhbmRvbWl6ZUJ0biIsInJlbmRlclBhZ2VMYXlvdXQiLCJib2R5IiwiaGVhZGVyIiwiZm9vdGVyIiwiYSIsImdhbWVDb250cm9sbGVyIiwiYWN0aXZlR2FtZSIsImdldFBsYXllciIsImdldENvbXB1dGVyIiwiaXNDb29yZGluYXRlRnJlZSIsImlzUG9zaXRpb25WYWxpZCIsInN0YXJ0IiwiZW5kIiwic3RhcnRDb2wiLCJzdGFydFJvdyIsImNvbnN0cnVjdG9yIiwiZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyIsImVuZENvbCIsImVuZFJvdyIsImRpc3RhbmNlIiwiZ2V0UmFuZG9tU2hpcFBvc2l0aW9uIiwiaW5pdGlhbFBvc2l0aW9uIiwiZmluYWxQb3NpdGlvbiIsInZhbGlkUG9zaXRpb24iLCJnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIiLCJyYW5kb20iLCJpbml0aWFsTnVtYmVyIiwiY3JlYXRlUGxheWVyU2hpcHMiLCJwbGFjZVNoaXAiLCJnYW1lT3ZlciIsImNvbXB1dGVyVHVybiIsImVuZW15IiwibWFrZVJhbmRvbUF0dGFjayIsImhhdmVBbGxTaGlwc1N1bmsiLCJwbGF5VHVybiIsInZhbGlkQ29vcmRpbmF0ZXMiLCJhdHRhY2siLCJzZXR1cEdhbWUiLCJTaGlwIiwiR2FtZWJvYXJkIiwiZmlsbEJvYXJkIiwicHVzaCIsImdldENvb3JkaW5hdGVzIiwicmVjZWl2ZUF0dGFjayIsIkVycm9yIiwiaGl0IiwiZXZlcnkiLCJpc1N1bmsiLCJlbGVtZW50IiwiY29udGVudCIsImF0dHJpYnV0ZXMiLCJlbGUiLCJzcGxpdCIsIm15Q2xhc3MiLCJhdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ2aWV3Qm94IiwicGF0aCIsImljb25TdmciLCJjcmVhdGVFbGVtZW50TlMiLCJpY29uUGF0aCIsInRpdGxlIiwic2hvdHNBdmFpbGFibGUiLCJBcnJheSIsImZyb20iLCJmaWxsIiwiXyIsInNob3ROdW1iZXIiLCJnZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMiLCJpbmNsdWRlcyIsImZpbHRlciIsIm4iLCJnZXROYW1lIiwiZXZlbnROYW1lIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwib2ZmIiwic3BsaWNlIiwiZGF0YSIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9