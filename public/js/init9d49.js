var canvas,
  context,
  screenH,
  screenW,
  MetaPortalFilterArray = [],
  MetaPortalFilterCondition = "and";
!(function (t) {
  "use strict";
  var e = !1,
    a = new Date(),
    n = 0,
    o = {
      init: function () {
        o.ready(),
          o.menuCenter(),
          o.imgToSVG(),
          o.BgImg(),
          o.totopFixer(),
          o.slider(),
          o.headerFixer(),
          o.fn_cs_counter(),
          o.video(),
          o.collection(),
          o.contactForm(),
          o.totopScroll(),
          o.seachSomething(),
          o.walletAndLeftNavOpener(),
          o.resizeWalletAndLeftNav(),
          o.headerAnchor(),
          o.isotope(),
          o.qnt(),
          o.countdown(),
          o.hold(),
          o.filterItems(),
          o.applyFilter(),
          o.navSubMenu(),
          o.roadmapSwiper(),
          o.floww(),
          o.accordion(),
          o.hero4Swiper(),
          o.rippleEffect(),
          o.fullSlider();
      },
      fullSlider: function () {
        t(".fn_cs_full_slider .swiper-container").each(function () {
          var e = t(this),
            a = "Y",
            n = "horizontal";
          "horizontal" === n && (a = "X");
          var o = 1;
          t("body").hasClass("rtl") && (o = -1);
          var i = {
            loop: !0,
            speed: 1500,
            autoplay: { delay: 5e3, disableOnInteraction: !1 },
            navigation: {
              nextEl: e.closest(".fn_cs_full_slider").find(".next"),
              prevEl: e.closest(".fn_cs_full_slider").find(".prev"),
            },
            slidesPerView: 1,
            direction: n,
            loopAdditionalSlides: 10,
            watchSlidesProgress: !0,
            on: {
              init: function () {
                this.autoplay.stop();
              },
              imagesReady: function () {
                this.autoplay.start();
              },
              progress: function () {
                for (var e = 0; e < this.slides.length; e++) {
                  var n,
                    i = this.slides[e].progress * (0.5 * this.width) * o;
                  t(this.slides[e])
                    .find(".abs_img")
                    .css({ transform: "translate" + a + "(" + i + "px)" });
                }
              },
              touchStart: function () {
                for (var t = this, e = 0; e < t.slides.length; e++)
                  t.slides[e].style.transition = "";
              },
              setTransition: function (t) {
                for (var e = this, a = 0; a < e.slides.length; a++)
                  (e.slides[a].style.transition = t + "ms"),
                    (e.slides[a].querySelector(".abs_img").style.transition =
                      t + "ms");
              },
            },
          };
          new Swiper(e, i);
        });
      },
      rippleEffect: function () {
        t("#ripple").length &&
          t("#ripple").ripples({
            resolution: 500,
            dropRadius: 20,
            perturbance: 0.04,
          });
      },
      hero4Swiper: function () {
        t(".fn_cs_hero_slider .swiper-container").each(function () {
          var e = t(this);
          new Swiper(e, {
            loop: !0,
            speed: 1e3,
            autoplay: { delay: 3e3, disableOnInteraction: !1 },
            slidesPerView: "auto",
            spaceBetween: 50,
            direction: "horizontal",
            loopAdditionalSlides: 10,
            watchSlidesProgress: !0,
          });
        });
      },
      accordion: function () {
        t(".fn_cs_accordion").each(function () {
          var e = t(this);
          e.find(".active").each(function () {
            t(this).find(".acc_content").slideDown(300);
          }),
            e
              .find(".acc_header")
              .off()
              .on("click", function () {
                var e = t(this).closest(".acc_item");
                return (
                  e.hasClass("active")
                    ? e.removeClass("active").find(".acc_content").slideUp(300)
                    : (e
                        .siblings(".active")
                        .removeClass("active")
                        .find(".acc_content")
                        .slideUp(300),
                      e.addClass("active").find(".acc_content").slideDown(300)),
                  !1
                );
              });
        });
      },
      floww: function () {
        o.BgImg(),
          t(".frenify_cards_gallery").each(function () {
            var e = t(this),
              a = e.find("ul"),
              n = a.children("li");
            if (n.length < 5) return !1;
            o.floww_change_slide(1, e),
              n.on("click", function () {
                var a = t(this).index() + 1;
                o.floww_change_slide(a, e);
              }),
              o.floww_start_autoplay(a, e);
          });
      },
      floww_start_autoplay: function (t, e) {
        var a = null;
        clearInterval(a),
          (a = setInterval(function () {
            var a = t.find(".current").index() + 2;
            o.floww_change_slide(a, e);
          }, 5e3));
      },
      floww_change_slide: function (t, e) {
        var a = e.find("ul").children("li"),
          n = a.length;
        t = (t + n) % n;
        var i = a.eq(t - 1);
        if (!i.hasClass("current")) {
          a.removeClass("current next1 next2 prev1 prev2 next3 prev3"),
            i.addClass("current");
          var r = (t + 1) % n,
            s = (t + 2) % n,
            l = (t + 3) % n,
            c = (t - 1 + n) % n,
            d = (t - 2 + n) % n,
            f = (t - 3 + n) % n;
          a.eq(r - 1).addClass("next1"),
            a.eq(s - 1).addClass("next2"),
            a.eq(c - 1).addClass("prev1"),
            a.eq(d - 1).addClass("prev2"),
            n > 6 &&
              (a.eq(l - 1).addClass("next3"), a.eq(f - 1).addClass("prev3")),
            o.floww_calc_call(e);
        }
      },
      flow_calc: function (t) {
        var e = t.width(),
          a = t.data("initial-width"),
          n = t.data("ratio"),
          o = 20,
          i = (e - (o *= 2)) / 2 > a ? a : (e - o) / 2,
          r = i * n + o,
          s = t.find("ul"),
          l = s.children("li");
        s.height(r + "px"),
          l
            .find(".img_holder img")
            .css({ width: i + "px", height: r - o + "px" }),
          l.css({ width: i + "px", height: r + "px" });
        var c = e / 2 - i / 2,
          d = c + i / 2.5,
          f = d + i / 2.5,
          p = c - i / 2.5;
        l.css({ left: "50%", transform: "scale(0)" }),
          s
            .find(".current")
            .css({
              left: c + "px",
              top: 0,
              transform: "scale(1) translateZ(0) rotate(0)",
            }),
          s
            .find(".next1")
            .css({
              left: d + "px",
              top: "90px",
              transform: "scale(1) translateZ(0) rotate(15deg)",
            }),
          s
            .find(".next2")
            .css({
              left: f + "px",
              top: "240px",
              transform: "scale(1) translateZ(0) rotate(30deg)",
            }),
          s
            .find(".prev1")
            .css({
              left: p + "px",
              top: "90px",
              transform: "scale(1) translateZ(0) rotate(-15deg)",
            }),
          s
            .find(".prev2")
            .css({
              left: p - i / 2.5 + "px",
              top: "240px",
              transform: "scale(1) translateZ(0) rotate(-30deg)",
            }),
          l.length > 6 &&
            (s
              .find(".prev3")
              .css({
                left: p - i / 2.5 + "px",
                top: "360px",
                transform: "scale(1) translateZ(0) rotate(-45deg)",
              }),
            s
              .find(".next3")
              .css({
                left: f + i / 2.5 + "px",
                top: "360px",
                transform: "scale(1) translateZ(0) rotate(45deg)",
              }));
      },
      floww_calc_call: function (e) {
        void 0 === e
          ? t(".frenify_cards_gallery").each(function () {
              (e = t(this)), o.flow_calc(e);
            })
          : o.flow_calc(e);
      },
      roadmapSwiper: function () {
        t(".fn_cs_roadmap .swiper-container").each(function () {
          var e = t(this),
            a = new Swiper(e, {
              loop: !1,
              speed: 1500,
              autoplay: { delay: 5e3, disableOnInteraction: !1 },
              slidesPerView: 4,
              spaceBetween: 40,
              direction: "horizontal",
              loopAdditionalSlides: 10,
              watchSlidesProgress: !0,
              breakpoints: {
                768: { slidesPerView: 1 },
                1040: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 4 },
              },
            }),
            n = 100 / (a.params.loop ? a.slides.length - 2 : a.slides.length),
            i = e.closest(".fn_cs_roadmap").find(".step_in");
          o.roadmapStep(a, i, n),
            a.on("slideChange", function () {
              o.roadmapStep(this, i, n);
            });
        });
      },
      roadmapStep: function (t, e, a) {
        var n,
          o = parseInt(t.currentBreakpoint);
        switch (o) {
          case 1400:
          case 1040:
          default:
            n = 4;
            break;
          case 1200:
            n = 3;
            break;
          case 768:
            n = 1;
        }
        e.css({ width: (t.activeIndex + n) * a + "%" });
      },
      translateVal: function (t) {
        return t.style.transform.match(
          /translate3d\((.+)px,(.+)px,(.+)px\)/
        )[1];
      },
      menuCenter: function () {
        var e = t(".header .trigger_logo"),
          a = t(".header .wallet"),
          n = t(".header .nav"),
          o = 0,
          i = 0;
        e.length && (o = parseInt(e.width())),
          a.length && (i = parseInt(a.width())),
          o < i
            ? n.css({ paddingLeft: i - o + "px" })
            : n.css({ paddingRight: o - i + "px" }),
          n.css({ opacity: 1 });
      },
      navSubMenu: function () {
        t(".metaportal_fn_leftnav .nav_holder a")
          .off()
          .on("click", function () {
            var e = t(this),
              a = e.siblings(".sub-menu"),
              i = t(".metaportal_fn_leftnav .nav_holder .icon").html();
            return a.length
              ? (e.parent().siblings().children("a").removeClass("active"),
                e.addClass("active"),
                n++,
                a.find(">li>.prev").length ||
                  a.prepend(
                    '<li><a href="#" class="prev"><span class="creative_link">' +
                      i +
                      e.text() +
                      "</span></a></li>"
                  ),
                t(".metaportal_fn_leftnav .nav_holder > ul").css({
                  transform: "translateX(-" + 100 * n + "%)",
                }),
                o.previousItems(),
                !1)
              : t(e.attr("href")).length
              ? (t("html, body").animate(
                  { scrollTop: t(e.attr("href")).offset().top },
                  1e3
                ),
                t(
                  ".metaportal_fn_leftnav, .metaportal_fn_leftnav_closer,.metaportal_fn_leftnav .fn__closer"
                ).removeClass("active"),
                !1)
              : void 0;
          });
      },
      previousItems: function () {
        t(".metaportal_fn_leftnav .nav_holder .prev")
          .off()
          .on("click", function () {
            return (
              n--,
              t(".metaportal_fn_leftnav .nav_holder > ul").css({
                transform: "translateX(-" + 100 * n + "%)",
              }),
              !1
            );
          });
      },
      isotopeCollection: function () {
        t(".grid").isotope({ itemSelector: "li", layoutMode: "fitRows" });
      },
      applyFilter: function () {
        o.isotopeCollection(),
          t(".metaportal_fn_filters .checkbox")
            .off()
            .on("click", function () {
              var e = t(this),
                a = e.closest(".metaportal_fn_collection"),
                n = a.find(".metaportal_fn_result_box"),
                i = e.data("id"),
                r = e.data("category"),
                s = e.find(".text").text(),
                l = n.find(".filter_count span");
              if (e.hasClass("selected")) {
                e.removeClass("selected"),
                  a.find('.result_item[data-id="' + i + '"]').remove(),
                  0 === n.find(".result_item").length &&
                    (n.find(".clear_all").remove(),
                    n.find(".condition_trigger").remove(),
                    (MetaPortalFilterCondition = "and")),
                  e.find('input[type="checkbox"]').prop("checked", ""),
                  l.text(parseInt(l.text()) - 1);
                var c = MetaPortalFilterArray.indexOf(i);
                -1 !== c && MetaPortalFilterArray.splice(c, 1);
              } else e.addClass("selected"), 0 === n.find(".result_item").length && n.append('<a href="#" class="clear_all">Clear All</a><a href="#" class="condition_trigger" data-and-text="' + n.data("and-text") + '" data-or-text="' + n.data("or-text") + '"><span class="text">' + n.data("and-text") + '</span><span class="icon"></span></a>'), n.find(".clear_all").before('<div class="result_item" data-id="' + i + '"><a href="#" title="Remove Filter">' + r + ": <span>" + s + '</span><img src="svg/cancel.svg" alt="" class="fn__svg"></a></div>'), e.find('input[type="checkbox"]').prop("checked", "checked"), l.text(parseInt(l.text()) + 1), MetaPortalFilterArray.push(i), o.imgToSVG(), o.removeFilter();
              return o.recallGridAfterFiltering(), !1;
            }),
          o.removeFilter();
      },
      recallGridAfterFiltering: function (e) {
        var a = t(".grid").isotope({
          itemSelector: "li",
          layoutMode: "fitRows",
        });
        if ("clear" === e)
          return (
            a.isotope({ filter: "*" }),
            (MetaPortalFilterArray = []),
            (MetaPortalFilterCondition = "and"),
            !1
          );
        var n = "";
        0 === MetaPortalFilterArray.length
          ? (n = "*")
          : "or" === MetaPortalFilterCondition
          ? (t.each(MetaPortalFilterArray, function (t, e) {
              n += ".id" + e + ",";
            }),
            (n = n.slice(0, -1)))
          : t.each(MetaPortalFilterArray, function (t, e) {
              n += ".id" + e;
            }),
          a.isotope({ filter: n });
      },
      removeFilter: function () {
        t(".metaportal_fn_result_box .result_item a")
          .off()
          .on("click", function () {
            var e = t(this),
              a = e.closest(".metaportal_fn_collection"),
              n = e.closest(".result_item"),
              i = a.find(".metaportal_fn_result_box"),
              r = n.data("id"),
              s = i.find(".filter_count span");
            n.remove(),
              a
                .find('.metaportal_fn_filters .checkbox[data-id="' + r + '"]')
                .removeClass("selected")
                .find('input[type="checkbox"]')
                .prop("checked", ""),
              s.text(parseInt(s.text()) - 1),
              0 === i.find(".result_item").length &&
                (i.find(".clear_all").remove(),
                i.find(".condition_trigger").remove(),
                (MetaPortalFilterCondition = "and"));
            var l = MetaPortalFilterArray.indexOf(r);
            return (
              -1 !== l && MetaPortalFilterArray.splice(l, 1),
              o.recallGridAfterFiltering(),
              !1
            );
          }),
          t(".metaportal_fn_result_box .clear_all")
            .off()
            .on("click", function () {
              var e = t(this),
                a = e.closest(".metaportal_fn_collection"),
                n = a.find(".metaportal_fn_filters"),
                i = a.find(".metaportal_fn_result_box");
              return (
                i.find(".filter_count span").text(0),
                i.find(".result_item").remove(),
                e.remove(),
                i.find(".condition_trigger").remove(),
                n
                  .find(".checkbox")
                  .removeClass("selected")
                  .find('input[type="checkbox"]')
                  .prop("checked", ""),
                o.recallGridAfterFiltering("clear"),
                !1
              );
            }),
          t(".metaportal_fn_result_box .condition_trigger")
            .off()
            .on("click", function () {
              var e = t(this),
                a = e.find(".text");
              return (
                e.hasClass("opened")
                  ? (e.removeClass("opened"),
                    a.fadeOut(function () {
                      a.text(e.data("and-text")), a.fadeIn();
                    }),
                    (MetaPortalFilterCondition = "and"))
                  : (e.addClass("opened"),
                    a.fadeOut(function () {
                      a.text(e.data("or-text")), a.fadeIn();
                    }),
                    (MetaPortalFilterCondition = "or")),
                o.recallGridAfterFiltering(),
                !1
              );
            });
      },
      filterItems: function () {
        t(".metaportal_fn_filters .filter_item.opened").each(function () {
          t(this).find(".filter_item__content").slideDown(300);
        }),
          t(".filter_item__header a")
            .off()
            .on("click", function () {
              var e = t(this).closest(".filter_item");
              return (
                e.hasClass("opened")
                  ? (e.removeClass("opened"),
                    e.find(".filter_item__content").slideUp(300))
                  : (e.addClass("opened"),
                    e.find(".filter_item__content").slideDown(300)),
                !1
              );
            });
      },
      hold: function () {
        var e = t("#social,.metaportal_fn_search");
        t(window).scrollTop() < t(window).height() && e.addClass("hold"),
          t(window).on("scroll", function () {
            t(window).scrollTop() < t(window).height() && e.addClass("hold");
          }),
          (function () {
            var a;
            function n() {
              e.addClass("hold");
            }
            function o() {
              t(window).scrollTop() > t(window).height() &&
                (clearTimeout(a),
                (a = setTimeout(n, 2e3)),
                e.removeClass("hold"));
            }
            (window.onload = o),
              (document.onmousemove = o),
              (document.onkeypress = o);
          })();
      },
      countdown: function () {
        t(".metaportal_fn_countdown").each(function () {
          var e = t(this),
            a = e.data("type");
          if ("due_date" === a) var n = new Date(e.data("date")).getTime();
          else if ("ever" === a)
            var o = 86400 * parseInt(e.data("days")),
              i = 3600 * parseInt(e.data("hours")),
              r = 60 * parseInt(e.data("minutes")),
              s = parseInt(e.data("seconds")),
              l = o + i + r + s;
          var c = e.parent();
          e.hasClass("boxed") &&
            (e.after(
              '<div class="metaportal_fn_boxed_countdown"><ul><li class="days"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Days</span></div></li><li class="hours"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Hours</span></div></li><li class="minutes"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Minutes</span></div></li><li class="seconds"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Seconds</span></div></li></ul></div>'
            ),
            e.remove()),
            "due_date" === a
              ? setInterval(function () {
                  var t = new Date().getTime(),
                    a = e.data("utc"),
                    o = 0;
                  if (void 0 !== a && !1 !== a) {
                    a = 60 * parseFloat(a);
                    var i = -1 * new Date().getTimezoneOffset();
                    o = (a - i) * 6e4;
                  }
                  var r = n - t - o,
                    s = Math.floor(r / 864e5),
                    l = Math.floor((r % 864e5) / 36e5),
                    d = Math.floor((r % 36e5) / 6e4),
                    f = Math.floor((r % 6e4) / 1e3);
                  if (e.hasClass("boxed"))
                    (s = s < 10 ? "0" + s : s),
                      (l = l < 10 ? "0" + l : l),
                      (d = d < 10 ? "0" + d : d),
                      (f = f < 10 ? "0" + f : f),
                      c.find(".days h3").text(s),
                      c.find(".hours h3").text(l),
                      c.find(".minutes h3").text(d),
                      c.find(".seconds h3").text(f);
                  else {
                    var p = "";
                    s > 0 && (p += s + "d: "),
                      (p += l + "h: " + d + "m: " + f + "s"),
                      e.text(p);
                  }
                }, 1e3)
              : "ever" === a &&
                setInterval(function () {
                  if (
                    ((o = Math.floor(l / 86400)),
                    (i = Math.floor((l % 86400) / 3600)),
                    (r = Math.floor((l % 3600) / 60)),
                    (s = Math.floor(l % 60)),
                    e.hasClass("boxed"))
                  )
                    (o = o < 10 ? "0" + o : o),
                      (i = i < 10 ? "0" + i : i),
                      (r = r < 10 ? "0" + r : r),
                      (s = s < 10 ? "0" + s : s),
                      c.find(".days h3").text(o),
                      c.find(".hours h3").text(i),
                      c.find(".minutes h3").text(r),
                      c.find(".seconds h3").text(s);
                  else {
                    var t = "";
                    o > 0 && (t += o + "d: "),
                      (t += i + "h: " + r + "m: " + s + "s"),
                      e.text(t);
                  }
                  l--;
                }, 1e3);
        });
      },
      qnt: function () {
        t(".qnt .decrease")
          .off()
          .on("click", function () {
            var e = t(this).closest(".qnt").find(".summ"),
              a = parseInt(e.text());
            a >= 2 && a--, e.text(a);
            var n = a * e.data("price");
            return e.closest(".mint_list").find(".total_price").html(n), !1;
          }),
          t(".qnt .increase")
            .off()
            .on("click", function () {
              var e = t(this).closest(".qnt").find(".summ"),
                a = parseInt(e.text());
              a++, e.text(a);
              var n = a * e.data("price");
              return e.closest(".mint_list").find(".total_price").html(n), !1;
            });
      },
      isotope: function () {
        t(".fn-isotope").isotope({
          itemSelector: ".isotope-item",
          masonry: {},
        });
      },
      headerAnchor: function () {
        t(".header .nav a,.metaportal_fn_mobnav .mob_bot li a").on(
          "click",
          function () {
            var e = t(this);
            t(e.attr("href")).length &&
              t("html, body").animate(
                { scrollTop: t(e.attr("href")).offset().top },
                1e3
              );
          }
        );
      },
      resizeWalletAndLeftNav: function () {
        var e = t(".metaportal_fn_walletbox").height();
        t(".metaportal_fn_walletbox .walletbox").css({ minHeight: e });
        var a = t(".metaportal_fn_leftnav").height();
        t(".metaportal_fn_leftnav .navbox").css({ minHeight: a });
      },
      ready: function () {
        t(
          ".metaportal_fn_walletbox, .metaportal_fn_wallet_closer, .metaportal_fn_leftnav, .metaportal_fn_leftnav_closer"
        ).removeClass("ready");
      },
      walletAndLeftNavOpener: function () {
        var e = t(".metaportal_fn_walletbox"),
          a = t(
            ".metaportal_fn_wallet_closer,.metaportal_fn_walletbox .fn__closer"
          );
        t(".wallet_opener").on("click", function () {
          return e.addClass("active"), a.addClass("active"), !1;
        }),
          a.on("click", function () {
            return e.removeClass("active"), a.removeClass("active"), !1;
          });
        var n = t(".metaportal_fn_leftnav"),
          o = t(
            ".metaportal_fn_leftnav_closer,.metaportal_fn_leftnav .fn__closer"
          );
        t(".header .trigger,.metaportal_fn_mobnav .social_trigger .trigger").on(
          "click",
          function () {
            return n.addClass("active"), o.addClass("active"), !1;
          }
        ),
          o.on("click", function () {
            return n.removeClass("active"), o.removeClass("active"), !1;
          });
        var i = t(".metaportal_fn_mobnav .mob_mid .trigger"),
          r = t(".metaportal_fn_mobnav .mob_bot");
        i.on("click", function () {
          return (
            i.hasClass("active")
              ? (i.removeClass("active"), r.slideUp(300))
              : (i.addClass("active"), r.slideDown(300)),
            !1
          );
        });
      },
      preloader: function () {
        if (e) return !1;
        e = !0;
        var n = new Date() - a,
          o = 2e3;
        n < o ? (o -= n) : (o = 0),
          setTimeout(function () {
            t(".metaportal_fn_preloader").addClass("ready");
          }, o);
      },
      seachSomething: function () {
        var e = t(".metaportal_fn_search"),
          a = t(".metaportal_fn_searchbox"),
          n = t(".metaportal_fn_search_closer"),
          o = a.find("input"),
          i = a.find("a");
        e.on("click", function () {
          return (
            a.hasClass("active")
              ? (a.removeClass("active"), n.removeClass("active"))
              : (a.addClass("active"),
                n.addClass("active"),
                o.val(""),
                setTimeout(function () {
                  o[0].focus();
                }, 100)),
            !1
          );
        }),
          n.on("click", function () {
            return a.removeClass("active"), n.removeClass("active"), !1;
          }),
          o.on("keypress", function (t) {
            "Enter" === t.key && (t.preventDefault(), i.trigger("click"));
          }),
          i.on("click", function () {
            var e = t(".metaportal_fn_searchbox input").val();
            return (
              window.find(e),
              a.removeClass("active"),
              n.removeClass("active"),
              !1
            );
          });
      },
      totopScroll: function () {
        t(".metaportal_fn_totop")
          .off()
          .on("click", function (e) {
            e.preventDefault();
            var a = (t(window).scrollTop() - t(window).height()) / 2;
            return (
              a < 500 && (a = 500),
              a > 1500 && (a = 1500),
              t("html, body").animate({ scrollTop: 0 }, a),
              !1
            );
          });
      },
      contactForm: function () {
        t(".contact_form #send_message").on("click", function () {
          var e = t(".contact_form #name").val(),
            a = t(".contact_form #email").val(),
            n = t(".contact_form #tel").val(),
            o = t(".contact_form #subject").val(),
            i = t(".contact_form #message").val(),
            r = t(".contact_form .returnmessage").data("success");
          return (
            t(".contact_form .returnmessage").empty(),
            "" === e || "" === a || "" === i
              ? t(".contact_form .empty_notice")
                  .slideDown(500)
                  .delay(2e3)
                  .slideUp(500)
              : t.post(
                  "modal/contact.html",
                  {
                    ajax_name: e,
                    ajax_email: a,
                    ajax_subject: o,
                    ajax_message: i,
                    ajax_tel: n,
                  },
                  function (e) {
                    t(".contact_form .returnmessage").append(e),
                      t(".contact_form .returnmessage span.contact_error")
                        .length
                        ? t(".contact_form .returnmessage")
                            .slideDown(500)
                            .delay(2e3)
                            .slideUp(500)
                        : (t(".contact_form .returnmessage").append(
                            "<span class='contact_success'>" + r + "</span>"
                          ),
                          t(".contact_form .returnmessage")
                            .slideDown(500)
                            .delay(4e3)
                            .slideUp(500)),
                      "" === e && t("#contact_form")[0].reset();
                  }
                ),
            !1
          );
        });
      },
      collection: function () {
        t(".fn_cs_collection").each(function () {
          var e = t(this),
            a = e.find(".item").length;
          setInterval(function () {
            for (
              var t = Math.floor(Math.random() * a),
                n = Math.floor(Math.random() * a);
              n === t;

            )
              n = Math.floor(Math.random() * a);
            var o = e.find(".item").eq(t),
              i = e.find(".item").eq(n),
              r = o.find("input").val(),
              s = i.find("input").val();
            o.addClass("ready"),
              i.addClass("ready"),
              setTimeout(function () {
                o.find("input").val(s),
                  o.find(".abs_img").css({ backgroundImage: "url(" + s + ")" }),
                  i.find("input").val(r),
                  i.find(".abs_img").css({ backgroundImage: "url(" + r + ")" }),
                  o.removeClass("ready"),
                  i.removeClass("ready");
              }, 500);
          }, 2e3);
        });
      },
      video: function () {
        t(".popup-youtube, .popup-vimeo").each(function () {
          t(this).magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: !1,
            fixedContentPos: !1,
          });
        }),
          t(".popup-soundcloud").magnificPopup({
            type: "image",
            gallery: { enabled: !0 },
          });
      },
      fn_cs_counter: function () {
        t(".fn_cs_counter").each(function () {
          var e = t(this);
          e.waypoint({
            handler: function () {
              e.hasClass("stop") ||
                e.addClass("stop").countTo({
                  refreshInterval: 50,
                  formatter: function (t, e) {
                    return t
                      .toFixed(e.decimals)
                      .replace(/\B(?=(?:\d{3})+(?!\d))/g, "");
                  },
                });
            },
            offset: "90%",
          });
        });
      },
      headerFixer: function () {
        var e = t("body"),
          a = t(".header"),
          n = t(window).scrollTop();
        n > 10 ? a.addClass("active") : a.removeClass("active"),
          n > 300 ? e.addClass("totop-active") : e.removeClass("totop-active");
      },
      slider: function () {
        t(".fn_cs_slider").each(function () {
          var e = t(this),
            a = e.find(".slider_top"),
            n = e.find(".slider_content"),
            i = 2,
            r = setInterval(function () {
              i++, (i = o.sliderDo(a, n, i));
            }, 6e3);
          e
            .find(".slider_nav .prev")
            .off()
            .on("click", function () {
              return (
                clearInterval(r),
                i--,
                (i = o.sliderDo(a, n, i)),
                (r = setInterval(function () {
                  i++, (i = o.sliderDo(a, n, i));
                }, 6e3)),
                !1
              );
            }),
            e
              .find(".slider_nav .next")
              .off()
              .on("click", function () {
                return (
                  clearInterval(r),
                  i++,
                  (i = o.sliderDo(a, n, i)),
                  (r = setInterval(function () {
                    i++, (i = o.sliderDo(a, n, i));
                  }, 6e3)),
                  !1
                );
              }),
            e.find(".slider_top li").on("click", function (e) {
              var s = t(this).attr("class");
              if (
                ("next" === s
                  ? (e.stopPropagation(), e.preventDefault(), i++)
                  : "prev" === s &&
                    (e.stopPropagation(), e.preventDefault(), i--),
                "next" === s || "prev" === s)
              )
                return (
                  clearInterval(r),
                  (i = o.sliderDo(a, n, i)),
                  (r = setInterval(function () {
                    i++, (i = o.sliderDo(a, n, i));
                  }, 6e3)),
                  !1
                );
            });
        });
      },
      sliderDo: function (t, e, a) {
        var n = t.find("li").length;
        a > n && (a -= n);
        var o = a - 1,
          i = a - 2,
          r = a + 1,
          s = a + 2;
        return (
          o > n && (o -= n),
          i > n && (i -= n),
          r > n && (r -= n),
          s > n && (s -= n),
          o < 1 && (o += n),
          i < 1 && (i += n),
          a < 1 && (a += n),
          r < 1 && (r += n),
          s < 1 && (s += n),
          t.find("li").removeClass("prev prev2 active next next2"),
          t.find('li[data-index="' + i + '"]').addClass("prev2"),
          t.find('li[data-index="' + o + '"]').addClass("prev"),
          t.find('li[data-index="' + a + '"]').addClass("active"),
          t.find('li[data-index="' + r + '"]').addClass("next"),
          t.find('li[data-index="' + s + '"]').addClass("next2"),
          a
        );
      },
      totopFixer: function () {
        var e = t(".metaportal_fn_totop .totop_inner").width();
        t(".metaportal_fn_totop").css({ height: e + "px" });
      },
      imgToSVG: function () {
        t("img.fn__svg").each(function () {
          var e = t(this),
            a = e.attr("class"),
            n = e.attr("src");
          t.get(
            n,
            function (n) {
              var o = t(n).find("svg");
              void 0 !== a && (o = o.attr("class", a + " replaced-svg")),
                e.replaceWith(o);
            },
            "xml"
          );
        });
      },
      BgImg: function () {
        t("*[data-bg-img]").each(function () {
          var e = t(this),
            a = e.attr("data-bg-img"),
            n = e.data("bg-img");
          void 0 !== a && e.css({ backgroundImage: "url(" + n + ")" });
        });
      },
    };
  t(document).ready(function () {
    o.init(),
      setTimeout(function () {
        o.isotope(), o.isotopeCollection();
      }, 150);
  }),
    t(window).on("resize", function () {
      o.floww_calc_call(),
        o.resizeWalletAndLeftNav(),
        o.totopFixer(),
        o.isotope(),
        o.isotopeCollection(),
        o.roadmapSwiper();
    }),
    t(window).on("load", function () {
      o.preloader(),
        o.isotope(),
        o.isotopeCollection(),
        setTimeout(function () {
          o.isotope(), o.isotopeCollection();
        }, 200);
    }),
    t(window).on("scroll", function () {
      o.headerFixer();
    }),
    window.addEventListener("load", function () {
      o.preloader();
    });
})(jQuery);
var stars = [],
  fps = 50,
  numStars = 2e3;
