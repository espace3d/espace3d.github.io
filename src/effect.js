function draweffect(game) {

	var e=[]

		e.scale_x=[.8,.7]
		e.scale_y=[.8,.7]
		e.turn=0

		e.deform_main=function (obj){
			e.turn=1-e.turn
				game.add.tween(obj.scale).to({x:e.scale_x[e.turn], y:e.scale_y[e.turn]},200,Phaser.Easing.Linear.None,true,0,-1,true)

		}

	return e
}
