export const headers = {
  "Content-Type": "application/json",
};

export const headersAuth = (token) => ({
  ...headers,
  Authorization: `Bearer ${token}`,
});

export const callbackThen = async (res) => {
  const { status } = res;
  const data = await res.json();
  if (status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

export const callbackCatch = (error) => {
  throw error;
};
