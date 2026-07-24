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
