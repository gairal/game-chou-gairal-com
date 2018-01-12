import Matrix from '../core/Matrix';
import map from './json/1-1.json';
import Tile from '../core/Tile';

export default class Level {
  constructor(game) {
    this.game = game;
    this.name = 'level';
    this.totalTime = 0;

    this.map = map;
    this.grid = new Matrix();
    this.updatables = [];
  }

  get textures() {
    return this.game.resources[this.name].textures;
  }

  static expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    const res = [];
    for (let x = xStart; x < xEnd; x += 1) {
      for (let y = yStart; y < yEnd; y += 1) {
        res.push({ x, y });
      }
    }

    return res;
  }

  static expandRange(range) {
    if (range.length === 4) {
      const [xStart, xLen, yStart, yLen] = range;
      return Level.expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
      const [xStart, xLen, yStart] = range;
      return Level.expandSpan(xStart, xLen, yStart, 1);
    } else if (range.length === 2) {
      const [xStart, yStart] = range;
      return Level.expandSpan(xStart, 1, yStart, 1);
    }

    return null;
  }

  update(delta) {
    this.updatables.forEach((sprite) => {
      sprite.redraw(this.totalTime);
    });

    this.totalTime += delta;
  }

  draw() {
    return new Promise((resolve) => {
      let texture;
      this.map.layers.forEach((layer) => {
        layer.tiles.forEach((tile) => {
          if (!tile.name) return;
          texture = this.textures[tile.name];
          if (!texture) return;

          tile.ranges.forEach((range) => {
            const spans = Level.expandRange(range);
            spans.forEach((span) => {
              const sprite = new Tile(this.game);
              sprite.render(texture, span);

              this.grid.set(span.x, span.y, {
                type: tile.type,
                sprite,
              });

              const anim = this.map.animations[tile.name];
              if (anim) {
                sprite.addAnim('defaultAnim', anim.frames, anim.frameLen);
                this.updatables.push(sprite);
              }
            });
          });
        });
      });

      resolve();
    });
  }

  static factory(game) {
    const level = new Level(game);
    level.draw();
    return level;
  }
}
