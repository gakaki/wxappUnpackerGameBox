function n(n, r) {
    var t = (65535 & n) + (65535 & r);
    return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t;
}

function r(n, r) {
    return n << r | n >>> 32 - r;
}

function t(t, e, u, o, f, c) {
    return n(r(n(n(e, t), n(o, c)), f), u);
}

function e(n, r, e, u, o, f, c) {
    return t(r & e | ~r & u, n, r, o, f, c);
}

function u(n, r, e, u, o, f, c) {
    return t(r & u | e & ~u, n, r, o, f, c);
}

function o(n, r, e, u, o, f, c) {
    return t(r ^ e ^ u, n, r, o, f, c);
}

function f(n, r, e, u, o, f, c) {
    return t(e ^ (r | ~u), n, r, o, f, c);
}

function c(r) {
    for (var t = 1732584193, c = -271733879, a = -1732584194, i = 271733878, h = 0; h < r.length; h += 16) {
        var l = t, g = c, d = a, v = i;
        c = f(c = f(c = f(c = f(c = o(c = o(c = o(c = o(c = u(c = u(c = u(c = u(c = e(c = e(c = e(c = e(c, a = e(a, i = e(i, t = e(t, c, a, i, r[h + 0], 7, -680876936), c, a, r[h + 1], 12, -389564586), t, c, r[h + 2], 17, 606105819), i, t, r[h + 3], 22, -1044525330), a = e(a, i = e(i, t = e(t, c, a, i, r[h + 4], 7, -176418897), c, a, r[h + 5], 12, 1200080426), t, c, r[h + 6], 17, -1473231341), i, t, r[h + 7], 22, -45705983), a = e(a, i = e(i, t = e(t, c, a, i, r[h + 8], 7, 1770035416), c, a, r[h + 9], 12, -1958414417), t, c, r[h + 10], 17, -42063), i, t, r[h + 11], 22, -1990404162), a = e(a, i = e(i, t = e(t, c, a, i, r[h + 12], 7, 1804603682), c, a, r[h + 13], 12, -40341101), t, c, r[h + 14], 17, -1502002290), i, t, r[h + 15], 22, 1236535329), a = u(a, i = u(i, t = u(t, c, a, i, r[h + 1], 5, -165796510), c, a, r[h + 6], 9, -1069501632), t, c, r[h + 11], 14, 643717713), i, t, r[h + 0], 20, -373897302), a = u(a, i = u(i, t = u(t, c, a, i, r[h + 5], 5, -701558691), c, a, r[h + 10], 9, 38016083), t, c, r[h + 15], 14, -660478335), i, t, r[h + 4], 20, -405537848), a = u(a, i = u(i, t = u(t, c, a, i, r[h + 9], 5, 568446438), c, a, r[h + 14], 9, -1019803690), t, c, r[h + 3], 14, -187363961), i, t, r[h + 8], 20, 1163531501), a = u(a, i = u(i, t = u(t, c, a, i, r[h + 13], 5, -1444681467), c, a, r[h + 2], 9, -51403784), t, c, r[h + 7], 14, 1735328473), i, t, r[h + 12], 20, -1926607734), a = o(a, i = o(i, t = o(t, c, a, i, r[h + 5], 4, -378558), c, a, r[h + 8], 11, -2022574463), t, c, r[h + 11], 16, 1839030562), i, t, r[h + 14], 23, -35309556), a = o(a, i = o(i, t = o(t, c, a, i, r[h + 1], 4, -1530992060), c, a, r[h + 4], 11, 1272893353), t, c, r[h + 7], 16, -155497632), i, t, r[h + 10], 23, -1094730640), a = o(a, i = o(i, t = o(t, c, a, i, r[h + 13], 4, 681279174), c, a, r[h + 0], 11, -358537222), t, c, r[h + 3], 16, -722521979), i, t, r[h + 6], 23, 76029189), a = o(a, i = o(i, t = o(t, c, a, i, r[h + 9], 4, -640364487), c, a, r[h + 12], 11, -421815835), t, c, r[h + 15], 16, 530742520), i, t, r[h + 2], 23, -995338651), a = f(a, i = f(i, t = f(t, c, a, i, r[h + 0], 6, -198630844), c, a, r[h + 7], 10, 1126891415), t, c, r[h + 14], 15, -1416354905), i, t, r[h + 5], 21, -57434055), a = f(a, i = f(i, t = f(t, c, a, i, r[h + 12], 6, 1700485571), c, a, r[h + 3], 10, -1894986606), t, c, r[h + 10], 15, -1051523), i, t, r[h + 1], 21, -2054922799), a = f(a, i = f(i, t = f(t, c, a, i, r[h + 8], 6, 1873313359), c, a, r[h + 15], 10, -30611744), t, c, r[h + 6], 15, -1560198380), i, t, r[h + 13], 21, 1309151649), a = f(a, i = f(i, t = f(t, c, a, i, r[h + 4], 6, -145523070), c, a, r[h + 11], 10, -1120210379), t, c, r[h + 2], 15, 718787259), i, t, r[h + 9], 21, -343485551), 
        t = n(t, l), c = n(c, g), a = n(a, d), i = n(i, v);
    }
    return [ t, c, a, i ];
}

function a(n) {
    for (var r = "", t = 0; t < 4 * n.length; t++) r += "0123456789abcdef".charAt(n[t >> 2] >> t % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(n[t >> 2] >> t % 4 * 8 & 15);
    return r;
}

function i(n) {
    for (var r = 1 + (n.length + 8 >> 6), t = new Array(16 * r), e = 0; e < 16 * r; e++) t[e] = 0;
    for (e = 0; e < n.length; e++) t[e >> 2] |= (255 & n.charCodeAt(e)) << e % 4 * 8;
    return t[e >> 2] |= 128 << e % 4 * 8, t[16 * r - 2] = 8 * n.length, t;
}

function h(n) {
    for (var r = 1 + (n.length + 4 >> 5), t = new Array(16 * r), e = 0; e < 16 * r; e++) t[e] = 0;
    for (e = 0; e < n.length; e++) t[e >> 1] |= n.charCodeAt(e) << e % 2 * 16;
    return t[e >> 1] |= 128 << e % 2 * 16, t[16 * r - 2] = 16 * n.length, t;
}

module.exports = {
    md5: function(n) {
        return a(c(i(n)));
    },
    md5w: function(n) {
        return a(c(h(n)));
    }
};