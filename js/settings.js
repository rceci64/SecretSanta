/**
 * manager.js --> Scene and animation management
 * 
 */


let toggleSettings = () => {
    if(document.querySelector('.settingsContainer').style.display == 'none'){
        document.querySelector('.settingsContainer').style.display = 'inherit';
        document.querySelector('#buttonsContainer').style.pointerEvents = 'none';
    } else {
        document.querySelector('.settingsContainer').style.display = 'none';
        document.querySelector('#buttonsContainer').style.pointerEvents = 'auto';
    }
}

let sliderChange = () => {
    let wantVoldocument = document.getElementById("volumeRange").value;
    document.getElementById("volumeLabel").innerHTML = "Volume (" + wantVoldocument + "%)";
    changeVolume(wantVoldocument/100);
}