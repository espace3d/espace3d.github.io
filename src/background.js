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
		e.cursor_player_particle_flag=false
		e.cursor_player_particle = game.add.emitter(e.cursor_player.x, e.cursor_player.y, 200)
		e.cursor_player_particle.makeParticles("particle_player")
		e.cursor_player_particle.minParticleSpeed.setTo(-300,-300)
		e.cursor_player_particle.maxParticleSpeed.setTo(400,400)
		e.cursor_player_particle.setAlpha(0.5, 1)

		e.cursor_player_particle.minParticleScale = .05
		e.cursor_player_particle.maxParticleScale = .02
		e.cursor_player_particle.minRotation = 0
		e.cursor_player_particle.maxRotation = 0
		e.cursor_player_particle.on=true
		e.cursor_player_particle.start(false, 200, 15)
		//			e.cursor_player_particle_flag_function=function(){
		//e.cursor_player_particle_flag=true
		//}
		//game.time.events.add(200,e.cursor_player_particle_flag_function, this);
		return e.cursor_player_particle
	}

	e.cursor_player_particle_destroy=function(){
		e.cursor_player_particle.on=false
	}




		//à 0 pour ne pas le voir au début
		e.fond=drawSprite(group8,game,"back",0,0,w,h,0,0,1) 

		//épaisseur des bordures pour le menu avec les différents papiers
		var epaisseur_fond=25
		// decalage pour avoir une division marquée au centre et pour voir le background du menu en dessous
		var decalage=epaisseur_fond*.1	

		//différents fond pour le cadre constituant le menu de sélection des papiers
		e.border_player_gauche=drawSprite(group8,game,"rect",w2+decalage,0,epaisseur_fond,h,0,blue,1) 
		e.border_player_droit=drawSprite(group8,game,"rect",w-epaisseur_fond,0,epaisseur_fond,h,0,blue,1) 
		e.border_player_superieur=drawSprite(group8,game,"rect",w2+epaisseur_fond,0,w2,epaisseur_fond,0,blue,1) 
		e.border_player_inferieur=drawSprite(group8,game,"rect",w2+epaisseur_fond,h-epaisseur_fond,w2,epaisseur_fond,0,blue,1) 

		e.border_opponent_gauche=drawSprite(group8,game,"rect",0,0,epaisseur_fond,h,0,red,1) 
		e.border_opponent_droit=drawSprite(group8,game,"rect",w2-(epaisseur_fond+decalage),0,epaisseur_fond,h,0,red,1) 
		e.border_opponent_superieur=drawSprite(group8,game,"rect",0-epaisseur_fond,0,w2,epaisseur_fond,0,red,1) 
		e.border_opponent_inferieur=drawSprite(group8,game,"rect",0-epaisseur_fond,h-epaisseur_fond,w2,epaisseur_fond,0,red,1) 

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
		e.text_category__player_shadow = game.add.bitmapText(w4*3+3,taille+3,'lucky','jojo', taille) 
		e.text_category__player_shadow.alpha=.5
		e.text_category__player_shadow.visible=false
		e.text_category__player = game.add.bitmapText(w4*3,taille,'lucky','jojo', taille) 
		e.text_name_player = game.add.bitmapText(w4*3,taille*1.9,'lucky','lvl 1', taille2) 
		//e.text_level_player=game.add.bitmapText(w4*3,taille3,'lucky_black','lvl 1', taille3) 

		//OPPONENT 
		e.text_category__opponent = game.add.bitmapText(w4,taille,'lucky','kill the game', taille) 
		e.text_name_opponent = game.add.bitmapText(w4,taille*1.9,'lucky','lvl 4', taille2) 
		//e.text_level_opponent=game.add.bitmapText(w4,taille3,'lucky_black','lvl 4', taille3) 

		//modifications des anchors
		e.text_category__player.anchor.x=.5
		e.text_category__player.anchor.y=.5
		e.text_category__player_shadow.anchor.x=.5
		e.text_category__player_shadow.anchor.y=.5
		e.text_name_player.anchor.x=.5
		e.text_name_player.anchor.y=.5
		e.text_category__opponent.anchor.x=.5
		e.text_category__opponent.anchor.y=.5
		e.text_name_opponent.anchor.x=.5
		e.text_name_opponent.anchor.y=.5

		//ajout des textes aux groupes
		group2.add(e.text_category__player) 
		group2.add(e.text_category__player_shadow) 
		group2.add(e.text_name_player) 
		//group2.add(e.text_level_player) 

		group1.add(e.text_name_opponent) 
		group1.add(e.text_category__opponent) 


		//////////////////////////////////////////////////////////////////////////////////////////
		//transitions

		e.tween_line_opponent_appears=game.add.tween(e.line_opponent_gauche).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
		e.tween_line_player_appears=game.add.tween(e.line_player_droite).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
		e.tween_cursor_appears=game.add.tween(e.cursor_palpitant).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,3500)
		e.tween_cursor_appears_opponent=game.add.tween(e.cursor_palpitant_opponent).to({alpha:.6},1500,Phaser.Easing.Linear.None,true,3500)
		e.cursor_palpitant_tween=game.add.tween(e.cursor_palpitant.scale).to({x:1.2, y:1.2},e.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,5500,-1,false)
		e.cursor_palpitant_tween_opponent=game.add.tween(e.cursor_palpitant_opponent.scale).to({x:1.2, y:1.2},e.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,5500,-1,false)
		//////////////////////////////////////////////////////////////////////////////////////////
		//animation du texte du joueur lorsqu'on maintient la pression appuyée
		e.panimTween=game.add.tween(e.text_category__player.scale).to({x:2, y:2},150,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
		e.panimTween_shadow=game.add.tween(e.text_category__player_shadow.scale).to({x:2.1, y:2.1},155,Phaser.Easing.Sinusoidal.In,true,0,-1,true)

		return e
}

