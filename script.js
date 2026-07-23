const datosRutas = [
  {
    icono: '①',
    titulo: 'HTML5 semántico',
    descripcion: 'Reconoce la estructura base de una página usando header, nav, main, section, article, aside y footer.',
    resultado: 'Resultado: una página organizada y comprensible.'
  },
  {
    icono: '②',
    titulo: 'CSS3 aplicado',
    descripcion: 'Mejora colores, márgenes, tipografías, bordes y distribución visual para que el sitio sea más claro.',
    resultado: 'Resultado: una interfaz ordenada y atractiva.'
  },
  {
    icono: '③',
    titulo: 'Bootstrap responsivo',
    descripcion: 'Utiliza grillas, botones, tarjetas, alertas, formularios, navbar, modal y spinner para mejorar la experiencia.',
    resultado: 'Resultado: diseño adaptable a diferentes pantallas.'
  },
  {
    icono: '④',
    titulo: 'JavaScript dinámico',
    descripcion: 'Aplica eventos, validaciones, renderizado de datos, conteo, almacenamiento local y eliminación de registros.',
    resultado: 'Resultado: una página con interacción real.'
  }
];

const componentesBootstrap = [
  {
    tipo: 'navbar',
    titulo: 'Menú responsivo',
    descripcion: 'Permite recorrer las secciones principales desde computadora, tablet o celular sin perder la orientación dentro del sitio.',
    detalle: 'La navegación mantiene visible la organización del contenido y guía al usuario hacia rutas, estructura, video, registro y contacto.'
  },
  {
    tipo: 'grid',
    titulo: 'Distribución por secciones',
    descripcion: 'Organiza textos, tarjetas y formularios en columnas adaptables para que la lectura sea más cómoda en distintos tamaños de pantalla.',
    detalle: 'La rejilla ayuda a que la información no se amontone, mantiene equilibrio visual y permite que cada sección tenga un espacio claro.'
  },
  {
    tipo: 'card',
    titulo: 'Tarjetas de aprendizaje',
    descripcion: 'Presentan los temas por bloques breves para que el usuario identifique con rapidez qué puede revisar, practicar o registrar.',
    detalle: 'Las tarjetas permiten mostrar información ordenada a partir de datos guardados en JavaScript, evitando repetir manualmente el mismo diseño.'
  },
  {
    tipo: 'alert',
    titulo: 'Mensajes de orientación',
    descripcion: 'Muestran avisos de éxito, advertencia o error cuando el usuario interactúa con el formulario o consulta información del sitio.',
    detalle: 'Las alertas hacen que la página responda con claridad, especialmente cuando falta completar un dato o cuando una solicitud se registra correctamente.'
  },
  {
    tipo: 'modal',
    titulo: 'Ventana de detalles',
    descripcion: 'Abre información adicional sin sacar al usuario de la página principal ni cargar otra vista.',
    detalle: 'El modal permite ampliar una explicación, revisar un componente o confirmar una acción manteniendo la navegación en el mismo sitio.'
  },
  {
    tipo: 'spinner',
    titulo: 'Indicador de proceso',
    descripcion: 'Simula una espera breve mientras JavaScript prepara rutas, componentes o solicitudes registradas.',
    detalle: 'El spinner comunica que el sistema está procesando información y mejora la sensación de respuesta durante una acción dinámica.'
  }
]

