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

  // POP-UP NAV BAR AFTER TITLE SECTION
  const navbar = document.querySelector(".navbar");
  const hoverArea = document.createElement("div");
  hoverArea.classList.add("navbar-hover-area");
  document.body.appendChild(hoverArea);

  let lastScrollY = window.scrollY;
  let isNavbarVisible = true;
  let hideTimeout;

  function updateNavbarVisibility() {
    const atTop = window.scrollY < window.innerHeight * 0.3; // Detect if user is in "home"

    if (atTop) {
      navbar.classList.remove("hidden"); // Show navbar when on home
    } else {
      navbar.classList.add("hidden"); // Hide navbar when scrolling down
    }
  }

  function hideNavbar() {
    navbar.classList.add("hidden");
  }

  window.addEventListener("scroll", () => {
    updateNavbarVisibility();

    if (window.scrollY > lastScrollY && !navbar.matches(":hover")) {
      hideNavbar();
    } else {
      navbar.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
  });

  hoverArea.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    navbar.classList.remove("hidden");
  });

  hoverArea.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hideNavbar, 100);
  });

  navbar.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
  });

  navbar.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hideNavbar, 500);
  });

  updateNavbarVisibility(); // Ensure navbar state is correct on load

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      //console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(
    ".about-content.hidden, .event-content.hidden"
  );
  if (hiddenElements.length > 0) {
    hiddenElements.forEach((el) => observer.observe(el));
  }

  // PROGRESSION BAR
  const progressBar = document.querySelector(".progress-bar");

  // Update the progress bar height based on scroll
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.height = scrollPercent + "%";
  }

  // Debounce function to optimize performance
  function debounce(func, wait = 10) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Update progress bar on scroll with debounce
  window.addEventListener("scroll", debounce(updateProgressBar, 10));

  // SOCIALS SLIDER
  const sliderContainer = document.querySelector(".socials-slider-container");

  if (sliderContainer) {
    // Center first card on load
    setTimeout(() => {
      const firstCard = document.querySelector(".social-card");
      sliderContainer.scrollLeft =
        firstCard.offsetLeft -
        (sliderContainer.clientWidth / 2 - firstCard.clientWidth / 2);
    }, 100);

    // Add resize handler
    window.addEventListener("resize", () => {
      const activeCard = document.querySelector(".social-card:focus-within");
      if (activeCard) {
        sliderContainer.scrollLeft =
          activeCard.offsetLeft -
          (sliderContainer.clientWidth / 2 - activeCard.clientWidth / 2);
      }
    });

    // Enhanced wheel scroll
    sliderContainer.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const delta = Math.sign(e.deltaY) * sliderContainer.clientWidth * 0.8;
        sliderContainer.scrollBy({
          left: delta,
          behavior: "smooth",
        });
      },
      { passive: false }
    );

    // Enhanced touch handling
    let touchStartX = 0;
    let isScrolling = false;

    sliderContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      isScrolling = true;
    });

    sliderContainer.addEventListener("touchmove", (e) => {
      if (!isScrolling) return;
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      sliderContainer.scrollLeft += diff * 2;
      touchStartX = touchX;
    });

    sliderContainer.addEventListener("touchend", () => {
      isScrolling = false;
      // Snap to nearest card
      const cards = document.querySelectorAll(".social-card");
      const scrollPos =
        sliderContainer.scrollLeft + sliderContainer.clientWidth / 2;

      cards.forEach((card) => {
        const cardPos = card.offsetLeft + card.offsetWidth / 2;
        if (Math.abs(scrollPos - cardPos) < card.offsetWidth / 2) {
          sliderContainer.scrollTo({
            left:
              card.offsetLeft -
              (sliderContainer.clientWidth / 2 - card.offsetWidth / 2),
            behavior: "smooth",
          });
        }
      });
    });
  }
});
