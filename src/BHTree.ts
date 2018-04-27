import { Quad } from './Quad';
import { Body } from './Body';

export class BHTree {
  private THETA = 0.5;

  private body: Body;
  private quad: Quad;
  private NW: BHTree;
  private NE: BHTree;
  private SW: BHTree;
  private SE: BHTree;

  constructor(q: Quad) {
    this.quad = q;
    this.body = null;
    this.NW = null;
    this.NE = null;
    this.SW = null;
    this.SE = null;
  }

  insert(b: Body) {
    if (this.body == null) {
      this.body = b;
      return;
    }

    if (!this.isExternal()) {
      this.body = this.body.plus(b);
      this.putBody(b);
    } else {
      this.NW = new BHTree(this.quad.NW());
      this.NE = new BHTree(this.quad.NE());
      this.SE = new BHTree(this.quad.SE());
      this.SW = new BHTree(this.quad.SW());

      this.putBody(this.body);
      this.putBody(b);

      this.body = this.body.plus(b);
    }
  }

  putBody(b: Body) {
    if (b.in(this.quad.NW())) {
      this.NW.insert(b);
    } else if (b.in(this.quad.NE())) {
      this.NE.insert(b);
    } else if (b.in(this.quad.SE())) {
      this.SE.insert(b);
    } else if (b.in(this.quad.SW())) {
      this.SW.insert(b);
    }
  }

  isExternal() {
    return (
      this.NW == null && this.NE == null && this.SW == null && this.SE == null
    );
  }

  updateForce(b: Body) {
    if (this.body == null || b === this.body) {
      return;
    }

    if (this.isExternal()) {
      b.addForce(this.body);
    } else {
      const s = this.quad.getLength();

      const d = this.body.distanceTo(b);

      if (s / d < this.THETA) {
        b.addForce(this.body);
      } else {
        this.NW.updateForce(b);
        this.NE.updateForce(b);
        this.SW.updateForce(b);
        this.SE.updateForce(b);
      }
    }
  }
}
