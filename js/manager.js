/**
 * manager.js --> Scene and animation management
 * 
 */


function loadAnimations(){

    // Prova animació on clic
    animation = anime({
        targets: '.square',
        translateY: -50,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        duration: 150,
        autoplay: false
    }); 

    // Afegir animacions dels npcs
    var npcs = document.querySelectorAll(".npc");
    npcs.forEach(element => {
        //if(element.id == 'arbre'){
            // TO-DO: Animacions personalitzades per cada personatge si es vol
        //}
        let duration = randomInteger(300, 600);

        anime({
            targets: "#" + element.id,
            scaleY: [1, 1.04],
            direction: 'alternate',
            easing: 'easeInOutQuad',
            autoplay: true,
            duration: duration,
            loop: true
        });
    });
}


function nextScene(){
    var str = document.querySelector(".container.active").id;
    console.log("str ", str);
    var number = parseInt(str.slice(-1)) + 1;
    console.log("number ", number);
    loadScene("scene" + number);
}

function startGame(){
    playerName = document.getElementById("nameInput").value;
    loadScene("scene0");
}

function loadScene(id){
    
    // Check if the parametered ID is different from the one is active
    if (id != document.querySelector(".container.active").id){

        // When switching between scenes, hide dialoguebox
        hideDialogue()
        //document.getElementById("dialogueBox").style.display = "none";


        
        // Start timeline object
        var tl = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 800,
            complete: function(){
                if (stopSnowOnLoadNextScene) {
                    console.log("Toggled");
                }
            }
        });
        
        // Get elements
        var active = document.querySelector(".container.active");
        var hidden = document.querySelector("#" + id);
        
        // Append animation to timeline (complete atribute runs when animation ends)
        tl
        .add({
            targets: active,
            opacity: 0,
            complete: function(){
                active.className = "container";
                active.style.display = "none";
            }
        });
        
        tl
        .add({
            targets: hidden,
            opacity: 1,
            begin: function(){
                hidden.style.display = "";
            },
            complete: function(){
                hidden.className = "container active";
            }
        });


    }
}




function showDialogue(){
    let dialogueBox = document.getElementById("dialogueBox");

    anime({
        targets: dialogueBox,
        opacity: 1,
        begin: function(){
            dialogueBox.style.display = "inherit";
        }
    });
}

function hideDialogue(){
    let dialogueBox = document.getElementById("dialogueBox");

    anime({
        targets: dialogueBox,
        opacity: 0,
        complete: function(){
            dialogueBox.style.display = "none";
        }
    });
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}