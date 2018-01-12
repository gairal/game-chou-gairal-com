import Entity from '../core/Entity';
import Physics from '../traits/Physics';
import Go from '../traits/Go';
import Jump from '../traits/Jump';
import ChuGame from '../../ChuGame/ChuGame';

export default class Mario extends Entity {
  constructor(game) {
    super(game, {
      name: 'pb',
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

    this.addTrait(new Go(this));
    this.addTrait(new Jump(this));
    this.addTrait(new Physics(this));
    this.addAnim('run', ['run-1', 'run-2', 'run-3'], 15);
  }

  routeFrame() {
    if (this.go.dir) {
      return this.run.resolveFrame(this.go.distance);
    }

    return 'idle';
  }

  init() {
    this.game.input.addKey('ArrowRight', () => this.go.forward(), () => this.go.stop());
    this.game.input.addKey('ArrowLeft', () => this.go.backward(), () => this.go.stop());

    this.game.input.addKey('Space', () => {
      this.jump.start();
    }, () => {
      this.jump.cancel();
    });

    this.game.input.addClick(1, (e) => {
      if (!ChuGame.constants.DEBUG) return;

      this.vel.set(0, 0);
      this.set(e.offsetX, e.offsetY);
    });

    return this;
  }
}
