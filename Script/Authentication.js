import { login, signUp, forgetPassword } from "./auth.js";

const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwField = document.querySelectorAll(".password");

function validateForm() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (!email.value) {
    alert("Please fill out the email field.");
    email.focus();
    return false;
  }

  if (!password.value) {
    alert("Please fill out the password field.");
    password.focus();
    return false;
  }

  // If everything is filled out correctly, submit the form.
  login(email.value, password.value);
}

function validateSignupForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("logCheck");

  if (!name.value) {
    alert("Please fill out the name field.");
    name.focus();
    return false;
  }

  if (!email.value) {
    alert("Please fill out the email field.");
    email.focus();
    return false;
  }

  if (!password.value) {
    alert("Please fill out the password field.");
    password.focus();
    return false;
  }

  if (!confirmPassword.value) {
    alert("Please confirm your password.");
    confirmPassword.focus();
    return false;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    confirmPassword.focus();
    return false;
  }

  if (!terms.checked) {
    alert("You must accept the terms and conditions.");
    terms.focus();
    return false;
  }

  // If everything is filled out correctly, submit the form.
  signUp(name.value, email.value, password.value);
}
function validatePasswordResetForm() {
  const email = document.getElementById("email");
  if (!email.value) {
    alert("Please fill out the email field.");
    email.focus();
    return false;
  }
  forgetPassword(email.value);
}

// show/hide password

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwField.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const resetBtn = document.getElementById("reset-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    validateForm();
  });
}
if (signupBtn) {
  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    validateSignupForm();
  });
}
if (resetBtn) {
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    validatePasswordResetForm();
  });
}
