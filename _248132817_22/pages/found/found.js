var a = getApp(), t = require("../../utils/globalData"), i = require("../../utils/utils"), n = require("../../utils/request");

Page({
    data: {
        showAuthorize: !1,
        imgsrc: t.imgsrc,
        userData: {},
        dailyAwardData: {},
        inviteData: {},
        awardData: {},
        activityList: "",
        page: 1,
        network: !1,
        showDailyAward: !1,
        showLuckyMan: !1,
        showInvite: !1,
        showAwardModal: !1
    },
    onLoad: function(a) {
        this.activityList(1);
    },
    onShow: function() {
        var t = [ "userData", "showAuthorize" ];
        a.pageOnShow(this, t);
    },
    userInfoHandler: function(t) {
        a.userInfoHandler(t);
    },
    networkRestart: function() {
        wx.showLoading({
            title: "加载中"
        }), this.activityList(1);
    },
    withdraw: function() {
        var t = a.appData.token;
        n.withdraw(100, t, function(a) {
            console.log("withdraw---\x3e", a);
        });
    },
    openStore: function() {
        i.showToast("即将开放", 1e3, "none");
    },
    openActivity: function(t) {
        0 == t.currentTarget.dataset.jumpurl.indexOf(" wx") ? (console.log("nowActivityData----\x3e", t.currentTarget.dataset), 
        a.appData.nowActivityData = t.currentTarget.dataset.datas, wx.navigateTo({
            url: "/pages/activity/activity"
        })) : (wx.showLoading(), this.openInvite());
    },
    openDailyAward: function() {
        wx.showLoading();
        var t = this, i = a.appData.token;
        n.getDailyAwardList(i, function(a) {
            console.log("openDailyAward----\x3e", a), wx.hideLoading(), t.setData({
                showDailyAward: !0,
                dailyAwardData: a.data
            });
        }, function() {
            wx.hideLoading();
        });
    },
    openInvite: function() {
        var t = this, i = a.appData.token;
        n.getInvitationData(i, function(a) {
            console.log("getInvitationList---\x3e", a), wx.hideLoading();
            var i = a.data.inviters;
            a.data.invitersNum = i.length;
            for (var n = a.data.maxInviterSize, e = i.length; e < n; e++) i.push({});
            t.setData({
                showInvite: !0,
                inviteData: a.data
            });
        }, function() {
            wx.hideLoading();
        });
    },
    closeDailyAward: function() {
        this.setData({
            showDailyAward: !1
        });
    },
    closeInvite: function() {
        this.setData({
            showInvite: !1
        });
    },
    closeAwardModel: function() {
        this.setData({
            showAwardModal: !1
        });
    },
    dailyAwardClaim: function() {
        wx.showLoading();
        var t = this, i = a.appData.token;
        n.dailyAwardClaim(i, function(i) {
            wx.hideLoading(), a.updateUserData(i.data), t.openDailyAward();
        }, function() {
            wx.hideLoading();
        });
    },
    invitationClaim: function(t) {
        console.log("invitationClaim----\x3e", t.currentTarget.dataset), wx.showLoading();
        var i = this, e = a.appData.token, o = t.currentTarget.dataset.id;
        n.invitationClaim(e, o, function(t) {
            wx.hideLoading(), a.updateUserData(t.data), i.openInvite(), i.setData({
                showAwardModal: !0,
                awardData: t.data.money ? t.data.money : 0
            });
        }, function() {
            wx.hideLoading();
        });
    },
    onShareAppMessage: function(t) {
        return t.from, a.shareMessage();
    },
    activityList: function(a) {
        var t = this;
        n.activityList(a, function(a) {
            if (console.log("activityList->", a), a.data.data) {
                var i = a.data.data;
                t.setData({
                    activityList: i,
                    network: !1
                });
            } else t.setData({
                network: !0
            });
            wx.hideLoading();
        }, function() {
            1 == t.data.page && (wx.hideLoading(), t.setData({
                network: !0
            }));
        });
    }
});