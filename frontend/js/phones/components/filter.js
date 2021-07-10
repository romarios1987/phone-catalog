import Component from '../component.js';

export default class Filter extends Component {
  constructor({ element, props }) {
    super({ element });

    this._props = { ...props };

    this._render();

    this.on('input', 'query-field', this.debounce((event) => {
      this.emit('query-changed', event.target.value);
    }, 500));


    this.on('change', 'order-field', (event) => {
      this.emit('order-changed', event.target.value);
    });
  }

  _updateView() {
    this._render();
  }

  _render() {
    const { query, sortBy } = this._props;
    this._element.innerHTML = `
            <p>Search:
                <input type="text" data-element="query-field" value="${query}">
            </p>
            <p>Sort by:
            <select data-element="order-field">
                <option value="name" ${sortBy === 'name' ? 'selected' : ''}>
                    Alphabetical
                </option>
                <option value="age" ${sortBy === 'age' ? 'selected' : ''}>
                    Newest
                </option>
              </select>
              </p>
             `;
  }
}
