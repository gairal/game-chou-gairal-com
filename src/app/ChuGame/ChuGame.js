import { Application } from 'pixi.js';

export default class ChuGame {
  constructor() {
    this.app = new Application();
  }

  init() {
    document.body.appendChild(this.app.view);
  }

  static factory() {
    const chuGame = new ChuGame();
    chuGame.init();
    return chuGame;
  }
}
