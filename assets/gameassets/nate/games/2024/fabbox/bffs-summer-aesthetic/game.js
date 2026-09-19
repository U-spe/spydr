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
var soundstart = 0;
var loadFinish = false
var soundMuted = false
var gameName = 'bffs-summer-aesthetic';

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
        this.load.image('lpbar', 'assets/loader/loaderprogress.png');
        this.load.image('bgloader', 'assets/loader/loaderbackground.png');
        this.load.image('loaderbarbg', 'assets/loader/loaderbarbg.png');
        this.load.image('loaderpad', 'assets/loader/loaderpad.png');
        this.load.image('loaderplay', 'assets/loader/play.png');
        this.load.image('loadermask', 'assets/loader/loadermask.png');
        this.load.image('loaderlogo', 'assets/loader/online-games-logo.png');

    },
    create: function () {
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.scene.start('initialloader');
    }
});
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
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.scene.start('initialloader');
    }
});
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
        this.load.spritesheet('moregames2', 'assets/buttons/moregames.png', {
            frameWidth: 160,
            frameHeight: 159
        });

        this.load.image('settings', 'assets/buttons/settings.png');
        //titlescreen
        this.load.image('titlebackground', 'assets/titlescreen/background.jpg');
        this.load.image('titleshadow', 'assets/titlescreen/shadow.png');
        this.load.image('titlepad', 'assets/titlescreen/titlepad.png');
        this.load.image('titlepad1', 'assets/titlescreen/titlepad1.png');
        this.load.image('titleobj1', 'assets/titlescreen/obj1.png');
        this.load.image('titleobj', 'assets/titlescreen/obj.png');
        this.load.image('title1', 'assets/titlescreen/title1.png');
        this.load.image('title2', 'assets/titlescreen/title2.png');
        this.load.image('title3', 'assets/titlescreen/title3.png');

        this.load.image('playstorebtn1', 'assets/titlescreen/playstorebtn.png')

        this.load.image('titlebhair1', 'assets/titlescreen/doll1/bhair.png')
        this.load.image('titlebody1', 'assets/titlescreen/doll1/body.png')
        this.load.spritesheet('titleeblink1', 'assets/titlescreen/doll1/eblink.png', {
            frameWidth: 89,
            frameHeight: 41
        });
        this.load.image('titlehair1', 'assets/titlescreen/doll1/hair.png')

        //        doll2
        this.load.image('titlebhair2', 'assets/titlescreen/doll2/bhair.png')
        this.load.image('titlebody2', 'assets/titlescreen/doll2/body.png')
        this.load.spritesheet('titleeblink2', 'assets/titlescreen/doll2/eblink.png', {
            frameWidth: 98,
            frameHeight: 35
        });
        this.load.image('titlehair2', 'assets/titlescreen/doll2/hair.png')

        //        doll3

        this.load.image('titlebhair3', 'assets/titlescreen/doll3/bhair.png')
        this.load.image('titlebody3', 'assets/titlescreen/doll3/body.png')
        this.load.spritesheet('titleeblink3', 'assets/titlescreen/doll3/eblink.png', {
            frameWidth: 86,
            frameHeight: 31
        });
        this.load.image('titlehair3', 'assets/titlescreen/doll3/hair.png')

        //        doll4

        this.load.image('titlebhair4', 'assets/titlescreen/doll4/bhair.png')
        this.load.image('titlebody4', 'assets/titlescreen/doll4/body.png')
        this.load.spritesheet('titleeblink4', 'assets/titlescreen/doll4/eblink.png', {
            frameWidth: 84,
            frameHeight: 32
        });
        this.load.image('titlehair4', 'assets/titlescreen/doll4/hair.png')

        //          doll5

        this.load.image('titlebody5', 'assets/titlescreen/doll5/body.png')
        this.load.spritesheet('titleeblink5', 'assets/titlescreen/doll5/eblink.png', {
            frameWidth: 89,
            frameHeight: 41
        });
        this.load.image('titlehair5', 'assets/titlescreen/doll5/hair.png')
        //doll6
        this.load.image('titlebody6', 'assets/titlescreen/doll6/body.png')
        this.load.spritesheet('titleeblink6', 'assets/titlescreen/doll6/eblink.png', {
            frameWidth: 77,
            frameHeight: 29
        });
        this.load.image('titlehair6', 'assets/titlescreen/doll6/hair.png')

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

        this.load.image('phone', 'assets/storyline/phone.png');
        this.load.image('sbubble1', 'assets/storyline/sbubble1.png');
        this.load.image('sbubble2', 'assets/storyline/sbubble2.png');
        this.load.image('sbubble3', 'assets/storyline/sbubble3.png');
        this.load.image('sbubble4', 'assets/storyline/sbubble4.png');

        //levelselect

        this.load.image('levelselectbackground', 'assets/levelselect/background.jpg');

        this.load.image('handindication', 'assets/levelselect/hand.png');

        this.load.spritesheet('level1', 'assets/levelselect/level1.png', {
            frameWidth: 246,
            frameHeight: 274
        });
        this.load.spritesheet('level2', 'assets/levelselect/level2.png', {
            frameWidth: 246,
            frameHeight: 274
        });
        this.load.spritesheet('level3', 'assets/levelselect/level3.png', {
            frameWidth: 246,
            frameHeight: 274
        });
        this.load.spritesheet('level4', 'assets/levelselect/level4.png', {
            frameWidth: 246,
            frameHeight: 274
        });
        this.load.spritesheet('level5', 'assets/levelselect/level5.png', {
            frameWidth: 246,
            frameHeight: 274
        });
        this.load.spritesheet('level6', 'assets/levelselect/level6.png', {
            frameWidth: 246,
            frameHeight: 274
        });

        this.load.spritesheet('stargilter', 'assets/levelselect/stargilter.png', {
            frameWidth: 247,
            frameHeight: 251
        });
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
        this.load.spritesheet('level1dots', 'assets/level1/dots.png', {
            frameWidth: 44,
            frameHeight: 19
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


        this.load.image('level1hair1', 'assets/level1/hair1.png');
        this.load.image('level1hair2', 'assets/level1/hair2.png');
        this.load.image('level1hair3', 'assets/level1/hair3.png');
        this.load.image('level1hair4', 'assets/level1/hair4.png');
        this.load.image('level1hair5', 'assets/level1/hair5.png');
        this.load.image('level1hair6', 'assets/level1/hair6.png');

        this.load.image('level1bag1', 'assets/level1/bag1.png');
        this.load.image('level1bag2', 'assets/level1/bag2.png');
        this.load.image('level1bag3', 'assets/level1/bag3.png');
        this.load.image('level1bag4', 'assets/level1/bag4.png');

        this.load.image('level1glass1', 'assets/level1/glass1.png');
        this.load.image('level1glass2', 'assets/level1/glass2.png');
        this.load.image('level1glass3', 'assets/level1/glass3.png');
        this.load.image('level1glass4', 'assets/level1/glass4.png');

        this.load.image('level1stud1', 'assets/level1/stud1.png');
        this.load.image('level1stud2', 'assets/level1/stud2.png');
        this.load.image('level1stud3', 'assets/level1/stud3.png');
        this.load.image('level1stud4', 'assets/level1/stud4.png');
        this.load.image('level1stud5', 'assets/level1/stud5.png');
        this.load.image('level1stud6', 'assets/level1/stud6.png');

        this.load.image('level1chain1', 'assets/level1/chain1.png');
        this.load.image('level1chain2', 'assets/level1/chain2.png');
        this.load.image('level1chain3', 'assets/level1/chain3.png');
        this.load.image('level1chain4', 'assets/level1/chain4.png');
        this.load.image('level1chain5', 'assets/level1/chain5.png');
        this.load.image('level1chain6', 'assets/level1/chain6.png');
        this.load.image('larrow', 'assets/level1/arrow.png');

        this.load.spritesheet('level1cat1', 'assets/level1/cat1.png', {
            frameWidth: 69,
            frameHeight: 72
        });
        this.load.spritesheet('level1cat2', 'assets/level1/cat2.png', {
            frameWidth: 68,
            frameHeight: 69
        });
        this.load.spritesheet('level1cat3', 'assets/level1/cat3.png', {
            frameWidth: 68,
            frameHeight: 69
        });
        this.load.spritesheet('level1cat4', 'assets/level1/cat4.png', {
            frameWidth: 68,
            frameHeight: 69
        });
        this.load.spritesheet('level1cat5', 'assets/level1/cat5.png', {
            frameWidth: 68,
            frameHeight: 69
        });
        this.load.spritesheet('level1cat6', 'assets/level1/cat6.png', {
            frameWidth: 68,
            frameHeight: 69
        });




        //level3
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

        this.load.image('level2hair1', 'assets/level2/hair1.png');
        this.load.image('level2hair2', 'assets/level2/hair2.png');
        this.load.image('level2hair3', 'assets/level2/hair3.png');
        this.load.image('level2hair4', 'assets/level2/hair4.png');
        this.load.image('level2hair5', 'assets/level2/hair5.png');
        this.load.image('level2hair6', 'assets/level2/hair6.png');

        this.load.image('level2bag1', 'assets/level2/bag1.png');
        this.load.image('level2bag2', 'assets/level2/bag2.png');
        this.load.image('level2bag3', 'assets/level2/bag3.png');
        this.load.image('level2bag4', 'assets/level2/bag4.png');

        this.load.image('level2glass1', 'assets/level2/glass1.png');
        this.load.image('level2glass2', 'assets/level2/glass2.png');
        this.load.image('level2glass3', 'assets/level2/glass3.png');
        this.load.image('level2glass4', 'assets/level2/glass4.png');


        this.load.image('level2stud1', 'assets/level2/stud1.png');
        this.load.image('level2stud2', 'assets/level2/stud2.png');
        this.load.image('level2stud3', 'assets/level2/stud3.png');
        this.load.image('level2stud4', 'assets/level2/stud4.png');
        this.load.image('level2stud5', 'assets/level2/stud5.png');
        this.load.image('level2stud6', 'assets/level2/stud6.png');

        this.load.image('level2chain1', 'assets/level2/chain1.png');
        this.load.image('level2chain2', 'assets/level2/chain2.png');
        this.load.image('level2chain3', 'assets/level2/chain3.png');
        this.load.image('level2chain4', 'assets/level2/chain4.png');
        this.load.image('level2chain5', 'assets/level2/chain5.png');
        this.load.image('level2chain6', 'assets/level2/chain6.png');




        //level4
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

        this.load.image('level3hair1', 'assets/level3/hair1.png');
        this.load.image('level3hair2', 'assets/level3/hair2.png');
        this.load.image('level3hair3', 'assets/level3/hair3.png');
        this.load.image('level3hair4', 'assets/level3/hair4.png');
        this.load.image('level3hair5', 'assets/level3/hair5.png');
        this.load.image('level3hair6', 'assets/level3/hair6.png');

        this.load.image('level3bag1', 'assets/level3/bag1.png');
        this.load.image('level3bag2', 'assets/level3/bag2.png');
        this.load.image('level3bag3', 'assets/level3/bag3.png');
        this.load.image('level3bag4', 'assets/level3/bag4.png');

        this.load.image('level3glass1', 'assets/level3/glass1.png');
        this.load.image('level3glass2', 'assets/level3/glass2.png');
        this.load.image('level3glass3', 'assets/level3/glass3.png');
        this.load.image('level3glass4', 'assets/level3/glass4.png');

        this.load.image('level3stud1', 'assets/level3/stud1.png');
        this.load.image('level3stud2', 'assets/level3/stud2.png');
        this.load.image('level3stud3', 'assets/level3/stud3.png');
        this.load.image('level3stud4', 'assets/level3/stud4.png');
        this.load.image('level3stud5', 'assets/level3/stud5.png');
        this.load.image('level3stud6', 'assets/level3/stud6.png');

        this.load.image('level3chain1', 'assets/level3/chain1.png');
        this.load.image('level3chain2', 'assets/level3/chain2.png');
        this.load.image('level3chain3', 'assets/level3/chain3.png');
        this.load.image('level3chain4', 'assets/level3/chain4.png');
        this.load.image('level3chain5', 'assets/level3/chain5.png');
        this.load.image('level3chain6', 'assets/level3/chain6.png');




        //level1
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

        this.load.image('level4hair1', 'assets/level4/hair1.png');
        this.load.image('level4hair2', 'assets/level4/hair2.png');
        this.load.image('level4hair3', 'assets/level4/hair3.png');
        this.load.image('level4hair4', 'assets/level4/hair4.png');
        this.load.image('level4hair5', 'assets/level4/hair5.png');
        this.load.image('level4hair6', 'assets/level4/hair6.png');

        this.load.image('level4bag1', 'assets/level4/bag1.png');
        this.load.image('level4bag2', 'assets/level4/bag2.png');
        this.load.image('level4bag3', 'assets/level4/bag3.png');
        this.load.image('level4bag4', 'assets/level4/bag4.png');

        this.load.image('level4glass1', 'assets/level4/glass1.png');
        this.load.image('level4glass2', 'assets/level4/glass2.png');
        this.load.image('level4glass3', 'assets/level4/glass3.png');
        this.load.image('level4glass4', 'assets/level4/glass4.png');

        this.load.image('level4stud1', 'assets/level4/stud1.png');
        this.load.image('level4stud2', 'assets/level4/stud2.png');
        this.load.image('level4stud3', 'assets/level4/stud3.png');
        this.load.image('level4stud4', 'assets/level4/stud4.png');
        this.load.image('level4stud5', 'assets/level4/stud5.png');
        this.load.image('level4stud6', 'assets/level4/stud6.png');

        this.load.image('level4chain1', 'assets/level4/chain1.png');
        this.load.image('level4chain2', 'assets/level4/chain2.png');
        this.load.image('level4chain3', 'assets/level4/chain3.png');
        this.load.image('level4chain4', 'assets/level4/chain4.png');
        this.load.image('level4chain5', 'assets/level4/chain5.png');
        this.load.image('level4chain6', 'assets/level4/chain6.png');
        //doll4


        this.load.image('level5background', 'assets/level5/background.jpg');
        this.load.image('level5dress1', 'assets/level5/dress1.png');
        this.load.image('level5dress2', 'assets/level5/dress2.png');
        this.load.image('level5dress3', 'assets/level5/dress3.png');
        this.load.image('level5dress4', 'assets/level5/dress4.png');
        this.load.image('level5dress5', 'assets/level5/dress5.png');
        this.load.image('level5dress6', 'assets/level5/dress6.png');
        this.load.image('level5dress7', 'assets/level5/dress7.png');
        this.load.image('level5dress8', 'assets/level5/dress8.png');
        this.load.image('level5dress9', 'assets/level5/dress9.png');
        this.load.image('level5dress10', 'assets/level5/dress10.png');

        this.load.image('level5hair1', 'assets/level5/hair1.png');
        this.load.image('level5hair2', 'assets/level5/hair2.png');
        this.load.image('level5hair3', 'assets/level5/hair3.png');
        this.load.image('level5hair4', 'assets/level5/hair4.png');
        this.load.image('level5hair5', 'assets/level5/hair5.png');
        this.load.image('level5hair6', 'assets/level5/hair6.png');

        this.load.image('level5bag1', 'assets/level5/bag1.png');
        this.load.image('level5bag2', 'assets/level5/bag2.png');
        this.load.image('level5bag3', 'assets/level5/bag3.png');
        this.load.image('level5bag4', 'assets/level5/bag4.png');

        this.load.image('level5glass1', 'assets/level5/glass1.png');
        this.load.image('level5glass2', 'assets/level5/glass2.png');
        this.load.image('level5glass3', 'assets/level5/glass3.png');
        this.load.image('level5glass4', 'assets/level5/glass4.png');

        this.load.image('level5stud1', 'assets/level5/stud1.png');
        this.load.image('level5stud2', 'assets/level5/stud2.png');
        this.load.image('level5stud3', 'assets/level5/stud3.png');
        this.load.image('level5stud4', 'assets/level5/stud4.png');
        this.load.image('level5stud5', 'assets/level5/stud5.png');
        this.load.image('level5stud6', 'assets/level5/stud6.png');

        this.load.image('level5chain1', 'assets/level5/chain1.png');
        this.load.image('level5chain2', 'assets/level5/chain2.png');
        this.load.image('level5chain3', 'assets/level5/chain3.png');
        this.load.image('level5chain4', 'assets/level5/chain4.png');
        this.load.image('level5chain5', 'assets/level5/chain5.png');
        this.load.image('level5chain6', 'assets/level5/chain6.png');


        this.load.image('level6background', 'assets/level6/background.jpg');
        this.load.image('level6dress1', 'assets/level6/dress1.png');
        this.load.image('level6dress2', 'assets/level6/dress2.png');
        this.load.image('level6dress3', 'assets/level6/dress3.png');
        this.load.image('level6dress4', 'assets/level6/dress4.png');
        this.load.image('level6dress5', 'assets/level6/dress5.png');
        this.load.image('level6dress6', 'assets/level6/dress6.png');
        this.load.image('level6dress7', 'assets/level6/dress7.png');
        this.load.image('level6dress8', 'assets/level6/dress8.png');
        this.load.image('level6dress9', 'assets/level6/dress9.png');
        this.load.image('level6dress10', 'assets/level6/dress10.png');

        this.load.image('level6hair1', 'assets/level6/hair1.png');
        this.load.image('level6hair2', 'assets/level6/hair2.png');
        this.load.image('level6hair3', 'assets/level6/hair3.png');
        this.load.image('level6hair4', 'assets/level6/hair4.png');
        this.load.image('level6hair5', 'assets/level6/hair5.png');
        this.load.image('level6hair6', 'assets/level6/hair6.png');

        this.load.image('level6bag1', 'assets/level6/bag1.png');
        this.load.image('level6bag2', 'assets/level6/bag2.png');
        this.load.image('level6bag3', 'assets/level6/bag3.png');
        this.load.image('level6bag4', 'assets/level6/bag4.png');

        this.load.image('level6glass1', 'assets/level6/glass1.png');
        this.load.image('level6glass2', 'assets/level6/glass2.png');
        this.load.image('level6glass3', 'assets/level6/glass3.png');
        this.load.image('level6glass4', 'assets/level6/glass4.png');

        this.load.image('level6stud1', 'assets/level6/stud1.png');
        this.load.image('level6stud2', 'assets/level6/stud2.png');
        this.load.image('level6stud3', 'assets/level6/stud3.png');
        this.load.image('level6stud4', 'assets/level6/stud4.png');
        this.load.image('level6stud5', 'assets/level6/stud5.png');
        this.load.image('level6stud6', 'assets/level6/stud6.png');

        this.load.image('level6chain1', 'assets/level6/chain1.png');
        this.load.image('level6chain2', 'assets/level6/chain2.png');
        this.load.image('level6chain3', 'assets/level6/chain3.png');
        this.load.image('level6chain4', 'assets/level6/chain4.png');
        this.load.image('level6chain5', 'assets/level6/chain5.png');
        this.load.image('level6chain6', 'assets/level6/chain6.png');

      
        //endbackground
        this.load.image('endbackground', 'assets/endscreen/background1.jpg');

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
var lcount9 = 0
var levelfinish = false
var darr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var darr6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var marr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var marr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var marr3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var marr4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var marr5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var marr6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var esarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var lesarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var adcountstart = 0
var adcountstart1 = 0
var adcountstart2 = 0

var titlescreen = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function titlescreen() {
        Phaser.Scene.call(this, {
            key: 'titlescreen'
        });
    },
    preload: function () {

        adcountstart = 0
        adcountstart1 = 0
        adcountstart2 = 0
        pageNo = 2
        loadFinish = false
        startgame2 = false
        level = 1;
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
        lcount9 = 0
        darr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        darr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        darr3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        darr4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        darr5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        darr6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        marr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        marr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        marr3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        marr4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        marr5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        marr6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        esarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        lesarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

        titlebhair1 = this.add.image(181, 51, 'titlebhair1').setOrigin(0, 0)
        titlebody1 = this.add.image(187, 33, 'titlebody1').setOrigin(0, 0)
        titleeblink1 = this.add.image(229, 90, 'titleeblink1').setOrigin(0, 0)
        titlehair1 = this.add.image(177, 27, 'titlehair1').setOrigin(0, 0)

        titledollgroup1 = this.add.container()
        titledollgroup1.add(titlebhair1)
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
                delay: 2300,
                callback: titledollgroup1animation11,
                callbackScope: this
            })
        }

        titlebhair2 = this.add.image(0, 69, 'titlebhair2').setOrigin(0, 0)
        titlebody2 = this.add.image(-77, 44, 'titlebody2').setOrigin(0, 0)
        titleeblink2 = this.add.image(38, 97, 'titleeblink2').setOrigin(0, 0)
        titlehair2 = this.add.image(8, 33, 'titlehair2').setOrigin(0, 0)

        titledollgroup2 = this.add.container()
        titledollgroup2.add(titlebhair2)
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

        titlebhair3 = this.add.image(0, 49, 'titlebhair3').setOrigin(0, 0)
        titlebody3 = this.add.image(0, 43, 'titlebody3').setOrigin(0, 0)
        titleeblink3 = this.add.image(59, 95, 'titleeblink3').setOrigin(0, 0)
        titlehair3 = this.add.image(14, 27, 'titlehair3').setOrigin(0, 0)

        titledollgroup3 = this.add.container()
        titledollgroup3.add(titlebhair3)
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
                delay: 2300,
                callback: titledollgroup3animation11,
                callbackScope: this
            })
        }

        titlebhair4 = this.add.image(208, 26, 'titlebhair4').setOrigin(0, 0)
        titlebody4 = this.add.image(179, 33, 'titlebody4').setOrigin(0, 0)
        titleeblink4 = this.add.image(265, 90, 'titleeblink4').setOrigin(0, 0)
        titlehair4 = this.add.image(174, 21, 'titlehair4').setOrigin(0, 0)

        titledollgroup4 = this.add.container()
        titledollgroup4.add(titlebhair4)
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
        titlebody5 = this.add.image(0, 49, 'titlebody5').setOrigin(0, 0)
        titleeblink5 = this.add.image(71, 94, 'titleeblink5').setOrigin(0, 0)
        titlehair5 = this.add.image(0, 11, 'titlehair5').setOrigin(0, 0)

        titledollgroup5 = this.add.container()
        titledollgroup5.add(titlebody5)
        titledollgroup5.add(titleeblink5)
        titledollgroup5.add(titlehair5)

        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: titledollgroup5animation11,
            callbackScope: this
        })

        function titledollgroup5animation11() {
            titleeblink5.setFrame(esarr[2] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: titledollgroup5animation12,
                callbackScope: this
            })
        }

        function titledollgroup5animation12() {
            titleeblink5.setFrame(esarr[2])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 2300,
                callback: titledollgroup5animation11,
                callbackScope: this
            })
        }

        titlebody6 = this.add.image(180, 47, 'titlebody6').setOrigin(0, 0)
        titleeblink6 = this.add.image(244, 99, 'titleeblink6').setOrigin(0, 0)
        titlehair6 = this.add.image(192, 27, 'titlehair6').setOrigin(0, 0)

        titledollgroup6 = this.add.container()
        titledollgroup6.add(titlebody6)
        titledollgroup6.add(titleeblink6)
        titledollgroup6.add(titlehair6)

        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: titledollgroup6animation11,
            callbackScope: this
        })

        function titledollgroup6animation11() {
            titleeblink6.setFrame(esarr[2] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: titledollgroup6animation12,
                callbackScope: this
            })
        }

        function titledollgroup6animation12() {
            titleeblink6.setFrame(esarr[2])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 3000,
                callback: titledollgroup6animation11,
                callbackScope: this
            })
        }

        titledollcontainer = this.add.container()

        titledollcontainer.add(titledollgroup1)
        titledollcontainer.add(titledollgroup3)
        titledollcontainer.add(titledollgroup5)
        titledollcontainer.add(titledollgroup2)
        titledollcontainer.add(titledollgroup4)
        titledollcontainer.add(titledollgroup6)

        titledollgroup1.visible = false
        titledollgroup2.visible = false
        titledollgroup3.visible = false
        titledollgroup4.visible = false
        titledollgroup5.visible = false

        titledollcontainer.x = -1200

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
            titledollgroup5.visible = false
            titledollgroup6.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: titledollcontainer,
                x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                ease: 'Back.easeOut',
                duration: 600,
                onComplete: titledollanimation2,
                callbackScope: this
            });
        }

        function titledollanimation2() {
            titledollcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                game.scene.scenes[pageNo].tweens.add({
                    targets: titledollcontainer,
                    x: -1200,
                    ease: 'Back.easeIn',
                    duration: 600,
                    delay: 2000,
                    onComplete: titledollanimation3,
                    callbackScope: this

                });
        }

        function titledollanimation3() {
            titledollgroup1.visible = false
            titledollgroup2.visible = false
            titledollgroup3.visible = true
            titledollgroup4.visible = true
            titledollgroup5.visible = false
            titledollgroup6.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: titledollcontainer,
                x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                ease: 'Back.easeOut',
                duration: 600,
                onComplete: titledollanimation4,
                callbackScope: this
            });
        }

        function titledollanimation4() {
            titledollcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                game.scene.scenes[pageNo].tweens.add({
                    targets: titledollcontainer,
                    x: -1200,
                    ease: 'Back.easeIn',
                    duration: 600,
                    delay: 2000,
                    onComplete: titledollanimation5,
                    callbackScope: this
                });
        }

        function titledollanimation5() {
            titledollgroup1.visible = false
            titledollgroup2.visible = false
            titledollgroup3.visible = false
            titledollgroup4.visible = false
            titledollgroup5.visible = true
            titledollgroup6.visible = true
            game.scene.scenes[pageNo].tweens.add({
                targets: titledollcontainer,
                x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                ease: 'Back.easeOut',
                duration: 600,
                onComplete: titledollanimation6,
                callbackScope: this
            });
        }

        function titledollanimation6() {
            titledollcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                game.scene.scenes[pageNo].tweens.add({
                    targets: titledollcontainer,
                    x: -1200,
                    ease: 'Back.easeIn',
                    duration: 600,
                    delay: 2000,
                    onComplete: titledollanimation1,
                    callbackScope: this
                });
        }

        titleobj1 = this.add.image(725.5, 273, 'titleobj1').setOrigin(0.5, 0.5)
        titleobj = this.add.image(412, 261, 'titleobj').setOrigin(0.5, 0.5)
        title1 = this.add.image(410.5, 132.5, 'title1').setOrigin(0.5, 0.5)
        title2 = this.add.image(580.5, 188.5, 'title2').setOrigin(0.5, 0.5)
        title3 = this.add.image(674.5, 246.5, 'title3').setOrigin(0.5, 0.5)
        titleshadow = this.add.image(569, 224.5, 'titleshadow').setOrigin(0.5, 0.5)
        titlepad = this.add.image(583.5, 168, 'titlepad').setOrigin(0.5, 0.5)
        titlepad1 = this.add.image(581, 263.5, 'titlepad1').setOrigin(0.5, 0.5)

        titlegrp = this.add.container()

        titlegrp.add(titleshadow)
        titlegrp.add(titlepad)
        titlegrp.add(title1)
        titlegrp.add(titleobj)
        titlegrp.add(titlepad1)
        titlegrp.add(title2)
        titlegrp.add(title3)
        titlegrp.add(titleobj1)

        title1.alpha = 0
        title3.alpha = 0
        titleshadow.alpha = 0

        titlepad1.scale = 0
        titlepad.scale = 0
        titleobj.scale = 0
        title2.scale = 0
        titleobj1.scale = 0

        titlegrp.x = (safeArea.x * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.5))

        game.scene.scenes[pageNo].tweens.add({
            targets: titlepad,
            scaleX: 1,
            scaleY: 1,
            ease: 'Back.easeOut',
            duration: 500,
            delay: 500,
            onComplete: titleanimation,
            callbackScope: this

        });

        function titleanimation() {
            game.scene.scenes[pageNo].tweens.add({
                targets: title1,
                x: title1.x + 100,
                alpha: 1,
                ease: 'Back.easeOut',
                duration: 500,

            });
            game.scene.scenes[pageNo].tweens.add({
                targets: titlepad1,
                scaleX: 1,
                scaleY: 1,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 500,

            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title2,
                scaleX: 1,
                scaleY: 1,
                angle: 360,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 1000,

            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title3,
                alpha: 1,
                x: title3.x - 100,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 1500,

            });
            game.scene.scenes[pageNo].tweens.add({
                targets: titleobj,
                scaleX: 1,
                scaleY: 1,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 2000,

            });
            game.scene.scenes[pageNo].tweens.add({
                targets: titleobj1,
                scaleX: 1,
                scaleY: 1,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 2500,
                onComplete: titleanimation1,
                callbackScope: this

            });
        }

        function titleanimation1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: titleshadow,
                alpha: 1,
                ease: 'Linear',
                duration: 500,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: title1,
                scaleX: 1.05,
                scaleY: 1.05,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title2,
                scaleX: 0.95,
                scaleY: 0.95,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title3,
                scaleX: 1.05,
                scaleY: 1.05,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: titleobj,
                scaleX: 0.95,
                scaleY: 0.95,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: titleobj1,
                scaleX: 1.05,
                scaleY: 1.05,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
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


        play = this.add.sprite(570, 450, 'play').setOrigin(0.5, 0.5).setInteractive({
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

        titlegrp.x = (safeArea.x * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 2))
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
            titlegrp.x = (safeArea.x) * (((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 2))
            


            if (!startgame2) {
                titledollcontainer.x = (((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            }


            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25

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

    function playupstart() {

    }

}




function transitionIn() {

    trans = game.scene.scenes[pageNo].add.spine(400, 300, 'trans', 'in', false);
    trans.x = safeArea.x + 400
    trans.setInteractive()
    trans.state.addListener({
        event: function (entry, event) {
            if (event.stringValue == "in") {
                if (pageNo == 2) {
                    game.scene.scenes[pageNo].scene.stop('titlescreen')
                    game.scene.run('storyline');
                } else if (pageNo == 3) {
                    game.scene.scenes[pageNo].scene.stop('storyline');
                    game.scene.run('levelselect');
                } else if (pageNo == 4 && lcount == 1) {
                    game.scene.scenes[pageNo].scene.stop('levelselect')
                    game.scene.run('level1');
                } else if (pageNo == 5) {
                    game.scene.scenes[pageNo].scene.stop('level1')
                    game.scene.run('levelselect');
                } else if (pageNo == 4 && lcount == 2) {
                    game.scene.scenes[pageNo].scene.stop('levelselect')
                    game.scene.run('level2');
                } else if (pageNo == 6) {
                    game.scene.scenes[pageNo].scene.stop('level2')
                    game.scene.run('levelselect');
                } else if (pageNo == 4 && lcount == 3) {
                    game.scene.scenes[pageNo].scene.stop('levelselect')
                    game.scene.run('level3');
                } else if (pageNo == 7) {
                    game.scene.scenes[pageNo].scene.stop('level3')
                    game.scene.run('levelselect');
                } else if (pageNo == 4 && lcount == 4) {
                    game.scene.scenes[pageNo].scene.stop('levelselect')
                    game.scene.run('level4');
                } else if (pageNo == 8) {
                    game.scene.scenes[pageNo].scene.stop('level4')
                    game.scene.run('levelselect');
                } else if (pageNo == 4 && lcount == 5) {
                    game.scene.scenes[pageNo].scene.stop('levelselect')
                    game.scene.run('level5');
                } else if (pageNo == 9) {
                    game.scene.scenes[pageNo].scene.stop('level5')
                    game.scene.run('levelselect');
                } else if (pageNo == 4 && lcount == 6) {
                    game.scene.scenes[pageNo].scene.stop('levelselect')
                    game.scene.run('level6');
                } else if (pageNo == 10) {
                    game.scene.scenes[pageNo].scene.stop('level6')
                    game.scene.run('endscreen');
                } else if (pageNo == 11) {
                    game.scene.scenes[pageNo].scene.stop('thumb')
                    game.scene.run('endscreen');
                } else if (pageNo == 12) {
                    game.scene.scenes[pageNo].scene.stop('endscreen')
                    game.scene.run('titlescreen');
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
                    level5start()
                } else if (pageNo == 10) {
                    level6start()
                } else if (pageNo == 11) {
                    thumbstart()
                } else if (pageNo == 12) {
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
        playsoundeffects('setclick')
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
        playsoundeffects('setclick')
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

        phone = this.add.image(187, 63, 'phone').setOrigin(0, 0)

        sbubble1 = this.add.sprite(223, 118, 'sbubble1').setOrigin(0.5, 0.5).setAlpha(0)
        sbubble2 = this.add.sprite(226, 204, 'sbubble2').setOrigin(0.5, 0.5).setAlpha(0)
        sbubble3 = this.add.sprite(232, 310, 'sbubble3').setOrigin(0.5, 0.5).setAlpha(0)
        sbubble4 = this.add.sprite(243, 413, 'sbubble4').setOrigin(0.5, 0.5).setAlpha(0)

        sbubble1.x += parseFloat(sbubble1.width / 2);
        sbubble1.y += parseFloat(sbubble1.height / 2);

        sbubble2.x += parseFloat(sbubble2.width / 2);
        sbubble2.y += parseFloat(sbubble2.height / 2);

        sbubble3.x += parseFloat(sbubble3.width / 2);
        sbubble3.y += parseFloat(sbubble3.height / 2);

        sbubble4.x += parseFloat(sbubble4.width / 2);
        sbubble4.y += parseFloat(sbubble4.height / 2);

        sbubblegrp = this.add.container()
        sbubblegrp.add(sbubble1)
        sbubblegrp.add(sbubble2)
        sbubblegrp.add(sbubble3)
        sbubblegrp.add(sbubble4)

        phngrp = this.add.container()
        phngrp.add(phone)
        phngrp.add(sbubblegrp)
        phngrp.x = safeArea.x


        maskShape = this.make.graphics();
        maskShape.fillStyle(0x000000, 0.5);
        maskShape.fillRect(226, 96, 350, 434);

        maskShape.x = safeArea.x
        sbubblegrp.mask = new Phaser.Display.Masks.GeometryMask(sbubblegrp, maskShape);


        next2 = this.add.sprite(725, 530, 'next2').setOrigin(0.5, 0.5).setInteractive({
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

        next2.visible = false

        logomutefun()
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll1
        this.load.spritesheet('florabhair', 'assets/level1/doll/bhair.png', {
            frameWidth: 225,
            frameHeight: 327
        });


        this.load.image('florabody', 'assets/level1/doll/body.png');
        this.load.image('florahead', 'assets/level1/doll/head.png');
        this.load.image('floraebrow', 'assets/level1/doll/ebrow.png');
        this.load.image('floraeyetop', 'assets/level1/doll/eyetop.png');
        this.load.image('floraeye', 'assets/level1/doll/eye.png');
        this.load.image('florahand', 'assets/level1/doll/hand.png');
        this.load.image('florahdress', 'assets/level1/doll/hdress.png');
        this.load.spritesheet('floraeblink', 'assets/level1/doll/eblink.png', {
            frameWidth: 77,
            frameHeight: 28
        });
        this.load.spritesheet('floradress', 'assets/level1/doll/dress.png', {
            frameWidth: 326,
            frameHeight: 531
        });
        this.load.spritesheet('florahair', 'assets/level1/doll/hair.png', {
            frameWidth: 171,
            frameHeight: 325
        });
        this.load.spritesheet('florachain', 'assets/level1/doll/chain.png', {
            frameWidth: 69,
            frameHeight: 60
        });
        this.load.spritesheet('florastud', 'assets/level1/doll/stud.png', {
            frameWidth: 96,
            frameHeight: 59
        });
        this.load.spritesheet('florabag', 'assets/level1/doll/bag.png', {
            frameWidth: 165,
            frameHeight: 294
        });
        this.load.spritesheet('florabbag', 'assets/level1/doll/bbag.png', {
            frameWidth: 165,
            frameHeight: 290
        });
        this.load.spritesheet('floraglass', 'assets/level1/doll/glass.png', {
            frameWidth: 103,
            frameHeight: 49
        });

        this.load.start();
        next2.x = game.context.drawingBufferWidth - 75
        storylinebackground.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height
        }

        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {

            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            storylinebackground.x = safeArea.x - 300
            
            if (!startgame3) {
                next2.x = game.context.drawingBufferWidth - 75
            }

            maskShape.x = safeArea.x
            phngrp.x = safeArea.x

            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
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
    setTimeout(storylinebubstart1, 500)


    function storylinebubstart1() {
        sbubble1.y = sbubble1.y + 50
        playsoundeffects('bubble')
        game.scene.scenes[pageNo].tweens.add({
            targets: sbubble1,
            alpha: 1,
            y: sbubble1.y - 50,
            ease: 'Back',
            duration: 500,
            onComplete: storylinebubstart2,
            callbackScope: this
        });
    }

    function storylinebubstart2() {
        sbubble2.y = sbubble2.y + 50
        game.scene.scenes[pageNo].tweens.add({
            targets: sbubble2,
            alpha: 1,
            y: sbubble2.y - 50,
            ease: 'Back',
            duration: 500,
            delay: 2000,
            onComplete: storylinebubstart3,
            callbackScope: this
        });
    }

    function storylinebubstart3() {
        sbubble3.y = sbubble3.y + 50
        playsoundeffects('bubble')
        game.scene.scenes[pageNo].tweens.add({
            targets: sbubble3,
            alpha: 1,
            y: sbubble3.y - 50,
            ease: 'Back',
            duration: 500,
            delay: 2000,
            onComplete: storylinebubstart4,
            callbackScope: this
        });
    }


    function storylinebubstart4() {
        sbubble4.y = sbubble4.y + 50
        playsoundeffects('bubble')
        game.scene.scenes[pageNo].tweens.add({
            targets: sbubble4,
            alpha: 1,
            y: sbubble4.y - 50,
            ease: 'Back',
            duration: 500,
            delay: 2000,
            onComplete: storylinebubstart5,
            callbackScope: this
        });
    }

    function storylinebubstart5() {
        playsoundeffects('bubble')
        next2.visible = true
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
        if (!startgame3 && loadFinish) {
            startgame3 = true
            playsoundeffects('clickss')

            next2.anims.stop('next2')
            next2.setFrame(10)
            transitionIn()
        }
    }

    function next2upstart() {

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
        loadFinish = false
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
        var levelaxrr = [, 45, 280, 508, 45, 277, 507]
        var levelayrr = [, 38, 38, 38, 302, 302, 302]
        for (i = 1; i <= 6; i++) {
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

        handindication1 = this.add.sprite(270, 295, 'handindication').setOrigin(0.5, 0.5)
        handindication1.setScale(0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication1,
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication2 = this.add.sprite(500, 295, 'handindication').setOrigin(0.5, 0.5)
        handindication2.setScale(0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication2,
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication3 = this.add.sprite(740, 295, 'handindication').setOrigin(0.5, 0.5)
        handindication3.setScale(0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication3,
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication4 = this.add.sprite(270, 560, 'handindication').setOrigin(0.5, 0.5)
        handindication4.setScale(0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication4,
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });
        handindication5 = this.add.sprite(500, 560, 'handindication').setOrigin(0.5, 0.5)
        handindication5.setScale(0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication5,
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication6 = this.add.sprite(740, 560, 'handindication').setOrigin(0.5, 0.5)
        handindication6.setScale(0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication6,
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });


        handindication1.visible = false
        handindication2.visible = false
        handindication3.visible = false
        handindication4.visible = false
        handindication5.visible = false
        handindication6.visible = false
        levelcontainer = this.add.container()
        for (i = 1; i <= 6; i++) {
            levelcontainer.add(game['level' + i])
        }
        levelcontainer.add(stargilter)
        levelcontainer.add(handindication1)
        levelcontainer.add(handindication2)
        levelcontainer.add(handindication3)
        levelcontainer.add(handindication4)
        levelcontainer.add(handindication5)
        levelcontainer.add(handindication6)


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

            

            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            levelcontainer.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)


            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
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

    setTimeout(levestartFun11, 100)

    function levestartFun11() {
        game['level' + level].setFrame(1)
        stargilter.setPosition(game['level' + level].x, game['level' + level].y)
        stargilter.anims.load('stargilter')
        stargilter.anims.play('stargilter')
        stargilter.on('animationcomplete', stargiltercomplete, this);
        playsoundeffects('glitter')


        function stargiltercomplete() {
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
            if (level == 1) {
                handindication1.visible = true
            } else if (level == 2) {
                handindication2.visible = true
            } else if (level == 3) {
                handindication3.visible = true
            } else if (level == 4) {
                handindication4.visible = true
            } else if (level == 5) {
                handindication5.visible = true
            } else if (level == 6) {
                handindication6.visible = true
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
            //            if (level == 2 || level == 4 || level == 6) {
            //                soundstart = 1
            //                music.pause()
            //                clicksound.pause();
            //                window[preroll.config.loaderObjectName].refetchAd(myResumeGameFunction);
            //            }
        }

        function levelupstart() {
            this.setScale(1.05)
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

var level1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level1() {
        Phaser.Scene.call(this, {
            key: 'level1'
        });
    },
    preload: function () {
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
        level1background = this.add.image(0, 0, 'level1background').setOrigin(0, 0)

        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        larrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(-0.9, 0.9)
        rarrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(0.9, 0.9)

        larrow.visible = false
        rarrow.visible = false

        level1panel = this.add.sprite(402, 30, 'level1panel').setOrigin(0, 0)
        level1dots = this.add.sprite(631, 54, 'level1dots').setOrigin(0, 0)
        level1dots.visible = true


        var edrxrr = [, 522, 657, 522, 655, 522, 656, 515, 655, 515, 655]
        var edryrr = [, 71, 71, 202, 202, 332, 332, 131, 131, 272, 272]
        for (i = 10; i >= 1; i--) {
            game['level1dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level1dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1dress' + i].visible = false;
            game['level1dress' + i].x += parseFloat(game['level1dress' + i].width / 2);
            game['level1dress' + i].y += parseFloat(game['level1dress' + i].height / 2);
        }

        var ehaxrr = [, 522, 657, 522, 655, 522, 656]
        var ehayrr = [, 71, 71, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level1hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level1hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1hair' + i].visible = false;
            game['level1hair' + i].x += parseFloat(game['level1hair' + i].width / 2);
            game['level1hair' + i].y += parseFloat(game['level1hair' + i].height / 2);
        }
        var ebgaxrr = [, 522, 657, 522, 655, 522, 656]
        var ebgayrr = [, 71, 71, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level1chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level1chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1chain' + i].visible = false
            game['level1chain' + i].x += parseFloat(game['level1chain' + i].width / 2);
            game['level1chain' + i].y += parseFloat(game['level1chain' + i].height / 2);
        }
        var estaxrr = [, 522, 657, 522, 655, 522, 656]
        var estayrr = [, 71, 71, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level1stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level1stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1stud' + i].visible = false;
            game['level1stud' + i].x += parseFloat(game['level1stud' + i].width / 2);
            game['level1stud' + i].y += parseFloat(game['level1stud' + i].height / 2);
        }
        var estgaxrr = [, 515, 655, 515, 655]
        var estgayrr = [, 131, 131, 272, 272]
        for (i = 4; i >= 1; i--) {
            game['level1bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level1bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1bag' + i].visible = false;
            game['level1bag' + i].x += parseFloat(game['level1bag' + i].width / 2);
            game['level1bag' + i].y += parseFloat(game['level1bag' + i].height / 2);
        }

        var estglxrr = [, 515, 655, 515, 655]
        var estglyrr = [, 131, 131, 272, 272]
        for (i = 4; i >= 1; i--) {
            game['level1glass' + i] = this.add.sprite(estglxrr[i], estglyrr[i], 'level1glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1glass' + i].visible = false;
            game['level1glass' + i].x += parseFloat(game['level1glass' + i].width / 2);
            game['level1glass' + i].y += parseFloat(game['level1glass' + i].height / 2);
        }
        for (i = 6; i >= 1; i--) {
            game['level1stud' + i].visible = true
        }

        var cdaxrr = [, 452, 452, 452, 452, 452, 452]
        var cdayrr = [, 80, 143, 201, 261, 321, 381]
        for (i = 6; i >= 1; i--) {
            game['level1cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level1cat' + i].x += parseFloat(game['level1cat' + i].width / 2)
            game['level1cat' + i].y += parseFloat(game['level1cat' + i].height / 2)
        }

        //        if (adcountstart == 0) {
        //            game['level1cat' + 3].disableInteractive()
        //            lockchain = this.add.sprite(456, 211, 'lockchain').setOrigin(0, 0)
        //            lock = this.add.sprite(485.5, 215, 'lock').setOrigin(0.5, 0.1).setInteractive({
        //                useHandCursor: true
        //            })
        //        }

        cupboardgroup = this.add.container()
        cupboardgroup.add(level1panel)
        cupboardgroup.add(level1dots)
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level1dress' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level1hair' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level1chain' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level1stud' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level1bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level1glass' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level1cat' + i])
        }
        //
        //        if (adcountstart == 0) {
        //            cupboardgroup.add(lock)
        //            cupboardgroup.add(lockchain)
        //
        //
        //            lock.angle = -1
        //
        //            setTimeout(lockanistart, 2000)
        //
        //            function lockanistart() {
        //                game.scene.scenes[pageNo].tweens.add({
        //                    targets: lock,
        //                    angle: 5,
        //                    ease: 'Linear',
        //                    duration: 100,
        //                    repeat: 2,
        //                    yoyo: true,
        //                });
        //                setTimeout(lockanistart, 2000)
        //            }
        //
        //
        //        }


        level1dots.visible = false
        larrow.visible = false
        rarrow.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level1cat' + 1].setFrame(1)


        florabhair = this.add.sprite(276, 31, 'florabhair').setOrigin(0.5, 0)
        florabhair.x += parseFloat(florabhair.width / 2)
        florabbag = this.add.sprite(278, 154, 'florabbag').setOrigin(0, 0)
        florabody = this.add.sprite(276, 102, 'florabody').setOrigin(0, 0)
        florahead = this.add.sprite(329, 31, 'florahead').setOrigin(0, 0)
        floraebrow = this.add.sprite(332, 77, 'floraebrow').setOrigin(0, 0)
        floraeyetop = this.add.sprite(331, 81, 'floraeyetop').setOrigin(0, 0)
        floraeye = this.add.sprite(338, 91, 'floraeye').setOrigin(0, 0)
        floraeblink = this.add.sprite(330, 87, 'floraeblink').setOrigin(0, 0)
        floradress = this.add.sprite(257, 140, 'floradress').setOrigin(0, 0)
        florahdress = this.add.sprite(272, 189, 'florahdress').setOrigin(0, 0)
        florahair = this.add.sprite(296, -12, 'florahair').setOrigin(0, 0)
        florachain = this.add.sprite(348, 156, 'florachain').setOrigin(0, 0)
        florastud = this.add.sprite(332, 102, 'florastud').setOrigin(0, 0)
        florabag = this.add.sprite(281, 153, 'florabag').setOrigin(0, 0)
        floraglass = this.add.sprite(324, 81, 'floraglass').setOrigin(0, 0)
        florahand = this.add.sprite(278, 152, 'florahand').setOrigin(0, 0)


        level1grp = this.add.container()
        level1grp.add(florabhair)
        level1grp.add(florabbag)
        level1grp.add(florabody)
        level1grp.add(florahead)
        level1grp.add(floraeye)
        level1grp.add(floraeyetop)
        level1grp.add(floraebrow)
        level1grp.add(floraeblink)
        level1grp.add(floradress)
        level1grp.add(florabag)
        level1grp.add(florachain)
        level1grp.add(florahair)
        level1grp.add(floraglass)
        level1grp.add(florastud)
        level1grp.add(florahand)
        level1grp.add(florahdress)


        level1grp.x = -800
        floraeblink.setFrame(esarr[0])

        floradress.setFrame(darr1[0])
        florabhair.setFrame(darr1[1])
        florahair.setFrame(darr1[1])
        florachain.setFrame(darr1[2])
        florastud.setFrame(darr1[3])
        florabag.setFrame(darr1[4])
        florabbag.setFrame(darr1[4])
        floraglass.setFrame(darr1[5])

        if (darr1[0] == 7) {
            florahdress.visible = true
        } else {
            florahdress.visible = false
        }

        florabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: florabhair,
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
            targets: floraeye,
            x: 341,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: floraeyestart1,
            callbackScope: this
        });

        function floraeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 338,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart2,
                callbackScope: this
            });
        }

        function floraeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 335,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: floraeyestart3,
                callbackScope: this
            });
        }

        function floraeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 338,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart4,
                callbackScope: this
            });
        }

        function floraeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 341,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: floraeyestart1,
                callbackScope: this
            });

        }



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

        dressgliter = this.add.sprite(390.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(390, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(607, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
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

        //        if (adcountstart == 0) {
        //
        //            fillbackground1 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
        //                pixelPerfect: true,
        //                useHandCursor: true
        //            })
        //            fillbackground1.visible = false
        //            adpanel = this.add.image(221, 144, 'adpanel').setOrigin(0, 0)
        //            watchad = this.add.image(299, 342, 'watchad').setOrigin(0, 0).setInteractive({
        //                pixelPerfect: true,
        //                useHandCursor: true
        //            })
        //            watchadclose = this.add.image(523, 136, 'watchadclose').setOrigin(0, 0).setInteractive({
        //                pixelPerfect: true,
        //                useHandCursor: true
        //            })
        //
        //            adpanelcontainer = this.add.container()
        //            adpanelcontainer.add(adpanel)
        //            adpanelcontainer.add(watchad)
        //            adpanelcontainer.add(watchadclose)
        //            adpanelcontainer.x = safeArea.x
        //            adpanelcontainer.setScale(0)
        //
        //
        //        }

        logomutefun()
        fillbackground2 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground2.visible = false
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll2
        this.load.spritesheet('musabhair', 'assets/level2/doll/bhair.png', {
            frameWidth: 145,
            frameHeight: 261
        });

        this.load.image('musabody', 'assets/level2/doll/body.png');
        this.load.image('musahead', 'assets/level2/doll/head.png');
        this.load.image('musaebrow', 'assets/level2/doll/ebrow.png');
        this.load.image('musaeye', 'assets/level2/doll/eye.png');
        this.load.image('musaeyetop', 'assets/level2/doll/eyetop.png');
        this.load.image('musahand', 'assets/level2/doll/hand.png');
        this.load.spritesheet('musaeblink', 'assets/level2/doll/eblink.png', {
            frameWidth: 81,
            frameHeight: 23
        });
        this.load.spritesheet('musadress', 'assets/level2/doll/dress.png', {
            frameWidth: 306,
            frameHeight: 558
        });
        this.load.spritesheet('musahdress', 'assets/level2/doll/hdress.png', {
            frameWidth: 65,
            frameHeight: 65
        });
        this.load.spritesheet('musahair', 'assets/level2/doll/hair.png', {
            frameWidth: 185,
            frameHeight: 316
        });
        this.load.spritesheet('musachain', 'assets/level2/doll/chain.png', {
            frameWidth: 68,
            frameHeight: 63
        });
        this.load.spritesheet('musastud', 'assets/level2/doll/stud.png', {
            frameWidth: 115,
            frameHeight: 53
        });
        this.load.spritesheet('musabag', 'assets/level2/doll/bag.png', {
            frameWidth: 150,
            frameHeight: 242
        });
        this.load.spritesheet('musabbag', 'assets/level2/doll/bbag.png', {
            frameWidth: 124,
            frameHeight: 179
        });
        this.load.spritesheet('musaglass', 'assets/level2/doll/glass.png', {
            frameWidth: 96,
            frameHeight: 44
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
            
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame5 && donecount == 0) {
                level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 140

            } else {
                level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 40
            }
            //            if (adcountstart == 0) {
            //
            //                adpanelcontainer.x = safeArea.x
            //            }


            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25


        })

        resize()
    },
    update: function () {
        resize()
    }
});

function level1start() {

    //    if (adcountstart == 0) {
    //        lock.on('pointerdown', watchpanelstart)
    //
    //        function watchpanelstart() {
    //            fillbackground1.visible = true
    //            adpanelcontainer.x = 500
    //            adpanelcontainer.y = 200
    //            game.scene.scenes[pageNo].tweens.add({
    //                targets: adpanelcontainer,
    //                x: safeArea.x,
    //                y: 0,
    //                scale: 1,
    //                scale: 1,
    //                ease: 'Back.easeOut',
    //                duration: 300,
    //            });
    //
    //        }
    //        watchadclose.on('pointerdown', watchclosebtn)
    //
    //        function watchclosebtn() {
    //            fillbackground1.visible = false
    //            game.scene.scenes[pageNo].tweens.add({
    //                targets: adpanelcontainer,
    //                x: 500,
    //                y: 200,
    //                scale: 0,
    //                scale: 0,
    //                ease: 'Back.easeIn',
    //                duration: 300,
    //            });
    //        }
    //        window[preroll.config.loaderObjectName].registerRewardCallbacks({
    //            onReady: OnReadyMethod,
    //            onSuccess: OnSuccessMethod,
    //            onFail: OnFailMethod
    //        });
    //        watchad.on('pointerdown', watchadstart)
    //
    //        function watchadstart() {
    //            fillbackground2.visible = true
    //            soundstart = 1
    //            music.pause()
    //            window[preroll.config.loaderObjectName].showRewardAd();
    //
    //        }
    //
    //
    //        function OnReadyMethod() {
    //
    //            //        console.log(1)
    //            //        soundstart = 1
    //            //        music.pause()
    //            //        soundmute.setFrame(1);
    //        }
    //
    //        function OnSuccessMethod() {
    //            fillbackground2.visible = false
    //            console.log(2)
    //            //        game.scene.scenes[pageNo].scene.resume()
    //            fillbackground1.visible = false
    //            adpanelcontainer.setScale(0)
    //            adcountstart = 1
    //            game['level1cat' + 3].setInteractive({
    //                pixelPerfect: true,
    //                useHandCursor: true
    //            })
    //            lock.visible = false
    //            lockchain.visible = false
    //            soundstart = 0
    //            if (!isMuted) {
    //                music.resume()
    //                soundmute.setFrame(0);
    //            } else {
    //                music.pause()
    //                soundmute.setFrame(1);
    //            }
    //            if (!isMuted1) {
    //                clicksound.resume();
    //                clickmute.setFrame(0)
    //            } else {
    //                clicksound.pause();
    //                clickmute.setFrame(1)
    //            }
    //        }
    //
    //        function OnFailMethod() {
    //            fillbackground2.visible = false
    //            console.log(3)
    //            //        game.scene.scenes[pageNo].scene.resume()
    //            fillbackground1.visible = true
    //            adpanelcontainer.setScale(1)
    //            adcountstart = 0
    //            soundstart = 0
    //            if (!isMuted) {
    //                music.resume()
    //                soundmute.setFrame(0);
    //            } else {
    //                music.pause()
    //                soundmute.setFrame(1);
    //            }
    //            if (!isMuted1) {
    //                clicksound.resume();
    //                clickmute.setFrame(0)
    //            } else {
    //                clicksound.pause();
    //                clickmute.setFrame(1)
    //            }
    //        }
    //
    //    }


    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level1grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 140,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level1dressclickstart1,
            callbackScope: this
        });

    }

    function level1dressclickstart1() {
        level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 140
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
        }



        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno1 = this.texture.key.substr(11)
            if (darr1[0] == parseInt(sno1)) {
                floradress.setFrame(0)

                darr1[0] = 0
            } else {
                darr1[0] = parseInt(sno1)
                floradress.setFrame(parseInt(sno1))

            }
            if (darr1[0] == 7) {
                florahdress.visible = true
            } else {
                florahdress.visible = false
            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level1hair' + i].on('pointerover', etopOverFun)
            game['level1hair' + i].on('pointerout', etopOutFun)
            game['level1hair' + i].on('pointerdown', hairFun)
        }

        function hairFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno2 = this.texture.key.substr(10)
            if (darr1[1] == parseInt(sno2)) {
                florabhair.setFrame(0)
                florahair.setFrame(0)
                darr1[1] = 0
            } else {
                darr1[1] = parseInt(sno2)
                florabhair.setFrame(parseInt(sno2))
                florahair.setFrame(parseInt(sno2))

            }
            btnvisFun()
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
            sno3 = this.texture.key.substr(11)

            if (darr1[2] == parseInt(sno3)) {
                florachain.setFrame(0)
                darr1[2] = 0
            } else {
                darr1[2] = parseInt(sno3)
                florachain.setFrame(parseInt(sno3))
            }
            chainval = darr1[2]
            btnvisFun()

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
            sno4 = this.texture.key.substr(10)
            if (darr1[3] == parseInt(sno4)) {
                florastud.setFrame(0)
                darr1[3] = 0
            } else {
                darr1[3] = parseInt(sno4)
                florastud.setFrame(parseInt(sno4))
            }
            btnvisFun()

        }

        for (i = 4; i >= 1; i--) {
            game['level1bag' + i].on('pointerover', etopOverFun)
            game['level1bag' + i].on('pointerout', etopOutFun)
            game['level1bag' + i].on('pointerdown', bagFun)
        }

        function bagFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno5 = this.texture.key.substr(9)
            if (darr1[4] == parseInt(sno5)) {
                florabag.setFrame(0)
                florabbag.setFrame(0)
                darr1[4] = 0
            } else {
                darr1[4] = parseInt(sno5)
                florabag.setFrame(parseInt(sno5))
                florabbag.setFrame(parseInt(sno5))
            }
            btnvisFun()
        }

        for (i = 4; i >= 1; i--) {
            game['level1glass' + i].on('pointerover', etopOverFun)
            game['level1glass' + i].on('pointerout', etopOutFun)
            game['level1glass' + i].on('pointerdown', glassFun)
        }

        function glassFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno6 = this.texture.key.substr(11)
            if (darr1[5] == parseInt(sno6)) {
                floraglass.setFrame(0)
                darr1[5] = 0
            } else {
                darr1[5] = parseInt(sno6)
                floraglass.setFrame(parseInt(sno6))
            }
            btnvisFun()
        }


        function btnvisFun() {

            if (btnstart1 && done2.visible == false) {
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

        if (game['level1dress' + 1].visible) {

            level1dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 7].visible) {
            level1dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level1dress' + 1].visible) {

            level1dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 7].visible) {

            level1dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1dress' + i].visible = true
            }
        }

    }

    for (i = 6; i >= 1; i--) {
        game['level1cat' + i].on('pointerover', levelcatoverstart)
        game['level1cat' + i].on('pointerout', levelcatoutstart)
        game['level1cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
    }

    function levelcatdownstart(ev) {
        rarrow.visible = false
        larrow.visible = false
        level1dots.visible = false
        level1dots.setFrame(0)
        larrow.visible = false
        rarrow.visible = false

        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 6; i++) {
            game['level1cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level1cat' + 1].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            game['level1cat' + 2].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            game['level1cat' + 3].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1glass' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            game['level1cat' + 4].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false

            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bag' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            game['level1cat' + 5].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level1dots.visible = true
            level1dots.setFrame(0)
            game['level1cat' + 6].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level1cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1chain' + i].visible = false
                game['level1stud' + i].visible = false
                game['level1hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1bag' + i].visible = false
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
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
        if (lcount1 == 0) {
            level = 2
            lcount1 = 1
        }


        darr1[0] = floradress.frame.name
        darr1[1] = florabhair.frame.name
        darr1[1] = florahair.frame.name
        darr1[2] = florachain.frame.name
        darr1[3] = florastud.frame.name
        darr1[4] = florabag.frame.name
        darr1[4] = florabbag.frame.name
        darr1[5] = floraglass.frame.name


        fillbackground.visible = true
        cupboardgroup.visible = false
        done2.visible = false
        rarrow.visible = false
        larrow.visible = false
        game.scene.scenes[pageNo].tweens.add({
            targets: level1grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 40,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: doneclickstart1,
            callbackScope: this
        });
    }
}

