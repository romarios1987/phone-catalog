import PhonesCatalog from "./components/phone-catalog.js";
import PhoneViewer from "./components/phone-viewer.js";


export default class PhonesPage {

    constructor({element}) {

        this._element = element;

        this._render();

        // Creating Component Catalog
        this._catalog = new PhonesCatalog({
            element: document.querySelector('[data-component="phone-catalog"]')
        });


        // Creating Component Viewer
        this._viewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]')
        });

    }

    _render() {
        this._element.innerHTML = `
      <div class="row">
        <!--Sidebar-->
        <div class="col-md-3">
        
         <!--Search-->
          <section>
            <p>Search:<input></p>
            <p>Sort by:
            <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
              </p>
          </section>
        <!--Search-->
    
        <!--Shopping Cart-->
          <section>
            <p>Shopping Cart</p>
            <ul>
              <li>Phone 11</li>
              <li>Phone 22</li>
              <li>Phone 33</li>
            </ul>
          </section>
        </div>
         <!--Shopping Cart-->
        <!--Sidebar-->
    
        <!--Main content-->
        <div class="col-md-9">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer" hidden></div>
        </div>
         <!--Main content-->
      </div>
    `;
    }
}