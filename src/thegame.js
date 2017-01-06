//
//browser-sync start --server --files "*.html, src/*.js"
var theGame = function(game){
	grey_check=null,
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
	background = null;
	menuPaper=null;
	menuPaper_opponent=null;
	parameter=null;
	s=null;
	time=null;
	hud=null;
	paper_player = null;
	paper_opponent = null;
	effect= null
	little_roll_player=null
	little_roll_opponent=null
	menu_network=null
	//////////////////////////////////////////////////////////////////////////////////////////
	//GROUP
	groupnull = null
}

theGame.prototype = {
	create: function(){

		this.game.time.advancedTiming = true;
		//demarrage de physic
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
		G.drawGroup(this.game)
		//ORDRE DES GROUPES ICI
		//group null sert pour cacher les éléments du canevas original

		groupnull = this.game.add.group();
		groupnull.alpha=0

		// DECLARATION DES VARIABLES ( canevas initial ) 
		number = Math.floor(Math.random()*10);
		spriteNumber = this.game.add.sprite(160,240,"numbers");
		spriteNumber.anchor.setTo(0.5,0.5);
		spriteNumber.frame = number;	
		var higherButton = this.game.add.button(160,100,"higher",this.clickedHigher,this);
		higherButton.anchor.setTo(0.5,0.5);
		var lowerButton = this.game.add.button(160,380,"lower",this.clickedLower,this);
		lowerButton.anchor.setTo(0.5,0.5);	
		groupnull.add(lowerButton)
		groupnull.add(higherButton)
		groupnull.add(spriteNumber)
		//pour régler l'alpha des contours plus tard dans hud.js
		G.contour_opponentGroup9.alpha=0
		G.contour_playerGroup9.alpha=0

		// DECLARATION DES VARIABLES MY GAME
		parameter=new param()
		menuPaper_opponent=new Menu(this.game,G.menuPaperGroup9,"opponent",w4,0)
		menuPaper=new Menu(this.game,G.menuPaperGroup8,"player",w4*3,0)
		background=new draw_background(this.game)
		paper_player = new Paper(this.game,G.playerPapers5,w4*3,-h,"player")
		paper_opponent = new Paper(this.game,G.opponentPapers4,w4,-h,"opponent")
		hud=new Timer(this.game,G.timerGroup0)
		effect=draweffect(this.game)
		//TODO changer de groupe et rétablir position y
		little_roll_player=new Roll(this.game,G.topPlayerGroup2,w4*3,180,"player")
		little_roll_opponent=new Roll(this.game,G.topOpponentGroup1,w4,180,"opponent")
		tw=new init_transitions(this.game)
		menu_network=new Menu_network_opponent(this.game,G.menu_select_opponent_Group0,w2,h2)
		this.game.stage.backgroundColor=black
		//DEPLACEMENT DES GROUPES AU DEBUT (TEXTE TOP - TIMER - SHADOW)
		G.topOpponentGroup1.position.y=h2
		G.topPlayerGroup2.position.y=h2
		//G.timerGroup0.position.y=300
		//G.timerGroup0.position.y=h2-100
		background.table_opponent.y=h
		background.table_player.y=h

		//DEPLACEMENT DES BACKGROUND POUR ANIMER LE JEU
		//EFFECT SUR LE TIMER
		effect.deform_text(hud.timer_text)
		effect.deform_main(hud.time_shadow)

		//enable physics body
		//this.game.physics.enable(background.check_fall_end, Phaser.Physics.ARCADE)
		//this.game.physics.enable(paper_player, Phaser.Physics.ARCADE)
		//this.game.physics.enable(paper_opponent, Phaser.Physics.ARCADE)
		for (var i = 0; i < background.line_collision_opponent.length; i++) {
			this.game.physics.enable(background.line_collision_opponent[i], Phaser.Physics.ARCADE)
			background.line_collision_opponent[i].body.immovable = true 
		};
		//this.game.physics.enable(background.text_position_player, Phaser.Physics.ARCADE)
		//this.game.physics.enable(background.line_position_player, Phaser.Physics.ARCADE)
		//this.game.physics.enable(background.line_position_opponent, Phaser.Physics.ARCADE)
		//paper_player.main.body.allowGravity=false
		//this.game.physics.arcade.gravity.y=200

		// ajout d'un boutton au timer pour permettre le plein écran
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
tw.move_timer_for_network()


	},

	update: function(){
		//TODO
		// test texte qui descend
		//background.line_fall(background.check_fall_end,background.line_position_player,background.text_position_player,paper_player) 
		//background.line_fall(background.check_fall_end,background.text_position_opponent,paper_opponent.main) 

		//function check_winner(){
		//	if (background.text_win_player.visible) {
		//		effect.disappears_timer(hud.time_shadow,hud.timer_text)
		//	}
		//	else if (background.text_win_opponent.visible){
		//		effect.disappears_timer(hud.time_shadow,hud.timer_text)
		//	}
		//}
		//check_winner()

		//timer 
		background.cursor_player.y=this.game.input.activePointer.y
		background.cursor_palpitant.y=this.game.input.activePointer.y
		background.cursor_opponent.y=background.cursor_palpitant_opponent.y
		background.cursor_opponent_particle.y=background.cursor_palpitant_opponent.y
		//plein écran
		hud.time_shadow.events.onInputDown.add(gofull, this);

//		function grey_check(obj1,obj2){
//			console.log("colldide")
//			obj2.body.enable=false
//			background.winner()
//			//background.player.filters=[background.grayfiltertop]
//			//pour faire descendre le texte qui donne la position du papier tombé
//			//background.text_position_player.body.allowGravity=true
//			game.time.events.add(5000,stop_line_position,this)
//
//			function stop_line_position() {
//				console.log("stop")
//				background.text_position_player.body.moves=false
//			}
//
//			background.text_win_opponent.visible=true
//			background.cursor_player.visible=false
//			background.cursor_palpitant.visible=false
//			background.cursor_opponent.visible=false
//			background.cursor_palpitant_opponent.visible=false
//			//effect.disappears_timer(hud.time_shadow,hud.timer)
//		}

		function gofull(){

			if (this.game.scale.isFullScreen) {
				this.game.scale.stopFullScreen();
			} else {
				this.game.scale.startFullScreen(false);
			}
		}

		// temps écoulé
		//time_elapsed(this.game)

		//chute des papiers	
		paper_opponent.opponentfall(paper_opponent,background.line_collision_opponent,background.cursor_palpitant_opponent,background.cursor_opponent,background.cursor_opponent_particle)	

	},



	clickedHigher: function(){
		higher=true;
		this.tweenNumber(true);
	},
	clickedLower: function(){
		higher=false;
		this.tweenNumber(false);
	},
	tweenNumber: function(higher){
		if(workingButtons){
			workingButtons=false;
			var exitTween = this.game.add.tween(spriteNumber);
			exitTween.to({x:420},500);
			exitTween.onComplete.add(this.exitNumber,this);
			exitTween.start();
		}
	},

	exitNumber: function(){
		spriteNumber.x = -180;
		spriteNumber.frame = Math.floor(Math.random()*10);
		var enterTween = this.game.add.tween(spriteNumber);
		enterTween.to({x:160},500);
		enterTween.onComplete.add(this.enterNumber,this);
		enterTween.start();

	},

	enterNumber: function(){
		workingButtons=true;
		if((higher && spriteNumber.frame<number)||(!higher && spriteNumber.frame>number)){
			this.game.state.start("GameOver",true,false,score);	
		}
		else{  
			score++;
			number = spriteNumber.frame;
		}	
	},
	render: function(){

		//game.debug.text(game.time.fps, 2, 14, "#00ff00");

	}
}
