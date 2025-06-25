document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  if (!form) {
    console.error("No se encontró el formulario con ID 'formLogin'");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value;

    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuario"));

    if (
      usuarioRegistrado &&
      usuarioRegistrado.email === email &&
      usuarioRegistrado.contrasena === contrasena
    ) {
      // Guardar sesión activa
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioRegistrado));
      sessionStorage.setItem("isLoggedIn", true);

      alert("Inicio de sesión exitoso. ¡Bienvenido/a " + usuarioRegistrado.nombre + "!");
      window.location.href = "tienda.html";
    } else {
      alert("Credenciales incorrectas. Verifica tu email y contraseña.");
    }
  });
});