const bloquesPlantilla = [
  {
    etiqueta: 'base.html',
    titulo: 'Encabezado común',
    uso: 'Mantiene el nombre del sitio, el fondo principal y la primera impresión visual del proyecto.',
    archivo: 'Parte reutilizable: header'
  },
  {
    etiqueta: 'navbar.html',
    titulo: 'Menú de navegación',
    uso: 'Permite moverse entre secciones sin repetir código de navegación en cada vista.',
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
const spinnerRutas = document.getElementById('spinnerRutas');
const templateRuta = document.getElementById('templateRuta');

const contenedorComponentes = document.getElementById('contenedorComponentes');
const estadoComponentes = document.getElementById('estadoComponentes');
const spinnerComponentes = document.getElementById('spinnerComponentes');
const templateComponenteBootstrap = document.getElementById('templateComponenteBootstrap');

const contenedorPlantillas = document.getElementById('contenedorPlantillas');
const estadoPlantillas = document.getElementById('estadoPlantillas');
const templateComponente = document.getElementById('templateComponente');

const modalElemento = document.getElementById('modalInformacion');
const modalTitulo = document.getElementById('modalTitulo');
const modalContenido = document.getElementById('modalContenido');
const modalInformacion = new bootstrap.Modal(modalElemento);

function abrirModal(titulo, contenido) {
  modalTitulo.textContent = titulo;
  modalContenido.innerHTML = contenido;
  modalInformacion.show();
}

function renderizarRutas() {
  contenedorRutas.innerHTML = '';
  spinnerRutas.classList.remove('d-none');

  setTimeout(() => {
    spinnerRutas.classList.add('d-none');

    if (datosRutas.length === 0) {
      estadoRutas.className = 'alert alert-danger text-center mx-auto status-alert';
      estadoRutas.textContent = 'No existen rutas de aprendizaje disponibles por el momento.';
      return;
    }

    estadoRutas.className = 'alert alert-success text-center mx-auto status-alert';
    estadoRutas.textContent = `Se muestran ${datosRutas.length} rutas generadas dinámicamente desde JavaScript.`;

    datosRutas.forEach((ruta, indice) => {
      const fragmento = templateRuta.content.cloneNode(true);
      fragmento.querySelector('.card-icon').textContent = ruta.icono;
      fragmento.querySelector('h3').textContent = ruta.titulo;
      fragmento.querySelector('.descripcion-ruta').textContent = ruta.descripcion;
      fragmento.querySelector('.resultado-ruta').textContent = ruta.resultado;
      fragmento.querySelector('.btn-detalle-ruta').dataset.indice = indice;
      contenedorRutas.appendChild(fragmento);
    });
  }, 550);
}

function renderizarComponentesBootstrap() {
  contenedorComponentes.innerHTML = '';
  spinnerComponentes.classList.remove('d-none');

  setTimeout(() => {
    spinnerComponentes.classList.add('d-none');

    if (componentesBootstrap.length === 0) {
      estadoComponentes.className = 'alert alert-danger text-center mx-auto status-alert';
      estadoComponentes.textContent = 'No hay componentes Bootstrap registrados para mostrar.';
      return;
    }

    estadoComponentes.className = 'alert alert-success text-center mx-auto status-alert';
    estadoComponentes.textContent = `La página muestra ${componentesBootstrap.length} herramientas visuales que ayudan a organizar, orientar y validar la experiencia del usuario.`;

    componentesBootstrap.forEach((componente, indice) => {
      const fragmento = templateComponenteBootstrap.content.cloneNode(true);
      fragmento.querySelector('.componente-tipo').textContent = `.${componente.tipo}`;
      fragmento.querySelector('h3').textContent = componente.titulo;
      fragmento.querySelector('.descripcion-componente').textContent = componente.descripcion;
      fragmento.querySelector('.btn-detalle-componente').dataset.indice = indice;
      contenedorComponentes.appendChild(fragmento);
    });
  }, 700);
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

contenedorRutas.addEventListener('click', event => {
  const boton = event.target.closest('.btn-detalle-ruta');
  if (!boton) return;
  const ruta = datosRutas[Number(boton.dataset.indice)];
  abrirModal(
    ruta.titulo,
    `<p>${ruta.descripcion}</p><div class="alert alert-success mb-0">${ruta.resultado}</div>`
  );
});

contenedorComponentes.addEventListener('click', event => {
  const boton = event.target.closest('.btn-detalle-componente');
  if (!boton) return;
  const componente = componentesBootstrap[Number(boton.dataset.indice)];
  abrirModal(
    componente.titulo,
    `<p><strong>Aplicación en la página:</strong> ${componente.detalle}</p><div class="alert alert-primary mb-0">La información se muestra de forma dinámica para explicar cómo funciona este recurso dentro del sitio.</div>`
  );
});

const formulario = document.getElementById('formAprendizaje');
const mensajeGeneral = document.getElementById('mensajeGeneral');
const spinnerRegistro = document.getElementById('spinnerRegistro');
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

function mostrarSpinnerRegistro() {
  spinnerRegistro.classList.remove('d-none');
  spinnerRegistro.classList.add('d-flex');
}

function ocultarSpinnerRegistro() {
  spinnerRegistro.classList.add('d-none');
  spinnerRegistro.classList.remove('d-flex');
}

function guardarRegistros() {
  localStorage.setItem('solicitudesDawUea', JSON.stringify(registros));
}

function renderizarRegistros() {
  listaRegistros.innerHTML = '';
  contadorRegistros.textContent = registros.length;

  if (registros.length === 0) {
    sinRegistros.className = 'alert alert-warning';
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
    fragmento.querySelector('.btn-detalle-registro').dataset.id = registro.id;
    fragmento.querySelector('.btn-eliminar').dataset.id = registro.id;
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

  mostrarSpinnerRegistro();

  setTimeout(() => {
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
    ocultarSpinnerRegistro();
    mostrarMensaje('success', 'Solicitud registrada correctamente. El interés de aprendizaje aparece en el listado dinámico.');

    formulario.reset();
    Object.values(campos).forEach(campo => campo.classList.remove('is-valid', 'is-invalid'));
  }, 650);
});

listaRegistros.addEventListener('click', event => {
  const botonDetalle = event.target.closest('.btn-detalle-registro');
  const botonEliminar = event.target.closest('.btn-eliminar');

  if (botonDetalle) {
    const id = Number(botonDetalle.dataset.id);
    const registro = registros.find(item => item.id === id);
    if (!registro) return;
    abrirModal(
      `Solicitud de ${registro.nombre}`,
      `<p><strong>Correo:</strong> ${registro.correo}</p>
       <p><strong>Ruta:</strong> ${registro.ruta}</p>
       <p><strong>Nivel:</strong> ${registro.nivel}</p>
       <p><strong>Horario:</strong> ${registro.horario}</p>
       <p><strong>Modalidad:</strong> ${registro.modalidad}</p>
       <div class="alert alert-success mb-0"><strong>Objetivo:</strong> ${registro.objetivo}</div>`
    );
    return;
  }

  if (botonEliminar) {
    const id = Number(botonEliminar.dataset.id);
    registros = registros.filter(registro => registro.id !== id);
    guardarRegistros();
    renderizarRegistros();
    mostrarMensaje('success', 'Registro eliminado correctamente. El contador fue actualizado.');
  }
});

btnLimpiar.addEventListener('click', () => {
  ocultarMensaje();
  ocultarSpinnerRegistro();
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

renderizarRutas();
renderizarComponentesBootstrap();
renderizarPlantillas();
renderizarRegistros();
