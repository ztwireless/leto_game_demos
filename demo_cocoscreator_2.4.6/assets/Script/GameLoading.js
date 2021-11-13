import Utils from './Utils'
require('./LetoSandbox')

cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: cc.Label,
        icon: cc.Sprite,
        progressLabel: cc.Label,
        progressBar: cc.ProgressBar 
    },

    start () {
        let game = Global.gameData.gameList[Global.launchGameIdx]
        this.nameLabel.string = game.name
        this.progressBar.progress = 0
        this.progressLabel.string = '0%'
        Utils.loadImgByUrl(this.icon, game.icon)
        if(!CC_PREVIEW) {
            LetoSandbox.launchGame(game, this)
        }
    },

    onGameStartLaunch: function() {
        cc.log(`onGameStartLaunch`)
    },

    onGameLaunchProgress: function(progress) {
        cc.log(`onGameLaunchProgress: ${progress}`)
        this.progressLabel.string = `${progress}%`
        this.progressBar.progress = progress / 100.0
    },

    onGameLaunchError: function(errMsg) {
        cc.log(`onGameLaunchError: ${errMsg}`)
        cc.director.loadScene("Home")
    },

    onGameLaunched: function() {
        cc.log(`onGameLaunched`)
        this.progressLabel.string = `100%`
        this.progressBar.progress = 1
        cc.director.loadScene("Home")
    }
});
