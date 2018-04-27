import { Quad } from './Quad';

export class Body {
  private static G = 6.67e-11; // Newtonian gravitational constant
  private rx: number;
  private ry: number;
  private vx: number;
  private vy: number;
  private fx: number;
  private fy: number;
  private mass: number;
  private color: string;
  private element: Element;

  constructor(
    rx: number,
    ry: number,
    vx: number,
    vy: number,
    mass: number,
    color: string,
    element: Element
  ) {
    this.rx = rx;
    this.ry = ry;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.color = color;
    this.element = element;
  }

  update(dt: number) {
    this.vx += dt * this.fx / this.mass;
    this.vy += dt * this.fy / this.mass;
    this.rx += dt * this.vx;
    this.ry += dt * this.vy;
  }

  distanceTo(b: Body) {
    const dx = this.rx - b.rx;
    const dy = this.ry - b.ry;
    return Math.sqrt(dx * dx + dy * dy);
  }

  resetForce() {
    this.fx = 0.0;
    this.fy = 0.0;
  }

  addForce(b: Body) {
    const EPS = 3e4;
    const dx = b.rx - this.rx;
    const dy = b.ry - this.ry;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const F = Body.G * this.mass * b.mass / (dist * dist + EPS * EPS);
    this.fx += F * dx / dist;
    this.fy += F * dy / dist;
  }

  render() {
    this.element.setAttribute('position', `${this.rx} ${this.ry} -300`);
  }

  in(q: Quad) {
    return q.contains(this.rx, this.ry);
  }

  plus(b: Body) {
    const m = this.mass + b.mass;
    const x = (this.rx * this.mass + b.rx * b.mass) / m;
    const y = (this.ry * this.mass + b.ry * b.mass) / m;

    return new Body(x, y, this.vx, b.vx, m, this.color, this.element);
  }
}
