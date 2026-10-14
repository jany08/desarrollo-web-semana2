# DAW UEA — Semana 13
Plataforma educativa sobre desarrollo web. Conserva el frontend y formularios de semanas anteriores e incorpora persistencia PostgreSQL.

## Configuración local
Requiere Python y PostgreSQL. Crear la base `daw_uea` y ejecutar `sql/esquema.sql` en pgAdmin (si ya existen las tablas, `IF NOT EXISTS` evita duplicarlas).
En PowerShell dentro de esta carpeta:

```powershell
python -m pip install -r requirements.txt
$env:DB_PASSWORD = 'TU_CONTRASEÑA_LOCAL'
python app.py
```
Abrir http://127.0.0.1:5000 . No compartir ni subir contraseñas. La variable DB_PASSWORD se aplica solo a la sesión. Puedes cambiar host/puerto/usuario con DB_HOST/DB_PORT/DB_USER.

GitHub Pages solo sirve la parte estática `index.html`; los formularios con Flask/PostgreSQL requieren ejecutar el servidor Python localmente. Se conserva `data/daw_uea.db` como respaldo de la Semana 12, pero la versión nueva usa PostgreSQL.
