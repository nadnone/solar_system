import * as THREE from 'three';

const sun_texture = new THREE.TextureLoader().load( "textures/sun.jpg" );
const mercury_texture = new THREE.TextureLoader().load( "textures/mercury.jpg" );
const venus_texture = new THREE.TextureLoader().load( "textures/venus.jpg" );
const earth_texture = new THREE.TextureLoader().load( "textures/earth.jpg" );
const moon_texture = new THREE.TextureLoader().load( "textures/moon.jpg" );
const mars_texture = new THREE.TextureLoader().load( "textures/mars.jpg" );
const jupiter_texture = new THREE.TextureLoader().load( "textures/jupiter.jpg" );
const saturn_texture = new THREE.TextureLoader().load( "textures/saturn.jpg" );
const uranus_texture = new THREE.TextureLoader().load( "textures/uranus.jpg" );
const neptune_texture = new THREE.TextureLoader().load( "textures/neptune.jpg" );

const TEXTURES = [
    sun_texture,
    mercury_texture,
    venus_texture,
    earth_texture,
    moon_texture,
    mars_texture,
    jupiter_texture,
    saturn_texture,
    uranus_texture,
    neptune_texture,
]


export {
    TEXTURES
}