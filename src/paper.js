//////////////////////////////////////////////////////////////////////////////////////////
//paper.js
//le papier général qui sert de réception au touch et qui équivaut en hauteur 
//au nombre de papiers
//rouleau 
function drawRoll(Group,game,row,line,w,posx,posy) {

	//espacement entre les papiers
	//var espacement=0
	var e=[] 

	//e.main.body.setZeroDamping()
	e.paper=[] 
	for (var j = 0; j < line; j++) {
		e.paper[j] = [] 
		for (var i = 0; i < row; i++) {
			e.paper[j][i] = game.add.sprite(0,0,"sprite_paper")
			e.paper[j][i].alpha=.1
			e.paper[j][i].fwd = game.add.sprite(0,0,"sprite_paper")

			//e.paper[j][i].fwd.animations.add('Play')
			//e.paper[j][i].fwd.animations.play('Play',1,true)

			e.paper[j][i].fwd.x = 0
			e.paper[j][i].fwd.y =j*w 

			e.paper[j][i].x = 0
			e.paper[j][i].y =j*w 

			// ajout des childs au parent >>e.main
			Group.add(e.paper[j][i]) 
			Group.add(e.paper[j][i].fwd) 
		} 
	} 

	e.main=game.add.sprite(posx-w*.5,posy,"rect_invisible")
	e.main.isOutOfMiddleTable=false 
	e.main.inputEnabled=true 
	e.main.isFalling=false
	Group.add(e.main) 

	//ajout aux groupes
	for (var j = 0; j < line; j++) {
		for (var i = 0; i < row; i++) {

			e.main.addChild(e.paper[j][i])
			e.main.addChild(e.paper[j][i].fwd)
		}
	}

	//pour remettre le e.main.isFalling true et permettre ainsi la chute des papiers
	e.timer=game.time.events.add(delay_paper_fall,function(){e.main.isFalling=true})

	//////////////////////////////////////////////////////////////////////////////////////////
	//FUNCTION POUR FAIRE DÉFILER LE ROULEAU DE PAPIER VERS LE BAS
	//+ function pour faire trembler le papier sur l'horizontale pour mimer la chute

	//différents points qui correspondent aux différents points de chute pour mimer un opponent qui choisi les endroits où il arrete les papiers
	var current_point=1
	var points_chute = {}

	for (var i = 0; i < 100; i++) {
		points_chute[i]=Math.round(game.rnd.between(10,1500))
	};

	//temps pour que le e.main.isFalling soit remis à true et que les papiers tombent à nouveau
	var time_chute = {}
	var min_time_chute=150
	var max_time_chute=1500
	for (var i = 0; i < 100; i++) {

		time_chute[i]=game.rnd.between(min_time_chute,max_time_chute)
	}

	//function pour incrementer le current_point
	var choose_current_point = function(){
		current_point = current_point + 1
		if (current_point > points_chute.length) {
			current_point = 1
		}
	}


	//OPPONENT
	//on teste que le drapeau 'e.main.isFalling' soit à true et on fait descendres le groupe
	// si e.main == points_chute alors il s'arrete
	// ensuite on lance un timer.performwithdelay pour remettre le drapeau e.main.isFalling à true

	/**
	 * curso =  curseur 
	 * curso_rect =  curseur rectangle 
	 * parti =  particle
	 */
	//OPPONENT
	var count = 0
	e.opponentfall = function(_paper_opponent_main,_background_line_collision,curso,curso_rect,parti) {
		if (e.main.isFalling){

			//pour faire descendre les papiers
			_paper_opponent_main.body.velocity.y= 400;

			//collision 
			for (var i = 0; i < _background_line_collision.length; i++) {
				game.physics.arcade.collide(_paper_opponent_main,_background_line_collision[i],e.opponentfall_subfunction,null,this) 
			};

			e.opponentfall_subfunction=function(obj1,obj2){
				obj1.body.velocity.y=400 	
				//pour ne pas lancer la function plus de 2x
				if (!obj2.isTouch){
					obj2.isTouch=true
					count++
					console.log(count,"touch")

					if (count ==_background_line_collision.length){
						//ici mettre l'action lorsque le joueur valide l'action
						parti.on
						curso_rect.alpha =.8
						curso_rect.y = h2 + game.rnd.between(-100,100)
						e.main.isFalling=false

						// curseur avec pression exercée
						//ici si le temps est validé 

					} else if(time_chute[current_point] > max_time_chute-400 && current_point!=1 ){ 
						curso.y = h2 + game.rnd.between(-100,100)
						parti.on=true
						if (curso_rect.alpha <= 0.2) {
							curso_rect.isRaise=true
						} else if (curso_rect.alpha >= .59) {
							curso_rect.isRaise=false	
						}
						if ( curso_rect.isRaise ) {
							curso_rect.alpha +=.02
						} else {
							curso_rect.alpha -=.02
						}
						//sinon rien
					} else {
						parti.on=false
						curso_rect.alpha=0
					}
				}


				//positionnnent des curseurs à l'endroit du point touché
				//delay pour que le drapreau du papier soit remis à true
				game.time.events.add(time_chute[current_point],() => e.hide_and_destroy_physics(obj2), this)
				// chute du papier
				obj1.body.velocity.y=0 	
				choose_current_point()

				//callback 
				e.hide_and_destroy_physics=function(obj2){
					obj2.body.enable=false

				}
			}




		}
	}

	//PLAYER
	e.fall = function(obj) {
		if (obj.isFalling) {
			if (game.input.activePointer.isDown) {
				obj.body.velocity.y=0
			} else {	 
				//pour faire descendre les papiers
				obj.body.velocity.y= 400;
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
