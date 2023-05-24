let canvas = document.getElementById("htmlCanvas");
let context = canvas.getContext("2d");
let range = document.getElementById("range");
let eraser = document.getElementById("eraser");
let eraserRange = document.getElementById("eraserRange");
let brush = document.getElementById("brush");
let rectanglePic = document.getElementById("rectanglePic");
let circlePic = document.getElementById("circlePic");
let triangleShape = document.getElementById("triangleShape");
let currentMode = "brush"; // Default mode is brush
let isDrawing = false;
let finalOffsetX, finalOffsetY;

window.addEventListener("load", () => {
  canvas.width = 1600;
  canvas.height = 1000;
});

let selectColor = () => {
  let userColor = document.getElementById("userInput").value;
  context.strokeStyle = userColor || "#000000"; // set default stroke color to black
  context.lineWidth = range.value;
};

let switchMode = (mode) => {
  currentMode = mode;
  if (mode === "brush") {
    context.lineWidth = range.value;
    context.globalCompositeOperation = "source-over";
    context.lineCap = "round"; // Set lineCap to round for smooth brush strokes
  } else if (mode === "eraser") {
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = eraserRange.value;
    context.lineCap = "round"; // Set lineCap to round for smoother erasing
  }
};

let switchToTriangle = () => {
  currentMode = "triangle";
};

let switchToRectangle = () => {
  currentMode = "rectangle";
};

let switchToCircle = () => {
  currentMode = "circle";
};

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  finalOffsetX = event.offsetX;
  finalOffsetY = event.offsetY;
});

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    if (currentMode === "brush") {
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
    } else if (currentMode === "triangle") {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(finalOffsetX, finalOffsetY); // Move to the initial point
      context.lineTo(event.offsetX, event.offsetY); // Draw a line to the current mouse position
      context.lineTo(
        finalOffsetX + (finalOffsetX - event.offsetX),
        event.offsetY
      ); // Draw a line to the calculated third point
      context.closePath(); // Close the path
      context.stroke(); // Stroke the triangle outline
    }else if(currentMode === "eraser" ){
      context.lineWidth = eraserRange.value;

      context.beginPath();
      context.moveTo(finalOffsetX, finalOffsetY);
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      finalOffsetX = event.offsetX;
      finalOffsetY = event.offsetY;
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = board.style.backgroundColor;
      context.lineCap = "round";// Draw a line to the calculated third point
      context.closePath(); // Close the path
      context.stroke(); // Stroke the triangle outline
    }  else if (currentMode === "rectangle") {
    
      context.clearRect(0, 0, canvas.width, canvas.height);
      let width = event.offsetX - finalOffsetX;
      let height = event.offsetY - finalOffsetY;
      context.strokeRect(finalOffsetX, finalOffsetY, width, height);
    } else if (currentMode === "circle") {
      context.clearRect(0, 0, canvas.width, canvas.height);
      let radius = Math.sqrt(
        Math.pow(event.offsetX - finalOffsetX, 2) +
          Math.pow(event.offsetY - finalOffsetY, 2)
      );
      context.beginPath();
      context.arc(finalOffsetX, finalOffsetY, radius, 0, 2 * Math.PI);
      context.stroke();
    }
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

canvas.addEventListener("touchstart", (event) => {
  isDrawing = true;
  let touch = event.touches[0];
  finalOffsetX = touch.pageX - canvas.offsetLeft;
  finalOffsetY = touch.pageY - canvas.offsetTop;
});

canvas.addEventListener("touchmove", (event) => {
  if (isDrawing) {
    event.preventDefault();
    let touch = event.touches[0];
    let offsetX = touch.pageX - canvas.offsetLeft;
    let offsetY = touch.pageY - canvas.offsetTop;
    if (currentMode === "brush") {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }else if(currentMode === "eraser" ){
      context.lineWidth = eraserRange.value;

      context.beginPath();
      context.moveTo(finalOffsetX, finalOffsetY);
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      finalOffsetX = event.offsetX;
      finalOffsetY = event.offsetY;
      context.globalCompositeOperation = "destination-out";
      context.lineCap = "round";
    }
     else if (currentMode === "triangle") {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(finalOffsetX, finalOffsetY); // Move to the initial point
      context.lineTo(offsetX, offsetY); // Draw a line to the current touch position
      context.lineTo(finalOffsetX + (finalOffsetX - offsetX), offsetY); // Draw a line to the calculated third point
      context.closePath(); // Close the path
      context.stroke(); // Stroke the triangle outline
    } else if (currentMode === "rectangle") {
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      // context.moveTo(finalOffsetX, finalOffsetY); // Move to the initial point
      // context.lineTo(offsetX, offsetY);
      let width = offsetX - finalOffsetX;
      let height = offsetY - finalOffsetY;
      context.strokeRect(finalOffsetX, finalOffsetY, width, height);
    } else if (currentMode === "circle") {
      let radius = Math.sqrt(
        Math.pow(offsetX - finalOffsetX,2) +
        Math.pow(offsetY - finalOffsetY,2)
      );
    
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
    
      // Redraw any existing elements on the canvas
      // ...
    
      // Draw the circle
      context.beginPath();
      context.arc(finalOffsetX, finalOffsetY, radius, 0, 2 * Math.PI);
      context.stroke();
      }

    
  }
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

let startDrawing = () => {
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
    if (isDrawing && currentMode === "brush") {
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
  event.preventDefault();
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

startDrawing();
document.getElementById("userInput").addEventListener("change", selectColor);
range.addEventListener("change", selectColor);
brush.addEventListener("click", () => switchMode("brush"));
eraser.addEventListener("click", () => switchMode("eraser"));
rectanglePic.addEventListener("click", switchToRectangle);
circlePic.addEventListener("click", switchToCircle);
triangleShape.addEventListener("click", switchToTriangle);





