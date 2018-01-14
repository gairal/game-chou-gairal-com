import Entity from '../../core/Entity';
import Physics from '../../traits/Physics';
import Scout from '../../traits/Scout';

export default class Finn extends Entity {
  constructor(game) {
    super(game, {
      name: 'lsp',
      init: { tile: 'idle' },
      hitbox: {
        width: 22,
        height: 40,
      },
    });

    this.addTrait(new Physics(this));
    this.addTrait(new Scout(this));
  }
}
