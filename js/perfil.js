document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("perfil-info");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    contenedor.innerHTML = "<p>No has iniciado sesión. <a href='login.html'>Inicia sesión</a></p>";
    return;
  }

  contenedor.innerHTML = `
    <p><strong>Nombre:</strong> ${usuario.nombre}</p>
    <p><strong>Apellido:</strong> ${usuario.apellido}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Fecha de nacimiento:</strong> ${usuario.fechaNacimiento}</p>
  `;
});
