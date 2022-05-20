import {
  headers,
  headersAuth,
  callbackThen,
  callbackCatch,
} from "../helpers/fetch.helpers";

const TOKEN = localStorage.getItem("token");

export const getPatients = async () => {
  return fetch(`${import.meta.env.VITE_API_URL}/patient`, {
    method: "GET",
    headers: headersAuth(TOKEN),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const storePatient = async (data) => {
  const { name, owner, email, dateOut, symptoms } = data;
  return fetch(`${import.meta.env.VITE_API_URL}/patient/store`, {
    method: "POST",
    headers: headersAuth(TOKEN),
    body: JSON.stringify({ name, owner, email, dateOut, symptoms }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const getPatient = async (id) => {
  return fetch(`${import.meta.env.VITE_API_URL}/patient/show/${id}`, {
    method: "GET",
    headers: headersAuth(TOKEN),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const updatePatient = async ({ id, data }) => {
  const { name, owner, email, dateOut, symptoms } = data;
  return fetch(`${import.meta.env.VITE_API_URL}/patient/update/${id}`, {
    method: "PUT",
    headers: headersAuth(TOKEN),
    body: JSON.stringify({ name, owner, email, dateOut, symptoms }),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};

export const deletePatient = async (id) => {
  return fetch(`${import.meta.env.VITE_API_URL}/patient/destroy/${id}`, {
    method: "DELETE",
    headers: headersAuth(TOKEN),
  })
    .then(callbackThen)
    .catch(callbackCatch);
};
