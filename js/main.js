import PhonesPage from './phones/phones-page.js';

const currentPage = new PhonesPage({
  element: document.querySelector('[data-page-container]'),
});

console.log(currentPage);
