//////////////////////////////////////////////////////////////////////////////////////////
//background.js
//e for background
//////////////////////////////////////////////////////////////////////////////////////////
//dessins de tous les éléments du décor

function drawBackground(game,group8,group7,group6,group2,group1) {
	var e=[]

		//decalage pour avoir une division marquée au centre et pour voir le background du menu en dessous
		var epaisseur_fond=10
		var decalage=epaisseur_fond*.5	
		//////////////////////////////////////////////////////////////////////////////////////////
		//barre supérieure qui masque la chute du papier-- groupe différent pour que le texte et le papier soit recouvert 

		e.opponent_top=drawSprite(group1,game,"rect",0-decalage,0,w2,h*.15,0,red,1) 
		e.player_top=drawSprite(group2,game,"rect",w2+decalage,0,w2,h*.15,0,blue,1) 

		//textes du player et de l'opponent
		//taille you
		var taille=w*.07 
		//taille2 JOJO
		var taille2=w*.05 
		//////////////////////////////////////////////////////////////////////////////////////////
		//texte symbolisant l'ombre sous le player et dont la visibilité apparait dans update via the Game.js
		e.p_shadow = game.add.bitmapText(w4*3+3,taille+3,'lucky','YOU', taille) 
		e.p_shadow.alpha=.5
		e.p_shadow.visible=false

		e.p = game.add.bitmapText(w4*3,taille,'lucky','YOU', taille) 
		e.player = game.add.bitmapText(w4*3,taille*1.9,'lucky','JOJO', taille2) 
		e.op = game.add.bitmapText(w4,taille,'lucky','OPPONENT', taille) 
		e.opponent = game.add.bitmapText(w4,taille*1.9,'lucky','kill the game', taille2) 
		e.hold=game.add.bitmapText(w4*3,h2-100,'lucky_black','hold', taille2) 
		e.hold.alpha=0
		//modifications des anchors
		e.p.anchor.x=.5
		e.p.anchor.y=.5
		e.p_shadow.anchor.x=.5
		e.p_shadow.anchor.y=.5
		e.player.anchor.x=.5
		e.player.anchor.y=.5
		e.op.anchor.x=.5
		e.op.anchor.y=.5
		e.opponent.anchor.x=.5
		e.opponent.anchor.y=.5
		e.hold.anchor.x=.5
		e.hold.anchor.y=.5

		//ajout des textes aux groupes
		group2.add(e.p) 
		group2.add(e.player) 
		group2.add(e.hold) 
		group1.add(e.op) 
		group1.add(e.opponent) 


		e.cursor_player=drawSprite(group1,game,"rect",w4*3,h2,w2,w*.1,0.5,white,.2)
		//////////////////////////////////////////////////////////////////////////////////////////
		e.cursor_palpitant=drawSprite(group1,game,"cursor_palpitant",w4*3,h2,w*.05,w*.05,0.5,0,.4)
		e.cursor_palpitant.alpha=0
		e.cursor_palpitant_time=150
		e.cursor_palpitant_tween=game.add.tween(e.cursor_palpitant.scale).to({x:1.2, y:1.2},e.cursor_palpitant_time,Phaser.Easing.Sinusoidal.In,true,5500,-1,false)
		//e.cursor_palpitant_tween.onComplete.addOnce(tween2, this)

		function tween2() {
			e.cursor_palpitant_time=e.cursor_palpitant_time-10
				e.cursor_palpitant_tween
		}

	//////////////////////////////////////////////////////////////////////////////////////////
	//ombre sur le papier-player
	e.shadowPaperPlayer = drawSprite(group1,game,"rect",w4*3,h2,dim.paper,h2,0.5,black,.2)
		//à 0 pour ne pas le voir au début
		e.shadowPaperPlayer.height=0
		e.shadowPaperPlayer.anchor.y=0

		//ombre sur le papier-opponent
		e.shadowPaperOpponent = drawSprite(group1,game,"rect",w4,h2,dim.paper,h2,0.5,black,.2)
		//à 0 pour ne pas le voir au début
		e.shadowPaperOpponent.height=0
		e.shadowPaperOpponent.anchor.y=0

		//////////////////////////////////////////////////////////////////////////////////////////
		//animation du texte du joueur lorsqu'on maintient la pression appuyée

		e.panimTween=game.add.tween(e.p.scale).to({x:2, y:2},150,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
		e.panimTween_shadow=game.add.tween(e.p_shadow.scale).to({x:2.1, y:2.1},155,Phaser.Easing.Sinusoidal.In,true,0,-1,true)

		e.opanim=function() {
			if (e.op.flag) {	
				game.add.tween(e.op.scale).to({x:2, y:2},150,Phaser.Easing.Sinusoidal.In,true,0,-1,true)
			}	
		}


		e.fond=drawSprite(group8,game,"back",0,0,w,h,0,0,1) 

		//différents fond pour le cadre constituant le menu de sélection des papiers
		// barre player milieu
		e.fond1=drawSprite(group8,game,"rect",w2+decalage,0,epaisseur_fond,h,0,blue,1) 

		e.fond2=drawSprite(group8,game,"rect",w-epaisseur_fond,0,epaisseur_fond,h,0,blue,1) 
		e.fond3=drawSprite(group8,game,"rect",w2+epaisseur_fond,0,w2,epaisseur_fond,0,blue,1) 
		e.fond4=drawSprite(group8,game,"rect",w2+epaisseur_fond,h-epaisseur_fond,w2,epaisseur_fond,0,blue,1) 

		e.fond5=drawSprite(group8,game,"rect",0,0,epaisseur_fond,h,0,red,1) 
		//barre opponent milieu
		e.fond6=drawSprite(group8,game,"rect",w2-epaisseur_fond,0,epaisseur_fond,h,0,red,1) 

		e.fond7=drawSprite(group8,game,"rect",0-epaisseur_fond,0,w2,epaisseur_fond,0,red,1) 
		e.fond8=drawSprite(group8,game,"rect",0-epaisseur_fond,h-epaisseur_fond,w2,epaisseur_fond,0,red,1) 

		//background de l'opponent et du player
		e.opponent=drawSprite(group6,game,"rect",0-epaisseur_fond,0,w2,h,0,red,1) 
		e.player=drawSprite(group7,game,"rect",w2+epaisseur_fond,0,w2,h,0,blue,1) 
		e.player.inputEnabled=true

		//ombre pour symbolier la table
		e.table_player=drawSprite(group7,game,"rect",w2,h2,w2,h2,0,black,.2) 
		e.table_opponent=drawSprite(group6,game,"rect",0,h2,w2,h2,0,black,.2) 

		//////////////////////////////////////////////////////////////////////////////////////////
		//lignes à traits tirés pour symboliser la chute imminente
		var longeur_line=w/6
		e.line_player_droite=drawSprite(group7,game,"line",w/6*5,h2-50,longeur_line,w*.01,0,0,1)
		e.line_opponent_gauche=drawSprite(group6,game,"line",0,h2-50,longeur_line,w*.01,0,0,1)
		e.line_player_droite.alpha=0
		e.line_opponent_gauche.alpha=0
		//delay pour que les lignes apparaissent
		//game.add.tween(obj.position).to({x:xend,y:yend},timedisplacement2,Phaser.Easing.nameEasing2,true,3);
		//game.add.tween(obj).to({alpha:alphabegin},timedisplacement,Phaser.Easing.nameEasing,true,delaydisplacement);

		e.tween_line_opponent_appears=game.add.tween(e.line_opponent_gauche).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
		e.tween_line_player_appears=game.add.tween(e.line_player_droite).to({alpha:1},500,Phaser.Easing.Linear.None,true,3500)
		e.tween_cursor_appears=game.add.tween(e.cursor_palpitant).to({alpha:.4},500,Phaser.Easing.Linear.None,true,3500)
		e.tween_hold_appears=game.add.tween(e.hold).to({alpha:1},1500,Phaser.Easing.Linear.None,true,4500)
		e.tween_hold_scale=game.add.tween(e.hold.scale).to({x:2,y:2},500,Phaser.Easing.Linear.None,true,4500,-1,true);


		//game.time.events.add(Phaser.Timer.SECOND * 4, function() {e.line_player_droite.visible=true;e.line_opponent_gauche.visible=true;e.cursor_palpitant.visible=true}, this);
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
				nameEasing="Linear.None",
				nameEasing2="Linear.None") 
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

