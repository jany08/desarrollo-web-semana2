from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length


class ParticipanteForm(FlaskForm):
    alias = StringField("Nombre o alias", validators=[DataRequired(), Length(min=3, max=60)])
    nivel = SelectField("Experiencia", choices=[("", "Selecciona tu nivel"), ("Principiante", "Principiante"), ("En práctica", "En práctica"), ("Profundización", "Profundización")], validators=[DataRequired()])
    interes = StringField("¿Qué tema te interesa?", validators=[DataRequired(), Length(min=5, max=120)])
    enviar = SubmitField("Guardar perfil")
