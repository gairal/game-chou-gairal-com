import Trait from './Trait';

export default class LspBehavior extends Trait {
  constructor(entity) {
    super(entity, 'lspBehavior');
  }

  collides(them) {
    if (this.entity.killable.dead) return;
    // Die if fall in a hole
    if (them.stomper) {
      this.entity.killable.kill();
      this.entity.scout.speed = 0;
      them.stomper.bounce(this.entity);
    } else this.entity.scout.speed *= -1;
  }
}