function doneclickstart1() {
    level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 40
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
    targets: florabhair,
    y: florabhair.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});


game.scene.scenes[pageNo].tweens.add({
    targets: florahead,
    y: florahead.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});
game.scene.scenes[pageNo].tweens.add({
    targets: floraeye,
    y: floraeye.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});
game.scene.scenes[pageNo].tweens.add({
    targets: floraeyetop,
    y: floraeyetop.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});
game.scene.scenes[pageNo].tweens.add({
    targets: floraeblink,
    y: floraeblink.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});
game.scene.scenes[pageNo].tweens.add({
    targets: floraebrow,
    y: floraebrow.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});
game.scene.scenes[pageNo].tweens.add({
    targets: florahair,
    y: florahair.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});
game.scene.scenes[pageNo].tweens.add({
    targets: floraglass,
    y: floraglass.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});
game.scene.scenes[pageNo].tweens.add({
    targets: florastud,
    y: florastud.y + 2,
    ease: 'Linear',
    duration: 100,
    repeat: 0,
    yoyo: true,
});

floraeblink.setFrame(esarr[0] + 1)
t1 = game.scene.scenes[pageNo].time.addEvent({
    delay: 100,
    callback: floraheadanimation11,
    callbackScope: this
})

function floraheadanimation11() {
    floraeblink.setFrame(esarr[0])
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 5000,
        callback: floraheadanimation1,
        callbackScope: this
    })

}

