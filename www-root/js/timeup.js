var QuizGame = QuizGame || {};
QuizGame.TimeUp = function () {
}
var btn4;

QuizGame.TimeUp.prototype = {
    init: function () {
        // this.categoryIndex = 0;
        // this.currentQuestionIndex = 0;
        // this.scores = 0;
    },
    preload: function () {
        // this.load.spritesheet('buttonCategory_1', 'assets/buttonCategory_1.png', 180, 40);
        // this.load.spritesheet('buttonCategory_2', 'assets/buttonCategory_2.png', 180, 40);
        // this.load.spritesheet('buttonCategory_3', 'assets/buttonCategory_3.png', 180, 40);
        
        // this.load.pack('images_questions', 'assets/images-pack.json', null, this);
        // this.load.image('button', 'assets/button.png');
        // background
        // this.game.load.image('einstein', 'assets/feat/ra_einstein.png');
        
        // this.load.image('win', 'assets/win.jpg');
        // this.load.image('gameOver', 'assets/GameOver.jpg');
        // this.load.image('buttonNext', 'assets/buttonNext.png');
        // this.load.image('exitButton', 'assets/exit.png');

        // this.load.image('heart', 'assets/heart.png');
        // this.load.image('right', 'assets/right.png');
        // this.load.image('wrong', 'assets/wrong.png');
        // this.load.json('questions', location.origin + '/data/questions.json');
        // this.load.audio('mario_lose', "assets/audios/sm64_mario_hurt.wav");
        // this.load.audio('mario_haha', "assets/audios/sm64_mario_haha.wav");
        // this.load.audio('game_over', "assets/audios/sm64_game_over.wav");
        // this.load.audio('yippee', "assets/audios/sm64_mario_yippee.wav");
    },
    create: function () {
        var rectCanvas = QuizGame.Utils.getRectCanvas();
        var quiz_play = this.game.add.sprite(960,600, 'quiz-play');
        quiz_play.alignIn(rectCanvas,Phaser.CENTER);
        var timeup_img = this.game.add.sprite(0,0,'timeup-img');
        timeup_img.alignIn(rectCanvas,Phaser.CENTER);

        btn4 = this.game.add.audio('btn-click');
        
        var timeup = this.game.add.audio('timeup');
        timeup.play();
        this.game.stage.backgroundColor = '#f4bf42';

        var startAgain_btn = this.game.add.button(600, 520, 'buttonNext', this.actionOnClick,this,2,1,0);
        
        // var data = this.game.cache.getJSON('questions');
        // this.remainingLives = data.lives;
        var intoGroup = this.game.add.group();
        //var buttonsGroup = this.createButtons();
        var textGroup = this.createTextHeaders();
        //buttonsGroup.alignTo(textGroup,Phaser.BOTTOM_CENTER);
        //intoGroup.add(buttonsGroup)
        intoGroup.add(textGroup);
        intoGroup.alignIn(rectCanvas,Phaser.BOTTOM_CENTER);
        
        /*
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;
        */

        // this.mario_lose_audioSound = this.add.audio('mario_lose');
        // this.mario_hahaSound = this.add.audio('mario_haha');
        // this.game_overSound = this.add.audio('game_over');
        // this.yippeeSound = this.add.audio('yippee');
        // this.state.start('intro');
    },
    // createButtons:function(){
    //     this.previousButton = null;
    //     this.groupButtons = this.game.add.group();
    //     this.createButtonCategory(0);
    //     this.createButtonCategory(1);
    //     this.createButtonCategory(2);
    //     return this.groupButtons;
    // },
    // createButtonCategory: function (index) {
    //     var key = 'buttonCategory_' + (index + 1);
    //     var context = { category: index, game:this.game,remainingLives:this.remainingLives};
    //     var button = this.game.add.button(0, 0, key, this.onButtonCategoryClicked, context, 2, 1, 0);
    //     if (this.previousButton) {
    //         button.alignTo(this.previousButton, Phaser.RIGHT_CENTER, 16);
    //     }
    //     this.previousButton = button;
    //     this.groupButtons.add(button);
    // },
    // onButtonCategoryClicked: function () {
    //     this.game.state.start('question',true,false,this.category,0,this.remainingLives,0);
    // },
    createTextHeaders:function(){
        var previous;
        var texts = ['Time Up!!'];
        var group = this.game.add.group();
        var that = this;
        texts.forEach( function(text){
            var textEl = that.createText(text);
            if(previous){
                textEl.alignTo(previous,Phaser.BOTTOM_CENTER);
            }
            previous = textEl;
            group.add(textEl);
        });
        return group;
    },
    createText:function(textContent){
        var style = this.getStyleCategory();
        style.font = 'Audiowide';
        style.fontSize = '48pt';
        style.backgroundColor = '#000000';
        style.fill= '#ffffff';
        return this.game.add.text(0,0,textContent, style);
    },
    getStyleCategory:function(){
        return { 
            font: "38pt Arial", fill: "#000000", wordWrap: false,  align: "left", backgroundColor:'#FFFFFF' };
    },
    actionOnClick:function(){
        btn4.play();
        this.state.start('options');
    }
}
