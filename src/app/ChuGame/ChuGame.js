import { Application } from 'pixi.js';
import Logger from '../components/core/Logger';
import Progress from '../components/Progress';
import Input from '../components/core/Input';
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

    // default stuff
    this.input = Input.factory();
    this.progress = new Progress();

    // level
    this.level = new Level(this);

    // entities
    this.mario = Mario.factory(this);
    this.entities = [
      this.mario,
    ];

    this.logger = new Logger({ level: ChuGame.constants.logLevel });
  }

  static get constants() {
    return {
      unit: 16,
      scale: 2,
      gravity: 0.5,
      hasGravity: true,
      logLevel: Logger.levels.LOG,
      DEBUG: true,
    };
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
        .add([
          this.level.tileset,
          this.mario.tileset,
        ])
        .on('progress', loader => this.progress.progress(loader))
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
    Promise.all([
      this.level.draw(res),
      new Promise((resolve) => {
        // TODO: Careful ! draw() returns also a Promise so not sure evrything will be ready
        this.entities.forEach(entity => entity.draw(res));
        resolve();
      }),
    ]).then(() => {
      this.app.ticker.add((delta) => {
        this.entities.forEach(entity => entity.update(delta));
      });
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
