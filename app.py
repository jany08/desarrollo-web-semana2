from flask import Flask, render_template, render_template_string, flash, redirect, url_for, request, abort
import os
import secrets
from contextlib import contextmanager
from flask_wtf import FlaskForm
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from forms.login_form import LoginForm
from forms.usuario_form import UsuarioForm
from models import Usuario
from conexion.conexion import obtener_conexion

from forms.consulta_form import ConsultaForm
from forms.ruta_form import RutaForm
from forms.participante_form import ParticipanteForm
from forms.recurso_form import RecursoForm

app = Flask(__name__)
# Para despliegues reales configura SECRET_KEY como variable de entorno.
# La clave temporal permite la ejecución local sin guardar secretos en GitHub.
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY") or secrets.token_hex(32)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
login_manager.login_message = "Debes iniciar sesión para acceder a esta página."
login_manager.login_message_category = "warning"

# PostgreSQL guarda permanentemente los registros. DB_PASSWORD se define
# exclusivamente en el entorno local; no se incorpora al repositorio.
@contextmanager
def conexion():
    conn = obtener_conexion()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def inicializar_bd():
    # Tablas de apoyo compatibles con los formularios de las semanas 11 y 12.
    # Se conservan las cuatro tablas de la Semana 13 creadas en pgAdmin.
    with conexion() as conn:
        with conn.cursor() as cur:
            cur.execute("""CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                usuario VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS rutas_propuestas (
                id SERIAL PRIMARY KEY,
                titulo TEXT NOT NULL,
                nivel TEXT NOT NULL,
                objetivo TEXT NOT NULL
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS perfiles (
                id SERIAL PRIMARY KEY,
                alias TEXT NOT NULL,
                nivel TEXT NOT NULL,
                interes TEXT NOT NULL
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS recursos_propuestos (
                id SERIAL PRIMARY KEY,
                titulo TEXT NOT NULL,
                categoria TEXT NOT NULL,
                descripcion TEXT NOT NULL,
                enlace TEXT NOT NULL
            )""")


def guardar(sql, valores):
    with conexion() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, valores)


def consultar(sql, valores=()):
    with conexion() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, valores)
            return cur.fetchall()


@login_manager.user_loader
def load_user(user_id):
    try:
        registros = consultar("SELECT id, usuario FROM usuarios WHERE id=%s", (int(user_id),))
    except (ValueError, TypeError):
        return None
    return Usuario(registros[0]["id"], registros[0]["usuario"]) if registros else None


@app.route("/registro", methods=["GET", "POST"])
def registro():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard"))
    form = UsuarioForm()
    if form.validate_on_submit():
        nombre = form.usuario.data.strip()
        existe = consultar("SELECT id FROM usuarios WHERE usuario=%s", (nombre,))
        if existe:
            form.usuario.errors.append("Ese nombre de usuario ya está registrado.")
        else:
            try:
                guardar("INSERT INTO usuarios (usuario, password) VALUES (%s, %s)",
                        (nombre, generate_password_hash(form.password.data)))
            except Exception:
                flash("No se pudo completar el registro. Comprueba si el usuario ya existe.", "danger")
            else:
                flash("Usuario registrado. Ahora puedes iniciar sesión.", "success")
                return redirect(url_for("login"))
    return render_template("registro.html", form=form, active="registro")


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard"))
    form = LoginForm()
    if form.validate_on_submit():
        registros = consultar("SELECT id, usuario, password FROM usuarios WHERE usuario=%s",
                             (form.usuario.data.strip(),))
        usuario = registros[0] if registros else None
        if usuario and check_password_hash(usuario["password"], form.password.data):
            login_user(Usuario(usuario["id"], usuario["usuario"]))
            flash("Bienvenido a DAW UEA.", "success")
            # No se utiliza una URL arbitraria para evitar redirecciones abiertas.
            return redirect(url_for("dashboard"))
        flash("Usuario o contraseña incorrectos.", "danger")
    return render_template("login.html", form=form, active="login")


@app.route("/dashboard")
@login_required
def dashboard():
    total = consultar("SELECT COUNT(*) AS cantidad FROM recursos_propuestos")[0]["cantidad"]
    return render_template("dashboard.html", total=total, active="dashboard")


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    form = EliminarForm()
    if not form.validate_on_submit():
        abort(400)
    logout_user()
    flash("Has cerrado sesión de forma segura.", "success")
    return redirect(url_for("login"))


# Se inicializa al arrancar; PostgreSQL debe estar activo y configurado.
inicializar_bd()

