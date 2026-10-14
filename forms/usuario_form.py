from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo, Regexp

class UsuarioForm(FlaskForm):
    usuario = StringField("Nombre de usuario", validators=[DataRequired(), Length(min=3, max=50), Regexp(r"^[A-Za-z0-9_.-]+$", message="Utiliza letras, números, punto, guion o guion bajo.")])
    password = PasswordField("Contraseña", validators=[DataRequired(), Length(min=8, max=72)])
    confirmar = PasswordField("Confirmar contraseña", validators=[DataRequired(), EqualTo("password", message="Las contraseñas no coinciden.")])
    submit = SubmitField("Crear cuenta")
