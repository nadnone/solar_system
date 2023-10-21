import { INITIAL_ASTRE, INIT_SPEED_RATIO, MAX_SPEED_RATIO, MIN_SPEED_RATIO, SCALE_RATIO_INIT, SCALE_RATIO_MAX, SCALE_RATIO_MIN, SCALE_STEP } from "./constants";
import { ASTRES_NAMES } from "./panel_constants";


export default class Events {

    constructor(astre_panel)
    {
        this.scale_ratio = SCALE_RATIO_INIT;
        this.digit_astre = INITIAL_ASTRE;
        this.scale_state = false;
        this.speed_time_ratio = INIT_SPEED_RATIO;
        this.rotate = 0;

        this._init_resize_event();
        this._init_keyboard_event(astre_panel);
    }

    _update(astre_panel)
    {
        if (this.scale_ratio < SCALE_RATIO_MIN)
        {
            this.scale_ratio = SCALE_RATIO_MIN;
        }
        else if (this.scale_ratio > SCALE_RATIO_MAX)
        {
            this.scale_ratio = SCALE_RATIO_MAX 
        }
        
        if (this.speed_time_ratio < MIN_SPEED_RATIO)
        {
            this.speed_time_ratio = MIN_SPEED_RATIO;
        }
        else if (this.speed_time_ratio > MAX_SPEED_RATIO)
        {
            this.speed_time_ratio = MAX_SPEED_RATIO;
        }
        astre_panel.innerText = ASTRES_NAMES[this.digit_astre];
    
    }

    
    _init_resize_event()
    {
        window.addEventListener("resize", () => {
            window.location.reload();
        });
    }


    _init_keyboard_event(astre_panel)
    {
        window.addEventListener("keypress", (event) => {


            switch (event.code) {
                case 'KeyW':
                    this.scale_ratio += SCALE_STEP;
                    this.scale_state = true;
                    break;
                case 'KeyS':
                    this.scale_ratio -= SCALE_STEP;
                    this.scale_state = true;
                    break;
                    
                case 'Digit0':
                    this.digit_astre = 0;
                    break;
                case 'Digit1':
                    this.digit_astre = 1;
                    break;
                case 'Digit2':
                    this.digit_astre = 2;
                    break;
                case 'Digit3':
                    this.digit_astre = 3;
                    break;
                case 'Digit4':
                    this.digit_astre = 4;
                    break;
                case 'Digit5':
                    this.digit_astre = 5;
                    break;
                case 'Digit6':
                    this.digit_astre = 6;
                    break;
                case 'Digit7':
                    this.digit_astre = 7;
                    break;
                case 'Digit8':
                    this.digit_astre = 8;
                    break;
                case 'Digit9':
                    this.digit_astre = 9;
                    break;

                case 'KeyA':
                    this.speed_time_ratio *= 2
                    break;
                case 'KeyD':
                    this.speed_time_ratio /= 2
                    break;
            
                // rotate camera
                case 'Numpad4':
                    this.rotate += 2;
                    break;
                case 'Numpad6':
                    this.rotate -= 2;
                    break;

                default:
                    break;
            }

            this._update(astre_panel);
        });
    }
}

