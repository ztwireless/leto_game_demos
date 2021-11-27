window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  GameLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7de99qoaFGD4Gm+1PM98II", "GameLoading");
    "use strict";
    var _Utils = _interopRequireDefault(require("./Utils"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    require("./LetoSandbox");
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
      start: function start() {
        var game = Global.gameData.gameList[Global.launchGameIdx];
        this.nameLabel.string = game.name;
        this.progressBar.progress = 0;
        this.progressLabel.string = "0%";
        _Utils["default"].loadImgByUrl(this.icon, game.icon);
        true;
        LetoSandbox.launchGame(game, this);
      },
      onGameStartLaunch: function onGameStartLaunch() {
        cc.log("onGameStartLaunch");
      },
      onGameDownloadProgress: function onGameDownloadProgress(progress) {
        progress = Math.floor(.75 * progress);
        cc.log("onGameDownloadProgress: " + progress);
        this.progressLabel.string = progress + "%";
        this.progressBar.progress = progress / 100;
      },
      onGameDownloaded: function onGameDownloaded() {
        var _this = this;
        cc.log("onGameDownloaded");
        var progress = 75;
        this.progressLabel.string = progress + "%";
        this.progressBar.progress = progress / 100;
        if (!this._timerStarted) {
          this.schedule(function() {
            var curProgress = 100 * _this.progressBar.progress;
            var max = _this._installed ? 100 : 90;
            curProgress < max && curProgress++;
            curProgress = Math.floor(Math.min(max, curProgress));
            _this.progressLabel.string = curProgress + "%";
            _this.progressBar.progress = curProgress / 100;
          }, .5);
          this._timerStarted = true;
        }
      },
      onGameInstalled: function onGameInstalled() {
        cc.log("onGameInstalled");
        var progress = 90;
        this.progressLabel.string = progress + "%";
        this.progressBar.progress = progress / 100;
        this._installed = true;
      },
      onGameLaunchError: function onGameLaunchError(errMsg) {
        cc.log("onGameLaunchError: " + errMsg);
        cc.director.loadScene("Home");
      },
      onGameLaunched: function onGameLaunched() {
        cc.log("onGameLaunched");
        this.progressLabel.string = "100%";
        this.progressBar.progress = 1;
        cc.director.loadScene("Home");
      }
    });
    cc._RF.pop();
  }, {
    "./LetoSandbox": "LetoSandbox",
    "./Utils": "Utils"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bea3bhfxVNJmr3914hdGFj7", "Global");
    "use strict";
    var fakeData = {
      id: "11111111",
      name: "fake",
      gameList: []
    };
    window.Global = {
      gameData: fakeData,
      GAME_SIZE: 4,
      launchGameIdx: 0
    };
    cc._RF.pop();
  }, {} ],
  Home: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a3eaiCQaVJj55BaV+01Xpl", "Home");
    "use strict";
    var _Utils = _interopRequireDefault(require("./Utils"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
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
      onLoad: function onLoad() {
        this._hotArr = [ this.hot1, this.hot2, this.hot3, this.hot4 ];
        this._nameArr = [ this.gameName1, this.gameName2, this.gameName3, this.gameName4 ];
        this._picArr = [ this.gamePic1, this.gamePic2, this.gamePic3, this.gamePic4 ];
      },
      start: function start() {
        for (var i = 0; i < Global.GAME_SIZE; i++) {
          this._hotArr[i].active = 1 == Number(Global.gameData.gameList[i].is_hot);
          this._nameArr[i].string = Global.gameData.gameList[i].name;
          _Utils["default"].loadImgByUrl(this._picArr[i], Global.gameData.gameList[i].pic);
        }
      },
      onGameClicked: function onGameClicked(pic, data) {
        Global.launchGameIdx = data;
        cc.director.loadScene("GameLoading");
      }
    });
    cc._RF.pop();
  }, {
    "./Utils": "Utils"
  } ],
  LetoSandbox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c6782GqqZtEeLjIh92lvlLj", "LetoSandbox");
    "use strict";
    (function() {
      var layaClassCache = {};
      var loadLayaClass = function loadLayaClass(klass) {
        layaClassCache[klass] || (layaClassCache[klass] = window.PlatformClass.createClass(klass));
        return layaClassCache[klass];
      };
      var callJavaStaticMethod = function callJavaStaticMethod(klass, method, sig) {
        var args = Array.prototype.slice.call(arguments, 3);
        if ("undefined" !== typeof jsb) {
          var _jsb$reflection;
          return (_jsb$reflection = jsb.reflection).callStaticMethod.apply(_jsb$reflection, [ klass, method, sig ].concat(args));
        }
        if ("undefined" !== typeof window.PlatformClass) {
          var _javaClass;
          klass = klass.replace(/\//g, ".");
          javaClass = loadLayaClass(klass);
          return (_javaClass = javaClass).call.apply(_javaClass, [ method ].concat(args));
        }
      };
      var CALLBACK_SANDBOX_INIT_DONE = "SandboxInitDone";
      var CALLBACK_SANDBOX_INIT_FAILED = "SandboxInitFailed";
      var CALLBACK_GAME_LIST_LOADED = "GameListLoaded";
      var CALLBACK_GAME_LIST_LOAD_FAILED = "GameListLoadFailed";
      var CALLBACK_GAME_START_LAUNCH = "GameStartLaunch";
      var CALLBACK_GAME_DOWNLOAD_PROGRESS = "GameDownloadProgress";
      var CALLBACK_GAME_DOWNLOADED = "GameDownloaded";
      var CALLBACK_GAME_INSTALLED = "GameInstalled";
      var CALLBACK_GAME_LAUNCH_ERROR = "GameLaunchError";
      var CALLBACK_GAME_LAUNCHED = "GameLaunched";
      var classJavaName = "com/leto/game/js/LTGameJSBridge";
      var LetoSandbox = {
        InitListener: {
          developerCallback: null,
          onSandboxInitDone: function onSandboxInitDone() {
            this.developerCallback && this.developerCallback.onSandboxInitDone && this.developerCallback.onSandboxInitDone();
          },
          onSandboxInitFailed: function onSandboxInitFailed() {
            this.developerCallback && this.developerCallback.onSandboxInitFailed && this.developerCallback.onSandboxInitFailed();
          }
        },
        LoadListener: {
          developerCallback: null,
          onGameListLoaded: function onGameListLoaded(data) {
            this.developerCallback && this.developerCallback.onGameListLoaded && this.developerCallback.onGameListLoaded(data);
          },
          onGameListLoadFailed: function onGameListLoadFailed() {
            this.developerCallback && this.developerCallback.onGameListLoadFailed && this.developerCallback.onGameListLoadFailed();
          }
        },
        LaunchListener: {
          developerCallback: null,
          onGameStartLaunch: function onGameStartLaunch() {
            this.developerCallback && this.developerCallback.onGameStartLaunch && this.developerCallback.onGameStartLaunch();
          },
          onGameDownloadProgress: function onGameDownloadProgress(progress) {
            this.developerCallback && this.developerCallback.onGameDownloadProgress && this.developerCallback.onGameDownloadProgress(progress);
          },
          onGameDownloaded: function onGameDownloaded() {
            this.developerCallback && this.developerCallback.onGameDownloaded && this.developerCallback.onGameDownloaded();
          },
          onGameInstalled: function onGameInstalled() {
            this.developerCallback && this.developerCallback.onGameInstalled && this.developerCallback.onGameInstalled();
          },
          onGameLaunchError: function onGameLaunchError(errMsg) {
            this.developerCallback && this.developerCallback.onGameLaunchError && this.developerCallback.onGameLaunchError(errMsg);
          },
          onGameLaunched: function onGameLaunched() {
            this.developerCallback && this.developerCallback.onGameLaunched && this.developerCallback.onGameLaunched();
          }
        },
        waitSandbox: function waitSandbox(cb) {
          this.InitListener.developerCallback = cb;
          var event = {};
          event[CALLBACK_SANDBOX_INIT_DONE] = "LetoSandbox.InitListener.onSandboxInitDone";
          event[CALLBACK_SANDBOX_INIT_FAILED] = "LetoSandbox.InitListener.onSandboxInitFailed";
          callJavaStaticMethod(classJavaName, "waitSandbox", "(Ljava/lang/String;)V", JSON.stringify(event));
        },
        loadGameList: function loadGameList(cb) {
          this.LoadListener.developerCallback = cb;
          var event = {};
          event[CALLBACK_GAME_LIST_LOADED] = "LetoSandbox.LoadListener.onGameListLoaded";
          event[CALLBACK_GAME_LIST_LOAD_FAILED] = "LetoSandbox.LoadListener.onGameListLoadFailed";
          callJavaStaticMethod(classJavaName, "loadGameList", "(Ljava/lang/String;)V", JSON.stringify(event));
        },
        launchGame: function launchGame(gameJson, cb) {
          "object" == typeof gameJson && (gameJson = JSON.stringify(gameJson));
          this.LaunchListener.developerCallback = cb;
          var event = {};
          event[CALLBACK_GAME_START_LAUNCH] = "LetoSandbox.LaunchListener.onGameStartLaunch";
          event[CALLBACK_GAME_DOWNLOAD_PROGRESS] = "LetoSandbox.LaunchListener.onGameDownloadProgress";
          event[CALLBACK_GAME_LAUNCH_ERROR] = "LetoSandbox.LaunchListener.onGameLaunchError";
          event[CALLBACK_GAME_DOWNLOADED] = "LetoSandbox.LaunchListener.onGameDownloaded";
          event[CALLBACK_GAME_INSTALLED] = "LetoSandbox.LaunchListener.onGameInstalled";
          event[CALLBACK_GAME_LAUNCHED] = "LetoSandbox.LaunchListener.onGameLaunched";
          callJavaStaticMethod(classJavaName, "launchGame", "(Ljava/lang/String;Ljava/lang/String;)V", gameJson, JSON.stringify(event));
        }
      };
      window.LetoSandbox = LetoSandbox;
    })();
    cc._RF.pop();
  }, {} ],
  Splash: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "Splash");
    "use strict";
    require("./LetoSandbox");
    cc.Class({
      extends: cc.Component,
      properties: {
        _initTime: 0
      },
      onLoad: function onLoad() {
        this._initTime = Date.now();
        false;
        LetoSandbox.waitSandbox(this);
      },
      update: function update(dt) {},
      onSandboxInitDone: function onSandboxInitDone() {
        LetoSandbox.loadGameList(this);
      },
      onSandboxInitFailed: function onSandboxInitFailed() {},
      onGameListLoaded: function onGameListLoaded(data) {
        Global.gameData = data;
        var cost = Date.now() - this._initTime;
        cost < 2e3 ? this.scheduleOnce(function() {
          cc.director.loadScene("Home");
        }, (2e3 - cost) / 1e3) : cc.director.loadScene("Home");
      },
      onGameListLoadFailed: function onGameListLoadFailed() {}
    });
    cc._RF.pop();
  }, {
    "./LetoSandbox": "LetoSandbox"
  } ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "150547gAjBMJK5V+Fd94sDJ", "Utils");
    "use strict";
    function setImg(imgNode, spriteFrame) {
      cc.log("set img spriteFrame");
      imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    }
    function loadImgByUrl(imgNode, remoteUrl, imageType) {
      imageType || (imageType = "png");
      cc.log("load img: " + remoteUrl);
      cc.assetManager.loadRemote(remoteUrl, function(err, texture) {
        if (err) {
          cc.log("failed to load img " + remoteUrl + " with error: " + err);
          return;
        }
        setImg(imgNode, new cc.SpriteFrame(texture));
      });
    }
    function loadLocal(imgNode, absolutePath) {
      cc.resources.load(absolutePath, function(err, texture) {
        if (err) return;
        setImg(imgNode, new cc.SpriteFrame(texture));
      });
    }
    module.exports = {
      loadImgByUrl: loadImgByUrl,
      loadLocal: loadLocal,
      setImg: setImg
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "GameLoading", "Global", "Home", "LetoSandbox", "Splash", "Utils" ]);