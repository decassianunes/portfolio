// If the hero fly animation just delivered the name to the header on the previous page,
// skip the CSS arrival animation here so the name doesn't visually reload.
(function () {
  if (sessionStorage.getItem('logoNameArrived')) {
    sessionStorage.removeItem('logoNameArrived');
    var el = document.querySelector('.logo-name');
    if (el) el.style.animation = 'none';
  }
}());

// Mobile hamburger menu — toggles .nav-open on the header.
const navToggle = document.querySelector(".nav-toggle");
const siteHeader = document.querySelector(".site-header");
if (navToggle && siteHeader) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();   // prevent the document click-outside handler from firing on this same click
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  // Close the menu when any nav link is tapped (so the page navigates cleanly).
  siteHeader.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
  // Close when clicking outside the header.
  document.addEventListener("click", (e) => {
    if (!siteHeader.contains(e.target)) {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

// Homepage: when a nav link or "View work" is clicked, animate the hero name
// flying up into the header logo spot, then navigate to the new page.
// On inner pages the header name already has a CSS slide-in on page load,
// giving the impression it arrived from the hero.
(function initHeroNameFly() {
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;  // only runs on the homepage

  const links = document.querySelectorAll('.nav a, .hero-link');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var href = link.href;

      var fromRect = heroName.getBoundingClientRect();
      var logoEl   = document.querySelector('.logo');
      var toRect   = logoEl.getBoundingClientRect();
      var fromSize = parseFloat(getComputedStyle(heroName).fontSize);
      var toSize   = 18;
      var scale    = toSize / fromSize;

      // Build a lightweight clone pinned to the hero name's screen position.
      var fly = document.createElement('span');
      fly.textContent = heroName.textContent.trim();
      fly.style.cssText = [
        'position:fixed',
        'left:'         + fromRect.left + 'px',
        'top:'          + fromRect.top  + 'px',
        'font-size:'    + fromSize + 'px',
        'font-weight:700',
        'font-family:inherit',
        'color:var(--red)',
        'line-height:1',
        'white-space:nowrap',
        'pointer-events:none',
        'z-index:9999',
        'transform-origin:left top',
        'transform:translate(0,0) scale(1)',
        'will-change:transform,opacity',
      ].join(';');
      document.body.appendChild(fly);

      // Hide the original so there's no double.
      heroName.style.visibility = 'hidden';

      // Vertical target: centre the shrunken text in the logo link's height.
      var targetTop = toRect.top + (toRect.height - fromSize * scale) / 2;
      var dx = toRect.left - fromRect.left;
      var dy = targetTop   - fromRect.top;

      // Two rAF calls let the browser render the start state before animating.
      // Using transform (not left/top) keeps the animation on the GPU — no jank.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var ease = '0.42s cubic-bezier(0.4,0,0.2,1)';
          fly.style.transition = 'transform ' + ease + ', color ' + ease + ', opacity 0.15s linear 0.27s';
          fly.style.transform  = 'translate(' + dx + 'px,' + dy + 'px) scale(' + scale + ')';
          fly.style.color      = '#111111';
          fly.style.opacity    = '0';
        });
      });

      // Navigate once the animation is done. Flag tells the destination page
      // to skip its own logo arrival animation — the name already "arrived" via the fly.
      setTimeout(function () {
        sessionStorage.setItem('logoNameArrived', '1');
        window.location.href = href;
      }, 460);
    });
  });
})();

// Fill in the current year in the footer automatically (runs on every page).
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Copy-email button — only exists on the Contact page, so check it's here first.
const copyBtn = document.getElementById("copy-email");
const feedback = document.getElementById("copy-feedback");

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;          // reads data-email from the button
    try {
      await navigator.clipboard.writeText(email);  // copies to clipboard
      feedback.textContent = "Copied " + email + " to your clipboard ✓";
    } catch (err) {
      // If the browser blocks clipboard access, show the address so it can be copied by hand.
      feedback.textContent = "Couldn't auto-copy. Email: " + email;
    }
  });
}
