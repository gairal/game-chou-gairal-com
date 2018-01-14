export default class Trait {
  constructor(entity, name) {
    this.entity = entity;
    this.NAME = name;
    this.tasks = [];
  }

  finalize() {
    this.tasks.forEach(task => task());
    this.tasks.length = 0;
  }

  queue(task) {
    this.tasks.push(task);
  }

  /* eslint-disable class-methods-use-this */
  collides(them) {
    return this.NAME;
  }

  obstruct() {
    return this.NAME;
  }

  update() {
    return this.NAME;
  }
  /* eslint-disable class-methods-use-this */
}
