const formulario = document.querySelector(".cuestionario");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const tlfInput = document.getElementById("telefono");
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

  if (isEmpty(nombreInput)) {
    alert("Por favor, complete los nombres.");
    return;
  }
  if (isEmpty(correoInput)) {
    alert("Por favor, complete el correo");
    return;
  }

  if (isEmpty(tlfInput)) {
    alert("Por favor, complete el telefono");
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
    alert("Te registraste con exito!!!!");
    window.location.href = "./index.html";
  }
};

const init = () => {
  formulario.addEventListener("submit", formularioInformacion);
};

init();
