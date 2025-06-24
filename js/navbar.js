<<<<<<< HEAD
import { navItems } from './navbar-data.js';

function renderNavbar() {
  const navbar = document.getElementById("navbar");
  let html = '<nav><ul>';
  navItems.forEach(item => {
    html += `<li><a href="${item.link}">${item.title}</a></li>`;
  });
  html += '<li><button id="logout-btn">Cerrar sesión</button></li>';
  html += '</ul></nav>';
  navbar.innerHTML = html;

  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
}

document.addEventListener("DOMContentLoaded", renderNavbar);
=======
window.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  header.classList.add("navbar");
  nav.classList.add("navbar-nav");

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  const enlacesBase = [
    { name: "Inicio", href: "index.html" },
    { name: "Productos", href: "tienda.html" }
  ];

  let enlacesFinales = [];

  if (usuario) {
    enlacesFinales = [
      ...enlacesBase,
      { name: "Mis Compras", href: "compras.html" },
      { name: `Hola, ${usuario.nombre}`, href: "#", isGreeting: true },
      { name: "Perfil", href: "perfil.html" },
      { name: "Cerrar sesión", href: "#", isLogout: true }
    ];
  } else {
    enlacesFinales = [
      ...enlacesBase,
      { name: "Iniciar Sesión", href: "login.html" },
      { name: "Registrarse", href: "registro.html" }
    ];
  }

  enlacesFinales.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.name;
    a.classList.add("nav-link");

    if (item.isGreeting) {
      a.style.fontWeight = "bold";
    }

    if (item.isLogout) {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuarioActivo"); // ✅ Solo cierra la sesión
        window.location.href = "index.html";
      });
    }


    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  header.appendChild(nav);
  document.body.insertBefore(header, document.body.firstChild);
});
>>>>>>> fe5125a (Entrega etapa 3 finalizada - carrito por usuario y mejoras)
