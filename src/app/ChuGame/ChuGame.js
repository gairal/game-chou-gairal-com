import { Application } from 'pixi.js';
import Sprites from '../components/Sprites';

export default class ChuGame {
  constructor() {
    this.app = new Application();
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  init() {
    document.body.appendChild(this.app.view);
    Sprites.factory(this.app)
      .then(() => {
        this.app.ticker.add(() => {
          // each frame we spin the bunny around a bit
          // console.log('frame');
        });
      });
  }

  static factory() {
    const chuGame = new ChuGame();
    chuGame.init();
    return chuGame;
  }
}
