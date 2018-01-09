import { Application } from 'pixi.js';
import Progress from '../components/Progress';
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

    this.opts = {
      unit: 16,
      scale: 2,
    };

    this.level = new Level(this);
    this.mario = new Mario(this);

    this.tilesets = [
      this.level.tileset,
      this.mario.tileset,
    ];

    this.progress = new Progress();
  }

  /**
   * Laod all spritesheets
   *
   * @returns Promise
   * @memberof ChuGame
   */
  load() {
    return new Promise((resolve) => {
      this.app.loader
        .add(this.tilesets)
        .on('progress', (loader) => this.progress.progress(loader))
        .load((loader, resources) => resolve(resources));
    });
  }

  /**
   * Start the game
   *
   * @param {PIXI.loaders.Resource} res
   * @memberof ChuGame
   */
  start(res) {
    this.level.draw(res);
    this.app.ticker.add(() => {
      this.mario.draw(res);
      // console.log('frame');
    });
  }

  /**
   * Centralized Game init
   *
   * @returns ChuGame
   * @memberof ChuGame
   */
  init() {
    this.load().then(res => this.start(res));
    window.addEventListener('resize', () => this
      .app.renderer.resize(window.innerWidth, window.innerHeight));
    document.body.appendChild(this.app.view);

    return this;
  }

  /**
   * init and returns an instance of ChuGame
   *
   * @static
   * @returns ChuGame
   * @memberof ChuGame
   */
  static factory() {
    return new ChuGame().init();
  }
}
