
function register_interaction(event) {
    event.currentTarget.addEventListener("pointermove", updatepos);

    event.currentTarget.addEventListener("pointerup", remove_ev)
}


function updatepos(event) {
    let x;
    let y;

    x = event.offsetX;
    y = event.offsetY;
    radial_output.textContent = `pos ${x} and ${y}`
    
}

function remove_ev(e) {
    e.currentTarget.removeEventListener("pointermove", updatepos);
}


export {updatepos, register_interaction};