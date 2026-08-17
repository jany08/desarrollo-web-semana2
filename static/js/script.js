const modulos = [
  {
    nombre: "Rutas de aprendizaje",
    etiqueta: "Orientación",
    descripcion: "Ordena contenidos por nivel: estructura HTML, estilos CSS, componentes Bootstrap, interacción con JavaScript y primera organización en Flask.",
    detalle: "Este módulo ayuda a que el usuario elija un camino de estudio sin perderse entre herramientas. La ruta propone avanzar desde la estructura visual hasta la organización con plantillas."
  },
  {
    nombre: "Participantes",
    etiqueta: "Usuarios",
    descripcion: "Registra el interés de estudiantes o personas que desean reforzar temas de desarrollo web y recibir orientación sobre recursos específicos.",
    detalle: "El módulo representa cómo una aplicación puede organizar perfiles básicos de usuarios o participantes, sin usar todavía una base de datos."
  },
  {
    nombre: "Recursos digitales",
    etiqueta: "Materiales",
    descripcion: "Agrupa videos, enlaces, ejemplos y guías breves para practicar la creación de páginas responsivas con HTML5, CSS3, Bootstrap y JavaScript.",
    detalle: "Este módulo simula la administración de materiales de aprendizaje y muestra cómo Flask puede separar cada área del proyecto en una vista propia."
  },
  {
    nombre: "Solicitudes de orientación",
    etiqueta: "Seguimiento",
    descripcion: "Permite registrar consultas desde el formulario, validar los campos obligatorios y mostrar las solicitudes creadas en una sección dinámica.",
    detalle: "El módulo conserva la lógica de validación trabajada con JavaScript y prepara el proyecto para organizar solicitudes mediante rutas internas."
  }
];

const estructura = [
  "app.py",
  "templates/base.html",
  "templates/index.html",
  "templates/rutas.html",
  "templates/participantes.html",
  "templates/recursos.html",
  "templates/solicitudes.html",
  "static/css/style.css",
  "static/js/script.js",
  "static/img/"
];

const solicitudes = [];

document.addEventListener("DOMContentLoaded", () => {
  renderModulos();
  renderEstructura();
  configurarFormulario();
  configurarModalDinamico();
});

