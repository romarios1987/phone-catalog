import Component from "../component.js";

export default class ShoppingCart extends Component {
    constructor({element}) {
        super({element});


        this._basketItems = [];

            this._render();
            
        this.on('click', 'remove-button', (e)=>{
            let currentBasketItem = e.target.closest('[data-element="basket-item"]');
            this._basketItems.splice(currentBasketItem, 1);
            this._render();
        });


        this.on('click', 'details-link', (e)=>{
            let itemElement = e.target.closest('[data-element="basket-item"]');
            console.log(itemElement);
            //this.emit('phone-selected', e.target);
            this.emit('phone-selected', itemElement.dataset.itemId);
        });
    }

    // _clearCart(){
    //     this._basketItems = [];
    //     this._render();
    // }



    addToCart({id, name, images}) {
        let itemArrayPosition = this._checkIfItemExist(id);

        if (itemArrayPosition === null) {
            this._basketItems.push({
                id: id,
                name: name,
                img: images[0],
                count: 1
            });
        } else {
            this._basketItems[itemArrayPosition].count++;
        }

        this._render();

    }


    _checkIfItemExist(itemId) {
        let itemsList = this._basketItems;

        for (let i = 0; i < itemsList.length; i++) {
            if (itemsList[i].id === itemId) {
                return i;
            }
        }
        return null;
    }


    _render() {
        this._element.innerHTML = `
         <h3 class="text-center">Shopping Cart</h3>
            <ul data-element="basket-list-items" class="list-group">
             ${this._basketItems.map(({id, name, img, count}) => {
            return `
                    <li  
                    data-element="basket-item"  
                    data-item-id="${id}"
                    class="list-group-item basket-item">
                    <img style="width: 40px" src="${img}" alt="${name}">
                    <a href="#!/phones/${id}"  data-element="details-link">${name}</a>
                          <input style="width: 20%;" type="number" class="item-count form-control" data-name="${name}" value="${count}">
                        <span 
                            data-element="remove-button"
                            class="basket-remove-item btn btn-xs btn-danger">X</span>
                    </li>
                    `
        }).join('')}
            </ul>
           
            `
    }
}





