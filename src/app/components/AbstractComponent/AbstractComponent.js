export default class AbstractComponent {
  constructor(opts) {
    this.opts = opts;
  }

  get exists() {
    if (!this.opts) return false;

    const { className } = this.opts;
    if (!className) return false;

    // We always use class, not ID
    this.elts = [].slice.call(document.getElementsByClassName(this.opts.className));
    if (!this.elts.length) return false;

    return true;
  }

  init() {
    return new Promise((resolve) => {
      if (!this.exists) return;

      if (this.addEvents) this.addEvents();
      resolve(this);
    });
  }

  static factory() {
    const component = new this();
    component.init();
    return component;
  }
}
