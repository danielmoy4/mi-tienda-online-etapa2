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
