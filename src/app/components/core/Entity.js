import Chubject from './Chubject';

export default class Entity extends Chubject {
  // constructor(game, opts) {
  //   super(game, opts);
  // }

  draw(res) {
    this.textures = res[this.tileset.name].textures;
    this.render(this.textures[this.opts.init.tile], {
      x: this.opts.init.x,
      y: this.opts.init.y,
    });
  }


  static factory(game) {
    const entity = new this(game);
    if (entity.init) entity.init();
    return entity;
  }
}
