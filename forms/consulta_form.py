from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, Length


class ConsultaForm(FlaskForm):
    nombre = StringField("Nombre", validators=[DataRequired(message="Escribe tu nombre."), Length(min=4, max=80, message="Escribe entre 4 y 80 caracteres.")])
    correo = StringField("Correo electrónico", validators=[DataRequired(message="Ingresa tu correo."), Email(message="Ingresa un correo electrónico válido.")])
    tema = SelectField("Tema de aprendizaje", choices=[("", "Selecciona un tema"), ("HTML5", "HTML5"), ("CSS3", "CSS3"), ("Bootstrap", "Bootstrap"), ("JavaScript", "JavaScript"), ("Flask", "Flask")], validators=[DataRequired(message="Selecciona un tema.")])
    mensaje = TextAreaField("¿Qué necesitas aprender?", validators=[DataRequired(message="Describe tu consulta."), Length(min=20, max=1000, message="Escribe entre 20 y 1000 caracteres.")])
    enviar = SubmitField("Registrar consulta")
