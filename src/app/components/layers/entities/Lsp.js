import Entity from '../../core/Entity';
import Physics from '../../traits/Physics';
import Scout from '../../traits/Scout';
import Killable from '../../traits/Killable';
import LspBehavior from '../../traits/LspBehavior';

export default class Finn extends Entity {
  constructor(game) {
    super(game, {
      name: 'lsp',
      init: { tile: 'idle' },
      hitbox: {
        width: 22,
        height: 31,
      },
    });

    [Killable, Scout, Physics, LspBehavior].forEach(type => this.addTrait(type));
  }

  routeFrame() {
    if (this.killable.dead) return 'dead';

    return 'idle';
  }
}
