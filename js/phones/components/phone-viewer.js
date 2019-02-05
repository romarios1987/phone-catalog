import Component from "../component.js";

export default class PhoneViewer extends Component {

    constructor({element}) {
        super({element});

        this.on('click', 'back-button', ()=>{
            this.emit('back');
        });


        this.on('click', 'small-image', (e) => {
            this._element.querySelector('[data-element="large-image"]').src = e.target.src;
        });


        this.on('click', 'cart-button', () => {
            this.emit(
                'add-cart-clicked', this._phoneDetails.id);
        });
    }


    show(phoneDetails) {
        this._phoneDetails = phoneDetails;
        //console.log(this._phoneDetails);
        // this._element.hidden = false;

        // call parent method
        super.show();
        this._render();
    }



    _render() {
        //const phone = this._phoneDetails;

        const {name, description, images} = this._phoneDetails;

       // console.log(this._phoneDetails);

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
                ${images.map((imageUrl) => `
                <li>
                    <img
                        data-element="small-image"
                        src="${imageUrl}">
                </li>`).join('')}
            </ul>   
                 
        </div>`;
    }
}