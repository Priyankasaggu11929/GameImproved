var QuizGame = QuizGame || {};
QuizGame.PreLoader = function () {
}

playSound = true,
playMusic = true,
//music;

// var video;
QuizGame.PreLoader.prototype = {
    loadScripts: function () {
        this.game.load.script('WebFont', 'vendor/webfontloader.js');
        // game.load.script('gamemenu','states/gamemenu.js');
        // game.load.script('thegame', 'states/thegame.js');
        // game.load.script('gameover','states/gameover.js');
        // game.load.script('credits', 'states/credits.js');
        // game.load.script('options', 'states/options.js');
    }, 
    loadBgm: function () {
        // thanks Kevin Macleod at http://incompetech.com/
        // game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        // game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },
    loadImages: function () {
        // game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
        // game.load.image('options-bg', 'assets/images/options-bg.jpg');
        // game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
    },
    loadFonts: function () {
        WebFontConfig = {
          custom: {
            families: ['TheMinion'],
            urls: ['assets/style/theminion.css']
          }
        }
    },    
    init: function () {
        this.categoryIndex = 0;
        this.currentQuestionIndex = 0;
        this.scores = 0;

        //////////// loader init //////////////////
        this.loadingBar = this.game.make.sprite(this.game.world.centerX-(387/2), 400, "loading");
        this.logo       = this.game.make.sprite(this.game.world.centerX, 200, 'logo');
        this.status     = this.game.make.text(this.game.world.centerX, 380, 'Loading...', {fill: 'white'});
        QuizGame.Utils.centerGameObjects([this.logo, this.status]);
    },
    preload: function () {
        ////////////////////////////////////////////////////////
        this.game.add.sprite(0, 0, 'quiz-play');
        this.game.add.existing(this.logo).scale.setTo(0.5);
        this.game.add.existing(this.loadingBar);
        this.game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
        ////////////////////////////////////////////////////////

        this.load.video('load', 'assets/feat/load.mp4');
        this.load.spritesheet('buttonCategory_1', 'assets/buttonCategory_1.png', 180, 40);
        this.load.spritesheet('buttonCategory_2', 'assets/buttonCategory_2.png', 180, 40);
        this.load.spritesheet('buttonCategory_3', 'assets/buttonCategory_3.png', 180, 40);
        this.load.pack('images_questions', 'assets/images-pack.json', null, this);
        this.load.image('button', 'assets/button.png');
        
        //this.load.image('gameOver', 'assets/GameOver.jpg');
        this.load.image('buttonNext', 'assets/feat/arrow-button.png');
        this.load.image('exitButton', 'assets/exit.png');

        // my_assets
        this.load.image('contribute', 'assets/feat/octocat.png');
        this.load.image('game-over-image', 'assets/feat/game-over.png');
        this.load.image('timeup-img', 'assets/feat/timeup.png');
        this.load.image('intro-img', 'assets/feat/intro-image.png');
        this.load.image('back-btn', 'assets/feat/back.png');
        this.load.image('power', 'assets/feat/power.png');
        this.load.image('support', 'assets/feat/support.png');
        this.load.image('about', 'assets/feat/about.png');
        this.load.image('location', 'assets/feat/location.png');
        this.load.image('win', 'assets/feat/winner.png');
        this.load.image('team', 'assets/feat/team.png');
        this.load.image('faq', 'assets/feat/faq.png');
        this.load.image('home', 'assets/feat/home.png');
        this.load.image('restart', 'assets/feat/restart.png');
        this.load.image('donate', 'assets/feat/donate.png');
        this.load.image('menu', 'assets/feat/menu.png');
        this.load.image('contact', 'assets/feat/contact.png');

        // background
        this.game.load.image('quiz-time', 'assets/feat/quiz-time.png');
        // quiz-background
        //this.game.load.image('quiz-play', 'assets/feat/starfield.jpg');
        this.game.load.image('play-btn','assets/feat/play.png');

        this.load.image('heart', 'assets/heart.png');
        this.load.image('right', 'assets/feat/right.png');
        this.load.image('wrong', 'assets/feat/wrong.png');
        this.load.json('questions', location.origin + '/data/questions.json');
        
        // this.load.audio('mario_lose', "assets/audios/sm64_mario_hurt.wav");
        // this.load.audio('mario_haha', "assets/audios/sm64_mario_haha.wav");
        // this.load.audio('game_over', "assets/audios/sm64_game_over.wav");
        
        this.load.audio('yippee', "assets/audios/sm64_mario_yippee.wav");

        // my audio
        this.load.audio('correct', "assets/audios/Correct-Answer.wav");
        this.load.audio('wrong', "assets/audios/Wrong-Answer.wav");
        this.load.audio('gameover', "assets/audios/Game-Over.wav");
        this.load.audio('thank-you',"assets/audios/thank_you.wav");

        // background music
        this.load.audio('bgmusic', "assets/feat/bg-music.wav");
        this.load.audio('alert-music', "assets/feat/alert.mp3");
        // timeup bell
        this.load.audio('timeup', "assets/feat/timeup.wav");
        this.load.audio('preloading', "assets/feat/preloading.mp3");
        this.load.audio('dashboard', "assets/feat/dashboard.mp3");
        this.load.audio('btn-click', "assets/feat/button-click.mp3");


        /*========================================================*/
        /*================ Platform Game Assets ==================*/
        /*========================================================*/

        // this.game.load.json('level:0', 'data/level00.json');
        // this.game.load.json('level:1', 'data/level01.json');
        this.game.load.json('level:0', 'data/level00.json');
        this.game.load.json('level:1', 'data/level01.json');
        this.game.load.json('level:2', 'data/level02.json');
        this.game.load.json('level:3', 'data/level03.json');
        this.game.load.json('level:4', 'data/level04.json');
        this.game.load.json('level:5', 'data/level05.json');
        this.game.load.json('level:6', 'data/level06.json');
        this.game.load.json('level:7', 'data/level07.json');
        this.game.load.json('level:8', 'data/level08.json');

        this.game.load.image('font:numbers', 'images/numbers.png');

        this.game.load.image('icon:coin', 'images/coin_icon.png');
        this.game.load.image('background', 'assets/feat/new-background.png');
        this.game.load.image('invisible-wall', 'images/invisible_wall.png');
        this.game.load.image('ground', 'images/ground.png');
        this.game.load.image('grass:8x1', 'images/grass_8x1.png');
        this.game.load.image('grass:6x1', 'images/grass_6x1.png');
        this.game.load.image('grass:4x1', 'images/grass_4x1.png');
        this.game.load.image('grass:2x1', 'images/grass_2x1.png');
        this.game.load.image('grass:1x1', 'images/grass_1x1.png');
        this.game.load.image('key', 'images/key.png');
        this.game.load.spritesheet('decoration', 'images/decor.png', 42, 42);
        this.game.load.spritesheet('hero', 'images/hero.png', 36, 42);
        this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
        this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);
        this.game.load.spritesheet('door', 'images/door.png', 42, 66);
        this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);
        this.game.load.spritesheet('icon:life', 'images/life.png', 34, 30);

        this.game.load.spritesheet('buttonvertical', 'images/button-vertical.png',64,64);
        this.game.load.spritesheet('buttonhorizontal', 'images/button-horizontal.png',96,64);
        this.game.load.spritesheet('buttonjump', 'images/button-round-b.png',96,96);

        this.game.load.audio('sfx:jump', 'audio/jump.wav');
        this.game.load.audio('sfx:coin', 'audio/coin.wav');
        this.game.load.audio('sfx:key', 'audio/key.wav');
        this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
        this.game.load.audio('sfx:door', 'audio/door.wav');
        this.game.load.audio('bgm', ['audio/bgm.mp3', 'audio/bgm.ogg']);

    },
    create: function () {
        this.status.setText('Ready!');
        //this.addGameStates();
        //this.addGameMusic();
        var that = this;
        setTimeout(function () {
            that.game.state.start('loadgame');
        }, 1000);
        /*********************Traditional**************************/
        ///////////////////////////////////////////////////////////
        // video = this.game.add.video('load');

        // video.play(true);

        // //  x, y, anchor x, anchor y, scale x, scale y
        // video.addToWorld();

        // var preload_sound = this.game.add.audio('preloading');
        // preload_sound.play();

        // this.game.stage.backgroundColor = '#ffffff';
        
        // var rectCanvas = QuizGame.Utils.getRectCanvas();
        // this.actionOnClick();
        /////////////////////////////////////////////////////////
        /*******************************************************/
        this.game.stage.backgroundColor = '#f4bf42';
        //this.game.add.sprite(0, 0, 'quiz-time');

        this.mario_lose_audioSound = this.add.audio('wrong');
        this.mario_hahaSound = this.add.audio('correct');
        this.game_overSound = this.add.audio('gameover');

        this.yippeeSound = this.add.audio('yippee');
        //this.actionOnClick();
    },
    actionOnClick:function(){
        var me = this;
        setTimeout(function(){
            me.state.start('home');
        },5700);
    }
}