function renderModulos(){
  const contenedor = document.getElementById("moduleCards");
  if(!contenedor) return;

  contenedor.innerHTML = "";
  modulos.forEach((modulo, index) => {
    const card = document.createElement("article");
    card.className = "col-md-6 col-xl-3";
    card.innerHTML = `
      <div class="card-clean">
        <div class="card-body d-flex flex-column">
          <span class="pill">${modulo.etiqueta}</span>
          <h3 class="h4 fw-bold text-dark">${modulo.nombre}</h3>
          <p class="muted-text flex-grow-1">${modulo.descripcion}</p>
          <button class="btn btn-green text-white mt-2" data-module="${index}" type="button">
            Ver detalle
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function renderEstructura(){
  const contenedor = document.getElementById("structureTree");
  if(!contenedor) return;

  contenedor.innerHTML = estructura.map(item => `├── ${item}`).join("<br>");
}

function configurarModalDinamico(){
  const modalTitulo = document.getElementById("modalTitulo");
  const modalTexto = document.getElementById("modalTexto");
  const modalEtiqueta = document.getElementById("modalEtiqueta");

  document.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-module]");
    if(!boton || !modalTitulo || !modalTexto) return;

    const modulo = modulos[Number(boton.dataset.module)];
    modalTitulo.textContent = modulo.nombre;
    modalTexto.textContent = modulo.detalle;
    if(modalEtiqueta) modalEtiqueta.textContent = modulo.etiqueta;

    const modal = new bootstrap.Modal(document.getElementById("infoModal"));
    modal.show();
  });
}

function configurarFormulario(){
  const form = document.getElementById("consultaForm");
  if(!form) return;

  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const ruta = document.getElementById("ruta");
  const mensaje = document.getElementById("mensaje");

  [nombre, correo, ruta, mensaje].forEach(campo => {
    campo.addEventListener("input", () => validarCampo(campo));
    campo.addEventListener("blur", () => validarCampo(campo));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const campos = [nombre, correo, ruta, mensaje];
    const valido = campos.every(campo => validarCampo(campo));

    if(!valido){
      mostrarAlerta("Revise los campos marcados antes de registrar la solicitud.", "danger");
      return;
    }

    activarSpinner(true);

    setTimeout(() => {
      solicitudes.push({
        nombre: nombre.value.trim(),
        correo: correo.value.trim(),
        ruta: ruta.value,
        mensaje: mensaje.value.trim()
      });

      renderSolicitudes();
      mostrarAlerta("Solicitud registrada correctamente. Puede revisar el listado inferior.", "success");
      form.reset();
      campos.forEach(campo => campo.classList.remove("is-valid", "is-invalid"));
      activarSpinner(false);
    }, 650);
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      [nombre, correo, ruta, mensaje].forEach(campo => {
        campo.classList.remove("is-valid", "is-invalid");
        actualizarMensaje(campo, "");
      });
      mostrarAlerta("", "");
    }, 0);
  });
}

function validarCampo(campo){
  const valor = campo.value.trim();
  let valido = true;
  let mensaje = "";

  if(campo.id === "nombre" && valor.length < 4){
    valido = false;
    mensaje = "Ingrese un nombre de al menos 4 caracteres.";
  }

  if(campo.id === "correo"){
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!patronCorreo.test(valor)){
      valido = false;
      mensaje = "Ingrese un correo electrónico válido.";
    }
  }

  if(campo.id === "ruta" && valor === ""){
    valido = false;
    mensaje = "Seleccione una ruta de aprendizaje.";
  }

  if(campo.id === "mensaje" && valor.length < 20){
    valido = false;
    mensaje = "Explique su consulta con al menos 20 caracteres.";
  }

  campo.classList.toggle("is-valid", valido);
  campo.classList.toggle("is-invalid", !valido);
  actualizarMensaje(campo, mensaje);
  return valido;
}

function actualizarMensaje(campo, texto){
  const feedback = document.getElementById(`${campo.id}Help`);
  if(feedback) feedback.textContent = texto;
}

function mostrarAlerta(texto, tipo){
  const alerta = document.getElementById("formAlert");
  if(!alerta) return;

  if(!texto){
    alerta.className = "alert d-none";
    alerta.textContent = "";
    return;
  }

  alerta.className = `alert alert-${tipo === "success" ? "success" : "danger"}`;
  alerta.textContent = texto;
}

function activarSpinner(estado){
  const spinner = document.getElementById("spinnerBox");
  if(spinner) spinner.style.display = estado ? "flex" : "none";
}

function renderSolicitudes(){
  const lista = document.getElementById("solicitudesLista");
  const total = document.getElementById("totalSolicitudes");

  if(total) total.textContent = solicitudes.length;

  if(!lista) return;

  if(solicitudes.length === 0){
    lista.innerHTML = `<div class="status-empty">Todavía no existen solicitudes registradas.</div>`;
    return;
  }

  lista.innerHTML = solicitudes.map((item, index) => `
    <div class="request-item">
      <div class="d-flex justify-content-between gap-3 align-items-start flex-wrap">
        <div>
          <strong>${item.nombre}</strong>
          <p class="mb-1 muted-text">${item.ruta}</p>
          <small>${item.correo}</small>
          <p class="mt-2 mb-0">${item.mensaje}</p>
        </div>
        <button class="btn btn-outline-danger btn-sm" type="button" onclick="eliminarSolicitud(${index})">Eliminar</button>
      </div>
    </div>
  `).join("");
}

function eliminarSolicitud(index){
  solicitudes.splice(index, 1);
  renderSolicitudes();
  mostrarAlerta("Solicitud eliminada del listado.", "success");
}