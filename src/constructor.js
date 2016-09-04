//////////////////////////////////////////////////////////////////////////////////////////
//pour dessiner un sprite
drawSprite = function (Group,game,nameA,posx,posy,width,height,anchor,color,alpha) {

	var e=game.add.sprite(posx,posy,nameA)
	e.x=posx;
	e.y=posy;
	e.width=width;
	e.height=height;
	e.anchor.set(anchor);
	if (color==0) {
	} else {
	e.tint=color
	}
	e.alpha=alpha;;
	//laisse la possibilité d'ajouter ou non un groupe
	if (Group==0) {
	} else {
	Group.add(e);
	}
	return e
}

//////////////////////////////////////////////////////////////////////////////////////////
//functions utiles
function pseudoAnchorX(obj) {
obj.position.x=obj.position.x-obj.width/2
}	
function pseudoAnchorY(obj) {
obj.position.y=obj.position.y-obj.height/2
}

//////////////////////////////////////////////////////////////////////////////////////////
//function pour afficher le temps passé
function time_elapsed(game){
game.debug.text(game.time.totalElapsedSeconds(), w-100,h-100);
}


//////////////////////////////////////////////////////////////////////////////////////////
//TRANSITIONS
//////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////
//faire varier l'alpha
function shadealpha(
		obj,
		game,
		delaydisplacement=delay_displacement,
		timedisplacement=time_displacement,
		alphabegin=alpha_begin,
		delaydisplacement2=delay_displacement2,
		timedisplacement2=time_displacement2,
		alphaend=alpha_end,
		nameEasing=name_Easing,
		nameEasing2=name_Easing2) {

	//première transition
	game.add.tween(obj).to({alpha:alphabegin},timedisplacement,Phaser.Easing.nameEasing,true,delaydisplacement);

	//function pour le déplacement du retour
	function displacement_back(){
		game.add.tween(obj).to({alpha:alphaend},timedisplacement2,Phaser.Easing.nameEasing2,true,3);
	}
	//on calcule le délai automatique pour la deuxième transition en additionant les temps
	//comme via la function Phaser.timer.SECOND je ne sais pas comment mettre en milliseconds
	//je fais la conversion moi même
	var delaydisplacement3=timedisplacement/1000+delaydisplacement/1000+delaydisplacement2/1000

	//sert de delay pour la deuxième transition  
	game.time.events.add(Phaser.Timer.SECOND * delaydisplacement3, displacement_back, this);
}

//////////////////////////////////////////////////////////////////////////////////////////
//deplacement général
function displacement(
		obj,
		game,
		delaydisplacement=delay_displacement,
		timedisplacement=time_displacement,
		xbegin=x_begin,
		ybegin=y_begin,
		delaydisplacement2=delay_displacement2,
		timedisplacement2=time_displacement2,
		xend=x_end,
		yend=y_end,
		nameEasing=name_Easing,
		nameEasing2=name_Easing2) {

	//première transition
	game.add.tween(obj.position).to({x:xbegin,y:ybegin},timedisplacement,Phaser.Easing.nameEasing,true,delaydisplacement);

	//function pour le déplacement du retour
	function displacement_back(){
		game.add.tween(obj.position).to({x:xend,y:yend},timedisplacement2,Phaser.Easing.nameEasing2,true,3);
	}
	//on calcule le délai automatique pour la deuxième transition en additionant les temps
	//comme via la function Phaser.timer.SECOND je ne sais pas comment mettre en milliseconds
	//je fais la conversion moi même
	var delaydisplacement3=timedisplacement/1000+delaydisplacement/1000+delaydisplacement2/1000

	//sert de delay pour la deuxième transition  
	game.time.events.add(Phaser.Timer.SECOND * delaydisplacement3, displacement_back, this);
}

//////////////////////////////////////////////////////////////////////////////////////////
//transition scale
function displacement_scale(
		obj,
		game,
		delaydisplacement=delay_displacement,
		timedisplacement=time_displacement,
		xbegin=x_begin,
		ybegin=y_begin,
		delaydisplacement2=delay_displacement2,
		timedisplacement2=time_displacement2,
		xend=x_end,
		yend=y_end,
		nameEasing=name_Easing,
		nameEasing2=name_Easing2) {

	//première transition
	game.add.tween(obj.scale).to({x:x_begin,y:y_begin},timedisplacement,Phaser.Easing.nameEasing,true,0,delaydisplacement,true);

	//function pour le déplacement du retour
	function displacement_back(){
		game.add.tween(obj.scale).to({x:x_end,y:y_end},timedisplacement2,Phaser.Easing.nameEasing2,true,0,1000,true);
	}
	//on calcule le délai automatique pour la deuxième transition en additionant les temps
	//comme via la function Phaser.timer.SECOND je ne sais pas comment mettre en milliseconds
	//je fais la conversion moi même
	var delaydisplacement3=timedisplacement/1000+delaydisplacement/1000+delaydisplacement2/1000

	//sert de delay pour la deuxième transition  
	game.time.events.add(Phaser.Timer.SECOND * delaydisplacement3, displacement_back, this);
}
//////////////////////////////////////////////////////////////////////////////////////////
//effet pour secouer le texte du player ou de l'opponent lorsque l'on maintient le boutton appuyé > tremblement de terre 


//function shakeText(obj,game){
//	var shake=100 
//	var position_text={
//	
//	}
//	
//						//obj.position.x=obj.position.x+game.rnd.between(-shake,shake)
//
//						obj.scale.setTo(game.rnd.between(-shake,shake))
//}

