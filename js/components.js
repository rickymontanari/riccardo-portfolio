/* ==========================================================
   COMPONENT LOADER
========================================================== */

async function loadComponent(selector, file) {
  const element = document.querySelector(selector);

  if (!element) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Cannot load ${file}`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  const isProjectPage = window.location.pathname.includes("/work/");

  if (isProjectPage) {
    await loadComponent("#header", "../components/header-project.html");

    await loadComponent("#footer", "../components/footer.html");
  } else {
    await loadComponent("#header", "components/header-home.html");

    await loadComponent("#footer", "components/footer.html");
  }

  if (typeof initPortfolio === "function") {
    initPortfolio();
  }
});
