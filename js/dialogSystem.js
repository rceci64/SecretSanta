function loadDialogues(){
    
    var npcs = document.querySelectorAll(".npc");
    npcs.forEach(element => {
        element.addEventListener("click", function(){
            console.log(this.id, "talked");
            // Reproduce line of dialog
            displayDialog(this.id);

        });
    });
}