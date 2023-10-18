import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

client.interceptors.request.use(
    (config) => {
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
        const response = await client.post("auth/register/",
            {
                name: data.name,
                password: data.password,
                email: data.email
            });
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

export const newApp = async (data, formData) => {
    try {
        const response = await client.post(
            "api/applications/",
            formData,
            data
        );
        console.log(response)
        if (response.status === 201) {
            return response.data.id;
        }
        return false;
    } catch (err) {
        console.log(err)
        return false;
    }
}

export const newPhase = async (data, id) => {
    console.log(data);
    try {
        const response = await client.post(
            `api/applications/${id}/phases/`,
            {
                ...data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response);
        return response;
        // if (response.status === 200) return true;
        // else return false;
    } catch (err) {
        return false;
    }
}

