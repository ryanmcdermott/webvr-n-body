import 'aframe';

import { Body } from './Body';
import { Quad } from './Quad';
import { BHTree } from './BHTree';

import { galaxyTemplate } from './galaxy_data/galaxy1';

const DT = 0.1;
const DEFAULT_Z_INDEX = -300;
const DEFAULT_BODY_SIZE = 10;
const RADIUS = 2.8e6;
const bodies = generateBodies();

function generateBodies() {
  const arr = [];
  for (let i = 0; i < galaxyTemplate.length; i++) {
    const b = galaxyTemplate[i];
    const el = document.createElement('a-sphere');

    el.setAttribute('color', b.color);
    el.setAttribute('radius', b.DEFAULT_BODY_SIZE);
    el.setAttribute('position', `${b.rx} ${b.ry} ${DEFAULT_Z_INDEX}`);

    const scene = document.getElementById('galaxy-scene');
    scene.appendChild(el);

    const body = new Body(b.rx, b.ry, b.vx, b.vy, b.mass, b.color, el);
    arr.push(body);
  }

  return arr;
}

function tick() {
  const quad = new Quad(0, 0, RADIUS);
  const tree = new BHTree(quad);

  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].in(quad)) {
      tree.insert(bodies[i]);
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].resetForce();
    tree.updateForce(bodies[i]);
    bodies[i].update(DT);
  }

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].render();
  }

  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
