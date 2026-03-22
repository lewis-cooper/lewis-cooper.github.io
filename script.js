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
  // Use IntersectionObserver for reliable section detection
  var navLinks = document.querySelectorAll(".nav-links a");
  var navLinkMap = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    navLinkMap[id] = link;
  });

  // Collect all sections/targets that nav links point to
  var sectionIds = Object.keys(navLinkMap);
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Remove active from all links
          navLinks.forEach(function (link) {
            link.classList.remove("active");
          });
          // Find which section this target belongs to
          // Walk up the DOM to find the closest element with an id in our list
          var target = entry.target;
          var id = target.id;
          if (navLinkMap[id]) {
            navLinkMap[id].classList.add("active");
          }
        }
      });
    },
    {
      // Trigger when a section crosses 20% from the top of the viewport
      rootMargin: "-20% 0px -75% 0px"
    }
  );

  sectionIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // --- Dark mode toggle ---
  var themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  var root = document.documentElement;

  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem("theme");
      if (saved) return saved;
    } catch (e) {
      // localStorage not available
    }
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
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // localStorage not available
    }
  }

  // Apply on load
  setTheme(getPreferredTheme());

  themeToggle.addEventListener("click", function () {
    var isDark = root.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "light" : "dark");
  });
})();
