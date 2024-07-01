document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("login-error");

    try {
      const response = await fetch("http://localhost:8000/users/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password,
        }),
      });

      if (response.status === 200) {
        alert("Login successful! 🎉");
        window.location.href = "index.html";
      } else {
        loginError.style.display = "block";
        document.getElementById("username").classList.add("input-error");
        document.getElementById("password").classList.add("input-error");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again later.");
    }
  });

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value.trim() !== "") {
      this.classList.remove("input-error");
      document.getElementById("login-error").style.display = "none";
    }
  });
});
