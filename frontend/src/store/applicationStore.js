import { makeAutoObservable } from "mobx";
import { newApp, newPhase } from "../helpers/api";

class ApplicationStore {
    applications = [];
    new_application = {
        position: null,
        url: null,
        company_name: null,
        cv: null,
        cover_letter: null
    };
    new_phase = {
        name: null, // applied | phone_screening | interview | technical_interview | rejected | offer
        date: null,
        contact: null,
        notes: null
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async getApps() {

    }

    async postPhase({ id, name, date, contacts, notes }) {
        //  "date": "2023-06-28",
        try {
            await newPhase({ name, date, contacts, notes }, id);
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async postApplication({ company_name, position, url, cv, cover_letter, date, contacts, notes = "" }) {
        const data = {
            company_name,
            position,
            url
        }
        const formData = new FormData();
        if (cv) formData.append('cv', cv);
        if (cover_letter) formData.append('cover_letter', cover_letter);

        try {
            newApp(data, formData)
                .then(applicationId => {
                    if (applicationId) {
                        this.postPhase({ id: applicationId, name: "applied", contacts, date, notes })
                            .then(response => console.log(response))
                    }
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
            return false;
        }
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;