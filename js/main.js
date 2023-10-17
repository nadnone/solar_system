import * as THREE from 'three';
import { ANGLE_TO_RAD, COLORS, COMMANDS_TEXT, DISTANCES, INCLINATIONS, MAX_SPEED_RATIO, PERIODES, PROJECT_LINK_TEXT, RAYONS } from './constants';

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

// basics
let astres = []

// gen meshes
for (let i = 0; i < 10; i++) {
   
    const geometry = new THREE.SphereGeometry(RAYONS[i], 32, 32);
    const material = new THREE.MeshBasicMaterial( { color: COLORS[i] } );
    const mesh = new THREE.Mesh( geometry, material );
    astres.push(mesh);

}


// add to scene
for (let i = 0; i < astres.length; i++) {
   
    scene.add(astres[i]);
    
}

// pre translations
camera.position.z = 40;
camera.position.y = 10;


// mutable data
let angle = 0.;
let zoom = 1;
let follow_astre = astres[3].position;
let speed_time = 1;


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

    }




                        

    // on observe l'astre demandé
    camera.lookAt(new THREE.Vector3(follow_astre.x, follow_astre.y, follow_astre.z));


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
            break;
        case 'KeyS':
            zoom -= 0.1;
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


