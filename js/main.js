import * as THREE from 'three';
import { ANGLE_TO_RAD, CAMERA_INIT, COLORS, COMMANDS_TEXT, DISTANCES, INCLINATIONS, MAX_SPEED_RATIO, PERIODES, PROJECT_LINK_TEXT, RAYONS, SATURN_RINGS_COLORS, ZOOM_INIT } from './constants';
import { orbital_path, saturn_rings } from './gen_orbital_path';

// initialisations
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// panel text
let text_panel = document.createElement("div");
text_panel.className = "panel";
document.body.appendChild(text_panel);


// mutable data
let angle = 0.;
let zoom = ZOOM_INIT;
let speed_time = 1;
let scale = false;


// meshes arrays
let astres = []
let lines = []
let saturn_rings_lines = []

// gen meshes
for (let i = 0; i < 10; i++) {
   
    const geometry = new THREE.SphereGeometry(RAYONS[i], 32, 32);
    const material = new THREE.MeshBasicMaterial( { color: COLORS[i] } );
    const mesh = new THREE.Mesh( geometry, material );
    astres.push(mesh);
}


// gen lines
for (let i = 1; i < 10; i++) {

    const material_line = new THREE.LineBasicMaterial( { color: COLORS[i] } );
    const geometry_line = new THREE.BufferGeometry().setFromPoints( orbital_path(i, zoom, astres) );
    const line = new THREE.Line( geometry_line, material_line );
    lines.push(line);

}

// gen saturn rings
const material_saturn_rings = new THREE.LineBasicMaterial( { color: SATURN_RINGS_COLORS } );

for (let i = 1; i < 30; i++) {

    const geometry_line = new THREE.BufferGeometry().setFromPoints( saturn_rings(i, zoom, astres) );
    const line = new THREE.Line( geometry_line, material_saturn_rings );
    saturn_rings_lines.push(line);

}


// add to scene
for (let i = 0; i < astres.length; i++) {
   
    scene.add(astres[i]);

    if (i !== 9)
    {
        scene.add(lines[i]);
    }
}

// add saturns rings to scene
for (let i = 1; i < saturn_rings_lines.length; i++) {
    
    scene.add(saturn_rings_lines[i]);
}

// pre translations
camera.position.z = CAMERA_INIT.z;
camera.position.y = CAMERA_INIT.y;


let follow_astre = astres[3].position;

function animate() {   
	const t0 = performance.now();

    requestAnimationFrame( animate );
	renderer.render( scene, camera );

    
    const t = (Date.now() / 100 % 10000); // secondes écoulées
    const angle_t = t * speed_time // angle du temps


    // on commence à 1 pour passer le soleil
    for (let i = 1; i < astres.length; i++) {


        const phi = angle_t / PERIODES[i]; // angle de rotation
        let  r = 0; // rayon
        let add_pos = new THREE.Vector3(); // référenciel

        if (i !== 4) // sauf la lune
        {   
            // rayon 0 car celui du soleil
            r = RAYONS[0] + DISTANCES[i];
        }
        else // pour la lune
        {
            // la lune : rayon 3 pour la terre
            r = RAYONS[3] + DISTANCES[i];
            add_pos = astres[3].position
        }

        astres[i].position.x = add_pos.x + Math.cos(phi * ANGLE_TO_RAD) * r * zoom;
        astres[i].position.z = add_pos.z + Math.sin(phi * ANGLE_TO_RAD) * r * zoom;
        astres[i].position.y = add_pos.y + Math.cos(phi * ANGLE_TO_RAD) * Math.sin(INCLINATIONS[i] * ANGLE_TO_RAD)* r * zoom;

        astres[i].scale.set(zoom, zoom, zoom);


        if (scale)
        {
            for (let j = 0; j < lines.length; j++) {
            
                const material_line = new THREE.LineBasicMaterial( { color: COLORS[j] } )
                const geometry_line = new THREE.BufferGeometry().setFromPoints( orbital_path(j, zoom, astres) );
                const line = new THREE.Line( geometry_line, material_line );
        
                scene.remove(lines[j])
                lines[j] = line;
                scene.add(lines[j]);
            }
            scale = false;
        }


        for (let j = 0; j < saturn_rings_lines.length; j++) {

            const geometry_line = new THREE.BufferGeometry().setFromPoints( saturn_rings(j, zoom, astres) );
            const line = new THREE.Line( geometry_line, material_saturn_rings );

            scene.remove(saturn_rings_lines[j])
            saturn_rings_lines[j] = line;
            scene.add(saturn_rings_lines[j]);        
        }
    }




                        

    // on observe l'astre demandé
    camera.lookAt(new THREE.Vector3(follow_astre.x, follow_astre.y, follow_astre.z));
    camera.position.x = follow_astre.x + CAMERA_INIT.x;
    camera.position.y = follow_astre.y + CAMERA_INIT.y;
    camera.position.z = follow_astre.z + CAMERA_INIT.z;


    angle += 2;
    angle %= 360;

    const t1 = performance.now();
    if (angle % 45 === 0)
    {
        text_panel.innerText = COMMANDS_TEXT;
        text_panel.innerText += `\n\n### Info system ###
            Speed: 1s = ~${(speed_time*30).toFixed(0)} Days

            [DEBUG]
            Benchmark time: ~${(t1 - t0).toFixed(3)}
            Time: ${(t).toFixed(0)} seconds
            Virtual Time: ${(angle_t).toFixed(0)} Days
        `;
        text_panel.innerHTML += PROJECT_LINK_TEXT;
      
    }
}


window.addEventListener("keypress", (event) => {

    switch (event.code) {
        case 'KeyW':
            zoom += .1;
            scale = true;
            break;
        case 'KeyS':
            zoom -= 0.1;
            scale = true;
            break;
        case 'Digit0':
            follow_astre = astres[0].position;
            break;
        case 'Digit1':
            follow_astre = astres[1].position;
            break;
        case 'Digit2':
            follow_astre = astres[2].position;
            break;
        case 'Digit3':
            follow_astre = astres[3].position;
            break;
        case 'Digit4':
            follow_astre = astres[4].position;
            break;
        case 'Digit5':
            follow_astre = astres[5].position;
            break;
        case 'Digit6':
            follow_astre = astres[6].position;
            break;
        case 'Digit7':
            follow_astre = astres[7].position;
            break;
        case 'Digit8':
            follow_astre = astres[8].position;
            break;
        case 'Digit9':
            follow_astre = astres[9].position;
            break;

        case 'KeyA':
            speed_time *= 2
            break;
        case 'KeyD':
            speed_time /= 2
            break;
    

        default:
            break;
    }

    if (zoom < 0.01) 
    {
        zoom = 0.01;
    };
    if (speed_time < 1/30)
    {
        speed_time = 1/30;
    }
    else if (speed_time > MAX_SPEED_RATIO)
    {
        speed_time = MAX_SPEED_RATIO;
    }

});

animate();


