import Trait from './Trait';

export default class Dance extends Trait {
  constructor(entity) {
    super(entity, 'fly');

    this.steps = 0;
    this.speed = 2;
  }

  bounce() {
    this.speed *= -1;
    this.entity.orient(Math.sign(this.speed));
  }

  update(delta) {
    this.steps += delta;

    if (this.steps > 80) {
      this.bounce();
      this.steps = 0;
    }
    this.entity.vel.x = this.speed;
  }
}
