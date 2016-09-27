function draw_little_roll(game,Group,posx,posy) {
	var e = []
	e.main=game.add.sprite(posx,posy,"roll")
	e.main.anchor.x=.5
	e.main.anchor.y=.5
	e.main.alpha=0
	e.transition=game.add.tween(e.main).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
		return e
	}
