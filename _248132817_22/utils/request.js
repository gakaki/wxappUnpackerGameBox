function t(t, i, n, e, a, o) {
    var r = this;
    wx.request({
        url: t,
        data: i,
        method: n ? "GET" : "POST",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            var i = t.data.code;
            0 == i ? e && e(t) : 601 == i || 600 == i ? getApp().login() : console.log("request with token ERROR ", t);
        },
        fail: function() {
            o = o || 0, o++ < -1 ? r.wxRequest(t, i, n, e, a, o) : a && a();
        }
    });
}

var i = require("./config.js");

module.exports = {
    reqLaunch: function(n) {
        t(i.url.launch, {
            rawData: "",
            pid: n
        }, !1);
    },
    reqLogin: function(n, e) {
        t(i.url.login, n, !1, e);
    },
    setUserInfo: function(n) {
        t(i.url.setUserInfo, n, !1);
    },
    getUserData: function(n, e) {
        t(i.url.getUserData, {
            token: n
        }, !0, e);
    },
    gameList: function(n, e, a) {
        t(i.url.getGameBillboard, {
            size: 5,
            page: n
        }, !0, e, a);
    },
    bannerList: function(n, e) {
        t(i.url.getBanner, {}, !0, n, e);
    },
    activityList: function(n, e, a) {
        t(i.url.getActivityList, {
            size: 10,
            page: n
        }, !0, e, a);
    },
    openAPP: function(i, n, e) {
        t(e, {
            token: n,
            appId: i.currentTarget.dataset.appid
        }, !1);
    },
    withdraw: function(n, e, a) {
        t(i.url.withdraw, {
            token: e,
            amount: n
        }, !0, a);
    },
    getDailyAwardList: function(n, e, a) {
        t(i.url.dailyAwardList, {
            token: n
        }, !0, e, a);
    },
    dailyAwardClaim: function(n, e, a) {
        t(i.url.dailyAwardClaim, {
            token: n
        }, !0, e, a);
    },
    getInvitationData: function(n, e, a) {
        t(i.url.invitationList, {
            token: n
        }, !0, e, a);
    },
    invitationClaim: function(n, e, a, o) {
        t(i.url.invitationClaim, {
            token: n,
            id: e
        }, !0, a, o);
    },
    getActivityRule: function(n, e, a, o) {
        t(i.url.getActivityDetail, {
            id: n,
            token: e
        }, !0, a, o);
    }
};