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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 1em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n}\n.controls .new-game {\n  width: fit-content;\n  padding: 0.5em 1em;\n  margin: 0 auto;\n  border-radius: 5px;\n  border: none;\n  background-color: steelblue;\n  color: white;\n  font-weight: bold;\n}\n.controls .display {\n  min-height: 2.25rem;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr))/repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 18em) / 2);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n  display: grid;\n  place-content: center;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}\n.board .cell.ship.attacked {\n  background-color: #fa3232;\n}\n.board .cell.attacked::after {\n  content: \"'\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: black;\n  border-radius: 50%;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,6BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,sBAzBgB;EA0BhB,YAvBa;EAwBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBAhCgB;EAiChB,iBAAA;AAPF;AASE;EACE,YAjCW;EAkCX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WA3CW;AAmCf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAiBA;EACE,aAAA;EACA,uBAAA;EACA,YAAA;AAdF;AAgBE;EACE,kBAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,2BA3EY;EA4EZ,YAxEW;EAyEX,iBAAA;AAdJ;AAiBE;EACE,mBAAA;AAfJ;;AAqBA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;AAlBF;AAoBE;EACE,aAAA;EACA,qBAAA;AAlBJ;AAqBE;EACE,sBAAA;EACA,aAAA;EACA,qBAAA;AAnBJ;AAqBI;EACE,2BA1GU;AAuFhB;AAoBM;EACE,yBA1GU;AAwFlB;AAsBI;EACE,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AApBN","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: #fa3232;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;  // Test other behaviors\n}\n\nmain {\n  width: min(70ch, 100% - 4rem);\n  margin-inline: auto;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 1em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\n// Controls\n\n.controls {\n  display: grid;\n  justify-content: center;\n  row-gap: 1em;\n\n  .new-game {\n    width: fit-content;\n    padding: 0.5em 1em;\n    margin: 0 auto;\n    border-radius: 5px;\n    border: none;\n    background-color: $primary-color;\n    color: $secondary-fc;\n    font-weight: bold;\n  }\n\n  .display {\n    min-height: 2.25rem;\n  }\n}\n\n// Boards\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(10px, 1fr)) / repeat(11, minmax(10px, 1fr));\n  aspect-ratio: 1 / 1; // The position isn't right. Fix it later.\n  max-height: calc((100svh - 18em) / 2);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n    display: grid;\n    place-content: center;\n\n    &.ship {\n      background-color: $primary-color;\n      &.attacked {\n        background-color: $highlight-color;\n      }\n    }\n\n    &.attacked::after {\n      content: \"'\";\n      width: 0.5em;\n      height: 0.5em;\n      background-color: black;\n      border-radius: 50%;\n    }\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ29CO0FBQ0U7QUFDTjtBQUV0QzFHLG9EQUFhLENBQUMwRCxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2hDTSxxREFBYyxDQUFDd0MsU0FBUyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCBkb21Db250cm9sbGVyID0gKCgpID0+IHtcbiAgbGV0IGJvYXJkcztcblxuICBmdW5jdGlvbiBzZXR1cEJvYXJkcyhuZXdCb2FyZHMpIHtcbiAgICBib2FyZHMgPSBuZXdCb2FyZHM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzKHJvdywgY29sKSB7XG4gICAgcmV0dXJuIGAke1N0cmluZy5mcm9tQ2hhckNvZGUoY29sICsgNjUpfSR7cm93ICsgMX1gO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheShtZXNzYWdlKSB7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheV9fdGV4dFwiKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dHYW1lT3Zlcih3aW5uZXIpIHtcbiAgICBkaXNwbGF5KGBUaGUgZ2FtZSBpcyBvdmVyLiAke3dpbm5lci5uYW1lfSB3b24hYCk7XG4gIH1cblxuICBmdW5jdGlvbiBhdHRhY2tDZWxsKGUpIHtcbiAgICBldmVudHMuZW1pdChcInBsYXllckF0dGFja1wiLCBlLnRhcmdldC5kYXRhc2V0LmNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJvYXJkKGJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCBib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgYCR7cGxheWVyfSBib2FyZGApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgY29uc3QgY29sTGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgY29sXCIpO1xuICAgICAgY29sTGFiZWwuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgPT09IDAgPyBcIlwiIDogU3RyaW5nLmZyb21DaGFyQ29kZShpICsgNjQpKSxcbiAgICAgICk7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb2xMYWJlbCk7XG4gICAgfVxuICAgIGJvYXJkLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgY29uc3Qgcm93TGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgcm93XCIpO1xuICAgICAgcm93TGFiZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgaSArIDEpKTtcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0xhYmVsKTtcbiAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gXCJjZWxsXCI7XG4gICAgICAgIGlmIChjZWxsLmF0dGFja2VkKSBjbGFzc2VzICs9IFwiIGF0dGFja2VkXCI7XG4gICAgICAgIGlmIChjZWxsLnNoaXAgJiYgcGxheWVyID09PSBcInBsYXllclwiKSBjbGFzc2VzICs9IFwiIHNoaXBcIjtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzKGksIGopO1xuICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgY2xhc3NlcywgW1xuICAgICAgICAgIFtcImRhdGEtY29vcmRpbmF0ZXNcIiwgY29vcmRpbmF0ZXNdLFxuICAgICAgICBdKTtcbiAgICAgICAgaWYgKHBsYXllciA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGF0dGFja0NlbGwpO1xuICAgICAgICAgIGlmIChjZWxsLmF0dGFja2VkICYmIGNlbGwuc2hpcCkgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJvYXJkQ29udGFpbmVyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySW5pdGlhbFNjcmVlbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgICBjb25zdCBjb250cm9sU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIG51bGwsIFwiY29udHJvbHNcIik7XG4gICAgY29uc3QgYnRuID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBcIisgTmV3IEdhbWVcIiwgXCJuZXctZ2FtZVwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc3RhcnRHYW1lKTtcbiAgICBjb250cm9sU2VjdGlvbi5hcHBlbmRDaGlsZChidG4pO1xuICAgIGNvbnN0IHRleHREaXNwbGF5ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImRpc3BsYXlcIik7XG4gICAgdGV4dERpc3BsYXkuYXBwZW5kQ2hpbGQoXG4gICAgICBjcmVhdGVFbGVtZW50KFxuICAgICAgICBcInBcIixcbiAgICAgICAgXCJDbGljayBvbiB0aGUgZW5lbXkncyBib2FyZCB0byBhdHRhY2tcIixcbiAgICAgICAgXCJkaXNwbGF5X190ZXh0XCIsXG4gICAgICApLFxuICAgICk7XG4gICAgY29udHJvbFNlY3Rpb24uYXBwZW5kQ2hpbGQodGV4dERpc3BsYXkpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoY29udHJvbFNlY3Rpb24pO1xuXG4gICAgY29uc3QgcGxheWVyU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiWW91ciBCb2FyZFwiKSk7XG4gICAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChib2FyZHMucGxheWVyLCBcInBsYXllclwiKSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChwbGF5ZXJTZWN0aW9uKTtcblxuICAgIGNvbnN0IGVuZW15U2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJFbmVteSdzIEJvYXJkXCIpKTtcbiAgICBlbmVteVNlY3Rpb24uYXBwZW5kQ2hpbGQocmVuZGVyQm9hcmQoYm9hcmRzLmNvbXB1dGVyLCBcImNvbXB1dGVyXCIpKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGVuZW15U2VjdGlvbik7XG5cbiAgICBldmVudHMub24oXCJnYW1lT3ZlclwiLCBzaG93R2FtZU92ZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW5FbGVtZW50KHBhcmVudCkge1xuICAgIGxldCBjaGlsZCA9IHBhcmVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICBjaGlsZCA9IHBhcmVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTY3JlZW4oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgIGNsZWFuRWxlbWVudChtYWluKTtcbiAgICByZW5kZXJJbml0aWFsU2NyZWVuKCk7XG4gIH1cblxuICBmdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcbiAgICBldmVudHMuZW1pdChcInJlc3RhcnRHYW1lXCIpO1xuICAgIHVwZGF0ZVNjcmVlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyUGFnZUxheW91dCgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDFcIiwgXCJCYXR0bGVzaGlwXCIpKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpKTtcblxuICAgIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgY29uc3QgYSA9IGNyZWF0ZUVsZW1lbnQoXCJhXCIsIFwiXCIsIFwiXCIsIFtcbiAgICAgIFtcImhyZWZcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vamNpZHBcIl0sXG4gICAgICBbXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIl0sXG4gICAgXSk7XG4gICAgYS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBcIkNyZWF0ZWQgYnkgamNpZHBcIikpO1xuICAgIGEuYXBwZW5kQ2hpbGQoXG4gICAgICByZW5kZXJMaW5rSWNvbihcbiAgICAgICAgXCJnaXRodWJcIixcbiAgICAgICAgXCIwIDAgMjQgMjRcIixcbiAgICAgICAgXCJNMTIsMkExMCwxMCAwIDAsMCAyLDEyQzIsMTYuNDIgNC44NywyMC4xNyA4Ljg0LDIxLjVDOS4zNCwyMS41OCA5LjUsMjEuMjcgOS41LDIxQzkuNSwyMC43NyA5LjUsMjAuMTQgOS41LDE5LjMxQzYuNzMsMTkuOTEgNi4xNCwxNy45NyA2LjE0LDE3Ljk3QzUuNjgsMTYuODEgNS4wMywxNi41IDUuMDMsMTYuNUM0LjEyLDE1Ljg4IDUuMSwxNS45IDUuMSwxNS45QzYuMSwxNS45NyA2LjYzLDE2LjkzIDYuNjMsMTYuOTNDNy41LDE4LjQ1IDguOTcsMTggOS41NCwxNy43NkM5LjYzLDE3LjExIDkuODksMTYuNjcgMTAuMTcsMTYuNDJDNy45NSwxNi4xNyA1LjYyLDE1LjMxIDUuNjIsMTEuNUM1LjYyLDEwLjM5IDYsOS41IDYuNjUsOC43OUM2LjU1LDguNTQgNi4yLDcuNSA2Ljc1LDYuMTVDNi43NSw2LjE1IDcuNTksNS44OCA5LjUsNy4xN0MxMC4yOSw2Ljk1IDExLjE1LDYuODQgMTIsNi44NEMxMi44NSw2Ljg0IDEzLjcxLDYuOTUgMTQuNSw3LjE3QzE2LjQxLDUuODggMTcuMjUsNi4xNSAxNy4yNSw2LjE1QzE3LjgsNy41IDE3LjQ1LDguNTQgMTcuMzUsOC43OUMxOCw5LjUgMTguMzgsMTAuMzkgMTguMzgsMTEuNUMxOC4zOCwxNS4zMiAxNi4wNCwxNi4xNiAxMy44MSwxNi40MUMxNC4xNywxNi43MiAxNC41LDE3LjMzIDE0LjUsMTguMjZDMTQuNSwxOS42IDE0LjUsMjAuNjggMTQuNSwyMUMxNC41LDIxLjI3IDE0LjY2LDIxLjU5IDE1LjE3LDIxLjVDMTkuMTQsMjAuMTYgMjIsMTYuNDIgMjIsMTJBMTAsMTAgMCAwLDAgMTIsMlpcIixcbiAgICAgICksXG4gICAgKTtcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4gICAgZXZlbnRzLm9uKFwiZ2FtZVN0YXJ0ZWRcIiwgc2V0dXBCb2FyZHMpO1xuICAgIGV2ZW50cy5vbihcImdhbWVTdGFydGVkXCIsIHJlbmRlckluaXRpYWxTY3JlZW4pO1xuICAgIGV2ZW50cy5vbihcInR1cm5FbmRcIiwgdXBkYXRlU2NyZWVuKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUGFnZUxheW91dCxcbiAgICByZW5kZXJJbml0aWFsU2NyZWVuLFxuICAgIHVwZGF0ZVNjcmVlbixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbUNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyO1xuICBsZXQgY29tcHV0ZXI7XG4gIGxldCBhY3RpdmVHYW1lID0gZmFsc2U7XG5cbiAgY29uc3QgZ2V0UGxheWVyID0gKCkgPT4gcGxheWVyO1xuICBjb25zdCBnZXRDb21wdXRlciA9ICgpID0+IGNvbXB1dGVyO1xuXG4gIGNvbnN0IGlzQ29vcmRpbmF0ZUZyZWUgPSAoYm9hcmQsIHJvdywgY29sKSA9PiB7XG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXS5zaGlwKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJvdyA+IDAgJiYgYm9hcmRbcm93IC0gMV1bY29sXS5zaGlwKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGNvbCA8IDkgJiYgYm9hcmRbcm93XVtjb2wgKyAxXS5zaGlwKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJvdyA8IDkgJiYgYm9hcmRbcm93ICsgMV1bY29sXS5zaGlwKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGNvbCA+IDAgJiYgYm9hcmRbcm93XVtjb2wgLSAxXS5zaGlwKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgaXNQb3NpdGlvblZhbGlkID0gKGJvYXJkLCBzdGFydCwgZW5kKSA9PiB7XG4gICAgY29uc3QgW3N0YXJ0Q29sLCBzdGFydFJvd10gPVxuICAgICAgYm9hcmQuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgY29uc3QgW2VuZENvbCwgZW5kUm93XSA9IGJvYXJkLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoZW5kKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9XG4gICAgICBzdGFydFJvdyA9PT0gZW5kUm93ID8gZW5kQ29sIC0gc3RhcnRDb2wgKyAxIDogZW5kUm93IC0gc3RhcnRSb3cgKyAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHtcbiAgICAgICAgaWYgKCFpc0Nvb3JkaW5hdGVGcmVlKGJvYXJkLmJvYXJkLCBzdGFydFJvdywgc3RhcnRDb2wgKyBpKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFpc0Nvb3JkaW5hdGVGcmVlKGJvYXJkLmJvYXJkLCBzdGFydFJvdyArIGksIHN0YXJ0Q29sKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGdldFJhbmRvbVNoaXBQb3NpdGlvbiA9IChwbGF5ZXIsIGxlbmd0aCkgPT4ge1xuICAgIGxldCBpbml0aWFsUG9zaXRpb247XG4gICAgbGV0IGZpbmFsUG9zaXRpb247XG4gICAgbGV0IHZhbGlkUG9zaXRpb24gPSBmYWxzZTtcbiAgICB3aGlsZSAoIXZhbGlkUG9zaXRpb24pIHtcbiAgICAgIGluaXRpYWxQb3NpdGlvbiA9IFBsYXllci5nZXRDb29yZGluYXRlc0Zyb21OdW1iZXIoXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIGZpbmFsUG9zaXRpb24gPVxuICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgICAgICBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDEgPD0gNzRcbiAgICAgICAgICAgICAgPyBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSArIGxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgOiBpbml0aWFsUG9zaXRpb24uY2hhckNvZGVBdCgwKSAtIGxlbmd0aCArIDEsXG4gICAgICAgICAgKSArIGluaXRpYWxQb3NpdGlvbi5zbGljZSgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxOdW1iZXIgPSAraW5pdGlhbFBvc2l0aW9uLnNsaWNlKDEpO1xuICAgICAgICBmaW5hbFBvc2l0aW9uID1cbiAgICAgICAgICBpbml0aWFsUG9zaXRpb25bMF0gK1xuICAgICAgICAgIChpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMSA8PSAxMFxuICAgICAgICAgICAgPyBpbml0aWFsTnVtYmVyICsgbGVuZ3RoIC0gMVxuICAgICAgICAgICAgOiBpbml0aWFsTnVtYmVyIC0gbGVuZ3RoICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGluaXRpYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApID4gZmluYWxQb3NpdGlvbi5jaGFyQ29kZUF0KDApIHx8XG4gICAgICAgICtpbml0aWFsUG9zaXRpb24uc2xpY2UoMSkgPiArZmluYWxQb3NpdGlvbi5zbGljZSgxKVxuICAgICAgKSB7XG4gICAgICAgIFtpbml0aWFsUG9zaXRpb24sIGZpbmFsUG9zaXRpb25dID0gW2ZpbmFsUG9zaXRpb24sIGluaXRpYWxQb3NpdGlvbl07XG4gICAgICB9XG4gICAgICB2YWxpZFBvc2l0aW9uID0gaXNQb3NpdGlvblZhbGlkKFxuICAgICAgICBwbGF5ZXIuYm9hcmQsXG4gICAgICAgIGluaXRpYWxQb3NpdGlvbixcbiAgICAgICAgZmluYWxQb3NpdGlvbixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBbaW5pdGlhbFBvc2l0aW9uLCBmaW5hbFBvc2l0aW9uXTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQbGF5ZXJTaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKC4uLmdldFJhbmRvbVNoaXBQb3NpdGlvbihwbGF5ZXIsIDUpKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKC4uLmdldFJhbmRvbVNoaXBQb3NpdGlvbihwbGF5ZXIsIDQpKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKC4uLmdldFJhbmRvbVNoaXBQb3NpdGlvbihwbGF5ZXIsIDMpKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKC4uLmdldFJhbmRvbVNoaXBQb3NpdGlvbihwbGF5ZXIsIDMpKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKC4uLmdldFJhbmRvbVNoaXBQb3NpdGlvbihwbGF5ZXIsIDIpKTtcbiAgfTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICh3aW5uZXIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgJHt3aW5uZXIubmFtZX0gd29uIWApO1xuICAgIGFjdGl2ZUdhbWUgPSBmYWxzZTtcbiAgICBldmVudHMuZW1pdChcImdhbWVPdmVyXCIsIHdpbm5lcik7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15ID0gZ2V0UGxheWVyKCk7XG4gICAgZ2V0Q29tcHV0ZXIoKS5tYWtlUmFuZG9tQXR0YWNrKGVuZW15KTtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG4gICAgaWYgKGVuZW15LmJvYXJkLmhhdmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZ2FtZU92ZXIoZ2V0Q29tcHV0ZXIoKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlUdXJuID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgaWYgKCFhY3RpdmVHYW1lKSByZXR1cm47XG4gICAgY29uc3QgZW5lbXkgPSBnZXRDb21wdXRlcigpO1xuICAgIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSBnZXRQbGF5ZXIoKS5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIXZhbGlkQ29vcmRpbmF0ZXMpIHJldHVybjtcbiAgICBldmVudHMuZW1pdChcInR1cm5FbmRcIik7XG5cbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRQbGF5ZXIoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbXB1dGVyVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwR2FtZSA9ICgpID0+IHtcbiAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiWW91XCIpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcIlRoZSBlbmVteVwiKTtcbiAgICBhY3RpdmVHYW1lID0gdHJ1ZTtcblxuICAgIGNyZWF0ZVBsYXllclNoaXBzKHBsYXllcik7XG4gICAgY3JlYXRlUGxheWVyU2hpcHMoY29tcHV0ZXIpO1xuXG4gICAgZXZlbnRzLm9uKFwicGxheWVyQXR0YWNrXCIsIHBsYXlUdXJuKTtcbiAgICBldmVudHMuZW1pdChcImdhbWVTdGFydGVkXCIsIHtcbiAgICAgIHBsYXllcjogZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSxcbiAgICAgIGNvbXB1dGVyOiBnZXRDb21wdXRlcigpLmdldEJvYXJkKCksXG4gICAgfSk7XG4gICAgZXZlbnRzLm9uKFwicmVzdGFydEdhbWVcIiwgc2V0dXBHYW1lKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldHVwR2FtZSxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0Q29tcHV0ZXIsXG4gICAgcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jb25zdHJ1Y3Rvci5maWxsQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWxsQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKHsgYXR0YWNrZWQ6IGZhbHNlLCBzaGlwOiBudWxsIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgaWYgKCFlbmQpIHtcbiAgICAgIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sXS5zaGlwID0gbmV3IFNoaXAoMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IFtlbmRDb2wsIGVuZFJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoZW5kKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9XG4gICAgICBzdGFydFJvdyA9PT0gZW5kUm93ID8gZW5kQ29sIC0gc3RhcnRDb2wgKyAxIDogZW5kUm93IC0gc3RhcnRSb3cgKyAxO1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChkaXN0YW5jZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXN0YW5jZTsgaSsrKSB7XG4gICAgICBpZiAoc3RhcnRSb3cgPT09IGVuZFJvdykgdGhpcy5ib2FyZFtzdGFydFJvd11bc3RhcnRDb2wgKyBpXS5zaGlwID0gc2hpcDtcbiAgICAgIGVsc2UgdGhpcy5ib2FyZFtzdGFydFJvdyArIGldW3N0YXJ0Q29sXS5zaGlwID0gc2hpcDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIHJldHVybiBbY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY1LCArY29vcmRpbmF0ZXMuc2xpY2UoMSkgLSAxXTtcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVwZWF0ZWQgY29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKGNlbGwuc2hpcCkge1xuICAgICAgY2VsbC5zaGlwLmhpdCgpO1xuICAgIH1cbiAgICBjb25zdCBbY29sLCByb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5hdHRhY2tlZCA9IHRydWU7XG4gIH1cblxuICBoYXZlQWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmV2ZXJ5KChyb3cpID0+XG4gICAgICByb3cuZXZlcnkoKGNlbGwpID0+ICFjZWxsLnNoaXAgfHwgY2VsbC5zaGlwLmlzU3VuaygpKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY29udGVudCwgY2xhc3NlcywgYXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBpZiAoY29udGVudCkgZWxlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGUuY2xhc3NMaXN0LmFkZChteUNsYXNzKSk7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMpXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKSxcbiAgICApO1xuICByZXR1cm4gZWxlO1xufTtcblxuY29uc3QgcmVuZGVyTGlua0ljb24gPSAobmFtZSwgdmlld0JveCwgcGF0aCwgbXlDbGFzcykgPT4ge1xuICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBcInBhdGhcIixcbiAgKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG5cbiAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBwYXRoKTtcblxuICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcblxuICBpZiAobmFtZSA9PT0gXCJwZW5jaWxcIiB8fCBuYW1lID09PSBcImRlbGV0ZVwiKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIGlmIChteUNsYXNzKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobXlDbGFzcyk7XG5cbiAgcmV0dXJuIGljb25Tdmc7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmZpbGwoKSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBzaG90TnVtYmVyID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXROdW1iZXJGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIGlmICghdGhpcy5zaG90c0F2YWlsYWJsZS5pbmNsdWRlcyhzaG90TnVtYmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgIGVuZW15LmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgIHRoaXMuc2hvdHNBdmFpbGFibGUgPSB0aGlzLnNob3RzQXZhaWxhYmxlLmZpbHRlcigobikgPT4gbiAhPT0gc2hvdE51bWJlcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSA2NCArICtjb29yZGluYXRlcy5zbGljZSgxKSAqIDEwIC0gMTA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKG4pIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgobiAlIDEwID09PSAwID8gMTAgOiBuICUgMTApICsgNjQpfSR7XG4gICAgICBNYXRoLmZsb29yKG4gLyAxMCkgKyAobiAlIDEwID09PSAwID8gMCA6IDEpXG4gICAgfWA7XG4gIH1cblxuICBtYWtlUmFuZG9tQXR0YWNrKGVuZW15KSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmdldENvb3JkaW5hdGVzRnJvbU51bWJlcihcbiAgICAgIHRoaXMuc2hvdHNBdmFpbGFibGVbXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2hvdHNBdmFpbGFibGUubGVuZ3RoKVxuICAgICAgXSxcbiAgICApO1xuICAgIHRoaXMuYXR0YWNrKGVuZW15LCBjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQuYm9hcmQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgZXZlbnRzID0gKCgpID0+IHtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgY29uc3Qgb24gPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSlcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gIH07XG5cbiAgY29uc3Qgb2ZmID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVtaXQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IGZuKGRhdGEpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBlbWl0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMrKztcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBsdmg7XFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gNHJlbSk7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxufVxcbmZvb3RlciBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbmZvb3RlciBzdmcge1xcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gIGZpbGw6IHdoaXRlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG59XFxuc2VjdGlvbiBoMiB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5jb250cm9scyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICByb3ctZ2FwOiAxZW07XFxufVxcbi5jb250cm9scyAubmV3LWdhbWUge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLmNvbnRyb2xzIC5kaXNwbGF5IHtcXG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKS9yZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMThlbSkgLyAyKTtcXG59XFxuLmJvYXJkIC5sYWJlbCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG4uYm9hcmQgLmNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5ib2FyZCAuY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHN0ZWVsYmx1ZTtcXG59XFxuLmJvYXJkIC5jZWxsLnNoaXAuYXR0YWNrZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhMzIzMjtcXG59XFxuLmJvYXJkIC5jZWxsLmF0dGFja2VkOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiJ1xcXCI7XFxuICB3aWR0aDogMC41ZW07XFxuICBoZWlnaHQ6IDAuNWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQU1BO0VBQ0Usc0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUxGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLCtDQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0UsNkJBQUE7RUFDQSxtQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBekJnQjtFQTBCaEIsWUF2QmE7RUF3QmIsa0JBQUE7RUFDQSxnQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBaENnQjtFQWlDaEIsaUJBQUE7QUFQRjtBQVNFO0VBQ0UsWUFqQ1c7RUFrQ1gscUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0EzQ1c7QUFtQ2Y7O0FBY0E7RUFDRSxlQUFBO0FBWEY7QUFhRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFYSjs7QUFpQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBZEY7QUFnQkU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLDJCQTNFWTtFQTRFWixZQXhFVztFQXlFWCxpQkFBQTtBQWRKO0FBaUJFO0VBQ0UsbUJBQUE7QUFmSjs7QUFxQkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwRUFBQTtFQUNBLGlCQUFBO0VBQ0EscUNBQUE7QUFsQkY7QUFvQkU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFsQko7QUFxQkU7RUFDRSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtBQW5CSjtBQXFCSTtFQUNFLDJCQTFHVTtBQXVGaEI7QUFvQk07RUFDRSx5QkExR1U7QUF3RmxCO0FBc0JJO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQXBCTlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkcHJpbWFyeS1jb2xvcjogc3RlZWxibHVlO1xcbiRzZWNvbmRhcnktY29sb3I6ICM1NTU7XFxuJGhpZ2hsaWdodC1jb2xvcjogI2ZhMzIzMjtcXG4kcHJpbWFyeS1mYzogYmxhY2s7XFxuJHNlY29uZGFyeS1mYzogd2hpdGU7XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLy8gR2VuZXJhbCBsYXlvdXRcXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwbHZoOyAgLy8gVGVzdCBvdGhlciBiZWhhdmlvcnNcXG59XFxuXFxubWFpbiB7XFxuICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSA0cmVtKTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcblxcbiAgYSB7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgICBmaWxsOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcbn1cXG5cXG4vLyBHYW1lIHZpZXdcXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG5cXG4gIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcblxcbi8vIENvbnRyb2xzXFxuXFxuLmNvbnRyb2xzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHJvdy1nYXA6IDFlbTtcXG5cXG4gIC5uZXctZ2FtZSB7XFxuICAgIHdpZHRoOiBmaXQtY29udGVudDtcXG4gICAgcGFkZGluZzogMC41ZW0gMWVtO1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xcbiAgICBjb2xvcjogJHNlY29uZGFyeS1mYztcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB9XFxuXFxuICAuZGlzcGxheSB7XFxuICAgIG1pbi1oZWlnaHQ6IDIuMjVyZW07XFxuICB9XFxufVxcblxcbi8vIEJvYXJkc1xcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgxMHB4LCAxZnIpKSAvIHJlcGVhdCgxMSwgbWlubWF4KDEwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTsgLy8gVGhlIHBvc2l0aW9uIGlzbid0IHJpZ2h0LiBGaXggaXQgbGF0ZXIuXFxuICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxOGVtKSAvIDIpO1xcblxcbiAgLmxhYmVsIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgfVxcblxcbiAgLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuXFxuICAgICYuc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgICAgJi5hdHRhY2tlZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmLmF0dGFja2VkOjphZnRlciB7XFxuICAgICAgY29udGVudDogXFxcIidcXFwiO1xcbiAgICAgIHdpZHRoOiAwLjVlbTtcXG4gICAgICBoZWlnaHQ6IDAuNWVtO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgfVxcbiAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuc2Nzc1wiO1xuaW1wb3J0IGRvbUNvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcbmltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vbW9kdWxlcy9wdWJzdWJcIjtcblxuZG9tQ29udHJvbGxlci5yZW5kZXJQYWdlTGF5b3V0KCk7XG5nYW1lQ29udHJvbGxlci5zZXR1cEdhbWUoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwicmVuZGVyTGlua0ljb24iLCJldmVudHMiLCJkb21Db250cm9sbGVyIiwiYm9hcmRzIiwic2V0dXBCb2FyZHMiLCJuZXdCb2FyZHMiLCJnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzIiwicm93IiwiY29sIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZGlzcGxheSIsIm1lc3NhZ2UiLCJ0ZXh0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJzaG93R2FtZU92ZXIiLCJ3aW5uZXIiLCJuYW1lIiwiYXR0YWNrQ2VsbCIsImUiLCJlbWl0IiwidGFyZ2V0IiwiZGF0YXNldCIsImNvb3JkaW5hdGVzIiwicmVuZGVyQm9hcmQiLCJib2FyZCIsInBsYXllciIsImJvYXJkQ29udGFpbmVyIiwiaSIsImNvbExhYmVsIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwicm93TGFiZWwiLCJjZWxsIiwiaiIsImNsYXNzZXMiLCJhdHRhY2tlZCIsInNoaXAiLCJjZWxsRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW5kZXJJbml0aWFsU2NyZWVuIiwibWFpbiIsImNvbnRyb2xTZWN0aW9uIiwiYnRuIiwicmVzdGFydEdhbWUiLCJ0ZXh0RGlzcGxheSIsInBsYXllclNlY3Rpb24iLCJlbmVteVNlY3Rpb24iLCJjb21wdXRlciIsIm9uIiwiY2xlYW5FbGVtZW50IiwicGFyZW50IiwiY2hpbGQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInJlbW92ZUNoaWxkIiwidXBkYXRlU2NyZWVuIiwicmVuZGVyUGFnZUxheW91dCIsImJvZHkiLCJoZWFkZXIiLCJmb290ZXIiLCJhIiwiUGxheWVyIiwiZ2FtZUNvbnRyb2xsZXIiLCJhY3RpdmVHYW1lIiwiZ2V0UGxheWVyIiwiZ2V0Q29tcHV0ZXIiLCJpc0Nvb3JkaW5hdGVGcmVlIiwiaXNQb3NpdGlvblZhbGlkIiwic3RhcnQiLCJlbmQiLCJzdGFydENvbCIsInN0YXJ0Um93IiwiY29uc3RydWN0b3IiLCJnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzIiwiZW5kQ29sIiwiZW5kUm93IiwiZGlzdGFuY2UiLCJnZXRSYW5kb21TaGlwUG9zaXRpb24iLCJsZW5ndGgiLCJpbml0aWFsUG9zaXRpb24iLCJmaW5hbFBvc2l0aW9uIiwidmFsaWRQb3NpdGlvbiIsImdldENvb3JkaW5hdGVzRnJvbU51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImRpcmVjdGlvbiIsImNoYXJDb2RlQXQiLCJzbGljZSIsImluaXRpYWxOdW1iZXIiLCJjcmVhdGVQbGF5ZXJTaGlwcyIsInBsYWNlU2hpcCIsImdhbWVPdmVyIiwiY29uc29sZSIsImxvZyIsImNvbXB1dGVyVHVybiIsImVuZW15IiwibWFrZVJhbmRvbUF0dGFjayIsImhhdmVBbGxTaGlwc1N1bmsiLCJwbGF5VHVybiIsInZhbGlkQ29vcmRpbmF0ZXMiLCJhdHRhY2siLCJzZXR1cEdhbWUiLCJnZXRCb2FyZCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJmaWxsQm9hcmQiLCJwdXNoIiwiZ2V0Q29vcmRpbmF0ZXMiLCJyZWNlaXZlQXR0YWNrIiwiRXJyb3IiLCJoaXQiLCJldmVyeSIsImlzU3VuayIsImVsZW1lbnQiLCJjb250ZW50IiwiYXR0cmlidXRlcyIsImVsZSIsInNwbGl0IiwibXlDbGFzcyIsImF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInZpZXdCb3giLCJwYXRoIiwiaWNvblN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImljb25QYXRoIiwidGl0bGUiLCJzaG90c0F2YWlsYWJsZSIsIkFycmF5IiwiZnJvbSIsImZpbGwiLCJfIiwic2hvdE51bWJlciIsImdldE51bWJlckZyb21Db29yZGluYXRlcyIsImluY2x1ZGVzIiwiZmlsdGVyIiwibiIsImdldE5hbWUiLCJldmVudE5hbWUiLCJmbiIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm9mZiIsInNwbGljZSIsImRhdGEiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==