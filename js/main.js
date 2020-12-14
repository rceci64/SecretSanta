var idleAnimation;
var animation;
const reader = new FileReader();
const dialoguesPath = '../dialogues.json';
let dialoguesObj;
var currentDialogue;
let currentText = 0;


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
    console.log("Option clicked: ", optionNumber);
    if(currentDialogue.options[optionNumber].next.npc != "end"){
        
        console.log("Option activates next line of text");
        var currentNext = currentDialogue.options[optionNumber].next;
        console.log(currentNext);
        let nextItem = dialoguesObj[currentNext.npc][currentNext.id];
        currentDialogue = nextItem;
        //console.log(currentDialogue);
        document.getElementById("dialogueContent").innerText = currentDialogue.text;
        updateButtons(currentDialogue.options);

        
    } else {
        console.log("Option ends the dialog");
        document.getElementById("dialogueBox").style.display = "none";
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

    loadAnimations();
    //loadDialogues();
};

// function loadDialogues(){
    
//     var npcs = document.querySelectorAll(".npc");
//     npcs.forEach(element => {
//         element.addEventListener("click", function(){
//             console.log(this.id, "talked");
//             // Reproduce line of dialogue
//             nextText(this.id);
//         });
//     });
// }







  
     
  
  
  