function floraheadanimation1() {
    game.scene.scenes[pageNo].tweens.add({
        targets: florastud,
        y: florastud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: floraebrow,
        y: floraebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    game.scene.scenes[pageNo].tweens.add({
        targets: florabhair,
        y: florabhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: floraglass,
        y: floraglass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: florahead,
        y: florahead.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: floraeye,
        y: floraeye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    game.scene.scenes[pageNo].tweens.add({
        targets: floraeyetop,
        y: floraeyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: floraeblink,
        y: floraeblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: florahair,
        y: florahair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    floraeblink.setFrame(esarr[0] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: floraheadanimation11,
        callbackScope: this
    })

    function floraheadanimation1() {
        floraeblink.setFrame(esarr[0])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: floraheadanimation1,
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

var level2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level2() {
        Phaser.Scene.call(this, {
            key: 'level2'
        });
    },
    preload: function () {
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

        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        larrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(-0.9, 0.9)
        rarrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(0.9, 0.9)

        larrow.visible = false
        rarrow.visible = false

        level2panel = this.add.sprite(402, 30, 'level1panel').setOrigin(0, 0)
        level2dots = this.add.sprite(631, 54, 'level1dots').setOrigin(0, 0)
        level2dots.visible = true


        var edrxrr = [, 523, 658, 523, 656, 523, 655, 517, 652, 518, 653]
        var edryrr = [, 72, 72, 202, 202, 332, 332, 133, 133, 274, 274]
        for (i = 10; i >= 1; i--) {
            game['level2dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level2dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2dress' + i].visible = false;
            game['level2dress' + i].x += parseFloat(game['level2dress' + i].width / 2);
            game['level2dress' + i].y += parseFloat(game['level2dress' + i].height / 2);
        }

        var ehaxrr = [, 523, 658, 523, 656, 523, 655]
        var ehayrr = [, 72, 72, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level2hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level2hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2hair' + i].visible = false;
            game['level2hair' + i].x += parseFloat(game['level2hair' + i].width / 2);
            game['level2hair' + i].y += parseFloat(game['level2hair' + i].height / 2);
        }
        var ebgaxrr = [, 523, 658, 523, 656, 523, 655]
        var ebgayrr = [, 72, 72, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level2chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level2chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2chain' + i].visible = false
            game['level2chain' + i].x += parseFloat(game['level2chain' + i].width / 2);
            game['level2chain' + i].y += parseFloat(game['level2chain' + i].height / 2);
        }
        var estaxrr = [, 523, 658, 523, 656, 523, 655]
        var estayrr = [, 72, 72, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level2stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level2stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2stud' + i].visible = false;
            game['level2stud' + i].x += parseFloat(game['level2stud' + i].width / 2);
            game['level2stud' + i].y += parseFloat(game['level2stud' + i].height / 2);
        }
        var estgaxrr = [, 517, 652, 518, 653]
        var estgayrr = [, 133, 133, 274, 274]
        for (i = 4; i >= 1; i--) {
            game['level2bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level2bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2bag' + i].visible = false;
            game['level2bag' + i].x += parseFloat(game['level2bag' + i].width / 2);
            game['level2bag' + i].y += parseFloat(game['level2bag' + i].height / 2);
        }

        var estglxrr = [, 517, 652, 518, 653]
        var estglyrr = [, 133, 133, 274, 274]
        for (i = 4; i >= 1; i--) {
            game['level2glass' + i] = this.add.sprite(estglxrr[i], estglyrr[i], 'level2glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2glass' + i].visible = false;
            game['level2glass' + i].x += parseFloat(game['level2glass' + i].width / 2);
            game['level2glass' + i].y += parseFloat(game['level2glass' + i].height / 2);
        }
        for (i = 6; i >= 1; i--) {
            game['level2stud' + i].visible = true
        }

        var cdaxrr = [, 452, 452, 452, 452, 452, 452]
        var cdayrr = [, 80, 143, 201, 261, 321, 381]
        for (i = 6; i >= 1; i--) {
            game['level2cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level2cat' + i].x += parseFloat(game['level2cat' + i].width / 2)
            game['level2cat' + i].y += parseFloat(game['level2cat' + i].height / 2)
        }

        cupboardgroup = this.add.container()
        cupboardgroup.add(level2panel)
        cupboardgroup.add(level2dots)
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level2dress' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level2hair' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level2chain' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level2stud' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level2bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level2glass' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level2cat' + i])
        }

        level2dots.visible = false
        larrow.visible = false
        rarrow.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level2cat' + 1].setFrame(1)


        musabhair = this.add.sprite(128, 57, 'musabhair').setOrigin(0.5, 0)
        musabhair.x += parseFloat(musabhair.width / 2)
        musabbag = this.add.sprite(132, 167, 'musabbag').setOrigin(0, 0)
        musabody = this.add.sprite(79, 122, 'musabody').setOrigin(0, 0)
        musahead = this.add.sprite(157, 50, 'musahead').setOrigin(0, 0)
        musaebrow = this.add.sprite(165, 93, 'musaebrow').setOrigin(0, 0)
        musaeyetop = this.add.sprite(164, 98, 'musaeyetop').setOrigin(0, 0)
        musaeye = this.add.sprite(174, 104, 'musaeye').setOrigin(0, 0)
        musaeblink = this.add.sprite(164, 102, 'musaeblink').setOrigin(0, 0)
        musadress = this.add.sprite(51, 143, 'musadress').setOrigin(0, 0)
        musahdress = this.add.sprite(91, 281, 'musahdress').setOrigin(0, 0)
        musahair = this.add.sprite(110, -6, 'musahair').setOrigin(0, 0)
        musachain = this.add.sprite(170, 161, 'musachain').setOrigin(0, 0)
        musastud = this.add.sprite(145, 116, 'musastud').setOrigin(0, 0)
        musabag = this.add.sprite(108, 167, 'musabag').setOrigin(0, 0)
        musaglass = this.add.sprite(155, 95, 'musaglass').setOrigin(0, 0)
        musahand = this.add.sprite(114, 284, 'musahand').setOrigin(0, 0)


        level2grp = this.add.container()
        level2grp.add(musabhair)
        level2grp.add(musabbag)
        level2grp.add(musabody)
        level2grp.add(musahead)
        level2grp.add(musaeye)
        level2grp.add(musaeyetop)
        level2grp.add(musaebrow)
        level2grp.add(musaeblink)
        level2grp.add(musadress)
        level2grp.add(musabag)
        level2grp.add(musachain)
        level2grp.add(musahair)
        level2grp.add(musaglass)
        level2grp.add(musastud)
        level2grp.add(musahand)
        level2grp.add(musahdress)


        level2grp.x = -800
        musaeblink.setFrame(esarr[1])

        musadress.setFrame(darr2[0])
        musabhair.setFrame(darr2[1])
        musahair.setFrame(darr2[1])
        musachain.setFrame(darr2[2])
        musastud.setFrame(darr2[3])
        musabag.setFrame(darr2[4])
        musabbag.setFrame(darr2[4])
        musaglass.setFrame(darr2[5])
        //
        if (darr2[0] == 3) {
            musahdress.setFrame(1)
        } else if (darr2[0] == 8) {
            musahdress.setFrame(2)
        } else {
            musahdress.setFrame(0)
        }

        musabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: musabhair,
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
            targets: musaeye,
            x: 177,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: musaeyestart1,
            callbackScope: this
        });

        function musaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 174,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart2,
                callbackScope: this
            });
        }

        function musaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 171,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: musaeyestart3,
                callbackScope: this
            });
        }

        function musaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 174,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart4,
                callbackScope: this
            });
        }

        function musaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: musaeyestart1,
                callbackScope: this
            });

        }



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

        dressgliter = this.add.sprite(210.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(210, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(607, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
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
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll3
        this.load.spritesheet('aishabhair', 'assets/level3/doll/bhair.png', {
            frameWidth: 215,
            frameHeight: 345
        });

        this.load.image('aishabody', 'assets/level3/doll/body.png');
        this.load.image('aishahead', 'assets/level3/doll/head.png');
        this.load.image('aishaebrow', 'assets/level3/doll/ebrow.png');
        this.load.image('aishaeyetop', 'assets/level3/doll/eyetop.png');
        this.load.image('aishaeye', 'assets/level3/doll/eye.png');
        this.load.image('aishahand', 'assets/level3/doll/hand.png');
        this.load.spritesheet('aishaeblink', 'assets/level3/doll/eblink.png', {
            frameWidth: 78,
            frameHeight: 27
        });
        this.load.spritesheet('aishadress', 'assets/level3/doll/dress.png', {
            frameWidth: 480,
            frameHeight: 552
        });
        this.load.spritesheet('aishahdress', 'assets/level3/doll/hdress.png', {
            frameWidth: 259,
            frameHeight: 105
        });
        this.load.spritesheet('aishahair', 'assets/level3/doll/hair.png', {
            frameWidth: 154,
            frameHeight: 229
        });
        this.load.spritesheet('aishachain', 'assets/level3/doll/chain.png', {
            frameWidth: 67,
            frameHeight: 88
        });
        this.load.spritesheet('aishastud', 'assets/level3/doll/stud.png', {
            frameWidth: 93,
            frameHeight: 61
        });
        this.load.spritesheet('aishabag', 'assets/level3/doll/bag.png', {
            frameWidth: 163,
            frameHeight: 268
        });
        this.load.spritesheet('aishabbag', 'assets/level3/doll/bbag.png', {
            frameWidth: 178,
            frameHeight: 270
        });
        this.load.spritesheet('aishaglass', 'assets/level3/doll/glass.png', {
            frameWidth: 104,
            frameHeight: 51
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
            
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame6 && donecount == 0) {
                level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50

            } else {
                level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 220
            }



            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25


        })

        resize()
    },
    update: function () {
        resize()
    }
});

