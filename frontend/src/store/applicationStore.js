import { makeAutoObservable } from "mobx";
import { newApp, newPhase, getApps, updateApp, updatePhase } from "../helpers/api";

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

    async updateApplication(id, fields, cv, cover_letter) {
        console.log(cover_letter, "cover letter")
        const formData = new FormData();
        if (cv) formData.append('cv', cv);
        if (cover_letter) formData.append('cover_letter', cover_letter);
        try {
            const response = await updateApp(id, fields, formData)
            return response;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updatePhase(data, id, phase_id) {
        try {
            const response = await updatePhase(data, id, phase_id);
            return response
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
            const applicationId = await newApp(data, formData)
            if (applicationId && date) {
                await this.postPhase({ id: applicationId, name: "applied", contacts, date, notes })
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async getApps() {
        const apps = await getApps();
        if (apps) {
            this.setApps(apps)
        }
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;