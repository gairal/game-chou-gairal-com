import TileResolver from './TileResolver';
import Sides from '../core/Sides';

export default class TileCollider {
  constructor(entity) {
    this.entity = entity;
    this.tiles = new TileResolver(entity.game.compositor.level.grid);
  }

  check(type, cb) {
    if (!this.entity.hitable) return;

    this.entity.updateHitArea();
    let x1 = this.entity.left;
    let x2 = this.entity.right;
    let y1 = this.entity.top;
    let y2 = this.entity.bottom;

    switch (type) {
      case 'x':
        if (this.entity.vel.x === 0) return;
        if (this.entity.vel.x > 0) x1 = x2;
        else if (this.entity.vel.x < 0) x2 = x1;
        break;
      case 'y':
        if (this.entity.vel.y === 0) return;
        if (this.entity.vel.y > 0) y1 = y2;
        else if (this.entity.vel.y < 0) y2 = y1;
        break;
      default:
    }

    const matches = this.tiles.searchByRange(x1, x2, y1, y2).filter(match => match.tile.type && match.tile.type === 'hard');
    if (matches && matches.length) cb(matches);
  }

  checkX() {
    this.check('x', (matches) => {
      matches.forEach((match) => {
        if (this.entity.vel.x > 0 && this.entity.right > match.x1) {
          this.entity.obstruct(Sides.RIGHT, match);
        } else if (this.entity.vel.x < 0 && this.entity.left < match.x2) {
          this.entity.obstruct(Sides.LEFT, match);
        }
      });
    });
  }

  checkY() {
    this.check('y', (matches) => {
      matches.forEach((match) => {
        if (this.entity.vel.y > 0 && this.entity.bottom > match.y1) {
          this.entity.obstruct(Sides.BOTTOM, match);
        } else if (this.entity.vel.y < 0 && this.entity.top < match.y2) {
          this.entity.obstruct(Sides.TOP, match);
        }
      });
    });
  }
}
