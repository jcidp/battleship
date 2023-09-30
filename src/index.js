import "./style.scss";
import domController from "./modules/dom";
import gameController from "./modules/game";
import events from "./modules/pubsub";

gameController.setupGame();
domController.renderPageLayout();
