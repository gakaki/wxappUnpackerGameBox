var o = getApp();

Page({
    data: {},
    onLoad: function(o) {
        wx.setNavigationBarColor && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#783C9E"
        });
    },
    getFormId: function(t) {
        console.log(t), o.getFormId(t.detail.formId);
    }
});