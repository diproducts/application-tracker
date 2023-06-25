import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const checkUser = async () => {
    try {
        const response = await client.get("auth/user/");
        return response;
    } catch (err) {
        return { message: 'Network error' }
    }
}

export const register = async (data) => {
    console.log('data', data)
    try {
        const response = await client.post("auth/register/", { name: data.name, password: data.password, email: data.email });
        return response;
    } catch (err) {
        return { message: 'Network error' }
    }
}