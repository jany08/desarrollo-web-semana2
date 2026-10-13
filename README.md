# DAW UEA – Plataforma educativa para aprender a crear páginas web

## Proyecto Integrador U3 · Semana 12/16
Esta versión conserva el frontend educativo y las rutas, formularios y validaciones de las semanas anteriores. Incorpora SQLite para guardar localmente consultas, propuestas de rutas, perfiles de aprendizaje y recomendaciones de recursos.

## Cómo ejecutarlo localmente
Desde la carpeta del proyecto, con Python instalado:

```bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Abrir `http://127.0.0.1:5000`. Completar alguno de los formularios, comprobar la tabla de registros, detener el servidor, iniciarlo de nuevo y verificar que los datos permanecen.

## Persistencia SQLite
- Archivo: `data/daw_uea.db` (base inicial sin datos personales).
- Clave primaria `id` en cada tabla.
- Se usa `sqlite3.connect()`, `CREATE TABLE IF NOT EXISTS`, `INSERT` con parámetros `?`, `commit()`, `SELECT`, `fetchall()` y cierre de conexión.
- El guardado ocurre únicamente tras `form.validate_on_submit()`. Flask-WTF mantiene CSRF con `form.hidden_tag()` y la clave de sesión.
- La base real de cada computadora permanece local. Evita subir datos personales a un repositorio público.

## Publicación
GitHub Pages sirve el archivo estático `index.html` de la raíz. Las rutas Flask, formularios servidor y SQLite se prueban de manera local; GitHub Pages no ejecuta Python.

Este proyecto tiene temática educativa. Los nombres comerciales de la guía son ejemplos para otras temáticas.
