import Component from '../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this._phones = [];

    this._render();

    this.on('click', 'details-link', (event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');
      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', 'cart-button', (event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');
      this.emit(
        'add-cart-clicked', phoneElement.dataset.phoneId,
      );
    });
  }


  show(phones) {
    this._phones = phones;
    super.show();
    this._render();
  }


  _render() {
    this._element.innerHTML = `
        <ul class="phones">
            ${this._phones.map(({
    id, name, imageUrl, snippet,
  }) => `
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
              <a data-element="cart-button" class="btn btn-success">Add</a>
            </div>
            
            <a href="#!/phones/${id}" 
                data-element="details-link">${name}
            </a>
            
            <p>${snippet}</p>
            
          </li>`).join('')}
        </ul>`;
  }
}
