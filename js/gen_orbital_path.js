import * as THREE from 'three';
import { ANGLE_TO_RAD, DISTANCES, INCLINATIONS, RAYONS, SATURN_RINGS_INCLINATATION, SATURN_RINGS_R } from './constants.js';

function orbital_path(k, scale_ratio)
{
    let points = [];

    for (let j = 0; j <= 360; j+= 1) {
        

        if (k !== 4) // sauf la lune
        {   
            // rayon 0 car celui du soleil
            const r = RAYONS[0] + DISTANCES[k] + RAYONS[k];

            const x = Math.cos(j * ANGLE_TO_RAD) * r * scale_ratio;
            const z = Math.sin(j * ANGLE_TO_RAD) * r * scale_ratio;
            const y = Math.cos(j * ANGLE_TO_RAD) * Math.sin(INCLINATIONS[k] * ANGLE_TO_RAD)* r * scale_ratio;
            
            let p = new THREE.Vector3(x, y, z);
            points.push(p);
        }
       
    }

    return points;
}

function saturn_rings(k, scale_ratio, astres)
{
    let points = [];

    for (let j = 0; j <= 360; j+=10) {

        // 7 car saturne + ([0]/[1] = ratio)
        const r = (RAYONS[7] + (SATURN_RINGS_R[0] / SATURN_RINGS_R[1]) * k) * scale_ratio;
        const saturn = astres[7].position;

        const x = saturn.x + Math.cos(j * ANGLE_TO_RAD) * r;
        const z = saturn.z + Math.sin(j * ANGLE_TO_RAD) * r;
        const y = saturn.y + Math.cos(j * ANGLE_TO_RAD) * Math.sin(SATURN_RINGS_INCLINATATION * ANGLE_TO_RAD)* r;
        
        let p = new THREE.Vector3(x, y, z);
        points.push(p);
    }


    return points;
}

export {
    orbital_path,
    saturn_rings
}