import TileResolver from './TileResolver';

export default class TileCollider {
  constructor(entity) {
    this.entity = entity;
    this.tiles = new TileResolver(entity.game.level.grid);
  }

  check(cb) {
    // return new Promise((resolve) => {
    //   const matches = this.tiles.searchByRange(
    //     this.entity.pos.x, this.entity.pos.x + this.entity.size.x,
    //     this.entity.pos.y, this.entity.pos.y + this.entity.size.y,
    //   ).filter(match => match.tile.type && match.tile.type === 'hard');

    //   if (matches && matches.length) resolve(matches);
    // });
    const matches = this.tiles.searchByRange(
      this.entity.pos.x, this.entity.pos.x + this.entity.size.x,
      this.entity.pos.y, this.entity.pos.y + this.entity.size.y,
    ).filter(match => match.tile.type && match.tile.type === 'hard');

    if (matches && matches.length) cb(matches);
  }

  checkX() {
    // this.check()
    //   .then((matches) => {
    //     matches.forEach((match) => {
    //       if (this.entity.vel.x > 0) {
    //         if (this.entity.pos.x + this.entity.size.x > match.x1) {
    //           this.entity.pos.x = match.x1 - this.entity.size.x;
    //           this.entity.vel.x = 0;
    //         }
    //       } else if (this.entity.vel.x < 0) {
    //         if (this.entity.pos.x < match.x2) {
    //           this.entity.pos.x = match.x2;
    //           this.entity.vel.x = 0;
    //         }
    //       }
    //     });
    //   });
    this.check((matches) => {
      matches.forEach((match) => {
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
    });
  }

  checkY() {
    this.check((matches) => {
      matches.forEach((match) => {
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
    });
  }
}
