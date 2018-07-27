function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = require("../../utils/md5.js"), e = getApp(), n = require("../../utils/utils.js");

Page({
    data: {
        userInfo: null,
        game: {
            gameId: 0,
            appId: null,
            params: null
        },
        userAsset: {
            diamond: 0,
            gold: 0,
            money: 0
        },
        userRanking: {
            lastTop: 0,
            lastScore: 0,
            lastPeriod: "",
            thisTop: 0,
            thisScore: 0,
            thisPeriod: ""
        },
        ranking: {
            pageIndex: 0,
            pageRecords: 0,
            pageCount: 0,
            pageSize: 10,
            list: [],
            IntervalTime: 1,
            loadTime: 0,
            loading: !1,
            loadFlag: !1,
            loadErr: 0,
            hideBox: !0
        },
        lastRanking: {
            pageIndex: 0,
            pageRecords: 0,
            pageCount: 0,
            pageSize: 10,
            list: [],
            IntervalTime: 1,
            loadTime: 0,
            loading: !1,
            loadFlag: !1,
            loadErr: 0,
            hideBox: !0
        },
        takePrize: {
            hideBox: !0,
            num: 0,
            unit: "元"
        }
    },
    onLoad: function(t) {
        var o, i = this;
        if (wx.setNavigationBarColor && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#feb91e"
        }), console.log(t), !(n.isNull(t) || n.isNull(t.gameid) || n.isNull(t.appid))) {
            var s = t.gameid, l = t.appid;
            this.setData((o = {}, a(o, "game.gameId", s), a(o, "game.appId", l), o)), e.getUserInfo(function(a) {
                i.setData({
                    userInfo: a
                }), i.getAccount(), i.getUserRanking();
            }), this.loadTopRanking();
        }
    },
    goBack: function(a) {
        wx.navigateBack({
            delta: 1
        });
    },
    getAccount: function() {
        var o = this, i = "openid=" + e.globalData.userInfo.openId + "&key=" + e.config.ranking.token;
        wx.request({
            url: e.config.url.account,
            data: {
                openid: e.globalData.userInfo.openId,
                token: (0, t.md5)(i)
            },
            success: function(t) {
                var e;
                console.log(t), n.isNull(t.result) || o.setData((e = {}, a(e, "userInfo.nickName", decodeURIComponent(t.data.result.nickName)), 
                a(e, "userInfo.avatarurl", t.data.result.headimgurl), a(e, "userAsset.diamond", t.data.result.diamond), 
                a(e, "userAsset.gold", t.data.result.gold), a(e, "userAsset.money", t.data.result.money), 
                e));
            }
        });
    },
    getUserRanking: function() {
        var t = this;
        wx.request({
            url: e.config.url.userRanking,
            data: {
                gameid: this.data.game.gameId,
                openid: e.globalData.userInfo.openId,
                toptype: e.config.ranking.topType
            },
            success: function(e) {
                var o;
                console.log(e), n.isNull(e.data) || !e.data.success || n.isNull(e.data.result) || t.setData((o = {}, 
                a(o, "userRanking.lastTop", e.data.result.lastTop || 0), a(o, "userRanking.lastScore", n.isNull(e.data.result.lastRanking) ? 0 : JSON.parse(decodeURIComponent(e.data.result.lastRanking)).score || 0), 
                a(o, "userRanking.lastPeriod", e.data.result.preSetting || ""), a(o, "userRanking.thisTop", e.data.result.thisTop || 0), 
                a(o, "userRanking.thisScore", n.isNull(e.data.result.thisRanking) ? 0 : JSON.parse(decodeURIComponent(e.data.result.thisRanking)).score || 0), 
                a(o, "userRanking.thisPeriod", e.data.result.thisSetting || ""), o));
            }
        });
    },
    loadTopRanking: function() {
        var t;
        if (!this.data.ranking.loading) {
            var o = this.data.ranking.pageIndex;
            if (0 == this.data.ranking.pageCount || this.data.ranking.pageCount != o) {
                var i = n.timestemp();
                if (!(this.data.ranking.loadFlag && i - this.data.ranking.loadTime < this.data.ranking.IntervalTime)) {
                    this.setData((t = {}, a(t, "ranking.loading", !0), a(t, "ranking.loadFlag", !1), 
                    t));
                    var s = this;
                    wx.request({
                        url: e.config.url.topRanking,
                        data: {
                            gameid: this.data.game.gameId,
                            toptype: e.config.ranking.topType,
                            pageno: ++o
                        },
                        success: function(t) {
                            var e;
                            if (console.log(t), s.data.ranking.loadErr = 0, !n.isNull(t.data) && t.data.success && !n.isNull(t.data.result)) {
                                var o = JSON.parse(t.data.attach.pc), l = JSON.parse(decodeURIComponent(t.data.result));
                                s.setData((e = {}, a(e, "ranking.pageIndex", o.pageNo), a(e, "ranking.pageRecords", o.pageRecords), 
                                a(e, "ranking.pageCount", o.pageCount), a(e, "ranking.pageSize", o.pageSize), a(e, "ranking.list", s.data.ranking.list.concat(l)), 
                                a(e, "ranking.loading", !1), a(e, "ranking.loadTime", i), a(e, "ranking.loadErr", 0), 
                                a(e, "ranking.loadFlag", !0), e));
                            }
                        },
                        fail: function(t) {
                            console.log("fail:ranking"), console.log(t), s.setData(a({}, "ranking.loading", !1)), 
                            ++s.data.ranking.loadErr, s.data.ranking.loadErr < 2 && s.loadTopRanking();
                        },
                        complete: function(a) {}
                    });
                }
            }
        }
    },
    loadLastRanking: function() {
        var t;
        if (!this.data.lastRanking.loading) {
            var o = this.data.lastRanking.pageIndex;
            if (0 == this.data.lastRanking.pageCount || this.data.lastRanking.pageCount != o) {
                var i = n.timestemp();
                if (!(this.data.lastRanking.loadFlag && i - this.data.lastRanking.loadTime < this.data.lastRanking.IntervalTime)) {
                    this.setData((t = {}, a(t, "lastRanking.loading", !0), a(t, "lastRanking.loadFlag", !1), 
                    t));
                    var s = this;
                    wx.request({
                        url: e.config.url.topRanking,
                        data: {
                            gameid: this.data.game.gameId,
                            toptype: e.config.ranking.topType,
                            target: "pre",
                            pageno: ++o
                        },
                        success: function(t) {
                            var e;
                            if (console.log(t), s.data.lastRanking.loadErr = 0, !n.isNull(t.data) && t.data.success && !n.isNull(t.data.result)) {
                                var o = JSON.parse(t.data.attach.pc), l = JSON.parse(decodeURIComponent(t.data.result));
                                s.setData((e = {}, a(e, "lastRanking.pageIndex", o.pageNo), a(e, "lastRanking.pageRecords", o.pageRecords), 
                                a(e, "lastRanking.pageCount", o.pageCount), a(e, "lastRanking.pageSize", o.pageSize), 
                                a(e, "lastRanking.list", s.data.lastRanking.list.concat(l)), a(e, "lastRanking.loading", !1), 
                                a(e, "lastRanking.loadTime", i), a(e, "lastRanking.loadFlag", !0), a(e, "lastRanking.loadErr", 0), 
                                e));
                            }
                        },
                        fail: function(t) {
                            console.log("fail:topRanking"), console.log(t), s.setData(a({}, "lastRanking.loading", !1)), 
                            ++s.data.lastRanking.loadErr, s.data.lastRanking.loadErr < 2 && s.loadLastRanking();
                        },
                        complete: function(a) {}
                    });
                }
            }
        }
    },
    takePrize: function(o) {
        var i = this, s = {
            openid: e.globalData.userInfo.openId,
            gameid: this.data.game.gameId,
            toptype: e.config.ranking.topType
        }, l = n.urlEncode(n.objKeySort(s)) + "key=" + e.config.ranking.token;
        console.log(l), wx.request({
            url: e.config.url.payBonus,
            data: {
                openid: s.openid,
                gameid: s.gameid,
                toptype: s.toptype,
                token: (0, t.md5)(l)
            },
            success: function(t) {
                console.log(t), n.isNull(t.data) || (t.data.success ? (i.setData(a({}, "takePrize.hideBox", !0)), 
                n.showToast("领取成功！", null, "success")) : n.showToast(t.data.retinfo));
            }
        });
    },
    showTakePrizeBox: function(o) {
        if (!n.isNull(e.globalData.userInfo.openId)) {
            console.log(o);
            var i = this, s = {
                openid: e.globalData.userInfo.openId,
                gameid: this.data.game.gameId,
                toptype: e.config.ranking.topType
            }, l = n.urlEncode(n.objKeySort(s)) + "key=" + e.config.ranking.token;
            console.log(l), wx.request({
                url: e.config.url.getBonus,
                data: {
                    openid: s.openid,
                    gameid: s.gameid,
                    toptype: s.toptype,
                    token: (0, t.md5)(l)
                },
                success: function(t) {
                    if (console.log(t), !n.isNull(t.data)) if (t.data.success) {
                        var e;
                        i.setData((e = {}, a(e, "takePrize.hideBox", !1), a(e, "takePrize.num", t.data.result.num), 
                        a(e, "takePrize.unit", t.data.result.unit), e));
                    } else n.showToast(-4 == t.data.retcode ? "请先同步排位信息" : t.data.retinfo);
                }
            });
        }
    },
    showLastBox: function(t) {
        console.log(t), this.setData(a({}, "lastRanking.hideBox", !1)), this.loadLastRanking();
    },
    showThisBox: function(t) {
        console.log(t), this.setData(a({}, "ranking.hideBox", !1));
    },
    showBox: function(t) {
        console.log(t), this.setData(a({}, t.target.dataset.view + ".hideBox", !1));
    },
    hideBox: function(t) {
        console.log(t), this.setData(a({}, t.target.dataset.view + ".hideBox", !0));
    },
    onShareAppMessage: function(a) {
        return e.shareMessage();
    },
    getFormId: function(a) {
        console.log(a), e.getFormId(a.detail.formId);
    }
});