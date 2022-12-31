const canvas = document.querySelector("#drawing-board");
const toolbar = document.querySelector("#toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let lineCap = 'round';
let strokeStyle = "black";

let startX;
let startY;


toolbar.addEventListener('click', e =>
{
    if (e.target.id === "clear")
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e =>
{
    if (e.target.id === "stroke")
    {

        strokeStyle = e.target.value
    }
    if (e.target.id === 'lineWidth')
    {

        lineWidth = e.target.value
    }
    if (e.target.id === 'lineCap')
    {

        lineCap = e.target.value
    }
});

const draw = (e) =>
{
    if (!isPainting)
    {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = strokeStyle;

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();


}

canvas.addEventListener('mousedown', (e) =>
{
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', (e) =>
{
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();

});

canvas.addEventListener('mousemove', draw);



const generatebase64btn = document.querySelector("#generatebase64");
const downloadasImage = document.querySelector("#downloadasImage");
const close = document.querySelector("#close");

const div_base64show = document.querySelector("#base64show");
const div_maincontainer = document.querySelector("#maincontainer");

generatebase64btn.addEventListener('click', () =>
{
    const data = canvas.toDataURL('image/png', 0.1);
    let base64string = data.split(",")
    const span = document.querySelector("#message")
    div_maincontainer.style = "display:flex;";
    if (!isCanvasBlank(canvas))
    {
        span.innerText = "";
        document.querySelector("#textarea64").value = base64string[1];
    }
    else
    {
        span.style = "color:red;";
        span.innerText = "Canvas is Empty!!";
        document.querySelector("#textarea64").value = "";
    }
})
close.addEventListener('click', () =>
{
    div_maincontainer.style = "display:none;";
})

downloadasImage.addEventListener('click', () =>
{
    const data = canvas.toDataURL();
    downloadasImage.href = data;
})
function isCanvasBlank(canvas)
{
    return !canvas.getContext('2d')
        .getImageData(0, 0, canvas.width, canvas.height).data
        .some(channel => channel !== 0);
}

// function isCanvasBlank(canvas)
// {
//     const blank = document.createElement('canvas');

//     blank.width = canvas.width;
//     blank.height = canvas.height;

//     return canvas.toDataURL() === blank.toDataURL();
// }