function level2start() {




    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level2grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level2dressclickstart1,
            callbackScope: this
        });

    }

    function level2dressclickstart1() {
        level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50
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
        }



        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno1 = this.texture.key.substr(11)
            if (darr2[0] == parseInt(sno1)) {
                musadress.setFrame(0)

                darr2[0] = 0
            } else {
                darr2[0] = parseInt(sno1)
                musadress.setFrame(parseInt(sno1))

            }
            if (darr2[0] == 3) {
                musahdress.setFrame(1)
            } else if (darr2[0] == 8) {
                musahdress.setFrame(2)
            } else {
                musahdress.setFrame(0)
            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level2hair' + i].on('pointerover', etopOverFun)
            game['level2hair' + i].on('pointerout', etopOutFun)
            game['level2hair' + i].on('pointerdown', hairFun)
        }

        function hairFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno2 = this.texture.key.substr(10)
            if (darr2[1] == parseInt(sno2)) {
                musabhair.setFrame(0)
                musahair.setFrame(0)
                darr2[1] = 0
            } else {
                darr2[1] = parseInt(sno2)
                musabhair.setFrame(parseInt(sno2))
                musahair.setFrame(parseInt(sno2))

            }
            btnvisFun()
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
            sno3 = this.texture.key.substr(11)

            if (darr2[2] == parseInt(sno3)) {
                musachain.setFrame(0)
                darr2[2] = 0
            } else {
                darr2[2] = parseInt(sno3)
                musachain.setFrame(parseInt(sno3))
            }
            btnvisFun()

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
            sno4 = this.texture.key.substr(10)
            if (darr2[3] == parseInt(sno4)) {
                musastud.setFrame(0)
                darr2[3] = 0
            } else {
                darr2[3] = parseInt(sno4)
                musastud.setFrame(parseInt(sno4))
            }
            btnvisFun()

        }

        for (i = 4; i >= 1; i--) {
            game['level2bag' + i].on('pointerover', etopOverFun)
            game['level2bag' + i].on('pointerout', etopOutFun)
            game['level2bag' + i].on('pointerdown', bagFun)
        }

        function bagFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno5 = this.texture.key.substr(9)
            if (darr2[4] == parseInt(sno5)) {
                musabag.setFrame(0)
                musabbag.setFrame(0)
                darr2[4] = 0
            } else {
                darr2[4] = parseInt(sno5)
                musabag.setFrame(parseInt(sno5))
                musabbag.setFrame(parseInt(sno5))
            }
            btnvisFun()
        }

        for (i = 4; i >= 1; i--) {
            game['level2glass' + i].on('pointerover', etopOverFun)
            game['level2glass' + i].on('pointerout', etopOutFun)
            game['level2glass' + i].on('pointerdown', glassFun)
        }

        function glassFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno6 = this.texture.key.substr(11)
            if (darr2[5] == parseInt(sno6)) {
                musaglass.setFrame(0)
                darr2[5] = 0
            } else {
                darr2[5] = parseInt(sno6)
                musaglass.setFrame(parseInt(sno6))
            }
            btnvisFun()
        }


        function btnvisFun() {

            if (btnstart1 && done2.visible == false) {
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

        if (game['level2dress' + 1].visible) {

            level2dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 7].visible) {

            level2dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

         if (game['level2dress' + 1].visible) {

            level2dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 7].visible) {

            level2dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2dress' + i].visible = true
            }
        }
    }

    for (i = 6; i >= 1; i--) {
        game['level2cat' + i].on('pointerover', levelcatoverstart)
        game['level2cat' + i].on('pointerout', levelcatoutstart)
        game['level2cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
    }

    function levelcatdownstart(ev) {
        rarrow.visible = false
        larrow.visible = false
        level2dots.visible = false
        level2dots.setFrame(0)
        larrow.visible = false
        rarrow.visible = false

        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 6; i++) {
            game['level2cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level2cat' + 1].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            game['level2cat' + 2].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            game['level2cat' + 3].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2glass' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            game['level2cat' + 4].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false

            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bag' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            game['level2cat' + 5].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level2dots.visible = true
            level2dots.setFrame(0)
            game['level2cat' + 6].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level2cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2chain' + i].visible = false
                game['level2stud' + i].visible = false
                game['level2hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2bag' + i].visible = false
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
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
            if (lcount2 == 0) {
                level = 3
                lcount2 = 1
            }


            darr2[0] = musadress.frame.name
            darr2[7] = musabhair.frame.name
            darr2[1] = musahair.frame.name
            darr2[2] = musachain.frame.name
            darr2[3] = musastud.frame.name
            darr2[4] = musabag.frame.name
            darr2[4] = musabbag.frame.name
            darr2[5] = musaglass.frame.name



            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level2grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 220,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 220
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
        targets: musabhair,
        y: musabhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });


    game.scene.scenes[pageNo].tweens.add({
        targets: musahead,
        y: musahead.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: musaeye,
        y: musaeye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: musaeyetop,
        y: musaeyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: musaebrow,
        y: musaebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    game.scene.scenes[pageNo].tweens.add({
        targets: musaeblink,
        y: musaeblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: musahair,
        y: musahair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: musastud,
        y: musastud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: musaglass,
        y: musaglass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    musaeblink.setFrame(esarr[1] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: musaheadanimation11,
        callbackScope: this
    })

    function musaheadanimation11() {
        musaeblink.setFrame(esarr[1])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: musaheadanimation1,
            callbackScope: this
        })

    }






    function musaheadanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: musastud,
            y: musastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: musabhair,
            y: musabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: musahead,
            y: musahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaeye,
            y: musaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaebrow,
            y: musaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaeyetop,
            y: musaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaglass,
            y: musaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaeblink,
            y: musaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musahair,
            y: musahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        musaeblink.setFrame(esarr[1] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: musaheadanimation11,
            callbackScope: this
        })

        function musaheadanimation1() {
            musaeblink.setFrame(esarr[1])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: musaheadanimation1,
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

var level3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level3() {
        Phaser.Scene.call(this, {
            key: 'level3'
        });
    },
    preload: function () {
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

        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        larrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(-0.9, 0.9)
        rarrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(0.9, 0.9)

        larrow.visible = false
        rarrow.visible = false

        level3panel = this.add.sprite(402, 30, 'level1panel').setOrigin(0, 0)
        level3dots = this.add.sprite(631, 54, 'level1dots').setOrigin(0, 0)
        level3dots.visible = true


        var edrxrr = [, 523, 656, 523, 657, 523, 658, 514, 654, 514, 653]
        var edryrr = [, 72, 72, 202, 202, 331, 331, 130, 130, 270, 270]
        for (i = 10; i >= 1; i--) {
            game['level3dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level3dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3dress' + i].visible = false;
            game['level3dress' + i].x += parseFloat(game['level3dress' + i].width / 2);
            game['level3dress' + i].y += parseFloat(game['level3dress' + i].height / 2);
        }

        var ehaxrr = [, 523, 656, 523, 657, 523, 658]
        var ehayrr = [, 72, 72, 202, 202, 331, 331]
        for (i = 6; i >= 1; i--) {
            game['level3hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level3hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3hair' + i].visible = false;
            game['level3hair' + i].x += parseFloat(game['level3hair' + i].width / 2);
            game['level3hair' + i].y += parseFloat(game['level3hair' + i].height / 2);
        }
        var ebgaxrr = [, 523, 656, 523, 657, 523, 658]
        var ebgayrr = [, 72, 72, 202, 202, 331, 331]
        for (i = 6; i >= 1; i--) {
            game['level3chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level3chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3chain' + i].visible = false
            game['level3chain' + i].x += parseFloat(game['level3chain' + i].width / 2);
            game['level3chain' + i].y += parseFloat(game['level3chain' + i].height / 2);
        }
        var estaxrr = [, 523, 656, 523, 657, 523, 658]
        var estayrr = [, 72, 72, 202, 202, 331, 331]
        for (i = 6; i >= 1; i--) {
            game['level3stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level3stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3stud' + i].visible = false;
            game['level3stud' + i].x += parseFloat(game['level3stud' + i].width / 2);
            game['level3stud' + i].y += parseFloat(game['level3stud' + i].height / 2);
        }
        var estgaxrr = [, 514, 654, 514, 653]
        var estgayrr = [, 130, 130, 270, 270]
        for (i = 4; i >= 1; i--) {
            game['level3bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level3bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3bag' + i].visible = false;
            game['level3bag' + i].x += parseFloat(game['level3bag' + i].width / 2);
            game['level3bag' + i].y += parseFloat(game['level3bag' + i].height / 2);
        }

        var estglxrr = [, 514, 654, 514, 653]
        var estglyrr = [, 130, 130, 270, 270]
        for (i = 4; i >= 1; i--) {
            game['level3glass' + i] = this.add.sprite(estglxrr[i], estglyrr[i], 'level3glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3glass' + i].visible = false;
            game['level3glass' + i].x += parseFloat(game['level3glass' + i].width / 2);
            game['level3glass' + i].y += parseFloat(game['level3glass' + i].height / 2);
        }
        for (i = 6; i >= 1; i--) {
            game['level3stud' + i].visible = true
        }

        var cdaxrr = [, 452, 452, 452, 452, 452, 452]
        var cdayrr = [, 80, 143, 201, 261, 321, 381]
        for (i = 6; i >= 1; i--) {
            game['level3cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level3cat' + i].x += parseFloat(game['level3cat' + i].width / 2)
            game['level3cat' + i].y += parseFloat(game['level3cat' + i].height / 2)
        }

//        if (adcountstart1 == 0) {
//            game['level3cat' + 4].disableInteractive()
//            lockchain = this.add.sprite(456, 273, 'lockchain').setOrigin(0, 0)
//            level1lock = this.add.sprite(485.5, 277, 'lock').setOrigin(0.5, 0.1).setInteractive({
//                useHandCursor: true
//            })
//        }

        cupboardgroup = this.add.container()
        cupboardgroup.add(level3panel)
        cupboardgroup.add(level3dots)
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level3dress' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level3hair' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level3chain' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level3stud' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level3bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level3glass' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level3cat' + i])
        }
//        if (adcountstart1 == 0) {
//            cupboardgroup.add(level1lock)
//            cupboardgroup.add(lockchain)
//
//
//            level1lock.angle = -1
//
//            setTimeout(lockanistart1, 2000)
//
//            function lockanistart1() {
//                game.scene.scenes[pageNo].tweens.add({
//                    targets: level1lock,
//                    angle: 5,
//                    ease: 'Linear',
//                    duration: 100,
//                    repeat: 2,
//                    yoyo: true,
//                });
//                setTimeout(lockanistart1, 2000)
//            }
//
//
//        }

        level3dots.visible = false
        larrow.visible = false
        rarrow.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level3cat' + 1].setFrame(1)


        aishabhair = this.add.sprite(497, 0, 'aishabhair').setOrigin(0.5, 0)
        aishabhair.x += parseFloat(aishabhair.width / 2)
        aishabbag = this.add.sprite(475, 144, 'aishabbag').setOrigin(0, 0)
        aishabody = this.add.sprite(474, 95, 'aishabody').setOrigin(0, 0)
        aishahead = this.add.sprite(548, 30, 'aishahead').setOrigin(0, 0)
        aishaebrow = this.add.sprite(547, 75, 'aishaebrow').setOrigin(0, 0)
        aishaeyetop = this.add.sprite(547, 82, 'aishaeyetop').setOrigin(0, 0)
        aishaeye = this.add.sprite(558, 88, 'aishaeye').setOrigin(0, 0)
        aishaeblink = this.add.sprite(545, 84, 'aishaeblink').setOrigin(0, 0)
        aishadress = this.add.sprite(374, 129, 'aishadress').setOrigin(0, 0)
        aishahdress = this.add.sprite(474, 229, 'aishahdress').setOrigin(0, 0)
        aishahair = this.add.sprite(522, 0, 'aishahair').setOrigin(0, 0)
        aishachain = this.add.sprite(563, 143, 'aishachain').setOrigin(0, 0)
        aishastud = this.add.sprite(550, 100, 'aishastud').setOrigin(0, 0)
        aishabag = this.add.sprite(483, 148, 'aishabag').setOrigin(0, 0)
        aishaglass = this.add.sprite(539, 75, 'aishaglass').setOrigin(0, 0)
        aishahand = this.add.sprite(530, 253, 'aishahand').setOrigin(0, 0)


        level3grp = this.add.container()
        level3grp.add(aishabhair)
        level3grp.add(aishabbag)
        level3grp.add(aishabody)
        level3grp.add(aishahead)
        level3grp.add(aishaeye)
        level3grp.add(aishaeyetop)
        level3grp.add(aishaebrow)
        level3grp.add(aishaeblink)
        level3grp.add(aishadress)
        level3grp.add(aishabag)
        level3grp.add(aishachain)
        level3grp.add(aishahair)
        level3grp.add(aishaglass)
        level3grp.add(aishastud)
        level3grp.add(aishahand)
        level3grp.add(aishahdress)


        level3grp.x = -800
        aishaeblink.setFrame(esarr[2])

        aishadress.setFrame(darr3[0])
        aishabhair.setFrame(darr3[1])
        aishahair.setFrame(darr3[1])
        aishachain.setFrame(darr3[2])
        aishastud.setFrame(darr3[3])
        aishabag.setFrame(darr3[4])
        aishabbag.setFrame(darr3[4])
        aishaglass.setFrame(darr3[5])
        //
        if (darr3[0] == 2) {
            aishahdress.setFrame(1)
        } else if (darr3[0] == 4) {
            aishahdress.setFrame(2)
        } else if (darr3[0] == 7) {
            aishahdress.setFrame(3)
        } else {
            aishahdress.setFrame(0)
        }

        aishabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: aishabhair,
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
            targets: aishaeye,
            x: 561,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: aishaeyestart1,
            callbackScope: this
        });

        function aishaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 558,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart2,
                callbackScope: this
            });
        }

        function aishaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 555,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: aishaeyestart3,
                callbackScope: this
            });
        }

        function aishaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 558,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart4,
                callbackScope: this
            });
        }

        function aishaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 561,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: aishaeyestart1,
                callbackScope: this
            });

        }



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

        dressgliter = this.add.sprite(600.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(600, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(607, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
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
//        if (adcountstart1 == 0) {
//
//            fillbackground1 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//            fillbackground1.visible = false
//            adpanel = this.add.image(221, 144, 'adpanel').setOrigin(0, 0)
//            watchad = this.add.image(299, 342, 'watchad').setOrigin(0, 0).setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//            watchadclose = this.add.image(523, 136, 'watchadclose').setOrigin(0, 0).setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//
//            adpanelcontainer = this.add.container()
//            adpanelcontainer.add(adpanel)
//            adpanelcontainer.add(watchad)
//            adpanelcontainer.add(watchadclose)
//            adpanelcontainer.x = safeArea.x
//            adpanelcontainer.setScale(0)
//
//
//        }
        logomutefun()
        fillbackground2 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground2.visible = false
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        this.load.spritesheet('bloombhair', 'assets/level4/doll/bhair.png', {
            frameWidth: 205,
            frameHeight: 360
        });


        this.load.image('bloombody', 'assets/level4/doll/body.png');
        this.load.image('bloomhead', 'assets/level4/doll/head.png');
        this.load.image('bloomebrow', 'assets/level4/doll/ebrow.png');
        this.load.image('bloomeyetop', 'assets/level4/doll/eyetop.png');
        this.load.image('bloomeye', 'assets/level4/doll/eye.png');
        this.load.image('bloomhand', 'assets/level4/doll/hand.png');
        this.load.spritesheet('bloomeblink', 'assets/level4/doll/eblink.png', {
            frameWidth: 81,
            frameHeight: 25
        });
        this.load.spritesheet('bloomdress', 'assets/level4/doll/dress.png', {
            frameWidth: 287,
            frameHeight: 567
        });
        this.load.spritesheet('bloomhdress', 'assets/level4/doll/hdress.png', {
            frameWidth: 72,
            frameHeight: 90
        });

        this.load.spritesheet('bloomhair', 'assets/level4/doll/hair.png', {
            frameWidth: 151,
            frameHeight: 292
        });
        this.load.spritesheet('bloomchain', 'assets/level4/doll/chain.png', {
            frameWidth: 78,
            frameHeight: 77
        });
        this.load.spritesheet('bloomstud', 'assets/level4/doll/stud.png', {
            frameWidth: 105,
            frameHeight: 57
        });
        this.load.spritesheet('bloombag', 'assets/level4/doll/bag.png', {
            frameWidth: 171,
            frameHeight: 294
        });
        this.load.spritesheet('bloombbag', 'assets/level4/doll/bbag.png', {
            frameWidth: 126,
            frameHeight: 165
        });
        this.load.spritesheet('bloomglass', 'assets/level4/doll/glass.png', {
            frameWidth: 94,
            frameHeight: 47
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
            
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame7 && donecount == 0) {
                level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 350

            } else {
                level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 200
            }

//            if (adcountstart1 == 0) {
//
//                adpanelcontainer.x = safeArea.x
//            }

            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25


        })

        resize()
    },
    update: function () {
        resize()
    }
});

