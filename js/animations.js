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
    
    // // Wrap every letter in a span
    // var textWrapper = document.querySelector('.ml10 .letters');
    // textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    
    // anime.timeline({loop: true})
    // .add({
    //     targets: '.ml10 .letter',
    //     translateY: ["1.1em", 0],
    //     translateZ: 0,
    //     duration: 750,
    //     delay: (el, i) => 50 * i
    // }).add({
    //     targets: '.ml10',
    //     opacity: 0,
    //     duration: 1000,
    //     easing: "easeOutExpo",
    //     delay: 1000
    // });
    
    //document.querySelector('.square').onclick = animation.restart;
    //document.querySelector('.mitjo').onclick = idleAnimation.restart;
    
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}