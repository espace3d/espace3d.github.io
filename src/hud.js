//////////////////////////////////////////////////////////////////////////////////////////
//huds.js
Timer = function(game,Group){
	//variable pour stocker le temps
	var timer_value="40"
	this.Group=Group
	this.time_shadow=drawSprite(this.Group,game,"timer",w2,h2,w*.255,w*.255,.5,0,.6)
	this.time_shadow.inputEnabled=true
	this.time_rond=drawSprite(this.Group,game,"timer_white",w2,h2,w*.25,w*.25,.5,white,0)
	this.timer = game.add.bitmapText(w2,h2,'lucky',timer_value, w*.15)
	this.flag = true
	//decompte du temps
	game.time.events.loop(Phaser.Timer.SECOND, updateCounter,this)

		/*
		 * le flag permet de mettre en pause le décompte du temps 
		 * utilisé dans le cas du choix entre le player et l'opponent pour voir qui joue en premier
		 */

	function updateCounter() {
		if (this.flag){
			if (timer_value == 0) {00
			}
			else {
				timer_value--
			}
			this.timer.setText(timer_value)
		}
	}
	//modifications des anchors
	this.timer.anchor.x=.5
	this.timer.anchor.y=.4

	this.spiral=game.add.sprite(w2,h2,'spiral')
	this.spiral.anchor.x=.5
	this.spiral.anchor.y=.5
	this.spiral.alpha=1
	this.angle_array=[2820,2920,2740,2850,2760,1700,2800,2910,2020,2930]
	this.angular = this.angle_array[Math.floor(game.rnd.between(1,this.angle_array.length-1))];

	Phaser.Sprite.call(this,game,w2,h2,'roll_turn')
	this.anchor.x=.5
	this.anchor.y=.5

	//cache au debut	0
	this.visible=false
	this.alpha=0
	this.spiral.visible=false
	//ajout aux groupes
	this.Group.add(this.timer)
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
	this.tween.onComplete.add(check_angle,this)
	this.tween_spiral2=game.add.tween(this.spiral).to({alpha:0},1000,Phaser.Easing.Linear.None,true,1000)

	function check_angle() {
		this.flag=true
		this.timer.visible=true
		//met en surbrillance les bodures du joueur choisi
		if (this.angle < 90 && this.angle > -90){
			console.log("winner")
			background.alpha=0
			this.tween0=game.add.tween(menuPaper.fond).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,1100)

			background.border_player_droit.alpha=0
			background.border_player_droit.tint=white
			this.tween1=game.add.tween(background.border_player_droit).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

			background.border_player_gauche.alpha=0
			background.border_player_gauche.tint=white
			this.tween2=game.add.tween(background.border_player_gauche).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

			background.border_player_superieur.alpha=0
			background.border_player_superieur.tint=white
			this.tween3=game.add.tween(background.border_player_superieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

			background.border_player_inferieur.alpha=0
			background.border_player_inferieur.tint=white
			this.tween4=game.add.tween(background.border_player_inferieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)
			this.tween4.onComplete.add(next,this)

			function next(){
			background.border_player_superieur.tint=background.color_player
			background.border_player_inferieur.tint=background.color_player
			background.border_player_gauche.tint=background.color_player
			background.border_player_droit.tint=background.color_player

			}

		} else{
			console.log("looser")

			background.alpha=0
			this.tween0=game.add.tween(menuPaper.fond).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,1100)

			background.border_opponent_droit.alpha=0
			background.border_opponent_droit.tint=white
			this.tween1=game.add.tween(background.border_opponent_droit).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

			background.border_opponent_gauche.alpha=0
			background.border_opponent_gauche.tint=white
			this.tween2=game.add.tween(background.border_opponent_gauche).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

			background.border_opponent_superieur.alpha=0
			background.border_opponent_superieur.tint=white
			this.tween3=game.add.tween(background.border_opponent_superieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)

			background.border_opponent_inferieur.alpha=0
			background.border_opponent_inferieur.tint=white
			this.tween4=game.add.tween(background.border_opponent_inferieur).to({alpha:1},900,Phaser.Easing.Bounce.Out,true,200)
			this.tween4.onComplete.add(next,this)

			function next(){
			background.border_opponent_superieur.tint=background.color_opponent
			background.border_opponent_inferieur.tint=background.color_opponent
			background.border_opponent_gauche.tint=background.color_opponent
			background.border_opponent_droit.tint=background.color_opponent
			}
		}



		//retabli le timer et fait disparaitre la roulette 
		this.tween_hide=game.add.tween(this).to({alpha:0},200,Phaser.Easing.Linear.None,true)
		this.tween_hide.onComplete.add(move_timer,this)

		function move_timer(){
			var tween=game.add.tween(this.Group).to({x:0,y:h2-150},300,Phaser.Easing.Linear.None,true)
			tween.onComplete.add(next,this)
			function next(){
				background.flag_close=true

			}
		}

	}
}

