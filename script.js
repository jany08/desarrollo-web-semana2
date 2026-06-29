const formRecurso = document.getElementById("formRecurso");
const nombreRecurso = document.getElementById("nombreRecurso");
const tipoRecurso = document.getElementById("tipoRecurso");
const descripcionRecurso = document.getElementById("descripcionRecurso");
const mensajeRegistro = document.getElementById("mensajeRegistro");
const listaRecursos = document.getElementById("listaRecursos");
const contadorRecursos = document.getElementById("contadorRecursos");

let totalRecursos = 0;

formRecurso.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = nombreRecurso.value.trim();
  const tipo = tipoRecurso.value.trim();
  const descripcion = descripcionRecurso.value.trim();

  if (nombre === "" || tipo === "" || descripcion === "") {
    mensajeRegistro.innerHTML = `
      <div class="alert alert-warning" role="alert">
        Complete todos los campos antes de agregar el recurso.
      </div>
    `;
    return;
  }

  const columna = document.createElement("div");
  columna.className = "col-md-6";

  const tarjeta = document.createElement("div");
  tarjeta.className = "bloque-util registro-item h-100";

  const categoria = document.createElement("span");
  categoria.className = "categoria-dinamica";
  categoria.textContent = tipo;

  const titulo = document.createElement("h4");
  titulo.className = "h5 fw-bold";
  titulo.textContent = nombre;

  const texto = document.createElement("p");
  texto.textContent = descripcion;

  const botonEliminar = document.createElement("button");
  botonEliminar.className = "btn btn-outline-verde btn-sm";
  botonEliminar.textContent = "Eliminar";

  botonEliminar.addEventListener("click", function () {
    listaRecursos.removeChild(columna);
    totalRecursos--;
    contadorRecursos.textContent = totalRecursos;
  });

  tarjeta.appendChild(categoria);
  tarjeta.appendChild(titulo);
  tarjeta.appendChild(texto);
  tarjeta.appendChild(botonEliminar);
  columna.appendChild(tarjeta);
  listaRecursos.appendChild(columna);

  totalRecursos++;
  contadorRecursos.textContent = totalRecursos;

  mensajeRegistro.innerHTML = `
    <div class="alert alert-success" role="alert">
      Recurso agregado correctamente.
    </div>
  `;

  formRecurso.reset();
});
