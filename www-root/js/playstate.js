var nextJump = 0;

var lefty=false;
var righty=false;
var jumpy=false;


// =============================================================================
// Sprites
// =============================================================================

//
// Hero
//

function Hero(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');

    // anchor
    this.anchor.set(0.5, 0.5);
    // physics properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    // animations
    this.animations.add('stop', [0]);
    this.animations.add('run', [1, 2], 8, true); // 8fps looped
    this.animations.add('jump', [3]);
    this.animations.add('fall', [4]);
    this.animations.add('die', [5, 6, 5, 6, 5, 6, 5, 6], 12); // 12fps no loop
    // starting animation
    this.animations.play('stop');

// create our virtual game controller buttons
    buttonjump = this.game.add.button(850, 450, 'buttonjump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonjump.fixedToCamera = true;  //our buttons should stay on the same place
    buttonjump.events.onInputOver.add(function(){jumpy=true;});
    buttonjump.events.onInputOut.add(function(){jumpy=false;});
    buttonjump.events.onInputDown.add(function(){jumpy=true;});
    buttonjump.events.onInputUp.add(function(){jumpy=false;});


    buttonleft = this.game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonleft.fixedToCamera = true;
    buttonleft.events.onInputOver.add(function(){lefty=true;});
    buttonleft.events.onInputOut.add(function(){lefty=false;});
    buttonleft.events.onInputDown.add(function(){lefty=true;});
    buttonleft.events.onInputUp.add(function(){lefty=false;});


    buttonright = this.game.add.button(96, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonright.fixedToCamera = true;
    buttonright.events.onInputOver.add(function(){righty=true;});
    buttonright.events.onInputOut.add(function(){righty=false;});
    buttonright.events.onInputDown.add(function(){righty=true;});
    buttonright.events.onInputUp.add(function(){righty=false;});


    if (this.game.input.currentPointers == 0 && !game.input.activePointer.isMouse){  righty=false; lefty=false; jumpy=false;} //this works around a "bug" where a button gets stuck in pressed state



    
}

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function (direction) {
    // guard
    if (this.isFrozen) { return; }

    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;

    // update image flipping & animations
    if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    else if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};

Hero.prototype.jump = function () {
    const JUMP_SPEED = 400;
    let canJump = this.body.touching.down && this.alive && !this.isFrozen;

    if (canJump || this.isBoosting) {
        this.body.velocity.y = -JUMP_SPEED;
        this.isBoosting = true;
    }

    return canJump;
};

Hero.prototype.stopJumpBoost = function () {
    this.isBoosting = false;
};

Hero.prototype.bounce = function () {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};

Hero.prototype.update = function () {
    // update sprite animation, if it needs changing
    let animationName = this._getAnimationName();
    if (this.animations.name !== animationName) {
        this.animations.play(animationName);
    }
};

Hero.prototype.freeze = function () {
    this.body.enable = false;
    this.isFrozen = true;
};

Hero.prototype.die = function () {
    this.alive = false;
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
};

// returns the animation name that should be playing depending on
// current circumstances
Hero.prototype._getAnimationName = function () {
    let name = 'stop'; // default animation

    // dying
    if (!this.alive) {
        name = 'die';
    }
    // frozen & not dying
    else if (this.isFrozen) {
        name = 'stop';
    }
    // jumping
    else if (this.body.velocity.y < 0|| jumpy) {
        name = 'jump';
    }
    // falling
    else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
        name = 'fall';
    }
    else if (this.body.velocity.x !== 0 && this.body.touching.down) {
        name = 'run';
    }

    return name;
};

//
// Spider (enemy)
//

function Spider(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spider');

    // anchor
    this.anchor.set(0.5);
    // animation
    this.animations.add('crawl', [0, 1, 2], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('crawl');

    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Spider.SPEED;
}

Spider.SPEED = 100;

// inherit from Phaser.Sprite
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function () {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Spider.SPEED; // turn left
    }
    else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Spider.SPEED; // turn right
    }
};

Spider.prototype.die = function () {
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
};

// =============================================================================
// Play state
// =============================================================================
const LEVEL_COUNT = 3;

var QuizGame = QuizGame || {};

QuizGame.PlayState = function () {
}

