import Utils from './Utils'
require('./LetoSandbox')

cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: cc.Label,
        icon: cc.Sprite,
        progressLabel: cc.Label,
        progressBar: cc.ProgressBar,
        _timerStarted: false,
        _installed: false
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

    onGameDownloadProgress: function(progress) {
        // 下载部分总体算75
        progress = Math.floor(progress * 0.75);
        cc.log(`onGameDownloadProgress: ${progress}`)
        this.progressLabel.string = `${progress}%`
        this.progressBar.progress = progress / 100.0
    },

    onGameDownloaded: function() {
        cc.log(`onGameDownloaded`) 
        let progress = 75
        this.progressLabel.string = `${progress}%`
        this.progressBar.progress = progress / 100.0

        // 启动一个计时器执行下载之后的假进度更新
        if(!this._timerStarted) {
            this.schedule(() => {
                let curProgress = this.progressBar.progress * 100
                let max = this._installed ? 100 : 90
                if(curProgress < max) {
                    curProgress++
                }
                curProgress = Math.floor(Math.min(max, curProgress))
                this.progressLabel.string = `${curProgress}%`
                this.progressBar.progress = curProgress / 100.0
            }, 0.5)
            this._timerStarted = true
        }
    },

    onGameInstalled: function() {
        cc.log(`onGameInstalled`) 
        let progress = 90
        this.progressLabel.string = `${progress}%`
        this.progressBar.progress = progress / 100.0
        this._installed = true
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
