import Entity from '../../core/Entity';

export default class Finn extends Entity {
  constructor(game) {
    super(game, {
      name: 'finn',
      pos: {
        x: 4,
        y: 2,
        tile: 'idle',
      },
      hitbox: {
        width: 16, // 14
        height: 32, // 16
      },
    });

    this.addAnim('run', ['run-1', 'run-2', 'run-3'], 15);
  }

  routeFrame() {
    if (this.go.dir) {
      return this.run.resolveFrame(this.go.distance);
    }

    return 'idle';
  }

  init() {
    return this;
  }
}
