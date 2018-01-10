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

  handle(e) {
    if (this.keys.indexOf(e.code) > -1) {
      const handler = this.handlers[e.code];

      if (e.type === 'keydown') {
        if (!handler.isDown && handler.press) handler.press();
        handler.isDown = true;
      } else if (e.type === 'keyup') {
        if (handler.isDown && handler.release) handler.release();
        handler.isDown = false;
      }

      e.preventDefault();
    }
  }

  init() {
    ['keydown', 'keyup'].forEach((type) => {
      window.addEventListener(type, e => this.handle(e), false);
    });
    return this;
  }

  static factory() {
    return new Keyboard().init();
  }
}
