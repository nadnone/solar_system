import * as THREE from 'three';
import { COLORS, DISTANCES, PERIODES, RAYONS } from './constants';

// initialisations
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// for texts and 2D stuffs
let text_div = document.createElement("div");
text_div.style.position = "absolute";
text_div.style.width = "200px";
text_div.style.height = "200pt";
text_div.style.backgroundColor = "white";
text_div.innerText = "Benchmark time: ";
text_div.style.top = 0;
text_div.style.left = 0;
document.body.appendChild(text_div);


// basics
let astres = []

for (let i = 0; i < 10; i++) {
   
    const geometry = new THREE.SphereGeometry(RAYONS[i], 32, 32);
    const material = new THREE.MeshBasicMaterial( { color: COLORS[i] } );
    const mesh = new THREE.Mesh( geometry, material );
    astres.push(mesh);

}


// adds
for (let i = 0; i < astres.length; i++) {
   
    scene.add(astres[i]);
    
}

// pre translations
camera.position.z = 40;
camera.position.y = 10;


// mutable data
let angle = 0.;
let zoom = 1;
let follow_astre = new THREE.Vector3(0,0,0);


function animate() {   
	const t0 = performance.now();

    requestAnimationFrame( animate );
	renderer.render( scene, camera );

    
    const t = (Date.now() / 1000) % 100; // secondes écoulées
    const angle_t = t / 60 * 360 // angle du temps


    // on commence à 1 pour passer le soleil
    for (let i = 1; i < astres.length; i++) {

        if (i !== 4) // sauf la lune
        {   
            // rayon 0 car celui du soleil
            astres[i].position.x = Math.cos(angle_t / PERIODES[i] * Math.PI/180) * (RAYONS[0] + DISTANCES[i]) * zoom;
            astres[i].position.y = Math.sin(angle_t / PERIODES[i] * Math.PI/180) * (RAYONS[0] + DISTANCES[i]) * zoom;
        }

        astres[i].scale.set(zoom, zoom, zoom);

    }

    // la lune : rayon 3 pour la terre
    astres[4].position.x = astres[3].position.x + Math.cos(angle_t / PERIODES[4] * Math.PI/180) * (RAYONS[3] + DISTANCES[4]) * zoom;
    astres[4].position.y = astres[3].position.y + Math.sin(angle_t / PERIODES[4] * Math.PI/180) * (RAYONS[3] + DISTANCES[4]) * zoom;


    // on observe l'astre demandé
    camera.lookAt(new THREE.Vector3(follow_astre.x, follow_astre.y, follow_astre.z));


    angle += 2;
    angle %= 360;

    const t1 = performance.now();
    if (angle % 45 === 0)
    {
        text_div.innerText = `Benchmark time: ${(t1 - t0).toFixed(3)}
            \nTouches au clavier :
                0: Soleil
                1: Mercure
                2: Venus
                3: Terre
                4: Lune
                5: Mars
                6: Jupiter
                7: Saturne
                8: Uranus
                9: Neptune
        
        `;
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
            follow_astre = astres[9];
            break;



        default:
            break;
    }

    if (zoom < 0.01) 
    {
        zoom = 0.01;
    };

});

animate();


