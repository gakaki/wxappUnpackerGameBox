var a = getApp(), t = require("../../utils/globalData"), e = require("../../utils/config"), n = require("../../utils/utils"), i = require("../../utils/request");

Page({
    data: {
        imgsrc: t.imgsrc,
        bannerList: [],
        gameList: [],
        hasMore: !1,
        page: 1,
        userData: {},
        showAuthorize: !1,
        network: !1,
        isLoad: !1
    },
    onLoad: function(a) {
        this.gameList(1), this.bannerList();
    },
    onShow: function() {
        var t = [ "userData", "showAuthorize" ];
        a.pageOnShow(this, t);
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1
        }), this.gameList(1), this.bannerList();
    },
    onShareAppMessage: function(t) {
        return a.shareMessage();
    },
    gameList: function(a) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", e = this;
        this.setData({
            isLoad: !0
        });
        i.gameList(a, function(i) {
            var s = !1, o = [];
            if (i.data && i.data.data) {
                s = i.data.data.hasMore, o = i.data.data.list;
                for (var r = 0; r < o.length; r++) for (var l = 0; l < o[r].listGame.length; l++) {
                    var u = o[r].listGame[l];
                    u.name = n.cutString(u.name), u.onlineDescribe = u.playerCount + "万人在玩";
                }
            }
            if ("" == t) e.setData({
                gameList: o,
                hasMore: s,
                page: a
            }); else {
                for (var h = 0, o = i.data.data.list; h < o.length; h++) t.push(o[h]);
                e.setData({
                    gameList: t,
                    hasMore: s,
                    page: a
                });
            }
            e.loadFinish = !0, e.setData({
                network: !1,
                isLoad: !1
            }), wx.stopPullDownRefresh();
        }, function(a) {
            e.setData({
                network: !0,
                isLoad: !1
            }), wx.stopPullDownRefresh();
        });
    },
    bannerList: function() {
        var a = this;
        i.bannerList(function(t) {
            var e = t.data.data;
            a.setData({
                bannerList: e,
                network: !1
            });
        }, function(t) {
            console.log(t), a.setData({
                network: !0
            });
        });
    },
    userInfoHandler: function(t) {
        a.userInfoHandler(t);
    },
    networkRestart: function() {
        wx.showLoading({
            title: "加载中"
        }), this.onPullDownRefresh();
    },
    onClickGame: function(t) {
        console.log("onClickGame--------\x3e", t.currentTarget.dataset.appid);
        var n = a.appData.token;
        i.openAPP(t, n, e.url.clickGame);
    },
    onClickBanner: function(t) {
        console.log("onClickBanner--------\x3e", t.currentTarget.dataset.appid);
        var n = a.appData.token;
        i.openAPP(t, n, e.url.clickBanner);
    },
    onReachBottom: function() {
        var a = this;
        if (a.loadFinish && a.data.hasMore) {
            a.loadFinish = !1;
            var t = a.data.page + 1, e = a.data.gameList;
            a.gameList(t, e);
        }
    }
});