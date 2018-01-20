import Matrix from '../../core/Matrix';
import map from './json/1-1.json';
import Tile from '../../core/Tile';
import Lsp from '../entities/Lsp';
import Finn from '../entities/Finn';

export default class Level {
  constructor(game) {
    this.game = game;
    this.name = 'level';
    this.textures = this.game.resources[this.name].textures;
    this.totalTime = 0;

    this.map = map;
    this.grid = new Matrix();
    this.updatables = [];

    this.entityMap = {
      lsp: Lsp,
      finn: Finn,
    };
  }

  /**
   * Return an array coresponding to coordinates of a range
   *
   * @static
   * @param {any} xStart
   * @param {any} xLen
   * @param {any} yStart
   * @param {any} yLen
   * @returns
   * @memberof Level
   */
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

  /**
   * Expand a range given in the format
   * [x, width, y, height]
   *
   * @static
   * @param {any} range
   * @returns
   * @memberof Level
   */
  static expandRange(range, offsetX = 0, offsetY = 0) {
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

    xStart += offsetX;
    yStart += offsetY;

    return Level.expandSpan(xStart, xLen, yStart, yLen);
  }

  /**
   * Resets a tile in the grid and destroys its sprite
   *
   * @param {any} x
   * @param {any} y
   * @memberof Level
   */
  resetTile(x, y) {
    const tile = this.grid.get(x, y);

    if (tile) {
      this.grid.set(x, y);
      this.game.app.stage.removeChild(tile.sprite);
    }
  }

  /**
   * Render one tile on the level
   *
   * @param {any} texture
   * @param {any} tile
   * @param {any} span
   * @memberof Level
   */
  renderTile(tile, span, texture) {
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

  /**
   * Run at each tick
   *
   * @param {any} delta
   * @memberof Level
   */
  update(delta) {
    this.updatables.forEach((sprite) => {
      sprite.redraw(this.totalTime);
    });

    this.totalTime += delta;
  }

  expandTile(tile, offsetX, offsetY) {
    if (!tile.name && !tile.pattern) return;

    let metMeth;

    if (tile.name) {
      const texture = this.textures[tile.name];
      if (!texture && tile.name !== 'void') return;

      metMeth = range => Level.expandRange(range, offsetX, offsetY)
        .forEach(span => this.renderTile(tile, span, texture));
    } else {
      const { tiles } = this.map.patterns[tile.pattern];
      metMeth = range => this.expandTiles(tiles, range[0] + offsetX, range[1] + offsetY);
    }

    tile.ranges.forEach(metMeth);
  }

  expandTiles(tiles, offsetX = 0, offsetY = 0) {
    tiles.forEach(tile => this.expandTile(tile, offsetX, offsetY));
  }

  /**
   * Load all vilains !!
   *
   * @memberof Level
   */
  loadEntites() {
    this.map.entities
      .forEach(({ name, pos: [x, y] }) => this.game.compositor
        .stageEntity(this.entityMap[name], x, y));
  }

  /**
   * First rendering
   *
   * @returns
   * @memberof Level
   */
  draw() {
    return new Promise((resolve) => {
      this.map.layers
        .forEach(({ tiles }) => this.expandTiles(tiles));
      resolve();
    });
  }

  static factory(game) {
    const level = new Level(game);
    level.draw();
    return level;
  }
}
