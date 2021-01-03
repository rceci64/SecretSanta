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

function openExam(){
    console.log("open exam");
    examElement = document.getElementById("examen");

    anime({
        targets: examElement,
        scale: 10,
        translateY: "-20%",
        begin: function (){
            examElement.style.display = "";
            examElement.insertAdjacentHTML('afterend', '<div class="surface" onclick="closeExam()" style="z-index: 99; background-color: gray; opacity: 0.5; position: absolute; width: 100%; height: 100%;"></div>');
            
        }

    });

}

function closeExam(){
    console.log("close exam");

    examElement = document.getElementById("examen");

    anime({
        targets: examElement,
        scale: 1,
        translateY: "20%",
        easing: 'easeInOutQuad',
        duration: 200,
        complete: function (){
            examElement.style.display = "none";
            document.querySelector(".surface").remove();
            
        }

    });

}

function loadQuestions(number) {
    console.log("loading questions");
    //document.getElementById("examQuestions").innerText = 
    let str = "";

    testsObj[number].forEach(function(elem, index){
        str += elem.question + "\n";
        elem.answers.forEach(function(answer, index){
            str += answer + "\n";
        });
        str += "\n";
    });

    document.getElementById("examQuestions").innerText = str;
}