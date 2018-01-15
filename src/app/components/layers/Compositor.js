import EntityCollider from '../collision/EntityCollider';
import Progress from './Progress';
import Level from './Level';
import Pb from './entities/Pb';

export default class Compositor {
  constructor(game) {
    this.game = game;

    this.layers = [];
    this.entities = [];

    this.progress = new Progress();
    this.entityCollider = new EntityCollider(this.entities);
  }

  get app() {
    return this.game.app;
  }

  addEntity(entity) {
    this[entity.name] = entity;
    this.entities.push(entity);
  }

  stageEntity(type, x, y) {
    const entity = type.factory(this.game);
    this.addEntity(entity);
    entity.draw();
    entity.uuid = Date.now();

    if (x) entity.indexX = x;
    if (y) entity.indexY = y;
  }

  delete(entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) this.entities.splice(index, 1);
    delete this[entity.name];
    this.app.stage.removeChild(entity);
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
          }, {
            name: 'finn',
            url: 'assets/json/finn.json',
          }, {
            name: 'lsp',
            url: 'assets/json/lsp.json',
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
    this.entities.forEach((entity) => {
      entity.update(delta);
    });
    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    });
    this.entities.forEach((entity) => {
      entity.finalize();
    });
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
    new Promise((resolve) => {
      this.level = Level.factory(this.game);
      this.level.loadEntites();
      this.stageEntity(Pb);
      resolve();
    }).then(() => {
      this.game.camera.init();
      this.app.ticker.add(delta => this.update(delta));
    });
  }

  init() {
    this.load().then(res => this.start(res));
  }
}
