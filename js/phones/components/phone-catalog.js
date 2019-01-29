export default class PhonesCatalog {

    constructor({
                    element,
                    phones = [],
                    onPhoneSelected = () => {
                    }
                }) {
        this._element = element;
        this._phones = phones;
        this._onPhoneSelected = onPhoneSelected;

        this._render();


        this._element.addEventListener('click', (e) => {
            let phoneElement = e.target.closest('[data-element="phone"]');
            if (!phoneElement) return;

            this._onPhoneSelected(phoneElement.dataset.phoneId)

        })

    }

    hide() {
        this._element.hidden = true;
    }


    _render() {
        this._element.innerHTML = `
        <ul class="phones">
            ${this._phones.map(({id, name, imageUrl, snippet}) => {
            //const {id, name, imageUrl, snippet} = phone;
            return `
          <li class="thumbnail" data-element="phone" data-phone-id="${id}">
            <a href="#!/phones/${id}" class="thumb">
              <img alt="Motorola XOOM™ with Wi-Fi" src="${imageUrl}">
            </a>
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">Add</a>
            </div>
            <a href="#!/phones/${id}">${name}</a>
            <p>${snippet}</p>
          </li>`
        }).join('')}
        </ul>`;
    }


}