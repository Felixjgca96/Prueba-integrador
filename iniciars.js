const formulario = document.querySelector(".cuestionario");
const correoInput = document.getElementById("correo");
const passInput = document.getElementById("password");
const errorMessage = document.getElementById("form__error");

const saveToSessionStorage = (user) => {
  sessionStorage.setItem("activeUser", JSON.stringify(user));
};

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isValidAccount = () => {
  let valid = false;

  if (isEmpty(correoInput)) {
    alert("Por favor, complete el correo");
    return;
  }

  if (isEmpty(passInput)) {
    alert("Por favor, complete la contraseña");
    return;
  }

  valid = true;
  return valid;
};

const formularioInformacion = (e) => {
  e.preventDefault();

  if (isValidAccount()) {
    formulario.reset();
    alert("Iniciaste sesión con exito!!!!");
    window.location.href = "./index.html";
  }
};

const init = () => {
  formulario.addEventListener("submit", formularioInformacion);
};

init();