QuizGame.PlayState.prototype = {

    init: function (data) {
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP
    });

    this.coinPickupCount = 0;
    this.lifeCount = 3;
    this.hasKey = false;
    this.answer="";	    
    this.count=0;
    this.level = (data.level || 0) % LEVEL_COUNT;
    },

    create: function () {
     // creating canvas

    var rectCanvas = QuizGame.Utils.getRectCanvas();
    var intoGroup = this.game.add.group();
    intoGroup.alignIn(rectCanvas,Phaser.CENTER);


    // fade in (from black)
    this.camera.flash('#000000');

    // create sound entities
    this.sfx = {
        jump: this.game.add.audio('sfx:jump'),
        coin: this.game.add.audio('sfx:coin'),
        key: this.game.add.audio('sfx:key'),
        stomp: this.game.add.audio('sfx:stomp'),
        door: this.game.add.audio('sfx:door')
    };

    this.bgm = this.game.add.audio('bgm');
    this.bgm.loopFull();

    // create level entities and decoration
    this.game.add.image(0, 0, 'background');
    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));

    // create UI score boards
    this._createHud();
    },

    update: function () {
    this._handleCollisions();
    this._handleInput();

    // update scoreboards
    this.coinFont.text = `x${this.coinPickupCount}`;
    this.keyIcon.frame = this.hasKey ? 1 : 0;
    

    if (this.lifeCount ==3){
     this.keyIcon.frame = 1;
    }
    else if (this.lifeCount ==2) {
     this.keyIcon.frame = 2;
    }
    else {
    this.keyIcon.frame = 3;
    }
    },

    shutdown: function () {
    this.bgm.stop();
    },

    _handleCollisions: function () {
    this.game.physics.arcade.collide(this.spiders, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
    this.game.physics.arcade.collide(this.hero, this.platforms);

    // hero vs coins (pick up)
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin,
        null, this);
    // hero vs key (pick up)
    this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey,
        null, this);
    // hero vs door (end level)
    this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor,
        // ignore if there is no key or the player is on air
        function (hero, door) {
            return this.hasKey && hero.body.touching.down;
        }, this);
    // collision: hero vs enemies (kill or die)
    this.game.physics.arcade.overlap(this.hero, this.spiders,
        this._onHeroVsEnemy, null, this);
     },

     _handleInput: function () {
    if (this.keys.left.isDown || lefty) { // move hero left
        this.hero.move(-1);
    }
    else if (this.keys.right.isDown || righty) { // move hero right
        this.hero.move(1);
    }
    else { // stop
        this.hero.move(0);
    }

    // handle jump
    const JUMP_HOLD = 200; // ms
    if (this.keys.up.downDuration(JUMP_HOLD) || jumpy) {
        let didJump = this.hero.jump();
        if (didJump) { this.sfx.jump.play(); }
    }
    else {
        this.hero.stopJumpBoost();
    }
    },

    _onHeroVsKey: function (hero, key) {
    this.sfx.key.play();
    key.kill();
    this.hasKey = true;
    },

    _onHeroVsCoin: function (hero, coin) {
    this.sfx.coin.play();
    coin.kill();
    this.coinPickupCount++;
    },

    _onHeroVsEnemy: function (hero, enemy) {
    // the hero can kill enemies when is falling (after a jump, or a fall)
    if (hero.body.velocity.y > 0) {
        enemy.die();
        hero.bounce();
        this.sfx.stomp.play();
    }
    else { // game over -> play dying animation and restart the game
        hero.die();
        this.sfx.stomp.play();
        hero.events.onKilled.addOnce(function () {
            this.game.state.restart(true, false, {level: this.level});
	    this.lifeCount--;	
        }, this);

        // NOTE: bug in phaser in which it modifies 'touching' when
        // checking for overlaps. This undoes that change so spiders don't
        // 'bounce' agains the hero
        enemy.body.touching = enemy.body.wasTouching;
    }
    },

    _onHeroVsDoor: function (hero, door) {
    // 'open' the door by changing its graphic and playing a sfx
    door.frame = 1;
    this.sfx.door.play();
	  
    hero.freeze();
	    
    
    if (this.level == 0){

	 this.answer = prompt("What is your name?");
	 if (this.answer == "Priyanka")  {
	  setTimeout(function() {
        swal({
            title: "Wow!",
            text: "Message!",
            type: "success"
        })
    }, 1000);	       
		  this.game.add.tween(hero)
            .to({x: this.door.x, alpha: 0}, 500, null, true)
            .onComplete.addOnce(this._goToNextLevel, this);

       }
	    else{
		
		    while(this.count<3){
			
			if(this.count ==2){
		    setTimeout(function() {
		    swal({
			    title: "Play Again!",
	        	    text: "Ah! You missed this time.",
		            type: "error"
       			 })}, 1000); 

			break;
			}

			else{
				this.count++;
				swal("Try Again!", "You gave a wrong answer", "warning");
			
			}
			    
	    }

		     this.game.state.restart(true, false, {level: this.level});

	  }
 }

   

    else if (this.level ==1){
    
   this.answer = prompt("What is your Age?");
	 if (this.answer == "21")  {
	  setTimeout(function() {
        swal({
            title: "Wow!",
            text: "Message!",
            type: "success"
        })
    }, 1000);	       
		  this.game.add.tween(hero)
            .to({x: this.door.x, alpha: 0}, 500, null, true)
            .onComplete.addOnce(this._goToNextLevel, this);

       }
	    else{
		
		    while(this.count<3){
			
			if(this.count ==2){
		    setTimeout(function() {
		    swal({
			    title: "Play Again!",
	        	    text: "Ah! You missed this time.",
		            type: "error"
       			 })}, 1000); 

			break;
			}

			else{
				this.count++;
				swal("Try Again!", "You gave a wrong answer", "warning");
			
			}
			    
	    }

		     this.game.state.restart(true, false, {level: this.level});

	  }
 }

    
    else if (this.level ==2){
     this.answer = prompt("Wanna play more?");
	 if (this.answer == "Yes")  {
	  setTimeout(function() {
        swal({
            title: "Wow!",
            text: "Message!",
            type: "success"
        })
    }, 1000);	       
		  this.game.state.start('endgame');
       }
	    else{
		    while(this.count<3){	
			if(this.count ==2){
		    setTimeout(function() {
		    swal({
			    title: "Play Again!",
	        	    text: "Ah! You missed this time.",
		            type: "error"
       			 })}, 1000); 
			break;
			}
			else{
				this.count++;
				swal("Try Again!", "You gave a wrong answer", "warning");
			}
	    }
		     this.game.state.restart(true, false, {level: this.level});
	  }
 }

    // play 'enter door' animation and change to the next level when it ends
    },

    _goToNextLevel: function () {
    this.camera.fade('#000000');
    this.camera.onFadeComplete.addOnce(function () {
        // change to next level
/*	if (level<3){
        this.game.state.restart(true, false, {
            level: this.level + 1});
	}
	else{
		this.game.state.start('intro');
	}
*/

        // change to next level
        this.game.state.restart(true, false, {
            level: this.level + 1
        });

    }, this);
    },


    _loadLevel: function (data) {
    // create all the groups/layers that we need
    this.bgDecoration = this.game.add.group();
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();
    this.spiders = this.game.add.group();
    this.enemyWalls = this.game.add.group();
    this.enemyWalls.visible = false;

    // spawn hero and enemies
    this._spawnCharacters({hero: data.hero, spiders: data.spiders});

    // spawn level decoration
    data.decoration.forEach(function (deco) {
        this.bgDecoration.add(
            this.game.add.image(deco.x, deco.y, 'decoration', deco.frame));
    }, this);

    // spawn platforms
    data.platforms.forEach(this._spawnPlatform, this);

    // spawn important objects
    data.coins.forEach(this._spawnCoin, this);
    this._spawnKey(data.key.x, data.key.y);
    this._spawnDoor(data.door.x, data.door.y);

    // enable gravity
    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;
},

     _spawnCharacters: function (data) {
    // spawn spiders
    data.spiders.forEach(function (spider) {
        let sprite = new Spider(this.game, spider.x, spider.y);
        this.spiders.add(sprite);
    }, this);

    // spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
},

    _spawnPlatform: function (platform) {
    let sprite = this.platforms.create(
        platform.x, platform.y, platform.image);

    // physics for platform sprites
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
    sprite.body.immovable = true;

    // spawn invisible walls at each side, only detectable by enemies
    this._spawnEnemyWall(platform.x, platform.y, 'left');
    this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
},

    _spawnEnemyWall: function (x, y, side) {
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    // anchor and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1);
    // physic properties
    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
    },

	
    _spawnCoin: function (coin) {
    let sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);

    // physics (so we can detect overlap with the hero)
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;

    // animations
    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true); // 6fps, looped
    sprite.animations.play('rotate');
},

     _spawnKey: function (x, y) {
    this.key = this.bgDecoration.create(x, y, 'key');
    this.key.anchor.set(0.5, 0.5);
    // enable physics to detect collisions, so the hero can pick the key up
    this.game.physics.enable(this.key);
    this.key.body.allowGravity = false;

    // add a small 'up & down' animation via a tween
    this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .loop()
        .start();
},

    _spawnDoor: function (x, y) {
    this.door = this.bgDecoration.create(x, y, 'door');
    this.door.anchor.setTo(0.5, 1);
    this.game.physics.enable(this.door);
    this.door.body.allowGravity = false;
},

    _createHud: function () {
    const NUMBERS_STR = '0123456789X ';
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26,
        NUMBERS_STR, 6);

    this.keyIcon = this.game.make.image(0, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5);


    let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin');
    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width,
        coinIcon.height / 2, this.coinFont);
    coinScoreImg.anchor.set(0, 0.5);

     this.lifeIcon = this.game.make.image(this.keyIcon.width+100,19, 'icon:life');
    this.lifeIcon.anchor.set(0,0.5);


    this.hud = this.game.add.group();
//    this.hud.add(lifeIcon);
    this.hud.add(coinIcon);
    this.hud.add(coinScoreImg);
    this.hud.add(this.keyIcon);
    this.hud.add(this.lifeIcon);	   
    this.hud.position.set(10, 10);
    }

}


/*----------------------
// =============================================================================
// entry point
// =============================================================================

window.onload = function () {
    //let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    let game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

    game.state.add('play', PlayState);
    game.state.add('loading', LoadingState);
    game.state.start('loading');
};


*/
