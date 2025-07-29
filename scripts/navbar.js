 function fade(element, duration, fadeIn = true) {
    let opacity = fadeIn ? 0 : 1;
    const start = performance.now();

    element.style.display = 'block';

    function animate(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.opacity = fadeIn ? progress : 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (!fadeIn) {
        element.style.display = 'none';
      }
    }

    requestAnimationFrame(animate);
  }

  function fadeIn(elementId, duration) {
    const el = document.getElementById(elementId);
    if (el) fade(el, duration, true);
  }

  function fadeOut(elementId, duration) {
    const el = document.getElementById(elementId);
    if (el) fade(el, duration, false);
  }

  // Scroll logic
  let prevScrollPos = window.pageYOffset;
  let navbarVisible = true; // Track current state

  window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    if (prevScrollPos > currentScrollPos) {
      // Scrolling up
      if (!navbarVisible) {
        fadeIn('navbar', 300);
        navbarVisible = true;
      }
    } else {
      // Scrolling down
      if (navbarVisible) {
        fadeOut('navbar', 300);
        navbarVisible = false;
      }
    }

    prevScrollPos = currentScrollPos;
  });
