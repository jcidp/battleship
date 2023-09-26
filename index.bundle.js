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
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].emit("playerAttack", e.target.dataset.coordinates);
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
        if (cell.ship && (player === "player" || "dummy")) classes += " ship";
        const coordinates = getCoordinatesFromIndexes(i, j);
        const cellElement = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, classes, [["data-coordinates", coordinates]]);
        if (player === "computer") {
          cellElement.addEventListener("click", attackCell);
          if (cell.attacked && cell.ship) cellElement.classList.add("ship");
        }
        boardContainer.appendChild(cellElement);
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
      this.board[startRow][startCol].ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](1);
      return;
    }
    const [endCol, endRow] = this.constructor.getIndexesFromCoordinates(end);
    const distance = startRow === endRow ? endCol - startCol + 1 : endRow - startRow + 1;
    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](distance);
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
  constructor(length) {
    this.length = length;
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 1em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n}\nbutton:hover {\n  cursor: pointer;\n}\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n}\n.controls button {\n  background-color: steelblue;\n  color: white;\n}\n.controls .display {\n  min-height: 2.25rem;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr))/repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 18em) / 2);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n  display: grid;\n  place-content: center;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}\n.board .cell.ship.attacked {\n  background-color: #fa3232;\n}\n.board .cell.attacked::after {\n  content: \"'\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: black;\n  border-radius: 50%;\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n}\n.player.setup .dummy.board {\n  padding-bottom: 0;\n  max-height: calc(100svh - 18em);\n}\n.player.setup .randomize {\n  background-color: transparent;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,6BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,sBAzBgB;EA0BhB,YAvBa;EAwBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBAhCgB;EAiChB,iBAAA;AAPF;AASE;EACE,YAjCW;EAkCX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WA3CW;AAmCf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAeA;EACE,kBAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;AAZF;AAcE;EACE,eAAA;AAZJ;;AAkBA;EACE,aAAA;EACA,uBAAA;EACA,YAAA;AAfF;AAiBE;EACE,2BAnFY;EAoFZ,YAhFW;AAiEf;AAkBE;EACE,mBAAA;AAhBJ;;AAsBA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;AAnBF;AAqBE;EACE,aAAA;EACA,qBAAA;AAnBJ;AAsBE;EACE,sBAAA;EACA,aAAA;EACA,qBAAA;AApBJ;AAsBI;EACE,2BAjHU;AA6FhB;AAqBM;EACE,yBAjHU;AA8FlB;AAuBI;EACE,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AArBN;;AA0BA;EACE,aAAA;EACA,uBAAA;AAvBF;AAyBE;EACE,iBAAA;EACA,+BAAA;AAvBJ;AA0BE;EACE,6BAAA;AAxBJ","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: #fa3232;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;  // Test other behaviors\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 1em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\nbutton {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  font-weight: bold;\n  \n  &:hover {\n    cursor: pointer;\n  }\n}\n\n// Controls\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n\n  button {\n    background-color: $primary-color;\n    color: $secondary-fc;\n  }\n\n  .display {\n    min-height: 2.25rem;\n  }\n}\n\n// Boards\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr)) / repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1 / 1; // The position isn't right. Fix it later.\n  max-height: calc((100svh - 18em) / 2);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n    display: grid;\n    place-content: center;\n\n    &.ship {\n      background-color: $primary-color;\n      &.attacked {\n        background-color: $highlight-color;\n      }\n    }\n\n    &.attacked::after {\n      content: \"'\";\n      width: 0.5em;\n      height: 0.5em;\n      background-color: black;\n      border-radius: 50%;\n    }\n  }\n}\n\n.player.setup {\n  display: grid;\n  justify-content: center;\n\n  .dummy.board {\n    padding-bottom: 0;\n    max-height: calc((100svh - 18em));\n  }\n\n  .randomize {\n    background-color: transparent;\n    //border: 1px solid $primary-color;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFDb0I7QUFDRTtBQUNOO0FBRXRDaEgsb0RBQWEsQ0FBQ29FLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBib2FyZHM7XG5cbiAgZnVuY3Rpb24gc2V0dXBCb2FyZHMobmV3Qm9hcmRzKSB7XG4gICAgYm9hcmRzID0gbmV3Qm9hcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhyb3csIGNvbCkge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbCArIDY1KX0ke3JvdyArIDF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXkobWVzc2FnZSkge1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlfX3RleHRcIik7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93R2FtZU92ZXIod2lubmVyKSB7XG4gICAgZGlzcGxheShgVGhlIGdhbWUgaXMgb3Zlci4gJHt3aW5uZXIubmFtZX0gd29uIWApO1xuICB9XG5cbiAgZnVuY3Rpb24gYXR0YWNrQ2VsbChlKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJwbGF5ZXJBdHRhY2tcIiwgZS50YXJnZXQuZGF0YXNldC5jb29yZGluYXRlcyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCb2FyZChib2FyZCwgcGxheWVyKSB7XG4gICAgY29uc3QgYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGAke3BsYXllcn0gYm9hcmRgKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbExhYmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImxhYmVsIGNvbFwiKTtcbiAgICAgIGNvbExhYmVsLmFwcGVuZENoaWxkKFxuICAgICAgICBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBpID09PSAwID8gXCJcIiA6IFN0cmluZy5mcm9tQ2hhckNvZGUoaSArIDY0KSksXG4gICAgICApO1xuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29sTGFiZWwpO1xuICAgIH1cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIGNvbnN0IHJvd0xhYmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImxhYmVsIHJvd1wiKTtcbiAgICAgIHJvd0xhYmVsLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgKyAxKSk7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dMYWJlbCk7XG4gICAgICByb3cuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBsZXQgY2xhc3NlcyA9IFwiY2VsbFwiO1xuICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCkgY2xhc3NlcyArPSBcIiBhdHRhY2tlZFwiO1xuICAgICAgICBpZiAoY2VsbC5zaGlwICYmIChwbGF5ZXIgPT09IFwicGxheWVyXCIgfHwgXCJkdW1teVwiKSkgY2xhc3NlcyArPSBcIiBzaGlwXCI7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhpLCBqKTtcbiAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGNsYXNzZXMsIFtcbiAgICAgICAgICBbXCJkYXRhLWNvb3JkaW5hdGVzXCIsIGNvb3JkaW5hdGVzXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDZWxsKTtcbiAgICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCAmJiBjZWxsLnNoaXApIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBib2FyZENvbnRhaW5lcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICBldmVudHMuZW1pdChcInNldHVwR2FtZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckNvbnRyb2xzKGJ1dHRvbkNsYXNzKSB7XG4gICAgY29uc3QgYnV0dG9uVGV4dCA9IGJ1dHRvbkNsYXNzID09PSBcIm5ldy1nYW1lXCIgPyBcIisgTmV3IEdhbWVcIiA6IFwiU3RhcnQgR2FtZVwiO1xuICAgIGNvbnN0IGRpc3BsYXlUZXh0ID1cbiAgICAgIGJ1dHRvbkNsYXNzID09PSBcIm5ldy1nYW1lXCJcbiAgICAgICAgPyBcIkNsaWNrIG9uIHRoZSBlbmVteSdzIGJvYXJkIHRvIGF0dGFja1wiXG4gICAgICAgIDogXCJEcmFnIGFuZCBjbGljayBvbiB5b3VyIHNoaXBzLCB0aGVuIGNsaWNrIHRoZSBidXR0b24gYWJvdmUgdG8gc3RhcnQgdGhlIGdhbWVcIjtcbiAgICBjb25zdCBmbiA9IGJ1dHRvbkNsYXNzID09PSBcIm5ldy1nYW1lXCIgPyByZXN0YXJ0R2FtZSA6IHN0YXJ0R2FtZTtcbiAgICBjb25zdCBjb250cm9sU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIG51bGwsIFwiY29udHJvbHNcIik7XG4gICAgY29uc3QgYnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBidXR0b25UZXh0LCBidXR0b25DbGFzcyk7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmbik7XG4gICAgY29udHJvbFNlY3Rpb24uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBjb25zdCB0ZXh0RGlzcGxheSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJkaXNwbGF5XCIpO1xuICAgIHRleHREaXNwbGF5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJwXCIsIGRpc3BsYXlUZXh0LCBcImRpc3BsYXlfX3RleHRcIikpO1xuICAgIGNvbnRyb2xTZWN0aW9uLmFwcGVuZENoaWxkKHRleHREaXNwbGF5KTtcbiAgICByZXR1cm4gY29udHJvbFNlY3Rpb247XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJbml0aWFsU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChyZW5kZXJDb250cm9scyhcIm5ldy1nYW1lXCIpKTtcblxuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIllvdXIgQm9hcmRcIikpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLnBsYXllciwgXCJwbGF5ZXJcIikpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxheWVyU2VjdGlvbik7XG5cbiAgICBjb25zdCBlbmVteVNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBlbmVteVNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiRW5lbXkncyBCb2FyZFwiKSk7XG4gICAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGJvYXJkcy5jb21wdXRlciwgXCJjb21wdXRlclwiKSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChlbmVteVNlY3Rpb24pO1xuXG4gICAgZXZlbnRzLm9uKFwiZ2FtZU92ZXJcIiwgc2hvd0dhbWVPdmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFuRWxlbWVudChwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgcmVuZGVySW5pdGlhbFNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJyZXN0YXJ0R2FtZVwiKTtcbiAgICB1cGRhdGVTY3JlZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclJhbmRvbUJvYXJkKCkge1xuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi5wbGF5ZXIuc2V0dXBcIik7XG4gICAgY2xlYW5FbGVtZW50KHBsYXllclNlY3Rpb24pO1xuICAgIGNvbnN0IGR1bW15UGxheWVyID0gbmV3IFBsYXllcihcImR1bW15XCIpO1xuICAgIGV2ZW50cy5lbWl0KFwicmVuZGVyRHVtbXlcIiwgZHVtbXlQbGF5ZXIpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiWW91ciBCb2FyZFwiKSk7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChkdW1teVBsYXllci5nZXRCb2FyZCgpLCBcImR1bW15XCIpKTtcbiAgICBjb25zdCByYW5kb21pemVCdG4gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwiUmFuZG9taXplXCIsIFwicmFuZG9taXplXCIpO1xuICAgIHJhbmRvbWl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyUmFuZG9tQm9hcmQpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmFuZG9taXplQnRuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclBhZ2VMYXlvdXQoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgxXCIsIFwiQmF0dGxlc2hpcFwiKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocmVuZGVyQ29udHJvbHMoXCJzdGFydC1nYW1lXCIpKTtcblxuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcInBsYXllciBzZXR1cFwiKTtcblxuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxheWVyU2VjdGlvbik7XG5cbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICBjb25zdCBhID0gY3JlYXRlRWxlbWVudChcImFcIiwgXCJcIiwgXCJcIiwgW1xuICAgICAgW1wiaHJlZlwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9qY2lkcFwiXSxcbiAgICAgIFtcInRhcmdldFwiLCBcIl9ibGFua1wiXSxcbiAgICBdKTtcbiAgICBhLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJwXCIsIFwiQ3JlYXRlZCBieSBqY2lkcFwiKSk7XG4gICAgYS5hcHBlbmRDaGlsZChcbiAgICAgIHJlbmRlckxpbmtJY29uKFxuICAgICAgICBcImdpdGh1YlwiLFxuICAgICAgICBcIjAgMCAyNCAyNFwiLFxuICAgICAgICBcIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiLFxuICAgICAgKSxcbiAgICApO1xuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChhKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cbiAgICByZW5kZXJSYW5kb21Cb2FyZCgpO1xuICAgIGV2ZW50cy5vbihcImdhbWVTdGFydGVkXCIsIHNldHVwQm9hcmRzKTtcbiAgICBldmVudHMub24oXCJnYW1lU3RhcnRlZFwiLCByZW5kZXJJbml0aWFsU2NyZWVuKTtcbiAgICBldmVudHMub24oXCJ0dXJuRW5kXCIsIHVwZGF0ZVNjcmVlbik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbmRlclBhZ2VMYXlvdXQsXG4gICAgcmVuZGVySW5pdGlhbFNjcmVlbixcbiAgICB1cGRhdGVTY3JlZW4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb21Db250cm9sbGVyO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgbGV0IGNvbXB1dGVyO1xuICBsZXQgYWN0aXZlR2FtZSA9IGZhbHNlO1xuXG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcbiAgY29uc3QgZ2V0Q29tcHV0ZXIgPSAoKSA9PiBjb21wdXRlcjtcblxuICBjb25zdCBpc0Nvb3JkaW5hdGVGcmVlID0gKGJvYXJkLCByb3csIGNvbCkgPT4ge1xuICAgIGlmIChib2FyZFtyb3ddW2NvbF0uc2hpcCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyb3cgPiAwICYmIGJvYXJkW3JvdyAtIDFdW2NvbF0uc2hpcCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChjb2wgPCA5ICYmIGJvYXJkW3Jvd11bY29sICsgMV0uc2hpcCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyb3cgPCA5ICYmIGJvYXJkW3JvdyArIDFdW2NvbF0uc2hpcCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChjb2wgPiAwICYmIGJvYXJkW3Jvd11bY29sIC0gMV0uc2hpcCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGlzUG9zaXRpb25WYWxpZCA9IChib2FyZCwgc3RhcnQsIGVuZCkgPT4ge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIGJvYXJkLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnQpO1xuICAgIGNvbnN0IFtlbmRDb2wsIGVuZFJvd10gPSBib2FyZC5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGVuZCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPVxuICAgICAgc3RhcnRSb3cgPT09IGVuZFJvdyA/IGVuZENvbCAtIHN0YXJ0Q29sICsgMSA6IGVuZFJvdyAtIHN0YXJ0Um93ICsgMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3RhbmNlOyBpKyspIHtcbiAgICAgIGlmIChzdGFydFJvdyA9PT0gZW5kUm93KSB7XG4gICAgICAgIGlmICghaXNDb29yZGluYXRlRnJlZShib2FyZC5ib2FyZCwgc3RhcnRSb3csIHN0YXJ0Q29sICsgaSkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghaXNDb29yZGluYXRlRnJlZShib2FyZC5ib2FyZCwgc3RhcnRSb3cgKyBpLCBzdGFydENvbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBnZXRSYW5kb21TaGlwUG9zaXRpb24gPSAocGxheWVyLCBsZW5ndGgpID0+IHtcbiAgICBsZXQgaW5pdGlhbFBvc2l0aW9uO1xuICAgIGxldCBmaW5hbFBvc2l0aW9uO1xuICAgIGxldCB2YWxpZFBvc2l0aW9uID0gZmFsc2U7XG4gICAgd2hpbGUgKCF2YWxpZFBvc2l0aW9uKSB7XG4gICAgICBpbml0aWFsUG9zaXRpb24gPSBQbGF5ZXIuZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKFxuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMSxcbiAgICAgICk7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBmaW5hbFBvc2l0aW9uID1cbiAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgICAgaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgKyBsZW5ndGggLSAxIDw9IDc0XG4gICAgICAgICAgICAgID8gaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgKyBsZW5ndGggLSAxXG4gICAgICAgICAgICAgIDogaW5pdGlhbFBvc2l0aW9uLmNoYXJDb2RlQXQoMCkgLSBsZW5ndGggKyAxLFxuICAgICAgICAgICkgKyBpbml0aWFsUG9zaXRpb24uc2xpY2UoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbml0aWFsTnVtYmVyID0gK2luaXRpYWxQb3NpdGlvbi5zbGljZSgxKTtcbiAgICAgICAgZmluYWxQb3NpdGlvbiA9XG4gICAgICAgICAgaW5pdGlhbFBvc2l0aW9uWzBdICtcbiAgICAgICAgICAoaW5pdGlhbE51bWJlciArIGxlbmd0aCAtIDEgPD0gMTBcbiAgICAgICAgICAgID8gaW5pdGlhbE51bWJlciArIGxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogaW5pdGlhbE51bWJlciAtIGxlbmd0aCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSA+IGZpbmFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSB8fFxuICAgICAgICAraW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpID4gK2ZpbmFsUG9zaXRpb24uc2xpY2UoMSlcbiAgICAgICkge1xuICAgICAgICBbaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uXSA9IFtmaW5hbFBvc2l0aW9uLCBpbml0aWFsUG9zaXRpb25dO1xuICAgICAgfVxuICAgICAgdmFsaWRQb3NpdGlvbiA9IGlzUG9zaXRpb25WYWxpZChcbiAgICAgICAgcGxheWVyLmJvYXJkLFxuICAgICAgICBpbml0aWFsUG9zaXRpb24sXG4gICAgICAgIGZpbmFsUG9zaXRpb24sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gW2luaXRpYWxQb3NpdGlvbiwgZmluYWxQb3NpdGlvbl07XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUGxheWVyU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcCguLi5nZXRSYW5kb21TaGlwUG9zaXRpb24ocGxheWVyLCA1KSk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcCguLi5nZXRSYW5kb21TaGlwUG9zaXRpb24ocGxheWVyLCA0KSk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcCguLi5nZXRSYW5kb21TaGlwUG9zaXRpb24ocGxheWVyLCAzKSk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcCguLi5nZXRSYW5kb21TaGlwUG9zaXRpb24ocGxheWVyLCAzKSk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcCguLi5nZXRSYW5kb21TaGlwUG9zaXRpb24ocGxheWVyLCAyKSk7XG4gIH07XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAod2lubmVyKSA9PiB7XG4gICAgYWN0aXZlR2FtZSA9IGZhbHNlO1xuICAgIGV2ZW50cy5lbWl0KFwiZ2FtZU92ZXJcIiwgd2lubmVyKTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXkgPSBnZXRQbGF5ZXIoKTtcbiAgICBnZXRDb21wdXRlcigpLm1ha2VSYW5kb21BdHRhY2soZW5lbXkpO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRDb21wdXRlcigpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheVR1cm4gPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUdhbWUpIHJldHVybjtcbiAgICBjb25zdCBlbmVteSA9IGdldENvbXB1dGVyKCk7XG4gICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IGdldFBsYXllcigpLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdmFsaWRDb29yZGluYXRlcykgcmV0dXJuO1xuICAgIGV2ZW50cy5lbWl0KFwidHVybkVuZFwiKTtcblxuICAgIGlmIChlbmVteS5ib2FyZC5oYXZlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGdhbWVPdmVyKGdldFBsYXllcigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBHYW1lID0gKCkgPT4ge1xuICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJZb3VcIik7XG4gICAgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiVGhlIGVuZW15XCIpO1xuICAgIGFjdGl2ZUdhbWUgPSB0cnVlO1xuXG4gICAgY3JlYXRlUGxheWVyU2hpcHMocGxheWVyKTtcbiAgICBjcmVhdGVQbGF5ZXJTaGlwcyhjb21wdXRlcik7XG5cbiAgICBldmVudHMub24oXCJwbGF5ZXJBdHRhY2tcIiwgcGxheVR1cm4pO1xuICAgIGV2ZW50cy5lbWl0KFwiZ2FtZVN0YXJ0ZWRcIiwge1xuICAgICAgcGxheWVyOiBnZXRQbGF5ZXIoKS5nZXRCb2FyZCgpLFxuICAgICAgY29tcHV0ZXI6IGdldENvbXB1dGVyKCkuZ2V0Qm9hcmQoKSxcbiAgICB9KTtcbiAgICBldmVudHMub24oXCJyZXN0YXJ0R2FtZVwiLCBzZXR1cEdhbWUpO1xuICB9O1xuXG4gIGV2ZW50cy5vbihcInNldHVwR2FtZVwiLCBzZXR1cEdhbWUpO1xuICBldmVudHMub24oXCJyZW5kZXJEdW1teVwiLCBjcmVhdGVQbGF5ZXJTaGlwcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBzZXR1cEdhbWUsXG4gICAgZ2V0UGxheWVyLFxuICAgIGdldENvbXB1dGVyLFxuICAgIHBsYXlUdXJuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMuYm9hcmQgPSBBcnJheSgxMCkuZmlsbChBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5ib2FyZCA9IHRoaXMuY29uc3RydWN0b3IuZmlsbEJvYXJkKCk7XG4gIH1cblxuICBzdGF0aWMgZmlsbEJvYXJkKCkge1xuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICByb3cucHVzaCh7IGF0dGFja2VkOiBmYWxzZSwgc2hpcDogbnVsbCB9KTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgcGxhY2VTaGlwKHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnQpO1xuICAgIGlmICghZW5kKSB7XG4gICAgICB0aGlzLmJvYXJkW3N0YXJ0Um93XVtzdGFydENvbF0uc2hpcCA9IG5ldyBTaGlwKDEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBbZW5kQ29sLCBlbmRSb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGVuZCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPVxuICAgICAgc3RhcnRSb3cgPT09IGVuZFJvdyA/IGVuZENvbCAtIHN0YXJ0Q29sICsgMSA6IGVuZFJvdyAtIHN0YXJ0Um93ICsgMTtcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZGlzdGFuY2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICBlbHNlIHRoaXMuYm9hcmRbc3RhcnRSb3cgKyBpXVtzdGFydENvbF0uc2hpcCA9IHNoaXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gW2Nvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSA2NSwgK2Nvb3JkaW5hdGVzLnNsaWNlKDEpIC0gMV07XG4gIH1cblxuICBnZXRDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtjb2wsIHJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiB0aGlzLmJvYXJkW3Jvd11bY29sXTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHRocm93IG5ldyBFcnJvcihcIlJlcGVhdGVkIGNvb3JkaW5hdGVzXCIpO1xuICAgIGlmIChjZWxsLnNoaXApIHtcbiAgICAgIGNlbGwuc2hpcC5oaXQoKTtcbiAgICB9XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uYXR0YWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgaGF2ZUFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5ldmVyeSgocm93KSA9PlxuICAgICAgcm93LmV2ZXJ5KChjZWxsKSA9PiAhY2VsbC5zaGlwIHx8IGNlbGwuc2hpcC5pc1N1bmsoKSksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gKGVsZW1lbnQsIGNvbnRlbnQsIGNsYXNzZXMsIGF0dHJpYnV0ZXMpID0+IHtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgaWYgKGNvbnRlbnQpIGVsZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgY2xhc3Nlcy5zcGxpdChcIiBcIikuZm9yRWFjaCgobXlDbGFzcykgPT4gZWxlLmNsYXNzTGlzdC5hZGQobXlDbGFzcykpO1xuICB9XG4gIGlmIChhdHRyaWJ1dGVzKVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKSA9PlxuICAgICAgZWxlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVbMF0sIGF0dHJpYnV0ZVsxXSksXG4gICAgKTtcbiAgcmV0dXJuIGVsZTtcbn07XG5cbmNvbnN0IHJlbmRlckxpbmtJY29uID0gKG5hbWUsIHZpZXdCb3gsIHBhdGgsIG15Q2xhc3MpID0+IHtcbiAgY29uc3QgaWNvblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICBjb25zdCBpY29uUGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgXCJwYXRoXCIsXG4gICk7XG5cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcbiAgaWNvblN2Zy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgaWNvblN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuXG4gIGljb25QYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgcGF0aCk7XG5cbiAgaWNvblN2Zy5hcHBlbmRDaGlsZChpY29uUGF0aCk7XG5cbiAgaWYgKG5hbWUgPT09IFwicGVuY2lsXCIgfHwgbmFtZSA9PT0gXCJkZWxldGVcIikgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICBpZiAobXlDbGFzcykgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG15Q2xhc3MpO1xuXG4gIHJldHVybiBpY29uU3ZnO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IEFycmF5LmZyb20oQXJyYXkoMTAwKS5maWxsKCksIChfLCBpKSA9PiBpICsgMSk7XG4gIH1cblxuICBhdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hvdE51bWJlciA9IHRoaXMuY29uc3RydWN0b3IuZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIXRoaXMuc2hvdHNBdmFpbGFibGUuaW5jbHVkZXMoc2hvdE51bWJlcikpIHJldHVybiBmYWxzZTtcbiAgICBlbmVteS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gdGhpcy5zaG90c0F2YWlsYWJsZS5maWx0ZXIoKG4pID0+IG4gIT09IHNob3ROdW1iZXIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIGdldE51bWJlckZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIHJldHVybiBjb29yZGluYXRlcy5jaGFyQ29kZUF0KDApIC0gNjQgKyArY29vcmRpbmF0ZXMuc2xpY2UoMSkgKiAxMCAtIDEwO1xuICB9XG5cbiAgc3RhdGljIGdldENvb3JkaW5hdGVzRnJvbU51bWJlcihuKSB7XG4gICAgcmV0dXJuIGAke1N0cmluZy5mcm9tQ2hhckNvZGUoKG4gJSAxMCA9PT0gMCA/IDEwIDogbiAlIDEwKSArIDY0KX0ke1xuICAgICAgTWF0aC5mbG9vcihuIC8gMTApICsgKG4gJSAxMCA9PT0gMCA/IDAgOiAxKVxuICAgIH1gO1xuICB9XG5cbiAgbWFrZVJhbmRvbUF0dGFjayhlbmVteSkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRDb29yZGluYXRlc0Zyb21OdW1iZXIoXG4gICAgICB0aGlzLnNob3RzQXZhaWxhYmxlW1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNob3RzQXZhaWxhYmxlLmxlbmd0aClcbiAgICAgIF0sXG4gICAgKTtcbiAgICB0aGlzLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmJvYXJkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IGV2ZW50cyA9ICgoKSA9PiB7XG4gIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gIGNvbnN0IG9uID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpXG4gICAgICBldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICB9O1xuXG4gIGNvbnN0IG9mZiA9IChldmVudE5hbWUsIGZuKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdW2ldID09PSBmbikge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbWl0ID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSkgcmV0dXJuO1xuICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGZuKSA9PiBmbihkYXRhKSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBvbixcbiAgICBvZmYsXG4gICAgZW1pdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGV2ZW50cztcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkgdGhpcy5oaXRzKys7XG4gICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwbHZoO1xcbn1cXG5cXG5tYWluIHtcXG4gIHdpZHRoOiBtaW4oNzBjaCwgMTAwJSAtIDRyZW0pO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcbn1cXG5mb290ZXIgYSB7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5mb290ZXIgc3ZnIHtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVlbTtcXG4gIG1heC13aWR0aDogMS41ZW07XFxuICBmaWxsOiB3aGl0ZTtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAxZW07XFxufVxcbnNlY3Rpb24gaDIge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuYnV0dG9uOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNvbnRyb2xzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHJvdy1nYXA6IDFlbTtcXG59XFxuLmNvbnRyb2xzIGJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5jb250cm9scyAuZGlzcGxheSB7XFxuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAxZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSkvcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSk7XFxuICBhc3BlY3QtcmF0aW86IDEvMTtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDE4ZW0pIC8gMik7XFxufVxcbi5ib2FyZCAubGFiZWwge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmJvYXJkIC5jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM1NTU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG4uYm9hcmQgLmNlbGwuc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxufVxcbi5ib2FyZCAuY2VsbC5zaGlwLmF0dGFja2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYTMyMzI7XFxufVxcbi5ib2FyZCAuY2VsbC5hdHRhY2tlZDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIidcXFwiO1xcbiAgd2lkdGg6IDAuNWVtO1xcbiAgaGVpZ2h0OiAwLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4ucGxheWVyLnNldHVwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLnBsYXllci5zZXR1cCAuZHVtbXkuYm9hcmQge1xcbiAgcGFkZGluZy1ib3R0b206IDA7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHN2aCAtIDE4ZW0pO1xcbn1cXG4ucGxheWVyLnNldHVwIC5yYW5kb21pemUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQU1BO0VBQ0Usc0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUxGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLCtDQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0UsNkJBQUE7RUFDQSxtQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBekJnQjtFQTBCaEIsWUF2QmE7RUF3QmIsa0JBQUE7RUFDQSxnQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBaENnQjtFQWlDaEIsaUJBQUE7QUFQRjtBQVNFO0VBQ0UsWUFqQ1c7RUFrQ1gscUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0EzQ1c7QUFtQ2Y7O0FBY0E7RUFDRSxlQUFBO0FBWEY7QUFhRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFYSjs7QUFlQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFaRjtBQWNFO0VBQ0UsZUFBQTtBQVpKOztBQWtCQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFmRjtBQWlCRTtFQUNFLDJCQW5GWTtFQW9GWixZQWhGVztBQWlFZjtBQWtCRTtFQUNFLG1CQUFBO0FBaEJKOztBQXNCQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDBFQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQ0FBQTtBQW5CRjtBQXFCRTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQW5CSjtBQXNCRTtFQUNFLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0FBcEJKO0FBc0JJO0VBQ0UsMkJBakhVO0FBNkZoQjtBQXFCTTtFQUNFLHlCQWpIVTtBQThGbEI7QUF1Qkk7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBckJOOztBQTBCQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQXZCRjtBQXlCRTtFQUNFLGlCQUFBO0VBQ0EsK0JBQUE7QUF2Qko7QUEwQkU7RUFDRSw2QkFBQTtBQXhCSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkcHJpbWFyeS1jb2xvcjogc3RlZWxibHVlO1xcbiRzZWNvbmRhcnktY29sb3I6ICM1NTU7XFxuJGhpZ2hsaWdodC1jb2xvcjogI2ZhMzIzMjtcXG4kcHJpbWFyeS1mYzogYmxhY2s7XFxuJHNlY29uZGFyeS1mYzogd2hpdGU7XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLy8gR2VuZXJhbCBsYXlvdXRcXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwbHZoOyAgLy8gVGVzdCBvdGhlciBiZWhhdmlvcnNcXG59XFxuXFxubWFpbiB7XFxuICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSA0cmVtKTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcblxcbiAgYSB7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgICBmaWxsOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcbn1cXG5cXG4vLyBHYW1lIHZpZXdcXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG5cXG4gIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcblxcbmJ1dHRvbiB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgXFxuICAmOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcbn1cXG5cXG4vLyBDb250cm9sc1xcblxcbi5jb250cm9scyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICByb3ctZ2FwOiAxZW07XFxuXFxuICBidXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB9XFxuXFxuICAuZGlzcGxheSB7XFxuICAgIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxuICB9XFxufVxcblxcbi8vIEJvYXJkc1xcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKSAvIHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTsgLy8gVGhlIHBvc2l0aW9uIGlzbid0IHJpZ2h0LiBGaXggaXQgbGF0ZXIuXFxuICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSAvIDIpO1xcblxcbiAgLmxhYmVsIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgfVxcblxcbiAgLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuXFxuICAgICYuc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgICAgJi5hdHRhY2tlZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmLmF0dGFja2VkOjphZnRlciB7XFxuICAgICAgY29udGVudDogXFxcIidcXFwiO1xcbiAgICAgIHdpZHRoOiAwLjVlbTtcXG4gICAgICBoZWlnaHQ6IDAuNWVtO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4ucGxheWVyLnNldHVwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gIC5kdW1teS5ib2FyZCB7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSk7XFxuICB9XFxuXFxuICAucmFuZG9taXplIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIC8vYm9yZGVyOiAxcHggc29saWQgJHByaW1hcnktY29sb3I7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL3B1YnN1YlwiO1xuXG5kb21Db250cm9sbGVyLnJlbmRlclBhZ2VMYXlvdXQoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwicmVuZGVyTGlua0ljb24iLCJQbGF5ZXIiLCJldmVudHMiLCJkb21Db250cm9sbGVyIiwiYm9hcmRzIiwic2V0dXBCb2FyZHMiLCJuZXdCb2FyZHMiLCJnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzIiwicm93IiwiY29sIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZGlzcGxheSIsIm1lc3NhZ2UiLCJ0ZXh0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJzaG93R2FtZU92ZXIiLCJ3aW5uZXIiLCJuYW1lIiwiYXR0YWNrQ2VsbCIsImUiLCJlbWl0IiwidGFyZ2V0IiwiZGF0YXNldCIsImNvb3JkaW5hdGVzIiwicmVuZGVyQm9hcmQiLCJib2FyZCIsInBsYXllciIsImJvYXJkQ29udGFpbmVyIiwiaSIsImNvbExhYmVsIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwicm93TGFiZWwiLCJjZWxsIiwiaiIsImNsYXNzZXMiLCJhdHRhY2tlZCIsInNoaXAiLCJjZWxsRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdGFydEdhbWUiLCJyZW5kZXJDb250cm9scyIsImJ1dHRvbkNsYXNzIiwiYnV0dG9uVGV4dCIsImRpc3BsYXlUZXh0IiwiZm4iLCJyZXN0YXJ0R2FtZSIsImNvbnRyb2xTZWN0aW9uIiwiYnRuIiwidGV4dERpc3BsYXkiLCJyZW5kZXJJbml0aWFsU2NyZWVuIiwibWFpbiIsImNsZWFuRWxlbWVudCIsInBsYXllclNlY3Rpb24iLCJlbmVteVNlY3Rpb24iLCJjb21wdXRlciIsIm9uIiwicGFyZW50IiwiY2hpbGQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInJlbW92ZUNoaWxkIiwidXBkYXRlU2NyZWVuIiwicmVuZGVyUmFuZG9tQm9hcmQiLCJkdW1teVBsYXllciIsImdldEJvYXJkIiwicmFuZG9taXplQnRuIiwicmVuZGVyUGFnZUxheW91dCIsImJvZHkiLCJoZWFkZXIiLCJmb290ZXIiLCJhIiwiZ2FtZUNvbnRyb2xsZXIiLCJhY3RpdmVHYW1lIiwiZ2V0UGxheWVyIiwiZ2V0Q29tcHV0ZXIiLCJpc0Nvb3JkaW5hdGVGcmVlIiwiaXNQb3NpdGlvblZhbGlkIiwic3RhcnQiLCJlbmQiLCJzdGFydENvbCIsInN0YXJ0Um93IiwiY29uc3RydWN0b3IiLCJnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzIiwiZW5kQ29sIiwiZW5kUm93IiwiZGlzdGFuY2UiLCJnZXRSYW5kb21TaGlwUG9zaXRpb24iLCJsZW5ndGgiLCJpbml0aWFsUG9zaXRpb24iLCJmaW5hbFBvc2l0aW9uIiwidmFsaWRQb3NpdGlvbiIsImdldENvb3JkaW5hdGVzRnJvbU51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImRpcmVjdGlvbiIsImNoYXJDb2RlQXQiLCJzbGljZSIsImluaXRpYWxOdW1iZXIiLCJjcmVhdGVQbGF5ZXJTaGlwcyIsInBsYWNlU2hpcCIsImdhbWVPdmVyIiwiY29tcHV0ZXJUdXJuIiwiZW5lbXkiLCJtYWtlUmFuZG9tQXR0YWNrIiwiaGF2ZUFsbFNoaXBzU3VuayIsInBsYXlUdXJuIiwidmFsaWRDb29yZGluYXRlcyIsImF0dGFjayIsInNldHVwR2FtZSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJmaWxsQm9hcmQiLCJwdXNoIiwiZ2V0Q29vcmRpbmF0ZXMiLCJyZWNlaXZlQXR0YWNrIiwiRXJyb3IiLCJoaXQiLCJldmVyeSIsImlzU3VuayIsImVsZW1lbnQiLCJjb250ZW50IiwiYXR0cmlidXRlcyIsImVsZSIsInNwbGl0IiwibXlDbGFzcyIsImF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInZpZXdCb3giLCJwYXRoIiwiaWNvblN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImljb25QYXRoIiwidGl0bGUiLCJzaG90c0F2YWlsYWJsZSIsIkFycmF5IiwiZnJvbSIsImZpbGwiLCJfIiwic2hvdE51bWJlciIsImdldE51bWJlckZyb21Db29yZGluYXRlcyIsImluY2x1ZGVzIiwiZmlsdGVyIiwibiIsImdldE5hbWUiLCJldmVudE5hbWUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJvZmYiLCJzcGxpY2UiLCJkYXRhIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=