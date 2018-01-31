import { Text, TextStyle } from 'pixi.js';
import EntityCollider from '../collision/EntityCollider';
import Progress from './Progress';
import Level from './Level';
import Pb from './entities/Pb';
import Game from '../../ChuGame';

export default class Compositor {
  constructor(game) {
    this.game = game;

    this.layers = [];
    this.entities = [];

    this.progress = Progress.factory();
    this.entityCollider = new EntityCollider(this.entities);

    this.textStyle = new TextStyle({
      fontFamily: 'AdventureChu',
      fontSize: 36,
      fill: ['#57adeb', '#fd70f7'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: 'rgba(0, 0, 0, .5)',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6
  });
  }

  get app() {
    return this.game.app;
  }

  addEntity(entity) {
    this[entity.name] = entity;
    this.entities.push(entity);
  }

  stageText(str, x, y) {
    const text = new Text(str, this.textStyle);
    text.x = x * Game.constants.unit * Game.constants.scale;
    text.y = y * Game.constants.unit * Game.constants.scale;
    this.app.stage.addChild(text);
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
          }, {
            name: 'iceking',
            url: 'assets/json/iceking.json',
          },
        ])
        .on('progress', loader => this.progress.progress(loader, Game.constants.DEBUG))
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
      this.level.loadTexts();
      this.stageEntity(Pb);
      resolve();
    }).then(() => {
      this.game.camera.init();
      this.app.ticker.add(delta => this.update(delta));
    });

    this.game.input.addClick(1, (e) => {
      if (!Game.constants.DEBUG) return;

      this.pb.vel.set(0, 0);
      const posX = (this.game.camera.pivot.x - this.game.camera.center) + e.offsetX;
      this.pb.set(posX, e.offsetY);

      const euclPosX = Math.floor(posX / (Game.constants.unit * Game.constants.scale));
      const euclPosY = Math.floor(e.offsetY / (Game.constants.unit * Game.constants.scale));
      this.game.logger.info('x:', euclPosX, 'y:', euclPosY);
    });
  }

  init() {
    this.load().then(res => this.start(res));
  }
}
