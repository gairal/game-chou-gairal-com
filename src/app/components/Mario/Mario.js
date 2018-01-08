import Entity from '../core/Entity';

export default class Mario extends Entity {
  constructor(game) {
    super(game, {
      tileset: {
        name: 'mario',
        url: 'assets/json/mario.json',
      },
    });
  }

  draw(res) {
    this.textures = res.mario.textures;

    this.render(this.textures.idle, { x: 5, y: 12 });
  }
}