function level3start() {
//    if (adcountstart1 == 0) {
//        level1lock.on('pointerdown', watchpanelstart)
//
//        function watchpanelstart() {
//            fillbackground1.visible = true
//            adpanelcontainer.x = 500
//            adpanelcontainer.y = 200
//            game.scene.scenes[pageNo].tweens.add({
//                targets: adpanelcontainer,
//                x: safeArea.x,
//                y: 0,
//                scale: 1,
//                scale: 1,
//                ease: 'Back.easeOut',
//                duration: 300,
//            });
//
//        }
//        watchadclose.on('pointerdown', watchclosebtn)
//
//        function watchclosebtn() {
//            fillbackground1.visible = false
//            game.scene.scenes[pageNo].tweens.add({
//                targets: adpanelcontainer,
//                x: 500,
//                y: 200,
//                scale: 0,
//                scale: 0,
//                ease: 'Back.easeIn',
//                duration: 300,
//            });
//        }
//        window[preroll.config.loaderObjectName].registerRewardCallbacks({
//            onReady: OnReadyMethod,
//            onSuccess: OnSuccessMethod,
//            onFail: OnFailMethod
//        });
//        watchad.on('pointerdown', watchadstart)
//
//        function watchadstart() {
//            fillbackground2.visible = true
//            soundstart = 1
//            music.pause()
//            window[preroll.config.loaderObjectName].showRewardAd();
//
//        }
//
//
//        function OnReadyMethod() {
//
//            //        console.log(1)
//            //        soundstart = 1
//            //        music.pause()
//            //        soundmute.setFrame(1);
//        }
//
//        function OnSuccessMethod() {
//            fillbackground2.visible = false
//            console.log(2)
//            //        game.scene.scenes[pageNo].scene.resume()
//            fillbackground1.visible = false
//            adpanelcontainer.setScale(0)
//            adcountstart1 = 1
//            game['level3cat' + 4].setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//            level1lock.visible = false
//            lockchain.visible = false
//            soundstart = 0
//            if (!isMuted) {
//                music.resume()
//                soundmute.setFrame(0);
//            } else {
//                music.pause()
//                soundmute.setFrame(1);
//            }
//            if (!isMuted1) {
//                clicksound.resume();
//                clickmute.setFrame(0)
//            } else {
//                clicksound.pause();
//                clickmute.setFrame(1)
//            }
//        }
//
//        function OnFailMethod() {
//            fillbackground2.visible = false
//            console.log(3)
//            //        game.scene.scenes[pageNo].scene.resume()
//            fillbackground1.visible = true
//            adpanelcontainer.setScale(1)
//            adcountstart1 = 0
//            soundstart = 0
//            if (!isMuted) {
//                music.resume()
//                soundmute.setFrame(0);
//            } else {
//                music.pause()
//                soundmute.setFrame(1);
//            }
//            if (!isMuted1) {
//                clicksound.resume();
//                clickmute.setFrame(0)
//            } else {
//                clicksound.pause();
//                clickmute.setFrame(1)
//            }
//        }
//
//    }
//


    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level3grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 350,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level3dressclickstart1,
            callbackScope: this
        });

    }

    function level3dressclickstart1() {
        level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 350
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
        }



        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno1 = this.texture.key.substr(11)
            if (darr3[0] == parseInt(sno1)) {
                aishadress.setFrame(0)

                darr3[0] = 0
            } else {
                darr3[0] = parseInt(sno1)
                aishadress.setFrame(parseInt(sno1))

            }
            if (darr3[0] == 2) {
                aishahdress.setFrame(1)
            } else if (darr3[0] == 4) {
                aishahdress.setFrame(2)
            } else if (darr3[0] == 7) {
                aishahdress.setFrame(3)
            } else {
                aishahdress.setFrame(0)
            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level3hair' + i].on('pointerover', etopOverFun)
            game['level3hair' + i].on('pointerout', etopOutFun)
            game['level3hair' + i].on('pointerdown', hairFun)
        }

        function hairFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno2 = this.texture.key.substr(10)
            if (darr3[1] == parseInt(sno2)) {
                aishabhair.setFrame(0)
                aishahair.setFrame(0)
                darr3[1] = 0
            } else {
                darr3[1] = parseInt(sno2)
                aishabhair.setFrame(parseInt(sno2))
                aishahair.setFrame(parseInt(sno2))

            }
            btnvisFun()
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
            sno3 = this.texture.key.substr(11)

            if (darr3[2] == parseInt(sno3)) {
                aishachain.setFrame(0)
                darr3[2] = 0
            } else {
                darr3[2] = parseInt(sno3)
                aishachain.setFrame(parseInt(sno3))
            }
            btnvisFun()

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
            sno4 = this.texture.key.substr(10)
            if (darr3[3] == parseInt(sno4)) {
                aishastud.setFrame(0)
                darr3[3] = 0
            } else {
                darr3[3] = parseInt(sno4)
                aishastud.setFrame(parseInt(sno4))
            }
            btnvisFun()

        }

        for (i = 4; i >= 1; i--) {
            game['level3bag' + i].on('pointerover', etopOverFun)
            game['level3bag' + i].on('pointerout', etopOutFun)
            game['level3bag' + i].on('pointerdown', bagFun)
        }

        function bagFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno5 = this.texture.key.substr(9)
            if (darr3[4] == parseInt(sno5)) {
                aishabag.setFrame(0)
                aishabbag.setFrame(0)
                darr3[4] = 0
            } else {
                darr3[4] = parseInt(sno5)
                aishabag.setFrame(parseInt(sno5))
                aishabbag.setFrame(parseInt(sno5))
            }
            btnvisFun()
        }

        for (i = 4; i >= 1; i--) {
            game['level3glass' + i].on('pointerover', etopOverFun)
            game['level3glass' + i].on('pointerout', etopOutFun)
            game['level3glass' + i].on('pointerdown', glassFun)
        }

        function glassFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno6 = this.texture.key.substr(11)
            if (darr3[5] == parseInt(sno6)) {
                aishaglass.setFrame(0)
                darr3[5] = 0
            } else {
                darr3[5] = parseInt(sno6)
                aishaglass.setFrame(parseInt(sno6))
            }
            btnvisFun()
        }


        function btnvisFun() {

            if (btnstart1 && done2.visible == false) {
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

        if (game['level3dress' + 1].visible) {

            level3dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 7].visible) {

            level3dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level3dress' + 1].visible) {

            level3dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 7].visible) {

            level3dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3dress' + i].visible = true
            }
        }

    }

    for (i = 6; i >= 1; i--) {
        game['level3cat' + i].on('pointerover', levelcatoverstart)
        game['level3cat' + i].on('pointerout', levelcatoutstart)
        game['level3cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
    }

    function levelcatdownstart(ev) {

        //         adcountstart1 = 1
        //            game['level3cat' + 4].setInteractive({
        //                pixelPerfect: true,
        //                useHandCursor: true
        //            })
        //        

        rarrow.visible = false
        larrow.visible = false
        level3dots.visible = false
        level3dots.setFrame(0)
        larrow.visible = false
        rarrow.visible = false

        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 6; i++) {
            game['level3cat' + i].setFrame(0)
        }
       
            if (parseInt(sno) == 1) {
                game['level3cat' + 1].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level3cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level3dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3chain' + i].visible = false
                    game['level3stud' + i].visible = false
                    game['level3hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3bag' + i].visible = false
                    game['level3glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3stud' + i].visible = true
                }
            } else if (parseInt(sno) == 2) {
                game['level3cat' + 2].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level3cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level3dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3chain' + i].visible = false
                    game['level3stud' + i].visible = false
                    game['level3hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3bag' + i].visible = false
                    game['level3glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3chain' + i].visible = true
                }
            } else if (parseInt(sno) == 3) {
                game['level3cat' + 3].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level3cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level3dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3chain' + i].visible = false
                    game['level3stud' + i].visible = false
                    game['level3hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3bag' + i].visible = false
                    game['level3glass' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3glass' + i].visible = true
                }
            } else if (parseInt(sno) == 4) {
                game['level3cat' + 4].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level3cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level3dress' + i].visible = false

                }
                for (i = 1; i <= 6; i++) {
                    game['level3chain' + i].visible = false
                    game['level3stud' + i].visible = false
                    game['level3hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3bag' + i].visible = false
                    game['level3glass' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3bag' + i].visible = true
                }
            } else if (parseInt(sno) == 5) {
                game['level3cat' + 5].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level3cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level3dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3chain' + i].visible = false
                    game['level3stud' + i].visible = false
                    game['level3hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3bag' + i].visible = false
                    game['level3glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3hair' + i].visible = true
                }
            } else if (parseInt(sno) == 6) {
                rarrow.visible = true
                larrow.visible = true
                level3dots.visible = true
                level3dots.setFrame(0)
                game['level3cat' + 6].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level3cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level3dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level3chain' + i].visible = false
                    game['level3stud' + i].visible = false
                    game['level3hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level3bag' + i].visible = false
                    game['level3glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
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
            if (lcount3 == 0) {
                level = 4
                lcount3 = 1
            }


            darr3[0] = aishadress.frame.name
            darr3[1] = aishabhair.frame.name
            darr3[1] = aishahair.frame.name
            darr3[2] = aishachain.frame.name
            darr3[3] = aishastud.frame.name
            darr3[4] = aishabag.frame.name
            darr3[4] = aishabbag.frame.name



            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level3grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 200,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 200
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
        targets: aishabhair,
        y: aishabhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });


    game.scene.scenes[pageNo].tweens.add({
        targets: aishahead,
        y: aishahead.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: aishaeye,
        y: aishaeye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: aishaeyetop,
        y: aishaeyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: aishaglass,
        y: aishaglass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: aishaeblink,
        y: aishaeblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    game.scene.scenes[pageNo].tweens.add({
        targets: aishaebrow,
        y: aishaebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: aishahair,
        y: aishahair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: aishastud,
        y: aishastud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    aishaeblink.setFrame(esarr[2] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: aishaheadanimation11,
        callbackScope: this
    })

    function aishaheadanimation11() {
        aishaeblink.setFrame(esarr[2])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: aishaheadanimation1,
            callbackScope: this
        })

    }






    function aishaheadanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: aishastud,
            y: aishastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: aishabhair,
            y: aishabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: aishahead,
            y: aishahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeye,
            y: aishaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: aishaebrow,
            y: aishaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeyetop,
            y: aishaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaglass,
            y: aishaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeblink,
            y: aishaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishahair,
            y: aishahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        aishaeblink.setFrame(esarr[2] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: aishaheadanimation11,
            callbackScope: this
        })

        function aishaheadanimation1() {
            aishaeblink.setFrame(esarr[2])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: aishaheadanimation1,
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
var level4 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level4() {
        Phaser.Scene.call(this, {
            key: 'level4'
        });
    },
    preload: function () {
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

        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        larrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(-0.9, 0.9)
        rarrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(0.9, 0.9)

        larrow.visible = false
        rarrow.visible = false

        level4panel = this.add.sprite(402, 30, 'level1panel').setOrigin(0, 0)
        level4dots = this.add.sprite(631, 54, 'level1dots').setOrigin(0, 0)
        level4dots.visible = true


        var edrxrr = [, 523, 657, 522, 658, 522, 657, 519, 655, 518, 655]
        var edryrr = [, 70, 70, 202, 202, 332, 332, 130, 130, 273, 273]
        for (i = 10; i >= 1; i--) {
            game['level4dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level4dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4dress' + i].visible = false;
            game['level4dress' + i].x += parseFloat(game['level4dress' + i].width / 2);
            game['level4dress' + i].y += parseFloat(game['level4dress' + i].height / 2);
        }

        var ehaxrr = [, 523, 657, 522, 658, 522, 657]
        var ehayrr = [, 70, 70, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level4hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level4hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4hair' + i].visible = false;
            game['level4hair' + i].x += parseFloat(game['level4hair' + i].width / 2);
            game['level4hair' + i].y += parseFloat(game['level4hair' + i].height / 2);
        }
        var ebgaxrr = [, 523, 657, 522, 658, 522, 657]
        var ebgayrr = [, 70, 70, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level4chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level4chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4chain' + i].visible = false
            game['level4chain' + i].x += parseFloat(game['level4chain' + i].width / 2);
            game['level4chain' + i].y += parseFloat(game['level4chain' + i].height / 2);
        }
        var estaxrr = [, 523, 657, 522, 658, 522, 657]
        var estayrr = [, 70, 70, 202, 202, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level4stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level4stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4stud' + i].visible = false;
            game['level4stud' + i].x += parseFloat(game['level4stud' + i].width / 2);
            game['level4stud' + i].y += parseFloat(game['level4stud' + i].height / 2);
        }
        var estgaxrr = [, 519, 655, 518, 655]
        var estgayrr = [, 130, 130, 273, 273]
        for (i = 4; i >= 1; i--) {
            game['level4bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level4bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4bag' + i].visible = false;
            game['level4bag' + i].x += parseFloat(game['level4bag' + i].width / 2);
            game['level4bag' + i].y += parseFloat(game['level4bag' + i].height / 2);
        }

        var estglxrr = [, 519, 655, 518, 655]
        var estglyrr = [, 130, 130, 273, 273]
        for (i = 4; i >= 1; i--) {
            game['level4glass' + i] = this.add.sprite(estglxrr[i], estglyrr[i], 'level4glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4glass' + i].visible = false;
            game['level4glass' + i].x += parseFloat(game['level4glass' + i].width / 2);
            game['level4glass' + i].y += parseFloat(game['level4glass' + i].height / 2);
        }
        for (i = 6; i >= 1; i--) {
            game['level4stud' + i].visible = true
        }

        var cdaxrr = [, 452, 452, 452, 452, 452, 452]
        var cdayrr = [, 80, 143, 201, 261, 321, 381]
        for (i = 6; i >= 1; i--) {
            game['level4cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level4cat' + i].x += parseFloat(game['level4cat' + i].width / 2)
            game['level4cat' + i].y += parseFloat(game['level4cat' + i].height / 2)
        }

        cupboardgroup = this.add.container()
        cupboardgroup.add(level4panel)
        cupboardgroup.add(level4dots)
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level4dress' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level4hair' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level4chain' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level4stud' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level4bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level4glass' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level4cat' + i])
        }

        level4dots.visible = false
        larrow.visible = false
        rarrow.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level4cat' + 1].setFrame(1)


        bloombhair = this.add.sprite(283, 33, 'bloombhair').setOrigin(0.5, 0)
        bloombhair.x += parseFloat(bloombhair.width / 2)
        bloombbag = this.add.sprite(308, 157, 'bloombbag').setOrigin(0, 0)
        bloombody = this.add.sprite(256, 121, 'bloombody').setOrigin(0, 0)
        bloomhead = this.add.sprite(338, 41, 'bloomhead').setOrigin(0, 0)
        bloomebrow = this.add.sprite(348, 86, 'bloomebrow').setOrigin(0, 0)
        bloomeyetop = this.add.sprite(346, 84, 'bloomeyetop').setOrigin(0, 0)
        bloomeye = this.add.sprite(357, 96, 'bloomeye').setOrigin(0, 0)
        bloomeblink = this.add.sprite(346, 93, 'bloomeblink').setOrigin(0, 0)
        bloomdress = this.add.sprite(234, 146, 'bloomdress').setOrigin(0, 0)
        bloomhdress = this.add.sprite(277, 270, 'bloomhdress').setOrigin(0, 0)
        bloomhair = this.add.sprite(311, -16, 'bloomhair').setOrigin(0, 0)
        bloomchain = this.add.sprite(349, 157, 'bloomchain').setOrigin(0, 0)
        bloomstud = this.add.sprite(334, 112, 'bloomstud').setOrigin(0, 0)
        bloombag = this.add.sprite(262, 154, 'bloombag').setOrigin(0, 0)
        bloomglass = this.add.sprite(340, 81, 'bloomglass').setOrigin(0, 0)
        bloomhand = this.add.sprite(256, 295, 'bloomhand').setOrigin(0, 0)


        level4grp = this.add.container()
        level4grp.add(bloombhair)
        level4grp.add(bloombbag)
        level4grp.add(bloombody)
        level4grp.add(bloomhead)
        level4grp.add(bloomeye)
        level4grp.add(bloomeyetop)
        level4grp.add(bloomebrow)
        level4grp.add(bloomeblink)
        level4grp.add(bloomdress)
        level4grp.add(bloombag)
        level4grp.add(bloomchain)
        level4grp.add(bloomhair)
        level4grp.add(bloomglass)
        level4grp.add(bloomstud)
        level4grp.add(bloomhand)
        level4grp.add(bloomhdress)


        level4grp.x = -800
        bloomeblink.setFrame(esarr[3])

        bloomdress.setFrame(darr4[0])
        bloombhair.setFrame(darr4[1])
        bloomhair.setFrame(darr4[1])
        bloomchain.setFrame(darr4[2])
        bloomstud.setFrame(darr4[3])
        bloombag.setFrame(darr4[4])
        bloombbag.setFrame(darr4[4])
        bloomglass.setFrame(darr4[5])
        //
        if (darr4[0] == 2) {
            bloomhdress.setFrame(1)
        } else if (darr4[0] == 7) {
            bloomhdress.setFrame(2)
        } else if (darr4[0] == 10) {
            bloomhdress.setFrame(3)
        } else {
            bloomhdress.setFrame(0)
        }

        bloombhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: bloombhair,
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
            targets: bloomeye,
            x: 360,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: bloomeyestart1,
            callbackScope: this
        });

        function bloomeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 357,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart2,
                callbackScope: this
            });
        }

        function bloomeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 354,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: bloomeyestart3,
                callbackScope: this
            });
        }

        function bloomeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 357,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart4,
                callbackScope: this
            });
        }

        function bloomeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 360,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: bloomeyestart1,
                callbackScope: this
            });

        }



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

        dressgliter = this.add.sprite(390.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(390, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(607, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
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
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll4
        this.load.spritesheet('tecnabhair', 'assets/level5/doll/bhair.png', {
            frameWidth: 160,
            frameHeight: 206
        });
        this.load.image('tecnabody', 'assets/level5/doll/body.png');
        this.load.image('tecnahead', 'assets/level5/doll/head.png');
        this.load.image('tecnaebrow', 'assets/level5/doll/ebrow.png');
        this.load.image('tecnaeyetop', 'assets/level5/doll/eyetop.png');
        this.load.image('tecnaeye', 'assets/level5/doll/eye.png');
        this.load.image('tecnahand', 'assets/level5/doll/hand.png');
        this.load.spritesheet('tecnaeblink', 'assets/level5/doll/eblink.png', {
            frameWidth: 73,
            frameHeight: 24
        });
        this.load.spritesheet('tecnadress', 'assets/level5/doll/dress.png', {
            frameWidth: 293,
            frameHeight: 449
        });
        this.load.spritesheet('tecnahair', 'assets/level5/doll/hair.png', {
            frameWidth: 151,
            frameHeight: 289
        });
        this.load.spritesheet('tecnachain', 'assets/level5/doll/chain.png', {
            frameWidth: 64,
            frameHeight: 61
        });
        this.load.spritesheet('tecnastud', 'assets/level5/doll/stud.png', {
            frameWidth: 88,
            frameHeight: 54
        });
        this.load.spritesheet('tecnabag', 'assets/level5/doll/bag.png', {
            frameWidth: 189,
            frameHeight: 272
        });
        this.load.spritesheet('tecnabbag', 'assets/level5/doll/bbag.png', {
            frameWidth: 180,
            frameHeight: 268
        });
        this.load.spritesheet('tecnaglass', 'assets/level5/doll/glass.png', {
            frameWidth: 96,
            frameHeight: 42
        });

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
            
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame8 && donecount == 0) {
                level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 130

            } else {
                level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50
            }



            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25


        })

        resize()
    },
    update: function () {
        resize()
    }
});

function level4start() {




    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level4grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 130,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level4dressclickstart1,
            callbackScope: this
        });

    }

    function level4dressclickstart1() {
        level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 130
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
        }



        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno1 = this.texture.key.substr(11)
            if (darr4[0] == parseInt(sno1)) {
                bloomdress.setFrame(0)

                darr4[0] = 0
            } else {
                darr4[0] = parseInt(sno1)
                bloomdress.setFrame(parseInt(sno1))

            }
            if (darr4[0] == 2) {
                bloomhdress.setFrame(1)
            } else if (darr4[0] == 7) {
                bloomhdress.setFrame(2)
            } else if (darr4[0] == 10) {
                bloomhdress.setFrame(3)
            } else {
                bloomhdress.setFrame(0)
            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level4hair' + i].on('pointerover', etopOverFun)
            game['level4hair' + i].on('pointerout', etopOutFun)
            game['level4hair' + i].on('pointerdown', hairFun)
        }

        function hairFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno2 = this.texture.key.substr(10)
            if (darr4[1] == parseInt(sno2)) {
                bloombhair.setFrame(0)
                bloomhair.setFrame(0)
                darr4[1] = 0
            } else {
                darr4[1] = parseInt(sno2)
                bloombhair.setFrame(parseInt(sno2))
                bloomhair.setFrame(parseInt(sno2))

            }
            btnvisFun()
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
            sno3 = this.texture.key.substr(11)

            if (darr4[2] == parseInt(sno3)) {
                bloomchain.setFrame(0)
                darr4[2] = 0
            } else {
                darr4[2] = parseInt(sno3)
                bloomchain.setFrame(parseInt(sno3))
            }
            btnvisFun()

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
            sno4 = this.texture.key.substr(10)
            if (darr4[3] == parseInt(sno4)) {
                bloomstud.setFrame(0)
                darr4[3] = 0
            } else {
                darr4[3] = parseInt(sno4)
                bloomstud.setFrame(parseInt(sno4))
            }
            btnvisFun()

        }

        for (i = 4; i >= 1; i--) {
            game['level4bag' + i].on('pointerover', etopOverFun)
            game['level4bag' + i].on('pointerout', etopOutFun)
            game['level4bag' + i].on('pointerdown', bagFun)
        }

        function bagFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno5 = this.texture.key.substr(9)
            if (darr4[4] == parseInt(sno5)) {
                bloombag.setFrame(0)
                bloombbag.setFrame(0)
                darr4[4] = 0
            } else {
                darr4[4] = parseInt(sno5)
                bloombag.setFrame(parseInt(sno5))
                bloombbag.setFrame(parseInt(sno5))
            }
            btnvisFun()
        }

        for (i = 4; i >= 1; i--) {
            game['level4glass' + i].on('pointerover', etopOverFun)
            game['level4glass' + i].on('pointerout', etopOutFun)
            game['level4glass' + i].on('pointerdown', glassFun)
        }

        function glassFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno6 = this.texture.key.substr(11)
            if (darr4[5] == parseInt(sno6)) {
                bloomglass.setFrame(0)
                darr4[5] = 0
            } else {
                darr4[5] = parseInt(sno6)
                bloomglass.setFrame(parseInt(sno6))
            }
            btnvisFun()
        }


        function btnvisFun() {

            if (btnstart1 && done2.visible == false) {
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

        if (game['level4dress' + 1].visible) {

            level4dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 7].visible) {

            level4dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level4dress' + 1].visible) {

            level4dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 7].visible) {

            level4dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4dress' + i].visible = true
            }
        }

    }

    for (i = 6; i >= 1; i--) {
        game['level4cat' + i].on('pointerover', levelcatoverstart)
        game['level4cat' + i].on('pointerout', levelcatoutstart)
        game['level4cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
    }

    function levelcatdownstart(ev) {
        rarrow.visible = false
        larrow.visible = false
        level4dots.visible = false
        level4dots.setFrame(0)
        larrow.visible = false
        rarrow.visible = false

        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 6; i++) {
            game['level4cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level4cat' + 1].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            game['level4cat' + 2].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            game['level4cat' + 3].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4glass' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            game['level4cat' + 4].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false

            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bag' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            game['level4cat' + 5].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level4dots.visible = true
            level4dots.setFrame(0)
            game['level4cat' + 6].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level4cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4chain' + i].visible = false
                game['level4stud' + i].visible = false
                game['level4hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4bag' + i].visible = false
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
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
            if (lcount4 == 0) {
                level = 5
                lcount4 = 1
            }


            darr4[0] = bloomdress.frame.name
            darr4[7] = bloombhair.frame.name
            darr4[1] = bloomhair.frame.name
            darr4[2] = bloomchain.frame.name
            darr4[3] = bloomstud.frame.name
            darr4[4] = bloombag.frame.name
            darr4[4] = bloombbag.frame.name
            darr4[5] = bloomglass.frame.name

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level4grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50
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
        targets: bloombhair,
        y: bloombhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });


    game.scene.scenes[pageNo].tweens.add({
        targets: bloomhead,
        y: bloomhead.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: bloomeye,
        y: bloomeye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: bloomeyetop,
        y: bloomeyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: bloomeblink,
        y: bloomeblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: bloomhair,
        y: bloomhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });

    game.scene.scenes[pageNo].tweens.add({
        targets: bloomebrow,
        y: bloomebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: bloomstud,
        y: bloomstud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: bloomglass,
        y: bloomglass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    bloomeblink.setFrame(esarr[3] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: bloomheadanimation11,
        callbackScope: this
    })

    function bloomheadanimation11() {
        bloomeblink.setFrame(esarr[3])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: bloomheadanimation1,
            callbackScope: this
        })

    }






    function bloomheadanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomstud,
            y: bloomstud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: bloombhair,
            y: bloombhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: bloomhead,
            y: bloomhead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeye,
            y: bloomeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: bloomebrow,
            y: bloomebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeyetop,
            y: bloomeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomglass,
            y: bloomglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeblink,
            y: bloomeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomhair,
            y: bloomhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        bloomeblink.setFrame(esarr[3] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: bloomheadanimation11,
            callbackScope: this
        })

        function bloomheadanimation1() {
            bloomeblink.setFrame(esarr[3])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: bloomheadanimation1,
                callbackScope: this
            })
        }

    }




}

var startgame9 = false
var btnstart1 = false
var btnstart2 = false
var btnstart3 = false
var btnstart4 = false
var btnstart5 = false
var glowarr = [0, 0, 0, 0]
var level5 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level5() {
        Phaser.Scene.call(this, {
            key: 'level5'
        });
    },
    preload: function () {
        loadFinish = false
        pageNo = 9
        settingval = false
        startgame9 = false
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
        level5background = this.add.image(0, 0, 'level5background').setOrigin(0, 0)

        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        larrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(-0.9, 0.9)
        rarrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(0.9, 0.9)

        larrow.visible = false
        rarrow.visible = false

        level5panel = this.add.sprite(402, 30, 'level1panel').setOrigin(0, 0)
        level5dots = this.add.sprite(631, 54, 'level1dots').setOrigin(0, 0)
        level5dots.visible = true


        var edrxrr = [, 526, 658, 526, 658, 526, 658, 516, 655, 516, 654]
        var edryrr = [, 69, 69, 201, 201, 332, 332, 130, 130, 272, 272]
        for (i = 10; i >= 1; i--) {
            game['level5dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level5dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5dress' + i].visible = false;
            game['level5dress' + i].x += parseFloat(game['level5dress' + i].width / 2);
            game['level5dress' + i].y += parseFloat(game['level5dress' + i].height / 2);
        }

        var ehaxrr = [, 526, 658, 526, 658, 526, 658]
        var ehayrr = [, 69, 69, 201, 201, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level5hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level5hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5hair' + i].visible = false;
            game['level5hair' + i].x += parseFloat(game['level5hair' + i].width / 2);
            game['level5hair' + i].y += parseFloat(game['level5hair' + i].height / 2);
        }
        var ebgaxrr = [, 526, 658, 526, 658, 526, 658]
        var ebgayrr = [, 69, 69, 201, 201, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level5chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level5chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5chain' + i].visible = false
            game['level5chain' + i].x += parseFloat(game['level5chain' + i].width / 2);
            game['level5chain' + i].y += parseFloat(game['level5chain' + i].height / 2);
        }
        var estaxrr = [, 526, 658, 526, 658, 526, 658]
        var estayrr = [, 69, 69, 201, 201, 332, 332]
        for (i = 6; i >= 1; i--) {
            game['level5stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level5stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5stud' + i].visible = false;
            game['level5stud' + i].x += parseFloat(game['level5stud' + i].width / 2);
            game['level5stud' + i].y += parseFloat(game['level5stud' + i].height / 2);
        }
        var estgaxrr = [, 516, 655, 516, 654]
        var estgayrr = [, 130, 130, 272, 272]
        for (i = 4; i >= 1; i--) {
            game['level5bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level5bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5bag' + i].visible = false;
            game['level5bag' + i].x += parseFloat(game['level5bag' + i].width / 2);
            game['level5bag' + i].y += parseFloat(game['level5bag' + i].height / 2);
        }

        var estglxrr = [, 516, 655, 516, 654]
        var estglyrr = [, 130, 130, 272, 272]
        for (i = 4; i >= 1; i--) {
            game['level5glass' + i] = this.add.sprite(estglxrr[i], estglyrr[i], 'level5glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5glass' + i].visible = false;
            game['level5glass' + i].x += parseFloat(game['level5glass' + i].width / 2);
            game['level5glass' + i].y += parseFloat(game['level5glass' + i].height / 2);
        }
        for (i = 6; i >= 1; i--) {
            game['level5stud' + i].visible = true
        }

        var cdaxrr = [, 452, 452, 452, 452, 452, 452]
        var cdayrr = [, 80, 143, 201, 261, 321, 381]
        for (i = 6; i >= 1; i--) {
            game['level5cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level5cat' + i].x += parseFloat(game['level5cat' + i].width / 2)
            game['level5cat' + i].y += parseFloat(game['level5cat' + i].height / 2)
        }
//        if (adcountstart2 == 0) {
//            game['level5cat' + 3].disableInteractive()
//        }
//        if (adcountstart2 == 0) {
//            lockchain = this.add.sprite(457, 213, 'lockchain').setOrigin(0, 0)
//            level3lock = this.add.sprite(484.5, 217, 'lock').setOrigin(0.5, 0.1).setInteractive({
//                useHandCursor: true
//            })
//        }

        cupboardgroup = this.add.container()
        cupboardgroup.add(level5panel)
        cupboardgroup.add(level5dots)
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level5dress' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level5hair' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level5chain' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level5stud' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level5bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level5glass' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level5cat' + i])
        }
