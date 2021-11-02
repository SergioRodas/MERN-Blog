import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

const errors_style = "display: block; padding: 5px 30px 5px 30px; border: 1px solid; margin: 10px auto; background-repeat: no-repeat; background-position: 10px center; background-color: #FFBABA; color: #D8000C;"

export const signin = (formData, router) => async (dispatch) => {
  const errorEmail = document.querySelector(".errorEmail");
  const errorPassword = document.querySelector(".errorPassword");

  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {

    let errorMessage = Object.values(error)[2].data.message;
    let errorStatus = Object.values(error)[2].status

    if (errorStatus === 404) {
      errorEmail.style = errors_style
      errorEmail.innerHTML = errorMessage
    } else {
      errorPassword.style = errors_style
      errorPassword.innerHTML = errorMessage
    }
  }
};

export const signup = (formData, router) => async (dispatch) => {
  const errorEmail = document.querySelector(".errorEmail");
  const errorPassword = document.querySelector(".errorPassword");

  if (formData.password.length < 8) {
    errorPassword.style = errors_style
    errorPassword.innerHTML = "La contraseña debe tener 8 caracteres como mínimo."
  } else {
    try {
      const { data } = await api.signUp(formData);
      
      dispatch({ type: AUTH, data });
      
      router.push('/');
    } catch (error) {
      let errorMessage = Object.values(error)[2].data.message;

      errorEmail.style = errors_style
      errorEmail.innerHTML = errorMessage
      
    }
  }
}
