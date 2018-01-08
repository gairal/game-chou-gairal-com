import Chubject from '../Chubject';

export default class Entity extends Chubject {
  constructor(game, opts) {
    super(game, opts);

    this.traits = [];
  }
}
