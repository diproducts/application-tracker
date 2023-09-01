import { makeAutoObservable } from "mobx";
import { newApp } from "../helpers/api";

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

    async postPhase({ id, name, date, contacts, notes }) {

    }

    async postApplication({ company_name, position, url, cv, cover_letter, date, contacts }) {
        // {
        //     "company_name": "Yandex", (обязательно)
        //     "position": "Data Analyst", (обязательно)
        //     "url": "https://yandex.ru/jobs/vacancies/"
        //     "cv": файл,
        //     "cover_letter": файл
        //   }

        const data = {
            company_name,
            position,
            url
        }
        const formData = new FormData();
        if (cv) formData.append('cv', cv);
        if (cover_letter) formData.append('cover_letter', cover_letter);
        if (!cv && !cover_letter) {
            console.log('no files');
            const response = await newApp(data);
        }

        const response = await newApp(data, formData);
        console.log(response);

        // {
        //     "name": "applied",
        //     "date": "2023-06-28",
        //     "contacts": "John from Google",
        //     "notes": "I hope they hire me..."
        // }
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;