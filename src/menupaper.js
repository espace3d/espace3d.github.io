//////////////////////////////////////////////////////////////////////////////////////////
//menupaper
var M = M || {}
//////////////////////////////////////////////////////////////////////////////////////////
//dessin de la grille
Menu = function(game,Group){

	Phaser.Sprite.call(this,game,0,0,'iconpaper')
	this.Group=Group

	this.fond=game.add.sprite(0,0,'menu_back')
	this.fond.alpha=1
	this.Group.add(this.fond)
	this.Group.add(this)

	this.row=2
	this.line=4
	this.espacement=w*.03
	this.wi=w*.12
	this.posx=w2
	this.posy=0
	this.side = (w2-((this.row*this.wi)+this.espacement))/this.row	

	this.paper_select=[] 
	for (var j = 0; j < this.line; j++) {
		this.paper_select[j] = [] 
		for (var i = 0; i < this.row; i++) {
			//icone grises
			this.paper_select[j][i] = this 
			this.paper_select[j][i].x = this.posx+this.side+this.wi*i+this.espacement*i
			this.paper_select[j][i].y =this.posy+h*.4+(j*(this.wi+this.espacement))-this.wi*2 
			this.paper_select[j][i].visible = false
			//this.paper_select[j][i].filters=[this.grayfiltertop] 

			//icone
			this.paper_select[j][i].main = this 
			this.paper_select[j][i].main.x = this.posx+this.side+this.wi*i+this.espacement*i
			this.paper_select[j][i].main.y =this.posy+h*.4+(j*(this.wi+this.espacement))-this.wi*2 
			this.paper_select[j][i].main.animations.add('derolp')
			this.paper_select[j][i].main.animations.play('derolp',1,true)
			this.paper_select[j][i].main.visible = false 

			Group.add(this.paper_select[j][i]) 
			Group.add(this.paper_select[j][i].main) 

			this.button_play=game.add.button(w4*3.3,h*.85,"play_button",closepanel,this)
			this.button_play.anchor.setTo(.5,.5)
			Group.add(this.button_play)
			function closepanel(){
				if (background.flag_close){
					tw.displacement_background_opponent_and_player_close()
				}
			}
		}
	}
}

Menu.prototype = Object.create(Phaser.Sprite.prototype)
Menu.prototype.constructor = Menu

M = M || {}
