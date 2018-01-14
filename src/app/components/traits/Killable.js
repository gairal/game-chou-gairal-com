import Trait from './Trait';

export default class Killable extends Trait {
  constructor(entity) {
    super(entity, 'killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 2;
  }

  kill() {
    this.dead = true;
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(delta) {
    if (this.dead) {
      this.deadTime += delta;
      if (this.deadTime > this.removeAfter) {
        // level.delete(entity);
      }
    }
  }
}
