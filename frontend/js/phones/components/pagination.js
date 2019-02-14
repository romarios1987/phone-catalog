export default class Pagination {
  constructor({ element }) {
    this._element = element;

    this._props = { totalCount: 0 };

    this._state = {
      currentPage: 1,
      perPage: 5,
    };

    this._render();
  }


  setTotalCount(totalCount) {
    this._props = {
      ...this._props,
      totalCount,
    };
    this._render();
  }


  // _getPages(pagesCount) {
  //   this._pagesCount = pagesCount;
  //   const pages = [];
  //
  //   for (let i = 1; i <= this._pagesCount; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // }

  get pages() {
    const { totalCount } = this._props;
    const { perPage } = this._state;
    const pagesCount = Math.ceil(totalCount / perPage);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }


  _render() {
    // const { totalCount } = this._props;
    // const { currentPage, perPage } = this._state;
    //
    // const pagesCount = Math.ceil(totalCount / perPage);
    // const pages = this._getPages(pagesCount);

    this._element.innerHTML = `
      <button> < </button>
      
      ${ this.pages.map(page => `
        <button>${ page }</button>
      `).join('')}
      
      <button> > </button>
    `;
  }
}
