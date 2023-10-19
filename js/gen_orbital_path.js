import * as THREE from 'three';
import {ANGLE_TO_RAD, DIST_MAX, DIST_MIN, EXCENTRICITIES, INCLINATIONS, PERIODES, RAYONS, SATURN_RINGS_INCLINATION, SATURN_RINGS_R } from './constants.js';

function orbit_position_calc(ref, t, scale_ratio, inclination, e, k = 0)
{

    // inspiré de mon précédent code ici: https://github.com/nadnone/Satellite_movement_kepler/blob/main/all.js

    const angle = t / 60

    const SB = DIST_MAX[k]
    const OB = DIST_MIN[k] 
    const SO = Math.sqrt( SB**2 - OB**2 ) // distance du centre de l'astre au foyer


    const SH = SB * Math.cos(angle - e)
    const tmp = Math.sqrt( 1 - e**2 ) * Math.sin(angle)
    const HP = SB * tmp
    const OH = SO - SH 

    const x = ref.x + OH * scale_ratio
    const z = ref.z + HP * scale_ratio 
    const y = ref.y + Math.cos(inclination) * tmp * scale_ratio

    return {
        "x": x,
        "y": y,
        "z": z,
    }
}

function orbital_path(k, scale_ratio, add_ref = new THREE.Vector3())
{
    let points = [];

    for (let angle = 0; angle <= Math.PI * 2 ; angle += Math.PI/180) {
        

        const p = orbit_position_calc(add_ref, angle, scale_ratio, INCLINATIONS[k], EXCENTRICITIES[k], k);
        const three_p = new THREE.Vector3(p.x, p.y, p.z);
        points.push(three_p);
    }

    return points;
}

function simple_circle_path(ref, angle, scale_ratio, inclination, r)
{

    const cos_phi = Math.cos(angle * ANGLE_TO_RAD);
    const sin_phi = Math.sin(angle * ANGLE_TO_RAD);

    const cos_incl = Math.sin(inclination);

    // y swaped with z
    const x = ref.x + cos_phi * r * scale_ratio
    const z = ref.z + sin_phi * r * scale_ratio
    const y = ref.y + sin_phi * cos_incl * r * scale_ratio;

    return {
        "x": x,
        "y": y,
        "z": z,
    }
}

function saturn_rings(k, scale_ratio, astres)
{
    let points = [];

    for (let angle = 0; angle <= 360 ; angle += 10) {

        // 7 car saturne + ([0]/[1] = ratio)
        const r = (RAYONS[7] + (SATURN_RINGS_R[0] / SATURN_RINGS_R[1]) * k * 100);
        const saturn = astres[7].position;

        const p = simple_circle_path(saturn, angle, scale_ratio, SATURN_RINGS_INCLINATION, r);
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