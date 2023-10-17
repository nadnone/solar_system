const RATIO_DIST = 10**(-1);
const RADIO_PERIODE = 10**(-3);
const RATIO_RAYON = 10**(-4);

const SOLEIL_RAYON = 696340 * RATIO_RAYON / 10; // millions de km / 10
const SOLEIL_DIST = 0;
const SOLEIL_PERIODE = 0;
const SOLEIL_COLOR = "#FDB813";

const MERCURE_PERIODE = 88 * RADIO_PERIODE // Jours
const MERCURE_DIST = 58 * RATIO_DIST; // Millions de km
const MERCURE_RAYON = 2439 * RATIO_RAYON; // Millions de km
const MERCURE_COLOR = "#b1adad";
const MERCURE_INCLINAISON = 7;

const VENUS_PERIODE = 243 * RADIO_PERIODE
const VENUS_DIST = 108 * RATIO_DIST;
const VENUS_RAYON = 6051 * RATIO_RAYON; // Millions de km
const VENUS_COLOR = "#e39e1c";
const VENUS_INCLINAISON = 3;

const TERRE_PERIODE = 365 * RADIO_PERIODE
const TERRE_DIST = 149 * RATIO_DIST;
const TERRE_RAYON = 6371 * RATIO_RAYON; // Millions de km
const TERRE_COLOR = "#0000ff";
const TERRE_INCLINAISON = 0;

const LUNE_PERIODE = 29.5 * RADIO_PERIODE
const LUNE_DIST_TERRE = 384400 * RATIO_DIST * 10**(-6); // millions de km
const LUNE_RAYON = 1737 * RATIO_RAYON; // Millions de km
const LUNE_COLOR = "#f5f5f5";
const LUNE_INCLINAISON_TERRE = 23.4;

const MARS_PERIODE = 186 * RADIO_PERIODE
const MARS_DIST = 228 * RATIO_DIST;
const MARS_RAYON = 3389 * RATIO_RAYON; // Millions de km
const MARS_COLOR = "#451804";
const MARS_INCLINAISON = 25.19;

const JUPITER_PERIODE = 11*365 * RADIO_PERIODE
const JUPITER_DIST = 778 * RATIO_DIST;
const JUPITER_RAYON = 69911 * RATIO_RAYON; // Millions de km
const JUPITER_COLOR = "#c99039";
const JUPITER_INCLINAISON = 3.13;

const SATURNE_PERIODE = 29.5*365 * RADIO_PERIODE
const SATURNE_DIST = 1430 * RATIO_DIST;
const SATURNE_RAYON = 58232 * RATIO_RAYON; // Millions de km
const SATURE_COLOR = "#ceb8b8";
const SATURE_INCLINAISON = 27;

const URANUS_PERIODE = 84*365 * RADIO_PERIODE
const URANUS_DIST = 2800 * RATIO_DIST;
const URANUS_RAYON = 25362 * RATIO_RAYON; // Millions de km
const URANUS_COLOR = "#E1EEEE";
const URANUS_INCLINAISON = 0.7;

const NEPTUNE_PERIODE = 165*365 * RADIO_PERIODE
const NEPTUNE_DIST = 4504 * RATIO_DIST;
const NEPTUNE_RAYON = 24622 * RATIO_RAYON; // Millions de km
const NEPTUNE_COLOR = "#5B5DDF";
const NEPTUNE_INCLINAISON = 1.77;

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
    SATURE_COLOR,
    URANUS_COLOR,
    NEPTUNE_COLOR
]

const INCLINATIONS = [
    1,
    MERCURE_INCLINAISON,
    VENUS_INCLINAISON,
    TERRE_INCLINAISON,
    LUNE_INCLINAISON_TERRE,
    MARS_INCLINAISON,
    JUPITER_INCLINAISON,
    SATURE_INCLINAISON,
    URANUS_INCLINAISON,
    NEPTUNE_INCLINAISON
]


const COMMANDS_TEXT = `
    ### Stars/Planets Keys ###
            
    0: Sun
    1: Mercury
    2: Venus
    3: Earth
    4: Moon
    5: Mars
    6: Jupiter
    7: Saturn
    8: Uranus
    9: Neptun

    ### Zoom Keys ###

    W: scale + 0.1
    S: scale - 0.1

    ### Speed Keys ###
    A: Speed * 2 
    D: Speed / 2

    ### MISC ###
    F5: Reset All

`;

                    
const PROJECT_LINK_TEXT = `<br/></br>### Infos Project ###<br/>
    <a href='https://github.com/nadnone/solar_system' target='_blank'>Source code</a></br>
    <a href='https://github.com/nadnone/' target='_blank'>GitHub Profile Page</a></br>
    <a href='https://nadnone.github.io' target='_blank'>Nadfolio (Portfolio)</a>
`;

const MAX_SPEED_RATIO = 60;
const ANGLE_TO_RAD = Math.PI/180;

export { 
    PERIODES,
    DISTANCES,
    RAYONS,
    COLORS,
    INCLINATIONS,
    COMMANDS_TEXT,
    PROJECT_LINK_TEXT,
    MAX_SPEED_RATIO,
    ANGLE_TO_RAD
}