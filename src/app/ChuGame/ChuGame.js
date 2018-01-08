import { Application } from 'pixi.js';
import Level from '../components/Level';
import Mario from '../components/Mario';

export default class ChuGame {
  constructor() {
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      resolution: 1,
    });
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;

    this.unit = 16;
    this.scale = 2;
    this.level = new Level(this);
    this.mario = new Mario(this);
  }

  loadSpriteSheets() {
    return new Promise((resolve) => {
      this.app.loader
        .add(this.level.tileset)
        .add(this.mario.tileset)
        .load((loader, resources) => resolve(resources));
    });
  }

  init() {
    document.body.appendChild(this.app.view);
    this.loadSpriteSheets()
      .then((res) => {
        this.level.draw(res);
        this.app.ticker.add(() => {
          this.mario.draw(res);
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
