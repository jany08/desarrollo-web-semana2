const KEY = 'dawUEA_consultas_locales';
function leerConsultas() { try { const a = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(a) ? a : []; } catch { return []; } }
function crear(tag, cls, texto) { const e=document.createElement(tag); if(cls)e.className=cls; if(texto!==undefined)e.textContent=texto;return e; }
function mostrarConsultas() {
  const cont=document.getElementById('solicitudesLista'); if(!cont)return;
  const lista=leerConsultas(), total=document.getElementById('totalSolicitudes');if(total)total.textContent=lista.length;
  cont.replaceChildren();
  if(!lista.length){cont.append(crear('p','muted-text','Aún no tienes consultas guardadas.'));return;}
  lista.forEach((dato,i)=>{ const box=crear('div','request-item');box.append(crear('strong','',dato.nombre),crear('p','muted-text',dato.ruta),crear('p','',dato.mensaje));const b=crear('button','btn btn-outline-danger btn-sm','Eliminar');b.type='button';b.addEventListener('click',()=>{const a=leerConsultas();a.splice(i,1);localStorage.setItem(KEY,JSON.stringify(a));mostrarConsultas();});box.append(b);cont.append(box);});
}
function marcar(id,bien,mensaje){const campo=document.getElementById(id);if(!campo)return;campo.classList.toggle('is-valid',bien);campo.classList.toggle('is-invalid',!bien);const msg=document.getElementById(id+'Help');if(msg)msg.textContent=bien?'':mensaje;}
function alerta(texto,tipo){const a=document.getElementById('formAlert');if(a){a.className='alert alert-'+tipo;a.textContent=texto;}}
document.addEventListener('DOMContentLoaded',()=>{
 mostrarConsultas();const f=document.getElementById('consultaForm');if(!f)return;
 f.addEventListener('submit',e=>{
  e.preventDefault();const nombre=f.querySelector('#nombre').value.trim(),correo=f.querySelector('#correo').value.trim(),ruta=f.querySelector('#ruta').value,mensaje=f.querySelector('#mensaje').value.trim();
  const test={nombre:nombre.length>=4,correo:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo),ruta:!!ruta,mensaje:mensaje.length>=20};
  marcar('nombre',test.nombre,'Escribe al menos cuatro caracteres.');marcar('correo',test.correo,'Ingresa un correo válido.');marcar('ruta',test.ruta,'Selecciona un tema.');marcar('mensaje',test.mensaje,'Describe la consulta con al menos veinte caracteres.');
  if(!Object.values(test).every(Boolean)){alerta('Revisa los campos indicados.','danger');return;}
  const a=leerConsultas();a.unshift({nombre,correo,ruta,mensaje});try{localStorage.setItem(KEY,JSON.stringify(a));}catch{alerta('El navegador no permitió guardar la consulta.','danger');return;}
  mostrarConsultas();f.reset();f.querySelectorAll('.is-valid,.is-invalid').forEach(x=>x.classList.remove('is-valid','is-invalid'));alerta('Consulta guardada en este navegador. No se ha enviado a nadie.','success');
 });
 f.addEventListener('reset',()=>{setTimeout(()=>{f.querySelectorAll('.is-valid,.is-invalid').forEach(x=>x.classList.remove('is-valid','is-invalid'));f.querySelectorAll('.small-help').forEach(x=>x.textContent='');const a=document.getElementById('formAlert');a.className='alert d-none';a.textContent='';},0);});
});
