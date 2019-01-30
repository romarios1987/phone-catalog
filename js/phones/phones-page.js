import PhoneCatalog from "./components/phone-catalog.js";
import PhoneViewer from "./components/phone-viewer.js";
import PhoneService from "./services/phone-service.js";
import ShoppingCart from "./components/shopping-cart.js";
import Filter from "./components/filter.js";
// import {getAll} from "./services/phone-service.js";


export default class PhonesPage {

    constructor({element}) {
        this._element = element;

        this._render();

        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
        this._initFilter();
    }


    _initCatalog() {
        // Creating Component Catalog
        this._catalog = new PhoneCatalog({
            element: document.querySelector('[data-component="phone-catalog"]'),
            phones: PhoneService.getAll(),


            // Method callback onPhoneSelected
            // onPhoneSelected: (phoneId) => {
            //     const phoneDetails = PhoneService.getById(phoneId);
            //     this._catalog.hide();
            //     this._viewer.show(phoneDetails);
            // }

        });

        // Обработчик события 'phone-selected' для PhoneCatalog
        this._catalog.subscribe('phone-selected', (phoneId) => {
            const phoneDetails = PhoneService.getById(phoneId);
            this._catalog.hide();
            this._viewer.show(phoneDetails);
        });
    }

    _initViewer() {
        // Creating Component Viewer
        this._viewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]'),

            // onBack: () => {
            //     this._viewer.hide();
            //     this._catalog.show();
            // }

        });

        // Обработчик события 'on-back' для PhoneViewer
        this._viewer.subscribe('back', () => {
            this._viewer.hide();
            this._catalog.show();
        });
    }

    _initShoppingCart() {
        // Creating Component ShoppingCart
        this._shopping_cart = new ShoppingCart({
            element: document.querySelector('[data-component="shopping-cart"]'),
        });
    }

    _initFilter() {
        // Creating Component Filter
        this._shopping_cart = new Filter({
            element: document.querySelector('[data-component="filter"]'),
        });
    }

    _render() {
        this._element.innerHTML = `
      <div class="row">
        <!--Sidebar-->
        <div class="col-md-3">
        
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
        <div class="col-md-9">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer"></div>
        </div>
         <!--Main content-->
      </div>
    `;
    }
}