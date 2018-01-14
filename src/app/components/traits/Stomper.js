import Trait from './Trait';

export default class Stomper extends Trait {
  constructor(entity) {
    super(entity, 'stomper');
    this.bounceSpeed = 10;
  }

  bounce(them) {
      // this.entity.bottom = them.top;
      this.entity.vel.y = -this.bounceSpeed;
  }

  // collides(us, them) {
  //     if (!them.killable || them.killable.dead) {
  //         return;
  //     }

  //     if (us.vel.y > them.vel.y) {
  //         this.bounce(us, them);
  //         this.onStomp(us, them);
  //     }
  // }
}
