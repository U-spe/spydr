const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600
const MAX_WIDTH = 1400
const MAX_HEIGHT = 600
let SCALE_MODE = 'SMOOTH'
var Phaser;
var level = 1;
var pageNo = 0;
var firstTime = true;
var bgmusic;
var isMuted = false;
var isMuted1 = false;
var i = 0;
var sno = 0;
var loadFinish = false
var soundMuted = false
var gameName = 'bffs-retro-time-travel-fashion';

var soundcheck = false
var soundstart = 0
var soundcheck1 = true

function pauseGame() {
    soundstart = 1


    game.scene.scenes[pageNo].scene.pause()
    if (soundcheck) {
        soundstart = 1
        if (!isMuted) {
            music.pause()
            soundmute.setFrame(1)
        }
        if (!isMuted1) {
            soundcheck1 = isMuted1
            isMuted1 = true
            clicksound.pause()
            clickmute.setFrame(1)
        }

    }
}

function resumeGame() {
    soundstart = 0
    game.scene.scenes[pageNo].scene.resume()
    if (soundcheck) {
        soundstart = 0
        if (!isMuted) {
            music.resume()
            soundmute.setFrame(0)
        } else {
            music.pause()
            soundmute.setFrame(1)
        }
        if (!soundcheck1) {
            soundcheck1 = true
            isMuted1 = false
            if (!isMuted1) {
                clicksound.resume()
                clickmute.setFrame(0)
            } else {
                clicksound.pause()
                clickmute.setFrame(1)
            }
        }
    }
}
WebFontConfig = {
    google: {
        families: ["Nunito:ExtraBold"]
    }
};
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
var bootstate = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function bootstate() {
        Phaser.Scene.call(this, {
            key: 'bootstate'
        });
    },
    preload: function () {
        pageNo = 0
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.load.crossOrigin = 'anonymous';
        this.load.image('loaderlogo', 'assets/loader/online-games-logo.png');
        this.load.image('lpbar', 'assets/loader/loaderprogress.png');
        this.load.image('bgloader', 'assets/loader/loaderbackground.png');
        this.load.image('loaderbarbg', 'assets/loader/loaderbarbg.png');
        this.load.image('loaderpad', 'assets/loader/loaderpad.png');
        this.load.image('loaderplay', 'assets/loader/play.png');
        this.load.image('loadermask', 'assets/loader/loadermask.png');
    },
    create: function () {
        loadFile()
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.scene.start('initialloader');
    }
});

function saveFile() {
    var file = {
        level: level,
        darr1: [darr1[0], darr1[1], darr1[2], darr1[3], darr1[4], darr1[5], darr1[6], darr1[7], darr1[8], darr1[9], darr1[10], darr1[11], darr1[12], darr1[13], darr1[14], darr1[15], darr1[16], darr1[17], darr1[18], darr1[19], darr1[20]],
        darr2: [darr2[0], darr2[1], darr2[2], darr2[3], darr2[4], darr2[5], darr2[6], darr2[7], darr2[8], darr2[9], darr2[10], darr2[11], darr2[12], darr2[13], darr2[14], darr2[15], darr2[16], darr2[17]],
        darr3: [darr3[0], darr3[1], darr3[2], darr3[3], darr3[4], darr3[5], darr3[6], darr3[7], darr3[8], darr3[9], darr3[10], darr3[11], darr3[12], darr3[13], darr3[14], darr3[15], darr3[16], darr3[17], darr3[18], darr3[19], darr3[20], darr3[21], darr3[22]],
        darr4: [darr4[0], darr4[1], darr4[2], darr4[3], darr4[4], darr4[5], darr4[6], darr4[7], darr4[8], darr4[9], darr4[10], darr4[11], darr4[12], darr4[13], darr4[14], darr4[15], darr4[16], darr4[17], darr4[18]],
    };
    localStorage.setItem('bffs-retro-time-travel-fashion', JSON.stringify(file));
};
var file;
var level;

