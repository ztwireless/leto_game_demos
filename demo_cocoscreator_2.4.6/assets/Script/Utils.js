function setImg(imgNode, spriteFrame) {
    cc.log(`set img spriteFrame`)
    imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
}

function loadImgByUrl(imgNode, remoteUrl, imageType) {
    if (!imageType) {
        imageType = "png";
    }
    cc.log(`load img: ${remoteUrl}`)
    cc.assetManager.loadRemote(remoteUrl, (err, texture) => {
        if (err) {
            cc.log(`failed to load img ${remoteUrl} with error: ${err}`)
            return;
        }
        setImg(imgNode, new cc.SpriteFrame(texture));
    });
}

function loadLocal(imgNode, absolutePath) {
    cc.resources.load(absolutePath, function (err, texture) {
        if (err) {
            return;
        }
        setImg(imgNode, new cc.SpriteFrame(texture));
    });
}

module.exports = {
    loadImgByUrl: loadImgByUrl,
    loadLocal: loadLocal,
    setImg: setImg,
}