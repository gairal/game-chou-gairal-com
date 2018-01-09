import Entity from '../core/Entity';
import Go from '../traits/Go';

export default class Mario extends Entity {
  constructor(game) {
    super(game, {
      tileset: {
        name: 'mario',
        url: 'assets/json/mario.json',
      },
      init: {
        x: 5,
        y: 12,
        tile: 'idle',
      },
    });

    this.go = new Go(this);
  }

  init() {
    this.game.keyboard.add('ArrowRight', () => {
      this.go.vx = this.go.DIRS.forward;
    }, () => {
      this.go.vx = this.go.DIRS.idle;
    });

    this.game.keyboard.add('ArrowLeft', () => {
      this.go.vx = this.go.DIRS.backward;
    }, () => {
      this.go.vx = this.go.DIRS.idle;
    });

    this.game.keyboard.add('Space', () => {
      this.go.vy = this.go.DIRS.up;
    }, () => {
      this.go.vy = this.go.DIRS.idle;
    });

    return this;
  }

  run(delta) {
    this.go.update(delta);
    // this.sprite.x += 1;
    // console.log(this.sprite.x);
  }
}
