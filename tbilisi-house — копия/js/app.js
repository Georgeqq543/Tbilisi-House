(function () {
  const ICONS = {
    pin: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>',
    wifi: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a6 6 0 0 1 7 0"/><path d="M12 20h.01"/></svg>',
    coffee: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10h12v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5z"/><path d="M16 11h2a3 3 0 0 1 0 6h-2"/><path d="M8 4v2M12 4v2"/></svg>',
    users: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a3.5 3.5 0 0 1 0 6.8"/></svg>',
    check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  };

  const state = {
    lang: SITE.defaultLang,
    reviewIndex: 0,
    openFaq: 0,
    lastFocus: null,
  };

  function t() {
    return TRANSLATIONS[state.lang] || TRANSLATIONS.en;
  }

  function get(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] != null ? acc[key] : "";
    }, obj);
  }

  function applyI18n() {
    const dict = t();
    document.documentElement.lang = state.lang === "ka" ? "ka" : state.lang;
    document.title = dict.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (desc) desc.setAttribute("content", dict.meta.description);
    if (ogTitle) ogTitle.setAttribute("content", dict.meta.title);
    if (ogDesc) ogDesc.setAttribute("content", dict.meta.description);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const value = get(dict, el.getAttribute("data-i18n"));
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const value = get(dict, el.getAttribute("data-i18n-aria"));
      if (typeof value === "string") el.setAttribute("aria-label", value);
    });

    const title = document.getElementById("hero-title");
    if (title) title.innerHTML = dict.hero.title.replace("\n", "<br />");

    const message = document.getElementById("message-field");
    if (message) message.placeholder = dict.form.messagePlaceholder;
  }

  function setLang(lang) {
    state.lang = TRANSLATIONS[lang] ? lang : "en";
    try {
      localStorage.setItem(SITE.storageKey, state.lang);
    } catch (e) {}
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === state.lang));
    });
    applyI18n();
    renderDynamic();
  }

  function priceLabel(price) {
    return t().rooms.from.replace("{price}", String(price));
  }

  function renderHeroPoints() {
    const list = document.getElementById("hero-points");
    list.innerHTML = t().hero.points
      .map(function (point) {
        return "<li>" + ICONS.pin + "<span>" + point + "</span></li>";
      })
      .join("");
  }

  function renderBenefits() {
    const row = document.getElementById("benefits-row");
    const icons = [ICONS.pin, ICONS.wifi, ICONS.coffee, ICONS.users];
    row.innerHTML = t()
      .benefits.map(function (item, i) {
        return (
          '<article class="benefit">' +
          icons[i] +
          "<strong>" +
          item.title +
          "</strong><p>" +
          item.text +
          "</p></article>"
        );
      })
      .join("");
  }

  function renderRooms() {
    const grid = document.getElementById("rooms-grid");
    const dict = t().rooms;
    grid.innerHTML = ROOMS.map(function (room) {
      const copy = dict.items[room.id];
      const badge = room.popular ? '<span class="badge">' + dict.popular + "</span>" : "";
      const features = [
        dict.guests.replace("{n}", String(room.guests)),
        dict.size.replace("{n}", String(room.size)),
        copy.bed,
        copy.view,
      ];
      return (
        '<article class="room-card">' +
        '<div class="room-photo">' +
        badge +
        '<img src="' +
        room.images[0] +
        '" alt="' +
        copy.name +
        '" loading="lazy" />' +
        "</div>" +
        '<div class="room-body">' +
        "<h3>" +
        copy.name +
        "</h3>" +
        '<p class="price">' +
        priceLabel(room.priceFrom) +
        "</p>" +
        '<ul class="room-meta">' +
        features.map(function (f) { return "<li>" + f + "</li>"; }).join("") +
        "</ul>" +
        "<p>" +
        copy.short +
        "</p>" +
        '<button class="btn btn-ghost dark" type="button" data-open-room="' +
        room.id +
        '">' +
        t().cta.viewDetails +
        "</button>" +
        "</div></article>"
      );
    }).join("");
  }

  function renderWhy() {
    const box = document.getElementById("why-items");
    box.innerHTML = t()
      .why.items.map(function (item, i) {
        return (
          '<div class="why-item"><div class="why-num">0' +
          (i + 1) +
          "</div><div><h3>" +
          item.title +
          "</h3><p class='lede'>" +
          item.text +
          "</p></div></div>"
        );
      })
      .join("");
  }

  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    const alts = t().gallery.alts;
    grid.innerHTML = GALLERY.map(function (item) {
      return (
        '<button class="gallery-item" type="button" data-lightbox="' +
        item.src +
        '"><img src="' +
        item.src +
        '" alt="' +
        alts[item.key] +
        '" loading="lazy" /></button>'
      );
    }).join("");
  }

  function renderLocation() {
    const list = document.getElementById("location-list");
    list.innerHTML = t()
      .location.points.map(function (point) {
        return "<li>" + ICONS.check + "<span>" + point + "</span></li>";
      })
      .join("");
  }

  function renderReview() {
    const card = document.getElementById("review-card");
    const item = t().reviews.items[state.reviewIndex];
    card.innerHTML =
      '<div class="stars" aria-hidden="true">★★★★★</div>' +
      '<p class="review-quote">“' +
      item.quote +
      '”</p>' +
      '<div class="review-person"><div class="avatar" aria-hidden="true">' +
      item.initials +
      "</div><div><strong>" +
      item.name +
      "</strong><div>" +
      item.place +
      "</div></div></div>";
  }

  function renderFaq() {
    const list = document.getElementById("faq-list");
    list.innerHTML = t()
      .faq.items.map(function (item, i) {
        const open = i === state.openFaq;
        return (
          '<div class="faq-item' +
          (open ? " is-open" : "") +
          '">' +
          '<button type="button" aria-expanded="' +
          open +
          '" data-faq="' +
          i +
          '"><span>' +
          item.q +
          '</span><span class="faq-icon" aria-hidden="true">⌄</span></button>' +
          '<div class="faq-panel"><div><p>' +
          item.a +
          "</p></div></div></div>"
        );
      })
      .join("");
  }

  function renderFormExtras() {
    const select = document.getElementById("room-select");
    const current = select.value;
    const dict = t();
    select.innerHTML =
      '<option value="any">' +
      dict.form.anyRoom +
      "</option>" +
      ROOMS.map(function (room) {
        return '<option value="' + room.id + '">' + dict.rooms.items[room.id].name + "</option>";
      }).join("");
    if (current) select.value = current;

    document.getElementById("form-benefits").innerHTML = dict.form.benefits
      .map(function (item) {
        return "<li>" + ICONS.check + "<span>" + item + "</span></li>";
      })
      .join("");
  }

  function bindContactLinks() {
    const wa = SITE.whatsappUrl(t().whatsapp.preset);
    ["cta-whatsapp", "whatsapp-float", "social-wa", "bar-wa"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.href = wa;
    });
    document.getElementById("maps-link").href = SITE.mapsUrl;
    document.getElementById("directions-link").href = SITE.directionsUrl;
    document.getElementById("social-maps").href = SITE.mapsUrl;
    document.getElementById("social-ig").href = SITE.instagramUrl;
    document.getElementById("footer-phone").href = SITE.phoneHref;
    document.getElementById("footer-phone").textContent = SITE.phoneDisplay;
    document.getElementById("bar-call").href = SITE.phoneHref;
    document.getElementById("footer-email").href = "mailto:" + SITE.email;
    document.getElementById("footer-email").textContent = SITE.email;
  }

  function renderDynamic() {
    renderHeroPoints();
    renderBenefits();
    renderRooms();
    renderWhy();
    renderGallery();
    renderLocation();
    renderReview();
    renderFaq();
    renderFormExtras();
    bindContactLinks();
    enhanceImages();
  }

  function enhanceImages() {
    document.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        img.style.display = "none";
      });
    });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    state.lastFocus = document.activeElement;
    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector("[data-close-modal].modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModals() {
    document.querySelectorAll(".modal").forEach(function (modal) {
      modal.classList.remove("is-open");
      modal.hidden = true;
    });
    document.body.style.overflow = "";
    if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
  }

  function openRoom(id) {
    const room = ROOMS.find(function (r) {
      return r.id === id;
    });
    if (!room) return;
    const copy = t().rooms.items[id];
    const body = document.getElementById("room-modal-body");
    body.innerHTML =
      '<h2 id="room-modal-title">' +
      copy.name +
      "</h2>" +
      '<p class="price">' +
      priceLabel(room.priceFrom) +
      "</p>" +
      '<div class="modal-gallery">' +
      room.images
        .map(function (src) {
          return '<img src="' + src + '" alt="' + copy.name + '" />';
        })
        .join("") +
      "</div>" +
      "<p>" +
      copy.long +
      "</p>" +
      "<h3>" +
      (state.lang === "ka" ? "კეთილმოწყობა" : state.lang === "ru" ? "Удобства" : "Amenities") +
      "</h3><ul>" +
      copy.amenities.map(function (a) { return "<li>" + a + "</li>"; }).join("") +
      "</ul><p>" +
      copy.rules +
      '</p><a class="btn btn-primary" href="#booking" data-close-modal>' +
      t().cta.check +
      "</a>";
    openModal("room-modal");
  }

  function setupHeader() {
    const header = document.getElementById("header");
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("mobile-nav");
    const backdrop = document.getElementById("nav-backdrop");

    function closeMenu() {
      nav.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      backdrop.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      nav.classList.add("is-open");
      backdrop.classList.add("is-open");
      backdrop.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
    backdrop.addEventListener("click", closeMenu);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  function setupEvents() {
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });

    document.addEventListener("click", function (event) {
      const roomBtn = event.target.closest("[data-open-room]");
      if (roomBtn) openRoom(roomBtn.getAttribute("data-open-room"));

      const light = event.target.closest("[data-lightbox]");
      if (light) {
        const img = document.getElementById("lightbox-image");
        img.src = light.getAttribute("data-lightbox");
        img.alt = light.querySelector("img").alt || "";
        openModal("lightbox");
      }

      if (event.target.closest("[data-close-modal]")) {
        const isLink = event.target.closest("a[href='#booking']");
        closeModals();
        if (isLink) return;
      }

      const faqBtn = event.target.closest("[data-faq]");
      if (faqBtn) {
        const index = Number(faqBtn.getAttribute("data-faq"));
        state.openFaq = state.openFaq === index ? -1 : index;
        renderFaq();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModals();
        document.getElementById("mobile-nav").classList.remove("is-open");
        document.getElementById("nav-backdrop").classList.remove("is-open");
      }
    });

    document.getElementById("review-prev").addEventListener("click", function () {
      state.reviewIndex = (state.reviewIndex + t().reviews.items.length - 1) % t().reviews.items.length;
      renderReview();
    });
    document.getElementById("review-next").addEventListener("click", function () {
      state.reviewIndex = (state.reviewIndex + 1) % t().reviews.items.length;
      renderReview();
    });

    setupForm();
  }

  function setupForm() {
    const form = document.getElementById("availability-form");
    const fieldsWrap = document.getElementById("form-fields");
    const success = document.getElementById("form-success");
    const submit = document.getElementById("form-submit");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const dict = t().form.errors;
      let valid = true;

      form.querySelectorAll(".field-error").forEach(function (el) {
        el.textContent = "";
      });

      ["checkin", "checkout", "guests", "name", "email", "phone"].forEach(function (name) {
        const value = String(data.get(name) || "").trim();
        if (!value) {
          form.querySelector('[data-error-for="' + name + '"]').textContent = dict.required;
          valid = false;
        }
      });

      const email = String(data.get("email") || "").trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.querySelector('[data-error-for="email"]').textContent = dict.email;
        valid = false;
      }

      const inDate = data.get("checkin");
      const outDate = data.get("checkout");
      if (inDate && outDate && outDate <= inDate) {
        form.querySelector('[data-error-for="checkout"]').textContent = dict.dates;
        valid = false;
      }

      if (!valid) return;

      submit.disabled = true;
      submit.textContent = t().form.sending;
      window.setTimeout(function () {
        fieldsWrap.hidden = true;
        success.hidden = false;
        submit.disabled = false;
        submit.textContent = t().form.submit;
        form.reset();
      }, 850);
    });

    document.getElementById("form-reset").addEventListener("click", function () {
      success.hidden = true;
      fieldsWrap.hidden = false;
    });
  }

  function initLang() {
    var saved = SITE.defaultLang;
    try {
      saved = localStorage.getItem(SITE.storageKey) || SITE.defaultLang;
    } catch (e) {}
    setLang(saved);
  }

  setupHeader();
  setupMenu();
  setupEvents();
  initLang();
})();
