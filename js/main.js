var idleAnimation;
var animation;
var dialogElement;
const reader = new FileReader();
const dialoguesPath = 'dialogues.json';
const testsPath = 'tests.json';
let dialoguesObj;
let testsObj;
var currentDialogue;
let currentText = 0;
var stopSnowOnLoadNextScene = false;
var afinitat = {};
var playerName;

let startSnow = () => {
    snowStorm.flakesMax = 256;
    snowStorm.flakesMaxActive = 128;
    snowStorm.followMouse = false;
    snowStorm.freezeOnBlur = false; 
    snowStorm.vMaxX = 1;
    snowStorm.vMaxY = 1.5;
    snowStorm.targetElement = document.querySelector(".container.active");
    stopSnowOnLoadNextScene = true;
}

// Copied from https://stackoverflow.com/questions/9838812/how-can-i-open-a-json-file-in-javascript-without-jquery
let loadJSON = (path, success, error) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
};

// Shorter function, but not as debuggable
// async function loadJSONRoger (path) {
//     const responseRoger = await fetch(path)
//     const data = await responseRoger.text();
//     console.log('Dades Roger: ', data);
//     return (JSON.parse(data));
// };

// Called when a dialog option is selected
let option = (optionNumber) => {
    //console.log("Option clicked: ", optionNumber);
    console.log(currentDialogue.options[optionNumber].next.npc);
    if(currentDialogue.options[optionNumber].next.npc != "end" && currentDialogue.options[optionNumber].next.npc != "endScene"){

        console.log(currentDialogue.options[optionNumber].outcome.npc)
        // Sumar o restar al sistema d'afinitat
        //if(afinitat.)
        
        // Reproduir seguent linia de iàleg i actualitzar el botons
        console.log("Option activates next line of text");
        var currentNext = currentDialogue.options[optionNumber].next;
        console.log(currentNext);
        let nextItem = dialoguesObj[currentNext.npc][currentNext.id];
        currentDialogue = nextItem;
        document.getElementById("dialogueContent").innerText = currentDialogue.text;
        updateButtons(currentDialogue.options);


    } else if (currentDialogue.options[optionNumber].next.npc == "end") {
        console.log("Option ends the dialog");
        //document.getElementById("dialogueBox").style.display = "none";
        hideDialogue();
        currentDialogue = "ended";
    } else if(currentDialogue.options[optionNumber].next.npc == "endScene") {
        console.log("Option ends the dialog");
        //document.getElementById("dialogueBox").style.display = "none";
        hideDialogue();
        currentDialogue = "ended";
        nextScene();
    }

};


let mainGame = (dialogues) => {
    dialoguesObj = dialogues;
    loadScene('scene2');
    //currentDialogue = dialoguesObj["santa"]["001"];
    //document.getElementById("dialogueBox").style.display = "";
    // document.getElementById("dialogueContent").innerText = currentDialogue.text;
    // updateButtons(currentDialogue.options);
    
}

let updateButtons = (options) => {

    let text = "";
    options.forEach((element, index) => {
        text += `<button id="opcio${index}" onclick="option(${index})" class="optionButtons">${element.label}</button>`
    });
    document.getElementById("buttonsContainer").innerHTML = text;
};

window.onload = () => {

    
    loadJSON(dialoguesPath,
        function(data) { console.log(data); mainGame(data); },
        function(xhr) { console.error(xhr); }
    );

    // Load exam questions
    loadJSON(testsPath,
        function(data) { console.log(data);  testsObj = data},
        function(xhr) { console.error(xhr); }
    );

    document.getElementById("nameInput").value = "";
    hideDialogue();     // For some reason dialog is shown sometimes at start
    startSnow();
    loadAnimations();
    loadNPCListeners();
};

let loadNPCListeners = () => {
    
    var npcs = document.querySelectorAll(".npc");
    npcs.forEach(element => {
        element.addEventListener("click", function(){
            console.log(this.id, "talked");
            // Reproduce line of dialog
            startNPCDialog(this.id);

        });
    });
};


let startNPCDialog = (idNPC, scene) => {
    console.log(currentDialogue);
    if(currentDialogue == "ended" || document.getElementById("dialogueBox").style.display == "none"){
        currentDialogue = dialoguesObj[idNPC]["001"];
        //document.getElementById("dialogueBox").style.display = "inherit";
        document.getElementById("dialogueContent").innerText = currentDialogue.text;
        showDialogue();
        updateButtons(currentDialogue.options);
    }
};

let changeButtonState = (input) => {
    let element = document.getElementById("playButton");
    if(input.value.length > 0){
        element.style.opacity = 1;
        element.style.pointerEvents = "all";
        element.disabled = false;
    } else {
        element.style.opacity = 0.5;
        element.style.pointerEvents = "none";
        element.disabled = true;
    }
};






  
     
  
  
  
