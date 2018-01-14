import Trait from './Trait';

export default class Dance extends Trait {
  constructor(entity) {
    super(entity, 'dance');

    this.totalTime = 2;
  }

  forward() {
    this.dir = this.DIRS.forward;
  }

  backward() {
    this.dir = this.DIRS.backward;
  }

  stop() {
    this.dir = this.DIRS.idle;
    // this.entity.vel.x = 0;
  }

  update(delta) {
    this.entity.redraw(this.totalTime);
    this.totalTime += delta;
  }
}
