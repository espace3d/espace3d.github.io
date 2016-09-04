var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
		var backgroundGameTitle=drawSprite(0,this.game,"rect",0,0,w,h,0,blue,1)
		var playButton = this.game.add.button(w2,h2+100,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5)
		this.game.add.tween(playButton.scale).to({x:0.9, y:0.9},450,Phaser.Easing.Sinusoidal.In,true,0,-1,true)

		var textTitleGame = this.game.add.bitmapText(w2,h2,'lucky','papermania', w*.15) 
			pseudoAnchorX(textTitleGame)
			pseudoAnchorY(textTitleGame)
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}
