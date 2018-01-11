import TileResolver from './TileResolver';

export default class TileCollider {
  constructor(entity) {
    this.entity = entity;
    this.tiles = new TileResolver(entity.game.level.grid);
  }

  check(type, cb) {
    console.log(this.entity.getBounds().x, this.entity.pos.x);
    let x1 = this.entity.bounds.left;
    let x2 = this.entity.bounds.right;
    let y1 = this.entity.bounds.top;
    let y2 = this.entity.bounds.bottom;

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
        if (this.entity.vel.x > 0) {
          if (this.entity.bounds.right > match.x1) {
            this.entity.pos.x = match.x1 - this.entity.size.x;
            this.entity.vel.x = 0;
          }
        } else if (this.entity.vel.x < 0) {
          if (this.entity.bounds.left < match.x2) {
            this.entity.pos.x = match.x2;
            this.entity.vel.x = 0;
          }
        }
      });
    });
  }

  checkY() {
    this.check('y', (matches) => {
      matches.forEach((match) => {
        if (this.entity.vel.y > 0) {
          if (this.entity.bounds.bottom > match.y1) {
            this.entity.pos.y = match.y1 - this.entity.size.y;
            this.entity.vel.y = 0;
          }
        } else if (this.entity.vel.y < 0) {
          if (this.entity.bounds.top < match.y2) {
            this.entity.pos.y = match.y2;
            this.entity.vel.y = 0;
          }
        }
      });
    });
  }
}
