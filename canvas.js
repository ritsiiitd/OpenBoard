let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//API
let tool = canvas.getContext("2d");
tool.strokeStyle = "black";
tool.lineWidth = 3;

let undoRedoHistory = [];
let state = -1;
//DRAWWW and UNDO REDO
let mouseDown =false;
let pencilSelected =false;
//mousedown -> start drawing Path //mouse move-> path fill
canvas.addEventListener("mousedown",(e)=>{
    mouseDown=true;
    
    tool.beginPath();
    tool.moveTo(e.clientX,e.clientY);//moves the tool to this pos without creating line
})

canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown==true){
        tool.lineTo(e.clientX,e.clientY);//creates a line to x and y from last position of tool
        tool.stroke();//fill color in the drawn line
    }
})

canvas.addEventListener("mouseup",(e)=>{
    mouseDown = false;
    //add this state to undoRedoHistory as it is completed
    let url = canvas.toDataURL();
    undoRedoHistory.push(url);
    state = undoRedoHistory.length-1;
})


//CHANGE COLORS

let colors = document.querySelectorAll(".pencil-color");
let pencilWidhtSlider = document.querySelector(".pencil-w");
let eraserWidhtSlider = document.querySelector(".eraser-w");
let pencilWidth = pencilWidhtSlider;

let eraserWidth = eraserWidhtSlider.value; 
let pencilColor = "red";
let eraserColor = "white";

colors.forEach((color)=>{
    color.addEventListener("click",(e)=>{
        let c = color.id;
        pencilColor = c;
        tool.strokeStyle = pencilColor;
    })
})

pencilWidhtSlider.addEventListener("change",(e)=>{
    //console.log(pencilWidhtSlider.value);
    pencilWidth = pencilWidhtSlider.value;
    tool.lineWidth = pencilWidth;
})

eraserWidhtSlider.addEventListener("change",(e)=>{
    //console.log(pencilWidhtSlider.value);
    eraserWidth = eraserWidhtSlider.value;
    tool.lineWidth = eraserWidth;
})


eimg.addEventListener("click",(e)=>{
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
})
pimg.addEventListener("click",(e)=>{
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
})



//Download
let download = document.querySelector("#download");

download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();//state of the canvas in form of pixels data
    let a = document.createElement("a");//creating an element which will contain canvas as pixels
    a.href = url;
    a.download = "OpenBoard.jpg";
    a.click();
})


//Undo Redo

let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

undo.addEventListener("click",(e)=>{
    if(state>0){
        state--;
    }
    let img = new Image();//image reference object
    img.src = undoRedoHistory[state];
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
})

redo.addEventListener("click",(e)=>{
    if(state<undoRedoHistory.length-1){
        state++;
    }
    let img = new Image();//image reference object
    img.src = undoRedoHistory[state];
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
})