import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/PhoneService.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';


export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._render();
    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();

    this._showPhones();
  }

  _initShoppingCart() {
    this._shopping_cart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
    });
    this._shopping_cart.subscribe('phone-selected', (itemId) => {
      PhoneService.getPhoneById(itemId).then((phone) => {
        this._catalog.hide();
        this._viewer.show(phone);
      });
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: document.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      const phoneDetails = await PhoneService.getPhoneById(phoneId);
      this._catalog.hide();
      this._viewer.show(phoneDetails);
    });

    this._catalog.subscribe('add-cart-clicked', async (phoneId) => {
      const phoneDetails = await PhoneService.getPhoneById(phoneId);
      this._shopping_cart.addToCart(phoneDetails);
    });
  }


  _initViewer() {
    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._showPhones();
    });


    this._viewer.subscribe('add-cart-clicked', async (phoneId) => {
      const phoneDetails = await PhoneService.getPhoneById(phoneId);
      this._shopping_cart.addToCart(phoneDetails);
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: document.querySelector('[data-component="filter"]'),
    });


    this._filter.subscribe('query-changed', () => {
      this._showPhones();
    });

    this._filter.subscribe('order-changed', () => {
      this._showPhones();
    });
  }

  _showPhones() {
    const currentFiltering = this._filter.getCurrentData();
    const phonesPromise = PhoneService.getAllPhones(currentFiltering);
    phonesPromise.then((phones) => {
      console.log(phones);
      this._catalog.show(phones);
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">
        <!--Sidebar-->
        <div class="col-md-4">
        
         <!--Search-->
          <section>
            <div data-component="filter"></div>
          </section>
        <!--Search-->
    
        <!--Shopping Cart-->
          <section>
           <div data-component="shopping-cart"></div>
          </section>
        </div>
         <!--Shopping Cart-->
        <!--Sidebar-->
    
        <!--Main content-->
        <div class="col-md-8">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer"></div>
        </div>
         <!--Main content-->
      </div>
    `;
  }
}
