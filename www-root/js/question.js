var QuizGame = QuizGame || {};
QuizGame.Question = function () {
}
var bgmusic;
var alert_music;

// temp variable for alert music hack
var temp = 0;

QuizGame.Question.prototype = {
    init:function(category,currentQuestionIndex,remainingLives,score){
        this.categoryIndexSelected = category;
        this.currentQuestionIndex = currentQuestionIndex;
        this.remainingLives = remainingLives;
        this.score = score;
    },
    preload:function(){

    },
    create:function(){
        this.rectCanvas = QuizGame.Utils.getRectCanvas();
        var quiz_play = this.game.add.sprite(window.innerWidth,window.innerHeight, 'quiz-play');
        quiz_play.alignIn(this.rectCanvas,Phaser.CENTER);
        // timer 
        var me = this;

        me.startTime = new Date();
        me.totalTime = 60;
        me.timeElapsed = 0;

        me.createTimer();

        me.gameTimer = this.game.time.events.loop(100, function(){
            me.updateTimer();
        });

        // background music
        bgmusic = this.game.add.audio('bgmusic');
        bgmusic.loopFull();
        alert_music = this.game.add.audio('alert-music');
        
        
        this.marioWinSound = this.game.add.audio('correct');
        this.marioLoseSound = this.game.add.audio('wrong');
        
        var data = this.game.cache.getJSON('questions');
        this.data = data;
        this.totalLives = data.lives;

        var imageQuestion = this.showImageQuestion(this.categoryIndexSelected,this.currentQuestionIndex);
        this.livesGroups = this.showLives(this.remainingLives);
        var questionItem = this.getQuestionItem(this.categoryIndexSelected,this.currentQuestionIndex);
        this.showQuestion(questionItem,imageQuestion);
        var totalQuestions = this.listQuestionsByCategory(this.categoryIndexSelected).length
        this.showScore(this.score,totalQuestions);
        this.showExitButton();
    },
    createTimer: function(){

        var me = this;

        me.timeLabel = me.game.add.text(me.game.world.centerX, 520, "00:00", {font: "90px Arial", fill: "#FF6347"}); 
        me.timeLabel.anchor.setTo(0.5, 0);
        me.timeLabel.align = 'center';

    },
    updateTimer: function(){

        var me = this;

        var currentTime = new Date();
        var timeDifference = me.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        me.timeElapsed = Math.abs(timeDifference / 1000);

        //Time remaining in seconds
        var timeRemaining = me.totalTime - me.timeElapsed; 

        //Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);

        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes; 

        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 

        me.timeLabel.text = result;

        if(me.timeElapsed >= me.totalTime - 10){
            this.alertTime();
        }

        // check whether time is completed
        if(me.timeElapsed >= me.totalTime){
            //console.log(me.timeElapsed);
            //console.log(me.totalTime);
            this.timeUp();
        }

    },
    alertTime: function(){
        if(temp == 0){
            bgmusic.stop();
            alert_music.loopFull();
        }
        temp = temp + 1;
    },
    timeUp: function(){
        // bgmusic.stop();
        alert_music.stop();
        this.state.start('timeup');
    },
    showQuestion:function(questionItem,imageQuestion){
        var questionTitleElement = this.addQuestionTitle(questionItem.question,imageQuestion);
        this.addButtonsChoice(questionItem.choices,questionItem.answer,questionTitleElement);
    },
    addQuestionTitle:function(textContent,imageQuestion){
        var questionTitleElement = this.game.add.text(0,0,textContent, {
            font: "24pt Audiowide", 
            fill: "#ffffff", 
            wordWrap: true,  
            wordWrapWidth:800,
            align: "left", 
            backgroundColor: '#000000' //#f4bf42 
        });
        questionTitleElement.alignTo(imageQuestion,Phaser.BOTTOM_CENTER);
        return questionTitleElement;
    },
    addButtonsChoice:function(choicesText,answerIndex,questionTitleElement){
        var groupButtons = this.game.add.group();
        var previousGroup;
        for(var index=0;index<choicesText.length;index++){
            var isRightAnswer = (index===answerIndex);
            var group = this.addChoiceGroup(choicesText[index],isRightAnswer);
            if(previousGroup){
                group.alignTo(previousGroup, Phaser.BOTTOM_LEFT, 0);
            }
            previousGroup = group;
            groupButtons.add(group);
        }
        groupButtons.alignTo(questionTitleElement, Phaser.BOTTOM_CENTER, 0);
    },
    addChoiceGroup:function(title,isRightAnswer){
        var button = this.game.add.button(0,0, 'button', this.onButtonChoiceClicked, {context:this,isRightAnswer:isRightAnswer}, 2, 1, 0);
        button.scale.set(0.5);
        var text = this.game.add.text(0,0,title, {font: "12pt Audiowide", fill: "#ffffff", wordWrap: false,  align: "left", backgroundColor: '#000000' });
        text.alignTo(button, Phaser.RIGHT_CENTER, 0);
        var group = this.game.add.group();
        group.add(button);
        group.add(text);
        return group;
    },
    onButtonChoiceClicked:function(){
        bgmusic.stop();
        var context = this.context;
        if(this.isRightAnswer){
            context.score++;            
            context.marioWinSound.play();
        }else{
            context.marioLoseSound.play();
            context.remainingLives--;
        }
        if(context.remainingLives>0){
            context.game.state.start('answer',true,false,context.categoryIndexSelected,context.currentQuestionIndex,this.isRightAnswer,context.remainingLives,context.score);
        }else{
            var isWin = false
            context.game.state.start('endgame',true,false,isWin);
        }
    },
    listQuestionsByCategory:function(categoryIndex){
        //return this.data.categories[categoryIndex].questions;
        return this.data.categories[0].questions;
    },
    getQuestionItem(categoryIndex,questionIndex){
        return this.listQuestionsByCategory(categoryIndex)[questionIndex];
    },
    showImageQuestion: function(categoryIndex,questionIndex){
        var key = ['image_question',categoryIndex,questionIndex].join('_');
        var image_question = this.game.add.image(0,0, key);
        var scale = 1;
        if(image_question.height > QuizGame.Constants.maxHeightImageQuestion){
            scale = QuizGame.Constants.maxHeightImageQuestion/image_question.height;      
        }
        image_question.scale.set(scale);
        image_question.alignIn(this.rectCanvas,Phaser.TOP_CENTER);
        return image_question;
    },
    showLives:function(lives){
        var group = this.game.add.group();
        var previous;
        for(var index=0;index<lives;index++){
            var heart = this.game.add.sprite(0,0, 'heart');
            if(previous){
                heart.alignTo(previous, Phaser.RIGHT_CENTER, 0);
            }
            previous = heart;
            group.add(heart);
        }
        group.alignIn(this.rectCanvas,Phaser.TOP_RIGHT)
        return group;
    },
    showScore:function(score,total){
        var style = { 
            font: "20pt Audiowide", fill: "#FF6347", wordWrap: false,  align: "right", backgroundColor: '#000000'
        };
        var textContent = 'Score : '+score+'/'+total;
        var textEl = this.game.add.text(0,0,textContent, style);
        textEl.alignTo(this.livesGroups,Phaser.BOTTOM_RIGHT);
    },
    showExitButton:function(){
        var button = this.game.add.button(0,0, 'back-btn', this.onButtonExitClicked, this, 2, 1, 0);        
        button.alignIn(this.rectCanvas,Phaser.BOTTOM_RIGHT);
    },
    onButtonExitClicked:function(){
        bgmusic.stop();
        this.game.state.start('intro');
    }
}