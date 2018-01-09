import Chubject from '../core/Chubject';
import map from './json/1-1.json';

export default class Level extends Chubject {
  constructor(game) {
    super(game, {
      tileset: {
        name: 'level',
        url: 'assets/json/level.json',
      },
    });

    this.map = map;
    this.sprites = [];
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

  draw(res) {
    this.textures = res.level.textures;

    let texture;
    this.map.layers.forEach((layer) => {
      layer.tiles.forEach((tile) => {
        if (!tile.name) return;
        texture = this.textures[tile.name];
        if (!texture) return;

        tile.ranges.forEach((range) => {
          const spans = Level.expandRange(range);
          spans.forEach(span => this.render(texture, span));
        });
      });
    });
  }
}
