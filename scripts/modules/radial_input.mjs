
function register_interaction(event) {
    document.addEventListener("pointermove", update_radial_controller_position);

    document.addEventListener("pointerup", remove_ev);
}

function remove_ev(e) {
    document.removeEventListener("pointermove", update_radial_controller_position);
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

    //TODO controller does not follow cursor, why
    

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

    console.log(new_left)
    console.log(new_top)

    radial_controller.style.left = new_left
    radial_controller.style.top = new_top

    //translate position into value
    let newPercent = 100 - ((100 * theta) / (2 * Math.PI)) + 25

    if (newPercent > 100) {
        newPercent -= 100
    }

    //debug text
    mouse_x_y.textContent = `${x}, ${y}`

    circle_coords.textContent = `${x_radial_center}, ${y_radial_center}`
    mouse_rel.textContent = `${mouse_rel_X}, ${mouse_rel_Y}`
    control.textContent = `${control_x}, ${control_y}`
    theta_span.textContent = `${theta}`

}


export {update_radial_controller_position, register_interaction};