require('./LetoSandbox')

cc.Class({
    extends: cc.Component,
    properties: {
        _initTime: 0
    },

    // use this for initialization
    onLoad: function () {
        this._initTime = Date.now()
        if(CC_PREVIEW) {
            this.scheduleOnce(() => {
                cc.director.loadScene("Home")
            }, 2)
        } else {
            LetoSandbox.waitSandbox(this)
        }
    },

    // called every frame
    update: function (dt) {

    },

    onSandboxInitDone() {
        LetoSandbox.loadGameList(this)
    },

    onSandboxInitFailed() {

    },

    onGameListLoaded(data) {
        Global.gameData = data
        let cost = Date.now() - this._initTime
        if(cost < 2000) {
            this.scheduleOnce(() => {
                cc.director.loadScene("Home")
            }, (2000 - cost) / 1000.0)
        } else {
            cc.director.loadScene("Home")
        }
    },

    onGameListLoadFailed() {

    }
});
