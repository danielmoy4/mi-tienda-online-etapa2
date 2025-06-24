document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const keyCarrito = `carrito_${usuario?.email}`;
  const carrito = JSON.parse(localStorage.getItem(keyCarrito)) || [];

  localStorage.removeItem(keyCarrito);

  if (carrito.length === 0) {
    main.innerHTML += `<p>No hay productos en tu carrito.</p>`;
    return;
  }

  const lista = document.createElement("ul");
  lista.className = "lista-compras";

    carrito.forEach(item => {
    const precioNumerico = parseFloat(item.precio.replace("$", "").replace(",", ""));
    const subtotal = precioNumerico * item.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" width="50">
        <strong>${item.nombre}</strong> - ${item.precio} x ${item.cantidad}
        = <strong>$${subtotal.toFixed(2)}</strong>
    `;
    lista.appendChild(li);
    });

    let totalGeneral = carrito.reduce((acum, item) => {
    const precioNumerico = parseFloat(item.precio.replace("$", "").replace(",", ""));
    return acum + precioNumerico * item.cantidad;
    }, 0);

    const totalDiv = document.createElement("div");
    totalDiv.className = "total-general";
    totalDiv.innerHTML = `<h3>Total: $${totalGeneral.toFixed(2)}</h3>`;
    main.appendChild(totalDiv);

  main.appendChild(lista);
    const btnVaciar = document.getElementById("vaciar-carrito");

    if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        location.reload();
        }
    });
    }
    const btnFinalizar = document.getElementById("finalizar-compra");

    if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
        let total = 0;

        carrito.forEach(item => {
        const precioNumerico = parseFloat(item.precio.replace("$", "").replace(",", ""));
        total += precioNumerico * item.cantidad;
        });

        alert(`Compra realizada con éxito.\nTotal gastado: $${total.toFixed(2)}\n¡Gracias por tu compra!`);
        
        // Vaciar carrito después de comprar
        localStorage.removeItem("carrito");
        location.reload();
    });
    }
  
});
