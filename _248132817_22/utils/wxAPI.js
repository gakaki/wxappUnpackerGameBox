require("./request");

module.exports = {
    login: function(e, o) {
        var n = this;
        o || (o = 0), wx.login({
            success: function(o) {
                console.log("wxLogin----\x3e", o), e && e(o);
            },
            fail: function() {
                o++ < 3 && n.wxLogin(e, o);
            }
        });
    },
    getUserInfo: function(e) {
        wx.getUserInfo({
            withCredentials: !0,
            success: function(o) {
                console.log("wxGetUserInfo---\x3e", o), e && e(o);
            },
            fail: function(e) {
                console.log("wx.getUserInfo.fail---\x3e", e);
            }
        });
    }
};