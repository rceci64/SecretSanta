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
            scaleY: [
                '104%',
                '100%',
            ],
            direction: 'alternate',
            easing: 'easeInOutQuad',
            autoplay: true,
            duration: duration,
            loop: true
        });
    });

    loadScene('scene0');

}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextScene(){
    var str = document.querySelector(".container.active").id;
    console.log("str ", str);
    var number = parseInt(str.slice(-1)) + 1;
    console.log("number ", number);
    loadScene("scene" + number);
}

function loadScene(id){

    if (id != document.querySelector(".container.active").id){

        var tl = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 800,
            complete: function(){
                if (stopSnowOnLoadNextScene) {
                    console.log("Toggled");
                }
            }
        });

        var active = document.querySelector(".container.active");
        var hidden = document.querySelector("#" + id);

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
            targets: "#" + id,
            opacity: 1,
            begin: function(){
                hidden.style.display = "";
            },
            complete: function(){
                hidden.className = "container active";
            }
        });

        document.getElementById("dialogueBox").style.display = "none";
    }
}