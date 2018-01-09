export default class Keyboard {
  constructor() {
    this.keys = [];
    this.handlers = {};
  }

  add(key, press, release) {
    if (this.keys.indexOf(key) > 0) return;
    this.keys.push(key);
    this.handlers[key] = {
      isDown: false,
      isUp: true,
      press,
      release,
    };
  }

  keydown(e) {
    if (this.keys.indexOf(e.code) > -1) {
      const handler = this.handlers[e.code];
      if (handler.isUp && handler.press) handler.press();
      handler.isDown = true;
      handler.isUp = false;
      e.preventDefault();
    }
  }

  keyup(e) {
    if (this.keys.indexOf(e.code) > -1) {
      const handler = this.handlers[e.code];
      if (handler.isDown && handler.release) handler.release();
      handler.isDown = false;
      handler.isUp = true;
      e.preventDefault();
    }
  }

  init() {
    window.addEventListener('keydown', e => this.keydown(e), false);
    window.addEventListener('keyup', e => this.keyup(e), false);
    return this;
  }

  static factory() {
    return new Keyboard().init();
  }
}
