// 测试用数据
let fakeData = CC_PREVIEW ? {
    id: "115663499",
    name: "四合一的",
    compact: "55",
    styleCode: "groupGames4",
    bgPic: "",
    gameList: [
        {
            "id": "1004962",
            "name": "精灵萌宝贝",
            "icon": "http://download.mgc-games.com/access/upload/20211026/61776164d13f3.png",
            "packageurl": "http://download.mgc-games.com/sdkgame/jlmbb_and_1004962/jlmbb_and_1004962_test.apk",
            "version": "1.0",
            "deviceOrientation": "portrait",
            "play_num": "169",
            "packagename": "com.lztech.dreamgarden",
            "pic": "http://download.mgc-games.com/access/upload/20211103/61823ea8e0847.png",
            "publicity": "精灵萌宝贝",
            "tags": [],
            "classify": "50",
            "backgroundcolor": "",
            "highrewardcoin": 0,
            "game_date": "",
            "marker": "",
            "title": "",
            "amount": "",
            "game_type": "1",
            "classify_game_id": 0,
            "grade": "8",
            "star_cnt": 8,
            "is_cpl": 0,
            "yw_task_id": "",
            "rank": "",
            "download_times": "",
            "videourl": "",
            "open_type": 1,
            "is_hot": "1"
        },
        {
            "id": "1004960",
            "name": "百万游戏场小游戏",
            "icon": "http://download.mgc-games.com/access/upload/20211009/61613149cc353.jpg",
            "packageurl": "http://download.mgc-games.com/sdkgame/",
            "version": "1.0",
            "deviceOrientation": "portrait",
            "play_num": "149",
            "packagename": "",
            "pic": "http://download.mgc-games.com/access/upload/20211103/61823eb5b3983.png",
            "publicity": "百万游戏场",
            "tags": [
                "推荐",
                "冲级",
                "高返"
            ],
            "classify": "50",
            "backgroundcolor": "",
            "highrewardcoin": 0,
            "game_date": "",
            "marker": "",
            "title": "",
            "amount": "",
            "game_type": "1",
            "classify_game_id": 0,
            "grade": "7",
            "star_cnt": 7.2999999999999998,
            "is_cpl": "1",
            "yw_task_id": "",
            "rank": "",
            "download_times": "",
            "videourl": "",
            "open_type": 1,
            "is_hot": "1"
        },
        {
            "id": "1004958",
            "name": "开心跳一跳",
            "icon": "http://download.mgc-games.com/access/upload/20210923/614c4e20416cf.png",
            "packageurl": "http://download.mgc-games.com/sdkgame/kxtyt_az_and_1004958/kxtyt_az_and_1004958_test.apk",
            "version": "1.0",
            "deviceOrientation": "portrait",
            "play_num": "233",
            "packagename": "com.fingertip.tyt",
            "pic": "http://download.mgc-games.com/access/upload/20211103/61823ebf62471.png",
            "publicity": "开心跳一跳",
            "tags": [],
            "classify": "50",
            "backgroundcolor": "",
            "highrewardcoin": 0,
            "game_date": "",
            "marker": "",
            "title": "",
            "amount": "",
            "game_type": "1",
            "classify_game_id": 0,
            "grade": "8",
            "star_cnt": 8.3000000000000007,
            "is_cpl": 0,
            "yw_task_id": "",
            "rank": "",
            "download_times": "",
            "videourl": "",
            "open_type": 1,
            "is_hot": "0"
        },
        {
            "id": "1004955",
            "name": "DungeonMaker",
            "icon": "http://download.mgc-games.com/access/upload/20210917/6143ff9cdde50.png",
            "packageurl": "http://download.mgc-games.com/sdkgame/dungeonmaker_and_1004955/dungeonmaker_and_1004955_test.apk",
            "version": "1.0",
            "deviceOrientation": "portrait",
            "play_num": "226",
            "packagename": "com.GameCoaster.DungeonMaker",
            "pic": "http://download.mgc-games.com/access/upload/20211103/61823ed7927de.png",
            "publicity": "DungeonMaker",
            "tags": [],
            "classify": "50",
            "backgroundcolor": "",
            "highrewardcoin": 0,
            "game_date": "",
            "marker": "",
            "title": "",
            "amount": "",
            "game_type": "1",
            "classify_game_id": 0,
            "grade": "7",
            "star_cnt": 7.2999999999999998,
            "is_cpl": 0,
            "yw_task_id": "",
            "rank": "",
            "download_times": "",
            "videourl": "",
            "open_type": 1,
            "is_hot": "1"
        }
    ]
} : {
    id: "11111111",
    name: 'fake',
    gameList: []
}

window.Global = {
    gameData: fakeData,
    GAME_SIZE: 4,
    launchGameIdx: 0
}