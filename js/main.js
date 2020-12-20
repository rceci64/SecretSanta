var idleAnimation;
var animation;
var dialogElement;
const reader = new FileReader();
const dialoguesPath = '../dialogues.json';
let dialoguesObj;
var currentDialogue;
let currentText = 0;
var stopSnowOnLoadNextScene = false;
var afinitat = {};

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

async function loadJSONRoger (path) {
    const responseRoger = await fetch(path)
    const data = await responseRoger.text();
    console.log('Dades Roger: ', data);
};

var option = (optionNumber) => {
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
        document.getElementById("dialogueBox").style.display = "none";
        currentDialogue = "ended";
    } else if(currentDialogue.options[optionNumber].next.npc == "endScene") {
        console.log("Option ends the dialog");
        document.getElementById("dialogueBox").style.display = "none";
        currentDialogue = "ended";
        nextScene();
    }

};


let mainGame = (dialogues) => {
    dialoguesObj = dialogues;
    currentDialogue = dialoguesObj["santa"]["001"];
    document.getElementById("dialogueBox").style.display = "";
    document.getElementById("dialogueContent").innerText = currentDialogue.text;
    updateButtons(currentDialogue.options);
    
}

let updateButtons = (options) => {

    let text = "";
    options.forEach((element, index) => {
        text += `<button id="opcio${index}" onclick="option(${index})" class="optionButtons">${element.label}</button>`
    });
    document.getElementById("buttonsContainer").innerHTML = text;
};

// let startDialog = (dialogue) => {
//     //Redundant a la primera crida del joc però més endavant serveix per poder repetir texts
//     currentDialogue = dialogue;
//     console.log(currentDialogue.texts[currentText]);
// }

// let nextText = (npcId) => {
//     currentText += 1;
//     console.log(currentDialogue.texts[currentText]);
// }


window.onload = () => {

    
    loadJSON(dialoguesPath,
        function(data) { console.log(data); mainGame(data); },
        function(xhr) { console.error(xhr); }
    );
        
    startSnow();
    loadAnimations();
    loadNPCListeners();
};

var startNPCDialog = (idNPC, scene) => {
    console.log(currentDialogue);
<<<<<<< Updated upstream
    if(currentDialogue == "ended"){
        currentDialogue = dialoguesObj[idNPC]["001"];
        document.getElementById("dialogueBox").style.display = "";
=======
    if(currentDialogue == "ended" || document.getElementById("dialogueBox").style.display == "none"){
        currentDialogue = dialoguesObj[idNPC]["001"];
        document.getElementById("dialogueBox").style.display = "inherit";
>>>>>>> Stashed changes
        document.getElementById("dialogueContent").innerText = currentDialogue.text;
        updateButtons(currentDialogue.options);
    }
};







  
     
  
  
  
