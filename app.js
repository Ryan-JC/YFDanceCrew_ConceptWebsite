document.addEventListener("DOMContentLoaded", function () {
  console.log("School Dance Club website loaded successfully!");


  // SHORTCUTS
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // SCROLL BUTTON
  const scrollIndicator = document.getElementById("scrollIndicator");
  scrollIndicator.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  });


  // POP-UP NAV BAR AFTER TITLE SECTION
  const navbar = document.querySelector(".navbar");
  const hoverArea = document.createElement("div");
  hoverArea.classList.add("navbar-hover-area");
  document.body.appendChild(hoverArea);

  let lastScrollY = window.scrollY;
  let isNavbarVisible = false;
  let hideTimeout;

  function hideNavbar() {
    if (window.scrollY > window.innerHeight / 2) {
      navbar.classList.add("hidden");
      isNavbarVisible = false;
    }
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && !navbar.matches(":hover")) {
      hideNavbar();
    } else {
      navbar.classList.remove("hidden");
      isNavbarVisible = true;
    }
    lastScrollY = window.scrollY;
  });

  hoverArea.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout); // Prevent quick hiding
    navbar.classList.remove("hidden");
    isNavbarVisible = true;
  });

  hoverArea.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hideNavbar, 100); // Adds delay before hiding
  });

  navbar.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout); // Ensure it stays visible when hovered
  });

  navbar.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hideNavbar, 500);
  });

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.about-content.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
});
