const formulario = document.getElementById('formAprendizaje');
const mensajeGeneral = document.getElementById('mensajeGeneral');
const listaRegistros = document.getElementById('listaRegistros');
const sinRegistros = document.getElementById('sinRegistros');
const contadorRegistros = document.getElementById('contadorRegistros');
const btnLimpiar = document.getElementById('btnLimpiar');

const campos = {
  nombre: document.getElementById('nombre'),
  correo: document.getElementById('correo'),
  ruta: document.getElementById('ruta'),
  nivel: document.getElementById('nivel'),
  horario: document.getElementById('horario'),
  modalidad: document.getElementById('modalidad'),
  objetivo: document.getElementById('objetivo')
};

let registros = JSON.parse(localStorage.getItem('registrosAulaWeb')) || [];

const reglas = {
  nombre: valor => valor.trim().length >= 4,
  correo: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
  ruta: valor => valor.trim() !== '',
  nivel: valor => valor.trim() !== '',
  horario: valor => valor.trim() !== '',
  modalidad: valor => valor.trim() !== '',
  objetivo: valor => valor.trim().length >= 20
};

function validarCampo(nombreCampo) {
  const campo = campos[nombreCampo];
  const esValido = reglas[nombreCampo](campo.value);

  campo.classList.remove('is-valid', 'is-invalid');

  if (campo.value.trim() === '') {
    return false;
  }

  campo.classList.add(esValido ? 'is-valid' : 'is-invalid');
  return esValido;
}

function validarFormularioCompleto() {
  return Object.keys(campos).every(nombreCampo => validarCampo(nombreCampo));
}

function mostrarMensaje(tipo, texto) {
  mensajeGeneral.className = `alert alert-${tipo}`;
  mensajeGeneral.textContent = texto;
  mensajeGeneral.classList.remove('d-none');
}

function ocultarMensaje() {
  mensajeGeneral.className = 'alert d-none';
  mensajeGeneral.textContent = '';
}

function guardarRegistros() {
  localStorage.setItem('registrosAulaWeb', JSON.stringify(registros));
}

function renderizarRegistros() {
  listaRegistros.innerHTML = '';
  contadorRegistros.textContent = registros.length;
  sinRegistros.style.display = registros.length === 0 ? 'block' : 'none';

  registros.forEach(registro => {
    const columna = document.createElement('article');
    columna.className = 'col-md-6 col-xl-4';

    columna.innerHTML = `
      <div class="record-card">
        <h3>${registro.nombre}</h3>
        <p><strong>Correo:</strong> ${registro.correo}</p>
        <div class="record-meta">
          <span>${registro.ruta}</span>
          <span>${registro.nivel}</span>
          <span>${registro.horario}</span>
          <span>${registro.modalidad}</span>
        </div>
        <p>${registro.objetivo}</p>
        <button class="btn btn-outline-danger btn-sm" data-id="${registro.id}">Eliminar</button>
      </div>
    `;

    listaRegistros.appendChild(columna);
  });
}

Object.keys(campos).forEach(nombreCampo => {
  campos[nombreCampo].addEventListener('input', () => validarCampo(nombreCampo));
  campos[nombreCampo].addEventListener('blur', () => validarCampo(nombreCampo));
});

formulario.addEventListener('submit', event => {
  event.preventDefault();
  ocultarMensaje();

  if (!validarFormularioCompleto()) {
    mostrarMensaje('danger', 'Revise los campos marcados antes de registrar la solicitud.');
    return;
  }

  const nuevoRegistro = {
    id: Date.now(),
    nombre: campos.nombre.value.trim(),
    correo: campos.correo.value.trim(),
    ruta: campos.ruta.value,
    nivel: campos.nivel.value,
    horario: campos.horario.value,
    modalidad: campos.modalidad.value,
    objetivo: campos.objetivo.value.trim()
  };

  registros.unshift(nuevoRegistro);
  guardarRegistros();
  renderizarRegistros();
  mostrarMensaje('success', 'Solicitud registrada correctamente. El interés de aprendizaje aparece en el listado.');

  formulario.reset();
  Object.values(campos).forEach(campo => campo.classList.remove('is-valid', 'is-invalid'));
});

listaRegistros.addEventListener('click', event => {
  if (event.target.matches('button[data-id]')) {
    const id = Number(event.target.dataset.id);
    registros = registros.filter(registro => registro.id !== id);
    guardarRegistros();
    renderizarRegistros();
    mostrarMensaje('success', 'Registro eliminado correctamente.');
  }
});

btnLimpiar.addEventListener('click', () => {
  ocultarMensaje();
  Object.values(campos).forEach(campo => campo.classList.remove('is-valid', 'is-invalid'));
});

renderizarRegistros();


const formContacto = document.getElementById('formContacto');
const mensajeContacto = document.getElementById('mensajeContacto');
const btnLimpiarContacto = document.getElementById('btnLimpiarContacto');

const camposContacto = {
  contactoNombre: document.getElementById('contactoNombre'),
  contactoCorreo: document.getElementById('contactoCorreo'),
  contactoAsunto: document.getElementById('contactoAsunto'),
  contactoMensaje: document.getElementById('contactoMensaje')
};

const reglasContacto = {
  contactoNombre: valor => valor.trim().length >= 3,
  contactoCorreo: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
  contactoAsunto: valor => valor.trim().length >= 5,
  contactoMensaje: valor => valor.trim().length >= 10
};

function validarCampoContacto(nombreCampo) {
  const campo = camposContacto[nombreCampo];
  const esValido = reglasContacto[nombreCampo](campo.value);

  campo.classList.remove('is-valid', 'is-invalid');

  if (campo.value.trim() === '') {
    return false;
  }

  campo.classList.add(esValido ? 'is-valid' : 'is-invalid');
  return esValido;
}

function validarContactoCompleto() {
  return Object.keys(camposContacto).every(nombreCampo => validarCampoContacto(nombreCampo));
}

function mostrarMensajeContacto(tipo, texto) {
  mensajeContacto.className = `alert alert-${tipo}`;
  mensajeContacto.textContent = texto;
  mensajeContacto.classList.remove('d-none');
}

function ocultarMensajeContacto() {
  mensajeContacto.className = 'alert d-none';
  mensajeContacto.textContent = '';
}

if (formContacto) {
  Object.keys(camposContacto).forEach(nombreCampo => {
    camposContacto[nombreCampo].addEventListener('input', () => validarCampoContacto(nombreCampo));
    camposContacto[nombreCampo].addEventListener('blur', () => validarCampoContacto(nombreCampo));
  });

  formContacto.addEventListener('submit', event => {
    event.preventDefault();
    ocultarMensajeContacto();

    if (!validarContactoCompleto()) {
      mostrarMensajeContacto('danger', 'Revise los campos marcados antes de enviar la consulta.');
      return;
    }

    mostrarMensajeContacto('success', 'Consulta registrada correctamente. Puede continuar revisando las rutas de aprendizaje.');
    formContacto.reset();
    Object.values(camposContacto).forEach(campo => campo.classList.remove('is-valid', 'is-invalid'));
  });

  btnLimpiarContacto.addEventListener('click', () => {
    ocultarMensajeContacto();
    Object.values(camposContacto).forEach(campo => campo.classList.remove('is-valid', 'is-invalid'));
  });
}
