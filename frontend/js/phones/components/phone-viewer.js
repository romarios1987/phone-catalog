import Component from '../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', 'back-button', () => {
      this.emit('back');
    });


    this.on('click', 'small-image', (event) => {
      this._element.querySelector('[data-element="large-image"]').src = event.target.src;
    });


    this.on('click', 'cart-button', () => {
      this.emit(
        'add-cart-clicked', this._phoneDetails.id,
      );
    });
  }


  show(phoneDetails) {
    this._phoneDetails = phoneDetails;
    super.show();
    this._render();
  }


  _render() {
    const { name, description, images } = this._phoneDetails;


    this._element.innerHTML = `
        <div>
            <img 
                data-element="large-image" 
                class="phone" 
                src="${images[0]}"
                alt="${name}">
            <button data-element="back-button">Back</button>
            <button data-element="cart-button" class="btn btn-success">Add to basket</button>
            <h1>${name}</h1>
            <p>${description}</p>
            
            <ul class="phone-thumbs">
                ${images.map(imageUrl => `
                <li>
                    <img
                        data-element="small-image"
                        src="${imageUrl}"
                        alt="${name}"
                        >
                </li>`).join('')}
            </ul>   
                 
        </div>`;
  }
}