//        if (adcountstart2 == 0) {
//            cupboardgroup.add(level3lock)
//            cupboardgroup.add(lockchain)
//
//
//            level3lock.angle = -1
//
//            setTimeout(lockanistart3, 2000)
//
//            function lockanistart3() {
//                game.scene.scenes[pageNo].tweens.add({
//                    targets: level3lock,
//                    angle: 5,
//                    ease: 'Linear',
//                    duration: 100,
//                    repeat: 2,
//                    yoyo: true,
//                });
//                setTimeout(lockanistart3, 2000)
//            }
//
//
//        }

        level5dots.visible = false
        larrow.visible = false
        rarrow.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level5cat' + 1].setFrame(1)


        tecnabhair = this.add.sprite(128, 57, 'tecnabhair').setOrigin(0.5, 0)
        tecnabhair.x += parseFloat(tecnabhair.width / 2)
        tecnabbag = this.add.sprite(78, 164, 'tecnabbag').setOrigin(0, 0)
        tecnabody = this.add.sprite(91, 112, 'tecnabody').setOrigin(0, 0)
        tecnahead = this.add.sprite(163, 51, 'tecnahead').setOrigin(0, 0)
        tecnaebrow = this.add.sprite(165, 91, 'tecnaebrow').setOrigin(0, 0)
        tecnaeyetop = this.add.sprite(160, 95, 'tecnaeyetop').setOrigin(0, 0)
        tecnaeye = this.add.sprite(172, 104, 'tecnaeye').setOrigin(0, 0)
        tecnaeblink = this.add.sprite(162, 101, 'tecnaeblink').setOrigin(0, 0)
        tecnadress = this.add.sprite(59, 133, 'tecnadress').setOrigin(0, 0)
        tecnahair = this.add.sprite(138, 20, 'tecnahair').setOrigin(0, 0)
        tecnachain = this.add.sprite(177, 162, 'tecnachain').setOrigin(0, 0)
        tecnastud = this.add.sprite(165, 119, 'tecnastud').setOrigin(0, 0)
        tecnabag = this.add.sprite(70, 166, 'tecnabag').setOrigin(0, 0)
        tecnaglass = this.add.sprite(155, 96, 'tecnaglass').setOrigin(0, 0)
        tecnahand = this.add.sprite(205, 275, 'tecnahand').setOrigin(0, 0)


        level5grp = this.add.container()
        level5grp.add(tecnabhair)
        level5grp.add(tecnabbag)
        level5grp.add(tecnabody)
        level5grp.add(tecnahead)
        level5grp.add(tecnaeye)
        level5grp.add(tecnaeyetop)
        level5grp.add(tecnaebrow)
        level5grp.add(tecnaeblink)
        level5grp.add(tecnadress)
        level5grp.add(tecnabag)
        level5grp.add(tecnachain)
        level5grp.add(tecnahair)
        level5grp.add(tecnaglass)
        level5grp.add(tecnastud)
        level5grp.add(tecnahand)


        level5grp.x = -800
        tecnaeblink.setFrame(esarr[4])

        tecnadress.setFrame(darr5[0])
        tecnabhair.setFrame(darr5[1])
        tecnahair.setFrame(darr5[1])
        tecnachain.setFrame(darr5[2])
        tecnastud.setFrame(darr5[3])
        tecnabag.setFrame(darr5[4])
        tecnabbag.setFrame(darr5[4])
        tecnaglass.setFrame(darr5[5])
        //


        tecnabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: tecnabhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });

        this.time.addEvent({
            delay: 2000,
            callback: level5dressdollanimation1,
            callbackScope: this
        })

        function level5dressdollanimation1() {
            level5grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level5grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level5grp,
                y: level5grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });

            this.time.addEvent({
                delay: 3000,
                callback: level5dressdollanimation1,
                callbackScope: this
            })
        }


        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeye,
            x: 175,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: tecnaeyestart1,
            callbackScope: this
        });

        function tecnaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 172,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart2,
                callbackScope: this
            });
        }

        function tecnaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 169,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: tecnaeyestart3,
                callbackScope: this
            });
        }

        function tecnaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 172,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart4,
                callbackScope: this
            });
        }

        function tecnaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 175,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: tecnaeyestart1,
                callbackScope: this
            });

        }



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

        dressgliter = this.add.sprite(200.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(200, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(607, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
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

        level5grp.add(dressgliter)
        level5grp.add(dollgliter)
        cupboardgroup.add(done2)
        done2.visible = false

//        if (adcountstart2 == 0) {
//
//            fillbackground1 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//            fillbackground1.visible = false
//            adpanel = this.add.image(221, 144, 'adpanel').setOrigin(0, 0)
//            watchad = this.add.image(299, 342, 'watchad').setOrigin(0, 0).setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//            watchadclose = this.add.image(523, 136, 'watchadclose').setOrigin(0, 0).setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//
//            adpanelcontainer = this.add.container()
//            adpanelcontainer.add(adpanel)
//            adpanelcontainer.add(watchad)
//            adpanelcontainer.add(watchadclose)
//            adpanelcontainer.x = safeArea.x
//            adpanelcontainer.setScale(0)
//
//
//        }


        logomutefun()
        fillbackground2 = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground2.visible = false
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll4
        this.load.spritesheet('stellabhair', 'assets/level6/doll/bhair.png', {
            frameWidth: 187,
            frameHeight: 349
        });
        this.load.image('stellabody', 'assets/level6/doll/body.png');
        this.load.image('stellahead', 'assets/level6/doll/head.png');
        this.load.image('stellaebrow', 'assets/level6/doll/ebrow.png');
        this.load.image('stellaeyetop', 'assets/level6/doll/eyetop.png');
        this.load.image('stellaeye', 'assets/level6/doll/eye.png');
        this.load.spritesheet('stellaeblink', 'assets/level6/doll/eblink.png', {
            frameWidth: 77,
            frameHeight: 26
        });
        this.load.spritesheet('stelladress', 'assets/level6/doll/dress.png', {
            frameWidth: 290,
            frameHeight: 607
        });

        this.load.spritesheet('stellahair', 'assets/level6/doll/hair.png', {
            frameWidth: 155,
            frameHeight: 323
        });
        this.load.spritesheet('stellachain', 'assets/level6/doll/chain.png', {
            frameWidth: 71,
            frameHeight: 73
        });
        this.load.spritesheet('stellastud', 'assets/level6/doll/stud.png', {
            frameWidth: 94,
            frameHeight: 52
        });
        this.load.spritesheet('stellabag', 'assets/level6/doll/bag.png', {
            frameWidth: 161,
            frameHeight: 263
        });
        this.load.spritesheet('stellabbag', 'assets/level6/doll/bbag.png', {
            frameWidth: 171,
            frameHeight: 271
        });
        this.load.spritesheet('stellaglass', 'assets/level6/doll/glass.png', {
            frameWidth: 87,
            frameHeight: 45
        });


        this.load.start();
        level5background.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height


        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {

            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            level5background.x = safeArea.x - 300

            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame9 && donecount == 0) {
                level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50

            } else {
                level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 220
            }


//            if (adcountstart2 == 0) {
//
//                adpanelcontainer.x = safeArea.x
//            }

            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25


        })

        resize()
    },
    update: function () {
        resize()
    }
});

function level5start() {
//    if (adcountstart2 == 0) {
//        level3lock.on('pointerdown', watchpanelstart)
//
//        function watchpanelstart() {
//            fillbackground1.visible = true
//            adpanelcontainer.x = 500
//            adpanelcontainer.y = 200
//            game.scene.scenes[pageNo].tweens.add({
//                targets: adpanelcontainer,
//                x: safeArea.x,
//                y: 0,
//                scale: 1,
//                scale: 1,
//                ease: 'Back.easeOut',
//                duration: 300,
//            });
//
//        }
//        watchadclose.on('pointerdown', watchclosebtn)
//
//        function watchclosebtn() {
//            fillbackground1.visible = false
//            game.scene.scenes[pageNo].tweens.add({
//                targets: adpanelcontainer,
//                x: 500,
//                y: 200,
//                scale: 0,
//                scale: 0,
//                ease: 'Back.easeIn',
//                duration: 300,
//            });
//        }
//        window[preroll.config.loaderObjectName].registerRewardCallbacks({
//            onReady: OnReadyMethod,
//            onSuccess: OnSuccessMethod,
//            onFail: OnFailMethod
//        });
//        watchad.on('pointerdown', watchadstart)
//
//        function watchadstart() {
//            fillbackground2.visible = true
//            soundstart = 1
//            music.pause()
//            window[preroll.config.loaderObjectName].showRewardAd();
//
//        }
//
//
//        function OnReadyMethod() {
//
//            //        console.log(1)
//            //        soundstart = 1
//            //        music.pause()
//            //        soundmute.setFrame(1);
//        }
//
//        function OnSuccessMethod() {
//            fillbackground2.visible = false
//            console.log(2)
//            //        game.scene.scenes[pageNo].scene.resume()
//            fillbackground1.visible = false
//            adpanelcontainer.setScale(0)
//            adcountstart2 = 1
//            game['level5cat' + 3].setInteractive({
//                pixelPerfect: true,
//                useHandCursor: true
//            })
//            level3lock.visible = false
//            lockchain.visible = false
//            soundstart = 0
//            if (!isMuted) {
//                music.resume()
//                soundmute.setFrame(0);
//            } else {
//                music.pause()
//                soundmute.setFrame(1);
//            }
//            if (!isMuted1) {
//                clicksound.resume();
//                clickmute.setFrame(0)
//            } else {
//                clicksound.pause();
//                clickmute.setFrame(1)
//            }
//        }
//
//        function OnFailMethod() {
//            fillbackground2.visible = false
//            console.log(3)
//            //        game.scene.scenes[pageNo].scene.resume()
//            fillbackground1.visible = true
//            adpanelcontainer.setScale(1)
//            adcountstart2 = 0
//            soundstart = 0
//            if (!isMuted) {
//                music.resume()
//                soundmute.setFrame(0);
//            } else {
//                music.pause()
//                soundmute.setFrame(1);
//            }
//            if (!isMuted1) {
//                clicksound.resume();
//                clickmute.setFrame(0)
//            } else {
//                clicksound.pause();
//                clickmute.setFrame(1)
//            }
//        }
//
//    }
//


    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level5grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level5dressclickstart1,
            callbackScope: this
        });

    }

    function level5dressclickstart1() {
        level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 50
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
            onComplete: level5dressclickstart,
            callbackScope: this
        });
    }





    function level5dressclickstart() {
        cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        cupboardstart = true

        for (i = 10; i >= 1; i--) {
            game['level5dress' + i].on('pointerover', etopOverFun)
            game['level5dress' + i].on('pointerout', etopOutFun)
            game['level5dress' + i].on('pointerdown', etopFun1)
        }

        function etopOverFun(ev) {
            this.setScale(1.05)
        }

        function etopOutFun(ev) {
            this.setScale(1)
        }



        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno1 = this.texture.key.substr(11)
            if (darr5[0] == parseInt(sno1)) {
                tecnadress.setFrame(0)

                darr5[0] = 0
            } else {
                darr5[0] = parseInt(sno1)
                tecnadress.setFrame(parseInt(sno1))

            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level5hair' + i].on('pointerover', etopOverFun)
            game['level5hair' + i].on('pointerout', etopOutFun)
            game['level5hair' + i].on('pointerdown', hairFun)
        }

        function hairFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno2 = this.texture.key.substr(10)
            if (darr5[1] == parseInt(sno2)) {
                tecnabhair.setFrame(0)
                tecnahair.setFrame(0)
                darr5[1] = 0
            } else {
                darr5[1] = parseInt(sno2)
                tecnabhair.setFrame(parseInt(sno2))
                tecnahair.setFrame(parseInt(sno2))

            }
            btnvisFun()
        }

        for (i = 6; i >= 1; i--) {
            game['level5chain' + i].on('pointerover', etopOverFun)
            game['level5chain' + i].on('pointerout', etopOutFun)
            game['level5chain' + i].on('pointerdown', chainFun)
        }

        function chainFun(ev) {

            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart3 = true
            playsoundeffects('itemclick');
            sno3 = this.texture.key.substr(11)

            if (darr5[2] == parseInt(sno3)) {
                tecnachain.setFrame(0)
                darr5[2] = 0
            } else {
                darr5[2] = parseInt(sno3)
                tecnachain.setFrame(parseInt(sno3))
            }
            btnvisFun()

        }
        for (i = 6; i >= 1; i--) {
            game['level5stud' + i].on('pointerover', etopOverFun)
            game['level5stud' + i].on('pointerout', etopOutFun)
            game['level5stud' + i].on('pointerdown', studFun)
        }


        function studFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno4 = this.texture.key.substr(10)
            if (darr5[3] == parseInt(sno4)) {
                tecnastud.setFrame(0)
                darr5[3] = 0
            } else {
                darr5[3] = parseInt(sno4)
                tecnastud.setFrame(parseInt(sno4))
            }
            btnvisFun()

        }

        for (i = 4; i >= 1; i--) {
            game['level5bag' + i].on('pointerover', etopOverFun)
            game['level5bag' + i].on('pointerout', etopOutFun)
            game['level5bag' + i].on('pointerdown', bagFun)
        }

        function bagFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno5 = this.texture.key.substr(9)
            if (darr5[4] == parseInt(sno5)) {
                tecnabag.setFrame(0)
                tecnabbag.setFrame(0)
                darr5[4] = 0
            } else {
                darr5[4] = parseInt(sno5)
                tecnabag.setFrame(parseInt(sno5))
                tecnabbag.setFrame(parseInt(sno5))
            }
            btnvisFun()
        }

        for (i = 4; i >= 1; i--) {
            game['level5glass' + i].on('pointerover', etopOverFun)
            game['level5glass' + i].on('pointerout', etopOutFun)
            game['level5glass' + i].on('pointerdown', glassFun)
        }

        function glassFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno6 = this.texture.key.substr(11)
            if (darr5[5] == parseInt(sno6)) {
                tecnaglass.setFrame(0)
                darr5[5] = 0
            } else {
                darr5[5] = parseInt(sno6)
                tecnaglass.setFrame(parseInt(sno6))
            }
            btnvisFun()
        }


        function btnvisFun() {

            if (btnstart1 && done2.visible == false) {
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

        if (game['level5dress' + 1].visible) {

            level5dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level5dress' + i].visible = true
            }
        } else if (game['level5dress' + 7].visible) {

            level5dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level5dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level5dress' + 1].visible) {

            level5dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level5dress' + i].visible = true
            }
        } else if (game['level5dress' + 7].visible) {

            level5dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level5dress' + i].visible = true
            }
        }

    }

    for (i = 6; i >= 1; i--) {
        game['level5cat' + i].on('pointerover', levelcatoverstart)
        game['level5cat' + i].on('pointerout', levelcatoutstart)
        game['level5cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
    }

    function levelcatdownstart(ev) {
        rarrow.visible = false
        larrow.visible = false
        level5dots.visible = false
        level5dots.setFrame(0)
        larrow.visible = false
        rarrow.visible = false

        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)

        for (i = 1; i <= 6; i++) {
            game['level5cat' + i].setFrame(0)
        }
       
            if (parseInt(sno) == 1) {
                game['level5cat' + 1].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level5cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level5dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5chain' + i].visible = false
                    game['level5stud' + i].visible = false
                    game['level5hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5bag' + i].visible = false
                    game['level5glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5stud' + i].visible = true
                }
            } else if (parseInt(sno) == 2) {
                game['level5cat' + 2].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level5cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level5dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5chain' + i].visible = false
                    game['level5stud' + i].visible = false
                    game['level5hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5bag' + i].visible = false
                    game['level5glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5chain' + i].visible = true
                }
            } else if (parseInt(sno) == 3) {
                game['level5cat' + 3].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level5cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level5dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5chain' + i].visible = false
                    game['level5stud' + i].visible = false
                    game['level5hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5bag' + i].visible = false
                    game['level5glass' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5glass' + i].visible = true
                }
            } else if (parseInt(sno) == 4) {
                game['level5cat' + 4].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level5cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level5dress' + i].visible = false

                }
                for (i = 1; i <= 6; i++) {
                    game['level5chain' + i].visible = false
                    game['level5stud' + i].visible = false
                    game['level5hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5bag' + i].visible = false
                    game['level5glass' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5bag' + i].visible = true
                }
            } else if (parseInt(sno) == 5) {
                game['level5cat' + 5].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level5cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level5dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5chain' + i].visible = false
                    game['level5stud' + i].visible = false
                    game['level5hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5bag' + i].visible = false
                    game['level5glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5hair' + i].visible = true
                }
            } else if (parseInt(sno) == 6) {
                rarrow.visible = true
                larrow.visible = true
                level5dots.visible = true
                level5dots.setFrame(0)
                game['level5cat' + 6].setFrame(1)
                for (i = 6; i >= 1; i--) {
                    game['level5cat' + i].setInteractive({
                        pixelPerfect: true,
                        useHandCursor: true
                    })
                }
                this.disableInteractive()
                for (i = 1; i <= 10; i++) {
                    game['level5dress' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5chain' + i].visible = false
                    game['level5stud' + i].visible = false
                    game['level5hair' + i].visible = false
                }
                for (i = 1; i <= 4; i++) {
                    game['level5bag' + i].visible = false
                    game['level5glass' + i].visible = false
                }
                for (i = 1; i <= 6; i++) {
                    game['level5dress' + i].visible = true
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
        if (!startgame9 && loadFinish) {
            startgame9 = true
            playsoundeffects('clickss')
            done2.anims.stop('done2')
            done2.setFrame(10)
            if (lcount5 == 0) {
                level = 6
                lcount5 = 1
            }
            darr5[0] = tecnadress.frame.name
            darr5[1] = tecnabhair.frame.name
            darr5[1] = tecnahair.frame.name
            darr5[2] = tecnachain.frame.name
            darr5[3] = tecnastud.frame.name
            darr5[4] = tecnabag.frame.name
            darr5[4] = tecnabbag.frame.name
            darr5[5] = tecnaglass.frame.name

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level5grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 220,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 220
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
        targets: tecnabhair,
        y: tecnabhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });


    game.scene.scenes[pageNo].tweens.add({
        targets: tecnahead,
        y: tecnahead.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: tecnaeye,
        y: tecnaeye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: tecnaeyetop,
        y: tecnaeyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: tecnaeblink,
        y: tecnaeblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: tecnaebrow,
        y: tecnaebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: tecnahair,
        y: tecnahair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: tecnastud,
        y: tecnastud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: tecnaglass,
        y: tecnaglass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    tecnaeblink.setFrame(esarr[4] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: tecnaheadanimation11,
        callbackScope: this
    })

    function tecnaheadanimation11() {
        tecnaeblink.setFrame(esarr[4])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: tecnaheadanimation1,
            callbackScope: this
        })

    }






    function tecnaheadanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnastud,
            y: tecnastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: tecnabhair,
            y: tecnabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: tecnahead,
            y: tecnahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeye,
            y: tecnaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeyetop,
            y: tecnaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeblink,
            y: tecnaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaebrow,
            y: tecnaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnahair,
            y: tecnahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaglass,
            y: tecnaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        tecnaeblink.setFrame(esarr[4] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: tecnaheadanimation11,
            callbackScope: this
        })

        function tecnaheadanimation1() {
            tecnaeblink.setFrame(esarr[4])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: tecnaheadanimation1,
                callbackScope: this
            })
        }

    }




}

var startgame10 = false
var btnstart1 = false
var btnstart2 = false
var btnstart3 = false
var btnstart4 = false
var btnstart5 = false
var glowarr = [0, 0, 0, 0]

