var preload = function(game){}

preload.prototype = {
	preload: function(){ 

		//loadingBar
		var studio= this.add.sprite(w2,880,'studio')
		studio.anchor.setTo(.5,.5)
		var border_progress_bar= this.add.sprite(w2,1078,'border_progress_bar')
		border_progress_bar.anchor.x=.5
		var loadingBar = this.add.sprite(w2,h2,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar);

		//spritesheet
		this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
		this.game.load.spritesheet("iconpaper","assets/iconpaper.png",65,76,1);
		this.game.load.spritesheet("sprite_paper_gray","assets/paper_gray.png",210,210,8);
		this.game.load.spritesheet("sprite_paper","assets/paper.png",210,210,8);
		this.game.load.spritesheet("button_paper_select_sheet","assets/button_paper_select_sheet.png",100,107,24);
		this.game.load.spritesheet("paper_shadow_sheet","assets/paper_shadow_sheet.png",226,226,8);

		//script
		//this.game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js')

		//images
		this.game.load.image("little_circle_for_network","assets/little_circle_for_network.png");
		this.game.load.image("heart_menu_opponent","assets/heart_menu_opponent.png");
		this.game.load.image("menu","assets/menu.png");
		this.game.load.image("button_network_opponent","assets/button_network_opponent.png");
		this.game.load.image("heart_power","assets/heart_power.png");
		this.game.load.image("player","assets/player.png");
		this.game.load.image("opponent","assets/opponent.png");
		this.game.load.image("player_top","assets/player_top.png");
		this.game.load.image("opponent_top","assets/opponent_top.png");
		this.game.load.image("white","assets/white.png");
		this.game.load.image("heart","assets/heart.png");
		this.game.load.image("roll_turn_faster","assets/roll_turn_faster.png");
		this.game.load.image("repere","assets/repere.png");
		this.game.load.image("roll_paper_menu_select","assets/roll_paper_menu_select.png");
		this.game.load.image("game_title","assets/game_title.png");
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("line","assets/line.png");
		this.game.load.image("rank","assets/rank.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("higher","assets/higher.png");
		this.game.load.image("lower","assets/lower.png");
		this.game.load.image("panel_roll","assets/panel_roll.png");
		this.game.load.image("gameover","assets/gameover.png");
		this.game.load.image("timer_white","assets/timer_white.png");
		this.game.load.image("timer","assets/timer.png");
		this.game.load.image("circle","assets/circle.png");
		this.game.load.image("play_button","assets/play_button.png");
		this.game.load.image("menu_back","assets/menu_back.png");
		this.game.load.image("back","assets/back.png");
		this.game.load.image("particle_winner","assets/particle_winner.png");
		this.game.load.image("particle_player","assets/particle_player.png");
		this.game.load.image("particle_opponent","assets/particle_opponent.png");
		this.game.load.image("line_position","assets/line_position.png");
		this.game.load.image("division","assets/division.png");
		this.game.load.image("line_collision","assets/line_collision.png");
		this.game.load.image("paper","assets/paper.png");
		this.game.load.image("stripe","assets/stripe.png");
		this.game.load.image("rect","assets/rect.png");
		this.game.load.image("rect_invisible","assets/rect_invisible.png");
		this.game.load.image("roll","assets/roll.png");
		this.game.load.image("cursor_palpitant","assets/cursor_palpitant.png");
		this.game.load.image("roll_deroll","assets/roll_deroll.png");
		this.game.load.image("paper_h","assets/paper_h.png");
		this.game.load.image("roll_deroll","assets/roll_deroll.png");
		this.game.load.image("test_line","assets/test_line.png");
		this.game.load.image('spiral','assets/spiral.png');
		this.game.load.image('roll_turn','assets/roll_turn.png');
		this.game.load.image("papermania_heart","assets/papermania_heart.png");
		this.game.load.image("papermania","assets/papermania.png");

		//font bitmapFont
		this.game.load.bitmapFont('lucky_rose','fonts/font_rose.png', 'fonts/font_rose.fnt');
		this.game.load.bitmapFont('lucky_black_white','fonts/font_black_white.png', 'fonts/font_black_white.fnt');
		this.game.load.bitmapFont('lucky_red','fonts/font_red.png', 'fonts/font_red.fnt');
		this.game.load.bitmapFont('lucky_black','fonts/font_black.png', 'fonts/font_black.fnt');
		this.game.load.bitmapFont('lucky_grey','fonts/font_grey.png', 'fonts/font_grey.fnt');
		this.game.load.bitmapFont('lucky','fonts/font.png', 'fonts/font.fnt');
	},
	create: function(){
		this.game.state.start("GameTitle");
	}
}
