import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/PhoneService.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import Pagination from './components/pagination.js';
import Component from './component';


export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element });

    this._state = {
      currentPage: 1,
      phones: [],
      perPage: 5,
      currentPhone: null,
      query: '',
      sortBy: 'age',
    };

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();
    this._initPagination();

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
    this._catalog = new PhoneCatalog({ element: document.querySelector('[data-component="phone-catalog"]') });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      const phoneDetails = await PhoneService.getPhoneById(phoneId);

      if (!phoneDetails) return;

      this._setState({
        currentPhone: phoneDetails,
      });
    });

    this._catalog.subscribe('add-to-cart', async (phoneId) => {
      const phoneDetails = await PhoneService.getPhoneById(phoneId);
      this._shopping_cart.addToCart(phoneDetails);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._showPhones();
    });


    this._viewer.subscribe('add-to-cart', async (phoneId) => {
      const phoneDetails = await PhoneService.getPhoneById(phoneId);
      this._shopping_cart.addToCart(phoneDetails);
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: document.querySelector('[data-component="filter"]'),
      props: {
        query: this._state.query,
        sortBy: this._state.sortBy,
      },
    });

    this._filter.subscribe('query-changed', (query) => {
      this._setState({ query });
      this._showPhones();
    });

    this._filter.subscribe('order-changed', (sortBy) => {
      this._setState({ sortBy });
      this._showPhones();
    });
  }


  _initPagination() {
    this._topPagination = new Pagination({
      element: document.querySelector('[data-component="pagination1"]'),
    });
  }


  async _showPhones() {
    const { query, sortBy } = this._state;
    const phonesFromServer = await PhoneService.getAllPhones({ query, sortBy });


    this._setState({
      phones: phonesFromServer,
      currentPage: 1,
      currentPhone: null,
    });
  }


  _updateView() {
    const {
      phones, currentPage, perPage, currentPhone, query, sortBy,
    } = this._state;

    if (currentPhone) {
      this._viewer.show(currentPhone);
      this._catalog.hide();
    } else {
      this._viewer.hide();
      this._catalog.show(phones);
    }


    this._filter.setProps({ query, sortBy });
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
          <div data-component="pagination1"></div>
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer"></div>
        </div>
         <!--Main content-->
      </div>
    `;
  }
}
