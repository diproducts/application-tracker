import { makeAutoObservable } from "mobx";
import { checkUser, register, logout, login, reset } from '../helpers/api';

class UserStore {
    isLogged = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setLogged(bool) {
        this.isLogged = bool;
    }

    async checkUser() {
        const logged = await checkUser();
        if (logged) this.setLogged(true);
        else this.setLogged(false);
    }

    async registerUser(data) {
        const response = await register(data);
        return response;
    }

    async loginUser(data) {
        const response = await login(data);
        return response;
    }

    async resetUser(data) {
        const response = await reset(data);
        return response;
    }

    async logoutUser() {
        const response = await logout();
        return response;
    }
}

const userStore = new UserStore();
export default userStore;