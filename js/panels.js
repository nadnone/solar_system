import { INITIAL_ASTRE } from "./constants";
import { ASTRES_NAMES, COMMANDS_TEXT, PROJECT_LINK_TEXT } from "./panel_constants";

export default class Panels 
{
    constructor()
    {
        // panel text
        this.text_panel = document.createElement("div");
        this.text_panel.className = "panel";
        document.body.appendChild(this.text_panel);

        // panel Astre name
        this.astre_panel = document.createElement("div");
        this.astre_panel.className = "name_astre";
        this.astre_panel.innerText = ASTRES_NAMES[INITIAL_ASTRE];
        document.body.appendChild(this.astre_panel);
    }

    update(speed_time_ratio, virtual_t, t, t0, t1)
    {
        this.text_panel.innerText = COMMANDS_TEXT;
        this.text_panel.innerText += `\n### System info ###
            Speed: x ${(speed_time_ratio).toFixed(2)}
    
            [DEBUG]
            Benchmark time: ~${(t1 - t0).toFixed(3)} ms
             Time:
            - virtual: ~${(virtual_t).toFixed(0)} units
            - t: ~${(t).toFixed(0)} units
    
        `;
        this.text_panel.innerHTML += PROJECT_LINK_TEXT;
    
    
    }
}