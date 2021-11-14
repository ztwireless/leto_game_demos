(function() {
    // call android java
    let layaClassCache = {}
    let loadLayaClass = function(klass) {
        if(!layaClassCache[klass]) {
            layaClassCache[klass] = window.PlatformClass.createClass(klass)
        }
        return layaClassCache[klass]
    }
    let callJavaStaticMethod = function(klass, method, sig) {
        let args = Array.prototype.slice.call(arguments, 3)
        if(typeof(jsb) !== 'undefined') {
            return jsb.reflection.callStaticMethod(klass, method, sig, ...args)
        } else if(typeof(window.PlatformClass) !== 'undefined') {
            klass = klass.replace(/\//g, '.') // to dot class name
            javaClass = loadLayaClass(klass)
            return javaClass.call(method, ...args)
        }
    }

    // event constant
    let CALLBACK_SANDBOX_INIT_DONE = "SandboxInitDone"
    let CALLBACK_SANDBOX_INIT_FAILED = "SandboxInitFailed"
    let CALLBACK_GAME_LIST_LOADED = "GameListLoaded"
    let CALLBACK_GAME_LIST_LOAD_FAILED = "GameListLoadFailed"
    let CALLBACK_GAME_START_LAUNCH = "GameStartLaunch";
    let CALLBACK_GAME_DOWNLOAD_PROGRESS = "GameDownloadProgress";
    let CALLBACK_GAME_DOWNLOADED = "GameDownloaded";
    let CALLBACK_GAME_INSTALLED = "GameInstalled";
    let CALLBACK_GAME_LAUNCH_ERROR = "GameLaunchError";
    let CALLBACK_GAME_LAUNCHED = "GameLaunched";

    // define bridge
    let classJavaName = "com/leto/game/js/LTGameJSBridge"
    let LetoSandbox = {
        // wait sandbox callback
        InitListener: {
            developerCallback: null,
            onSandboxInitDone: function() {
                if(this.developerCallback && this.developerCallback.onSandboxInitDone) {
                    this.developerCallback.onSandboxInitDone()
                }                
            },
            onSandboxInitFailed: function() {
                if(this.developerCallback && this.developerCallback.onSandboxInitFailed) {
                    this.developerCallback.onSandboxInitFailed()
                }    
            }
        },

        LoadListener: {
            developerCallback: null,
            onGameListLoaded: function(data) {
                if(this.developerCallback && this.developerCallback.onGameListLoaded) {
                    this.developerCallback.onGameListLoaded(data)
                }   
            },
            onGameListLoadFailed: function() {
                if(this.developerCallback && this.developerCallback.onGameListLoadFailed) {
                    this.developerCallback.onGameListLoadFailed()
                }
            }
        },

        // 游戏启动分为三步: 下载 -> 安装 -> 启动, 会依次触发. 如果已经下载过会直接触发onGameDownloaded
        // 如果已经安装过会直接触发onGameDownloaded和onGameInstalled, 总之会保证游戏端依次收到这些事件
        LaunchListener: {
            developerCallback: null,
            onGameStartLaunch: function() {
                if(this.developerCallback && this.developerCallback.onGameStartLaunch) {
                    this.developerCallback.onGameStartLaunch()
                }   
            },
            onGameDownloadProgress: function(progress) {
                if(this.developerCallback && this.developerCallback.onGameDownloadProgress) {
                    this.developerCallback.onGameDownloadProgress(progress)
                }   
            },
            onGameDownloaded: function() {
                if(this.developerCallback && this.developerCallback.onGameDownloaded) {
                    this.developerCallback.onGameDownloaded()
                }   
            },
            onGameInstalled: function() {
                if(this.developerCallback && this.developerCallback.onGameInstalled) {
                    this.developerCallback.onGameInstalled()
                }   
            },
            onGameLaunchError: function(errMsg) {
                if(this.developerCallback && this.developerCallback.onGameLaunchError) {
                    this.developerCallback.onGameLaunchError(errMsg)
                }   
            },
            onGameLaunched: function() {
                if(this.developerCallback && this.developerCallback.onGameLaunched) {
                    this.developerCallback.onGameLaunched()
                }
            }
        },

        // 等待沙盒初始化完成
        waitSandbox: function(cb) {
            this.InitListener.developerCallback = cb
            let event = {}
            event[CALLBACK_SANDBOX_INIT_DONE] = "LetoSandbox.InitListener.onSandboxInitDone"
            event[CALLBACK_SANDBOX_INIT_FAILED] = "LetoSandbox.InitListener.onSandboxInitFailed"
            callJavaStaticMethod(classJavaName, "waitSandbox", "(Ljava/lang/String;)V", JSON.stringify(event));
        },

        // 载入游戏合集的游戏列表
        loadGameList: function(cb) {
            this.LoadListener.developerCallback = cb
            let event = {}
            event[CALLBACK_GAME_LIST_LOADED] = "LetoSandbox.LoadListener.onGameListLoaded"
            event[CALLBACK_GAME_LIST_LOAD_FAILED] = "LetoSandbox.LoadListener.onGameListLoadFailed"
            callJavaStaticMethod(classJavaName, "loadGameList", "(Ljava/lang/String;)V", JSON.stringify(event));
        },

        // 启动游戏, 传入游戏数据的json字符串
        launchGame: function(gameJson, cb) {
            if(typeof gameJson == 'object') {
                gameJson = JSON.stringify(gameJson)
            }
            this.LaunchListener.developerCallback = cb
            let event = {}
            event[CALLBACK_GAME_START_LAUNCH] = "LetoSandbox.LaunchListener.onGameStartLaunch"
            event[CALLBACK_GAME_DOWNLOAD_PROGRESS] = "LetoSandbox.LaunchListener.onGameDownloadProgress"
            event[CALLBACK_GAME_LAUNCH_ERROR] = "LetoSandbox.LaunchListener.onGameLaunchError"
            event[CALLBACK_GAME_DOWNLOADED] = "LetoSandbox.LaunchListener.onGameDownloaded"
            event[CALLBACK_GAME_INSTALLED] = "LetoSandbox.LaunchListener.onGameInstalled"
            event[CALLBACK_GAME_LAUNCHED] = "LetoSandbox.LaunchListener.onGameLaunched"
            callJavaStaticMethod(classJavaName, "launchGame", "(Ljava/lang/String;Ljava/lang/String;)V", gameJson, JSON.stringify(event));
        }
    }
    window.LetoSandbox = LetoSandbox
}());
