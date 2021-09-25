import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  const errorEmail = document.querySelector(".errorEmail");
  const errorPassword = document.querySelector(".errorPassword");
  errorEmail.innerHTML =""
  errorPassword.innerHTML =""
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {

    let message = error.message;
    if(message==="Request failed with status code 404"){
      errorEmail.innerHTML = "El usuario ingresado no existe";
    }
    if(message==="Request failed with status code 400"){
      errorPassword.innerHTML = "Contraseña inválida";
    }
    if(message==="Request failed with status code 500"){
      errorPassword.innerHTML = "Algo salió mal :(";
    }
  }
};

export const signup = (formData, router) => async (dispatch) => {
  const errorEmail = document.querySelector(".errorEmail");
  const errorPassword = document.querySelector(".errorPassword");
  errorEmail.innerHTML =""
  errorPassword.innerHTML =""
  try {
    const { data } = await api.signUp(formData);
    
    dispatch({ type: AUTH, data });
    
    router.push('/');
  } catch (error) {
    
    let message = error.message;
    if(message==="Request failed with status code 400"){
      errorEmail.innerHTML = "El email ingresado ya existe";
  }
  console.log(message)
}
}
