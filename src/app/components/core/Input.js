export default class Keyboard {
  constructor() {
    this.keys = [];
    this.buttons = [];
    this.keyMap = {};
    this.mouseMap = {};

    this.STATE = {
      pressed: 1,
      released: 0,
    };
  }

  addKey(key, handler) {
    if (this.keys.indexOf(key) > -1) return;
    this.keys.push(key);
    this.keyMap[key] = {
      state: this.STATE.released,
      handler,
    };
  }

  addClick(button, action) {
    if (this.buttons.indexOf(button) > -1) return;
    this.buttons.push(button);
    this.mouseMap[button] = {
      action,
    };
  }

  handleKey(e) {
    if (this.keys.indexOf(e.code) <= -1) return;
    const map = this.keyMap[e.code];
    if (!map.handler) return;

    e.preventDefault();
    const state = e.type === 'keydown' ? this.STATE.pressed : this.STATE.released;
    if (state === map.state) return;
    map.state = state;
    map.handler(map.state);
  }

  handleMouse(e) {
    if (this.buttons.indexOf(e.buttons) > -1) {
      const handler = this.mouseMap[e.buttons];
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
