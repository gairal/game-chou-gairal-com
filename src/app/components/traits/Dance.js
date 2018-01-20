import Trait from './Trait';

export default class Dance extends Trait {
  constructor(entity) {
    super(entity, 'dance');

    this.totalTime = 2;
  }

  update(delta) {
    this.totalTime += delta;
  }
}
