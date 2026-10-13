# DAW UEA — Aprende a crear páginas web

Plataforma educativa con rutas de HTML, CSS, Bootstrap, JavaScript y Flask, recursos gratuitos y ejercicios. La interfaz pública mantiene su propósito educativo.

## Desarrollo académico: avance 11/16

Se mantienen todas las rutas, plantillas y recursos de las semanas previas. Se añade la carpeta `forms/` con cuatro clases `FlaskForm` adaptadas a los módulos de DAW UEA y cuatro vistas de práctica con GET/POST, mensajes de errores por campo, `DataRequired`, `Length`, `Email`, `URL`, `form.hidden_tag()` (CSRF) y `validate_on_submit()`.

Las rutas nuevas son `/solicitudes/nueva`, `/rutas/proponer`, `/participantes/perfil` y `/recursos/sugerir`. Los registros son demostrativos y permanecen en memoria durante la ejecución del servidor; al reiniciarlo se pierden. El formulario del frontend publicado usa `localStorage`, de modo que no debe interpretarse como una herramienta de envío de consultas a docentes.

## Ejecución local

1. Crea y activa un entorno virtual de Python.
2. Instala las dependencias con `python -m pip install -r requirements.txt`.
3. Ejecuta `python app.py` y visita `http://127.0.0.1:5000/`.
4. Comprueba cada formulario con campos vacíos, valores incorrectos y datos válidos. Verifica el token CSRF y que la navegación siga funcionando.

En producción define `SECRET_KEY` mediante una variable de entorno persistente y segura. Para pruebas locales la aplicación genera una clave temporal aleatoria al arrancar.

GitHub Pages únicamente publica la interfaz estática `index.html` junto con CSS y JavaScript. Las rutas Flask-WTF requieren el servidor local.