PLATAFORMA = {"nombre": "DAW UEA", "lema": "Aprende, practica y crea"}
NAVEGACION = [
    {"titulo": "Inicio", "endpoint": "inicio"},
    {"titulo": "Rutas", "endpoint": "rutas"},
    {"titulo": "Para quién es", "endpoint": "participantes"},
    {"titulo": "Recursos", "endpoint": "recursos"},
    {"titulo": "Administrar recursos", "endpoint": "gestionar_recursos"},
    {"titulo": "Consultas", "endpoint": "solicitudes"},
]
MODULOS = [
    {"nombre": "Rutas de aprendizaje", "etiqueta": "Empieza aquí", "descripcion": "Aprende HTML, CSS, diseño adaptable, JavaScript y Flask paso a paso.", "endpoint": "rutas"},
    {"nombre": "Aprende a tu ritmo", "etiqueta": "Tu nivel", "descripcion": "Encuentra sugerencias para principiantes y personas con conocimientos previos.", "endpoint": "participantes"},
    {"nombre": "Recursos digitales", "etiqueta": "Material gratuito", "descripcion": "Visita guías gratuitas y documentación para practicar con ejemplos reales.", "endpoint": "recursos"},
    {"nombre": "Consultas de aprendizaje", "etiqueta": "Organiza tus dudas", "descripcion": "Escribe y guarda preguntas en tu propio navegador para seguir practicando.", "endpoint": "solicitudes"},
]
RUTAS = [
    {"titulo": "HTML5: crea la estructura", "nivel": "Inicial", "descripcion": "Aprende títulos, párrafos, enlaces, imágenes y etiquetas semánticas.", "reto": "Crea una página con tu presentación y un enlace.", "estado": "Disponible"},
    {"titulo": "CSS3: diseña tu página", "nivel": "Inicial", "descripcion": "Utiliza colores, fuentes, márgenes, Flexbox y estilos responsivos.", "reto": "Da estilo a la página HTML y prueba otra paleta de colores.", "estado": "Disponible"},
    {"titulo": "Bootstrap: adapta tu diseño", "nivel": "Intermedio", "descripcion": "Organiza columnas, tarjetas, menús y formularios en diferentes pantallas.", "reto": "Crea tres tarjetas que se adapten al celular.", "estado": "Disponible"},
    {"titulo": "JavaScript: añade interacción", "nivel": "Intermedio", "descripcion": "Captura eventos, valida formularios y modifica contenido.", "reto": "Muestra un mensaje al presionar un botón.", "estado": "Disponible"},
    {"titulo": "Flask: organiza varias páginas", "nivel": "Siguiente nivel", "descripcion": "Conoce rutas, plantillas Jinja2 y reutilización de componentes.", "reto": "Crea dos rutas y comparte una plantilla base.", "estado": "Profundización"},
]
RECURSOS = [
    {"titulo": "Aprende desarrollo web — MDN", "descripcion": "Lecciones de HTML, CSS y JavaScript en español, con ejemplos.", "estado": "Disponible", "url": "https://developer.mozilla.org/es/docs/Learn_web_development"},
    {"titulo": "Guía de HTML — MDN", "descripcion": "Consulta etiquetas y estructura de documentos web.", "estado": "Disponible", "url": "https://developer.mozilla.org/es/docs/Web/HTML"},
    {"titulo": "Guía de CSS — MDN", "descripcion": "Propiedades, selectores y diseño de páginas.", "estado": "Disponible", "url": "https://developer.mozilla.org/es/docs/Web/CSS"},
    {"titulo": "JavaScript — MDN", "descripcion": "Fundamentos de programación e interacción en el navegador.", "estado": "Disponible", "url": "https://developer.mozilla.org/es/docs/Web/JavaScript"},
    {"titulo": "Documentación de Bootstrap", "descripcion": "Ejemplos oficiales de componentes y diseño responsivo.", "estado": "Disponible", "url": "https://getbootstrap.com/docs/5.3/getting-started/introduction/"},
    {"titulo": "Documentación de Flask", "descripcion": "Guía oficial para crear rutas y trabajar con plantillas.", "estado": "Disponible", "url": "https://flask.palletsprojects.com/en/stable/"},
]
PARTICIPANTES = [
    {"nombre": "Estoy empezando", "nivel": "Principiante", "descripcion": "Quieres saber cómo funciona una página y aún no has escrito código.", "ruta": "HTML5 y CSS3"},
    {"nombre": "Ya creé mi primera página", "nivel": "En práctica", "descripcion": "Conoces algunas etiquetas y quieres que tu diseño se vea bien en el celular.", "ruta": "Bootstrap y JavaScript"},
    {"nombre": "Quiero ir más allá", "nivel": "Profundización", "descripcion": "Deseas organizar varias páginas y compartir partes de la interfaz.", "ruta": "Flask y Jinja2"},
]

