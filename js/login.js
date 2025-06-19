document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sessionStorage.setItem("isLoggedIn", true);
  window.location.href = "tienda.html";
});
