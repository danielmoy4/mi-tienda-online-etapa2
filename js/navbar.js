document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById("navbar-container");
      if (!container) return;

      container.innerHTML = data;

      const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

      const loginLink = document.getElementById("login-link");
      const registroLink = document.getElementById("registro-link");
      const logoutLink = document.getElementById("logout-link");
      const userNameSpan = document.getElementById("user-name");
      const comprasLink = document.getElementById("compras-link");
      const perfilLink = document.getElementById("perfil-link");

      if (usuario) {
        if (loginLink) loginLink.style.display = "none";
        if (registroLink) registroLink.style.display = "none";
        if (logoutLink) logoutLink.style.display = "inline";
        if (userNameSpan) userNameSpan.textContent = `Hola, ${usuario.nombre || "Usuario"}`;
        if (comprasLink) comprasLink.style.display = "inline";
        if (perfilLink) perfilLink.style.display = "inline";

        logoutLink.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("usuarioActivo");
          window.location.href = "index.html";
        });
      } else {
        if (logoutLink) logoutLink.style.display = "none";
        if (userNameSpan) userNameSpan.textContent = "";
        if (comprasLink) comprasLink.style.display = "none";
        if (perfilLink) perfilLink.style.display = "none";
      }

      // Modo oscuro
      const btnTema = document.getElementById("toggle-theme");
      if (btnTema) {
        btnTema.addEventListener("click", () => {
          document.body.classList.toggle("dark-mode");
        });
      }
    });
});
