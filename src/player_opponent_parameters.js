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
	this.number_heart_opponent=[1000,200,9000]
	//nombre de coeur
	this.value_heart_player=40
	this.value_heart_opponent=20
	this.value_heart_player_during_operations=this.value_heart_player
	this.value_heart_opponent_during_operations=this.value_heart_opponent

	//force des papiers//coupons
	this.value_paper_level=[]
	for (var i = 0; i < nu.paper; i++) {
		this.value_paper_level[i]=i*10	
	}

	this.value_paper_level[0]=1

	//stock coeur
	this.number_heart_player=this.value_heart_player_during_operations
	this.number_heart_opponent_chooce=100

	//level du player

	this.level_number_opponent=Math.floor(this.number_heart_player/10)
	this.level_number_player=Math.floor(this.number_heart_player/10)

	//TODO:pourcentage pour le roll
	//pourcentage pour modifier épaisseur du roll
	//this.pourcentage_player=
	//this.pourcentage_opponent=
	this.number_of_opponent=3
	this.name_opponent=["Albert","Luc","Gerard","Rkill","killthegame","No225","unreal"]
	this.cost_opponent=[500,100,50]
	//pour indiquer quelle est le meilleur papier à disposition de l'opponent
	this.best_opponent=[1,5,7]
	this.lvl_opponent=[1,2,9]
} 


M = M || {}


