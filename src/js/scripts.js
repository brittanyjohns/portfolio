/*!
 * Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
//
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  const navbarToggler = document.body.querySelector(".navbar-toggler");

  const sideNav = document.body.querySelector("#navbarResponsivex");
  navbarToggler.addEventListener("click", () => {
    if (sideNav.classList.contains("show")) {
      sideNav.classList.add("hide");
      sideNav.classList.remove("show");
    } else if (sideNav.classList.contains("hide")) {
      sideNav.classList.add("show");
      sideNav.classList.remove("hide");
    } else {
      sideNav.classList.add("show");
      sideNav.classList.remove("hide");
    }
  });
  // DOM is loaded and ready for manipulation here
});
window.addEventListener("DOMContentLoaded", (event) => {
  // Activate Bootstrap scrollspy on the main nav element
  const sideNav = document.body.querySelector("#sideNav");
  if (sideNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#sideNav",
      offset: 74,
    });
  }
});
