<<<<<<< HEAD
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sessionStorage.setItem("isLoggedIn", true);
  window.location.href = "tienda.html";
=======
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
      // Guardar sesión activa en localStorage
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioRegistrado));

      alert("Inicio de sesión exitoso. ¡Bienvenido/a " + usuarioRegistrado.nombre + "!");
      window.location.href = "index.html";
    } else {
      alert("Credenciales incorrectas. Verifica tu email y contraseña.");
    }
  });
>>>>>>> fe5125a (Entrega etapa 3 finalizada - carrito por usuario y mejoras)
});
