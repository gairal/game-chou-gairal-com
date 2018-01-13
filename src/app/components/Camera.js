export default class Camera {
  constructor(game) {
    this.game = game;
    this.prevPosX = 0;
  }

  get renderer() {
    return this.game.app.renderer;
  }

  get stage() {
    return this.game.app.stage;
  }

  get center() {
    return this.renderer.width / 2;
  }

  update() {
    const posX = this.game.compositor.mario.x;
    if (posX < this.center && posX !== this.prevPosX) return;
    this.stage.pivot.x = posX;
    this.prevPosX = posX;
  }

  init() {
    this.stage.pivot.x = this.center;
    this.stage.position.x = this.center;
  }
}
