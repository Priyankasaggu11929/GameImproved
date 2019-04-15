var QuizGame = QuizGame || {};

QuizGame.Utils = {
    getRectCanvas:function(){
        return new Phaser.Rectangle(36,7, 960, 600);
    },
    getCanvas: function(){
        return new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    }
}
