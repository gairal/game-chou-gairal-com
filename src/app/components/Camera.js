export default class Camera {
  constructor(game) {
    this.game = game;
    this.prevPosX = 0;
  }

  get renderer() {
    return this.game.app.renderer;
  }

  get width() {
    return this.game.app.stage.width;
  }

  get pivot() {
    return this.game.app.stage.pivot;
  }

  get position() {
    return this.game.app.stage.position;
  }

  get center() {
    return this.renderer.width / 2;
  }

  resize() {
    this.position.x = this.center;
  }

  update() {
    const {
      center, prevPosX,
      game, width, pivot,
    } = this;
    const posX = game.compositor.pb.x;
    const endX = width - center;
    if (posX !== prevPosX && (posX < center || posX > endX)) return;
    pivot.x = posX;
    this.prevPosX = posX;
  }

  init() {
    this.pivot.x = this.center;
    this.position.x = this.center;
  }
}
