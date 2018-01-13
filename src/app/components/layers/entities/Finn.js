import Entity from '../../core/Entity';
import Dance from '../../traits/Dance';

export default class Finn extends Entity {
  constructor(game) {
    super(game, {
      name: 'finn',
      pos: {
        x: 200,
        y: 10.5,
        tile: 'finn-1',
      },
    });

    this.addTrait(new Dance(this));
    this.addAnim('dance', ['finn-1', 'finn-2', 'finn-3', 'finn-4', 'finn-5', 'finn-6', 'finn-7', 'finn-8', 'finn-9', 'finn-10',
      'finn-11', 'finn-12', 'finn-13', 'finn-14', 'finn-15', 'finn-16', 'finn-17', 'finn-18', 'finn-19', 'finn-20',
      'finn-21', 'finn-22', 'finn-23', 'finn-24', 'finn-25', 'finn-26', 'finn-27', 'finn-28', 'finn-29', 'finn-30',
      'finn-31', 'finn-32', 'finn-33', 'finn-34', 'finn-35'], 6);
  }

  routeFrame(delta) {
    return this.dance.resolveFrame(delta);
  }
}
