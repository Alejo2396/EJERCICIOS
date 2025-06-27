document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("clave").value.trim();

  if (pass === "adso2993013") {
    localStorage.setItem("usuario", user);
    window.location.href = "app.html";
  } else {
    alert("Contraseña incorrecta");
  }
});