//////////////////////////////////////////////////////////////////////////////////////////
//menupaper
var M = M || {}
//////////////////////////////////////////////////////////////////////////////////////////

Menu = function(game,Group,id,posx,posy){
	this.posx=posx
	this.posy=posy
	this.Group=Group
	this.id=id
	this.sub_group_coupons=game.add.group()
	this.sub_group=game.add.group()
	this.distance_in_height_between_button=155
	this.row=nu.paper

	//coeur
	Phaser.Sprite.call(this,game,this.posx,this.posy,'heart')
	this.x=this.posx-175
	this.y=this.posy+140
	this.Group.add(this)


	//boutton pour sélectionner le paper
	this.button_paper_select=[] 
	for (var i = 0; i < this.row; i++) {
		//icone grises
		this.button_paper_select[i] = game.add.sprite(0,0,'button_paper_select1') 
		this.button_paper_select[i].x = this.posx-160
		this.button_paper_select[i].y = this.posy+310+i*this.distance_in_height_between_button
		this.button_paper_select[i].visible = false
		this.button_paper_select[i].alpha = 0

		//icone
		this.button_paper_select[i].main = game.add.sprite(0,0,'button_paper_select1') 
		this.button_paper_select[i].main.x = this.posx-160
		this.button_paper_select[i].main.y =this.posy+310+i*this.distance_in_height_between_button
		this.button_paper_select[i].main.visible = false 
		this.button_paper_select[i].main.alpha = 0 

		Group.add(this.button_paper_select[i]) 
		Group.add(this.button_paper_select[i].main) 
	}

	//boutton play
	this.button_play=game.add.button(this.posx,h*.85,"play_button",this.closepanel,this)
	this.button_play.anchor.setTo(.5,.5)
	this.button_play.visible=false
	this.button_play.alpha=0
	Group.add(this.button_play)

	//coupons de papiers sous le rouleau
	this.paper_gray=[]
	for (var i = 0;i < nu.paper; i++) {
		this.paper_gray[i]=game.add.sprite(this.posx,this.posy,'sprite_paper_gray')
		this.paper_gray[i].x=this.posx-50
		this.paper_gray[i].y=this.posy-150+i*100	
		this.paper_gray[i].width=100
		this.paper_gray[i].height=100
		this.sub_group_coupons.add(this.paper_gray[i])
	}
	this.paper_gray[7].frame=0

	this.paper=[]
	for (var i = 0;i < nu.paper; i++) {
		this.paper[i]=game.add.sprite(this.posx,this.posy,'sprite_paper')
		this.paper[i].x=this.posx-50
		this.paper[i].y=this.posy-150+i*100	
		this.paper[i].width=100
		this.paper[i].height=100
		this.sub_group_coupons.add(this.paper[i])
	}
	this.paper[7].frame=0
	this.paper[7].alpha=0
	this.sub_group.add(this.sub_group_coupons)

	//masque pour cacher les papiers pedant la chute
	this.mask_for_paper=game.add.sprite(this.posx,this.posy+545,'rect')
	this.mask_for_paper.tint=color_menu
	this.mask_for_paper.anchor.y=1
	this.mask_for_paper.anchor.x=.5
	this.mask_for_paper.width=130
	this.mask_for_paper.height=900
	this.sub_group.add(this.mask_for_paper)

	//rouleau de papier
	this.roll_paper=game.add.sprite(this.posx,this.posy+420,'roll_paper_menu_select')
	console.log("value",this.roll_paper.x);
	this.roll_paper.anchor.x=.5
	this.sub_group.add(this.roll_paper)

	//rouleau de papier qui tourne
	this.roll_paper_turn_faster=game.add.sprite(this.posx-6,this.posy+391,'roll_turn_faster')
	this.roll_paper_turn_faster.anchor.x=.5
	this.roll_paper_turn_faster.alpha=0
	this.sub_group.add(this.roll_paper_turn_faster)

	//repere pour le dernier rouleau
	this.repere_for_end_of_roll = game.add.sprite(this.posx,this.posy+1300,"repere")
	this.repere_for_end_of_roll.anchor.x=.5
	this.repere_for_end_of_roll.anchor.y=.5
	this.repere_for_end_of_roll.alpha=0

	this.sub_group.add(this.repere_for_end_of_roll)
	this.Group.add(this.sub_group)

	//score à coté du coeur
	this.amount_of_heart_paper=game.add.bitmapText(this.posx,this.posy+120,'lucky',100,80)
	this.amount_of_heart_paper.anchor.x=.5
	this.amount_of_heart_paper.text="2000"
	this.Group.add(this.amount_of_heart_paper)

	//deplacement des rouleaux au milieu
	game.time.events.add(1600,this.deroll_paper,this)
	//TODO mettre ici une condition en fonction du player choisi
	//game.time.events.add(5000,this.move_roll_paper,this)
}

Menu.prototype = Object.create(Phaser.Sprite.prototype)
Menu.prototype.constructor = Menu

Menu.prototype.deroll_paper = function() {
	this.tween_agite_roll=game.add.tween(this.roll_paper_turn_faster).to({alpha:1},100,Phaser.Easing.Linear.None,true,0,-1)
	this.tween_agite_roll.yoyo(true, 100)
	this.tween_fall_paper=game.add.tween(this.sub_group_coupons).to({x:0,y:this.posy+700},1200,Phaser.Easing.Bounce.Out,true,0)
	this.tween_fall_paper.onComplete.add(this.stop_turn_roll_paper,this)
}

Menu.prototype.stop_turn_roll_paper = function() {
	this.tween_agite_roll.pause()	
	this.roll_paper_turn_faster.alpha=0
}

Menu.prototype.closepanel=function(){
	if (background.flag_close && menuPaper_opponent.button_play.visible==false){
		tw.displacement_background_opponent_and_player_close()
	}
}

Menu.prototype.move_roll_paper = function() {
	this.tween_move_roll_paper=game.add.tween(this.sub_group).to({x:105,y:this.posy},100,Phaser.Easing.Linear.None,true,0)
	this.tween_move_roll_paper.onComplete.add(this.show_button_if_player_chooce,this)
}

Menu.prototype.show_button_if_player_chooce = function() {
	for (var i = 0; i < this.row; i++) {
		this.button_paper_select[i].visible=true
		game.add.tween(this.button_paper_select[i]).to({alpha:1},500,Phaser.Easing.Linear.None,true,0)
	}	
	this.button_play.visible=true
	game.add.tween(this.button_play).to({alpha:1},500,Phaser.Easing.Linear.None,true,0)
	this.anim_repere()
}

Menu.prototype.anim_repere = function() {
	game.add.tween(this.repere_for_end_of_roll).to({alpha:1},500,Phaser.Easing.Linear.None,true,0)
	game.add.tween(this.repere_for_end_of_roll.scale).to({x:1.5,y:1.5},500,Phaser.Easing.Linear.None,true,0,-1)

}

M = M || {}
