import RequestService from './RequestService.js';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/phones';

class PhoneService {
  async getAllPhones({ query = '', sortBy = '' } = {}) {
    const phones = await RequestService.getResource(`${BASE_URL}/phones`);
    const filteredPhones = this._filter(phones, query);
    return this._sortBy(filteredPhones, sortBy);
  }


  async getPhoneById(phoneId) {
    this.phoneId = phoneId;
    const phone = await RequestService.getResource(`${BASE_URL}/${this.phoneId}`);
    return phone;
  }

  _filter(phones, query) {
    this.phones = phones;
    return phones.filter(phone => phone.id.toLowerCase().includes(query.toLowerCase()));
  }

  // _sortBy(phones, sortBy) {
  //   this.phones = phones;
  //   return phones.sort((phone1, phone2) => ((phone1[sortBy] > phone2[sortBy]) ? 1 : -1));
  // }

  _sortBy(phones, sortBy) {
    this.phones = phones;
    return this.phones.sort((a, b) => {
      switch (typeof a[sortBy]) {
        case 'number':
          return a[sortBy] - b[sortBy];
        case 'string':
          return a[sortBy].localeCompare(b[sortBy]);
        default:
          return 1;
      }
    });
  }
}

export default new PhoneService();
