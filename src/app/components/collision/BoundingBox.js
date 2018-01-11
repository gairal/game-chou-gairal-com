export default class BoundingBox {
  constructor(entity) {
    this.entity = entity;
  }

  overlaps(box) {
    return this.bottom > box.top
    && this.top < box.bottom
    && this.left < box.right
    && this.right > box.left;
  }

  get bottom() {
    return this.entity.pos.y + this.entity.size.y + this.entity.offset.y;
  }

  set bottom(y) {
    this.entity.pos.y = y - (this.entity.size.y + this.entity.offset.y);
  }

  get top() {
    return this.entity.pos.y + this.entity.offset.y;
  }

  set top(y) {
    this.entity.pos.y = y - this.entity.offset.y;
  }

  get left() {
    return this.entity.getBounds().x + this.entity.offset.x;
  }

  set left(x) {
    this.entity.pos.x = x - this.entity.offset.x;
  }

  get right() {
    return this.entity.getBounds().x + this.entity.size.x + this.entity.offset.x;
  }

  set right(x) {
    this.entity.pos.x = x - (this.entity.size.x + this.entity.offset.x);
  }
}
