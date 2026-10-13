from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, URL


class RecursoForm(FlaskForm):
    titulo = StringField("Título del recurso", validators=[DataRequired(), Length(min=5, max=100)])
    categoria = SelectField("Categoría", choices=[("", "Selecciona una categoría"), ("HTML", "HTML"), ("CSS", "CSS"), ("JavaScript", "JavaScript"), ("Flask", "Flask")], validators=[DataRequired()])
    enlace = StringField("Enlace (https://...)", validators=[DataRequired(), URL(require_tld=True, message="Ingresa una dirección válida con https://")])
    descripcion = TextAreaField("¿Por qué lo recomiendas?", validators=[DataRequired(), Length(min=15, max=500)])
    enviar = SubmitField("Sugerir recurso")
