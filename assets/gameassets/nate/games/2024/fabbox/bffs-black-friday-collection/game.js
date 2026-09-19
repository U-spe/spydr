const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600
const MAX_WIDTH = 1400
const MAX_HEIGHT = 600
let SCALE_MODE = 'SMOOTH'
var Phaser;
var level;
var pageNo = 0;
var firstTime = true;
var bgmusic;
var isMuted = false;
var isMuted1 = false;
var i = 0;
var sno = 0;
var loadFinish = false
var soundMuted = false
var gameName = 'bffs-black-friday-collection';

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
        this.load.image('lpbar', 'assets/loader/loaderprogress.png');
        this.load.image('bgloader', 'assets/loader/loaderbackground.png');
        this.load.image('loaderbarbg', 'assets/loader/loaderbarbg.png');
        this.load.image('loaderplay', 'assets/loader/play.png');
        this.load.image('loadermask', 'assets/loader/loadermask.png');
        this.load.image('loadermaskbg', 'assets/loader/loadermaskbg.png');
        this.load.image('loaderlogo', 'assets/loader/online-games-logo.png');
    },
    create: function () {
        console.log('v1')
        loadFile()
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.scene.start('initialloader');
    }
});

function saveFile() {
    var file = {
        level: level,
        darr1: [darr1[0], darr1[1], darr1[2], darr1[3], darr1[4], darr1[5], darr1[6], darr1[7], darr1[8], darr1[9]],
        darr2: [darr2[0], darr2[1], darr2[2], darr2[3], darr2[4], darr2[5], darr2[6], darr2[7], darr2[8], darr2[9]],
        darr3: [darr3[0], darr3[1], darr3[2], darr3[3], darr3[4], darr3[5], darr3[6], darr3[7], darr3[8], darr3[9]],
        darr4: [darr4[0], darr4[1], darr4[2], darr4[3], darr4[4], darr4[5], darr4[6], darr4[7], darr4[8], darr4[9]],
        darr5: [darr5[0], darr5[1], darr5[2], darr5[3], darr5[4], darr5[5], darr5[6], darr5[7], darr5[8], darr5[9]],
        darr6: [darr6[0], darr6[1], darr6[2], darr6[3], darr6[4], darr6[5], darr6[6], darr6[7], darr6[8], darr6[9]]

    };
    localStorage.setItem('bffs-black-friday-collection', JSON.stringify(file));
};
var file;
var level;

