import { makeAutoObservable } from "mobx";
import { checkUser, register } from '../helpers/api';

class UserStore {
    name = '';
    email = '';
    password = '';
    loggedIn = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async checkUser() {
        checkUser()
            .then(response => this.loggedIn = true)
            .catch(err => console.log(err));
    }

    async registerUser(data) {
        register(data).then(response => console.log(response));
    }
}

const userStore = new UserStore();
export default userStore;