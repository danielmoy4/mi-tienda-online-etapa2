document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("cards-container");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  fetch("js/data.json") // Asegúrate que este archivo contiene todos tus productos
    .then(response => response.json())
    .then(data => {
      data.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p><strong>$${producto.precio}</strong></p>
          <div class="cantidad-control">
            <button class="btn-restar">–</button>
            <input type="number" min="1" value="1" readonly>
            <button class="btn-sumar">+</button>
          </div>
          <button class="btn-agregar" data-id="${producto.id}" data-categoria="${producto.categoria}">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);
      });

      agregarEventosCarrito(usuario); // Función para manejar botones
    });
});

function agregarEventosCarrito(usuario) {
  document.querySelectorAll(".btn-sumar").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      input.value = parseInt(input.value) + 1;
    });
  });

  document.querySelectorAll(".btn-restar").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    });
  });

  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const cantidad = parseInt(card.querySelector("input").value);
      const nombre = card.querySelector("h3").textContent;
      const descripcion = card.querySelector("p").textContent;
      const precio = card.querySelector("strong").textContent.replace("$", "");
      const imagen = card.querySelector("img").getAttribute("src");
      const categoria = btn.dataset.categoria;
      const id = btn.dataset.id;

      if (!usuario) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        return;
      }

      const key = `carrito_${usuario.email}`;
      const carrito = JSON.parse(localStorage.getItem(key)) || [];

      const index = carrito.findIndex(p => p.id === id && p.categoria === categoria);
      if (index >= 0) {
        carrito[index].cantidad += cantidad;
      } else {
        carrito.push({ id, nombre, descripcion, precio, imagen, categoria, cantidad });
      }

      localStorage.setItem(key, JSON.stringify(carrito));
      alert("Producto agregado al carrito.");
    });
  });
}
