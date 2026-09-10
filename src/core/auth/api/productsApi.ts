import axios from "axios";

//TODO: Conectactar mediante envs vars, Andorid e IOS

const productsApi = axios.create({
    baseURL: "localhost:3000/api",
})

//TODO: interceptores

export { productsApi };

