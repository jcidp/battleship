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
  return `${String.fromCharCode(row + 65)}${col + 1}`;
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
    player.board.placeShip("B6", "B10");
    player.board.placeShip("D1", "D4");
    player.board.placeShip("F4", "F6");
    player.board.placeShip("H2", "H3");
    player.board.placeShip("H8", "H9");
    player.board.placeShip("J3");
    player.board.placeShip("J8");
    console.log(player.getBoard());
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
    const shotIndex = this.constructor.getNumberFromCoordinates(coordinates);
    if (!this.shotsAvailable.includes(shotIndex)) return;
    enemy.board.receiveAttack(coordinates);
    this.shotsAvailable = this.shotsAvailable.filter(n => n !== shotIndex);
  }
  static getNumberFromCoordinates(coordinates) {
    return (coordinates.charCodeAt(0) - 65) * 10 + +coordinates.slice(1);
  }
  static getCoordinatesFromNumber(n) {
    return `${String.fromCharCode(Math.floor((n - 1) / 10) + 65)}${n % 10 === 0 ? 10 : n % 10}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztBQ0FzQjtBQUNnRDtBQUMxQjtBQUNOO0FBRXRDcEQsOERBQWdCLENBQUMsQ0FBQztBQUNsQkoscURBQWMsQ0FBQzhDLFNBQVMsQ0FBQyxDQUFDO0FBQzFCZixpRUFBbUIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcHVic3ViLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzPzc1YmEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmZ1bmN0aW9uIHJlbmRlclBhZ2VMYXlvdXQoKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgxXCIsIFwiQmF0dGxlc2hpcFwiKSk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICBib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpKTtcblxuICBjb25zdCBmb290ZXIgPSBjcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBjb25zdCBhID0gY3JlYXRlRWxlbWVudChcImFcIiwgXCJcIiwgXCJcIiwgW1xuICAgIFtcImhyZWZcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vamNpZHBcIl0sXG4gICAgW1widGFyZ2V0XCIsIFwiX2JsYW5rXCJdLFxuICBdKTtcbiAgYS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwicFwiLCBcIkNyZWF0ZWQgYnkgamNpZHBcIikpO1xuICBhLmFwcGVuZENoaWxkKFxuICAgIHJlbmRlckxpbmtJY29uKFxuICAgICAgXCJnaXRodWJcIixcbiAgICAgIFwiMCAwIDI0IDI0XCIsXG4gICAgICBcIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiLFxuICAgICksXG4gICk7XG4gIGZvb3Rlci5hcHBlbmRDaGlsZChhKTtcbiAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5mdW5jdGlvbiBnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzKHJvdywgY29sKSB7XG4gIHJldHVybiBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKHJvdyArIDY1KX0ke2NvbCArIDF9YDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQm9hcmQoYm9hcmQsIHBsYXllcikge1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgYCR7cGxheWVyfSBib2FyZGApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICBjb25zdCBjb2xMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJsYWJlbCBjb2xcIik7XG4gICAgY29sTGFiZWwuYXBwZW5kQ2hpbGQoXG4gICAgICBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBpID09PSAwID8gXCJcIiA6IFN0cmluZy5mcm9tQ2hhckNvZGUoaSArIDY0KSksXG4gICAgKTtcbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb2xMYWJlbCk7XG4gIH1cbiAgYm9hcmQuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93TGFiZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwibGFiZWwgcm93XCIpO1xuICAgIHJvd0xhYmVsLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGkgKyAxKSk7XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93TGFiZWwpO1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICBsZXQgY2xhc3NlcyA9IFwiY2VsbFwiO1xuICAgICAgaWYgKGNlbGwuYXR0YWNrZWQpIGNsYXNzZXMgKz0gXCIgYXR0YWNrZWRcIjtcbiAgICAgIGlmIChjZWxsLnNoaXApIGNsYXNzZXMgKz0gXCIgc2hpcFwiO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21JbmRleGVzKGksIGopO1xuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgY2xhc3NlcywgW1xuICAgICAgICAgIFtcImRhdGEtY29vcmRpbmF0ZXNcIiwgY29vcmRpbmF0ZXNdLFxuICAgICAgICBdKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYm9hcmRDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckluaXRpYWxTY3JlZW4oKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZUNvbnRyb2xsZXIuZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGdhbWVDb250cm9sbGVyLmdldENvbXB1dGVyKCkuZ2V0Qm9hcmQoKTtcblxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgcGxheWVyU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBwbGF5ZXJTZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIlBsYXllcidzIEJvYXJkXCIpKTtcbiAgcGxheWVyU2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChwbGF5ZXJCb2FyZCwgXCJwbGF5ZXJcIikpO1xuICBtYWluLmFwcGVuZENoaWxkKHBsYXllclNlY3Rpb24pO1xuXG4gIGNvbnN0IGVuZW15U2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBlbmVteVNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcImgyXCIsIFwiQ29tcHV0ZXIncyBCb2FyZFwiKSk7XG4gIGVuZW15U2VjdGlvbi5hcHBlbmRDaGlsZChyZW5kZXJCb2FyZChjb21wdXRlckJvYXJkLCBcImNvbXB1dGVyXCIpKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChlbmVteVNlY3Rpb24pO1xufVxuXG5leHBvcnQgeyByZW5kZXJQYWdlTGF5b3V0LCByZW5kZXJJbml0aWFsU2NyZWVuIH07XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXI7XG4gIGxldCBjb21wdXRlcjtcblxuICBjb25zdCBnZXRQbGF5ZXIgPSAoKSA9PiBwbGF5ZXI7XG4gIGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cbiAgY29uc3QgY3JlYXRlUGxheWVyU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChcIkI2XCIsIFwiQjEwXCIpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoXCJEMVwiLCBcIkQ0XCIpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoXCJGNFwiLCBcIkY2XCIpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoXCJIMlwiLCBcIkgzXCIpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoXCJIOFwiLCBcIkg5XCIpO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoXCJKM1wiKTtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKFwiSjhcIik7XG4gICAgY29uc29sZS5sb2cocGxheWVyLmdldEJvYXJkKCkpO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwR2FtZSA9ICgpID0+IHtcbiAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKFwicGxheWVyMVwiKTtcbiAgICBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiKTtcblxuICAgIGNyZWF0ZVBsYXllclNoaXBzKHBsYXllcik7XG4gICAgY3JlYXRlUGxheWVyU2hpcHMoY29tcHV0ZXIpO1xuICB9O1xuXG4gIGNvbnN0IGdhbWVPdmVyID0gKHdpbm5lcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGAke3dpbm5lci5uYW1lfSBoYXMgd29uIWApO1xuICAgIHJldHVybiB3aW5uZXI7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15ID0gZ2V0UGxheWVyKCk7XG4gICAgZ2V0Q29tcHV0ZXIoKS5tYWtlUmFuZG9tQXR0YWNrKGVuZW15KTtcbiAgICBpZiAoZW5lbXkuYm9hcmQuaGF2ZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBnYW1lT3ZlcihnZXRQbGF5ZXIoKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlUdXJuID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgZW5lbXkgPSBnZXRDb21wdXRlcigpO1xuICAgIGdldFBsYXllcigpLmF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpO1xuXG4gICAgaWYgKGVuZW15LmJvYXJkLmhhdmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZ2FtZU92ZXIoZ2V0UGxheWVyKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb21wdXRlclR1cm4oKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldHVwR2FtZSxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0Q29tcHV0ZXIsXG4gICAgcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jb25zdHJ1Y3Rvci5maWxsQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWxsQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKHsgYXR0YWNrZWQ6IGZhbHNlLCBzaGlwOiBudWxsIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IFtzdGFydENvbCwgc3RhcnRSb3ddID1cbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhzdGFydCk7XG4gICAgaWYgKCFlbmQpIHtcbiAgICAgIHRoaXMuYm9hcmRbc3RhcnRSb3ddW3N0YXJ0Q29sXS5zaGlwID0gbmV3IFNoaXAoMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IFtlbmRDb2wsIGVuZFJvd10gPSB0aGlzLmNvbnN0cnVjdG9yLmdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMoZW5kKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9XG4gICAgICBzdGFydFJvdyA9PT0gZW5kUm93ID8gZW5kQ29sIC0gc3RhcnRDb2wgKyAxIDogZW5kUm93IC0gc3RhcnRSb3cgKyAxO1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChkaXN0YW5jZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXN0YW5jZTsgaSsrKSB7XG4gICAgICBpZiAoc3RhcnRSb3cgPT09IGVuZFJvdykgdGhpcy5ib2FyZFtzdGFydFJvd11bc3RhcnRDb2wgKyBpXS5zaGlwID0gc2hpcDtcbiAgICAgIGVsc2UgdGhpcy5ib2FyZFtzdGFydFJvdyArIGldW3N0YXJ0Q29sXS5zaGlwID0gc2hpcDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIHJldHVybiBbY29vcmRpbmF0ZXMuY2hhckNvZGVBdCgwKSAtIDY1LCArY29vcmRpbmF0ZXNbMV0gLSAxXTtcbiAgfVxuXG4gIGdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW2NvbCwgcm93XSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SW5kZXhlc0Zyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoY2VsbC5hdHRhY2tlZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVwZWF0ZWQgY29vcmRpbmF0ZXNcIik7XG4gICAgaWYgKGNlbGwuc2hpcCkge1xuICAgICAgY2VsbC5zaGlwLmhpdCgpO1xuICAgIH1cbiAgICBjb25zdCBbY29sLCByb3ddID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRJbmRleGVzRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5hdHRhY2tlZCA9IHRydWU7XG4gIH1cblxuICBoYXZlQWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmV2ZXJ5KChyb3cpID0+XG4gICAgICByb3cuZXZlcnkoKGNlbGwpID0+ICFjZWxsLnNoaXAgfHwgY2VsbC5zaGlwLmlzU3VuaygpKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY29udGVudCwgY2xhc3NlcywgYXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICBpZiAoY29udGVudCkgZWxlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGUuY2xhc3NMaXN0LmFkZChteUNsYXNzKSk7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMpXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKSxcbiAgICApO1xuICByZXR1cm4gZWxlO1xufTtcblxuY29uc3QgcmVuZGVyTGlua0ljb24gPSAobmFtZSwgdmlld0JveCwgcGF0aCwgbXlDbGFzcykgPT4ge1xuICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBcInBhdGhcIixcbiAgKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG5cbiAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBwYXRoKTtcblxuICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcblxuICBpZiAobmFtZSA9PT0gXCJwZW5jaWxcIiB8fCBuYW1lID09PSBcImRlbGV0ZVwiKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIGlmIChteUNsYXNzKSBpY29uU3ZnLmNsYXNzTGlzdC5hZGQobXlDbGFzcyk7XG5cbiAgcmV0dXJuIGljb25Tdmc7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJMaW5rSWNvbiB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmZpbGwoKSwgKF8sIGkpID0+IGkgKyAxKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBzaG90SW5kZXggPSB0aGlzLmNvbnN0cnVjdG9yLmdldE51bWJlckZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKCF0aGlzLnNob3RzQXZhaWxhYmxlLmluY2x1ZGVzKHNob3RJbmRleCkpIHJldHVybjtcbiAgICBlbmVteS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLnNob3RzQXZhaWxhYmxlID0gdGhpcy5zaG90c0F2YWlsYWJsZS5maWx0ZXIoKG4pID0+IG4gIT09IHNob3RJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0TnVtYmVyRnJvbUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIChjb29yZGluYXRlcy5jaGFyQ29kZUF0KDApIC0gNjUpICogMTAgKyArY29vcmRpbmF0ZXMuc2xpY2UoMSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyKG4pIHtcbiAgICByZXR1cm4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKChuIC0gMSkgLyAxMCkgKyA2NSl9JHtcbiAgICAgIG4gJSAxMCA9PT0gMCA/IDEwIDogbiAlIDEwXG4gICAgfWA7XG4gIH1cblxuICBtYWtlUmFuZG9tQXR0YWNrKGVuZW15KSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmdldENvb3JkaW5hdGVzRnJvbU51bWJlcihcbiAgICAgIHRoaXMuc2hvdHNBdmFpbGFibGVbXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2hvdHNBdmFpbGFibGUubGVuZ3RoKVxuICAgICAgXSxcbiAgICApO1xuICAgIHRoaXMuYXR0YWNrKGVuZW15LCBjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQuYm9hcmQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgZXZlbnRzID0gKCgpID0+IHtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgY29uc3Qgb24gPSAoZXZlbnROYW1lLCBmbikgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV2ZW50cywgZXZlbnROYW1lKSlcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gIH07XG5cbiAgY29uc3Qgb2ZmID0gKGV2ZW50TmFtZSwgZm4pID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChldmVudHMsIGV2ZW50TmFtZSkpIHJldHVybjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVtaXQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXZlbnRzLCBldmVudE5hbWUpKSByZXR1cm47XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IGZuW2RhdGFdKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBlbWl0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMrKztcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBsdmg7XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC41ZW0gMDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XFxuICBwYWRkaW5nOiAwLjI1ZW0gMDtcXG59XFxuZm9vdGVyIGEge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuZm9vdGVyIHN2ZyB7XFxuICBtYXJnaW4tbGVmdDogMC41ZW07XFxuICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgZmlsbDogd2hpdGU7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLXRvcDogMmVtO1xcbn1cXG5zZWN0aW9uIGgyIHtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMSwgbWlubWF4KDMwcHgsIDFmcikpL3JlcGVhdCgxMSwgbWlubWF4KDMwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKCgxMDBzdmggLSAxMGVtKSAvIDIpO1xcbn1cXG4uYm9hcmQgLmxhYmVsIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5ib2FyZCAuY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNTU1O1xcbn1cXG4uYm9hcmQgLmNlbGwuc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBzdGVlbGJsdWU7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQU1BO0VBQ0Usc0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUxGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLCtDQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0Usc0JBcEJnQjtFQXFCaEIsWUFsQmE7RUFtQmIsa0JBQUE7RUFDQSxnQkFBQTtBQVBGOztBQVVBO0VBQ0Usc0JBM0JnQjtFQTRCaEIsaUJBQUE7QUFQRjtBQVNFO0VBQ0UsWUE1Qlc7RUE2QlgscUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0F0Q1c7QUE4QmY7O0FBY0E7RUFDRSxlQUFBO0FBWEY7QUFhRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFYSjs7QUFlQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDBFQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQ0FBQTtBQVpGO0FBY0U7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFaSjtBQWVFO0VBQ0Usc0JBQUE7QUFiSjtBQWVJO0VBQ0UsMkJBMUVVO0FBNkRoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkcHJpbWFyeS1jb2xvcjogc3RlZWxibHVlO1xcbiRzZWNvbmRhcnktY29sb3I6ICM1NTU7XFxuJGhpZ2hsaWdodC1jb2xvcjogcHVycGxlO1xcbiRwcmltYXJ5LWZjOiBibGFjaztcXG4kc2Vjb25kYXJ5LWZjOiB3aGl0ZTtcXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vLyBHZW5lcmFsIGxheW91dFxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgaGVpZ2h0OiAxMDBsdmg7XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LWNvbG9yO1xcbiAgY29sb3I6ICRzZWNvbmRhcnktZmM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjVlbSAwO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xcblxcbiAgYSB7XFxuICAgIGNvbG9yOiAkc2Vjb25kYXJ5LWZjO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xcbiAgICBtYXgtd2lkdGg6IDEuNWVtO1xcbiAgICBmaWxsOiAkc2Vjb25kYXJ5LWZjO1xcbiAgfVxcbn1cXG5cXG4vLyBHYW1lIHZpZXdcXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi10b3A6IDJlbTtcXG5cXG4gIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcblxcbi5ib2FyZCB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTEsIG1pbm1heCgzMHB4LCAxZnIpKSAvIHJlcGVhdCgxMSwgbWlubWF4KDMwcHgsIDFmcikpO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoKDEwMHN2aCAtIDEwZW0pIC8gMik7XFxuXFxuICAubGFiZWwge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuXFxuICAuY2VsbCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRzZWNvbmRhcnktY29sb3I7XFxuXFxuICAgICYuc2hpcCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICAgIH1cXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLnNjc3NcIjtcbmltcG9ydCB7IHJlbmRlclBhZ2VMYXlvdXQsIHJlbmRlckluaXRpYWxTY3JlZW4gfSBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL3B1YnN1YlwiO1xuXG5yZW5kZXJQYWdlTGF5b3V0KCk7XG5nYW1lQ29udHJvbGxlci5zZXR1cEdhbWUoKTtcbnJlbmRlckluaXRpYWxTY3JlZW4oKTtcbiJdLCJuYW1lcyI6WyJnYW1lQ29udHJvbGxlciIsImNyZWF0ZUVsZW1lbnQiLCJyZW5kZXJMaW5rSWNvbiIsImV2ZW50cyIsInJlbmRlclBhZ2VMYXlvdXQiLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGVhZGVyIiwiYXBwZW5kQ2hpbGQiLCJmb290ZXIiLCJhIiwiZ2V0Q29vcmRpbmF0ZXNGcm9tSW5kZXhlcyIsInJvdyIsImNvbCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJlbmRlckJvYXJkIiwiYm9hcmQiLCJwbGF5ZXIiLCJib2FyZENvbnRhaW5lciIsImkiLCJjb2xMYWJlbCIsImZvckVhY2giLCJyb3dMYWJlbCIsImNlbGwiLCJqIiwiY2xhc3NlcyIsImF0dGFja2VkIiwic2hpcCIsImNvb3JkaW5hdGVzIiwicmVuZGVySW5pdGlhbFNjcmVlbiIsInBsYXllckJvYXJkIiwiZ2V0UGxheWVyIiwiZ2V0Qm9hcmQiLCJjb21wdXRlckJvYXJkIiwiZ2V0Q29tcHV0ZXIiLCJtYWluIiwicGxheWVyU2VjdGlvbiIsImVuZW15U2VjdGlvbiIsIlBsYXllciIsImNvbXB1dGVyIiwiY3JlYXRlUGxheWVyU2hpcHMiLCJwbGFjZVNoaXAiLCJjb25zb2xlIiwibG9nIiwic2V0dXBHYW1lIiwiZ2FtZU92ZXIiLCJ3aW5uZXIiLCJuYW1lIiwiY29tcHV0ZXJUdXJuIiwiZW5lbXkiLCJtYWtlUmFuZG9tQXR0YWNrIiwiaGF2ZUFsbFNoaXBzU3VuayIsInBsYXlUdXJuIiwiYXR0YWNrIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwiZmlsbEJvYXJkIiwicHVzaCIsInN0YXJ0IiwiZW5kIiwic3RhcnRDb2wiLCJzdGFydFJvdyIsImdldEluZGV4ZXNGcm9tQ29vcmRpbmF0ZXMiLCJlbmRDb2wiLCJlbmRSb3ciLCJkaXN0YW5jZSIsImNoYXJDb2RlQXQiLCJnZXRDb29yZGluYXRlcyIsInJlY2VpdmVBdHRhY2siLCJFcnJvciIsImhpdCIsImV2ZXJ5IiwiaXNTdW5rIiwiZWxlbWVudCIsImNvbnRlbnQiLCJhdHRyaWJ1dGVzIiwiZWxlIiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJzcGxpdCIsIm15Q2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJhdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ2aWV3Qm94IiwicGF0aCIsImljb25TdmciLCJjcmVhdGVFbGVtZW50TlMiLCJpY29uUGF0aCIsInRpdGxlIiwic2hvdHNBdmFpbGFibGUiLCJBcnJheSIsImZyb20iLCJmaWxsIiwiXyIsInNob3RJbmRleCIsImdldE51bWJlckZyb21Db29yZGluYXRlcyIsImluY2x1ZGVzIiwiZmlsdGVyIiwibiIsInNsaWNlIiwiZ2V0Q29vcmRpbmF0ZXNGcm9tTnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0TmFtZSIsIm9uIiwiZXZlbnROYW1lIiwiZm4iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJvZmYiLCJzcGxpY2UiLCJlbWl0IiwiZGF0YSIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9