var t = getApp(), e = require("../../utils/globalData"), i = (require("../../utils/config"), 
require("../../wxParse/wxParse.js")), n = require("./activityData.js"), o = require("../../utils/request");

Page({
    data: {
        imgsrc: e.imgsrc,
        balance: "",
        activityRule: "",
        status: 4,
        modalItem: {
            modalContent: "内容",
            modalOkText: "确认",
            modalFuncType: ""
        },
        showModal: !1,
        showAuthorize: !1,
        authorizeItem: {
            imgsrc: e.imgsrc
        },
        nowActivityData: {},
        canWithDraw: !1,
        isFirstTransferOut: !1
    },
    onLoad: function() {
        wx.showLoading({
            title: "加载中..."
        }), this.getActivityRule();
    },
    onShow: function() {
        var a = [ "nowActivityData" ];
        t.pageOnShow(this, a);
    },
    getActivityRule: function() {
        var a = this, e = t.appData.nowActivityData.id, r = t.appData.token;
        o.getActivityRule(e, r, function(t) {
            wx.hideLoading(), a.setData({
                network: !1,
                activityRule: n[1].rules
            }), i.wxParse("activityRule", "html", a.data.activityRule, a, 5);
        }, function(t) {
            wx.hideLoading(), a.setData({
                network: !0
            });
        });
    },
    jumpGame: function(t) {
        var e = t.currentTarget.dataset.appid, i = {
            channelCode: t.currentTarget.dataset.channelcode,
            openid: wx.getStorageSync("pfopenid")
        };
        a.gotoMp(e, "", i, "release", function(t) {});
    },
    networkRestart: function() {
        wx.showLoading({
            title: "加载中"
        }), this.getActivityRule();
    }
});