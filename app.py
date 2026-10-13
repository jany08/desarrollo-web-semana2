from flask import Flask, render_template, flash, redirect, url_for, request
import os
import secrets
import sqlite3
from pathlib import Path

from forms.consulta_form import ConsultaForm
from forms.ruta_form import RutaForm
from forms.participante_form import ParticipanteForm
from forms.recurso_form import RecursoForm

app = Flask(__name__)
# Para despliegues reales configura SECRET_KEY como variable de entorno.
# La clave temporal permite la ejecución local sin guardar secretos en GitHub.
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY") or secrets.token_hex(32)

# Los registros se guardan en SQLite y sobreviven al reinicio de Flask.
DB_PATH = Path(__file__).resolve().parent / "data" / "daw_uea.db"


def conexion():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def inicializar_bd():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with conexion() as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL, correo TEXT NOT NULL,
            tema TEXT NOT NULL, mensaje TEXT NOT NULL
        )""")
        conn.execute("""CREATE TABLE IF NOT EXISTS rutas_propuestas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL, nivel TEXT NOT NULL, objetivo TEXT NOT NULL
        )""")
        conn.execute("""CREATE TABLE IF NOT EXISTS perfiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            alias TEXT NOT NULL, nivel TEXT NOT NULL, interes TEXT NOT NULL
        )""")
        conn.execute("""CREATE TABLE IF NOT EXISTS recursos_propuestos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL, categoria TEXT NOT NULL,
            descripcion TEXT NOT NULL, enlace TEXT NOT NULL
        )""")
        conn.commit()


def guardar(sql, valores):
    with conexion() as conn:
        conn.execute(sql, valores)
        conn.commit()


def consultar(sql):
    conn = conexion()
    try:
        return conn.execute(sql).fetchall()
    finally:
        conn.close()


inicializar_bd()
PLATAFORMA = {"nombre": "DAW UEA", "lema": "Aprende, practica y crea"}
NAVEGACION = [
    {"titulo": "Inicio", "endpoint": "inicio"},
    {"titulo": "Rutas", "endpoint": "rutas"},
    {"titulo": "Para quién es", "endpoint": "participantes"},
    {"titulo": "Recursos", "endpoint": "recursos"},
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
    return {"plataforma": PLATAFORMA, "navegacion": NAVEGACION}

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
        guardar("INSERT INTO consultas (nombre,correo,tema,mensaje) VALUES (?,?,?,?)",
                (form.nombre.data.strip(), form.correo.data.strip(), form.tema.data, form.mensaje.data.strip()))
        flash("Consulta guardada correctamente en esta aplicación local.", "success")
        return redirect(url_for("nueva_consulta"))
    registros = consultar("SELECT id,nombre,tema,mensaje FROM consultas ORDER BY id DESC")
    return render_template("formulario_consulta.html", form=form, registros=registros, active="solicitudes")


@app.route("/rutas/proponer", methods=["GET", "POST"])
def proponer_ruta():
    form = RutaForm()
    if form.validate_on_submit():
        guardar("INSERT INTO rutas_propuestas (titulo,nivel,objetivo) VALUES (?,?,?)",
                (form.titulo.data.strip(), form.nivel.data, form.objetivo.data.strip()))
        flash("Propuesta guardada correctamente en esta aplicación local.", "success")
        return redirect(url_for("proponer_ruta"))
    registros = consultar("SELECT id,titulo,nivel,objetivo FROM rutas_propuestas ORDER BY id DESC")
    return render_template("formulario_ruta.html", form=form, registros=registros, active="rutas")


@app.route("/participantes/perfil", methods=["GET", "POST"])
def crear_perfil():
    form = ParticipanteForm()
    if form.validate_on_submit():
        guardar("INSERT INTO perfiles (alias,nivel,interes) VALUES (?,?,?)",
                (form.alias.data.strip(), form.nivel.data, form.interes.data.strip()))
        flash("Perfil guardado correctamente en esta aplicación local.", "success")
        return redirect(url_for("crear_perfil"))
    registros = consultar("SELECT id,alias,nivel,interes FROM perfiles ORDER BY id DESC")
    return render_template("formulario_participante.html", form=form, registros=registros, active="participantes")


@app.route("/recursos/sugerir", methods=["GET", "POST"])
def sugerir_recurso():
    form = RecursoForm()
    if form.validate_on_submit():
        guardar("INSERT INTO recursos_propuestos (titulo,categoria,descripcion,enlace) VALUES (?,?,?,?)",
                (form.titulo.data.strip(), form.categoria.data, form.descripcion.data.strip(), form.enlace.data.strip()))
        flash("Recurso guardado correctamente en esta aplicación local.", "success")
        return redirect(url_for("sugerir_recurso"))
    registros = consultar("SELECT id,titulo,categoria,descripcion,enlace FROM recursos_propuestos ORDER BY id DESC")
    return render_template("formulario_recurso.html", form=form, registros=registros, active="recursos")


if __name__ == "__main__":
    app.run(debug=True)
