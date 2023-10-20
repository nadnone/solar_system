const ANGLE_TO_RAD = Math.PI/180;
const RATIO_PERIODE = 1/365;
const RATIO_RAYON = 10**(-3)
const RATIO_DIST = 10**(-4) 
const RATIO_LUX =  10**4;

const SOLEIL_RAYON = 696340 * RATIO_RAYON; //  km
const SOLEIL_DIST = 0;
const SOLEIL_PERIODE = 0;
const SOLEIL_COLOR = "#FDB813";
const SOLEIL_INTENSITY = 5*10**4 * RATIO_LUX

const MERCURE_PERIODE = 88 * RATIO_PERIODE // Jours
const MERCURE_DIST = 58; // Millions de km
const MERCURE_RAYON = 2439.7  * RATIO_RAYON; // de km
const MERCURE_COLOR = "#b1adad";
const MERCURE_INCLINAISON = 7;
const MERCURE_EXCENTRICITE = 0.205;
const MERCURE_DIST_MIN = 46001200
const MERCURE_DIST_MAX = 69816900

const VENUS_PERIODE = 243 * RATIO_PERIODE
const VENUS_DIST = 108 ;
const VENUS_RAYON = 6051 * RATIO_RAYON; //  de km
const VENUS_COLOR = "#e39e1c";
const VENUS_INCLINAISON = 3;
const VENUS_EXCENTRICITE = 0.006;
const VENUS_DIST_MIN = 107476000
const VENUS_DIST_MAX = 108943000

const TERRE_PERIODE = 365 * RATIO_PERIODE
const TERRE_DIST = 149 ;
const TERRE_RAYON = 6371 * RATIO_RAYON; //  de km
const TERRE_COLOR = "#0000ff";
const TERRE_INCLINAISON = 23;
const TERRE_EXCENTRICITE = 0.016;
const TERRE_DIST_MIN = 147098074
const TERRE_DIST_MAX = 152097701

const LUNE_PERIODE = 29.5 * RATIO_PERIODE 
const LUNE_DIST_TERRE = 384400  * 10**(-6); // millions de km
const LUNE_RAYON = 1737.4 * RATIO_RAYON; // de km
const LUNE_COLOR = "#f5f5f5";
const LUNE_INCLINAISON_TERRE = 23.4;
const LUNE_EXCENTRICITE = 0.054;
const LUNE_DIST_MIN = 356700
const LUNE_DIST_MAX = 406300

const MARS_PERIODE = 186 * RATIO_PERIODE
const MARS_DIST = 228 ;
const MARS_RAYON = 3389 * RATIO_RAYON; //  de km
const MARS_COLOR = "#451804";
const MARS_INCLINAISON = 25.19;
const MARS_EXCENTRICITE = 0.093;
const MARS_DIST_MIN = 206655000
const MARS_DIST_MAX = 249230000

const JUPITER_PERIODE = 11*365 * RATIO_PERIODE
const JUPITER_DIST = 778 ;
const JUPITER_RAYON = 69911 * RATIO_RAYON; //  de km
const JUPITER_COLOR = "#c99039";
const JUPITER_INCLINAISON = 3.13;
const JUPITER_EXCENTRICITE = 0.048;
const JUPITER_DIST_MIN = 740680000
const JUPITER_DIST_MAX = 816000000

const SATURNE_PERIODE = 29.5*365 * RATIO_PERIODE
const SATURNE_DIST = 1430 ;
const SATURNE_RAYON = 58232 * RATIO_RAYON; //  de km
const SATURNE_COLOR = "#ceb8b8";
const SATURNE_INCLINAISON = 27;
const SATURNE_EXCENTRICITE = 0.053;
const SATURNE_DIST_MIN = 1349800000 
const SATURNE_DIST_MAX = 1503500000

const URANUS_PERIODE = 84*365 * RATIO_PERIODE
const URANUS_DIST = 2800 ;
const URANUS_RAYON = 25362 * RATIO_RAYON; //  de km
const URANUS_COLOR = "#E1EEEE";
const URANUS_INCLINAISON = 0.7;
const URANUS_EXCENTRICITE = 0.047;
const URANUS_DIST_MIN = 2735000000 
const URANUS_DIST_MAX = 3006300000

const NEPTUNE_PERIODE = 165*365 * RATIO_PERIODE
const NEPTUNE_DIST = 4504 ;
const NEPTUNE_RAYON = 24622 * RATIO_RAYON; //  de km
const NEPTUNE_COLOR = "#5B5DDF";
const NEPTUNE_INCLINAISON = 1.77;
const NEPTUNE_EXCENTRICITE = 0.008;
const NEPTUNE_DIST_MIN = 4459800000 
const NEPTUNE_DIST_MAX = 4537000000

