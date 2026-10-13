from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length


class RutaForm(FlaskForm):
    titulo = StringField("Nombre de la ruta", validators=[DataRequired(), Length(min=5, max=90)])
    nivel = SelectField("Nivel", choices=[("", "Selecciona un nivel"), ("Inicial", "Inicial"), ("Intermedio", "Intermedio"), ("Avanzado", "Avanzado")], validators=[DataRequired()])
    objetivo = TextAreaField("¿Qué quieres practicar?", validators=[DataRequired(), Length(min=15, max=500)])
    enviar = SubmitField("Registrar propuesta")
