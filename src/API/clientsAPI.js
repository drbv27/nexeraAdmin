import axios from "axios";

const clientsApi = axios.create({
    baseURL: "http://localhost:3000"
})

export const getClients = async () => {
   const res =  await clientsApi.get('/clients');
   return res.data;
}
export const getClient = async () => {
   const res =  await clientsApi.get('/clients/:id');
   return res.data;
}

export const createClient =  (client) => clientsApi.post('/clients', client);