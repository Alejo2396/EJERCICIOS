const usuario = localStorage.getItem("usuario");
if (!usuario) location.href = "index.html";
document.getElementById("nombreUsuario").textContent = usuario;

document.getElementById("btnSalir").addEventListener("click", () => {
  localStorage.clear();
  location.href = "index.html";
});

const URL = "https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/SENA-CTPI.matriculados.json";
let datosGlobal = [];

async function cargarDatos() {
  const res = await fetch(URL);
  const data = await res.json();
  datosGlobal = data;

  // Obtener fichas únicas
  const fichasUnicas = [...new Set(data.map(d => d.FICHA))];
  const selectFicha = document.getElementById("selectFicha");
  selectFicha.innerHTML = `<option value="">-- Seleccione --</option>`;
  fichasUnicas.forEach(f => {
    selectFicha.innerHTML += `<option value="${f}">${f}</option>`;
  });

  // Evento de selección
  selectFicha.addEventListener("change", function () {
    const fichaSeleccionada = parseInt(this.value);
    const aprendices = datosGlobal.filter(d => d.FICHA === fichaSeleccionada);
    if (aprendices.length > 0) {
      document.getElementById("nombrePrograma").value = aprendices[0].PROGRAMA;
      document.getElementById("fichaPie").textContent = "Ficha " + fichaSeleccionada;
    } else {
      document.getElementById("nombrePrograma").value = "";
      document.getElementById("fichaPie").textContent = "";
    }
    mostrarTabla(aprendices);
  });
}

function mostrarTabla(lista) {
  const cuerpo = document.getElementById("tablaAprendices");
  cuerpo.innerHTML = "";
  lista.forEach(a => {
    const fila = document.createElement("tr");
    if (a.ESTADO_APRENDIZ === "Retiro Voluntario") fila.classList.add("retiro");
    fila.innerHTML = `
      <td>${a.TIPO_DOCUMENTO || ""}</td>
      <td>${a.NUMERO_DOCUMENTO || ""}</td>
      <td>${a.NOMBRE || ""}</td>
      <td>${a.PRIMER_APELLIDO || ""}</td>
      <td>${a.SEGUNDO_APELLIDO || ""}</td>
      <td>${a.ESTADO_APRENDIZ || ""}</td>
    `;
    cuerpo.appendChild(fila);
  });
}

cargarDatos();