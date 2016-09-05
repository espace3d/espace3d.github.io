//////////////////////////////////////////////////////////////////////////////////////////
//paper.js
//le papier général qui sert de réception au touch et qui équivaut en hauteur 
//au nombre de papiers
//rouleau 
function drawRoll(Group,game,row,line,w,posx,posy) {

	//espacement entre les papiers
	var espacement=0
		var e=[] 
		e.paper=[] 
		for (var j = 0; j < line; j++) {
			e.paper[j] = [] 
				for (var i = 0; i < row; i++) {
					e.paper[j][i] = drawSprite(0,game,"sprite_paper",0,0,w,w,0,black,0) 
						e.paper[j][i].fwd = drawSprite(0,game,"sprite_paper",0,0,w,w,0,0,1) 
						//e.paper[j][i].fwd.animations.add('Play')
						//e.paper[j][i].fwd.animations.play('Play',1,true)

						e.paper[j][i].fwd.x = posx-w*.52+i*(w+espacement) 
						e.paper[j][i].fwd.y =posy+(j*(w+espacement)) 

						e.paper[j][i].x = posx-w*.5+i*(w+espacement) 
						e.paper[j][i].y =posy+(j*(w+espacement)) 

						Group.add(e.paper[j][i]) 
						Group.add(e.paper[j][i].fwd) 
				} 
		} 
	        e.main=drawSprite(Group,game,"rect",posx-w*.5,posy,w,w*9,0,black,0) 
		e.main.isFalling=false 
		e.main.inputEnabled=true 

		//pour remettre le e.main.isFalling true et permettre ainsi la chute des papiers
		e.timer=game.time.events.add(Phaser.Timer.SECOND * time_paper_fall,function(){e.main.isFalling=true})
		//////////////////////////////////////////////////////////////////////////////////////////
		//function pour faire défiler le rouleau de papier vers le bas
		//+ function pour faire trembler le papier sur l'horizontale pour mimer la chute
		e.fall = function(_background_shadow) {
			if (e.main.isFalling) {
				//if (e.main.input.pointerOver()) {
				if (game.input.activePointer.isDown) {
				} else {	 
					//pour faire descendre les papiers
					Group.y+=9 	
						//pour secouer les papiers sur l'horizontale et mimer la chute
						//Group.x=Group.x+game.rnd.between(-.2,.2)
				} 
		if (Group.y > h2){
			_background_shadow.height=(Group.y-h2)
		}
		//ombre suit le papier qui a dépassé le bord de la table
		if (Group.y > h+h2){
			_background_shadow.y+=9
		}

			} 
		}
	return e 
} 

//////////////////////////////////////////////////////////////////////////////////////////
//fonction finale qui dessine le rouleau avec les papiers + papier général
function drawP(Group,game,posx,posy) {
	var e=drawRoll(Group,game,1,nu.paper,dim.paper,posx,posy) 
		return e
} 
