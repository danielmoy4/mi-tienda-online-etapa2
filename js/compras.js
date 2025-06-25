document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    main.innerHTML = `<p>No has iniciado sesión. <a href="login.html">Inicia sesión</a></p>`;
    return;
  }

  const keyCarrito = `carrito_${usuario.email}`;
  const carrito = JSON.parse(localStorage.getItem(keyCarrito)) || [];

  if (carrito.length === 0) {
    main.innerHTML += `<p>No hay productos en tu carrito.</p>`;
    return;
  }

  const lista = document.createElement("ul");
  lista.className = "lista-compras";

  let totalGeneral = 0;

  carrito.forEach(item => {
    const precio = Number(item.precio);
    const subtotal = precio * item.cantidad;
    totalGeneral += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" width="50">
      <strong>${item.nombre}</strong> - ${item.precio} x ${item.cantidad}
      = <strong>$${subtotal.toFixed(2)}</strong>
    `;
    lista.appendChild(li);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "total-general";
  totalDiv.innerHTML = `<h3>Total: $${totalGeneral.toFixed(2)}</h3>`;

  main.appendChild(lista);
  main.appendChild(totalDiv);

  // Botón vaciar carrito
  const btnVaciar = document.getElementById("vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem(keyCarrito);
        location.reload();
      }
    });
  }

  // Botón finalizar compra
  const btnFinalizar = document.getElementById("finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      alert(`Compra realizada con éxito.\nTotal gastado: $${totalGeneral.toFixed(2)}\n¡Gracias por tu compra!`);
      localStorage.removeItem(keyCarrito);
      location.reload();
    });
  }
});
