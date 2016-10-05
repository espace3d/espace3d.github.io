function draweffect(game) {

	var e=[]

	e.scale_x=[1,.75]
	e.scale_y=[.7,1]
	e.turn=0

	e.deform_main=function (obj){
		e.turn=1-e.turn
		e.deform_main_tween=game.add.tween(obj.scale).to({x:e.scale_x[e.turn], y:e.scale_y[e.turn]},250,Phaser.Easing.Linear.None,true,0,-1,true)
		e.deform_main_tween.onComplete.add(() => e.deform_main(obj),this)
		return e.deform_main_tween,e.turn
	}

	e.scale_x_text=[1,1]
	e.scale_y_text=[.05,1]
	e.turn_text=0

	e.deform_text=function (obj){
		e.turn_text=1-e.turn_text
		e.deform_text_tween=game.add.tween(obj.scale).to({x:e.scale_x_text[e.turn], y:e.scale_y_text[e.turn]},150,Phaser.Easing.Linear.None,true,0,0,true)
		e.deform_text_tween.onComplete.add(() => e.deform_text(obj),this)
		return e.deform_text_tween
	}

	e.scale_x_timer=[.1,1]
	e.scale_y_timer=[.1,1]
	e.turn_timer=0

	e.disappears_timer=function (obj){
		console.log("disappears_timer")
		e.tween=game.add.tween(obj.scale).to({x:e.scale_x_timer[e.turn_timer], y:e.scale_y_timer[e.turn_timer]},100,Phaser.Easing.Linear.None,true,0,0,true)
	}

	return e
}