@app.context_processor
def datos_comunes():
    return {"plataforma": PLATAFORMA, "navegacion": NAVEGACION, "logout_form": EliminarForm()}

@app.route("/")
def inicio():
    return render_template("index.html", modulos=MODULOS, active="inicio")

@app.route("/rutas")
def rutas():
    return render_template("rutas.html", rutas=RUTAS, active="rutas")

@app.route("/participantes")
def participantes():
    return render_template("participantes.html", participantes=PARTICIPANTES, active="participantes")

@app.route("/recursos")
def recursos():
    return render_template("recursos.html", recursos=RECURSOS, active="recursos")

@app.route("/solicitudes")
def solicitudes():
    return render_template("solicitudes.html", rutas=RUTAS, active="solicitudes")



@app.route("/solicitudes/nueva", methods=["GET", "POST"])
def nueva_consulta():
    form = ConsultaForm()
    if form.validate_on_submit():
        guardar("INSERT INTO consultas (nombre,correo,tema,mensaje) VALUES (%s,%s,%s,%s)",
                (form.nombre.data.strip(), form.correo.data.strip(), form.tema.data, form.mensaje.data.strip()))
        flash("Consulta guardada correctamente en esta aplicación local.", "success")
        return redirect(url_for("nueva_consulta"))
    registros = consultar("SELECT id_consulta AS id,nombre,tema,mensaje FROM consultas ORDER BY id_consulta DESC")
    return render_template("formulario_consulta.html", form=form, registros=registros, active="solicitudes")


@app.route("/rutas/proponer", methods=["GET", "POST"])
def proponer_ruta():
    form = RutaForm()
    if form.validate_on_submit():
        guardar("INSERT INTO rutas_propuestas (titulo,nivel,objetivo) VALUES (%s,%s,%s)",
                (form.titulo.data.strip(), form.nivel.data, form.objetivo.data.strip()))
        flash("Propuesta guardada correctamente en esta aplicación local.", "success")
        return redirect(url_for("proponer_ruta"))
    registros = consultar("SELECT id,titulo,nivel,objetivo FROM rutas_propuestas ORDER BY id DESC")
    return render_template("formulario_ruta.html", form=form, registros=registros, active="rutas")


@app.route("/participantes/perfil", methods=["GET", "POST"])
def crear_perfil():
    form = ParticipanteForm()
    if form.validate_on_submit():
        guardar("INSERT INTO perfiles (alias,nivel,interes) VALUES (%s,%s,%s)",
                (form.alias.data.strip(), form.nivel.data, form.interes.data.strip()))
        flash("Perfil guardado correctamente en esta aplicación local.", "success")
        return redirect(url_for("crear_perfil"))
    registros = consultar("SELECT id,alias,nivel,interes FROM perfiles ORDER BY id DESC")
    return render_template("formulario_participante.html", form=form, registros=registros, active="participantes")


@app.route("/recursos/sugerir", methods=["GET", "POST"])
def sugerir_recurso():
    form = RecursoForm()
    if form.validate_on_submit():
        guardar("INSERT INTO recursos_propuestos (titulo,categoria,descripcion,enlace) VALUES (%s,%s,%s,%s)",
                (form.titulo.data.strip(), form.categoria.data, form.descripcion.data.strip(), form.enlace.data.strip()))
        flash("Recurso guardado correctamente en esta aplicación local.", "success")
        return redirect(url_for("sugerir_recurso"))
    registros = consultar("SELECT id,titulo,categoria,descripcion,enlace FROM recursos_propuestos ORDER BY id DESC")
    return render_template("formulario_recurso.html", form=form, registros=registros, active="recursos")




# Semana 13: CRUD de recursos educativos mediante PostgreSQL.
# Reutiliza la clase RecursoForm y sus validadores de Flask-WTF.
class EliminarForm(FlaskForm):
    pass


