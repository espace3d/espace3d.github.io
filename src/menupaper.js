//////////////////////////////////////////////////////////////////////////////////////////
//menupaper
var M = M || {}
//////////////////////////////////////////////////////////////////////////////////////////
//dessin de la grille
function draw_Grid(e,Group,game,row,line,espacement,wi,he,posx,posy) {
	var side = (w2-((row*wi)+espacement))/row	
	//filtres gris et couleurs
	this.grayfiltertop = game.add.filter('Gray') ; this.grayfiltertop.gray=1
	this.grayfilternull = game.add.filter('Gray') ; this.grayfilternull.gray=0

	this.paper_select=[] 
	for (var j = 0; j < line; j++) {
		this.paper_select[j] = [] 
		for (var i = 0; i < row; i++) {
			//icone grises
			this.paper_select[j][i] = drawSprite(Group,game,"iconpaper",0,0,wi,he,0,white,1) 
			this.paper_select[j][i].x = posx+side+wi*i+espacement*i
			this.paper_select[j][i].y =posy+h*.4+(j*(wi+espacement))-wi*2 
			this.paper_select[j][i].visible = true
			this.paper_select[j][i].filters=[this.grayfiltertop] 

			//icone
			this.paper_select[j][i].main = drawSprite(Group,game,"iconpaper",0,0,wi,he,0,white,1) 
			this.paper_select[j][i].main.x = posx+side+wi*i+espacement*i
			this.paper_select[j][i].main.y =posy+h*.4+(j*(wi+espacement))-wi*2 
			this.paper_select[j][i].main.animations.add('derolp')
			this.paper_select[j][i].main.animations.play('derolp',1,true)
			this.paper_select[j][i].main.visible = true 

			Group.add(this.paper_select[j][i]) 
			Group.add(this.paper_select[j][i].main) 
		}
	}

	this.button_play=game.add.button(w4*3,h*.7,"play_button",closepanel,this)
	this.button_play.anchor.setTo(.5,.5)
	Group.add(this.button_play)

	function closepanel(){
		background.displacement_background_opponent_and_player_close(G.opponentBackgroundGroup6,G.topOpponentGroup1,G.playerBackgroundGroup7,G.topPlayerGroup2,this.game)
	}

	return this
}

//////////////////////////////////////////////////////////////////////////////////////////
//menu 
M.drawMenuPaper= function(e,Group,game) {
	//var this=[]
	this.cell_player=draw_Grid(e,Group,game,2,4,w*.03,w*.12,w*.12,w2,0)
	return this
}
M = M || {}
