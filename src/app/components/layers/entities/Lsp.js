import Entity from '../../core/Entity';
import Physics from '../../traits/Physics';
import Scout from '../../traits/Scout';
import Killable from '../../traits/Killable';
import Trait from '../../traits/Trait';

class Behavior extends Trait {
  constructor(entity) {
    super(entity, 'behavior');
  }

  collides(them) {
    if (this.entity.killable.dead) return;

    if (them.stomper) {
      if (them.vel.y > this.entity.vel.y) {
        this.entity.killable.kill();
        them.stomper.bounce(this.entity);
        this.entity.scout.speed = 0;
      } else {
        them.killable.kill();
      }
    } else {
      // This doesn't work because they both collides multiple times
      this.entity.scout.bounce();
    }
  }
}

export default class Lsp extends Entity {
  constructor(game) {
    super(game, {
      name: 'lsp',
      init: { tile: 'lsp-idle' },
      hitbox: {
        width: 22,
        height: 31,
      },
    });

    [Killable, Scout, Physics, Behavior].forEach(type => this.addTrait(type));
  }

  routeFrame() {
    if (this.killable.dead) return 'dead';

    return 'lsp-idle';
  }
}
