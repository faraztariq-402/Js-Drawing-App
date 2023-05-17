
let canvas = document.getElementById("htmlCanvas");
let context = canvas.getContext("2d");
let range = document.getElementById("range");
// console.log(range)
let lineWidth = 10
window.addEventListener("load", () => {
    canvas.width = 1600;
    canvas.height = 1000;
});

let selectColor = () => {
    let userColor = document.getElementById("userInput").value;
    context.strokeStyle = userColor || "#00ff0"; // set default stroke color to black
    context.lineWidth = range.value;
}

let startDrawing = () => {
    let isDrawing = false;
    let x = 0;
    let y = 0;

    canvas.addEventListener("mousedown", (event) => {
        isDrawing = true;
        x = event.offsetX;
        y = event.offsetY;
        context.beginPath();
        context.range = lineWidth
    });

    canvas.addEventListener("mousemove", (event) => {
        if (isDrawing === true) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            context.lineCap = "round"
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
}

let clearBoard = (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.preventDefault(); // add this line to prevent form submission
}

let savePic = () => {
    let urlData = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = "Faraz.png";
    link.href = urlData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("userInput").addEventListener("change", selectColor);
document.getElementById("range").addEventListener("change", selectColor);

startDrawing();
selectColor();