//////////////////////////////////////////////////////////////////////////////////////////
//DEPLACEMENT DE L'OMBRE DE LA TABLE POUR SYMBOLISER LA VUE QUI VA VERS LE HAUT
//obj1 est l'opponent
//obj2 est le player
//obj3 est le texte de l'opponent
//obj4 est le texte du player
// les times sont renseignés dans parameters
//attention que le délai s'exprime en plus que le délai du déplacement

displacement_background_shadow=function(obj1,obj2,obj3,obj4,game) {

	displacement(
			obj1,
			game,
			delaydisplacement=time_shadow_delay,
			timedisplacement=time_shadow_deplacement,
			xbegin=0,
			ybegin=h,
			delaydisplacement2=time_shadow_delay2,
			timedisplacement2=time_shadow_deplacement2,
			xend=0,
			yend=h2,
			nameEasing="Linear.None",
			nameEasing2="Linear.None") 

		displacement(
				obj2,
				game,
				delaydisplacement=time_shadow_delay,
				timedisplacement=time_shadow_deplacement,
				xbegin=w2,
				ybegin=h,
				delaydisplacement2=time_shadow_delay2,
				timedisplacement2=time_shadow_deplacement2,
				xend=w2,
				yend=h2,
				nameEasing="Linear.None",
				nameEasing2="Linear.None") 

		displacement(
				obj3,
				game,
				delaydisplacement=time_shadow_delay,
				timedisplacement=time_shadow_deplacement,
				xbegin=0,
				ybegin=h2,
				delaydisplacement2=time_shadow_delay2,
				timedisplacement2=time_shadow_deplacement2,
				xend=0,
				yend=0,
				nameEasing="Linear.None",
				nameEasing2="Linear.None") 
		displacement(
				obj4,
				game,
				delaydisplacement=time_shadow_delay,
				timedisplacement=time_shadow_deplacement,
				xbegin=0,
				ybegin=h2,
				delaydisplacement2=time_shadow_delay2,
				timedisplacement2=time_shadow_deplacement2,
				xend=0,
				yend=0,
				nameEasing="Linear.None",
				nameEasing2="Linear.None") 

		//modification de l'alpha pour symboliser la perspective
		shadealpha(
				obj1,
				game,
				delaydisplacement=time_shadow_delay,
				timedisplacement=time_shadow_deplacement,
				alphabegin=.8,
				delaydisplacement2=time_shadow_delay2,
				timedisplacement2=time_shadow_deplacement2,
				alphaend=.2,
				nameEasing="Linear.None",
				nameEasing2="Linear.None") 
		shadealpha(
				obj2,
				game,
				delaydisplacement=time_shadow_delay,
				timedisplacement=time_shadow_deplacement,
				alphabegin=.8,
				delaydisplacement2=time_shadow_delay2,
				timedisplacement2=time_shadow_deplacement2,
				alphaend=.2,
				nameEasing="Linear.None",
				nameEasing2="Linear.None") 

}

//////////////////////////////////////////////////////////////////////////////////////////
//DEPLACEMENT DES PANNEAUX DE BACKGROUND
displacement_background_opponent_and_player=function(obj1,obj2,game) {

	displacement(
			obj1,
			game,
			delaydisplacement=time_back_delay,
			timedisplacement=time_back_deplacement,
			xbegin=-w,
			ybegin=0,
			delaydisplacement2=time_back_delay2,
			timedisplacement2=time_back_deplacement2,
			xend=0,
			yend=0,
			nameEasing="Bounce.Out",
			nameEasing2="Elastic.Out") 

		displacement(
				obj2,
				game,
				delaydisplacement=time_back_delay,
				timedisplacement=time_back_deplacement,
				xbegin=w*2,
				ybegin=0,
				delaydisplacement2=time_back_delay2,
				timedisplacement2=time_back_deplacement2,
				xend=0,
				yend=0,
				nameEasing="Bounce.Out",
				nameEasing2="Elastic.Out") 
}

//////////////////////////////////////////////////////////////////////////////////////////
//DEPLACEMENT DES textes players et opponent
//se déplace en même temps que l'alpha qui symbolise la perspective qui remonte
displacement_text=function(obj1,obj2,game) {

	displacement(
			obj1,
			game,
			delaydisplacement=time_back_delay,
			timedisplacement=time_back_deplacement,
			xbegin=-w,
			ybegin=0,
			delaydisplacement2=time_back_delay2,
			timedisplacement2=time_back_deplacement2,
			xend=0,
			yend=0,
			nameEasing="Bounce.Out",
			nameEasing2="Elastic.Out") 

		displacement(
				obj2,
				game,
				delaydisplacement=time_back_delay,
				timedisplacement=time_back_deplacement,
				xbegin=w*2,
				ybegin=0,
				delaydisplacement2=time_back_delay2,
				timedisplacement2=time_back_deplacement2,
				xend=0,
				yend=0,
				nameEasing="Linear.None",
				nameEasing2="Linear.None") 
}

