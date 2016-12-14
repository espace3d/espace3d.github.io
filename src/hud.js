//////////////////////////////////////////////////////////////////////////////////////////
//huds.js
Timer = function(game,Group){
	//variable pour stocker le temps
	this.timer_value="40"
	//group
	this.Group=Group
	//disque noir du timer 
	this.time_shadow=drawSprite(this.Group,game,"timer",w2,h2+300,w*.255,w*.255,.5,0,.6)
	this.time_shadow.inputEnabled=true
	//texte du timer
	this.timer_text = game.add.bitmapText(w2,h2+300,'lucky',this.timer_value, w*.15)
	//pour lancer ou non la function time_decount
	this.flag = false
	//afficheage de VS
	this.timer_text.text="Vs"
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
	this.angle_array=[2820,2920,2740,2850,2760,1700,2800,2910,2020,2930]
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
	if (this.angle < 90 && this.angle > -90){
		this.winner()
	} else{
		this.looser()
	}
}

//opponent choisi
Timer.prototype.looser=function(){

	console.log("looser")
	this.winner_flag=false
	background.alpha=0
	//game.add.tween(menuPaper.fond).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,1100)

	background.border_opponent_droit.alpha=0
	background.border_opponent_droit.tint=white
	game.add.tween(background.border_opponent_droit).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

	background.border_opponent_gauche.alpha=0
	background.border_opponent_gauche.tint=white
	game.add.tween(background.border_opponent_gauche).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

	background.border_opponent_superieur.alpha=0
	background.border_opponent_superieur.tint=white
	game.add.tween(background.border_opponent_superieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

	background.border_opponent_inferieur.alpha=0
	background.border_opponent_inferieur.tint=white
	this.tween4=game.add.tween(background.border_opponent_inferieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)
	this.tween4.onComplete.add(this.retardateur1,this)
menuPaper_opponent.move_roll_paper()
menuPaper.anim_repere()
}

//player choisi
Timer.prototype.winner=function(){
	this.winner_flag=true
	console.log("winner")
	background.alpha=0
	//game.add.tween(menuPaper.fond).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,1100)

	background.border_player_droit.alpha=0
	background.border_player_droit.tint=white
	game.add.tween(background.border_player_droit).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

	background.border_player_gauche.alpha=0
	background.border_player_gauche.tint=white
	game.add.tween(background.border_player_gauche).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

	background.border_player_superieur.alpha=0
	background.border_player_superieur.tint=white
	game.add.tween(background.border_player_superieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

	background.border_player_inferieur.alpha=0
	background.border_player_inferieur.tint=white
	this.tween4=game.add.tween(background.border_player_inferieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)
	this.tween4.onComplete.add(this.retardateur1,this)
menuPaper.move_roll_paper()
menuPaper_opponent.anim_repere()
}
//retardateur1
Timer.prototype.retardateur1=function(){
	this.winner_flag = true ? game.time.events.add(100,this.reset_color_player,this):game.time.events.add(100,this.reset_color_opponent,this)
}

//changement pour remettre la couleur de la bordure du player
Timer.prototype.reset_color_player=function(){
	background.border_player_superieur.tint=background.color_player
	background.border_player_inferieur.tint=background.color_player
	background.border_player_gauche.tint=background.color_player
	background.border_player_droit.tint=background.color_player
	this.tween_hide=game.add.tween(this).to({alpha:0},200,Phaser.Easing.Linear.None,true)
	this.tween_hide.onComplete.add(this.move_time,this)
}
//changement pour remettre la couleur de la bordure de l'opponent
Timer.prototype.reset_color_opponent=function(){
	background.border_opponent_superieur.tint=background.color_opponent
	background.border_opponent_inferieur.tint=background.color_opponent
	background.border_opponent_gauche.tint=background.color_opponent
	background.border_opponent_droit.tint=background.color_opponent
	this.tween_hide=game.add.tween(this).to({alpha:0},200,Phaser.Easing.Linear.None,true)
	this.tween_hide.onComplete.add(this.move_time,this)
}

//timer qui remonte du bas vers le milieu
Timer.prototype.move_time=function(){
		var tween00=game.add.tween(this.Group).to({x:0,y:h2-450},650,Phaser.Easing.Elastic.Out,true)
	this.timer_text.text=this.timer_value
	tween00.onComplete.add( function(){background.flag_close=true,this.flag=true,this.timer_text.visible=true
	},this)
}











