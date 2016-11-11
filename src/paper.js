//////////////////////////////////////////////////////////////////////////////////////////
//paper.js
//le papier général qui sert de réception au touch et qui équivaut en hauteur 
//au nombre de papiers
//rouleau 
var P = P || {}


Paper = function(game,Group,posx,posy){
	this.speed=1200

	//remplacement de main par this
	object_physics.call(this,game,Group,posx-dim.paper*.5,posy,"rect_invisible",this.speed)
	//Phaser.Sprite.call(this,game,this.posx-dim.paper*.5,this.posy,'rect_invisible')
	//this.enableBody=true
	//game.physics.arcade.enable(this)
	//this.Group.add(this)
	this.isOutOfMiddleTable=false
	this.inputEnabled=true
	this.isFalling=false

this.events.onInputDown.add(stop_move,this)
this.events.onInputUp.add(move,this)
var lastDuration=0
game.input.onUp.add(getTime,this)

function getTime(pointer){
lastDuration=pointer.duration
	console.log(lastDuration)
}



function stop_move(duration){
if (this.isFalling){	
background.cursor_player_particle.on=false
	this.body.moves=false
}
}
function move(){
background.cursor_player_particle.on=true
	this.body.moves=true
}


	//this.ombre=game.add.sprite(0,0,"sprite_paper")
	//this.icon=game.add.sprite(0,0,"sprite_paper")

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
	//pour remettre le this.main.isFalling true et permettre ainsi la chute des papiers
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
}
Paper.prototype = Object.create(object_physics.prototype) 
Paper.prototype.constructor=object_physics


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




function change_allow_gravity(){
}

//PLAYER

	Paper.prototype.fall=function(_paper_player,_background) {
		if (_paper_player.isFalling) {
			if (game.input.activePointer.isDown) {
				console.log("down")
				//_paper_player.body.moves=false
			}
		}
	}


//Paper.prototype.fall=function(_paper_player,_background) {
//	if (_paper_player.isFalling) {
//		if (game.input.activePointer.isDown) {
//			_paper_player.body.allowGravity=false
//			_paper_player.body.gravity.y=0
//			_paper_player.body.velocity.y=0
//			// cursor avec pression exercée
//			if (game.input.activePointer.duration > 500 && game.time.now > delay_paper_fall+delay_paper_fall*.5 ) {
//				_background.cursor_player_particle.on=true
//				_background.cursor_player_particle.y= _background.cursor_player.y
//
//				_background.text_name_player_shadow.visible=true
//				_background.panimTween_shadow.resume()
//				_background.panimTween.resume()
//
//				if (_background.cursor_player.alpha <= 0.2) {
//					_background.cursor_player.isRaise=true
//				} else if (_background.cursor_player.alpha >= .59) {
//					_background.cursor_player.isRaise=false	
//				}
//				if ( _background.cursor_player.isRaise ) {
//					_background.cursor_player.alpha +=.02
//				} else {
//					_background.cursor_player.alpha -=.02
//				}
//			}
//			else
//			{
//				//_background.cursor_player_particle_destroy()
//				_background.cursor_player.alpha=0
//				_background.text_name_player_shadow.visible=false
//				_background.panimTween_shadow.pause()
//				_background.panimTween.pause()
//				_background.cursor_player_particle.on=false
//			}
//		} else {	 
//			//pour faire descendre les papiers
//			_paper_player.body.allowGravity=true
//			_paper_player.body.gravity.y=2800
//			//_paper_player.body.velocity.y= speed;
//			_background.cursor_player_particle.on=false
//			_background.panimTween_shadow.pause()
//			_background.panimTween.pause()
//		} 
//	}
//}
//	this.filters_grey_check = function(){
//
//		if (_paper_player.main.body.y > h2 && background.text_win_player.visible==false) {
//			background.winner()
//			if (background.text_win_player.visible==false){
//				background.text_win_opponent.visible=true
//				background.cursor_player.visible=false
//				background.cursor_palpitant.visible=false
//				background.cursor_opponent.visible=false
//				background.cursor_palpitant_opponent.visible=false
//
//			}					
//			background.player.filters=[background.grayfiltertop]
//			background.player_top.filters=[background.grayfiltertop]
//		}
//
//		if (paper_opponent.main.body.y > h2 && background.text_win_opponent.visible==false) {
//			background.winner()
//			if (background.text_win_opponent.visible==false){
//				background.text_win_player.visible=true
//				background.cursor_player.visible=false
//				background.cursor_palpitant.visible=false
//				background.cursor_opponent.visible=false
//				background.cursor_palpitant_opponent.visible=false
//			}					
//			background.opponent.filters=[background.grayfiltertop]
//			background.opponent_top.filters=[background.grayfiltertop]
//		}
//	}


//////////////////////////////////////////////////////////////////////////////////////////
//fonction finale qui dessine le rouleau avec les papiers + papier général
P = P || {}
