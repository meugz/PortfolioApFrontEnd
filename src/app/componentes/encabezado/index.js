
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarNav = document.querySelector(".navbar-nav");

navbarToggler.addEventListener("click", () => {
  navbarNav.classList.toggle(".navbar-nav_visible");

  if (navbarNav.classList.contains(".navbar-nav_visible")) {
    navbarToggler.setAttribute("aria-label", "Cerrar Menu");
  } else {
    navbarToggler.setAttribute("aria-label", "Toggle navigation");
  }
});