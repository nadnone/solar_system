import * as THREE from 'three';
import { ANGLE_TO_RAD, DISTANCES, INCLINATIONS, RAYONS, SATURN_RINGS_INCLINATION, SATURN_RINGS_R } from './constants.js';

function orbit_position_calc(ref, angle, scale_ratio, r, inclination)
{
    const cos_phi = Math.cos(angle * ANGLE_TO_RAD);
    const sin_phi = Math.sin(angle * ANGLE_TO_RAD);

    const cos_incl = Math.sin(inclination);

    // y swaped with z
    const x = ref.x + cos_phi * r * scale_ratio
    const z = ref.z + sin_phi * r * scale_ratio
    const y = ref.y + sin_phi * cos_incl * r * scale_ratio;
    
    // formula from there https://en.wikipedia.org/wiki/Spherical_coordinate_system

    return {
        "x": x,
        "y": y,
        "z": z,
    }
}

function orbital_path(k, scale_ratio)
{
    let points = [];

    for (let j = 0; j <= 360; j+= 1) {
        

        if (k !== 4) // sauf la lune
        {   
            // rayon 0 car celui du soleil
            const r = RAYONS[0] + DISTANCES[k] + RAYONS[k];

            const p = orbit_position_calc(new THREE.Vector3(0, 0, 0), j, scale_ratio, r, INCLINATIONS[k]);
            const three_p = new THREE.Vector3(p.x, p.y, p.z);
            points.push(three_p);
        }
       
    }

    return points;
}

function saturn_rings(k, scale_ratio, astres)
{
    let points = [];

    for (let j = 0; j <= 360; j+=10) {

        // 7 car saturne + ([0]/[1] = ratio)
        const r = (RAYONS[7] + (SATURN_RINGS_R[0] / SATURN_RINGS_R[1]) * k);
        const saturn = astres[7].position;
       
        const p = orbit_position_calc(saturn, j, scale_ratio, r, SATURN_RINGS_INCLINATION);
        const three_p = new THREE.Vector3(p.x, p.y, p.z);
        points.push(three_p);
    }


    return points;
}

export {
    orbital_path,
    saturn_rings,
    orbit_position_calc
}