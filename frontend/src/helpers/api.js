import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// const apiURL = 'http://127.0.0.1:8000/';

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
        const response = await client.get(`api/auth/user/`);
        return response;
    } catch (err) {
        return false;
    }
}

export const register = async (data) => {
    try {
        const response = await client.post(`api/auth/register/`,
            {
                name: data.name,
                password: data.password,
                email: data.email
            });
        if (response.status === 201 || response.status === 204) return true;
        return false;
    } catch (err) {
        return false;
    }
}

export const login = async (data) => {
    try {
        const response = await client.post(`api/auth/login/`,
            {
                email: data.email,
                password: data.password
            });
        console.log(response)
        if (response.status === 200 || response.status === 204) return true;
        else return false;
    } catch (err) {
        return false;
    }
}

export const logout = async () => {
    try {
        const response = await client.post(
            `api/auth/logout/`,
            { withCredentials: true }
        );
        if (response.status === 200) return true;
        else return false;
    } catch (err) {
        return false;
    }
}

export const newApp = async (data, formData) => {
    const form = new FormData();

    // Append JSON data fields to FormData
    Object.keys(data).forEach(key => {
        form.append(key, data[key]);
    });

    // Append file data fields to FormData
    formData.forEach((value, key) => {
        form.append(key, value);
    });

    console.log(form, 'data before call')

    try {
        const response = await client.post(
            `api/applications/`,
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
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

export const getApps = async () => {
    try {
        const response = await client.get(`api/applications/`);
        console.log(response.data)
        if (response.status === 200) return response.data;
        else return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

