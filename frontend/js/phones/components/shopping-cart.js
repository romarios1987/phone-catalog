import Component from '../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });


    this._basketItems = [];

    this._render();

    this.on('click', 'remove-all-button', (event) => {
      const currentBasketItem = event.target.closest('[data-element="basket-item"]');
      this._basketItems.splice(currentBasketItem, 1);
      this._render();
    });


    this.on('click', 'remove', (event) => {
      const itemElement = event.target.closest('[data-element="basket-item"]');
      //console.log(itemElement);

      this.remove(itemElement.dataset.itemId);
    });


    this.on('click', 'details-link', (e) => {
      const itemElement = e.target.closest('[data-element="basket-item"]');
      //console.log(itemElement);
      // this.emit('phone-selected', e.target);
      this.emit('phone-selected', itemElement.dataset.itemId);
    });
  }


  // remove(itemId) {
  //     this._basketItems.map(item => {
  //         if (item.id === itemId) {
  //             item.count--;
  //             if (item.count === 0) {
  //                 this._basketItems.splice(item, 1);
  //             }
  //         }
  //     })
  //
  //
  //     // if (!this._basketItems.hasOwnProperty(itemId)) {
  //     //     return;
  //     // }
  //     //
  //     // this._basketItems[itemId]--;
  //     //
  //     // if (this._basketItems[itemId] === 0) {
  //     //     delete this._basketItems[itemId];
  //     // }
  //     //
  //     // this._render();
  // }


  // _clearCart(){
  //     this._basketItems = [];
  //     this._render();
  // }


  // addToCart({id, name, images}) {
  //     let itemArrayPosition = this._checkIfItemExist(id);
  //
  //     if (itemArrayPosition === null) {
  //         this._basketItems.push({
  //             id: id,
  //             name: name,
  //             img: images[0],
  //             count: 1
  //         });
  //     } else {
  //         this._basketItems[itemArrayPosition].count++;
  //     }
  //
  //     this._render();
  //
  // }
  //
  //
  // _checkIfItemExist(itemId) {
  //     let itemsList = this._basketItems;
  //
  //     for (let i = 0; i < itemsList.length; i++) {
  //         if (itemsList[i].id === itemId) {
  //             return i;
  //         }
  //     }
  //     return null;
  // }

  // addToCart(phoneAdd) {
  //   if ('quantity' in phoneAdd) {
  //     // eslint-disable-next-line no-param-reassign
  //     phoneAdd.count++;
  //   } else {
  //     // eslint-disable-next-line no-param-reassign
  //     phoneAdd.count = 1;
  //     this._basketItems.push(phoneAdd);
  //   }
  //   this._render();
  // }


  addToCart(phoneId) {
    const { id, name, images } = phoneId;
    const img = images[0];
    this._basketItems.forEach((item) => {
      let count;
      if (item.id === id) {
        count++;
      }
    });
    this._basketItems.push({
      id, name, img, count: 1,
    });

    this._render();
  }

  _render() {
    //console.log(this._basketItems);
    this._element.innerHTML = `
         <h3 class="text-center">Shopping Cart</h3>
            <ul data-element="basket-list-items" class="list-group">
             ${this._basketItems.map(({
    id, name, img, count,
  }) => `
                    <li  
                    data-element="basket-item"  
                    data-item-id="${id}"
                    class="list-group-item basket-item">
                    
                    <img style="width: 40px" src="${img}" alt="${name}">
                    <a href="#!/phones/${id}"  data-element="details-link">${name}</a>
                    
                          <input style="width: 20%;" type="number" min="1" class="item-count form-control" data-element="remove" data-name="${name}" value="${count}">
                          
                          
                        <span 
                            data-element="remove-all-button"
                            class="basket-remove-item btn btn-xs btn-danger">X</span>
                    </li>
                    `).join('')}
            </ul>
           
            `;
  }
}
