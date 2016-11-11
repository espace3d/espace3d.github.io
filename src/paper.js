//////////////////////////////////////////////////////////////////////////////////////////
//paper.js
//le papier général qui sert de réception au touch et qui équivaut en hauteur 
//au nombre de papiers
//rouleau 
var P = P || {}


Paper = function(game,Group,posx,posy){
	this.speed=1200
	this.flag=true
	this.count=0
	//contact général qui englobe les papiers
	object_physics.call(this,game,Group,posx-dim.paper*.5,posy,"rect_invisible",this.speed)
	this.isOutOfMiddleTable=false
	this.inputEnabled=true
	this.isFalling=false

	//texte + line qui descend et indique la position du papier 
	var taille=w*.05
	this.text_position = game.add.bitmapText(posx,0,'lucky','coucou', taille) 
	this.text_position.visible=false
	this.text_position.anchor.x =.5
	this.text_position.anchor.y =.5
	Group.add(this.text_position) 

	//this.line_position=game.add.sprite(posx,0,"line_position") 
	this.line_position=game.add.sprite(posx,-40,"line_position") 
	this.line_position.anchor.y=1
	Group.add(this.line_position) 

	//ajout de physics à this.text_position
	game.physics.arcade.enable(this.line_position)
	game.physics.arcade.enable(this.text_position)
	//this.text_position.body.velocity.y=this.speed
	//this.text_position.body.moves=false

//TODO mettre line_position dans le même groupe que text_position
	//paramètres de gravité sur text_position
	this.line_position.body.gravity.y=800
	this.line_position.body.bounce.y=.4
	this.line_position.body.allowGravity=false
	this.text_position.body.gravity.y=800
	this.text_position.body.bounce.y=.4
	//this.text_position.body.bounce.y=.2
	this.text_position.body.allowGravity=false

	//drapeau qui interagit avec check_fall_end et action_stop_paper  
	this.text_position.is_lached=false

	//barre inférieure pour tester la collision avec le papier opponent et player
	//this.check_fall_end=game.add.sprite(0,h*1.375,'test_line')
	this.check_fall_end=game.add.sprite(posx,h*0.909,'test_line')
	this.check_fall_end.alpha=.1
	this.check_fall_end.anchor.x=.5
	game.physics.arcade.enable(this.check_fall_end)

	this.events.onInputDown.add(stop_move,this)
	this.events.onInputUp.add(move,this)

	function stop_move(){
		if (this.isFalling){	
			background.panimTween_shadow.resume()
			background.panimTween.resume()
			background.cursor_player_particle.on=true
			background.cursor_player_particle.y=game.input.y
			this.body.moves=false
		}
	}

	function move(){
		if (this.isFalling){
			//TODO
			background.panimTween_shadow.pause()
			background.panimTween.pause()
			background.cursor_player_particle.on=false
			this.body.moves=true
		}
	}

	this.paper=[] 
	for (var j = 0; j < nu.paper; j++) {
		this.paper[j] = [] 
		for (var i = 0; i < 1; i++) {
			this.paper[j][i] = game.add.sprite(0,0,"sprite_paper")
			this.paper[j][i].tint=black

			this.paper[j][i].alpha=.2
			this.paper[j][i].fwd = game.add.sprite(0,0,"sprite_paper")
			//this.paper[j][i].fwd.animations.add('Play')
			//this.paper[j][i].fwd.animations.play('Play',1,true)
			this.paper[j][i].fwd.x = 0
			this.paper[j][i].fwd.y =j*dim.paper 
			this.paper[j][i].x = 2
			this.paper[j][i].y =j*dim.paper 

			// ajout des childs au parent >>this.main
			Group.add(this.paper[j][i]) 
			Group.add(this.paper[j][i].fwd) 
		} 
	} 

	//ajout aux groupes
	for (var j = 0; j < nu.paper; j++) {
		for (var i = 0; i < 1; i++) {
			this.addChild(this.paper[j][i])
			this.addChild(this.paper[j][i].fwd)
		}
	}
	//TODO
	//this.timer=game.time.events.add(delay_paper_fall,resetflag,this)

	function resetflag() {
		this.isFalling=true
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	//FUNCTION POUR FAIRE DÉFILER LE ROULEAU DE PAPIER VERS LE BAS
	//+ function pour faire trembler le papier sur l'horizontale pour mimer la chute
	//différents points qui correspondent aux différents points de chute pour mimer un opponent qui choisi les endroits où il arrete les papiers
	this.current_point=1
	this.points_chute = {}

	for (var i = 0; i < 100; i++) {
		//points_chute[i]=Math.round(game.rnd.between(10,1800))
	};

	//temps pour que le this.main.isFalling soit remis à true et que les papiers tombent à nouveau
	this.time_chute = {}
	this.min_time_chute=150
	this.max_time_chute=1500
	for (var i = 0; i < 100; i++) {
		this.time_chute[i]=game.rnd.between(this.min_time_chute,this.max_time_chute)
	}

	//function pour incrementer le current_point
	this.choose_current_point = function(){
		this.current_point = this.current_point + 1
		if (this.current_point > this.points_chute.length) {
			this.current_point = 1
		}
	}
}
	Paper.prototype = Object.create(object_physics.prototype) 
	Paper.prototype.constructor=object_physics


	Paper.prototype.lock=function(){
		if (this.flag){ 
			console.log("lock")
			this.flag=false
			this.text_position.is_lached=true
			//this.isFalling=false
			tw.lock_position(background.cursor_player)
			this.body.velocity.y=0
			this.body.immovable=true
			background.panimTween_shadow.pause()
			background.panimTween.pause()

		}	
	}

	Paper.prototype.opponentfall=function(_paper_opponent,_background_line_collision,curso,curso_rect,parti){

		var count = 0
		if (_paper_opponent.isFalling){
			//pour faire descendre les papiers
			//_paper_opponent.body.velocity.y=this.speed;
			_paper_opponent.body.velocity.y= this.speed;
			//collision 
			for (var i = 0; i < _background_line_collision.length; i++) {
				game.physics.arcade.collide(_paper_opponent,_background_line_collision[i],this.opponentfall_subfunction,null,this) 
			};

			this.opponentfall_subfunction=function(obj1,obj2){
				obj1.body.velocity.y=400 	
				//pour ne pas lancer la function plus de 2x
				if (!obj2.isTouch){
					obj2.isTouch=true
					count++

					if (count ==_background_line_collision.length){
						//ici mettre l'action lorsque le joueur valide l'action
						parti.on
						curso_rect.alpha =.8
						curso_rect.y = h2 + game.rnd.between(-100,100)
						this.isFalling=false
						// curseur avec pression exercée
						//ici si le temps est validé 

					} else if(this.time_chute[this.current_point] > this.max_time_chute-400 && this.current_point!=1 ){ 
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
				game.time.events.add(this.time_chute[this.current_point],() => this.hide_and_destroy_physics(obj2), this)
				// chute du papier
				obj1.body.velocity.y=0 	
				this.choose_current_point()

				//callback 
				this.hide_and_destroy_physics=function(obj2){
					obj2.body.enable=false
				}
			}
		}
	}

	Paper.prototype.update = function() {
		//on permet la collision si le flag est à true
		if (this.text_position.is_lached){
			this.text_position.body.allowGravity=true
			this.line_position.body.allowGravity=true
			this.text_position.text=Math.round(this.text_position.body.y)
			//pour empêcher que le papier ne bouge suite à la collision
			//this.game.physics.arcade.collide(this,this.text_position)
			this.game.physics.arcade.collide(this,this.text_position,count_collision)

			function count_collision(obj1){
				obj1.count++
				console.log("count_collision")
				if (obj1.count==50){
					obj1.text_position.is_lached=false
					obj1.line_position.body.allowGravity=false
					obj1.line_position.body.moves=false
					obj1.text_position.body.moves=false
					obj1.text_position.body.allowGravity=false
				}
			}
		}

		if (game.input.activePointer.duration > 900){
			this.lock()
		}

		//TODO changer cycle de collide

		this.game.physics.arcade.collide(this,this.check_fall_end,grey_check)

		function grey_check(obj1,obj2){
			console.log("collide")
			//pour empêcher d'autres collisions
			obj2.body.enable=false
			//pour laisser le texte descendre
			obj1.text_position.is_lached=true
			background.player.filters=[background.grayfiltertop]
			background.player_top.filters=[background.grayfiltertop]
			//animation avec rouleaux pour signifier le vainqueur
			background.winner()


			background.text_win_opponent.visible=true
			background.cursor_player.visible=false
			background.cursor_palpitant.visible=false
			background.cursor_opponent.visible=false
			background.cursor_palpitant_opponent.visible=false
			effect.disappears_timer(hud.time_shadow,hud.timer_text)
		}
	}

	//////////////////////////////////////////////////////////////////////////////////////////
	P = P || {}
