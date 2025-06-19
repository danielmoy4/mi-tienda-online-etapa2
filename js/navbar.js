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
