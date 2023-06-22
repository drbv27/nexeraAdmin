export const fetchAccessToken = () => {
  return fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'api-token': 'M6SXNE-QRw5KJxOBOFKx6InTrSv0rHx955e-cmzjewK6KxT0HBJWq-Sua8GbBYaBIjQ',
      'user-email': 'drbv27@gmail.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.auth_token) {
        return data.auth_token;
      } else {
        throw new Error('No se pudo obtener el token de autenticación');
      }
    });
};