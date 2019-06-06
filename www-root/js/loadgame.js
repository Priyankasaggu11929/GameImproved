var QuizGame = QuizGame || {};
QuizGame.LoadGame = function () {
}
var btn2;

var dash_sound;
//popup feature
var popup;
var tween = null;
var popup_support;
var tween_support = null;

QuizGame.LoadGame.prototype = {
    init: function () {
    },
    preload: function () {
        this.load.atlas('bot', 'assets/feat/running_bot.png', null, botData);
        this.load.image('close', 'assets/feat/my-orb-red-1.png');
    },
    create: function () {

        // dashboard
        dash_sound = this.game.add.audio('dashboard');
        dash_sound.play();

        // button click sound
        btn2 = this.game.add.audio('btn-click');
        
        this.game.stage.backgroundColor = '#f4bf42';
        
        var rectCanvas = QuizGame.Utils.getRectCanvas();
        var quiz_play = this.game.add.sprite(window.innerWidth,window.innerHeight, 'quiz-play');
        quiz_play.alignIn(rectCanvas,Phaser.CENTER);

        var play_btn = this.game.add.button(0, 0, 'play-btn', this.actionOnClick,this,2,1,0);
        var power_btn = this.game.add.button(0, 0, 'power', this.restartGame,this,2,1,0);
        var support_btn = this.game.add.button(0, 0, 'support', this.openSupportWindow,this,2,1,0);
        var location_btn = this.game.add.button(0, 0, 'location', this.locateUs,this,2,1,0);
        var about_btn = this.game.add.button(0, 0, 'about', this.openTeamWindow,this,2,1,0);
        
        // var data = this.game.cache.getJSON('questions');
        // this.remainingLives = data.lives;
        var intoGroup = this.game.add.group();
        var buttonGroup = this.game.add.group();
        //var buttonsGroup = this.createButtons();
        //var textGroup = this.createTextHeaders();
        //buttonsGroup.alignTo(textGroup,Phaser.BOTTOM_CENTER);
        //intoGroup.add(buttonsGroup)
        //intoGroup.add(textGroup);
        intoGroup.add(buttonGroup);
        buttonGroup.add(play_btn);
        buttonGroup.add(power_btn);
        buttonGroup.add(support_btn);
        buttonGroup.add(location_btn);
        buttonGroup.add(about_btn);
        //buttonGroup.alignTo(textGroup,Phaser.BOTTOM_CENTER,0,40);
        support_btn.alignTo(play_btn, Phaser.RIGHT_CENTER, 20);
        power_btn.alignTo(support_btn, Phaser.RIGHT_CENTER, 20);
        about_btn.alignTo(power_btn, Phaser.RIGHT_CENTER, 20);
        location_btn.alignTo(about_btn, Phaser.RIGHT_CENTER, 20);
        intoGroup.alignIn(rectCanvas,Phaser.CENTER);
        

        
        //////////////////// popup feature for team //////////////////////
        //button = game.add.button(game.world.centerX - 95, 460, 'button', openWindow, this, 2, 1, 0);
        about_btn.input.useHandCursor = true;
    
        //  You can drag the pop-up window around
        popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'team');
        popup.alpha = 0.8;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;
        popup.input.enableDrag();
    
        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        var pw = (popup.width / 2) - 40;
        var ph = (popup.height / 2) - 8;
    
        //  And click the close button to close it down again
        var closeButton = this.game.make.sprite(pw, -ph, 'close');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(this.closeTeamWindow, this);
    
        //  Add the "close button" to the popup window image
        popup.addChild(closeButton);
    
        //  Hide it awaiting a click
        popup.scale.set(0);
        ///////////////////////////////////////////////////////////////
        
        /*************************************************************/
        ///////////////////// another popup //////////////////////////
        /*************************************************************/


        //////////////////// popup feature for support //////////////////////
        //button = game.add.button(game.world.centerX - 95, 460, 'button', openWindow, this, 2, 1, 0);
        support_btn.input.useHandCursor = true;
    
        //  You can drag the pop-up window around
        popup_support = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'faq');
        popup_support.alpha = 0.8;
        popup_support.anchor.set(0.5);
        popup_support.inputEnabled = true;
        popup_support.input.enableDrag();
    
        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        var pw_support = (popup_support.width / 2) - 40;
        var ph_support = (popup_support.height / 2) - 8;
    
        //  And click the close button to close it down again
        var closeButton_support = this.game.make.sprite(pw_support, -ph_support, 'close');
        closeButton_support.inputEnabled = true;
        closeButton_support.input.priorityID = 1;
        closeButton_support.input.useHandCursor = true;
        closeButton_support.events.onInputDown.add(this.closeSupportWindow, this);
    
        //  Add the "close button" to the popup window image
        popup_support.addChild(closeButton_support);
    
        //  Hide it awaiting a click
        popup_support.scale.set(0);
        ///////////////////////////////////////////////////////////////
    },
    createTextHeaders:function(){
        var previous;
        var texts = ['Start Game'];
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
        btn2.play();
        this.state.start('loading');
    },
    restartGame:function(){
        this.state.start('boot');
    },
    support:function(){
        this.state.start('support-us');
    },
    locateUs:function(){
        window.open("https://goo.gl/maps/MCAtjxX3p966VJvAA");
    },
    openTeamWindow:function(){
        //this.state.start('team');
        if ((tween !== null && tween.isRunning) || popup.scale.x === 1)
        {
            return;
        }
        
       //  Create a tween that will pop-open the window, but only if it's not already tweening or open
       tween = this.game.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },
    closeTeamWindow:function(){
        if (tween && tween.isRunning || popup.scale.x === 0.1)
        {
            return;
        }
        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tween = this.game.add.tween(popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
    },
    openSupportWindow:function(){
        //this.state.start('team');
        if ((tween_support !== null && tween_support.isRunning) || popup_support.scale.x === 1)
        {
            return;
        }
        
       //  Create a tween that will pop-open the window, but only if it's not already tweening or open
       tween_support = this.game.add.tween(popup_support.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },
    closeSupportWindow:function(){
        if (tween_support && tween_support.isRunning || popup_support.scale.x === 0.1)
        {
            return;
        }
        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tween_support = this.game.add.tween(popup_support.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
    }
}
