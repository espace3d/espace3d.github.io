var theGame = function(game){
	grey_check=null,
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
	background = null;
	menuPaper=null;
	s=null;
	time=null;
	hud=null;
	paper_player = null;
	paper_opponent = null;
	effect= null
	little_roll_player=null
	little_roll_opponent=null

	//////////////////////////////////////////////////////////////////////////////////////////
	//GROUP
	groupnull = null
	//0 G.timerGroup0 - timer deplacé dans ce groupe car il doit être devant tout le monde le groupe 3 doit être supprimé
	//1. G.topOpponentGroup1 --  bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> opponent
	//2. G.topPlayerGroup2 -- bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> player
	//3. G.timerGroup3 -- timer + rond  
	//3bis. G.cursorGroup3bis -- curseur en forme de rectangle	
	//3tris. G.shadowGroup3tris
	//4. G.opponentPapers4 -- papiers de l'opponent
	//5. G.playerPapers5 -- papiers du player
	//6. G.opponentBackgroundGroup6 -- background sur une moitié pour l'opponent
	//7. G.playerBackgroundGroup7 -- background sur une moitié pour le player
	//8. G.menuPaperGroup8 -- menu derrière les 2 background + bords périphériques colorés du menus 
	////9. shadowPaperGroup9 -- ombre sur le papier pour symboliser bord

	//fondBelowMenu = null
	//opponentTextGroup = null
	//playersGroup = null

	//shadowPaperGroup9 = null
	//G.menuPaperGroup8 = null
	////G.playerBackgroundGroup7 = null
	//G.opponentBackgroundGroup6 = null
	//G.playerPapers5 = null
	//G.opponentPapers4 = null
	//G.shadowGroup3tris = null
	//G.cursorGroup3bis=null
	//G.timerGroup3 = null
	//G.topPlayerGroup2=null
	//G.topOpponentGroup1=null
	//G.timerGroup0=null
	//////////////////////////////////////////////////////////////////////////////////////////
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

		//shadowPaperGroup9 = this.game.add.group()
		G.menuPaperGroup8 = this.game.add.group()
		G.playerBackgroundGroup7 = this.game.add.group()
		G.opponentBackgroundGroup6 = this.game.add.group()
		G.playerPapers5 = this.game.add.group()
		G.opponentPapers4 = this.game.add.group()
		G.shadowGroup3tris = this.game.add.group()
		G.cursorGroup3bis=this.game.add.group()
		G.timerGroup3 = this.game.add.group()
		G.topPlayerGroup2=this.game.add.group()
		G.topOpponentGroup1=this.game.add.group()
		G.timerGroup0=this.game.add.group()

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

		// DECLARATION DES VARIABLES MY GAME
		background=drawBackground(this.game,G.menuPaperGroup8,G.playerBackgroundGroup7,G.opponentBackgroundGroup6,G.shadowGroup3tris,G.cursorGroup3bis,G.topPlayerGroup2,G.topOpponentGroup1,G.timerGroup0)
		paper_opponent = new P.draw(G.opponentPapers4,this.game,w4,-h)
		paper_player = new P.draw(G.playerPapers5,this.game,w4*3,-h)
		menuPaper=new M.drawMenuPaper(this.menuPaper,G.menuPaperGroup8,this.game)
		hud=new Timer(this.game,G.timerGroup0)
		console.log(hud.visible,"hduidud")
		effect=draweffect(this.game)
		little_roll_player=new R.draw_little_roll(this.game,G.timerGroup0,w4*3,py2)
		little_roll_opponent=new R.draw_little_roll(this.game,G.timerGroup0,w4,py2)


		//DEPLACEMENT DES GROUPES AU DEBUT (TEXTE TOP - TIMER - SHADOW)
		G.topOpponentGroup1.position.y=h2
		G.topPlayerGroup2.position.y=h2
		G.timerGroup0.position.y=h2-100
		background.table_opponent.y=h
		background.table_player.y=h

		//DEPLACEMENT DES BACKGROUND POUR ANIMER LE JEU
		displacement_background_opponent_and_player(G.opponentBackgroundGroup6,G.topOpponentGroup1,G.playerBackgroundGroup7,G.topPlayerGroup2,G.timerGroup0,hud,this.game)
		//EFFECT SUR LE TIMER
		effect.deform_text(hud.timer)
		effect.deform_main(hud.time_shadow)

		//enable physics body
		this.game.physics.enable(background.check_fall_end, Phaser.Physics.ARCADE)
		this.game.physics.enable(paper_player.main, Phaser.Physics.ARCADE)
		this.game.physics.enable(paper_opponent.main, Phaser.Physics.ARCADE)
		for (var i = 0; i < background.line_collision_opponent.length; i++) {
			this.game.physics.enable(background.line_collision_opponent[i], Phaser.Physics.ARCADE)
			background.line_collision_opponent[i].body.immovable = true 
		};
		this.game.physics.enable(background.text_position_player, Phaser.Physics.ARCADE)
		this.game.physics.enable(background.line_position_player, Phaser.Physics.ARCADE)
		this.game.physics.enable(background.line_position_opponent, Phaser.Physics.ARCADE)
		//paper_player.main.body.allowGravity=false
		//this.game.physics.arcade.gravity.y=200

		// ajout d'un boutton au timer pour permettre le plein écran
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

		//ligne qui descend gravity
		background.text_position_player.body.gravity.y=1282
		background.text_position_player.body.bounce.y=.2
		background.text_position_player.body.allowGravity=false

		game.time.events.add(delay_paper_fall+5800,allow_line_position,this)

		function allow_line_position() {
			background.text_position_player.body.allowGravity=true
		}

		game.time.events.add(delay_paper_fall+10800,stop_line_position,this)

		function stop_line_position() {
			console.log("stop")
			background.text_position_player.body.moves=false
		}
	},

	update: function(){
		//TODO
		// test texte qui descend
		background.line_fall(background.line_position_player,background.text_position_player,paper_player.main) 
		background.line_fall(background.line_position_opponent,background.text_position_opponent,paper_opponent.main) 
		this.game.physics.arcade.collide(paper_player.main,background.check_fall_end,grey_check)
		this.game.physics.arcade.collide(paper_opponent.main,background.check_fall_end,grey_check)

		//filtre en gris
		//if (paper_player.main.body.y > h2 && background.text_win_player.visible==false) {
		//	background.winner()
		//	if (background.text_win_player.visible==false){
		//		background.text_win_opponent.visible=true
		//		background.cursor_player.visible=false
		//		background.cursor_palpitant.visible=false
		//		background.cursor_opponent.visible=false
		//		background.cursor_palpitant_opponent.visible=false

		//	}					
		//	background.player.filters=[background.grayfiltertop]
		//	background.player_top.filters=[background.grayfiltertop]
		//}

		//if (paper_opponent.main.body.y > h2 && background.text_win_opponent.visible==false) {
		//	background.winner()
		//	if (background.text_win_opponent.visible==false){
		//		background.text_win_player.visible=true
		//		background.cursor_player.visible=false
		//		background.cursor_palpitant.visible=false
		//		background.cursor_opponent.visible=false
		//		background.cursor_palpitant_opponent.visible=false
		//	}					
		//	background.opponent.filters=[background.grayfiltertop]
		//	background.opponent_top.filters=[background.grayfiltertop]
		//}

		function check_winner(){
			if (background.text_win_player.visible) {
				effect.disappears_timer(hud.time_shadow,hud.timer)
			}
			else if (background.text_win_opponent.visible){
				effect.disappears_timer(hud.time_shadow,hud.timer)
			}
		}
		check_winner()
		//timer 
		background.cursor_player.y=this.game.input.activePointer.y
		background.cursor_palpitant.y=this.game.input.activePointer.y
		background.cursor_opponent.y=background.cursor_palpitant_opponent.y
		background.cursor_opponent_particle.y=background.cursor_palpitant_opponent.y
		//plein écran
		hud.time_shadow.events.onInputDown.add(gofull, this);

		function grey_check(obj1,obj2){
			console.log("colldide")
			obj2.body.enable=false
			background.winner()
			//background.player.filters=[background.grayfiltertop]
			background.text_win_opponent.visible=true
			background.cursor_player.visible=false
			background.cursor_palpitant.visible=false
			background.cursor_opponent.visible=false
			background.cursor_palpitant_opponent.visible=false
			//effect.disappears_timer(hud.time_shadow,hud.timer)
		}

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
		paper_player.fall(paper_player.main,background)	
		paper_opponent.opponentfall(paper_opponent.main,background.line_collision_opponent,background.cursor_palpitant_opponent,background.cursor_opponent,background.cursor_opponent_particle)	

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

		game.debug.text(game.time.fps, 2, 14, "#00ff00");

	}
}
