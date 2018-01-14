import Trait from './Trait';
import Finn from '../layers/entities/Finn';

export default class Hack extends Trait {
  constructor(entity) {
    super(entity, 'hack');
    this.spawnTimeOut = 0;
  }

  update(delta) {
    if (this.spawnTimeOut > 5 && this.entity.vel.y < 0) {
      const spawn = Finn.factory(this.entity.game);
      this.entity.game.compositor.addEntity(spawn);
      spawn.draw();

      spawn.x = this.entity.x;
      spawn.y = this.entity.y;

      this.spawnTimeOut = 0;
    }
    this.spawnTimeOut += delta;
  }
}
