//TODO:déplacer le text LVL vers la gauche ainsi que le numéro du level pour que ce soit centré

//////////////////////////////////////////////////////////////////////////////////////////
//background.js
//this.for background
//////////////////////////////////////////////////////////////////////////////////////////

var B = B || {}

draw_background = function(game){

	this.g10=G.fond_menu_Group10 
	this.g8=G.menuPaperGroup8 
	this.g12=G.contour_opponentGroup9 
	this.g11=G.contour_playerGroup9 
	this.g7=G.playerBackgroundGroup7 
	this.g6=G.opponentBackgroundGroup6 
	this.g5=G.playerPapers5 
	this.g4=G.opponentPapers4 
	this.g3tris=G.shadowGroup3tris 
	this.g3bis=G.cursorGroup3bis
	this.g3=G.timerGroup3 
	this.g2=G.topPlayerGroup2
	this.g1=G.topOpponentGroup1
	this.g0=G.timerGroup0

	this.color_player=brun
	this.color_opponent=red

	//fond du background
	Phaser.Sprite.call(this,game,0,0,'back')
	this.height=h
	//à 0 pour ne pas le voir au début
	this.alpha=0
	this.g8.add(this)

	//pour permettre ou non la FERMETURE des PANNEAUX
	this.flag_close=false

	//animation text looser et winner lorsqu'ils apparaissent
	this.winner_flag=true

	//gray filters
	//this.grayfiltertop = game.add.filter('Gray') ; this.grayfiltertop.gray=1
	//this.grayfilternull = game.add.filter('Gray') ; this.grayfilternull.gray=0

	this.fond_menu=game.add.sprite(0,0,'menu_back')
	this.fond_menu.height=h
	this.g10.add(this.fond_menu)


	//curseur player lorsque le joueur exerce une pression prolongée
	//this.cursor_player=drawSprite(this.g3bis,game,"circle",w4*3,h2,w4/3,w4/3,0.5,"none",0)
	this.cursor_player=game.add.sprite(w4*3,h2,"circle")
	this.g3bis.add(this.cursor_player)
	this.cursor_player.width=w4/3
	this.cursor_player.height=w4/3
	this.cursor_player.anchor.x=.5
	this.cursor_player.anchor.y=.5
	this.cursor_player.alpha=0

	this.cursor_player.flag=true
	this.cursor_player.isRaise=true	

	//curseur opponent lorsque le joueur exerce une pression prolongée
	this.cursor_opponent=game.add.sprite(w4,h2,"circle")
	this.g3bis.add(this.cursor_opponent)
	this.cursor_opponent.width=w4/3
	this.cursor_opponent.height=w4/3
	this.cursor_opponent.anchor.x=.5
	this.cursor_opponent.anchor.y=.5
	this.cursor_opponent.alpha=0

	//	this.cursor_opponent=drawSprite(this.g3bis,game,"rect",w4,h2,w2,w*.1,0.5,jaune,0)
	//	this.cursor_opponent.flag=true
	//	this.cursor_opponent.isRaise=true	

	this.cursor_palpitant=drawSprite(this.g1,game,"cursor_palpitant",w4*3,h2-100,w*.05,w*.05,0.5,0,.4)
	this.cursor_palpitant.alpha=0
	this.cursor_palpitant_time=250

	this.cursor_palpitant_opponent=drawSprite(this.g1,game,"cursor_palpitant",w4,h2-100,w*.05,w*.05,0.5,0,.4)
	this.cursor_palpitant_opponent.alpha=0
	this.cursor_palpitant_time_opponent=150

	this.cursor_player_particle = game.add.emitter(this.cursor_player.x, this.cursor_player.y, 200)
	this.cursor_player_particle.makeParticles("particle_player")
	this.cursor_player_particle.minParticleSpeed.setTo(-600,-600)
	this.cursor_player_particle.maxParticleSpeed.setTo(800,800)
	this.cursor_player_particle.setAlpha(0.5, .9)

	this.cursor_player_particle.minParticleScale = .5
	this.cursor_player_particle.maxParticleScale = .2
	this.cursor_player_particle.minRotation = 0
	this.cursor_player_particle.maxRotation = 0
	this.cursor_player_particle.on=false
	this.cursor_player_particle.start(true, 350, 19)

	this.cursor_opponent_particle_flag=true
	this.cursor_opponent_particle = game.add.emitter(this.cursor_opponent.x, this.cursor_opponent.y, 200)
	this.cursor_opponent_particle.makeParticles("particle_opponent")
	this.cursor_opponent_particle.minParticleSpeed.setTo(-600,-600)
	this.cursor_opponent_particle.maxParticleSpeed.setTo(800,800)
	this.cursor_opponent_particle.setAlpha(0.5, .9)

	this.cursor_opponent_particle.minParticleScale = .5
	this.cursor_opponent_particle.maxParticleScale = .2
	this.cursor_opponent_particle.minRotation = 0
	this.cursor_opponent_particle.maxRotation = 0
	this.cursor_opponent_particle.on=false
	this.cursor_opponent_particle.start(true, 350, 19)

	this.cursor_winner_particle = game.add.emitter(this.cursor_player.x, this.cursor_player.y, 200)
	this.cursor_winner_particle.makeParticles("particle_winner")
	this.cursor_winner_particle.minParticleSpeed.setTo(-200,-200)
	this.cursor_winner_particle.maxParticleSpeed.setTo(200,200)
	this.cursor_winner_particle.setAlpha(1,.8)

	this.cursor_winner_particle.minParticleScale = 1.9
	this.cursor_winner_particle.maxParticleScale = .9
	this.cursor_winner_particle.minRotation = 0
	this.cursor_winner_particle.maxRotation = 0
	this.cursor_winner_particle.on=false
	this.cursor_winner_particle.start(true, 800, 19)

	//épaisseur des bordures pour le menu avec les différents papiers
	var epaisseur_fond=25
	var epaisseur_fond_large=25
	// decalage pour avoir une division marquée au centre et pour voir le background du menu en dessous
	var decalage=epaisseur_fond*.1	


	//différents fond pour le cadre constituant le menu de sélection des papiers
	this.border_player_gauche=drawSprite(this.g8,game,"rect",w2+decalage,0,epaisseur_fond,h,0,this.color_player,1) 
	this.border_player_droit=drawSprite(this.g8,game,"rect",w-epaisseur_fond,0,epaisseur_fond,h,0,this.color_player,1) 
	this.border_player_superieur=drawSprite(this.g8,game,"rect",w2+epaisseur_fond,0,w2,epaisseur_fond,0,this.color_player,1) 
	this.border_player_inferieur=drawSprite(this.g8,game,"rect",w2+epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,this.color_player,1) 

	this.border_opponent_gauche=drawSprite(this.g8,game,"rect",0,0,epaisseur_fond,h,0,this.color_opponent,1) 
	this.border_opponent_droit=drawSprite(this.g8,game,"rect",w2-(epaisseur_fond+decalage),0,epaisseur_fond,h,0,this.color_opponent,1) 
	this.border_opponent_superieur=drawSprite(this.g8,game,"rect",0-epaisseur_fond,0,w2,epaisseur_fond,0,this.color_opponent,1) 
	this.border_opponent_inferieur=drawSprite(this.g8,game,"rect",0-epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,this.color_opponent,1) 

	//différents fond blanc pour le cadre constituant le menu de sélection des papiers
	this.border_player_gauche_white=drawSprite(this.g11,game,"rect",w2+decalage,0,epaisseur_fond,h,0,white,1) 
	this.border_player_droit_white=drawSprite(this.g11,game,"rect",w-epaisseur_fond,0,epaisseur_fond,h,0,white,1) 
	this.border_player_superieur_white=drawSprite(this.g11,game,"rect",w2+epaisseur_fond,0,w2,epaisseur_fond,0,white,1) 
	this.border_player_inferieur_white=drawSprite(this.g11,game,"rect",w2+epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,white,1) 

	this.border_opponent_gauche_white=drawSprite(this.g12,game,"rect",0,0,epaisseur_fond,h,0,white,1) 
	this.border_opponent_droit_white=drawSprite(this.g12,game,"rect",w2-(epaisseur_fond+decalage),0,epaisseur_fond,h,0,white,1) 
	//this.border_opponent_superieur_white=drawSprite(this.g12,game,"rect",0-epaisseur_fond,0,w2,epaisseur_fond,0,white,1) 
	this.border_opponent_inferieur_white=drawSprite(this.g12,game,"rect",0-epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,white,1) 

	//this.background de l'opponent et du player
	this.opponent=game.add.sprite(0,0,"opponent")
	this.opponent.height=h
	this.g6.add(this.opponent)
	//this.opponent=drawSprite(this.g6,game,"rect",0-decalage,0,w2,h+200,0,this.color_opponent,1) 
	this.player=game.add.sprite(w2,0,"player")
	this.player.height=h
	this.g7.add(this.player)
	//this.player=drawSprite(this.g7,game,"rect",w2+decalage,0,w2,h+200,0,this.color_player,1) 
	this.player.inputEnabled=true


	//ombre pour symboliser la table
	this.table_player=drawSprite(this.g3tris,game,"rect",w2,h2,w2,h,0,black,.5) 
	//this.table_opponent_cache=drawSprite(this.g3tris,game,"rect",0,0,w2,h,0,red,.5) 
	this.table_opponent=drawSprite(this.g3tris,game,"rect",0,h2,w2,h,0,black,.5) 

	//lignes à traits tirés pour symboliser la chute imminente
	var longeur_line=w/6
	this.line_player_droite=drawSprite(this.g3tris,game,"line",w/6*5,h2,longeur_line,w*.01,0,0,1)
	this.line_opponent_gauche=drawSprite(this.g3tris,game,"line",0,h2,longeur_line,w*.01,0,0,1)
	this.line_player_droite.alpha=0
	this.line_opponent_gauche.alpha=0

	//barre supérieure qui masque la chute du papier-- groupe différent pour que le texte et le papier soit recouvert 
	this.opponent_top=game.add.sprite(0,0,'opponent_top')
	this.opponent_top.alpha=0
	this.g1.add(this.opponent_top)
	//this.opponent_top=drawSprite(this.g1,game,"rect",0-decalage,0,w2,h*.15,0,this.color_opponent,1) 
	//this.player_top=drawSprite(this.g2,game,"rect",w2+decalage,0,w2,h*.15,0,this.color_player,1) 
	this.player_top=game.add.sprite(w2,0,'player_top')
	this.player_top.alpha=0
	this.g2.add(this.player_top)

	//line de collision avec le paper opponent
	this.line_collision_opponent=[]

	for (var j = 0; j < 5; j++) {
		//this.line_collision_opponent[j]=game.add.spricbv60179te(1000,game.rnd.integerInRange(h2+300,h),"line_collision")
		this.line_collision_opponent[j]=game.add.sprite(0,game.rnd.integerInRange(0,h),"line_collision")
		this.line_collision_opponent[j].isTouch=false
		this.line_collision_opponent[j].alpha=0
	}

	//textes du player et de l'opponent
	//taille you
	var taille=w*.05 
	//taille2 JOJO
	var taille2=w*.035 
	//taille3 LVL 1
	var taille3=w*.010 

	//texte symbolisant l'ombre sous le player et dont la visibilité apparait dans update via the Game.js
	//player
	this.text_name_player_shadow = game.add.bitmapText(w4*3+3,py1+3,'lucky','dev', taille) 
	this.text_name_player_shadow.alpha=.5
	this.text_name_player_shadow.visible=false
	this.text_name_player = game.add.bitmapText(w4*3,py1,'lucky_red','dev', taille) 
	this.text_level_player = game.add.bitmapText(w4*3,py3,'lucky_red','lvl  '+parameter.level_number_player, taille2) 
	this.text_level_player.alpha=1
	this.text_win = game.add.bitmapText(w4*3,h2-taille+taille*.5,'lucky_black_white','win', taille) 
	this.text_win.visible=false
	this.text_win.alpha=0
	//OPPONENT 
	this.text_name_opponent = game.add.bitmapText(w4,py1,'lucky_red','kill the game', taille) 
	this.text_level_opponent = game.add.bitmapText(w4,py3,'lucky_red','lvl  '+parameter.level_number_opponent, taille2) 
	this.text_level_opponent.alpha=1

	//modifications des anchors
	this.text_name_player.anchor.x=.5
	this.text_name_player.anchor.y=.5
	this.text_name_player_shadow.anchor.x=.5
	this.text_name_player_shadow.anchor.y=.5
	this.text_level_player.anchor.x=.5
	this.text_level_player.anchor.y=.5
	this.text_win.anchor.x=.5
	this.text_win.anchor.y=.5

	this.text_name_opponent.anchor.x=.5
	this.text_name_opponent.anchor.y=.5
	this.text_level_opponent.anchor.x=.5
	this.text_level_opponent.anchor.y=.5

	//ajout des textes aux groupes
	this.g2.add(this.text_name_player) 
	this.g2.add(this.text_name_player_shadow) 
	this.g2.add(this.text_level_player) 

	this.g1.add(this.text_level_opponent) 
	this.g1.add(this.text_name_opponent) 

	//flash pour signifier que la position est lockée
	this.flash_opponent = game.add.sprite(0,0,"rect")
	this.flash_opponent.width=w2
	this.flash_opponent.height=h
	this.flash_opponent.alpha=0
	this.flash_opponent.tint=white
	this.g1.add(this.flash_opponent)

	//flash pour signifier que la position est lockée
	this.flash_player = game.add.sprite(w2,0,"rect")
	this.flash_player.width=w2
	this.flash_player.height=h
	this.flash_player.alpha=0
	this.flash_player.tint=white
	this.g2.add(this.flash_player)
	//animation du texte du joueur lorsqu'on maintient la pression appuyée
	this.panimTween=game.add.tween(this.text_name_player.scale).to({x:2, y:2},150,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
	this.panimTween_shadow=game.add.tween(this.text_name_player_shadow.scale).to({x:2.1, y:2.1},155,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
	this.panimTween.pause()
	this.panimTween_shadow.pause()
}

draw_background.prototype = Object.create(Phaser.Sprite.prototype)
draw_background.prototype.constructor = draw_background

//TRANSITIONS : ligne à traits tirés apparaissant pour signifier le mileu de la table
draw_background.prototype.tween_begin_game=function(){

	this.tween_level_and_number_opponent4=game.add.tween(little_roll_opponent).to({alpha:.9},500,Phaser.Easing.Linear.None,true,delay_paper_fall)

	this.tween_level_and_number_player1=game.add.tween(this.text_level_player).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_level_and_number_opponent1=game.add.tween(this.text_level_opponent).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_roll_opponent=game.add.tween(little_roll_opponent).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall-300)
	this.tween_roll_player=game.add.tween(little_roll_player).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall-300)
	this.tween_roll_opponent=game.add.tween(little_roll_opponent.heart).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall-300)
	this.tween_roll_player=game.add.tween(little_roll_player.heart).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall-300)
	this.tween_line_opponent_appears=game.add.tween(this.line_opponent_gauche).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_line_player_appears=game.add.tween(this.line_player_droite).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_cursor_appears=game.add.tween(this.cursor_palpitant).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_cursor_appears_opponent=game.add.tween(this.cursor_palpitant_opponent).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.cursor_palpitant_tween=game.add.tween(this.cursor_palpitant.scale).to({x:2.4, y:2.4},this.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,delay_paper_fall,-1,false)
	this.cursor_palpitant_tween_opponent=game.add.tween(this.cursor_palpitant_opponent.scale).to({x:2.4, y:2.4},this.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,delay_paper_fall,-1,false)
}
//animation text looser et winner lorsqu'ils apparaissent
draw_background.prototype.winner=function(nam_winner){


	if (this.winner_flag){
		this.winner_flag = false
		console.log("valueloooo");
paper_player.text_position.visible=false
paper_player.line_position.visible=false
		this.text_win.visible=true
		this.cursor_player.visible=false
		this.cursor_palpitant.visible=false
		this.cursor_opponent.visible=false
		this.cursor_palpitant_opponent.visible=false
		if (nam_winner=="player"){
			this.text_win.x=w4*3
			game.time.events.add(1200,this.particle_winner,this)
		}else if(nam_winner=="opponent"){
			this.text_win.x=w4
			game.time.events.add(1200,this.particle_winner,this)
		}else if(nam_winner=="egality"){
			this.text_win.x=w2
			this.text_win.y=h2-300
			this.text_win.text="egality"
		}

		this.cursor_winner_particle.y=this.text_win.y
		this.cursor_winner_particle.x=this.text_win.x

		this.tween_looser_alpha=game.add.tween(this.text_win).to({alpha:1},100,Phaser.Easing.Elastic.Out,true,600)
		this.tween_looser=game.add.tween(this.text_win.scale).to({x:2.5, y:2.5},1800,Phaser.Easing.Elastic.Out,true,900)
	}
}

draw_background.prototype.particle_winner = function() {
	this.cursor_winner_particle.on=true
}

B = B || {}

