import axios from 'axios';
import api from '../../config/apiConfig';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getMoviesFromJSON"] }] */
class ApiService {
  constructor(apiConfig) {
    this.apiConfig = apiConfig;
  }

  async getMoviesInfo(idArray) {
    try {
      const promises = [];
      idArray.forEach((element) => {
        promises.push(this.getMovieInfo(element));
      });
      const response = await Promise.all(promises);
      return response;
    } catch (error) {
      throw new Error(`Error getting movies info. ${error}`);
    }
  }

  async getMovieInfo(id) {
    try {
      const response = await axios(`${this.apiConfig.url}?i=${id}&plot=full&apikey=${this.apiConfig.key}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting movie info. ${error}`);
    }
  }

  async searchMovies(value) {
    try {
      const response = await axios(`${this.apiConfig.url}?s=${value}&plot=full&apikey=${this.apiConfig.key}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error searching movies. ${error}`);
    }
  }

  async getMoviesFromJSON(data) {
    try {
      const response = await axios(data);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting movies from JSON. ${error}`);
    }
  }
}

const apiService = new ApiService(api);

export default apiService;
