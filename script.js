function update(progress) {
    //update the state of the world for the time elapsed since last render
    state.x += progress;

    if (state.x > width) {
        state.x = -width;
    }
}

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
const height = 200;
const canvas = document.querySelector("#canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');



let state = {
    x: width / 2,
    y: height / 2
}

