import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/all.css';

import data from './data/imdb_top250.json';

import pageService from './js/services/pageService';
import pageUI from './js/ui/pageUI';

// Functions

function initPage(page) {
  pageUI.showPreloader();
  const getMovies = pageService.getPageMovies(data, page);
  const getNumbers = pageService.getPagesList(data, page);
  Promise.all([getMovies, getNumbers]).then((result) => {
    pageUI.renderMovies(result[0]);
    pageUI.renderPageNumbers(result[1], page);
    pageUI.hidePreloader();
  }).catch((error) => {
    pageUI.hidePreloader();
    pageUI.setPageInfo(error);
  });
}

// Handlers

function onClickPageBtn(e) {
  const element = e.target;
  if (element.classList.contains('btn-page')) {
    const page = Number(element.dataset.page);
    initPage(page);
  }
  if (element.classList.contains('btn-next')) {
    const page = pageService.getNextPageNumber();
    initPage(page);
  }
  if (element.classList.contains('btn-previous')) {
    const page = pageService.getPreviousPageNumber();
    initPage(page);
  }
  if (element.classList.contains('btn-first')) {
    const page = 1;
    initPage(page);
  }
  if (element.classList.contains('btn-last')) {
    const page = pageService.getLastPageNumber();
    initPage(page);
  }
}

function onHoverMovie(e) {
  const element = e.target.closest('.movie-card');
  if (element) {
    const poster = element.querySelector('.movie-bg');
    const posterBackground = poster.style.backgroundImage;
    pageUI.setPageBackground(posterBackground);
  }
}

async function onSearchMovie(e) {
  try {
    const { value } = e.target;
    if (value) {
      pageUI.showPreloader();
      pageUI.setPageSearchTitle(value);
      const movies = await pageService.getSearchMovies(value);
      if (movies.Response === 'False') {
        pageUI.setPageInfo(movies.Error);
      }
      if (movies.Search) {
        pageUI.renderSearchMovies(movies.Search);
      }
      pageUI.hidePreloader();
    } else {
      pageUI.setPageDefaultTitle();
      const currentPage = pageService.getCurrentPageNumber();
      initPage(currentPage);
    }
  } catch (error) {
    pageUI.setPageInfo(error);
  }
}

async function onClickMovie(e) {
  try {
    const element = e.target.closest('.movie-card');
    if (element) {
      pageUI.showPreloader();
      const { id } = element.dataset;
      const movie = await pageService.getMovie(id);
      pageUI.hidePreloader();
      pageUI.openMovieModal(movie);
    }
  } catch (error) {
    pageUI.setPageInfo(error);
  }
}

function onClickBackdrop(e) {
  const element = e.target;
  if (element.classList.contains('modal') || element.closest('.close')) {
    pageUI.closeMovieModal();
  }
}

// Init

const pageButtonsContainer = document.querySelector('.page-buttons-container');
const moviesContainer = document.querySelector('.movies-container .row');
const modalContainer = document.querySelector('.modal-container');
const searchInput = document.querySelector('.search');

pageButtonsContainer.addEventListener('click', onClickPageBtn);
moviesContainer.addEventListener('mouseover', onHoverMovie);
moviesContainer.addEventListener('click', onClickMovie);
searchInput.addEventListener('input', onSearchMovie);
modalContainer.addEventListener('click', onClickBackdrop);

initPage(1);
