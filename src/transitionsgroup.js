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

//ouverture des PANNEAUX
init_transitions.prototype.displacement_background_opponent_and_player=function(){

	displacement_position(game,this.g6,-w,0,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,this.g1,-w,h2,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,this.g7,w,0,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,this.g2,w,h2,delay_open_panel_background,time_open_panel_background,"Bounce.out")

	//deplace le timer du bas vers le milieu et rend la roulette visible et actionne la roulette pour le hasard
	//declenchemet de la roulette hasard
	this.move_timer_for_chooce()
}

init_transitions.prototype.move_timer_for_chooce=function(){
	var delay_for_chooce=delay_open_panel_background+time_open_panel_background
	//TODO cette transition n'est plus nécessaire seul compte l'action oncomplete
	this.tween_move_timer_for_chooce=game.add.tween(this.g0).to({x:0,y:0},100,Phaser.Easing.Bounce.Out,true,delay_for_chooce)
	this.tween_move_timer_for_chooce.onComplete.add(this.action_turn_chooce,this)
}

// pour cacher le timer et le mettre en pause + actionner la roulette
init_transitions.prototype.action_turn_chooce=function(){
	hud.turn_chooce()
	hud.timer_text.visible=false
}

//////////////////////////////////////////////////////////////////////////////////////////
//FERMETURE DES PANNEAUX DE BACKGROUND ET DES TEXTES SUPERIEURS
//|-----||-----|
//|     ||     |
//|  @  ||  @  | 
//|     ||     | 
//|-----||-----|
init_transitions.prototype.displacement_background_opponent_and_player_close = function(){


little_roll_player.heart.text=parameter.number_heart_player
little_roll_opponent.heart.text=parameter.number_heart_opponent
		//this.amount_of_heart_paper.text=parameter.number_heart_opponent

	this.retardateur()
	game.add.tween(this.g6).to({x:0,y:0},time_close_panel_background,Phaser.Easing.Bounce.Out,true,0)
	game.add.tween(this.g1).to({x:0,y:h2},time_close_panel_background,Phaser.Easing.Bounce.Out,true,0)
	game.add.tween(this.g7).to({x:0,y:0},time_close_panel_background,Phaser.Easing.Bounce.Out,true,0)
	this.tween_displacement_position=game.add.tween(this.g2).to({x:0,y:h2},time_close_panel_background,Phaser.Easing.Bounce.Out,true,0)
	this.tween_displacement_position.onComplete.add(this.perspective,this)
	}
//retardateur

init_transitions.prototype.retardateur=function(){
	game.time.events.add(delay_paper_fall,this.resetflag,this)
	game.time.events.add(time_close_panel_background+time_shadow_up_and_texte_up+1900,this.text_visible,this)
}

//rendre visible les textes permettant de mesurer la chute 
init_transitions.prototype.text_visible=function(){
	paper_player.text_position.visible=true
	paper_opponent.text_position.visible=true
}

//pour déclencher la chute des papiers
init_transitions.prototype.resetflag=function(){

	paper_opponent.isFalling=true
	paper_player.isFalling=true
	paper_player.body.moves=true
	paper_opponent.body.moves=true
}

//symboliser la perspective
init_transitions.prototype.perspective=function() {

//background_top qui redeviennent visible
	game.time.events.add(time_shadow_up_and_texte_up,function(){background.player_top.alpha=1,background.opponent_top.alpha=1})




	//texte qui apparaissent
	background.tween_begin_game()
	//déplacement de l'ombre
	displacement_position(game,background.table_opponent,0,h2,0,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,background.table_player,w2,h2,0,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,this.g2,0,0,0,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,this.g1,0,0,0,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,this.g0,0,-300,0,time_shadow_up_and_texte_up,"Linear.None")
	//modification de l'alpha pour symboliser la perspective
	displacement_alpha(game,background.table_opponent,.8,0,time_shadow_up_and_texte_up,"Linear.None")
	displacement_alpha(game,background.table_player,.8,0,time_shadow_up_and_texte_up,"Linear.None")
}

//pour faire apparaitre le rectangle qui montre que la position des papiers est lock
init_transitions.prototype.lock_position = function(obj){
	obj.visible=true
	obj.alpha=.01
	displacement_alpha(game,obj,.9,0,900,"Bounce.Out")
	//TODO
	//faire disparaitre l'élément après
}

T = T || {}







