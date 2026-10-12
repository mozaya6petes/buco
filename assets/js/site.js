/* BUCO — site.js · no dependencies, no cookies, no storage, no tracking. */
(function () {
  "use strict";
  var C = window.BUCO_CONFIG || { links: {}, reservationForm: {} };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var go = function (el) { el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); };

  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- links from config (null = hidden) ---------- */
  $$("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var url = C.links && C.links[key];
    var li = el.parentElement && el.parentElement.tagName === "LI" ? el.parentElement : null;
    if (key === "reserve") {
      if (url) { el.href = url; if (/^https?:/.test(url)) { el.target = "_blank"; el.rel = "noopener"; } }
      else if (el.getAttribute("data-reserve-fallback") === "tel") {
        el.href = "#reserve-form";
        el.addEventListener("click", function (e) {
          var form = $("[data-form-wrap]");
          if (form && !form.hidden) { e.preventDefault(); go(form); var f = $("#f-name"); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, reduce ? 0 : 700); }
          else { el.href = (C.business && C.business.phoneHref) || "tel:+9613843474"; }
        });
      }
      return;
    }
    if (url) { el.href = url; el.hidden = false; if (li) li.hidden = false; }
    else { el.hidden = true; if (li) li.hidden = true; }
  });

  /* ---------- header: visible at the top and when scrolling up; hidden when scrolling down ---------- */
  var nav = $("[data-nav]");
  var hero = $(".hero");
  var lastY = window.scrollY, acc = 0;
  function setNav(show) {
    nav.classList.toggle("is-away", !show);
    root.classList.toggle("nav-shown", show && window.scrollY > 40);
  }
  function onScroll() {
    if (!nav || root.classList.contains("menu-open")) return;
    var y = Math.max(0, window.scrollY);
    var dy = y - lastY;
    lastY = y;
    var heroH = hero ? hero.offsetHeight : 0;
    nav.classList.toggle("is-solid", y > heroH - 70);
    if (y < 40) { setNav(true); acc = 0; return; }
    // small dead-zone so tiny finger jitters don't flicker the header
    acc = (dy > 0) === (acc > 0) ? acc + dy : dy;
    if (acc > 12) setNav(false);
    else if (acc < -12) setNav(true);
  }
  if (nav) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    nav.addEventListener("focusin", function () { setNav(true); });
  }

  /* ---------- mobile menu ---------- */
  var toggle = $("[data-menu-toggle]");
  var menu = $("[data-menu]");
  var label = toggle && $(".nav__toggle-label", toggle);
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Close" : "Menu";
    root.classList.toggle("menu-open", open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add("is-open"); });
      var first = $("a", menu); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
    } else {
      menu.classList.remove("is-open");
      setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, reduce ? 0 : 650);
    }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); setTimeout(function () { setNav(false); }, 50); });
    });
    document.addEventListener("keydown", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (e.key === "Escape") { setMenu(false); toggle.focus(); }
      if (e.key === "Tab") {
        var items = [toggle].concat($$("a", menu));
        var i = items.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1000 && toggle.getAttribute("aria-expanded") === "true") setMenu(false); });
  }

  /* ---------- reveals ---------- */
  var targets = $$(".reveal-line, .reveal, .reveal-fade, .reveal-img");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("in"); });
    if (hero) hero.classList.add("in");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting || en.boundingClientRect.bottom < 0) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });
    targets.forEach(function (t) {
      var sib = t.parentElement ? $$(":scope > .reveal-line", t.parentElement) : [];
      var idx = sib.indexOf(t);
      if (idx > 0 && !t.closest(".hero") && t.firstElementChild) t.firstElementChild.style.transitionDelay = (idx * 0.08) + "s";
      io.observe(t);
    });
    requestAnimationFrame(function () { if (hero) hero.classList.add("in"); });
  }

  /* ---------- burger carousel ---------- */
  var track = $("[data-track]");
  if (track) {
    var cards = $$(".dish", track);
    var now = $("[data-track-now]"), bar = $("[data-track-bar]");
    var prev = $("[data-track-prev]"), next = $("[data-track-next]");
    var current = function () {
      var best = 0, min = Infinity, left = track.getBoundingClientRect().left;
      cards.forEach(function (c, i) { var d = Math.abs(c.getBoundingClientRect().left - left - 20); if (d < min) { min = d; best = i; } });
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = cards.length - 1;
      return best;
    };
    var update = function () {
      var i = current();
      if (now) now.textContent = ("0" + (i + 1)).slice(-2);
      if (bar) bar.style.transform = "translateX(" + (i * 100) + "%)";
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === cards.length - 1;
    };
    var to = function (i) {
      i = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({ left: cards[i].offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduce ? "auto" : "smooth" });
    };
    var t; track.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(update, 60); }, { passive: true });
    if (prev) prev.addEventListener("click", function () { to(current() - 1); });
    if (next) next.addEventListener("click", function () { to(current() + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); to(current() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); to(current() - 1); }
    });
    /* on very wide screens all cards fit, so there is nothing to scroll: hide the controls */
    var ui = $(".track__ui");
    var fit = function () { if (ui) ui.style.display = track.scrollWidth <= track.clientWidth + 4 ? "none" : ""; };
    window.addEventListener("resize", fit);
    fit();
    update();
  }

  /* ---------- menu tabs ---------- */
  var tabs = $$('.tabs [role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) { if (on) panel.removeAttribute("data-inactive"); else panel.setAttribute("data-inactive", ""); }
    });
    if (focus) tab.focus();
  }
  if (tabs.length) {
    selectTab(tabs[0], false);
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        selectTab(t, false);
        var menuTop = $("#menu .tabs");
        if (menuTop && menuTop.getBoundingClientRect().top < 0) go($("#menu-title"));
      });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); selectTab(n, true); }
      });
    });
    $$("[data-open-tab]").forEach(function (a) {
      a.addEventListener("click", function () {
        var t = document.getElementById("tab-" + a.getAttribute("data-open-tab"));
        if (t) selectTab(t, false);
      });
    });
  }

  /* ---------- cocktails: desktop image follows hovered drink ---------- */
  var items = $$("[data-co-item]");
  var pics = $$("[data-co]");
  items.forEach(function (it) {
    it.addEventListener("mouseenter", function () {
      var i = it.getAttribute("data-co-item");
      items.forEach(function (x) { x.classList.toggle("is-active", x === it); });
      pics.forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-co") === i); });
    });
  });

  /* ---------- reservation form ---------- */
  var wrap = $("[data-form-wrap]");
  var form = $("[data-form]");
  if (wrap) wrap.id = "reserve-form";
  if (wrap && C.reservationForm && C.reservationForm.enabled === false) wrap.hidden = true;
  if (form) {
    var status = $("[data-status]", form);
    var phone = (C.business && C.business.phoneDisplay) || "+961 3 843 474";
    var phoneHref = (C.business && C.business.phoneHref) || "tel:+9613843474";
    var dateEl = $("#f-date", form);
    var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    if (dateEl) dateEl.min = today.toISOString().slice(0, 10);
    var messages = {
      name: "Please enter your name.",
      phone: "Please enter a phone number we can reach you on.",
      date: "Please choose a date (today or later).",
      time: "Please choose a time.",
      guests: "Please choose how many guests.",
      consent: "Please tick the box so we can use your details for this request."
    };
    /* opening hours: requests are only accepted while BUCO is open */
    var B = C.business || {};
    var opens = B.opens || "12:30", lastReq = B.lastRequest || "23:30";
    var fmt = function (t) {
      var h = +t.slice(0, 2), m = t.slice(3, 5);
      return (h % 12 || 12) + ":" + m + " " + (h < 12 ? "AM" : "PM");
    };
    var timeEl = $("#f-time", form), timeHint = $("[data-time-hint]", form);
    if (timeEl) { timeEl.min = opens; timeEl.max = lastReq; }
    if (timeHint) timeHint.textContent = "We take requests daily from " + fmt(opens) + " to " + fmt(lastReq) + ". We close at 12:00 AM.";
    var localNow = function () { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString(); };
    var validate = function (el) {
      var errEl = document.getElementById(el.id + "-err");
      var ok = el.checkValidity();
      var msg = messages[el.name] || "Please check this field.";
      if (ok && el.name === "phone") ok = /[0-9]{6,}/.test(el.value.replace(/[\s()+-]/g, ""));
      if (el.name === "time" && el.value) {
        if (el.value < opens || el.value > lastReq) {
          ok = false; msg = "We’re closed at that time. Please choose a time between " + fmt(opens) + " and " + fmt(lastReq) + ".";
        } else if (dateEl && dateEl.value === localNow().slice(0, 10) && el.value <= localNow().slice(11, 16)) {
          ok = false; msg = "That time has already passed today. Please choose a later time.";
        }
      }
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (errEl) errEl.textContent = ok ? "" : msg;
      return ok;
    };
    if (dateEl && timeEl) dateEl.addEventListener("change", function () { if (timeEl.value) validate(timeEl); });
    var required = $$("[required]", form);
    required.forEach(function (el) {
      el.addEventListener("blur", function () { if (el.value) validate(el); });
      el.addEventListener("change", function () { if (el.getAttribute("aria-invalid") === "true") validate(el); });
    });
    var say = function (html) { status.innerHTML = html; status.setAttribute("tabindex", "-1"); status.focus(); };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      var firstBad = null;
      required.forEach(function (el) { if (!validate(el) && !firstBad) firstBad = el; });
      if (firstBad) { firstBad.focus(); status.textContent = "Please fix the highlighted fields."; return; }
      if (form.company && form.company.value) return;
      var endpoint = C.reservationForm && C.reservationForm.endpoint;
      if (!endpoint) { say("Online requests aren’t switched on yet, so nothing was sent. Please call us on <a href=\"" + phoneHref + "\">" + phone + "</a> to book."); return; }
      var btn = $("button[type=submit]", form);
      btn.disabled = true; btn.textContent = "Sending…";
      var data = {
        name: form.name.value.trim(), phone: form.phone.value.trim(), date: form.date.value,
        time: form.time.value, guests: form.guests.value, note: form.note.value.trim(),
        consent: true, consentText: $("label[for=f-consent]", form).textContent.replace(/\s*\*\s*$/, "").trim(),
        consentAt: new Date().toISOString()
      };
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); })
        .then(function () {
          form.reset(); required.forEach(function (el) { el.removeAttribute("aria-invalid"); });
          say("Thanks — request received. We’ll call or message you to confirm. Your table isn’t booked until we do.");
        })
        .catch(function () { say("Sorry, that didn’t go through. Please call us on <a href=\"" + phoneHref + "\">" + phone + "</a>."); })
        .then(function () { btn.disabled = false; btn.textContent = "Send reservation request"; });
    });
  }
})();
