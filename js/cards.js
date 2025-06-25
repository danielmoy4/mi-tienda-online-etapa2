document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo) {
    contenedor.innerHTML = "<p>Inicia sesión para ver los productos.</p>";
    return;
  }

  fetch("data/productos.json")
    .then((res) => res.json())
    .then((productos) => {
      const categorias = ["placas", "monitores", "mouses", "procesadores"];

      categorias.forEach((categoria) => {
        const productosFiltrados = productos.filter(p => p.categoria === categoria);

        if (productosFiltrados.length > 0) {
          const tituloCategoria = document.createElement("h3");
          tituloCategoria.textContent = nombreCategoria(categoria);
          contenedor.appendChild(tituloCategoria);

          const contenedorCategoria = document.createElement("div");
          contenedorCategoria.classList.add("categoria-grid");

          productosFiltrados.forEach((producto) => {
            const card = crearCardProducto(producto);
            contenedorCategoria.appendChild(card);
          });

          contenedor.appendChild(contenedorCategoria);
        }
      });
    })
    .catch((err) => {
      console.error("Error cargando productos:", err);
      contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
    });
});

function nombreCategoria(categoria) {
  switch (categoria) {
    case "placas": return "Placas de video";
    case "monitores": return "Monitores";
    case "mouses": return "Mouses";
    case "procesadores": return "Procesadores";
    default: return categoria;
  }
}

function crearCardProducto(producto) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;

  const titulo = document.createElement("h4");
  titulo.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion;

  const precio = document.createElement("p");
  precio.textContent = `$${producto.precio}`;

  const cantidadDiv = document.createElement("div");
  cantidadDiv.classList.add("cantidad");

  const btnMenos = document.createElement("button");
  btnMenos.textContent = "–";

  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.value = 1;
  inputCantidad.min = 1;

  const btnMas = document.createElement("button");
  btnMas.textContent = "+";

  btnMenos.addEventListener("click", () => {
    let valor = parseInt(inputCantidad.value);
    if (valor > 1) inputCantidad.value = valor - 1;
  });

  btnMas.addEventListener("click", () => {
    let valor = parseInt(inputCantidad.value);
    inputCantidad.value = valor + 1;
  });

  cantidadDiv.appendChild(btnMenos);
  cantidadDiv.appendChild(inputCantidad);
  cantidadDiv.appendChild(btnMas);

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "Agregar al carrito";
  btnAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto, parseInt(inputCantidad.value));
  });

  card.appendChild(img);
  card.appendChild(titulo);
  card.appendChild(descripcion);
  card.appendChild(precio);
  card.appendChild(cantidadDiv);
  card.appendChild(btnAgregar);

  return card;
}

function agregarAlCarrito(producto, cantidad) {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario) return;

  const carritoKey = `carrito_${usuario.email}`;
  const carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];

  const existente = carrito.find(item => item.nombre === producto.nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem(carritoKey, JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito.`);
}
