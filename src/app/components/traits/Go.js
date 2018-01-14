import Trait from './Trait';

export default class Go extends Trait {
  constructor(entity) {
    super(entity, 'go');

    this.DIRS = {
      idle: 0,
      forward: 1,
      backward: -1,
    };

    this.DRAGS = {
      walk: 1 / 50,
      run: 1 / 300,
    };

    this.dir = this.DIRS.idle;
    this.acceleration = 0.30;
    this.deceleration = 0.40;
    this.dragFactor = this.DRAGS.walk;

    this.distance = 0;
  }

  forward() {
    if (this.dir === this.DIRS.forward) return;
    this.dir += this.DIRS.forward;
  }

  backward() {
    if (this.dir === this.DIRS.backward) return;
    this.dir += this.DIRS.backward;
  }

  stop(dir) {
    this.dir += dir;
  }

  update(delta) {
    const absX = Math.abs(this.entity.vel.x);

    if (this.dir) {
      this.entity.vel.x += this.dir * this.acceleration * delta;
      if (!this.entity.jump || this.entity.jump.falling) this.entity.orient(this.dir);
      this.entity.logPos();
    } else if (this.entity.vel.x) {
      const decel = Math.min(absX, this.deceleration * delta);
      this.entity.vel.x += this.entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }

    this.entity.vel.x -= this.dragFactor * this.entity.vel.x * absX;

    this.distance += absX * delta;
  }
}
