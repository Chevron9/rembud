
function register_interaction(event) {
    document.addEventListener("pointermove", update_radial_controller_position);

    document.addEventListener("pointerup", remove_ev);
}

function remove_ev(e) {
    document.removeEventListener("pointermove", update_radial_controller_position);
}

function calculate_circle_to_time(radial_percent,radial_level) {
    const time_units = ["m","h","d"]
    const time_units_elaborate = ["minutes","hours","days"]
    const time_factor = {"m":60*1000,"h":60*60*1000,"d":24*60*60*1000}
    const unit_max = {"m":60,"h":24,"d":14}

    console.log(radial_level)
    console.log(radial_percent)
    console.log(time_units[radial_level])
    console.log(unit_max[time_units[radial_level]])

    let time_chosen_fraction
    time_chosen_fraction = (radial_percent/100)*(unit_max[time_units[radial_level]])
    
    
    circle_level.textContent = Math.round(time_chosen_fraction).toString()+` ${time_units_elaborate[radial_level]}`
}

function update_radial_controller_position(event) {
    let radial_controller = document.getElementById("radial_controller");
    document.getElementsByClassName("")

    let x;
    let y;

    x = event.clientX;
    y = event.clientY;
    radial_output.textContent = `pos ${x} and ${y}`;

    //get circle center
    const radial_base = document.getElementById("circle_base");

    //DOMrect object
    //these coordinates are relative to the viewport 
    //(see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
    const radial_center = radial_base.getBoundingClientRect()

    //center of the circle
    const x_radial_center = (radial_center.left + radial_center.right) / 2
    const y_radial_center = (radial_center.top + radial_center.bottom) / 2

    const radius = radial_center.width /2

    //mouse position relative to circle center
    let mouse_rel_X =  event.clientX - x_radial_center
    let mouse_rel_Y = y_radial_center - event.clientY 

    //theta is the angle of the mouse position on the unit circle
    let theta

    theta = Math.atan(mouse_rel_Y / mouse_rel_X);

    // adjust for quadrants
    // quadrant 2
    if (mouse_rel_X < 0 && mouse_rel_Y > 0) {
        theta += Math.PI;
    // quadrant 3
    } else if (mouse_rel_X < 0 && mouse_rel_Y <= 0) {
        theta += Math.PI;
    // quadrant 4
    } else if (mouse_rel_X > 0 && mouse_rel_Y <= 0) {
        theta += 2 * Math.PI;
    }

    //get circle radius
    let control_x = radius * Math.cos(theta);
    let control_y = radius * Math.sin(theta);


    //left and top of control
    let new_left = (radius + control_x).toString()+"px";
    let new_top = (radius - control_y).toString()+"px";

    //console.log(new_left)
    //console.log(new_top)

    //TODO use proper variables!
    level_jump.textContent = "NONE"

    if ((radial_controller.last_theta >= (Math.PI/2)) 
    && (radial_controller.last_theta <= Math.PI)) {
        level_jump.textContent = "up"

    } else if ((radial_controller.last_theta <= (Math.PI/2)) 
    && (radial_controller.last_theta >= 1)) {
        level_jump.textContent = "down"
        
    } else {
        level_jump.textContent = "false"
    }

    if (level_jump.textContent == "up" && theta <= (Math.PI/2)){
        level_jump.textContent = "JUMPJUMPJUMP"
        if (radial_controller.jump_level == 2) {
            //pass
        } else {
            radial_controller.jump_level += 1;
        }     
    } else if (level_jump.textContent == "down" 
    && 0 < (theta - radial_controller.last_theta)
    && theta >= (Math.PI/2)
    && radial_controller.last_theta <= (Math.PI/2) ){
        level_jump.textContent = "JUMPJUMPJUMP"
        if (radial_controller.jump_level == 0) {
            //pass
        } else {
            radial_controller.jump_level -= 1;
        }     
    }

    if (radial_controller.jump_level == 0){
        circle_level.textContent = "min"

    } else if (radial_controller.jump_level == 1) {
        circle_level.textContent = "hr"

    } else if (radial_controller.jump_level == 2) {
        circle_level.textContent = "day"
    }


    radial_controller.style.left = new_left
    radial_controller.style.top = new_top

    //translate position into value
    //add 25 to shift zero-point to top
    let newPercent = 100 - ((100 * theta) / (2 * Math.PI)) + 25

    if (newPercent > 100) {
        newPercent -= 100
    }

    circle_time_out.textContent = `Circle Out: ${newPercent}`
    calculate_circle_to_time(newPercent,radial_controller.jump_level)

    //debug text
    mouse_x_y.textContent = `${x}, ${y}`

    circle_coords.textContent = `${x_radial_center}, ${y_radial_center}`
    mouse_rel.textContent = `${mouse_rel_X}, ${mouse_rel_Y}`
    control.textContent = `${control_x}, ${control_y}`
    theta_span.textContent = `${theta}`
    last_theta.textContent = `${radial_controller.last_theta}`
    jump_lvl.textContent = `${radial_controller.jump_level}`
    


    radial_controller.last_theta = theta

    update_radial_overlay_fill(newPercent)

}

function update_radial_overlay_fill(newPercent) {
    let overlay1 = document.querySelector(".overlay1");
    let overlay2 = document.querySelector(".overlay2");

    let overlayRotation1 = 0;
    let overlayRotation2 = 0;

    overlayRotation1 = 2 * Math.PI * newPercent / 100
    overlayRotation2 = overlayRotation1 + Math.PI

    if (newPercent > 50) {
        overlayRotation1 = Math.PI
    } else {
        overlayRotation2 = 0
    }

    overlay1.style.transform = `rotate(${overlayRotation1}rad)`;
    overlay2.style.transform = `rotate(${overlayRotation2}rad)`;
    console.log("rotate(${overlayRotation1}rad)")

}

export {update_radial_controller_position, register_interaction};