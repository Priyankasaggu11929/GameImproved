var QuizGame = QuizGame || {};

QuizGame.LoadingState = function () {
}

QuizGame.LoadingState.prototype = {

    init: function () {
    // keep crispy-looking pixels
    this.game.renderer.renderSession.roundPixels = true;
    },

    preload: function () {
    // this.game.load.json('level:0', 'data/level00.json');
    // this.game.load.json('level:1', 'data/level01.json');
    // this.game.load.json('level:2', 'data/level02.json');
    // this.game.load.json('level:3', 'data/level03.json');
    // this.game.load.json('level:4', 'data/level04.json');
    // this.game.load.json('level:5', 'data/level05.json');
    // this.game.load.json('level:6', 'data/level06.json');
    // this.game.load.json('level:7', 'data/level07.json');
    // this.game.load.json('level:8', 'data/level08.json');



    // this.game.load.image('font:numbers', 'images/numbers.png');

    // this.game.load.image('icon:coin', 'images/coin_icon.png');
    // this.game.load.image('background', 'assets/feat/new-background.png');
    // this.game.load.image('invisible-wall', 'images/invisible_wall.png');
    // this.game.load.image('ground', 'images/ground.png');
    // this.game.load.image('grass:8x1', 'images/grass_8x1.png');
    // this.game.load.image('grass:6x1', 'images/grass_6x1.png');
    // this.game.load.image('grass:4x1', 'images/grass_4x1.png');
    // this.game.load.image('grass:2x1', 'images/grass_2x1.png');
    // this.game.load.image('grass:1x1', 'images/grass_1x1.png');
    // this.game.load.image('key', 'images/key.png');

    // this.game.load.spritesheet('decoration', 'images/decor.png', 42, 42);
    // this.game.load.spritesheet('hero', 'images/hero.png', 36, 42);
    // this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
    // this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);
    // this.game.load.spritesheet('door', 'images/door.png', 42, 66);
    // this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);
    // this.game.load.spritesheet('icon:life', 'images/life.png', 34, 30);

    // this.game.load.spritesheet('buttonvertical', 'images/button-vertical.png',64,64);
    // this.game.load.spritesheet('buttonhorizontal', 'images/button-horizontal.png',96,64);
    // this.game.load.spritesheet('buttonjump', 'images/button-round-b.png',96,96);


    // this.game.load.audio('sfx:jump', 'audio/jump.wav');
    // this.game.load.audio('sfx:coin', 'audio/coin.wav');
    // this.game.load.audio('sfx:key', 'audio/key.wav');
    // this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
    // this.game.load.audio('sfx:door', 'audio/door.wav');
    // this.game.load.audio('bgm', ['audio/bgm.mp3', 'audio/bgm.ogg']);
    },

    create: function () {
    this.lifeCount = 3;
    this.game.state.start('play', true, false, {level: 0},this.lifeCount);
     const Toast = Swal.mixin({
                         toast: true,
                          position: 'top',
                          showConfirmButton: false,
                          timer: 3000
                        });

                Toast.fire({
                  type: 'info',
                  title: 'Level 1'
                })

    }
}
