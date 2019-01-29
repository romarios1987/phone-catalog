import Component from "../component.js";

export default class PhoneCatalog extends Component {
    constructor({
                    element,
                    phones = [],
                    onPhoneSelected = () => {
                    }
                }) {


        super({element});

        this._element = element;
        this._phones = phones;
        this._onPhoneSelected = onPhoneSelected;

        this._render();


        // this._element.addEventListener('click', (e) => {
        //     let detailsLink = e.target.closest('[data-element="details-link"]');
        //     if (!detailsLink) return;
        //     let phoneElement = e.target.closest('[data-element="phone"]');
        //     this._onPhoneSelected(phoneElement.dataset.phoneId)
        // });


        this.on('click', '[data-element="details-link"]', (e) => {
            let phoneElement = e.target.closest('[data-element="phone"]');
            this._onPhoneSelected(phoneElement.dataset.phoneId)
        });

    }

    // hide() {
    //     this._element.hidden = true;
    // }


    _render() {
        this._element.innerHTML = `
        <ul class="phones">
            ${this._phones.map(({id, name, imageUrl, snippet}) => {
            //const {id, name, imageUrl, snippet} = phone;
            return `
          <li 
            data-element="phone" 
            data-phone-id="${id}"
            class="thumbnail"
          >
            <a 
                data-element="details-link"
                href="#!/phones/${id}" 
                class="thumb"
            >
              <img alt="Motorola XOOM™ with Wi-Fi" src="${imageUrl}">
            </a>
            
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">Add</a>
            </div>
            
            <a href="#!/phones/${id}" 
                data-element="details-link">${name}
            </a>
            
            <p>${snippet}</p>
            
          </li>`
        }).join('')}
        </ul>`;
    }
}