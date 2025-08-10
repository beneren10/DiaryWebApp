// Fill copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// Basic client-side validation + simulated submit
const form = document.getElementById("resetForm");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const btnSpinner = document.getElementById("btnSpinner");
const btnText = document.getElementById("btnText");
const alertPlaceholder = document.getElementById("alertPlaceholder");

function showAlert(message, type = "success") {
  alertPlaceholder.innerHTML = `\
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">\
          ${message}\
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
        </div>`;
}

function setLoading(loading) {
  if (loading) {
    submitBtn.disabled = true;
    btnSpinner.classList.remove("d-none");
    btnText.textContent = "Sending...";
  } else {
    submitBtn.disabled = false;
    btnSpinner.classList.add("d-none");
    btnText.textContent = "Send reset link";
  }
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  // Reset existing validation state
  form.classList.remove("was-validated");
  alertPlaceholder.innerHTML = "";

  // HTML5 validation check
  if (!email.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // At this point email is present and valid
  setLoading(true);

  // Simulate network request — replace with real fetch to your API
  setTimeout(() => {
    setLoading(false);
    sendEmail()

    showAlert(
      "If an account with that email exists, we've sent a password reset link.",
      "success"
    );
    // Optionally clear the form
    form.reset();
  }, 1400);
});

// Accessibility: focus the email field on load
window.addEventListener("load", () => email.focus());

// postFunction
async function sendEmail() {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
    }),
  };
  const response = await fetch(
    `https://my-nodejs-appservice.azurewebsites.net/users/reset-password-request`,
    options
  );
  const data = await response.json();
  if (response.status == 201) {
    console.log('success');
  } else {
    alert(data.error);
  }
}