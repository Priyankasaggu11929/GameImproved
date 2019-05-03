var QuizGame = QuizGame || {};

QuizGame.Utils = {
    getRectCanvas:function(){
        return new Phaser.Rectangle(0,0, 960, 600);
    },
    centerGameObjects: function (objects) {
        objects.forEach(function (object) {
          object.anchor.setTo(0.5);
        })
    }
}

