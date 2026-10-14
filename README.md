# DAW UEA — Plataforma educativa | Semana 14

Proyecto integrador continuo: HTML, CSS, Bootstrap, JavaScript, Flask, Jinja2, WTForms, PostgreSQL y Flask-Login.

## Novedad de la Semana 14
- Registro de usuarios en PostgreSQL mediante `INSERT` parametrizado y `generate_password_hash`.
- Autenticación con `check_password_hash`, `login_user` y `UserMixin`.
- Sesiones con Flask-Login, acceso a `/dashboard` y restricción de `/recursos/gestionar`, edición y eliminación mediante `@login_required`.
- Salida por `POST /logout` con CSRF. Usuario visible en la navegación.
- Se conserva el CRUD de recursos de la Semana 13 y las secciones educativas.

## Ejecutar en Windows (PowerShell)
1. PostgreSQL 18 debe estar iniciado y existir la base `daw_uea` de la Semana 13.
2. En la carpeta `desarrollo-web-semana2-main`: `python -m pip install -r requirements.txt`.
3. En **la misma terminal**: `$env:DB_PASSWORD = Read-Host 'Contraseña de PostgreSQL'` (no subirla a GitHub).
4. Opcional para sesiones estables: `$env:SECRET_KEY = Read-Host 'Clave secreta local'` (una clave larga y aleatoria; no subirla a GitHub).
5. Ejecutar: `python app.py`.
6. Abrir: http://127.0.0.1:5000/registro

El servidor crea la tabla `usuarios` si falta. Alternativamente puede ejecutarse `sql/esquema.sql` en pgAdmin contra `daw_uea`. **No es necesario borrar ni recrear la base existente.**

## Pruebas para la docente
1. Registrar un usuario y comprobar en pgAdmin: `SELECT id, usuario, password FROM usuarios;` (el valor de `password` debe ser hash, no texto plano).
2. Probar contraseña incorrecta; luego iniciar sesión con la correcta.
3. Abrir `/dashboard` y `/recursos/gestionar` como usuario autenticado.
4. Probar editar o eliminar un recurso de prueba.
5. Cerrar sesión y abrir `/recursos/gestionar`: debe redirigir al login.

## GitHub Pages
GitHub Pages publica **únicamente** el `index.html` estático. El registro, login, sesiones y PostgreSQL requieren correr el servidor Flask localmente.

## Seguridad
Nunca subir claves o contraseñas, archivos de base de datos, `__pycache__`, `.env` o credenciales. La `SECRET_KEY` efímera se regenera entre reinicios si no se define la variable de entorno, por lo que las sesiones previas expiran. La aplicación usa el servidor de desarrollo exclusivamente para pruebas locales.
