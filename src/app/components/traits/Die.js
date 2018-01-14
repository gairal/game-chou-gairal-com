import Trait from './Trait';
import Game from '../../ChuGame';

export default class Die extends Trait {
  constructor(entity) {
    super(entity, 'hack');

    this.height = entity.game.app.renderer.height;
  }

  update(delta) {
    // Die if fall in a hole
    if (this.entity.y > this.height) this.entity.die();
  }
}
