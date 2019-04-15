var QuizGame = QuizGame || {};
QuizGame.EndGame = function () {
}

QuizGame.EndGame.prototype = {
    init: function(isWin){
        this.isWin = isWin;
    },
    create: function(){
        this.rectCanvas = new Phaser.Rectangle(0,0, window.innerWidth, window.innerHeight);
        this.gameOverSound = this.game.add.audio('gameover');
        this.winnerSound = this.game.add.audio('yippee');
        
        if(this.isWin){
            this.winner();
        }else{
            this.gameover();
        }
    },
    gameover: function(){
        this.gameOverSound.play();
        var imageGameOver = this.game.add.image(0,200, 'game-over-image');
        imageGameOver.alignIn(this.rectCanvas,Phaser.CENTER);
        var buttonStarOver = this.game.add.button(0,0, 'buttonNext', this.onStarOver, this, 2, 1, 0);
        buttonStarOver.alignTo(imageGameOver, Phaser.BOTTOM_CENTER, 0);
    },
    winner: function(){
        this.winnerSound.play();
        var imageWin = this.game.add.image(0,200, 'win');
        imageWin.alignIn(this.rectCanvas,Phaser.CENTER);
        var buttonStarOver = this.game.add.button(0,0, 'buttonNext', this.onStarOver, this, 2, 1, 0);
        buttonStarOver.alignTo(imageWin, Phaser.BOTTOM_CENTER, 0);
    },
    onStarOver: function(){
        this.state.start('options');
    }
}