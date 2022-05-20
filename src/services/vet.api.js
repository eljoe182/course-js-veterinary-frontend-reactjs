import {
  headers,
  headersAuth,
  callbackThen,
  callbackCatch,
} from "../helpers/fetch.helpers";

const TOKEN = localStorage.getItem("token");

export const signUp = async (data) => {
  const { name, email, password } = data;
  return fetch(`${import.meta.env.VITE_API_URL}/vet/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, email, password }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const login = async (data) => {
  const { email, password } = data;
  return fetch(`${import.meta.env.VITE_API_URL}/vet/login`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const forgotPassword = async (email) => {
  return fetch(`${import.meta.env.VITE_API_URL}/vet/forgot_password`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const confirm = async (token) => {
  return fetch(`${import.meta.env.VITE_API_URL}/vet/confirm/${token}`, {
    method: "GET",
    headers,
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const validateToken = async (token) => {
  return fetch(`${import.meta.env.VITE_API_URL}/vet/reset_password/${token}`, {
    method: "GET",
    headers,
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const resetPassword = async ({ token, password }) => {
  return fetch(`${import.meta.env.VITE_API_URL}/vet/reset_password/${token}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ password }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const profile = async () => {
  return fetch(`${import.meta.env.VITE_API_URL}/vet`, {
    method: "GET",
    headers: headersAuth(TOKEN),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const updateProfile = async ({ id, data }) => {
  const { name, email, phone } = data;
  return fetch(`${import.meta.env.VITE_API_URL}/vet/update/${id}`, {
    method: "PUT",
    headers: headersAuth(TOKEN),
    body: JSON.stringify({ name, email, phone }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const changePassword = async (data) => {
  const { oldPassword, newPassword } = data;
  return fetch(`${import.meta.env.VITE_API_URL}/vet/change_password`, {
    method: "POST",
    headers: headersAuth(TOKEN),
    body: JSON.stringify({ password: oldPassword, newPassword }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};
