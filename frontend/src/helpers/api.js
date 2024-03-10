function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

export const checkUser = async () => {

    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/auth/user/`,
            {
                credentials: 'include',
            }
        );
        return response.status === 200;
    } catch (err) {
        return false;
    }
}

export const register = async (data) => {
    const csrftoken = getCookie('csrftoken');

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-CSRFToken', csrftoken);

    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/auth/register/`,
            {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify({
                    name: data.name,
                    password1: data.password,
                    password2: data.password,
                    email: data.email
                }),
            }
        );
        if (response.status === 201 || response.status === 204) return true;
        return false;
    } catch (err) {
        return false;
    }
}

export const login = async (data) => {
    const csrftoken = getCookie('csrftoken');

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-CSRFToken', csrftoken);

    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/auth/login/`,
            {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            }
        );
        if (response.status === 200 || response.status === 204) return true;
        else return false;
    } catch (err) {
        return false;
    }
}

export const logout = async () => {
    console.log('logout function');
    const csrftoken = getCookie('csrftoken');

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-CSRFToken', csrftoken);

    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/auth/logout/`,
            {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify({}),
            }
        );
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const newApp = async (data, formData) => {
    const csrftoken = getCookie('csrftoken');

    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);

    const form = new FormData();

    // Append JSON data fields to FormData
    Object.keys(data).forEach(key => {
        form.append(key, data[key]);
    });

    // Append file data fields to FormData
    formData.forEach((value, key) => {
        form.append(key, value);
    });

    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/applications/`,
            {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: form,
            }
        );
        if (response.status === 201) {
            return response.json().then(data => data.id);
        }
        return false;
    } catch (err) {
        console.log(err)
        return false;
    }
}

export const newPhase = async (data, id) => {
    const csrftoken = getCookie('csrftoken');

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-CSRFToken', csrftoken);

    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/applications/${id}/phases/`,
            {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(data),
            }
        );
        return response;
    } catch (err) {
        return false;
    }
}

export const getApps = async () => {
    const csrftoken = getCookie('csrftoken');

    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);

    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/applications/`,
            {
                headers: headers,
                credentials: 'include',
            }
        );
        if (response.ok) return response.json();
        else return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}
