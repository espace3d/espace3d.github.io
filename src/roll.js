var R = R || {}
R.draw_little_roll=function(game,Group,posx,posy) {
	//var e = []
	this.main=game.add.sprite(posx,posy,"roll")
	this.main.anchor.x=.5
	this.main.anchor.y=.5
	this.main.alpha=0
	Group.add(this.main)
	//this.transition=game.add.tween(this.main).to({alpha:1},5000,Phaser.Easing.Linear.None,true,delay_paper_fall)
	return this
}
R = R || {}
