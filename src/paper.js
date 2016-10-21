//////////////////////////////////////////////////////////////////////////////////////////
//paper.js
//le papier général qui sert de réception au touch et qui équivaut en hauteur 
//au nombre de papiers
//rouleau 
var P = P || {}

P.draw = function(Group,game,posx,posy) {
var speed=1200
	//var e={}
	//parameters
	this.paper=[] 
	for (var j = 0; j < nu.paper; j++) {
		this.paper[j] = [] 
		for (var i = 0; i < 1; i++) {
			this.paper[j][i] = game.add.sprite(0,0,"sprite_paper")
			this.paper[j][i].alpha=.1
			this.paper[j][i].fwd = game.add.sprite(0,0,"sprite_paper")
			//this.paper[j][i].fwd.animations.add('Play')
			//this.paper[j][i].fwd.animations.play('Play',1,true)
			this.paper[j][i].fwd.x = 0
			this.paper[j][i].fwd.y =j*dim.paper 
			this.paper[j][i].x = 0
			this.paper[j][i].y =j*dim.paper 
			// ajout des childs au parent >>this.main
			Group.add(this.paper[j][i]) 
			Group.add(this.paper[j][i].fwd) 
		} 
	} 

	this.main=game.add.sprite(posx-dim.paper*.5,posy,"rect_invisible")
	this.main.isOutOfMiddleTable=false 
	this.main.inputEnabled=true 
	this.main.isFalling=false
	//this.main.body.immovable=true
	//if (typeof this.main!== 'undefined'){ 
		//console.log("probleme")
	//} 
	Group.add(this.main) 

	//ajout aux groupes
	for (var j = 0; j < nu.paper; j++) {
		for (var i = 0; i < 1; i++) {
			this.main.addChild(this.paper[j][i])
			this.main.addChild(this.paper[j][i].fwd)
		}
	}
	//pour remettre le this.main.isFalling true et permettre ainsi la chute des papiers
	//this.timer=game.time.events.add(delay_paper_fall,resetflag,this)

	function resetflag() {
		this.main.isFalling=true
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	//FUNCTION POUR FAIRE DÉFILER LE ROULEAU DE PAPIER VERS LE BAS
	//+ function pour faire trembler le papier sur l'horizontale pour mimer la chute
	//différents points qui correspondent aux différents points de chute pour mimer un opponent qui choisi les endroits où il arrete les papiers
	var current_point=1
	var points_chute = {}

	for (var i = 0; i < 100; i++) {
		points_chute[i]=Math.round(game.rnd.between(10,1500))
	};

	//temps pour que le this.main.isFalling soit remis à true et que les papiers tombent à nouveau
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
	//on teste que le drapeau 'this.main.isFalling' e.mainsoit à true et on fait descendres le groupe
	// si e.main == points_chute alors il s'arrete
	// ensuite on lance un timer.performwithdelay pour remettre le drapeau e.main.isFalling à true

	/**
	 * curso =  curseur 
	 * curso_rect =  curseur rectangle 
	 * parti =  particle
	 */
	//OPPONENT
	var count = 0
	this.opponentfall = function(_paper_opponent_main,_background_line_collision,curso,curso_rect,parti) {
		if (_paper_opponent_main.isFalling){
			//pour faire descendre les papiers
			//_paper_opponent_main.body.velocity.y= speed;
			_paper_opponent_main.body.velocity.y= speed;
			//collision 
			for (var i = 0; i < _background_line_collision.length; i++) {
				game.physics.arcade.collide(_paper_opponent_main,_background_line_collision[i],this.opponentfall_subfunction,null,this) 
			};

			this.opponentfall_subfunction=function(obj1,obj2){
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
						this.main.isFalling=false
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
				game.time.events.add(time_chute[current_point],() => this.hide_and_destroy_physics(obj2), this)
				// chute du papier
				obj1.body.velocity.y=0 	
				choose_current_point()

				//callback 
				this.hide_and_destroy_physics=function(obj2){
					obj2.body.enable=false
				}
			}
		}
	}

	//PLAYER
	this.fall = function(_paper_player_main,_background) {
		//_paper_player_main.body.velocity.y= 400;
		if (_paper_player_main.isFalling) {
			if (game.input.activePointer.isDown) {
				_paper_player_main.body.allowGravity=false
				_paper_player_main.body.gravity.y=0
				_paper_player_main.body.velocity.y=0
				// cursor avec pression exercée
				if (game.input.activePointer.duration > 500 && game.time.now > delay_paper_fall+delay_paper_fall*.5 ) {
					_background.cursor_player_particle.on=true
					_background.cursor_player_particle.y= _background.cursor_player.y

					_background.text_name_player_shadow.visible=true
					_background.panimTween_shadow.resume()
					_background.panimTween.resume()

					if (_background.cursor_player.alpha <= 0.2) {
						_background.cursor_player.isRaise=true
					} else if (_background.cursor_player.alpha >= .59) {
						_background.cursor_player.isRaise=false	
					}
					if ( _background.cursor_player.isRaise ) {
						_background.cursor_player.alpha +=.02
					} else {
						_background.cursor_player.alpha -=.02
					}
				}
				else
				{
					//_background.cursor_player_particle_destroy()
					_background.cursor_player.alpha=0
					_background.text_name_player_shadow.visible=false
					_background.panimTween_shadow.pause()
					_background.panimTween.pause()
					_background.cursor_player_particle.on=false
				}
			} else {	 
				//pour faire descendre les papiers
				_paper_player_main.body.allowGravity=true
				_paper_player_main.body.gravity.y=2800
				//_paper_player_main.body.velocity.y= speed;
				_background.cursor_player_particle.on=false
				_background.panimTween_shadow.pause()
				_background.panimTween.pause()
			} 
		}
	}
	return this
}

//////////////////////////////////////////////////////////////////////////////////////////
//fonction finale qui dessine le rouleau avec les papiers + papier général
P = P || {}
