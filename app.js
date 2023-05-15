
let canvas = document.getElementById("htmlCanvas")

window.addEventListener("load", () => {

    canvas.width = 1000;
    canvas.height = 1000;
});
let selectColor = (event) => { 
    let range = document.getElementById("range").value
   
    let context = canvas.getContext("2d")
    let userColor = document.getElementById("userInput").value;
    userColor.value = "#00ff0"
context.strokeStyle = userColor.value;
if (!userColor) {
        context.strokeStyle = "#00ff0"; // set default stroke color to black
    } else {
        context.strokeStyle = userColor; // use the user-selected color
    }  

   context.strokeStyle = userColor;
  context.lineWidth = range;


}

let startDrawing = () => {

    let isDrawing = false;
 let x=0;
 let y = 0; 
let canvas = document.getElementById("htmlCanvas")
let context = canvas.getContext("2d")
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    x = event.offsetX;
    y = event.offsetY

    // console.log(event)
})
canvas.addEventListener("mousemove", (event) =>{

if(isDrawing === true){
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(event.offsetX, event.offsetY);
context.stroke();
x = event.offsetX;
y = event.offsetY
context.lineWidth = range.value
}



// console.log(event)

})
canvas.addEventListener("mouseup", (event) =>{
    // console.log(event)

 isDrawing = false

})

canvas.addEventListener("mouseleave", (event)=>{

    isDrawing = false

    // console.log(event)
})
}
let clearBoard = () =>{
    
        let canvas = document.getElementById("htmlCanvas");
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        event.preventDefault(); // add this line to prevent form submission
    
}

let savePic = () =>{
    let canvas = document.getElementById("htmlCanvas")
let urlData = canvas.toDataURL("image/png");
let link = document.createElement("a");
link.download = "Faraz.png"
link.href = urlData
document.body.appendChild(link)
link.click()
document.body.removeChild(link)
}


let colorInput = document.getElementById("userInput");
colorInput.addEventListener("change", selectColor);
let rangeInput = document.getElementById("range");
rangeInput.addEventListener("change", (event) => {
    selectColor(event);
  });
startDrawing()
selectColor()