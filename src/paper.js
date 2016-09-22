//////////////////////////////////////////////////////////////////////////////////////////
//paper.js
//le papier général qui sert de réception au touch et qui équivaut en hauteur 
//au nombre de papiers
//rouleau 
function drawRoll(Group,game,row,line,w,posx,posy) {

	//espacement entre les papiers
	var espacement=0
	var e=[] 

	//e.main.body.setZeroDamping()
	e.paper=[] 
	for (var j = 0; j < line; j++) {
		e.paper[j] = [] 
		for (var i = 0; i < row; i++) {
			e.paper[j][i] = drawSprite(0,game,"sprite_paper",0,0,2*w,w/6.1,0,black,.3) 
			e.paper[j][i].fwd = drawSprite(0,game,"sprite_paper",0,0,2*w,w/6.1,0,0,1) 

			//e.paper[j][i].fwd.animations.add('Play')
			//e.paper[j][i].fwd.animations.play('Play',1,true)

			e.paper[j][i].fwd.x = 0
			e.paper[j][i].fwd.y =0+(j*(w/6.1+espacement)) 

			e.paper[j][i].x = 0
			e.paper[j][i].y =0+(j*(w/6.1+espacement)) 

			// ajout des childs au parent >>e.main
			Group.add(e.paper[j][i]) 
			Group.add(e.paper[j][i].fwd) 
		} 
	} 

	e.main=drawSprite(Group,game,"rect",posx-w*.5,posy,w,w*9,0,black,.5) 
	e.main.isOutOfMiddleTable=false 
	e.main.inputEnabled=true 


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

	points_chute[1]=Math.round((game.rnd.between(40,80)*9))
	points_chute[2]=Math.round((game.rnd.between(90,140)*9))
	points_chute[3]=Math.round((game.rnd.between(140,155)*9))
	points_chute[4]=Math.round((game.rnd.between(155,160)*9))


	//temps pour que le e.main.isFalling soit remis à true et que les papiers tombent à nouveau
	var time_chute = {}

	time_chute[1]=game.rnd.between(200,300)
	time_chute[2]=game.rnd.between(300,9000)
	time_chute[3]=game.rnd.between(700,4000)
	time_chute[4]=game.rnd.between(8000,9000)


	//function pour incrementer le current_point
	var choose_current_point = function(){
		current_point = current_point + 1
		if (current_point > 4){
			current_point = 1
		}
		console.log("current_point")
	}


	var reset_e_main_is_falling = function(){
		e.main.isFalling = true
	}

	//OPPONENT
	//on teste que le drapeau 'e.main.isFalling' soit à true et on fait descendres le groupe
	// si le group == points_chute alors il s'arrete
	// ensuite on lance un timer.performwithdelay pour remettre le drapeau e.main.isFalling à true
	// attention que le group.y doit etre égal à un multiple équivalent au nombre de la chute  
	e.opponentfall = function(obj,curso,parti) {
		console.log(Group.y)
		if (e.main.isFalling) {
			Group.y+=9 	
		}


		if (Group.y == points_chute[current_point]){
			obj.y=h2+game.rnd.between(-100,100)
			console.log(points_chute[current_point], "cii")
			e.main.isFalling =false
			choose_current_point()
			console.log(current_point,"current_point")
			game.time.events.loop(time_chute[current_point], reset_e_main_is_falling, this)
			console.log(time_chute[current_point])
			Group.y+=9 	
		}

		// curseur avec pression exercée
		if(time_chute[current_point] > 500){ 
			parti.on=true
			if (curso.alpha <= 0.2) {

				console.log("raise")
				curso.isRaise=true
			} else if (curso.alpha >= .59) {

				curso.isRaise=false	
			}
			if ( curso.isRaise ) {
				curso.alpha +=.02
			} else {
				curso.alpha -=.02
			}

		}
		else
		{
			parti.on=false
			curso.alpha=0
		}
	}

	e.fall = function(obj) {
		//obj.body.setZeroVelocity()
		if (obj.isFalling) {
			//obj.body.setZeroVelocity()
			if (game.input.activePointer.isDown) {
				obj.body.velocity.y=0
			} else {	 
				//pour faire descendre les papiers
				obj.body.velocity.y= 400;
				//Group.y+=9 	

				//pour secouer les papiers sur l'horizontale et mimer la chute
				//Group.x=Group.x+game.rnd.between(-.2,.2)
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
