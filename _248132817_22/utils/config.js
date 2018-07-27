var a = "https://gamebox1.legaogame.com", i = {
    base: a,
    launch: a + "/tracking/launch",
    login: a + "/auth/login",
    setUserInfo: a + "/account/setWechatUserInfo",
    getUserData: a + "/account/getUserInfo",
    clickGame: a + "/tracking/clickGame",
    clickBanner: a + "/tracking/clickBanner",
    getGameBillboard: a + "/game/billboard/list",
    getBanner: a + "/game/banner/list",
    getActivityList: a + "/activity/list",
    getActivityDetail: a + "/activity/detail",
    dailyAwardList: a + "/dailyAward/list",
    dailyAwardClaim: a + "/dailyAward/claim",
    invitationList: a + "/invitation/list",
    invitationClaim: a + "/invitation/claimed",
    withdraw: a + "/account/withdraw"
}, t = {
    token: "VdBTMGBChI0eFjRpF2aMnwFzS3nbgsAp",
    topType: "LimitScoreTop"
}, e = {
    path: "/pages/index/index",
    imageUrl: "/images/share%d.jpg",
    title: [ "聪明的人都在玩，你造吗？", "听说你想撩我?", "小哥哥小姐姐都在玩的网红游戏，点开即玩。", "来啊！互相伤害啊！" ],
    desc: ""
};

module.exports = {
    url: i,
    ranking: t,
    shareData: e
};