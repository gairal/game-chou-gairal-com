import Trait from './Trait';
import Sides from '../core/Sides';

export default class Hitable extends Trait {
  constructor(entity) {
    super(entity, 'hitable');
    this.obstructs = true;
  }

  obstruct(side, {
    x1, x2, y1, y2,
  }) {
    if (!this.obstructs) {
      return;
    }

    switch (side) {
      case Sides.BOTTOM:
        this.entity.bottom = y1;
        this.entity.vel.y = 0;
        break;
      case Sides.TOP:
        this.entity.top = y2;
        this.entity.vel.y = 0;
        break;
      case Sides.LEFT:
        this.entity.left = x2;
        this.entity.vel.x = 0;
        break;
      case Sides.RIGHT:
        this.entity.right = x1;
        this.entity.vel.x = 0;
        break;
      default:
        break;
    }
  }

  update(delta) {
    this.entity.x += this.entity.vel.x * delta;
    this.entity.tileCollider.checkX();

    this.entity.y += this.entity.vel.y * delta;
    this.entity.tileCollider.checkY();

    this.entity.showHit();
  }
}
