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
    loadJSONRoger(dialoguesPath);

    document.querySelector('#dialogbox').style.visibility = "hidden";
    document.getElementById('boto').onclick = (ev) => {
        //console.log(ev);
        console.log('clic');
        
        if (document.querySelector('#dialogbox').style.visibility == 'hidden'){
            document.querySelector('#dialogbox').style.visibility = 'visible';

        } else {
            document.querySelector('#dialogbox').style.visibility = 'hidden';
        }

        console.log(ev.target);
    }

    animation = anime({
        targets: '.square',
        translateY: -50,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        duration: 150,
        autoplay: false
    }); 
    
    idleAnimation = anime({
        targets: '.mitjo',
        scaleY: [
            '104%',
            '100%',
        ],
        direction: 'alternate',
        easing: 'easeInOutQuad',
        autoplay: true,
        duration: 400,
        loop: true
    });


    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml10 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

   
    anime.timeline({loop: true})
        .add({
            targets: '.ml10 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 750,
            delay: (el, i) => 50 * i
        }).add({
            targets: '.ml10',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
    });
    
    document.querySelector('.square').onclick = animation.restart;
    //document.querySelector('.mitjo').onclick = idleAnimation.restart;

};




  
     
  
  
  
