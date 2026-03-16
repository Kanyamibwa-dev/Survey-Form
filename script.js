(function () {
  "use strict";

   const form = document.getElementById("survey-form");

  /* ---- Toast helper ---- */
  function showToast(message) {
    // Remove existing toast if any
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <div class="toast-icon">✓</div>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add("show"));
    });

    // Auto-dismiss
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* ---- Form submit ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = document.getElementById("submit");
    const originalHTML = btn.innerHTML;

    // Button loading state
    btn.disabled = true;
    btn.innerHTML = `<span>Sending…</span>`;

    // Simulate async submission
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      form.reset();

      // Reset custom check/radio visual states handled by CSS :has()
      showToast("Thanks! Your response has been recorded.");

      // Scroll back to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  });

  /* ---- Live email validation feedback ---- */
  const emailInput = document.getElementById("email");

  emailInput.addEventListener("blur", function () {
    if (this.value && !this.validity.valid) {
      this.setCustomValidity("Please enter a valid email address.");
      this.reportValidity();
    } else {
      this.setCustomValidity("");
    }
  });

  emailInput.addEventListener("input", function () {
    this.setCustomValidity("");
  });

  /* ---- Number range hint ---- */
  const numberInput = document.getElementById("number");

  numberInput.addEventListener("blur", function () {
    const val = parseInt(this.value, 10);
    if (this.value !== "" && (isNaN(val) || val < 0 || val > 60)) {
      this.setCustomValidity("Please enter a number between 0 and 60.");
      this.reportValidity();
    } else {
      this.setCustomValidity("");
    }
  });

  numberInput.addEventListener("input", function () {
    this.setCustomValidity("");
  });

  /* ---- Fieldset focus ring enhancement ---- */
  // Already handled via CSS :focus-within, this is for older browser support
  const fieldsets = document.querySelectorAll("fieldset");

  fieldsets.forEach((fs) => {
    const inputs = fs.querySelectorAll("input, select, textarea");
    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => fs.classList.add("active"));
      inp.addEventListener("blur", () => fs.classList.remove("active"));
    });
  });

})();