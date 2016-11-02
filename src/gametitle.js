var gameTitle = function(game){}

gameTitle.prototype = {
	create: function(){
		var backgroundGameTitle=drawSprite(0,this.game,"rect",0,0,w,h,0,blueG,1)
		//var backgroundGameTitle=game.add.sprite(0,0,"panel_roll")

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
			//fond qui cache le rouleau et fait croire au déroulement
			this.cache=game.add.sprite(-200,-10,"rect")
			this.cache.tint=blueG
			this.cache.width=w+400
			this.cache.height=120
			Group.add(this.cache) 

			//rouleau qui roule
			this.roll_deroll=game.add.sprite(-200,-10,"roll_deroll")
			Group.add(this.roll_deroll) 
			this.roll_tween=game.add.tween(this.roll_deroll).to({x:800},500,Phaser.Easing.Linear.None,true,delay_roll_deroll)
			this.roll_tween2=game.add.tween(this.cache).to({x:800},500,Phaser.Easing.Linear.None,true,delay_roll_deroll)
			Group.x=posx
			Group.y=posy
			Group.angle=angle
			return this
		}

		var roll_paper_deroll_group=game.add.group()
var roll_paper_deroll_group2=game.add.group()
		var roll_1 = new roll_paper_deroll(roll_paper_deroll_group,-30,h2-55,0,800)
		//var roll_2 = new roll_paper_deroll(roll_paper_deroll_group2,0,100,20,500)


			var play_button = this.game.add.button(w2,h2+120,"play",this.playTheGame,this);
			play_button.anchor.setTo(0.5,0.5)
			this.game.add.tween(play_button.scale).to({x:0.9, y:0.9},450,Phaser.Easing.Sinusoidal.In,true,0,-1,true)

			var rank_button = this.game.add.button(w2,h2+190,"rank",this.playTheGame,this);
			rank_button.anchor.setTo(0.5,0.5)
			//this.game.add.tween(rank_button.scale).to({x:0.9, y:0.9},450,Phaser.Easing.Sinusoidal.In,true,0,-1,true)

			//var textTitleGame = this.game.add.bitmapText(w2,h2,'lucky_black','papermania', w*.16) 
			var textTitleGame = this.game.add.sprite(w2,h2,'papermania') 
			pseudoAnchorX(textTitleGame)
			pseudoAnchorY(textTitleGame)
		},
			playTheGame: function(){
				this.game.state.start("TheGame");
			}
	}
