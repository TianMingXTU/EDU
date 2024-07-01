document
  .getElementById("register-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById(
      "confirm-password-error"
    );

    let valid = true;

    if (password.length < 6) {
      passwordError.style.display = "block";
      document.getElementById("password").classList.add("input-error");
      valid = false;
    } else {
      passwordError.style.display = "none";
      document.getElementById("password").classList.remove("input-error");
    }

    if (password !== confirmPassword) {
      confirmPasswordError.style.display = "block";
      document.getElementById("confirm-password").classList.add("input-error");
      valid = false;
    } else {
      confirmPasswordError.style.display = "none";
      document
        .getElementById("confirm-password")
        .classList.remove("input-error");
    }

    if (valid) {
      const formData = {
        name: document.getElementById("name").value,
        university: document.getElementById("university").value,
        college: document.getElementById("college").value,
        major: document.getElementById("major").value,
        class_id: parseInt(document.getElementById("class").value),
        student_number: document.getElementById("student-id").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value,
        password: document.getElementById("password").value,
      };

      try {
        const response = await fetch("http://localhost:8000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Registration successful! 🎉");
          window.location.href = "login.html";
        } else {
          const errorData = await response.json();
          alert("Registration failed: " + errorData.detail);
        }
      } catch (error) {
        alert("An error occurred during registration. Please try again later.");
      }
    }
  });

const inputs = document.querySelectorAll("input, select");
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value.trim() !== "") {
      this.classList.remove("input-error");
    }
  });
});
