function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = require("./utils/config"), e = require("./utils/request"), n = require("./utils/wxAPI");

App({
    appData: {
        pid: 0,
        inviter: "",
        token: "",
        userData: {
            userInfo: {},
            gold: 0,
            redEnvelope: 0,
            openId: ""
        },
        nowActivityData: {},
        showPage: null,
        showAuthorize: !1,
        isSetUserInfo: !1
    },
    onLaunch: function(a) {
        var t = a.query.hasOwnProperty("pid") ? a.query.pid : 0;
        this.appData.pid = t, this.appData.inviter = a.query.hasOwnProperty("inviter") ? a.query.inviter : "", 
        wx.showShareMenu({
            withShareTicket: !0
        }), e.reqLaunch(this.appData.pid), this.login(), this.isAuthSetting();
    },
    shareMessage: function() {
        var a = this, e = Math.round(Math.random() * (t.shareData.title.length - 1)), n = a.appData.userData ? a.appData.userData.openId : "";
        return {
            title: t.shareData.title[e],
            desc: t.shareData.desc,
            path: t.shareData.path + "?inviter=" + n,
            imageUrl: t.shareData.imageUrl.replace("%d", e),
            success: function(a) {
                console.log("转发成功:" + JSON.stringify(a));
            },
            fail: function(a) {
                console.log("转发失败:" + JSON.stringify(a));
            }
        };
    },
    login: function() {
        var a = this;
        n.login(function(t) {
            var s = {
                code: t.code,
                pid: a.appData.pid
            };
            e.reqLogin(s, function(t) {
                t.data && (console.log("app.login---\x3e", t), a.appData.token = t.data.token, a.appData.userData.openId = t.data.openid, 
                a.appData.userData.gold = t.data.gold, a.appData.userData.redEnvelope = t.data.redEnvelope, 
                a.appData.isSetUserInfo || n.getUserInfo(a.getUserInfoCallBack));
            });
        });
    },
    isAuthSetting: function() {
        var a = this;
        if (!wx.canIUse("getSetting")) return !1;
        wx.getSetting({
            success: function(t) {
                console.log("isAuthSetting--\x3esuccess", t);
                var e = !(!t.authSetting || !t.authSetting["scope.userInfo"]);
                a.appData.showAuthorize = !e, a.sendPage([ "showAuthorize" ]), e && a.appData.token && "" != a.appData.token && n.getUserInfo(a.getUserInfoCallBack);
            },
            fail: function() {
                a.appData.showAuthorize = !0, a.sendPage([ "showAuthorize" ]);
            }
        });
    },
    userInfoHandler: function(a) {
        var t = this;
        a.detail.userInfo && (this.appData.showAuthorize = !1, this.sendPage([ "showAuthorize" ]), 
        this.appData.token && "" != this.appData.token && n.getUserInfo(t.getUserInfoCallBack));
    },
    getUserInfoCallBack: function(a) {
        if (a.userInfo) {
            this.appData.userData.userInfo = a.userInfo, this.sendPage([ "userData" ]);
            var t = {
                rawData: a.rawData,
                signature: a.signature,
                token: this.appData.token
            };
            e.setUserInfo(t);
        }
    },
    getUpdate: function() {
        if (wx.canIUse("getUpdateManager")) {
            var a = wx.getUpdateManager();
            a.onCheckForUpdate(function(t) {
                t.hasUpdate && (a.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(t) {
                            t.confirm && a.applyUpdate();
                        }
                    });
                }), a.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    getUserData: function() {
        var a = this, t = this.appData.token;
        e.getUserData(t, function(t) {
            console.log("getUserData--\x3e", t), a.updateUserData(t.data);
        });
    },
    updateUserData: function(a) {
        this.appData.userData.gold = a.gold ? a.gold : this.appData.userData.gold, this.appData.userData.redEnvelope = a.redEnvelope ? a.redEnvelope : this.appData.userData.redEnvelope, 
        this.sendPage([ "userData" ]);
    },
    updateDailyAwardList: function(a) {
        this.appData.dailyAwardList = a.list, this.sendPage([ "dailyAwardList" ]);
    },
    sendPage: function(t) {
        for (var e = 0; e < t.length; e++) {
            var n = t[e];
            this.appData.showPage && this.appData.showPage.setData(a({}, n, this.appData[n]));
        }
    },
    pageOnShow: function(a, t) {
        this.appData.showPage = a, this.getUpdate(), this.sendPage(t);
    }
});