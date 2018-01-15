import Trait from './Trait';

export default class Killable extends Trait {
  constructor(entity) {
    super(entity, 'killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 50;
  }

  kill() {
    this.queue(() => { this.dead = true; });
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(delta) {
    if (this.dead) {
      this.deadTime += delta;
      if (this.deadTime > this.removeAfter) {
        this.queue(() => this.entity.die());
      }
    }
  }
}
