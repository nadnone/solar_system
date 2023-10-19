
const ASTRES_NAMES = [
    "Sun",
    "Mercury",
    "Venus",
    "Earth",
    "Moon",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune"  
];


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
    9: Neptune

    ### Scale Keys ###
    W: scale * 2
    S: scale / 2

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

export {
    COMMANDS_TEXT,
    PROJECT_LINK_TEXT,
    ASTRES_NAMES,
}