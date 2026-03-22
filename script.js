/* ============================================================
   Lewis Cooper — Personal Website Scripts
   - Mobile nav toggle
   - Nav shadow on scroll
   - Active nav link highlighting (scroll spy)
   - Dark mode toggle with localStorage persistence
   ============================================================ */

(function () {
  "use strict";

  // --- Mobile navigation toggle ---
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  toggle.addEventListener("click", function () {
    links.classList.toggle("open");
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
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // --- Active nav link highlighting (scroll spy) ---
  var navLinks = document.querySelectorAll(".nav-links a");
  // Build a list of section IDs from the nav links
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1); // remove the #
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: link });
  });

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120; // offset for fixed nav
    var current = null;

    // Find which section is currently in view
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= scrollPos) {
        current = sections[i];
      }
    }

    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });

    if (current) {
      current.link.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // run on load

  // --- Dark mode toggle ---
  var themeToggle = document.getElementById("theme-toggle");
  var root = document.documentElement;

  // Check for saved preference, then system preference
  function getPreferredTheme() {
    var saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }

  // Apply on load
  setTheme(getPreferredTheme());

  themeToggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  });
})();
