import * as THREE from 'three';
import { CAMERA_INIT_DIST, COLORS, DISTANCES, FPS, INCLINATIONS, INITIAL_ASTRE, MAX_SPEED_RATIO, PERIODES, RAYONS, SATURN_RINGS_COLORS, SOLEIL_INTENSITY, STANDARD_EMISSIVE, SCALE_RATIO_INIT, INIT_SPEED_RATIO, SCALE_RATIO_MIN, EXCENTRICITIES } from './constants';
import { orbit_position_calc, orbital_path, saturn_rings } from './gen_orbital_path';
import { TEXTURES } from './textures';
import { ASTRES_NAMES, COMMANDS_TEXT, PROJECT_LINK_TEXT } from './panel_texts';

// initialisations
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// panel text
let text_panel = document.createElement("div");
text_panel.className = "panel";
document.body.appendChild(text_panel);

// panel Astre name
let astre_panel = document.createElement("div");
astre_panel.className = "name_astre";
astre_panel.innerText = ASTRES_NAMES[INITIAL_ASTRE];
document.body.appendChild(astre_panel);


// mutable data
let scale_ratio = SCALE_RATIO_INIT;
let speed_time_ratio = INIT_SPEED_RATIO;
let scale_state = false;
let digit_astre = INITIAL_ASTRE;

// meshes arrays
let astres = []
let lines = []
let saturn_rings_lines = []

// sun light init
let sunLight = new THREE.PointLight( 0xffffff, SOLEIL_INTENSITY, 0 );
scene.add(sunLight);

let tick = 0;

for (let i = 0; i < 10; i++) {
   
    // gen meshes
    const geometry = new THREE.SphereGeometry(RAYONS[i], 32, 32);
    let material = new THREE.MeshLambertMaterial( { map: TEXTURES[i], emissive: COLORS[i], emissiveIntensity: STANDARD_EMISSIVE } );

    if (i === 0) // for the sun
    {
        material = new THREE.MeshBasicMaterial( { map: TEXTURES[i] } );
    }

    const mesh = new THREE.Mesh( geometry, material );
    astres.push(mesh);

    // gen lines
    if (i > 0)
    {
        const material_line = new THREE.LineBasicMaterial( { color: COLORS[i] } );
        const geometry_line = new THREE.BufferGeometry().setFromPoints( orbital_path(i, scale_ratio) );
        const line = new THREE.Line( geometry_line, material_line );
        lines.push(line);
    }

}

// gen saturn rings
const material_saturn_rings = new THREE.LineBasicMaterial( { color: SATURN_RINGS_COLORS } );

for (let i = 1; i < 30; i++) {

    const geometry_line = new THREE.BufferGeometry().setFromPoints( saturn_rings(i, scale_ratio, astres) );
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

let t = performance.now() / 1000;

function animate() {   
	const t0 = performance.now(); // Omega test

    t = performance.now() / 1000;
    const angle_t = t * speed_time_ratio * Math.PI/360 // angle du temps


    // sun light effect
    scene.remove(sunLight);
    sunLight = new THREE.PointLight( 0xffffff, SOLEIL_INTENSITY * scale_ratio, 0 );
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    
    // on commence à 1 pour passer le soleil
    for (let i = 1; i < astres.length; i++) {


        const phi = angle_t / PERIODES[i]; // angle de rotation
        let add_pos = new THREE.Vector3(); // référenciel

        if (i === 4) // pour la lune 
        {
            add_pos = astres[3].position;
        }

        // calcul des positions
        const p = orbit_position_calc(add_pos, phi, scale_ratio, INCLINATIONS[i], EXCENTRICITIES[i], i);
        astres[i].position.set(p.x, p.y, p.z);   

        astres[i].scale.set(scale_ratio, scale_ratio, scale_ratio);

        if (scale_state)
        {
            for (let j = 1; j < lines.length; j++) {
            
                // j = 1 car décalage, on compte sans le soleil
                const material_line = new THREE.LineBasicMaterial( { color: COLORS[j] } )
                const geometry_line = new THREE.BufferGeometry().setFromPoints( orbital_path(j, scale_ratio) );
                const line = new THREE.Line( geometry_line, material_line );
        
                scene.remove(lines[j])
                lines[j] = line;
                scene.add(lines[j]);
            }
            scale_state = false;
        }

        for (let j = 0; j < saturn_rings_lines.length; j++) {

            const geometry_line = new THREE.BufferGeometry().setFromPoints( saturn_rings(j, scale_ratio, astres) );
            const line = new THREE.Line( geometry_line, material_saturn_rings );

            scene.remove(saturn_rings_lines[j])
            saturn_rings_lines[j] = line;
            scene.add(saturn_rings_lines[j]);        
        }

            // on observe l'astre demandé
            camera.lookAt(astres[digit_astre].position);
            camera.position.x = astres[digit_astre].position.x + RAYONS[digit_astre] * scale_ratio + CAMERA_INIT_DIST.x
            camera.position.y = astres[digit_astre].position.y + RAYONS[digit_astre] * scale_ratio + CAMERA_INIT_DIST.y
            camera.position.z = astres[digit_astre].position.z + RAYONS[digit_astre] * scale_ratio + CAMERA_INIT_DIST.z

            
    }




                        




    

    const t1 = performance.now(); // Omega test

    if (tick > 1)
    {
        text_panel.innerText = COMMANDS_TEXT;
        text_panel.innerText += `\n### System info ###
            Speed: 1s = ~${(speed_time_ratio).toFixed(2)} days

            [DEBUG]
            Benchmark time: ~${(t1 - t0).toFixed(3)} ms
            Spent time: ${(t/3600).toFixed(0)}h ${(t/60).toFixed(0) % 60}m ${(t).toFixed(0) % 60}s
            Virtual Time: day n°${(angle_t % 365).toFixed(0)}

        `;
        text_panel.innerHTML += PROJECT_LINK_TEXT;
    
    }

    tick += FPS;
    tick %= 10;


	renderer.render( scene, camera );
      
}


window.addEventListener("resize", () => {
    window.location.reload();
});

window.addEventListener("keypress", (event) => {


    switch (event.code) {
        case 'KeyW':
            scale_ratio += 1;
            scale_state = true;
            break;
        case 'KeyS':
            scale_ratio -= 1;
            scale_state = true;
            break;
            
        case 'Digit0':
            digit_astre = 0;
            break;
        case 'Digit1':
            digit_astre = 1;
            break;
        case 'Digit2':
            digit_astre = 2;
            break;
        case 'Digit3':
            digit_astre = 3;
            break;
        case 'Digit4':
            digit_astre = 4;
            break;
        case 'Digit5':
            digit_astre = 5;
            break;
        case 'Digit6':
            digit_astre = 6;
            break;
        case 'Digit7':
            digit_astre = 7;
            break;
        case 'Digit8':
            digit_astre = 8;
            break;
        case 'Digit9':
            digit_astre = 9;
            break;

        case 'KeyA':
            speed_time_ratio *= 2
            break;
        case 'KeyD':
            speed_time_ratio /= 2
            break;
    

        default:
            break;
    }

    if (scale_ratio < SCALE_RATIO_MIN)
    {
        scale_ratio = SCALE_RATIO_MIN;
    }
    
    if (speed_time_ratio < 1/30)
    {
        speed_time_ratio = 1/30;
    }
    else if (speed_time_ratio > MAX_SPEED_RATIO)
    {
        speed_time_ratio = MAX_SPEED_RATIO;
    }

    astre_panel.innerText = ASTRES_NAMES[digit_astre];

});

setInterval(animate, FPS);


