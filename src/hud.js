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
			if (timer_value == 0) {
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
	this.angle_array=[220,320,140,150,160,70,80,110,1020,930]
	this.angular = this.angle_array[Math.floor(game.rnd.between(1,this.angle_array.length-1))];


	Phaser.Sprite.call(this,game,w2,h2,'roll_turn')
	this.anchor.x=.5
	this.anchor.y=.5

	//cache au debut	
	this.visible=false
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
	this.tween=game.add.tween(this).to({angle:this.angular},1000,Phaser.Easing.Circular.Out,true,1000)
	this.tween_spiral=game.add.tween(this.spiral).to({angle:this.angular},1000,Phaser.Easing.Circular.Out,true,1000)
	this.tween.onComplete.add(check_angle,this)
	this.tween_spiral2=game.add.tween(this.spiral).to({alpha:0},1000,Phaser.Easing.Linear.None,true,1000)

	function check_angle() {
		//retabli le timer et fait disparaitre la roulette 
		this.tween_hide=game.add.tween(this).to({alpha:0},200,Phaser.Easing.Linear.None,true)
		this.tween_hide.onComplete.add(move_timer,this)

		function move_timer(){
			var tween=game.add.tween(this.Group).to({x:0,y:h2-150},1000,Phaser.Easing.Linear.None,true)
tween.onComplete.add(next,this)
function next(){
background.flag_close=true
}


		}

		this.flag=true
		this.timer.visible=true

		if (this.angle < 90 && this.angle > -90){
			console.log("winner")

		} else{
			console.log("looser")
		}
	}
}

