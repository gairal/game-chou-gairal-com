import Matrix from '../../core/Matrix';
import map from './json/1-1.json';
import Tile from '../../core/Tile';

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
    let xStart;
    let xLen;
    let yStart;
    let yLen;

    if (range.length === 4) {
      [xStart, xLen, yStart, yLen] = range;
    } else if (range.length === 3) {
      [xStart, xLen, yStart] = range;
      yLen = 1;
    } else if (range.length === 2) {
      [xStart, yStart] = range;
      xLen = 1;
      yLen = 1;
    }

    return Level.expandSpan(xStart, xLen, yStart, yLen);
  }

  resetTile(x, y) {
    const { sprite } = this.grid.get(x, y);
    this.grid.set(x, y);

    this.game.app.stage.removeChild(sprite);
  }

  update(delta) {
    this.updatables.forEach((sprite) => {
      sprite.redraw(this.totalTime);
    });

    this.totalTime += delta;
  }

  /**
   * Render one tile on the level
   *
   * @param {any} texture
   * @param {any} tile
   * @param {any} span
   * @memberof Level
   */
  renderTile(texture, tile, span) {
    if (tile.name === 'void') {
      this.resetTile(span.x, span.y);
    } else {
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
    }
  }

  draw() {
    return new Promise((resolve) => {
      let texture;
      this.map.layers.forEach((layer) => {
        layer.tiles.forEach((tile) => {
          if (!tile.name
           || (!tile.name === 'void' && this.textures.indexOf(tile.name) <= -1)) return;
          texture = this.textures[tile.name];

          tile.ranges
            .forEach(range => Level.expandRange(range)
              .forEach(span => this.renderTile(texture, tile, span)));
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
