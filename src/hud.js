//TODO:this.angle_array

//////////////////////////////////////////////////////////////////////////////////////////
//huds.js
Timer = function(game,Group){
	this.flag_for_update_check_white_side=false
	//variable pour stocker le temps
	this.timer_value="40"
	//temps pour que la hachure fasse un éclat brillant
	this.time_eclat=400
	this.flag_clic=false
	//group
	this.Group=Group
	//disque noir du timer 
	this.time_shadow=drawSprite(this.Group,game,"timer",w2,h2+300,w*.255,w*.255,.5,0,1)
	this.time_shadow.inputEnabled=true
	//texte du timer
	this.timer_text = game.add.bitmapText(w2,h2+300,'lucky',this.timer_value, w*.15)
	//pour lancer ou non la function time_decount
	this.flag = false
	//afficheage de VS
	this.timer_text.text="Vs"
	this.tween_for_circle_network={}
	this.dot_for_clic=game.add.sprite(w2,h2+300,'little_circle_for_network')
	this.dot_for_clic.anchor.setTo(.5,.5)
	this.dot_for_clic.visible=false
	this.tween_for_dot_clic=game.add.tween(this.dot_for_clic.scale).to({x:3,y:3},500,Phaser.Easing.Linear.None,true,0,1)
	this.tween_for_dot_clic.yoyo(500,true)	
	this.tween_for_dot_clic.pause()
	Group.add(this.dot_for_clic)


	this.circle=[]
	for (var i = 0; i < 3; i++) {
		this.circle[i]=game.add.sprite(w2-120+i*100,h2+260,'little_circle_for_network')
		this.circle[i].alpha=0
		this.tween_for_circle_network[i]=game.add.tween(this.circle[i]).to({alpha:1},300,Phaser.Easing.Linear.None,true,i*300,-1)
		this.tween_for_circle_network[i].yoyo(true,300)
		this.tween_for_circle_network[i].pause()
		Group.add(this.circle[i])
	}




	//pour ne pas le voir au début voir transitionsgroup
	this.timer_text.alpha=0
	//pour définir quel partie de l'écran va se mettrre en surbrillance pour le choix du joueur
	this.winner_flag="none"
	//time pour faire tourner la roulette
	this.time_roulette=800
	this.time_roulette_alpha=200
	// lancement de la fonction pour le décompte du temps qui ne se déclenche qu'avec le this.flag voir
	//voir function move_time
	game.time.events.loop(1000,this.time_decount,this)

	//modifications des anchors
	this.timer_text.anchor.x=.5
	this.timer_text.anchor.y=.4

	//spirale pour la roulette
	this.spiral=game.add.sprite(w2,h2+300,'spiral')
	this.spiral.anchor.x=.5
	this.spiral.anchor.y=.5
	this.spiral.alpha=1
	//table pour les différents angles aléatoires
	this.angle_array=[2820,2930]
	//this.angle_array=[2820,2920,2740,2850,2760,1700,2800,2910,2020,2930]
	//formule pour définir aléatoirement l'angle
	this.angular = this.angle_array[Math.floor(game.rnd.between(1,this.angle_array.length-1))];

	//roll
	Phaser.Sprite.call(this,game,w2,h2+300,'roll_turn')
	this.anchor.x=.5
	this.anchor.y=.5

	//cache au debut	
	this.visible=false
	this.alpha=0
	this.spiral.visible=false

	//ajout aux groupes
	this.Group.add(this.timer_text)
	this.Group.add(this.spiral)
	this.Group.add(this)
}

Timer.prototype = Object.create(Phaser.Sprite.prototype)
Timer.prototype.constructor = Timer

//petits cercle qui s'animent pour la recherche de réseau
Timer.prototype.animate_circle = function() {
	for (var i = 0; i < 3; i++) {
		this.tween_for_circle_network[i].resume()
	}

}

Timer.prototype.pause_animate_circle = function() {
	for (var i = 0; i < 3; i++) {
		this.tween_for_circle_network[i].pause()
		this.circle[i].alpha=1
	}

}





Timer.prototype.stop_animate_circle = function() {
	for (var i = 0; i < 3; i++) {
		this.circle[i].visible=false
		this.tween_for_circle_network[i].pause()
	}
}


//décompte du temps
Timer.prototype.time_decount=function(){
	/*
	 * le flag permet de mettre en pause le décompte du temps 
	 * utilisé dans le cas du choix entre le player et l'opponent pour voir qui joue en premier
	 */
	if (this.flag){
		if (this.timer_value == 0) {
		}
		else {
			this.timer_value--
		}
		this.timer_text.setText(this.timer_value)
	}
}

//affiche la roulette désignant au hasard le choix entre le player et l'opponent
Timer.prototype.turn_chooce = function() {
	this.flag_for_update_check_white_side=true
	this.visible=true
	this.spiral.visible=true
	this.tween_main=game.add.tween(this).to({alpha:1},this.time_roulette_alpha,Phaser.Easing.Linear.None,true,0)
	this.tween=game.add.tween(this).to({angle:this.angular},this.time_roulette,Phaser.Easing.Circular.Out,true,1000)
	this.tween_spiral=game.add.tween(this.spiral).to({angle:this.angular},this.time_roulette,Phaser.Easing.Circular.Out,true,1000)
	this.tween_spiral2=game.add.tween(this.spiral).to({alpha:0},this.time_roulette,Phaser.Easing.Linear.None,true,1000)
	this.tween.onComplete.add(this.retardateur2,this)
}

