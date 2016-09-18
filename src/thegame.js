var theGame = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
	text = null;
	background = null;
	menuPaper=null;
	s=null;
	time=null;
	text=null;
	paper_player = null;
	paper_opponent = null;
	effect= null

	//////////////////////////////////////////////////////////////////////////////////////////
	//GROUP
	groupnull = null
	//0 timerGroup0 - timer deplacé dans ce groupe car il doit être devant tout le monde le groupe 3 doit être supprimé
	//1. topOpponentGroup1 --  bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> opponent
	//2. topPlayerGroup2 -- bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> player
	//3. timerGroup3 -- timer + rond  
	//3bis. cursorGroup3bis -- curseur en forme de rectangle	
	//3tris. shadowGroup3tris
	//4. opponentPapers4 -- papiers de l'opponent
	//5. playerPapers5 -- papiers du player
	//6. opponentBackgroundGroup6 -- background sur une moitié pour l'opponent
	//7. playerBackgroundGroup7 -- background sur une moitié pour le player
	//8. menuPaperGroup8 -- menu derrière les 2 background + bords périphériques colorés du menus 
	//9. shadowPaperGroup9 -- ombre sur le papier pour symboliser bord

	fondBelowMenu = null
	opponentTextGroup = null
	playersGroup = null

	shadowPaperGroup9 = null
	menuPaperGroup8 = null
	playerBackgroundGroup7 = null
	opponentBackgroundGroup6 = null
	playerPapers5 = null
	opponentPapers4 = null
	shadowGroup3tris = null
	cursorGroup3bis=null
	timerGroup3 = null
	topPlayerGroup2=null
	topOpponentGroup1=null
	timerGroup0=null
	//////////////////////////////////////////////////////////////////////////////////////////
}

theGame.prototype = {
	create: function(){

		//ORDRE DES GROUPES ICI
		//group null sert pour cacher les éléments du canevas original

		groupnull = this.game.add.group();

		shadowPaperGroup9 = this.game.add.group()
		menuPaperGroup8 = this.game.add.group()
		playerBackgroundGroup7 = this.game.add.group()
		opponentBackgroundGroup6 = this.game.add.group()
		playerPapers5 = this.game.add.group()
		opponentPapers4 = this.game.add.group()
		shadowGroup3tris = this.game.add.group()
		cursorGroup3bis=this.game.add.group()
		timerGroup3 = this.game.add.group()
		topPlayerGroup2=this.game.add.group()
		topOpponentGroup1=this.game.add.group()
		timerGroup0=this.game.add.group()

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
		background=drawBackground(this.game,menuPaperGroup8,playerBackgroundGroup7,opponentBackgroundGroup6,shadowGroup3tris,cursorGroup3bis,topPlayerGroup2,topOpponentGroup1)
		paper_player = drawP(playerPapers5,this.game,w4*3,-h)
		paper_opponent = drawP(opponentPapers4,this.game,w4,-h)
		menuPaper=drawMenuPaper(this.menuPaper,menuPaperGroup8,this.game)
		text=drawText(this.game,timerGroup0)
		effect=	draweffect(this.game)

		//DEPLACEMENT DES GROUPES AU DEBUT (TEXTE TOP - TIMER - SHADOW)
		topOpponentGroup1.position.y=h2
		topPlayerGroup2.position.y=h2
		timerGroup0.position.y=h2-200
		background.table_opponent.y=h
		background.table_player.y=h

		//DEPLACEMENT DES BACKGROUND POUR ANIMER LE JEU
		displacement_background_opponent_and_player(opponentBackgroundGroup6,topOpponentGroup1,playerBackgroundGroup7,topPlayerGroup2,this.game)
		displacement_background_shadow(background.table_opponent,background.table_player,topPlayerGroup2,topOpponentGroup1,timerGroup0,this.game)

		//EFFECT SUR LE TIMER
		effect.deform_main(text.time_shadow)

	},

	update: function(){

		//filtre en gris
		if (playerPapers5.y > h2+h ) {
			background.player.filters=[background.grayfiltertop]
			background.player_top.filters=[background.grayfiltertop]

		}
		if (opponentPapers4.y > h2+h ) {
			//paper_player.main.isOutOfMiddleTable=true;
			background.opponent.filters=[background.grayfiltertop]
			background.opponent_top.filters=[background.grayfiltertop]

		}
		//timer 
		background.cursor_player.y=this.game.input.activePointer.y
		background.cursor_palpitant.y=this.game.input.activePointer.y
		background.cursor_opponent.y=background.cursor_palpitant_opponent.y
		background.cursor_opponent_particle.y=background.cursor_palpitant_opponent.y

		// cursor avec pression exercée
		if (this.game.input.activePointer.duration > 500 && this.game.time.now > delay_paper_fall+delay_paper_fall*.5 ) {
			background.cursor_player_particle.on=true
			background.cursor_player_particle.y= background.cursor_player.y
			if (background.cursor_player.alpha <= 0.2) {
				background.cursor_player.isRaise=true
			} else if (background.cursor_player.alpha >= .59) {
				background.cursor_player.isRaise=false	
			}
			if ( background.cursor_player.isRaise ) {
				background.cursor_player.alpha +=.02
			} else {
				background.cursor_player.alpha -=.02
			}

			background.text_name_player_shadow.visible=true
			background.panimTween_shadow.resume()
			background.panimTween.resume()
		}
		else
		{
			background.cursor_player_particle_destroy()
			background.cursor_player.alpha=0
			background.text_name_player_shadow.visible=false
			background.panimTween_shadow.pause()
			background.panimTween.pause()
		}

		// temps écoulé
		time_elapsed(this.game)

		//chute des papiers	
		paper_opponent.opponentfall(background.cursor_palpitant_opponent,background.cursor_opponent,background.cursor_opponent_particle)	
		paper_player.fall()	

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

}
