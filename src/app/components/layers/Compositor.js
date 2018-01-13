import Progress from './Progress';
import Level from './Level';
import Mario from './Mario';

export default class Compositor {
  constructor(game) {
    this.game = game;

    this.layers = [];
    this.entities = [];

    this.progress = new Progress();
  }

  get app() {
    return this.game.app;
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
          {
            name: 'level',
            url: 'assets/json/minecraft.json',
          }, {
            name: 'pb',
            url: 'assets/json/pb-lg.json',
          },
        ])
        .on('progress', loader => this.progress.progress(loader))
        .load((loader, resources) => resolve(resources));
    });
  }

  /**
   * Update schene and entities
   *
   * @memberof Compositor
   */
  update(delta) {
    this.level.update(delta);
    this.entities.forEach(entity => entity.update(delta));
    this.game.camera.update();
  }

  /**
   * Start the game
   *
   * @param {PIXI.loaders.Resource} res
   * @memberof ChuGame
   */
  start(res) {
    this.game.resources = res;
    Promise.all([
      this.level = Level.factory(this.game),
      new Promise((resolve) => {
        this.mario = Mario.factory(this.game);
        this.entities.push(this.mario);
        this.entities.forEach(entity => entity.draw());
        resolve();
      }),
    ]).then(() => {
      this.game.camera.init();
      this.app.ticker.add(delta => this.update(delta));
    });
  }

  init() {
    this.load().then(res => this.start(res));
  }
}