function FrenifyRunStars() {
  "use strict";
  if (!$("#space").length) return !1;
  (screenH = $(".canvas_bg").outerHeight()),
    (screenW = $(window).outerWidth()),
    (canvas = $("#space")).attr("height", screenH),
    canvas.attr("width", screenW),
    (context = canvas[0].getContext("2d"));
  for (var t = 0; t < numStars; t++) {
    var e = Math.round(Math.random() * screenW),
      a = Math.round(Math.random() * screenH),
      n = 1 + 2 * Math.random(),
      o = Math.random(),
      i = new Star(e, a, n, o);
    stars.push(i);
  }
  setInterval(animate, 1e3 / fps);
}
function animate() {
  "use strict";
  context.clearRect(0, 0, screenW, screenH),
    $.each(stars, function () {
      this.draw(context);
    });
}
function Star(t, e, a, n) {
  "use strict";
  (this.x = parseInt(t)),
    (this.y = parseInt(e)),
    (this.length = parseInt(a)),
    (this.opacity = n),
    (this.factor = 1),
    (this.increment = 0.03 * Math.random());
}
$("document").ready(function () {
  "use strict";
  FrenifyRunStars();
}),
  (Star.prototype.draw = function () {
    "use strict";
    context.rotate((1 * Math.PI) / 10),
      context.save(),
      context.translate(this.x, this.y),
      this.opacity > 1
        ? (this.factor = -1)
        : this.opacity <= 0 &&
          ((this.factor = 1),
          (this.x = Math.round(Math.random() * screenW)),
          (this.y = Math.round(Math.random() * screenH))),
      (this.opacity += this.increment * this.factor),
      context.beginPath();
    for (var t = 5; t--; )
      context.lineTo(0, this.length),
        context.translate(0, this.length),
        context.rotate((2 * Math.PI) / 10),
        context.lineTo(0, -this.length),
        context.translate(0, -this.length),
        context.rotate(-((6 * Math.PI) / 10));
    context.lineTo(0, this.length),
      context.closePath(),
      (context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")"),
      (context.shadowBlur = 5),
      (context.shadowColor = "#ffff33"),
      context.fill(),
      context.restore();
  });
