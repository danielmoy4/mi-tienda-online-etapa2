document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    main.innerHTML = `<p>No has iniciado sesión. <a href="login.html">Inicia sesión</a></p>`;
    return;
  }

  const keyCarrito = `carrito_${usuario.email}`;
  const keyHistorial = `historial_${usuario.email}`;

  const carrito = JSON.parse(localStorage.getItem(keyCarrito)) || [];
  const historial = JSON.parse(localStorage.getItem(keyHistorial)) || [];

  const lista = document.createElement("ul");
  lista.className = "lista-compras";

  let totalGeneral = 0;

  if (carrito.length === 0 && historial.length === 0) {
    main.innerHTML += `<p>No hay productos en tu carrito ni historial de compras.</p>`;
    return;
  }

  if (carrito.length > 0) {
    const carritoActual = document.createElement("section");
    carritoActual.innerHTML = `<h3>Carrito actual</h3>`;

    carrito.forEach(item => {
      const subtotal = Number(item.precio) * item.cantidad;
      totalGeneral += subtotal;

      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" width="50">
        <strong>${item.nombre}</strong> - $${item.precio} x ${item.cantidad}
        = <strong>$${subtotal.toFixed(2)}</strong>
      `;
      lista.appendChild(li);
    });

    carritoActual.appendChild(lista);

    const totalDiv = document.createElement("div");
    totalDiv.className = "total-general";
    totalDiv.innerHTML = `<h3>Total: $${totalGeneral.toFixed(2)}</h3>`;
    carritoActual.appendChild(totalDiv);

    main.appendChild(carritoActual);
  }

  if (historial.length > 0) {
    const historialSection = document.createElement("section");
    historialSection.innerHTML = `<h3>Historial de compras anteriores</h3>`;

    historial.forEach(compra => {
      const fecha = new Date(compra.fecha).toLocaleString();
      const ul = document.createElement("ul");

      compra.items.forEach(prod => {
        const li = document.createElement("li");
        const subtotal = Number(prod.precio) * prod.cantidad;
        li.innerHTML = `
          <img src="${prod.imagen}" alt="${prod.nombre}" width="50">
          <strong>${prod.nombre}</strong> - $${prod.precio} x ${prod.cantidad}
          = <strong>$${subtotal.toFixed(2)}</strong>
        `;
        ul.appendChild(li);
      });

      const bloque = document.createElement("div");
      bloque.classList.add("bloque-historial");
      bloque.innerHTML = `<p><strong>Fecha:</strong> ${fecha}</p>`;
      bloque.appendChild(ul);
      historialSection.appendChild(bloque);
    });

    main.appendChild(historialSection);
  }

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

  // Botón finalizar compra (guarda historial)
  const btnFinalizar = document.getElementById("finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      const nuevaCompra = {
        fecha: new Date().toISOString(),
        items: carrito
      };

      historial.push(nuevaCompra);
      localStorage.setItem(keyHistorial, JSON.stringify(historial));
      localStorage.removeItem(keyCarrito);

      alert(`Compra realizada con éxito. Se ha guardado en tu historial.`);
      location.reload();
    });
  }
});
