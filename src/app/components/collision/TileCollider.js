import TileResolver from './TileResolver';
import Sides from '../core/Sides';

export default class TileCollider {
  constructor(entity) {
    this.entity = entity;
    this.tiles = new TileResolver(entity.game.compositor.level.grid);
  }

  check(type, cb) {
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
      matches.forEach(({ x1, x2 }) => {
        if (this.entity.vel.x > 0) {
          if (this.entity.right > x1) {
            this.entity.x = (x1 - this.entity.hitArea.width) + this.entity.offsetX;
            this.entity.vel.x = 0;
            this.entity.obstruct(Sides.RIGHT);
          }
        } else if (this.entity.vel.x < 0) {
          if (this.entity.left < x2) {
            this.entity.x = x2 + this.entity.offsetX;
            this.entity.vel.x = 0;
            this.entity.obstruct(Sides.LEFT);
          }
        }
      });
    });
  }

  checkY() {
    this.check('y', (matches) => {
      matches.forEach(({ y1, y2 }) => {
        if (this.entity.vel.y > 0) {
          if (this.entity.bottom > y1) {
            this.entity.y = y1 - this.entity.hitArea.height;
            this.entity.vel.y = 0;
            this.entity.obstruct(Sides.BOTTOM);
          }
        } else if (this.entity.vel.y < 0) {
          if (this.entity.top < y2) {
            this.entity.y = y2;
            this.entity.vel.y = 0;
            this.entity.obstruct(Sides.TOP);
          }
        }
      });
    });
  }
}