var level6 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level6() {
        Phaser.Scene.call(this, {
            key: 'level6'
        });
    },
    preload: function () {
        loadFinish = false
        pageNo = 10
        settingval = false
        startgame10 = false
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
        level6background = this.add.image(0, 0, 'level6background').setOrigin(0, 0)

        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false
        larrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(-0.9, 0.9)
        rarrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(0.9, 0.9)

        larrow.visible = false
        rarrow.visible = false

        level6panel = this.add.sprite(402, 30, 'level1panel').setOrigin(0, 0)
        level6dots = this.add.sprite(631, 54, 'level1dots').setOrigin(0, 0)
        level6dots.visible = true


        var edrxrr = [, 521, 659, 523, 655, 523, 657, 517, 652, 517, 653]
        var edryrr = [, 68, 68, 198, 198, 328, 328, 131, 131, 271, 271]
        for (i = 10; i >= 1; i--) {
            game['level6dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level6dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6dress' + i].visible = false;
            game['level6dress' + i].x += parseFloat(game['level6dress' + i].width / 2);
            game['level6dress' + i].y += parseFloat(game['level6dress' + i].height / 2);
        }

        var ehaxrr = [, 521, 659, 523, 655, 523, 657]
        var ehayrr = [, 68, 68, 198, 198, 328, 328]
        for (i = 6; i >= 1; i--) {
            game['level6hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level6hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6hair' + i].visible = false;
            game['level6hair' + i].x += parseFloat(game['level6hair' + i].width / 2);
            game['level6hair' + i].y += parseFloat(game['level6hair' + i].height / 2);
        }
        var ebgaxrr = [, 521, 659, 523, 655, 523, 657]
        var ebgayrr = [, 68, 68, 198, 198, 328, 328]
        for (i = 6; i >= 1; i--) {
            game['level6chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level6chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6chain' + i].visible = false
            game['level6chain' + i].x += parseFloat(game['level6chain' + i].width / 2);
            game['level6chain' + i].y += parseFloat(game['level6chain' + i].height / 2);
        }
        var estaxrr = [, 521, 659, 523, 655, 523, 657]
        var estayrr = [, 68, 68, 198, 198, 328, 328]
        for (i = 6; i >= 1; i--) {
            game['level6stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level6stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6stud' + i].visible = false;
            game['level6stud' + i].x += parseFloat(game['level6stud' + i].width / 2);
            game['level6stud' + i].y += parseFloat(game['level6stud' + i].height / 2);
        }
        var estgaxrr = [, 517, 652, 517, 653]
        var estgayrr = [, 131, 131, 271, 271]
        for (i = 4; i >= 1; i--) {
            game['level6bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level6bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6bag' + i].visible = false;
            game['level6bag' + i].x += parseFloat(game['level6bag' + i].width / 2);
            game['level6bag' + i].y += parseFloat(game['level6bag' + i].height / 2);
        }

        var estglxrr = [, 517, 652, 517, 653]
        var estglyrr = [, 131, 131, 271, 271]
        for (i = 4; i >= 1; i--) {
            game['level6glass' + i] = this.add.sprite(estglxrr[i], estglyrr[i], 'level6glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6glass' + i].visible = false;
            game['level6glass' + i].x += parseFloat(game['level6glass' + i].width / 2);
            game['level6glass' + i].y += parseFloat(game['level6glass' + i].height / 2);
        }
        for (i = 6; i >= 1; i--) {
            game['level6stud' + i].visible = true
        }

        var cdaxrr = [, 452, 452, 452, 452, 452, 452]
        var cdayrr = [, 80, 143, 201, 261, 321, 381]
        for (i = 6; i >= 1; i--) {
            game['level6cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level6cat' + i].x += parseFloat(game['level6cat' + i].width / 2)
            game['level6cat' + i].y += parseFloat(game['level6cat' + i].height / 2)
        }

        cupboardgroup = this.add.container()
        cupboardgroup.add(level6panel)
        cupboardgroup.add(level6dots)
        cupboardgroup.add(larrow)
        cupboardgroup.add(rarrow)
        for (i = 10; i >= 1; i--) {
            cupboardgroup.add(game['level6dress' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level6hair' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level6chain' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level6stud' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level6bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level6glass' + i])
        }

        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level6cat' + i])
        }

        level6dots.visible = false
        larrow.visible = false
        rarrow.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level6cat' + 1].setFrame(1)


        stellabhair = this.add.sprite(483, 39, 'stellabhair').setOrigin(0.5, 0)
        stellabhair.x += parseFloat(stellabhair.width / 2)
        stellabbag = this.add.sprite(525, 160, 'stellabbag').setOrigin(0, 0)
        stellabody = this.add.sprite(417, 125, 'stellabody').setOrigin(0, 0)
        stellahead = this.add.sprite(529, 50, 'stellahead').setOrigin(0, 0)
        stellaebrow = this.add.sprite(538, 95, 'stellaebrow').setOrigin(0, 0)
        stellaeyetop = this.add.sprite(535, 99, 'stellaeyetop').setOrigin(0, 0)
        stellaeye = this.add.sprite(545, 106, 'stellaeye').setOrigin(0, 0)
        stellaeblink = this.add.sprite(537, 104, 'stellaeblink').setOrigin(0, 0)
        stelladress = this.add.sprite(430, 156, 'stelladress').setOrigin(0, 0)
        stellahair = this.add.sprite(502, -16, 'stellahair').setOrigin(0, 0)
        stellachain = this.add.sprite(538, 162, 'stellachain').setOrigin(0, 0)
        stellastud = this.add.sprite(528, 119, 'stellastud').setOrigin(0, 0)
        stellabag = this.add.sprite(532, 165, 'stellabag').setOrigin(0, 0)
        stellaglass = this.add.sprite(531, 96, 'stellaglass').setOrigin(0, 0)


        level6grp = this.add.container()
        level6grp.add(stellabhair)
        level6grp.add(stellabbag)
        level6grp.add(stellabody)
        level6grp.add(stellahead)
        level6grp.add(stellaeye)
        level6grp.add(stellaeyetop)
        level6grp.add(stellaebrow)
        level6grp.add(stellaeblink)
        level6grp.add(stelladress)
        level6grp.add(stellabag)
        level6grp.add(stellachain)
        level6grp.add(stellahair)
        level6grp.add(stellaglass)
        level6grp.add(stellastud)


        level6grp.x = -800
        stellaeblink.setFrame(esarr[5])

        stelladress.setFrame(darr6[0])
        stellabhair.setFrame(darr6[1])
        stellahair.setFrame(darr6[1])
        stellachain.setFrame(darr6[2])
        stellastud.setFrame(darr6[3])
        stellabag.setFrame(darr6[4])
        stellabbag.setFrame(darr6[4])
        stellaglass.setFrame(darr6[5])
        //


        stellabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: stellabhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });

        this.time.addEvent({
            delay: 2000,
            callback: level6dressdollanimation1,
            callbackScope: this
        })

        function level6dressdollanimation1() {
            level6grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level6grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level6grp,
                y: level6grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });

            this.time.addEvent({
                delay: 3000,
                callback: level6dressdollanimation1,
                callbackScope: this
            })
        }


        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeye,
            x: 548,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: stellaeyestart1,
            callbackScope: this
        });

        function stellaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 545,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart2,
                callbackScope: this
            });
        }

        function stellaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 542,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: stellaeyestart3,
                callbackScope: this
            });
        }

        function stellaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 545,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart4,
                callbackScope: this
            });
        }

        function stellaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 548,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: stellaeyestart1,
                callbackScope: this
            });

        }



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

        dressgliter = this.add.sprite(580.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(580, 305, 'dollgliter');
        anim = this.anims.create({
            key: 'dollgliter',
            frames: this.anims.generateFrameNumbers('dollgliter', {
                start: 0,
                end: 36
            }),
            frameRate: 30,
        });
        done2 = this.add.sprite(607, 540, 'done2').setOrigin(0.5, 0.5).setInteractive({
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

        level6grp.add(dressgliter)
        level6grp.add(dollgliter)
        cupboardgroup.add(done2)
        done2.visible = false
        logomutefun()
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        this.load.start();
        level6background.x = safeArea.x - 300
        resize = () => {
            safeArea.x = this.cameras.main.width / 2 - +this.game.config.width / 2
            safeArea.y = this.cameras.main.height - +this.game.config.height


        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {

            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            level6background.x = safeArea.x - 300

            if (dollIn) {
                trans.x = safeArea.x + 400
            }
            
            if (!cupboardstart) {
                cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
            } else {
                cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
            }
            if (!startgame10 && donecount == 0) {
                level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 330

            } else {
                level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 160
            }



            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25


        })

        resize()
    },
    update: function () {
        resize()
    }
});

function level6start() {




    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level6grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 330,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level6dressclickstart1,
            callbackScope: this
        });

    }

    function level6dressclickstart1() {
        level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 330
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
            onComplete: level6dressclickstart,
            callbackScope: this
        });
    }





    function level6dressclickstart() {
        cupboardgroup.x = ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x)
        cupboardstart = true

        for (i = 10; i >= 1; i--) {
            game['level6dress' + i].on('pointerover', etopOverFun)
            game['level6dress' + i].on('pointerout', etopOutFun)
            game['level6dress' + i].on('pointerdown', etopFun1)
        }

        function etopOverFun(ev) {
            this.setScale(1.05)
        }

        function etopOutFun(ev) {
            this.setScale(1)
        }



        function etopFun1(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            btnstart1 = true
            this.setScale(1)
            playsoundeffects('itemclick');
            sno1 = this.texture.key.substr(11)
            if (darr6[0] == parseInt(sno1)) {
                stelladress.setFrame(0)

                darr6[0] = 0
            } else {
                darr6[0] = parseInt(sno1)
                stelladress.setFrame(parseInt(sno1))

            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level6hair' + i].on('pointerover', etopOverFun)
            game['level6hair' + i].on('pointerout', etopOutFun)
            game['level6hair' + i].on('pointerdown', hairFun)
        }

        function hairFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno2 = this.texture.key.substr(10)
            if (darr6[1] == parseInt(sno2)) {
                stellabhair.setFrame(0)
                stellahair.setFrame(0)
                darr6[1] = 0
            } else {
                darr6[1] = parseInt(sno2)
                stellabhair.setFrame(parseInt(sno2))
                stellahair.setFrame(parseInt(sno2))

            }
            btnvisFun()
        }

        for (i = 6; i >= 1; i--) {
            game['level6chain' + i].on('pointerover', etopOverFun)
            game['level6chain' + i].on('pointerout', etopOutFun)
            game['level6chain' + i].on('pointerdown', chainFun)
        }

        function chainFun(ev) {

            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart3 = true
            playsoundeffects('itemclick');
            sno3 = this.texture.key.substr(11)

            if (darr6[2] == parseInt(sno3)) {
                stellachain.setFrame(0)
                darr6[2] = 0
            } else {
                darr6[2] = parseInt(sno3)
                stellachain.setFrame(parseInt(sno3))
            }
            btnvisFun()

        }
        for (i = 6; i >= 1; i--) {
            game['level6stud' + i].on('pointerover', etopOverFun)
            game['level6stud' + i].on('pointerout', etopOutFun)
            game['level6stud' + i].on('pointerdown', studFun)
        }


        function studFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno4 = this.texture.key.substr(10)
            if (darr6[3] == parseInt(sno4)) {
                stellastud.setFrame(0)
                darr6[3] = 0
            } else {
                darr6[3] = parseInt(sno4)
                stellastud.setFrame(parseInt(sno4))
            }
            btnvisFun()

        }

        for (i = 4; i >= 1; i--) {
            game['level6bag' + i].on('pointerover', etopOverFun)
            game['level6bag' + i].on('pointerout', etopOutFun)
            game['level6bag' + i].on('pointerdown', bagFun)
        }

        function bagFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno5 = this.texture.key.substr(9)
            if (darr6[4] == parseInt(sno5)) {
                stellabag.setFrame(0)
                stellabbag.setFrame(0)
                darr6[4] = 0
            } else {
                darr6[4] = parseInt(sno5)
                stellabag.setFrame(parseInt(sno5))
                stellabbag.setFrame(parseInt(sno5))
            }
            btnvisFun()
        }

        for (i = 4; i >= 1; i--) {
            game['level6glass' + i].on('pointerover', etopOverFun)
            game['level6glass' + i].on('pointerout', etopOutFun)
            game['level6glass' + i].on('pointerdown', glassFun)
        }

        function glassFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart4 = true
            playsoundeffects('itemclick');
            sno6 = this.texture.key.substr(11)
            if (darr6[5] == parseInt(sno6)) {
                stellaglass.setFrame(0)
                darr6[5] = 0
            } else {
                darr6[5] = parseInt(sno6)
                stellaglass.setFrame(parseInt(sno6))
            }
            btnvisFun()
        }


        function btnvisFun() {

            if (btnstart1 && done2.visible == false) {
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

        if (game['level6dress' + 1].visible) {

            level6dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level6dress' + i].visible = true
            }
        } else if (game['level6dress' + 7].visible) {

            level6dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level6dress' + 1].visible) {

            level6dots.setFrame(1)
            for (i = 1; i <= 6; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 7; i <= 10; i++) {
                game['level6dress' + i].visible = true
            }
        } else if (game['level6dress' + 7].visible) {

            level6dots.setFrame(0)
            for (i = 7; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6dress' + i].visible = true
            }
        }

    }

    for (i = 6; i >= 1; i--) {
        game['level6cat' + i].on('pointerover', levelcatoverstart)
        game['level6cat' + i].on('pointerout', levelcatoutstart)
        game['level6cat' + i].on('pointerdown', levelcatdownstart)
    }

    function levelcatoverstart(ev) {
        this.setScale(1.05)
    }

    function levelcatoutstart(ev) {
        this.setScale(1)
    }

    function levelcatdownstart(ev) {
        rarrow.visible = false
        larrow.visible = false
        level6dots.visible = false
        level6dots.setFrame(0)
        larrow.visible = false
        rarrow.visible = false

        playsoundeffects('clickss')
        sno = this.texture.key.substr(9)
        glowarr[0] = parseInt(sno)
        for (i = 1; i <= 6; i++) {
            game['level6cat' + i].setFrame(0)
        }
        if (parseInt(sno) == 1) {
            game['level6cat' + 1].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level6cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6chain' + i].visible = false
                game['level6stud' + i].visible = false
                game['level6hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6bag' + i].visible = false
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6stud' + i].visible = true
            }
        } else if (parseInt(sno) == 2) {
            game['level6cat' + 2].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level6cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6chain' + i].visible = false
                game['level6stud' + i].visible = false
                game['level6hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6bag' + i].visible = false
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6chain' + i].visible = true
            }
        } else if (parseInt(sno) == 3) {
            game['level6cat' + 3].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level6cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6chain' + i].visible = false
                game['level6stud' + i].visible = false
                game['level6hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6bag' + i].visible = false
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6glass' + i].visible = true
            }
        } else if (parseInt(sno) == 4) {
            game['level6cat' + 4].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level6cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level6dress' + i].visible = false

            }
            for (i = 1; i <= 6; i++) {
                game['level6chain' + i].visible = false
                game['level6stud' + i].visible = false
                game['level6hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6bag' + i].visible = false
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6bag' + i].visible = true
            }
        } else if (parseInt(sno) == 5) {
            game['level6cat' + 5].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level6cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6chain' + i].visible = false
                game['level6stud' + i].visible = false
                game['level6hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6bag' + i].visible = false
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level6dots.visible = true
            level6dots.setFrame(0)
            game['level6cat' + 6].setFrame(1)
            for (i = 6; i >= 1; i--) {
                game['level6cat' + i].setInteractive({
                    pixelPerfect: true,
                    useHandCursor: true
                })
            }
            this.disableInteractive()
            for (i = 1; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6chain' + i].visible = false
                game['level6stud' + i].visible = false
                game['level6hair' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6bag' + i].visible = false
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6dress' + i].visible = true
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
        if (!startgame10 && loadFinish) {
            startgame10 = true
            playsoundeffects('clickss')
            done2.anims.stop('done2')
            done2.setFrame(10)
            if (lcount6 == 0) {
                level = 7
                lcount6 = 1
            }
            darr6[0] = stelladress.frame.name
            darr6[7] = stellabhair.frame.name
            darr6[1] = stellahair.frame.name
            darr6[2] = stellachain.frame.name
            darr6[3] = stellastud.frame.name
            darr6[4] = stellabag.frame.name
            darr6[4] = stellabbag.frame.name
            darr6[5] = stellaglass.frame.name

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level6grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 160,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 160
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
        targets: stellabhair,
        y: stellabhair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });


    game.scene.scenes[pageNo].tweens.add({
        targets: stellahead,
        y: stellahead.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: stellaeye,
        y: stellaeye.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: stellaeyetop,
        y: stellaeyetop.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: stellaeblink,
        y: stellaeblink.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: stellaebrow,
        y: stellaebrow.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: stellahair,
        y: stellahair.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: stellastud,
        y: stellastud.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    game.scene.scenes[pageNo].tweens.add({
        targets: stellaglass,
        y: stellaglass.y + 2,
        ease: 'Linear',
        duration: 100,
        repeat: 0,
        yoyo: true,
    });
    stellaeblink.setFrame(esarr[4] + 1)
    t1 = game.scene.scenes[pageNo].time.addEvent({
        delay: 100,
        callback: stellaheadanimation11,
        callbackScope: this
    })

    function stellaheadanimation11() {
        stellaeblink.setFrame(esarr[4])
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 5000,
            callback: stellaheadanimation1,
            callbackScope: this
        })

    }






    function stellaheadanimation1() {
        game.scene.scenes[pageNo].tweens.add({
            targets: stellastud,
            y: stellastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: stellabhair,
            y: stellabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: stellahead,
            y: stellahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeye,
            y: stellaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeyetop,
            y: stellaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeblink,
            y: stellaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaebrow,
            y: stellaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellahair,
            y: stellahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaglass,
            y: stellaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        stellaeblink.setFrame(esarr[4] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: stellaheadanimation11,
            callbackScope: this
        })

        function stellaheadanimation1() {
            stellaeblink.setFrame(esarr[4])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: stellaheadanimation1,
                callbackScope: this
            })
        }

    }




}

var startgame11 = false
var thumb = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function thumb() {
        Phaser.Scene.call(this, {
            key: 'thumb'
        });
    },
    preload: function () {
        loadFinish = false
        pageNo = 11
        startgame11 = false
    },
    create: function () {
       
    }
});

function thumbstart() {


}


