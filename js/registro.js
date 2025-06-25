document.addEventListener("DOMContentLoaded", () => {
  console.log("registro.js cargado correctamente");

  const form = document.getElementById("formRegistro");

  if (!form) {
    console.error("No se encontró el formulario con id 'formRegistro'");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("contrasena").value;
    const confirmPassword = document.getElementById("repetirContrasena").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;

    // Validación básica
    if (!nombre || !apellido || !email || !password || !confirmPassword || !fechaNacimiento) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const usuario = {
      nombre,
      apellido,
      email,
      contrasena: password,
      fechaNacimiento
    };

    // Guardar usuario y sesión activa
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    alert(`Registro exitoso. ¡Bienvenido/a ${nombre}!`);
    window.location.href = "index.html";
  });
});
