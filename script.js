const datosRutas = [
  {
    icono: 'HTML',
    titulo: 'Estructura semántica',
    descripcion: 'Organiza encabezado, navegación, secciones, artículos, formularios y pie de página para que el sitio tenga una base clara.',
    resultado: 'Resultado: página ordenada'
  },
  {
    icono: 'CSS',
    titulo: 'Diseño visual',
    descripcion: 'Aplica colores, tipografías, márgenes, bordes, sombras y efectos básicos para mejorar la lectura y la presentación.',
    resultado: 'Resultado: interfaz atractiva'
  },
  {
    icono: 'BS',
    titulo: 'Diseño responsivo',
    descripcion: 'Utiliza Bootstrap para distribuir contenidos en contenedores, filas, columnas, botones, formularios y tarjetas adaptables.',
    resultado: 'Resultado: sitio adaptable'
  },
  {
    icono: 'JS',
    titulo: 'Interacción y validación',
    descripcion: 'Valida formularios, controla eventos, muestra mensajes dinámicos y registra información sin recargar la página.',
    resultado: 'Resultado: página interactiva'
  }
];

const bloquesPlantilla = [
  {
    etiqueta: 'base.html',
    titulo: 'Bloque principal',
    uso: 'Integra la estructura general del sitio y permite ubicar de forma ordenada las secciones que se repiten.',
    archivo: 'Parte reutilizable: header'
  },
  {
    etiqueta: 'navbar.html',
    titulo: 'Navegación común',
    uso: 'Mantiene el menú visible para acceder a inicio, rutas, plantillas, video, registro y contacto sin duplicar enlaces.',
    archivo: 'Parte reutilizable: nav'
  },
  {
    etiqueta: 'content.html',
    titulo: 'Contenido renderizado',
    uso: 'Muestra datos generados desde JavaScript mediante tarjetas, mensajes y registros creados por el usuario.',
    archivo: 'Parte reutilizable: main'
  },
  {
    etiqueta: 'footer.html',
    titulo: 'Cierre del sitio',
    uso: 'Conserva la información general del proyecto y mantiene una presentación consistente al final de la página.',
    archivo: 'Parte reutilizable: footer'
  }
];

const contenedorRutas = document.getElementById('contenedorRutas');
const estadoRutas = document.getElementById('estadoRutas');
const templateRuta = document.getElementById('templateRuta');

const contenedorPlantillas = document.getElementById('contenedorPlantillas');
const estadoPlantillas = document.getElementById('estadoPlantillas');
const templateComponente = document.getElementById('templateComponente');

function renderizarRutas() {
  contenedorRutas.innerHTML = '';

  if (datosRutas.length === 0) {
    estadoRutas.className = 'alert alert-danger text-center mx-auto status-alert';
    estadoRutas.textContent = 'No existen rutas de aprendizaje disponibles por el momento.';
    return;
  }

  estadoRutas.className = 'alert alert-success text-center mx-auto status-alert';
  estadoRutas.textContent = `Se muestran ${datosRutas.length} rutas generadas dinámicamente desde JavaScript.`;

  datosRutas.forEach(ruta => {
    const fragmento = templateRuta.content.cloneNode(true);
    fragmento.querySelector('.card-icon').textContent = ruta.icono;
    fragmento.querySelector('h3').textContent = ruta.titulo;
    fragmento.querySelector('.descripcion-ruta').textContent = ruta.descripcion;
    fragmento.querySelector('.resultado-ruta').textContent = ruta.resultado;
    contenedorRutas.appendChild(fragmento);
  });
}

function renderizarPlantillas() {
  contenedorPlantillas.innerHTML = '';

  if (bloquesPlantilla.length === 0) {
    estadoPlantillas.className = 'alert alert-danger status-alert';
    estadoPlantillas.textContent = 'No hay bloques reutilizables definidos.';
    return;
  }

  estadoPlantillas.className = 'alert alert-success status-alert';
  estadoPlantillas.textContent = `Estructura del sitio organizada en ${bloquesPlantilla.length} bloques reutilizables generados desde JavaScript.`;

  bloquesPlantilla.forEach(bloque => {
    const fragmento = templateComponente.content.cloneNode(true);
    fragmento.querySelector('.template-label').textContent = bloque.etiqueta;
    fragmento.querySelector('h3').textContent = bloque.titulo;
    fragmento.querySelector('.uso-componente').textContent = bloque.uso;
    fragmento.querySelector('.archivo-sugerido').textContent = bloque.archivo;
    contenedorPlantillas.appendChild(fragmento);
  });
}

const formulario = document.getElementById('formAprendizaje');
const mensajeGeneral = document.getElementById('mensajeGeneral');
const listaRegistros = document.getElementById('listaRegistros');
const sinRegistros = document.getElementById('sinRegistros');
const contadorRegistros = document.getElementById('contadorRegistros');
const btnLimpiar = document.getElementById('btnLimpiar');
const templateSolicitud = document.getElementById('templateSolicitud');

const campos = {
  nombre: document.getElementById('nombre'),
  correo: document.getElementById('correo'),
  ruta: document.getElementById('ruta'),
  nivel: document.getElementById('nivel'),
  horario: document.getElementById('horario'),
  modalidad: document.getElementById('modalidad'),
  objetivo: document.getElementById('objetivo')
};

let registros = JSON.parse(localStorage.getItem('solicitudesDawUea')) || [];

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
  localStorage.setItem('solicitudesDawUea', JSON.stringify(registros));
}

function renderizarRegistros() {
  listaRegistros.innerHTML = '';
  contadorRegistros.textContent = registros.length;

  if (registros.length === 0) {
    sinRegistros.style.display = 'block';
    return;
  }

  sinRegistros.style.display = 'none';

  registros.forEach(registro => {
    const fragmento = templateSolicitud.content.cloneNode(true);
    fragmento.querySelector('.registro-nombre').textContent = registro.nombre;
    fragmento.querySelector('.registro-correo').textContent = registro.correo;
    fragmento.querySelector('.registro-ruta').textContent = registro.ruta;
    fragmento.querySelector('.registro-nivel').textContent = registro.nivel;
    fragmento.querySelector('.registro-horario').textContent = registro.horario;
    fragmento.querySelector('.registro-modalidad').textContent = registro.modalidad;
    fragmento.querySelector('.registro-objetivo').textContent = registro.objetivo;
    fragmento.querySelector('button').dataset.id = registro.id;
    listaRegistros.appendChild(fragmento);
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

renderizarRutas();
renderizarPlantillas();
renderizarRegistros();
