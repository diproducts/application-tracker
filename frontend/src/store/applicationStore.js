import { makeAutoObservable } from "mobx";
import { newApp, newPhase, getApps } from "../helpers/api";

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

    setApps(apps) {
        this.applications = apps;
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

        console.log(data)

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

    async getApps() {
        getApps()
            .then((apps) => {
                console.log(apps)
                if (apps) this.setApps(apps)
            })
            .catch(err => console.log(err))
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;