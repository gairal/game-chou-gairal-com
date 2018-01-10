import Game from '../../ChuGame';

export default class TileResolver {
  constructor(matrix) {
    this.matrix = matrix;
    this.tileSize = Game.constants.unit * Game.constants.scale;
  }

  toIndex(pos) {
    return Math.floor(pos / this.tileSize);
  }

  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range = [];
    let pos = pos1;
    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);

    return range;
  }

  get(x, y) {
    const tile = this.matrix.get(x, y);
    if (!tile) return undefined;
    return {
      tile,
      x1: x * this.tileSize,
      x2: (x * this.tileSize) + this.tileSize,
      y1: y * this.tileSize,
      y2: (y * this.tileSize) + this.tileSize,
    };
  }

  searchByPosition(x, y) {
    return this.get(this.toIndex(x), this.toIndex(y));
  }

  searchByRange(x1, x2, y1, y2) {
    const matches = [];
    this.toIndexRange(x1, x2).forEach((indexX) => {
      this.toIndexRange(y1, y2).forEach((indexY) => {
        const match = this.get(indexX, indexY);
        if (match) matches.push(match);
      });
    });

    return matches;
  }
}
