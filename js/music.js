var songs = {
    
    mainMusic: new Howl({
        src: ['../assets/sfx/examn.mpeg'],
        loop: true,
        volume: 1.0
    }),
    examnMusic: new Howl({
        src: ['../assets/sfx/examn.mpeg'],
        loop: true,
        volume: 1.0,
    }),
    winMusic: new Howl({
        src: ['../assets/sfx/win.mpeg', '../assets/sfx/lose.mpeg'],
        volume: 1.0,
    }),
    loseMusic: new Howl({
        src: ['../assets/sfx/fail.mpeg'],
        volume: 1.0,
    })
};

var changeVolume = (vol) => {
    Howler.volume(vol);
}

var changeSong = (nextSong) => {
    currentSong.fade(Howler.volume(), 0.0, 2000).on(
        "fade", () => {
                currentSong.stop();
                nextSong.play();
                nextSong.fade(0.0, Howler.volume(), 3000).on(
                    "fade", () => {
                        currentSong = nextSong;
                    }
                )
            }
        );
}

var mainMusic = songs['mainMusic'];
var examnMusic = songs['examnMusic'];
var winMusic = songs['winMusic'];
var loseMusic = songs['loseMusic'];

var lastSong = null;
var currentSong = loseMusic;

mainMusic.play();
changeVolume(0.1);
