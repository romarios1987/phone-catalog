import PhoneCatalog from "./components/phone-catalog.js";
import PhoneViewer from "./components/phone-viewer.js";
import PhoneService from "./services/phone-service.js";
import ShoppingCart from "./components/shopping-cart.js";
import Filter from "./components/filter.js";


export default class PhonesPage {

    constructor({element}) {
        this._element = element;

        this._phoneService = new PhoneService();


        this._render();

        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
        this._initFilter();

        this._showPhones();
    }

    _initShoppingCart() {

        // Creating Component ShoppingCart
        this._shopping_cart = new ShoppingCart({
            element: document.querySelector('[data-component="shopping-cart"]'),
        });

        // Обработчик события 'phone-selected' для ShoppingCart
        this._shopping_cart.subscribe('phone-selected', (itemId) => {

            this._phoneService.getPhoneById(itemId).then((phone) => {
                this._catalog.hide();
                this._viewer.show(phone);
            })
        });
    }


    _initCatalog() {

        // Creating Component Catalog
        this._catalog = new PhoneCatalog({
            element: document.querySelector('[data-component="phone-catalog"]'),
        });

        // Обработчик события 'phone-selected' для PhoneCatalog
        this._catalog.subscribe('phone-selected', async (phoneId) => {
            const phoneDetails = await this._phoneService.getPhoneById(phoneId);
            this._catalog.hide();
            this._viewer.show(phoneDetails);
        });

        // Обработчик события 'cart-button-clicked' для PhoneCatalog
        this._catalog.subscribe('add-cart-clicked', async (phoneId) => {
            const phoneDetails = await this._phoneService.getPhoneById(phoneId);
            this._shopping_cart.addToCart(phoneDetails);
        });

    }


    _initViewer() {
        // Creating Component Viewer
        this._viewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]'),
        });

        // Обработчик события 'on-back' для PhoneViewer
        this._viewer.subscribe('back', () => {
            this._viewer.hide();
            this._showPhones();
        });


        // Обработчик события 'cart-button-clicked' для Viewer
        this._viewer.subscribe('add-cart-clicked', async (phoneId) => {
            const phoneDetails = await this._phoneService.getPhoneById(phoneId);
            this._shopping_cart.addToCart(phoneDetails);
        });
    }

    _initFilter() {
        // Creating Component Filter
        this._filter = new Filter({
            element: document.querySelector('[data-component="filter"]'),
        });

        // Обработчик события 'query-changed' для Filter
        this._filter.subscribe('query-changed', () => {
            this._showPhones()
        });

        // Обработчик события 'order-changed' для Filter
        this._filter.subscribe('order-changed', () => {
            this._showPhones()
        });
    }

    _showPhones() {
        const currentFiltering = this._filter.getCurrentData();
        const phonesPromise = this._phoneService.getAllPhones(currentFiltering);

        phonesPromise.then((phones) => {
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

