import api from './apiService';
import config from '../../config/mainConfig';

class PageService {
  constructor(apiService, mainConfig) {
    this.apiService = apiService;
    this.currentPage = 1;
    this.allPages = 1;
    this.mainConfig = mainConfig;
  }

  async getPageMovies(data, pageNumber) {
    try {
      const allMovies = await this.apiService.getMoviesFromJSON(data);
      this.allPages = Math.ceil(allMovies.length / this.mainConfig.moviesOnPage);
      if (pageNumber < 1 || pageNumber > this.allPages) return Promise.reject(new Error('Incorrect page number.'));
      this.currentPage = pageNumber;
      const startIndex = this.mainConfig.moviesOnPage * pageNumber - this.mainConfig.moviesOnPage;
      const moviesIdList = allMovies.slice(startIndex, startIndex + this.mainConfig.moviesOnPage);
      const movies = await this.apiService.getMoviesInfo(moviesIdList);
      return movies;
    } catch (error) {
      throw new Error(`Error getting movies for page. ${error}`);
    }
  }

  async getSearchMovies(value) {
    try {
      const movies = await this.apiService.searchMovies(value);
      return movies;
    } catch (error) {
      throw new Error(`Error getting search movies. ${error}`);
    }
  }

  async getMovie(id) {
    try {
      const movie = await this.apiService.getMovieInfo(id);
      return movie;
    } catch (error) {
      throw new Error(`Error getting search movies. ${error}`);
    }
  }

  getNextPageNumber() {
    if (this.currentPage === this.allPages) return this.currentPage;
    return this.currentPage + 1;
  }

  getPreviousPageNumber() {
    if (this.currentPage === 1) return this.currentPage;
    return this.currentPage - 1;
  }

  getLastPageNumber() {
    return this.allPages;
  }

  getCurrentPageNumber() {
    return this.currentPage;
  }

  async getPagesList(data, pageNumber) {
    try {
      const allMovies = await this.apiService.getMoviesFromJSON(data);
      const allPages = Math.ceil(allMovies.length / this.mainConfig.moviesOnPage);
      const pagesArray = [];
      for (let i = 0; i < allPages; i += 1) {
        pagesArray.push(i + 1);
      }
      if (pageNumber < 4) {
        return pagesArray.slice(0, 5);
      }
      if (pageNumber > pagesArray.length - 3) {
        return pagesArray.slice(pagesArray.length - 5, pagesArray.length);
      }
      return pagesArray.slice(pageNumber - 3, pageNumber + 2);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const pageService = new PageService(api, config);

export default pageService;
