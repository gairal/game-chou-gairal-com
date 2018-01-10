import Entity from '../core/Entity';
import Logger from '../core/Logger';
import Physics from '../traits/Physics';
import Go from '../traits/Go';
import Jump from '../traits/Jump';
import ChuGame from '../../ChuGame/ChuGame';

export default class Mario extends Entity {
  constructor(game) {
    super(game, {
      tileset: {
        name: 'mario',
        url: 'assets/json/mario.json',
      },
      pos: {
        x: 4,
        y: 2,
        tile: 'idle',
      },
      vel: { x: 0, y: 0 },
      size: { x: 14 * ChuGame.constants.scale, y: 16 * ChuGame.constants.scale },
    });

    this.addTrait(new Go(this));
    this.addTrait(new Jump(this));
    this.addTrait(new Physics(this));
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
      if (ChuGame.constants.logLevel < Logger.levels.DEBUG) return;

      this.vel.set(0, 0);
      this.pos.x = e.offsetX;
      this.pos.y = e.offsetY;
    });

    return this;
  }
}
