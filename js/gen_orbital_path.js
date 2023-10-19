import * as THREE from 'three';
import { ANGLE_TO_RAD, DISTANCES, EXCENTRICITIES, INCLINATIONS, RAYONS, SATURN_RINGS_INCLINATION, SATURN_RINGS_R } from './constants.js';

function orbit_position_calc(ref, angle, scale_ratio, r, inclination, e)
{

    // inspiré de mon précédent code ici: https://github.com/nadnone/Satellite_movement_kepler/blob/main/all.js

    const cos_phi = Math.cos(angle * ANGLE_TO_RAD - e);
    const sin_phi = Math.sin(angle * ANGLE_TO_RAD);

    const cos_incl = Math.sin(inclination);

    // y swaped with z
    const x = ref.x + cos_phi * r * scale_ratio
    const z = ref.z + sin_phi * r * scale_ratio * Math.sqrt( 1 - e**2 )
    const y = ref.y + sin_phi * cos_incl * r * scale_ratio;
    
    // formula from there https://en.wikipedia.org/wiki/Spherical_coordinate_system

    return {
        "x": x,
        "y": y,
        "z": z,
    }
}

function orbital_path(k, scale_ratio, add_ref = new THREE.Vector3())
{
    let points = [];

    for (let j = 0; j <= 360; j+= 1) {
        
        let r = 0;
        if (k !== 4) // sauf la lune
        {   
            // rayon 0 car celui du soleil
            r = RAYONS[0] + DISTANCES[k] + RAYONS[k];
        }
        else // pour la lune
        {
            // rayon 3 pour la terre
            r = RAYONS[3] + DISTANCES[k] + RAYONS[k];

        }
        
        const p = orbit_position_calc(add_ref, j, scale_ratio, r, INCLINATIONS[k], EXCENTRICITIES[k]);
        const three_p = new THREE.Vector3(p.x, p.y, p.z);
        points.push(three_p);
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
       
        const p = orbit_position_calc(saturn, j, scale_ratio, r, SATURN_RINGS_INCLINATION, 0);
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