from flask import Flask, render_template

app = Flask(__name__)

MODULOS = [
    {
        "nombre": "Rutas de aprendizaje",
        "etiqueta": "Orientación",
        "descripcion": "Organiza el recorrido de estudio desde HTML5 hasta Flask.",
    },
    {
        "nombre": "Participantes",
        "etiqueta": "Usuarios",
        "descripcion": "Representa perfiles básicos de personas interesadas en aprender desarrollo web.",
    },
    {
        "nombre": "Recursos digitales",
        "etiqueta": "Materiales",
        "descripcion": "Agrupa videos, guías y ejemplos para reforzar la práctica.",
    },
    {
        "nombre": "Solicitudes de orientación",
        "etiqueta": "Seguimiento",
        "descripcion": "Simula consultas registradas mediante un formulario validado.",
    },
]

RUTAS = [
    "HTML5 y estructura semántica",
    "CSS3 y diseño visual",
    "Bootstrap responsivo",
    "JavaScript y validaciones",
    "Flask, rutas y plantillas",
]

RECURSOS = [
    {"titulo": "Estructura HTML", "tipo": "Guía breve", "estado": "Disponible"},
    {"titulo": "Diseño responsivo", "tipo": "Práctica Bootstrap", "estado": "Disponible"},
    {"titulo": "Validación de formularios", "tipo": "Ejemplo JavaScript", "estado": "En revisión"},
]


@app.route("/")
def inicio():
    return render_template("index.html", modulos=MODULOS, rutas=RUTAS, recursos=RECURSOS, active="inicio")


@app.route("/rutas")
def rutas():
    return render_template("rutas.html", rutas=RUTAS, active="rutas")


@app.route("/participantes")
def participantes():
    participantes_demo = [
        {"nombre": "Estudiante inicial", "interes": "HTML5"},
        {"nombre": "Usuario en práctica", "interes": "Bootstrap"},
        {"nombre": "Consulta técnica", "interes": "Flask"},
    ]
    return render_template("participantes.html", participantes=participantes_demo, active="participantes")


@app.route("/recursos")
def recursos():
    return render_template("recursos.html", recursos=RECURSOS, active="recursos")


@app.route("/solicitudes")
def solicitudes():
    solicitudes_demo = [
        {"tema": "Validación de formularios", "estado": "Pendiente"},
        {"tema": "Organización de plantillas", "estado": "Revisada"},
    ]
    return render_template("solicitudes.html", solicitudes=solicitudes_demo, active="solicitudes")


if __name__ == "__main__":
    app.run(debug=True)