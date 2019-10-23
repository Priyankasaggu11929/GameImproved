var QuizGame = QuizGame || {};
QuizGame.Support = function () {
}


QuizGame.Support.prototype = {
    init: function () {
        // this.categoryIndex = 0;
        // this.currentQuestionIndex = 0;
        // this.scores = 0;
    },
    preload: function () {
    },
    create: function () {

        // var dash_sound = this.game.add.audio('dashboard');
        // dash_sound.play();
        // btn5 = this.game.add.audio('btn-click');

        this.game.stage.backgroundColor = '#f4bf42';
        
        var rectCanvas = QuizGame.Utils.getRectCanvas();
        var quiz_play = this.game.add.sprite(960,600, 'quiz-play');
        quiz_play.alignIn(rectCanvas,Phaser.CENTER);
        var faq_img = this.game.add.image(0,0, 'faq');
        faq_img.alignIn(rectCanvas,Phaser.CENTER,0,50);

        var back_btn = this.game.add.button(0, 0, 'back-btn', this.actionOnClick,this,2,1,0);
        
        // var data = this.game.cache.getJSON('questions');
        // this.remainingLives = data.lives;
        var intoGroup = this.game.add.group();
        //var buttonsGroup = this.createButtons();
        var textGroup = this.createTextHeaders();
        //buttonsGroup.alignTo(textGroup,Phaser.BOTTOM_CENTER);
        //intoGroup.add(buttonsGroup)
        intoGroup.add(textGroup);
        intoGroup.add(back_btn);
        back_btn.alignTo(textGroup,Phaser.BOTTOM_CENTER);
        intoGroup.alignIn(rectCanvas,Phaser.TOP_CENTER);
    },
    createTextHeaders:function(){
        var previous;
        var texts = ['Help & Support'];
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
        style.fontSize = '28pt';
        style.backgroundColor = '#000000';
        style.fill= '#ffffff';
        return this.game.add.text(0,0,textContent, style);
    },
    getStyleCategory:function(){
        return { 
            font: "38pt Arial", fill: "#000000", wordWrap: false,  align: "left", backgroundColor:'#FFFFFF' };
    },
    actionOnClick:function(){
        this.state.start('loadgame');
    }
}
