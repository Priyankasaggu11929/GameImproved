var QuizGame = QuizGame || {};
/*
var bot;


/////////////////////// BOT DATA //////////////////////////////
var botData = {
    "frames": [

{
    "filename": "running bot.swf/0000",
    "frame": { "x": 34, "y": 128, "w": 56, "h": 60 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 2, "w": 56, "h": 60 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0001",
    "frame": { "x": 54, "y": 0, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0002",
    "frame": { "x": 54, "y": 58, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0003",
    "frame": { "x": 0, "y": 192, "w": 34, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 11, "y": 0, "w": 34, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0004",
    "frame": { "x": 0, "y": 64, "w": 54, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 1, "y": 0, "w": 54, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0005",
    "frame": { "x": 196, "y": 0, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0006",
    "frame": { "x": 0, "y": 0, "w": 54, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 1, "y": 0, "w": 54, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0007",
    "frame": { "x": 140, "y": 0, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0008",
    "frame": { "x": 34, "y": 188, "w": 50, "h": 60 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 3, "y": 2, "w": 50, "h": 60 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0009",
    "frame": { "x": 0, "y": 128, "w": 34, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 11, "y": 0, "w": 34, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0010",
    "frame": { "x": 84, "y": 188, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
}],
    "meta": {
        "app": "http://www.texturepacker.com",
        "version": "1.0",
        "image": "running_bot.png",
        "format": "RGBA8888",
        "size": { "w": 252, "h": 256 },
        "scale": "0.2",
        "smartupdate": "$TexturePacker:SmartUpdate:fb56f261b1eb04e3215824426595f64c$"
}
};

*/
///////////////////////////////////////////////////////////////

QuizGame.Intro = function () {
}

QuizGame.Intro.prototype = {
    preload: function () {
        this.load.atlas('bot', 'assets/feat/running_bot.png', null, botData);
    },
    create: function () {
        var rectCanvas = QuizGame.Utils.getRectCanvas();
        var data = this.game.cache.getJSON('questions');
        this.remainingLives = data.lives;
        var intoGroup = this.game.add.group();
        var buttonsGroup = this.createButtons();
        var textGroup = this.createTextHeaders();
        buttonsGroup.alignTo(textGroup,Phaser.BOTTOM_CENTER);
        intoGroup.add(buttonsGroup);
        intoGroup.add(textGroup);
        intoGroup.alignIn(rectCanvas,Phaser.CENTER);

        // bot animation
  //      bot = this.add.sprite(this.world.centerX, 300, 'bot');

    //    bot.animations.add('run');
    //    bot.animations.play('run', 10, true);

    },
    createButtons:function(){
        this.previousButton = null;
        this.groupButtons = this.game.add.group();
        this.createButtonCategory(0);
        this.createButtonCategory(1);
        this.createButtonCategory(2);
        return this.groupButtons;
    },
    createButtonCategory: function (index) {
        var key = 'buttonCategory_' + (index + 1);
        var context = { category: index, game:this.game,remainingLives:this.remainingLives};
        var button = this.game.add.button(0, 0, key, this.onButtonCategoryClicked, context, 2, 1, 0);
        if (this.previousButton) {
            button.alignTo(this.previousButton, Phaser.RIGHT_CENTER, 126);
        }
        this.previousButton = button;
        this.groupButtons.add(button);
    },
    onButtonCategoryClicked: function () {
        this.game.state.start('question',true,false,this.category,0,this.remainingLives,0);
    },
    createTextHeaders:function(){
        var previous;
        var texts = ['Welcome on board!','Let\'s test your skills','Choose your age!'];
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
        style.fontSize = '38pt';
        style.backgroundColor = '#f4bf42';
        style.fill= '#000000';
        return this.game.add.text(0,0,textContent, style);
    },
    getStyleCategory:function(){
        return { 
            font: "38pt Arial", fill: "#000000", wordWrap: false,  align: "left", backgroundColor:'#FFFFFF' };
    }
}
