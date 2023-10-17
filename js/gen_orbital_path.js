import * as THREE from 'three';
import { ANGLE_TO_RAD, DISTANCES, INCLINATIONS, RAYONS, SATURN_RINGS_INCLINATATION, SATURN_RINGS_R } from './constants.js';

function orbital_path(k, zoom, astres)
{
    let points = [];

    for (let j = 0; j < 360; j+= 12) {
        

        if (k !== 4) // sauf la lune
        {   
            // rayon 0 car celui du soleil
            const r = RAYONS[0] + DISTANCES[k];

            const x = Math.cos(j * ANGLE_TO_RAD) * r * zoom;
            const z = Math.sin(j * ANGLE_TO_RAD) * r * zoom;
            const y = Math.cos(j * ANGLE_TO_RAD) * Math.sin(INCLINATIONS[k] * ANGLE_TO_RAD)* r * zoom;
            
            let p = new THREE.Vector3(x, y, z);
            points.push(p);
        }
       
    }

    return points;
}

function saturn_rings(k, zoom, astres)
{
    let points = [];

    for (let j = 0; j < 360; j+= 32) {

        // 7 car saturne + ([0]/[1] = ratio)
        const r = RAYONS[7] + (SATURN_RINGS_R[0] / SATURN_RINGS_R[1]) * k * 10;
        const saturn = astres[7].position;

        const x = saturn.x + Math.cos(j * ANGLE_TO_RAD) * r * zoom;
        const z = saturn.z + Math.sin(j * ANGLE_TO_RAD) * r * zoom;
        const y = saturn.y + Math.cos(j * ANGLE_TO_RAD) * Math.sin(SATURN_RINGS_INCLINATATION * ANGLE_TO_RAD)* r * zoom;
        
        let p = new THREE.Vector3(x, y, z);
        points.push(p);
    }


    return points;
}

export {
    orbital_path,
    saturn_rings
}