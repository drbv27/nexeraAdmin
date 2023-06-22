// api/api.js
export const fetchStates = (authToken, country) => {
  return fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + authToken,
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const fetchCities = (authToken, state) => {
  return fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + authToken,
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
