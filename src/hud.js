//////////////////////////////////////////////////////////////////////////////////////////
//huds.js
Timer = function(game,Group){
	//variable pour stocker le temps
	var timer_value="40"
	this.Group=Group
	this.time_shadow=drawSprite(this.Group,game,"timer",w2,h2,w*.255,w*.255,.5,0,.6)
	this.time_shadow.inputEnabled=true
	this.time_rond=drawSprite(this.Group,game,"timer_white",w2,h2,w*.25,w*.25,.5,white,0)
	this.timer_text = game.add.bitmapText(w2,h2,'lucky',timer_value, w*.15)
	this.flag = true
	//decompte du temps
	this.timer_text.text="Vs"
	game.time.events.loop(Phaser.Timer.SECOND, updateCounter,this)

		/*
		 * le flag permet de mettre en pause le décompte du temps 
		 * utilisé dans le cas du choix entre le player et l'opponent pour voir qui joue en premier
		 */

	function updateCounter() {
		if (this.flag){
			if (timer_value == 0) {
			}
			else {
				timer_value--
			}
			this.timer_text.setText(timer_value)
		}
	}
	//modifications des anchors
	this.timer_text.anchor.x=.5
	this.timer_text.anchor.y=.4

	this.spiral=game.add.sprite(w2,h2,'spiral')
	this.spiral.anchor.x=.5
	this.spiral.anchor.y=.5
	this.spiral.alpha=1
	this.angle_array=[2820,2920,2740,2850,2760,1700,2800,2910,2020,2930]
	this.angular = this.angle_array[Math.floor(game.rnd.between(1,this.angle_array.length-1))];

	Phaser.Sprite.call(this,game,w2,h2,'roll_turn')
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

//affiche la roulette désignant au hasard le choix entre le player et l'opponent
Timer.prototype.turn_chooce = function() {
	this.visible=true
	this.spiral.visible=true
	this.tween_main=game.add.tween(this).to({alpha:1},900,Phaser.Easing.Linear.None,true,0)
	this.tween=game.add.tween(this).to({angle:this.angular},1000,Phaser.Easing.Circular.Out,true,1000)
	this.tween_spiral=game.add.tween(this.spiral).to({angle:this.angular},1000,Phaser.Easing.Circular.Out,true,1000)
	this.tween_spiral2=game.add.tween(this.spiral).to({alpha:0},1000,Phaser.Easing.Linear.None,true,1000)
	this.tween.onComplete.add(wait_a_little_before_choose,this)

	function wait_a_little_before_choose(){
		this.flag=true
		game.time.events.add(300,check_angle,this)
	}

	function check_angle(){
		//met en surbrillance les bodures du joueur choisi
		if (this.angle < 90 && this.angle > -90){
			console.log("winner")
			background.alpha=0
			game.add.tween(menuPaper.fond).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,1100)

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
			this.tween4.onComplete.add(next,this)


		} else{
			console.log("looser")

			background.alpha=0
			game.add.tween(menuPaper.fond).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,1100)

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
			this.tween4.onComplete.add(next00,this)

		}

	}
	function next00(){
		game.time.events.add(300,next2bis,this)
	}

	function next(){
		game.time.events.add(300,next2,this)
	}
	function next2(){
		background.border_player_superieur.tint=background.color_player
		background.border_player_inferieur.tint=background.color_player
		background.border_player_gauche.tint=background.color_player
		background.border_player_droit.tint=background.color_player
		this.tween_hide=game.add.tween(this).to({alpha:0},200,Phaser.Easing.Linear.None,true)
		this.tween_hide.onComplete.add(move_time,this)
	}
	function next2bis(){
		background.border_opponent_superieur.tint=background.color_opponent
		background.border_opponent_inferieur.tint=background.color_opponent
		background.border_opponent_gauche.tint=background.color_opponent
		background.border_opponent_droit.tint=background.color_opponent
		this.tween_hide=game.add.tween(this).to({alpha:0},200,Phaser.Easing.Linear.None,true)
		this.tween_hide.onComplete.add(move_time,this)
	}

	function move_time(){
		this.flag=true
		this.timer_text.visible=true
		var tween00=game.add.tween(this.Group).to({x:0,y:h2-150},300,Phaser.Easing.Linear.None,true)
		tween00.onComplete.add( function(){background.flag_close=true},this)
	}

}


