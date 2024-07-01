document.addEventListener("DOMContentLoaded", function () {
  fetch("sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sidebar-container").innerHTML = data;
      initializeSidebar();
    });

  fetch("chat.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("chat-container").innerHTML = data;
      initChat();
    });

  fetch("modals.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("modals-container").innerHTML = data;
      initModals();
    });
});
