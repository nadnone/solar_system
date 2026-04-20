import * as THREE from 'three';
import { ANGLE_TO_RAD, INITIAL_ASTRE, INIT_CAM_ROTATION, INIT_SPEED_RATIO, MAX_SPEED_RATIO, MIN_SPEED_RATIO, PI2, SCALE_RATIO_INIT, SCALE_RATIO_MAX, SCALE_RATIO_MIN, SCALE_STEP } from "./constants";
import { ASTRES_NAMES } from "./panel_constants";


export default class Events {

    constructor(astre_panel)
    {
        this.scale_ratio = SCALE_RATIO_INIT;
        this.digit_astre = INITIAL_ASTRE;
        this.scale_state = false;
        this.speed_time_ratio = INIT_SPEED_RATIO;
        this.rotate = INIT_CAM_ROTATION;
        this.moveCamY = 0;
        this.moveCamX = 0;
        
        this._init_resize_event();
        this._init_keyboard_event(astre_panel);
        this._init_mouse_event();
    }

    get_click_pos() {
        return this.click_angle;
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

    _init_mouse_event() {

        const mouse_speed = 50;

        window.addEventListener("mousemove", (event) => {

            // if left click maintained
            if (event.buttons == 1)
            {
                this.moveCamX += event.movementX / mouse_speed
                this.moveCamY += event.movementY / mouse_speed
            }

            // cap the values
            
            if (this.moveCamX > PI2)
                this.moveCamX = PI2;
            else if (this.moveCamX < -PI2)
                this.moveCamX = -PI2

            if (this.moveCamY > PI2)
                this.moveCamY = PI2;
            else if (this.moveCamY < -PI2)
                this.moveCamY = -PI2;

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
                    this.rotate += 2 * ANGLE_TO_RAD;
                    break;
                case 'Numpad6':
                    this.rotate -= 2 * ANGLE_TO_RAD;
                    break;

                default:
                    break;
            }

            // cap rotation values
            if(this.rotate < -PI2/2)
                this.rotate = -PI2/2;
            else if (this.rotate > PI2/2)
                this.rotate = PI2/2;


            this._update(astre_panel);
        });
    }
}

