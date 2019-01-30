import Component from "../component.js";

export default class PhoneCatalog extends Component {
    constructor({element, phones = []}) {

        super({element});

        this._element = element;
        this._phones = phones;

        this._render();

        this.on('click', 'details-link', (e) => {
            let phoneElement = e.target.closest('[data-element="phone"]');
            this.emit('phone-selected', phoneElement.dataset.phoneId);
        });
    }



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