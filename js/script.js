/* ==========================================================
   RICCARDO MONTANARI PORTFOLIO
   script.js
========================================================== */

/* ==========================================================
   SELECTORS
========================================================== */

const header = document.querySelector(".header");

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

const filterButtons = document.querySelectorAll(".work-filter button");

const projectCards = document.querySelectorAll(".project-card");

const revealElements = document.querySelectorAll(
  ".section-heading, .project-card, #about .container, #contact .container",
);

/* ==========================================================
   HEADER SCROLL
========================================================== */

function handleHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeader);

handleHeader();

/* ==========================================================
   REVEAL ON SCROLL
========================================================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.add("visible");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  observer.observe(element);
});

/* ==========================================================
   FILTER PROJECTS
========================================================== */

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

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;

    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    const offset = 80;

    const position = target.offsetTop - offset;

    window.scrollTo({
      top: position,

      behavior: "smooth",
    });
  });
});

/* ==========================================================
   HERO LINK
========================================================== */

const heroLink = document.querySelector(".hero-link");

if (heroLink) {
  heroLink.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector("#work");

    window.scrollTo({
      top: target.offsetTop - 80,

      behavior: "smooth",
    });
  });
}