function loadFile() {
    file = JSON.parse(localStorage.getItem('bffs-retro-time-travel-fashion'));
    if (file == null) {
        level = 1;
    } else {
        level = parseInt(file.level);
        darr1 = [file.darr1[0], file.darr1[1], file.darr1[2], file.darr1[3], file.darr1[4], file.darr1[5], file.darr1[6], file.darr1[7], file.darr1[8], file.darr1[9], file.darr1[10], file.darr1[11], file.darr1[12], file.darr1[13], file.darr1[14], file.darr1[15], file.darr1[16], file.darr1[17], file.darr1[18], file.darr1[19], file.darr1[20]]
        darr2 = [file.darr2[0], file.darr2[1], file.darr2[2], file.darr2[3], file.darr2[4], file.darr2[5], file.darr2[6], file.darr2[7], file.darr2[8], file.darr2[9], file.darr2[10], file.darr2[11], file.darr2[12], file.darr2[13], file.darr2[14], file.darr2[15], file.darr2[16], file.darr2[17]]
        darr3 = [file.darr3[0], file.darr3[1], file.darr3[2], file.darr3[3], file.darr3[4], file.darr3[5], file.darr3[6], file.darr3[7], file.darr3[8], file.darr3[9], file.darr3[10], file.darr3[11], file.darr3[12], file.darr3[13], file.darr3[14], file.darr3[15], file.darr3[16], file.darr3[17], file.darr3[18], file.darr3[19], file.darr3[20], file.darr3[21], file.darr3[22]]
        darr4 = [file.darr4[0], file.darr4[1], file.darr4[2], file.darr4[3], file.darr4[4], file.darr4[5], file.darr4[6], file.darr4[7], file.darr4[8], file.darr4[9], file.darr4[10], file.darr4[11], file.darr4[12], file.darr4[13], file.darr4[14], file.darr4[15], file.darr4[16], file.darr4[17], file.darr4[18]]
    }
};
var baseScale = 1;
var speed = 0.01;
var magnitude = 0.05;
var barvalue = [0]
var initialloader = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function initialloader() {
        Phaser.Scene.call(this, {
            key: 'initialloader'
        });
    },
    preload: function () {
        pageNo = 1
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        loade = this.add.image(0, 0, 'bgloader').setOrigin(0, 0)
        loaderbarbg = this.add.image(safeArea.x + 400.5, 416.5, 'loaderbarbg').setOrigin(0.5, 0.5)
        loaderlogo = this.add.image(safeArea.x + 403, 250, 'loaderlogo').setOrigin(0.5, 0.5)
        lpbar1 = this.add.sprite(safeArea.x + 10, 402.5, 'lpbar').setOrigin(0.5, 0.5)
        loadermask = this.add.sprite(safeArea.x + 403.5, 401, 'loadermask').setOrigin(0.5, 0.5).setVisible(false);
        mask = loadermask.createBitmapMask();
        mask.alpha = 1
        lpbar1.setMask(mask);
        barvalue1 = this.add.text(400 + safeArea.x, 430, barvalue[0] + '%', {
            font: '18px Nunito',
            color: '#fff'
        });
        barvalue1.setOrigin(0.5)
        barvalue1.x = 400 + safeArea.x
        loaderpad = this.add.image(safeArea.x + 399.5, 402.5, 'loaderpad').setOrigin(0.5, 0.5)
        loaderplay = this.add.image(safeArea.x + 399.5, 402.5, 'loaderplay').setOrigin(0.5, 0.5).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        })
        loaderpad.visible = false
        loaderplay.visible = false
        this.load.on('progress', function (value) {
            lpbar1.x = safeArea.x + parseInt(parseFloat(value / 1) * 400);
            barvalue[0] = parseInt(parseInt(parseFloat(value / 1) * 400) / 4)
            barvalue1.setText(barvalue[0] + '%')
        });
        this.load.on('complete', function () {
            loaderbarbg.visible = false
            lpbar1.visible = false
            barvalue1.visible = false
            if (pageNo == 1) {
                loaderpad.visible = true
                loaderplay.visible = true
                loaderplay.on('pointerover', function () {
                    loaderplay.setScale(1.05)
                }, this);
                loaderplay.on('pointerout', function () {
                    loaderplay.setScale(1)
                }, this);
                loaderplay.once('pointerdown', function () {
                    this.scene.scene.stop('initialloader')
                    game.scene.start('titlescreen');
                }, this);
            } else {
                loadFinish = true;
            }
        });
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            loaderlogo.x = safeArea.x + 403
            loadermask.x = safeArea.x + 399.5
            loaderbarbg.x = safeArea.x + 400.5
            loaderplay.x = safeArea.x + 399.5
            loaderpad.x = safeArea.x + 399.5
            loadermask.x = safeArea.x + 403.5
            barvalue1.x = 400 + safeArea.x
        })
        resize()
        //audio
        this.load.audio('boden', ['assets/audio/bmusic.mp3', 'assets/audio/bmusic.ogg']);

        this.load.audio('clickss', ['assets/audio/click.mp3', 'assets/audio/click.ogg']);
        this.load.audio('glitter', ['assets/audio/glitter.mp3', 'assets/audio/glitter.ogg']);
        this.load.audio('dollin', ['assets/audio/dollin.mp3', 'assets/audio/dollin.ogg']);
        this.load.audio('itemclick', ['assets/audio/itemclick.mp3', 'assets/audio/itemclick.ogg']);
        this.load.audio('unlockss', ['assets/audio/unlock.mp3', 'assets/audio/unlock.ogg']);
        this.load.audio('complete', ['assets/audio/complete.mp3', 'assets/audio/complete.ogg']);
        this.load.audio('setclick', ['assets/audio/setclick.mp3', 'assets/audio/setclick.ogg']);
        this.load.audio('bubble', ['assets/audio/bubble.mp3', 'assets/audio/bubble.ogg']);
        this.load.audio('timesound', ['assets/audio/timesound.mp3', 'assets/audio/timesound.ogg']);
        this.load.audio('yearsound', ['assets/audio/yearsound.mp3', 'assets/audio/yearsound.ogg']);
        //button
        this.load.spritesheet('play', 'assets/buttons/play.png', {
            frameWidth: 139,
            frameHeight: 146
        });
        this.load.spritesheet('save2', 'assets/buttons/save.png', {
            frameWidth: 139,
            frameHeight: 146
        });
        this.load.spritesheet('replay2', 'assets/buttons/replay.png', {
            frameWidth: 139,
            frameHeight: 146
        });
        this.load.spritesheet('done2', 'assets/buttons/done.png', {
            frameWidth: 140,
            frameHeight: 146
        });
        this.load.spritesheet('next2', 'assets/buttons/next.png', {
            frameWidth: 140,
            frameHeight: 146
        });
        this.load.image('settings', 'assets/buttons/settings.png');
        //titlescreen
        this.load.image('titlebackground', 'assets/titlescreen/background.jpg');
        //        doll1
        this.load.image('titlebody1', 'assets/titlescreen/doll1/body.png')
        this.load.spritesheet('titleeblink1', 'assets/titlescreen/doll1/eblink.png', {
            frameWidth: 126,
            frameHeight: 52
        });
        this.load.image('titlehair1', 'assets/titlescreen/doll1/hair.png')
        //        doll2
        this.load.image('titlebody2', 'assets/titlescreen/doll2/body.png')
        this.load.spritesheet('titleeblink2', 'assets/titlescreen/doll2/eblink.png', {
            frameWidth: 129,
            frameHeight: 61
        });
        this.load.image('titlehair2', 'assets/titlescreen/doll2/hair.png')
        //        doll3
        this.load.image('titlebody3', 'assets/titlescreen/doll3/body.png')
        this.load.spritesheet('titleeblink3', 'assets/titlescreen/doll3/eblink.png', {
            frameWidth: 125,
            frameHeight: 64
        });
        this.load.image('titlehair3', 'assets/titlescreen/doll3/hair.png')
        //        doll4
        this.load.image('titlebody4', 'assets/titlescreen/doll4/body.png')
        this.load.spritesheet('titleeblink4', 'assets/titlescreen/doll4/eblink.png', {
            frameWidth: 126,
            frameHeight: 47
        });
        this.load.image('titlehair4', 'assets/titlescreen/doll4/hair.png')
        //settings
        this.load.image('settingbackground', 'assets/setting/background.png')
        this.load.spritesheet('clickmute', 'assets/setting/clickmute.png', {
            frameWidth: 70,
            frameHeight: 66
        });
        this.load.spritesheet('soundmute', 'assets/setting/soundmute.png', {
            frameWidth: 69,
            frameHeight: 68
        });
        //storyline
        this.load.image('storylinebackground', 'assets/storyline/background.jpg');
        this.load.image('timemachine', 'assets/storyline/timemachine.png');
        this.load.image('light', 'assets/storyline/light.png');
        this.load.image('toplayer', 'assets/storyline/toplayer.png');
        this.load.image('clock', 'assets/storyline/clock.png');
        this.load.image('switchbox', 'assets/storyline/switchbox.png');
        this.load.spritesheet('switchon', 'assets/storyline/switch.png', {
            frameWidth: 174,
            frameHeight: 46
        });
        this.load.image('needlebase', 'assets/storyline/needlebase.png');
        this.load.image('needle', 'assets/storyline/needle.png');
        this.load.image('needletop', 'assets/storyline/needletop.png');
        this.load.image('hole', 'assets/storyline/hole.png');
        this.load.image('hole1', 'assets/storyline/hole1.png');
        this.load.spritesheet('light1', 'assets/storyline/light1.png', {
            frameWidth: 122,
            frameHeight: 359
        });
        this.load.spritesheet('timedoll', 'assets/storyline/timedoll.png', {
            frameWidth: 330,
            frameHeight: 732
        });
        this.load.image('yearno', 'assets/storyline/yearno.png');
        //levelselect
        this.load.image('levelselectbackground', 'assets/levelselect/background.jpg');
        this.load.spritesheet('handindication', 'assets/levelselect/handindication.png', {
            frameWidth: 102,
            frameHeight: 85
        });
        this.load.spritesheet('level1', 'assets/levelselect/level1.png', {
            frameWidth: 245,
            frameHeight: 264
        });
        this.load.spritesheet('level2', 'assets/levelselect/level2.png', {
            frameWidth: 245,
            frameHeight: 243
        });
        this.load.spritesheet('level3', 'assets/levelselect/level3.png', {
            frameWidth: 240,
            frameHeight: 277
        });
        this.load.spritesheet('level4', 'assets/levelselect/level4.png', {
            frameWidth: 241,
            frameHeight: 252
        });
        this.load.spritesheet('stargilter', 'assets/levelselect/stargilter.png', {
            frameWidth: 247,
            frameHeight: 251
        });
        //makeup1
        this.load.spritesheet('dressgliter', 'assets/level1/dressgliter.png', {
            frameWidth: 229,
            frameHeight: 560
        });
        this.load.spritesheet('dollgliter', 'assets/level1/dollgliter.png', {
            frameWidth: 283,
            frameHeight: 516
        });
        //level1
        this.load.image('level1background', 'assets/level1/background.jpg');
        this.load.image('level1panel', 'assets/level1/panel.png');
        this.load.spritesheet('level1dots1', 'assets/level1/dots1.png', {
            frameWidth: 57,
            frameHeight: 34
        });
        this.load.spritesheet('level1text', 'assets/level1/text.png', {
            frameWidth: 134,
            frameHeight: 70
        });
        this.load.spritesheet('level1lable', 'assets/level1/lable.png', {
            frameWidth: 227,
            frameHeight: 59
        });
        this.load.image('level1dress1', 'assets/level1/dress1.png');
        this.load.image('level1dress2', 'assets/level1/dress2.png');
        this.load.image('level1dress3', 'assets/level1/dress3.png');
        this.load.image('level1dress4', 'assets/level1/dress4.png');
        this.load.image('level1dress5', 'assets/level1/dress5.png');
        this.load.image('level1dress6', 'assets/level1/dress6.png');
        this.load.image('level1dress7', 'assets/level1/dress7.png');
        this.load.image('level1dress8', 'assets/level1/dress8.png');
        this.load.image('level1dress9', 'assets/level1/dress9.png');
        this.load.image('level1dress10', 'assets/level1/dress10.png');
        this.load.image('level1top1', 'assets/level1/top1.png');
        this.load.image('level1top2', 'assets/level1/top2.png');
        this.load.image('level1top3', 'assets/level1/top3.png');
        this.load.image('level1top4', 'assets/level1/top4.png');
        this.load.image('level1top5', 'assets/level1/top5.png');
        this.load.image('level1top6', 'assets/level1/top6.png');
        this.load.image('level1top7', 'assets/level1/top7.png');
        this.load.image('level1top8', 'assets/level1/top8.png');
        this.load.image('level1bottom1', 'assets/level1/bottom1.png');
        this.load.image('level1bottom2', 'assets/level1/bottom2.png');
        this.load.image('level1bottom3', 'assets/level1/bottom3.png');
        this.load.image('level1bottom4', 'assets/level1/bottom4.png');
        this.load.image('level1bottom5', 'assets/level1/bottom5.png');
        this.load.image('level1bottom6', 'assets/level1/bottom6.png');
        this.load.image('level1bottom7', 'assets/level1/bottom7.png');
        this.load.image('level1bottom8', 'assets/level1/bottom8.png');
        this.load.image('level1stock1', 'assets/level1/stock1.png');
        this.load.image('level1stock2', 'assets/level1/stock2.png');
        this.load.image('level1stock3', 'assets/level1/stock3.png');
        this.load.image('level1stock4', 'assets/level1/stock4.png');
        this.load.image('level1stock5', 'assets/level1/stock5.png');
        this.load.image('level1stock6', 'assets/level1/stock6.png');
        this.load.image('level1hair1', 'assets/level1/hair1.png');
        this.load.image('level1hair2', 'assets/level1/hair2.png');
        this.load.image('level1hair3', 'assets/level1/hair3.png');
        this.load.image('level1hair4', 'assets/level1/hair4.png');
        this.load.image('level1hair5', 'assets/level1/hair5.png');
        this.load.image('level1hair6', 'assets/level1/hair6.png');
        this.load.image('level1acc1', 'assets/level1/acc1.png');
        this.load.image('level1acc2', 'assets/level1/acc2.png');
        this.load.image('level1acc3', 'assets/level1/acc3.png');
        this.load.image('level1acc4', 'assets/level1/acc4.png');
        this.load.image('level1acc5', 'assets/level1/acc5.png');
        this.load.image('level1acc6', 'assets/level1/acc6.png');
        this.load.image('level1bag1', 'assets/level1/bag1.png');
        this.load.image('level1bag2', 'assets/level1/bag2.png');
        this.load.image('level1bag3', 'assets/level1/bag3.png');
        this.load.image('level1bag4', 'assets/level1/bag4.png');
        this.load.image('level1bag5', 'assets/level1/bag5.png');
        this.load.image('level1bag6', 'assets/level1/bag6.png');
        this.load.image('level1stud1', 'assets/level1/stud1.png');
        this.load.image('level1stud2', 'assets/level1/stud2.png');
        this.load.image('level1stud3', 'assets/level1/stud3.png');
        this.load.image('level1stud4', 'assets/level1/stud4.png');
        this.load.image('level1stud5', 'assets/level1/stud5.png');
        this.load.image('level1stud6', 'assets/level1/stud6.png');
        this.load.image('level1glass1', 'assets/level1/glass1.png');
        this.load.image('level1glass2', 'assets/level1/glass2.png');
        this.load.image('level1glass3', 'assets/level1/glass3.png');
        this.load.image('level1glass4', 'assets/level1/glass4.png');
        this.load.image('level1glass5', 'assets/level1/glass5.png');
        this.load.image('level1glass6', 'assets/level1/glass6.png');
        this.load.image('level1chain1', 'assets/level1/chain1.png');
        this.load.image('level1chain2', 'assets/level1/chain2.png');
        this.load.image('level1chain3', 'assets/level1/chain3.png');
        this.load.image('level1chain4', 'assets/level1/chain4.png');
        this.load.image('level1chain5', 'assets/level1/chain5.png');
        this.load.image('level1chain6', 'assets/level1/chain6.png');
        this.load.image('larrow', 'assets/level1/arrow.png');
        this.load.spritesheet('level1cat1', 'assets/level1/cat1.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.spritesheet('level1cat2', 'assets/level1/cat2.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.spritesheet('level1cat3', 'assets/level1/cat3.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.spritesheet('level1cat4', 'assets/level1/cat4.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.spritesheet('level1cat5', 'assets/level1/cat5.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.spritesheet('level1cat6', 'assets/level1/cat6.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.spritesheet('level1cat7', 'assets/level1/cat7.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.image('level2background', 'assets/level2/background.jpg');
        this.load.image('level2dress1', 'assets/level2/dress1.png');
        this.load.image('level2dress2', 'assets/level2/dress2.png');
        this.load.image('level2dress3', 'assets/level2/dress3.png');
        this.load.image('level2dress4', 'assets/level2/dress4.png');
        this.load.image('level2dress5', 'assets/level2/dress5.png');
        this.load.image('level2dress6', 'assets/level2/dress6.png');
        this.load.image('level2dress7', 'assets/level2/dress7.png');
        this.load.image('level2dress8', 'assets/level2/dress8.png');
        this.load.image('level2dress9', 'assets/level2/dress9.png');
        this.load.image('level2dress10', 'assets/level2/dress10.png');
        this.load.image('level2top1', 'assets/level2/top1.png');
        this.load.image('level2top2', 'assets/level2/top2.png');
        this.load.image('level2top3', 'assets/level2/top3.png');
        this.load.image('level2top4', 'assets/level2/top4.png');
        this.load.image('level2top5', 'assets/level2/top5.png');
        this.load.image('level2top6', 'assets/level2/top6.png');
        this.load.image('level2top7', 'assets/level2/top7.png');
        this.load.image('level2top8', 'assets/level2/top8.png');
        this.load.image('level2bottom1', 'assets/level2/bottom1.png');
        this.load.image('level2bottom2', 'assets/level2/bottom2.png');
        this.load.image('level2bottom3', 'assets/level2/bottom3.png');
        this.load.image('level2bottom4', 'assets/level2/bottom4.png');
        this.load.image('level2bottom5', 'assets/level2/bottom5.png');
        this.load.image('level2bottom6', 'assets/level2/bottom6.png');
        this.load.image('level2bottom7', 'assets/level2/bottom7.png');
        this.load.image('level2bottom8', 'assets/level2/bottom8.png');
        this.load.image('level2stock1', 'assets/level2/stock1.png');
        this.load.image('level2stock2', 'assets/level2/stock2.png');
        this.load.image('level2stock3', 'assets/level2/stock3.png');
        this.load.image('level2stock4', 'assets/level2/stock4.png');
        this.load.image('level2stock5', 'assets/level2/stock5.png');
        this.load.image('level2stock6', 'assets/level2/stock6.png');
        this.load.image('level2hair1', 'assets/level2/hair1.png');
        this.load.image('level2hair2', 'assets/level2/hair2.png');
        this.load.image('level2hair3', 'assets/level2/hair3.png');
        this.load.image('level2hair4', 'assets/level2/hair4.png');
        this.load.image('level2hair5', 'assets/level2/hair5.png');
        this.load.image('level2hair6', 'assets/level2/hair6.png');
        this.load.image('level2acc1', 'assets/level2/acc1.png');
        this.load.image('level2acc2', 'assets/level2/acc2.png');
        this.load.image('level2acc3', 'assets/level2/acc3.png');
        this.load.image('level2acc4', 'assets/level2/acc4.png');
        this.load.image('level2acc5', 'assets/level2/acc5.png');
        this.load.image('level2acc6', 'assets/level2/acc6.png');
        this.load.image('level2bag1', 'assets/level2/bag1.png');
        this.load.image('level2bag2', 'assets/level2/bag2.png');
        this.load.image('level2bag3', 'assets/level2/bag3.png');
        this.load.image('level2bag4', 'assets/level2/bag4.png');
        this.load.image('level2bag5', 'assets/level2/bag5.png');
        this.load.image('level2bag6', 'assets/level2/bag6.png');
        this.load.image('level2stud1', 'assets/level2/stud1.png');
        this.load.image('level2stud2', 'assets/level2/stud2.png');
        this.load.image('level2stud3', 'assets/level2/stud3.png');
        this.load.image('level2stud4', 'assets/level2/stud4.png');
        this.load.image('level2stud5', 'assets/level2/stud5.png');
        this.load.image('level2stud6', 'assets/level2/stud6.png');
        this.load.image('level2glass1', 'assets/level2/glass1.png');
        this.load.image('level2glass2', 'assets/level2/glass2.png');
        this.load.image('level2glass3', 'assets/level2/glass3.png');
        this.load.image('level2glass4', 'assets/level2/glass4.png');
        this.load.image('level2glass5', 'assets/level2/glass5.png');
        this.load.image('level2glass6', 'assets/level2/glass6.png');
        this.load.image('level2chain1', 'assets/level2/chain1.png');
        this.load.image('level2chain2', 'assets/level2/chain2.png');
        this.load.image('level2chain3', 'assets/level2/chain3.png');
        this.load.image('level2chain4', 'assets/level2/chain4.png');
        this.load.image('level2chain5', 'assets/level2/chain5.png');
        this.load.image('level2chain6', 'assets/level2/chain6.png');
        //level3
        this.load.image('level3background', 'assets/level3/background.jpg');
        this.load.image('level3dress1', 'assets/level3/dress1.png');
        this.load.image('level3dress2', 'assets/level3/dress2.png');
        this.load.image('level3dress3', 'assets/level3/dress3.png');
        this.load.image('level3dress4', 'assets/level3/dress4.png');
        this.load.image('level3dress5', 'assets/level3/dress5.png');
        this.load.image('level3dress6', 'assets/level3/dress6.png');
        this.load.image('level3dress7', 'assets/level3/dress7.png');
        this.load.image('level3dress8', 'assets/level3/dress8.png');
        this.load.image('level3dress9', 'assets/level3/dress9.png');
        this.load.image('level3dress10', 'assets/level3/dress10.png');
        this.load.image('level3top1', 'assets/level3/top1.png');
        this.load.image('level3top2', 'assets/level3/top2.png');
        this.load.image('level3top3', 'assets/level3/top3.png');
        this.load.image('level3top4', 'assets/level3/top4.png');
        this.load.image('level3top5', 'assets/level3/top5.png');
        this.load.image('level3top6', 'assets/level3/top6.png');
        this.load.image('level3top7', 'assets/level3/top7.png');
        this.load.image('level3top8', 'assets/level3/top8.png');
        this.load.image('level3bottom1', 'assets/level3/bottom1.png');
        this.load.image('level3bottom2', 'assets/level3/bottom2.png');
        this.load.image('level3bottom3', 'assets/level3/bottom3.png');
        this.load.image('level3bottom4', 'assets/level3/bottom4.png');
        this.load.image('level3bottom5', 'assets/level3/bottom5.png');
        this.load.image('level3bottom6', 'assets/level3/bottom6.png');
        this.load.image('level3bottom7', 'assets/level3/bottom7.png');
        this.load.image('level3bottom8', 'assets/level3/bottom8.png');
        this.load.image('level3stock1', 'assets/level3/stock1.png');
        this.load.image('level3stock2', 'assets/level3/stock2.png');
        this.load.image('level3stock3', 'assets/level3/stock3.png');
        this.load.image('level3stock4', 'assets/level3/stock4.png');
        this.load.image('level3stock5', 'assets/level3/stock5.png');
        this.load.image('level3stock6', 'assets/level3/stock6.png');
        this.load.image('level3hair1', 'assets/level3/hair1.png');
        this.load.image('level3hair2', 'assets/level3/hair2.png');
        this.load.image('level3hair3', 'assets/level3/hair3.png');
        this.load.image('level3hair4', 'assets/level3/hair4.png');
        this.load.image('level3hair5', 'assets/level3/hair5.png');
        this.load.image('level3hair6', 'assets/level3/hair6.png');
        this.load.image('level3acc1', 'assets/level3/acc1.png');
        this.load.image('level3acc2', 'assets/level3/acc2.png');
        this.load.image('level3acc3', 'assets/level3/acc3.png');
        this.load.image('level3acc4', 'assets/level3/acc4.png');
        this.load.image('level3acc5', 'assets/level3/acc5.png');
        this.load.image('level3acc6', 'assets/level3/acc6.png');
        this.load.image('level3bag1', 'assets/level3/bag1.png');
        this.load.image('level3bag2', 'assets/level3/bag2.png');
        this.load.image('level3bag3', 'assets/level3/bag3.png');
        this.load.image('level3bag4', 'assets/level3/bag4.png');
        this.load.image('level3bag5', 'assets/level3/bag5.png');
        this.load.image('level3bag6', 'assets/level3/bag6.png');
        this.load.image('level3stud1', 'assets/level3/stud1.png');
        this.load.image('level3stud2', 'assets/level3/stud2.png');
        this.load.image('level3stud3', 'assets/level3/stud3.png');
        this.load.image('level3stud4', 'assets/level3/stud4.png');
        this.load.image('level3stud5', 'assets/level3/stud5.png');
        this.load.image('level3stud6', 'assets/level3/stud6.png');
        this.load.image('level3glass1', 'assets/level3/glass1.png');
        this.load.image('level3glass2', 'assets/level3/glass2.png');
        this.load.image('level3glass3', 'assets/level3/glass3.png');
        this.load.image('level3glass4', 'assets/level3/glass4.png');
        this.load.image('level3glass5', 'assets/level3/glass5.png');
        this.load.image('level3glass6', 'assets/level3/glass6.png');
        this.load.image('level3chain1', 'assets/level3/chain1.png');
        this.load.image('level3chain2', 'assets/level3/chain2.png');
        this.load.image('level3chain3', 'assets/level3/chain3.png');
        this.load.image('level3chain4', 'assets/level3/chain4.png');
        this.load.image('level3chain5', 'assets/level3/chain5.png');
        this.load.image('level3chain6', 'assets/level3/chain6.png');
        //level4
        this.load.image('level4background', 'assets/level4/background.jpg');
        this.load.image('level4dress1', 'assets/level4/dress1.png');
        this.load.image('level4dress2', 'assets/level4/dress2.png');
        this.load.image('level4dress3', 'assets/level4/dress3.png');
        this.load.image('level4dress4', 'assets/level4/dress4.png');
        this.load.image('level4dress5', 'assets/level4/dress5.png');
        this.load.image('level4dress6', 'assets/level4/dress6.png');
        this.load.image('level4dress7', 'assets/level4/dress7.png');
        this.load.image('level4dress8', 'assets/level4/dress8.png');
        this.load.image('level4dress9', 'assets/level4/dress9.png');
        this.load.image('level4dress10', 'assets/level4/dress10.png');
        this.load.image('level4top1', 'assets/level4/top1.png');
        this.load.image('level4top2', 'assets/level4/top2.png');
        this.load.image('level4top3', 'assets/level4/top3.png');
        this.load.image('level4top4', 'assets/level4/top4.png');
        this.load.image('level4top5', 'assets/level4/top5.png');
        this.load.image('level4top6', 'assets/level4/top6.png');
        this.load.image('level4top7', 'assets/level4/top7.png');
        this.load.image('level4top8', 'assets/level4/top8.png');
        this.load.image('level4bottom1', 'assets/level4/bottom1.png');
        this.load.image('level4bottom2', 'assets/level4/bottom2.png');
        this.load.image('level4bottom3', 'assets/level4/bottom3.png');
        this.load.image('level4bottom4', 'assets/level4/bottom4.png');
        this.load.image('level4bottom5', 'assets/level4/bottom5.png');
        this.load.image('level4bottom6', 'assets/level4/bottom6.png');
        this.load.image('level4bottom7', 'assets/level4/bottom7.png');
        this.load.image('level4bottom8', 'assets/level4/bottom8.png');
        this.load.image('level4stock1', 'assets/level4/stock1.png');
        this.load.image('level4stock2', 'assets/level4/stock2.png');
        this.load.image('level4stock3', 'assets/level4/stock3.png');
        this.load.image('level4stock4', 'assets/level4/stock4.png');
        this.load.image('level4stock5', 'assets/level4/stock5.png');
        this.load.image('level4stock6', 'assets/level4/stock6.png');
        this.load.image('level4hair1', 'assets/level4/hair1.png');
        this.load.image('level4hair2', 'assets/level4/hair2.png');
        this.load.image('level4hair3', 'assets/level4/hair3.png');
        this.load.image('level4hair4', 'assets/level4/hair4.png');
        this.load.image('level4hair5', 'assets/level4/hair5.png');
        this.load.image('level4hair6', 'assets/level4/hair6.png');
        this.load.image('level4acc1', 'assets/level4/acc1.png');
        this.load.image('level4acc2', 'assets/level4/acc2.png');
        this.load.image('level4acc3', 'assets/level4/acc3.png');
        this.load.image('level4acc4', 'assets/level4/acc4.png');
        this.load.image('level4acc5', 'assets/level4/acc5.png');
        this.load.image('level4acc6', 'assets/level4/acc6.png');
        this.load.image('level4bag1', 'assets/level4/bag1.png');
        this.load.image('level4bag2', 'assets/level4/bag2.png');
        this.load.image('level4bag3', 'assets/level4/bag3.png');
        this.load.image('level4bag4', 'assets/level4/bag4.png');
        this.load.image('level4bag5', 'assets/level4/bag5.png');
        this.load.image('level4bag6', 'assets/level4/bag6.png');
        this.load.image('level4stud1', 'assets/level4/stud1.png');
        this.load.image('level4stud2', 'assets/level4/stud2.png');
        this.load.image('level4stud3', 'assets/level4/stud3.png');
        this.load.image('level4stud4', 'assets/level4/stud4.png');
        this.load.image('level4stud5', 'assets/level4/stud5.png');
        this.load.image('level4stud6', 'assets/level4/stud6.png');
        this.load.image('level4glass1', 'assets/level4/glass1.png');
        this.load.image('level4glass2', 'assets/level4/glass2.png');
        this.load.image('level4glass3', 'assets/level4/glass3.png');
        this.load.image('level4glass4', 'assets/level4/glass4.png');
        this.load.image('level4glass5', 'assets/level4/glass5.png');
        this.load.image('level4glass6', 'assets/level4/glass6.png');
        this.load.image('level4chain1', 'assets/level4/chain1.png');
        this.load.image('level4chain2', 'assets/level4/chain2.png');
        this.load.image('level4chain3', 'assets/level4/chain3.png');
        this.load.image('level4chain4', 'assets/level4/chain4.png');
        this.load.image('level4chain5', 'assets/level4/chain5.png');
        this.load.image('level4chain6', 'assets/level4/chain6.png');
        //doll1
        this.load.spritesheet('doll1bhair', 'assets/level1/doll/bhair.png', {
            frameWidth: 240,
            frameHeight: 244
        });
        this.load.spritesheet('doll1hand', 'assets/level1/doll/hand.png', {
            frameWidth: 79,
            frameHeight: 114
        });
        this.load.image('doll1body', 'assets/level1/doll/body.png');
        this.load.image('doll1head', 'assets/level1/doll/head.png');
        this.load.image('doll1eye', 'assets/level1/doll/eye.png');
        this.load.image('doll1eyetop', 'assets/level1/doll/eyetop.png');
        this.load.image('doll1ebrow', 'assets/level1/doll/ebrow.png');
        this.load.image('doll1hand1', 'assets/level1/doll/hand1.png');
        this.load.spritesheet('doll1eblink', 'assets/level1/doll/eblink.png', {
            frameWidth: 141,
            frameHeight: 60
        });
        this.load.spritesheet('doll1bottomshade', 'assets/level1/doll/bottomshade.png', {
            frameWidth: 164,
            frameHeight: 432
        });
        this.load.spritesheet('doll1topshade', 'assets/level1/doll/topshade.png', {
            frameWidth: 254,
            frameHeight: 216
        });
        this.load.spritesheet('doll1dressshade', 'assets/level1/doll/dressshade.png', {
            frameWidth: 234,
            frameHeight: 391
        });
        this.load.spritesheet('doll1stock', 'assets/level1/doll/stock.png', {
            frameWidth: 191,
            frameHeight: 403
        });
        this.load.spritesheet('doll1dress', 'assets/level1/doll/dress.png', {
            frameWidth: 283,
            frameHeight: 399
        });
        this.load.spritesheet('doll1hair', 'assets/level1/doll/hair.png', {
            frameWidth: 329,
            frameHeight: 279
        });
        this.load.spritesheet('doll1chain', 'assets/level1/doll/chain.png', {
            frameWidth: 107,
            frameHeight: 89
        });
        this.load.spritesheet('doll1stud', 'assets/level1/doll/stud.png', {
            frameWidth: 180,
            frameHeight: 73
        });
        this.load.spritesheet('doll1bag', 'assets/level1/doll/bag.png', {
            frameWidth: 153,
            frameHeight: 146
        });
        this.load.spritesheet('doll1acc', 'assets/level1/doll/acc.png', {
            frameWidth: 225,
            frameHeight: 151
        });
        this.load.spritesheet('doll1top', 'assets/level1/doll/top.png', {
            frameWidth: 238,
            frameHeight: 208
        });
        this.load.spritesheet('doll1bottom', 'assets/level1/doll/bottom.png', {
            frameWidth: 219,
            frameHeight: 407
        });
        this.load.spritesheet('doll1glass', 'assets/level1/doll/glass.png', {
            frameWidth: 147,
            frameHeight: 85
        });
        assetscall()

        function assetscall() {
            if (level == 2) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('doll2bhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 244,
                    frameHeight: 308
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dressshade', 'assets/level2/doll/dressshade.png', {
                    frameWidth: 225,
                    frameHeight: 481
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottomshade', 'assets/level2/doll/bottomshade.png', {
                    frameWidth: 148,
                    frameHeight: 398
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2topshade', 'assets/level2/doll/topshade.png', {
                    frameWidth: 248,
                    frameHeight: 227
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stock', 'assets/level2/doll/stock.png', {
                    frameWidth: 178,
                    frameHeight: 324
                });
                game.scene.scenes[pageNo].load.image('doll2body', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll2head', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll2eye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll2eyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll2ebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll2hand', 'assets/level2/doll/hand.png', {
                    frameWidth: 84,
                    frameHeight: 76
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2eblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 52
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dress', 'assets/level2/doll/dress.png', {
                    frameWidth: 255,
                    frameHeight: 470
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2hair', 'assets/level2/doll/hair.png', {
                    frameWidth: 190,
                    frameHeight: 293
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2chain', 'assets/level2/doll/chain.png', {
                    frameWidth: 78,
                    frameHeight: 73
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stud', 'assets/level2/doll/stud.png', {
                    frameWidth: 153,
                    frameHeight: 68
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2acc', 'assets/level2/doll/acc.png', {
                    frameWidth: 210,
                    frameHeight: 206
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2top', 'assets/level2/doll/top.png', {
                    frameWidth: 240,
                    frameHeight: 237
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottom', 'assets/level2/doll/bottom.png', {
                    frameWidth: 226,
                    frameHeight: 404
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bag', 'assets/level2/doll/bag.png', {
                    frameWidth: 129,
                    frameHeight: 142
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2glass', 'assets/level2/doll/glass.png', {
                    frameWidth: 143,
                    frameHeight: 78
                });
            } else if (level == 3) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('doll2bhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 244,
                    frameHeight: 308
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dressshade', 'assets/level2/doll/dressshade.png', {
                    frameWidth: 225,
                    frameHeight: 481
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottomshade', 'assets/level2/doll/bottomshade.png', {
                    frameWidth: 148,
                    frameHeight: 398
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2topshade', 'assets/level2/doll/topshade.png', {
                    frameWidth: 248,
                    frameHeight: 227
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stock', 'assets/level2/doll/stock.png', {
                    frameWidth: 178,
                    frameHeight: 324
                });
                game.scene.scenes[pageNo].load.image('doll2body', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll2head', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll2eye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll2eyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll2ebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll2hand', 'assets/level2/doll/hand.png', {
                    frameWidth: 84,
                    frameHeight: 76
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2eblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 52
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dress', 'assets/level2/doll/dress.png', {
                    frameWidth: 255,
                    frameHeight: 470
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2hair', 'assets/level2/doll/hair.png', {
                    frameWidth: 190,
                    frameHeight: 293
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2chain', 'assets/level2/doll/chain.png', {
                    frameWidth: 78,
                    frameHeight: 73
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stud', 'assets/level2/doll/stud.png', {
                    frameWidth: 153,
                    frameHeight: 68
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2acc', 'assets/level2/doll/acc.png', {
                    frameWidth: 210,
                    frameHeight: 206
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2top', 'assets/level2/doll/top.png', {
                    frameWidth: 240,
                    frameHeight: 237
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottom', 'assets/level2/doll/bottom.png', {
                    frameWidth: 226,
                    frameHeight: 404
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bag', 'assets/level2/doll/bag.png', {
                    frameWidth: 129,
                    frameHeight: 142
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2glass', 'assets/level2/doll/glass.png', {
                    frameWidth: 143,
                    frameHeight: 78
                });
                //doll3
                game.scene.scenes[pageNo].load.spritesheet('doll3bacc', 'assets/level3/doll/bacc.png', {
                    frameWidth: 198,
                    frameHeight: 61
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3hand', 'assets/level3/doll/hand.png', {
                    frameWidth: 77,
                    frameHeight: 102
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3stock', 'assets/level3/doll/stock.png', {
                    frameWidth: 165,
                    frameHeight: 344
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bhair', 'assets/level3/doll/bhair.png', {
                    frameWidth: 352,
                    frameHeight: 383
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3glass', 'assets/level3/doll/glass.png', {
                    frameWidth: 137,
                    frameHeight: 74
                });
                game.scene.scenes[pageNo].load.image('doll3body', 'assets/level3/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll3head', 'assets/level3/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll3eye', 'assets/level3/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll3eyetop', 'assets/level3/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll3ebrow', 'assets/level3/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll3eblink', 'assets/level3/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 51
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3dress', 'assets/level3/doll/dress.png', {
                    frameWidth: 255,
                    frameHeight: 534
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3hair', 'assets/level3/doll/hair.png', {
                    frameWidth: 286,
                    frameHeight: 218
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3chain', 'assets/level3/doll/chain.png', {
                    frameWidth: 74,
                    frameHeight: 76
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3stud', 'assets/level3/doll/stud.png', {
                    frameWidth: 159,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3topshade', 'assets/level3/doll/topshade.png', {
                    frameWidth: 205,
                    frameHeight: 241
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bottomshade', 'assets/level3/doll/bottomshade.png', {
                    frameWidth: 175,
                    frameHeight: 428
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3dressshade', 'assets/level3/doll/dressshade.png', {
                    frameWidth: 228,
                    frameHeight: 545
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bag', 'assets/level3/doll/bag.png', {
                    frameWidth: 127,
                    frameHeight: 194
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3acc', 'assets/level3/doll/acc.png', {
                    frameWidth: 218,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bottom', 'assets/level3/doll/bottom.png', {
                    frameWidth: 226,
                    frameHeight: 415
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3top', 'assets/level3/doll/top.png', {
                    frameWidth: 198,
                    frameHeight: 238
                });
            } else if (level == 4) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('doll2bhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 244,
                    frameHeight: 308
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dressshade', 'assets/level2/doll/dressshade.png', {
                    frameWidth: 225,
                    frameHeight: 481
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottomshade', 'assets/level2/doll/bottomshade.png', {
                    frameWidth: 148,
                    frameHeight: 398
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2topshade', 'assets/level2/doll/topshade.png', {
                    frameWidth: 248,
                    frameHeight: 227
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stock', 'assets/level2/doll/stock.png', {
                    frameWidth: 178,
                    frameHeight: 324
                });
                game.scene.scenes[pageNo].load.image('doll2body', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll2head', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll2eye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll2eyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll2ebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll2hand', 'assets/level2/doll/hand.png', {
                    frameWidth: 84,
                    frameHeight: 76
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2eblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 52
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dress', 'assets/level2/doll/dress.png', {
                    frameWidth: 255,
                    frameHeight: 470
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2hair', 'assets/level2/doll/hair.png', {
                    frameWidth: 190,
                    frameHeight: 293
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2chain', 'assets/level2/doll/chain.png', {
                    frameWidth: 78,
                    frameHeight: 73
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stud', 'assets/level2/doll/stud.png', {
                    frameWidth: 153,
                    frameHeight: 68
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2acc', 'assets/level2/doll/acc.png', {
                    frameWidth: 210,
                    frameHeight: 206
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2top', 'assets/level2/doll/top.png', {
                    frameWidth: 240,
                    frameHeight: 237
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottom', 'assets/level2/doll/bottom.png', {
                    frameWidth: 226,
                    frameHeight: 404
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bag', 'assets/level2/doll/bag.png', {
                    frameWidth: 129,
                    frameHeight: 142
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2glass', 'assets/level2/doll/glass.png', {
                    frameWidth: 143,
                    frameHeight: 78
                });
                //doll3
                game.scene.scenes[pageNo].load.spritesheet('doll3bacc', 'assets/level3/doll/bacc.png', {
                    frameWidth: 198,
                    frameHeight: 61
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3hand', 'assets/level3/doll/hand.png', {
                    frameWidth: 77,
                    frameHeight: 102
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3stock', 'assets/level3/doll/stock.png', {
                    frameWidth: 165,
                    frameHeight: 344
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bhair', 'assets/level3/doll/bhair.png', {
                    frameWidth: 352,
                    frameHeight: 383
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3glass', 'assets/level3/doll/glass.png', {
                    frameWidth: 137,
                    frameHeight: 74
                });
                game.scene.scenes[pageNo].load.image('doll3body', 'assets/level3/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll3head', 'assets/level3/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll3eye', 'assets/level3/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll3eyetop', 'assets/level3/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll3ebrow', 'assets/level3/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll3eblink', 'assets/level3/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 51
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3dress', 'assets/level3/doll/dress.png', {
                    frameWidth: 255,
                    frameHeight: 534
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3hair', 'assets/level3/doll/hair.png', {
                    frameWidth: 286,
                    frameHeight: 218
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3chain', 'assets/level3/doll/chain.png', {
                    frameWidth: 74,
                    frameHeight: 76
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3stud', 'assets/level3/doll/stud.png', {
                    frameWidth: 159,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3topshade', 'assets/level3/doll/topshade.png', {
                    frameWidth: 205,
                    frameHeight: 241
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bottomshade', 'assets/level3/doll/bottomshade.png', {
                    frameWidth: 175,
                    frameHeight: 428
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3dressshade', 'assets/level3/doll/dressshade.png', {
                    frameWidth: 228,
                    frameHeight: 545
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bag', 'assets/level3/doll/bag.png', {
                    frameWidth: 127,
                    frameHeight: 194
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3acc', 'assets/level3/doll/acc.png', {
                    frameWidth: 218,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bottom', 'assets/level3/doll/bottom.png', {
                    frameWidth: 226,
                    frameHeight: 415
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3top', 'assets/level3/doll/top.png', {
                    frameWidth: 198,
                    frameHeight: 238
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('doll4bhair', 'assets/level4/doll/bhair.png', {
                    frameWidth: 229,
                    frameHeight: 301
                });
                game.scene.scenes[pageNo].load.image('doll4body', 'assets/level4/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll4head', 'assets/level4/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll4eye', 'assets/level4/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll4eyetop', 'assets/level4/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll4ebrow', 'assets/level4/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll4eblink', 'assets/level4/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 51
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4dress', 'assets/level4/doll/dress.png', {
                    frameWidth: 237,
                    frameHeight: 439
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4hair', 'assets/level4/doll/hair.png', {
                    frameWidth: 223,
                    frameHeight: 285
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4chain', 'assets/level4/doll/chain.png', {
                    frameWidth: 88,
                    frameHeight: 75
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4stud', 'assets/level4/doll/stud.png', {
                    frameWidth: 166,
                    frameHeight: 69
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4top', 'assets/level4/doll/top.png', {
                    frameWidth: 192,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4topshade', 'assets/level4/doll/topshade.png', {
                    frameWidth: 236,
                    frameHeight: 237
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bottomshade', 'assets/level4/doll/bottomshade.png', {
                    frameWidth: 132,
                    frameHeight: 406
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4dressshade', 'assets/level4/doll/dressshade.png', {
                    frameWidth: 242,
                    frameHeight: 442
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4stock', 'assets/level4/doll/stock.png', {
                    frameWidth: 158,
                    frameHeight: 363
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4glass', 'assets/level4/doll/glass.png', {
                    frameWidth: 135,
                    frameHeight: 71
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bottom', 'assets/level4/doll/bottom.png', {
                    frameWidth: 215,
                    frameHeight: 397
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bag', 'assets/level4/doll/bag.png', {
                    frameWidth: 136,
                    frameHeight: 167
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4tophand', 'assets/level4/doll/tophand.png', {
                    frameWidth: 93,
                    frameHeight: 133
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4acc', 'assets/level4/doll/acc.png', {
                    frameWidth: 189,
                    frameHeight: 128
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bacc', 'assets/level4/doll/bacc.png', {
                    frameWidth: 194,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4hand', 'assets/level4/doll/hand.png', {
                    frameWidth: 94,
                    frameHeight: 101
                });
            } else if (level == 5) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('doll2bhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 244,
                    frameHeight: 308
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dressshade', 'assets/level2/doll/dressshade.png', {
                    frameWidth: 225,
                    frameHeight: 481
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottomshade', 'assets/level2/doll/bottomshade.png', {
                    frameWidth: 148,
                    frameHeight: 398
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2topshade', 'assets/level2/doll/topshade.png', {
                    frameWidth: 248,
                    frameHeight: 227
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stock', 'assets/level2/doll/stock.png', {
                    frameWidth: 178,
                    frameHeight: 324
                });
                game.scene.scenes[pageNo].load.image('doll2body', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll2head', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll2eye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll2eyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll2ebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll2hand', 'assets/level2/doll/hand.png', {
                    frameWidth: 84,
                    frameHeight: 76
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2eblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 52
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2dress', 'assets/level2/doll/dress.png', {
                    frameWidth: 255,
                    frameHeight: 470
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2hair', 'assets/level2/doll/hair.png', {
                    frameWidth: 190,
                    frameHeight: 293
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2chain', 'assets/level2/doll/chain.png', {
                    frameWidth: 78,
                    frameHeight: 73
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2stud', 'assets/level2/doll/stud.png', {
                    frameWidth: 153,
                    frameHeight: 68
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2acc', 'assets/level2/doll/acc.png', {
                    frameWidth: 210,
                    frameHeight: 206
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2top', 'assets/level2/doll/top.png', {
                    frameWidth: 240,
                    frameHeight: 237
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bottom', 'assets/level2/doll/bottom.png', {
                    frameWidth: 226,
                    frameHeight: 404
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2bag', 'assets/level2/doll/bag.png', {
                    frameWidth: 129,
                    frameHeight: 142
                });
                game.scene.scenes[pageNo].load.spritesheet('doll2glass', 'assets/level2/doll/glass.png', {
                    frameWidth: 143,
                    frameHeight: 78
                });
                //doll3
                game.scene.scenes[pageNo].load.spritesheet('doll3bacc', 'assets/level3/doll/bacc.png', {
                    frameWidth: 198,
                    frameHeight: 61
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3hand', 'assets/level3/doll/hand.png', {
                    frameWidth: 77,
                    frameHeight: 102
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3stock', 'assets/level3/doll/stock.png', {
                    frameWidth: 165,
                    frameHeight: 344
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bhair', 'assets/level3/doll/bhair.png', {
                    frameWidth: 352,
                    frameHeight: 383
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3glass', 'assets/level3/doll/glass.png', {
                    frameWidth: 137,
                    frameHeight: 74
                });
                game.scene.scenes[pageNo].load.image('doll3body', 'assets/level3/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll3head', 'assets/level3/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll3eye', 'assets/level3/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll3eyetop', 'assets/level3/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll3ebrow', 'assets/level3/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll3eblink', 'assets/level3/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 51
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3dress', 'assets/level3/doll/dress.png', {
                    frameWidth: 255,
                    frameHeight: 534
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3hair', 'assets/level3/doll/hair.png', {
                    frameWidth: 286,
                    frameHeight: 218
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3chain', 'assets/level3/doll/chain.png', {
                    frameWidth: 74,
                    frameHeight: 76
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3stud', 'assets/level3/doll/stud.png', {
                    frameWidth: 159,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3topshade', 'assets/level3/doll/topshade.png', {
                    frameWidth: 205,
                    frameHeight: 241
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bottomshade', 'assets/level3/doll/bottomshade.png', {
                    frameWidth: 175,
                    frameHeight: 428
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3dressshade', 'assets/level3/doll/dressshade.png', {
                    frameWidth: 228,
                    frameHeight: 545
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bag', 'assets/level3/doll/bag.png', {
                    frameWidth: 127,
                    frameHeight: 194
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3acc', 'assets/level3/doll/acc.png', {
                    frameWidth: 218,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3bottom', 'assets/level3/doll/bottom.png', {
                    frameWidth: 226,
                    frameHeight: 415
                });
                game.scene.scenes[pageNo].load.spritesheet('doll3top', 'assets/level3/doll/top.png', {
                    frameWidth: 198,
                    frameHeight: 238
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('doll4bhair', 'assets/level4/doll/bhair.png', {
                    frameWidth: 229,
                    frameHeight: 301
                });
                game.scene.scenes[pageNo].load.image('doll4body', 'assets/level4/doll/body.png');
                game.scene.scenes[pageNo].load.image('doll4head', 'assets/level4/doll/head.png');
                game.scene.scenes[pageNo].load.image('doll4eye', 'assets/level4/doll/eye.png');
                game.scene.scenes[pageNo].load.image('doll4eyetop', 'assets/level4/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('doll4ebrow', 'assets/level4/doll/ebrow.png');
                game.scene.scenes[pageNo].load.spritesheet('doll4eblink', 'assets/level4/doll/eblink.png', {
                    frameWidth: 129,
                    frameHeight: 51
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4dress', 'assets/level4/doll/dress.png', {
                    frameWidth: 237,
                    frameHeight: 439
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4hair', 'assets/level4/doll/hair.png', {
                    frameWidth: 223,
                    frameHeight: 285
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4chain', 'assets/level4/doll/chain.png', {
                    frameWidth: 88,
                    frameHeight: 75
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4stud', 'assets/level4/doll/stud.png', {
                    frameWidth: 166,
                    frameHeight: 69
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4top', 'assets/level4/doll/top.png', {
                    frameWidth: 192,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4topshade', 'assets/level4/doll/topshade.png', {
                    frameWidth: 236,
                    frameHeight: 237
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bottomshade', 'assets/level4/doll/bottomshade.png', {
                    frameWidth: 132,
                    frameHeight: 406
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4dressshade', 'assets/level4/doll/dressshade.png', {
                    frameWidth: 242,
                    frameHeight: 442
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4stock', 'assets/level4/doll/stock.png', {
                    frameWidth: 158,
                    frameHeight: 363
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4glass', 'assets/level4/doll/glass.png', {
                    frameWidth: 135,
                    frameHeight: 71
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bottom', 'assets/level4/doll/bottom.png', {
                    frameWidth: 215,
                    frameHeight: 397
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bag', 'assets/level4/doll/bag.png', {
                    frameWidth: 136,
                    frameHeight: 167
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4tophand', 'assets/level4/doll/tophand.png', {
                    frameWidth: 93,
                    frameHeight: 133
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4acc', 'assets/level4/doll/acc.png', {
                    frameWidth: 189,
                    frameHeight: 128
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4bacc', 'assets/level4/doll/bacc.png', {
                    frameWidth: 194,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('doll4hand', 'assets/level4/doll/hand.png', {
                    frameWidth: 94,
                    frameHeight: 101
                });

                //endbackground
                game.scene.scenes[pageNo].load.image('endbackground', 'assets/endscreen/background.jpg');
                game.scene.scenes[pageNo].load.image('endbackground1', 'assets/endscreen/background1.jpg');
                game.scene.scenes[pageNo].load.image('endbackground2', 'assets/endscreen/background2.jpg');
                game.scene.scenes[pageNo].load.image('endbackground3', 'assets/endscreen/background3.jpg');
            }
        }
        this.load.setPath('assets/titlescreen');
        this.load.spine('title', 'title-animation.json', 'title-animation.atlas');
        this.load.setPath('assets/titlescreen/transition');
        //transition
        this.load.setPath('assets/titlescreen/transition');
        this.load.spine('trans', 'obj1.json', 'obj1.atlas');
        this.load.start();
    },
    update: function () {
        loaderplay.setScale(
            baseScale + magnitude * Math.sin(this.time.now * speed),
            baseScale + magnitude * Math.cos(this.time.now * speed)
        );
    }
});
var dollIn = false
var settingval = false
var startgame2 = false
var lcount = 0
var lcount1 = 0
var lcount2 = 0
var lcount3 = 0
var lcount4 = 0
var lcount5 = 0
var lcount6 = 0
var lcount7 = 0
var lcount8 = 0
var levelfinish = false
var darr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var esarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var adcountstart1 = 0
var adcountstart2 = 0
var adcountstart3 = 0
var adcountstart4 = 0
var titlescreen = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function titlescreen() {
        Phaser.Scene.call(this, {
            key: 'titlescreen'
        });
    },
    preload: function () {
        pageNo = 2
        loadFinish = false
        startgame2 = false
        dollIn = false
        settingval = false
        levelfinish = false
        lcount = 0
        lcount1 = 0
        lcount2 = 0
        lcount3 = 0
        lcount4 = 0
        lcount5 = 0
        lcount6 = 0
        lcount7 = 0
        lcount8 = 0
        soundcheck = true
        marr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        esarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        adcountstart1 = 0
        adcountstart2 = 0
        adcountstart3 = 0
        adcountstart4 = 0
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        titlebackground = this.add.image(0, 0, 'titlebackground').setOrigin(0, 0)
        titlebackground.x = safeArea.x - 300
        titlebody1 = this.add.image(19, 91, 'titlebody1').setOrigin(0, 0)
        titleeblink1 = this.add.image(69, 159, 'titleeblink1').setOrigin(0, 0)
        titlehair1 = this.add.image(10, 58, 'titlehair1').setOrigin(0, 0)
        titledollgroup1 = this.add.container()
        titledollgroup1.add(titlebody1)
        titledollgroup1.add(titleeblink1)
        titledollgroup1.add(titlehair1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: titledollgroup1animation11,
            callbackScope: this
        })

        function titledollgroup1animation11() {
            titleeblink1.setFrame(esarr[0] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: titledollgroup1animation12,
                callbackScope: this
            })
        }

        function titledollgroup1animation12() {
            titleeblink1.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 4000,
                callback: titledollgroup1animation11,
                callbackScope: this
            })
        }
        titlebody2 = this.add.image(215, 96, 'titlebody2').setOrigin(0, 0)
        titleeblink2 = this.add.image(257, 148, 'titleeblink2').setOrigin(0, 0)
        titlehair2 = this.add.image(168, 70, 'titlehair2').setOrigin(0, 0)
        titledollgroup2 = this.add.container()
        titledollgroup2.add(titlebody2)
        titledollgroup2.add(titleeblink2)
        titledollgroup2.add(titlehair2)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: titledollgroup2animation11,
            callbackScope: this
        })

        function titledollgroup2animation11() {
            titleeblink2.setFrame(esarr[1] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: titledollgroup2animation12,
                callbackScope: this
            })
        }

        function titledollgroup2animation12() {
            titleeblink2.setFrame(esarr[1])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 3000,
                callback: titledollgroup2animation11,
                callbackScope: this
            })
        }
        titlebody3 = this.add.image(16, 106, 'titlebody3').setOrigin(0, 0)
        titleeblink3 = this.add.image(65, 154, 'titleeblink3').setOrigin(0, 0)
        titlehair3 = this.add.image(4, 70, 'titlehair3').setOrigin(0, 0)
        titledollgroup3 = this.add.container()
        titledollgroup3.add(titlebody3)
        titledollgroup3.add(titleeblink3)
        titledollgroup3.add(titlehair3)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: titledollgroup3animation11,
            callbackScope: this
        })

        function titledollgroup3animation11() {
            titleeblink3.setFrame(esarr[2] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: titledollgroup3animation12,
                callbackScope: this
            })
        }

        function titledollgroup3animation12() {
            titleeblink3.setFrame(esarr[2])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 4000,
                callback: titledollgroup3animation11,
                callbackScope: this
            })
        }
        titlebody4 = this.add.image(232, 97, 'titlebody4').setOrigin(0, 0)
        titleeblink4 = this.add.image(277, 158, 'titleeblink4').setOrigin(0, 0)
        titlehair4 = this.add.image(189, 67, 'titlehair4').setOrigin(0, 0)
        titledollgroup4 = this.add.container()
        titledollgroup4.add(titlebody4)
        titledollgroup4.add(titleeblink4)
        titledollgroup4.add(titlehair4)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: titledollgroup4animation11,
            callbackScope: this
        })

        function titledollgroup4animation11() {
            titleeblink4.setFrame(esarr[2] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: titledollgroup4animation12,
                callbackScope: this
            })
        }

        function titledollgroup4animation12() {
            titleeblink4.setFrame(esarr[2])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 3000,
                callback: titledollgroup4animation11,
                callbackScope: this
            })
        }
        titledollcontainer1 = this.add.container()
        titledollcontainer1.add(titledollgroup1)
        titledollcontainer1.add(titledollgroup2)
        titledollcontainer1.add(titledollgroup3)
        titledollcontainer1.add(titledollgroup4)
        titledollgroup1.visible = false
        titledollgroup2.visible = false
        titledollgroup3.visible = false
        titledollgroup4.visible = false
        titledollcontainer1.x = -1200
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 1500,
            callback: titledollanimation1,
            callbackScope: this
        })

        function titledollanimation1() {
            titledollgroup1.visible = true
            titledollgroup2.visible = true
            titledollgroup3.visible = false
            titledollgroup4.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: titledollcontainer1,
                x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                ease: 'Back.easeOut',
                duration: 600,
                onComplete: titledollanimation2,
                callbackScope: this
            });
        }

        function titledollanimation2() {
            titledollcontainer1.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            game.scene.scenes[pageNo].tweens.add({
                targets: titledollcontainer1,
                x: -1200,
                ease: 'Back.easeIn',
                duration: 600,
                delay: 2000,
                onComplete: titledollanimation3,
                callbackScope: this
            });
        }
        //
        function titledollanimation3() {
            titledollgroup1.visible = false
            titledollgroup2.visible = false
            titledollgroup3.visible = true
            titledollgroup4.visible = true
            game.scene.scenes[pageNo].tweens.add({
                targets: titledollcontainer1,
                x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                ease: 'Back.easeOut',
                duration: 600,
                onComplete: titledollanimation4,
                callbackScope: this
            });
        }

        function titledollanimation4() {
            titledollcontainer1.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            game.scene.scenes[pageNo].tweens.add({
                targets: titledollcontainer1,
                x: -1200,
                ease: 'Back.easeIn',
                duration: 600,
                delay: 2000,
                onComplete: titledollanimation1,
                callbackScope: this
            });
        }
        title = game.scene.scenes[pageNo].add.spine(400, 80, 'title', 'in', false)
        title.state.addListener({
            event: function (entry, event) {
                if (event.stringValue == 'in') {
                    title.setMix('in', 'loop', 2)
                    title.play('loop', true, true)
                    game.scene.scenes[pageNo].tweens.add({
                        targets: play,
                        scale: 1,
                        ease: 'Back.Out',
                        duration: 700,
                    });
                    play.visible = true
                    play.setScale(0)
                    game.scene.scenes[pageNo].tweens.add({
                        targets: play,
                        scaleX: 1,
                        scaleY: 1,
                        ease: 'Linear',
                        duration: 600,
                    });
                }
            }
        })
        titlegrp = this.add.container()
        titlegrp.add(title)
        play = this.add.sprite(585, 480, 'play').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'play',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('play', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        play.anims.load('play')
        play.visible = false
        this.load.on('complete', function () {
            loadFinish = true;
        });
        titlegrp.add(play)
        titlegrp.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        logomutefun()
        this.load.start();
        if (firstTime) {
            firstTime = false;
            music = this.sound.add('boden');
            music.play({
                loop: true
            });
            titlescreenstart()
        } else {
            transitionOut()
        }
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            titlebackground.x = safeArea.x - 300
            titlegrp.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            if (!startgame2) {
                titledollcontainer1.x = (((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            }
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function titlescreenstart() {
    play.on('pointerover', playoverstart)
    play.on('pointerout', playoutstart)
    play.on('pointerdown', playdownstart)
    play.on('pointerup', playupstart)

    function playoverstart() {
        play.anims.play('play')
    }

    function playoutstart() {
        play.anims.stop('play')
    }

    function playdownstart() {
        if (!startgame2 && loadFinish) {

            startgame2 = true
            playsoundeffects('clickss')
            play.anims.stop('play')
            play.setFrame(10)
            transitionIn()
        }
    }

    function playupstart() {}
}

function transitionIn() {
    trans = game.scene.scenes[pageNo].add.spine(400, 300, 'trans', 'in', false);
    trans.x = safeArea.x + 400
    dollIn = true
    trans.setInteractive()
    trans.state.addListener({
        event: function (entry, event) {
            if (event.stringValue == "in") {
                if (pageNo == 2) {
                    game.scene.scenes[pageNo].scene.stop('titlescreen')
                    game.scene.run('levelselect');
                } else if (pageNo == 4) {
                    game.scene.scenes[pageNo].scene.stop('levelselect');
                    game.scene.run('storyline');
                } else if (pageNo == 3 && lcount == 1) {
                    game.scene.scenes[pageNo].scene.stop('storyline')
                    game.scene.run('level1');
                } else if (pageNo == 5) {
                    game.scene.scenes[pageNo].scene.stop('level1')
                    game.scene.run('levelselect');
                } else if (pageNo == 3 && lcount == 2) {
                    game.scene.scenes[pageNo].scene.stop('storyline')
                    game.scene.run('level2');
                } else if (pageNo == 6) {
                    game.scene.scenes[pageNo].scene.stop('level2')
                    game.scene.run('levelselect');
                } else if (pageNo == 3 && lcount == 3) {
                    game.scene.scenes[pageNo].scene.stop('storyline')
                    game.scene.run('level3');
                } else if (pageNo == 7) {
                    game.scene.scenes[pageNo].scene.stop('level3')
                    game.scene.run('levelselect');
                } else if (pageNo == 3 && lcount == 4) {
                    game.scene.scenes[pageNo].scene.stop('storyline')
                    game.scene.run('level4');
                } else if (pageNo == 8) {
                    game.scene.scenes[pageNo].scene.stop('level4')
                    game.scene.run('endscreen');
                } else if (pageNo == 9) {
                    game.scene.scenes[pageNo].scene.stop('thumb')
                    game.scene.run('endscreen');
                } else if (pageNo == 10) {
                    game.scene.scenes[pageNo].scene.stop('endscreen')
                    game.scene.run('levelselect');
                }
            }
        }
    }, this);
}

function transitionOut() {
    trans = game.scene.scenes[pageNo].add.spine(400, 300, 'trans', 'out', false);
    trans.x = safeArea.x + 400
    trans.setInteractive()
    trans.state.addListener({
        event: function (entry, event) {
            if (event.stringValue == "out") {
                trans.disableInteractive()
                if (pageNo == 2) {
                    titlescreenstart()
                } else if (pageNo == 3) {
                    storylinestart()
                } else if (pageNo == 4) {
                    levelselectstart()
                } else if (pageNo == 5) {
                    level1start()
                } else if (pageNo == 6) {
                    level2start()
                } else if (pageNo == 7) {
                    level3start()
                } else if (pageNo == 8) {
                    level4start()
                } else if (pageNo == 9) {
                    thumbstart()
                } else if (pageNo == 10) {
                    endscreenstart()
                }
            }
        }
    }, this);
}

function logomutefun() {
    clickmute = game.scene.scenes[pageNo].add.image(game.context.drawingBufferWidth - 122.25, 9.9, 'clickmute').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    clickmute.x += parseFloat(clickmute.width / 2)
    clickmute.y += parseFloat(clickmute.height / 2)
    soundmute = game.scene.scenes[pageNo].add.image(game.context.drawingBufferWidth - 62.25, 9.9, 'soundmute').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    soundmute.x += parseFloat(soundmute.width / 2)
    soundmute.y += parseFloat(soundmute.height / 2)
    clickmute.x = game.context.drawingBufferWidth - 102.25
    soundmute.x = game.context.drawingBufferWidth - 42.25

    function logo2overstart() {
        this.setScale(1.05)
    }

    function logo2outstart() {
        this.setScale(1)
    }
    soundmute.on('pointerover', logo2overstart)
    soundmute.on('pointerout', logo2outstart)
    soundmute.on('pointerdown', soundmutedownstart)
    soundmute.on('pointerup', soundmuteupstart)

    function soundmutedownstart() {
        playsoundeffects('itemclick')
        this.setScale(1)
        if (!isMuted) {
            isMuted = true;
            soundmute.setFrame(1)
            music.pause();
        } else {
            isMuted = false;
            soundmute.setFrame(0)
            music.resume();
        }
    }

    function soundmuteupstart(ev) {
        if (isMuted) {
            soundmute.setFrame(1)
        } else {
            soundmute.setFrame(0)
        }
    }
    clickmute.on('pointerover', logo2overstart)
    clickmute.on('pointerout', logo2outstart)
    clickmute.on('pointerdown', clickmutedownstart)
    clickmute.on('pointerup', clickmuteupstart)

    function clickmutedownstart() {
        playsoundeffects('itemclick')
        this.setScale(1)
        if (!isMuted1) {
            isMuted1 = true;
            clickmute.setFrame(1)
        } else {
            isMuted1 = false;
            clickmute.setFrame(0)
        }
    }

    function clickmuteupstart(ev) {
        if (isMuted1) {
            clickmute.setFrame(1)
        } else {
            clickmute.setFrame(0)
        }
    }
    if (isMuted) {
        soundmute.setFrame(1)
    }
    if (isMuted1) {
        clickmute.setFrame(1)
    }
}

function playsoundeffects(clkssed) {
    if (soundstart == 0) {
        if (!isMuted1) {
            clicksound = game.scene.scenes[pageNo].sound.add(clkssed);
            clicksound.play();
            if (clkssed == 'camerasound') {
                clicksound.setVolume(0.3);
            }
        }
    }
}
var startgame3 = false
var levelselect = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function levelselect() {
        Phaser.Scene.call(this, {
            key: 'levelselect'
        });
    },
    preload: function () {
        startgame4 = false
        pageNo = 4
        dollIn = true
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        levelselectbackground = this.add.sprite(0, 0, 'levelselectbackground').setOrigin(0, 0)
        levelselectbackground.x = safeArea.x - 300
        var levelaxrr = [, 82, 465, 86, 468]
        var levelayrr = [, 46, 71, 297, 322]
        for (i = 1; i <= 4; i++) {
            game['level' + i] = this.add.sprite(levelaxrr[i], levelayrr[i], 'level' + i).setOrigin(0.5, 0.5)
            game['level' + i].x += parseFloat(game['level' + i].width / 2)
            game['level' + i].y += parseFloat(game['level' + i].height / 2)
        }
        if (level > 1) {
            for (i = 1; i < level; i++) {
                game['level' + i].setFrame(1)
            }
        }
        stargilter = this.add.sprite(game['level' + 1].x, game['level' + 1].y, 'stargilter').setOrigin(0.5, 0.5)
        stargilter.setScale(1)
        anim = this.anims.create({
            key: 'stargilter',
            frames: this.anims.generateFrameNumbers('stargilter', {
                start: 0,
                end: 44
            }),
            frameRate: 30,
        });
        stargilter.setBlendMode(Phaser.BlendModes.ADD);
        handindication = this.add.sprite(440, 545, 'handindication').setOrigin(0.5, 0.5)
        handindication.setScale(-0.8, 0.8)
        anim = this.anims.create({
            key: 'handindication',
            frames: this.anims.generateFrameNumbers('handindication', {
                start: 0,
                end: 1
            }),
            frameRate: 2,
            repeat: -1
        });
        handindication.anims.load('handindication')
        handindication.anims.play('handindication')
        handindication.visible = false
        if (level == 1) {
            handindication.setScale(-0.8, 0.8)
            handindication.x = 100
            handindication.y = 245
        } else if (level == 2) {
            handindication.setScale(-0.8, 0.8)
            handindication.x = 470
            handindication.y = 245
        } else if (level == 3) {
            handindication.setScale(-0.8, 0.8)
            handindication.x = 100
            handindication.y = 505
        } else if (level == 4) {
            handindication.setScale(-0.8, 0.8)
            handindication.x = 470
            handindication.y = 505
        }
        stargilter = this.add.sprite(game['level' + 1].x, game['level' + 1].y, 'stargilter').setOrigin(0.5, 0.5)
        stargilter.setScale(1)
        anim = this.anims.create({
            key: 'stargilter',
            frames: this.anims.generateFrameNumbers('stargilter', {
                start: 0,
                end: 44
            }),
            frameRate: 30,
        });
        stargilter.setBlendMode(Phaser.BlendModes.ADD);
        levelcontainer = this.add.container()
        for (i = 1; i <= 4; i++) {
            levelcontainer.add(game['level' + i])
        }
        levelcontainer.add(stargilter)
        levelcontainer.add(handindication)
        levelcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        logomutefun()
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });
        this.load.start();
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            levelselectbackground.x = safeArea.x - 300
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            levelcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function loadPicture4() {
    game.load.start();
}

function levelselectstart() {
    if (level < 5) {
        setTimeout(levestartFun11, 100)

        function levestartFun11() {
            game['level' + level].setFrame(1)
            stargilter.setPosition(game['level' + level].x, game['level' + level].y)
            stargilter.anims.load('stargilter')
            stargilter.anims.play('stargilter')
            stargilter.on('animationcomplete', stargiltercomplete, this);
            playsoundeffects('glitter')

            function stargiltercomplete() {
                handindication.visible = true
                for (i = 1; i <= level; i++) {
                    game['level' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                    game['level' + i].on('pointerover', leveloverstart)
                    game['level' + i].on('pointerout', leveloutstart)
                    game['level' + i].on('pointerdown', leveldownstart)
                    game['level' + i].on('pointerup', levelupstart)
                }
            }
        }
    } else {
        for (i = 1; i <= 4; i++) {
            game['level' + i].setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level' + i].on('pointerover', leveloverstart)
            game['level' + i].on('pointerout', leveloutstart)
            game['level' + i].on('pointerdown', leveldownstart)
            game['level' + i].on('pointerup', levelupstart)
        }
    }

    function leveloverstart() {
        this.setScale(1.05)
    }

    function leveloutstart() {
        this.setScale(1)
    }

    function leveldownstart() {
        sno = this.texture.key.substr(5)
        lcount = parseInt(sno)
        this.setScale(1)
        playsoundeffects('itemclick');
        transitionIn()
    }

    function levelupstart() {
        this.setScale(1.05)
    }
}
var startgame3 = false
var storyIn = false
var storybtnclick = false
var storyline = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function storyline() {
        Phaser.Scene.call(this, {
            key: 'storyline'
        });
    },
    preload: function () {
        loadFinish = false
        pageNo = 3
        startgame3 = false
        dollIn = true
        storyIn = false
        storybtnclick = false
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        storylinebackground = this.add.image(0, 0, 'storylinebackground').setOrigin(0, 0)
        storylinebackground.x = safeArea.x - 300
        timemachine = this.add.image(2, 57, 'timemachine').setOrigin(0, 0)
        light = this.add.image(211, 77, 'light').setOrigin(0, 0)
        toplayer = this.add.image(211, 77, 'toplayer').setOrigin(0, 0)
        clock = this.add.image(306, 170, 'clock').setOrigin(0.5, 0.5)
        clock.x += parseFloat(clock.width / 2);
        clock.y += parseFloat(clock.height / 2);
        switchbox = this.add.image(232, 403, 'switchbox').setOrigin(0, 0)
        switchon = this.add.image(302, 400, 'switchon').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        needlebase = this.add.image(356, 224, 'needlebase').setOrigin(0, 0)
        needle = this.add.image(392, 255, 'needle').setOrigin(1, 0)
        needletop = this.add.image(367, 232, 'needletop').setOrigin(0, 0)
        hole = this.add.image(257, 119, 'hole').setOrigin(0.5, 0.5)
        hole.setScale(1.2)
        hole.x += parseFloat(hole.width / 2);
        hole.y += parseFloat(hole.height / 2);
        light1 = this.add.sprite(186, 77, 'light1').setOrigin(0, 0)
        light2 = this.add.sprite(603, 77, 'light1').setOrigin(0, 0)
        light2.setScale(-1, 1)
        handindication = this.add.sprite(440, 420, 'handindication').setOrigin(0.5, 0.5)
        handindication.setScale(0.8, 0.8)
        anim = this.anims.create({
            key: 'handindication',
            frames: this.anims.generateFrameNumbers('handindication', {
                start: 0,
                end: 1
            }),
            frameRate: 2,
            repeat: -1
        });
        handindication.anims.load('handindication')
        handindication.anims.play('handindication')
        handindication.visible = false
        timemachinegrp = this.add.container()
        timemachinegrp.add(timemachine)
        timemachinegrp.add(light)
        timemachinegrp.add(toplayer)
        timemachinegrp.add(clock)
        timemachinegrp.add(switchbox)
        timemachinegrp.add(switchon)
        timemachinegrp.add(needlebase)
        timemachinegrp.add(needle)
        timemachinegrp.add(needletop)
        timemachinegrp.add(hole)
        timemachinegrp.add(light1)
        timemachinegrp.add(light2)
        timemachinegrp.add(handindication)
        timemachinegrp.x = safeArea.x + 120
        holemask = this.add.sprite(safeArea.x + 377, 119, 'hole1').setOrigin(0, 0).setVisible(false);
        mask = holemask.createBitmapMask();
        mask.alpha = 0.5
        hole.setMask(mask);
        hole.alpha = 0
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'light1',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('light1', {
                start: 0,
                end: 13
            }),
            frameRate: 24,
            repeat: -1,
            yoyo: true,
        });
        anim1 = game.scene.scenes[pageNo].anims.create({
            key: 'light2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('light1', {
                start: 0,
                end: 13
            }),
            frameRate: 24,
            repeat: -1,
            yoyo: true,
        });
        timedoll = this.add.sprite(-300, 401, 'timedoll').setOrigin(0.5, 0.5)
        timedoll.x = safeArea.x - 400
        timedoll.setFrame(lcount - 1)
        music.setVolume(0.3)
        logomutefun()
        maskShape = this.add.graphics();
        maskShape.fillStyle(0xffffff, 1);
        maskShape.fillRect(0, 0, 1400, 600);
        maskShape.x = safeArea.x - 300
        maskShape.alpha = 0
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });
        this.load.start();
        storylinebackground.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            storylinebackground.x = safeArea.x - 300
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            holemask.x = safeArea.x + 377
            maskShape.x = safeArea.x - 300
            if (!storyIn) {
                timedoll.x = safeArea.x - 400
            } else {
                timedoll.x = safeArea.x + 176
            }
            timemachinegrp.x = safeArea.x + 120
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function storylinestart() {
    setTimeout(storydollIn, 500)

    function storydollIn() {
        storyIn = true
        game.scene.scenes[pageNo].tweens.add({
            targets: timedoll,
            x: safeArea.x + 176,
            ease: 'Back',
            duration: 700,
            onComplete: storydollIn1
        });
    }

    function storydollIn1() {
        handindication.visible = true
        switchon.on('pointerdown', switchondown)
    }

    function switchonup() {
        if (storybtnclick) {
            switchon.disableInteractive()
        }
    }

    function switchondown() {
        if (!storybtnclick) {
            playsoundeffects('itemclick');
            storybtnclick = true
            playsoundeffects('timesound')
            handindication.visible = false
            light1.anims.load('light1')
            light1.anims.play('light1')
            light2.anims.load('light2')
            light2.anims.play('light2')
            switchon.setFrame(1)
            game.scene.scenes[pageNo].tweens.add({
                targets: light,
                alpha: 0,
                ease: 'Linear',
                duration: 400,
                repeat: -1,
                yoyo: true,
            });
            n1 = game.scene.scenes[pageNo].tweens.add({
                targets: needle,
                angle: 360,
                ease: 'Linear',
                duration: 400,
                repeat: -1,
            });
            n2 = game.scene.scenes[pageNo].tweens.add({
                targets: clock,
                angle: 360,
                ease: 'Linear',
                duration: 1500,
                repeat: -1,
            });
            n1.timeScale = 0.5;
            n2.timeScale = 0.3;
            setTimeout(needletimer, 500)
        }
    }

    function needletimer() {
        n1.timeScale = 0.8;
        n2.timeScale = 0.6;
        setTimeout(needletimer1, 500)
    }

    function needletimer1() {
        n1.timeScale = 1.1;
        n2.timeScale = 0.9;
        setTimeout(needletimer2, 500)
    }

    function needletimer2() {
        n1.timeScale = 1.4;
        n2.timeScale = 1.2;
        setTimeout(needletimer3, 500)
    }

    function needletimer3() {
        n1.timeScale = 1.7;
        n2.timeScale = 1.5;
        setTimeout(needletimer4, 500)
    }

    function needletimer4() {
        n1.timeScale = 2;
        n2.timeScale = 1.8;
        setTimeout(needletimer5, 500)
    }

    function needletimer5() {
        n1.timeScale = 2.5;
        n2.timeScale = 2.1;
        setTimeout(needletimer6, 500)
    }

    function needletimer6() {
        n1.timeScale = 3;
        n2.timeScale = 2.4;
        setTimeout(needletimer7, 500)
    }

    function needletimer7() {
        game.scene.scenes[pageNo].tweens.add({
            targets: hole,
            angle: 360,
            ease: 'Linear',
            duration: 500,
            repeat: -1,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: hole,
            alpha: 1,
            ease: 'Linear',
            duration: 1000,
            onComplete: holeanimationstart1
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: timemachinegrp,
            x: timemachinegrp.x + 5,
            ease: 'Linear',
            duration: 100,
            repeat: -1,
            yoyo: true
        });
    }

    function holeanimationstart1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: timedoll,
            angle: -360,
            ease: 'Linear',
            duration: 1000,
            repeat: -1,
            delay: 500
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: timedoll,
            scale: 0,
            x: safeArea.x + 516,
            y: 250,
            ease: 'Linear',
            duration: 1300,
            delay: 500,
            onComplete: holeanimationstart2
        });
    }

    function holeanimationstart2() {
        game.scene.scenes[pageNo].tweens.add({
            targets: maskShape,
            alpha: 1,
            ease: 'Linear',
            duration: 400,
            onComplete: holeanimationstart3
        });
    }

    function holeanimationstart3() {
        if (lcount == 1) {
            game.scene.scenes[pageNo].scene.stop('storyline')
            game.scene.run('level1');
        } else if (lcount == 2) {
            game.scene.scenes[pageNo].scene.stop('storyline')
            game.scene.run('level2');
        } else if (lcount == 3) {
            game.scene.scenes[pageNo].scene.stop('storyline')
            game.scene.run('level3');
        } else if (lcount == 4) {
            game.scene.scenes[pageNo].scene.stop('storyline')
            game.scene.run('level4');
        }
    }
}
var startgame5 = false
var btnstart1 = false
var btnstart2 = false
var btnstart3 = false
var btnstart4 = false
var btnstart5 = false
var glowarr = [0, 0, 0, 0]
var yearval = [1800, 1800, 1800, 1800]
var yearcount1 = 0
var yearcount2 = 0
var yearcount3 = 0
var yearcount4 = 0
var donecount = 0
var level1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level1() {
        Phaser.Scene.call(this, {
            key: 'level1'
        });
    },
    preload: function () {
        yearcount1 = 0
        yearcount2 = 0
        yearcount3 = 0
        yearcount4 = 0
        loadFinish = false
        pageNo = 5
        settingval = false
        startgame5 = false
        btnstart1 = false
        btnstart2 = false
        btnstart3 = false
        btnstart4 = false
        btnstart5 = false
        glowarr = [0, 0, 0, 0]
        cupboardstart = false
        dollIn = false
        donecount = 0
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        level1background = this.add.image(0, 0, 'level1background').setOrigin(0, 0)
        level1panel = this.add.sprite(471, 0, 'level1panel').setOrigin(0, 0)
        level1dots1 = this.add.sprite(612, 471, 'level1dots1').setOrigin(0, 0)
        level1lable = this.add.sprite(460, 36, 'level1lable').setOrigin(0, 0)
        level1text = this.add.sprite(568, 502, 'level1text').setOrigin(0, 0)
        level1dots1.visible = false
        level1dots1.setFrame(0)
        level1lable.setFrame(1)
        var edrxrr = [, 639.5, 573.5, 707.5, 573.5, 707.5, 639.5, 573.5, 707.5, 573.5, 707.5]
        var edryrr = [, 151, 281, 281, 411, 411, 151, 281, 281, 411, 411]
        for (i = 10; i >= 1; i--) {
            game['level1dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level1dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1dress' + i].visible = false;
        }
        var estbaxrr = [, 573, 707, 573, 707, 573, 707]
        var estbayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level1bag' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level1bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1bag' + i].visible = false;
        }
        var estbaxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var estbayrr = [, 151, 151, 281, 281, 411, 411]
        for (i = 6; i >= 1; i--) {
            game['level1glass' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level1glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1glass' + i].visible = false;
        }
        var ehaxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var ehayrr = [, 151, 151, 281, 281, 411, 411]
        for (i = 6; i >= 1; i--) {
            game['level1hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level1hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1hair' + i].visible = false;
        }
        var ebgaxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var ebgayrr = [, 151, 151, 281, 281, 411, 411]
        for (i = 6; i >= 1; i--) {
            game['level1chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level1chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1chain' + i].visible = false
        }
        var estaxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var estayrr = [, 151, 151, 281, 281, 411, 411]
        for (i = 6; i >= 1; i--) {
            game['level1stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level1stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1stud' + i].visible = false;
        }
        var bandxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var bandyrr = [, 151, 151, 281, 281, 411, 411]
        for (i = 6; i >= 1; i--) {
            game['level1acc' + i] = this.add.sprite(bandxrr[i], bandyrr[i], 'level1acc' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1acc' + i].visible = false;
        }
        var stockxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var stockyrr = [, 151, 151, 281, 281, 411, 411]
        for (i = 6; i >= 1; i--) {
            game['level1stock' + i] = this.add.sprite(stockxrr[i], stockyrr[i], 'level1stock' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1stock' + i].visible = false;
        }
        var totgaxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var totgayrr = [, 195, 195, 349, 349, 195, 195, 349, 349]
        for (i = 8; i >= 1; i--) {
            game['level1top' + i] = this.add.sprite(totgaxrr[i], totgayrr[i], 'level1top' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1top' + i].visible = false;
        }
        var bottgaxrr = [, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5, 573.5, 707.5]
        var bottgayrr = [, 195, 195, 349, 349, 195, 195, 349, 349]
        for (i = 8; i >= 1; i--) {
            game['level1bottom' + i] = this.add.sprite(bottgaxrr[i], bottgayrr[i], 'level1bottom' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1bottom' + i].visible = false;
        }
        var cdaxrr = [, 407, 407, 407, 407, 407, 407, 407]
        var cdayrr = [, 84, 139, 194, 250, 305, 361, 416]
        for (i = 7; i >= 1; i--) {
            game['level1cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level1cat' + i].x += parseFloat(game['level1cat' + i].width / 2)
            game['level1cat' + i].y += parseFloat(game['level1cat' + i].height / 2)
        }
        for (i = 6; i >= 1; i--) {
            game['level1stud' + i].visible = true
        }
        level1dots1.visible = false
        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        doll1bhair = this.add.sprite(143, 93, 'doll1bhair').setOrigin(0.5, 0)
        doll1bhair.x += parseFloat(doll1bhair.width / 2)
        doll1body = this.add.sprite(150, 181, 'doll1body').setOrigin(0, 0)
        doll1head = this.add.sprite(178, 88, 'doll1head').setOrigin(0, 0)
        doll1ebrow = this.add.sprite(195, 128, 'doll1ebrow').setOrigin(0, 0)
        doll1eyetop = this.add.sprite(194, 135, 'doll1eyetop').setOrigin(0, 0)
        doll1eye = this.add.sprite(205, 151, 'doll1eye').setOrigin(0, 0)
        doll1eblink = this.add.sprite(188, 137, 'doll1eblink').setOrigin(0, 0)
        doll1hand = this.add.sprite(141, 213, 'doll1hand').setOrigin(0, 0)
        doll1dressshade = this.add.sprite(150, 209, 'doll1dressshade').setOrigin(0, 0)
        doll1bottomshade = this.add.sprite(170, 306, 'doll1bottomshade').setOrigin(0, 0)
        doll1topshade = this.add.sprite(135, 198, 'doll1topshade').setOrigin(0, 0)
        doll1stock = this.add.sprite(157, 384, 'doll1stock').setOrigin(0, 0)
        doll1dress = this.add.sprite(112, 201, 'doll1dress').setOrigin(0, 0)
        doll1bottom = this.add.sprite(137, 310, 'doll1bottom').setOrigin(0, 0)
        doll1top = this.add.sprite(144, 198, 'doll1top').setOrigin(0, 0)
        doll1bag = this.add.sprite(108, 219, 'doll1bag').setOrigin(0, 0)
        doll1chain = this.add.sprite(198, 209, 'doll1chain').setOrigin(0, 0)
        doll1hair = this.add.sprite(92, 11, 'doll1hair').setOrigin(0, 0)
        doll1stud = this.add.sprite(168, 157, 'doll1stud').setOrigin(0, 0)
        doll1acc = this.add.sprite(139, 40, 'doll1acc').setOrigin(0, 0)
        doll1glass = this.add.sprite(184, 131, 'doll1glass').setOrigin(0, 0)
        doll1hand1 = this.add.sprite(253, 333, 'doll1hand1').setOrigin(0, 0)
        level1grp = this.add.container()
        level1grp.add(doll1bhair)
        level1grp.add(doll1body)
        level1grp.add(doll1head)
        level1grp.add(doll1eye)
        level1grp.add(doll1eyetop)
        level1grp.add(doll1ebrow)
        level1grp.add(doll1eblink)
        level1grp.add(doll1hand)
        level1grp.add(doll1dressshade)
        level1grp.add(doll1bottomshade)
        level1grp.add(doll1topshade)
        level1grp.add(doll1stock)
        level1grp.add(doll1dress)
        level1grp.add(doll1bottom)
        level1grp.add(doll1hand1)
        level1grp.add(doll1top)
        level1grp.add(doll1bag)
        level1grp.add(doll1chain)
        level1grp.add(doll1hair)
        level1grp.add(doll1stud)
        level1grp.add(doll1acc)
        level1grp.add(doll1glass)
        level1grp.x = -1000
        doll1eblink.setFrame(esarr[0])
        doll1dress.setFrame(darr1[0])
        doll1dressshade.setFrame(darr1[0])
        doll1hair.setFrame(darr1[1])
        doll1bhair.setFrame(darr1[1])
        doll1chain.setFrame(darr1[2])
        doll1stud.setFrame(darr1[3])
        doll1acc.setFrame(darr1[4])
        doll1bag.setFrame(darr1[5])
        doll1top.setFrame(darr1[6])
        doll1topshade.setFrame(darr1[6])
        doll1bottom.setFrame(darr1[7])
        doll1bottomshade.setFrame(darr1[7])
        doll1stock.setFrame(darr1[8])
        doll1glass.setFrame(darr1[9])
        if (darr1[5] > 0) {
            doll1hand.setFrame(1)
        } else {
            doll1hand.setFrame(0)
        }
        doll1bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level1dressdollanimation1,
            callbackScope: this
        })

        function level1dressdollanimation1() {
            level1grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level1grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level1grp,
                y: level1grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level1dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eye,
            x: 206,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll1eyestart1,
            callbackScope: this
        });

        function doll1eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 205,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll1eyestart2,
                callbackScope: this
            });
        }

        function doll1eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 204,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll1eyestart3,
                callbackScope: this
            });
        }

        function doll1eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 205,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll1eyestart4,
                callbackScope: this
            });
        }

        function doll1eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 206,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll1eyestart1,
                callbackScope: this
            });
        }
        cupboardgroup = this.add.container()
        cupboardgroup.add(level1panel)
        cupboardgroup.add(level1dots1)
        cupboardgroup.add(level1lable)
        cupboardgroup.add(level1text)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level1dress' + i])
        }
        for (i = 8; i >= 1; i--) {
            cupboardgroup.add(game['level1top' + i])
            cupboardgroup.add(game['level1bottom' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level1chain' + i])
            cupboardgroup.add(game['level1stud' + i])
            cupboardgroup.add(game['level1glass' + i])
            cupboardgroup.add(game['level1bag' + i])
            cupboardgroup.add(game['level1hair' + i])
            cupboardgroup.add(game['level1acc' + i])
            cupboardgroup.add(game['level1stock' + i])
        }
        for (i = 7; i >= 1; i--) {
            cupboardgroup.add(game['level1cat' + i])
        }
        level1dots1.visible = true
        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
        game['level1cat' + 1].setFrame(1)
        rarrow = this.add.sprite(525.85, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(744.5, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            x: rarrow.x + 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            x: larrow.x - 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        rarrow.visible = true
        larrow.visible = true
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        dressgliter = this.add.sprite(270.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(270, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(420.4, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'done2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('done2', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        done2.anims.load('done2')
        level1grp.add(dressgliter)
        level1grp.add(dollgliter)
        cupboardgroup.add(done2)
        done2.visible = false
        logomutefun()
        maskShape1 = this.add.graphics();
        maskShape1.fillStyle(0xffffff, 1);
        maskShape1.fillRect(0, 0, 1400, 600);
        maskShape1.x = safeArea.x - 300
        fillbackground2 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground2.alpha = 0
        fillbackground2.x = safeArea.x - 300
        maskShape = this.add.graphics();
        maskShape.fillStyle(0x000000, 1);
        maskShape.fillRect(0, 0, 1400, 600);
        maskShape.x = safeArea.x - 300
        maskShape.alpha = 0
        game.scene.scenes[pageNo].tweens.add({
            targets: fillbackground2,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: maskShape,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        yearval1 = this.add.image(273, 248, 'yearno');
        yearval1.setOrigin(0, 0)
        yearval11 = this.add.image(273, 346, 'yearno');
        yearval11.setOrigin(0, 0)
        yearval2 = this.add.image(334, 248, 'yearno');
        yearval2.setOrigin(0, 0)
        yearval22 = this.add.image(334, 346, 'yearno');
        yearval22.setOrigin(0, 0)
        yearval3 = this.add.image(395, 248, 'yearno');
        yearval3.setOrigin(0, 0)
        yearval33 = this.add.image(395, 346, 'yearno');
        yearval33.setOrigin(0, 0)
        yearval4 = this.add.image(456, 248, 'yearno');
        yearval4.setOrigin(0, 0)
        yearval44 = this.add.image(456, 346, 'yearno');
        yearval44.setOrigin(0, 0)
        yearcontainer = this.add.container()
        yearcontainer.add(yearval1)
        yearcontainer.add(yearval11)
        yearcontainer.add(yearval2)
        yearcontainer.add(yearval22)
        yearcontainer.add(yearval3)
        yearcontainer.add(yearval33)
        yearcontainer.add(yearval4)
        yearcontainer.add(yearval44)
        yearcontainer.x = safeArea.x
        yearmask1 = this.make.graphics();
        yearmask1.fillStyle(0xff0000, 0.5);
        yearmask1.fillRect(269, 240, 255, 95);
        yearmask1.x = safeArea.x
        yearcontainer.mask = new Phaser.Display.Masks.GeometryMask(yearcontainer, yearmask1);
        setTimeout(yeartimer1, 1)

        function yeartimer1() {
            setTimeout(yearsound111, 300)

            function yearsound111() {
                playsoundeffects('yearsound')
            }
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 500,
                onComplete: yeartimer2
            });
        }

        function yeartimer2() {
            yearval1.y = 330
            yearval11.y = 273
            if (yearcount1 <= 0) {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: yeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: 154,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function yeartimer3() {
            yearcount1 = yearcount1 + 1
            yearval1.y = 273
            yearval11.y = 330
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: yeartimer2
            });
        }
        setTimeout(ayeartimer1, 1)

        function ayeartimer1() {
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 600,
                onComplete: ayeartimer2
            });
        }

        function ayeartimer2() {
            yearval2.y = 330
            yearval22.y = 273
            if (yearcount2 < 1) {
                a2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: ayeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -614,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function ayeartimer3() {
            yearcount2 = yearcount2 + 1
            yearval2.y = 273
            yearval22.y = 330
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: ayeartimer2
            });
        }
        setTimeout(byeartimer1, 1)

        function byeartimer1() {
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }

        function byeartimer2() {
            yearval3.y = 330
            yearval33.y = 273
            if (yearcount3 < 1) {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: byeartimer3
                });
            } else {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -232,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function byeartimer3() {
            yearcount3 = yearcount3 + 1
            yearval3.y = 273
            yearval33.y = 330
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }
        setTimeout(cyeartimer1, 1)

        function cyeartimer1() {
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 800,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer2() {
            yearval4.y = 330
            yearval44.y = 273
            if (yearcount4 < 1) {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: cyeartimer3
                });
            } else {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: 250,
                    ease: 'Linear',
                    duration: 150,
                    onComplete: cyeartimer4
                });
            }
        }

        function cyeartimer3() {
            yearcount4 = yearcount4 + 1
            yearval4.y = 273
            yearval44.y = 330
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval11,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval22,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval33,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval44,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: fillbackground2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
                onComplete: level1start
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
        }
        this.load.on('complete', function () {
            loadFinish = true;
        });
        //doll2
        this.load.spritesheet('doll2bhair', 'assets/level2/doll/bhair.png', {
            frameWidth: 244,
            frameHeight: 308
        });
        this.load.spritesheet('doll2dressshade', 'assets/level2/doll/dressshade.png', {
            frameWidth: 225,
            frameHeight: 481
        });
        this.load.spritesheet('doll2bottomshade', 'assets/level2/doll/bottomshade.png', {
            frameWidth: 148,
            frameHeight: 398
        });
        this.load.spritesheet('doll2topshade', 'assets/level2/doll/topshade.png', {
            frameWidth: 248,
            frameHeight: 227
        });
        this.load.spritesheet('doll2stock', 'assets/level2/doll/stock.png', {
            frameWidth: 178,
            frameHeight: 324
        });
        this.load.image('doll2body', 'assets/level2/doll/body.png');
        this.load.image('doll2head', 'assets/level2/doll/head.png');
        this.load.image('doll2eye', 'assets/level2/doll/eye.png');
        this.load.image('doll2eyetop', 'assets/level2/doll/eyetop.png');
        this.load.image('doll2ebrow', 'assets/level2/doll/ebrow.png');
        this.load.spritesheet('doll2hand', 'assets/level2/doll/hand.png', {
            frameWidth: 84,
            frameHeight: 76
        });
        this.load.spritesheet('doll2eblink', 'assets/level2/doll/eblink.png', {
            frameWidth: 129,
            frameHeight: 52
        });
        this.load.spritesheet('doll2dress', 'assets/level2/doll/dress.png', {
            frameWidth: 255,
            frameHeight: 470
        });
        this.load.spritesheet('doll2hair', 'assets/level2/doll/hair.png', {
            frameWidth: 190,
            frameHeight: 293
        });
        this.load.spritesheet('doll2chain', 'assets/level2/doll/chain.png', {
            frameWidth: 78,
            frameHeight: 73
        });
        this.load.spritesheet('doll2stud', 'assets/level2/doll/stud.png', {
            frameWidth: 153,
            frameHeight: 68
        });
        this.load.spritesheet('doll2acc', 'assets/level2/doll/acc.png', {
            frameWidth: 210,
            frameHeight: 206
        });
        this.load.spritesheet('doll2top', 'assets/level2/doll/top.png', {
            frameWidth: 240,
            frameHeight: 237
        });
        this.load.spritesheet('doll2bottom', 'assets/level2/doll/bottom.png', {
            frameWidth: 226,
            frameHeight: 404
        });
        this.load.spritesheet('doll2bag', 'assets/level2/doll/bag.png', {
            frameWidth: 129,
            frameHeight: 142
        });
        this.load.spritesheet('doll2glass', 'assets/level2/doll/glass.png', {
            frameWidth: 143,
            frameHeight: 78
        });
        this.load.start();
        level1background.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            level1background.x = safeArea.x - 300
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame5 && donecount == 0) {
                level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 20
            } else {
                level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 170
            }
            fillbackground2.x = safeArea.x - 300
            maskShape1.x = safeArea.x - 300
            maskShape.x = safeArea.x - 300
            yearcontainer.x = safeArea.x
            yearmask1.x = safeArea.x
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function level1start() {
    music.setVolume(1)
    fillbackground2.visible = false
    activecat()
    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level1grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 20,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level1dressclickstart1,
            callbackScope: this
        });
    }

    function level1dressclickstart1() {
        level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 20
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
            onComplete: level1dressclickstart,
            callbackScope: this
        });
    }

    function level1dressclickstart() {
        cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        cupboardstart = true
        for (i = 10; i >= 1; i--) {
            game['level1dress' + i].on('pointerover', etopOverFun)
            game['level1dress' + i].on('pointerout', etopOutFun)
            game['level1dress' + i].on('pointerdown', etopFun1)
        }

        function etopOverFun(ev) {
            this.setScale(1.05)
        }

        function etopOutFun(ev) {
            this.setScale(1)
            activecat()
        }

        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr1[0] == parseInt(sno)) {
                doll1dress.setFrame(0)
                doll1dressshade.setFrame(0)
                darr1[0] = 0
                doll1top.setFrame(0)
                doll1topshade.setFrame(0)
                darr1[6] = 0
                doll1bottom.setFrame(0)
                doll1bottomshade.setFrame(0)
                darr1[7] = 0
            } else {
                darr1[0] = parseInt(sno)
                doll1dress.setFrame(parseInt(sno))
                doll1dressshade.setFrame(parseInt(sno))
                doll1top.setFrame(9)
                doll1topshade.setFrame(9)
                darr1[6] = 9
                doll1bottom.setFrame(9)
                doll1bottomshade.setFrame(9)
                darr1[7] = 9
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level1hair' + i].on('pointerover', etopOverFun)
            game['level1hair' + i].on('pointerout', etopOutFun)
            game['level1hair' + i].on('pointerdown', overFun)
        }

        function overFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr1[1] == parseInt(sno)) {
                doll1bhair.setFrame(0)
                doll1hair.setFrame(0)
                darr1[1] = 0
            } else {
                darr1[1] = parseInt(sno)
                doll1bhair.setFrame(parseInt(sno))
                doll1hair.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level1chain' + i].on('pointerover', etopOverFun)
            game['level1chain' + i].on('pointerout', etopOutFun)
            game['level1chain' + i].on('pointerdown', chainFun)
        }

        function chainFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart3 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr1[2] == parseInt(sno)) {
                doll1chain.setFrame(0)
                darr1[2] = 0
            } else {
                darr1[2] = parseInt(sno)
                doll1chain.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level1stud' + i].on('pointerover', etopOverFun)
            game['level1stud' + i].on('pointerout', etopOutFun)
            game['level1stud' + i].on('pointerdown', studFun)
        }

        function studFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr1[3] == parseInt(sno)) {
                doll1stud.setFrame(0)
                darr1[3] = 0
            } else {
                darr1[3] = parseInt(sno)
                doll1stud.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level1acc' + i].on('pointerover', etopOverFun)
            game['level1acc' + i].on('pointerout', etopOutFun)
            game['level1acc' + i].on('pointerdown', bandFun)
        }

        function bandFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr1[4] == parseInt(sno)) {
                doll1acc.setFrame(0)
                darr1[4] = 0
            } else {
                darr1[4] = parseInt(sno)
                doll1acc.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level1bag' + i].on('pointerover', etopOverFun)
            game['level1bag' + i].on('pointerout', etopOutFun)
            game['level1bag' + i].on('pointerdown', bagFun1)
        }

        function bagFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr1[5] == parseInt(sno)) {
                doll1bag.setFrame(0)
                darr1[5] = 0
            } else {
                darr1[5] = parseInt(sno)
                doll1bag.setFrame(parseInt(sno))
            }
            if (darr1[5] > 0) {
                doll1hand.setFrame(1)
            } else {
                doll1hand.setFrame(0)
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level1top' + i].on('pointerover', etopOverFun)
            game['level1top' + i].on('pointerout', etopOutFun)
            game['level1top' + i].on('pointerdown', level1topfun)
        }

        function level1topfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr1[6] == parseInt(sno)) {
                doll1top.setFrame(0)
                doll1topshade.setFrame(0)
                darr1[6] = 0
                doll1dress.setFrame(0)
                doll1dressshade.setFrame(0)
                darr1[0] = 0
            } else {
                darr1[6] = parseInt(sno)
                doll1top.setFrame(parseInt(sno))
                doll1topshade.setFrame(parseInt(sno))
                doll1dress.setFrame(0)
                doll1dressshade.setFrame(0)
                darr1[0] = 0
            }
            if (darr1[7] == 9) {
                doll1bottom.setFrame(0)
                doll1bottomshade.setFrame(0)
                darr1[7] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level1bottom' + i].on('pointerover', etopOverFun)
            game['level1bottom' + i].on('pointerout', etopOutFun)
            game['level1bottom' + i].on('pointerdown', level1bottomfun)
        }

        function level1bottomfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(12)
            if (darr1[7] == parseInt(sno)) {
                doll1bottom.setFrame(0)
                doll1bottomshade.setFrame(0)
                darr1[7] = 0
                doll1dress.setFrame(0)
                doll1dressshade.setFrame(0)
                darr1[0] = 0
            } else {
                darr1[7] = parseInt(sno)
                doll1bottom.setFrame(parseInt(sno))
                doll1bottomshade.setFrame(parseInt(sno))
                doll1dress.setFrame(0)
                doll1dressshade.setFrame(0)
                darr1[0] = 0
            }
            if (darr1[6] == 9) {
                doll1top.setFrame(0)
                doll1topshade.setFrame(0)
                darr1[6] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level1stock' + i].on('pointerstock', etopOverFun)
            game['level1stock' + i].on('pointerout', etopOutFun)
            game['level1stock' + i].on('pointerdown', level1stockfun)
        }

        function level1stockfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr1[8] == parseInt(sno)) {
                doll1stock.setFrame(0)
                darr1[8] = 0
            } else {
                darr1[8] = parseInt(sno)
                doll1stock.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level1glass' + i].on('pointerover', etopOverFun)
            game['level1glass' + i].on('pointerout', etopOutFun)
            game['level1glass' + i].on('pointerdown', glassFun1)
        }

        function glassFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr1[9] == parseInt(sno)) {
                doll1glass.setFrame(0)
                darr1[9] = 0
            } else {
                darr1[9] = parseInt(sno)
                doll1glass.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }

        function btnvisFun() {
            if (loadFinish && done2.visible == false) {
                done2.visible = true
                done2.setScale(0)
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Linear',
                    duration: 500,
                });
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    angle: -360,
                    ease: 'Linear',
                    duration: 500,
                });
            }
        }
    }
    larrow.on('pointerdown', larrowdownstart)

    function larrowdownstart() {
        playsoundeffects('clickss')
        if (game['level1stud' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(2)
            level1text.setFrame(1)
            for (i = 7; i >= 2; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 1].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = true
            }
        } else if (game['level1chain' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(3)
            level1text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1bag' + i].visible = true
            }
        } else if (game['level1bag' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(4)
            level1text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1acc' + i].visible = true
            }
        } else if (game['level1acc' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(5)
            level1text.setFrame(4)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1stock' + i].visible = true
            }
        } else if (game['level1stock' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(6)
            level1text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1glass' + i].visible = true
            }
        } else if (game['level1glass' + 1].visible) {
            level1dots1.visible = false
            level1lable.setFrame(7)
            level1text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i <= 5; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 5; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1hair' + i].visible = true
            }
        } else if (game['level1hair' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(8)
            level1text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level1top' + i].visible = true
            }
        } else if (game['level1top' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(8)
            level1text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level1top' + i].visible = true
            }
        } else if (game['level1top' + 5].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1dots1.setFrame(0)
            level1lable.setFrame(9)
            level1text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level1bottom' + i].visible = true
            }
        } else if (game['level1bottom' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(9)
            level1text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i <= 7; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 5; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 7; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level1bottom' + i].visible = true
            }
        } else if (game['level1bottom' + 5].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(10)
            level1text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(10)
            level1text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 6].visible) {
            level1dots1.setFrame(0)
            level1dots1.visible = true
            level1lable.setFrame(1)
            level1text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 2; i <= 7; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 2; i <= 7; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1stud' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')
        if (game['level1stud' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(10)
            level1text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 6].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(10)
            level1text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(9)
            level1text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level1bottom' + i].visible = true
            }
        } else if (game['level1bottom' + 5].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(8)
            level1text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level1bottom' + i].visible = true
            }
        } else if (game['level1bottom' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(7)
            level1text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level1top' + i].visible = true
            }
        } else if (game['level1top' + 5].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(7)
            level1text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level1top' + i].visible = true
            }
        } else if (game['level1top' + 1].visible) {
            level1dots1.visible = false
            level1lable.setFrame(6)
            level1text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1hair' + i].visible = true
            }
        } else if (game['level1hair' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(5)
            level1text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 4; i <= 7; i++) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 4; i <= 7; i++) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1glass' + i].visible = true
            }
        } else if (game['level1glass' + 1].visible) {
            level1lable.setFrame(5)
            level1text.setFrame(4)
            level1dots1.visible = true
            level1dots1.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 2; i >= 1; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 4; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 2; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 4; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1stock' + i].visible = true
            }
        } else if (game['level1stock' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(4)
            level1text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1acc' + i].visible = true
            }
        } else if (game['level1acc' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(3)
            level1text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1bag' + i].visible = true
            }
        } else if (game['level1bag' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(1)
            level1lable.setFrame(2)
            level1text.setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = true
            }
        } else if (game['level1chain' + 1].visible) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.setFrame(1)
            level1text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level1cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level1cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1stud' + i].visible = true
            }
        }
    }

    function activecat() {
        for (i = 1; i <= 10; i++) {
            game['level1dress' + i].alpha = 1
        }
        for (i = 1; i <= 8; i++) {
            game['level1top' + i].alpha = 1
            game['level1bottom' + i].alpha = 1
        }
        for (i = 1; i <= 6; i++) {
            game['level1chain' + i].alpha = 1
            game['level1stud' + i].alpha = 1
            game['level1hair' + i].alpha = 1
            game['level1bag' + i].alpha = 1
            game['level1stock' + i].alpha = 1
            game['level1glass' + i].alpha = 1
            game['level1acc' + i].alpha = 1
        }
        if (darr1[0] > 0 && darr1[0] < 13) {
            game['level1dress' + darr1[0]].alpha = 0.5
        }
        if (darr1[1] > 0 && darr1[1] < 7) {
            game['level1hair' + darr1[1]].alpha = 0.5
        }
        if (darr1[2] > 0) {
            game['level1chain' + darr1[2]].alpha = 0.5
        }
        if (darr1[3] > 0) {
            game['level1stud' + darr1[3]].alpha = 0.5
        }
        if (darr1[5] > 0) {
            game['level1bag' + darr1[5]].alpha = 0.5
        }
        if (darr1[4] > 0) {
            game['level1acc' + darr1[4]].alpha = 0.5
        }
        if (darr1[6] > 0 && darr1[6] < 9) {
            game['level1top' + darr1[6]].alpha = 0.5
        }
        if (darr1[7] > 0 && darr1[7] < 9) {
            game['level1bottom' + darr1[7]].alpha = 0.5
        }
        if (darr1[8] > 0) {
            game['level1stock' + darr1[8]].alpha = 0.5
        }
        if (darr1[9] > 0) {
            game['level1glass' + darr1[9]].alpha = 0.5
        }
    }
    for (i = 7; i >= 1; i--) {
        game['level1cat' + i].on('pointerover', levelcatoverstart)
        game['level1cat' + i].on('pointerout', levelcatoutstart)
        game['level1cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
        activecat()
    }

    function levelcatdownstart(ev) {
        level1dots1.visible = false
        level1dots1.setFrame(0)
        activecat()
        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 7; i++) {
            game['level1cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level1cat' + 1].setFrame(1)
            level1lable.visible = true
            level1lable.setFrame(1)
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1text.setFrame(0)
            for (i = 7; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            level1lable.visible = true
            level1lable.setFrame(1)
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.visible = true
            level1lable.setFrame(3)
            level1text.setFrame(2)
            for (i = 7; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            game['level1cat' + 2].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1bag' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.visible = true
            level1lable.setFrame(5)
            level1text.setFrame(4)
            game['level1cat' + 3].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1stock' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            level1lable.visible = true
            level1lable.setFrame(7)
            level1text.setFrame(6)
            game['level1cat' + 4].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1hair' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1lable.visible = true
            level1lable.setFrame(8)
            level1text.setFrame(7)
            game['level1cat' + 5].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1top' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            level1lable.visible = true
            level1lable.setFrame(9)
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1text.setFrame(9)
            game['level1cat' + 6].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bottom' + i].visible = true
            }
        } else if (parseInt(sno) == 7) {
            level1lable.setFrame(10)
            level1dots1.visible = true
            level1dots1.setFrame(0)
            level1text.setFrame(10)
            game['level1cat' + 7].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level1top' + i].visible = false
                game['level1bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
                game['level1acc' + i].visible = false
                game['level1stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level1dress' + i].visible = true
            }
        }
    }
    done2.on('pointerover', done2overstart)
    done2.on('pointerout', done2outstart)
    done2.on('pointerdown', done2downstart)
    done2.on('pointerup', done2upstart)

    function done2overstart() {
        done2.anims.play('done2')
    }

    function done2outstart() {
        done2.anims.stop('done2')
    }

    function done2upstart() {
        this.setScale(1.05)
    }

    function done2downstart() {
        if (!startgame5 && loadFinish) {
            startgame5 = true
            playsoundeffects('clickss')
            done2.anims.stop('done2')
            done2.setFrame(10)
            if (level == 1) {
                level = 2
            }
            saveFile()
            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level1grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 170,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 170
        playsoundeffects('complete');
        dollgliter.anims.load('dollgliter')
        dollgliter.anims.play('dollgliter')
        dollgliter.on('animationcomplete', dollglitercomplete, this);
    }

    function dollglitercomplete() {
        setTimeout(doneclickstart3, 500)
    }

    function doneclickstart3() {
        transitionIn();
    }
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1bhair,
        y: doll1bhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1head,
        y: doll1head.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1eye,
        y: doll1eye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1eyetop,
        y: doll1eyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1eblink,
        y: doll1eblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1ebrow,
        y: doll1ebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1hair,
        y: doll1hair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1stud,
        y: doll1stud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1acc,
        y: doll1acc.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll1glass,
        y: doll1glass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    doll1eblink.setFrame(esarr[0] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: doll1headanimation11,
        callbackScope: this
    })

    function doll1headanimation11() {
        doll1eblink.setFrame(esarr[0])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: doll1headanimation1,
            callbackScope: this
        })
    }

    function doll1headanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1stud,
            y: doll1stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1acc,
            y: doll1acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1glass,
            y: doll1glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1bhair,
            y: doll1bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1head,
            y: doll1head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1ebrow,
            y: doll1ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eye,
            y: doll1eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eyetop,
            y: doll1eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eblink,
            y: doll1eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1hair,
            y: doll1hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll1eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll1headanimation11,
            callbackScope: this
        })

        function doll1headanimation1() {
            doll1eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll1headanimation1,
                callbackScope: this
            })
        }
    }
}
var startgame6 = false
var btnstart1 = false
var btnstart2 = false
var btnstart3 = false
var btnstart4 = false
var btnstart5 = false
var glowarr = [0, 0, 0, 0]
var donecount = 0
var level2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level2() {
        Phaser.Scene.call(this, {
            key: 'level2'
        });
    },
    preload: function () {
        yearcount1 = 0
        yearcount2 = 0
        yearcount3 = 0
        yearcount4 = 0
        loadFinish = false
        pageNo = 6
        settingval = false
        startgame6 = false
        btnstart1 = false
        btnstart2 = false
        btnstart3 = false
        btnstart4 = false
        btnstart5 = false
        glowarr = [0, 0, 0, 0]
        cupboardstart = false
        dollIn = true
        donecount = 0
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        level2background = this.add.image(0, 0, 'level2background').setOrigin(0, 0)
        level2panel = this.add.sprite(464, 0, 'level1panel').setOrigin(0, 0)
        level2lable = this.add.sprite(459, 34, 'level1lable').setOrigin(0, 0)
        level2dots1 = this.add.sprite(608, 470, 'level1dots1').setOrigin(0, 0)
        level2text = this.add.sprite(569, 503, 'level1text').setOrigin(0, 0)
        level2dots1.visible = false
        level2dots1.setFrame(0)
        level2lable.setFrame(1)
        var edrxrr = [, 640, 573, 707, 573, 707, 640, 573, 707, 573, 707]
        var edryrr = [, 151.5, 281.5, 281.5, 411.5, 411.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 10; i >= 1; i--) {
            game['level2dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level2dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2dress' + i].visible = false;
        }
        var estbaxrr = [, 573, 707, 573, 707, 573, 707]
        var estbayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level2bag' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level2bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2bag' + i].visible = false;
        }
        var estbaxrr = [, 573, 707, 573, 707, 573, 707]
        var estbayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level2stock' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level2stock' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2stock' + i].visible = false;
        }
        var ehaxrr = [, 573, 707, 573, 707, 573, 707]
        var ehayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level2hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level2hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2hair' + i].visible = false;
        }
        var ebgaxrr = [, 573, 707, 573, 707, 573, 707]
        var ebgayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level2chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level2chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2chain' + i].visible = false
        }
        var estaxrr = [, 573, 707, 573, 707, 573, 707]
        var estayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level2stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level2stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2stud' + i].visible = false;
        }
        var bandxrr = [, 573, 707, 573, 707, 573, 707]
        var bandyrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level2acc' + i] = this.add.sprite(bandxrr[i], bandyrr[i], 'level2acc' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2acc' + i].visible = false;
        }
        var glassxrr = [, 573, 707, 573, 707, 573, 707]
        var glassyrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level2glass' + i] = this.add.sprite(glassxrr[i], glassyrr[i], 'level2glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2glass' + i].visible = false;
        }
        var totgaxrr = [, 573, 707, 573, 707, 573, 707, 573, 707]
        var totgayrr = [, 195.5, 195.5, 349.5, 349.5, 195.5, 195.5, 349.5, 349.5]
        for (i = 8; i >= 1; i--) {
            game['level2top' + i] = this.add.sprite(totgaxrr[i], totgayrr[i], 'level2top' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2top' + i].visible = false;
        }
        var bottgaxrr = [, 573, 707, 573, 707, 573, 707, 573, 707]
        var bottgayrr = [, 195.5, 195.5, 349.5, 349.5, 195.5, 195.5, 349.5, 349.5]
        for (i = 8; i >= 1; i--) {
            game['level2bottom' + i] = this.add.sprite(bottgaxrr[i], bottgayrr[i], 'level2bottom' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2bottom' + i].visible = false;
        }
        var cdaxrr = [, 407, 407, 407, 407, 407, 407, 407]
        var cdayrr = [, 84, 139, 194, 250, 305, 361, 416]
        for (i = 7; i >= 1; i--) {
            game['level2cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level2cat' + i].x += parseFloat(game['level2cat' + i].width / 2)
            game['level2cat' + i].y += parseFloat(game['level2cat' + i].height / 2)
        }
        for (i = 6; i >= 1; i--) {
            game['level2stud' + i].visible = true
        }
        level2dots1.visible = false
        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        doll2bhair = this.add.sprite(115, 123, 'doll2bhair').setOrigin(0.5, 0)
        doll2bhair.x += parseFloat(doll2bhair.width / 2)
        doll2body = this.add.sprite(130, 193, 'doll2body').setOrigin(0, 0)
        doll2head = this.add.sprite(156, 90, 'doll2head').setOrigin(0, 0)
        doll2ebrow = this.add.sprite(173, 128, 'doll2ebrow').setOrigin(0, 0)
        doll2eyetop = this.add.sprite(172, 129, 'doll2eyetop').setOrigin(0, 0)
        doll2eye = this.add.sprite(177, 144, 'doll2eye').setOrigin(0, 0)
        doll2eblink = this.add.sprite(165, 139, 'doll2eblink').setOrigin(0, 0)
        doll2hand = this.add.sprite(92, 389, 'doll2hand').setOrigin(0, 0)
        doll2dressshade = this.add.sprite(129, 217, 'doll2dressshade').setOrigin(0, 0)
        doll2bottomshade = this.add.sprite(164, 326, 'doll2bottomshade').setOrigin(0, 0)
        doll2topshade = this.add.sprite(122, 210, 'doll2topshade').setOrigin(0, 0)
        doll2stock = this.add.sprite(152, 432, 'doll2stock').setOrigin(0, 0)
        doll2dress = this.add.sprite(115, 213, 'doll2dress').setOrigin(0, 0)
        doll2bottom = this.add.sprite(123, 324, 'doll2bottom').setOrigin(0, 0)
        doll2top = this.add.sprite(123, 207, 'doll2top').setOrigin(0, 0)
        doll2bag = this.add.sprite(63, 419, 'doll2bag').setOrigin(0, 0)
        doll2chain = this.add.sprite(193, 221, 'doll2chain').setOrigin(0, 0)
        doll2hair = this.add.sprite(134, 43, 'doll2hair').setOrigin(0, 0)
        doll2stud = this.add.sprite(156, 156, 'doll2stud').setOrigin(0, 0)
        doll2acc = this.add.sprite(115, 23, 'doll2acc').setOrigin(0, 0)
        doll2glass = this.add.sprite(160, 126, 'doll2glass').setOrigin(0, 0)
        level2grp = this.add.container()
        level2grp.add(doll2bhair)
        level2grp.add(doll2body)
        level2grp.add(doll2head)
        level2grp.add(doll2eye)
        level2grp.add(doll2eyetop)
        level2grp.add(doll2ebrow)
        level2grp.add(doll2eblink)
        level2grp.add(doll2hand)
        level2grp.add(doll2dressshade)
        level2grp.add(doll2bottomshade)
        level2grp.add(doll2topshade)
        level2grp.add(doll2stock)
        level2grp.add(doll2dress)
        level2grp.add(doll2bottom)
        level2grp.add(doll2top)
        level2grp.add(doll2bag)
        level2grp.add(doll2chain)
        level2grp.add(doll2hair)
        level2grp.add(doll2stud)
        level2grp.add(doll2acc)
        level2grp.add(doll2glass)
        level2grp.x = -1000
        doll2eblink.setFrame(esarr[0])
        doll2dress.setFrame(darr2[0])
        doll2dressshade.setFrame(darr2[0])
        doll2hair.setFrame(darr2[1])
        doll2bhair.setFrame(darr2[1])
        doll2chain.setFrame(darr2[2])
        doll2stud.setFrame(darr2[3])
        doll2acc.setFrame(darr2[4])
        doll2bag.setFrame(darr2[5])
        doll2top.setFrame(darr2[6])
        doll2topshade.setFrame(darr2[6])
        doll2bottom.setFrame(darr2[7])
        doll2bottomshade.setFrame(darr2[7])
        doll2stock.setFrame(darr2[8])
        doll2glass.setFrame(darr2[9])
        if (darr2[5] > 0) {
            doll2hand.setFrame(1)
        } else {
            doll2hand.setFrame(0)
        }
        doll2bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level2dressdollanimation1,
            callbackScope: this
        })

        function level2dressdollanimation1() {
            level2grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level2grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level2grp,
                y: level2grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level2dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eye,
            x: 178,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll2eyestart1,
            callbackScope: this
        });

        function doll2eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll2eyestart2,
                callbackScope: this
            });
        }

        function doll2eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 176,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll2eyestart3,
                callbackScope: this
            });
        }

        function doll2eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll2eyestart4,
                callbackScope: this
            });
        }

        function doll2eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 178,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll2eyestart1,
                callbackScope: this
            });
        }
        cupboardgroup = this.add.container()
        cupboardgroup.add(level2panel)
        cupboardgroup.add(level2dots1)
        cupboardgroup.add(level2lable)
        cupboardgroup.add(level2text)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level2dress' + i])
        }
        for (i = 8; i >= 1; i--) {
            cupboardgroup.add(game['level2top' + i])
            cupboardgroup.add(game['level2bottom' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level2chain' + i])
            cupboardgroup.add(game['level2stud' + i])
            cupboardgroup.add(game['level2glass' + i])
            cupboardgroup.add(game['level2bag' + i])
            cupboardgroup.add(game['level2hair' + i])
            cupboardgroup.add(game['level2acc' + i])
            cupboardgroup.add(game['level2stock' + i])
        }
        for (i = 7; i >= 1; i--) {
            cupboardgroup.add(game['level2cat' + i])
        }
        level2dots1.visible = true
        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
        game['level2cat' + 1].setFrame(1)
        rarrow = this.add.sprite(525.85, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(744.5, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            x: rarrow.x + 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            x: larrow.x - 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        rarrow.visible = true
        larrow.visible = true
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        dressgliter = this.add.sprite(240.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(250, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(420.4, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'done2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('done2', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        done2.anims.load('done2')
        level2grp.add(dressgliter)
        level2grp.add(dollgliter)
        cupboardgroup.add(done2)
        done2.visible = false
        logomutefun()
        maskShape1 = this.add.graphics();
        maskShape1.fillStyle(0xffffff, 1);
        maskShape1.fillRect(0, 0, 1400, 600);
        maskShape1.x = safeArea.x - 300
        fillbackground2 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground2.alpha = 0
        fillbackground2.x = safeArea.x - 300
        maskShape = this.add.graphics();
        maskShape.fillStyle(0x000000, 1);
        maskShape.fillRect(0, 0, 1400, 600);
        maskShape.x = safeArea.x - 300
        maskShape.alpha = 0
        game.scene.scenes[pageNo].tweens.add({
            targets: fillbackground2,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: maskShape,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        yearval1 = this.add.image(273, 248, 'yearno');
        yearval1.setOrigin(0, 0)
        yearval11 = this.add.image(273, 346, 'yearno');
        yearval11.setOrigin(0, 0)
        yearval2 = this.add.image(334, 248, 'yearno');
        yearval2.setOrigin(0, 0)
        yearval22 = this.add.image(334, 346, 'yearno');
        yearval22.setOrigin(0, 0)
        yearval3 = this.add.image(395, 248, 'yearno');
        yearval3.setOrigin(0, 0)
        yearval33 = this.add.image(395, 346, 'yearno');
        yearval33.setOrigin(0, 0)
        yearval4 = this.add.image(456, 248, 'yearno');
        yearval4.setOrigin(0, 0)
        yearval44 = this.add.image(456, 346, 'yearno');
        yearval44.setOrigin(0, 0)
        yearcontainer = this.add.container()
        yearcontainer.add(yearval1)
        yearcontainer.add(yearval11)
        yearcontainer.add(yearval2)
        yearcontainer.add(yearval22)
        yearcontainer.add(yearval3)
        yearcontainer.add(yearval33)
        yearcontainer.add(yearval4)
        yearcontainer.add(yearval44)
        yearcontainer.x = safeArea.x
        yearmask1 = this.make.graphics();
        yearmask1.fillStyle(0xff0000, 0.5);
        yearmask1.fillRect(269, 240, 255, 95);
        yearmask1.x = safeArea.x
        yearcontainer.mask = new Phaser.Display.Masks.GeometryMask(yearcontainer, yearmask1);
        setTimeout(yeartimer1, 1)

        function yeartimer1() {
            setTimeout(yearsound111, 300)

            function yearsound111() {
                playsoundeffects('yearsound')
            }
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 500,
                onComplete: yeartimer2
            });
        }

        function yeartimer2() {
            yearval1.y = 330
            yearval11.y = 273
            if (yearcount1 <= 0) {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: yeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: 154,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function yeartimer3() {
            yearcount1 = yearcount1 + 1
            yearval1.y = 273
            yearval11.y = 330
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: yeartimer2
            });
        }
        setTimeout(ayeartimer1, 1)

        function ayeartimer1() {
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 600,
                onComplete: ayeartimer2
            });
        }

        function ayeartimer2() {
            yearval2.y = 330
            yearval22.y = 273
            if (yearcount2 < 1) {
                a2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: ayeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -614,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function ayeartimer3() {
            yearcount2 = yearcount2 + 1
            yearval2.y = 273
            yearval22.y = 330
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: ayeartimer2
            });
        }
        setTimeout(byeartimer1, 1)

        function byeartimer1() {
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }

        function byeartimer2() {
            yearval3.y = 330
            yearval33.y = 273
            if (yearcount3 < 1) {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: byeartimer3
                });
            } else {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -326,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function byeartimer3() {
            yearcount3 = yearcount3 + 1
            yearval3.y = 273
            yearval33.y = 330
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }
        setTimeout(cyeartimer1, 1)

        function cyeartimer1() {
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 800,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer2() {
            yearval4.y = 330
            yearval44.y = 273
            if (yearcount4 < 1) {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: cyeartimer3
                });
            } else {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: 250,
                    ease: 'Linear',
                    duration: 150,
                    onComplete: cyeartimer4
                });
            }
        }

        function cyeartimer3() {
            yearcount4 = yearcount4 + 1
            yearval4.y = 273
            yearval44.y = 330
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval11,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval22,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval33,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval44,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: fillbackground2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
                onComplete: level2start
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
        }
        this.load.on('complete', function () {
            loadFinish = true;
        });
        //doll3
        this.load.spritesheet('doll3bacc', 'assets/level3/doll/bacc.png', {
            frameWidth: 198,
            frameHeight: 61
        });
        this.load.spritesheet('doll3hand', 'assets/level3/doll/hand.png', {
            frameWidth: 77,
            frameHeight: 102
        });
        this.load.spritesheet('doll3stock', 'assets/level3/doll/stock.png', {
            frameWidth: 165,
            frameHeight: 344
        });
        this.load.spritesheet('doll3bhair', 'assets/level3/doll/bhair.png', {
            frameWidth: 352,
            frameHeight: 383
        });
        this.load.spritesheet('doll3glass', 'assets/level3/doll/glass.png', {
            frameWidth: 137,
            frameHeight: 74
        });
        this.load.image('doll3body', 'assets/level3/doll/body.png');
        this.load.image('doll3head', 'assets/level3/doll/head.png');
        this.load.image('doll3eye', 'assets/level3/doll/eye.png');
        this.load.image('doll3eyetop', 'assets/level3/doll/eyetop.png');
        this.load.image('doll3ebrow', 'assets/level3/doll/ebrow.png');
        this.load.spritesheet('doll3eblink', 'assets/level3/doll/eblink.png', {
            frameWidth: 129,
            frameHeight: 51
        });
        this.load.spritesheet('doll3dress', 'assets/level3/doll/dress.png', {
            frameWidth: 255,
            frameHeight: 534
        });
        this.load.spritesheet('doll3hair', 'assets/level3/doll/hair.png', {
            frameWidth: 286,
            frameHeight: 218
        });
        this.load.spritesheet('doll3chain', 'assets/level3/doll/chain.png', {
            frameWidth: 74,
            frameHeight: 76
        });
        this.load.spritesheet('doll3stud', 'assets/level3/doll/stud.png', {
            frameWidth: 159,
            frameHeight: 70
        });
        this.load.spritesheet('doll3topshade', 'assets/level3/doll/topshade.png', {
            frameWidth: 205,
            frameHeight: 241
        });
        this.load.spritesheet('doll3bottomshade', 'assets/level3/doll/bottomshade.png', {
            frameWidth: 175,
            frameHeight: 428
        });
        this.load.spritesheet('doll3dressshade', 'assets/level3/doll/dressshade.png', {
            frameWidth: 228,
            frameHeight: 545
        });
        this.load.spritesheet('doll3bag', 'assets/level3/doll/bag.png', {
            frameWidth: 127,
            frameHeight: 194
        });
        this.load.spritesheet('doll3acc', 'assets/level3/doll/acc.png', {
            frameWidth: 218,
            frameHeight: 164
        });
        this.load.spritesheet('doll3bottom', 'assets/level3/doll/bottom.png', {
            frameWidth: 226,
            frameHeight: 415
        });
        this.load.spritesheet('doll3top', 'assets/level3/doll/top.png', {
            frameWidth: 198,
            frameHeight: 238
        });
        this.load.start();
        level2background.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            level2background.x = safeArea.x - 300
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame6 && donecount == 0) {
                level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 10
            } else {
                level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 180
            }
            fillbackground2.x = safeArea.x - 300
            maskShape1.x = safeArea.x - 300
            maskShape.x = safeArea.x - 300
            yearcontainer.x = safeArea.x
            yearmask1.x = safeArea.x
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function level2start() {
    music.setVolume(1)
    activecat()
    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level2grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 10,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level2dressclickstart1,
            callbackScope: this
        });
    }

    function level2dressclickstart1() {
        level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 10
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
            onComplete: level2dressclickstart,
            callbackScope: this
        });
    }

    function level2dressclickstart() {
        cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        cupboardstart = true
        for (i = 10; i >= 1; i--) {
            game['level2dress' + i].on('pointerover', etopOverFun)
            game['level2dress' + i].on('pointerout', etopOutFun)
            game['level2dress' + i].on('pointerdown', etopFun1)
        }

        function etopOverFun(ev) {
            this.setScale(1.05)
        }

        function etopOutFun(ev) {
            this.setScale(1)
            activecat()
        }

        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr2[0] == parseInt(sno)) {
                doll2dress.setFrame(0)
                doll2dressshade.setFrame(0)
                darr2[0] = 0
                doll2top.setFrame(0)
                doll2topshade.setFrame(0)
                darr2[6] = 0
                doll2bottom.setFrame(0)
                doll2bottomshade.setFrame(0)
                darr2[7] = 0
            } else {
                darr2[0] = parseInt(sno)
                doll2dress.setFrame(parseInt(sno))
                doll2dressshade.setFrame(parseInt(sno))
                doll2top.setFrame(9)
                doll2topshade.setFrame(9)
                darr2[6] = 9
                doll2bottom.setFrame(9)
                doll2bottomshade.setFrame(9)
                darr2[7] = 9
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level2hair' + i].on('pointerover', etopOverFun)
            game['level2hair' + i].on('pointerout', etopOutFun)
            game['level2hair' + i].on('pointerdown', overFun)
        }

        function overFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr2[1] == parseInt(sno)) {
                doll2bhair.setFrame(0)
                doll2hair.setFrame(0)
                darr2[1] = 0
            } else {
                darr2[1] = parseInt(sno)
                doll2bhair.setFrame(parseInt(sno))
                doll2hair.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level2chain' + i].on('pointerover', etopOverFun)
            game['level2chain' + i].on('pointerout', etopOutFun)
            game['level2chain' + i].on('pointerdown', chainFun)
        }

        function chainFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart3 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr2[2] == parseInt(sno)) {
                doll2chain.setFrame(0)
                darr2[2] = 0
            } else {
                darr2[2] = parseInt(sno)
                doll2chain.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level2stud' + i].on('pointerover', etopOverFun)
            game['level2stud' + i].on('pointerout', etopOutFun)
            game['level2stud' + i].on('pointerdown', studFun)
        }

        function studFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr2[3] == parseInt(sno)) {
                doll2stud.setFrame(0)
                darr2[3] = 0
            } else {
                darr2[3] = parseInt(sno)
                doll2stud.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level2acc' + i].on('pointerover', etopOverFun)
            game['level2acc' + i].on('pointerout', etopOutFun)
            game['level2acc' + i].on('pointerdown', bandFun)
        }

        function bandFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr2[4] == parseInt(sno)) {
                doll2acc.setFrame(0)
                darr2[4] = 0
            } else {
                darr2[4] = parseInt(sno)
                doll2acc.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level2bag' + i].on('pointerover', etopOverFun)
            game['level2bag' + i].on('pointerout', etopOutFun)
            game['level2bag' + i].on('pointerdown', bagFun1)
        }

        function bagFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr2[5] == parseInt(sno)) {
                doll2bag.setFrame(0)
                darr2[5] = 0
            } else {
                darr2[5] = parseInt(sno)
                doll2bag.setFrame(parseInt(sno))
            }
            if (darr2[5] > 0) {
                doll2hand.setFrame(1)
            } else {
                doll2hand.setFrame(0)
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level2top' + i].on('pointerover', etopOverFun)
            game['level2top' + i].on('pointerout', etopOutFun)
            game['level2top' + i].on('pointerdown', level2topfun)
        }

        function level2topfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr2[6] == parseInt(sno)) {
                doll2top.setFrame(0)
                doll2topshade.setFrame(0)
                darr2[6] = 0
                doll2dress.setFrame(0)
                doll2dressshade.setFrame(0)
                darr2[0] = 0
            } else {
                darr2[6] = parseInt(sno)
                doll2top.setFrame(parseInt(sno))
                doll2topshade.setFrame(parseInt(sno))
                doll2dress.setFrame(0)
                doll2dressshade.setFrame(0)
                darr2[0] = 0
            }
            if (darr2[7] == 9) {
                doll2bottom.setFrame(0)
                doll2bottomshade.setFrame(0)
                darr2[7] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level2bottom' + i].on('pointerover', etopOverFun)
            game['level2bottom' + i].on('pointerout', etopOutFun)
            game['level2bottom' + i].on('pointerdown', level2bottomfun)
        }

        function level2bottomfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(12)
            if (darr2[7] == parseInt(sno)) {
                doll2bottom.setFrame(0)
                doll2bottomshade.setFrame(0)
                darr2[7] = 0
                doll2dress.setFrame(0)
                doll2dressshade.setFrame(0)
                darr2[0] = 0
            } else {
                darr2[7] = parseInt(sno)
                doll2bottom.setFrame(parseInt(sno))
                doll2bottomshade.setFrame(parseInt(sno))
                doll2dress.setFrame(0)
                doll2dressshade.setFrame(0)
                darr2[0] = 0
            }
            if (darr2[6] == 9) {
                doll2top.setFrame(0)
                doll2topshade.setFrame(0)
                darr2[6] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level2stock' + i].on('pointerstock', etopOverFun)
            game['level2stock' + i].on('pointerout', etopOutFun)
            game['level2stock' + i].on('pointerdown', level2stockfun)
        }

        function level2stockfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr2[8] == parseInt(sno)) {
                doll2stock.setFrame(0)
                darr2[8] = 0
            } else {
                darr2[8] = parseInt(sno)
                doll2stock.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level2glass' + i].on('pointerover', etopOverFun)
            game['level2glass' + i].on('pointerout', etopOutFun)
            game['level2glass' + i].on('pointerdown', glassFun1)
        }

        function glassFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr2[9] == parseInt(sno)) {
                doll2glass.setFrame(0)
                darr2[9] = 0
            } else {
                darr2[9] = parseInt(sno)
                doll2glass.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }

        function btnvisFun() {
            if (loadFinish && done2.visible == false) {
                done2.visible = true
                done2.setScale(0)
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Linear',
                    duration: 500,
                });
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    angle: -360,
                    ease: 'Linear',
                    duration: 500,
                });
            }
        }
    }
    larrow.on('pointerdown', larrowdownstart)

    function larrowdownstart() {
        playsoundeffects('clickss')
        if (game['level2stud' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(2)
            level2text.setFrame(1)
            for (i = 7; i >= 2; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 1].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = true
            }
        } else if (game['level2chain' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(3)
            level2text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2bag' + i].visible = true
            }
        } else if (game['level2bag' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(4)
            level2text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2acc' + i].visible = true
            }
        } else if (game['level2acc' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(5)
            level2text.setFrame(4)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2stock' + i].visible = true
            }
        } else if (game['level2stock' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(6)
            level2text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2glass' + i].visible = true
            }
        } else if (game['level2glass' + 1].visible) {
            level2dots1.visible = false
            level2lable.setFrame(7)
            level2text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i <= 5; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 5; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2hair' + i].visible = true
            }
        } else if (game['level2hair' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(8)
            level2text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level2top' + i].visible = true
            }
        } else if (game['level2top' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(8)
            level2text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level2top' + i].visible = true
            }
        } else if (game['level2top' + 5].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2dots1.setFrame(0)
            level2lable.setFrame(9)
            level2text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level2bottom' + i].visible = true
            }
        } else if (game['level2bottom' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(9)
            level2text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i <= 7; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 5; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 7; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level2bottom' + i].visible = true
            }
        } else if (game['level2bottom' + 5].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(10)
            level2text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(10)
            level2text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 6].visible) {
            level2dots1.setFrame(0)
            level2dots1.visible = true
            level2lable.setFrame(1)
            level2text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 2; i <= 7; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 2; i <= 7; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2stud' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')
        if (game['level2stud' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(10)
            level2text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 6].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(10)
            level2text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2dots1.setFrame(0)
            level2lable.setFrame(9)
            level2text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level2bottom' + i].visible = true
            }
        } else if (game['level2bottom' + 5].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(8)
            level2text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level2bottom' + i].visible = true
            }
        } else if (game['level2bottom' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(7)
            level2text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level2top' + i].visible = true
            }
        } else if (game['level2top' + 5].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(7)
            level2text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level2top' + i].visible = true
            }
        } else if (game['level2top' + 1].visible) {
            level2dots1.visible = false
            level2lable.setFrame(6)
            level2text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2hair' + i].visible = true
            }
        } else if (game['level2hair' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(5)
            level2text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 4; i <= 7; i++) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 4; i <= 7; i++) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2glass' + i].visible = true
            }
        } else if (game['level2glass' + 1].visible) {
            level2lable.setFrame(5)
            level2text.setFrame(4)
            level2dots1.visible = true
            level2dots1.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 2; i >= 1; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 4; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 2; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 4; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2stock' + i].visible = true
            }
        } else if (game['level2stock' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(4)
            level2text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2acc' + i].visible = true
            }
        } else if (game['level2acc' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(3)
            level2text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2bag' + i].visible = true
            }
        } else if (game['level2bag' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(1)
            level2lable.setFrame(2)
            level2text.setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = true
            }
        } else if (game['level2chain' + 1].visible) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.setFrame(1)
            level2text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level2cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level2cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2stud' + i].visible = true
            }
        }
    }

    function activecat() {
        for (i = 1; i <= 10; i++) {
            game['level2dress' + i].alpha = 1
        }
        for (i = 1; i <= 8; i++) {
            game['level2top' + i].alpha = 1
            game['level2bottom' + i].alpha = 1
        }
        for (i = 1; i <= 6; i++) {
            game['level2chain' + i].alpha = 1
            game['level2stud' + i].alpha = 1
            game['level2hair' + i].alpha = 1
            game['level2bag' + i].alpha = 1
            game['level2stock' + i].alpha = 1
            game['level2glass' + i].alpha = 1
            game['level2acc' + i].alpha = 1
        }
        if (darr2[0] > 0 && darr2[0] < 13) {
            game['level2dress' + darr2[0]].alpha = 0.5
        }
        if (darr2[1] > 0 && darr2[1] < 7) {
            game['level2hair' + darr2[1]].alpha = 0.5
        }
        if (darr2[2] > 0) {
            game['level2chain' + darr2[2]].alpha = 0.5
        }
        if (darr2[3] > 0) {
            game['level2stud' + darr2[3]].alpha = 0.5
        }
        if (darr2[5] > 0) {
            game['level2bag' + darr2[5]].alpha = 0.5
        }
        if (darr2[4] > 0) {
            game['level2acc' + darr2[4]].alpha = 0.5
        }
        if (darr2[6] > 0 && darr2[6] < 9) {
            game['level2top' + darr2[6]].alpha = 0.5
        }
        if (darr2[7] > 0 && darr2[7] < 9) {
            game['level2bottom' + darr2[7]].alpha = 0.5
        }
        if (darr2[8] > 0) {
            game['level2stock' + darr2[8]].alpha = 0.5
        }
        if (darr2[9] > 0) {
            game['level2glass' + darr2[9]].alpha = 0.5
        }
    }
    for (i = 7; i >= 1; i--) {
        game['level2cat' + i].on('pointerover', levelcatoverstart)
        game['level2cat' + i].on('pointerout', levelcatoutstart)
        game['level2cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
        activecat()
    }

    function levelcatdownstart(ev) {
        level2dots1.visible = false
        level2dots1.setFrame(0)
        activecat()
        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 7; i++) {
            game['level2cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level2cat' + 1].setFrame(1)
            level2lable.visible = true
            level2lable.setFrame(1)
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2text.setFrame(0)
            for (i = 7; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            level2lable.visible = true
            level2lable.setFrame(1)
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.visible = true
            level2lable.setFrame(3)
            level2text.setFrame(2)
            for (i = 7; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            game['level2cat' + 2].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2bag' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.visible = true
            level2lable.setFrame(5)
            level2text.setFrame(4)
            game['level2cat' + 3].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2stock' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            level2lable.visible = true
            level2lable.setFrame(7)
            level2text.setFrame(6)
            game['level2cat' + 4].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2hair' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2lable.visible = true
            level2lable.setFrame(8)
            level2text.setFrame(7)
            game['level2cat' + 5].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2top' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            level2lable.visible = true
            level2lable.setFrame(9)
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2text.setFrame(9)
            game['level2cat' + 6].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bottom' + i].visible = true
            }
        } else if (parseInt(sno) == 7) {
            level2lable.setFrame(10)
            level2dots1.visible = true
            level2dots1.setFrame(0)
            level2text.setFrame(10)
            game['level2cat' + 7].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level2top' + i].visible = false
                game['level2bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
                game['level2acc' + i].visible = false
                game['level2stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level2dress' + i].visible = true
            }
        }
    }
    done2.on('pointerover', done2overstart)
    done2.on('pointerout', done2outstart)
    done2.on('pointerdown', done2downstart)
    done2.on('pointerup', done2upstart)

    function done2overstart() {
        done2.anims.play('done2')
    }

    function done2outstart() {
        done2.anims.stop('done2')
    }

    function done2upstart() {
        this.setScale(1.05)
    }

    function done2downstart() {
        if (!startgame6 && loadFinish) {
            startgame6 = true
            playsoundeffects('clickss')
            done2.anims.stop('done2')
            done2.setFrame(10)
            if (level == 2) {
                level = 3
            }
            saveFile()
            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level2grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 180,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 180
        playsoundeffects('complete');
        dollgliter.anims.load('dollgliter')
        dollgliter.anims.play('dollgliter')
        dollgliter.on('animationcomplete', dollglitercomplete, this);
    }

    function dollglitercomplete() {
        setTimeout(doneclickstart3, 500)
    }

    function doneclickstart3() {
        transitionIn();
    }
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2bhair,
        y: doll2bhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2head,
        y: doll2head.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2eye,
        y: doll2eye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2eyetop,
        y: doll2eyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2eblink,
        y: doll2eblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2ebrow,
        y: doll2ebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2hair,
        y: doll2hair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2stud,
        y: doll2stud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2acc,
        y: doll2acc.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll2glass,
        y: doll2glass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    doll2eblink.setFrame(esarr[0] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: doll2headanimation11,
        callbackScope: this
    })

    function doll2headanimation11() {
        doll2eblink.setFrame(esarr[0])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: doll2headanimation1,
            callbackScope: this
        })
    }

    function doll2headanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2stud,
            y: doll2stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2bhair,
            y: doll2bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2head,
            y: doll2head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2ebrow,
            y: doll2ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eye,
            y: doll2eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eyetop,
            y: doll2eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eblink,
            y: doll2eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2hair,
            y: doll2hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2acc,
            y: doll2acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2glass,
            y: doll2glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll2eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll2headanimation11,
            callbackScope: this
        })

        function doll2headanimation1() {
            doll2eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll2headanimation1,
                callbackScope: this
            })
        }
    }
}
var startgame7 = false
var btnstart1 = false
var btnstart2 = false
var btnstart3 = false
var btnstart4 = false
var btnstart5 = false
var glowarr = [0, 0, 0, 0]
var donecount = 0
var level3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level3() {
        Phaser.Scene.call(this, {
            key: 'level3'
        });
    },
    preload: function () {
        yearcount1 = 0
        yearcount2 = 0
        yearcount3 = 0
        yearcount4 = 0
        loadFinish = false
        pageNo = 7
        settingval = false
        startgame7 = false
        btnstart1 = false
        btnstart2 = false
        btnstart3 = false
        btnstart4 = false
        btnstart5 = false
        glowarr = [0, 0, 0, 0]
        cupboardstart = false
        dollIn = true
        donecount = 0
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        level3background = this.add.image(0, 0, 'level3background').setOrigin(0, 0)
        level3panel = this.add.sprite(464, 0, 'level1panel').setOrigin(0, 0)
        level3lable = this.add.sprite(459, 34, 'level1lable').setOrigin(0, 0)
        level3dots1 = this.add.sprite(608, 470, 'level1dots1').setOrigin(0, 0)
        level3text = this.add.sprite(569, 503, 'level1text').setOrigin(0, 0)
        level3dots1.visible = false
        level3dots1.setFrame(0)
        level3lable.setFrame(1)
        var edrxrr = [, 640, 573, 707, 573, 707, 640, 573, 707, 573, 707]
        var edryrr = [, 151.5, 281.5, 281.5, 411.5, 411.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 10; i >= 1; i--) {
            game['level3dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level3dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3dress' + i].visible = false;
        }
        var estbaxrr = [, 573, 707, 573, 707, 573, 707]
        var estbayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level3bag' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level3bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3bag' + i].visible = false;
        }
        var estbaxrr = [, 573, 707, 573, 707, 573, 707]
        var estbayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level3stock' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level3stock' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3stock' + i].visible = false;
        }
        var ehaxrr = [, 573, 707, 573, 707, 573, 707]
        var ehayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level3hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level3hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3hair' + i].visible = false;
        }
        var ebgaxrr = [, 573, 707, 573, 707, 573, 707]
        var ebgayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level3chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level3chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3chain' + i].visible = false
        }
        var estaxrr = [, 573, 707, 573, 707, 573, 707]
        var estayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level3stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level3stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3stud' + i].visible = false;
        }
        var bandxrr = [, 573, 707, 573, 707, 573, 707]
        var bandyrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level3acc' + i] = this.add.sprite(bandxrr[i], bandyrr[i], 'level3acc' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3acc' + i].visible = false;
        }
        var glassxrr = [, 573, 707, 573, 707, 573, 707]
        var glassyrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level3glass' + i] = this.add.sprite(glassxrr[i], glassyrr[i], 'level3glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3glass' + i].visible = false;
        }
        var totgaxrr = [, 573, 707, 573, 707, 573, 707, 573, 707]
        var totgayrr = [, 195.5, 195.5, 349.5, 349.5, 195.5, 195.5, 349.5, 349.5]
        for (i = 8; i >= 1; i--) {
            game['level3top' + i] = this.add.sprite(totgaxrr[i], totgayrr[i], 'level3top' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3top' + i].visible = false;
        }
        var bottgaxrr = [, 573, 707, 573, 707, 573, 707, 573, 707]
        var bottgayrr = [, 195.5, 195.5, 349.5, 349.5, 195.5, 195.5, 349.5, 349.5]
        for (i = 8; i >= 1; i--) {
            game['level3bottom' + i] = this.add.sprite(bottgaxrr[i], bottgayrr[i], 'level3bottom' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3bottom' + i].visible = false;
        }
        var cdaxrr = [, 407, 407, 407, 407, 407, 407, 407]
        var cdayrr = [, 84, 139, 194, 250, 305, 361, 416]
        for (i = 7; i >= 1; i--) {
            game['level3cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level3cat' + i].x += parseFloat(game['level3cat' + i].width / 2)
            game['level3cat' + i].y += parseFloat(game['level3cat' + i].height / 2)
        }
        for (i = 6; i >= 1; i--) {
            game['level3stud' + i].visible = true
        }
        level3dots1.visible = false
        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        doll3bacc = this.add.sprite(414, 104, 'doll3bacc').setOrigin(0, 0)
        doll3bhair = this.add.sprite(323, 48, 'doll3bhair').setOrigin(0.5, 0)
        doll3bhair.x += parseFloat(doll3bhair.width / 2)
        doll3body = this.add.sprite(406, 191, 'doll3body').setOrigin(0, 0)
        doll3head = this.add.sprite(438, 87, 'doll3head').setOrigin(0, 0)
        doll3ebrow = this.add.sprite(446, 125, 'doll3ebrow').setOrigin(0, 0)
        doll3eyetop = this.add.sprite(455, 134, 'doll3eyetop').setOrigin(0, 0)
        doll3eye = this.add.sprite(464, 144, 'doll3eye').setOrigin(0, 0)
        doll3eblink = this.add.sprite(450, 138, 'doll3eblink').setOrigin(0, 0)
        doll3hand = this.add.sprite(388, 219, 'doll3hand').setOrigin(0, 0)
        doll3dressshade = this.add.sprite(402, 202, 'doll3dressshade').setOrigin(0, 0)
        doll3bottomshade = this.add.sprite(429, 309, 'doll3bottomshade').setOrigin(0, 0)
        doll3topshade = this.add.sprite(404, 203, 'doll3topshade').setOrigin(0, 0)
        doll3stock = this.add.sprite(441, 409, 'doll3stock').setOrigin(0, 0)
        doll3dress = this.add.sprite(389, 205, 'doll3dress').setOrigin(0, 0)
        doll3bottom = this.add.sprite(407, 310, 'doll3bottom').setOrigin(0, 0)
        doll3top = this.add.sprite(412, 197, 'doll3top').setOrigin(0, 0)
        doll3chain = this.add.sprite(477, 221, 'doll3chain').setOrigin(0, 0)
        doll3bag = this.add.sprite(368, 239, 'doll3bag').setOrigin(0, 0)
        doll3hair = this.add.sprite(373, 9, 'doll3hair').setOrigin(0, 0)
        doll3glass = this.add.sprite(444, 129, 'doll3glass').setOrigin(0, 0)
        doll3acc = this.add.sprite(402, 28, 'doll3acc').setOrigin(0, 0)
        doll3stud = this.add.sprite(436, 160, 'doll3stud').setOrigin(0, 0)
        level3grp = this.add.container()
        level3grp.add(doll3bacc)
        level3grp.add(doll3bhair)
        level3grp.add(doll3body)
        level3grp.add(doll3head)
        level3grp.add(doll3eye)
        level3grp.add(doll3eyetop)
        level3grp.add(doll3ebrow)
        level3grp.add(doll3eblink)
        level3grp.add(doll3hand)
        level3grp.add(doll3dressshade)
        level3grp.add(doll3bottomshade)
        level3grp.add(doll3topshade)
        level3grp.add(doll3stock)
        level3grp.add(doll3dress)
        level3grp.add(doll3bottom)
        level3grp.add(doll3top)
        level3grp.add(doll3chain)
        level3grp.add(doll3bag)
        level3grp.add(doll3hair)
        level3grp.add(doll3glass)
        level3grp.add(doll3acc)
        level3grp.add(doll3stud)
        level3grp.x = -1000
        doll3eblink.setFrame(esarr[0])
        doll3dress.setFrame(darr3[0])
        doll3dressshade.setFrame(darr3[0])
        doll3hair.setFrame(darr3[1])
        doll3bhair.setFrame(darr3[1])
        doll3chain.setFrame(darr3[2])
        doll3stud.setFrame(darr3[3])
        doll3bag.setFrame(darr3[5])
        doll3acc.setFrame(darr3[4])
        doll3bacc.setFrame(darr3[4])
        doll3top.setFrame(darr3[6])
        doll3topshade.setFrame(darr3[6])
        doll3bottom.setFrame(darr3[7])
        doll3bottomshade.setFrame(darr3[7])
        doll3stock.setFrame(darr3[8])
        doll3glass.setFrame(darr3[9])
        if (darr3[5] > 0) {
            doll3hand.setFrame(1)
        } else {
            doll3hand.setFrame(0)
        }
        if (darr3[4] == 4 && darr3[1] == 0) {
            doll3bhair.setFrame(7)
        } else {
            doll3bhair.setFrame(darr3[1])
        }
        if (darr3[4] == 4) {
            doll3hair.setFrame(darr3[1] + 7)
        } else {
            doll3hair.setFrame(darr3[1])
        }
        doll3bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level3dressdollanimation1,
            callbackScope: this
        })

        function level3dressdollanimation1() {
            level3grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level3grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level3grp,
                y: level3grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level3dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eye,
            x: 465,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll3eyestart1,
            callbackScope: this
        });

        function doll3eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 464,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll3eyestart2,
                callbackScope: this
            });
        }

        function doll3eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 463,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll3eyestart3,
                callbackScope: this
            });
        }

        function doll3eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 464,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll3eyestart4,
                callbackScope: this
            });
        }

        function doll3eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 465,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll3eyestart1,
                callbackScope: this
            });
        }
        cupboardgroup = this.add.container()
        cupboardgroup.add(level3panel)
        cupboardgroup.add(level3dots1)
        cupboardgroup.add(level3lable)
        cupboardgroup.add(level3text)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level3dress' + i])
        }
        for (i = 8; i >= 1; i--) {
            cupboardgroup.add(game['level3top' + i])
            cupboardgroup.add(game['level3bottom' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level3chain' + i])
            cupboardgroup.add(game['level3stud' + i])
            cupboardgroup.add(game['level3glass' + i])
            cupboardgroup.add(game['level3bag' + i])
            cupboardgroup.add(game['level3hair' + i])
            cupboardgroup.add(game['level3acc' + i])
            cupboardgroup.add(game['level3stock' + i])
        }
        for (i = 7; i >= 1; i--) {
            cupboardgroup.add(game['level3cat' + i])
        }
        level3dots1.visible = true
        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
        game['level3cat' + 1].setFrame(1)
        rarrow = this.add.sprite(525.85, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(744.5, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            x: rarrow.x + 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            x: larrow.x - 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        rarrow.visible = true
        larrow.visible = true
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        dressgliter = this.add.sprite(520.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(510, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(420.4, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'done2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('done2', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        done2.anims.load('done2')
        level3grp.add(dressgliter)
        level3grp.add(dollgliter)
        cupboardgroup.add(done2)
        done2.visible = false
        logomutefun()
        maskShape1 = this.add.graphics();
        maskShape1.fillStyle(0xffffff, 1);
        maskShape1.fillRect(0, 0, 1400, 600);
        maskShape1.x = safeArea.x - 300
        fillbackground2 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground2.alpha = 0
        fillbackground2.x = safeArea.x - 300
        maskShape = this.add.graphics();
        maskShape.fillStyle(0x000000, 1);
        maskShape.fillRect(0, 0, 1400, 600);
        maskShape.x = safeArea.x - 300
        maskShape.alpha = 0
        game.scene.scenes[pageNo].tweens.add({
            targets: fillbackground2,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: maskShape,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        yearval1 = this.add.image(273, 248, 'yearno');
        yearval1.setOrigin(0, 0)
        yearval11 = this.add.image(273, 346, 'yearno');
        yearval11.setOrigin(0, 0)
        yearval2 = this.add.image(334, 248, 'yearno');
        yearval2.setOrigin(0, 0)
        yearval22 = this.add.image(334, 346, 'yearno');
        yearval22.setOrigin(0, 0)
        yearval3 = this.add.image(395, 248, 'yearno');
        yearval3.setOrigin(0, 0)
        yearval33 = this.add.image(395, 346, 'yearno');
        yearval33.setOrigin(0, 0)
        yearval4 = this.add.image(456, 248, 'yearno');
        yearval4.setOrigin(0, 0)
        yearval44 = this.add.image(456, 346, 'yearno');
        yearval44.setOrigin(0, 0)
        yearcontainer = this.add.container()
        yearcontainer.add(yearval1)
        yearcontainer.add(yearval11)
        yearcontainer.add(yearval2)
        yearcontainer.add(yearval22)
        yearcontainer.add(yearval3)
        yearcontainer.add(yearval33)
        yearcontainer.add(yearval4)
        yearcontainer.add(yearval44)
        yearcontainer.x = safeArea.x
        yearmask1 = this.make.graphics();
        yearmask1.fillStyle(0xff0000, 0.5);
        yearmask1.fillRect(269, 240, 255, 95);
        yearmask1.x = safeArea.x
        yearcontainer.mask = new Phaser.Display.Masks.GeometryMask(yearcontainer, yearmask1);
        setTimeout(yeartimer1, 1)

        function yeartimer1() {
            setTimeout(yearsound111, 300)

            function yearsound111() {
                playsoundeffects('yearsound')
            }
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 500,
                onComplete: yeartimer2
            });
        }

        function yeartimer2() {
            yearval1.y = 330
            yearval11.y = 273
            if (yearcount1 <= 0) {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: yeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: 154,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function yeartimer3() {
            yearcount1 = yearcount1 + 1
            yearval1.y = 273
            yearval11.y = 330
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: yeartimer2
            });
        }
        setTimeout(ayeartimer1, 1)

        function ayeartimer1() {
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 600,
                onComplete: ayeartimer2
            });
        }

        function ayeartimer2() {
            yearval2.y = 330
            yearval22.y = 273
            if (yearcount2 < 1) {
                a2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: ayeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -614,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function ayeartimer3() {
            yearcount2 = yearcount2 + 1
            yearval2.y = 273
            yearval22.y = 330
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: ayeartimer2
            });
        }
        setTimeout(byeartimer1, 1)

        function byeartimer1() {
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }

        function byeartimer2() {
            yearval3.y = 330
            yearval33.y = 273
            if (yearcount3 < 1) {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: byeartimer3
                });
            } else {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -422,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function byeartimer3() {
            yearcount3 = yearcount3 + 1
            yearval3.y = 273
            yearval33.y = 330
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }
        setTimeout(cyeartimer1, 1)

        function cyeartimer1() {
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 800,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer2() {
            yearval4.y = 330
            yearval44.y = 273
            if (yearcount4 < 1) {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: cyeartimer3
                });
            } else {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: 250,
                    ease: 'Linear',
                    duration: 150,
                    onComplete: cyeartimer4
                });
            }
        }

        function cyeartimer3() {
            yearcount4 = yearcount4 + 1
            yearval4.y = 273
            yearval44.y = 330
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval11,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval22,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval33,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval44,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: fillbackground2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
                onComplete: level3start
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
        }
        this.load.on('complete', function () {
            loadFinish = true;
        });
        //doll4
        this.load.spritesheet('doll4bhair', 'assets/level4/doll/bhair.png', {
            frameWidth: 229,
            frameHeight: 301
        });
        this.load.image('doll4body', 'assets/level4/doll/body.png');
        this.load.image('doll4head', 'assets/level4/doll/head.png');
        this.load.image('doll4eye', 'assets/level4/doll/eye.png');
        this.load.image('doll4eyetop', 'assets/level4/doll/eyetop.png');
        this.load.image('doll4ebrow', 'assets/level4/doll/ebrow.png');
        this.load.spritesheet('doll4eblink', 'assets/level4/doll/eblink.png', {
            frameWidth: 129,
            frameHeight: 51
        });
        this.load.spritesheet('doll4dress', 'assets/level4/doll/dress.png', {
            frameWidth: 237,
            frameHeight: 439
        });
        this.load.spritesheet('doll4hair', 'assets/level4/doll/hair.png', {
            frameWidth: 223,
            frameHeight: 285
        });
        this.load.spritesheet('doll4chain', 'assets/level4/doll/chain.png', {
            frameWidth: 88,
            frameHeight: 75
        });
        this.load.spritesheet('doll4stud', 'assets/level4/doll/stud.png', {
            frameWidth: 166,
            frameHeight: 69
        });
        this.load.spritesheet('doll4top', 'assets/level4/doll/top.png', {
            frameWidth: 192,
            frameHeight: 164
        });
        this.load.spritesheet('doll4topshade', 'assets/level4/doll/topshade.png', {
            frameWidth: 236,
            frameHeight: 237
        });
        this.load.spritesheet('doll4bottomshade', 'assets/level4/doll/bottomshade.png', {
            frameWidth: 132,
            frameHeight: 406
        });
        this.load.spritesheet('doll4dressshade', 'assets/level4/doll/dressshade.png', {
            frameWidth: 242,
            frameHeight: 442
        });
        this.load.spritesheet('doll4stock', 'assets/level4/doll/stock.png', {
            frameWidth: 158,
            frameHeight: 363
        });
        this.load.spritesheet('doll4glass', 'assets/level4/doll/glass.png', {
            frameWidth: 135,
            frameHeight: 71
        });
        this.load.spritesheet('doll4bottom', 'assets/level4/doll/bottom.png', {
            frameWidth: 215,
            frameHeight: 397
        });
        this.load.spritesheet('doll4bag', 'assets/level4/doll/bag.png', {
            frameWidth: 136,
            frameHeight: 167
        });
        this.load.spritesheet('doll4tophand', 'assets/level4/doll/tophand.png', {
            frameWidth: 93,
            frameHeight: 133
        });
        this.load.spritesheet('doll4acc', 'assets/level4/doll/acc.png', {
            frameWidth: 189,
            frameHeight: 128
        });
        this.load.spritesheet('doll4bacc', 'assets/level4/doll/bacc.png', {
            frameWidth: 194,
            frameHeight: 70
        });
        this.load.spritesheet('doll4hand', 'assets/level4/doll/hand.png', {
            frameWidth: 94,
            frameHeight: 101
        });
        this.load.start();
        level3background.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            level3background.x = safeArea.x - 300
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame7 && donecount == 0) {
                level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 280
            } else {
                level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 80
            }
            fillbackground2.x = safeArea.x - 300
            maskShape1.x = safeArea.x - 300
            maskShape.x = safeArea.x - 300
            yearcontainer.x = safeArea.x
            yearmask1.x = safeArea.x
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function level3start() {
    music.setVolume(1)
    activecat()
    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level3grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 280,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level3dressclickstart1,
            callbackScope: this
        });
    }

    function level3dressclickstart1() {
        level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 280
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
            onComplete: level3dressclickstart,
            callbackScope: this
        });
    }

    function level3dressclickstart() {
        cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        cupboardstart = true
        for (i = 10; i >= 1; i--) {
            game['level3dress' + i].on('pointerover', etopOverFun)
            game['level3dress' + i].on('pointerout', etopOutFun)
            game['level3dress' + i].on('pointerdown', etopFun1)
        }

        function etopOverFun(ev) {
            this.setScale(1.05)
        }

        function etopOutFun(ev) {
            this.setScale(1)
            activecat()
        }

        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr3[0] == parseInt(sno)) {
                doll3dress.setFrame(0)
                doll3dressshade.setFrame(0)
                darr3[0] = 0
                doll3top.setFrame(0)
                doll3topshade.setFrame(0)
                darr3[6] = 0
                doll3bottom.setFrame(0)
                doll3bottomshade.setFrame(0)
                darr3[7] = 0
            } else {
                darr3[0] = parseInt(sno)
                doll3dress.setFrame(parseInt(sno))
                doll3dressshade.setFrame(parseInt(sno))
                doll3top.setFrame(9)
                doll3topshade.setFrame(9)
                darr3[6] = 9
                doll3bottom.setFrame(9)
                doll3bottomshade.setFrame(9)
                darr3[7] = 9
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level3hair' + i].on('pointerover', etopOverFun)
            game['level3hair' + i].on('pointerout', etopOutFun)
            game['level3hair' + i].on('pointerdown', overFun)
        }

        function overFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr3[1] == parseInt(sno)) {
                doll3bhair.setFrame(0)
                doll3hair.setFrame(0)
                darr3[1] = 0
            } else {
                darr3[1] = parseInt(sno)
                doll3bhair.setFrame(parseInt(sno))
                doll3hair.setFrame(parseInt(sno))
            }
            if (darr3[4] == 4 && darr3[1] == 0) {
                doll3bhair.setFrame(7)
            } else {
                doll3bhair.setFrame(darr3[1])
            }
            if (darr3[4] == 4) {
                doll3hair.setFrame(darr3[1] + 7)
            } else {
                doll3hair.setFrame(darr3[1])
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level3chain' + i].on('pointerover', etopOverFun)
            game['level3chain' + i].on('pointerout', etopOutFun)
            game['level3chain' + i].on('pointerdown', chainFun)
        }

        function chainFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart3 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr3[2] == parseInt(sno)) {
                doll3chain.setFrame(0)
                darr3[2] = 0
            } else {
                darr3[2] = parseInt(sno)
                doll3chain.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level3stud' + i].on('pointerover', etopOverFun)
            game['level3stud' + i].on('pointerout', etopOutFun)
            game['level3stud' + i].on('pointerdown', studFun)
        }

        function studFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr3[3] == parseInt(sno)) {
                doll3stud.setFrame(0)
                darr3[3] = 0
            } else {
                darr3[3] = parseInt(sno)
                doll3stud.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level3acc' + i].on('pointerover', etopOverFun)
            game['level3acc' + i].on('pointerout', etopOutFun)
            game['level3acc' + i].on('pointerdown', bandFun)
        }

        function bandFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr3[4] == parseInt(sno)) {
                doll3acc.setFrame(0)
                doll3bacc.setFrame(0)
                darr3[4] = 0
            } else {
                darr3[4] = parseInt(sno)
                doll3acc.setFrame(parseInt(sno))
                doll3bacc.setFrame(parseInt(sno))
            }
            if (darr3[4] == 4 && darr3[1] == 0) {
                doll3bhair.setFrame(7)
            } else {
                doll3bhair.setFrame(darr3[1])
            }
            if (darr3[4] == 4) {
                doll3hair.setFrame(darr3[1] + 7)
            } else {
                doll3hair.setFrame(darr3[1])
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level3bag' + i].on('pointerover', etopOverFun)
            game['level3bag' + i].on('pointerout', etopOutFun)
            game['level3bag' + i].on('pointerdown', bagFun1)
        }

        function bagFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr3[5] == parseInt(sno)) {
                doll3bag.setFrame(0)
                darr3[5] = 0
            } else {
                darr3[5] = parseInt(sno)
                doll3bag.setFrame(parseInt(sno))
            }
            if (darr3[5] > 0) {
                doll3hand.setFrame(1)
            } else {
                doll3hand.setFrame(0)
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level3top' + i].on('pointerover', etopOverFun)
            game['level3top' + i].on('pointerout', etopOutFun)
            game['level3top' + i].on('pointerdown', level3topfun)
        }

        function level3topfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr3[6] == parseInt(sno)) {
                doll3top.setFrame(0)
                doll3topshade.setFrame(0)
                darr3[6] = 0
            } else {
                darr3[6] = parseInt(sno)
                doll3top.setFrame(parseInt(sno))
                doll3topshade.setFrame(parseInt(sno))
                doll3dress.setFrame(0)
                doll3dressshade.setFrame(0)
                darr3[0] = 0
            }
            if (darr3[7] == 9) {
                doll3bottom.setFrame(0)
                doll3bottomshade.setFrame(0)
                darr3[7] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level3bottom' + i].on('pointerover', etopOverFun)
            game['level3bottom' + i].on('pointerout', etopOutFun)
            game['level3bottom' + i].on('pointerdown', level3bottomfun)
        }

        function level3bottomfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(12)
            if (darr3[7] == parseInt(sno)) {
                doll3bottom.setFrame(0)
                doll3bottomshade.setFrame(0)
                darr3[7] = 0
            } else {
                darr3[7] = parseInt(sno)
                doll3bottom.setFrame(parseInt(sno))
                doll3bottomshade.setFrame(parseInt(sno))
                doll3dress.setFrame(0)
                doll3dressshade.setFrame(0)
                darr3[0] = 0
            }
            if (darr3[6] == 9) {
                doll3top.setFrame(0)
                doll3topshade.setFrame(0)
                darr3[6] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level3stock' + i].on('pointerover', etopOverFun)
            game['level3stock' + i].on('pointerout', etopOutFun)
            game['level3stock' + i].on('pointerdown', level3stockfun)
        }

        function level3stockfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr3[8] == parseInt(sno)) {
                doll3stock.setFrame(0)
                darr3[8] = 0
            } else {
                darr3[8] = parseInt(sno)
                doll3stock.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level3glass' + i].on('pointerover', etopOverFun)
            game['level3glass' + i].on('pointerout', etopOutFun)
            game['level3glass' + i].on('pointerdown', glassFun1)
        }

        function glassFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr3[9] == parseInt(sno)) {
                doll3glass.setFrame(0)
                darr3[9] = 0
            } else {
                darr3[9] = parseInt(sno)
                doll3glass.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }

        function btnvisFun() {
            if (loadFinish && done2.visible == false) {
                done2.visible = true
                done2.setScale(0)
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Linear',
                    duration: 500,
                });
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    angle: -360,
                    ease: 'Linear',
                    duration: 500,
                });
            }
        }
    }
    larrow.on('pointerdown', larrowdownstart)

    function larrowdownstart() {
        playsoundeffects('clickss')
        if (game['level3stud' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(2)
            level3text.setFrame(1)
            for (i = 7; i >= 2; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 1].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = true
            }
        } else if (game['level3chain' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(3)
            level3text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3bag' + i].visible = true
            }
        } else if (game['level3bag' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(4)
            level3text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3acc' + i].visible = true
            }
        } else if (game['level3acc' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(5)
            level3text.setFrame(4)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3stock' + i].visible = true
            }
        } else if (game['level3stock' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(6)
            level3text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3glass' + i].visible = true
            }
        } else if (game['level3glass' + 1].visible) {
            level3dots1.visible = false
            level3lable.setFrame(7)
            level3text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i <= 5; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 5; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3hair' + i].visible = true
            }
        } else if (game['level3hair' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(8)
            level3text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level3top' + i].visible = true
            }
        } else if (game['level3top' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(8)
            level3text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level3top' + i].visible = true
            }
        } else if (game['level3top' + 5].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3dots1.setFrame(0)
            level3lable.setFrame(9)
            level3text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level3bottom' + i].visible = true
            }
        } else if (game['level3bottom' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(9)
            level3text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i <= 7; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 5; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 7; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level3bottom' + i].visible = true
            }
        } else if (game['level3bottom' + 5].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(10)
            level3text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(10)
            level3text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 6].visible) {
            level3dots1.setFrame(0)
            level3dots1.visible = true
            level3lable.setFrame(1)
            level3text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 2; i <= 7; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 2; i <= 7; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3stud' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')
        if (game['level3stud' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(10)
            level3text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 6].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(10)
            level3text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(9)
            level3text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level3bottom' + i].visible = true
            }
        } else if (game['level3bottom' + 5].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(8)
            level3text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level3bottom' + i].visible = true
            }
        } else if (game['level3bottom' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(7)
            level3text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level3top' + i].visible = true
            }
        } else if (game['level3top' + 5].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(7)
            level3text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level3top' + i].visible = true
            }
        } else if (game['level3top' + 1].visible) {
            level3dots1.visible = false
            level3lable.setFrame(6)
            level3text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3hair' + i].visible = true
            }
        } else if (game['level3hair' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(5)
            level3text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 4; i <= 7; i++) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 4; i <= 7; i++) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3glass' + i].visible = true
            }
        } else if (game['level3glass' + 1].visible) {
            level3lable.setFrame(5)
            level3text.setFrame(4)
            level3dots1.visible = true
            level3dots1.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 2; i >= 1; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 4; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 2; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 4; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3stock' + i].visible = true
            }
        } else if (game['level3stock' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(4)
            level3text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3acc' + i].visible = true
            }
        } else if (game['level3acc' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(3)
            level3text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3bag' + i].visible = true
            }
        } else if (game['level3bag' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(1)
            level3lable.setFrame(2)
            level3text.setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = true
            }
        } else if (game['level3chain' + 1].visible) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.setFrame(1)
            level3text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level3cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level3cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3stud' + i].visible = true
            }
        }
    }

    function activecat() {
        for (i = 1; i <= 10; i++) {
            game['level3dress' + i].alpha = 1
        }
        for (i = 1; i <= 8; i++) {
            game['level3top' + i].alpha = 1
            game['level3bottom' + i].alpha = 1
        }
        for (i = 1; i <= 6; i++) {
            game['level3chain' + i].alpha = 1
            game['level3stud' + i].alpha = 1
            game['level3hair' + i].alpha = 1
            game['level3bag' + i].alpha = 1
            game['level3stock' + i].alpha = 1
            game['level3glass' + i].alpha = 1
            game['level3acc' + i].alpha = 1
        }
        if (darr3[0] > 0 && darr3[0] < 13) {
            game['level3dress' + darr3[0]].alpha = 0.5
        }
        if (darr3[1] > 0 && darr3[1] < 7) {
            game['level3hair' + darr3[1]].alpha = 0.5
        }
        if (darr3[2] > 0) {
            game['level3chain' + darr3[2]].alpha = 0.5
        }
        if (darr3[3] > 0) {
            game['level3stud' + darr3[3]].alpha = 0.5
        }
        if (darr3[5] > 0) {
            game['level3bag' + darr3[5]].alpha = 0.5
        }
        if (darr3[4] > 0) {
            game['level3acc' + darr3[4]].alpha = 0.5
        }
        if (darr3[6] > 0 && darr3[6] < 9) {
            game['level3top' + darr3[6]].alpha = 0.5
        }
        if (darr3[7] > 0 && darr3[7] < 9) {
            game['level3bottom' + darr3[7]].alpha = 0.5
        }
        if (darr3[8] > 0) {
            game['level3stock' + darr3[8]].alpha = 0.5
        }
        if (darr3[9] > 0) {
            game['level3glass' + darr3[9]].alpha = 0.5
        }
    }
    for (i = 7; i >= 1; i--) {
        game['level3cat' + i].on('pointerover', levelcatoverstart)
        game['level3cat' + i].on('pointerout', levelcatoutstart)
        game['level3cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
        activecat()
    }

    function levelcatdownstart(ev) {
        level3dots1.visible = false
        level3dots1.setFrame(0)
        activecat()
        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 7; i++) {
            game['level3cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level3cat' + 1].setFrame(1)
            level3lable.visible = true
            level3lable.setFrame(1)
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3text.setFrame(0)
            for (i = 7; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            level3lable.visible = true
            level3lable.setFrame(1)
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.visible = true
            level3lable.setFrame(3)
            level3text.setFrame(2)
            for (i = 7; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            game['level3cat' + 2].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3bag' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.visible = true
            level3lable.setFrame(5)
            level3text.setFrame(4)
            game['level3cat' + 3].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3stock' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            level3lable.visible = true
            level3lable.setFrame(7)
            level3text.setFrame(6)
            game['level3cat' + 4].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3hair' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3lable.visible = true
            level3lable.setFrame(8)
            level3text.setFrame(7)
            game['level3cat' + 5].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3top' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            level3lable.visible = true
            level3lable.setFrame(9)
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3text.setFrame(9)
            game['level3cat' + 6].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3bottom' + i].visible = true
            }
        } else if (parseInt(sno) == 7) {
            level3lable.setFrame(10)
            level3dots1.visible = true
            level3dots1.setFrame(0)
            level3text.setFrame(10)
            game['level3cat' + 7].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level3cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level3top' + i].visible = false
                game['level3bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3chain' + i].visible = false
                game['level3stud' + i].visible = false
                game['level3hair' + i].visible = false
                game['level3bag' + i].visible = false
                game['level3glass' + i].visible = false
                game['level3acc' + i].visible = false
                game['level3stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level3dress' + i].visible = true
            }
        }
    }
    done2.on('pointerover', done2overstart)
    done2.on('pointerout', done2outstart)
    done2.on('pointerdown', done2downstart)
    done2.on('pointerup', done2upstart)

    function done2overstart() {
        done2.anims.play('done2')
    }

    function done2outstart() {
        done2.anims.stop('done2')
    }

    function done2upstart() {
        this.setScale(1.05)
    }

    function done2downstart() {
        if (!startgame7 && loadFinish) {
            startgame7 = true
            playsoundeffects('clickss')
            done2.anims.stop('done2')
            done2.setFrame(10)
            if (level == 3) {
                level = 4
            }
            saveFile()
            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level3grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 80,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 80
        playsoundeffects('complete');
        dollgliter.anims.load('dollgliter')
        dollgliter.anims.play('dollgliter')
        dollgliter.on('animationcomplete', dollglitercomplete, this);
    }

    function dollglitercomplete() {
        setTimeout(doneclickstart3, 500)
    }

    function doneclickstart3() {
        transitionIn();
    }
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3bhair,
        y: doll3bhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3head,
        y: doll3head.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3eye,
        y: doll3eye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3eyetop,
        y: doll3eyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3eblink,
        y: doll3eblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3ebrow,
        y: doll3ebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3hair,
        y: doll3hair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3stud,
        y: doll3stud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3acc,
        y: doll3acc.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3bacc,
        y: doll3bacc.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll3glass,
        y: doll3glass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    doll3eblink.setFrame(esarr[0] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: doll3headanimation11,
        callbackScope: this
    })

    function doll3headanimation11() {
        doll3eblink.setFrame(esarr[0])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: doll3headanimation1,
            callbackScope: this
        })
    }

    function doll3headanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3stud,
            y: doll3stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3acc,
            y: doll3acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3bacc,
            y: doll3bacc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3bhair,
            y: doll3bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3head,
            y: doll3head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3ebrow,
            y: doll3ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eye,
            y: doll3eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eyetop,
            y: doll3eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eblink,
            y: doll3eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3hair,
            y: doll3hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3glass,
            y: doll3glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll3eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll3headanimation11,
            callbackScope: this
        })

        function doll3headanimation1() {
            doll3eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll3headanimation1,
                callbackScope: this
            })
        }
    }
}
var startgame8 = false
var btnstart1 = false
var btnstart2 = false
var btnstart3 = false
var btnstart4 = false
var btnstart5 = false
var glowarr = [0, 0, 0, 0]
var donecount = 0
var level4 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level4() {
        Phaser.Scene.call(this, {
            key: 'level4'
        });
    },
    preload: function () {
        yearcount1 = 0
        yearcount2 = 0
        yearcount3 = 0
        yearcount4 = 0
        loadFinish = false
        pageNo = 8
        settingval = false
        startgame8 = false
        btnstart1 = false
        btnstart2 = false
        btnstart3 = false
        btnstart4 = false
        btnstart5 = false
        glowarr = [0, 0, 0, 0]
        cupboardstart = false
        dollIn = true
        donecount = 0
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        level4background = this.add.image(0, 0, 'level4background').setOrigin(0, 0)
        level4panel = this.add.sprite(464, 0, 'level1panel').setOrigin(0, 0)
        level4lable = this.add.sprite(459, 34, 'level1lable').setOrigin(0, 0)
        level4dots1 = this.add.sprite(608, 470, 'level1dots1').setOrigin(0, 0)
        level4text = this.add.sprite(569, 503, 'level1text').setOrigin(0, 0)
        level4dots1.visible = false
        level4dots1.setFrame(0)
        level4lable.setFrame(1)
        var edrxrr = [, 640, 573, 707, 573, 707, 640, 573, 707, 573, 707]
        var edryrr = [, 151.5, 281.5, 281.5, 411.5, 411.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 10; i >= 1; i--) {
            game['level4dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level4dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4dress' + i].visible = false;
        }
        var estbaxrr = [, 573, 707, 573, 707, 573, 707]
        var estbayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level4bag' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level4bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4bag' + i].visible = false;
        }
        var estbaxrr = [, 573, 707, 573, 707, 573, 707]
        var estbayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level4stock' + i] = this.add.sprite(estbaxrr[i], estbayrr[i], 'level4stock' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4stock' + i].visible = false;
        }
        var ehaxrr = [, 573, 707, 573, 707, 573, 707]
        var ehayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level4hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level4hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4hair' + i].visible = false;
        }
        var ebgaxrr = [, 573, 707, 573, 707, 573, 707]
        var ebgayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level4chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level4chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4chain' + i].visible = false
        }
        var estaxrr = [, 573, 707, 573, 707, 573, 707]
        var estayrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level4stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level4stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4stud' + i].visible = false;
        }
        var bandxrr = [, 573, 707, 573, 707, 573, 707]
        var bandyrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level4acc' + i] = this.add.sprite(bandxrr[i], bandyrr[i], 'level4acc' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4acc' + i].visible = false;
        }
        var glassxrr = [, 573, 707, 573, 707, 573, 707]
        var glassyrr = [, 151.5, 151.5, 281.5, 281.5, 411.5, 411.5]
        for (i = 6; i >= 1; i--) {
            game['level4glass' + i] = this.add.sprite(glassxrr[i], glassyrr[i], 'level4glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4glass' + i].visible = false;
        }
        var totgaxrr = [, 573, 707, 573, 707, 573, 707, 573, 707]
        var totgayrr = [, 195.5, 195.5, 349.5, 349.5, 195.5, 195.5, 349.5, 349.5]
        for (i = 8; i >= 1; i--) {
            game['level4top' + i] = this.add.sprite(totgaxrr[i], totgayrr[i], 'level4top' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4top' + i].visible = false;
        }
        var bottgaxrr = [, 573, 707, 573, 707, 573, 707, 573, 707]
        var bottgayrr = [, 195.5, 195.5, 349.5, 349.5, 195.5, 195.5, 349.5, 349.5]
        for (i = 8; i >= 1; i--) {
            game['level4bottom' + i] = this.add.sprite(bottgaxrr[i], bottgayrr[i], 'level4bottom' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4bottom' + i].visible = false;
        }
        var cdaxrr = [, 407, 407, 407, 407, 407, 407, 407]
        var cdayrr = [, 84, 139, 194, 250, 305, 361, 416]
        for (i = 7; i >= 1; i--) {
            game['level4cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level4cat' + i].x += parseFloat(game['level4cat' + i].width / 2)
            game['level4cat' + i].y += parseFloat(game['level4cat' + i].height / 2)
        }
        for (i = 6; i >= 1; i--) {
            game['level4stud' + i].visible = true
        }
        level4dots1.visible = false
        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        doll4bacc = this.add.sprite(419, 93, 'doll4bacc').setOrigin(0, 0)
        doll4bhair = this.add.sprite(407, 85, 'doll4bhair').setOrigin(0.5, 0)
        doll4bhair.x += parseFloat(doll4bhair.width / 2)
        doll4body = this.add.sprite(423, 190, 'doll4body').setOrigin(0, 0)
        doll4head = this.add.sprite(440, 84, 'doll4head').setOrigin(0, 0)
        doll4ebrow = this.add.sprite(458, 128, 'doll4ebrow').setOrigin(0, 0)
        doll4eyetop = this.add.sprite(458, 138, 'doll4eyetop').setOrigin(0, 0)
        doll4eye = this.add.sprite(469, 145, 'doll4eye').setOrigin(0, 0)
        doll4eblink = this.add.sprite(452, 140, 'doll4eblink').setOrigin(0, 0)
        doll4hand = this.add.sprite(386, 232, 'doll4hand').setOrigin(0, 0)
        doll4dressshade = this.add.sprite(405, 219, 'doll4dressshade').setOrigin(0, 0)
        doll4bottomshade = this.add.sprite(460, 318, 'doll4bottomshade').setOrigin(0, 0)
        doll4topshade = this.add.sprite(407, 204, 'doll4topshade').setOrigin(0, 0)
        doll4stock = this.add.sprite(447, 396, 'doll4stock').setOrigin(0, 0)
        doll4tophand = this.add.sprite(535, 296, 'doll4tophand').setOrigin(0, 0)
        doll4bottom = this.add.sprite(420, 318, 'doll4bottom').setOrigin(0, 0)
        doll4top = this.add.sprite(418, 214, 'doll4top').setOrigin(0, 0)
        doll4dress = this.add.sprite(404, 208, 'doll4dress').setOrigin(0, 0)
        doll4bag = this.add.sprite(363, 239, 'doll4bag').setOrigin(0, 0)
        doll4chain = this.add.sprite(474, 220, 'doll4chain').setOrigin(0, 0)
        doll4hair = this.add.sprite(409, 39, 'doll4hair').setOrigin(0, 0)
        doll4stud = this.add.sprite(436, 165, 'doll4stud').setOrigin(0, 0)
        doll4acc = this.add.sprite(425, 34, 'doll4acc').setOrigin(0, 0)
        doll4glass = this.add.sprite(448, 129, 'doll4glass').setOrigin(0, 0)
        level4grp = this.add.container()
        level4grp.add(doll4bacc)
        level4grp.add(doll4bhair)
        level4grp.add(doll4body)
        level4grp.add(doll4head)
        level4grp.add(doll4eye)
        level4grp.add(doll4eyetop)
        level4grp.add(doll4ebrow)
        level4grp.add(doll4eblink)
        level4grp.add(doll4hand)
        level4grp.add(doll4dressshade)
        level4grp.add(doll4bottomshade)
        level4grp.add(doll4topshade)
        level4grp.add(doll4stock)
        level4grp.add(doll4tophand)
        level4grp.add(doll4bottom)
        level4grp.add(doll4top)
        level4grp.add(doll4dress)
        level4grp.add(doll4bag)
        level4grp.add(doll4chain)
        level4grp.add(doll4hair)
        level4grp.add(doll4stud)
        level4grp.add(doll4acc)
        level4grp.add(doll4glass)
        level4grp.x = -1000
        doll4eblink.setFrame(esarr[0])
        doll4dress.setFrame(darr4[0])
        doll4dressshade.setFrame(darr4[0])
        doll4hair.setFrame(darr4[1])
        doll4bhair.setFrame(darr4[1])
        doll4chain.setFrame(darr4[2])
        doll4stud.setFrame(darr4[3])
        doll4acc.setFrame(darr4[4])
        doll4bag.setFrame(darr4[5])
        doll4top.setFrame(darr4[6])
        doll4topshade.setFrame(darr4[6])
        doll4tophand.setFrame(darr4[6])
        doll4bottom.setFrame(darr4[7])
        doll4bottomshade.setFrame(darr4[7])
        doll4stock.setFrame(darr4[8])
        doll4glass.setFrame(darr4[9])
        if (darr4[5] > 0) {
            doll4hand.setFrame(1)
        } else {
            doll4hand.setFrame(0)
        }
        if (darr4[4] == 1 && darr4[1] != 0 && darr4[1] != 3) {
            doll4hair.setFrame(darr4[1] + 7)
        } else if (darr4[4] == 3) {
            doll4hair.setFrame(darr4[1] + 14)
        } else if (darr4[4] == 6) {
            doll4hair.setFrame(darr4[1] + 21)
        } else {
            doll4hair.setFrame(darr4[1])
        }
        doll4bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level4dressdollanimation1,
            callbackScope: this
        })

        function level4dressdollanimation1() {
            level4grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level4grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level4grp,
                y: level4grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level4dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eye,
            x: 470,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll4eyestart1,
            callbackScope: this
        });

        function doll4eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 469,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll4eyestart2,
                callbackScope: this
            });
        }

        function doll4eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 468,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll4eyestart3,
                callbackScope: this
            });
        }

        function doll4eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 469,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll4eyestart4,
                callbackScope: this
            });
        }

        function doll4eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 470,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll4eyestart1,
                callbackScope: this
            });
        }
        cupboardgroup = this.add.container()
        cupboardgroup.add(level4panel)
        cupboardgroup.add(level4dots1)
        cupboardgroup.add(level4lable)
        cupboardgroup.add(level4text)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level4dress' + i])
        }
        for (i = 8; i >= 1; i--) {
            cupboardgroup.add(game['level4top' + i])
            cupboardgroup.add(game['level4bottom' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level4chain' + i])
            cupboardgroup.add(game['level4stud' + i])
            cupboardgroup.add(game['level4glass' + i])
            cupboardgroup.add(game['level4bag' + i])
            cupboardgroup.add(game['level4hair' + i])
            cupboardgroup.add(game['level4acc' + i])
            cupboardgroup.add(game['level4stock' + i])
        }
        for (i = 7; i >= 1; i--) {
            cupboardgroup.add(game['level4cat' + i])
        }
        level4dots1.visible = true
        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
        game['level4cat' + 1].setFrame(1)
        rarrow = this.add.sprite(525.85, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(744.5, 531, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            x: rarrow.x + 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            x: larrow.x - 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        rarrow.visible = true
        larrow.visible = true
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        dressgliter = this.add.sprite(540.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(520, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(420.4, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'done2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('done2', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        done2.anims.load('done2')
        level4grp.add(dressgliter)
        level4grp.add(dollgliter)
        cupboardgroup.add(done2)
        done2.visible = false
        logomutefun()
        maskShape1 = this.add.graphics();
        maskShape1.fillStyle(0xffffff, 1);
        maskShape1.fillRect(0, 0, 1400, 600);
        maskShape1.x = safeArea.x - 300
        fillbackground2 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground2.alpha = 0
        fillbackground2.x = safeArea.x - 300
        maskShape = this.add.graphics();
        maskShape.fillStyle(0x000000, 1);
        maskShape.fillRect(0, 0, 1400, 600);
        maskShape.x = safeArea.x - 300
        maskShape.alpha = 0
        game.scene.scenes[pageNo].tweens.add({
            targets: fillbackground2,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: maskShape,
            alpha: 1,
            ease: 'Linear',
            duration: 600,
        });
        yearval1 = this.add.image(273, 248, 'yearno');
        yearval1.setOrigin(0, 0)
        yearval11 = this.add.image(273, 346, 'yearno');
        yearval11.setOrigin(0, 0)
        yearval2 = this.add.image(334, 248, 'yearno');
        yearval2.setOrigin(0, 0)
        yearval22 = this.add.image(334, 346, 'yearno');
        yearval22.setOrigin(0, 0)
        yearval3 = this.add.image(395, 248, 'yearno');
        yearval3.setOrigin(0, 0)
        yearval33 = this.add.image(395, 346, 'yearno');
        yearval33.setOrigin(0, 0)
        yearval4 = this.add.image(456, 248, 'yearno');
        yearval4.setOrigin(0, 0)
        yearval44 = this.add.image(456, 346, 'yearno');
        yearval44.setOrigin(0, 0)
        yearcontainer = this.add.container()
        yearcontainer.add(yearval1)
        yearcontainer.add(yearval11)
        yearcontainer.add(yearval2)
        yearcontainer.add(yearval22)
        yearcontainer.add(yearval3)
        yearcontainer.add(yearval33)
        yearcontainer.add(yearval4)
        yearcontainer.add(yearval44)
        yearcontainer.x = safeArea.x
        yearmask1 = this.make.graphics();
        yearmask1.fillStyle(0xff0000, 0.5);
        yearmask1.fillRect(269, 240, 255, 95);
        yearmask1.x = safeArea.x
        yearcontainer.mask = new Phaser.Display.Masks.GeometryMask(yearcontainer, yearmask1);
        setTimeout(yeartimer1, 1)

        function yeartimer1() {
            setTimeout(yearsound111, 300)

            function yearsound111() {
                playsoundeffects('yearsound')
            }
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 500,
                onComplete: yeartimer2
            });
        }

        function yeartimer2() {
            yearval1.y = 330
            yearval11.y = 273
            if (yearcount1 <= 0) {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: yeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval11,
                    y: 154,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function yeartimer3() {
            yearcount1 = yearcount1 + 1
            yearval1.y = 273
            yearval11.y = 330
            y1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: yeartimer2
            });
        }
        setTimeout(ayeartimer1, 1)

        function ayeartimer1() {
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 600,
                onComplete: ayeartimer2
            });
        }

        function ayeartimer2() {
            yearval2.y = 330
            yearval22.y = 273
            if (yearcount2 < 1) {
                a2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: ayeartimer3
                });
            } else {
                y2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval22,
                    y: -614,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function ayeartimer3() {
            yearcount2 = yearcount2 + 1
            yearval2.y = 273
            yearval22.y = 330
            a1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: ayeartimer2
            });
        }
        setTimeout(byeartimer1, 1)

        function byeartimer1() {
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }

        function byeartimer2() {
            yearval3.y = 330
            yearval33.y = 273
            if (yearcount3 < 1) {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: byeartimer3
                });
            } else {
                b2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval33,
                    y: -517,
                    ease: 'Linear',
                    duration: 150,
                });
            }
        }

        function byeartimer3() {
            yearcount3 = yearcount3 + 1
            yearval3.y = 273
            yearval33.y = 330
            b1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: byeartimer2
            });
        }
        setTimeout(cyeartimer1, 1)

        function cyeartimer1() {
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 800,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer2() {
            yearval4.y = 330
            yearval44.y = 273
            if (yearcount4 < 1) {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: -712,
                    ease: 'Linear',
                    duration: 700,
                    onComplete: cyeartimer3
                });
            } else {
                c2 = game.scene.scenes[pageNo].tweens.add({
                    targets: yearval44,
                    y: 250,
                    ease: 'Linear',
                    duration: 150,
                    onComplete: cyeartimer4
                });
            }
        }

        function cyeartimer3() {
            yearcount4 = yearcount4 + 1
            yearval4.y = 273
            yearval44.y = 330
            c1 = game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                y: -712,
                ease: 'Linear',
                duration: 700,
                onComplete: cyeartimer2
            });
        }

        function cyeartimer4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval3,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval4,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval11,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval22,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval33,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: yearval44,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: fillbackground2,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
                onComplete: level4start
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: maskShape1,
                alpha: 0,
                ease: 'Linear',
                duration: 600,
                delay: 400,
            });
        }
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //endbackground
        this.load.image('endbackground', 'assets/endscreen/background.jpg');
        this.load.image('endbackground1', 'assets/endscreen/background1.jpg');
        this.load.image('endbackground2', 'assets/endscreen/background2.jpg');
        this.load.image('endbackground3', 'assets/endscreen/background3.jpg');
        this.load.start();
        level4background.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            level4background.x = safeArea.x - 300
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame8 && donecount == 0) {
                level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 270
            } else {
                level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 100
            }
            fillbackground2.x = safeArea.x - 300
            maskShape1.x = safeArea.x - 300
            maskShape.x = safeArea.x - 300
            yearcontainer.x = safeArea.x
            yearmask1.x = safeArea.x
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function level4start() {
    music.setVolume(1)
    activecat()
    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level4grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 270,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level4dressclickstart1,
            callbackScope: this
        });
    }

    function level4dressclickstart1() {
        level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 270
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
            onComplete: level4dressclickstart,
            callbackScope: this
        });
    }

    function level4dressclickstart() {
        cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        cupboardstart = true
        for (i = 10; i >= 1; i--) {
            game['level4dress' + i].on('pointerover', etopOverFun)
            game['level4dress' + i].on('pointerout', etopOutFun)
            game['level4dress' + i].on('pointerdown', etopFun1)
        }

        function etopOverFun(ev) {
            this.setScale(1.05)
        }

        function etopOutFun(ev) {
            this.setScale(1)
            activecat()
        }

        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr4[0] == parseInt(sno)) {
                doll4dress.setFrame(0)
                doll4dressshade.setFrame(0)
                darr4[0] = 0
                doll4top.setFrame(0)
                doll4topshade.setFrame(0)
                doll4tophand.setFrame(0)
                darr4[6] = 0
                doll4bottom.setFrame(0)
                doll4bottomshade.setFrame(0)
                darr4[7] = 0
            } else {
                darr4[0] = parseInt(sno)
                doll4dress.setFrame(parseInt(sno))
                doll4dressshade.setFrame(parseInt(sno))
                doll4top.setFrame(9)
                doll4tophand.setFrame(9)
                doll4topshade.setFrame(9)
                darr4[6] = 9
                doll4bottom.setFrame(9)
                doll4bottomshade.setFrame(9)
                darr4[7] = 9
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level4top' + i].on('pointerover', etopOverFun)
            game['level4top' + i].on('pointerout', etopOutFun)
            game['level4top' + i].on('pointerdown', level4topfun)
        }

        function level4topfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr4[6] == parseInt(sno)) {
                doll4top.setFrame(0)
                doll4topshade.setFrame(0)
                doll4tophand.setFrame(0)
                darr4[6] = 0
            } else {
                darr4[6] = parseInt(sno)
                doll4top.setFrame(parseInt(sno))
                doll4topshade.setFrame(parseInt(sno))
                doll4tophand.setFrame(parseInt(sno))
                doll4dress.setFrame(0)
                doll4dressshade.setFrame(0)
                darr4[0] = 0
            }
            if (darr4[7] == 9) {
                doll4bottom.setFrame(0)
                doll4bottomshade.setFrame(0)
                darr4[7] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 8; i >= 1; i--) {
            game['level4bottom' + i].on('pointerover', etopOverFun)
            game['level4bottom' + i].on('pointerout', etopOutFun)
            game['level4bottom' + i].on('pointerdown', level4bottomfun)
        }

        function level4bottomfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(12)
            if (darr4[7] == parseInt(sno)) {
                doll4bottom.setFrame(0)
                doll4bottomshade.setFrame(0)
                darr4[7] = 0
            } else {
                darr4[7] = parseInt(sno)
                doll4bottom.setFrame(parseInt(sno))
                doll4bottomshade.setFrame(parseInt(sno))
                doll4dress.setFrame(0)
                doll4dressshade.setFrame(0)
                darr4[0] = 0
            }
            if (darr4[6] == 9) {
                doll4top.setFrame(0)
                doll4tophand.setFrame(0)
                doll4topshade.setFrame(0)
                darr4[6] = 0
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level4hair' + i].on('pointerover', etopOverFun)
            game['level4hair' + i].on('pointerout', etopOutFun)
            game['level4hair' + i].on('pointerdown', overFun)
        }

        function overFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr4[1] == parseInt(sno)) {
                doll4bhair.setFrame(0)
                doll4hair.setFrame(0)
                darr4[1] = 0
            } else {
                darr4[1] = parseInt(sno)
                doll4bhair.setFrame(parseInt(sno))
                doll4hair.setFrame(parseInt(sno))
            }
            if (darr4[4] == 1 && darr4[1] != 0 && darr4[1] != 3) {
                doll4hair.setFrame(darr4[1] + 7)
            } else if (darr4[4] == 3) {
                doll4hair.setFrame(darr4[1] + 14)
            } else if (darr4[4] == 6) {
                doll4hair.setFrame(darr4[1] + 21)
            } else {
                doll4hair.setFrame(darr4[1])
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level4chain' + i].on('pointerover', etopOverFun)
            game['level4chain' + i].on('pointerout', etopOutFun)
            game['level4chain' + i].on('pointerdown', chainFun)
        }

        function chainFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart3 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr4[2] == parseInt(sno)) {
                doll4chain.setFrame(0)
                darr4[2] = 0
            } else {
                darr4[2] = parseInt(sno)
                doll4chain.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level4stud' + i].on('pointerover', etopOverFun)
            game['level4stud' + i].on('pointerout', etopOutFun)
            game['level4stud' + i].on('pointerdown', studFun)
        }

        function studFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr4[3] == parseInt(sno)) {
                doll4stud.setFrame(0)
                darr4[3] = 0
            } else {
                darr4[3] = parseInt(sno)
                doll4stud.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level4acc' + i].on('pointerover', etopOverFun)
            game['level4acc' + i].on('pointerout', etopOutFun)
            game['level4acc' + i].on('pointerdown', bandFun)
        }

        function bandFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr4[4] == parseInt(sno)) {
                doll4acc.setFrame(0)
                doll4bacc.setFrame(0)
                darr4[4] = 0
            } else {
                darr4[4] = parseInt(sno)
                doll4acc.setFrame(parseInt(sno))
                doll4bacc.setFrame(parseInt(sno))
            }
            if (darr4[4] == 1 && darr4[1] != 0 && darr4[1] != 3) {
                doll4hair.setFrame(darr4[1] + 7)
            } else if (darr4[4] == 3) {
                doll4hair.setFrame(darr4[1] + 14)
            } else if (darr4[4] == 6) {
                doll4hair.setFrame(darr4[1] + 21)
            } else {
                doll4hair.setFrame(darr4[1])
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level4bag' + i].on('pointerover', etopOverFun)
            game['level4bag' + i].on('pointerout', etopOutFun)
            game['level4bag' + i].on('pointerdown', bagFun1)
        }

        function bagFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(9)
            if (darr4[5] == parseInt(sno)) {
                doll4bag.setFrame(0)
                darr4[5] = 0
            } else {
                darr4[5] = parseInt(sno)
                doll4bag.setFrame(parseInt(sno))
            }
            if (darr4[5] > 0) {
                doll4hand.setFrame(1)
            } else {
                doll4hand.setFrame(0)
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level4stock' + i].on('pointerover', etopOverFun)
            game['level4stock' + i].on('pointerout', etopOutFun)
            game['level4stock' + i].on('pointerdown', level4stockfun)
        }

        function level4stockfun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr4[8] == parseInt(sno)) {
                doll4stock.setFrame(0)
                darr4[8] = 0
            } else {
                darr4[8] = parseInt(sno)
                doll4stock.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }
        for (i = 6; i >= 1; i--) {
            game['level4glass' + i].on('pointerover', etopOverFun)
            game['level4glass' + i].on('pointerout', etopOutFun)
            game['level4glass' + i].on('pointerdown', glassFun1)
        }

        function glassFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(11)
            if (darr4[9] == parseInt(sno)) {
                doll4glass.setFrame(0)
                darr4[9] = 0
            } else {
                darr4[9] = parseInt(sno)
                doll4glass.setFrame(parseInt(sno))
            }
            btnvisFun()
            activecat()
        }

        function btnvisFun() {
            if (loadFinish && done2.visible == false) {
                done2.visible = true
                done2.setScale(0)
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Linear',
                    duration: 500,
                });
                game.scene.scenes[pageNo].tweens.add({
                    targets: done2,
                    angle: -360,
                    ease: 'Linear',
                    duration: 500,
                });
            }
        }
    }
    larrow.on('pointerdown', larrowdownstart)

    function larrowdownstart() {
        playsoundeffects('clickss')
        if (game['level4stud' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(2)
            level4text.setFrame(1)
            for (i = 7; i >= 2; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 1].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = true
            }
        } else if (game['level4chain' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(3)
            level4text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4bag' + i].visible = true
            }
        } else if (game['level4bag' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(4)
            level4text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 1; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i <= 3; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 1; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 3; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4acc' + i].visible = true
            }
        } else if (game['level4acc' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(5)
            level4text.setFrame(4)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4stock' + i].visible = true
            }
        } else if (game['level4stock' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(6)
            level4text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i <= 4; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 4; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4glass' + i].visible = true
            }
        } else if (game['level4glass' + 1].visible) {
            level4dots1.visible = false
            level4lable.setFrame(7)
            level4text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i <= 5; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 5; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4hair' + i].visible = true
            }
        } else if (game['level4hair' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(8)
            level4text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level4top' + i].visible = true
            }
        } else if (game['level4top' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(8)
            level4text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 6; i <= 7; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 6; i <= 7; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level4top' + i].visible = true
            }
        } else if (game['level4top' + 5].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4dots1.setFrame(0)
            level4lable.setFrame(9)
            level4text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 4; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level4bottom' + i].visible = true
            }
        } else if (game['level4bottom' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(9)
            level4text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i <= 7; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 5; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i <= 7; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level4bottom' + i].visible = true
            }
        } else if (game['level4bottom' + 5].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(10)
            level4text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(10)
            level4text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 6].visible) {
            level4dots1.setFrame(0)
            level4dots1.visible = true
            level4lable.setFrame(1)
            level4text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 2; i <= 7; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 2; i <= 7; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4stud' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')
        if (game['level4stud' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(10)
            level4text.setFrame(12)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 7].setFrame(1)
            for (i = 6; i <= 10; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 6].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(10)
            level4text.setFrame(11)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 6; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 7].setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4dots1.setFrame(0)
            level4lable.setFrame(9)
            level4text.setFrame(10)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 6].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level4bottom' + i].visible = true
            }
        } else if (game['level4bottom' + 5].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(8)
            level4text.setFrame(9)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 5; i >= 1; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 7; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 5; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 7; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 6].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level4bottom' + i].visible = true
            }
        } else if (game['level4bottom' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(7)
            level4text.setFrame(8)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 5].setFrame(1)
            for (i = 5; i <= 8; i++) {
                game['level4top' + i].visible = true
            }
        } else if (game['level4top' + 5].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(7)
            level4text.setFrame(7)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 4; i >= 1; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 6; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 4; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 6; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 5].setFrame(1)
            for (i = 1; i <= 4; i++) {
                game['level4top' + i].visible = true
            }
        } else if (game['level4top' + 1].visible) {
            level4dots1.visible = false
            level4lable.setFrame(6)
            level4text.setFrame(6)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 3; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 5; i <= 7; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 3; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 5; i <= 7; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 4].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4hair' + i].visible = true
            }
        } else if (game['level4hair' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(5)
            level4text.setFrame(5)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 2; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 4; i <= 7; i++) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i <= 2; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 4; i <= 7; i++) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4glass' + i].visible = true
            }
        } else if (game['level4glass' + 1].visible) {
            level4lable.setFrame(5)
            level4text.setFrame(4)
            level4dots1.visible = true
            level4dots1.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 2; i >= 1; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 4; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 2; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 4; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 3].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4stock' + i].visible = true
            }
        } else if (game['level4stock' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(4)
            level4text.setFrame(3)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4acc' + i].visible = true
            }
        } else if (game['level4acc' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(3)
            level4text.setFrame(2)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i >= 1; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 3; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 1; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            for (i = 7; i >= 3; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 2].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4bag' + i].visible = true
            }
        } else if (game['level4bag' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(1)
            level4lable.setFrame(2)
            level4text.setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = true
            }
        } else if (game['level4chain' + 1].visible) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.setFrame(1)
            level4text.setFrame(0)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 7; i >= 2; i--) {
                game['level4cat' + i].setFrame(0)
            }
            for (i = 7; i >= 2; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            game['level4cat' + 1].setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4stud' + i].visible = true
            }
        }
    }

    function activecat() {
        for (i = 1; i <= 10; i++) {
            game['level4dress' + i].alpha = 1
        }
        for (i = 1; i <= 8; i++) {
            game['level4top' + i].alpha = 1
            game['level4bottom' + i].alpha = 1
        }
        for (i = 1; i <= 6; i++) {
            game['level4chain' + i].alpha = 1
            game['level4stud' + i].alpha = 1
            game['level4hair' + i].alpha = 1
            game['level4bag' + i].alpha = 1
            game['level4stock' + i].alpha = 1
            game['level4glass' + i].alpha = 1
            game['level4acc' + i].alpha = 1
        }
        if (darr4[0] > 0 && darr4[0] < 11) {
            game['level4dress' + darr4[0]].alpha = 0.5
        }
        if (darr4[1] > 0 && darr4[1] < 7) {
            game['level4hair' + darr4[1]].alpha = 0.5
        }
        if (darr4[2] > 0) {
            game['level4chain' + darr4[2]].alpha = 0.5
        }
        if (darr4[3] > 0) {
            game['level4stud' + darr4[3]].alpha = 0.5
        }
        if (darr4[5] > 0) {
            game['level4bag' + darr4[5]].alpha = 0.5
        }
        if (darr4[4] > 0) {
            game['level4acc' + darr4[4]].alpha = 0.5
        }
        if (darr4[6] > 0 && darr4[6] < 9) {
            game['level4top' + darr4[6]].alpha = 0.5
        }
        if (darr4[7] > 0 && darr4[7] < 9) {
            game['level4bottom' + darr4[7]].alpha = 0.5
        }
        if (darr4[8] > 0) {
            game['level4stock' + darr4[8]].alpha = 0.5
        }
        if (darr4[9] > 0) {
            game['level4glass' + darr4[9]].alpha = 0.5
        }
    }
    for (i = 7; i >= 1; i--) {
        game['level4cat' + i].on('pointerover', levelcatoverstart)
        game['level4cat' + i].on('pointerout', levelcatoutstart)
        game['level4cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
        activecat()
    }

    function levelcatdownstart(ev) {
        level4dots1.visible = false
        level4dots1.setFrame(0)
        activecat()
        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 7; i++) {
            game['level4cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level4cat' + 1].setFrame(1)
            level4lable.visible = true
            level4lable.setFrame(1)
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4text.setFrame(0)
            for (i = 7; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            level4lable.visible = true
            level4lable.setFrame(1)
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.visible = true
            level4lable.setFrame(3)
            level4text.setFrame(2)
            for (i = 7; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            game['level4cat' + 2].setFrame(1)
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4bag' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.visible = true
            level4lable.setFrame(5)
            level4text.setFrame(4)
            game['level4cat' + 3].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4stock' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            level4lable.visible = true
            level4lable.setFrame(7)
            level4text.setFrame(6)
            game['level4cat' + 4].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4hair' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4lable.visible = true
            level4lable.setFrame(8)
            level4text.setFrame(7)
            game['level4cat' + 5].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4top' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            level4lable.visible = true
            level4lable.setFrame(9)
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4text.setFrame(9)
            game['level4cat' + 6].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bottom' + i].visible = true
            }
        } else if (parseInt(sno) == 7) {
            level4lable.setFrame(10)
            level4dots1.visible = true
            level4dots1.setFrame(0)
            level4text.setFrame(10)
            game['level4cat' + 7].setFrame(1)
            for (i = 7; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 8; i++) {
                game['level4top' + i].visible = false
                game['level4bottom' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
                game['level4acc' + i].visible = false
                game['level4stock' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level4dress' + i].visible = true
            }
        }
    }
    done2.on('pointerover', done2overstart)
    done2.on('pointerout', done2outstart)
    done2.on('pointerdown', done2downstart)
    done2.on('pointerup', done2upstart)

    function done2overstart() {
        done2.anims.play('done2')
    }

    function done2outstart() {
        done2.anims.stop('done2')
    }

    function done2upstart() {
        this.setScale(1.05)
    }

    function done2downstart() {
        if (!startgame8 && loadFinish) {
            startgame8 = true
            playsoundeffects('clickss')
            done2.anims.stop('done2')
            done2.setFrame(10)
            if (level == 4) {
                level = 5
            }
            saveFile()
            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level4grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 100,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 100
        playsoundeffects('complete');
        dollgliter.anims.load('dollgliter')
        dollgliter.anims.play('dollgliter')
        dollgliter.on('animationcomplete', dollglitercomplete, this);
    }

    function dollglitercomplete() {
        setTimeout(doneclickstart3, 500)
    }

    function doneclickstart3() {
        transitionIn();
    }
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4bhair,
        y: doll4bhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4head,
        y: doll4head.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4eye,
        y: doll4eye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4eyetop,
        y: doll4eyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4eblink,
        y: doll4eblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4ebrow,
        y: doll4ebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4hair,
        y: doll4hair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4stud,
        y: doll4stud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4acc,
        y: doll4acc.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4bacc,
        y: doll4bacc.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: doll4glass,
        y: doll4glass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    doll4eblink.setFrame(esarr[0] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: doll4headanimation11,
        callbackScope: this
    })

    function doll4headanimation11() {
        doll4eblink.setFrame(esarr[0])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: doll4headanimation1,
            callbackScope: this
        })
    }

    function doll4headanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4stud,
            y: doll4stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4acc,
            y: doll4acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4bacc,
            y: doll4bacc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4bhair,
            y: doll4bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4head,
            y: doll4head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4ebrow,
            y: doll4ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eye,
            y: doll4eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eyetop,
            y: doll4eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eblink,
            y: doll4eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4hair,
            y: doll4hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4glass,
            y: doll4glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll4eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll4headanimation11,
            callbackScope: this
        })

        function doll4headanimation1() {
            doll4eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll4headanimation1,
                callbackScope: this
            })
        }
    }
}
var startgame9 = false
var thumb = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function thumb() {
        Phaser.Scene.call(this, {
            key: 'thumb'
        });
    },
    preload: function () {
        loadFinish = false
        pageNo = 9
        startgame9 = false
        dollIn = true
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        thumbbackground = this.add.image(0, 0, 'thumbbackground').setOrigin(0, 0)
        thumb1 = this.add.image(127, 94, 'thumb1').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        thumb2 = this.add.image(427, 94, 'thumb2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        thumb1.x += parseFloat(thumb1.width / 2);
        thumb1.y += parseFloat(thumb1.height / 2);
        thumb2.x += parseFloat(thumb2.width / 2);
        thumb2.y += parseFloat(thumb2.height / 2);
        game.scene.scenes[pageNo].tweens.add({
            targets: thumb1,
            scaleX: 1.07,
            scaleY: 1.07,
            ease: 'Linear',
            duration: 800,
            repeat: -1,
            yoyo: true
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: thumb2,
            scaleX: 1.07,
            scaleY: 1.07,
            ease: 'Linear',
            duration: 800,
            repeat: -1,
            yoyo: true
        });
        next2 = this.add.sprite(530, 517.05, 'next2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'next2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('next2', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        next2.anims.load('next2')
        thumbcontainer = this.add.container()
        thumbcontainer.add(thumb1)
        thumbcontainer.add(thumb2)
        thumbcontainer.add(next2)
        next2.setScale(1)
        logomutefun()
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });
        this.load.start();
        thumbbackground.x = safeArea.x - 300
        thumbcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            thumbbackground.x = safeArea.x - 300
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            thumbcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function thumbstart() {
    thumb1.on('pointerdown', thumb1downstart)

    function thumb1downstart() {
        if (excheck == 0) {
            playsoundeffects('clickss')
            window.open(THUMB_1, target = "_blank")
        }
    }
    thumb2.on('pointerdown', thumb2downstart)

    function thumb2downstart() {
        if (excheck == 0) {
            playsoundeffects('clickss')
            window.open(THUMB_2, target = "_blank")
        }
    }
    next2.on('pointerover', next2overstart)
    next2.on('pointerout', next2outstart)
    next2.on('pointerdown', next2downstart)
    next2.on('pointerup', next2upstart)

    function next2overstart() {
        next2.anims.play('next2')
    }

    function next2outstart() {
        next2.anims.stop('next2')
    }

    function next2downstart() {
        if (!startgame9 && loadFinish) {
            startgame9 = true
            playsoundeffects('clickss')
            next2.anims.stop('next2')
            next2.setFrame(10)
            transitionIn()
        }
    }

    function next2upstart() {}
}
var startgame10 = false
var endscreen = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function endscreen() {
        Phaser.Scene.call(this, {
            key: 'endscreen'
        });
    },
    preload: function () {
        loadFinish = false
        pageNo = 10
        startgame10 = false
        dollIn = true
    },
    create: function () {
        world = {
            width: 1400,
            height: 800
        }
        this.cameras.main.setBounds(0, 0, world.width, world.height)
        safeArea = this.add
            .rectangle(
                this.cameras.main.width / 2 - +this.game.config.width / 2,
                this.cameras.main.height - +this.game.config.height,
                +this.game.config.width,
                +this.game.config.height,
                0xff00ff,
                0.08
            )
            .setStrokeStyle(4, 0xff00ff, 0.25)
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)
        safeArea.visible = false
        endbackground = this.add.image(0, 0, 'endbackground').setOrigin(0, 0)
        endbackground.x = safeArea.x - 300
        endbackground1 = this.add.image(0, 0, 'endbackground1').setOrigin(0, 0)
        endbackground1.x = safeArea.x - 300
        endbackground2 = this.add.image(0, 0, 'endbackground2').setOrigin(0, 0)
        endbackground2.x = safeArea.x - 300
        endbackground3 = this.add.image(0, 0, 'endbackground3').setOrigin(0, 0)
        endbackground3.x = safeArea.x - 300
        endbackground.visible = true
        endbackground1.visible = false
        endbackground2.visible = false
        endbackground3.visible = false
        doll1bhair = this.add.sprite(143, 93, 'doll1bhair').setOrigin(0.5, 0)
        doll1bhair.x += parseFloat(doll1bhair.width / 2)
        doll1body = this.add.sprite(150, 181, 'doll1body').setOrigin(0, 0)
        doll1head = this.add.sprite(178, 88, 'doll1head').setOrigin(0, 0)
        doll1ebrow = this.add.sprite(195, 128, 'doll1ebrow').setOrigin(0, 0)
        doll1eyetop = this.add.sprite(194, 135, 'doll1eyetop').setOrigin(0, 0)
        doll1eye = this.add.sprite(205, 151, 'doll1eye').setOrigin(0, 0)
        doll1eblink = this.add.sprite(188, 137, 'doll1eblink').setOrigin(0, 0)
        doll1hand = this.add.sprite(141, 213, 'doll1hand').setOrigin(0, 0)
        doll1dressshade = this.add.sprite(150, 209, 'doll1dressshade').setOrigin(0, 0)
        doll1bottomshade = this.add.sprite(170, 306, 'doll1bottomshade').setOrigin(0, 0)
        doll1topshade = this.add.sprite(135, 198, 'doll1topshade').setOrigin(0, 0)
        doll1stock = this.add.sprite(157, 384, 'doll1stock').setOrigin(0, 0)
        doll1dress = this.add.sprite(112, 201, 'doll1dress').setOrigin(0, 0)
        doll1bottom = this.add.sprite(137, 310, 'doll1bottom').setOrigin(0, 0)
        doll1top = this.add.sprite(144, 198, 'doll1top').setOrigin(0, 0)
        doll1bag = this.add.sprite(108, 219, 'doll1bag').setOrigin(0, 0)
        doll1chain = this.add.sprite(198, 209, 'doll1chain').setOrigin(0, 0)
        doll1hair = this.add.sprite(92, 11, 'doll1hair').setOrigin(0, 0)
        doll1stud = this.add.sprite(168, 157, 'doll1stud').setOrigin(0, 0)
        doll1acc = this.add.sprite(139, 40, 'doll1acc').setOrigin(0, 0)
        doll1glass = this.add.sprite(184, 131, 'doll1glass').setOrigin(0, 0)
        doll1hand1 = this.add.sprite(253, 333, 'doll1hand1').setOrigin(0, 0)
        level1grp = this.add.container()
        level1grp.add(doll1bhair)
        level1grp.add(doll1body)
        level1grp.add(doll1head)
        level1grp.add(doll1eye)
        level1grp.add(doll1eyetop)
        level1grp.add(doll1ebrow)
        level1grp.add(doll1eblink)
        level1grp.add(doll1hand)
        level1grp.add(doll1dressshade)
        level1grp.add(doll1bottomshade)
        level1grp.add(doll1topshade)
        level1grp.add(doll1stock)
        level1grp.add(doll1dress)
        level1grp.add(doll1bottom)
        level1grp.add(doll1hand1)
        level1grp.add(doll1top)
        level1grp.add(doll1bag)
        level1grp.add(doll1chain)
        level1grp.add(doll1hair)
        level1grp.add(doll1stud)
        level1grp.add(doll1acc)
        level1grp.add(doll1glass)
        level1grp.x = -1000
        doll1eblink.setFrame(esarr[0])
        doll1dress.setFrame(darr1[0])
        doll1dressshade.setFrame(darr1[0])
        doll1hair.setFrame(darr1[1])
        doll1bhair.setFrame(darr1[1])
        doll1chain.setFrame(darr1[2])
        doll1stud.setFrame(darr1[3])
        doll1acc.setFrame(darr1[4])
        doll1bag.setFrame(darr1[5])
        doll1top.setFrame(darr1[6])
        doll1topshade.setFrame(darr1[6])
        doll1bottom.setFrame(darr1[7])
        doll1bottomshade.setFrame(darr1[7])
        doll1stock.setFrame(darr1[8])
        doll1glass.setFrame(darr1[9])
        if (darr1[5] > 0) {
            doll1hand.setFrame(1)
        } else {
            doll1hand.setFrame(0)
        }
        doll1bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level1dressdollanimation1,
            callbackScope: this
        })

        function level1dressdollanimation1() {
            level1grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level1grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level1grp,
                y: level1grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level1dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eye,
            x: 206,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll1eyestart1,
            callbackScope: this
        });

        function doll1eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 205,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll1eyestart2,
                callbackScope: this
            });
        }

        function doll1eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 204,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll1eyestart3,
                callbackScope: this
            });
        }

        function doll1eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 205,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll1eyestart4,
                callbackScope: this
            });
        }

        function doll1eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                x: 206,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll1eyestart1,
                callbackScope: this
            });
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1bhair,
            y: doll1bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1head,
            y: doll1head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eye,
            y: doll1eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eyetop,
            y: doll1eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1eblink,
            y: doll1eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1ebrow,
            y: doll1ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1hair,
            y: doll1hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1stud,
            y: doll1stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1acc,
            y: doll1acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll1glass,
            y: doll1glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll1eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll1headanimation11,
            callbackScope: this
        })

        function doll1headanimation11() {
            doll1eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll1headanimation1,
                callbackScope: this
            })
        }

        function doll1headanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1stud,
                y: doll1stud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1acc,
                y: doll1acc.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1glass,
                y: doll1glass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1bhair,
                y: doll1bhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1head,
                y: doll1head.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1ebrow,
                y: doll1ebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eye,
                y: doll1eye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eyetop,
                y: doll1eyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1eblink,
                y: doll1eblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll1hair,
                y: doll1hair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            doll1eblink.setFrame(esarr[0] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: doll1headanimation11,
                callbackScope: this
            })

            function doll1headanimation1() {
                doll1eblink.setFrame(esarr[0])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5000,
                    callback: doll1headanimation1,
                    callbackScope: this
                })
            }
        }
        doll2bhair = this.add.sprite(115, 123, 'doll2bhair').setOrigin(0.5, 0)
        doll2bhair.x += parseFloat(doll2bhair.width / 2)
        doll2body = this.add.sprite(130, 193, 'doll2body').setOrigin(0, 0)
        doll2head = this.add.sprite(156, 90, 'doll2head').setOrigin(0, 0)
        doll2ebrow = this.add.sprite(173, 128, 'doll2ebrow').setOrigin(0, 0)
        doll2eyetop = this.add.sprite(172, 129, 'doll2eyetop').setOrigin(0, 0)
        doll2eye = this.add.sprite(177, 144, 'doll2eye').setOrigin(0, 0)
        doll2eblink = this.add.sprite(165, 139, 'doll2eblink').setOrigin(0, 0)
        doll2hand = this.add.sprite(92, 389, 'doll2hand').setOrigin(0, 0)
        doll2dressshade = this.add.sprite(129, 217, 'doll2dressshade').setOrigin(0, 0)
        doll2bottomshade = this.add.sprite(164, 326, 'doll2bottomshade').setOrigin(0, 0)
        doll2topshade = this.add.sprite(122, 210, 'doll2topshade').setOrigin(0, 0)
        doll2stock = this.add.sprite(152, 432, 'doll2stock').setOrigin(0, 0)
        doll2dress = this.add.sprite(115, 213, 'doll2dress').setOrigin(0, 0)
        doll2bottom = this.add.sprite(123, 324, 'doll2bottom').setOrigin(0, 0)
        doll2top = this.add.sprite(123, 207, 'doll2top').setOrigin(0, 0)
        doll2bag = this.add.sprite(63, 419, 'doll2bag').setOrigin(0, 0)
        doll2chain = this.add.sprite(193, 221, 'doll2chain').setOrigin(0, 0)
        doll2hair = this.add.sprite(134, 43, 'doll2hair').setOrigin(0, 0)
        doll2stud = this.add.sprite(156, 156, 'doll2stud').setOrigin(0, 0)
        doll2acc = this.add.sprite(115, 23, 'doll2acc').setOrigin(0, 0)
        doll2glass = this.add.sprite(160, 126, 'doll2glass').setOrigin(0, 0)
        level2grp = this.add.container()
        level2grp.add(doll2bhair)
        level2grp.add(doll2body)
        level2grp.add(doll2head)
        level2grp.add(doll2eye)
        level2grp.add(doll2eyetop)
        level2grp.add(doll2ebrow)
        level2grp.add(doll2eblink)
        level2grp.add(doll2hand)
        level2grp.add(doll2dressshade)
        level2grp.add(doll2bottomshade)
        level2grp.add(doll2topshade)
        level2grp.add(doll2stock)
        level2grp.add(doll2dress)
        level2grp.add(doll2bottom)
        level2grp.add(doll2top)
        level2grp.add(doll2bag)
        level2grp.add(doll2chain)
        level2grp.add(doll2hair)
        level2grp.add(doll2stud)
        level2grp.add(doll2acc)
        level2grp.add(doll2glass)
        level2grp.x = -1000
        doll2eblink.setFrame(esarr[0])
        doll2dress.setFrame(darr2[0])
        doll2dressshade.setFrame(darr2[0])
        doll2hair.setFrame(darr2[1])
        doll2bhair.setFrame(darr2[1])
        doll2chain.setFrame(darr2[2])
        doll2stud.setFrame(darr2[3])
        doll2acc.setFrame(darr2[4])
        doll2bag.setFrame(darr2[5])
        doll2top.setFrame(darr2[6])
        doll2topshade.setFrame(darr2[6])
        doll2bottom.setFrame(darr2[7])
        doll2bottomshade.setFrame(darr2[7])
        doll2stock.setFrame(darr2[8])
        doll2glass.setFrame(darr2[9])
        if (darr2[5] > 0) {
            doll2hand.setFrame(1)
        } else {
            doll2hand.setFrame(0)
        }
        doll2bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level2dressdollanimation1,
            callbackScope: this
        })

        function level2dressdollanimation1() {
            level2grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level2grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level2grp,
                y: level2grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level2dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eye,
            x: 178,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll2eyestart1,
            callbackScope: this
        });

        function doll2eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll2eyestart2,
                callbackScope: this
            });
        }

        function doll2eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 176,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll2eyestart3,
                callbackScope: this
            });
        }

        function doll2eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll2eyestart4,
                callbackScope: this
            });
        }

        function doll2eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                x: 178,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll2eyestart1,
                callbackScope: this
            });
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2bhair,
            y: doll2bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2head,
            y: doll2head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eye,
            y: doll2eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eyetop,
            y: doll2eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2eblink,
            y: doll2eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2ebrow,
            y: doll2ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2hair,
            y: doll2hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2stud,
            y: doll2stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2acc,
            y: doll2acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll2glass,
            y: doll2glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll2eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll2headanimation11,
            callbackScope: this
        })

        function doll2headanimation11() {
            doll2eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll2headanimation1,
                callbackScope: this
            })
        }

        function doll2headanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2stud,
                y: doll2stud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2bhair,
                y: doll2bhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2head,
                y: doll2head.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2ebrow,
                y: doll2ebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eye,
                y: doll2eye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eyetop,
                y: doll2eyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2eblink,
                y: doll2eblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2hair,
                y: doll2hair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2acc,
                y: doll2acc.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll2glass,
                y: doll2glass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            doll2eblink.setFrame(esarr[0] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: doll2headanimation11,
                callbackScope: this
            })

            function doll2headanimation1() {
                doll2eblink.setFrame(esarr[0])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5000,
                    callback: doll2headanimation1,
                    callbackScope: this
                })
            }
        }
        doll3bacc = this.add.sprite(414, 104, 'doll3bacc').setOrigin(0, 0)
        doll3bhair = this.add.sprite(323, 48, 'doll3bhair').setOrigin(0.5, 0)
        doll3bhair.x += parseFloat(doll3bhair.width / 2)
        doll3body = this.add.sprite(406, 191, 'doll3body').setOrigin(0, 0)
        doll3head = this.add.sprite(438, 87, 'doll3head').setOrigin(0, 0)
        doll3ebrow = this.add.sprite(446, 125, 'doll3ebrow').setOrigin(0, 0)
        doll3eyetop = this.add.sprite(455, 134, 'doll3eyetop').setOrigin(0, 0)
        doll3eye = this.add.sprite(464, 144, 'doll3eye').setOrigin(0, 0)
        doll3eblink = this.add.sprite(450, 138, 'doll3eblink').setOrigin(0, 0)
        doll3hand = this.add.sprite(388, 219, 'doll3hand').setOrigin(0, 0)
        doll3dressshade = this.add.sprite(402, 202, 'doll3dressshade').setOrigin(0, 0)
        doll3bottomshade = this.add.sprite(429, 309, 'doll3bottomshade').setOrigin(0, 0)
        doll3topshade = this.add.sprite(404, 203, 'doll3topshade').setOrigin(0, 0)
        doll3stock = this.add.sprite(441, 409, 'doll3stock').setOrigin(0, 0)
        doll3dress = this.add.sprite(389, 205, 'doll3dress').setOrigin(0, 0)
        doll3bottom = this.add.sprite(407, 310, 'doll3bottom').setOrigin(0, 0)
        doll3top = this.add.sprite(412, 197, 'doll3top').setOrigin(0, 0)
        doll3chain = this.add.sprite(477, 221, 'doll3chain').setOrigin(0, 0)
        doll3bag = this.add.sprite(368, 239, 'doll3bag').setOrigin(0, 0)
        doll3hair = this.add.sprite(373, 9, 'doll3hair').setOrigin(0, 0)
        doll3glass = this.add.sprite(444, 129, 'doll3glass').setOrigin(0, 0)
        doll3acc = this.add.sprite(402, 28, 'doll3acc').setOrigin(0, 0)
        doll3stud = this.add.sprite(436, 160, 'doll3stud').setOrigin(0, 0)
        level3grp = this.add.container()
        level3grp.add(doll3bacc)
        level3grp.add(doll3bhair)
        level3grp.add(doll3body)
        level3grp.add(doll3head)
        level3grp.add(doll3eye)
        level3grp.add(doll3eyetop)
        level3grp.add(doll3ebrow)
        level3grp.add(doll3eblink)
        level3grp.add(doll3hand)
        level3grp.add(doll3dressshade)
        level3grp.add(doll3bottomshade)
        level3grp.add(doll3topshade)
        level3grp.add(doll3stock)
        level3grp.add(doll3dress)
        level3grp.add(doll3bottom)
        level3grp.add(doll3top)
        level3grp.add(doll3chain)
        level3grp.add(doll3bag)
        level3grp.add(doll3hair)
        level3grp.add(doll3glass)
        level3grp.add(doll3acc)
        level3grp.add(doll3stud)
        level3grp.x = -1000
        doll3eblink.setFrame(esarr[0])
        doll3dress.setFrame(darr3[0])
        doll3dressshade.setFrame(darr3[0])
        doll3hair.setFrame(darr3[1])
        doll3bhair.setFrame(darr3[1])
        doll3chain.setFrame(darr3[2])
        doll3stud.setFrame(darr3[3])
        doll3bag.setFrame(darr3[5])
        doll3acc.setFrame(darr3[4])
        doll3bacc.setFrame(darr3[4])
        doll3top.setFrame(darr3[6])
        doll3topshade.setFrame(darr3[6])
        doll3bottom.setFrame(darr3[7])
        doll3bottomshade.setFrame(darr3[7])
        doll3stock.setFrame(darr3[8])
        doll3glass.setFrame(darr3[9])
        if (darr3[5] > 0) {
            doll3hand.setFrame(1)
        } else {
            doll3hand.setFrame(0)
        }
        if (darr3[4] == 4 && darr3[1] == 0) {
            doll3bhair.setFrame(7)
        } else {
            doll3bhair.setFrame(darr3[1])
        }
        if (darr3[4] == 4) {
            doll3hair.setFrame(darr3[1] + 7)
        } else {
            doll3hair.setFrame(darr3[1])
        }
        doll3bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level3dressdollanimation1,
            callbackScope: this
        })

        function level3dressdollanimation1() {
            level3grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level3grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level3grp,
                y: level3grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level3dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eye,
            x: 465,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll3eyestart1,
            callbackScope: this
        });

        function doll3eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 464,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll3eyestart2,
                callbackScope: this
            });
        }

        function doll3eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 463,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll3eyestart3,
                callbackScope: this
            });
        }

        function doll3eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 464,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll3eyestart4,
                callbackScope: this
            });
        }

        function doll3eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                x: 465,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll3eyestart1,
                callbackScope: this
            });
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3bhair,
            y: doll3bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3head,
            y: doll3head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eye,
            y: doll3eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eyetop,
            y: doll3eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3eblink,
            y: doll3eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3ebrow,
            y: doll3ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3hair,
            y: doll3hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3stud,
            y: doll3stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3acc,
            y: doll3acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3bacc,
            y: doll3bacc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll3glass,
            y: doll3glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll3eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll3headanimation11,
            callbackScope: this
        })

        function doll3headanimation11() {
            doll3eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll3headanimation1,
                callbackScope: this
            })
        }

        function doll3headanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3stud,
                y: doll3stud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3acc,
                y: doll3acc.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3bacc,
                y: doll3bacc.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3bhair,
                y: doll3bhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3head,
                y: doll3head.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3ebrow,
                y: doll3ebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eye,
                y: doll3eye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eyetop,
                y: doll3eyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3eblink,
                y: doll3eblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3hair,
                y: doll3hair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll3glass,
                y: doll3glass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            doll3eblink.setFrame(esarr[0] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: doll3headanimation11,
                callbackScope: this
            })

            function doll3headanimation1() {
                doll3eblink.setFrame(esarr[0])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5000,
                    callback: doll3headanimation1,
                    callbackScope: this
                })
            }
        }
        doll4bacc = this.add.sprite(419, 93, 'doll4bacc').setOrigin(0, 0)
        doll4bhair = this.add.sprite(407, 85, 'doll4bhair').setOrigin(0.5, 0)
        doll4bhair.x += parseFloat(doll4bhair.width / 2)
        doll4body = this.add.sprite(423, 190, 'doll4body').setOrigin(0, 0)
        doll4head = this.add.sprite(440, 84, 'doll4head').setOrigin(0, 0)
        doll4ebrow = this.add.sprite(458, 128, 'doll4ebrow').setOrigin(0, 0)
        doll4eyetop = this.add.sprite(458, 138, 'doll4eyetop').setOrigin(0, 0)
        doll4eye = this.add.sprite(469, 145, 'doll4eye').setOrigin(0, 0)
        doll4eblink = this.add.sprite(452, 140, 'doll4eblink').setOrigin(0, 0)
        doll4hand = this.add.sprite(386, 232, 'doll4hand').setOrigin(0, 0)
        doll4dressshade = this.add.sprite(405, 219, 'doll4dressshade').setOrigin(0, 0)
        doll4bottomshade = this.add.sprite(460, 318, 'doll4bottomshade').setOrigin(0, 0)
        doll4topshade = this.add.sprite(407, 204, 'doll4topshade').setOrigin(0, 0)
        doll4stock = this.add.sprite(447, 396, 'doll4stock').setOrigin(0, 0)
        doll4tophand = this.add.sprite(535, 296, 'doll4tophand').setOrigin(0, 0)
        doll4bottom = this.add.sprite(420, 318, 'doll4bottom').setOrigin(0, 0)
        doll4top = this.add.sprite(418, 214, 'doll4top').setOrigin(0, 0)
        doll4dress = this.add.sprite(404, 208, 'doll4dress').setOrigin(0, 0)
        doll4bag = this.add.sprite(363, 239, 'doll4bag').setOrigin(0, 0)
        doll4chain = this.add.sprite(474, 220, 'doll4chain').setOrigin(0, 0)
        doll4hair = this.add.sprite(409, 39, 'doll4hair').setOrigin(0, 0)
        doll4stud = this.add.sprite(436, 165, 'doll4stud').setOrigin(0, 0)
        doll4acc = this.add.sprite(425, 34, 'doll4acc').setOrigin(0, 0)
        doll4glass = this.add.sprite(448, 129, 'doll4glass').setOrigin(0, 0)
        level4grp = this.add.container()
        level4grp.add(doll4bacc)
        level4grp.add(doll4bhair)
        level4grp.add(doll4body)
        level4grp.add(doll4head)
        level4grp.add(doll4eye)
        level4grp.add(doll4eyetop)
        level4grp.add(doll4ebrow)
        level4grp.add(doll4eblink)
        level4grp.add(doll4hand)
        level4grp.add(doll4dressshade)
        level4grp.add(doll4bottomshade)
        level4grp.add(doll4topshade)
        level4grp.add(doll4stock)
        level4grp.add(doll4tophand)
        level4grp.add(doll4bottom)
        level4grp.add(doll4top)
        level4grp.add(doll4dress)
        level4grp.add(doll4bag)
        level4grp.add(doll4chain)
        level4grp.add(doll4hair)
        level4grp.add(doll4stud)
        level4grp.add(doll4acc)
        level4grp.add(doll4glass)
        level4grp.x = -1000
        doll4eblink.setFrame(esarr[0])
        doll4dress.setFrame(darr4[0])
        doll4dressshade.setFrame(darr4[0])
        doll4hair.setFrame(darr4[1])
        doll4bhair.setFrame(darr4[1])
        doll4chain.setFrame(darr4[2])
        doll4stud.setFrame(darr4[3])
        doll4acc.setFrame(darr4[4])
        doll4bag.setFrame(darr4[5])
        doll4top.setFrame(darr4[6])
        doll4topshade.setFrame(darr4[6])
        doll4tophand.setFrame(darr4[6])
        doll4bottom.setFrame(darr4[7])
        doll4bottomshade.setFrame(darr4[7])
        doll4stock.setFrame(darr4[8])
        doll4glass.setFrame(darr4[9])
        if (darr4[5] > 0) {
            doll4hand.setFrame(1)
        } else {
            doll4hand.setFrame(0)
        }
        if (darr4[4] == 1 && darr4[1] != 0 && darr4[1] != 3) {
            doll4hair.setFrame(darr4[1] + 7)
        } else if (darr4[4] == 3) {
            doll4hair.setFrame(darr4[1] + 14)
        } else if (darr4[4] == 6) {
            doll4hair.setFrame(darr4[1] + 21)
        } else {
            doll4hair.setFrame(darr4[1])
        }
        doll4bhair.angle = 0.5
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4bhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: level4dressdollanimation1,
            callbackScope: this
        })

        function level4dressdollanimation1() {
            level4grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level4grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level4grp,
                y: level4grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            this.time.addEvent({
                delay: 3000,
                callback: level4dressdollanimation1,
                callbackScope: this
            })
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4ebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eye,
            x: 470,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: doll4eyestart1,
            callbackScope: this
        });

        function doll4eyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 469,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll4eyestart2,
                callbackScope: this
            });
        }

        function doll4eyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 468,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: doll4eyestart3,
                callbackScope: this
            });
        }

        function doll4eyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 469,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: doll4eyestart4,
                callbackScope: this
            });
        }

        function doll4eyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                x: 470,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: doll4eyestart1,
                callbackScope: this
            });
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4bhair,
            y: doll4bhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4head,
            y: doll4head.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eye,
            y: doll4eye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eyetop,
            y: doll4eyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4eblink,
            y: doll4eblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4ebrow,
            y: doll4ebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4hair,
            y: doll4hair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4stud,
            y: doll4stud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4acc,
            y: doll4acc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4bacc,
            y: doll4bacc.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: doll4glass,
            y: doll4glass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        doll4eblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: doll4headanimation11,
            callbackScope: this
        })

        function doll4headanimation11() {
            doll4eblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: doll4headanimation1,
                callbackScope: this
            })
        }

        function doll4headanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4stud,
                y: doll4stud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4acc,
                y: doll4acc.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4bacc,
                y: doll4bacc.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4bhair,
                y: doll4bhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4head,
                y: doll4head.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4ebrow,
                y: doll4ebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eye,
                y: doll4eye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eyetop,
                y: doll4eyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4eblink,
                y: doll4eblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4hair,
                y: doll4hair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: doll4glass,
                y: doll4glass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            doll4eblink.setFrame(esarr[0] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: doll4headanimation11,
                callbackScope: this
            })

            function doll4headanimation1() {
                doll4eblink.setFrame(esarr[0])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5000,
                    callback: doll4headanimation1,
                    callbackScope: this
                })
            }
        }
        save2 = this.add.sprite(739.4, 540.05, 'save2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'save2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('save2', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        save2.anims.load('save2')
        replay2 = this.add.sprite(620.5, 540.05, 'replay2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'replay2',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('replay2', {
                start: 0,
                end: 9
            }),
            frameRate: 24,
        });
        replay2.anims.load('replay2')
        level1grp.x = 150
        level2grp.x = 150
        level3grp.x = -130
        level4grp.x = -120
        enddollcontainer = this.add.container()
        enddollcontainer.add(level4grp)
        enddollcontainer.add(level1grp)
        enddollcontainer.add(level2grp)
        enddollcontainer.add(level3grp)
        enddollcontainer.x = -1000
        level1grp.visible = false
        level2grp.visible = false
        level3grp.visible = false
        level4grp.visible = false
        save2.setScale(0)
        replay2.setScale(0)
        logomutefun()
        savecontainer = this.add.container()
        savecontainer.add(save2)
        savecontainer.add(replay2)
        savecontainer.add(clickmute)
        savecontainer.add(soundmute)
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });
        this.load.start();
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }
        endbackground.x = safeArea.x - 300
        save2.x = game.context.drawingBufferWidth - 61.6
        replay2.x = game.context.drawingBufferWidth - 179.5
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            endbackground.x = safeArea.x - 300
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
            save2.x = game.context.drawingBufferWidth - 61.6
            replay2.x = game.context.drawingBufferWidth - 179.5
            level1grp.x = 150
            level2grp.x = 150
            level3grp.x = -130
            level4grp.x = -120
            enddollcontainer.x = (1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x
            if (dollIn) {
                trans.x = safeArea.x + 400
            }
        })
        resize()
    },
    update: function () {
        resize()
    }
});

