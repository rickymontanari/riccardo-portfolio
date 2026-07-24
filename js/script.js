/* ==========================================================
   RICCARDO MONTANARI PORTFOLIO
   script.js
========================================================== */

/* ==========================================================
   GLOBAL VARIABLES
========================================================== */

let header;
let sections;
let navLinks;
let filterButtons;
let projectCards;
let revealElements;
let heroLink;

/* ==========================================================
   INITIALIZE SELECTORS
========================================================== */

function initSelectors() {
  header = document.querySelector(".header");

  sections = document.querySelectorAll("section");

  navLinks = document.querySelectorAll(".nav-links a");

  filterButtons = document.querySelectorAll(".work-filter button");

  projectCards = document.querySelectorAll(".project-card");

  revealElements = document.querySelectorAll(
    ".section-heading, .project-card, #about .container, #contact .container",
  );

  heroLink = document.querySelector(".hero-link");
}

/* ==========================================================
   HEADER SCROLL
========================================================== */

function handleHeader() {
  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

/* ==========================================================
   REVEAL ON SCROLL
========================================================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");
      entry.target.classList.add("visible");
    });
  },
  {
    threshold: 0.15,
  },
);

function initReveal() {
  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* ==========================================================
   FILTER PROJECTS
========================================================== */

function initFilters() {
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "flex";
          return;
        }

        if (card.classList.contains(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}
/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function updateActiveNavigation() {
  if (!sections.length || !navLinks.length) return;

  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;

    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === "#" + current) {
      link.classList.add("active");
    }
  });
}

function initActiveNavigation() {
  window.addEventListener("scroll", updateActiveNavigation);

  updateActiveNavigation();
}

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initSmoothScroll() {
  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });
}

/* ==========================================================
   HERO LINK
========================================================== */

function initHeroLink() {
  if (!heroLink) return;

  heroLink.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector("#work");

    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
}

/* ==========================================================
   INITIALIZATION
========================================================== */

function initPortfolio() {
  initSelectors();

  handleHeader();

  window.addEventListener("scroll", handleHeader);

  initReveal();

  initFilters();

  initActiveNavigation();

  initSmoothScroll();

  initHeroLink();
}
