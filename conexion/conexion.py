import os
import psycopg2
from psycopg2.extras import RealDictCursor

def obtener_conexion():
    return psycopg2.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        port=os.environ.get("DB_PORT", "5432"),
        database=os.environ.get("DB_NAME", "daw_uea"),
        user=os.environ.get("DB_USER", "postgres"),
        password=os.environ.get("DB_PASSWORD"),
        cursor_factory=RealDictCursor,
    )
