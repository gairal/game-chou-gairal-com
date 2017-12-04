import { Sprite } from 'pixi.js';

export default class Sprites {
  constructor(app) {
    this.app = app;
    this.tilesets = [
      {
        name: 'level',
        url: 'assets/img/level.png',
      },
      {
        name: 'mario',
        url: 'assets/img/mario3.png',
      },
    ];
  }

  load() {
    return new Promise((resolve) => {
      this.app.loader
        .add(this.tilesets)
        .load((loader, resources) => {
          resolve({ app: this.app, loader, resources });
        });
    });
  }

  static add(res) {
    return new Promise((resolve) => {
      const level = new Sprite(res.resources.level.texture);
      level.x = 96;
      level.y = 96;
      level.scale.x = 2;
      level.scale.y = 2;
      res.app.stage.addChild(level);
      resolve();
    });
  }

  static factory(app) {
    const sprites = new Sprites(app);
    return new Promise((resolve) => {
      sprites
        .load()
        .then(Sprites.add)
        .then(resolve);
    });
  }
}
