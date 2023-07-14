// Obtener referencias a los elementos del formulario
const formulario = document.getElementById('formulario');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');

// Agregar un evento de escucha para el envío del formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se envíe el formulario por defecto

  // Obtener los valores ingresados en el formulario
  const usuario = usuarioInput.value;
  const password = passwordInput.value;

  // Realizar la validación de credenciales
  validarCredenciales(usuario, password);
});

// Función para realizar la validación de credenciales
async function validarCredenciales(usuario, password) {
  try {
    // Realizar la solicitud POST a sheet.best para almacenar los datos
    await fetch('https://sheet.best/api/sheets/db5687f4-4a8c-44d7-a76d-10194a92df90', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Usuario": usuario,
        "Contraseña": password
      })
    });

    // Validar las credenciales
    if (usuario === 'usuario' && password === 'contraseña') {
      // Credenciales válidas, redirigir a la página de éxito
      window.location.href = 'html/index.html';
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      mostrarMensajeError('Credenciales inválidas');
    }
  } catch (error) {
    console.log(error);
    mostrarMensajeError('Error al procesar las credenciales');
  }
}

// Función para mostrar un mensaje de error en el formulario
function mostrarMensajeError(mensaje) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  errorDiv.innerText = mensaje;
  formulario.appendChild(errorDiv);
}
