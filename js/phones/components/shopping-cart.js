import Component from "../component.js";

export default class ShoppingCart extends Component {
    constructor({element}) {
        super({element});

        this._render();
    }


    _render() {
        this._element.innerHTML = `
         <p>Shopping Cart</p>
            <ul>
              <li>Phone 11</li>
              <li>Phone 22</li>
              <li>Phone 33</li>
            </ul>
            `
    }
}





