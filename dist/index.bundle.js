/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderInitialScreen: function() { return /* binding */ renderInitialScreen; },
/* harmony export */   renderPageLayout: function() { return /* binding */ renderPageLayout; }
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/modules/game.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/modules/helpers.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pubsub */ "./src/modules/pubsub.js");



function renderPageLayout() {
  const body = document.querySelector("body");
  const header = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("header");
  header.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("h1", "Battleship"));
  body.appendChild(header);
  body.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("main"));
  const footer = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("footer");
  const a = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", "", "", [["href", "https://github.com/jcidp"], ["target", "_blank"]]);
  a.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", "Created by jcidp"));
  a.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.renderLinkIcon)("github", "0 0 24 24", "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"));
  footer.appendChild(a);
  body.appendChild(footer);
}
function getCoordinatesFromIndexes(row, col) {
  return `${String.fromCharCode(col + 65)}${row + 1}`;
}
function renderBoard(board, player) {
  const boardContainer = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, `${player} board`);
  for (let i = 0; i < 11; i++) {
    const colLabel = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, "label col");
    colLabel.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", i === 0 ? "" : String.fromCharCode(i + 64)));
    boardContainer.appendChild(colLabel);
  }
  board.forEach((row, i) => {
    const rowLabel = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, "label row");
    rowLabel.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", i + 1));
    boardContainer.appendChild(rowLabel);
    row.forEach((cell, j) => {
      let classes = "cell";
      if (cell.attacked) classes += " attacked";
      if (cell.ship) classes += " ship";
      const coordinates = getCoordinatesFromIndexes(i, j);
      boardContainer.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, classes, [["data-coordinates", coordinates]]));
    });
  });
  return boardContainer;
}
function renderInitialScreen() {
  const playerBoard = _game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayer().getBoard();
  const computerBoard = _game__WEBPACK_IMPORTED_MODULE_0__["default"].getComputer().getBoard();
  const main = document.querySelector("main");
  const playerSection = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("section");
  playerSection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", "Player's Board"));
  playerSection.appendChild(renderBoard(playerBoard, "player"));
  main.appendChild(playerSection);
  const enemySection = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("section");
  enemySection.appendChild((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", "Computer's Board"));
  enemySection.appendChild(renderBoard(computerBoard, "computer"));
  main.appendChild(enemySection);
}


/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");

const gameController = (() => {
  let player;
  let computer;
  const getPlayer = () => player;
  const getComputer = () => computer;
  const createPlayerShips = player => {
    player.board.placeShip("F2", "J2");
    player.board.placeShip("A4", "D4");
    player.board.placeShip("D6", "F6");
    player.board.placeShip("I4", "I6");
    player.board.placeShip("F9", "G9");
  };
  const setupGame = () => {
    player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("player1");
    computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("computer");
    createPlayerShips(player);
    createPlayerShips(computer);
  };
  const gameOver = winner => {
    console.log(`${winner.name} has won!`);
    return winner;
  };
  const computerTurn = () => {
    const enemy = getPlayer();
    getComputer().makeRandomAttack(enemy);
    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getPlayer());
    }
  };
  const playTurn = coordinates => {
    const enemy = getComputer();
    getPlayer().attack(enemy, coordinates);
    if (enemy.board.haveAllShipsSunk()) {
      gameOver(getPlayer());
      return;
    }
    computerTurn();
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
    return [coordinates.charCodeAt(0) - 65, +coordinates[1] - 1];
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
    if (!this.shotsAvailable.includes(shotNumber)) return;
    enemy.board.receiveAttack(coordinates);
    this.shotsAvailable = this.shotsAvailable.filter(n => n !== shotNumber);
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
    events[eventName].forEach(fn => fn[data]);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;\n}\n\nheader {\n  background-color: #555;\n  color: white;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: #555;\n  padding: 0.25em 0;\n}\nfooter a {\n  color: white;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nfooter svg {\n  margin-left: 0.5em;\n  max-width: 1.5em;\n  fill: white;\n}\n\nsection {\n  margin-top: 2em;\n}\nsection h2 {\n  font-size: 1.25rem;\n  text-align: center;\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(30px, 1fr))/repeat(11, minmax(30px, 1fr));\n  aspect-ratio: 1/1;\n  max-height: calc((100svh - 10em) / 2);\n}\n.board .label {\n  display: grid;\n  place-content: center;\n}\n.board .cell {\n  border: 1px solid #555;\n}\n.board .cell.ship {\n  background-color: steelblue;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;AALF;;AAUA;EACE,aAAA;EACA,+CAAA;EACA,cAAA;AAPF;;AAUA;EACE,sBApBgB;EAqBhB,YAlBa;EAmBb,kBAAA;EACA,gBAAA;AAPF;;AAUA;EACE,sBA3BgB;EA4BhB,iBAAA;AAPF;AASE;EACE,YA5BW;EA6BX,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;AAUE;EACE,kBAAA;EACA,gBAAA;EACA,WAtCW;AA8Bf;;AAcA;EACE,eAAA;AAXF;AAaE;EACE,kBAAA;EACA,kBAAA;AAXJ;;AAeA;EACE,cAAA;EACA,YAAA;EACA,aAAA;EACA,0EAAA;EACA,iBAAA;EACA,qCAAA;AAZF;AAcE;EACE,aAAA;EACA,qBAAA;AAZJ;AAeE;EACE,sBAAA;AAbJ;AAeI;EACE,2BA1EU;AA6DhB","sourcesContent":["$primary-color: steelblue;\n$secondary-color: #555;\n$highlight-color: purple;\n$primary-fc: black;\n$secondary-fc: white;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n// General layout\n\nbody {\n  display: grid;\n  grid-template-rows: max-content 1fr max-content;\n  height: 100lvh;\n}\n\nheader {\n  background-color: $secondary-color;\n  color: $secondary-fc;\n  text-align: center;\n  padding: 0.5em 0;\n}\n\nfooter {\n  background-color: $secondary-color;\n  padding: 0.25em 0;\n\n  a {\n    color: $secondary-fc;\n    text-decoration: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  svg {\n    margin-left: 0.5em;\n    max-width: 1.5em;\n    fill: $secondary-fc;\n  }\n}\n\n// Game view\n\nsection {\n  margin-top: 2em;\n\n  h2 {\n    font-size: 1.25rem;\n    text-align: center;\n  }\n}\n\n.board {\n  margin: 0 auto;\n  padding: 1em;\n  display: grid;\n  grid-template: repeat(11, minmax(30px, 1fr)) / repeat(11, minmax(30px, 1fr));\n  aspect-ratio: 1 / 1;\n  max-height: calc((100svh - 10em) / 2);\n\n  .label {\n    display: grid;\n    place-content: center;\n  }\n\n  .cell {\n    border: 1px solid $secondary-color;\n\n    &.ship {\n      background-color: $primary-color;\n    }\n  }\n}"],"sourceRoot":""}]);
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




(0,_modules_dom__WEBPACK_IMPORTED_MODULE_1__.renderPageLayout)();
_modules_game__WEBPACK_IMPORTED_MODULE_2__["default"].setupGame();
(0,_modules_dom__WEBPACK_IMPORTED_MODULE_1__.renderInitialScreen)();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFvQztBQUNzQjtBQUM1QjtBQUU5QixTQUFTSSxnQkFBZ0JBLENBQUEsRUFBRztFQUMxQixNQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztFQUUzQyxNQUFNQyxNQUFNLEdBQUdQLHVEQUFhLENBQUMsUUFBUSxDQUFDO0VBQ3RDTyxNQUFNLENBQUNDLFdBQVcsQ0FBQ1IsdURBQWEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7RUFDckRJLElBQUksQ0FBQ0ksV0FBVyxDQUFDRCxNQUFNLENBQUM7RUFFeEJILElBQUksQ0FBQ0ksV0FBVyxDQUFDUix1REFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBRXZDLE1BQU1TLE1BQU0sR0FBR1QsdURBQWEsQ0FBQyxRQUFRLENBQUM7RUFDdEMsTUFBTVUsQ0FBQyxHQUFHVix1REFBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ25DLENBQUMsTUFBTSxFQUFFLDBCQUEwQixDQUFDLEVBQ3BDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUNyQixDQUFDO0VBQ0ZVLENBQUMsQ0FBQ0YsV0FBVyxDQUFDUix1REFBYSxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0VBQ3JEVSxDQUFDLENBQUNGLFdBQVcsQ0FDWFAsd0RBQWMsQ0FDWixRQUFRLEVBQ1IsV0FBVyxFQUNYLDZ1QkFDRixDQUNGLENBQUM7RUFDRFEsTUFBTSxDQUFDRCxXQUFXLENBQUNFLENBQUMsQ0FBQztFQUNyQk4sSUFBSSxDQUFDSSxXQUFXLENBQUNDLE1BQU0sQ0FBQztBQUMxQjtBQUVBLFNBQVNFLHlCQUF5QkEsQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7RUFDM0MsT0FBUSxHQUFFQyxNQUFNLENBQUNDLFlBQVksQ0FBQ0YsR0FBRyxHQUFHLEVBQUUsQ0FBRSxHQUFFRCxHQUFHLEdBQUcsQ0FBRSxFQUFDO0FBQ3JEO0FBRUEsU0FBU0ksV0FBV0EsQ0FBQ0MsS0FBSyxFQUFFQyxNQUFNLEVBQUU7RUFDbEMsTUFBTUMsY0FBYyxHQUFHbkIsdURBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFHLEdBQUVrQixNQUFPLFFBQU8sQ0FBQztFQUNwRSxLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzNCLE1BQU1DLFFBQVEsR0FBR3JCLHVEQUFhLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUM7SUFDeERxQixRQUFRLENBQUNiLFdBQVcsQ0FDbEJSLHVEQUFhLENBQUMsTUFBTSxFQUFFb0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUdOLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQ2xFLENBQUM7SUFDREQsY0FBYyxDQUFDWCxXQUFXLENBQUNhLFFBQVEsQ0FBQztFQUN0QztFQUNBSixLQUFLLENBQUNLLE9BQU8sQ0FBQyxDQUFDVixHQUFHLEVBQUVRLENBQUMsS0FBSztJQUN4QixNQUFNRyxRQUFRLEdBQUd2Qix1REFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO0lBQ3hEdUIsUUFBUSxDQUFDZixXQUFXLENBQUNSLHVEQUFhLENBQUMsTUFBTSxFQUFFb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xERCxjQUFjLENBQUNYLFdBQVcsQ0FBQ2UsUUFBUSxDQUFDO0lBQ3BDWCxHQUFHLENBQUNVLE9BQU8sQ0FBQyxDQUFDRSxJQUFJLEVBQUVDLENBQUMsS0FBSztNQUN2QixJQUFJQyxPQUFPLEdBQUcsTUFBTTtNQUNwQixJQUFJRixJQUFJLENBQUNHLFFBQVEsRUFBRUQsT0FBTyxJQUFJLFdBQVc7TUFDekMsSUFBSUYsSUFBSSxDQUFDSSxJQUFJLEVBQUVGLE9BQU8sSUFBSSxPQUFPO01BQ2pDLE1BQU1HLFdBQVcsR0FBR2xCLHlCQUF5QixDQUFDUyxDQUFDLEVBQUVLLENBQUMsQ0FBQztNQUNuRE4sY0FBYyxDQUFDWCxXQUFXLENBQ3hCUix1REFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUwQixPQUFPLEVBQUUsQ0FDbEMsQ0FBQyxrQkFBa0IsRUFBRUcsV0FBVyxDQUFDLENBQ2xDLENBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztFQUNGLE9BQU9WLGNBQWM7QUFDdkI7QUFFQSxTQUFTVyxtQkFBbUJBLENBQUEsRUFBRztFQUM3QixNQUFNQyxXQUFXLEdBQUdoQyw2Q0FBYyxDQUFDaUMsU0FBUyxDQUFDLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUM7RUFDekQsTUFBTUMsYUFBYSxHQUFHbkMsNkNBQWMsQ0FBQ29DLFdBQVcsQ0FBQyxDQUFDLENBQUNGLFFBQVEsQ0FBQyxDQUFDO0VBRTdELE1BQU1HLElBQUksR0FBRy9CLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztFQUUzQyxNQUFNK0IsYUFBYSxHQUFHckMsdURBQWEsQ0FBQyxTQUFTLENBQUM7RUFDOUNxQyxhQUFhLENBQUM3QixXQUFXLENBQUNSLHVEQUFhLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7RUFDaEVxQyxhQUFhLENBQUM3QixXQUFXLENBQUNRLFdBQVcsQ0FBQ2UsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0VBQzdESyxJQUFJLENBQUM1QixXQUFXLENBQUM2QixhQUFhLENBQUM7RUFFL0IsTUFBTUMsWUFBWSxHQUFHdEMsdURBQWEsQ0FBQyxTQUFTLENBQUM7RUFDN0NzQyxZQUFZLENBQUM5QixXQUFXLENBQUNSLHVEQUFhLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7RUFDakVzQyxZQUFZLENBQUM5QixXQUFXLENBQUNRLFdBQVcsQ0FBQ2tCLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztFQUNoRUUsSUFBSSxDQUFDNUIsV0FBVyxDQUFDOEIsWUFBWSxDQUFDO0FBQ2hDOzs7Ozs7Ozs7Ozs7O0FDN0U4QjtBQUU5QixNQUFNdkMsY0FBYyxHQUFHLENBQUMsTUFBTTtFQUM1QixJQUFJbUIsTUFBTTtFQUNWLElBQUlzQixRQUFRO0VBRVosTUFBTVIsU0FBUyxHQUFHQSxDQUFBLEtBQU1kLE1BQU07RUFDOUIsTUFBTWlCLFdBQVcsR0FBR0EsQ0FBQSxLQUFNSyxRQUFRO0VBRWxDLE1BQU1DLGlCQUFpQixHQUFJdkIsTUFBTSxJQUFLO0lBQ3BDQSxNQUFNLENBQUNELEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQ2xDeEIsTUFBTSxDQUFDRCxLQUFLLENBQUN5QixTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNsQ3hCLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDeUIsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDbEN4QixNQUFNLENBQUNELEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQ2xDeEIsTUFBTSxDQUFDRCxLQUFLLENBQUN5QixTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztFQUNwQyxDQUFDO0VBRUQsTUFBTUMsU0FBUyxHQUFHQSxDQUFBLEtBQU07SUFDdEJ6QixNQUFNLEdBQUcsSUFBSXFCLCtDQUFNLENBQUMsU0FBUyxDQUFDO0lBQzlCQyxRQUFRLEdBQUcsSUFBSUQsK0NBQU0sQ0FBQyxVQUFVLENBQUM7SUFFakNFLGlCQUFpQixDQUFDdkIsTUFBTSxDQUFDO0lBQ3pCdUIsaUJBQWlCLENBQUNELFFBQVEsQ0FBQztFQUM3QixDQUFDO0VBRUQsTUFBTUksUUFBUSxHQUFJQyxNQUFNLElBQUs7SUFDM0JDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFFLEdBQUVGLE1BQU0sQ0FBQ0csSUFBSyxXQUFVLENBQUM7SUFDdEMsT0FBT0gsTUFBTTtFQUNmLENBQUM7RUFFRCxNQUFNSSxZQUFZLEdBQUdBLENBQUEsS0FBTTtJQUN6QixNQUFNQyxLQUFLLEdBQUdsQixTQUFTLENBQUMsQ0FBQztJQUN6QkcsV0FBVyxDQUFDLENBQUMsQ0FBQ2dCLGdCQUFnQixDQUFDRCxLQUFLLENBQUM7SUFDckMsSUFBSUEsS0FBSyxDQUFDakMsS0FBSyxDQUFDbUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFO01BQ2xDUixRQUFRLENBQUNaLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkI7RUFDRixDQUFDO0VBRUQsTUFBTXFCLFFBQVEsR0FBSXhCLFdBQVcsSUFBSztJQUNoQyxNQUFNcUIsS0FBSyxHQUFHZixXQUFXLENBQUMsQ0FBQztJQUMzQkgsU0FBUyxDQUFDLENBQUMsQ0FBQ3NCLE1BQU0sQ0FBQ0osS0FBSyxFQUFFckIsV0FBVyxDQUFDO0lBRXRDLElBQUlxQixLQUFLLENBQUNqQyxLQUFLLENBQUNtQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUU7TUFDbENSLFFBQVEsQ0FBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQztNQUNyQjtJQUNGO0lBQ0FpQixZQUFZLENBQUMsQ0FBQztFQUNoQixDQUFDO0VBRUQsT0FBTztJQUNMTixTQUFTO0lBQ1RYLFNBQVM7SUFDVEcsV0FBVztJQUNYa0I7RUFDRixDQUFDO0FBQ0gsQ0FBQyxFQUFFLENBQUM7QUFFSiwrREFBZXRELGNBQWM7Ozs7Ozs7Ozs7OztBQ3pESDtBQUUxQixNQUFNeUQsU0FBUyxDQUFDO0VBQ2RDLFdBQVdBLENBQUEsRUFBRztJQUNaO0lBQ0EsSUFBSSxDQUFDeEMsS0FBSyxHQUFHLElBQUksQ0FBQ3dDLFdBQVcsQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDM0M7RUFFQSxPQUFPQSxTQUFTQSxDQUFBLEVBQUc7SUFDakIsTUFBTXpDLEtBQUssR0FBRyxFQUFFO0lBQ2hCLEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDM0IsTUFBTVIsR0FBRyxHQUFHLEVBQUU7TUFDZCxLQUFLLElBQUlhLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQzNCYixHQUFHLENBQUMrQyxJQUFJLENBQUM7VUFBRWhDLFFBQVEsRUFBRSxLQUFLO1VBQUVDLElBQUksRUFBRTtRQUFLLENBQUMsQ0FBQztNQUMzQztNQUNBWCxLQUFLLENBQUMwQyxJQUFJLENBQUMvQyxHQUFHLENBQUM7SUFDakI7SUFDQSxPQUFPSyxLQUFLO0VBQ2Q7RUFFQXlCLFNBQVNBLENBQUNrQixLQUFLLEVBQUVDLEdBQUcsRUFBRTtJQUNwQixNQUFNLENBQUNDLFFBQVEsRUFBRUMsUUFBUSxDQUFDLEdBQ3hCLElBQUksQ0FBQ04sV0FBVyxDQUFDTyx5QkFBeUIsQ0FBQ0osS0FBSyxDQUFDO0lBQ25ELElBQUksQ0FBQ0MsR0FBRyxFQUFFO01BQ1IsSUFBSSxDQUFDNUMsS0FBSyxDQUFDOEMsUUFBUSxDQUFDLENBQUNELFFBQVEsQ0FBQyxDQUFDbEMsSUFBSSxHQUFHLElBQUkyQiw2Q0FBSSxDQUFDLENBQUMsQ0FBQztNQUNqRDtJQUNGO0lBQ0EsTUFBTSxDQUFDVSxNQUFNLEVBQUVDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQ1QsV0FBVyxDQUFDTyx5QkFBeUIsQ0FBQ0gsR0FBRyxDQUFDO0lBQ3hFLE1BQU1NLFFBQVEsR0FDWkosUUFBUSxLQUFLRyxNQUFNLEdBQUdELE1BQU0sR0FBR0gsUUFBUSxHQUFHLENBQUMsR0FBR0ksTUFBTSxHQUFHSCxRQUFRLEdBQUcsQ0FBQztJQUNyRSxNQUFNbkMsSUFBSSxHQUFHLElBQUkyQiw2Q0FBSSxDQUFDWSxRQUFRLENBQUM7SUFDL0IsS0FBSyxJQUFJL0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHK0MsUUFBUSxFQUFFL0MsQ0FBQyxFQUFFLEVBQUU7TUFDakMsSUFBSTJDLFFBQVEsS0FBS0csTUFBTSxFQUFFLElBQUksQ0FBQ2pELEtBQUssQ0FBQzhDLFFBQVEsQ0FBQyxDQUFDRCxRQUFRLEdBQUcxQyxDQUFDLENBQUMsQ0FBQ1EsSUFBSSxHQUFHQSxJQUFJLENBQUMsS0FDbkUsSUFBSSxDQUFDWCxLQUFLLENBQUM4QyxRQUFRLEdBQUczQyxDQUFDLENBQUMsQ0FBQzBDLFFBQVEsQ0FBQyxDQUFDbEMsSUFBSSxHQUFHQSxJQUFJO0lBQ3JEO0VBQ0Y7RUFFQSxPQUFPb0MseUJBQXlCQSxDQUFDbkMsV0FBVyxFQUFFO0lBQzVDLE9BQU8sQ0FBQ0EsV0FBVyxDQUFDdUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDdkMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM5RDtFQUVBd0MsY0FBY0EsQ0FBQ3hDLFdBQVcsRUFBRTtJQUMxQixNQUFNLENBQUNoQixHQUFHLEVBQUVELEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzZDLFdBQVcsQ0FBQ08seUJBQXlCLENBQUNuQyxXQUFXLENBQUM7SUFDMUUsT0FBTyxJQUFJLENBQUNaLEtBQUssQ0FBQ0wsR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQztFQUM3QjtFQUVBeUQsYUFBYUEsQ0FBQ3pDLFdBQVcsRUFBRTtJQUN6QixNQUFNTCxJQUFJLEdBQUcsSUFBSSxDQUFDNkMsY0FBYyxDQUFDeEMsV0FBVyxDQUFDO0lBQzdDLElBQUlMLElBQUksQ0FBQ0csUUFBUSxFQUFFLE1BQU0sSUFBSTRDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztJQUMxRCxJQUFJL0MsSUFBSSxDQUFDSSxJQUFJLEVBQUU7TUFDYkosSUFBSSxDQUFDSSxJQUFJLENBQUM0QyxHQUFHLENBQUMsQ0FBQztJQUNqQjtJQUNBLE1BQU0sQ0FBQzNELEdBQUcsRUFBRUQsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDNkMsV0FBVyxDQUFDTyx5QkFBeUIsQ0FBQ25DLFdBQVcsQ0FBQztJQUMxRSxJQUFJLENBQUNaLEtBQUssQ0FBQ0wsR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxDQUFDYyxRQUFRLEdBQUcsSUFBSTtFQUN0QztFQUVBeUIsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsT0FBTyxJQUFJLENBQUNuQyxLQUFLLENBQUN3RCxLQUFLLENBQUU3RCxHQUFHLElBQzFCQSxHQUFHLENBQUM2RCxLQUFLLENBQUVqRCxJQUFJLElBQUssQ0FBQ0EsSUFBSSxDQUFDSSxJQUFJLElBQUlKLElBQUksQ0FBQ0ksSUFBSSxDQUFDOEMsTUFBTSxDQUFDLENBQUMsQ0FDdEQsQ0FBQztFQUNIO0FBQ0Y7QUFFQSwrREFBZWxCLFNBQVM7Ozs7Ozs7Ozs7Ozs7OztBQy9EeEIsTUFBTXhELGFBQWEsR0FBR0EsQ0FBQzJFLE9BQU8sRUFBRUMsT0FBTyxFQUFFbEQsT0FBTyxFQUFFbUQsVUFBVSxLQUFLO0VBQy9ELE1BQU1DLEdBQUcsR0FBR3pFLFFBQVEsQ0FBQ0wsYUFBYSxDQUFDMkUsT0FBTyxDQUFDO0VBQzNDLElBQUlDLE9BQU8sRUFBRUUsR0FBRyxDQUFDQyxXQUFXLEdBQUdILE9BQU87RUFDdEMsSUFBSWxELE9BQU8sSUFBSUEsT0FBTyxDQUFDc0QsTUFBTSxFQUFFO0lBQzdCdEQsT0FBTyxDQUFDdUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDM0QsT0FBTyxDQUFFNEQsT0FBTyxJQUFLSixHQUFHLENBQUNLLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDRixPQUFPLENBQUMsQ0FBQztFQUNyRTtFQUNBLElBQUlMLFVBQVUsRUFDWkEsVUFBVSxDQUFDdkQsT0FBTyxDQUFFK0QsU0FBUyxJQUMzQlAsR0FBRyxDQUFDUSxZQUFZLENBQUNELFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUM3QyxDQUFDO0VBQ0gsT0FBT1AsR0FBRztBQUNaLENBQUM7QUFFRCxNQUFNN0UsY0FBYyxHQUFHQSxDQUFDK0MsSUFBSSxFQUFFdUMsT0FBTyxFQUFFQyxJQUFJLEVBQUVOLE9BQU8sS0FBSztFQUN2RCxNQUFNTyxPQUFPLEdBQUdwRixRQUFRLENBQUNxRixlQUFlLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDO0VBQzdFLE1BQU1DLFFBQVEsR0FBR3RGLFFBQVEsQ0FBQ3FGLGVBQWUsQ0FDdkMsNEJBQTRCLEVBQzVCLE1BQ0YsQ0FBQztFQUVELE1BQU1FLEtBQUssR0FBR3ZGLFFBQVEsQ0FBQ0wsYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUM3QzRGLEtBQUssQ0FBQ2IsV0FBVyxHQUFHL0IsSUFBSTtFQUN4QnlDLE9BQU8sQ0FBQ2pGLFdBQVcsQ0FBQ29GLEtBQUssQ0FBQztFQUUxQkgsT0FBTyxDQUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFQyxPQUFPLENBQUM7RUFFeENJLFFBQVEsQ0FBQ0wsWUFBWSxDQUFDLEdBQUcsRUFBRUUsSUFBSSxDQUFDO0VBRWhDQyxPQUFPLENBQUNqRixXQUFXLENBQUNtRixRQUFRLENBQUM7RUFFN0IsSUFBSTNDLElBQUksS0FBSyxRQUFRLElBQUlBLElBQUksS0FBSyxRQUFRLEVBQUV5QyxPQUFPLENBQUNOLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDcEMsSUFBSSxDQUFDO0VBQ3ZFLElBQUlrQyxPQUFPLEVBQUVPLE9BQU8sQ0FBQ04sU0FBUyxDQUFDQyxHQUFHLENBQUNGLE9BQU8sQ0FBQztFQUUzQyxPQUFPTyxPQUFPO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNsQ21DO0FBRXBDLE1BQU1sRCxNQUFNLENBQUM7RUFDWGtCLFdBQVdBLENBQUNULElBQUksRUFBRTtJQUNoQixJQUFJLENBQUNBLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUMvQixLQUFLLEdBQUcsSUFBSXVDLGtEQUFTLENBQUMsQ0FBQztJQUM1QixJQUFJLENBQUNxQyxjQUFjLEdBQUdDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQ0MsQ0FBQyxFQUFFN0UsQ0FBQyxLQUFLQSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3RFO0VBRUFrQyxNQUFNQSxDQUFDSixLQUFLLEVBQUVyQixXQUFXLEVBQUU7SUFDekIsTUFBTXFFLFVBQVUsR0FBRyxJQUFJLENBQUN6QyxXQUFXLENBQUMwQyx3QkFBd0IsQ0FBQ3RFLFdBQVcsQ0FBQztJQUN6RSxJQUFJLENBQUMsSUFBSSxDQUFDZ0UsY0FBYyxDQUFDTyxRQUFRLENBQUNGLFVBQVUsQ0FBQyxFQUFFO0lBQy9DaEQsS0FBSyxDQUFDakMsS0FBSyxDQUFDcUQsYUFBYSxDQUFDekMsV0FBVyxDQUFDO0lBQ3RDLElBQUksQ0FBQ2dFLGNBQWMsR0FBRyxJQUFJLENBQUNBLGNBQWMsQ0FBQ1EsTUFBTSxDQUFFQyxDQUFDLElBQUtBLENBQUMsS0FBS0osVUFBVSxDQUFDO0VBQzNFO0VBRUEsT0FBT0Msd0JBQXdCQSxDQUFDdEUsV0FBVyxFQUFFO0lBQzNDLE9BQU9BLFdBQVcsQ0FBQ3VDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQ3ZDLFdBQVcsQ0FBQzBFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUN6RTtFQUVBLE9BQU9DLHdCQUF3QkEsQ0FBQ0YsQ0FBQyxFQUFFO0lBQ2pDLE9BQVEsR0FBRXhGLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLENBQUN1RixDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUdBLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFFLEdBQy9ERyxJQUFJLENBQUNDLEtBQUssQ0FBQ0osQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJQSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUMzQyxFQUFDO0VBQ0o7RUFFQW5ELGdCQUFnQkEsQ0FBQ0QsS0FBSyxFQUFFO0lBQ3RCLE1BQU1yQixXQUFXLEdBQUcsSUFBSSxDQUFDNEIsV0FBVyxDQUFDK0Msd0JBQXdCLENBQzNELElBQUksQ0FBQ1gsY0FBYyxDQUNqQlksSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUNkLGNBQWMsQ0FBQ2IsTUFBTSxDQUFDLENBRTFELENBQUM7SUFDRCxJQUFJLENBQUMxQixNQUFNLENBQUNKLEtBQUssRUFBRXJCLFdBQVcsQ0FBQztJQUMvQixPQUFPQSxXQUFXO0VBQ3BCO0VBRUErRSxPQUFPQSxDQUFBLEVBQUc7SUFDUixPQUFPLElBQUksQ0FBQzVELElBQUk7RUFDbEI7RUFFQWYsUUFBUUEsQ0FBQSxFQUFHO0lBQ1QsT0FBTyxJQUFJLENBQUNoQixLQUFLLENBQUNBLEtBQUs7RUFDekI7QUFDRjtBQUVBLCtEQUFlc0IsTUFBTTs7Ozs7Ozs7Ozs7QUM3Q3JCLE1BQU1yQyxNQUFNLEdBQUcsQ0FBQyxNQUFNO0VBQ3BCLE1BQU1BLE1BQU0sR0FBRyxDQUFDLENBQUM7RUFFakIsTUFBTTJHLEVBQUUsR0FBR0EsQ0FBQ0MsU0FBUyxFQUFFQyxFQUFFLEtBQUs7SUFDNUIsSUFBSSxDQUFDQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNqSCxNQUFNLEVBQUU0RyxTQUFTLENBQUMsRUFDMUQ1RyxNQUFNLENBQUM0RyxTQUFTLENBQUMsR0FBRyxFQUFFO0lBQ3hCNUcsTUFBTSxDQUFDNEcsU0FBUyxDQUFDLENBQUNuRCxJQUFJLENBQUNvRCxFQUFFLENBQUM7RUFDNUIsQ0FBQztFQUVELE1BQU1LLEdBQUcsR0FBR0EsQ0FBQ04sU0FBUyxFQUFFQyxFQUFFLEtBQUs7SUFDN0IsSUFBSSxDQUFDQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNqSCxNQUFNLEVBQUU0RyxTQUFTLENBQUMsRUFBRTtJQUM5RCxLQUFLLElBQUkxRixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdsQixNQUFNLENBQUM0RyxTQUFTLENBQUMsQ0FBQzlCLE1BQU0sRUFBRTVELENBQUMsRUFBRSxFQUFFO01BQ2pELElBQUlsQixNQUFNLENBQUM0RyxTQUFTLENBQUMsQ0FBQzFGLENBQUMsQ0FBQyxLQUFLMkYsRUFBRSxFQUFFO1FBQy9CN0csTUFBTSxDQUFDNEcsU0FBUyxDQUFDLENBQUNPLE1BQU0sQ0FBQ2pHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUI7TUFDRjtJQUNGO0VBQ0YsQ0FBQztFQUVELE1BQU1rRyxJQUFJLEdBQUdBLENBQUNSLFNBQVMsRUFBRVMsSUFBSSxLQUFLO0lBQ2hDLElBQUksQ0FBQ1AsTUFBTSxDQUFDQyxTQUFTLENBQUNDLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDakgsTUFBTSxFQUFFNEcsU0FBUyxDQUFDLEVBQUU7SUFDOUQ1RyxNQUFNLENBQUM0RyxTQUFTLENBQUMsQ0FBQ3hGLE9BQU8sQ0FBRXlGLEVBQUUsSUFBS0EsRUFBRSxDQUFDUSxJQUFJLENBQUMsQ0FBQztFQUM3QyxDQUFDO0VBRUQsT0FBTztJQUNMVixFQUFFO0lBQ0ZPLEdBQUc7SUFDSEU7RUFDRixDQUFDO0FBQ0gsQ0FBQyxFQUFFLENBQUM7QUFFSiwrREFBZXBILE1BQU07Ozs7Ozs7Ozs7O0FDL0JyQixNQUFNcUQsSUFBSSxDQUFDO0VBQ1RFLFdBQVdBLENBQUN1QixNQUFNLEVBQUU7SUFDbEIsSUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDd0MsSUFBSSxHQUFHLENBQUM7RUFDZjtFQUVBaEQsR0FBR0EsQ0FBQSxFQUFHO0lBQ0osSUFBSSxJQUFJLENBQUNnRCxJQUFJLEdBQUcsSUFBSSxDQUFDeEMsTUFBTSxFQUFFLElBQUksQ0FBQ3dDLElBQUksRUFBRTtJQUN4QyxPQUFPLElBQUksQ0FBQ0EsSUFBSTtFQUNsQjtFQUVBOUMsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsT0FBTyxJQUFJLENBQUM4QyxJQUFJLEtBQUssSUFBSSxDQUFDeEMsTUFBTTtFQUNsQztBQUNGO0FBRUEsK0RBQWV6QixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7QUNoQm5CO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWMsZUFBZSxHQUFHLFVBQVUsa0JBQWtCLG9EQUFvRCxtQkFBbUIsR0FBRyxZQUFZLDJCQUEyQixpQkFBaUIsdUJBQXVCLHFCQUFxQixHQUFHLFlBQVksMkJBQTJCLHNCQUFzQixHQUFHLFlBQVksaUJBQWlCLDBCQUEwQixrQkFBa0IsNEJBQTRCLHdCQUF3QixHQUFHLGNBQWMsdUJBQXVCLHFCQUFxQixnQkFBZ0IsR0FBRyxhQUFhLG9CQUFvQixHQUFHLGNBQWMsdUJBQXVCLHVCQUF1QixHQUFHLFlBQVksbUJBQW1CLGlCQUFpQixrQkFBa0IsK0VBQStFLHNCQUFzQiwwQ0FBMEMsR0FBRyxpQkFBaUIsa0JBQWtCLDBCQUEwQixHQUFHLGdCQUFnQiwyQkFBMkIsR0FBRyxxQkFBcUIsZ0NBQWdDLEdBQUcsT0FBTyxpRkFBaUYsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLE1BQU0sS0FBSyxhQUFhLGFBQWEsWUFBWSxXQUFXLE1BQU0sS0FBSyxhQUFhLGFBQWEsS0FBSyxLQUFLLFdBQVcsWUFBWSxVQUFVLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsT0FBTyxLQUFLLFVBQVUsS0FBSyxLQUFLLFdBQVcsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFVBQVUsV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssWUFBWSxxREFBcUQseUJBQXlCLDJCQUEyQixxQkFBcUIsdUJBQXVCLE9BQU8sMkJBQTJCLGNBQWMsZUFBZSxHQUFHLCtCQUErQixrQkFBa0Isb0RBQW9ELG1CQUFtQixHQUFHLFlBQVksdUNBQXVDLHlCQUF5Qix1QkFBdUIscUJBQXFCLEdBQUcsWUFBWSx1Q0FBdUMsc0JBQXNCLFNBQVMsMkJBQTJCLDRCQUE0QixvQkFBb0IsOEJBQThCLDBCQUEwQixLQUFLLFdBQVcseUJBQXlCLHVCQUF1QiwwQkFBMEIsS0FBSyxHQUFHLDZCQUE2QixvQkFBb0IsVUFBVSx5QkFBeUIseUJBQXlCLEtBQUssR0FBRyxZQUFZLG1CQUFtQixpQkFBaUIsa0JBQWtCLGlGQUFpRix3QkFBd0IsMENBQTBDLGNBQWMsb0JBQW9CLDRCQUE0QixLQUFLLGFBQWEseUNBQXlDLGdCQUFnQix5Q0FBeUMsT0FBTyxLQUFLLEdBQUcsbUJBQW1CO0FBQ3ozRjtBQUNBLCtEQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBNEk7QUFDNUk7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyw0SEFBTzs7OztBQUlzRjtBQUM5RyxPQUFPLCtEQUFlLDRIQUFPLElBQUksNEhBQU8sVUFBVSw0SEFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ2dEO0FBQzFCO0FBQ047QUFFdENwRCw4REFBZ0IsQ0FBQyxDQUFDO0FBQ2xCSixxREFBYyxDQUFDNEMsU0FBUyxDQUFDLENBQUM7QUFDMUJiLGlFQUFtQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHJlbmRlckxpbmtJY29uIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuZnVuY3Rpb24gcmVuZGVyUGFnZUxheW91dCgpIHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDFcIiwgXCJCYXR0bGVzaGlwXCIpKTtcbiAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gIGJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcIm1haW5cIikpO1xuXG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGNvbnN0IGEgPSBjcmVhdGVFbGVtZW50KFwiYVwiLCBcIlwiLCBcIlwiLCBbXG4gICAgW1wiaHJlZlwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9qY2lkcFwiXSxcbiAgICBbXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIl0sXG4gIF0pO1xuICBhLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJwXCIsIFwiQ3JlYXRlZCBieSBqY2lkcFwiKSk7XG4gIGEuYXBwZW5kQ2hpbGQoXG4gICAgcmVuZGVyTGlua0ljb24oXG4gICAgICBcImdpdGh1YlwiLFxuICAgICAgXCIwIDAgMjQgMjRcIixcbiAgICAgIFwiTTEyLDJBMTAsMTAgMCAwLDAgMiwxMkMyLDE2LjQyIDQuODcsMjAuMTcgOC44NCwyMS41QzkuMzQsMjEuNTggOS41LDIxLjI3IDkuNSwyMUM5LjUsMjAuNzcgOS41LDIwLjE0IDkuNSwxOS4zMUM2LjczLDE5LjkxIDYuMTQsMTcuOTcgNi4xNCwxNy45N0M1LjY4LDE2LjgxIDUuMDMsMTYuNSA1LjAzLDE2LjVDNC4xMiwxNS44OCA1LjEsMTUuOSA1LjEsMTUuOUM2LjEsMTUuOTcgNi42MywxNi45MyA2LjYzLDE2LjkzQzcuNSwxOC40NSA4Ljk3LDE4IDkuNTQsMTcuNzZDOS42MywxNy4xMSA5Ljg5LDE2LjY3IDEwLjE3LDE2LjQyQzcuOTUsMTYuMTcgNS42MiwxNS4zMSA1LjYyLDExLjVDNS42MiwxMC4zOSA2LDkuNSA2LjY1LDguNzlDNi41NSw4LjU0IDYuMiw3LjUgNi43NSw2LjE1QzYuNzUsNi4xNSA3LjU5LDUuODggOS41LDcuMTdDMTAuMjksNi45NSAxMS4xNSw2Ljg0IDEyLDYuODRDMTIuODUsNi44NCAxMy43MSw2Ljk1IDE0LjUsNy4xN0MxNi40MSw1Ljg4IDE3LjI1LDYuMTUgMTcuMjUsNi4xNUMxNy44LDcuNSAxNy40NSw4LjU0IDE3LjM1LDguNzlDMTgsOS41IDE4LjM4LDEwLjM5IDE4LjM4LDExLjVDMTguMzgsMTUuMzIgMTYuMDQsMTYuMTYgMTMuODEsMTYuNDFDMTQuMTcsMTYuNzIgMTQuNSwxNy4zMyAxNC41LDE4LjI2QzE0LjUsMTkuNiAxNC41LDIwLjY4IDE0LjUsMjFDMTQuNSwyMS4yNyAxNC42NiwyMS41OSAxNS4xNywyMS41QzE5LjE0LDIwLjE2IDIyLDE2LjQyIDIyLDEyQTEwLDEwIDAgMCwwIDEyLDJaXCIsXG4gICAgKSxcbiAgKTtcbiAgZm9vdGVyLmFwcGVuZENoaWxkKGEpO1xuICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMocm93LCBjb2wpIHtcbiAgcmV0dXJuIGAke1N0cmluZy5mcm9tQ2hhckNvZGUoY29sICsgNjUpfSR7cm93ICsgMX1gO1xufVxuXG5mdW5jdGlvbiByZW5kZXJCb2FyZChib2FyZCwgcGxheWVyKSB7XG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBgJHtwbGF5ZXJ9IGJvYXJkYCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgIGNvbnN0IGNvbExhYmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImxhYmVsIGNvbFwiKTtcbiAgICBjb2xMYWJlbC5hcHBlbmRDaGlsZChcbiAgICAgIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgPT09IDAgPyBcIlwiIDogU3RyaW5nLmZyb21DaGFyQ29kZShpICsgNjQpKSxcbiAgICApO1xuICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbExhYmVsKTtcbiAgfVxuICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICBjb25zdCByb3dMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJsYWJlbCByb3dcIik7XG4gICAgcm93TGFiZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgaSArIDEpKTtcbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dMYWJlbCk7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgIGxldCBjbGFzc2VzID0gXCJjZWxsXCI7XG4gICAgICBpZiAoY2VsbC5hdHRhY2tlZCkgY2xhc3NlcyArPSBcIiBhdHRhY2tlZFwiO1xuICAgICAgaWYgKGNlbGwuc2hpcCkgY2xhc3NlcyArPSBcIiBzaGlwXCI7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMoaSwgaik7XG4gICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBjbGFzc2VzLCBbXG4gICAgICAgICAgW1wiZGF0YS1jb29yZGluYXRlc1wiLCBjb29yZGluYXRlc10sXG4gICAgICAgIF0pLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBib2FyZENvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gcmVuZGVySW5pdGlhbFNjcmVlbigpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lQ29udHJvbGxlci5nZXRQbGF5ZXIoKS5nZXRCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZUNvbnRyb2xsZXIuZ2V0Q29tcHV0ZXIoKS5nZXRCb2FyZCgpO1xuXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIHBsYXllclNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiUGxheWVyJ3MgQm9hcmRcIikpO1xuICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKHBsYXllckJvYXJkLCBcInBsYXllclwiKSk7XG4gIG1haW4uYXBwZW5kQ2hpbGQocGxheWVyU2VjdGlvbik7XG5cbiAgY29uc3QgZW5lbXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJDb21wdXRlcidzIEJvYXJkXCIpKTtcbiAgZW5lbXlTZWN0aW9uLmFwcGVuZENoaWxkKHJlbmRlckJvYXJkKGNvbXB1dGVyQm9hcmQsIFwiY29tcHV0ZXJcIikpO1xuICBtYWluLmFwcGVuZENoaWxkKGVuZW15U2VjdGlvbik7XG59XG5cbmV4cG9ydCB7IHJlbmRlclBhZ2VMYXlvdXQsIHJlbmRlckluaXRpYWxTY3JlZW4gfTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgbGV0IGNvbXB1dGVyO1xuXG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcbiAgY29uc3QgZ2V0Q29tcHV0ZXIgPSAoKSA9PiBjb21wdXRlcjtcblxuICBjb25zdCBjcmVhdGVQbGF5ZXJTaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiRjJcIiwgXCJKMlwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiQTRcIiwgXCJENFwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiRDZcIiwgXCJGNlwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiSTRcIiwgXCJJNlwiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiRjlcIiwgXCJHOVwiKTtcbiAgfTtcblxuICBjb25zdCBzZXR1cEdhbWUgPSAoKSA9PiB7XG4gICAgcGxheWVyID0gbmV3IFBsYXllcihcInBsYXllcjFcIik7XG4gICAgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIik7XG5cbiAgICBjcmVhdGVQbGF5ZXJTaGlwcyhwbGF5ZXIpO1xuICAgIGNyZWF0ZVBsYXllclNoaXBzKGNvbXB1dGVyKTtcbiAgfTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICh3aW5uZXIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgJHt3aW5uZXIubmFtZX0gaGFzIHdvbiFgKTtcbiAgICByZXR1cm4gd2lubmVyO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcbiAgICBjb25zdCBlbmVteSA9IGdldFBsYXllcigpO1xuICAgIGdldENvbXB1dGVyKCkubWFrZVJhbmRvbUF0dGFjayhlbmVteSk7XG4gICAgaWYgKGVuZW15LmJvYXJkLmhhdmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZ2FtZU92ZXIoZ2V0UGxheWVyKCkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGF5VHVybiA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IGVuZW15ID0gZ2V0Q29tcHV0ZXIoKTtcbiAgICBnZXRQbGF5ZXIoKS5hdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKTtcblxuICAgIGlmIChlbmVteS5ib2FyZC5oYXZlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGdhbWVPdmVyKGdldFBsYXllcigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXR1cEdhbWUsXG4gICAgZ2V0UGxheWVyLFxuICAgIGdldENvbXB1dGVyLFxuICAgIHBsYXlUdXJuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMuYm9hcmQgPSBBcnJheSgxMCkuZmlsbChBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5ib2FyZCA9IHRoaXMuY29uc3RydWN0b3IuZmlsbEJvYXJkKCk7XG4gIH1cblxuICBzdGF0aWMgZmlsbEJvYXJkKCkge1xuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICByb3cucHVzaCh7IGF0dGFja2VkOiBmYWxzZSwgc2hpcDogbnVsbCB9KTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgcGxhY2VTaGlwKHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBbc3RhcnRDb2wsIHN0YXJ0Um93XSA9XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoc3RhcnQpO1xuICAgIGlmICghZW5kKSB7XG4gICAgICB0aGlzLmJvYXJkW3N0YXJ0Um93XVtzdGFydENvbF0uc2hpcCA9IG5ldyBTaGlwKDEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBbZW5kQ29sLCBlbmRSb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGVuZCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPVxuICAgICAgc3RhcnRSb3cgPT09IGVuZFJvdyA/IGVuZENvbCAtIHN0YXJ0Q29sICsgMSA6IGVuZFJvdyAtIHN0YXJ0Um93ICsgMTtcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZGlzdGFuY2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrKykge1xuICAgICAgaWYgKHN0YXJ0Um93ID09PSBlbmRSb3cpIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICBlbHNlIHRoaXMuYm9hcmRbc3RhcnRSb3cgKyBpXVtzdGFydENvbF0uc2hpcCA9IHNoaXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gW2Nvb3JkaW5hdGVzLmNoYXJDb2RlQXQoMCkgLSA2NSwgK2Nvb3JkaW5hdGVzWzFdIC0gMV07XG4gIH1cblxuICBnZXRDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtjb2wsIHJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiB0aGlzLmJvYXJkW3Jvd11bY29sXTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKGNlbGwuYXR0YWNrZWQpIHRocm93IG5ldyBFcnJvcihcIlJlcGVhdGVkIGNvb3JkaW5hdGVzXCIpO1xuICAgIGlmIChjZWxsLnNoaXApIHtcbiAgICAgIGNlbGwuc2hpcC5oaXQoKTtcbiAgICB9XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uYXR0YWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgaGF2ZUFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5ldmVyeSgocm93KSA9PlxuICAgICAgcm93LmV2ZXJ5KChjZWxsKSA9PiAhY2VsbC5zaGlwIHx8IGNlbGwuc2hpcC5pc1N1bmsoKSksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gKGVsZW1lbnQsIGNvbnRlbnQsIGNsYXNzZXMsIGF0dHJpYnV0ZXMpID0+IHtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgaWYgKGNvbnRlbnQpIGVsZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgY2xhc3Nlcy5zcGxpdChcIiBcIikuZm9yRWFjaCgobXlDbGFzcykgPT4gZWxlLmNsYXNzTGlzdC5hZGQobXlDbGFzcykpO1xuICB9XG4gIGlmIChhdHRyaWJ1dGVzKVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKSA9PlxuICAgICAgZWxlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVbMF0sIGF0dHJpYnV0ZVsxXSksXG4gICAgKTtcbiAgcmV0dXJuIGVsZTtcbn07XG5cbmNvbnN0IHJlbmRlckxpbmtJY29uID0gKG5hbWUsIHZpZXdCb3gsIHBhdGgsIG15Q2xhc3MpID0+IHtcbiAgY29uc3QgaWNvblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICBjb25zdCBpY29uUGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgXCJwYXRoXCIsXG4gICk7XG5cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcbiAgaWNvblN2Zy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgaWNvblN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuXG4gIGljb25QYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgcGF0aCk7XG5cbiAgaWNvblN2Zy5hcHBlbmRDaGlsZChpY29uUGF0aCk7XG5cbiAgaWYgKG5hbWUgPT09IFwicGVuY2lsXCIgfHwgbmFtZSA9PT0gXCJkZWxldGVcIikgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICBpZiAobXlDbGFzcykgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKG15Q2xhc3MpO1xuXG4gIHJldHVybiBpY29uU3ZnO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyTGlua0ljb24gfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgdGhpcy5zaG90c0F2YWlsYWJsZSA9IEFycmF5LmZyb20oQXJyYXkoMTAwKS5maWxsKCksIChfLCBpKSA9PiBpICsgMSk7XG4gIH1cblxuICBhdHRhY2soZW5lbXksIGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hvdE51bWJlciA9IHRoaXMuY29uc3RydWN0b3IuZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIXRoaXMuc2hvdHNBdmFpbGFibGUuaW5jbHVkZXMoc2hvdE51bWJlcikpIHJldHVybjtcbiAgICBlbmVteS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gdGhpcy5zaG90c0F2YWlsYWJsZS5maWx0ZXIoKG4pID0+IG4gIT09IHNob3ROdW1iZXIpO1xuICB9XG5cbiAgc3RhdGljIGdldE51bWJlckZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIHJldHVybiBjb29yZGluYXRlcy5jaGFyQ29kZUF0KDApIC0gNjQgKyArY29vcmRpbmF0ZXMuc2xpY2UoMSkgKiAxMCAtIDEwO1xuICB9XG5cbiAgc3RhdGljIGdldENvb3JkaW5hdGVzRnJvbU51bWJlcihuKSB7XG4gICAgcmV0dXJuIGAke1N0cmluZy5mcm9tQ2hhckNvZGUoKG4gJSAxMCA9PT0gMCA/IDEwIDogbiAlIDEwKSArIDY0KX0ke1xuICAgICAgTWF0aC5mbG9vcihuIC8gMTApICsgKG4gJSAxMCA9PT0gMCA/IDAgOiAxKVxuICAgIH1gO1xuICB9XG5cbiAgbWFrZVJhbmRvbUF0dGFjayhlbmVteSkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRDb29yZGluYXRlc0Zyb21OdW1iZXIoXG4gICAgICB0aGlzLnNob3RzQXZhaWxhYmxlW1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNob3RzQXZhaWxhYmxlLmxlbmd0aClcbiAgICAgIF0sXG4gICAgKTtcbiAgICB0aGlzLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmJvYXJkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IGV2ZW50cyA9ICgoKSA9PiB7XG4gIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gIGNvbnN0IG9uID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpXG4gICAgICBldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICB9O1xuXG4gIGNvbnN0IG9mZiA9IChldmVudE5hbWUsIGZuKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdW2ldID09PSBmbikge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbWl0ID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSkgcmV0dXJuO1xuICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGZuKSA9PiBmbltkYXRhXSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBvbixcbiAgICBvZmYsXG4gICAgZW1pdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGV2ZW50cztcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkgdGhpcy5oaXRzKys7XG4gICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwbHZoO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNWVtIDA7XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgcGFkZGluZzogMC4yNWVtIDA7XFxufVxcbmZvb3RlciBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbmZvb3RlciBzdmcge1xcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gIGZpbGw6IHdoaXRlO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDJlbTtcXG59XFxuc2VjdGlvbiBoMiB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgzMHB4LCAxZnIpKS9yZXBlYXQoMTEsIG1pbm1heCgzMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgbWF4LWhlaWdodDogY2FsYygoMTAwc3ZoIC0gMTBlbSkgLyAyKTtcXG59XFxuLmJvYXJkIC5sYWJlbCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG4uYm9hcmQgLmNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcXG59XFxuLmJvYXJkIC5jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogc3RlZWxibHVlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFNQTtFQUNFLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFMRjs7QUFVQTtFQUNFLGFBQUE7RUFDQSwrQ0FBQTtFQUNBLGNBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQXBCZ0I7RUFxQmhCLFlBbEJhO0VBbUJiLGtCQUFBO0VBQ0EsZ0JBQUE7QUFQRjs7QUFVQTtFQUNFLHNCQTNCZ0I7RUE0QmhCLGlCQUFBO0FBUEY7QUFTRTtFQUNFLFlBNUJXO0VBNkJYLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFQSjtBQVVFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBdENXO0FBOEJmOztBQWNBO0VBQ0UsZUFBQTtBQVhGO0FBYUU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0FBWEo7O0FBZUE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwRUFBQTtFQUNBLGlCQUFBO0VBQ0EscUNBQUE7QUFaRjtBQWNFO0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0FBWko7QUFlRTtFQUNFLHNCQUFBO0FBYko7QUFlSTtFQUNFLDJCQTFFVTtBQTZEaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiJHByaW1hcnktY29sb3I6IHN0ZWVsYmx1ZTtcXG4kc2Vjb25kYXJ5LWNvbG9yOiAjNTU1O1xcbiRoaWdobGlnaHQtY29sb3I6IHB1cnBsZTtcXG4kcHJpbWFyeS1mYzogYmxhY2s7XFxuJHNlY29uZGFyeS1mYzogd2hpdGU7XFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLy8gR2VuZXJhbCBsYXlvdXRcXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gIGhlaWdodDogMTAwbHZoO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC41ZW0gMDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWNvbmRhcnktY29sb3I7XFxuICBwYWRkaW5nOiAwLjI1ZW0gMDtcXG5cXG4gIGEge1xcbiAgICBjb2xvcjogJHNlY29uZGFyeS1mYztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIHN2ZyB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwLjVlbTtcXG4gICAgbWF4LXdpZHRoOiAxLjVlbTtcXG4gICAgZmlsbDogJHNlY29uZGFyeS1mYztcXG4gIH1cXG59XFxuXFxuLy8gR2FtZSB2aWV3XFxuXFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAyZW07XFxuXFxuICBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbn1cXG5cXG4uYm9hcmQge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nOiAxZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDExLCBtaW5tYXgoMzBweCwgMWZyKSkgLyByZXBlYXQoMTEsIG1pbm1heCgzMHB4LCAxZnIpKTtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxMGVtKSAvIDIpO1xcblxcbiAgLmxhYmVsIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgfVxcblxcbiAgLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkc2Vjb25kYXJ5LWNvbG9yO1xcblxcbiAgICAmLnNoaXAge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xcbiAgICB9XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgeyByZW5kZXJQYWdlTGF5b3V0LCByZW5kZXJJbml0aWFsU2NyZWVuIH0gZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcbmltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vbW9kdWxlcy9wdWJzdWJcIjtcblxucmVuZGVyUGFnZUxheW91dCgpO1xuZ2FtZUNvbnRyb2xsZXIuc2V0dXBHYW1lKCk7XG5yZW5kZXJJbml0aWFsU2NyZWVuKCk7XG4iXSwibmFtZXMiOlsiZ2FtZUNvbnRyb2xsZXIiLCJjcmVhdGVFbGVtZW50IiwicmVuZGVyTGlua0ljb24iLCJldmVudHMiLCJyZW5kZXJQYWdlTGF5b3V0IiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhlYWRlciIsImFwcGVuZENoaWxkIiwiZm9vdGVyIiwiYSIsImdldENvb3JkaW5hdGVzRnJvbUluZGV4ZXMiLCJyb3ciLCJjb2wiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJyZW5kZXJCb2FyZCIsImJvYXJkIiwicGxheWVyIiwiYm9hcmRDb250YWluZXIiLCJpIiwiY29sTGFiZWwiLCJmb3JFYWNoIiwicm93TGFiZWwiLCJjZWxsIiwiaiIsImNsYXNzZXMiLCJhdHRhY2tlZCIsInNoaXAiLCJjb29yZGluYXRlcyIsInJlbmRlckluaXRpYWxTY3JlZW4iLCJwbGF5ZXJCb2FyZCIsImdldFBsYXllciIsImdldEJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImdldENvbXB1dGVyIiwibWFpbiIsInBsYXllclNlY3Rpb24iLCJlbmVteVNlY3Rpb24iLCJQbGF5ZXIiLCJjb21wdXRlciIsImNyZWF0ZVBsYXllclNoaXBzIiwicGxhY2VTaGlwIiwic2V0dXBHYW1lIiwiZ2FtZU92ZXIiLCJ3aW5uZXIiLCJjb25zb2xlIiwibG9nIiwibmFtZSIsImNvbXB1dGVyVHVybiIsImVuZW15IiwibWFrZVJhbmRvbUF0dGFjayIsImhhdmVBbGxTaGlwc1N1bmsiLCJwbGF5VHVybiIsImF0dGFjayIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsImZpbGxCb2FyZCIsInB1c2giLCJzdGFydCIsImVuZCIsInN0YXJ0Q29sIiwic3RhcnRSb3ciLCJnZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzIiwiZW5kQ29sIiwiZW5kUm93IiwiZGlzdGFuY2UiLCJjaGFyQ29kZUF0IiwiZ2V0Q29vcmRpbmF0ZXMiLCJyZWNlaXZlQXR0YWNrIiwiRXJyb3IiLCJoaXQiLCJldmVyeSIsImlzU3VuayIsImVsZW1lbnQiLCJjb250ZW50IiwiYXR0cmlidXRlcyIsImVsZSIsInRleHRDb250ZW50IiwibGVuZ3RoIiwic3BsaXQiLCJteUNsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidmlld0JveCIsInBhdGgiLCJpY29uU3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiaWNvblBhdGgiLCJ0aXRsZSIsInNob3RzQXZhaWxhYmxlIiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsIl8iLCJzaG90TnVtYmVyIiwiZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJuIiwic2xpY2UiLCJnZXRDb29yZGluYXRlc0Zyb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZXROYW1lIiwib24iLCJldmVudE5hbWUiLCJmbiIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm9mZiIsInNwbGljZSIsImVtaXQiLCJkYXRhIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=