import Trait from './Trait';

export default class Die extends Trait {
  constructor(entity) {
    super(entity, 'hack');

    this.height = entity.game.app.renderer.height;
  }

  update() {
    // Die if fall in a hole
    if (this.entity.y > this.height) this.entity.die();
  }
}
