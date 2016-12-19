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
	}	
	this.group.add(this)	
	this.group.add(this.heart)

}

Roll.prototype = Object.create(Phaser.Sprite.prototype)
Roll.prototype.constructor = Roll




R = R || {}
