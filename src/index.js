import "./style.scss";
import { renderPageLayout, renderInitialScreen } from "./modules/dom";
import gameController from "./modules/game";
import events from "./modules/pubsub";

renderPageLayout();
gameController.setupGame();
renderInitialScreen();
