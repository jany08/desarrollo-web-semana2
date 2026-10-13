# DAW UEA — Aprende a crear páginas web

Plataforma educativa sobre HTML, CSS, Bootstrap, JavaScript y Flask, con rutas de aprendizaje, prácticas, enlaces gratuitos y un cuaderno de consultas guardadas localmente en el navegador.

## Proyecto Integrador — Semana 10

Se preservan las cinco rutas Flask (`/`, `/rutas`, `/participantes`, `/recursos`, `/solicitudes`). Las plantillas heredan de `base.html` y reutilizan componentes en `templates/components/`. Los datos provienen de listas y diccionarios en `app.py`; se muestran mediante `{{ variable }}`, bucles `{% for %}`, condicionales `{% if %}`/`{% else %}` y filtros (`upper`). No requiere base de datos.

## Ejecutar Flask localmente

```bash
python -m pip install -r requirements.txt
python app.py
```

Abrir http://127.0.0.1:5000 y verificar cada ruta. GitHub Pages sirve el archivo `index.html` de la raíz y no ejecuta Python.

## Consultas

El formulario está diseñado como cuaderno personal: utiliza `localStorage`. No envía correos ni mensajes a docentes o terceros.

## Recursos

Documentación pública de MDN, Bootstrap y Flask.
