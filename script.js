// Fill in the current year in the footer automatically (runs on every page).
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Homepage logo → name reveal.
// The .logo-name span only exists on the homepage. On the first click anywhere
// ("click away"), add a class that crossfades the CN mark out and the name in.
const logoName = document.querySelector(".logo-name");
if (logoName) {
  // Stop the homepage logo from reloading the page — "home" is already here.
  // Without this, clicking the logo navigates instead of animating.
  const homeLogo = document.querySelector(".logo--home");
  if (homeLogo) {
    homeLogo.addEventListener("click", (e) => e.preventDefault());
  }

  // Toggle only when a link or button is clicked (e.g. the logo) —
  // NOT on stray clicks on empty parts of the page.
  document.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) {
      document.body.classList.toggle("name-revealed");
    }
  });
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