function endscreenstart() {
    setTimeout(enddollanimation, 300)
    setTimeout(endbtnanimation, 800)

    function endbtnanimation() {
        game.scene.scenes[pageNo].tweens.add({
            targets: save2,
            scaleX: 1,
            scaleY: 1,
            ease: 'Back.easeIn',
            duration: 300,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: replay2,
            scaleX: 1,
            scaleY: 1,
            ease: 'Back',
            duration: 300,
        });
    }

    function enddollanimation() {
        endbackground.visible = true
        endbackground1.visible = false
        endbackground2.visible = false
        endbackground3.visible = false
        level1grp.visible = true
        level2grp.visible = false
        level3grp.visible = false
        level4grp.visible = false
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: (1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x,
            ease: 'Back.easeOut',
            duration: 500,
            onComplete: enddollanimation1,
            callbackScope: this
        });
    }

    function enddollanimation1() {
        enddollcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: -1000,
            ease: 'Back.easeIn',
            duration: 500,
            delay: 2500,
            onComplete: enddollanimation2,
            callbackScope: this
        });
    }

    function enddollanimation2() {
        endbackground.visible = false
        endbackground1.visible = true
        endbackground2.visible = false
        endbackground3.visible = false
        level1grp.visible = false
        level2grp.visible = true
        level3grp.visible = false
        level4grp.visible = false
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: (1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x,
            ease: 'Back.easeOut',
            duration: 500,
            onComplete: enddollanimation3,
            callbackScope: this
        });
    }

    function enddollanimation3() {
        enddollcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: -1000,
            ease: 'Back.easeIn',
            duration: 500,
            delay: 2500,
            onComplete: enddollanimation4,
            callbackScope: this
        });
    }

    function enddollanimation4() {
        endbackground.visible = false
        endbackground1.visible = false
        endbackground2.visible = true
        endbackground3.visible = false
        level1grp.visible = false
        level2grp.visible = false
        level3grp.visible = true
        level4grp.visible = false
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: (1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x,
            ease: 'Back.easeOut',
            duration: 500,
            onComplete: enddollanimation5,
            callbackScope: this
        });
    }

    function enddollanimation5() {
        enddollcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: -1000,
            ease: 'Back.easeIn',
            duration: 500,
            delay: 2500,
            onComplete: enddollanimation6,
            callbackScope: this
        });
    }

    function enddollanimation6() {
        endbackground.visible = false
        endbackground1.visible = false
        endbackground2.visible = false
        endbackground3.visible = true
        level1grp.visible = false
        level2grp.visible = false
        level3grp.visible = false
        level4grp.visible = true
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: (1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x,
            ease: 'Back.easeOut',
            duration: 500,
            onComplete: enddollanimation7,
            callbackScope: this
        });
    }

    function enddollanimation7() {
        enddollcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        game.scene.scenes[pageNo].tweens.add({
            targets: enddollcontainer,
            x: -1000,
            ease: 'Back.easeIn',
            duration: 500,
            delay: 2500,
            onComplete: enddollanimation,
            callbackScope: this
        });
    }
    replay2.on('pointerover', replay2overstart)
    replay2.on('pointerout', replay2outstart)
    replay2.on('pointerdown', replay2downstart)
    replay2.on('pointerup', replay2upstart)

    function replay2overstart() {
        replay2.anims.play('replay2')
    }

    function replay2outstart() {
        replay2.anims.stop('replay2')
    }

    function replay2downstart() {
        if (!startgame10 && loadFinish) {
            startgame10 = true
            playsoundeffects('clickss')
            replay2.anims.stop('replay2')
            replay2.setFrame(10)
            transitionIn()
        }
    }

    function replay2upstart() {}
    save2.on('pointerover', save2overstart)
    save2.on('pointerout', save2outstart)
    save2.on('pointerdown', save2downstart)
    save2.on('pointerup', save2upstart)

    function save2overstart() {
        save2.anims.play('save2')
    }

    function save2outstart() {
        save2.anims.stop('save2')
    }

    function save2downstart() {
        if (!startgame10) {
            playsoundeffects('clickss')
            save2.anims.stop('save2')
            savecontainer.visible = false
            setTimeout(hideAction, 500)

            function hideAction() {
                savecontainer.visible = true
            }
            var canvas;

            function exportCanvasAsPNG(id, fileName, dataUrl) {
                var canvasElement = document.getElementById(id);
                var MIME_TYPE = "image/png";
                var imgURL = dataUrl;
                var dlLink = document.createElement('a');
                dlLink.download = fileName;
                dlLink.href = imgURL;
                dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
            }
            game.renderer.snapshot(function (image) {
                var imgSrcs;
                imgSrcs = image.src
                exportCanvasAsPNG(canvas, 'bffs-retro-time-travel-fashion', imgSrcs);
            });
        }
    }

    function save2upstart() {}
}

