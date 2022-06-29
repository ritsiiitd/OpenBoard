

//Toggle Menu and pencil eraser
let options = document.querySelector(".options");
let tools = document.querySelector(".tools");
let flag = false;//show tools
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pimg = document.querySelector(".tools #p");
let eimg = document.querySelector(".tools #e");
let pflag = true;
pencil.style.display="none";
let eflag = true;
eraser.style.display="none";

options.addEventListener("click",(e)=>{
    flag=!flag;
    if(flag){
        openTools();
    }
    else{
        closeTools();
    }
})

function openTools(){
    let iconEle = options.children[0];//... vala icon
    iconEle.classList.remove("fa-ellipsis-vertical")
    iconEle.classList.add("fa-xmark")
    tools.style.display="flex";
}
function closeTools(){
    let iconEle = options.children[0];//... vala icon
    iconEle.classList.remove("fa-xmark")
    iconEle.classList.add("fa-ellipsis-vertical")
    tools.style.display="none";
    pencil.style.display="none";
    eraser.style.display="none";
}

pimg.addEventListener("click",(e)=>{
    if(pflag){
        pencil.style.display="block";
    }
    else{
        pencil.style.display="none";
    }
    pflag=!pflag;
});

eimg.addEventListener("click",(e)=>{
    if(eflag){
        eraser.style.display="flex"
    }
    else{
        eraser.style.display="none"
    }
    eflag=!eflag;
})


//Sticky note
let sticky = document.querySelector("#sticky");

sticky.addEventListener("click",(e)=>{
    let sticky_note = document.createElement("div");
    sticky_note.setAttribute("class","sticky-note");
    sticky_note.innerHTML = `
    <div class="header">
        <div class="minimize"></div>
        <div class="close"></div>
    </div>
    <div class="writing-area">
        <textarea ></textarea>
    </div>
    `;


    document.body.appendChild(sticky_note);
    let minimize = sticky_note.querySelector(".minimize");
    let close = sticky_note.querySelector(".close");
    noteActions(sticky_note,minimize,close);

    sticky_note.onmousedown = function(event){
        dragDrop(sticky_note,event);
    };
      sticky_note.ondragstart = function() {
        return false;
    };
})

function noteActions(sticky_note,minimize,close){
    close.addEventListener("click",(e)=>{
        sticky_note.remove();
    })
      minimize.addEventListener("click",(e)=>{
        //text area display toggle karlo
        let textArea = sticky_note.querySelector(".writing-area")
        let display = getComputedStyle(textArea).getPropertyValue("display");
        if(display === "none"){
            textArea.style.display="block";
        }
        else{
            textArea.style.display="none";
        }
      });

      
}

function dragDrop(ele,event){
    //drag and drop functionality from : https://javascript.info/mouse-drag-and-drop
        let shiftX = event.clientX - ele.getBoundingClientRect().left;
        let shiftY = event.clientY - ele.getBoundingClientRect().top;
      
        ele.style.position = 'absolute';
        ele.style.zIndex = 1000;
      
        moveAt(event.pageX, event.pageY);
      
        // moves the sticky_note at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
          ele.style.left = pageX - shiftX + 'px';
          ele.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the sticky_note on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the sticky_note, remove unneeded handlers
        ele.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ele.onmouseup = null;
        };
}


//Upload image
let upload = document.querySelector("#upload");
upload.addEventListener("click",(e)=>{
    //next 3 lines opens file explorer
    let inputImg = document.createElement("input");
    inputImg.setAttribute("type", "file")
    inputImg.click();
    
    //select image
    inputImg.addEventListener("change",(e)=>{
        let file = inputImg.files[0];
        let url = URL.createObjectURL(file);
        
        let sticky_note = document.createElement("div");
        sticky_note.setAttribute("class","sticky-note");
        sticky_note.innerHTML = `
        <div class="header">
            <div class="minimize"></div>
            <div class="close"></div>
        </div>
        <div class="writing-area">
            <img src="${url}" />
        </div>
        `;


        document.body.appendChild(sticky_note);
        let minimize = sticky_note.querySelector(".minimize");
        let close = sticky_note.querySelector(".close");
        
        noteActions(sticky_note,minimize,close);

        sticky_note.onmousedown = function(event){
            dragDrop(sticky_note,event);
        };
        sticky_note.ondragstart = function() {
            return false;
        };
    })
})
