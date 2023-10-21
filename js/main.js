import * as THREE from 'three';
import { 
    FPS,
    SOLEIL_INTENSITY,
    SOLEIL_LIGHT_DIST, 
} from './constants';

import Events from './events';
import Panels from './panels';
import Planets from './planets';

// initialisations
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10**32 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// sun light init
let sunLight = new THREE.PointLight( 0, 0, 0 );
scene.add(sunLight);

let t = 0;
function animate(event, panels, planets) {   

	const t0 = performance.now(); // Omega test

    // virtual time
    const virtual_t = t * event.speed_time_ratio
    
    // sun light effect
    scene.remove(sunLight);
    sunLight = new THREE.PointLight( 0xffffff, SOLEIL_INTENSITY * event.scale_ratio, SOLEIL_LIGHT_DIST );
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);


    planets.update(virtual_t, event.scale_ratio, event.scale_state, camera, event.digit_astre, event.rotate);

    const t1 = performance.now(); // Omega test

    t += (t1 - t0) * 100;

    panels.update(event.speed_time_ratio, virtual_t, t, t0, t1);

	renderer.render( scene, camera );
}


let panels = new Panels();
let event = new Events(panels.astre_panel);
let planets = new Planets(scene);

setInterval(() => {
    animate(event, panels, planets);
}, FPS);