function rewardpauseGame() {}

function rewardfailedGame() {
    //resume Game Code
    if (pageNo == 5) {
        fillbackground1.visible = true
        adpanelcontainer.setScale(1)
        adcountstart1 = 0
    } else if (pageNo == 6) {
        fillbackground1.visible = true
        adpanelcontainer.setScale(1)
        adcountstart2 = 0
    } else if (pageNo == 7) {
        fillbackground1.visible = true
        adpanelcontainer.setScale(1)
        adcountstart3 = 0
    } else if (pageNo == 8) {
        fillbackground1.visible = true
        adpanelcontainer.setScale(1)
        adcountstart4 = 0
    }
}

function rewardresumeGame() {
    //resume Game Codefillbackground1.visible = false
    adpanelcontainer.setScale(0)
    soundstart = 0
    if (pageNo == 5) {
        lock1.visible = false
        empty.visible = false
        fillbackground1.visible = false
        adcountstart1 = 1
        game['level1dress' + 3].setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
    } else if (pageNo == 6) {
        lock2.visible = false
        empty.visible = false
        fillbackground1.visible = false
        adcountstart2 = 1
        game['level2dress' + 4].setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
    } else if (pageNo == 7) {
        lock3.visible = false
        empty.visible = false
        fillbackground1.visible = false
        adcountstart3 = 1
        game['level3dress' + 3].setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
    } else if (pageNo == 8) {
        lock4.visible = false
        empty.visible = false
        fillbackground1.visible = false
        adcountstart4 = 1
        game['level4dress' + 4].setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
    }
}
const config = {
    backgroundColor: '#ffffff',
    parent: 'theGame',
    scale: {
        mode: Phaser.Scale.NONE,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    plugins: {
        scene: [
            {
                key: 'SpinePlugin',
                plugin: window.SpinePlugin,
                sceneKey: 'spine'
      }
    ]
    },
    height: DEFAULT_HEIGHT,
    scene: [bootstate, initialloader, titlescreen, storyline, levelselect, level1, level2, level3, level4, thumb, endscreen],
}
window.addEventListener('load', () => {
    game = new Phaser.Game(config)
    const resize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        let width = DEFAULT_WIDTH
        let height = DEFAULT_HEIGHT
        let maxWidth = MAX_WIDTH
        let maxHeight = MAX_HEIGHT
        let scaleMode = SCALE_MODE
        let scale = Math.min(w / width, h / height)
        let newWidth = Math.min(w / scale, maxWidth)
        let newHeight = Math.min(h / scale, maxHeight)
        let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT
        let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT
        let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT
        let smooth = 1
        game.scale.resize(newWidth * smooth, newHeight * smooth)
        game.canvas.style.width = newWidth * scale + 'px'
        game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`
        game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`
    }
    window.addEventListener('resize', event => {
        resize()
    })
    resize()
})
