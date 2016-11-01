var T = T || {}

init_transitions = function(game){

	this.g9=G.shadowPaperGroup9 
	this.g8=G.menuPaperGroup8 
	this.g7=G.playerBackgroundGroup7 
	this.g6=G.opponentBackgroundGroup6 
	this.g5=G.playerPapers5 
	this.g4=G.opponentPapers4 
	this.g3tris=G.shadowGroup3tris 
	this.g3bis=G.cursorGroup3bis
	this.g3=G.timerGroup3 
	this.g2=G.topPlayerGroup2
	this.g1=G.topOpponentGroup1
	this.g0=G.timerGroup0

	init_transitions.prototype = Object.create(Phaser.Sprite.prototype)
	init_transitions.prototype.constructor = init_transitions

	//////////////////////////////////////////////////////////////////////////////////////////
	//FERMETURE DES 2 PANNEAUX + ENCHAINEMENTS OMBRE POUR SYMBOLISER LA PERSPECTIVE ET DES TEXTES QUI APPARAISSENT
	//this.g6 est l'opponent
	//this.g1 est le player
	//this.g2 est le texte supérieur de l'opponent
	//this.g2 est le texte supérieur du player
}

//////////////////////////////////////////////////////////////////////////////////////////
//DEPLACEMENT DES PANNEAUX DE BACKGROUND ET DES TEXTES SUPERIEURS
// Les obj symbolise des groupes
//this.g6=opponent
//this.g1=top texte de l'opponent
//obj3= players
//this.g2: top texte du player
//|-----||-----|
//|     ||     |
//|  @  ||  @  | 
//|     ||     | 
//|-----||-----|

//|-----|   |-----|
//|     |   |     |
//|  @  |   |  @  | 
//|     |   |     | 
//|-----|   |-----|

init_transitions.prototype.displacement_background_opponent_and_player=function(){

	displacement_position(game,this.g6,-w,0,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,this.g1,-w,h2,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,this.g7,w,0,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,this.g2,w,h2,delay_open_panel_background,time_open_panel_background,"Bounce.out")

	//deplace le timer du bas vers le milieu et rend la roulette visible et actionne la roulette pour le hasard
	this.move_timer_for_chooce=function(){	
		var delay_for_chooce=delay_open_panel_background+time_open_panel_background
		console.log(this.g0,"ttt")
		this.tween_move_timer_for_chooce=game.add.tween(this.g0).to({x:0,y:0},time_open_panel_background-200,Phaser.Easing.Linear.None,true,delay_for_chooce)
		//console.log(this.tween_move_timer_for_chooce, "tww")
		this.tween_move_timer_for_chooce.onComplete.add(next,this)

		// pour cacher le timer et le mettre en pause
		function next(){
			hud.turn_chooce()
			hud.flag=false
			hud.timer.visible=false
		}
	}
	this.move_timer_for_chooce()
}
//////////////////////////////////////////////////////////////////////////////////////////
//FERMETURE DES PANNEAUX DE BACKGROUND ET DES TEXTES SUPERIEURS
//|-----||-----|
//|     ||     |
//|  @  ||  @  | 
//|     ||     | 
//|-----||-----|

init_transitions.prototype.displacement_background_opponent_and_player_close = function(){

	game.time.events.add(delay_paper_fall,resetflag,this)

	function resetflag() {
		paper_opponent.main.isFalling=true
		paper_player.main.isFalling=true
	}

	displacement_position(game,this.g6,0,0,0,time_close_panel_background,"Bounce.Out")
	displacement_position(game,this.g1,0,h2,0,time_close_panel_background,"Bounce.Out")
	displacement_position(game,this.g7,0,0,0,time_close_panel_background,"Bounce.Out")
	displacement_position(game,this.g2,0,h2,0,time_close_panel_background,"Bounce.Out")


	//////////////////////////////////////////////////////////////////////////////////////////
	//DEPLACEMENT DE L'OMBRE DE LA TABLE POUR SYMBOLISER LA VUE QUI VA VERS LE HAUT
	// les times sont renseignés dans parameters
	//|--@--||--@--|
	//|     ||     |
	//||||||||||||||    
	//||||||||||||||    
	//|-----||-----|
	game.time.events.add(time_close_panel_background,next_tween,this)
	game.time.events.add(time_close_panel_background+time_shadow_up_and_texte_up+1900,next,this)

	function next(){
		background.text_position_player.visible=true
		background.text_position_opponent.visible=true

	}

	function next_tween() {
		//texte qui apparaissent
		background.tween_begin_game()
		//déplacement de l'ombre
		displacement_position(game,background.table_opponent,0,h2,0,time_shadow_up_and_texte_up,"Linear.None")
		displacement_position(game,background.table_player,w2,h2,0,time_shadow_up_and_texte_up,"Linear.None")
		displacement_position(game,this.g2,0,0,0,time_shadow_up_and_texte_up,"Linear.None")
		displacement_position(game,this.g1,0,0,0,time_shadow_up_and_texte_up,"Linear.None")
		displacement_position(game,this.g0,0,0,0,time_shadow_up_and_texte_up,"Linear.None")
		//modification de l'alpha pour symboliser la perspective
		displacement_alpha(game,background.table_opponent,.8,0,time_shadow_up_and_texte_up,"Linear.None")
		displacement_alpha(game,background.table_player,.8,0,time_shadow_up_and_texte_up,"Linear.None")
	}
}


T = T || {}

