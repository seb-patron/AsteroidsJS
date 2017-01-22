function update(progress) {
    //update the state of the world for the time elapsed since last render
    state.x += progress;

    if (state.x > width) {
        state.x = -width;
    }
}
let lastrender = 0;
//window.requestAnimationFrame(draw);

const width = 400;
const height = 400;
const asteroidWidth = 10;
const asteroidHeight = 10;
// canvas.width = width;
// canvas.height = height;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

// const points = [40, 40, 20, 20, 10, 30, 60, 60, 40, 40];
let points = [-4, -2, -2, -4, 0, -2, 2, -4, 4, -2, 3, 0, 4, 2, 1, 4, -4, 2, -4, -2];

function draw() {
    //draw the state of the world
    ctx.clearRect(0,0, width, height);
    ctx.save();
    ctx.lineWidth = 2;
    //ctx.beginPath();
    for (let i = 0; i < points.length; i += 2 ) {
      if (i == 0) {
        ctx.moveTo(points[i] * asteroidWidth + 100, points[i+1] * asteroidHeight + 100);
        console.log("move to line");
      } else {
        ctx.lineTo(points[i] * asteroidWidth + 100, points[i+1] * asteroidHeight + 100);
      }
    }

    // let progress = timestamp - lastrender;
    i = 0;

    ctx.stroke();
    ctx.restore();
    // rotate(p, 0.01);
    //console.log("draw executed!");
    //lastrender = timestamp;

    //window.requestAnimationFrame(draw);

    //ctx.fillRect(state.x - 5,  state.y - 5, 10, 10);
}

let rotation = 0;
function rotate(p, theta) {
  p = p /16;
  rotation += p * 5;

  for (let i = 0; i < points.length; i += 2) {
    points[i] = p * .3 * Math.cos((rotation - 90) * (Math.PI / 180));
    points[i + 1] = p * .3 * Math.sin((rotation - 90) * (Math.PI / 180));
  }
}

function loop(timestamp) {
    let progress = timestamp - lastrender;
    // let p = progress / 16;
    console.log(progress);

    //update(progress);
    //ctx.clearRect(0,0, width, height);
    draw();
    rotate(progress, 0.01);

    lastrender = timestamp;
    window.requestAnimationFrame(loop);
}

//   let c = false;
// function hasPoint(p, ox, oy, x, y) {
//   let len = p.length;
//   let lenMinusTwo = len - 2;
//   for (let i = 0; i < len; i += 2) {
//     let px1 = p[i] + ox; 
//     let px2 = p[len - 2] + ox;
//     let py1 = p[i] + oy;
//     let py2 = p[len - 1] + oy;

//     if ((py1 > y != py2 > y) && (x < (px2-px1) * (y-py1) / (py2-py1) + px1)) {
//       c = !c;
//     }


//   }
// }


// if (i === 0) {
//         ctx.moveTo(points[i] * asteroidWidth + 50, points[i+1] * asteroidHeight + 50);
//       } else {
//         ctx.lineTo(points[i] * asteroidWidth + 50, points[i+1] * asteroidHeight + 50);
//       }



// let state = {
//     x: width / 2,
//     y: height / 2,

//     pressedKeys: {
//         up: false,
//         down: false,
//         left: false,
//         right: false
//     }
// }

// const keyMap = {
//     ArrowUp: 'up',
//     ArrowDown: 'down',
//     ArrowRight: 'right',
//     ArrowLeft: 'left'
// }

// function keydown(event) {
//     var key = keyMap[event.key]
//     state.pressedKeys[key] = true
// }

// function keyup(event) {
//     var key = keyMap[event.key]
//     state.pressedKeys[key] = false
// }

// // window.addEventListener("keydown", (e) => {if (e.pressedKeys == 68)  state.x += progress });
// // window.addEventListener("keydown", (e) => {if (e.pressedKeys == 65)  state.x -= progress });
// // window.addEventListener("keyup", keyup, false)

// window.addEventListener("keydown", keydown, false);
// window.addEventListener("keyup", keyup, false);


// function update(progress) {
//   if (state.pressedKeys.left) {
//     state.x -= progress
//   }
//   if (state.pressedKeys.right) {
//     state.x += progress
//   }
//   if (state.pressedKeys.up) {
//     state.y -= progress
//   }
//   if (state.pressedKeys.down) {
//     state.y += progress
//   }

//   // Flip position at boundaries
//   if (state.x > width) {
//     state.x -= width
//   }
//   else if (state.x < 0) {
//     state.x += width
//   }
//   if (state.y > height) {
//     state.y -= height
//   }
//   else if (state.y < 0) {
//     state.y += height
//   }
// }