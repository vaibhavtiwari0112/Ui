document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const registerModal = document.getElementById("registerModal");
  const copyMessage = document.getElementById("copyMessage");

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearErrors() {
    document
      .querySelectorAll("p.text-red-500")
      .forEach((p) => (p.textContent = ""));
  }

  function validateField(input, errorId, validationFn, errorMsg) {
    input.addEventListener("input", () => {
      if (validationFn(input.value.trim())) {
        showError(errorId, "");
      } else {
        showError(errorId, errorMsg);
      }
    });
  }

  if (registerForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const addressInput = document.getElementById("address");
    const contactInput = document.getElementById("contact");

    validateField(
      nameInput,
      "nameError",
      (val) => val.length > 0,
      "Name is required"
    );
    validateField(
      emailInput,
      "emailError",
      (val) => val.includes("@") && val.includes("."),
      "Enter a valid email"
    );
    validateField(
      passwordInput,
      "passwordError",
      (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          val
        ),
      "Password must have uppercase, lowercase, number, special character"
    );
    validateField(
      addressInput,
      "addressError",
      (val) => val.length > 0,
      "Address is required"
    );
    validateField(
      contactInput,
      "contactError",
      (val) => /^[0-9]{10}$/.test(val),
      "Enter a valid 10-digit contact number"
    );

    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      if (
        !nameInput.value.trim() ||
        !emailInput.value.trim() ||
        !passwordInput.value.trim() ||
        !addressInput.value.trim() ||
        !contactInput.value.trim()
      ) {
        return;
      }

      if (localStorage.getItem(emailInput.value)) {
        showError("emailError", "Email already exists");
        return;
      }

      const userId = "CUST" + Math.floor(Math.random() * 10000);
      localStorage.setItem(
        emailInput.value,
        JSON.stringify({
          userId,
          email: emailInput.value,
          password: passwordInput.value,
        })
      );
      document.getElementById("customerIdDisplay").textContent = userId;
      registerModal.classList.remove("hidden");

      setTimeout(() => {
        registerModal.classList.add("hidden");
        window.location.href = "login.html";
      }, 5000);
    });
  }

  document.getElementById("closeModal").addEventListener("click", () => {
    registerModal.classList.add("hidden");
    window.location.href = "login.html";
  });

  document.getElementById("copyId").addEventListener("click", () => {
    navigator.clipboard.writeText(
      document.getElementById("customerIdDisplay").textContent
    );
    copyMessage.classList.remove("hidden");
    setTimeout(() => {
      copyMessage.classList.add("hidden");
    }, 2000);
  });
});
