import Entity from '../../core/Entity';
import Hitable from '../../traits/Hitable';
import Killable from '../../traits/Killable';
import Physics from '../../traits/Physics';
import Go from '../../traits/Go';
import Jump from '../../traits/Jump';
import Fall from '../../traits/Fall';
import Stomper from '../../traits/Stomper';
// import Hack from '../../traits/Hack';
import ChuGame from '../../../ChuGame/ChuGame';

export default class Pb extends Entity {
  constructor(game) {
    super(game, {
      name: 'pb',
      init: {
        x: 4, // 4
        y: 2,
        tile: 'idle',
      },
      hitbox: {
        width: 16, // 14
        height: 30, // 16
      },
    });

    [
      Physics,
      Hitable,
      Killable,
      Go,
      Jump,
      Stomper,
      Fall,
    ].forEach(type => this.addTrait(type));
    if (ChuGame.constants.DEBUG) {
      // this.addTrait(Hack);
    }
    this.killable.removeAfter = 0;
    this.addAnim('run', ['run-1', 'run-2', 'run-3'], 15);
  }

  routeFrame() {
    if (this.go.distance > 0) {
      return this.run.resolveFrame(this.go.distance);
    }

    return 'idle';
  }

  die() {
    this.killable.revive();
    this.setIndex(this.opts.init.x, this.opts.init.y);
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
    ].forEach(({ key, handler }) => this.game.input.addKey(key, handler));

    return this;
  }
}
