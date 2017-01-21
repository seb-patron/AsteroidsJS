const width = window.innerWidth || 800;
const height = window.innerHeight || 800;
const canvas = document.querySelector("#canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

let lastrender = 0;
window.requestAnimationFrame(loop);

const keyMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowRight: 'right',
    ArrowLeft: 'left'
}




function keydown(event) {
    const key = keyMap[event.key]
    state.pressedKeys[key] = true
}

function keyup(event) {
    const key = keyMap[event.key]
    state.pressedKeys[key] = false
}

// window.addEventListener("keydown", (e) => {if (e.pressedKeys == 68)  state.x += progress });
// window.addEventListener("keydown", (e) => {if (e.pressedKeys == 65)  state.x -= progress });
// window.addEventListener("keyup", keyup, false)

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);



let state = {
    position: {
        x: width / 2,
        y: height / 2
    },

    movement: {
        x: 0,
        y: 0
    },

    rotation: 0,

    pressedKeys: {
        left:   false,
        right:  false,
        up:     false,
        down:   false
    }
}

function update(progress) {
    const p = progress / 16;

    updateRotation(p);
    updateMovement(p);
    updatePosition(p);
}

function updateRotation(p) {
    if (state.pressedKeys.left) {
        state.rotation -= p * 5;
    }
    else if (state.pressedKeys.right) {
        state.rotation += p * 5;
    }
}

function updateMovement(p) {
    let accelerationVector =  {
        x: p * .3 * Math.cos((state.rotation - 90) * (Math.PI / 180)),
        y: p * .3 * Math.sin((state.rotation - 90) * (Math.PI / 180))
    }

    if (state.pressedKeys.up) {
        state.movement.x += accelerationVector.x;
        state.movement.y += accelerationVector.y;
    }

    else if (state.pressedKeys.down) {
        state.movement.x -= accelerationVector.x;
        state.movement.y -= accelerationVector.y;
    }

    if (state.movement.x > 30) {
        state.movement.x = 30;
    }
    else if (state.movement.x < -30) {
        state.movement.x = -30;
    }

    if (state.movement.y > 30) {
        state.movement.y = 30;
    }
    else if (state.movement.y < -30) {
        state.movement.y = -30;
    }
}

function updatePosition(p) {
    state.position.x += state.movement.x;
    state.position.y += state.movement.y;

    // Boundary detection
    if (state.position.x > width) {
        state.position.x -= width;
    }
    else if (state.position.x < 0) {
        state.position.x += width;
    }

    if (state.position.y > height) {
        state.position.y -= height;
    }
    else if (state.position.y < 0) {
        state.position.y += height;
    }
}


function drawShip() {
    ctx.clearRect(0, 0, width, height)

    ctx.save();
    ctx.translate(state.position.x, state.position.y);
    ctx.rotate((Math.PI/180) * state.rotation);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath ();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, -10);
    ctx.lineTo(-5, 5);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function loop(timestamp) {
    let progress = timestamp - lastrender;

    update(progress);
    drawShip();

    lastrender = timestamp;
    window.requestAnimationFrame(loop);
}