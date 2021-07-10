import Component from '../component';

export default class Pagination extends Component {
  constructor({ element, props }) {
    super({ element });

    this._props = { ...props };

    this._render();

    this._addEventListeners();
  }


  get pages() {
    const pages = [];
    const { pagesCount } = this._props;

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  _updateView() {
    this._render();
  }

  _addEventListeners() {
    this.on('click', 'page-button', ({ target }) => {
      this._setPage(target.dataset.page);
    });

    this.on('click', 'prev-button', () => {
      this._setPage(this._props.currentPage - 1);
    });

    this.on('click', 'next-button', () => {
      this._setPage(this._props.currentPage + 1);
    });

    this.on('change', 'per-page-select', ({ target }) => {
      const perPage = +target.value;
      this._setPerPage(perPage);
    });
  }

  _setPage(page) {
    const { pagesCount } = this._props;
    const correctPage = Math.min(
      Math.max(1, page), pagesCount,
    );

    this.emit('page-changed', correctPage);
  }


  _setPerPage(perPage) {
    this.emit('per-page-changed', perPage);
  }


  setTotalCount(totalCount) {
    this._props = {
      ...this._props,
      totalCount,
    };
    this._render();
  }


  _render() {
    const {
      currentPage, perPage, selector, info, totalItems,
    } = this._props;


    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    this._element.innerHTML = `
    ${selector ? `
     <select data-element="per-page-select">
     ${[3, 5, 10, 20].map(option => `
          <option
            value="${option}"
            ${+option === perPage ? 'selected' : ''}
          >
            ${option}
          </option>
        `).join('') }
      </select>`
    : ''}

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="${ (currentPage === 1) ? ' disabled"' : '' }">
          <a href="#" aria-label="Previous" data-element="prev-button">
            <span aria-hidden="true">&laquo;</span>
          </a>
        
        ${this.pages.map(page => `
        <li class="${ (page === currentPage) ? ' active"' : '' }">
        <a  href="#" 
            data-element="page-button" 
            data-page="${ page }"
           >${ page }</a>
        </li>
         `).join('')}
        
        <li>
          <a href="#" aria-label="Next" data-element="next-button">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    
     ${ info ? `
        <p data-element="page-info" class="paginator__page-info"><b>
        Show ${startIndex + 1} to ${Math.min(endIndex, totalItems)} phones from  ${totalItems}
        </b></p>` : ''}`;
  }
}
