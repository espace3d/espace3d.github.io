//////////////////////////////////////////////////////////////////////////////////////////
//paper.js
//le papier général qui sert de réception au touch et qui équivaut en hauteur 
//au nombre de papiers
//rouleau 
var P = P || {}


Paper = function(game,Group,posx,posy,name_character){
	this.name_character=name_character
	this.speed=1200
	this.flag=true
	this.flag_locked=false
	this.flag_winner=false
	//temps pour que le curseur soit complétement allongé et permettre de stopper les papiers pour de bon
	this.time_lock=950
	this.count=0
	this.count_opponent=0
	//contact général qui englobe les papiers
	object_physics.call(this,game,Group,posx-dim.paper*.5,posy,"rect_invisible",this.speed)
	this.isOutOfMiddleTable=false
	this.inputEnabled=true
	this.isFalling=false

	//texte + line qui descend et indique la position du papier 
	this.line_position=game.add.sprite(posx,-60,"line_position") 
	this.line_position.anchor.y=1

	var taille=w*.05
	var taille_locked=w*.035
	this.text_locked = game.add.bitmapText(posx,h2-300,'lucky_black','locked', taille_locked) 
	this.text_locked.alpha=0
	this.text_locked.anchor.x =.5
	this.text_locked.anchor.y =.5
	Group.add(this.text_locked) 
	this.text_position = game.add.bitmapText(posx,0,'lucky','coucou', taille) 
	this.text_position.visible=false
	this.text_position.anchor.x =.5
	this.text_position.anchor.y =.5
	game.physics.arcade.enable(this.text_position)


	//ajout de physics à this.text_position
	//this.text_position.body.velocity.y=this.speed
	//this.text_position.body.moves=false

	//TODO mettre line_position dans le même groupe que text_position
	//paramètres de gravité sur text_position
	//this.line_position.body.gravity.y=800
	//this.line_position.body.bounce.y=.4
	//this.line_position.body.allowGravity=false
	this.text_position.body.gravity.y=800
	this.text_position.body.bounce.y=.4
	this.text_position.body.allowGravity=false

	Group.add(this.text_position) 
	Group.add(this.line_position) 

	//this.text_position.addChild(this.line_position)
	//drapeau qui interagit avec check_fall_end et action_stop_paper  
	this.text_position.is_lached=false

	//barre inférieure pour tester la collision avec le papier opponent et player
	//this.check_fall_end=game.add.sprite(0,h*1.375,'test_line')
	this.check_fall_end=game.add.sprite(posx,h*0.909,'test_line')
	this.check_fall_end.alpha=0
	this.check_fall_end.anchor.x=.5
	game.physics.arcade.enable(this.check_fall_end)

	this.events.onInputDown.add(this.stop_move,this)
	this.events.onInputUp.add(this.move,this)

	//	function stop_move(){
	//		if (this.isFalling){	
	//			background.panimTween_shadow.resume()
	//			background.panimTween.resume()
	//			background.cursor_player_particle.on=true
	//			background.cursor_player_particle.y=game.input.y
	//			this.body.moves=false
	//		}
	//	}


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

	//temps que le joueur opponent met pour appuyer sur le boutton de stop
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

//arreter la chute
Paper.prototype.stop_move=function(){
	if (this.isFalling){	
	console.log(background.cursor_player.x, background.cursor_player.alpha, background.cursor_player.scale.x)
		background.cursor_player.alpha=0
		background.cursor_player.scale.y=1
		background.cursor_player.scale.x=1
		background.panimTween_shadow.resume()
		background.panimTween.resume()
		background.cursor_player_particle.on=true
		background.cursor_player_particle.y=game.input.y
		background.cursor_player.y=game.input.y
		this.body.moves=false
		this.expand_cursor_lock()
	}
}

//étendre le curseyr de lock
Paper.prototype.expand_cursor_lock=function(){
	console.log("expand_cursor_lock")
	console.log(background.cursor_player.x, background.cursor_player.alpha)
	this.tween=game.add.tween(background.cursor_player.scale).to({x:3,y:3},this.time_lock,Phaser.Easing.Linear.None,true,0)
	this.tween2=game.add.tween(background.cursor_player).to({alpha:.3},this.time_lock,Phaser.Easing.Linear.None,true,0)
	this.tween.onComplete.add(this.lock,this)
}

//étendre le cuseur permettant de locker la position
Paper.prototype.lock=function(){
	console.log("lock")
	this.flag=false
	this.text_position.is_lached=true
	this.body.velocity.y=0
	this.body.immovable=true
	//animation du texte du player qui change d'échelle
	background.panimTween_shadow.resume()
	background.panimTween.resume()
	this.flash_player()
}

Paper.prototype.flash_player = function() {
if(this.name_character=="player"){
	this.tween_text_locked=game.add.tween(background.flash_player).to({alpha:.9},150,Phaser.Easing.Bounce.Out,true,0)
	this.tween_text_locked.onComplete.add(this.fade_player,this)
}else{
	this.tween_text_locked=game.add.tween(background.flash_opponent).to({alpha:.9},150,Phaser.Easing.Bounce.Out,true,0)
	this.tween_text_locked.onComplete.add(this.fade_opponent,this)
}
}

Paper.prototype.appears_text_lock = function() {
	this.tween_text_locked=game.add.tween(background.flash_player).to({alpha:.9},150,Phaser.Easing.Bounce.Out,true,0)
	//game.add.tween(this.text_locked.scale).to({x:2,y:2},500,Phaser.Easing.Bounce.Out,true,0)

	this.tween_text_locked.onComplete.add(this.fade_flash,this)
}
Paper.prototype.fade_player = function() {
	game.add.tween(background.flash_player).to({alpha:0},200,Phaser.Easing.Bounce.In,true,0)

}
Paper.prototype.fade_opponent = function() {
	game.add.tween(background.flash_opponent).to({alpha:0},200,Phaser.Easing.Bounce.In,true,0)

}

//reprendre la chute
Paper.prototype.move=function(){
	if (this.isFalling){
		//TODO
		this.tween_flag=false
		background.panimTween_shadow.pause()
		background.panimTween.pause()
		background.cursor_player_particle.on=false
		this.body.moves=true
		this.stop_expand_cursor_lock()
	}
}

//arreter d'étendre le curseur permettant de locker la position
Paper.prototype.stop_expand_cursor_lock=function(){
	console.log("stop_expand_cursor_lock")
	this.tween.stop()
	this.tween2.stop()
	background.cursor_player.alpha=0
}


Paper.prototype.opponentfall=function(_paper_opponent,_background_line_collision,curso,curso_rect,parti){

	if (_paper_opponent.isFalling){
		//pour faire descendre les papiers
		_paper_opponent.body.velocity.y= this.speed;
		//collision 
		for (var i = 0; i < _background_line_collision.length; i++) {
			game.physics.arcade.collide(_paper_opponent,_background_line_collision[i],this.opponent_collision) 
		};
	}
	//ligne et chiffre qui tombe
	this.fall_line()
	this.collide_with_check_fall_end()
}

Paper.prototype.opponent_collision=function(obj1,obj2){
	console.log("gfkifjgfj")
	obj1.body.velocity.y=400 	

	//TODO renseiigner les vrais noms des background
	//pour ne pas lancer la function plus de 2x
	if (!obj2.isTouch){
		obj2.isTouch=true
		obj1.count_opponent++
		console.log(obj1.count_opponent)
		//console.log(_background_line_collision.length)

		if (obj1.count_opponent ==background.line_collision_opponent.length){
			obj1.text_position.is_lached=true
			//ici mettre l'action lorsque le joueur valide l'action
			obj1.cursor_opponent_tween(this.time_lock)
			background.cursor_opponent_particle.on
			background.cursor_opponent.alpha =.8
			background.cursor_opponent.y = h2 + game.rnd.between(-100,100)
			obj1.isFalling=false
			obj1.body.immovable=true
			// curseur avec pression exercée
			//ici si le temps est validé 
		} else if(obj1.time_chute[obj1.current_point] > obj1.max_time_chute-400 && obj1.current_point!=1 ){ 
			background.cursor_palpitant_opponent.y = h2 + game.rnd.between(-100,100)
			background.cursor_opponent_particle.on
			var value_tween=game.rnd.between(200,800)
			this.cursor_opponent_tween(value_tween)


			//sinon rien
		} else {
			background.cursor_opponent_particle.on=false
			background.cursor_opponent.alpha=0
		}
	}

	//positionnnent des curseurs à l'endroit du point touché
	//delay pour que le drapreau du papier soit remis à true
	game.time.events.add(obj1.time_chute[obj1.current_point],() => obj1.hide_and_destroy_physics(obj2), obj1)
	// chute du papier
	obj1.body.velocity.y=0 	
	obj1.choose_current_point()

	//callback 
	obj1.hide_and_destroy_physics=function(obj2){
		obj2.body.enable=false
	}
}

Paper.prototype.cursor_opponent_tween = function(time_tween){
console.log("value");

	//transition opponent au niveau du curseur
	this.tween_opponent=game.add.tween(background.cursor_opponent.scale).to({x:3,y:3},time_tween,Phaser.Easing.Linear.None,true,0)
	this.tween2_opponent=game.add.tween(background.cursor_opponent).to({alpha:.3},time_tween,Phaser.Easing.Linear.None,true,0)
	this.tween2_opponent.onComplete.add(this.flash)

	if(time_tween < this.time_lock){
		game.time.events.add(time_tween,this.stop_tween_cursor_opponent,this)
	}
}

Paper.prototype.stop_tween_cursor_opponent = function() {
	this.tween_opponent.stop()
	this.tween2_opponent.stop()
};

//on permet la collision si le flag est à true
Paper.prototype.update = function() {
	//ligne et chiffre qui tombe
	this.fall_line()
	this.collide_with_check_fall_end()
}

Paper.prototype.collide_with_check_fall_end=function(){
	this.game.physics.arcade.collide(this,this.check_fall_end,this.grey_check)
}

Paper.prototype.fall_line=function(){
	if (this.text_position.is_lached){
		this.line_position.y=this.text_position.y
		this.text_position.body.allowGravity=true
		//this.line_position.body.allowGravity=true
		if(this.text_position.y<h2){
		this.text_position.text=Math.round(this.text_position.body.y)
		}else{
			this.text_position.text="000"
		}
		//pour empêcher que le papier ne bouge suite à la collision
		this.game.physics.arcade.collide(this,this.text_position,this.count_collision)
		//TODO changer cycle de collide
	}
}

//retardateur de l'update pour ne pas rafraichir toutes les 60 frames 
Paper.prototype.retardateur_update=function(retardateur_frame,_condition,_fonction){ 
	this._condition=_condition
	this.retardateur_frame = retardateur_frame
	this._updateCounter = this.retardateur_frame
	this._fonction=_fonction

	if( this._updateCounter > 0 ){
		this._updateCounter--
		return false
	}else {
		this._updateCounter = this.retardateur_frame
		this._fonction()
		return true
	}
}

//collision entre le text_position et le papier après x collision rendre le text_position immobile
Paper.prototype.count_collision=function(obj1){
	obj1.count++
	console.log("count_collision")
	if (obj1.count==30){
		obj1.text_position.is_lached=false
		//animation pour le vainqueur
		obj1.retardateur()
		//obj1.line_position.body.allowGravity=false
		//obj1.line_position.body.moves=false
		obj1.text_position.body.moves=false
		obj1.text_position.body.allowGravity=false

	}
}

//collision entre la ligne de fin et pour mettre le background en gris
Paper.prototype.grey_check = function(obj1,obj2){
	console.log("collide")
	//obj1.text_position.is_lached=true
	//pour empêcher d'autres collisions
	//obj2.body.enable=false
	//pour laisser le texte descendre
	obj1.retardateur()

	background.player.filters=[background.grayfiltertop]
	background.player_top.filters=[background.grayfiltertop]
	//animation avec rouleaux pour signifier le vainqueur
}

Paper.prototype.check_if_text_position_is_lached = function() {
if(paper.player.flag_locked && paper.opponent.flag_locked){
	paper.player.text_position.is_lached=true
	paper.opponent.text_position.is_lached=true
}else if(paper.player.flag_touch_the_end && paper.opponent.flag_touch_the_end==false){

}
};

Paper.prototype.retardateur=function(){
	game.time.events.add(3000,this.background_winner,this)
	game.time.events.add(1000,this.text_position_lached,this)
}

Paper.prototype.text_position_lached = function() {
this.text_position.is_lached=true	
};

Paper.prototype.background_winner=function(){
	background.winner()
	this.body.velocity.y=this.speed
	background.text_win_opponent.visible=true
	background.cursor_player.visible=false
	background.cursor_palpitant.visible=false
	background.cursor_opponent.visible=false
	background.cursor_palpitant_opponent.visible=false
	effect.disappears_timer(hud.time_shadow,hud.timer_text)
}

//////////////////////////////////////////////////////////////////////////////////////////
P = P || {}
