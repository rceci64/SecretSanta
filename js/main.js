var idleAnimation;
var animation;
const reader = new FileReader();
const dialoguesPath = '../dialogues.json';

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

let optionOne = () => {};
let optionTwo = () => {};
let optionThree = () => {};
let optionFour = () => {};
let dialoguesObj;
let currentDialogue;
let currentText = 0;

let mainGame = (dialogues) => {
    dialoguesObj = dialogues;
    currentDialog = dialoguesObj[0];
    startDialog(currentDialog);
}

let startDialog = (dialogue) => {
    //Redundant a la primera crida del joc però més endavant serveix per poder repetir texts
    currentDialogue = dialogue;
    console.log(currentDialogue.texts[currentText]);
}

let nextText = () => {
    currentText += 1;
    console.log(currentDialogue.texts[currentText]);
}


window.onload = () => {

    loadJSON(dialoguesPath,
         function(data) { console.log(data); mainGame(data); },
         function(xhr) { console.error(xhr); }
    );
    //console.log(dialogsJson);
    //dialogsObj = JSON.parse(dialogsJson);

    //console.log(dialogsObj);
    //loadJSONRoger(dialoguesPath);

    // document.querySelector('#dialogbox').style.visibility = "hidden";
    // document.getElementById('boto').onclick = (ev) => {
    //     //console.log(ev);
    //     console.log('clic');
        
    //     if (document.querySelector('#dialogbox').style.visibility == 'hidden'){
    //         document.querySelector('#dialogbox').style.visibility = 'visible';

    //     } else {
    //         document.querySelector('#dialogbox').style.visibility = 'hidden';
    //     }

    //     console.log(ev.target);
    // }

    loadAnimations();
    loadDialogues();
};




  
     
  
  
  
