/* ============================================================
   Lewis Cooper — Personal Website Scripts
   Minimal JS: mobile nav toggle + scroll shadow on nav
   ============================================================ */

(function () {
  "use strict";

  // --- Mobile navigation toggle ---
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", function () {
    links.classList.toggle("open");
    // Animate hamburger → X
    toggle.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.classList.remove("active");
    });
  });

  // --- Nav shadow on scroll ---
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
})();
