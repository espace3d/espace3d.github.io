//////////////////////////////////////////////////////////////////////////////////////////
//background.js
//this.for background
//////////////////////////////////////////////////////////////////////////////////////////
//dessins de tous les éléments du décor


function drawBackground(game,group8,group7,group6,group3tris,group3bis,group2,group1) {
	//var this={}

	//////////////////////////////////////////////////////////////////////////////////////////
	//gray filters

	this.grayfiltertop = game.add.filter('Gray') ; this.grayfiltertop.gray=1
	this.grayfilternull = game.add.filter('Gray') ; this.grayfilternull.gray=0

	//curseur player lorsque le joueur exerce une pression prolongée
	this.cursor_player=drawSprite(group3bis,game,"rect",w4*3,h2,w2,w*.1,0.5,red,0)
	this.cursor_player.flag=true
	this.cursor_player.isRaise=true	

	//curseur opponent lorsque le joueur exerce une pression prolongée
	this.cursor_opponent=drawSprite(group3bis,game,"rect",w4,h2,w2,w*.1,0.5,blue,0)
	this.cursor_opponent.flag=true
	this.cursor_opponent.isRaise=true	

	this.cursor_palpitant=drawSprite(group1,game,"cursor_palpitant",w4*3,h2-100,w*.05,w*.05,0.5,0,.4)
	this.cursor_palpitant.alpha=0
	this.cursor_palpitant_time=150

	this.cursor_palpitant_opponent=drawSprite(group1,game,"cursor_palpitant",w4,h2-100,w*.05,w*.05,0.5,0,.4)
	this.cursor_palpitant_opponent.alpha=0
	this.cursor_palpitant_time_opponent=150

	this.cursor_player_particle = game.add.emitter(this.cursor_player.x, this.cursor_player.y, 200)
	this.cursor_player_particle.makeParticles("particle_player")
	this.cursor_player_particle.minParticleSpeed.setTo(-300,-300)
	this.cursor_player_particle.maxParticleSpeed.setTo(400,400)
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
	this.cursor_opponent_particle.minParticleSpeed.setTo(-300,-300)
	this.cursor_opponent_particle.maxParticleSpeed.setTo(400,400)
	this.cursor_opponent_particle.setAlpha(0.5, .9)

	this.cursor_opponent_particle.minParticleScale = .5
	this.cursor_opponent_particle.maxParticleScale = .2
	this.cursor_opponent_particle.minRotation = 0
	this.cursor_opponent_particle.maxRotation = 0
	this.cursor_opponent_particle.on=false
	this.cursor_opponent_particle.start(true, 350, 19)

	//à 0 pour ne pas le voir au début
	this.fond=drawSprite(group8,game,"back",0,0,w,h,0,0,1) 

	//épaisseur des bordures pour le menu avec les différents papiers
	var epaisseur_fond=25
	var epaisseur_fond_large=25
	// decalage pour avoir une division marquée au centre et pour voir le background du menu en dessous
	var decalage=epaisseur_fond*.1	

	//différents fond pour le cadre constituant le menu de sélection des papiers
	this.border_player_gauche=drawSprite(group8,game,"rect",w2+decalage,0,epaisseur_fond,h,0,blue,1) 
	this.border_player_droit=drawSprite(group8,game,"rect",w-epaisseur_fond,0,epaisseur_fond,h,0,blue,1) 
	this.border_player_superieur=drawSprite(group8,game,"rect",w2+epaisseur_fond,0,w2,epaisseur_fond,0,blue,1) 
	this.border_player_inferieur=drawSprite(group8,game,"rect",w2+epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,blue,1) 

	this.border_opponent_gauche=drawSprite(group8,game,"rect",0,0,epaisseur_fond,h,0,red,1) 
	this.border_opponent_droit=drawSprite(group8,game,"rect",w2-(epaisseur_fond+decalage),0,epaisseur_fond,h,0,red,1) 
	this.border_opponent_superieur=drawSprite(group8,game,"rect",0-epaisseur_fond,0,w2,epaisseur_fond,0,red,1) 
	this.border_opponent_inferieur=drawSprite(group8,game,"rect",0-epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,red,1) 

	//this.background de l'opponent et du player
	this.opponent=drawSprite(group6,game,"rect",0-decalage,0,w2,h,0,red,1) 
	this.player=drawSprite(group7,game,"rect",w2+decalage,0,w2,h,0,blue,1) 
	this.player.inputEnabled=true

	//ombre pour symboliser la table
	this.table_player=drawSprite(group3tris,game,"rect",w2,h2,w2,h2,0,black,.2) 
	this.table_opponent=drawSprite(group3tris,game,"rect",0,h2,w2,h2,0,black,.2) 

	//lignes à traits tirés pour symboliser la chute imminente
	var longeur_line=w/6
	this.line_player_droite=drawSprite(group7,game,"line",w/6*5,h2,longeur_line,w*.01,0,0,1)
	this.line_opponent_gauche=drawSprite(group6,game,"line",0,h2,longeur_line,w*.01,0,0,1)
	this.line_player_droite.alpha=0
	this.line_opponent_gauche.alpha=0

	//barre supérieure qui masque la chute du papier-- groupe différent pour que le texte et le papier soit recouvert 
	this.opponent_top=drawSprite(group1,game,"rect",0-decalage,0,w2,h*.15,0,red,1) 
	this.player_top=drawSprite(group2,game,"rect",w2+decalage,0,w2,h*.15,0,blue,1) 

	//line de collision avec le paper opponent
	this.line_collision_opponent=[]

	for (var j = 0; j < 5; j++) {
		this.line_collision_opponent[j]=game.add.sprite(0,game.rnd.integerInRange(h2,(h+h2)),"line_collision")
		this.line_collision_opponent[j].isTouch=false

		this.line_collision_opponent[j].alpha=.1
	}

	//textes du player et de l'opponent
	//taille you
	var taille=w*.07 
	//taille2 JOJO
	var taille2=w*.05 
	//taille3 LVL 1
	var taille3=w*.03 

	//texte symbolisant l'ombre sous le player et dont la visibilité apparait dans update via the Game.js
	//player
	this.text_name_player_shadow = game.add.bitmapText(w4*3+3,py1+3,'lucky','dev', taille) 
	this.text_name_player_shadow.alpha=.5
	this.text_name_player_shadow.visible=false
	this.text_name_player = game.add.bitmapText(w4*3,py1,'lucky','dev', taille) 
	this.text_level_player = game.add.bitmapText(w4*3,py3,'lucky','lvl ', taille2) 
	this.text_level_player.alpha=0
	this.text_level_number_player=game.add.bitmapText(w4*3+30,py3,'lucky','1', taille2) 
	this.text_level_number_player.tint=jaune
	this.text_level_number_player.alpha=0

	this.text_win_player = game.add.bitmapText(w4*3,h2,'lucky','win', taille) 
	this.text_win_player.tint=jaune
	this.text_win_player.visible=false

	this.text_loose_player = game.add.bitmapText(w4*3,h2,'lucky','loose', taille) 
	this.text_loose_player.tint=jaune
	this.text_loose_player.visible=false

	//OPPONENT 
	this.text_name_opponent = game.add.bitmapText(w4,py1,'lucky','kill the game', taille) 
	this.text_level_opponent = game.add.bitmapText(w4,py3,'lucky','lvl ', taille2) 
	this.text_level_opponent.alpha=0
	this.text_level_number_opponent=game.add.bitmapText(w4+30,py3,'lucky','5', taille2) 
	this.text_level_number_opponent.tint=jaune
	this.text_level_number_opponent.alpha=0

	this.text_win_opponent = game.add.bitmapText(w4,h2,'lucky','win', taille) 
	this.text_win_opponent.tint=jaune
	this.text_win_opponent.visible=false

	this.text_loose_opponent = game.add.bitmapText(w4,h2,'lucky','loose', taille) 
	this.text_loose_opponent.tint=jaune
	this.text_loose_opponent.visible=false

	//modifications des anchors
	this.text_name_player.anchor.x=.5
	this.text_name_player.anchor.y=.5
	this.text_name_player_shadow.anchor.x=.5
	this.text_name_player_shadow.anchor.y=.5
	this.text_level_player.anchor.x=.5
	this.text_level_player.anchor.y=.5
	this.text_level_number_player.anchor.x=.5
	this.text_level_number_player.anchor.y=.5
	this.text_win_player.anchor.x=.5
	this.text_win_player.anchor.y=.5
	this.text_loose_player.anchor.x=.5
	this.text_loose_player.anchor.y=.5

	this.text_name_opponent.anchor.x=.5
	this.text_name_opponent.anchor.y=.5
	this.text_level_opponent.anchor.x=.5
	this.text_level_opponent.anchor.y=.5
	this.text_level_number_opponent.anchor.x=.5
	this.text_level_number_opponent.anchor.y=.5
	this.text_win_opponent.anchor.x=.5
	this.text_win_opponent.anchor.y=.5
	this.text_loose_opponent.anchor.x=.5
	this.text_loose_opponent.anchor.y=.5

	//ajout des textes aux groupes
	group2.add(this.text_name_player) 
	group2.add(this.text_name_player_shadow) 
	group2.add(this.text_level_player) 
	group2.add(this.text_level_number_player) 

	group1.add(this.text_level_opponent) 
	group1.add(this.text_name_opponent) 
	group1.add(this.text_level_number_opponent) 

	//////////////////////////////////////////////////////////////////////////////////////////
	//TRANSITIONS
	//ligne à traits tirés apparaissant pour signifier le mileu de la table
	this.tween_level_and_number_player1=game.add.tween(this.text_level_player).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_level_and_number_player2=game.add.tween(this.text_level_number_player).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_level_and_number_opponent1=game.add.tween(this.text_level_opponent).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_level_and_number_opponent2=game.add.tween(this.text_level_number_opponent).to({alpha:1},500,Phaser.Easing.Linear.None,true,delay_paper_fall)
	this.tween_line_opponent_appears=game.add.tween(this.line_opponent_gauche).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
	this.tween_line_player_appears=game.add.tween(this.line_player_droite).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
	this.tween_cursor_appears=game.add.tween(this.cursor_palpitant).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,3500)
	this.tween_cursor_appears_opponent=game.add.tween(this.cursor_palpitant_opponent).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,3500)
	this.cursor_palpitant_tween=game.add.tween(this.cursor_palpitant.scale).to({x:1.2, y:1.2},this.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,5500,-1,false)
	this.cursor_palpitant_tween_opponent=game.add.tween(this.cursor_palpitant_opponent.scale).to({x:1.2, y:1.2},this.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,5500,-1,false)
	//////////////////////////////////////////////////////////////////////////////////////////
	//animation du texte du joueur lorsqu'on maintient la pression appuyée
	this.panimTween=game.add.tween(this.text_name_player.scale).to({x:2, y:2},150,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
	this.panimTween_shadow=game.add.tween(this.text_name_player_shadow.scale).to({x:2.1, y:2.1},155,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
	this.panimTween.pause()
	this.panimTween_shadow.pause()

//	e.check_winner=function(stoptween,fonction,obj){
//		console.log("stoptween")
//		//if (this.text_win_player && this.text_loose_opponent) {
//			//stoptween
//			//fonction
//		//}
//		//else if (this.text_loose_player && this.text_win_opponent){
//			stoptween
//			fonction(obj)
//		//}
//	}

	return this
}

//////////////////////////////////////////////////////////////////////////////////////////
//DEPLACEMENT DES PANNEAUX DE BACKGROUND ET DES TEXTES SUPERIEURS
// Les obj symbolise des groupes
//obj1=opponent
//obj2=top texte de l'opponent
//obj3= players
//obj4: top texte du player
//|-----||-----|
//|     ||     |
//|  @  ||  @  | 
//|     ||     | 
//|-----||-----|

//|-----|   |-----|
//|     |   |     |
//|  @  |   |  @  | 
//|     |   |     | 
//|-----|   |-----|

displacement_background_opponent_and_player=function(obj1,obj2,obj3,obj4,game){

	displacement_position(game,obj1,-w,0,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,obj2,-w,h2,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,obj3,w,0,delay_open_panel_background,time_open_panel_background,"Bounce.out")
	displacement_position(game,obj4,w,h2,delay_open_panel_background,time_open_panel_background,"Bounce.out")

	//TIMER POUR RAMENER LES DEUX PANNEAUX VERS LE CENTRE
	/*//CETTE FONCTION DOIT ÊTRE RATTACHÉE AU BOUTTON PLAY DANS LA SÉLECTION DES PAPIERS
	*/
	function back(){
		displacement_position(game,obj1,0,0,0,time_close_panel_background,"Bounce.Out")
		displacement_position(game,obj2,0,h2,0,time_close_panel_background,"Bounce.Out")
		displacement_position(game,obj3,0,0,0,time_close_panel_background,"Bounce.Out")
		displacement_position(game,obj4,0,h2,0,time_close_panel_background,"Bounce.Out")
	}

	game.time.events.add(delay_close_panel_background,back,this);

}

//////////////////////////////////////////////////////////////////////////////////////////
//DEPLACEMENT DE L'OMBRE DE LA TABLE POUR SYMBOLISER LA VUE QUI VA VERS LE HAUT
//obj1 est l'opponent
//obj2 est le player
//obj3 est le texte de l'opponent
//obj4 est le texte du player
//obj 5 est le timer
// les times sont renseignés dans parameters
//|--@--||--@--|
//|     ||     |
//||||||||||||||    
//||||||||||||||    
//|-----||-----|

displacement_background_shadow=function(obj1,obj2,obj3,obj4,obj5,game) {

	displacement_position(game,obj1,0,h2,delay_shadow_up_and_text_up,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,obj2,w2,h2,delay_shadow_up_and_text_up,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,obj3,0,0,delay_shadow_up_and_text_up,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,obj4,0,0,delay_shadow_up_and_text_up,time_shadow_up_and_texte_up,"Linear.None")
	displacement_position(game,obj5,0,0,delay_shadow_up_and_text_up,time_shadow_up_and_texte_up,"Linear.None")

	//modification de l'alpha pour symboliser la perspective
	displacement_alpha(game,obj1,.8,delay_shadow_up_and_text_up,time_shadow_up_and_texte_up,"Linear.None")
	displacement_alpha(game,obj2,.8,delay_shadow_up_and_text_up,time_shadow_up_and_texte_up,"Linear.None")
}

