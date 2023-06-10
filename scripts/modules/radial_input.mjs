
function register_interaction(event) {
    document.addEventListener("pointermove", updatepos);

    document.addEventListener("pointerup", remove_ev)
}


function updatepos(event) {
    let x;
    let y;

    x = event.offsetX;
    y = event.offsetY;
    radial_output.textContent = `pos ${x} and ${y}`
    
}

function remove_ev(e) {
    document.removeEventListener("pointermove", updatepos);
}


export {updatepos, register_interaction};