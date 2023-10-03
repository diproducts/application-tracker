import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: process.env.BASE_URL,
});

export const checkUser = async () => {
    try {
        const response = await client.get("api/auth/user/");
        return response;
    } catch (err) {
        return false;
    }
}

export const register = async (data) => {
    try {
        const response = await client.post("api/auth/register/", { name: data.name, password: data.password, email: data.email });
        if (response.status === 201) return true;
    } catch (err) {
        return false;
    }
}

export const login = async (data) => {
    try {
        const response = await client.post("api/auth/login/",
            {
                email: data.email,
                password: data.password
            });
        if (response.status === 200) return true;
        else return false;
    } catch (err) {
        return false;
    }
}

export const logout = async () => {
    try {
        const response = await client.post(
            "api/auth/logout/",
            { withCredentials: true }
        );
        if (response.status === 200) return true;
        else return false;
    } catch (err) {
        return false;
    }
}