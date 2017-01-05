var R = R || {}
Roll = function(game,group,posx,posy,id) {
	this.posx=posx
	this.posy=posy
	this.group=group
	Phaser.Sprite.call(this,game,this.posx,this.posy,'roll')
	this.anchor.x=.5
	this.anchor.y=.5
	this.id=id
	//nombre de coeur

	this.taille=50
	this.heart = game.add.bitmapText(this.posx,this.posy-60,"lucky",this.taille)
	this.heart.anchor.x=.5
	this.heart.anchor.y=.5
	if (this.id=="player"){
		this.heart.text=parameter.number_heart_player
	}else{
		this.heart.text=parameter.number_heart_opponent
		console.log(parameter.number_heart_opponent,"dansroll")
	}	
	this.group.add(this)	
	this.group.add(this.heart)

	this.time_tween=100
	this.tween=game.add.tween(this.scale).to({x:2,y:2},this.time_tween,Phaser.Easing.Linear.None,true,0,-1)
	this.tween.yoyo(this.time_tween,true)
	this.tween.pause()
}

Roll.prototype = Object.create(Phaser.Sprite.prototype)
Roll.prototype.constructor = Roll

//animation lorsque les papiers arrivent sur lui
Roll.prototype.give_heart_animation = function() {
	this.tween.resume()
}

//stop animation lorsque les papiers arrivent sur lui
Roll.prototype.stop_give_heart_animation = function() {
	console.log('msgroll')
	this.tween.pause()	
	this.scale.setTo(1,1)
}

//counter 
Roll.prototype.update_counter = function(){
	if (this.id=="player"){
		
		parameter.number_heart_player=parseInt(parameter.number_heart_player)+1
		this.heart.text=parameter.number_heart_player
		parameter.number_heart_opponent=parseInt(parameter.number_heart_opponent)-1
		little_roll_opponent.heart.text=parameter.number_heart_opponent
	}else{
		parameter.number_heart_opponent=parseInt(parameter.number_heart_opponent)+1
		this.heart.text=parameter.number_heart_opponent
	}	

}


R = R || {}
