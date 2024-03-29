export default class Matrix {
  constructor() {
    this.grid = [];
  }

  get width() {
    return this.grid.length;
  }

  get height() {
    return this.grid[0].length;
  }

  get(x, y) {
    const col = this.grid[x];
    if (!col) return undefined;
    return col[y];
  }

  set(x, y, value = {}) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }
}
