const productos = [
  {
    titulo: "Camiseta Liverpool",
    descripcion: "Camiseta titular 2024",
    precio: 85000,
    imagen: "img/kit/Lucho.jpeg"
  }
];

function renderCards() {
  const contenedor = document.getElementById("cards-container");
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}" />
      <h3>${producto.titulo}</h3>
      <p>${producto.descripcion}</p>
      <p>Precio: $${producto.precio}</p>
      <div class="cantidad">
        <button class="restar">-</button>
        <span>0</span>
        <button class="sumar">+</button>
      </div>
    `;
    contenedor.appendChild(card);
  });

  document.querySelectorAll(".sumar").forEach(btn => {
    btn.addEventListener("click", () => {
      const span = btn.previousElementSibling;
      span.textContent = parseInt(span.textContent) + 1;
    });
  });

  document.querySelectorAll(".restar").forEach(btn => {
    btn.addEventListener("click", () => {
      const span = btn.nextElementSibling;
      const value = parseInt(span.textContent);
      if (value > 0) span.textContent = value - 1;
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCards);
window.addEventListener("DOMContentLoaded", () => {
  const productos = [
    {
      nombre: "Placa de video RX6600",
      precio: "$1000",
      imagen: "img/rx6600.jpg"
    },
    {
      nombre: "Monitor ASUS ROG",
      precio: "$1500",
      imagen: "img/MonitorAsusRog.jpg"
    },
    {
      nombre: "Mouse Logitech G502",
      precio: "$500",
      imagen: "img/MouseLogitechG502.jpg"
    },
    {
      nombre: "Mouse SteelSeries Aerox 9",
      precio: "$600",
      imagen: "img/MouseSteelSeriesAerox9.jpg"
    },
    {
      nombre: "Monitor LG 27\"",
      precio: "$1300",
      imagen: "img/MonitorLG27.jpg"
    },
    {
      nombre: "Procesador AMD Ryzen 3",
      precio: "$800",
      imagen: "img/ProcesadorAMDRyzen3.jpg"
    }
  ];

  const container = document.getElementById("productos") || document.getElementById("cards-container");

  if (container) {
    container.className = "card-container";

    productos.forEach(producto => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>

        <div class="cantidad-control">
          <button class="btn-menos">–</button>
          <span class="cantidad">0</span>
          <button class="btn-mas">+</button>
        </div>

        <button class="agregar-carrito">Agregar al carrito</button>
      `;

      container.appendChild(card);

      const btnMas = card.querySelector(".btn-mas");
      const btnMenos = card.querySelector(".btn-menos");
      const cantidadSpan = card.querySelector(".cantidad");
      const btnAgregar = card.querySelector(".agregar-carrito");

      let cantidad = 0;

      btnMas.addEventListener("click", () => {
        cantidad++;
        cantidadSpan.textContent = cantidad;
      });

      btnMenos.addEventListener("click", () => {
        if (cantidad > 0) {
          cantidad--;
          cantidadSpan.textContent = cantidad;
        }
      });

      btnAgregar.addEventListener("click", () => {
        if (cantidad === 0) {
          alert("Por favor selecciona una cantidad antes de agregar.");
          return;
        }

        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!usuario) {
          alert("Debes iniciar sesión para agregar productos al carrito.");
          return;
        }

        const keyCarrito = `carrito_${usuario.email}`;
        let carrito = JSON.parse(localStorage.getItem(keyCarrito)) || [];

        const item = {
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad
        };

        const existente = carrito.find(p => p.nombre === item.nombre);

        if (existente) {
          existente.cantidad += cantidad;
        } else {
          carrito.push(item);
        }

        localStorage.setItem(keyCarrito, JSON.stringify(carrito));
        alert(`Se agregó "${item.nombre}" (${cantidad}) al carrito.`);

        cantidad = 0;
        cantidadSpan.textContent = cantidad;
      });
    });
  }
});
