var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = {
    timestemp: function() {
        return Date.parse(new Date()) / 1e3;
    },
    isNull: function(t) {
        return "[object Undefined]" === Object.prototype.toString.call(t) || ("[object String]" === Object.prototype.toString.call(t) ? 0 == t.length || "null" == t || "undefined" == t : "[object Array]" === Object.prototype.toString.call(t) ? 0 == t.length : "[object Object]" !== Object.prototype.toString.call(t) || "{}" == JSON.stringify(t));
    },
    urlEncode: function e(n, o, r) {
        if (null == n) return "";
        var i = "", u = void 0 === n ? "undefined" : t(n);
        if ("string" == u || "number" == u || "boolean" == u) i += o + "=" + (null == r || r ? encodeURIComponent(n) : n) + "&"; else for (var c in n) {
            var l = null == o ? c : o + (n instanceof Array ? "[" + c + "]" : "." + c);
            i += e(n[c], l, r);
        }
        return i;
    },
    urlDecode: function(t, e) {
        var n, o, r = {}, i = t.split("&"), u = decodeURIComponent;
        for (var c in i) n = u((c = c.split("="))[0]), o = u(c[1]), r[n] = o;
        return r;
    },
    objKeySort: function(t) {
        for (var e = Object.keys(t).sort(), n = {}, o = 0; o < e.length; o++) n[e[o]] = t[e[o]];
        return n;
    },
    showToast: function(t, e, n, o) {
        wx.showToast({
            title: t || "提示",
            icon: n || "none",
            duration: e || 3e3,
            mask: !0,
            complete: function() {
                "function" == typeof o && setTimeout(function() {
                    o();
                }, e || 3e3);
            }
        });
    },
    promiseHandler: function(t, e) {
        return e = e || {}, new Promise(function(n, o) {
            "function" != typeof t && o(), e.success = n, e.fail = o, t(e);
        });
    },
    cutString: function(t, e) {
        if (e || (e = 10), t.replace(/[^\u0000-\u00ff]/g, "aa").length <= e) return t;
        for (var n = 0, o = "", r = 0; r <= e - 2; n++) {
            var i = t[n].replace(/[^\u0000-\u00ff]/g, "aa").length;
            if (r + i > e - 2) return o + "...";
            o += t[n], r += i;
        }
    }
};