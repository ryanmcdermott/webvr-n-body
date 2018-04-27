import 'aframe';

const el = document.createElement('a-sphere');
el.setAttribute('color', 'yellow');
el.setAttribute('radius', '1');
el.setAttribute('position', '0 0 -200');

const scene = document.getElementById('galaxy-scene');
scene.appendChild(el);
