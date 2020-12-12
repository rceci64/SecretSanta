function loadDialogues(){

    // Assignar diàlegs dels npcs
    var npcs = document.querySelectorAll(".npc");
    npcs.forEach(element => {
        // Load all dialog lines and affinity for NPC


        element.addEventListener("click", function(){
            console.log(this.id, "talked");
            // Reproduce line of dialog

        });
        console.log("Loaded dialogues for", element.id);
    });
}