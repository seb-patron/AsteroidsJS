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

let asteroid = {
  position: {
    x: 400,
    y: 400
  },
  
  movement: {
    x: 1,
    y: 1
  },

  rotation: 0
}

const asteroidArray = [];

function update(progress) {
    const p = progress / 16;
    updateAsteroid(p);

    updateShipRotation(p);
    updateShipMovement(p);
    updateShipPosition(p);
}

function updateAsteroid(p) {
    asteroid.rotation += p*5;

    asteroid.position.x += asteroid.movement.x;
    asteroid.position.y += asteroid.movement.y;
    if ( asteroid.position.x > canvas.width)  asteroid.position.x -= canvas.width;
    if ( asteroid.position.y > canvas.height)  asteroid.position.y -= canvas.height;
}

function updateShipRotation(p) {
    if (state.pressedKeys.left) {
        state.rotation -= p * 5;
    }
    else if (state.pressedKeys.right) {
        state.rotation += p * 5;
    }
}

function updateShipMovement(p) {
    let accelerationVector =  {
        x: p * .3 * Math.cos((state.rotation - 90) * (Math.PI / 180)),
        y: p * .3 * Math.sin((state.rotation - 90) * (Math.PI / 180))
    }

    //Stoke's Law
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

function updateShipPosition(p) {
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

function checkCollisions() {
    //checks to see if ship is inside asteroid positions
    if (state.position.x > asteroid.position.x && state.position.x < asteroid.position.x + 50) {
        if (state.position.y > asteroid.position.y && state.position.y < asteroid.position.y + 50) {
            console.log("game over");
        }
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

function drawAsteroid() {
    //ctx.fillRect(asteroid.position.x, asteroid.position.y, 50, 50);
    //ctx.translate(asteroid.position.x, asteroid.position.y);
    //ctx.rotate((Math.PI/180) * asteroid.rotation);
    ctx.fillRect(asteroid.position.x, asteroid.position.y, 50, 50);
    ctx.fillStyle = "white";
    ctx.clearRect(asteroid.position.x + 2, asteroid.position.y + 2, 46, 46);
}

function loop(timestamp) {
    let progress = timestamp - lastrender;

    update(progress);
    checkCollisions();
    drawShip();
    drawAsteroid();

    lastrender = timestamp;
    window.requestAnimationFrame(loop);
}