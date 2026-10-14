-- Semana 13. Tablas de apoyo para conservar formularios existentes.
-- Las tablas consultas, participantes, recursos y rutas_aprendizaje
-- ya fueron creadas en pgAdmin 4.
CREATE TABLE IF NOT EXISTS rutas_propuestas (
 id SERIAL PRIMARY KEY, titulo TEXT NOT NULL, nivel TEXT NOT NULL, objetivo TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS perfiles (
 id SERIAL PRIMARY KEY, alias TEXT NOT NULL, nivel TEXT NOT NULL, interes TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS recursos_propuestos (
 id SERIAL PRIMARY KEY, titulo TEXT NOT NULL, categoria TEXT NOT NULL,
 descripcion TEXT NOT NULL, enlace TEXT NOT NULL
);
