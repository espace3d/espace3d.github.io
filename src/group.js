var G = G || {}
//////////////////////////////////////////////////////////////////////////////////////////
//GROUP
this.groupnull = null
//0 timerGroup0 - timer deplacé dans ce groupe car il doit être devant tout le monde le groupe 3 doit être supprimé
//1. topOpponentGroup1 --  bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> opponent
//2. topPlayerGroup2 -- bandeau horizontal supérieur + nom du joueur + dénomination (player ou opponent)--> player
//3. timerGroup3 -- timer + rond  
//3bis. cursorGroup3bis -- curseur en forme de rectangle	
//3tris. shadowGroup3tris
//4. opponentPapers4 -- papiers de l'opponent
//5. playerPapers5 -- papiers du player
//6. opponentBackgroundGroup6 -- background sur une moitié pour l'opponent
//7. playerBackgroundGroup7 -- background sur une moitié pour le player
//8. menuPaperGroup8 -- menu derrière les 2 background + bords périphériques colorés du menus 
//9. shadowPaperGroup9 -- ombre sur le papier pour symboliser bord

this.shadowPaperGroup9 = this.game.add.group()
this.menuPaperGroup8 = this.game.add.group()
this.playerBackgroundGroup7 = this.game.add.group()
this.opponentBackgroundGroup6 = this.game.add.group()
this.playerPapers5 = this.game.add.group()
this.opponentPapers4 = this.game.add.group()
this.shadowGroup3tris = this.game.add.group()
this.cursorGroup3bis=this.game.add.group()
this.timerGroup3 = this.game.add.group()
this.topPlayerGroup2=this.game.add.group()
this.topOpponentGroup1=this.game.add.group()
this.timerGroup0=this.game.add.group()

G = G || {}
