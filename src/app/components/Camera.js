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

  resize() {
    this.stage.position.x = this.center;
  }

  update() {
    const {
      center, prevPosX,
      game, stage,
    } = this;
    const posX = game.compositor.pb.x;
    const endX = stage.width - center;
    if (posX !== prevPosX && (posX < center || posX > endX)) return;
    stage.pivot.x = posX;
    this.prevPosX = posX;
  }

  init() {
    this.stage.pivot.x = this.center;
    this.stage.position.x = this.center;
  }
}
