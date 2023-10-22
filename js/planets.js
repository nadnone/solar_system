import * as THREE from 'three';
import { 
    COLORS, 
    INCLINATIONS,
    RAYONS, 
    SATURN_RINGS_COLORS, 
    STANDARD_EMISSIVE, 
    EXCENTRICITIES, 
    ANGLE_TO_RAD,
    PLANETS_DAYS,
    SCALE_RATIO_INIT,
    CAMERA_INIT_R,
    PI2,
    AXE_INCLINATION
} from './constants';
import { orbit_position_calc, orbital_path, saturn_rings } from './gen_orbital_path';
import { TEXTURES } from './textures';
import { rotate_around_XZ } from './maths_helper';


export default class Planets 
{
    constructor(scene)
    {
        // meshes arrays
        this.astres = []
        this.lines = []
        this.saturn_rings_lines = []
        this.scene = scene
        this.material_saturn_rings = new THREE.LineBasicMaterial( { color: SATURN_RINGS_COLORS } );

        this._init();
     

    }

    _init()
    {

        for (let i = 0; i < 10; i++) {
   
            // gen meshes
            const geometry = new THREE.SphereGeometry(RAYONS[i], 32, 32);
            
            let material = new THREE.MeshLambertMaterial( { map: TEXTURES[i], emissive: COLORS[i], emissiveIntensity: STANDARD_EMISSIVE } );
            if (i === 0) // for the sun
            {
                material = new THREE.MeshBasicMaterial( { map: TEXTURES[i] } );
            }

            let mesh = new THREE.Mesh( geometry, material );
            this.astres.push(mesh);

            // gen lines
            if (i > 0)
            {
                const material_line = new THREE.LineBasicMaterial( { color: COLORS[i] } );
                const geometry_line = new THREE.BufferGeometry().setFromPoints( orbital_path(i, SCALE_RATIO_INIT) );
                const line = new THREE.Line( geometry_line, material_line );
                this.lines.push(line);
            }

        
        }

        // gen saturn rings
        const material_saturn_rings = new THREE.LineBasicMaterial( { color: SATURN_RINGS_COLORS } );

        for (let i = 0; i < 30; i++) {

            const geometry_line = new THREE.BufferGeometry().setFromPoints( saturn_rings(i, SCALE_RATIO_INIT, this.astres) );
            const line = new THREE.Line( geometry_line, material_saturn_rings );
            this.saturn_rings_lines.push(line);

        }

        
        // add to scene
        for (let i = 0; i < this.astres.length; i++) {
        
            this.scene.add(this.astres[i]);

            if (i !== this.astres.length - 1) // pas de path pour le soleil
            {
                this.scene.add(this.lines[i]);
            }
        }

        // add saturns rings to scene
        for (let i = 1; i < this.saturn_rings_lines.length; i++) {
            
            this.scene.add(this.saturn_rings_lines[i]);
        }
        
    }

    update(t, scale_ratio, scale_state, camera, digit_astre, rotate_control)
    {
        // on commence à 1 pour passer le soleil
        for (let i = 1; i < this.astres.length; i++) {


            let add_pos = new THREE.Vector3(); // référenciel¨

            if (i === 4) // pour la lune 
            {
                add_pos = this.astres[3].position;
            }

            // rotation d'une journée sur chaque planète
            if (i > 0)
            {
                const planet_day = PLANETS_DAYS[i] / t // durée du jours de chaque planète
                const angle_rot = PI2 / planet_day // conversion en angle

                this.astres[i].setRotationFromEuler(new THREE.Euler(-AXE_INCLINATION[i] * ANGLE_TO_RAD, angle_rot, 0));
            }
    

            // calcul des positions
            const p = orbit_position_calc(add_pos, t, scale_ratio, INCLINATIONS[i], EXCENTRICITIES[i], i);
            this.astres[i].position.set(p.x, p.y, p.z);   

            // echelle
            this.astres[i].scale.set(scale_ratio, scale_ratio, scale_ratio);
            if (scale_state)
            {
                for (let j = 1; j < this.lines.length; j++) {
                
                    // j = 1 car décalage, on compte sans le soleil
                    const material_line = new THREE.LineBasicMaterial( { color: COLORS[j] } )
                    const geometry_line = new THREE.BufferGeometry().setFromPoints( orbital_path(j, scale_ratio) );
                    const line = new THREE.Line( geometry_line, material_line );
            
                    this.scene.remove(this.lines[j])
                    this.lines[j] = line;
                    this.scene.add(this.lines[j]);
                }
                scale_state = false;
            }

            // anneaux de saturne
            for (let j = 0; j < this.saturn_rings_lines.length; j++) {

                const geometry_line = new THREE.BufferGeometry().setFromPoints( saturn_rings(j, scale_ratio, this.astres) );
                const line = new THREE.Line( geometry_line, this.material_saturn_rings );

                this.scene.remove(this.saturn_rings_lines[j])
                this.saturn_rings_lines[j] = line;
                this.scene.add(this.saturn_rings_lines[j]);        
            }


            // on observe l'astre demandé
            camera.lookAt(this.astres[digit_astre].position);

            const pos = rotate_around_XZ(this.astres[digit_astre].position, rotate_control * ANGLE_TO_RAD, RAYONS[digit_astre]*2 * scale_ratio + CAMERA_INIT_R);
            camera.position.x = pos.x;
            camera.position.y = pos.y;
            camera.position.z = pos.z;
        }
    }
   
}