from flask import Flask, render_template

app = Flask(__name__)
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

if __name__ == "__main__":
    app.run(debug=True)
