//TODO:this_close_panel

//////////////////////////////////////////////////////////////////////////////////////////
//menupapervar M = M || {}
//////////////////////////////////////////////////////////////////////////////////////////

Menu_network_opponent = function(game,Group,posx,posy){

	this.posx=posx
	this.posy=posy
	this.Group=Group
	this.row=parameter.number_of_opponent
	this.tween_appears={}

	//menu
	Phaser.Sprite.call(this,game,this.posx,this.posy,'menu')
	this.anchor.x=.5
	this.anchor.y=.5
	this.distance_in_height_between_button=200

	this.cost=game.add.bitmapText(750,815,'lucky',"cost:",50) 
	this.best=game.add.bitmapText(960,815,'lucky',"best:",50) 

	Group.add(this)
	Group.add(this.cost)
	Group.add(this.best)


	//boutton table
	this.button=[] 
	for (var i = 0; i < this.row; i++) {
		//button pour selectionner l'opponent
		this.button[i] = game.add.button(0,0,'button_network_opponent',(but) => this.rearrange_table_number_of_sort_paper(but.id),this) 
		this.button[i].x = this.posx-420
		this.button[i].y = this.posy-310+i*this.distance_in_height_between_button
		this.button[i].visible = true
		this.button[i].id=i
		this.button[i].alpha = 0

		//texte indiquant le nom de l'opponent
		this.button[i].name = game.add.bitmapText(0,0,'lucky_black',"namere",50) 
		this.button[i].name.text = parameter.name_opponent[i]
		this.button[i].name.x = this.button[i].width*.5+this.button[i].x
		this.button[i].name.y = this.posy-310+i*this.distance_in_height_between_button
		this.button[i].name.anchor.setTo(.5,0)
		this.button[i].name.visible = true
		this.button[i].name.id=i
		this.button[i].name.alpha = 0

		//texte indiquant le cout pour jouer contre l'opponent
		this.button[i].cost = game.add.bitmapText(0,0,'lucky_rose',"",40) 
		this.button[i].cost.text = parameter.cost_opponent[i]
		this.button[i].cost.x = this.button[i].x+620
		this.button[i].cost.y = this.posy-260+i*this.distance_in_height_between_button
		this.button[i].cost.anchor.setTo(.5,0)
		this.button[i].cost.visible = true
		this.button[i].cost.id=i
		this.button[i].cost.alpha = 0

		//coeur à coté du cout pour jouer contre l'opponent
		this.button[i].heart = game.add.sprite(0,0,'heart_menu_opponent') 
		this.button[i].heart.x = this.button[i].x+550
		this.button[i].heart.y = this.posy-256+i*this.distance_in_height_between_button
		this.button[i].heart.anchor.setTo(.5,0)
		this.button[i].heart.visible = true
		this.button[i].heart.id=i
		this.button[i].heart.alpha = 0

		//coeur à coté du cout pour jouer contre l'opponent
		this.button[i].best = game.add.sprite(0,0,'sprite_paper') 
		this.button[i].best.x = this.button[i].x+800
		this.button[i].best.y = this.posy-256+i*this.distance_in_height_between_button
		this.button[i].best.frame = parameter.best_opponent[i]
		this.button[i].best.width=50 
		this.button[i].best.height=50 
		this.button[i].best.anchor.setTo(.5,0)
		this.button[i].best.visible = true
		this.button[i].best.id=i
		this.button[i].best.alpha = 0

		//indication du lvl de l'opponent 
		this.button[i].lvl = game.add.bitmapText(0,0,'lucky_black',"",30) 
		this.button[i].lvl.text = parameter.lvl_opponent[i]
		this.button[i].lvl.x = this.button[i].x+200 
		this.button[i].lvl.y = this.posy-250+i*this.distance_in_height_between_button
		this.button[i].lvl.anchor.setTo(.5,0)
		this.button[i].lvl.visible = true
		this.button[i].lvl.id=i
		this.button[i].lvl.alpha = 0

		//indication du nombre de coeur à disposition de l'opponent 
		this.button[i].number_heart_opponent = game.add.bitmapText(0,0,'lucky',"",30) 
		this.button[i].number_heart_opponent.text = parameter.number_heart_opponent[i]
		this.button[i].number_heart_opponent.x = this.button[i].x+350 
		this.button[i].number_heart_opponent.y = this.posy-250+i*this.distance_in_height_between_button
		this.button[i].number_heart_opponent.anchor.setTo(.5,0)
		this.button[i].number_heart_opponent.visible = true
		this.button[i].number_heart_opponent.id=i
		this.button[i].number_heart_opponent.alpha = 0


		//ajout aux groupes
		Group.add(this.button[i]) 
		Group.add(this.button[i].name) 
		Group.add(this.button[i].cost) 
		Group.add(this.button[i].heart) 
		Group.add(this.button[i].best) 
		Group.add(this.button[i].lvl) 
		Group.add(this.button[i].number_heart_opponent) 
	}
	this.show_progressively_opponent()
}

