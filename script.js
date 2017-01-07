// function update(progress) {
//     //update the state of the world for the time elapsed since last render
//     state.x += progress;

//     if (state.x > width) {
//         state.x = -width;
//     }
// }

function draw() {
    //draw the state of the world
    ctx.clearRect(0,0, width, height);

    ctx.fillRect(state.x - 5,  state.y - 5, 10, 10);
}

function loop(timestamp) {
    let progress = timestamp - lastrender;

    update(progress);
    draw();

    lastrender = timestamp;
    window.requestAnimationFrame(loop);
}

let lastrender = 0;
window.requestAnimationFrame(loop);

const width = 800;
const height = 800;
const canvas = document.querySelector("#canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');



let state = {
    x: width / 2,
    y: height / 2,

    pressedKeys: {
        up: false,
        down: false,
        left: false,
        right: false
    }
}

const keyMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowRight: 'right',
    ArrowLeft: 'left'
}

function keydown(event) {
    var key = keyMap[event.key]
    state.pressedKeys[key] = true
}

function keyup(event) {
    var key = keyMap[event.key]
    state.pressedKeys[key] = false
}

// window.addEventListener("keydown", (e) => {if (e.pressedKeys == 68)  state.x += progress });
// window.addEventListener("keydown", (e) => {if (e.pressedKeys == 65)  state.x -= progress });
// window.addEventListener("keyup", keyup, false)

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);


function update(progress) {
  if (state.pressedKeys.left) {
    state.x -= progress
  }
  if (state.pressedKeys.right) {
    state.x += progress
  }
  if (state.pressedKeys.up) {
    state.y -= progress
  }
  if (state.pressedKeys.down) {
    state.y += progress
  }

  // Flip position at boundaries
  if (state.x > width) {
    state.x -= width
  }
  else if (state.x < 0) {
    state.x += width
  }
  if (state.y > height) {
    state.y -= height
  }
  else if (state.y < 0) {
    state.y += height
  }
}