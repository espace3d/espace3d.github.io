//////////////////////////////////////////////////////////////////////////////////////////
//huds.js

function drawHud(game,Group){
	var e=[]
	//variable pour stocker le temps
	var timer_value="40"
	e.time_shadow=drawSprite(Group,game,"timer",w2,h2,w*.255,w*.255,.5,0,.6)
	e.time_shadow.inputEnabled=true
	e.time_rond=drawSprite(Group,game,"timer_white",w2,h2,w*.25,w*.25,.5,white,0)
	e.timer = game.add.bitmapText(w2,h2,'lucky',timer_value, w*.15)
	//decompte du temps
	game.time.events.loop(Phaser.Timer.SECOND, updateCounter,this)

	function updateCounter() {
		if (timer_value == 0) {
		}
		else {
			timer_value--
		}
		e.timer.setText(timer_value)
	}
	//modifications des anchors
	e.timer.anchor.x=.5
	e.timer.anchor.y=.4
	//ajout aux groupes
	Group.add(e.timer)

	return e
}

