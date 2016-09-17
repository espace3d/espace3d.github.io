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
    		function displacement_position (game,obj,xx,yy,delay,time,Ease){
				game.add.tween(obj.position).to({x:xx, y:yy},time,Phaser.Easing.Ease,true,delay)

		}


		//function displacement_position (game,obj,xx,yy,time,Ease){
				//game.add.tween(obj.position).to({x:xx, y:yy},time,Phaser.Easing.Ease,true)

		//}

		function displacement_alpha (game,obj,aa,delay,time,Ease){
				game.add.tween(obj).to({alpha:aa},time,Phaser.Easing.Ease,false,delay,true)

		}

		function displacement_scale (game,obj,xs,ys,delay,time,Ease){
				game.add.tween(obj.scale).to({x:xs,y:ys},time,Phaser.Easing.Ease,false,delay,true)
		}



