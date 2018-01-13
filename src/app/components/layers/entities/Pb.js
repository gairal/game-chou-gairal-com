import Entity from '../../core/Entity';
import Physics from '../../traits/Physics';
import Go from '../../traits/Go';
import Jump from '../../traits/Jump';
import Hack from '../../traits/Hack';
import ChuGame from '../../../ChuGame/ChuGame';

export default class Pb extends Entity {
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
        height: 30, // 16
      },
    });

    this.addTrait(new Go(this));
    this.addTrait(new Jump(this));
    this.addTrait(new Physics(this));
    if (ChuGame.constants.DEBUG) {
      this.addTrait(new Hack(this));
    }
    this.addAnim('run', ['run-1', 'run-2', 'run-3'], 15);
  }

  routeFrame() {
    if (this.go.distance > 0) {
      return this.run.resolveFrame(this.go.distance);
    }

    return 'idle';
  }

  init() {
    [
      {
        key: 'KeyD',
        handler: (keyState) => {
          if (keyState) this.go.forward();
          else this.go.stop(this.go.DIRS.backward);
        },
      },
      {
        key: 'KeyA',
        handler: (keyState) => {
          if (keyState) this.go.backward();
          else this.go.stop(this.go.DIRS.forward);
        },
      },
      // {
      //   key: 'KeyP',
      //   handler: (keyState) => {
      //     console.log('tets');
      //     if (keyState) this.jump.start();
      //     else this.jump.cancel();
      //   },
      // },
      {
        key: 'Space',
        handler: (keyState) => {
          if (keyState) this.jump.start();
          else this.jump.cancel();
        },
      },
      {
        key: 'KeyO',
        handler: (keyState) => {
          this.go.dragFactor = keyState ? this.go.DRAGS.run : this.go.DRAGS.walk;
        },
      },
    ].forEach((k) => {
      this.game.input.addKey(k.key, k.handler);
    });

    this.game.input.addClick(1, (e) => {
      if (!ChuGame.constants.DEBUG) return;

      this.vel.set(0, 0);
      this.set(e.offsetX, e.offsetY);
    });

    return this;
  }
}
