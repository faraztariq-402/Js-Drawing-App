let canvas = document.getElementById("htmlCanvas");
let context = canvas.getContext("2d");
let range = document.getElementById("range");
let eraser = document.getElementById("eraser");
let eraserRange = document.getElementById("eraserRange");
let brush = document.getElementById("brush");
let lineWidth = 10;
let triangleShape = document.getElementById("triangleShape")
let circlePic = document.getElementById("circlePic")
let rectanglePic = document.getElementById("rectanglePic") 
let isDrawing = false
window.addEventListener("load", () => {
    canvas.width = 1600;
    canvas.height = canvas.offsetHeight;
});

let selectColor = () => {
    let userColor = document.getElementById("userInput").value;
    context.strokeStyle = userColor || "#000000"; // set default stroke color to black
    context.lineWidth = range.value;
};

let switchToBrush = () => {
    context.globalCompositeOperation = "source-over"; // Set brush mode
    context.lineWidth = range.value;
};







  

let switchToEraser = () => {
    context.globalCompositeOperation = "destination-out"; // Set eraser mode
    context.lineWidth = eraserRange.value;
};

let startDrawing = () => {
     isDrawing = false;
    let x = 0;
    let y = 0;

    canvas.addEventListener("mousedown", (event) => {
        isDrawing = true;
        x = event.offsetX;
        y = event.offsetY;
        context.beginPath();
        context.moveTo(x, y);
    });

    canvas.addEventListener("mousemove", (event) => {
        if (isDrawing) {
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            x = event.offsetX;
            y = event.offsetY;
        }
    });

    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    canvas.addEventListener("mouseleave", () => {
        isDrawing = false;
    });

    canvas.addEventListener("touchstart", (event) => {
        let touch = event.touches[0];
        x = touch.pageX - canvas.offsetLeft;
        y = touch.pageY - canvas.offsetTop;
        context.beginPath();
        context.moveTo(x, y);
    });

    canvas.addEventListener("touchmove", (event) => {
        event.preventDefault();
        let touch = event.touches[0];
        let offsetX = touch.pageX - canvas.offsetLeft;
        let offsetY = touch.pageY - canvas.offsetTop;
        context.lineTo(offsetX, offsetY);
        context.stroke();
        x = offsetX;
        y = offsetY;
    });
};

let clearBoard = (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.preventDefault()
};

let savePic = () => {
    let urlData = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = "Faraz.png";
    link.href = urlData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

document.getElementById("userInput").addEventListener("change", selectColor);
document.getElementById("range").addEventListener("change", selectColor);

eraser.addEventListener("click", switchToEraser);
brush.addEventListener("click", switchToBrush);

startDrawing();
