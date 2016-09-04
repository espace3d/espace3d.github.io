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

	//////////////////////////////////////////////////////////////////////////////////////////
	//GROUP
	groupnull = null

	//1. topOpponentGroup1 --  bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> opponent
	//2. topPlayerGroup2 -- bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> player
	//3. timerGroup3 -- timer + rond  
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
	timerGroup3 = null
	topPlayerGroup2=null
	topOpponentGroup1=null

	//////////////////////////////////////////////////////////////////////////////////////////
}

theGame.prototype = {
	create: function(){

		//ordre des groupes ici
		//group null sert pour cacher les éléments du canevas original

		groupnull = this.game.add.group();

		shadowPaperGroup9 = this.game.add.group()
		menuPaperGroup8 = this.game.add.group()
		playerBackgroundGroup7 = this.game.add.group()
		opponentBackgroundGroup6 = this.game.add.group()
		playerPapers5 = this.game.add.group()
		opponentPapers4 = this.game.add.group()
		timerGroup3 = this.game.add.group()
		topPlayerGroup2=this.game.add.group()
		topOpponentGroup1=this.game.add.group()

		// declaration des variables via les constructor
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


		background=drawBackground(this.game,menuPaperGroup8,playerBackgroundGroup7,opponentBackgroundGroup6,topPlayerGroup2,topOpponentGroup1)
		paper_player = drawP(playerPapers5,this.game,w4*3,-h)

		paper_opponent = drawP(opponentPapers4,this.game,w4,-h)


		//deplacement des background
		displacement_background_opponent_and_player(opponentBackgroundGroup6,playerBackgroundGroup7,this.game)
		displacement_text(topOpponentGroup1,topPlayerGroup2,this.game)
		displacement_background_shadow(background.table_opponent,background.table_player,topPlayerGroup2,topOpponentGroup1,this.game)

		menuPaper=drawMenuPaper(this.menuPaper,menuPaperGroup8,this.game)
		text=drawText(this.game,timerGroup3)

	},

	update: function(){
		//timer 
		//////////////////////////////////////////////////////////////////////////////////////////
		if (this.game.input.activePointer.duration > 500 && this.game.input.activePointer.y < h2) {
			background.p_shadow.visible=true
			background.panimTween_shadow.resume()
			background.panimTween.resume()
			background.cursor_player.visible=true
			background.cursor_player.y=this.game.input.activePointer.y
			background.cursor_palpitant.y=this.game.input.activePointer.y
		}
		else
		{
			background.cursor_player.visible=false
			background.p_shadow.visible=false
			background.panimTween_shadow.pause()
			background.panimTween.pause()
		}

		//if (paper_player.main.y > h2) {
			//paper_player.main.isFalling=true
		//} else {
			//paper_player.main.isFalling=false
		
		//}
		time_elapsed(this.game)
		paper_opponent.fall(background.shadowPaperPlayer)	
		paper_player.fall(background.shadowPaperOpponent)	
		//shakeText(background.player,this.game)
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
