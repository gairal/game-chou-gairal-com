import { Application } from 'pixi.js';
import Logger from '../components/core/Logger';
import Input from '../components/core/Input';
import Camera from '../components/Camera';
import Compositor from '../components/layers/Compositor';

export default class ChuGame {
  constructor() {
    this.app = new Application();
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.backgroundColor = 0x56d3ff;
    this.app.renderer.autoResize = true;

    // default stuff
    this.compositor = new Compositor(this);
    this.camera = new Camera(this);
    this.input = Input.factory();

    this.logger = new Logger({ level: ChuGame.constants.logLevel });
    this.resize();
  }

  static get constants() {
    return {
      unit: 16,
      scale: 2,
      gravity: 0.8,
      hasGravity: true,
      logLevel: Logger.levels.LOG,
      DEBUG: false,
    };
  }

  resize() {
    const maxHeight = 15 * ChuGame.constants.unit * ChuGame.constants.scale;
    this.app.renderer.resize(
      window.innerWidth,
      window.innerHeight < maxHeight ? window.innerHeight : maxHeight,
    );
    this.camera.resize();
  }

  /**
   * Centralized Game init
   *
   * @returns ChuGame
   * @memberof ChuGame
   */
  init() {
    this.compositor.init();
    // this.compositor.load().then(res => this.start(res));
    // document.body.appendChild(this.app.view);
    document.getElementById('canvas-container').appendChild(this.app.view);

    return this;
  }

  /**
   * init and returns an instance of ChuGame
   *
   * @static
   * @returns ChuGame
   * @memberof ChuGame
   */
  static factory() {
    return new ChuGame().init();
  }
}
