(() => {
  "use strict";

  const form = document.getElementById("resetPasswordForm");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const confirmPasswordFeedback = document.getElementById(
    "confirmPasswordFeedback"
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Reset custom validation
    confirmPassword.setCustomValidity("");

    // Check if passwords match
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match");
      confirmPasswordFeedback.textContent = "Passwords do not match.";
    } else {
      confirmPassword.setCustomValidity("");
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    

    alert("Password has been reset successfully!");
    form.reset();
    form.classList.remove("was-validated");
  });
})();
