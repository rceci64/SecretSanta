var idleAnimation;
var animation;


window.onload = () => {
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
    
    document.querySelector('.square').onclick = animation.restart;
    //document.querySelector('.mitjo').onclick = idleAnimation.restart;

};




  
     
  
  
  