//retardateur2
Timer.prototype.retardateur2=function(){
	game.time.events.add(300,this.check_angle,this)
}

//vérifier l'angle du rouleau
Timer.prototype.check_angle=function(){

	this.flag_for_update_check_white_side=false
	if (this.angle < 90 && this.angle > -90){
		this.winner()
	} else{
		this.looser()
	}
}

//animer le coté player ou opponent en fonction de la roulette de hasard
Timer.prototype.update = function() {
	if(this.flag_for_update_check_white_side){
		if (this.angle < 90 && this.angle > -90){
			this.light_player()
		} else{
			this.light_opponent()
		}
	}
}

Timer.prototype.light_player = function() {
	menuPaper.white.visible=true	
	menuPaper_opponent.white.visible=false	
}
Timer.prototype.light_opponent = function() {
	menuPaper.white.visible=false	
	menuPaper_opponent.white.visible=true	

}


//opponent choisi
Timer.prototype.looser=function(){
	console.log("looser")
	this.winner_flag=false
	this.tween_eclat_opponent=game.add.tween(G.contour_opponentGroup9).to({alpha:1},this.time_eclat,Phaser.Easing.Bounce.Out,true,200)
	this.tween_eclat_opponent.onComplete.add(this.next_looser,this)
}

Timer.prototype.next_looser = function() {
	this.tween_eclat_opponent_next=game.add.tween(G.contour_opponentGroup9).to({alpha:0},200,Phaser.Easing.Bounce.In,true,0)
	this.tween_eclat_opponent_next.onComplete.add(this.retardateur1,this)
	menuPaper_opponent.move_roll_paper()
	menuPaper.anim_repere()
}

Timer.prototype.winner=function(){
	this.winner_flag=true
	this.tween_eclat_player=game.add.tween(G.contour_playerGroup9).to({alpha:1},this.time_eclat,Phaser.Easing.Bounce.Out,true,200)
	this.tween_eclat_player.onComplete.add(this.next_winner,this)
}

Timer.prototype.next_winner = function() {
	this.tween_eclat_player_next=game.add.tween(G.contour_playerGroup9).to({alpha:0},200,Phaser.Easing.Bounce.In,true,0)
	this.tween_eclat_player_next.onComplete.add(this.retardateur1,this)
	menuPaper.move_roll_paper()
	menuPaper_opponent.anim_repere()
}

//retardateur1
Timer.prototype.retardateur1=function(){
	this.tween_hide=game.add.tween(this).to({alpha:0},100,Phaser.Easing.Linear.None,true)
	this.move_time()
	//this.winner_flag = true ? game.time.events.add(100,this.reset_color_player,this):game.time.events.add(100,this.reset_color_opponent,this)
}

//PLUS NECESSAIRE
//changement pour remettre la couleur de la bordure du player
Timer.prototype.reset_color_player=function(){
	background.border_player_superieur.tint=background.color_player
	background.border_player_inferieur.tint=background.color_player
	background.border_player_gauche.tint=background.color_player
	background.border_player_droit.tint=background.color_player
	this.tween_hide=game.add.tween(this).to({alpha:0},100,Phaser.Easing.Linear.None,true)
	this.move_time()
	//this.tween_hide.onComplete.add(this.move_time,this)
}

//PLUS NECESSAIRE
//changement pour remettre la couleur de la bordure de l'opponent
Timer.prototype.reset_color_opponent=function(){
	background.border_opponent_superieur.tint=background.color_opponent
	background.border_opponent_inferieur.tint=background.color_opponent
	background.border_opponent_gauche.tint=background.color_opponent
	background.border_opponent_droit.tint=background.color_opponent
	this.tween_hide=game.add.tween(this).to({alpha:0},100,Phaser.Easing.Linear.None,true)
	this.move_time()
	//this.tween_hide.onComplete.add(this.move_time,this)
}

//timer qui va du milieu vers le bas
//attention delay ajouté via reveal_text()
Timer.prototype.move_time=function(){
	game.time.events.add(150,this.reveal_text,this)
	this.tween00=game.add.tween(this.Group).to({x:0,y:h2-450},400,Phaser.Easing.Elastic.Out,true)
	this.tween00.onComplete.add( function(){background.flag_close=true,this.flag=true
	},this)
}

Timer.prototype.reveal_text = function() {
	this.timer_text.visible=true
	this.timer_text.text=this.timer_value
}

//TODO:mettre ici foinction pour afficher clic lanceable uniqueement lorsque flag est bon
Timer.prototype.update = function() {
if (this.flag_clic) {
	this.flag_clic=false
	this.dot_for_clic.visible=true
this.tween_for_dot_clic.resume()	
}	
}

Timer.prototype.hide_dot_for_clic = function() {
	this.tween_reveal_vs=game.add.tween(this.timer_text).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0)
	this.dot_for_clic.visible=false	
}









