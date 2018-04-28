import 'aframe';

import { Body } from './Body';
import { Quad } from './Quad';
import { BHTree } from './BHTree';
import {
  DEFAULT_BODY_SIZE,
  DEFAULT_Z_INDEX,
  RADIUS,
  DT,
  SCALE_FACTOR,
} from './Constants';
import { galaxyTemplate } from './galaxy_data/galaxy1';

const bodies = generateBodies();
console.warn(bodies);

function generateBodies() {
  const arr = [];
  for (let i = 0; i < galaxyTemplate.length; i++) {
    const b = galaxyTemplate[i];
    const el = document.createElement('a-sphere');

    const rx = b.rx * SCALE_FACTOR;
    const ry = b.ry * SCALE_FACTOR;
    const vx = b.vx * SCALE_FACTOR;
    const vy = b.vy * SCALE_FACTOR;
    el.setAttribute('color', b.color);
    el.setAttribute('radius', b.DEFAULT_BODY_SIZE);
    el.setAttribute('position', `${rx} ${ry} ${DEFAULT_Z_INDEX}`);

    const scene = document.getElementById('galaxy-scene');
    scene.appendChild(el);

    const body = new Body(rx, ry, vx, vy, b.mass, b.color, el);
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
