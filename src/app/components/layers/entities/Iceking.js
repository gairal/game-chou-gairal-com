import Entity from '../../core/Entity';
import Trait from '../../traits/Trait';
import Fly from '../../traits/Fly';
import Hitable from '../../traits/Hitable';

class Behavior extends Trait {
  constructor(entity) {
    super(entity, 'behavior');
  }

  collides(them) {
    if (them.stomper) {
      them.killable.kill();
    } else {
      this.entity.fly.bounce();
    }
  }
}

export default class Iceking extends Entity {
  constructor(game) {
    super(game, {
      name: 'iceking',
      init: { tile: 'fly-1' },
      hitbox: {
        width: 52,
        height: 50,
      },
    });

    [
      Fly,
      Hitable,
      Behavior,
    ].forEach(type => this.addTrait(type));
    this.addAnim('flying', ['fly-1', 'fly-2', 'fly-3', 'fly-4', 'fly-5', 'fly-6'], 6);
  }

  routeFrame() {
    return this.flying.resolveFrame(this.fly.steps);
  }
}
