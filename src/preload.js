var preload = function(game){}

preload.prototype = {
	preload: function(){ 

		var loadingBar = this.add.sprite(w2,h2,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
//////////////////////////////////////////////////////////////////////////////////////////
		this.load.setPreloadSprite(loadingBar);
//////////////////////////////////////////////////////////////////////////////////////////
		this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
		this.game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js')
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("line","assets/line.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("higher","assets/higher.png");
		this.game.load.image("lower","assets/lower.png");
		this.game.load.image("gameover","assets/gameover.png");
		this.game.load.image("timer_white","assets/timer_white.png");
		this.game.load.image("timer","assets/timer.png");
		this.game.load.image("play_button","assets/play_button.png");
		this.game.load.image("back","assets/back.svg");
		this.game.load.image("division","assets/division.png");
		this.game.load.image("paper","assets/paper.png");
		this.game.load.image("stripe","assets/stripe.png");
		this.game.load.image("rect","assets/rect.png");
		this.game.load.image("cursor_palpitant","assets/cursor_palpitant.png");

//////////////////////////////////////////////////////////////////////////////////////////
		this.game.load.spritesheet("iconpaper","assets/iconpaper.png",100,100,2);
		this.game.load.spritesheet("sprite_paper","assets/paper.png",100,100,8);
//////////////////////////////////////////////////////////////////////////////////////////
		this.game.load.bitmapFont('lucky_black','fonts/font_black.png', 'fonts/font_black.fnt');
		this.game.load.bitmapFont('lucky','fonts/font.png', 'fonts/font.fnt');
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}
