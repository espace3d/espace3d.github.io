var E=E || {}
function draweffect(game) {

	var e=[]
	e.deform_text_flag=true
	e.disappears_timer_flag=true

	e.scale_x=[1,.85]
	e.scale_y=[.8,1]
	e.turn=0

	e.deform_main=function (obj){
		if (e.deform_text_flag && e.disappears_timer_flag){
			e.turn=1-e.turn
			e.deform_main_tween=game.add.tween(obj.scale).to({x:e.scale_x[e.turn], y:e.scale_y[e.turn]},250,Phaser.Easing.Linear.None,true)
			e.deform_main_tween.onComplete.add(() => e.deform_main(obj),this)
		}
	}


	e.scale_x_text=[.9,1]
	e.scale_y_text=[1,.9]
	e.turn_text=0


	e.deform_text=function (obj){
		if (e.deform_text_flag && e.disappears_timer_flag){
			e.turn_text=1-e.turn_text
			e.deform_text_tween=game.add.tween(obj.scale).to({x:e.scale_x_text[e.turn], y:e.scale_y_text[e.turn]},250,Phaser.Easing.Linear.None,true)
			e.deform_text_tween.onComplete.add(() => e.deform_text(obj),this)
		}
	}

	e.scale_x_timer=.01
	e.scale_y_timer=.01

	e.disappears_timer=function (obj1,obj2){
		if (e.disappears_timer_flag){
			e.deform_text_tween.pause()
			e.deform_main_tween.pause()
			e.disappears_timer_flag=false
			e.deform_text_flag=false
			e.tween=game.add.tween(obj1.scale).to({x:e.scale_x_timer, y:e.scale_y_timer},480,Phaser.Easing.Elastic.In,true)
			e.tween2=game.add.tween(obj2.scale).to({x:e.scale_x_timer, y:e.scale_y_timer},480,Phaser.Easing.Elastic.In,true)
		}
	}

	return e
}

E=E || {}
