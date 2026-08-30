(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var navToggle = document.getElementById("navToggle");
  var year = document.getElementById("year");

  /* Fixed nav background on scroll */
  function onScroll() {
    if (nav) {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* Auto year */
  if (year) year.textContent = new Date().getFullYear();

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* WhatsApp booking form (progressive enhancement) */
  var bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = document.getElementById("name");
      var serviceEl = document.getElementById("service");
      var dateEl = document.getElementById("date");
      var timeEl = document.getElementById("time");
      var notesEl = document.getElementById("notes");
      var msg = "Hello Shaghaf Gents Salon, I would like to request a booking.";
      msg += nameEl && nameEl.value.trim() ? "\nName: " + nameEl.value.trim() : "";
      msg += serviceEl && serviceEl.value ? "\nService: " + serviceEl.value : "";
      var when = [];
      if (dateEl && dateEl.value.trim()) when.push(dateEl.value.trim());
      if (timeEl && timeEl.value.trim()) when.push(timeEl.value.trim());
      if (when.length) msg += "\nPreferred date/time: " + when.join(" at ");
      if (notesEl && notesEl.value.trim()) msg += "\nNotes: " + notesEl.value.trim();
      var url = "https://wa.me/971521001084?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  }
})();