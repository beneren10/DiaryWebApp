const { URLSearchParams } = require("url");

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

    api_call_reset()
    

    alert("Password has been reset successfully!");
    form.reset();
    form.classList.remove("was-validated");
  });

  async function api_call_reset() {

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        newPassword: confirmPassword.value
      })
    }
    const response = await fetch(`https://my-nodejs-appservice.azurewebsites.net/users/reset-password-reset`, options);
    const data = await response.json();
    if (response.status == 201) {
      window.location.assign("login.html")
    } else {
      alert(data.error)
    }
  }

})();

