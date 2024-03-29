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
        hideDialogue();
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

function animateLetters(){
    var test = new Letterize({
        targets: "#dialogueContent"
    });

    test.listAll().forEach(function(currentValue){
        currentValue.style.opacity = 0;
    });

    //document.getElementById("dialogueContent").style.display = "inherit";
    document.getElementById("dialogueContent").style.opacity = 1;


    var tl = anime.timeline({
        targets: test.listAll(),
        delay: anime.stagger(50),
    });
  
    tl
    .add({
        opacity: 1,
        duration: 50,
    })
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openExam(){
    console.log("open exam");
    examElement = document.getElementById("examen");

    var tl = anime.timeline({
        easing: 'easeOutElastic',
        duration: 750
    });

    tl.add({
        targets: examElement,
        scale: 13,
        translateY: "-16%",
        begin: function (){
            examElement.style.display = "";
            examElement.insertAdjacentHTML('afterend', '<div class="surface" onclick="closeExam()" style="z-index: 99; background-color: gray; opacity: 0.5; position: absolute; width: 100%; height: 100%; pointer-events: all;"></div>');
            document.getElementById("nextPage").style.display = "inherit";
        }

    });

    tl.add({
        targets: "#examContent",
        opacity: 1
    });

}

function closeExam(){
    console.log("close exam");

    examElement = document.getElementById("examen");

    anime({
        targets: examElement,
        scale: 1,
        translateY: "16%",
        easing: 'easeInOutQuad',
        duration: 200,
        begin: function(){
            document.getElementById("examContent").style.opacity = 0;
            document.getElementById("nextPage").style.display = "none";
            document.getElementById("prevPage").style.display = "none";

        },
        complete: function (){
            examElement.style.display = "none";
            document.querySelector(".surface").remove();
        }
    });
}

/**
 * 
 * @param {*} number Numero d'examen (0, 1, 2)
 * @param {*} davant Si s'han de carregar les preguntes del davant o del darrere (true = davant, false = darrere)
 */
function loadQuestions(number, davant) {
    console.log("loading questions of number: ", number, " davant? ", davant);
    //document.getElementById("examQuestions").innerText = 
    let str = "";

    let min = davant ? 0 : 3;
    let max = davant ? 3 : 5;

    for (i = min; i < max; i++){
        str += testsObj[number][i].question + "\n";
        testsObj[number][i].answers.forEach(function(answer, index){
            str +=  String.fromCharCode(65 + index) + ")  " + answer + "\n";
        });
        str += "\n";
    }
    document.getElementById("examQuestions").innerText = str;

    console.log(testsObj);
}

function nextExamPage() { //Passem a la pàgina del darrere. Tal i com està pensat ara els exàmens son de 1 pàgina ( 1 per davant i per darrere )

    // Canviem la imatge activa per la imatge del darrere
    let arr = document.getElementById("examen").src.split('/');
    arr.pop();
    arr.push('examenDarrere.svg');
    let nStr = arr.join('/');
    document.getElementById("examen").src = nStr;

    loadQuestions(0, false);
}

function previousExamPage() {
    console.log("lmao1");
}
