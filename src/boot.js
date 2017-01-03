var boot = function(game){
	console.log("%cStarting PaperMania game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
		this.stage.backgroundColor = "#3b2c27"
		// pour uniquement préchargé les icones et la bordures
		// la loading bar sera chargée dans Preload
		this.load.image('border_progress_bar','assets/border_progress_bar.png')
		this.load.image('studio','assets/studio.png')
		this.load.image("loading","assets/loading.png"); 
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
		this.scale.pageAlignHorizontally = true
		this.scale.pageAlignVertically = true
		this.scale.refresh()
		this.state.start("Preload");
	}
}
