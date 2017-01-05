//rouleau de papiers qui se déroule
var roll_paper_deroll = function(Group,posx,posy,angle,delay_roll_deroll) {
	this.paper=[] 
	for (var j = 0; j < nu.paper; j++) {
		this.paper[j] = [] 
		for (var i = 0; i < 1; i++) {
			this.paper[j][i] = game.add.sprite(0,0,"paper_h")
			this.paper[j][i].alpha=1
			this.paper[j][i].x = j*dim.paper
			this.paper[j][i].y = 0 
			// ajout des childs au parent 
			Group.add(this.paper[j][i]) 
		} 
	} 

	//			//fond qui cache le rouleau et fait croire au déroulement
	//			this.cache=game.add.sprite(-200,-10,"rect")
	//			this.cache.tint=blueG
	//			this.cache.width=w+800
	//			this.cache.height=240
	//			Group.add(this.cache) 
	//
	//			//rouleau qui roule
	//			this.roll_deroll=game.add.sprite(-200,-10,"roll_deroll")
	//			Group.add(this.roll_deroll) 
	//			this.roll_tween=game.add.tween(this.roll_deroll).to({x:w+200},500,Phaser.Easing.Linear.None,true,delay_roll_deroll)
	//			this.roll_tween2=game.add.tween(this.cache).to({x:w+200},500,Phaser.Easing.Linear.None,true,delay_roll_deroll)
	//			Group.x=posx
	//			Group.y=posy
	//			Group.angle=angle
	//			return this
}

first_screen = function(game){
	//heart
	Phaser.Sprite.call(this,game,w*.7695313,h*.432,'papermania_heart')
	this.angle=-10
	this.anchor.y=.5
	//this.tween=game.add.tween(this.scale).to({x:1.2,y:1.2},900,Phaser.Easing.Linear.None,true,0,-1)
	//this.tween.yoyo(1000,true)
	//papermania
	this.logo=game.add.sprite(w*.0578125,h2,'papermania')
	this.logo.anchor.setTo(0,.5)
	this.logo.height=h*.1911458
	this.flag=true
	this.num=0
	this.play_button = this.game.add.button(w2,h2+145,"play",this.playTheGame,this);
	this.tween_easing=[Phaser.Easing.Linear.None,Phaser.Easing.Back.In,Phaser.Easing.Back.Out,Phaser.Easing.Back.InOut,Phaser.Easing.Bounce.In,Phaser.Easing.Bounce.Out,Phaser.Easing.Bounce.InOut,Phaser.Easing.Circular.In,Phaser.Easing.Circular.Out,Phaser.Easing.Circular.InOut,Phaser.Easing.Cubic.In,Phaser.Easing.Cubic.Out,Phaser.Easing.Cubic.InOut,Phaser.Easing.Elastic.In,Phaser.Easing.Elastic.Out,Phaser.Easing.Elastic.InOut,Phaser.Easing.Exponential.In,Phaser.Easing.Exponential.Out,Phaser.Easing.Exponential.InOut,Phaser.Easing.Linear.In,Phaser.Easing.Quadratic.In,Phaser.Easing.Quadratic.Out,Phaser.Easing.Quadratic.InOut,Phaser.Easing.Quartic.In,Phaser.Easing.Quartic.Out,Phaser.Easing.Quartic.InOut,Phaser.Easing.Quintic.In,Phaser.Easing.Quintic.Out,Phaser.Easing.Quintic.InOut,Phaser.Easing.Sinusoidal.In,Phaser.Easing.Sinusoidal.Out]


	this.play_button.anchor.setTo(0.5,0.5)
	this.speed=1000

	this.rank_button = this.game.add.button(w2,h2+255,"rank",this.playTheGame,this);
	this.rank_button.anchor.setTo(0.5,0.5)
	//this.game.add.tween(this.rank_button.scale).to({x:0.9, y:0.9},450,Phaser.Easing.Sinusoidal.In,true,0,-1,true)


	//pseudoAnchorX(textTitleGame)
	//pseudoAnchorY(textTitleGame)
}

first_screen.prototype = Object.create(Phaser.Sprite.prototype)
first_screen.prototype.constructor = first_screen

first_screen.prototype.playTheGame=function(){
	if (this.flag) {
		this.flag=false
		this.game.state.start("TheGame");

	}
}
first_screen.prototype.activate_tween = function() {
	this.scale.setTo(1,1)
	this.angle=-5

	this.tween=game.add.tween(this).to({angle:5},this.speed,this.tween_easing[this.num],true,0,-1)
	//this.tween=game.add.tween(this.scale).to({x:1.2, y:1.2},this.speed,this.tween_easing[this.num],true,0,-1)
	this.tween.yoyo(this.speed,true)
	//this.game.add.tween(this.play_button.scale).to({x:1.2, y:1.2},this.speed,Phaser.Easing.Sinusoidal.In,true,0,-1)

}

// dat gui
gameTitle = function(game){
	fizzy=null
	gui=null
}

gameTitle.prototype = {
	create: function(){
		fizzy=new first_screen(game)
		this.add.existing(fizzy)
		//gui=new dat.GUI()
		//gui.add(fizzy, 'speed')
		//gui.add(fizzy,'num', {LinearNone:0,BackIn:1,BackOut:2,BackInOut:3,BounceIn:3,BounceOut:4,BounceInOut:5,CircularIn:6,CircularOut:7,CircularInOut:8,CubicIn:9,CubicOut:10,CubicInOut:11,ElasticIn:12,ElasticOut:13,ElasticInOut:14,ExponentialIn:15,ExponentialOut:16,ExponentialInOut:17,LinearIn:18,QuadraticIn:19,QuadraticOut:20,QuadraticInOut:21,QuarticIn:22,QuarticOutr:23,QuarticInOut:24,QuinticIn:25,QuinticOut:26,QuinticInOut:27,SinusoidalIn:28,SinusoidalOut:29})
		//gui.add(fizzy, 'activate_tween')
	}
}



