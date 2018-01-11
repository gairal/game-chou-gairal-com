import Trait from './Trait';

export default class Go extends Trait {
  constructor(entity) {
    super(entity, 'go');

    this.DIRS = {
      idle: 0,
      forward: 1,
      backward: -1,
    };

    this.dir = this.DIRS.idle;
    this.acceleration = 0.25;
    this.deceleration = 0.22;
    this.dragFactor = 1 / 300;

    this.distance = 0;
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
    const absX = Math.abs(this.entity.vel.x);

    if (this.dir) {
      this.entity.vel.x += this.dir * this.acceleration * delta;
      this.entity.orient(this.dir);
      this.entity.logPos();
    } else if (this.entity.vel.x) {
      const decel = Math.min(absX, this.deceleration * delta);
      this.entity.vel.x += this.entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }

    this.entity.vel.x -= this.dragFactor * this.entity.vel.x * absX;

    this.distance += absX * delta;
    this.entity.redraw();
  }
}
