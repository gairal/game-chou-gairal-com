import Trait from './Trait';

export default class Stomper extends Trait {
  constructor(entity) {
    super(entity, 'stomper');
    this.bounceSpeed = 10;

    this.onStomp = () => {};
  }

  bounce() {
    this.entity.vel.y = -this.bounceSpeed;
  }

  collides(them) {
    // console.log('stomper', this.entity.vel.y, them.vel.y);
    if (!them.killable || them.killable.dead) {
      return;
    }

    if (this.entity.vel.y > them.vel.y) {
      this.bounce();
      this.onStomp(them);
    }
  }
}
