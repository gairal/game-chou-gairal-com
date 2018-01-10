import TileResolver from './TileResolver';

export default class TileCollider {
  constructor(entity) {
    this.entity = entity;
    this.tiles = new TileResolver(entity.game.level.grid);
  }

  checkX() {
    const matches = this.tiles.searchByRange(
      this.entity.pos.x, this.entity.pos.x + this.entity.size.x,
      this.entity.pos.y, this.entity.pos.y + this.entity.size.y,
    );

    if (!matches) return;

    matches.forEach((match) => {
      if (match.tile.type !== 'hard') return;

      if (this.entity.vel.x > 0) {
        if (this.entity.pos.x + this.entity.size.x > match.x1) {
          this.entity.pos.x = match.x1 - this.entity.size.x;
          this.entity.vel.x = 0;
        }
      } else if (this.entity.vel.x < 0) {
        if (this.entity.pos.x < match.x2) {
          this.entity.pos.x = match.x2;
          this.entity.vel.x = 0;
        }
      }
    });
  }

  checkY() {
    const matches = this.tiles.searchByRange(
      this.entity.pos.x, this.entity.pos.x + this.entity.size.x,
      this.entity.pos.y, this.entity.pos.y + this.entity.size.y,
    );

    if (!matches) return;

    matches.forEach((match) => {
      if (match.tile.type !== 'hard') return;

      if (this.entity.vel.y > 0) {
        if (this.entity.pos.y + this.entity.size.y > match.y1) {
          this.entity.pos.y = match.y1 - this.entity.size.y;
          this.entity.vel.y = 0;
        }
      } else if (this.entity.vel.y < 0) {
        if (this.entity.pos.y < match.y2) {
          this.entity.pos.y = match.y2;
          this.entity.vel.y = 0;
        }
      }
    });
  }
}
