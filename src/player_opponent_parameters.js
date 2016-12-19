var M = M || {}

//distinction entre nu et va
//number > =stock de la valeur
//value >  c'est cette valeur qui peut être changé en fonction des gains et pertes du joueur

/**
* @ parametres
* @ this.value_heart_player_during_operations
* @ this.valide_chooce > this.value_heart_player
*/


param = function(){
	//nombre de coeur
	this.value_heart_player=500
	this.value_heart_opponent=20
	this.value_heart_player_during_operations=this.value_heart_player
	this.value_heart_opponent_during_operations=this.value_heart_opponent
	//force des papiers//coupons
	this.value_paper_level=[]
	for (var i = 0; i < nu.paper; i++) {
		this.value_paper_level[i]=i*10	
		console.log("thispaper",this.value_paper_level[i]);
	}

	this.value_paper_level[0]=1

	//stock coeur
	this.number_heart_player=this.value_heart_player_during_operations
	this.number_heart_opponent=this.value_heart_opponent_during_operations

	//level du player

	this.level_number_opponent=Math.floor(this.number_heart_player/10)
	this.level_number_player=Math.floor(this.number_heart_player/10)

	//TODO:pourcentage pour le roll
	//pourcentage pour modifier épaisseur du roll
	//this.pourcentage_player=
	//this.pourcentage_opponent=
} 


M = M || {}