function loadFile() {
    file = JSON.parse(localStorage.getItem('bffs-black-friday-collection'));
    if (file == null) {
        level = 1;
    } else {
        level = parseInt(file.level);
        darr1 = [file.darr1[0], file.darr1[1], file.darr1[2], file.darr1[3], file.darr1[4], file.darr1[5], file.darr1[6], file.darr1[7], file.darr1[8], file.darr1[9]]
        darr2 = [file.darr2[0], file.darr2[1], file.darr2[2], file.darr2[3], file.darr2[4], file.darr2[5], file.darr2[6], file.darr2[7], file.darr2[8], file.darr2[9]]
        darr3 = [file.darr3[0], file.darr3[1], file.darr3[2], file.darr3[3], file.darr3[4], file.darr3[5], file.darr3[6], file.darr3[7], file.darr3[8], file.darr3[9]]
        darr4 = [file.darr4[0], file.darr4[1], file.darr4[2], file.darr4[3], file.darr4[4], file.darr4[5], file.darr4[6], file.darr4[7], file.darr4[8], file.darr4[9]]
        darr5 = [file.darr5[0], file.darr5[1], file.darr5[2], file.darr5[3], file.darr5[4], file.darr5[5], file.darr5[6], file.darr5[7], file.darr5[8], file.darr5[9]]
        darr6 = [file.darr6[0], file.darr6[1], file.darr6[2], file.darr6[3], file.darr6[4], file.darr6[5], file.darr6[6], file.darr6[7], file.darr6[8], file.darr6[9]]

    }

};

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
        loaderbarbg = this.add.image(safeArea.x + 403, 396, 'loaderbarbg').setOrigin(0.5, 0.5)
        loaderlogo = this.add.image(safeArea.x + 403, 250, 'loaderlogo').setOrigin(0.5, 0.5)
        lpbar1 = this.add.sprite(safeArea.x + 45, 396, 'lpbar').setOrigin(0.5, 0.5)
        loadermask = this.add.sprite(safeArea.x + 403, 400, 'loadermask').setOrigin(0.5, 0.5).setVisible(false);
        mask = loadermask.createBitmapMask();
        mask.alpha = 0
        lpbar1.setMask(mask);
        loadermaskbg = this.add.sprite(safeArea.x + 407, 396, 'loadermaskbg').setOrigin(0.5, 0.5).setVisible(false);

        loaderplay = this.add.image(safeArea.x + 404, 405.5, 'loaderplay').setOrigin(0.5, 0.5).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        })
        loaderplay.visible = false
        this.load.on('progress', function (value) {
            lpbar1.x = safeArea.x + (45 + parseInt(parseFloat(value / 1) * 358));
        });
        this.load.on('complete', function () {
            loaderbarbg.visible = false
            lpbar1.visible = false
            if (pageNo == 1) {
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
            loadermask.x = safeArea.x + 226
            loaderbarbg.x = safeArea.x + 403
            loaderplay.x = safeArea.x + 404
            loadermask.x = safeArea.x + 403
            loadermaskbg.x = safeArea.x + 407
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

        this.load.image('settings', 'assets/buttons/settings.png');
        //titlescreen
        this.load.image('titlebackground', 'assets/titlescreen/background.jpg');
        this.load.image('titleshadow', 'assets/titlescreen/shadow.png');
        this.load.image('titlepad', 'assets/titlescreen/titlepad.png');
        this.load.image('titleobj', 'assets/titlescreen/obj.png');
        this.load.image('title1', 'assets/titlescreen/title1.png');
        this.load.image('title2', 'assets/titlescreen/title2.png');
        this.load.image('title3', 'assets/titlescreen/title3.png');
        this.load.image('title4', 'assets/titlescreen/title4.png');

        this.load.image('titlebhair1', 'assets/titlescreen/doll1/bhair.png')
        this.load.image('titlebody1', 'assets/titlescreen/doll1/body.png')
        this.load.spritesheet('titleeblink1', 'assets/titlescreen/doll1/eblink.png', {
            frameWidth: 72,
            frameHeight: 29
        });
        this.load.image('titlehair1', 'assets/titlescreen/doll1/hair.png')

        //        doll2
        this.load.image('titlebody2', 'assets/titlescreen/doll2/body.png')
        this.load.spritesheet('titleeblink2', 'assets/titlescreen/doll2/eblink.png', {
            frameWidth: 74,
            frameHeight: 24
        });
        this.load.image('titlehair2', 'assets/titlescreen/doll2/hair.png')

        //        doll3

        this.load.image('titlebhair3', 'assets/titlescreen/doll3/bhair.png')
        this.load.image('titlebody3', 'assets/titlescreen/doll3/body.png')
        this.load.spritesheet('titleeblink3', 'assets/titlescreen/doll3/eblink.png', {
            frameWidth: 76,
            frameHeight: 31
        });
        this.load.image('titlehair3', 'assets/titlescreen/doll3/hair.png')

        //        doll4

        this.load.image('titlebhair4', 'assets/titlescreen/doll4/bhair.png')
        this.load.image('titlebody4', 'assets/titlescreen/doll4/body.png')
        this.load.spritesheet('titleeblink4', 'assets/titlescreen/doll4/eblink.png', {
            frameWidth: 72,
            frameHeight: 25
        });
        this.load.image('titlehair4', 'assets/titlescreen/doll4/hair.png')

        //          doll5

        this.load.image('titlebhair5', 'assets/titlescreen/doll5/bhair.png')
        this.load.image('titlebody5', 'assets/titlescreen/doll5/body.png')
        this.load.spritesheet('titleeblink5', 'assets/titlescreen/doll5/eblink.png', {
            frameWidth: 73,
            frameHeight: 23
        });
        this.load.image('titlehair5', 'assets/titlescreen/doll5/hair.png')

        this.load.image('titlebhair6', 'assets/titlescreen/doll6/bhair.png')
        this.load.image('titlebody6', 'assets/titlescreen/doll6/body.png')
        this.load.spritesheet('titleeblink6', 'assets/titlescreen/doll6/eblink.png', {
            frameWidth: 71,
            frameHeight: 23
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
            frameWidth: 212,
            frameHeight: 278
        });
        this.load.spritesheet('level2', 'assets/levelselect/level2.png', {
            frameWidth: 212,
            frameHeight: 278
        });
        this.load.spritesheet('level3', 'assets/levelselect/level3.png', {
            frameWidth: 212,
            frameHeight: 278
        });
        this.load.spritesheet('level4', 'assets/levelselect/level4.png', {
            frameWidth: 212,
            frameHeight: 278
        });
        this.load.spritesheet('level5', 'assets/levelselect/level5.png', {
            frameWidth: 212,
            frameHeight: 278
        });
        this.load.spritesheet('level6', 'assets/levelselect/level6.png', {
            frameWidth: 212,
            frameHeight: 278
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
        this.load.image('level1dotspad', 'assets/level1/dotspad.png');
        this.load.spritesheet('level1dots', 'assets/level1/dots.png', {
            frameWidth: 53,
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
        this.load.image('level1bag5', 'assets/level1/bag5.png');
        this.load.image('level1bag6', 'assets/level1/bag6.png');

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
        this.load.image('level2bag5', 'assets/level2/bag5.png');
        this.load.image('level2bag6', 'assets/level2/bag6.png');

        this.load.image('level2glass1', 'assets/level2/glass1.png');
        this.load.image('level2glass2', 'assets/level2/glass2.png');
        this.load.image('level2glass3', 'assets/level2/glass3.png');
        this.load.image('level2glass4', 'assets/level2/glass4.png');

        this.load.image('level2stud1', 'assets/level2/Stud1.png');
        this.load.image('level2stud2', 'assets/level2/Stud2.png');
        this.load.image('level2stud3', 'assets/level2/Stud3.png');
        this.load.image('level2stud4', 'assets/level2/Stud4.png');
        this.load.image('level2stud5', 'assets/level2/Stud5.png');
        this.load.image('level2stud6', 'assets/level2/Stud6.png');

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

        this.load.image('level3glass1', 'assets/level3/glass1.png');
        this.load.image('level3glass2', 'assets/level3/glass2.png');
        this.load.image('level3glass3', 'assets/level3/glass3.png');
        this.load.image('level3glass4', 'assets/level3/glass4.png');

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

        this.load.image('level4glass1', 'assets/level4/glass1.png');
        this.load.image('level4glass2', 'assets/level4/glass2.png');
        this.load.image('level4glass3', 'assets/level4/glass3.png');
        this.load.image('level4glass4', 'assets/level4/glass4.png');

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

        this.load.image('level4chain1', 'assets/level4/chain1.png');
        this.load.image('level4chain2', 'assets/level4/chain2.png');
        this.load.image('level4chain3', 'assets/level4/chain3.png');
        this.load.image('level4chain4', 'assets/level4/chain4.png');
        this.load.image('level4chain5', 'assets/level4/chain5.png');
        this.load.image('level4chain6', 'assets/level4/chain6.png');

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

        this.load.image('level5glass1', 'assets/level5/glass1.png');
        this.load.image('level5glass2', 'assets/level5/glass2.png');
        this.load.image('level5glass3', 'assets/level5/glass3.png');
        this.load.image('level5glass4', 'assets/level5/glass4.png');

        this.load.image('level5bag1', 'assets/level5/bag1.png');
        this.load.image('level5bag2', 'assets/level5/bag2.png');
        this.load.image('level5bag3', 'assets/level5/bag3.png');
        this.load.image('level5bag4', 'assets/level5/bag4.png');
        this.load.image('level5bag5', 'assets/level5/bag5.png');
        this.load.image('level5bag6', 'assets/level5/bag6.png');

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
        this.load.image('level6bag5', 'assets/level6/bag5.png');
        this.load.image('level6bag6', 'assets/level6/bag6.png');

        this.load.image('level6stud1', 'assets/level6/stud1.png');
        this.load.image('level6stud2', 'assets/level6/stud2.png');
        this.load.image('level6stud3', 'assets/level6/stud3.png');
        this.load.image('level6stud4', 'assets/level6/stud4.png');
        this.load.image('level6stud5', 'assets/level6/stud5.png');
        this.load.image('level6stud6', 'assets/level6/stud6.png');

        this.load.image('level6glass1', 'assets/level6/glass1.png');
        this.load.image('level6glass2', 'assets/level6/glass2.png');
        this.load.image('level6glass3', 'assets/level6/glass3.png');
        this.load.image('level6glass4', 'assets/level6/glass4.png');

        this.load.image('level6chain1', 'assets/level6/chain1.png');
        this.load.image('level6chain2', 'assets/level6/chain2.png');
        this.load.image('level6chain3', 'assets/level6/chain3.png');
        this.load.image('level6chain4', 'assets/level6/chain4.png');
        this.load.image('level6chain5', 'assets/level6/chain5.png');
        this.load.image('level6chain6', 'assets/level6/chain6.png');


        //endbackground
        this.load.image('endbackground', 'assets/endscreen/background.jpg');

        assetscall()

        function assetscall() {
            if (level == 2) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('musabhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 194,
                    frameHeight: 312
                });

                game.scene.scenes[pageNo].load.image('musabody', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('musahead', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('musahand', 'assets/level2/doll/hand.png');
                game.scene.scenes[pageNo].load.image('musaebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('musaeye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('musablush', 'assets/level2/doll/blush.png');
                game.scene.scenes[pageNo].load.image('musaeyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.spritesheet('musaeblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 24
                });
                game.scene.scenes[pageNo].load.spritesheet('musadress', 'assets/level2/doll/dress.png', {
                    frameWidth: 300,
                    frameHeight: 619
                });
                game.scene.scenes[pageNo].load.spritesheet('musahdress', 'assets/level2/doll/hdress.png', {
                    frameWidth: 236,
                    frameHeight: 269
                });
                game.scene.scenes[pageNo].load.spritesheet('musahair', 'assets/level2/doll/hair.png', {
                    frameWidth: 204,
                    frameHeight: 350
                });
                game.scene.scenes[pageNo].load.spritesheet('musachain', 'assets/level2/doll/chain.png', {
                    frameWidth: 58,
                    frameHeight: 49
                });
                game.scene.scenes[pageNo].load.spritesheet('musastud', 'assets/level2/doll/stud.png', {
                    frameWidth: 111,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('musabag', 'assets/level2/doll/bag.png', {
                    frameWidth: 134,
                    frameHeight: 214
                });
                game.scene.scenes[pageNo].load.spritesheet('musafbag', 'assets/level2/doll/fbag.png', {
                    frameWidth: 162,
                    frameHeight: 256
                });
                game.scene.scenes[pageNo].load.spritesheet('musahbag', 'assets/level2/doll/hbag.png', {
                    frameWidth: 20,
                    frameHeight: 39
                });
                game.scene.scenes[pageNo].load.spritesheet('musabbag', 'assets/level2/doll/bbag.png', {
                    frameWidth: 149,
                    frameHeight: 248
                });
                game.scene.scenes[pageNo].load.spritesheet('musaglass', 'assets/level2/doll/glass.png', {
                    frameWidth: 87,
                    frameHeight: 41
                });
            } else if (level == 3) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('musabhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 194,
                    frameHeight: 312
                });

                game.scene.scenes[pageNo].load.image('musabody', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('musahead', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('musahand', 'assets/level2/doll/hand.png');
                game.scene.scenes[pageNo].load.image('musaebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('musaeye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('musablush', 'assets/level2/doll/blush.png');
                game.scene.scenes[pageNo].load.image('musaeyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.spritesheet('musaeblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 24
                });
                game.scene.scenes[pageNo].load.spritesheet('musadress', 'assets/level2/doll/dress.png', {
                    frameWidth: 300,
                    frameHeight: 619
                });
                game.scene.scenes[pageNo].load.spritesheet('musahdress', 'assets/level2/doll/hdress.png', {
                    frameWidth: 236,
                    frameHeight: 269
                });
                game.scene.scenes[pageNo].load.spritesheet('musahair', 'assets/level2/doll/hair.png', {
                    frameWidth: 204,
                    frameHeight: 350
                });
                game.scene.scenes[pageNo].load.spritesheet('musachain', 'assets/level2/doll/chain.png', {
                    frameWidth: 58,
                    frameHeight: 49
                });
                game.scene.scenes[pageNo].load.spritesheet('musastud', 'assets/level2/doll/stud.png', {
                    frameWidth: 111,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('musabag', 'assets/level2/doll/bag.png', {
                    frameWidth: 134,
                    frameHeight: 214
                });
                game.scene.scenes[pageNo].load.spritesheet('musafbag', 'assets/level2/doll/fbag.png', {
                    frameWidth: 162,
                    frameHeight: 256
                });
                game.scene.scenes[pageNo].load.spritesheet('musahbag', 'assets/level2/doll/hbag.png', {
                    frameWidth: 20,
                    frameHeight: 39
                });
                game.scene.scenes[pageNo].load.spritesheet('musabbag', 'assets/level2/doll/bbag.png', {
                    frameWidth: 149,
                    frameHeight: 248
                });
                game.scene.scenes[pageNo].load.spritesheet('musaglass', 'assets/level2/doll/glass.png', {
                    frameWidth: 87,
                    frameHeight: 41
                });
                //doll3
                game.scene.scenes[pageNo].load.spritesheet('aishabhair', 'assets/level3/doll/bhair.png', {
                    frameWidth: 221,
                    frameHeight: 341
                });

                game.scene.scenes[pageNo].load.image('aishabody', 'assets/level3/doll/body.png');
                game.scene.scenes[pageNo].load.image('aishahead', 'assets/level3/doll/head.png');
                game.scene.scenes[pageNo].load.image('aishahand', 'assets/level3/doll/hand.png');
                game.scene.scenes[pageNo].load.image('aishaebrow', 'assets/level3/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('aishaeyetop', 'assets/level3/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('aishaeye', 'assets/level3/doll/eye.png');
                game.scene.scenes[pageNo].load.image('aishablush', 'assets/level3/doll/blush.png');
                game.scene.scenes[pageNo].load.spritesheet('aishaeblink', 'assets/level3/doll/eblink.png', {
                    frameWidth: 77,
                    frameHeight: 28
                });
                game.scene.scenes[pageNo].load.spritesheet('aishadress', 'assets/level3/doll/dress.png', {
                    frameWidth: 302,
                    frameHeight: 652
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahdress', 'assets/level3/doll/hdress.png', {
                    frameWidth: 229,
                    frameHeight: 292
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahair', 'assets/level3/doll/hair.png', {
                    frameWidth: 195,
                    frameHeight: 313
                });
                game.scene.scenes[pageNo].load.spritesheet('aishachain', 'assets/level3/doll/chain.png', {
                    frameWidth: 63,
                    frameHeight: 59
                });
                game.scene.scenes[pageNo].load.spritesheet('aishastud', 'assets/level3/doll/stud.png', {
                    frameWidth: 99,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabag', 'assets/level3/doll/bag.png', {
                    frameWidth: 156,
                    frameHeight: 270
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabbag', 'assets/level3/doll/bbag.png', {
                    frameWidth: 131,
                    frameHeight: 219
                });
                game.scene.scenes[pageNo].load.spritesheet('aishaglass', 'assets/level3/doll/glass.png', {
                    frameWidth: 103,
                    frameHeight: 43
                });
            } else if (level == 4) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('musabhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 194,
                    frameHeight: 312
                });

                game.scene.scenes[pageNo].load.image('musabody', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('musahead', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('musahand', 'assets/level2/doll/hand.png');
                game.scene.scenes[pageNo].load.image('musaebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('musaeye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('musablush', 'assets/level2/doll/blush.png');
                game.scene.scenes[pageNo].load.image('musaeyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.spritesheet('musaeblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 24
                });
                game.scene.scenes[pageNo].load.spritesheet('musadress', 'assets/level2/doll/dress.png', {
                    frameWidth: 300,
                    frameHeight: 619
                });
                game.scene.scenes[pageNo].load.spritesheet('musahdress', 'assets/level2/doll/hdress.png', {
                    frameWidth: 236,
                    frameHeight: 269
                });
                game.scene.scenes[pageNo].load.spritesheet('musahair', 'assets/level2/doll/hair.png', {
                    frameWidth: 204,
                    frameHeight: 350
                });
                game.scene.scenes[pageNo].load.spritesheet('musachain', 'assets/level2/doll/chain.png', {
                    frameWidth: 58,
                    frameHeight: 49
                });
                game.scene.scenes[pageNo].load.spritesheet('musastud', 'assets/level2/doll/stud.png', {
                    frameWidth: 111,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('musabag', 'assets/level2/doll/bag.png', {
                    frameWidth: 134,
                    frameHeight: 214
                });
                game.scene.scenes[pageNo].load.spritesheet('musafbag', 'assets/level2/doll/fbag.png', {
                    frameWidth: 162,
                    frameHeight: 256
                });
                game.scene.scenes[pageNo].load.spritesheet('musahbag', 'assets/level2/doll/hbag.png', {
                    frameWidth: 20,
                    frameHeight: 39
                });
                game.scene.scenes[pageNo].load.spritesheet('musabbag', 'assets/level2/doll/bbag.png', {
                    frameWidth: 149,
                    frameHeight: 248
                });
                game.scene.scenes[pageNo].load.spritesheet('musaglass', 'assets/level2/doll/glass.png', {
                    frameWidth: 87,
                    frameHeight: 41
                });
                //doll3
                game.scene.scenes[pageNo].load.spritesheet('aishabhair', 'assets/level3/doll/bhair.png', {
                    frameWidth: 221,
                    frameHeight: 341
                });

                game.scene.scenes[pageNo].load.image('aishabody', 'assets/level3/doll/body.png');
                game.scene.scenes[pageNo].load.image('aishahead', 'assets/level3/doll/head.png');
                game.scene.scenes[pageNo].load.image('aishahand', 'assets/level3/doll/hand.png');
                game.scene.scenes[pageNo].load.image('aishaebrow', 'assets/level3/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('aishaeyetop', 'assets/level3/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('aishaeye', 'assets/level3/doll/eye.png');
                game.scene.scenes[pageNo].load.image('aishablush', 'assets/level3/doll/blush.png');
                game.scene.scenes[pageNo].load.spritesheet('aishaeblink', 'assets/level3/doll/eblink.png', {
                    frameWidth: 77,
                    frameHeight: 28
                });
                game.scene.scenes[pageNo].load.spritesheet('aishadress', 'assets/level3/doll/dress.png', {
                    frameWidth: 302,
                    frameHeight: 652
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahdress', 'assets/level3/doll/hdress.png', {
                    frameWidth: 229,
                    frameHeight: 292
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahair', 'assets/level3/doll/hair.png', {
                    frameWidth: 195,
                    frameHeight: 313
                });
                game.scene.scenes[pageNo].load.spritesheet('aishachain', 'assets/level3/doll/chain.png', {
                    frameWidth: 63,
                    frameHeight: 59
                });
                game.scene.scenes[pageNo].load.spritesheet('aishastud', 'assets/level3/doll/stud.png', {
                    frameWidth: 99,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabag', 'assets/level3/doll/bag.png', {
                    frameWidth: 156,
                    frameHeight: 270
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabbag', 'assets/level3/doll/bbag.png', {
                    frameWidth: 131,
                    frameHeight: 219
                });
                game.scene.scenes[pageNo].load.spritesheet('aishaglass', 'assets/level3/doll/glass.png', {
                    frameWidth: 103,
                    frameHeight: 43
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('bloombhair', 'assets/level4/doll/bhair.png', {
                    frameWidth: 218,
                    frameHeight: 363
                });
                game.scene.scenes[pageNo].load.image('bloombody', 'assets/level4/doll/body.png');
                game.scene.scenes[pageNo].load.image('bloomhead', 'assets/level4/doll/head.png');
                game.scene.scenes[pageNo].load.image('bloomebrow', 'assets/level4/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('bloomeyetop', 'assets/level4/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('bloomeye', 'assets/level4/doll/eye.png');
                game.scene.scenes[pageNo].load.image('bloomblush', 'assets/level4/doll/blush.png');
                game.scene.scenes[pageNo].load.image('bloomhand', 'assets/level4/doll/hand.png');
                game.scene.scenes[pageNo].load.spritesheet('bloomeblink', 'assets/level4/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 22
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomdress', 'assets/level4/doll/dress.png', {
                    frameWidth: 232,
                    frameHeight: 640
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhdress', 'assets/level4/doll/hdress.png', {
                    frameWidth: 83,
                    frameHeight: 110
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhair', 'assets/level4/doll/hair.png', {
                    frameWidth: 203,
                    frameHeight: 314
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomchain', 'assets/level4/doll/chain.png', {
                    frameWidth: 67,
                    frameHeight: 57
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomstud', 'assets/level4/doll/stud.png', {
                    frameWidth: 98,
                    frameHeight: 56
                });
                game.scene.scenes[pageNo].load.spritesheet('bloombag', 'assets/level4/doll/bag.png', {
                    frameWidth: 132,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhbag', 'assets/level4/doll/hbag.png', {
                    frameWidth: 162,
                    frameHeight: 284
                });
                game.scene.scenes[pageNo].load.spritesheet('bloombbag', 'assets/level4/doll/bbag.png', {
                    frameWidth: 166,
                    frameHeight: 283
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomglass', 'assets/level4/doll/glass.png', {
                    frameWidth: 90,
                    frameHeight: 44
                });
            } else if (level == 5) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('musabhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 194,
                    frameHeight: 312
                });

                game.scene.scenes[pageNo].load.image('musabody', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('musahead', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('musahand', 'assets/level2/doll/hand.png');
                game.scene.scenes[pageNo].load.image('musaebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('musaeye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('musablush', 'assets/level2/doll/blush.png');
                game.scene.scenes[pageNo].load.image('musaeyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.spritesheet('musaeblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 24
                });
                game.scene.scenes[pageNo].load.spritesheet('musadress', 'assets/level2/doll/dress.png', {
                    frameWidth: 300,
                    frameHeight: 619
                });
                game.scene.scenes[pageNo].load.spritesheet('musahdress', 'assets/level2/doll/hdress.png', {
                    frameWidth: 236,
                    frameHeight: 269
                });
                game.scene.scenes[pageNo].load.spritesheet('musahair', 'assets/level2/doll/hair.png', {
                    frameWidth: 204,
                    frameHeight: 350
                });
                game.scene.scenes[pageNo].load.spritesheet('musachain', 'assets/level2/doll/chain.png', {
                    frameWidth: 58,
                    frameHeight: 49
                });
                game.scene.scenes[pageNo].load.spritesheet('musastud', 'assets/level2/doll/stud.png', {
                    frameWidth: 111,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('musabag', 'assets/level2/doll/bag.png', {
                    frameWidth: 134,
                    frameHeight: 214
                });
                game.scene.scenes[pageNo].load.spritesheet('musafbag', 'assets/level2/doll/fbag.png', {
                    frameWidth: 162,
                    frameHeight: 256
                });
                game.scene.scenes[pageNo].load.spritesheet('musahbag', 'assets/level2/doll/hbag.png', {
                    frameWidth: 20,
                    frameHeight: 39
                });
                game.scene.scenes[pageNo].load.spritesheet('musabbag', 'assets/level2/doll/bbag.png', {
                    frameWidth: 149,
                    frameHeight: 248
                });
                game.scene.scenes[pageNo].load.spritesheet('musaglass', 'assets/level2/doll/glass.png', {
                    frameWidth: 87,
                    frameHeight: 41
                });
                //doll3
                game.scene.scenes[pageNo].load.spritesheet('aishabhair', 'assets/level3/doll/bhair.png', {
                    frameWidth: 221,
                    frameHeight: 341
                });

                game.scene.scenes[pageNo].load.image('aishabody', 'assets/level3/doll/body.png');
                game.scene.scenes[pageNo].load.image('aishahead', 'assets/level3/doll/head.png');
                game.scene.scenes[pageNo].load.image('aishahand', 'assets/level3/doll/hand.png');
                game.scene.scenes[pageNo].load.image('aishaebrow', 'assets/level3/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('aishaeyetop', 'assets/level3/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('aishaeye', 'assets/level3/doll/eye.png');
                game.scene.scenes[pageNo].load.image('aishablush', 'assets/level3/doll/blush.png');
                game.scene.scenes[pageNo].load.spritesheet('aishaeblink', 'assets/level3/doll/eblink.png', {
                    frameWidth: 77,
                    frameHeight: 28
                });
                game.scene.scenes[pageNo].load.spritesheet('aishadress', 'assets/level3/doll/dress.png', {
                    frameWidth: 302,
                    frameHeight: 652
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahdress', 'assets/level3/doll/hdress.png', {
                    frameWidth: 229,
                    frameHeight: 292
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahair', 'assets/level3/doll/hair.png', {
                    frameWidth: 195,
                    frameHeight: 313
                });
                game.scene.scenes[pageNo].load.spritesheet('aishachain', 'assets/level3/doll/chain.png', {
                    frameWidth: 63,
                    frameHeight: 59
                });
                game.scene.scenes[pageNo].load.spritesheet('aishastud', 'assets/level3/doll/stud.png', {
                    frameWidth: 99,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabag', 'assets/level3/doll/bag.png', {
                    frameWidth: 156,
                    frameHeight: 270
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabbag', 'assets/level3/doll/bbag.png', {
                    frameWidth: 131,
                    frameHeight: 219
                });
                game.scene.scenes[pageNo].load.spritesheet('aishaglass', 'assets/level3/doll/glass.png', {
                    frameWidth: 103,
                    frameHeight: 43
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('bloombhair', 'assets/level4/doll/bhair.png', {
                    frameWidth: 218,
                    frameHeight: 363
                });
                game.scene.scenes[pageNo].load.image('bloombody', 'assets/level4/doll/body.png');
                game.scene.scenes[pageNo].load.image('bloomhead', 'assets/level4/doll/head.png');
                game.scene.scenes[pageNo].load.image('bloomebrow', 'assets/level4/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('bloomeyetop', 'assets/level4/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('bloomeye', 'assets/level4/doll/eye.png');
                game.scene.scenes[pageNo].load.image('bloomblush', 'assets/level4/doll/blush.png');
                game.scene.scenes[pageNo].load.image('bloomhand', 'assets/level4/doll/hand.png');
                game.scene.scenes[pageNo].load.spritesheet('bloomeblink', 'assets/level4/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 22
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomdress', 'assets/level4/doll/dress.png', {
                    frameWidth: 232,
                    frameHeight: 640
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhdress', 'assets/level4/doll/hdress.png', {
                    frameWidth: 83,
                    frameHeight: 110
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhair', 'assets/level4/doll/hair.png', {
                    frameWidth: 203,
                    frameHeight: 314
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomchain', 'assets/level4/doll/chain.png', {
                    frameWidth: 67,
                    frameHeight: 57
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomstud', 'assets/level4/doll/stud.png', {
                    frameWidth: 98,
                    frameHeight: 56
                });
                game.scene.scenes[pageNo].load.spritesheet('bloombag', 'assets/level4/doll/bag.png', {
                    frameWidth: 132,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhbag', 'assets/level4/doll/hbag.png', {
                    frameWidth: 162,
                    frameHeight: 284
                });
                game.scene.scenes[pageNo].load.spritesheet('bloombbag', 'assets/level4/doll/bbag.png', {
                    frameWidth: 166,
                    frameHeight: 283
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomglass', 'assets/level4/doll/glass.png', {
                    frameWidth: 90,
                    frameHeight: 44
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('tecnabhair', 'assets/level5/doll/bhair.png', {
                    frameWidth: 184,
                    frameHeight: 256
                });
                game.scene.scenes[pageNo].load.image('tecnabody', 'assets/level5/doll/body.png');
                game.scene.scenes[pageNo].load.image('tecnahead', 'assets/level5/doll/head.png');
                game.scene.scenes[pageNo].load.image('tecnaebrow', 'assets/level5/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('tecnaeyetop', 'assets/level5/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('tecnaeye', 'assets/level5/doll/eye.png');
                game.scene.scenes[pageNo].load.image('tecnablush', 'assets/level5/doll/blush.png');
                game.scene.scenes[pageNo].load.image('tecnahand', 'assets/level5/doll/hand.png');
                game.scene.scenes[pageNo].load.spritesheet('tecnaeblink', 'assets/level5/doll/eblink.png', {
                    frameWidth: 80,
                    frameHeight: 28
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnadress', 'assets/level5/doll/dress.png', {
                    frameWidth: 284,
                    frameHeight: 614
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnahdress', 'assets/level5/doll/hdress.png', {
                    frameWidth: 135,
                    frameHeight: 199
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnabdress', 'assets/level5/doll/bdress.png', {
                    frameWidth: 231,
                    frameHeight: 451
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnahair', 'assets/level5/doll/hair.png', {
                    frameWidth: 145,
                    frameHeight: 200
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnachain', 'assets/level5/doll/chain.png', {
                    frameWidth: 60,
                    frameHeight: 83
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnastud', 'assets/level5/doll/stud.png', {
                    frameWidth: 99,
                    frameHeight: 51
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnabag', 'assets/level5/doll/bag.png', {
                    frameWidth: 220,
                    frameHeight: 295
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnahbag', 'assets/level5/doll/hbag.png', {
                    frameWidth: 78,
                    frameHeight: 88
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnabbag', 'assets/level5/doll/bbag.png', {
                    frameWidth: 172,
                    frameHeight: 281
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnaglass', 'assets/level5/doll/glass.png', {
                    frameWidth: 99,
                    frameHeight: 42
                });
            } else if (level == 6 || level == 7) {
                //doll2
                game.scene.scenes[pageNo].load.spritesheet('musabhair', 'assets/level2/doll/bhair.png', {
                    frameWidth: 194,
                    frameHeight: 312
                });

                game.scene.scenes[pageNo].load.image('musabody', 'assets/level2/doll/body.png');
                game.scene.scenes[pageNo].load.image('musahead', 'assets/level2/doll/head.png');
                game.scene.scenes[pageNo].load.image('musahand', 'assets/level2/doll/hand.png');
                game.scene.scenes[pageNo].load.image('musaebrow', 'assets/level2/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('musaeye', 'assets/level2/doll/eye.png');
                game.scene.scenes[pageNo].load.image('musablush', 'assets/level2/doll/blush.png');
                game.scene.scenes[pageNo].load.image('musaeyetop', 'assets/level2/doll/eyetop.png');
                game.scene.scenes[pageNo].load.spritesheet('musaeblink', 'assets/level2/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 24
                });
                game.scene.scenes[pageNo].load.spritesheet('musadress', 'assets/level2/doll/dress.png', {
                    frameWidth: 300,
                    frameHeight: 619
                });
                game.scene.scenes[pageNo].load.spritesheet('musahdress', 'assets/level2/doll/hdress.png', {
                    frameWidth: 236,
                    frameHeight: 269
                });
                game.scene.scenes[pageNo].load.spritesheet('musahair', 'assets/level2/doll/hair.png', {
                    frameWidth: 204,
                    frameHeight: 350
                });
                game.scene.scenes[pageNo].load.spritesheet('musachain', 'assets/level2/doll/chain.png', {
                    frameWidth: 58,
                    frameHeight: 49
                });
                game.scene.scenes[pageNo].load.spritesheet('musastud', 'assets/level2/doll/stud.png', {
                    frameWidth: 111,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('musabag', 'assets/level2/doll/bag.png', {
                    frameWidth: 134,
                    frameHeight: 214
                });
                game.scene.scenes[pageNo].load.spritesheet('musafbag', 'assets/level2/doll/fbag.png', {
                    frameWidth: 162,
                    frameHeight: 256
                });
                game.scene.scenes[pageNo].load.spritesheet('musahbag', 'assets/level2/doll/hbag.png', {
                    frameWidth: 20,
                    frameHeight: 39
                });
                game.scene.scenes[pageNo].load.spritesheet('musabbag', 'assets/level2/doll/bbag.png', {
                    frameWidth: 149,
                    frameHeight: 248
                });
                game.scene.scenes[pageNo].load.spritesheet('musaglass', 'assets/level2/doll/glass.png', {
                    frameWidth: 87,
                    frameHeight: 41
                });
                //doll3
                game.scene.scenes[pageNo].load.spritesheet('aishabhair', 'assets/level3/doll/bhair.png', {
                    frameWidth: 221,
                    frameHeight: 341
                });

                game.scene.scenes[pageNo].load.image('aishabody', 'assets/level3/doll/body.png');
                game.scene.scenes[pageNo].load.image('aishahead', 'assets/level3/doll/head.png');
                game.scene.scenes[pageNo].load.image('aishahand', 'assets/level3/doll/hand.png');
                game.scene.scenes[pageNo].load.image('aishaebrow', 'assets/level3/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('aishaeyetop', 'assets/level3/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('aishaeye', 'assets/level3/doll/eye.png');
                game.scene.scenes[pageNo].load.image('aishablush', 'assets/level3/doll/blush.png');
                game.scene.scenes[pageNo].load.spritesheet('aishaeblink', 'assets/level3/doll/eblink.png', {
                    frameWidth: 77,
                    frameHeight: 28
                });
                game.scene.scenes[pageNo].load.spritesheet('aishadress', 'assets/level3/doll/dress.png', {
                    frameWidth: 302,
                    frameHeight: 652
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahdress', 'assets/level3/doll/hdress.png', {
                    frameWidth: 229,
                    frameHeight: 292
                });
                game.scene.scenes[pageNo].load.spritesheet('aishahair', 'assets/level3/doll/hair.png', {
                    frameWidth: 195,
                    frameHeight: 313
                });
                game.scene.scenes[pageNo].load.spritesheet('aishachain', 'assets/level3/doll/chain.png', {
                    frameWidth: 63,
                    frameHeight: 59
                });
                game.scene.scenes[pageNo].load.spritesheet('aishastud', 'assets/level3/doll/stud.png', {
                    frameWidth: 99,
                    frameHeight: 70
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabag', 'assets/level3/doll/bag.png', {
                    frameWidth: 156,
                    frameHeight: 270
                });
                game.scene.scenes[pageNo].load.spritesheet('aishabbag', 'assets/level3/doll/bbag.png', {
                    frameWidth: 131,
                    frameHeight: 219
                });
                game.scene.scenes[pageNo].load.spritesheet('aishaglass', 'assets/level3/doll/glass.png', {
                    frameWidth: 103,
                    frameHeight: 43
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('bloombhair', 'assets/level4/doll/bhair.png', {
                    frameWidth: 218,
                    frameHeight: 363
                });
                game.scene.scenes[pageNo].load.image('bloombody', 'assets/level4/doll/body.png');
                game.scene.scenes[pageNo].load.image('bloomhead', 'assets/level4/doll/head.png');
                game.scene.scenes[pageNo].load.image('bloomebrow', 'assets/level4/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('bloomeyetop', 'assets/level4/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('bloomeye', 'assets/level4/doll/eye.png');
                game.scene.scenes[pageNo].load.image('bloomblush', 'assets/level4/doll/blush.png');
                game.scene.scenes[pageNo].load.image('bloomhand', 'assets/level4/doll/hand.png');
                game.scene.scenes[pageNo].load.spritesheet('bloomeblink', 'assets/level4/doll/eblink.png', {
                    frameWidth: 81,
                    frameHeight: 22
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomdress', 'assets/level4/doll/dress.png', {
                    frameWidth: 232,
                    frameHeight: 640
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhdress', 'assets/level4/doll/hdress.png', {
                    frameWidth: 83,
                    frameHeight: 110
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhair', 'assets/level4/doll/hair.png', {
                    frameWidth: 203,
                    frameHeight: 314
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomchain', 'assets/level4/doll/chain.png', {
                    frameWidth: 67,
                    frameHeight: 57
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomstud', 'assets/level4/doll/stud.png', {
                    frameWidth: 98,
                    frameHeight: 56
                });
                game.scene.scenes[pageNo].load.spritesheet('bloombag', 'assets/level4/doll/bag.png', {
                    frameWidth: 132,
                    frameHeight: 164
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomhbag', 'assets/level4/doll/hbag.png', {
                    frameWidth: 162,
                    frameHeight: 284
                });
                game.scene.scenes[pageNo].load.spritesheet('bloombbag', 'assets/level4/doll/bbag.png', {
                    frameWidth: 166,
                    frameHeight: 283
                });
                game.scene.scenes[pageNo].load.spritesheet('bloomglass', 'assets/level4/doll/glass.png', {
                    frameWidth: 90,
                    frameHeight: 44
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('tecnabhair', 'assets/level5/doll/bhair.png', {
                    frameWidth: 184,
                    frameHeight: 256
                });
                game.scene.scenes[pageNo].load.image('tecnabody', 'assets/level5/doll/body.png');
                game.scene.scenes[pageNo].load.image('tecnahead', 'assets/level5/doll/head.png');
                game.scene.scenes[pageNo].load.image('tecnaebrow', 'assets/level5/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('tecnaeyetop', 'assets/level5/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('tecnaeye', 'assets/level5/doll/eye.png');
                game.scene.scenes[pageNo].load.image('tecnablush', 'assets/level5/doll/blush.png');
                game.scene.scenes[pageNo].load.image('tecnahand', 'assets/level5/doll/hand.png');
                game.scene.scenes[pageNo].load.spritesheet('tecnaeblink', 'assets/level5/doll/eblink.png', {
                    frameWidth: 80,
                    frameHeight: 28
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnadress', 'assets/level5/doll/dress.png', {
                    frameWidth: 284,
                    frameHeight: 614
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnahdress', 'assets/level5/doll/hdress.png', {
                    frameWidth: 135,
                    frameHeight: 199
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnabdress', 'assets/level5/doll/bdress.png', {
                    frameWidth: 231,
                    frameHeight: 451
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnahair', 'assets/level5/doll/hair.png', {
                    frameWidth: 145,
                    frameHeight: 200
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnachain', 'assets/level5/doll/chain.png', {
                    frameWidth: 60,
                    frameHeight: 83
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnastud', 'assets/level5/doll/stud.png', {
                    frameWidth: 99,
                    frameHeight: 51
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnabag', 'assets/level5/doll/bag.png', {
                    frameWidth: 220,
                    frameHeight: 295
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnahbag', 'assets/level5/doll/hbag.png', {
                    frameWidth: 78,
                    frameHeight: 88
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnabbag', 'assets/level5/doll/bbag.png', {
                    frameWidth: 172,
                    frameHeight: 281
                });
                game.scene.scenes[pageNo].load.spritesheet('tecnaglass', 'assets/level5/doll/glass.png', {
                    frameWidth: 99,
                    frameHeight: 42
                });
                //doll4
                game.scene.scenes[pageNo].load.spritesheet('stellabhair', 'assets/level6/doll/bhair.png', {
                    frameWidth: 192,
                    frameHeight: 365
                });
                game.scene.scenes[pageNo].load.image('stellabody', 'assets/level6/doll/body.png');
                game.scene.scenes[pageNo].load.image('stellahead', 'assets/level6/doll/head.png');
                game.scene.scenes[pageNo].load.image('stellaebrow', 'assets/level6/doll/ebrow.png');
                game.scene.scenes[pageNo].load.image('stellaeyetop', 'assets/level6/doll/eyetop.png');
                game.scene.scenes[pageNo].load.image('stellaeye', 'assets/level6/doll/eye.png');
                game.scene.scenes[pageNo].load.image('stellahand', 'assets/level6/doll/hand.png');
                game.scene.scenes[pageNo].load.image('stellablush', 'assets/level6/doll/blush.png');
                game.scene.scenes[pageNo].load.spritesheet('stellaeblink', 'assets/level6/doll/eblink.png', {
                    frameWidth: 74,
                    frameHeight: 21
                });
                game.scene.scenes[pageNo].load.spritesheet('stelladress', 'assets/level6/doll/dress.png', {
                    frameWidth: 260,
                    frameHeight: 616
                });

                game.scene.scenes[pageNo].load.spritesheet('stellafhair', 'assets/level6/doll/fhair.png', {
                    frameWidth: 101,
                    frameHeight: 74
                });
                game.scene.scenes[pageNo].load.spritesheet('stellahair', 'assets/level6/doll/hair.png', {
                    frameWidth: 185,
                    frameHeight: 301
                });
                game.scene.scenes[pageNo].load.spritesheet('stellachain', 'assets/level6/doll/chain.png', {
                    frameWidth: 64,
                    frameHeight: 48
                });
                game.scene.scenes[pageNo].load.spritesheet('stellastud', 'assets/level6/doll/stud.png', {
                    frameWidth: 111,
                    frameHeight: 54
                });
                game.scene.scenes[pageNo].load.spritesheet('stellabag', 'assets/level6/doll/bag.png', {
                    frameWidth: 240,
                    frameHeight: 369
                });
                game.scene.scenes[pageNo].load.spritesheet('stellabbag', 'assets/level6/doll/bbag.png', {
                    frameWidth: 266,
                    frameHeight: 366
                });
                game.scene.scenes[pageNo].load.spritesheet('stellaglass', 'assets/level6/doll/glass.png', {
                    frameWidth: 84,
                    frameHeight: 41
                });
            }

        }
        this.load.start();

        this.load.setPath('assets/titlescreen/transition');
        this.load.spine('trans', 'obj1.json', 'obj1.atlas');
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

var esarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var soundstart = 0

var titlescreen = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function titlescreen() {
        Phaser.Scene.call(this, {
            key: 'titlescreen'
        });
    },
    preload: function () {
        pageNo = 2
        soundcheck = true
        loadFinish = false
        startgame2 = false
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

        titlebhair1 = this.add.image(195, 78, 'titlebhair1').setOrigin(0, 0)
        titlebody1 = this.add.image(202, 66, 'titlebody1').setOrigin(0, 0)
        titleeblink1 = this.add.image(245, 118, 'titleeblink1').setOrigin(0, 0)
        titlehair1 = this.add.image(197, 55, 'titlehair1').setOrigin(0, 0)

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
                delay: 3000,
                callback: titledollgroup1animation11,
                callbackScope: this
            })
        }

        titlebody2 = this.add.image(6, 72, 'titlebody2').setOrigin(0, 0)
        titleeblink2 = this.add.image(80, 126, 'titleeblink2').setOrigin(0, 0)
        titlehair2 = this.add.image(9, 54, 'titlehair2').setOrigin(0, 0)

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
                delay: 2300,
                callback: titledollgroup2animation11,
                callbackScope: this
            })
        }

        titlebhair3 = this.add.image(15, 76, 'titlebhair3').setOrigin(0, 0)
        titlebody3 = this.add.image(10, 79, 'titlebody3').setOrigin(0, 0)
        titleeblink3 = this.add.image(67, 120, 'titleeblink3').setOrigin(0, 0)
        titlehair3 = this.add.image(0, 66, 'titlehair3').setOrigin(0, 0)

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
                delay: 3000,
                callback: titledollgroup3animation11,
                callbackScope: this
            })
        }

        titlebhair4 = this.add.image(139, 77, 'titlebhair4').setOrigin(0, 0)
        titlebody4 = this.add.image(158, 75, 'titlebody4').setOrigin(0, 0)
        titleeblink4 = this.add.image(263, 130, 'titleeblink4').setOrigin(0, 0)
        titlehair4 = this.add.image(184, 64, 'titlehair4').setOrigin(0, 0)

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
                delay: 2300,
                callback: titledollgroup4animation11,
                callbackScope: this
            })
        }
        titlebhair5 = this.add.image(48, 70, 'titlebhair5').setOrigin(0, 0)
        titlebody5 = this.add.image(19, 78, 'titlebody5').setOrigin(0, 0)
        titleeblink5 = this.add.image(100, 130, 'titleeblink5').setOrigin(0, 0)
        titlehair5 = this.add.image(-24, 65, 'titlehair5').setOrigin(0, 0)

        titledollgroup5 = this.add.container()
        titledollgroup5.add(titlebhair5)
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
                delay: 3000,
                callback: titledollgroup5animation11,
                callbackScope: this
            })
        }

        titlebhair6 = this.add.image(213, 174, 'titlebhair6').setOrigin(0, 0)
        titlebody6 = this.add.image(214, 80, 'titlebody6').setOrigin(0, 0)
        titleeblink6 = this.add.image(278, 128, 'titleeblink6').setOrigin(0, 0)
        titlehair6 = this.add.image(197, 62, 'titlehair6').setOrigin(0, 0)

        titledollgroup6 = this.add.container()
        titledollgroup6.add(titlebhair6)
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
                delay: 2300,
                callback: titledollgroup6animation11,
                callbackScope: this
            })
        }

        titledollcontainer1 = this.add.container()

        titledollcontainer1.add(titledollgroup1)
        titledollcontainer1.add(titledollgroup4)
        titledollcontainer1.add(titledollgroup3)
        titledollcontainer1.add(titledollgroup5)
        titledollcontainer1.add(titledollgroup2)
        titledollcontainer1.add(titledollgroup6)

        titledollgroup1.visible = false
        titledollgroup2.visible = false
        titledollgroup3.visible = false
        titledollgroup4.visible = false
        titledollgroup5.visible = false
        titledollgroup6.visible = false

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
            titledollgroup5.visible = false
            titledollgroup6.visible = false
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

        function titledollanimation3() {
            titledollgroup1.visible = false
            titledollgroup2.visible = false
            titledollgroup3.visible = true
            titledollgroup4.visible = true
            titledollgroup5.visible = false
            titledollgroup6.visible = false
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
                targets: titledollcontainer1,
                x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
                ease: 'Back.easeOut',
                duration: 600,
                onComplete: titledollanimation6,
                callbackScope: this
            });
        }

        function titledollanimation6() {
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

        titleobj = this.add.image(564.5, 254.5, 'titleobj').setOrigin(0.5, 0.5)
        title1 = this.add.image(488, 155.5, 'title1').setOrigin(0.5, 0.5)
        title2 = this.add.image(726.5, 154.5, 'title2').setOrigin(0.5, 0.5)
        title3 = this.add.image(500.5, 215.5, 'title3').setOrigin(0.5, 0.5)
        title4 = this.add.image(581.5, 239, 'title4').setOrigin(0.5, 0)
        titleshadow = this.add.image(599, 195.5, 'titleshadow').setOrigin(0.5, 0.5)
        titlepad = this.add.image(600.5, 219.5, 'titlepad').setOrigin(0.5, 0.5)

        titlegrp = this.add.container()
        titlegrp.add(titleshadow)
        titlegrp.add(titleobj)
        titlegrp.add(titlepad)
        titlegrp.add(title1)
        titlegrp.add(title4)
        titlegrp.add(title2)
        titlegrp.add(title3)

        titleobj.alpha = 0
        title3.alpha = 0
        title2.alpha = 0
        titleshadow.alpha = 0

        title1.setScale(0)
        titlepad.scale = 0
        title4.setScale(1, 0)

        titlegrp.x = (safeArea.x * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.5))

        game.scene.scenes[pageNo].tweens.add({
            targets: titlepad,
            x: titlepad,
            scaleX: 1,
            scaleY: 1,
            ease: 'Back.easeOut',
            duration: 500,
            delay: 300,
            onComplete: titleanimation,
            callbackScope: this

        });

        function titleanimation() {
            game.scene.scenes[pageNo].tweens.add({
                targets: titleobj,
                y: titleobj.y - 100,
                alpha: 1,
                ease: 'Back.easeOut',
                duration: 500,

            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title1,
                scaleX: 1,
                scaleY: 1,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 500
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title2,
                alpha: 1,
                x: title2.x - 100,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 1000,

            });

            game.scene.scenes[pageNo].tweens.add({
                targets: title3,
                x: title3.x + 100,
                alpha: 1,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 1000,

            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title4,
                scaleY: 1,
                ease: 'Back.easeOut',
                duration: 500,
                delay: 1500,
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
                scaleX: 0.95,
                scaleY: 0.95,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title2,
                scaleX: 1.05,
                scaleY: 1.05,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title3,
                scaleX: 0.95,
                scaleY: 0.95,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title4,
                scaleX: 1.05,
                scaleY: 1.05,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: titleobj,
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


        play = this.add.sprite(590, 430, 'play').setOrigin(0.5, 0.5).setInteractive({
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
            titlegrp.x = (safeArea.x) * (((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.5))


            if (!startgame2) {
                titledollcontainer1.x = (((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)
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

        },
        this);

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

        phone = this.add.image(188, 59, 'phone').setOrigin(0, 0)

        sbubble1 = this.add.sprite(225, 113, 'sbubble1').setOrigin(0.5, 0.5).setAlpha(0)
        sbubble2 = this.add.sprite(225, 213, 'sbubble2').setOrigin(0.5, 0.5).setAlpha(0)
        sbubble3 = this.add.sprite(225, 317, 'sbubble3').setOrigin(0.5, 0.5).setAlpha(0)
        sbubble4 = this.add.sprite(235, 420, 'sbubble4').setOrigin(0.5, 0.5).setAlpha(0)

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

        this.load.spritesheet('level1cat1', 'assets/level1/cat1.png', {
            frameWidth: 79,
            frameHeight: 78
        });
        this.load.spritesheet('level1cat2', 'assets/level1/cat2.png', {
            frameWidth: 79,
            frameHeight: 78
        });
        this.load.spritesheet('level1cat3', 'assets/level1/cat3.png', {
            frameWidth: 79,
            frameHeight: 78
        });
        this.load.spritesheet('level1cat4', 'assets/level1/cat4.png', {
            frameWidth: 79,
            frameHeight: 78
        });
        this.load.spritesheet('level1cat5', 'assets/level1/cat5.png', {
            frameWidth: 79,
            frameHeight: 78
        });
        this.load.spritesheet('level1cat6', 'assets/level1/cat6.png', {
            frameWidth: 79,
            frameHeight: 78
        });
        //doll1
        this.load.spritesheet('florabhair', 'assets/level1/doll/bhair.png', {
            frameWidth: 226,
            frameHeight: 316
        });
        this.load.image('florabody', 'assets/level1/doll/body.png');
        this.load.image('florahead', 'assets/level1/doll/head.png');
        this.load.image('floraebrow', 'assets/level1/doll/ebrow.png');
        this.load.image('floraeyetop', 'assets/level1/doll/eyetop.png');
        this.load.image('floraeye', 'assets/level1/doll/eye.png');
        this.load.image('florablush', 'assets/level1/doll/blush.png');
        this.load.image('florahand', 'assets/level1/doll/hand.png');
        this.load.spritesheet('floraeblink', 'assets/level1/doll/eblink.png', {
            frameWidth: 79,
            frameHeight: 28
        });
        this.load.spritesheet('floradress', 'assets/level1/doll/dress.png', {
            frameWidth: 280,
            frameHeight: 638
        });
        this.load.spritesheet('florahdress', 'assets/level1/doll/hdress.png', {
            frameWidth: 269,
            frameHeight: 356
        });
        this.load.spritesheet('florahair', 'assets/level1/doll/hair.png', {
            frameWidth: 177,
            frameHeight: 202
        });
        this.load.spritesheet('florafhair', 'assets/level1/doll/fhair.png', {
            frameWidth: 105,
            frameHeight: 76
        });
        this.load.spritesheet('florachain', 'assets/level1/doll/chain.png', {
            frameWidth: 68,
            frameHeight: 56
        });
        this.load.spritesheet('florastud', 'assets/level1/doll/stud.png', {
            frameWidth: 80,
            frameHeight: 56
        });
        this.load.spritesheet('florabag', 'assets/level1/doll/bag.png', {
            frameWidth: 240,
            frameHeight: 338
        });
        this.load.spritesheet('florabbag', 'assets/level1/doll/bbag.png', {
            frameWidth: 103,
            frameHeight: 202
        });
        this.load.spritesheet('florafbag', 'assets/level1/doll/fbag.png', {
            frameWidth: 122,
            frameHeight: 209
        });
        this.load.spritesheet('floraglass', 'assets/level1/doll/glass.png', {
            frameWidth: 95,
            frameHeight: 47
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
        var levelaxrr = [, 29, 284, 550, 29, 286, 546]
        var levelayrr = [, 45, 45, 45, 295, 295, 295]
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

        handindication1 = this.add.sprite(40, 295, 'handindication').setOrigin(0.5, 0.5)
        handindication1.setScale(-0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication1,
            scaleX: -0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication2 = this.add.sprite(300, 295, 'handindication').setOrigin(0.5, 0.5)
        handindication2.setScale(-0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication2,
            scaleX: -0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication3 = this.add.sprite(560, 295, 'handindication').setOrigin(0.5, 0.5)
        handindication3.setScale(-0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication3,
            scaleX: -0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication4 = this.add.sprite(40, 545, 'handindication').setOrigin(0.5, 0.5)
        handindication4.setScale(-0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication4,
            scaleX: -0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });
        handindication5 = this.add.sprite(300, 545, 'handindication').setOrigin(0.5, 0.5)
        handindication5.setScale(-0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication5,
            scaleX: -0.85,
            scaleY: 0.85,
            ease: 'linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        handindication6 = this.add.sprite(560, 545, 'handindication').setOrigin(0.5, 0.5)
        handindication6.setScale(-0.8, 0.8)
        game.scene.scenes[pageNo].tweens.add({
            targets: handindication6,
            scaleX: -0.85,
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
    if (level < 7) {
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
        }
    } else {
        for (i = 1; i <= 6; i++) {
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

var startgame5 = false
var btnstart1 = false
var btnstart2 = false
var btnstart3 = false
var btnstart4 = false
var btnstart5 = false
var glowarr = [0, 0, 0, 0]
var donecount = 0
var cupboardstart = false

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

        level1panel = this.add.sprite(427, 73, 'level1panel').setOrigin(0, 0)
        level1dotspad = this.add.sprite(508, 57, 'level1dotspad').setOrigin(0, 0)
        level1dots = this.add.sprite(562, 65, 'level1dots').setOrigin(0, 0)
        level1dots.visible = false

        var edrxrr = [, 593, 533, 651, 533, 651, 593, 533, 651, 533, 651]
        var edryrr = [, 162.5, 276.5, 276.5, 391.5, 391.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 10; i >= 1; i--) {
            game['level1dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level1dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1dress' + i].visible = false;
        }


        var ehaxrr = [, 533, 651, 533, 651, 533, 651]
        var ehayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level1hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level1hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1hair' + i].visible = false;
        }
        var ebgaxrr = [, 533, 651, 533, 651, 533, 651]
        var ebgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level1chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level1chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1chain' + i].visible = false
        }
        var estaxrr = [, 533, 651, 533, 651, 533, 651]
        var estayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level1stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level1stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1stud' + i].visible = false;
        }
        var estgaxrr = [, 533, 651, 533, 651, 533, 651]
        var estgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level1bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level1bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1bag' + i].visible = false;
        }
        var esglaxrr = [, 525.5, 661.5, 525.5, 661.5]
        var esglayrr = [, 205.5, 205.5, 347.5, 347.5]
        for (i = 4; i >= 1; i--) {
            game['level1glass' + i] = this.add.sprite(esglaxrr[i], esglayrr[i], 'level1glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level1glass' + i].visible = false;
        }

        for (i = 6; i >= 1; i--) {
            game['level1stud' + i].visible = true
        }

        var cdaxrr = [, 726, 726, 726, 726, 726, 726]
        var cdayrr = [, 91, 151, 208, 268, 328, 388]
        for (i = 6; i >= 1; i--) {
            game['level1cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level1cat' + i].x += parseFloat(game['level1cat' + i].width / 2)
            game['level1cat' + i].y += parseFloat(game['level1cat' + i].height / 2)
        }

        rarrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)

        cupboardgroup = this.add.container()
        cupboardgroup.add(level1dotspad)
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
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level1bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level1glass' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level1cat' + i])
        }
        rarrow.visible = false
        larrow.visible = false
        level1dots.visible = false
        level1dotspad.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level1cat' + 1].setFrame(1)


        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false

        florabhair = this.add.sprite(288, 67, 'florabhair').setOrigin(0.5, 0)
        florabhair.x += parseFloat(florabhair.width / 2)
        florabody = this.add.sprite(293, 131, 'florabody').setOrigin(0, 0)
        florabbag = this.add.sprite(333, 185, 'florabbag').setOrigin(0, 0)
        florahead = this.add.sprite(345, 69, 'florahead').setOrigin(0, 0)
        floraebrow = this.add.sprite(348, 109, 'floraebrow').setOrigin(0, 0)
        floraeyetop = this.add.sprite(349, 110, 'floraeyetop').setOrigin(0, 0)
        floraeye = this.add.sprite(356, 120, 'floraeye').setOrigin(0, 0)
        floraeblink = this.add.sprite(343, 117, 'floraeblink').setOrigin(0, 0)
        florablush = this.add.sprite(350, 123, 'florablush').setOrigin(0, 0)
        floradress = this.add.sprite(283, 160, 'floradress').setOrigin(0, 0)
        florahdress = this.add.sprite(289, 153, 'florahdress').setOrigin(0, 0)
        florahair = this.add.sprite(301, 0, 'florahair').setOrigin(0, 0)
        florafhair = this.add.sprite(332, 109, 'florafhair').setOrigin(0, 0)
        florachain = this.add.sprite(365, 184, 'florachain').setOrigin(0, 0)
        florastud = this.add.sprite(364, 128, 'florastud').setOrigin(0, 0)
        florabag = this.add.sprite(321, 190, 'florabag').setOrigin(0, 0)
        florafbag = this.add.sprite(315, 180, 'florafbag').setOrigin(0, 0)
        floraglass = this.add.sprite(337, 113, 'floraglass').setOrigin(0, 0)
        florahand = this.add.sprite(299, 179, 'florahand').setOrigin(0, 0)

        level1grp = this.add.container()
        level1grp.add(florabhair)
        level1grp.add(florabbag)
        level1grp.add(florabody)
        level1grp.add(florahead)
        level1grp.add(floraeye)
        level1grp.add(floraeyetop)
        level1grp.add(floraebrow)

        level1grp.add(floraeblink)
        level1grp.add(florablush)
        level1grp.add(floradress)
        level1grp.add(florachain)
        level1grp.add(florabag)
        level1grp.add(florafbag)
        level1grp.add(florahair)
        level1grp.add(florastud)
        level1grp.add(floraglass)
        level1grp.add(florafhair)
        level1grp.add(florahand)
        level1grp.add(florahdress)

        level1grp.x = -800

        floraeblink.setFrame(esarr[0])

        floradress.setFrame(darr1[0])
        florahdress.setFrame(darr1[0])
        florabhair.setFrame(darr1[1])
        florafhair.setFrame(darr1[1])
        florahair.setFrame(darr1[1])
        florachain.setFrame(darr1[2])
        florastud.setFrame(darr1[3])
        florabag.setFrame(darr1[4])
        florabbag.setFrame(darr1[4])
        florafbag.setFrame(darr1[4])
        floraglass.setFrame(darr1[5])

        if (darr1[0] == 2) {
            florafbag.visible = true
        } else {
            florafbag.visible = false
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
            targets: floraebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: floraeye,
            x: 359,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: floraeyestart1,
            callbackScope: this
        });

        function floraeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 356,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart2,
                callbackScope: this
            });
        }

        function floraeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 353,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: floraeyestart3,
                callbackScope: this
            });
        }

        function floraeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 356,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart4,
                callbackScope: this
            });
        }

        function floraeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 359,
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



        dressgliter = this.add.sprite(400.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(400, 305, 'dollgliter');
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
        logomutefun()
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll2
        this.load.spritesheet('musabhair', 'assets/level2/doll/bhair.png', {
            frameWidth: 194,
            frameHeight: 312
        });

        this.load.image('musabody', 'assets/level2/doll/body.png');
        this.load.image('musahead', 'assets/level2/doll/head.png');
        this.load.image('musahand', 'assets/level2/doll/hand.png');
        this.load.image('musaebrow', 'assets/level2/doll/ebrow.png');
        this.load.image('musaeye', 'assets/level2/doll/eye.png');
        this.load.image('musablush', 'assets/level2/doll/blush.png');
        this.load.image('musaeyetop', 'assets/level2/doll/eyetop.png');
        this.load.spritesheet('musaeblink', 'assets/level2/doll/eblink.png', {
            frameWidth: 81,
            frameHeight: 24
        });
        this.load.spritesheet('musadress', 'assets/level2/doll/dress.png', {
            frameWidth: 300,
            frameHeight: 619
        });
        this.load.spritesheet('musahdress', 'assets/level2/doll/hdress.png', {
            frameWidth: 236,
            frameHeight: 269
        });
        this.load.spritesheet('musahair', 'assets/level2/doll/hair.png', {
            frameWidth: 204,
            frameHeight: 350
        });
        this.load.spritesheet('musachain', 'assets/level2/doll/chain.png', {
            frameWidth: 58,
            frameHeight: 49
        });
        this.load.spritesheet('musastud', 'assets/level2/doll/stud.png', {
            frameWidth: 111,
            frameHeight: 70
        });
        this.load.spritesheet('musabag', 'assets/level2/doll/bag.png', {
            frameWidth: 134,
            frameHeight: 214
        });
        this.load.spritesheet('musafbag', 'assets/level2/doll/fbag.png', {
            frameWidth: 162,
            frameHeight: 256
        });
        this.load.spritesheet('musahbag', 'assets/level2/doll/hbag.png', {
            frameWidth: 20,
            frameHeight: 39
        });
        this.load.spritesheet('musabbag', 'assets/level2/doll/bbag.png', {
            frameWidth: 149,
            frameHeight: 248
        });
        this.load.spritesheet('musaglass', 'assets/level2/doll/glass.png', {
            frameWidth: 87,
            frameHeight: 41
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
                level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 150

            } else {
                level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x)
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

function level1start() {

    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level1grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 150,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level1dressclickstart1,
            callbackScope: this
        });

    }

    function level1dressclickstart1() {
        level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 150
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            scaleX: -1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
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
            sno = this.texture.key.substr(11)
            if (darr1[0] == parseInt(sno)) {
                floradress.setFrame(0)
                florahdress.setFrame(0)
                darr1[0] = 0

            } else {
                darr1[0] = parseInt(sno)
                floradress.setFrame(parseInt(sno))
                florahdress.setFrame(parseInt(sno))
            }
            if (darr1[0] == 2) {
                florafbag.visible = true
            } else {
                florafbag.visible = false
            }
            btnvisFun()
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
                florabhair.setFrame(0)
                florafhair.setFrame(0)
                florahair.setFrame(0)
                darr1[1] = 0
            } else {
                darr1[1] = parseInt(sno)
                florabhair.setFrame(parseInt(sno))
                florafhair.setFrame(parseInt(sno))
                florahair.setFrame(parseInt(sno))

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
            sno = this.texture.key.substr(11)

            if (darr1[2] == parseInt(sno)) {
                florachain.setFrame(0)
                darr1[2] = 0
            } else {
                darr1[2] = parseInt(sno)
                florachain.setFrame(parseInt(sno))
            }

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
            sno = this.texture.key.substr(10)
            if (darr1[3] == parseInt(sno)) {
                florastud.setFrame(0)
                darr1[3] = 0
            } else {
                darr1[3] = parseInt(sno)
                florastud.setFrame(parseInt(sno))
            }
            btnvisFun()
        }
        for (i = 6; i >= 1; i--) {
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
            sno = this.texture.key.substr(9)
            if (darr1[4] == parseInt(sno)) {
                florabag.setFrame(0)
                florabbag.setFrame(0)
                florafbag.setFrame(0)
                darr1[4] = 0
            } else {
                darr1[4] = parseInt(sno)
                florabag.setFrame(parseInt(sno))
                florabbag.setFrame(parseInt(sno))
                florafbag.setFrame(parseInt(sno))
            }
            if (darr1[0] == 2) {
                florafbag.visible = true
            } else {
                florafbag.visible = false
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
            sno = this.texture.key.substr(11)
            if (darr1[5] == parseInt(sno)) {
                floraglass.setFrame(0)
                darr1[5] = 0
            } else {
                darr1[5] = parseInt(sno)
                floraglass.setFrame(parseInt(sno))
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
            for (i = 1; i <= 5; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 6].visible) {
            level1dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level1dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level1dress' + 1].visible) {
            level1dots.setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level1dress' + i].visible = true
            }
        } else if (game['level1dress' + 6].visible) {
            level1dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level1dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
        level1dotspad.visible = false
        level1dots.visible = false
        level1dots.setFrame(0)

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
                game['level1bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level1bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level1bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1bag' + i].visible = true
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
                game['level1bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1glass' + i].visible = true
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
                game['level1bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level1hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level1dotspad.visible = true
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
                game['level1bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level1glass' + i].visible = false
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


            darr1[0] = floradress.frame.name
            darr1[0] = florahdress.frame.name
            darr1[1] = florabhair.frame.name
            darr1[1] = florahair.frame.name
            darr1[1] = florafhair.frame.name
            darr1[2] = florachain.frame.name
            darr1[3] = florastud.frame.name
            darr1[4] = florabag.frame.name
            darr1[4] = florabbag.frame.name
            darr1[4] = florafbag.frame.name
            darr1[5] = floraglass.frame.name

            saveFile()

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level1grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x),
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level1grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x)
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
        targets: florablush,
        y: florablush.y + 2,
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
            targets: florablush,
            y: florablush.y + 2,
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

        level2panel = this.add.sprite(427, 73, 'level1panel').setOrigin(0, 0)
        level2dotspad = this.add.sprite(508, 57, 'level1dotspad').setOrigin(0, 0)
        level2dots = this.add.sprite(562, 65, 'level1dots').setOrigin(0, 0)
        level2dots.visible = false

        var edrxrr = [, 593, 533, 651, 533, 651, 593, 533, 651, 533, 651]
        var edryrr = [, 162.5, 276.5, 276.5, 391.5, 391.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 10; i >= 1; i--) {
            game['level2dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level2dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2dress' + i].visible = false;
        }
        var ehaxrr = [, 533, 651, 533, 651, 533, 651]
        var ehayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level2hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level2hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2hair' + i].visible = false;
        }
        var ebgaxrr = [, 533, 651, 533, 651, 533, 651]
        var ebgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level2chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level2chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2chain' + i].visible = false
        }
        var estaxrr = [, 533, 651, 533, 651, 533, 651]
        var estayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level2stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level2stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2stud' + i].visible = false;
        }
        var estgaxrr = [, 533, 651, 533, 651, 533, 651]
        var estgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level2bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level2bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2bag' + i].visible = false;
        }
        var esglaxrr = [, 525.5, 661.5, 525.5, 661.5]
        var esglayrr = [, 205.5, 205.5, 347.5, 347.5]
        for (i = 4; i >= 1; i--) {
            game['level2glass' + i] = this.add.sprite(esglaxrr[i], esglayrr[i], 'level2glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level2glass' + i].visible = false;
        }

        for (i = 6; i >= 1; i--) {
            game['level2stud' + i].visible = true
        }

        var cdaxrr = [, 726, 726, 726, 726, 726, 726]
        var cdayrr = [, 91, 151, 208, 268, 328, 388]
        for (i = 6; i >= 1; i--) {
            game['level2cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level2cat' + i].x += parseFloat(game['level2cat' + i].width / 2)
            game['level2cat' + i].y += parseFloat(game['level2cat' + i].height / 2)
        }

        rarrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)

        cupboardgroup = this.add.container()
        cupboardgroup.add(level2dotspad)
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
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level2bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level2glass' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level2cat' + i])
        }
        rarrow.visible = false
        larrow.visible = false
        level2dots.visible = false
        level2dotspad.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level2cat' + 1].setFrame(1)


        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false

        musabhair = this.add.sprite(108, 56, 'musabhair').setOrigin(0.5, 0)
        musabhair.x += parseFloat(musabhair.width / 2)
        musabody = this.add.sprite(84, 152, 'musabody').setOrigin(0, 0)
        musabbag = this.add.sprite(161, 181, 'musabbag').setOrigin(0, 0)
        musahead = this.add.sprite(160, 76, 'musahead').setOrigin(0, 0)
        musaebrow = this.add.sprite(168, 118, 'musaebrow').setOrigin(0, 0)
        musaeyetop = this.add.sprite(166, 119, 'musaeyetop').setOrigin(0, 0)
        musaeye = this.add.sprite(177, 128, 'musaeye').setOrigin(0, 0)
        musaeblink = this.add.sprite(166, 125, 'musaeblink').setOrigin(0, 0)
        musablush = this.add.sprite(171, 141, 'musablush').setOrigin(0, 0)
        musadress = this.add.sprite(46, 162, 'musadress').setOrigin(0, 0)
        musahdress = this.add.sprite(82, 197, 'musahdress').setOrigin(0, 0)
        musahair = this.add.sprite(108, 0, 'musahair').setOrigin(0, 0)
        musachain = this.add.sprite(176, 186, 'musachain').setOrigin(0, 0)
        musastud = this.add.sprite(150, 129, 'musastud').setOrigin(0, 0)
        musabag = this.add.sprite(220, 381, 'musabag').setOrigin(0, 0)
        musahbag = this.add.sprite(163, 182, 'musahbag').setOrigin(0, 0)
        musafbag = this.add.sprite(159, 184, 'musafbag').setOrigin(0, 0)
        musaglass = this.add.sprite(163, 118, 'musaglass').setOrigin(0, 0)
        musahand = this.add.sprite(115, 297, 'musahand').setOrigin(0, 0)

        level2grp = this.add.container()
        level2grp.add(musabhair)
        level2grp.add(musabbag)
        level2grp.add(musabody)
        level2grp.add(musahead)
        level2grp.add(musaeye)
        level2grp.add(musaeyetop)
        level2grp.add(musaebrow)

        level2grp.add(musaeblink)
        level2grp.add(musablush)
        level2grp.add(musadress)
        level2grp.add(musafbag)
        level2grp.add(musahbag)
        level2grp.add(musahand)
        level2grp.add(musabag)
        level2grp.add(musahdress)
        level2grp.add(musachain)
        level2grp.add(musahair)
        level2grp.add(musastud)
        level2grp.add(musaglass)

        level2grp.x = -800

        musaeblink.setFrame(esarr[0])

        musadress.setFrame(darr2[0])
        musahdress.setFrame(darr2[0])
        musabhair.setFrame(darr2[1])
        musahair.setFrame(darr2[1])
        musachain.setFrame(darr2[2])
        musastud.setFrame(darr2[3])
        musabag.setFrame(darr2[4])
        musabbag.setFrame(darr2[4])
        musahbag.setFrame(darr2[4])
        musafbag.setFrame(darr2[4])
        musaglass.setFrame(darr2[5])

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
            targets: musaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaeye,
            x: 180,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: musaeyestart1,
            callbackScope: this
        });

        function musaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart2,
                callbackScope: this
            });
        }

        function musaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 174,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: musaeyestart3,
                callbackScope: this
            });
        }

        function musaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart4,
                callbackScope: this
            });
        }

        function musaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 180,
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
            frameWidth: 221,
            frameHeight: 341
        });

        this.load.image('aishabody', 'assets/level3/doll/body.png');
        this.load.image('aishahead', 'assets/level3/doll/head.png');
        this.load.image('aishahand', 'assets/level3/doll/hand.png');
        this.load.image('aishaebrow', 'assets/level3/doll/ebrow.png');
        this.load.image('aishaeyetop', 'assets/level3/doll/eyetop.png');
        this.load.image('aishaeye', 'assets/level3/doll/eye.png');
        this.load.image('aishablush', 'assets/level3/doll/blush.png');
        this.load.spritesheet('aishaeblink', 'assets/level3/doll/eblink.png', {
            frameWidth: 77,
            frameHeight: 28
        });
        this.load.spritesheet('aishadress', 'assets/level3/doll/dress.png', {
            frameWidth: 302,
            frameHeight: 652
        });
        this.load.spritesheet('aishahdress', 'assets/level3/doll/hdress.png', {
            frameWidth: 229,
            frameHeight: 292
        });
        this.load.spritesheet('aishahair', 'assets/level3/doll/hair.png', {
            frameWidth: 195,
            frameHeight: 313
        });
        this.load.spritesheet('aishachain', 'assets/level3/doll/chain.png', {
            frameWidth: 63,
            frameHeight: 59
        });
        this.load.spritesheet('aishastud', 'assets/level3/doll/stud.png', {
            frameWidth: 99,
            frameHeight: 70
        });
        this.load.spritesheet('aishabag', 'assets/level3/doll/bag.png', {
            frameWidth: 156,
            frameHeight: 270
        });
        this.load.spritesheet('aishabbag', 'assets/level3/doll/bbag.png', {
            frameWidth: 131,
            frameHeight: 219
        });
        this.load.spritesheet('aishaglass', 'assets/level3/doll/glass.png', {
            frameWidth: 103,
            frameHeight: 43
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
                level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 190
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
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            scaleX: -1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
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
            sno = this.texture.key.substr(11)
            if (darr2[0] == parseInt(sno)) {
                musadress.setFrame(0)
                musahdress.setFrame(0)
                darr2[0] = 0

            } else {
                darr2[0] = parseInt(sno)
                musadress.setFrame(parseInt(sno))
                musahdress.setFrame(parseInt(sno))
            }
            if (darr2[0] == 9) {
                musahbag.visible = true
            } else {
                musahbag.visible = false
            }
            btnvisFun()
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
                musabhair.setFrame(0)
                musahair.setFrame(0)
                darr2[1] = 0
            } else {
                darr2[1] = parseInt(sno)
                musabhair.setFrame(parseInt(sno))
                musahair.setFrame(parseInt(sno))

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
            sno = this.texture.key.substr(11)

            if (darr2[2] == parseInt(sno)) {
                musachain.setFrame(0)
                darr2[2] = 0
            } else {
                darr2[2] = parseInt(sno)
                musachain.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(10)
            if (darr2[3] == parseInt(sno)) {
                musastud.setFrame(0)
                darr2[3] = 0
            } else {
                darr2[3] = parseInt(sno)
                musastud.setFrame(parseInt(sno))
            }
            btnvisFun()
        }
        for (i = 6; i >= 1; i--) {
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
            sno = this.texture.key.substr(9)
            if (darr2[4] == parseInt(sno)) {
                musabag.setFrame(0)
                musabbag.setFrame(0)
                musahbag.setFrame(0)
                musafbag.setFrame(0)
                darr2[4] = 0
            } else {
                darr2[4] = parseInt(sno)
                musabag.setFrame(parseInt(sno))
                musabbag.setFrame(parseInt(sno))
                musahbag.setFrame(parseInt(sno))
                musafbag.setFrame(parseInt(sno))
            }
            if (darr2[0] == 9) {
                musahbag.visible = true
            } else {
                musahbag.visible = false
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
            sno = this.texture.key.substr(11)
            if (darr2[5] == parseInt(sno)) {
                musaglass.setFrame(0)
                darr2[5] = 0
            } else {
                darr2[5] = parseInt(sno)
                musaglass.setFrame(parseInt(sno))
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
            for (i = 1; i <= 5; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 6].visible) {
            level2dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level2dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level2dress' + 1].visible) {
            level2dots.setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level2dress' + i].visible = true
            }
        } else if (game['level2dress' + 6].visible) {
            level2dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level2dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
        level2dotspad.visible = false
        level2dots.visible = false
        level2dots.setFrame(0)

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
                game['level2bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level2bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level2bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2bag' + i].visible = true
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
                game['level2bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2glass' + i].visible = true
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
                game['level2bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level2hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level2dotspad.visible = true
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
                game['level2bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level2glass' + i].visible = false
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

            darr2[0] = musadress.frame.name
            darr2[7] = musabhair.frame.name
            darr2[1] = musahair.frame.name
            darr2[2] = musachain.frame.name
            darr2[3] = musastud.frame.name
            darr2[4] = musabag.frame.name
            darr2[4] = musabbag.frame.name
            darr2[5] = musaglass.frame.name
            saveFile()

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level2grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 190,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level2grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 190
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
        targets: musablush,
        y: musablush.y + 2,
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
            targets: musablush,
            y: musablush.y + 2,
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

        level3panel = this.add.sprite(427, 73, 'level1panel').setOrigin(0, 0)
        level3dotspad = this.add.sprite(508, 57, 'level1dotspad').setOrigin(0, 0)
        level3dots = this.add.sprite(562, 65, 'level1dots').setOrigin(0, 0)
        level3dots.visible = false

        var edrxrr = [, 593, 533, 651, 533, 651, 593, 533, 651, 533, 651]
        var edryrr = [, 162.5, 276.5, 276.5, 391.5, 391.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 10; i >= 1; i--) {
            game['level3dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level3dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3dress' + i].visible = false;
        }
        var ehaxrr = [, 533, 651, 533, 651, 533, 651]
        var ehayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level3hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level3hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3hair' + i].visible = false;
        }
        var ebgaxrr = [, 533, 651, 533, 651, 533, 651]
        var ebgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level3chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level3chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3chain' + i].visible = false
        }
        var estaxrr = [, 533, 651, 533, 651, 533, 651]
        var estayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level3stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level3stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3stud' + i].visible = false;
        }
        var estgaxrr = [, 533, 651, 533, 651, 533, 651]
        var estgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level3bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level3bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3bag' + i].visible = false;
        }
        var esglaxrr = [, 525.5, 661.5, 525.5, 661.5]
        var esglayrr = [, 205.5, 205.5, 347.5, 347.5]
        for (i = 4; i >= 1; i--) {
            game['level3glass' + i] = this.add.sprite(esglaxrr[i], esglayrr[i], 'level3glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level3glass' + i].visible = false;
        }

        for (i = 6; i >= 1; i--) {
            game['level3stud' + i].visible = true
        }

        var cdaxrr = [, 726, 726, 726, 726, 726, 726]
        var cdayrr = [, 91, 151, 208, 268, 328, 388]
        for (i = 6; i >= 1; i--) {
            game['level3cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level3cat' + i].x += parseFloat(game['level3cat' + i].width / 2)
            game['level3cat' + i].y += parseFloat(game['level3cat' + i].height / 2)
        }

        rarrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)

        cupboardgroup = this.add.container()
        cupboardgroup.add(level3dotspad)
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
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level3bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level3glass' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level3cat' + i])
        }
        rarrow.visible = false
        larrow.visible = false
        level3dots.visible = false
        level3dotspad.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level3cat' + 1].setFrame(1)


        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false

        aishabhair = this.add.sprite(521, 51, 'aishabhair').setOrigin(0.5, 0)
        aishabhair.x += parseFloat(aishabhair.width / 2)
        aishabody = this.add.sprite(503, 136, 'aishabody').setOrigin(0, 0)
        aishabbag = this.add.sprite(538, 179, 'aishabbag').setOrigin(0, 0)
        aishahead = this.add.sprite(578, 74, 'aishahead').setOrigin(0, 0)
        aishaebrow = this.add.sprite(579, 113, 'aishaebrow').setOrigin(0, 0)
        aishaeyetop = this.add.sprite(580, 119, 'aishaeyetop').setOrigin(0, 0)
        aishaeye = this.add.sprite(588, 125, 'aishaeye').setOrigin(0, 0)
        aishaeblink = this.add.sprite(576, 120, 'aishaeblink').setOrigin(0, 0)
        aishablush = this.add.sprite(578, 135, 'aishablush').setOrigin(0, 0)
        aishadress = this.add.sprite(475, 153, 'aishadress').setOrigin(0, 0)
        aishahdress = this.add.sprite(508, 180, 'aishahdress').setOrigin(0, 0)
        aishahair = this.add.sprite(539, 11, 'aishahair').setOrigin(0, 0)
        aishachain = this.add.sprite(594, 183, 'aishachain').setOrigin(0, 0)
        aishastud = this.add.sprite(578, 133, 'aishastud').setOrigin(0, 0)
        aishabag = this.add.sprite(520, 181, 'aishabag').setOrigin(0, 0)
        aishaglass = this.add.sprite(569, 116, 'aishaglass').setOrigin(0, 0)
        aishahand = this.add.sprite(572, 298, 'aishahand').setOrigin(0, 0)

        level3grp = this.add.container()
        level3grp.add(aishabhair)
        level3grp.add(aishabbag)
        level3grp.add(aishabody)
        level3grp.add(aishahead)
        level3grp.add(aishaeye)
        level3grp.add(aishaeyetop)
        level3grp.add(aishaebrow)

        level3grp.add(aishaeblink)
        level3grp.add(aishablush)
        level3grp.add(aishadress)
        level3grp.add(aishabag)
        level3grp.add(aishahand)
        level3grp.add(aishahdress)
        level3grp.add(aishachain)
        level3grp.add(aishahair)
        level3grp.add(aishastud)
        level3grp.add(aishaglass)

        level3grp.x = -800

        aishaeblink.setFrame(esarr[0])

        aishadress.setFrame(darr3[0])
        aishahdress.setFrame(darr3[0])
        aishabhair.setFrame(darr3[1])
        aishahair.setFrame(darr3[1])
        aishachain.setFrame(darr3[2])
        aishastud.setFrame(darr3[3])
        aishabag.setFrame(darr3[4])
        aishabbag.setFrame(darr3[4])
        aishaglass.setFrame(darr3[5])

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
            targets: aishaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeye,
            x: 591,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: aishaeyestart1,
            callbackScope: this
        });

        function aishaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 588,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart2,
                callbackScope: this
            });
        }

        function aishaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 585,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: aishaeyestart3,
                callbackScope: this
            });
        }

        function aishaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 588,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart4,
                callbackScope: this
            });
        }

        function aishaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 591,
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



        dressgliter = this.add.sprite(630.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(630, 305, 'dollgliter');
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

        logomutefun()
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll4
        this.load.spritesheet('bloombhair', 'assets/level4/doll/bhair.png', {
            frameWidth: 218,
            frameHeight: 363
        });
        this.load.image('bloombody', 'assets/level4/doll/body.png');
        this.load.image('bloomhead', 'assets/level4/doll/head.png');
        this.load.image('bloomebrow', 'assets/level4/doll/ebrow.png');
        this.load.image('bloomeyetop', 'assets/level4/doll/eyetop.png');
        this.load.image('bloomeye', 'assets/level4/doll/eye.png');
        this.load.image('bloomblush', 'assets/level4/doll/blush.png');
        this.load.image('bloomhand', 'assets/level4/doll/hand.png');
        this.load.spritesheet('bloomeblink', 'assets/level4/doll/eblink.png', {
            frameWidth: 81,
            frameHeight: 22
        });
        this.load.spritesheet('bloomdress', 'assets/level4/doll/dress.png', {
            frameWidth: 232,
            frameHeight: 640
        });
        this.load.spritesheet('bloomhdress', 'assets/level4/doll/hdress.png', {
            frameWidth: 83,
            frameHeight: 110
        });
        this.load.spritesheet('bloomhair', 'assets/level4/doll/hair.png', {
            frameWidth: 203,
            frameHeight: 314
        });
        this.load.spritesheet('bloomchain', 'assets/level4/doll/chain.png', {
            frameWidth: 67,
            frameHeight: 57
        });
        this.load.spritesheet('bloomstud', 'assets/level4/doll/stud.png', {
            frameWidth: 98,
            frameHeight: 56
        });
        this.load.spritesheet('bloombag', 'assets/level4/doll/bag.png', {
            frameWidth: 132,
            frameHeight: 164
        });
        this.load.spritesheet('bloomhbag', 'assets/level4/doll/hbag.png', {
            frameWidth: 162,
            frameHeight: 284
        });
        this.load.spritesheet('bloombbag', 'assets/level4/doll/bbag.png', {
            frameWidth: 166,
            frameHeight: 283
        });
        this.load.spritesheet('bloomglass', 'assets/level4/doll/glass.png', {
            frameWidth: 90,
            frameHeight: 44
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
                level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 370

            } else {
                level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 220
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

function level3start() {

    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level3grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 370,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level3dressclickstart1,
            callbackScope: this
        });

    }

    function level3dressclickstart1() {
        level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 370
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            scaleX: -1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
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
            sno = this.texture.key.substr(11)
            if (darr3[0] == parseInt(sno)) {
                aishadress.setFrame(0)
                aishahdress.setFrame(0)
                darr3[0] = 0

            } else {
                darr3[0] = parseInt(sno)
                aishadress.setFrame(parseInt(sno))
                aishahdress.setFrame(parseInt(sno))
            }
            btnvisFun()
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
                aishabhair.setFrame(0)
                aishahair.setFrame(0)
                darr3[1] = 0
            } else {
                darr3[1] = parseInt(sno)
                aishabhair.setFrame(parseInt(sno))
                aishahair.setFrame(parseInt(sno))

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
            sno = this.texture.key.substr(11)

            if (darr3[2] == parseInt(sno)) {
                aishachain.setFrame(0)
                darr3[2] = 0
            } else {
                darr3[2] = parseInt(sno)
                aishachain.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(10)
            if (darr3[3] == parseInt(sno)) {
                aishastud.setFrame(0)
                darr3[3] = 0
            } else {
                darr3[3] = parseInt(sno)
                aishastud.setFrame(parseInt(sno))
            }
            btnvisFun()
        }
        for (i = 6; i >= 1; i--) {
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
            sno = this.texture.key.substr(9)
            if (darr3[4] == parseInt(sno)) {
                aishabag.setFrame(0)
                aishabbag.setFrame(0)
                darr3[4] = 0
            } else {
                darr3[4] = parseInt(sno)
                aishabag.setFrame(parseInt(sno))
                aishabbag.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(11)
            if (darr3[5] == parseInt(sno)) {
                aishaglass.setFrame(0)
                darr3[5] = 0
            } else {
                darr3[5] = parseInt(sno)
                aishaglass.setFrame(parseInt(sno))
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
            for (i = 1; i <= 5; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 6].visible) {
            level3dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level3dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level3dress' + 1].visible) {
            level3dots.setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level3dress' + i].visible = true
            }
        } else if (game['level3dress' + 6].visible) {
            level3dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level3dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
        rarrow.visible = false
        larrow.visible = false
        level3dotspad.visible = false
        level3dots.visible = false
        level3dots.setFrame(0)

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
                game['level3bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level3bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level3bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3bag' + i].visible = true
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
                game['level3bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3glass' + i].visible = true
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
                game['level3bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level3hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level3dotspad.visible = true
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
                game['level3bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level3glass' + i].visible = false
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


            darr3[0] = aishadress.frame.name
            darr3[0] = aishahdress.frame.name
            darr3[1] = aishabhair.frame.name
            darr3[1] = aishahair.frame.name
            darr3[2] = aishachain.frame.name
            darr3[3] = aishastud.frame.name
            darr3[4] = aishabag.frame.name
            darr3[4] = aishabbag.frame.name
            darr3[5] = aishaglass.frame.name

            saveFile()

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level3grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 220,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level3grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 220
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
        targets: aishablush,
        y: aishablush.y + 2,
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
            targets: aishablush,
            y: aishablush.y + 2,
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

        level4panel = this.add.sprite(427, 73, 'level1panel').setOrigin(0, 0)
        level4dotspad = this.add.sprite(508, 57, 'level1dotspad').setOrigin(0, 0)
        level4dots = this.add.sprite(562, 65, 'level1dots').setOrigin(0, 0)
        level4dots.visible = false

        var edrxrr = [, 593, 533, 651, 533, 651, 593, 533, 651, 533, 651]
        var edryrr = [, 162.5, 276.5, 276.5, 391.5, 391.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 10; i >= 1; i--) {
            game['level4dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level4dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4dress' + i].visible = false;
        }
        var ehaxrr = [, 533, 651, 533, 651, 533, 651]
        var ehayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level4hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level4hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4hair' + i].visible = false;
        }
        var ebgaxrr = [, 533, 651, 533, 651, 533, 651]
        var ebgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level4chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level4chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4chain' + i].visible = false
        }
        var estaxrr = [, 533, 651, 533, 651, 533, 651]
        var estayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level4stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level4stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4stud' + i].visible = false;
        }
        var estgaxrr = [, 533, 651, 533, 651, 533, 651]
        var estgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level4bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level4bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4bag' + i].visible = false;
        }
        var esglaxrr = [, 525.5, 661.5, 525.5, 661.5]
        var esglayrr = [, 205.5, 205.5, 347.5, 347.5]
        for (i = 4; i >= 1; i--) {
            game['level4glass' + i] = this.add.sprite(esglaxrr[i], esglayrr[i], 'level4glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level4glass' + i].visible = false;
        }

        for (i = 6; i >= 1; i--) {
            game['level4stud' + i].visible = true
        }

        var cdaxrr = [, 726, 726, 726, 726, 726, 726]
        var cdayrr = [, 91, 151, 208, 268, 328, 388]
        for (i = 6; i >= 1; i--) {
            game['level4cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level4cat' + i].x += parseFloat(game['level4cat' + i].width / 2)
            game['level4cat' + i].y += parseFloat(game['level4cat' + i].height / 2)
        }

        rarrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)

        cupboardgroup = this.add.container()
        cupboardgroup.add(level4dotspad)
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
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level4bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level4glass' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level4cat' + i])
        }
        rarrow.visible = false
        larrow.visible = false
        level4dots.visible = false
        level4dotspad.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level4cat' + 1].setFrame(1)


        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false

        bloombhair = this.add.sprite(296, 66, 'bloombhair').setOrigin(0.5, 0)
        bloombhair.x += parseFloat(bloombhair.width / 2)
        bloombody = this.add.sprite(276, 157, 'bloombody').setOrigin(0, 0)
        bloombbag = this.add.sprite(279, 193, 'bloombbag').setOrigin(0, 0)
        bloomhead = this.add.sprite(356, 76, 'bloomhead').setOrigin(0, 0)
        bloomebrow = this.add.sprite(367, 122, 'bloomebrow').setOrigin(0, 0)
        bloomeyetop = this.add.sprite(362, 125, 'bloomeyetop').setOrigin(0, 0)
        bloomeye = this.add.sprite(372, 131, 'bloomeye').setOrigin(0, 0)
        bloomeblink = this.add.sprite(362, 129, 'bloomeblink').setOrigin(0, 0)
        bloomblush = this.add.sprite(363, 143, 'bloomblush').setOrigin(0, 0)
        bloomdress = this.add.sprite(281, 162, 'bloomdress').setOrigin(0, 0)
        bloomhdress = this.add.sprite(290, 305, 'bloomhdress').setOrigin(0, 0)
        bloomhair = this.add.sprite(300, 6, 'bloomhair').setOrigin(0, 0)
        bloomchain = this.add.sprite(370, 194, 'bloomchain').setOrigin(0, 0)
        bloomstud = this.add.sprite(354, 143, 'bloomstud').setOrigin(0, 0)
        bloombag = this.add.sprite(228, 398, 'bloombag').setOrigin(0, 0)
        bloomhbag = this.add.sprite(281, 190, 'bloomhbag').setOrigin(0, 0)
        bloomglass = this.add.sprite(357, 121, 'bloomglass').setOrigin(0, 0)
        bloomhand = this.add.sprite(284, 314, 'bloomhand').setOrigin(0, 0)

        level4grp = this.add.container()
        level4grp.add(bloombhair)
        level4grp.add(bloombbag)
        level4grp.add(bloombody)
        level4grp.add(bloomhead)
        level4grp.add(bloomeye)
        level4grp.add(bloomeyetop)
        level4grp.add(bloomebrow)

        level4grp.add(bloomeblink)
        level4grp.add(bloomblush)
        level4grp.add(bloomdress)
        level4grp.add(bloomhbag)
        level4grp.add(bloomhand)
        level4grp.add(bloombag)
        level4grp.add(bloomhdress)
        level4grp.add(bloomchain)
        level4grp.add(bloomhair)
        level4grp.add(bloomstud)
        level4grp.add(bloomglass)

        level4grp.x = -800

        bloomeblink.setFrame(esarr[0])

        bloomdress.setFrame(darr4[0])
        bloomhdress.setFrame(darr4[0])
        bloombhair.setFrame(darr4[1])
        bloomhair.setFrame(darr4[1])
        bloomchain.setFrame(darr4[2])
        bloomstud.setFrame(darr4[3])
        bloombag.setFrame(darr4[4])
        bloombbag.setFrame(darr4[4])
        bloomhbag.setFrame(darr4[4])
        bloomglass.setFrame(darr4[5])

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
            targets: bloomebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeye,
            x: 375,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: bloomeyestart1,
            callbackScope: this
        });

        function bloomeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 372,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart2,
                callbackScope: this
            });
        }

        function bloomeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 369,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: bloomeyestart3,
                callbackScope: this
            });
        }

        function bloomeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 372,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart4,
                callbackScope: this
            });
        }

        function bloomeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 375,
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



        dressgliter = this.add.sprite(400.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(400, 305, 'dollgliter');
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
            frameWidth: 184,
            frameHeight: 256
        });
        this.load.image('tecnabody', 'assets/level5/doll/body.png');
        this.load.image('tecnahead', 'assets/level5/doll/head.png');
        this.load.image('tecnaebrow', 'assets/level5/doll/ebrow.png');
        this.load.image('tecnaeyetop', 'assets/level5/doll/eyetop.png');
        this.load.image('tecnaeye', 'assets/level5/doll/eye.png');
        this.load.image('tecnablush', 'assets/level5/doll/blush.png');
        this.load.image('tecnahand', 'assets/level5/doll/hand.png');
        this.load.spritesheet('tecnaeblink', 'assets/level5/doll/eblink.png', {
            frameWidth: 80,
            frameHeight: 28
        });
        this.load.spritesheet('tecnadress', 'assets/level5/doll/dress.png', {
            frameWidth: 284,
            frameHeight: 614
        });
        this.load.spritesheet('tecnahdress', 'assets/level5/doll/hdress.png', {
            frameWidth: 135,
            frameHeight: 199
        });
        this.load.spritesheet('tecnabdress', 'assets/level5/doll/bdress.png', {
            frameWidth: 231,
            frameHeight: 451
        });
        this.load.spritesheet('tecnahair', 'assets/level5/doll/hair.png', {
            frameWidth: 145,
            frameHeight: 200
        });
        this.load.spritesheet('tecnachain', 'assets/level5/doll/chain.png', {
            frameWidth: 60,
            frameHeight: 83
        });
        this.load.spritesheet('tecnastud', 'assets/level5/doll/stud.png', {
            frameWidth: 99,
            frameHeight: 51
        });
        this.load.spritesheet('tecnabag', 'assets/level5/doll/bag.png', {
            frameWidth: 220,
            frameHeight: 295
        });
        this.load.spritesheet('tecnahbag', 'assets/level5/doll/hbag.png', {
            frameWidth: 78,
            frameHeight: 88
        });
        this.load.spritesheet('tecnabbag', 'assets/level5/doll/bbag.png', {
            frameWidth: 172,
            frameHeight: 281
        });
        this.load.spritesheet('tecnaglass', 'assets/level5/doll/glass.png', {
            frameWidth: 99,
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
                level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 150

            } else {
                level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x)
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
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 150,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level4dressclickstart1,
            callbackScope: this
        });

    }

    function level4dressclickstart1() {
        level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 150
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            scaleX: -1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
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
            sno = this.texture.key.substr(11)
            if (darr4[0] == parseInt(sno)) {
                bloomdress.setFrame(0)
                bloomhdress.setFrame(0)
                darr4[0] = 0

            } else {
                darr4[0] = parseInt(sno)
                bloomdress.setFrame(parseInt(sno))
                bloomhdress.setFrame(parseInt(sno))
            }
            btnvisFun()
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
                bloombhair.setFrame(0)
                bloomhair.setFrame(0)
                darr4[1] = 0
            } else {
                darr4[1] = parseInt(sno)
                bloombhair.setFrame(parseInt(sno))
                bloomhair.setFrame(parseInt(sno))

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
            sno = this.texture.key.substr(11)

            if (darr4[2] == parseInt(sno)) {
                bloomchain.setFrame(0)
                darr4[2] = 0
            } else {
                darr4[2] = parseInt(sno)
                bloomchain.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(10)
            if (darr4[3] == parseInt(sno)) {
                bloomstud.setFrame(0)
                darr4[3] = 0
            } else {
                darr4[3] = parseInt(sno)
                bloomstud.setFrame(parseInt(sno))
            }
            btnvisFun()
        }
        for (i = 6; i >= 1; i--) {
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
            sno = this.texture.key.substr(9)
            if (darr4[4] == parseInt(sno)) {
                bloombag.setFrame(0)
                bloombbag.setFrame(0)
                bloomhbag.setFrame(0)
                darr4[4] = 0
            } else {
                darr4[4] = parseInt(sno)
                bloombag.setFrame(parseInt(sno))
                bloombbag.setFrame(parseInt(sno))
                bloomhbag.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(11)
            if (darr4[5] == parseInt(sno)) {
                bloomglass.setFrame(0)
                darr4[5] = 0
            } else {
                darr4[5] = parseInt(sno)
                bloomglass.setFrame(parseInt(sno))
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
            for (i = 1; i <= 5; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 6].visible) {
            level4dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level4dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level4dress' + 1].visible) {
            level4dots.setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level4dress' + i].visible = true
            }
        } else if (game['level4dress' + 6].visible) {
            level4dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level4dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
        level4dotspad.visible = false
        level4dots.visible = false
        level4dots.setFrame(0)

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
                game['level4bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level4bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level4bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4bag' + i].visible = true
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
                game['level4bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4glass' + i].visible = true
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
                game['level4bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level4hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level4dotspad.visible = true
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
                game['level4bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level4glass' + i].visible = false
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


            darr4[0] = bloomdress.frame.name
            darr4[1] = bloombhair.frame.name
            darr4[1] = bloomhair.frame.name
            darr4[2] = bloomchain.frame.name
            darr4[3] = bloomstud.frame.name
            darr4[4] = bloombag.frame.name
            darr4[4] = bloombbag.frame.name
            darr4[5] = bloomglass.frame.name

            saveFile()
            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level4grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x),
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level4grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x)
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
        targets: bloomblush,
        y: bloomblush.y + 2,
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
            targets: bloomblush,
            y: bloomblush.y + 2,
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

        level5panel = this.add.sprite(427, 73, 'level1panel').setOrigin(0, 0)
        level5dotspad = this.add.sprite(508, 57, 'level1dotspad').setOrigin(0, 0)
        level5dots = this.add.sprite(562, 65, 'level1dots').setOrigin(0, 0)
        level5dots.visible = false

        var edrxrr = [, 593, 533, 651, 533, 651, 593, 533, 651, 533, 651]
        var edryrr = [, 162.5, 276.5, 276.5, 391.5, 391.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 10; i >= 1; i--) {
            game['level5dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level5dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5dress' + i].visible = false;
        }
        var ehaxrr = [, 533, 651, 533, 651, 533, 651]
        var ehayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level5hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level5hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5hair' + i].visible = false;
        }
        var ebgaxrr = [, 533, 651, 533, 651, 533, 651]
        var ebgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level5chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level5chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5chain' + i].visible = false
        }
        var estaxrr = [, 533, 651, 533, 651, 533, 651]
        var estayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level5stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level5stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5stud' + i].visible = false;
        }
        var estgaxrr = [, 533, 651, 533, 651, 533, 651]
        var estgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level5bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level5bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5bag' + i].visible = false;
        }
        var esglaxrr = [, 525.5, 661.5, 525.5, 661.5]
        var esglayrr = [, 205.5, 205.5, 347.5, 347.5]
        for (i = 4; i >= 1; i--) {
            game['level5glass' + i] = this.add.sprite(esglaxrr[i], esglayrr[i], 'level5glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level5glass' + i].visible = false;
        }

        for (i = 6; i >= 1; i--) {
            game['level5stud' + i].visible = true
        }

        var cdaxrr = [, 726, 726, 726, 726, 726, 726]
        var cdayrr = [, 91, 151, 208, 268, 328, 388]
        for (i = 6; i >= 1; i--) {
            game['level5cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level5cat' + i].x += parseFloat(game['level5cat' + i].width / 2)
            game['level5cat' + i].y += parseFloat(game['level5cat' + i].height / 2)
        }

        rarrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)

        cupboardgroup = this.add.container()
        cupboardgroup.add(level5dotspad)
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
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level5bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level5glass' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level5cat' + i])
        }
        rarrow.visible = false
        larrow.visible = false
        level5dots.visible = false
        level5dotspad.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level5cat' + 1].setFrame(1)


        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false

        tecnabhair = this.add.sprite(73, 83, 'tecnabhair').setOrigin(0.5, 0)
        tecnabhair.x += parseFloat(tecnabhair.width / 2)
        tecnabody = this.add.sprite(57, 149, 'tecnabody').setOrigin(0, 0)
        tecnabbag = this.add.sprite(45, 180, 'tecnabbag').setOrigin(0, 0)
        tecnahead = this.add.sprite(124, 74, 'tecnahead').setOrigin(0, 0)
        tecnaebrow = this.add.sprite(126, 117, 'tecnaebrow').setOrigin(0, 0)
        tecnaeyetop = this.add.sprite(126, 122, 'tecnaeyetop').setOrigin(0, 0)
        tecnaeye = this.add.sprite(133, 128, 'tecnaeye').setOrigin(0, 0)
        tecnaeblink = this.add.sprite(119, 122, 'tecnaeblink').setOrigin(0, 0)
        tecnablush = this.add.sprite(126, 140, 'tecnablush').setOrigin(0, 0)
        tecnadress = this.add.sprite(32, 169, 'tecnadress').setOrigin(0, 0)
        tecnahdress = this.add.sprite(177, 181, 'tecnahdress').setOrigin(0, 0)
        tecnabdress = this.add.sprite(40, 169, 'tecnabdress').setOrigin(0, 0)
        tecnahair = this.add.sprite(101, 29, 'tecnahair').setOrigin(0, 0)
        tecnachain = this.add.sprite(138, 183, 'tecnachain').setOrigin(0, 0)
        tecnastud = this.add.sprite(115, 141, 'tecnastud').setOrigin(0, 0)
        tecnabag = this.add.sprite(71, 183, 'tecnabag').setOrigin(0, 0)
        tecnahbag = this.add.sprite(204, 322, 'tecnahbag').setOrigin(0, 0)
        tecnaglass = this.add.sprite(113, 122, 'tecnaglass').setOrigin(0, 0)
        tecnahand = this.add.sprite(164, 294, 'tecnahand').setOrigin(0, 0)

        level5grp = this.add.container()
        level5grp.add(tecnabhair)
        level5grp.add(tecnabbag)
        level5grp.add(tecnabdress)
        level5grp.add(tecnabody)
        level5grp.add(tecnahead)
        level5grp.add(tecnaeye)
        level5grp.add(tecnaeyetop)
        level5grp.add(tecnaebrow)

        level5grp.add(tecnaeblink)
        level5grp.add(tecnablush)
        level5grp.add(tecnadress)
        level5grp.add(tecnahbag)
        level5grp.add(tecnahand)
        level5grp.add(tecnabag)
        level5grp.add(tecnahdress)
        level5grp.add(tecnachain)
        level5grp.add(tecnahair)
        level5grp.add(tecnastud)
        level5grp.add(tecnaglass)

        level5grp.x = -800

        tecnaeblink.setFrame(esarr[0])

        tecnadress.setFrame(darr5[0])
        tecnahdress.setFrame(darr5[0])
        tecnabdress.setFrame(darr5[0])
        tecnabhair.setFrame(darr5[1])
        tecnahair.setFrame(darr5[1])
        tecnachain.setFrame(darr5[2])
        tecnastud.setFrame(darr5[3])
        tecnabag.setFrame(darr5[4])
        tecnabbag.setFrame(darr5[4])
        tecnahbag.setFrame(darr5[4])
        tecnaglass.setFrame(darr5[5])

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
            targets: tecnaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeye,
            x: 136,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: tecnaeyestart1,
            callbackScope: this
        });

        function tecnaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 133,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart2,
                callbackScope: this
            });
        }

        function tecnaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 130,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: tecnaeyestart3,
                callbackScope: this
            });
        }

        function tecnaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 133,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart4,
                callbackScope: this
            });
        }

        function tecnaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 136,
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

        dressgliter = this.add.sprite(160.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(160, 305, 'dollgliter');
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
        logomutefun()
        transitionOut()
        this.load.on('complete', function () {
            loadFinish = true;
        });

        //doll4
        this.load.spritesheet('stellabhair', 'assets/level6/doll/bhair.png', {
            frameWidth: 192,
            frameHeight: 365
        });
        this.load.image('stellabody', 'assets/level6/doll/body.png');
        this.load.image('stellahead', 'assets/level6/doll/head.png');
        this.load.image('stellaebrow', 'assets/level6/doll/ebrow.png');
        this.load.image('stellaeyetop', 'assets/level6/doll/eyetop.png');
        this.load.image('stellaeye', 'assets/level6/doll/eye.png');
        this.load.image('stellahand', 'assets/level6/doll/hand.png');
        this.load.image('stellablush', 'assets/level6/doll/blush.png');
        this.load.spritesheet('stellaeblink', 'assets/level6/doll/eblink.png', {
            frameWidth: 74,
            frameHeight: 21
        });
        this.load.spritesheet('stelladress', 'assets/level6/doll/dress.png', {
            frameWidth: 260,
            frameHeight: 616
        });

        this.load.spritesheet('stellafhair', 'assets/level6/doll/fhair.png', {
            frameWidth: 101,
            frameHeight: 74
        });
        this.load.spritesheet('stellahair', 'assets/level6/doll/hair.png', {
            frameWidth: 185,
            frameHeight: 301
        });
        this.load.spritesheet('stellachain', 'assets/level6/doll/chain.png', {
            frameWidth: 64,
            frameHeight: 48
        });
        this.load.spritesheet('stellastud', 'assets/level6/doll/stud.png', {
            frameWidth: 111,
            frameHeight: 54
        });
        this.load.spritesheet('stellabag', 'assets/level6/doll/bag.png', {
            frameWidth: 240,
            frameHeight: 369
        });
        this.load.spritesheet('stellabbag', 'assets/level6/doll/bbag.png', {
            frameWidth: 266,
            frameHeight: 366
        });
        this.load.spritesheet('stellaglass', 'assets/level6/doll/glass.png', {
            frameWidth: 84,
            frameHeight: 41
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
                level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 90

            } else {
                level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 240
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

function level5start() {

    setTimeout(dressdollgrpstartani, 100)

    function dressdollgrpstartani() {
        playsoundeffects('dollin');
        game.scene.scenes[pageNo].tweens.add({
            targets: level5grp,
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 90,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level5dressclickstart1,
            callbackScope: this
        });

    }

    function level5dressclickstart1() {
        level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 90
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            scaleX: -1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
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
            sno = this.texture.key.substr(11)
            if (darr5[0] == parseInt(sno)) {
                tecnadress.setFrame(0)
                tecnahdress.setFrame(0)
                tecnabdress.setFrame(0)
                darr5[0] = 0

            } else {
                darr5[0] = parseInt(sno)
                tecnadress.setFrame(parseInt(sno))
                tecnahdress.setFrame(parseInt(sno))
                tecnabdress.setFrame(parseInt(sno))
            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level5hair' + i].on('pointerover', etopOverFun)
            game['level5hair' + i].on('pointerout', etopOutFun)
            game['level5hair' + i].on('pointerdown', overFun)
        }

        function overFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr5[1] == parseInt(sno)) {
                tecnabhair.setFrame(0)
                tecnahair.setFrame(0)
                darr5[1] = 0
            } else {
                darr5[1] = parseInt(sno)
                tecnabhair.setFrame(parseInt(sno))
                tecnahair.setFrame(parseInt(sno))

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
            sno = this.texture.key.substr(11)

            if (darr5[2] == parseInt(sno)) {
                tecnachain.setFrame(0)
                darr5[2] = 0
            } else {
                darr5[2] = parseInt(sno)
                tecnachain.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(10)
            if (darr5[3] == parseInt(sno)) {
                tecnastud.setFrame(0)
                darr5[3] = 0
            } else {
                darr5[3] = parseInt(sno)
                tecnastud.setFrame(parseInt(sno))
            }
            btnvisFun()
        }
        for (i = 6; i >= 1; i--) {
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
            sno = this.texture.key.substr(9)
            if (darr5[4] == parseInt(sno)) {
                tecnabag.setFrame(0)
                tecnabbag.setFrame(0)
                tecnahbag.setFrame(0)
                darr5[4] = 0
            } else {
                darr5[4] = parseInt(sno)
                tecnabag.setFrame(parseInt(sno))
                tecnabbag.setFrame(parseInt(sno))
                tecnahbag.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(11)
            if (darr5[5] == parseInt(sno)) {
                tecnaglass.setFrame(0)
                darr5[5] = 0
            } else {
                darr5[5] = parseInt(sno)
                tecnaglass.setFrame(parseInt(sno))
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
            for (i = 1; i <= 5; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level5dress' + i].visible = true
            }
        } else if (game['level5dress' + 6].visible) {
            level5dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level5dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level5dress' + 1].visible) {
            level5dots.setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level5dress' + i].visible = true
            }
        } else if (game['level5dress' + 6].visible) {
            level5dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level5dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
        level5dotspad.visible = false
        level5dots.visible = false
        level5dots.setFrame(0)

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
                game['level5bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level5bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level5bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level5glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level5bag' + i].visible = true
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
                game['level5bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level5glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level5glass' + i].visible = true
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
                game['level5bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level5glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level5hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level5dotspad.visible = true
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
                game['level5bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level5glass' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
            if (level == 5) {
                level = 6
            }
            darr5[0] = tecnadress.frame.name
            darr5[0] = tecnahdress.frame.name
            darr5[0] = tecnabdress.frame.name
            darr5[1] = tecnabhair.frame.name
            darr5[1] = tecnahair.frame.name
            darr5[2] = tecnachain.frame.name
            darr5[3] = tecnastud.frame.name
            darr5[4] = tecnabag.frame.name
            darr5[4] = tecnabbag.frame.name
            darr5[4] = tecnahbag.frame.name
            darr5[5] = tecnaglass.frame.name

            saveFile()

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level5grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 240,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level5grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) + 240
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
        targets: tecnablush,
        y: tecnablush.y + 2,
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
            targets: tecnablush,
            y: tecnablush.y + 2,
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

        level6panel = this.add.sprite(427, 73, 'level1panel').setOrigin(0, 0)
        level6dotspad = this.add.sprite(508, 57, 'level1dotspad').setOrigin(0, 0)
        level6dots = this.add.sprite(562, 65, 'level1dots').setOrigin(0, 0)
        level6dots.visible = false

        var edrxrr = [, 593, 533, 651, 533, 651, 593, 533, 651, 533, 651]
        var edryrr = [, 162.5, 276.5, 276.5, 391.5, 391.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 10; i >= 1; i--) {
            game['level6dress' + i] = this.add.sprite(edrxrr[i], edryrr[i], 'level6dress' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6dress' + i].visible = false;
        }
        var ehaxrr = [, 533, 651, 533, 651, 533, 651]
        var ehayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level6hair' + i] = this.add.sprite(ehaxrr[i], ehayrr[i], 'level6hair' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6hair' + i].visible = false;
        }
        var ebgaxrr = [, 533, 651, 533, 651, 533, 651]
        var ebgayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level6chain' + i] = this.add.sprite(ebgaxrr[i], ebgayrr[i], 'level6chain' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6chain' + i].visible = false
        }
        var estaxrr = [, 533, 651, 533, 651, 533, 651]
        var estayrr = [, 162.5, 162.5, 276.5, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level6stud' + i] = this.add.sprite(estaxrr[i], estayrr[i], 'level6stud' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6stud' + i].visible = false;
        }
        var estgaxrr = [, 533, 651, 533, 651, 533, 651]
        var estgayrr = [, 162.5, 162.5, 276, 276.5, 391.5, 391.5]
        for (i = 6; i >= 1; i--) {
            game['level6bag' + i] = this.add.sprite(estgaxrr[i], estgayrr[i], 'level6bag' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6bag' + i].visible = false;
        }
        var esglaxrr = [, 525.5, 661.5, 525.5, 661.5]
        var esglayrr = [, 205.5, 205.5, 347.5, 347.5]
        for (i = 4; i >= 1; i--) {
            game['level6glass' + i] = this.add.sprite(esglaxrr[i], esglayrr[i], 'level6glass' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level6glass' + i].visible = false;
        }

        for (i = 6; i >= 1; i--) {
            game['level6stud' + i].visible = true
        }

        var cdaxrr = [, 726, 726, 726, 726, 726, 726]
        var cdayrr = [, 91, 151, 208, 268, 328, 388]
        for (i = 6; i >= 1; i--) {
            game['level6cat' + i] = this.add.sprite(cdaxrr[i], cdayrr[i], 'level1cat' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['level6cat' + i].x += parseFloat(game['level6cat' + i].width / 2)
            game['level6cat' + i].y += parseFloat(game['level6cat' + i].height / 2)
        }

        rarrow = this.add.sprite(490.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        rarrow.setScale(-0.9, 0.9)
        larrow = this.add.sprite(720.85, 532.85, 'larrow').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        larrow.setScale(0.9, 0.9)

        cupboardgroup = this.add.container()
        cupboardgroup.add(level6dotspad)
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
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level6bag' + i])
        }
        for (i = 4; i >= 1; i--) {
            cupboardgroup.add(game['level6glass' + i])
        }
        for (i = 6; i >= 1; i--) {
            cupboardgroup.add(game['level6cat' + i])
        }
        rarrow.visible = false
        larrow.visible = false
        level6dots.visible = false
        level6dotspad.visible = false

        cupboardgroup.x = (800 * ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3)) + (safeArea.x)

        game['level6cat' + 1].setFrame(1)


        fillbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        fillbackground.visible = false

        stellabhair = this.add.sprite(530, 56, 'stellabhair').setOrigin(0.5, 0)
        stellabhair.x += parseFloat(stellabhair.width / 2)
        stellabody = this.add.sprite(472, 155, 'stellabody').setOrigin(0, 0)
        stellabbag = this.add.sprite(454, 196, 'stellabbag').setOrigin(0, 0)
        stellahead = this.add.sprite(584, 78, 'stellahead').setOrigin(0, 0)
        stellaebrow = this.add.sprite(594, 124, 'stellaebrow').setOrigin(0, 0)
        stellaeyetop = this.add.sprite(590, 128, 'stellaeyetop').setOrigin(0, 0)
        stellaeye = this.add.sprite(602, 134, 'stellaeye').setOrigin(0, 0)
        stellaeblink = this.add.sprite(593, 132, 'stellaeblink').setOrigin(0, 0)
        stellablush = this.add.sprite(594, 148, 'stellablush').setOrigin(0, 0)
        stelladress = this.add.sprite(507, 173, 'stelladress').setOrigin(0, 0)
        stellafhair = this.add.sprite(578, 114, 'stellafhair').setOrigin(0, 0)
        stellahair = this.add.sprite(533, 29, 'stellahair').setOrigin(0, 0)
        stellachain = this.add.sprite(596, 192, 'stellachain').setOrigin(0, 0)
        stellastud = this.add.sprite(574, 147, 'stellastud').setOrigin(0, 0)
        stellabag = this.add.sprite(502, 191, 'stellabag').setOrigin(0, 0)
        stellaglass = this.add.sprite(587, 125, 'stellaglass').setOrigin(0, 0)
        stellahand = this.add.sprite(708, 191, 'stellahand').setOrigin(0, 0)

        level6grp = this.add.container()
        level6grp.add(stellabhair)
        level6grp.add(stellabbag)
        level6grp.add(stellabody)
        level6grp.add(stellahead)
        level6grp.add(stellaeye)
        level6grp.add(stellaeyetop)
        level6grp.add(stellaebrow)

        level6grp.add(stellaeblink)
        level6grp.add(stellablush)
        level6grp.add(stelladress)
        level6grp.add(stellahand)
        level6grp.add(stellabag)
        level6grp.add(stellachain)
        level6grp.add(stellahair)
        level6grp.add(stellastud)
        level6grp.add(stellaglass)

        level6grp.x = -800

        stellaeblink.setFrame(esarr[0])

        stelladress.setFrame(darr6[0])
        stellabhair.setFrame(darr6[1])
        stellahair.setFrame(darr6[1])
        stellachain.setFrame(darr6[2])
        stellastud.setFrame(darr6[3])
        stellabag.setFrame(darr6[4])
        stellabbag.setFrame(darr6[4])
        stellaglass.setFrame(darr6[5])

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
            targets: stellaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeye,
            x: 605,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: stellaeyestart1,
            callbackScope: this
        });

        function stellaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 602,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart2,
                callbackScope: this
            });
        }

        function stellaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 599,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: stellaeyestart3,
                callbackScope: this
            });
        }

        function stellaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 602,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart4,
                callbackScope: this
            });
        }

        function stellaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 605,
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



        dressgliter = this.add.sprite(630.85, 304.9, 'dressgliter').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'dressgliter',
            frames: this.anims.generateFrameNumbers('dressgliter', {
                start: 0,
                end: 32
            }),
            frameRate: 30,
        });
        dressgliter.setBlendMode(Phaser.BlendModes.ADD);
        dollgliter = this.add.sprite(630, 305, 'dollgliter');
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
                level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 370

            } else {
                level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 230
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
            x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 370,
            ease: 'Back.easeOut',
            duration: 700,
            onComplete: level6dressclickstart1,
            callbackScope: this
        });

    }

    function level6dressclickstart1() {
        level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 370
        game.scene.scenes[pageNo].tweens.add({
            targets: cupboardgroup,
            x: ((game.context.drawingBufferWidth / game.context.drawingBufferHeight) / 1.3) + (safeArea.x),
            ease: 'Linear',
            duration: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: rarrow,
            scaleX: -1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: larrow,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 500,
            delay: 500,
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
            sno = this.texture.key.substr(11)
            if (darr6[0] == parseInt(sno)) {
                stelladress.setFrame(0)
                darr6[0] = 0

            } else {
                darr6[0] = parseInt(sno)
                stelladress.setFrame(parseInt(sno))
            }
            btnvisFun()
        }


        for (i = 6; i >= 1; i--) {
            game['level6hair' + i].on('pointerover', etopOverFun)
            game['level6hair' + i].on('pointerout', etopOutFun)
            game['level6hair' + i].on('pointerdown', overFun)
        }

        function overFun(ev) {
            dressgliter.anims.load('dressgliter')
            dressgliter.anims.play('dressgliter')
            playsoundeffects('glitter')
            this.setScale(1)
            btnstart2 = true
            playsoundeffects('itemclick');
            sno = this.texture.key.substr(10)
            if (darr6[1] == parseInt(sno)) {
                stellabhair.setFrame(0)
                stellahair.setFrame(0)
                darr6[1] = 0
            } else {
                darr6[1] = parseInt(sno)
                stellabhair.setFrame(parseInt(sno))
                stellahair.setFrame(parseInt(sno))

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
            sno = this.texture.key.substr(11)

            if (darr6[2] == parseInt(sno)) {
                stellachain.setFrame(0)
                darr6[2] = 0
            } else {
                darr6[2] = parseInt(sno)
                stellachain.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(10)
            if (darr6[3] == parseInt(sno)) {
                stellastud.setFrame(0)
                darr6[3] = 0
            } else {
                darr6[3] = parseInt(sno)
                stellastud.setFrame(parseInt(sno))
            }
            btnvisFun()
        }
        for (i = 6; i >= 1; i--) {
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
            sno = this.texture.key.substr(9)
            if (darr6[4] == parseInt(sno)) {
                stellabag.setFrame(0)
                stellabbag.setFrame(0)
                darr6[4] = 0
            } else {
                darr6[4] = parseInt(sno)
                stellabag.setFrame(parseInt(sno))
                stellabbag.setFrame(parseInt(sno))
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
            sno = this.texture.key.substr(11)
            if (darr6[5] == parseInt(sno)) {
                stellaglass.setFrame(0)
                darr6[5] = 0
            } else {
                darr6[5] = parseInt(sno)
                stellaglass.setFrame(parseInt(sno))
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
            for (i = 1; i <= 5; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level6dress' + i].visible = true
            }
        } else if (game['level6dress' + 6].visible) {
            level6dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
                game['level6dress' + i].visible = true
            }
        }
    }
    rarrow.on('pointerdown', rarrowdownstart)

    function rarrowdownstart() {
        playsoundeffects('clickss')

        if (game['level6dress' + 1].visible) {
            level6dots.setFrame(1)
            for (i = 1; i <= 5; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 6; i <= 10; i++) {
                game['level6dress' + i].visible = true
            }
        } else if (game['level6dress' + 6].visible) {
            level6dots.setFrame(0)
            for (i = 6; i <= 10; i++) {
                game['level6dress' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
        level6dotspad.visible = false
        level6dots.visible = false
        level6dots.setFrame(0)

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
                game['level6bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level6bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
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
                game['level6bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6bag' + i].visible = true
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
                game['level6bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6glass' + i].visible = true
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
                game['level6bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 6; i++) {
                game['level6hair' + i].visible = true
            }
        } else if (parseInt(sno) == 6) {
            rarrow.visible = true
            larrow.visible = true
            level6dotspad.visible = true
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
                game['level6bag' + i].visible = false
            }
            for (i = 1; i <= 4; i++) {
                game['level6glass' + i].visible = false
            }
            for (i = 1; i <= 5; i++) {
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
            if (level == 6) {
                level = 7
            }
            darr6[0] = stelladress.frame.name
            darr6[1] = stellabhair.frame.name
            darr6[1] = stellahair.frame.name
            darr6[2] = stellachain.frame.name
            darr6[3] = stellastud.frame.name
            darr6[4] = stellabag.frame.name
            darr6[4] = stellabbag.frame.name
            darr6[5] = stellaglass.frame.name

            saveFile()

            fillbackground.visible = true
            cupboardgroup.visible = false
            done2.visible = false
            rarrow.visible = false
            larrow.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: level6grp,
                x: ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 230,
                ease: 'Back.easeOut',
                duration: 700,
                onComplete: doneclickstart1,
                callbackScope: this
            });
        }
    }

    function doneclickstart1() {
        level6grp.x = ((1.3 * (game.context.drawingBufferWidth / game.context.drawingBufferHeight)) + safeArea.x) - 230
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
        targets: stellablush,
        y: stellablush.y + 2,
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
            targets: stellablush,
            y: stellablush.y + 2,
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

        florabhair = this.add.sprite(288, 67, 'florabhair').setOrigin(0.5, 0)
        florabhair.x += parseFloat(florabhair.width / 2)
        florabody = this.add.sprite(293, 131, 'florabody').setOrigin(0, 0)
        florabbag = this.add.sprite(333, 185, 'florabbag').setOrigin(0, 0)
        florahead = this.add.sprite(345, 69, 'florahead').setOrigin(0, 0)
        floraebrow = this.add.sprite(348, 109, 'floraebrow').setOrigin(0, 0)
        floraeyetop = this.add.sprite(349, 110, 'floraeyetop').setOrigin(0, 0)
        floraeye = this.add.sprite(356, 120, 'floraeye').setOrigin(0, 0)
        floraeblink = this.add.sprite(343, 117, 'floraeblink').setOrigin(0, 0)
        florablush = this.add.sprite(350, 123, 'florablush').setOrigin(0, 0)
        floradress = this.add.sprite(283, 160, 'floradress').setOrigin(0, 0)
        florahdress = this.add.sprite(289, 153, 'florahdress').setOrigin(0, 0)
        florahair = this.add.sprite(301, 0, 'florahair').setOrigin(0, 0)
        florafhair = this.add.sprite(332, 109, 'florafhair').setOrigin(0, 0)
        florachain = this.add.sprite(365, 184, 'florachain').setOrigin(0, 0)
        florastud = this.add.sprite(364, 128, 'florastud').setOrigin(0, 0)
        florabag = this.add.sprite(321, 190, 'florabag').setOrigin(0, 0)
        florafbag = this.add.sprite(315, 180, 'florafbag').setOrigin(0, 0)
        floraglass = this.add.sprite(337, 113, 'floraglass').setOrigin(0, 0)
        florahand = this.add.sprite(299, 179, 'florahand').setOrigin(0, 0)

        level1grp = this.add.container()
        level1grp.add(florabhair)
        level1grp.add(florabbag)
        level1grp.add(florabody)
        level1grp.add(florahead)
        level1grp.add(floraeye)
        level1grp.add(floraeyetop)
        level1grp.add(floraebrow)

        level1grp.add(floraeblink)
        level1grp.add(florablush)
        level1grp.add(floradress)
        level1grp.add(florachain)
        level1grp.add(florabag)
        level1grp.add(florafbag)
        level1grp.add(florahair)
        level1grp.add(florastud)
        level1grp.add(floraglass)
        level1grp.add(florafhair)
        level1grp.add(florahand)
        level1grp.add(florahdress)

        level1grp.x = -800

        floraeblink.setFrame(esarr[0])

        floradress.setFrame(darr1[0])
        florahdress.setFrame(darr1[0])
        florabhair.setFrame(darr1[1])
        florafhair.setFrame(darr1[1])
        florahair.setFrame(darr1[1])
        florachain.setFrame(darr1[2])
        florastud.setFrame(darr1[3])
        florabag.setFrame(darr1[4])
        florabbag.setFrame(darr1[4])
        florafbag.setFrame(darr1[4])
        floraglass.setFrame(darr1[5])

        if (darr1[0] == 2) {
            florafbag.visible = true
        } else {
            florafbag.visible = false
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
            targets: floraebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: floraeye,
            x: 359,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: floraeyestart1,
            callbackScope: this
        });

        function floraeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 356,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart2,
                callbackScope: this
            });
        }

        function floraeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 353,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: floraeyestart3,
                callbackScope: this
            });
        }

        function floraeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 356,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: floraeyestart4,
                callbackScope: this
            });
        }

        function floraeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: floraebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: floraeye,
                x: 359,
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
            targets: florablush,
            y: florablush.y + 2,
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
                targets: florablush,
                y: florablush.y + 2,
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

        musabhair = this.add.sprite(108, 56, 'musabhair').setOrigin(0.5, 0)
        musabhair.x += parseFloat(musabhair.width / 2)
        musabody = this.add.sprite(84, 152, 'musabody').setOrigin(0, 0)
        musabbag = this.add.sprite(161, 181, 'musabbag').setOrigin(0, 0)
        musahead = this.add.sprite(160, 76, 'musahead').setOrigin(0, 0)
        musaebrow = this.add.sprite(168, 118, 'musaebrow').setOrigin(0, 0)
        musaeyetop = this.add.sprite(166, 119, 'musaeyetop').setOrigin(0, 0)
        musaeye = this.add.sprite(177, 128, 'musaeye').setOrigin(0, 0)
        musaeblink = this.add.sprite(166, 125, 'musaeblink').setOrigin(0, 0)
        musablush = this.add.sprite(171, 141, 'musablush').setOrigin(0, 0)
        musadress = this.add.sprite(46, 162, 'musadress').setOrigin(0, 0)
        musahdress = this.add.sprite(82, 197, 'musahdress').setOrigin(0, 0)
        musahair = this.add.sprite(108, 0, 'musahair').setOrigin(0, 0)
        musachain = this.add.sprite(176, 186, 'musachain').setOrigin(0, 0)
        musastud = this.add.sprite(150, 129, 'musastud').setOrigin(0, 0)
        musabag = this.add.sprite(220, 381, 'musabag').setOrigin(0, 0)
        musahbag = this.add.sprite(163, 182, 'musahbag').setOrigin(0, 0)
        musafbag = this.add.sprite(159, 184, 'musafbag').setOrigin(0, 0)
        musaglass = this.add.sprite(163, 118, 'musaglass').setOrigin(0, 0)
        musahand = this.add.sprite(115, 297, 'musahand').setOrigin(0, 0)

        level2grp = this.add.container()
        level2grp.add(musabhair)
        level2grp.add(musabbag)
        level2grp.add(musabody)
        level2grp.add(musahead)
        level2grp.add(musaeye)
        level2grp.add(musaeyetop)
        level2grp.add(musaebrow)

        level2grp.add(musaeblink)
        level2grp.add(musablush)
        level2grp.add(musadress)
        level2grp.add(musafbag)
        level2grp.add(musahbag)
        level2grp.add(musahand)
        level2grp.add(musabag)
        level2grp.add(musahdress)
        level2grp.add(musachain)
        level2grp.add(musahair)
        level2grp.add(musastud)
        level2grp.add(musaglass)

        level2grp.x = -800

        musaeblink.setFrame(esarr[0])

        musadress.setFrame(darr2[0])
        musahdress.setFrame(darr2[0])
        musabhair.setFrame(darr2[1])
        musahair.setFrame(darr2[1])
        musachain.setFrame(darr2[2])
        musastud.setFrame(darr2[3])
        musabag.setFrame(darr2[4])
        musabbag.setFrame(darr2[4])
        musahbag.setFrame(darr2[4])
        musafbag.setFrame(darr2[4])
        musaglass.setFrame(darr2[5])

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
            targets: musaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: musaeye,
            x: 180,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: musaeyestart1,
            callbackScope: this
        });

        function musaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart2,
                callbackScope: this
            });
        }

        function musaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 174,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: musaeyestart3,
                callbackScope: this
            });
        }

        function musaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 177,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: musaeyestart4,
                callbackScope: this
            });
        }

        function musaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: musaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: musaeye,
                x: 180,
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
            targets: musablush,
            y: musablush.y + 2,
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
                delay: 5700,
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
                targets: musablush,
                y: musablush.y + 2,
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
                    delay: 5700,
                    callback: musaheadanimation1,
                    callbackScope: this
                })
            }

        }

        aishabhair = this.add.sprite(521, 51, 'aishabhair').setOrigin(0.5, 0)
        aishabhair.x += parseFloat(aishabhair.width / 2)
        aishabody = this.add.sprite(503, 136, 'aishabody').setOrigin(0, 0)
        aishabbag = this.add.sprite(538, 179, 'aishabbag').setOrigin(0, 0)
        aishahead = this.add.sprite(578, 74, 'aishahead').setOrigin(0, 0)
        aishaebrow = this.add.sprite(579, 113, 'aishaebrow').setOrigin(0, 0)
        aishaeyetop = this.add.sprite(580, 119, 'aishaeyetop').setOrigin(0, 0)
        aishaeye = this.add.sprite(588, 125, 'aishaeye').setOrigin(0, 0)
        aishaeblink = this.add.sprite(576, 120, 'aishaeblink').setOrigin(0, 0)
        aishablush = this.add.sprite(578, 135, 'aishablush').setOrigin(0, 0)
        aishadress = this.add.sprite(475, 153, 'aishadress').setOrigin(0, 0)
        aishahdress = this.add.sprite(508, 180, 'aishahdress').setOrigin(0, 0)
        aishahair = this.add.sprite(539, 11, 'aishahair').setOrigin(0, 0)
        aishachain = this.add.sprite(594, 183, 'aishachain').setOrigin(0, 0)
        aishastud = this.add.sprite(578, 133, 'aishastud').setOrigin(0, 0)
        aishabag = this.add.sprite(520, 181, 'aishabag').setOrigin(0, 0)
        aishaglass = this.add.sprite(569, 116, 'aishaglass').setOrigin(0, 0)
        aishahand = this.add.sprite(572, 298, 'aishahand').setOrigin(0, 0)

        level3grp = this.add.container()
        level3grp.add(aishabhair)
        level3grp.add(aishabbag)
        level3grp.add(aishabody)
        level3grp.add(aishahead)
        level3grp.add(aishaeye)
        level3grp.add(aishaeyetop)
        level3grp.add(aishaebrow)

        level3grp.add(aishaeblink)
        level3grp.add(aishablush)
        level3grp.add(aishadress)
        level3grp.add(aishabag)
        level3grp.add(aishahand)
        level3grp.add(aishahdress)
        level3grp.add(aishachain)
        level3grp.add(aishahair)
        level3grp.add(aishastud)
        level3grp.add(aishaglass)

        level3grp.x = -800

        aishaeblink.setFrame(esarr[0])

        aishadress.setFrame(darr3[0])
        aishahdress.setFrame(darr3[0])
        aishabhair.setFrame(darr3[1])
        aishahair.setFrame(darr3[1])
        aishachain.setFrame(darr3[2])
        aishastud.setFrame(darr3[3])
        aishabag.setFrame(darr3[4])
        aishabbag.setFrame(darr3[4])
        aishaglass.setFrame(darr3[5])

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
            targets: aishaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: aishaeye,
            x: 591,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: aishaeyestart1,
            callbackScope: this
        });

        function aishaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 588,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart2,
                callbackScope: this
            });
        }

        function aishaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 585,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: aishaeyestart3,
                callbackScope: this
            });
        }

        function aishaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 588,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: aishaeyestart4,
                callbackScope: this
            });
        }

        function aishaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: aishaeye,
                x: 591,
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
            targets: aishablush,
            y: aishablush.y + 2,
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
                targets: aishablush,
                y: aishablush.y + 2,
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

        bloombhair = this.add.sprite(296, 66, 'bloombhair').setOrigin(0.5, 0)
        bloombhair.x += parseFloat(bloombhair.width / 2)
        bloombody = this.add.sprite(276, 157, 'bloombody').setOrigin(0, 0)
        bloombbag = this.add.sprite(279, 193, 'bloombbag').setOrigin(0, 0)
        bloomhead = this.add.sprite(356, 76, 'bloomhead').setOrigin(0, 0)
        bloomebrow = this.add.sprite(367, 122, 'bloomebrow').setOrigin(0, 0)
        bloomeyetop = this.add.sprite(362, 125, 'bloomeyetop').setOrigin(0, 0)
        bloomeye = this.add.sprite(372, 131, 'bloomeye').setOrigin(0, 0)
        bloomeblink = this.add.sprite(362, 129, 'bloomeblink').setOrigin(0, 0)
        bloomblush = this.add.sprite(363, 143, 'bloomblush').setOrigin(0, 0)
        bloomdress = this.add.sprite(281, 162, 'bloomdress').setOrigin(0, 0)
        bloomhdress = this.add.sprite(290, 305, 'bloomhdress').setOrigin(0, 0)
        bloomhair = this.add.sprite(300, 6, 'bloomhair').setOrigin(0, 0)
        bloomchain = this.add.sprite(370, 194, 'bloomchain').setOrigin(0, 0)
        bloomstud = this.add.sprite(354, 143, 'bloomstud').setOrigin(0, 0)
        bloombag = this.add.sprite(228, 398, 'bloombag').setOrigin(0, 0)
        bloomhbag = this.add.sprite(281, 190, 'bloomhbag').setOrigin(0, 0)
        bloomglass = this.add.sprite(357, 121, 'bloomglass').setOrigin(0, 0)
        bloomhand = this.add.sprite(284, 314, 'bloomhand').setOrigin(0, 0)

        level4grp = this.add.container()
        level4grp.add(bloombhair)
        level4grp.add(bloombbag)
        level4grp.add(bloombody)
        level4grp.add(bloomhead)
        level4grp.add(bloomeye)
        level4grp.add(bloomeyetop)
        level4grp.add(bloomebrow)

        level4grp.add(bloomeblink)
        level4grp.add(bloomblush)
        level4grp.add(bloomdress)
        level4grp.add(bloomhbag)
        level4grp.add(bloomhand)
        level4grp.add(bloombag)
        level4grp.add(bloomhdress)
        level4grp.add(bloomchain)
        level4grp.add(bloomhair)
        level4grp.add(bloomstud)
        level4grp.add(bloomglass)

        level4grp.x = -800

        bloomeblink.setFrame(esarr[0])

        bloomdress.setFrame(darr4[0])
        bloomhdress.setFrame(darr4[0])
        bloombhair.setFrame(darr4[1])
        bloomhair.setFrame(darr4[1])
        bloomchain.setFrame(darr4[2])
        bloomstud.setFrame(darr4[3])
        bloombag.setFrame(darr4[4])
        bloombbag.setFrame(darr4[4])
        bloomhbag.setFrame(darr4[4])
        bloomglass.setFrame(darr4[5])

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
            targets: bloomebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: bloomeye,
            x: 375,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: bloomeyestart1,
            callbackScope: this
        });

        function bloomeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 372,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart2,
                callbackScope: this
            });
        }

        function bloomeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 369,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: bloomeyestart3,
                callbackScope: this
            });
        }

        function bloomeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 372,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: bloomeyestart4,
                callbackScope: this
            });
        }

        function bloomeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: bloomeye,
                x: 375,
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
            targets: bloomblush,
            y: bloomblush.y + 2,
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
                delay: 4300,
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
                targets: bloomblush,
                y: bloomblush.y + 2,
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
                    delay: 4300,
                    callback: bloomheadanimation1,
                    callbackScope: this
                })
            }

        }

        tecnabhair = this.add.sprite(73, 83, 'tecnabhair').setOrigin(0.5, 0)
        tecnabhair.x += parseFloat(tecnabhair.width / 2)
        tecnabody = this.add.sprite(57, 149, 'tecnabody').setOrigin(0, 0)
        tecnabbag = this.add.sprite(45, 180, 'tecnabbag').setOrigin(0, 0)
        tecnahead = this.add.sprite(124, 74, 'tecnahead').setOrigin(0, 0)
        tecnaebrow = this.add.sprite(126, 117, 'tecnaebrow').setOrigin(0, 0)
        tecnaeyetop = this.add.sprite(126, 122, 'tecnaeyetop').setOrigin(0, 0)
        tecnaeye = this.add.sprite(133, 128, 'tecnaeye').setOrigin(0, 0)
        tecnaeblink = this.add.sprite(119, 122, 'tecnaeblink').setOrigin(0, 0)
        tecnablush = this.add.sprite(126, 140, 'tecnablush').setOrigin(0, 0)
        tecnadress = this.add.sprite(32, 169, 'tecnadress').setOrigin(0, 0)
        tecnahdress = this.add.sprite(177, 181, 'tecnahdress').setOrigin(0, 0)
        tecnabdress = this.add.sprite(40, 169, 'tecnabdress').setOrigin(0, 0)
        tecnahair = this.add.sprite(101, 29, 'tecnahair').setOrigin(0, 0)
        tecnachain = this.add.sprite(138, 183, 'tecnachain').setOrigin(0, 0)
        tecnastud = this.add.sprite(115, 141, 'tecnastud').setOrigin(0, 0)
        tecnabag = this.add.sprite(71, 183, 'tecnabag').setOrigin(0, 0)
        tecnahbag = this.add.sprite(204, 322, 'tecnahbag').setOrigin(0, 0)
        tecnaglass = this.add.sprite(113, 122, 'tecnaglass').setOrigin(0, 0)
        tecnahand = this.add.sprite(164, 294, 'tecnahand').setOrigin(0, 0)

        level5grp = this.add.container()
        level5grp.add(tecnabhair)
        level5grp.add(tecnabbag)
        level5grp.add(tecnabdress)
        level5grp.add(tecnabody)
        level5grp.add(tecnahead)
        level5grp.add(tecnaeye)
        level5grp.add(tecnaeyetop)
        level5grp.add(tecnaebrow)

        level5grp.add(tecnaeblink)
        level5grp.add(tecnablush)
        level5grp.add(tecnadress)
        level5grp.add(tecnahbag)
        level5grp.add(tecnahand)
        level5grp.add(tecnabag)
        level5grp.add(tecnahdress)
        level5grp.add(tecnachain)
        level5grp.add(tecnahair)
        level5grp.add(tecnastud)
        level5grp.add(tecnaglass)

        level5grp.x = -800

        tecnaeblink.setFrame(esarr[0])

        tecnadress.setFrame(darr5[0])
        tecnahdress.setFrame(darr5[0])
        tecnabdress.setFrame(darr5[0])
        tecnabhair.setFrame(darr5[1])
        tecnahair.setFrame(darr5[1])
        tecnachain.setFrame(darr5[2])
        tecnastud.setFrame(darr5[3])
        tecnabag.setFrame(darr5[4])
        tecnabbag.setFrame(darr5[4])
        tecnahbag.setFrame(darr5[4])
        tecnaglass.setFrame(darr5[5])

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
            targets: tecnaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: tecnaeye,
            x: 136,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: tecnaeyestart1,
            callbackScope: this
        });

        function tecnaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 133,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart2,
                callbackScope: this
            });
        }

        function tecnaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 130,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: tecnaeyestart3,
                callbackScope: this
            });
        }

        function tecnaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 133,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: tecnaeyestart4,
                callbackScope: this
            });
        }

        function tecnaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: tecnaeye,
                x: 136,
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
            targets: tecnablush,
            y: tecnablush.y + 2,
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
                targets: tecnablush,
                y: tecnablush.y + 2,
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


        stellabhair = this.add.sprite(530, 56, 'stellabhair').setOrigin(0.5, 0)
        stellabhair.x += parseFloat(stellabhair.width / 2)
        stellabody = this.add.sprite(472, 155, 'stellabody').setOrigin(0, 0)
        stellabbag = this.add.sprite(454, 196, 'stellabbag').setOrigin(0, 0)
        stellahead = this.add.sprite(584, 78, 'stellahead').setOrigin(0, 0)
        stellaebrow = this.add.sprite(594, 124, 'stellaebrow').setOrigin(0, 0)
        stellaeyetop = this.add.sprite(590, 128, 'stellaeyetop').setOrigin(0, 0)
        stellaeye = this.add.sprite(602, 134, 'stellaeye').setOrigin(0, 0)
        stellaeblink = this.add.sprite(593, 132, 'stellaeblink').setOrigin(0, 0)
        stellablush = this.add.sprite(594, 148, 'stellablush').setOrigin(0, 0)
        stelladress = this.add.sprite(507, 173, 'stelladress').setOrigin(0, 0)
        stellafhair = this.add.sprite(578, 114, 'stellafhair').setOrigin(0, 0)
        stellahair = this.add.sprite(533, 29, 'stellahair').setOrigin(0, 0)
        stellachain = this.add.sprite(596, 192, 'stellachain').setOrigin(0, 0)
        stellastud = this.add.sprite(574, 147, 'stellastud').setOrigin(0, 0)
        stellabag = this.add.sprite(502, 191, 'stellabag').setOrigin(0, 0)
        stellaglass = this.add.sprite(587, 125, 'stellaglass').setOrigin(0, 0)
        stellahand = this.add.sprite(708, 191, 'stellahand').setOrigin(0, 0)

        level6grp = this.add.container()
        level6grp.add(stellabhair)
        level6grp.add(stellabbag)
        level6grp.add(stellabody)
        level6grp.add(stellahead)
        level6grp.add(stellaeye)
        level6grp.add(stellaeyetop)
        level6grp.add(stellaebrow)

        level6grp.add(stellaeblink)
        level6grp.add(stellablush)
        level6grp.add(stelladress)
        level6grp.add(stellahand)
        level6grp.add(stellabag)
        level6grp.add(stellachain)
        level6grp.add(stellahair)
        level6grp.add(stellastud)
        level6grp.add(stellaglass)

        level6grp.x = -800

        stellaeblink.setFrame(esarr[0])

        stelladress.setFrame(darr6[0])
        stellabhair.setFrame(darr6[1])
        stellahair.setFrame(darr6[1])
        stellachain.setFrame(darr6[2])
        stellastud.setFrame(darr6[3])
        stellabag.setFrame(darr6[4])
        stellabbag.setFrame(darr6[4])
        stellaglass.setFrame(darr6[5])

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
            targets: stellaebrow,
            angle: -2,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: stellaeye,
            x: 605,
            ease: 'Linear',
            duration: 500,
            delay: 4000,
            onComplete: stellaeyestart1,
            callbackScope: this
        });

        function stellaeyestart1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 602,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart2,
                callbackScope: this
            });
        }

        function stellaeyestart2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 599,
                ease: 'Linear',
                duration: 500,
                delay: 5000,
                onComplete: stellaeyestart3,
                callbackScope: this
            });
        }

        function stellaeyestart3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: 0,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 602,
                ease: 'Linear',
                duration: 500,
                delay: 2000,
                onComplete: stellaeyestart4,
                callbackScope: this
            });
        }

        function stellaeyestart4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaebrow,
                angle: -2,
                ease: 'Linear',
                duration: 500,
                delay: 4000,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: stellaeye,
                x: 605,
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
            targets: stellablush,
            y: stellablush.y + 2,
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
                targets: stellablush,
                y: stellablush.y + 2,
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
        level2grp.x = -50
        level3grp.x = 10
        level4grp.x = 0
        level5grp.x = -10
        level6grp.x = 10

        enddollcontainer = this.add.container()
        enddollcontainer.add(level1grp)
        enddollcontainer.add(level3grp)
        enddollcontainer.add(level5grp)
        enddollcontainer.add(level2grp)
        enddollcontainer.add(level4grp)
        enddollcontainer.add(level6grp)

        enddollcontainer.x = -1200

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
        replay2.x = game.context.drawingBufferWidth - 61.6
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
            endbackground.x = safeArea.x - 300

            replay2.x = game.context.drawingBufferWidth - 61.6

            level1grp.x = 0
            level2grp.x = -50
            level3grp.x = 10
            level4grp.x = 0
            level5grp.x = -10
            level6grp.x = 10

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
            saveFile()
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
