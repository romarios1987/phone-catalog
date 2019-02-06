export default class PhoneService {

    constructor() {
        this._baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/phones';
    }

    async _getResource(url) {
        const res = await fetch(`${this._baseUrl}/${url}.json`);
        if (!res.ok) throw  new Error(`Could not fetch ${url}, received ${res.status}`);

        return await res.json();
    }

    async getAllPhones({query = '', sortBy = ''} = {}) {
        const phones = await this._getResource('phones');
        const filteredPhones = this._filter(phones, query);
        return this._sortBy(filteredPhones, sortBy);
    }

    async getPhoneById(phoneId) {
        return await this._getResource(`${phoneId}`);
    }

    _filter(phones, query) {
        return phones.filter(phone => phone.id.toLowerCase().includes(query.toLowerCase()));
    }

    _sortBy(phones, sortBy) {
        return phones.sort((phone1, phone2) => (phone1[sortBy] > phone2[sortBy]) ? 1 : -1);
    }


}
