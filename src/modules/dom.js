import { createElement, renderLinkIcon } from "./helpers";
import events from "./pubsub";

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
    events.emit("playerAttack", e.target.id);
  }

  function rotateShip(e) {
    try {
      events.emit("moveShip", [e.target.closest(".cell").id]);
      renderSetupBoard();
      display("Drag your ships to move them. Click them to rotate them.");
    } catch (error) {
      if (error.message === "Target position is occupied")
        display("Not enough space to rotate that ship. Ships can't touch.");
      else if (error.message === "Invalid Coordinates")
        display("There's not enough space to rotate your ship");
      else console.log(error);
    }
  }

  function getCoordinatesOffset(coordinates, offset, direction) {
    if (direction === "h") {
      return (
        String.fromCharCode(coordinates.charCodeAt(0) - offset) +
        coordinates.slice(1)
      );
    }
    return coordinates[0] + (+coordinates.slice(1) - offset);
  }

  // Drag & drop handlers
  function drag(e) {
    //e.preventDefault();
    e.dataTransfer.setData("text/coordinates", e.target.closest(".cell").id);
    const lengthX =
      e.target.dataset.direction === "h"
        ? e.target.offsetWidth / +e.target.dataset.length
        : e.target.offsetWidth;
    const lengthY =
      e.target.dataset.direction === "v"
        ? e.target.offsetHeight / +e.target.dataset.length
        : e.target.offsetHeight;
    const squareOffset =
      e.target.dataset.direction === "h"
        ? Math.floor(e.offsetX / lengthX)
        : Math.floor(e.offsetY / lengthY);
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
      const { direction } = sourceCell.firstElementChild.dataset;
      const targetCoordinates = getCoordinatesOffset(
        e.target.id,
        offSet,
        direction,
      );
      events.emit("moveShip", [sourceCoordinates, targetCoordinates]);
      renderSetupBoard();
      display("Drag your ships to move them. Click them to rotate them.");
    } catch (error) {
      if (error.message === "Target position is occupied")
        display("Not enough space there for your ship. Ships can't touch.");
      else if (error.message === "Invalid Coordinates")
        display("The position you're trying to move your ship to is invalid.");
      else console.log(error);
    }
  }

  function dragend(e) {
    const ships = document.querySelectorAll(".drag-ship");
    ships.forEach((ship) => (ship.style.zIndex = 1));
  }

  function renderBoard(board, player) {
    const boardContainer = createElement("div", null, `${player} board`);
    for (let i = 0; i < 11; i++) {
      const colLabel = createElement("div", null, "label col");
      colLabel.appendChild(
        createElement("span", i === 0 ? "" : String.fromCharCode(i + 64)),
      );
      boardContainer.appendChild(colLabel);
    }
    board.forEach((row, i) => {
      const rowLabel = createElement("div", null, "label row");
      rowLabel.appendChild(createElement("span", i + 1));
      boardContainer.appendChild(rowLabel);
      row.forEach((cell, j) => {
        let classes = "cell";
        if (cell.attacked) classes += " attacked";
        if (cell.ship && player === "player") classes += " ship";
        const coordinates = getCoordinatesFromIndexes(i, j);
        const cellElement = createElement("div", null, classes, [
          ["id", coordinates],
        ]);
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
            const ship = createElement("div", null, "drag-ship", [
              ["draggable", true],
              ["data-length", cell.ship.length],
              ["data-direction", cell.ship.direction],
            ]);
            ship.addEventListener("click", rotateShip);
            ship.addEventListener("dragstart", drag);
            ship.addEventListener("dragend", dragend);
            if (cell.ship.direction === "h")
              ship.style.width = `calc(${cell.ship.length * 100}% + ${
                cell.ship.length * 2 - 2
              }px`;
            else
              ship.style.height = `calc(${cell.ship.length * 100}% + ${
                cell.ship.length * 2 - 2
              }px`;
            cellElement.appendChild(ship);
          }
        }
      });
    });
    return boardContainer;
  }

  function startGame() {
    events.emit("startGame");
    renderGameScreen();
  }

  function renderControls(buttonClass) {
    const buttonText = buttonClass === "new-game" ? "+ New Game" : "Start Game";
    const displayText =
      buttonClass === "new-game"
        ? "Click on the enemy's board to attack"
        : "Drag your ships to move them. Click them to rotate them.";
    const fn = buttonClass === "new-game" ? restartGame : startGame;
    const controlSection = createElement("section", null, "controls");
    const btn = createElement("button", buttonText, buttonClass);
    btn.addEventListener("click", fn);
    controlSection.appendChild(btn);
    const textDisplay = createElement("div", null, "display");
    textDisplay.appendChild(createElement("p", displayText, "display__text"));
    controlSection.appendChild(textDisplay);
    return controlSection;
  }

  function renderGameScreen() {
    const main = document.querySelector("main");
    cleanElement(main);
    main.appendChild(renderControls("new-game"));

    const playerSection = createElement("section");
    playerSection.appendChild(createElement("h2", "Your Board"));
    playerSection.appendChild(renderBoard(boards.player, "player"));
    main.appendChild(playerSection);

    const enemySection = createElement("section");
    enemySection.appendChild(createElement("h2", "Enemy's Board"));
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
    events.emit("restartGame");
    const body = document.querySelector("body");
    cleanElement(body);
    renderPageLayout();
  }

  function randomizePlayerBoard() {
    events.emit("RandomizePlayerBoard");
    renderSetupBoard();
  }

  function renderSetupBoard() {
    const playerSection = document.querySelector("section.player.setup");
    cleanElement(playerSection);
    playerSection.appendChild(createElement("h2", "Your Board"));
    playerSection.appendChild(renderBoard(boards.player, "dummy"));
    const randomizeBtn = createElement("button", "Randomize", "randomize");
    randomizeBtn.addEventListener("click", randomizePlayerBoard);
    const btnContainer = createElement("div", null, "btn-container");
    btnContainer.appendChild(randomizeBtn);
    playerSection.appendChild(btnContainer);
  }

  function renderPageLayout() {
    const body = document.querySelector("body");

    const header = createElement("header");
    header.appendChild(createElement("h1", "Battleship"));
    body.appendChild(header);

    const main = createElement("main");
    main.appendChild(renderControls("start-game"));

    const playerSection = createElement("section", null, "player setup");

    main.appendChild(playerSection);

    body.appendChild(main);

    const footer = createElement("footer");
    const a = createElement("a", "", "", [
      ["href", "https://github.com/jcidp"],
      ["target", "_blank"],
    ]);
    a.appendChild(createElement("p", "Created by jcidp"));
    a.appendChild(
      renderLinkIcon(
        "github",
        "0 0 24 24",
        "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z",
      ),
    );
    footer.appendChild(a);
    body.appendChild(footer);

    renderSetupBoard();
  }

  events.on("setupBoards", setupBoards);
  events.on("turnEnd", updateScreen);
  events.on("gameOver", showGameOver);

  return {
    renderPageLayout,
    renderGameScreen,
    updateScreen,
  };
})();

export default domController;
