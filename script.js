var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// some hotfixes... ( ≖_≖)

// canvas.style.position = 'fixed';
canvas.style.cssText = "margin:10px;width:90%;height:85vh;border:3px solid gray;";

// get canvas 2D context and set him correct size
var ctx = canvas.getContext('2d');
resize();

// last known position
var pos = { x: 0, y: 0 };

window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

// resize canvas
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}
const btn = document.querySelector("#btn");
const reset = document.querySelector("#reset");
const txtarea = document.querySelector("#txtarea");
const mycanvas = document.querySelector("canvas");
btn.addEventListener("click", function(){
  const data = mycanvas.toDataURL();
  const str = data.split(",")
  txtarea.value = str[1] ;
})
reset.addEventListener("click", function(){
  resize()
})


