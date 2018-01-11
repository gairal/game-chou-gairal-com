export default class Animation {
  constructor(name, frames, frameLen) {
    this.name = name;
    this.frames = frames;
    this.frameLen = frameLen;
  }

  resolveFrame(distance) {
    const index = Math.floor((distance / this.frameLen) % this.frames.length);
    return this.frames[index];
  }
}
