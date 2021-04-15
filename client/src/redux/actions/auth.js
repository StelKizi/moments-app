import { AUTH } from '../constants/actionTypes';
import * as api from '../../api';

export const signUp = (formData, history) => async dispatch => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, payload: data });

    /* sign up the user */
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, history) => async dispatch => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });

    /* log in the user */
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
