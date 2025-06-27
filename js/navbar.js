document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  const navbarContainer = document.getElementById("navbar");

  const header = document.createElement("header");
  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  const logoBox = document.createElement("div");
  logoBox.classList.add("logo-box");
  logoBox.innerHTML = `<div class="logo">Mi Tienda</div>`;

  const ul = document.createElement("ul");
  ul.classList.add("nav-links");

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
        localStorage.removeItem("usuarioActivo");
        sessionStorage.removeItem("isLoggedIn");
        window.location.href = "index.html";
      });
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(logoBox);
  nav.appendChild(ul);
  header.appendChild(nav);
  navbarContainer.appendChild(header);
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById("navbar-container");
      if (container) {
        container.innerHTML = data;

        // Activar modo oscuro
        const btnTema = document.getElementById("toggle-theme");
        if (btnTema) {
          btnTema.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
          });
        }

        // Mostrar nombre de usuario si está logueado
        const user = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (user) {
          const nameSpan = document.getElementById("user-name");
          if (nameSpan) nameSpan.textContent = `Hola, ${user.nombre}`;
        }

        // Cerrar sesión
        const logout = document.getElementById("logout-link");
        if (logout) {
          logout.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            location.href = "login.html";
          });
        }
      }
    });
});

