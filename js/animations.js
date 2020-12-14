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

}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadScene(id){
    anime({
        targets: ".container.active",
        opacity: 0,
        easing: 'easeInOutQuad',
        autoplay: true,
        duration: 500,
        loop: false
    });
    anime({
        targets: "#" + id,
        opacity: 100,
        easing: 'easeInOutQuad',
        autoplay: true,
        duration: 500,
        loop: false,
        delay: 500
    });
    document.querySelector(".container.active").className = "container";
    document.querySelector("#" + id).className = "container active";
}