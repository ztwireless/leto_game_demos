import Utils from './Utils'

cc.Class({
    extends: cc.Component,

    properties: {
        gameName1: cc.Label,
        gameName2: cc.Label,
        gameName3: cc.Label,
        gameName4: cc.Label,
        hot1: cc.Node,
        hot2: cc.Node,
        hot3: cc.Node,
        hot4: cc.Node,
        gamePic1: cc.Node,
        gamePic2: cc.Node,
        gamePic3: cc.Node,
        gamePic4: cc.Node,
        _hotArr: Array,
        _nameArr: Array,
        _picArr: Array
    },

    onLoad() {
        this._hotArr = [
            this.hot1, 
            this.hot2, 
            this.hot3, 
            this.hot4
        ]
        this._nameArr = [
            this.gameName1, 
            this.gameName2, 
            this.gameName3, 
            this.gameName4
        ]
        this._picArr = [
            this.gamePic1,
            this.gamePic2,
            this.gamePic3,
            this.gamePic4
        ]
    },

    start() {
        for(let i in Global.gameData.gameList) {
            this._hotArr[i].active = Number(Global.gameData.gameList[i].is_hot) == 1
            this._nameArr[i].string = Global.gameData.gameList[i].name
            Utils.loadImgByUrl(this._picArr[i], Global.gameData.gameList[i].pic)
        }
    },

    onGameClicked(pic, data) {
        Global.launchGameIdx = data
        cc.director.loadScene("GameLoading")
    }
});