PLANTILLA_GESTION = """<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Administrar recursos | DAW UEA</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></head>
<body class="bg-light"><nav class="navbar navbar-dark bg-dark"><div class="container">
<a class="navbar-brand" href="{{ url_for('inicio') }}">DAW UEA</a>
<span class="text-light">Usuario: {{ current_user.usuario }}</span> <a class="btn btn-outline-light btn-sm" href="{{ url_for('dashboard') }}">Panel privado</a>
</div></nav><main class="container py-5"><h1>Administración de recursos educativos</h1>
<p>Consulta, modifica y elimina las propuestas registradas en PostgreSQL.</p>
{% with mensajes = get_flashed_messages(with_categories=true) %}
{% for categoria,mensaje in mensajes %}<div class="alert alert-{{ 'success' if categoria=='success' else 'warning' }}">{{ mensaje }}</div>{% endfor %}
{% endwith %}
<a class="btn btn-success mb-3" href="{{ url_for('sugerir_recurso') }}">Registrar nuevo recurso</a>
<div class="table-responsive"><table class="table table-striped bg-white"><thead><tr><th>ID</th><th>Título</th><th>Categoría</th><th>Enlace</th><th>Acciones</th></tr></thead><tbody>
{% for recurso in registros %}<tr><td>{{ recurso.id }}</td><td>{{ recurso.titulo }}</td><td>{{ recurso.categoria }}</td>
<td><a href="{{ recurso.enlace }}" target="_blank" rel="noopener noreferrer">Abrir</a></td>
<td class="d-flex gap-2"><a class="btn btn-primary btn-sm" href="{{ url_for('editar_recurso', recurso_id=recurso.id) }}">Editar</a>
<form method="post" action="{{ url_for('eliminar_recurso', recurso_id=recurso.id) }}" onsubmit="return confirm('¿Eliminar este recurso?')">
{{ eliminar_form.hidden_tag() }}<button class="btn btn-danger btn-sm" type="submit">Eliminar</button></form></td></tr>
{% else %}<tr><td colspan="5">Todavía no hay recursos registrados.</td></tr>{% endfor %}
</tbody></table></div></main></body></html>"""


PLANTILLA_EDICION = """<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Editar recurso | DAW UEA</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></head>
<body class="bg-light"><main class="container py-5" style="max-width:750px"><h1>Editar recurso educativo</h1>
<form method="post" novalidate>{{ form.hidden_tag() }}
{% for campo in [form.titulo,form.categoria,form.descripcion,form.enlace] %}
<div class="mb-3">{{ campo.label(class_='form-label') }}{{ campo(class_='form-control') }}
{% for error in campo.errors %}<small class="text-danger">{{ error }}</small>{% endfor %}</div>
{% endfor %}<button class="btn btn-success" type="submit">Guardar cambios</button>
<a href="{{ url_for('gestionar_recursos') }}" class="btn btn-outline-secondary">Cancelar</a></form>
</main></body></html>"""


@app.route('/recursos/gestionar')
@login_required
def gestionar_recursos():
    registros = consultar('SELECT id,titulo,categoria,descripcion,enlace FROM recursos_propuestos ORDER BY id DESC')
    return render_template_string(PLANTILLA_GESTION, registros=registros, eliminar_form=EliminarForm())


@app.route('/recursos/<int:recurso_id>/editar', methods=['GET','POST'])
@login_required
def editar_recurso(recurso_id):
    resultados = consultar('SELECT id,titulo,categoria,descripcion,enlace FROM recursos_propuestos WHERE id=%s', (recurso_id,))
    if not resultados:
        abort(404)
    recurso = resultados[0]
    form = RecursoForm()
    if form.validate_on_submit():
        guardar('UPDATE recursos_propuestos SET titulo=%s,categoria=%s,descripcion=%s,enlace=%s WHERE id=%s',
                (form.titulo.data.strip(), form.categoria.data, form.descripcion.data.strip(), form.enlace.data.strip(), recurso_id))
        flash('Recurso actualizado correctamente.', 'success')
        return redirect(url_for('gestionar_recursos'))
    if request.method == 'GET':
        for campo in ('titulo','categoria','descripcion','enlace'):
            getattr(form, campo).data = recurso[campo]
    return render_template_string(PLANTILLA_EDICION, form=form)


@app.route('/recursos/<int:recurso_id>/eliminar', methods=['POST'])
@login_required
def eliminar_recurso(recurso_id):
    form = EliminarForm()
    if not form.validate_on_submit():
        abort(400)
    guardar('DELETE FROM recursos_propuestos WHERE id=%s', (recurso_id,))
    flash('Recurso eliminado.', 'success')
    return redirect(url_for('gestionar_recursos'))

if __name__ == "__main__":
    app.run(debug=True)
