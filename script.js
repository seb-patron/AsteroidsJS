let lastrender = 0;
window.requestAnimationFrame(loop);
const width =  800;
const height = window.innerHeight || 800;
const asteroidWidth = 10;
const asteroidHeight = 10;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

// const points = [40, 40, 20, 20, 10, 30, 60, 60, 40, 40];
let points = [-40, -20, -20, -40, 0, -20, 20, -40, 40, -20, 30, 0, 40, 20, 10, 40, -40, 20, -40, -20];

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

function draw() {
  ctx.save();

    
  ctx.rotate((Math.PI/180) * asteroid.rotation);
  //ctx.translate(asteroid.position.x, asteroid.position.y);


  ctx.fillRect(asteroid.position.x, asteroid.position.y, 50, 50);

  // ctx.beginPath();
  // for (let i = 0; i < points.length; i += 2 ) {
  //   if (i == 0) {
  //     ctx.moveTo(points[i] + 50, points[i+1]+ 50);
  //     console.log("move to line");
  //   } else {
  //     ctx.lineTo(points[i]  + 50, points[i+1] + 50);
  //   }
  // }
  // ctx.stroke();
  ctx.restore();
}

function move() {
  asteroid.position.x += asteroid.movement.x;
  asteroid.position.y += asteroid.movement.y;
  if (asteroid.position.x > canvas.width) asteroid.position.x -= canvas.width;
  if (asteroid.position.y > canvas.height) asteroid.position.y -= canvas.height;
  for (let i = 0; i < points.length; i += 2) {
      points[i] += asteroid.movement.x;
      points[i+1] += asteroid.movement.y;
  }
}


function loop(timestamp) {
    let progress = timestamp - lastrender;
    // let p = progress / 16;
    console.log(progress);

    //update(progress);
    ctx.clearRect(0,0, width, height);
    // ctx.rotate((Math.PI/180) * asteroid.rotation);
   
    draw();
    move();
    asteroid.rotation += 1;
     console.log((Math.PI/180) * asteroid.rotation);

    lastrender = timestamp;
    window.requestAnimationFrame(loop);
}

// function update(progress) {
//     //update the state of the world for the time elapsed since last render
//     state.x += progress;

//     if (state.x > width) {
//         state.x = -width;
//     }
// }


// let rotation = 0;
// function rotate(p, theta) {
//   p = p /16;
//   rotation += p * 5;

//   for (let i = 0; i < points.length; i += 2) {
//     points[i] = p * .3 * Math.cos((rotation - 90) * (Math.PI / 180));
//     points[i + 1] = p * .3 * Math.sin((rotation - 90) * (Math.PI / 180));
//   }
// }




//asteroid implementation 1 code below


// function draw() {
//     //draw the state of the world
//     ctx.clearRect(0,0, width, height);
//     ctx.save();
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     for (let i = 0; i < points.length; i += 2 ) {
//       if (i == 0) {
//         ctx.moveTo(points[i] + 50, points[i+1]+ 50);
//         console.log("move to line");
//       } else {
//         ctx.lineTo(points[i]  + 50, points[i+1] + 50);
//       }
//     }

//     // let progress = timestamp - lastrender;
//     i = 0;

//     ctx.stroke();
//     ctx.restore();
//     // rotate(p, 0.01);
//     //console.log("draw executed!");
//     //lastrender = timestamp;

//     //window.requestAnimationFrame(draw);

//     //ctx.fillRect(state.x - 5,  state.y - 5, 10, 10);
// }


// function move() {

//   for (let i = 0; i < points.length; i += 2) {
//   points[i] = points[i] + 2;
//   points[i + 1] = points[i + 1] + 2;
//   }
// }