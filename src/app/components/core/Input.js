export default class Keyboard {
  constructor() {
    this.keys = [];
    this.buttons = [];
    this.keyHandlers = {};
    this.mouseHandlers = {};
  }

  addKey(key, press, release) {
    if (this.keys.indexOf(key) > -1) return;
    this.keys.push(key);
    this.keyHandlers[key] = {
      isDown: false,
      press,
      release,
    };
  }

  addClick(button, action) {
    if (this.buttons.indexOf(button) > -1) return;
    this.buttons.push(button);
    this.mouseHandlers[button] = {
      action,
    };
  }

  handleKey(e) {
    if (this.keys.indexOf(e.code) > -1) {
      const handler = this.keyHandlers[e.code];

      if (e.type === 'keydown') {
        if (!handler.isDown && handler.press) handler.press(e);
        handler.isDown = true;
      } else if (e.type === 'keyup') {
        if (handler.isDown && handler.release) handler.release(e);
        handler.isDown = false;
      }

      e.preventDefault();
    }
  }

  handleMouse(e) {
    if (this.buttons.indexOf(e.buttons) > -1) {
      const handler = this.mouseHandlers[e.buttons];
      if (handler.action) handler.action(e);
    }
  }

  init() {
    ['keydown', 'keyup'].forEach((type) => {
      window.addEventListener(type, e => this.handleKey(e), false);
    });

    ['mousedown', 'mousemove'].forEach((type) => {
      window.addEventListener(type, e => this.handleMouse(e), false);
    });

    return this;
  }

  static factory() {
    return new Keyboard().init();
  }
}