Menu_network_opponent.prototype = Object.create(Phaser.Sprite.prototype)
Menu_network_opponent.prototype.constructor = Menu_network_opponent

//reduire le nombre de coeur en fonction du boutton choisi	
Menu_network_opponent.prototype.rearrange_table_number_of_sort_paper = function(nombre) {
	console.log('msg')
	if (this.button[nombre].alpha==1) {
	hud.stop_animate_circle()
		parameter.number_heart_opponent_chooce=parseInt(this.button[nombre].number_heart_opponent.text)
		//pour actualiser le nombre de coeurs
		menuPaper.init_heart()
		menuPaper_opponent.init_heart()
		little_roll_player.init_heart()
		little_roll_opponent.init_heart()
		this.init_first_transition()
	}
}


Menu_network_opponent.prototype.show = function() {
this.visible=true	
}
Menu_network_opponent.prototype.hide = function() {
	this.visible=false	
	this.cost.visible=false
	this.best.visible=false
	for (var i = 0; i < this.row; i++) {
		this.button[i].visible=false
		this.button[i].name.visible=false
		this.button[i].cost.visible=false
		this.button[i].heart.visible=false
		this.button[i].best.visible=false
		this.button[i].lvl.visible=false
		this.button[i].number_heart_opponent.visible=false
	}
}

//to simulate network
Menu_network_opponent.prototype.show_progressively_opponent = function() {
	this.number_of_i=this.row-1
	for (var i = 0; i < this.row; i++) {
		hud.animate_circle()
		this.tween_appears[i]=game.add.tween(this.button[i]).to({alpha:1},500,Phaser.Easing.Linear.None,true,1000*i)
		this.tween_appears[i]=game.add.tween(this.button[i].name).to({alpha:1},500,Phaser.Easing.Linear.None,true,1000*i)
		this.tween_appears[i]=game.add.tween(this.button[i].cost).to({alpha:1},500,Phaser.Easing.Linear.None,true,1000*i)
		this.tween_appears[i]=game.add.tween(this.button[i].heart).to({alpha:1},500,Phaser.Easing.Linear.None,true,1000*i)
		this.tween_appears[i]=game.add.tween(this.button[i].best).to({alpha:1},500,Phaser.Easing.Linear.None,true,1000*i)
		this.tween_appears[i]=game.add.tween(this.button[i].lvl).to({alpha:1},500,Phaser.Easing.Linear.None,true,1000*i)
		this.tween_appears[i]=game.add.tween(this.button[i].number_heart_opponent).to({alpha:1},500,Phaser.Easing.Linear.None,true,1000*i)
			
	}
	this.tween_appears[this.number_of_i].onComplete.add(hud.pause_animate_circle,hud)
}



Menu_network_opponent.prototype.init_first_transition = function() {
	tw.displacement_background_opponent_and_player()
	tw.move_timer_after_network()
	hud.stop_animate_circle()
	this.hide()
}



