# DAW UEA - Proyecto Integrador U3 · Avance 9/16

## Descripción
Este proyecto conserva el frontend educativo publicado en GitHub Pages y agrega una estructura inicial con Flask para organizar rutas, plantillas y recursos estáticos.

## Estructura
```text
app.py
index.html
templates/
  base.html
  index.html
  rutas.html
  participantes.html
  recursos.html
  solicitudes.html
static/
  css/style.css
  js/script.js
  img/
requirements.txt
```

## Ejecución local de Flask
1. Instalar dependencias:

```bash
pip install -r requirements.txt
```

2. Ejecutar la aplicación:

```bash
python app.py
```

3. Abrir en el navegador:

```text
http://127.0.0.1:5000
```

## Publicación
GitHub Pages debe mostrar el archivo `index.html` ubicado en la parte principal del repositorio. La aplicación Flask se ejecuta localmente, mientras que GitHub Pages mantiene visible la parte frontend del proyecto.