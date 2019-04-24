var QuizGame = QuizGame || {};
//QuizGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
QuizGame.game = new Phaser.Game(960,600,Phaser.AUTO, '');
QuizGame.game.state.add('boot', QuizGame.Boot);
QuizGame.game.state.add('intro', QuizGame.Intro);


// added states
QuizGame.game.state.add('play', QuizGame.PlayState);
QuizGame.game.state.add('loading', QuizGame.LoadingState);



// add initialization
QuizGame.game.state.add('home', QuizGame.Home);

// load the game
QuizGame.game.state.add('loadgame', QuizGame.LoadGame);
QuizGame.game.state.add('endgame', QuizGame.EndGame);
QuizGame.game.state.start('boot');



