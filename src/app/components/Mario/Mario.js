import Entity from '../core/Entity';
import Physics from '../traits/Physics';
import Go from '../traits/Go';
import Jump from '../traits/Jump';

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
      vel: {
        x: 0,
        y: 0,
      },
    });

    this.addTrait(new Physics(this));
    this.addTrait(new Go(this));
    this.addTrait(new Jump(this));
  }

  init() {
    this.game.keyboard.add('ArrowRight', () => this.go.forward(), () => this.go.stop());
    this.game.keyboard.add('ArrowLeft', () => this.go.backward(), () => this.go.stop());

    this.game.keyboard.add('Space', () => {
      this.jump.start();
    }, () => {
      this.jump.cancel();
    });

    return this;
  }
}
