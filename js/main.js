console.log("lmao");

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



    var animation = anime({
        targets: '.square',
        translateY: -50,
        direction: 'alternate',
        easing: 'easeInOutSine',
        duration: 150,
        autoplay: false
    }); 
    
    document.querySelector('.square').onclick = animation.restart

};



  
     
  
  
  