var startgame12 = false
var endscreen = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function endscreen() {
        Phaser.Scene.call(this, {
            key: 'endscreen'
        });
    },
    preload: function () {
        loadFinish = false
        pageNo = 12
        startgame12 = false
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

        florabhair = this.add.sprite(276, 31, 'florabhair').setOrigin(0.5, 0)
        florabhair.x += parseFloat(florabhair.width / 2)
        florabbag = this.add.sprite(278, 154, 'florabbag').setOrigin(0, 0)
        florabody = this.add.sprite(276, 102, 'florabody').setOrigin(0, 0)
        florahead = this.add.sprite(329, 31, 'florahead').setOrigin(0, 0)
        floraebrow = this.add.sprite(332, 77, 'floraebrow').setOrigin(0, 0)
        floraeyetop = this.add.sprite(331, 81, 'floraeyetop').setOrigin(0, 0)
        floraeye = this.add.sprite(338, 91, 'floraeye').setOrigin(0, 0)
        floraeblink = this.add.sprite(330, 87, 'floraeblink').setOrigin(0, 0)
        floradress = this.add.sprite(257, 140, 'floradress').setOrigin(0, 0)
        florahdress = this.add.sprite(272, 189, 'florahdress').setOrigin(0, 0)
        florahair = this.add.sprite(296, -12, 'florahair').setOrigin(0, 0)
        florachain = this.add.sprite(348, 156, 'florachain').setOrigin(0, 0)
        florastud = this.add.sprite(332, 102, 'florastud').setOrigin(0, 0)
        florabag = this.add.sprite(281, 153, 'florabag').setOrigin(0, 0)
        floraglass = this.add.sprite(324, 81, 'floraglass').setOrigin(0, 0)
        florahand = this.add.sprite(278, 152, 'florahand').setOrigin(0, 0)


        level1grp = this.add.container()
        level1grp.add(florabhair)
        level1grp.add(florabbag)
        level1grp.add(florabody)
        level1grp.add(florahead)
        level1grp.add(floraeye)
        level1grp.add(floraeyetop)
        level1grp.add(floraebrow)
        level1grp.add(floraeblink)
        level1grp.add(floradress)
        level1grp.add(florabag)
        level1grp.add(florachain)
        level1grp.add(florahair)
        level1grp.add(floraglass)
        level1grp.add(florastud)
        level1grp.add(florahand)
        level1grp.add(florahdress)


        level1grp.x = -800
        floraeblink.setFrame(esarr[0])

        floradress.setFrame(darr1[0])
        florabhair.setFrame(darr1[1])
        florahair.setFrame(darr1[1])
        florachain.setFrame(darr1[2])
        florastud.setFrame(darr1[3])
        florabag.setFrame(darr1[4])
        florabbag.setFrame(darr1[4])
        floraglass.setFrame(darr1[5])

        if (darr1[0] == 7) {
            florahdress.visible = true
        } else {
            florahdress.visible = false
        }

        florabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: florabhair,
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
            targets: floraeye,
            x: 341,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: floraeyestart1,
            callbackScope: this
        });

        function floraeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 338,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart2,
                callbackScope: this
            });
        }

        function floraeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 335,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: floraeyestart3,
                callbackScope: this
            });
        }

        function floraeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 338,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart4,
                callbackScope: this
            });
        }

        function floraeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 341,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: floraeyestart1,
                callbackScope: this
            });

        }
        game.scene.scenes[pageNo].tweens.add({
            targets: florabhair,
            y: florabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });


        game.scene.scenes[pageNo].tweens.add({
            targets: florahead,
            y: florahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: floraeye,
            y: floraeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: floraeyetop,
            y: floraeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: floraeblink,
            y: floraeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: floraebrow,
            y: floraebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: florahair,
            y: florahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: floraglass,
            y: floraglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: florastud,
            y: florastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        floraeblink.setFrame(esarr[0] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: floraheadanimation11,
            callbackScope: this
        })

        function floraheadanimation11() {
            floraeblink.setFrame(esarr[0])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 4300,
                callback: floraheadanimation1,
                callbackScope: this
            })

        }

        function floraheadanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: florastud,
                y: florastud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                y: floraebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: florabhair,
                y: florabhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraglass,
                y: floraglass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: florahead,
                y: florahead.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                y: floraeye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: floraeyetop,
                y: floraeyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeblink,
                y: floraeblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: florahair,
                y: florahair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            floraeblink.setFrame(esarr[0] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: floraheadanimation11,
                callbackScope: this
            })

            function floraheadanimation1() {
                floraeblink.setFrame(esarr[0])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 4300,
                    callback: floraheadanimation1,
                    callbackScope: this
                })
            }

        }
        musabhair = this.add.sprite(128, 57, 'musabhair').setOrigin(0.5, 0)
        musabhair.x += parseFloat(musabhair.width / 2)
        musabbag = this.add.sprite(132, 167, 'musabbag').setOrigin(0, 0)
        musabody = this.add.sprite(79, 122, 'musabody').setOrigin(0, 0)
        musahead = this.add.sprite(157, 50, 'musahead').setOrigin(0, 0)
        musaebrow = this.add.sprite(165, 93, 'musaebrow').setOrigin(0, 0)
        musaeyetop = this.add.sprite(164, 98, 'musaeyetop').setOrigin(0, 0)
        musaeye = this.add.sprite(174, 104, 'musaeye').setOrigin(0, 0)
        musaeblink = this.add.sprite(164, 102, 'musaeblink').setOrigin(0, 0)
        musadress = this.add.sprite(51, 143, 'musadress').setOrigin(0, 0)
        musahdress = this.add.sprite(91, 281, 'musahdress').setOrigin(0, 0)
        musahair = this.add.sprite(110, -6, 'musahair').setOrigin(0, 0)
        musachain = this.add.sprite(170, 161, 'musachain').setOrigin(0, 0)
        musastud = this.add.sprite(145, 116, 'musastud').setOrigin(0, 0)
        musabag = this.add.sprite(108, 167, 'musabag').setOrigin(0, 0)
        musaglass = this.add.sprite(155, 95, 'musaglass').setOrigin(0, 0)
        musahand = this.add.sprite(114, 284, 'musahand').setOrigin(0, 0)


        level2grp = this.add.container()
        level2grp.add(musabhair)
        level2grp.add(musabbag)
        level2grp.add(musabody)
        level2grp.add(musahead)
        level2grp.add(musaeye)
        level2grp.add(musaeyetop)
        level2grp.add(musaebrow)
        level2grp.add(musaeblink)
        level2grp.add(musadress)
        level2grp.add(musabag)
        level2grp.add(musachain)
        level2grp.add(musahair)
        level2grp.add(musaglass)
        level2grp.add(musastud)
        level2grp.add(musahand)
        level2grp.add(musahdress)


        level2grp.x = -800
        musaeblink.setFrame(esarr[1])

        musadress.setFrame(darr2[0])
        musabhair.setFrame(darr2[1])
        musahair.setFrame(darr2[1])
        musachain.setFrame(darr2[2])
        musastud.setFrame(darr2[3])
        musabag.setFrame(darr2[4])
        musabbag.setFrame(darr2[4])
        musaglass.setFrame(darr2[5])
        //
        if (darr2[0] == 3) {
            musahdress.setFrame(1)
        } else if (darr2[0] == 8) {
            musahdress.setFrame(2)
        } else {
            musahdress.setFrame(0)
        }

        musabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: musabhair,
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
            targets: musaeye,
            x: 177,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: musaeyestart1,
            callbackScope: this
        });

        function musaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 174,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart2,
                callbackScope: this
            });
        }

        function musaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 171,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: musaeyestart3,
                callbackScope: this
            });
        }

        function musaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 174,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart4,
                callbackScope: this
            });
        }

        function musaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: musaeyestart1,
                callbackScope: this
            });

        }
        game.scene.scenes[pageNo].tweens.add({
            targets: musabhair,
            y: musabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });


        game.scene.scenes[pageNo].tweens.add({
            targets: musahead,
            y: musahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaeye,
            y: musaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaeyetop,
            y: musaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaebrow,
            y: musaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: musaeblink,
            y: musaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musahair,
            y: musahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musastud,
            y: musastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaglass,
            y: musaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        musaeblink.setFrame(esarr[1] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: musaheadanimation11,
            callbackScope: this
        })

        function musaheadanimation11() {
            musaeblink.setFrame(esarr[1])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: musaheadanimation1,
                callbackScope: this
            })

        }






        function musaheadanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musastud,
                y: musastud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: musabhair,
                y: musabhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: musahead,
                y: musahead.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                y: musaeye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                y: musaebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeyetop,
                y: musaeyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaglass,
                y: musaglass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeblink,
                y: musaeblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musahair,
                y: musahair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            musaeblink.setFrame(esarr[1] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: musaheadanimation11,
                callbackScope: this
            })

            function musaheadanimation1() {
                musaeblink.setFrame(esarr[1])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5000,
                    callback: musaheadanimation1,
                    callbackScope: this
                })
            }

        }

        aishabhair = this.add.sprite(497, 0, 'aishabhair').setOrigin(0.5, 0)
        aishabhair.x += parseFloat(aishabhair.width / 2)
        aishabbag = this.add.sprite(475, 144, 'aishabbag').setOrigin(0, 0)
        aishabody = this.add.sprite(474, 95, 'aishabody').setOrigin(0, 0)
        aishahead = this.add.sprite(548, 30, 'aishahead').setOrigin(0, 0)
        aishaebrow = this.add.sprite(547, 75, 'aishaebrow').setOrigin(0, 0)
        aishaeyetop = this.add.sprite(547, 82, 'aishaeyetop').setOrigin(0, 0)
        aishaeye = this.add.sprite(558, 88, 'aishaeye').setOrigin(0, 0)
        aishaeblink = this.add.sprite(545, 84, 'aishaeblink').setOrigin(0, 0)
        aishadress = this.add.sprite(374, 129, 'aishadress').setOrigin(0, 0)
        aishahdress = this.add.sprite(474, 229, 'aishahdress').setOrigin(0, 0)
        aishahair = this.add.sprite(522, 0, 'aishahair').setOrigin(0, 0)
        aishachain = this.add.sprite(563, 143, 'aishachain').setOrigin(0, 0)
        aishastud = this.add.sprite(550, 100, 'aishastud').setOrigin(0, 0)
        aishabag = this.add.sprite(483, 148, 'aishabag').setOrigin(0, 0)
        aishaglass = this.add.sprite(539, 75, 'aishaglass').setOrigin(0, 0)
        aishahand = this.add.sprite(530, 253, 'aishahand').setOrigin(0, 0)


        level3grp = this.add.container()
        level3grp.add(aishabhair)
        level3grp.add(aishabbag)
        level3grp.add(aishabody)
        level3grp.add(aishahead)
        level3grp.add(aishaeye)
        level3grp.add(aishaeyetop)
        level3grp.add(aishaebrow)
        level3grp.add(aishaeblink)
        level3grp.add(aishadress)
        level3grp.add(aishabag)
        level3grp.add(aishachain)
        level3grp.add(aishahair)
        level3grp.add(aishaglass)
        level3grp.add(aishastud)
        level3grp.add(aishahand)
        level3grp.add(aishahdress)


        level3grp.x = -800
        aishaeblink.setFrame(esarr[2])

        aishadress.setFrame(darr3[0])
        aishabhair.setFrame(darr3[1])
        aishahair.setFrame(darr3[1])
        aishachain.setFrame(darr3[2])
        aishastud.setFrame(darr3[3])
        aishabag.setFrame(darr3[4])
        aishabbag.setFrame(darr3[4])
        aishaglass.setFrame(darr3[5])
        //
        if (darr3[0] == 2) {
            aishahdress.setFrame(1)
        } else if (darr3[0] == 4) {
            aishahdress.setFrame(2)
        } else if (darr3[0] == 7) {
            aishahdress.setFrame(3)
        } else {
            aishahdress.setFrame(0)
        }

        aishabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: aishabhair,
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
            targets: aishaeye,
            x: 561,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: aishaeyestart1,
            callbackScope: this
        });

        function aishaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 558,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart2,
                callbackScope: this
            });
        }

        function aishaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 555,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: aishaeyestart3,
                callbackScope: this
            });
        }

        function aishaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 558,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart4,
                callbackScope: this
            });
        }

        function aishaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 561,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: aishaeyestart1,
                callbackScope: this
            });

        }

        game.scene.scenes[pageNo].tweens.add({
            targets: aishabhair,
            y: aishabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });


        game.scene.scenes[pageNo].tweens.add({
            targets: aishahead,
            y: aishahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeye,
            y: aishaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeyetop,
            y: aishaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaglass,
            y: aishaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeblink,
            y: aishaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: aishaebrow,
            y: aishaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishahair,
            y: aishahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishastud,
            y: aishastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        aishaeblink.setFrame(esarr[2] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: aishaheadanimation11,
            callbackScope: this
        })

        function aishaheadanimation11() {
            aishaeblink.setFrame(esarr[2])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5700,
                callback: aishaheadanimation1,
                callbackScope: this
            })

        }






        function aishaheadanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishastud,
                y: aishastud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: aishabhair,
                y: aishabhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: aishahead,
                y: aishahead.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                y: aishaeye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                y: aishaebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeyetop,
                y: aishaeyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaglass,
                y: aishaglass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeblink,
                y: aishaeblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishahair,
                y: aishahair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            aishaeblink.setFrame(esarr[2] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: aishaheadanimation11,
                callbackScope: this
            })

            function aishaheadanimation1() {
                aishaeblink.setFrame(esarr[2])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5700,
                    callback: aishaheadanimation1,
                    callbackScope: this
                })
            }

        }

        bloombhair = this.add.sprite(283, 33, 'bloombhair').setOrigin(0.5, 0)
        bloombhair.x += parseFloat(bloombhair.width / 2)
        bloombbag = this.add.sprite(308, 157, 'bloombbag').setOrigin(0, 0)
        bloombody = this.add.sprite(256, 121, 'bloombody').setOrigin(0, 0)
        bloomhead = this.add.sprite(338, 41, 'bloomhead').setOrigin(0, 0)
        bloomebrow = this.add.sprite(348, 86, 'bloomebrow').setOrigin(0, 0)
        bloomeyetop = this.add.sprite(346, 84, 'bloomeyetop').setOrigin(0, 0)
        bloomeye = this.add.sprite(357, 96, 'bloomeye').setOrigin(0, 0)
        bloomeblink = this.add.sprite(346, 93, 'bloomeblink').setOrigin(0, 0)
        bloomdress = this.add.sprite(234, 146, 'bloomdress').setOrigin(0, 0)
        bloomhdress = this.add.sprite(277, 270, 'bloomhdress').setOrigin(0, 0)
        bloomhair = this.add.sprite(311, -16, 'bloomhair').setOrigin(0, 0)
        bloomchain = this.add.sprite(349, 157, 'bloomchain').setOrigin(0, 0)
        bloomstud = this.add.sprite(334, 112, 'bloomstud').setOrigin(0, 0)
        bloombag = this.add.sprite(262, 154, 'bloombag').setOrigin(0, 0)
        bloomglass = this.add.sprite(340, 81, 'bloomglass').setOrigin(0, 0)
        bloomhand = this.add.sprite(256, 295, 'bloomhand').setOrigin(0, 0)


        level4grp = this.add.container()
        level4grp.add(bloombhair)
        level4grp.add(bloombbag)
        level4grp.add(bloombody)
        level4grp.add(bloomhead)
        level4grp.add(bloomeye)
        level4grp.add(bloomeyetop)
        level4grp.add(bloomebrow)
        level4grp.add(bloomeblink)
        level4grp.add(bloomdress)
        level4grp.add(bloombag)
        level4grp.add(bloomchain)
        level4grp.add(bloomhair)
        level4grp.add(bloomglass)
        level4grp.add(bloomstud)
        level4grp.add(bloomhand)
        level4grp.add(bloomhdress)


        level4grp.x = -800
        bloomeblink.setFrame(esarr[3])

        bloomdress.setFrame(darr4[0])
        bloombhair.setFrame(darr4[1])
        bloomhair.setFrame(darr4[1])
        bloomchain.setFrame(darr4[2])
        bloomstud.setFrame(darr4[3])
        bloombag.setFrame(darr4[4])
        bloombbag.setFrame(darr4[4])
        bloomglass.setFrame(darr4[5])
        //
        if (darr4[0] == 2) {
            bloomhdress.setFrame(1)
        } else if (darr4[0] == 7) {
            bloomhdress.setFrame(2)
        } else if (darr4[0] == 10) {
            bloomhdress.setFrame(3)
        } else {
            bloomhdress.setFrame(0)
        }

        bloombhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: bloombhair,
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
            targets: bloomeye,
            x: 360,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: bloomeyestart1,
            callbackScope: this
        });

        function bloomeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 357,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart2,
                callbackScope: this
            });
        }

        function bloomeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 354,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: bloomeyestart3,
                callbackScope: this
            });
        }

        function bloomeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 357,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart4,
                callbackScope: this
            });
        }

        function bloomeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 360,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: bloomeyestart1,
                callbackScope: this
            });

        }
        game.scene.scenes[pageNo].tweens.add({
            targets: bloombhair,
            y: bloombhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });


        game.scene.scenes[pageNo].tweens.add({
            targets: bloomhead,
            y: bloomhead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeye,
            y: bloomeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeyetop,
            y: bloomeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeblink,
            y: bloomeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomhair,
            y: bloomhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });

        game.scene.scenes[pageNo].tweens.add({
            targets: bloomebrow,
            y: bloomebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomstud,
            y: bloomstud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomglass,
            y: bloomglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        bloomeblink.setFrame(esarr[3] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: bloomheadanimation11,
            callbackScope: this
        })

        function bloomheadanimation11() {
            bloomeblink.setFrame(esarr[3])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 4700,
                callback: bloomheadanimation1,
                callbackScope: this
            })

        }






        function bloomheadanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomstud,
                y: bloomstud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: bloombhair,
                y: bloombhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomhead,
                y: bloomhead.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                y: bloomeye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                y: bloomebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeyetop,
                y: bloomeyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomglass,
                y: bloomglass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeblink,
                y: bloomeblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomhair,
                y: bloomhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            bloomeblink.setFrame(esarr[3] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: bloomheadanimation11,
                callbackScope: this
            })

            function bloomheadanimation1() {
                bloomeblink.setFrame(esarr[3])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 4700,
                    callback: bloomheadanimation1,
                    callbackScope: this
                })
            }

        }

        tecnabhair = this.add.sprite(128, 57, 'tecnabhair').setOrigin(0.5, 0)
        tecnabhair.x += parseFloat(tecnabhair.width / 2)
        tecnabbag = this.add.sprite(78, 164, 'tecnabbag').setOrigin(0, 0)
        tecnabody = this.add.sprite(91, 112, 'tecnabody').setOrigin(0, 0)
        tecnahead = this.add.sprite(163, 51, 'tecnahead').setOrigin(0, 0)
        tecnaebrow = this.add.sprite(165, 91, 'tecnaebrow').setOrigin(0, 0)
        tecnaeyetop = this.add.sprite(160, 95, 'tecnaeyetop').setOrigin(0, 0)
        tecnaeye = this.add.sprite(172, 104, 'tecnaeye').setOrigin(0, 0)
        tecnaeblink = this.add.sprite(162, 101, 'tecnaeblink').setOrigin(0, 0)
        tecnadress = this.add.sprite(59, 133, 'tecnadress').setOrigin(0, 0)
        tecnahair = this.add.sprite(138, 20, 'tecnahair').setOrigin(0, 0)
        tecnachain = this.add.sprite(177, 162, 'tecnachain').setOrigin(0, 0)
        tecnastud = this.add.sprite(165, 119, 'tecnastud').setOrigin(0, 0)
        tecnabag = this.add.sprite(70, 166, 'tecnabag').setOrigin(0, 0)
        tecnaglass = this.add.sprite(155, 96, 'tecnaglass').setOrigin(0, 0)
        tecnahand = this.add.sprite(205, 275, 'tecnahand').setOrigin(0, 0)


        level5grp = this.add.container()
        level5grp.add(tecnabhair)
        level5grp.add(tecnabbag)
        level5grp.add(tecnabody)
        level5grp.add(tecnahead)
        level5grp.add(tecnaeye)
        level5grp.add(tecnaeyetop)
        level5grp.add(tecnaebrow)
        level5grp.add(tecnaeblink)
        level5grp.add(tecnadress)
        level5grp.add(tecnabag)
        level5grp.add(tecnachain)
        level5grp.add(tecnahair)
        level5grp.add(tecnaglass)
        level5grp.add(tecnastud)
        level5grp.add(tecnahand)


        level5grp.x = -800
        tecnaeblink.setFrame(esarr[4])

        tecnadress.setFrame(darr5[0])
        tecnabhair.setFrame(darr5[1])
        tecnahair.setFrame(darr5[1])
        tecnachain.setFrame(darr5[2])
        tecnastud.setFrame(darr5[3])
        tecnabag.setFrame(darr5[4])
        tecnabbag.setFrame(darr5[4])
        tecnaglass.setFrame(darr5[5])
        //


        tecnabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: tecnabhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });

        this.time.addEvent({
            delay: 2000,
            callback: level5dressdollanimation1,
            callbackScope: this
        })

        function level5dressdollanimation1() {
            level5grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level5grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level5grp,
                y: level5grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });

            this.time.addEvent({
                delay: 3000,
                callback: level5dressdollanimation1,
                callbackScope: this
            })
        }


        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeye,
            x: 175,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: tecnaeyestart1,
            callbackScope: this
        });

        function tecnaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 172,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart2,
                callbackScope: this
            });
        }

        function tecnaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 169,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: tecnaeyestart3,
                callbackScope: this
            });
        }

        function tecnaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 172,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart4,
                callbackScope: this
            });
        }

        function tecnaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 175,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: tecnaeyestart1,
                callbackScope: this
            });

        }
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnabhair,
            y: tecnabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });


        game.scene.scenes[pageNo].tweens.add({
            targets: tecnahead,
            y: tecnahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeye,
            y: tecnaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeyetop,
            y: tecnaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeblink,
            y: tecnaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaebrow,
            y: tecnaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnahair,
            y: tecnahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnastud,
            y: tecnastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaglass,
            y: tecnaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        tecnaeblink.setFrame(esarr[4] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: tecnaheadanimation11,
            callbackScope: this
        })

        function tecnaheadanimation11() {
            tecnaeblink.setFrame(esarr[4])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5000,
                callback: tecnaheadanimation1,
                callbackScope: this
            })

        }






        function tecnaheadanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnastud,
                y: tecnastud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnabhair,
                y: tecnabhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnahead,
                y: tecnahead.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                y: tecnaeye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeyetop,
                y: tecnaeyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeblink,
                y: tecnaeblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                y: tecnaebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnahair,
                y: tecnahair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaglass,
                y: tecnaglass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            tecnaeblink.setFrame(esarr[4] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: tecnaheadanimation11,
                callbackScope: this
            })

            function tecnaheadanimation1() {
                tecnaeblink.setFrame(esarr[4])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5000,
                    callback: tecnaheadanimation1,
                    callbackScope: this
                })
            }

        }

        stellabhair = this.add.sprite(483, 39, 'stellabhair').setOrigin(0.5, 0)
        stellabhair.x += parseFloat(stellabhair.width / 2)
        stellabbag = this.add.sprite(525, 160, 'stellabbag').setOrigin(0, 0)
        stellabody = this.add.sprite(417, 125, 'stellabody').setOrigin(0, 0)
        stellahead = this.add.sprite(529, 50, 'stellahead').setOrigin(0, 0)
        stellaebrow = this.add.sprite(538, 95, 'stellaebrow').setOrigin(0, 0)
        stellaeyetop = this.add.sprite(535, 99, 'stellaeyetop').setOrigin(0, 0)
        stellaeye = this.add.sprite(545, 106, 'stellaeye').setOrigin(0, 0)
        stellaeblink = this.add.sprite(537, 104, 'stellaeblink').setOrigin(0, 0)
        stelladress = this.add.sprite(430, 156, 'stelladress').setOrigin(0, 0)
        stellahair = this.add.sprite(502, -16, 'stellahair').setOrigin(0, 0)
        stellachain = this.add.sprite(538, 162, 'stellachain').setOrigin(0, 0)
        stellastud = this.add.sprite(528, 119, 'stellastud').setOrigin(0, 0)
        stellabag = this.add.sprite(532, 165, 'stellabag').setOrigin(0, 0)
        stellaglass = this.add.sprite(531, 96, 'stellaglass').setOrigin(0, 0)


        level6grp = this.add.container()
        level6grp.add(stellabhair)
        level6grp.add(stellabbag)
        level6grp.add(stellabody)
        level6grp.add(stellahead)
        level6grp.add(stellaeye)
        level6grp.add(stellaeyetop)
        level6grp.add(stellaebrow)
        level6grp.add(stellaeblink)
        level6grp.add(stelladress)
        level6grp.add(stellabag)
        level6grp.add(stellachain)
        level6grp.add(stellahair)
        level6grp.add(stellaglass)
        level6grp.add(stellastud)


        level6grp.x = -800
        stellaeblink.setFrame(esarr[5])

        stelladress.setFrame(darr6[0])
        stellabhair.setFrame(darr6[1])
        stellahair.setFrame(darr6[1])
        stellachain.setFrame(darr6[2])
        stellastud.setFrame(darr6[3])
        stellabag.setFrame(darr6[4])
        stellabbag.setFrame(darr6[4])
        stellaglass.setFrame(darr6[5])
        //


        stellabhair.angle = 1

        game.scene.scenes[pageNo].tweens.add({
            targets: stellabhair,
            angle: -1,
            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });

        this.time.addEvent({
            delay: 2000,
            callback: level6dressdollanimation1,
            callbackScope: this
        })

        function level6dressdollanimation1() {
            level6grp.y = 0
            game.scene.scenes[pageNo].tweens.add({
                targets: level6grp,
                y: 1.003,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: level6grp,
                y: level6grp.y - 1.5,
                ease: 'Linear',
                duration: 700,
                repeat: 0,
                yoyo: true,
            });

            this.time.addEvent({
                delay: 3000,
                callback: level6dressdollanimation1,
                callbackScope: this
            })
        }


        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeye,
            x: 548,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: stellaeyestart1,
            callbackScope: this
        });

        function stellaeyestart1() {

            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 545,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart2,
                callbackScope: this
            });
        }

        function stellaeyestart2() {

            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 542,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: stellaeyestart3,
                callbackScope: this
            });
        }

        function stellaeyestart3() {

            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 545,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart4,
                callbackScope: this
            });
        }

        function stellaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 548,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
                onComplete: stellaeyestart1,
                callbackScope: this
            });

        }
        game.scene.scenes[pageNo].tweens.add({
            targets: stellabhair,
            y: stellabhair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });


        game.scene.scenes[pageNo].tweens.add({
            targets: stellahead,
            y: stellahead.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeye,
            y: stellaeye.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeyetop,
            y: stellaeyetop.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeblink,
            y: stellaeblink.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaebrow,
            y: stellaebrow.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellahair,
            y: stellahair.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellastud,
            y: stellastud.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaglass,
            y: stellaglass.y + 2,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: true,
        });
        stellaeblink.setFrame(esarr[4] + 1)
        t1 = game.scene.scenes[pageNo].time.addEvent({
            delay: 100,
            callback: stellaheadanimation11,
            callbackScope: this
        })

        function stellaheadanimation11() {
            stellaeblink.setFrame(esarr[4])
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 5700,
                callback: stellaheadanimation1,
                callbackScope: this
            })

        }






        function stellaheadanimation1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellastud,
                y: stellastud.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: stellabhair,
                y: stellabhair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: stellahead,
                y: stellahead.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                y: stellaeye.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });

            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeyetop,
                y: stellaeyetop.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeblink,
                y: stellaeblink.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                y: stellaebrow.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellahair,
                y: stellahair.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaglass,
                y: stellaglass.y + 2,
                ease: 'Linear',
                duration: 100,
                repeat: 0,
                yoyo: true,
            });
            stellaeblink.setFrame(esarr[4] + 1)
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 100,
                callback: stellaheadanimation11,
                callbackScope: this
            })

            function stellaheadanimation1() {
                stellaeblink.setFrame(esarr[4])
                t1 = game.scene.scenes[pageNo].time.addEvent({
                    delay: 5700,
                    callback: stellaheadanimation1,
                    callbackScope: this
                })
            }

        }
       
        replay2 = this.add.sprite(739.5, 540.05, 'replay2').setOrigin(0.5, 0.5).setInteractive({
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


        level1grp.x = 0
        level2grp.x = -20
        level3grp.x = 20
        level4grp.x = 0
        level5grp.x = -40
        level6grp.x = 40

        enddollcontainer = this.add.container()
        enddollcontainer.add(level1grp)
        enddollcontainer.add(level3grp)
        enddollcontainer.add(level5grp)
        enddollcontainer.add(level2grp)
        enddollcontainer.add(level4grp)
        enddollcontainer.add(level6grp)

        enddollcontainer.x = -1200
        //
        level1grp.visible = false
        level2grp.visible = false
        level3grp.visible = false
        level4grp.visible = false
        level5grp.visible = false
        level6grp.visible = false

        replay2.setScale(0)
        logomutefun()
        savecontainer = this.add.container()
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
        replay2.x = game.context.drawingBufferWidth  - 61.6
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            endbackground.x = safeArea.x - 300

            

            replay2.x = game.context.drawingBufferWidth - 179.5

            level1grp.x = 0
            level2grp.x = -20
            level3grp.x = 20
            level4grp.x = 0
            level5grp.x = -40
            level6grp.x = 40
            enddollcontainer.x = safeArea.x
            
            clickmute.x = game.context.drawingBufferWidth - 102.25
            soundmute.x = game.context.drawingBufferWidth - 42.25
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
            targets: replay2,
            scaleX: 1,
            scaleY: 1,
            ease: 'Back',
            duration: 300,

        });

    }

    function enddollanimation() {
        level1grp.visible = true
        level2grp.visible = true
        level3grp.visible = true
        level4grp.visible = false
        level5grp.visible = false
        level6grp.visible = false
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
        enddollcontainer.x = (1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x,
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
        level1grp.visible = false
        level2grp.visible = false
        level3grp.visible = false
        level4grp.visible = true
        level5grp.visible = true
        level6grp.visible = true
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
        enddollcontainer.x = (1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x,
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
        if (!startgame12 && loadFinish) {
            startgame12 = true
            playsoundeffects('clickss')
            replay2.anims.stop('replay2')
            replay2.setFrame(10)
            transitionIn()
//            soundstart = 1
//            music.pause()
//            clicksound.pause();
//            window[preroll.config.loaderObjectName].refetchAd(myResumeGameFunction);
        }

    }

    function replay2upstart() {}

    

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
    scene: [bootstate, initialloader, titlescreen, storyline, levelselect, level1, level2, level3, level4, level5, level6, thumb, endscreen],
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
