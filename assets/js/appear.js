!(function (a) {
  (a.fn.appear = function (e, r) {
    var p = a.extend({ data: void 0, one: !0, accX: 0, accY: 0 }, r);
    return this.each(function () {
      var r = a(this);
      if (((r.appeared = !1), !e)) {
        r.trigger("appear", p.data);
        return;
      }
      var n = a(window),
        t = function () {
          if (!r.is(":visible")) {
            r.appeared = !1;
            return;
          }
          var a = n.scrollLeft(),
            e = n.scrollTop(),
            t = r.offset(),
            c = t.left,
            i = t.top,
            f = p.accX,
            o = p.accY,
            s = r.height(),
            h = n.height(),
            l = r.width(),
            d = n.width();
          i + s + o >= e && i <= e + h + o && c + l + f >= a && c <= a + d + f
            ? r.appeared || r.trigger("appear", p.data)
            : (r.appeared = !1);
        },
        c = function () {
          if (((r.appeared = !0), p.one)) {
            n.unbind("scroll", t);
            var c = a.inArray(t, a.fn.appear.checks);
            c >= 0 && a.fn.appear.checks.splice(c, 1);
          }
          e.apply(this, arguments);
        };
      p.one ? r.one("appear", p.data, c) : r.bind("appear", p.data, c),
        n.scroll(t),
        a.fn.appear.checks.push(t),
        t();
    });
  }),
    a.extend(a.fn.appear, {
      checks: [],
      timeout: null,
      checkAll: function () {
        var e = a.fn.appear.checks.length;
        if (e > 0) for (; e--; ) a.fn.appear.checks[e]();
      },
      run: function () {
        a.fn.appear.timeout && clearTimeout(a.fn.appear.timeout),
          (a.fn.appear.timeout = setTimeout(a.fn.appear.checkAll, 20));
      },
    }),
    a.each(
      [
        "append",
        "prepend",
        "after",
        "before",
        "attr",
        "removeAttr",
        "addClass",
        "removeClass",
        "toggleClass",
        "remove",
        "css",
        "show",
        "hide",
      ],
      function (e, r) {
        var p = a.fn[r];
        p &&
          (a.fn[r] = function () {
            var e = p.apply(this, arguments);
            return a.fn.appear.run(), e;
          });
      }
    );
})(jQuery);
