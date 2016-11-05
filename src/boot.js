var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
		this.game.load.image("loading","assets/loading.png"); 
	
	},
  	create: function(){
		//maintain aspect ratio
		//this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		//strech to screen
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		//this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.setShowAll();
		this.scale.refresh()
		this.state.start("Preload");
	}
}
