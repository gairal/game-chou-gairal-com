import Entity from '../../core/Entity';
import Hitable from '../../traits/Hitable';
import Killable from '../../traits/Killable';
import Physics from '../../traits/Physics';
import Scout from '../../traits/Scout';
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
        this.entity.scout.stop();
      } else {
        them.killable.kill();
      }
    } else {
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

    [
      Hitable,
      Killable,
      Scout,
      Physics,
      Behavior,
    ].forEach(type => this.addTrait(type));
  }

  routeFrame() {
    if (this.killable.dead) return 'dead';

    return 'lsp-idle';
  }
}
