var QuizGame = QuizGame || {};
QuizGame.Boot = function () {
}

QuizGame.Boot.prototype = {
    init: function () {
    },
    preload: function () { 
        this.game.load.image('quiz-play', 'assets/feat/starfield.jpg');
        this.game.load.image('loading',  'assets/feat/loading-1.png');
        this.game.load.image('logo',    'assets/feat/logo.png');
        this.game.load.script('utils',   'js/utils.js');
    },
    create: function () {
        this.state.start('preloader');
    }
}