const DIST_MIN = [
    0,
    MERCURE_DIST_MIN * RATIO_DIST,
    VENUS_DIST_MIN * RATIO_DIST,
    TERRE_DIST_MIN * RATIO_DIST,
    LUNE_DIST_MIN * RATIO_DIST,
    MARS_DIST_MIN * RATIO_DIST,
    JUPITER_DIST_MIN * RATIO_DIST,
    SATURNE_DIST_MIN * RATIO_DIST,
    URANUS_DIST_MIN * RATIO_DIST,
    NEPTUNE_DIST_MIN * RATIO_DIST,
];

const DIST_MAX = [
    0,
    MERCURE_DIST_MAX * RATIO_DIST,
    VENUS_DIST_MAX * RATIO_DIST,
    TERRE_DIST_MAX * RATIO_DIST,
    LUNE_DIST_MAX * RATIO_DIST,
    MARS_DIST_MAX * RATIO_DIST,
    JUPITER_DIST_MAX * RATIO_DIST,
    SATURNE_DIST_MAX * RATIO_DIST,
    URANUS_DIST_MAX * RATIO_DIST,
    NEPTUNE_DIST_MAX * RATIO_DIST,
];
const EXCENTRICITIES = [
    1,
    MERCURE_EXCENTRICITE,
    VENUS_EXCENTRICITE,
    TERRE_EXCENTRICITE,
    LUNE_EXCENTRICITE,
    MARS_EXCENTRICITE,
    JUPITER_EXCENTRICITE,
    SATURNE_EXCENTRICITE,
    URANUS_EXCENTRICITE,
    NEPTUNE_EXCENTRICITE
];

const RAYONS = [
    SOLEIL_RAYON,
    MERCURE_RAYON,
    VENUS_RAYON,
    TERRE_RAYON,
    LUNE_RAYON,
    MARS_RAYON,
    JUPITER_RAYON,
    SATURNE_RAYON,
    URANUS_RAYON,
    NEPTUNE_RAYON,
];

const DISTANCES = [
    SOLEIL_DIST,
    MERCURE_DIST,
    VENUS_DIST,
    TERRE_DIST,
    LUNE_DIST_TERRE,
    MARS_DIST,
    JUPITER_DIST,
    SATURNE_DIST,
    URANUS_DIST,
    NEPTUNE_DIST,
];

const PERIODES = [
    SOLEIL_PERIODE,
    MERCURE_PERIODE,
    VENUS_PERIODE,
    TERRE_PERIODE,
    LUNE_PERIODE,
    MARS_PERIODE,
    JUPITER_PERIODE,
    SATURNE_PERIODE,
    URANUS_PERIODE,
    NEPTUNE_PERIODE,
];

const COLORS = [
    SOLEIL_COLOR,
    MERCURE_COLOR,
    VENUS_COLOR,
    TERRE_COLOR,
    LUNE_COLOR,
    MARS_COLOR,
    JUPITER_COLOR,
    SATURNE_COLOR,
    URANUS_COLOR,
    NEPTUNE_COLOR
]

const INCLINATIONS = [
    1,
    MERCURE_INCLINAISON * ANGLE_TO_RAD,
    VENUS_INCLINAISON * ANGLE_TO_RAD,
    TERRE_INCLINAISON * ANGLE_TO_RAD,
    LUNE_INCLINAISON_TERRE * ANGLE_TO_RAD,
    MARS_INCLINAISON * ANGLE_TO_RAD,
    JUPITER_INCLINAISON * ANGLE_TO_RAD,
    SATURNE_INCLINAISON * ANGLE_TO_RAD,
    URANUS_INCLINAISON * ANGLE_TO_RAD,
    NEPTUNE_INCLINAISON * ANGLE_TO_RAD,
]


const INIT_SPEED_RATIO = 1;
const MAX_SPEED_RATIO = 365*6; // years

const SATURN_RINGS_R = [
    66900, // km 
    6000000,	
];

const SATURN_RINGS_INCLINATION = 26.7 * ANGLE_TO_RAD;
const SATURN_RINGS_COLORS = "#00698a";

const SCALE_RATIO_INIT = 10;
const SCALE_RATIO_MIN = 0.05;
const SCALE_RATIO_MAX = 10;

const SCALE_STEP = 2;

const INITIAL_ASTRE = 3;
const CAMERA_INIT_DIST = {
    "x": 10, 
    "y": 5,
    "z": 0,
}

const STANDARD_EMISSIVE = 1/32;
const FPS = 1/60;

export { 
    PERIODES,
    DISTANCES,
    RAYONS,
    COLORS,
    INCLINATIONS,
    MAX_SPEED_RATIO,
    ANGLE_TO_RAD,
    SATURN_RINGS_R,
    SATURN_RINGS_INCLINATION,
    SATURN_RINGS_COLORS,
    SCALE_RATIO_INIT,
    SOLEIL_INTENSITY,
    STANDARD_EMISSIVE,
    FPS,
    CAMERA_INIT_DIST,
    INITIAL_ASTRE,
    INIT_SPEED_RATIO,
    EXCENTRICITIES,
    SCALE_RATIO_MIN,
    DIST_MAX,
    DIST_MIN,
    SCALE_STEP,
    SCALE_RATIO_MAX
}