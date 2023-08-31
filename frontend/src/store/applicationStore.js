import { makeAutoObservable } from "mobx";

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

    async postPhase() {

    }

    async postApplication() {

    }

}