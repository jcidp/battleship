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
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("playerAttack", e.target.dataset.coordinates);
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
  function renderInitialScreen() {
    const main = document.querySelector("main");
    const controlSection = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", null, "controls");
    const btn = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", "+ New Game", "new-game");
    btn.addEventListener("click", restartGame);
    controlSection.appendChild(btn);
    const textDisplay = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "display");
    textDisplay.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", "Click on the enemy's board to attack", "display__text"));
    controlSection.appendChild(textDisplay);
    main.appendChild(controlSection);
    const playerSection = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("section");
    playerSection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", "Your Board"));
    playerSection.appendChild(renderBoard(boards.player, "player"));
    main.appendChild(playerSection);
    const enemySection = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("section");
    enemySection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", "Enemy's Board"));
    enemySection.appendChild(renderBoard(boards.computer, "computer"));
    main.appendChild(enemySection);
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("gameOver", showGameOver);
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
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].emit("restartGame");
    updateScreen();
  }
  function renderPageLayout() {
    const body = document.querySelector("body");
    const header = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("header");
    header.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", "Battleship"));
    body.appendChild(header);
    body.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("main"));
    const footer = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer");
    const a = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", "", "", [["href", "https://github.com/jcidp"], ["target", "_blank"]]);
    a.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", "Created by jcidp"));
    a.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.renderLinkIcon)("github", "0 0 24 24", "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"));
    footer.appendChild(a);
    body.appendChild(footer);
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("gameStarted", setupBoards);
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("gameStarted", renderInitialScreen);
    _pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].on("turnEnd", updateScreen);
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
    player.board.placeShip("F2", "J2");
    player.board.placeShip("A4", "D4");
    player.board.placeShip("D6", "F6");
    player.board.placeShip("I4", "I6");
    player.board.placeShip("F9", "G9");
  };
  const gameOver = winner => {
    console.log(`${winner.name} won!`);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 1em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n}\n.controls .new-game {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  background-color: steelblue;\n  color: white;\n  font-weight: bold;\n}\n.controls .display {\n  min-height: 2.25rem;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr))/repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 18em) / 2);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n  display: grid;\n  place-content: center;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}\n.board .cell.ship.attacked {\n  background-color: #fa3232;\n}\n.board .cell.attacked::after {\n  content: \"'\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: black;\n  border-radius: 50%;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,6BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,sBAzBgB;EA0BhB,YAvBa;EAwBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBAhCgB;EAiChB,iBAAA;AAPF;AASE;EACE,YAjCW;EAkCX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WA3CW;AAmCf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAiBA;EACE,aAAA;EACA,uBAAA;EACA,YAAA;AAdF;AAgBE;EACE,kBAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,2BA3EY;EA4EZ,YAxEW;EAyEX,iBAAA;AAdJ;AAiBE;EACE,mBAAA;AAfJ;;AAqBA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;AAlBF;AAoBE;EACE,aAAA;EACA,qBAAA;AAlBJ;AAqBE;EACE,sBAAA;EACA,aAAA;EACA,qBAAA;AAnBJ;AAqBI;EACE,2BA1GU;AAuFhB;AAoBM;EACE,yBA1GU;AAwFlB;AAsBI;EACE,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AApBN","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: #fa3232;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 1em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\n// Controls\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n\n  .new-game {\n    width: fit-content;\n    padding: 0.5em 1em;\n    margin: 0 auto;\n    border-radius: 5px;\n    border: none;\n    background-color: $primary-color;\n    color: $secondary-fc;\n    font-weight: bold;\n  }\n\n  .display {\n    min-height: 2.25rem;\n  }\n}\n\n// Boards\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr)) / repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1 / 1; // The position isn't right. Fix it later.\n  max-height: calc((100svh - 18em) / 2);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n    display: grid;\n    place-content: center;\n\n    &.ship {\n      background-color: $primary-color;\n      &.attacked {\n        background-color: $highlight-color;\n      }\n    }\n\n    &.attacked::after {\n      content: \"'\";\n      width: 0.5em;\n      height: 0.5em;\n      background-color: black;\n      border-radius: 50%;\n    }\n  }\n}"],"sourceRoot":""}]);
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
_modules_game__WEBPACK_IMPORTED_MODULE_2__["default"].setupGame();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNvQjtBQUNFO0FBQ047QUFFdENsRixvREFBYSxDQUFDMEQsZ0JBQWdCLENBQUMsQ0FBQztBQUNoQ00scURBQWMsQ0FBQ2dCLFNBQVMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcHVic3ViLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzPzc1YmEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHJlbmRlckxpbmtJY29uIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBib2FyZHM7XG5cbiAgZnVuY3Rpb24gc2V0dXBCb2FyZHMobmV3Qm9hcmRzKSB7XG4gICAgYm9hcmRzID0gbmV3Qm9hcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhyb3csIGNvbCkge1xuICAgIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbCArIDY1KX0ke3JvdyArIDF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXkobWVzc2FnZSkge1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlfX3RleHRcIik7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93R2FtZU92ZXIod2lubmVyKSB7XG4gICAgZGlzcGxheShgVGhlIGdhbWUgaXMgb3Zlci4gJHt3aW5uZXIubmFtZX0gd29uIWApO1xuICB9XG5cbiAgZnVuY3Rpb24gYXR0YWNrQ2VsbChlKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJwbGF5ZXJBdHRhY2tcIiwgZS50YXJnZXQuZGF0YXNldC5jb29yZGluYXRlcyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCb2FyZChib2FyZCwgcGxheWVyKSB7XG4gICAgY29uc3QgYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGAke3BsYXllcn0gYm9hcmRgKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbExhYmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImxhYmVsIGNvbFwiKTtcbiAgICAgIGNvbExhYmVsLmFwcGVuZENoaWxkKFxuICAgICAgICBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBpID09PSAwID8gXCJcIiA6IFN0cmluZy5mcm9tQ2hhckNvZGUoaSArIDY0KSksXG4gICAgICApO1xuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29sTGFiZWwpO1xuICAgIH1cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIGNvbnN0IHJvd0xhYmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImxhYmVsIHJvd1wiKTtcbiAgICAgIHJvd0xhYmVsLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgKyAxKSk7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dMYWJlbCk7XG4gICAgICByb3cuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBsZXQgY2xhc3NlcyA9IFwiY2VsbFwiO1xuICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCkgY2xhc3NlcyArPSBcIiBhdHRhY2tlZFwiO1xuICAgICAgICBpZiAoY2VsbC5zaGlwICYmIHBsYXllciA9PT0gXCJwbGF5ZXJcIikgY2xhc3NlcyArPSBcIiBzaGlwXCI7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyhpLCBqKTtcbiAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGNsYXNzZXMsIFtcbiAgICAgICAgICBbXCJkYXRhLWNvb3JkaW5hdGVzXCIsIGNvb3JkaW5hdGVzXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGlmIChwbGF5ZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDZWxsKTtcbiAgICAgICAgICBpZiAoY2VsbC5hdHRhY2tlZCAmJiBjZWxsLnNoaXApIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBib2FyZENvbnRhaW5lcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckluaXRpYWxTY3JlZW4oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG4gICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBcImNvbnRyb2xzXCIpO1xuICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCIrIE5ldyBHYW1lXCIsIFwibmV3LWdhbWVcIik7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXN0YXJ0R2FtZSk7XG4gICAgY29udHJvbFNlY3Rpb24uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBjb25zdCB0ZXh0RGlzcGxheSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJkaXNwbGF5XCIpO1xuICAgIHRleHREaXNwbGF5LmFwcGVuZENoaWxkKFxuICAgICAgY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJwXCIsXG4gICAgICAgIFwiQ2xpY2sgb24gdGhlIGVuZW15J3MgYm9hcmQgdG8gYXR0YWNrXCIsXG4gICAgICAgIFwiZGlzcGxheV9fdGV4dFwiLFxuICAgICAgKSxcbiAgICApO1xuICAgIGNvbnRyb2xTZWN0aW9uLmFwcGVuZENoaWxkKHRleHREaXNwbGF5KTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGNvbnRyb2xTZWN0aW9uKTtcblxuICAgIGNvbnN0IHBsYXllclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIllvdXIgQm9hcmRcIikpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLnBsYXllciwgXCJwbGF5ZXJcIikpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxheWVyU2VjdGlvbik7XG5cbiAgICBjb25zdCBlbmVteVNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBlbmVteVNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiRW5lbXkncyBCb2FyZFwiKSk7XG4gICAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGJvYXJkcy5jb21wdXRlciwgXCJjb21wdXRlclwiKSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChlbmVteVNlY3Rpb24pO1xuXG4gICAgZXZlbnRzLm9uKFwiZ2FtZU92ZXJcIiwgc2hvd0dhbWVPdmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFuRWxlbWVudChwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2NyZWVuKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBjbGVhbkVsZW1lbnQobWFpbik7XG4gICAgcmVuZGVySW5pdGlhbFNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgZXZlbnRzLmVtaXQoXCJyZXN0YXJ0R2FtZVwiKTtcbiAgICB1cGRhdGVTY3JlZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclBhZ2VMYXlvdXQoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgxXCIsIFwiQmF0dGxlc2hpcFwiKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgYm9keS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwibWFpblwiKSk7XG5cbiAgICBjb25zdCBmb290ZXIgPSBjcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICAgIGNvbnN0IGEgPSBjcmVhdGVFbGVtZW50KFwiYVwiLCBcIlwiLCBcIlwiLCBbXG4gICAgICBbXCJocmVmXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL2pjaWRwXCJdLFxuICAgICAgW1widGFyZ2V0XCIsIFwiX2JsYW5rXCJdLFxuICAgIF0pO1xuICAgIGEuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInBcIiwgXCJDcmVhdGVkIGJ5IGpjaWRwXCIpKTtcbiAgICBhLmFwcGVuZENoaWxkKFxuICAgICAgcmVuZGVyTGlua0ljb24oXG4gICAgICAgIFwiZ2l0aHViXCIsXG4gICAgICAgIFwiMCAwIDI0IDI0XCIsXG4gICAgICAgIFwiTTEyLDJBMTAsMTAgMCAwLDAgMiwxMkMyLDE2LjQyIDQuODcsMjAuMTcgOC44NCwyMS41QzkuMzQsMjEuNTggOS41LDIxLjI3IDkuNSwyMUM5LjUsMjAuNzcgOS41LDIwLjE0IDkuNSwxOS4zMUM2LjczLDE5LjkxIDYuMTQsMTcuOTcgNi4xNCwxNy45N0M1LjY4LDE2LjgxIDUuMDMsMTYuNSA1LjAzLDE2LjVDNC4xMiwxNS44OCA1LjEsMTUuOSA1LjEsMTUuOUM2LjEsMTUuOTcgNi42MywxNi45MyA2LjYzLDE2LjkzQzcuNSwxOC40NSA4Ljk3LDE4IDkuNTQsMTcuNzZDOS42MywxNy4xMSA5Ljg5LDE2LjY3IDEwLjE3LDE2LjQyQzcuOTUsMTYuMTcgNS42MiwxNS4zMSA1LjYyLDExLjVDNS42MiwxMC4zOSA2LDkuNSA2LjY1LDguNzlDNi41NSw4LjU0IDYuMiw3LjUgNi43NSw2LjE1QzYuNzUsNi4xNSA3LjU5LDUuODggOS41LDcuMTdDMTAuMjksNi45NSAxMS4xNSw2Ljg0IDEyLDYuODRDMTIuODUsNi44NCAxMy43MSw2Ljk1IDE0LjUsNy4xN0MxNi40MSw1Ljg4IDE3LjI1LDYuMTUgMTcuMjUsNi4xNUMxNy44LDcuNSAxNy40NSw4LjU0IDE3LjM1LDguNzlDMTgsOS41IDE4LjM4LDEwLjM5IDE4LjM4LDExLjVDMTguMzgsMTUuMzIgMTYuMDQsMTYuMTYgMTMuODEsMTYuNDFDMTQuMTcsMTYuNzIgMTQuNSwxNy4zMyAxNC41LDE4LjI2QzE0LjUsMTkuNiAxNC41LDIwLjY4IDE0LjUsMjFDMTQuNSwyMS4yNyAxNC42NiwyMS41OSAxNS4xNywyMS41QzE5LjE0LDIwLjE2IDIyLDE2LjQyIDIyLDEyQTEwLDEwIDAgMCwwIDEyLDJaXCIsXG4gICAgICApLFxuICAgICk7XG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGEpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcblxuICAgIGV2ZW50cy5vbihcImdhbWVTdGFydGVkXCIsIHNldHVwQm9hcmRzKTtcbiAgICBldmVudHMub24oXCJnYW1lU3RhcnRlZFwiLCByZW5kZXJJbml0aWFsU2NyZWVuKTtcbiAgICBldmVudHMub24oXCJ0dXJuRW5kXCIsIHVwZGF0ZVNjcmVlbik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbmRlclBhZ2VMYXlvdXQsXG4gICAgcmVuZGVySW5pdGlhbFNjcmVlbixcbiAgICB1cGRhdGVTY3JlZW4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb21Db250cm9sbGVyO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgbGV0IGNvbXB1dGVyO1xuICBsZXQgYWN0aXZlR2FtZSA9IGZhbHNlO1xuXG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcbiAgY29uc3QgZ2V0Q29tcHV0ZXIgPSAoKSA9PiBjb21wdXRlcjtcblxuICBjb25zdCBjcmVhdGVQbGF5ZXJTaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiRjJcIiwgXCJKMlwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiQTRcIiwgXCJENFwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiRDZcIiwgXCJGNlwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiSTRcIiwgXCJJNlwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiRjlcIiwgXCJHOVwiKTtcbiAgfTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICh3aW5uZXIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgJHt3aW5uZXIubmFtZX0gd29uIWApO1xuICAgIGFjdGl2ZUdhbWUgPSBmYWxzZTtcbiAgICBldmVudHMuZW1pdChcImdhbWVPdmVyXCIsIHdpbm5lcik7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15ID0gZ2V0UGxheWVyKCk7XG4gICAgZ2V0Q29tcHV0ZXIoKS5tYWtlUmFuZG9tQXR0YWNrKGVuZW15KTtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG4gICAgaWYgKGVuZW15LmJvYXJkLmhhdmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZ2FtZU92ZXIoZ2V0Q29tcHV0ZXIoKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlUdXJuID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgaWYgKCFhY3RpdmVHYW1lKSByZXR1cm47XG4gICAgY29uc3QgZW5lbXkgPSBnZXRDb21wdXRlcigpO1xuICAgIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSBnZXRQbGF5ZXIoKS5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIXZhbGlkQ29vcmRpbmF0ZXMpIHJldHVybjtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG5cbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRQbGF5ZXIoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbXB1dGVyVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwR2FtZSA9ICgpID0+IHtcbiAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiWW91XCIpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBhY3RpdmVHYW1lID0gdHJ1ZTtcblxuICAgIGNyZWF0ZVBsYXllclNoaXBzKHBsYXllcik7XG4gICAgY3JlYXRlUGxheWVyU2hpcHMoY29tcHV0ZXIpO1xuXG4gICAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgICBldmVudHMuZW1pdChcImdhbWVTdGFydGVkXCIsIHtcbiAgICAgIHBsYXllcjogZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSxcbiAgICAgIGNvbXB1dGVyOiBnZXRDb21wdXRlcigpLmdldEJvYXJkKCksXG4gICAgfSk7XG4gICAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgc2V0dXBHYW1lKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldHVwR2FtZSxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0Q29tcHV0ZXIsXG4gICAgcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jb25zdHJ1Y3Rvci5maWxsQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWxsQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKHsgYXR0YWNrZWQ6IGZhbHNlLCBzaGlwOiBudWxsIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgaWYgKCFlbmQpIHtcbiAgICAgIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sXS5zaGlwID0gbmV3IFNoaXAoMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IFtlbmRDb2wsIGVuZFJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoZW5kKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9XG4gICAgICBzdGFydFJvdyA9PT0gZW5kUm93ID8gZW5kQ29sIC0gc3RhcnRDb2wgKyAxIDogZW5kUm93IC0gc3RhcnRSb3cgKyAxO1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChkaXN0YW5jZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXN0YW5jZTsgaSsrKSB7XG4gICAgICBpZiAoc3RhcnRSb3cgPT09IGVuZFJvdykgdGhpcy5ib2FyZFtzdGFydFJvd11bc3RhcnRDb2wgKyBpXS5zaGlwID0gc2hpcDtcbiAgICAgIGVsc2UgdGhpcy5ib2FyZFtzdGFydFJvdyArIGldW3N0YXJ0Q29sXS5zaGlwID0gc2hpcDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIHJldHVybiBbY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY1LCArY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSAxXTtcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVwZWF0ZWQgY29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKGNlbGwuc2hpcCkge1xuICAgICAgY2VsbC5zaGlwLmhpdCgpO1xuICAgIH1cbiAgICBjb25zdCBbY29sLCByb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5hdHRhY2tlZCA9IHRydWU7XG4gIH1cblxuICBoYXZlQWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmV2ZXJ5KChyb3cpID0+XG4gICAgICByb3cuZXZlcnkoKGNlbGwpID0+ICFjZWxsLnNoaXAgfHwgY2VsbC5zaGlwLmlzU3VuaygpKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY29udGVudCwgY2xhc3NlcywgYXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBpZiAoY29udGVudCkgZWxlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGUuY2xhc3NMaXN0LmFkZChteUNsYXNzKSk7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMpXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKSxcbiAgICApO1xuICByZXR1cm4gZWxlO1xufTtcblxuY29uc3QgcmVuZGVyTGlua0ljb24gPSAobmFtZSwgdmlld0JveCwgcGF0aCwgbXlDbGFzcykgPT4ge1xuICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBcInBhdGhcIixcbiAgKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG5cbiAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBwYXRoKTtcblxuICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcblxuICBpZiAobmFtZSA9PT0gXCJwZW5jaWxcIiB8fCBuYW1lID09PSBcImRlbGV0ZVwiKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIGlmIChteUNsYXNzKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobXlDbGFzcyk7XG5cbiAgcmV0dXJuIGljb25Tdmc7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmZpbGwoKSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBzaG90TnVtYmVyID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdGhpcy5zaG90c0F2YWlsYWJsZS5pbmNsdWRlcyhzaG90TnVtYmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgIGVuZW15LmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgIHRoaXMuc2hvdHNBdmFpbGFibGUgPSB0aGlzLnNob3RzQXZhaWxhYmxlLmZpbHRlcigobikgPT4gbiAhPT0gc2hvdE51bWJlcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSA2NCArICtjb29yZGluYXRlcy5zbGljZSgxKSAqIDEwIC0gMTA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKG4pIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgobiAlIDEwID09PSAwID8gMTAgOiBuICUgMTApICsgNjQpfSR7XG4gICAgICBNYXRoLmZsb29yKG4gLyAxMCkgKyAobiAlIDEwID09PSAwID8gMCA6IDEpXG4gICAgfWA7XG4gIH1cblxuICBtYWtlUmFuZG9tQXR0YWNrKGVuZW15KSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmdldENvb3JkaW5hdGVzRnJvbU51bWJlcihcbiAgICAgIHRoaXMuc2hvdHNBdmFpbGFibGVbXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2hvdHNBdmFpbGFibGUubGVuZ3RoKVxuICAgICAgXSxcbiAgICApO1xuICAgIHRoaXMuYXR0YWNrKGVuZW15LCBjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQuYm9hcmQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgZXZlbnRzID0gKCgpID0+IHtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgY29uc3Qgb24gPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSlcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gIH07XG5cbiAgY29uc3Qgb2ZmID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVtaXQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IGZuKGRhdGEpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBlbWl0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMrKztcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBsdmg7XFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gNHJlbSk7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxufVxcbmZvb3RlciBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbmZvb3RlciBzdmcge1xcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gIGZpbGw6IHdoaXRlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG59XFxuc2VjdGlvbiBoMiB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5jb250cm9scyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICByb3ctZ2FwOiAxZW07XFxufVxcbi5jb250cm9scyAubmV3LWdhbWUge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLmNvbnRyb2xzIC5kaXNwbGF5IHtcXG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKS9yZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMThlbSkgLyAyKTtcXG59XFxuLmJvYXJkIC5sYWJlbCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG4uYm9hcmQgLmNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5ib2FyZCAuY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG59XFxuLmJvYXJkIC5jZWxsLnNoaXAuYXR0YWNrZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhMzIzMjtcXG59XFxuLmJvYXJkIC5jZWxsLmF0dGFja2VkOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiJ1xcXCI7XFxuICB3aWR0aDogMC41ZW07XFxuICBoZWlnaHQ6IDAuNWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQU1BO0VBQ0Usc0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUxGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLCtDQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0UsNkJBQUE7RUFDQSxtQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBekJnQjtFQTBCaEIsWUF2QmE7RUF3QmIsa0JBQUE7RUFDQSxnQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBaENnQjtFQWlDaEIsaUJBQUE7QUFQRjtBQVNFO0VBQ0UsWUFqQ1c7RUFrQ1gscUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0EzQ1c7QUFtQ2Y7O0FBY0E7RUFDRSxlQUFBO0FBWEY7QUFhRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFYSjs7QUFpQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBZEY7QUFnQkU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLDJCQTNFWTtFQTRFWixZQXhFVztFQXlFWCxpQkFBQTtBQWRKO0FBaUJFO0VBQ0UsbUJBQUE7QUFmSjs7QUFxQkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwRUFBQTtFQUNBLGlCQUFBO0VBQ0EscUNBQUE7QUFsQkY7QUFvQkU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFsQko7QUFxQkU7RUFDRSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtBQW5CSjtBQXFCSTtFQUNFLDJCQTFHVTtBQXVGaEI7QUFvQk07RUFDRSx5QkExR1U7QUF3RmxCO0FBc0JJO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQXBCTlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkcHJpbWFyeS1jb2xvcjogc3RlZWxibHVlO1xcbiRzZWNvbmRhcnktY29sb3I6ICM1NTU7XFxuJGhpZ2hsaWdodC1jb2xvcjogI2ZhMzIzMjtcXG4kcHJpbWFyeS1mYzogYmxhY2s7XFxuJHNlY29uZGFyeS1mYzogd2hpdGU7XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLy8gR2VuZXJhbCBsYXlvdXRcXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwbHZoO1xcbn1cXG5cXG5tYWluIHtcXG4gIHdpZHRoOiBtaW4oNzBjaCwgMTAwJSAtIDRyZW0pO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWNvbmRhcnktY29sb3I7XFxuICBjb2xvcjogJHNlY29uZGFyeS1mYztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxuXFxuICBhIHtcXG4gICAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICBzdmcge1xcbiAgICBtYXJnaW4tbGVmdDogMC41ZW07XFxuICAgIG1heC13aWR0aDogMS41ZW07XFxuICAgIGZpbGw6ICRzZWNvbmRhcnktZmM7XFxuICB9XFxufVxcblxcbi8vIEdhbWUgdmlld1xcblxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLXRvcDogMWVtO1xcblxcbiAgaDIge1xcbiAgICBmb250LXNpemU6IDEuMjVyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG59XFxuXFxuLy8gQ29udHJvbHNcXG5cXG4uY29udHJvbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcm93LWdhcDogMWVtO1xcblxcbiAgLm5ldy1nYW1lIHtcXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gIH1cXG5cXG4gIC5kaXNwbGF5IHtcXG4gICAgbWluLWhlaWdodDogMi4yNXJlbTtcXG4gIH1cXG59XFxuXFxuLy8gQm9hcmRzXFxuXFxuLmJvYXJkIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpIC8gcmVwZWF0KDExLCBtaW5tYXgoMTBweCwgMWZyKSk7XFxuICBhc3BlY3QtcmF0aW86IDEgLyAxOyAvLyBUaGUgcG9zaXRpb24gaXNuJ3QgcmlnaHQuIEZpeCBpdCBsYXRlci5cXG4gIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDE4ZW0pIC8gMik7XFxuXFxuICAubGFiZWwge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuXFxuICAuY2VsbCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRzZWNvbmRhcnktY29sb3I7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG4gICAgJi5zaGlwIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcXG4gICAgICAmLmF0dGFja2VkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRoaWdobGlnaHQtY29sb3I7XFxuICAgICAgfVxcbiAgICB9XFxuXFxuICAgICYuYXR0YWNrZWQ6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiJ1xcXCI7XFxuICAgICAgd2lkdGg6IDAuNWVtO1xcbiAgICAgIGhlaWdodDogMC41ZW07XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICB9XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL3B1YnN1YlwiO1xuXG5kb21Db250cm9sbGVyLnJlbmRlclBhZ2VMYXlvdXQoKTtcbmdhbWVDb250cm9sbGVyLnNldHVwR2FtZSgpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJyZW5kZXJMaW5rSWNvbiIsImV2ZW50cyIsImRvbUNvbnRyb2xsZXIiLCJib2FyZHMiLCJzZXR1cEJvYXJkcyIsIm5ld0JvYXJkcyIsImdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMiLCJyb3ciLCJjb2wiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJkaXNwbGF5IiwibWVzc2FnZSIsInRleHQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsInNob3dHYW1lT3ZlciIsIndpbm5lciIsIm5hbWUiLCJhdHRhY2tDZWxsIiwiZSIsImVtaXQiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY29vcmRpbmF0ZXMiLCJyZW5kZXJCb2FyZCIsImJvYXJkIiwicGxheWVyIiwiYm9hcmRDb250YWluZXIiLCJpIiwiY29sTGFiZWwiLCJhcHBlbmRDaGlsZCIsImZvckVhY2giLCJyb3dMYWJlbCIsImNlbGwiLCJqIiwiY2xhc3NlcyIsImF0dGFja2VkIiwic2hpcCIsImNlbGxFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsInJlbmRlckluaXRpYWxTY3JlZW4iLCJtYWluIiwiY29udHJvbFNlY3Rpb24iLCJidG4iLCJyZXN0YXJ0R2FtZSIsInRleHREaXNwbGF5IiwicGxheWVyU2VjdGlvbiIsImVuZW15U2VjdGlvbiIsImNvbXB1dGVyIiwib24iLCJjbGVhbkVsZW1lbnQiLCJwYXJlbnQiLCJjaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJ1cGRhdGVTY3JlZW4iLCJyZW5kZXJQYWdlTGF5b3V0IiwiYm9keSIsImhlYWRlciIsImZvb3RlciIsImEiLCJQbGF5ZXIiLCJnYW1lQ29udHJvbGxlciIsImFjdGl2ZUdhbWUiLCJnZXRQbGF5ZXIiLCJnZXRDb21wdXRlciIsImNyZWF0ZVBsYXllclNoaXBzIiwicGxhY2VTaGlwIiwiZ2FtZU92ZXIiLCJjb25zb2xlIiwibG9nIiwiY29tcHV0ZXJUdXJuIiwiZW5lbXkiLCJtYWtlUmFuZG9tQXR0YWNrIiwiaGF2ZUFsbFNoaXBzU3VuayIsInBsYXlUdXJuIiwidmFsaWRDb29yZGluYXRlcyIsImF0dGFjayIsInNldHVwR2FtZSIsImdldEJvYXJkIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwiZmlsbEJvYXJkIiwicHVzaCIsInN0YXJ0IiwiZW5kIiwic3RhcnRDb2wiLCJzdGFydFJvdyIsImdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMiLCJlbmRDb2wiLCJlbmRSb3ciLCJkaXN0YW5jZSIsImNoYXJDb2RlQXQiLCJzbGljZSIsImdldENvb3JkaW5hdGVzIiwicmVjZWl2ZUF0dGFjayIsIkVycm9yIiwiaGl0IiwiZXZlcnkiLCJpc1N1bmsiLCJlbGVtZW50IiwiY29udGVudCIsImF0dHJpYnV0ZXMiLCJlbGUiLCJsZW5ndGgiLCJzcGxpdCIsIm15Q2xhc3MiLCJhdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ2aWV3Qm94IiwicGF0aCIsImljb25TdmciLCJjcmVhdGVFbGVtZW50TlMiLCJpY29uUGF0aCIsInRpdGxlIiwic2hvdHNBdmFpbGFibGUiLCJBcnJheSIsImZyb20iLCJmaWxsIiwiXyIsInNob3ROdW1iZXIiLCJnZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMiLCJpbmNsdWRlcyIsImZpbHRlciIsIm4iLCJnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZXROYW1lIiwiZXZlbnROYW1lIiwiZm4iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJvZmYiLCJzcGxpY2UiLCJkYXRhIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=