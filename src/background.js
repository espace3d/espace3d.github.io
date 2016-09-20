//////////////////////////////////////////////////////////////////////////////////////////
//background.js
//e for background
//////////////////////////////////////////////////////////////////////////////////////////
//dessins de tous les éléments du décor


function drawBackground(game,group8,group7,group6,group3tris,group3bis,group2,group1) {
	var e=[]

	//////////////////////////////////////////////////////////////////////////////////////////
	//gray filters

	e.grayfiltertop = game.add.filter('Gray') ; e.grayfiltertop.gray=1
	e.grayfilternull = game.add.filter('Gray') ; e.grayfilternull.gray=0

	//curseur player lorsque le joueur exerce une pression prolongée
	e.cursor_player=drawSprite(group3bis,game,"rect",w4*3,h2,w2,w*.1,0.5,red,0)
	e.cursor_player.flag=true
	e.cursor_player.isRaise=true	

	//curseur opponent lorsque le joueur exerce une pression prolongée
	e.cursor_opponent=drawSprite(group3bis,game,"rect",w4,h2,w2,w*.1,0.5,blue,0)
	e.cursor_opponent.flag=true
	e.cursor_opponent.isRaise=true	

	e.cursor_palpitant=drawSprite(group1,game,"cursor_palpitant",w4*3,h2-100,w*.05,w*.05,0.5,0,.4)
	e.cursor_palpitant.alpha=0
	e.cursor_palpitant_time=150

	e.cursor_palpitant_opponent=drawSprite(group1,game,"cursor_palpitant",w4,h2-100,w*.05,w*.05,0.5,0,.4)
	e.cursor_palpitant_opponent.alpha=0
	e.cursor_palpitant_time_opponent=150

	//particle pour le cursor player
	e.cursor_player_particle_flag=true
	e.cursor_player_particle_appears=function(){
		e.cursor_player_particle = game.add.emitter(e.cursor_player.x, e.cursor_player.y, 200)
		e.cursor_player_particle.makeParticles("particle_player")
		e.cursor_player_particle.minParticleSpeed.setTo(-300,-300)
		e.cursor_player_particle.maxParticleSpeed.setTo(400,400)
		e.cursor_player_particle.setAlpha(0.5, .9)

		e.cursor_player_particle.minParticleScale = .5
		e.cursor_player_particle.maxParticleScale = .2
		e.cursor_player_particle.minRotation = 0
		e.cursor_player_particle.maxRotation = 0
		e.cursor_player_particle.on=true
		e.cursor_player_particle.start(false, 350, 19)
		return e.cursor_player_particle
	}

	e.cursor_player_particle_appears()

	e.cursor_player_particle_destroy=function(){
		e.cursor_player_particle.on=false
	}

	e.cursor_opponent_particle_flag=true
	e.cursor_opponent_particle_appears=function(){
		e.cursor_opponent_particle = game.add.emitter(e.cursor_opponent.x, e.cursor_opponent.y, 200)
		e.cursor_opponent_particle.makeParticles("particle_opponent")
		e.cursor_opponent_particle.minParticleSpeed.setTo(-300,-300)
		e.cursor_opponent_particle.maxParticleSpeed.setTo(400,400)
		e.cursor_opponent_particle.setAlpha(0.5, .9)

		e.cursor_opponent_particle.minParticleScale = .5
		e.cursor_opponent_particle.maxParticleScale = .2
		e.cursor_opponent_particle.minRotation = 0
		e.cursor_opponent_particle.maxRotation = 0
		e.cursor_opponent_particle.on=true
		e.cursor_opponent_particle.start(false, 350, 19)
		return e.cursor_opponent_particle
	}

	e.cursor_opponent_particle_appears()

	e.cursor_opponent_particle_destroy=function(){
		e.cursor_opponent_particle.on=false
	}
	//à 0 pour ne pas le voir au début
	e.fond=drawSprite(group8,game,"back",0,0,w,h,0,0,1) 

	//épaisseur des bordures pour le menu avec les différents papiers
	var epaisseur_fond=25
	var epaisseur_fond_large=25
	// decalage pour avoir une division marquée au centre et pour voir le background du menu en dessous
	var decalage=epaisseur_fond*.1	

	//différents fond pour le cadre constituant le menu de sélection des papiers
	e.border_player_gauche=drawSprite(group8,game,"rect",w2+decalage,0,epaisseur_fond,h,0,blue,1) 
	e.border_player_droit=drawSprite(group8,game,"rect",w-epaisseur_fond,0,epaisseur_fond,h,0,blue,1) 
	e.border_player_superieur=drawSprite(group8,game,"rect",w2+epaisseur_fond,0,w2,epaisseur_fond,0,blue,1) 
	e.border_player_inferieur=drawSprite(group8,game,"rect",w2+epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,blue,1) 

	e.border_opponent_gauche=drawSprite(group8,game,"rect",0,0,epaisseur_fond,h,0,red,1) 
	e.border_opponent_droit=drawSprite(group8,game,"rect",w2-(epaisseur_fond+decalage),0,epaisseur_fond,h,0,red,1) 
	e.border_opponent_superieur=drawSprite(group8,game,"rect",0-epaisseur_fond,0,w2,epaisseur_fond,0,red,1) 
	e.border_opponent_inferieur=drawSprite(group8,game,"rect",0-epaisseur_fond,h-epaisseur_fond_large,w2,epaisseur_fond_large,0,red,1) 

	//background de l'opponent et du player
	e.opponent=drawSprite(group6,game,"rect",0-decalage,0,w2,h,0,red,1) 
	e.player=drawSprite(group7,game,"rect",w2+decalage,0,w2,h,0,blue,1) 
	e.player.inputEnabled=true

	//ombre pour symboliser la table
	e.table_player=drawSprite(group3tris,game,"rect",w2,h2,w2,h2,0,black,.2) 
	e.table_opponent=drawSprite(group3tris,game,"rect",0,h2,w2,h2,0,black,.2) 

	//lignes à traits tirés pour symboliser la chute imminente
	var longeur_line=w/6
	e.line_player_droite=drawSprite(group7,game,"line",w/6*5,h2,longeur_line,w*.01,0,0,1)
	e.line_opponent_gauche=drawSprite(group6,game,"line",0,h2,longeur_line,w*.01,0,0,1)
	e.line_player_droite.alpha=0
	e.line_opponent_gauche.alpha=0

	//barre supérieure qui masque la chute du papier-- groupe différent pour que le texte et le papier soit recouvert 
	e.opponent_top=drawSprite(group1,game,"rect",0-decalage,0,w2,h*.15,0,red,1) 
	e.player_top=drawSprite(group2,game,"rect",w2+decalage,0,w2,h*.15,0,blue,1) 

	//textes du player et de l'opponent
	//taille you
	var taille=w*.07 
	//taille2 JOJO
	var taille2=w*.05 
	//taille3 LVL 1
	var taille3=w*.03 

	//texte symbolisant l'ombre sous le player et dont la visibilité apparait dans update via the Game.js
	//player
	e.text_name_player_shadow = game.add.bitmapText(w4*3+3,taille+3,'lucky','dev', taille) 
	e.text_name_player_shadow.alpha=.5
	e.text_name_player_shadow.visible=false
	e.text_name_player = game.add.bitmapText(w4*3,taille,'lucky','dev', taille) 
	e.text_level_player = game.add.bitmapText(w4*3,taille*1.9,'lucky','lvl ', taille2) 
	e.text_level_number_player=game.add.bitmapText(w4*3+30,taille*1.9,'lucky','1', taille2) 
	e.text_level_number_player.tint=jaune

	//OPPONENT 
	e.text_name_opponent = game.add.bitmapText(w4,taille,'lucky','kill the game', taille) 
	e.text_level_opponent = game.add.bitmapText(w4,taille*1.9,'lucky','lvl ', taille2) 
	e.text_level_number_opponent=game.add.bitmapText(w4+30,taille*1.9,'lucky','5', taille2) 
	e.text_level_number_opponent.tint=jaune

	//modifications des anchors
	e.text_name_player.anchor.x=.5
	e.text_name_player.anchor.y=.5
	e.text_name_player_shadow.anchor.x=.5
	e.text_name_player_shadow.anchor.y=.5
	e.text_level_player.anchor.x=.5
	e.text_level_player.anchor.y=.5
	e.text_level_number_player.anchor.x=.5
	e.text_level_number_player.anchor.y=.5
	e.text_name_opponent.anchor.x=.5
	e.text_name_opponent.anchor.y=.5
	e.text_level_opponent.anchor.x=.5
	e.text_level_opponent.anchor.y=.5
	e.text_level_number_opponent.anchor.x=.5
	e.text_level_number_opponent.anchor.y=.5

	//ajout des textes aux groupes
	group2.add(e.text_name_player) 
	group2.add(e.text_name_player_shadow) 
	group2.add(e.text_level_player) 
	group2.add(e.text_level_number_player) 

	group1.add(e.text_level_opponent) 
	group1.add(e.text_name_opponent) 
	group1.add(e.text_level_number_opponent) 

	//////////////////////////////////////////////////////////////////////////////////////////
	//TRANSITIONS
	//ligne à traits tirés apparaissant pour signifier le mileu de la table
	e.tween_line_opponent_appears=game.add.tween(e.line_opponent_gauche).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
	e.tween_line_player_appears=game.add.tween(e.line_player_droite).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
	e.tween_cursor_appears=game.add.tween(e.cursor_palpitant).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,3500)
	e.tween_cursor_appears_opponent=game.add.tween(e.cursor_palpitant_opponent).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,3500)
	e.cursor_palpitant_tween=game.add.tween(e.cursor_palpitant.scale).to({x:1.2, y:1.2},e.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,5500,-1,false)
	e.cursor_palpitant_tween_opponent=game.add.tween(e.cursor_palpitant_opponent.scale).to({x:1.2, y:1.2},e.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,5500,-1,false)
	//////////////////////////////////////////////////////////////////////////////////////////
	//animation du texte du joueur lorsqu'on maintient la pression appuyée
	e.panimTween=game.add.tween(e.text_name_player.scale).to({x:2, y:2},150,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
	e.panimTween_shadow=game.add.tween(e.text_name_player_shadow.scale).to({x:2.1, y:2.1},155,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
	return e
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

