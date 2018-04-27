export class Quad {
  private xmid: number;
  private ymid: number;
  private length: number;

  constructor(xmid: number, ymid: number, length: number) {
    this.xmid = xmid;
    this.ymid = ymid;
    this.length = length;
  }

  getLength() {
    return this.length;
  }

  contains(x: number, y: number) {
    const halfLen = this.length / 2.0;
    return (
      x <= this.xmid + halfLen &&
      x >= this.xmid - halfLen &&
      y <= this.ymid + halfLen &&
      y >= this.ymid - halfLen
    );
  }

  NW() {
    const x = this.xmid - this.length / 4.0;
    const y = this.ymid + this.length / 4.0;
    const len = this.length / 2.0;
    return new Quad(x, y, len);
  }

  NE() {
    const x = this.xmid + this.length / 4.0;
    const y = this.ymid + this.length / 4.0;
    const len = this.length / 2.0;
    return new Quad(x, y, len);
  }

  SW() {
    const x = this.xmid - this.length / 4.0;
    const y = this.ymid - this.length / 4.0;
    const len = this.length / 2.0;
    return new Quad(x, y, len);
  }

  SE() {
    const x = this.xmid + this.length / 4.0;
    const y = this.ymid - this.length / 4.0;
    const len = this.length / 2.0;
    return new Quad(x, y, len);
  }
}
