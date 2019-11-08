// eslint-disable-next-line max-len
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getMovieTemplate", "getNumberTemplate"] }] */
class PageUI {
  constructor() {
    this.moviesContainer = document.querySelector('.movies-container .row');
    this.numbersContainer = document.querySelector('.page-buttons-container');
    this.modalContainer = document.querySelector('.modal-container');
    this.pageTitle = document.querySelector('.page-title');
    this.pageDefaultTitle = '';
    this.pageBackground = document.querySelector('.page-bg');
    this.preloader = document.querySelector('.preloader');
  }

  showPreloader() {
    this.preloader.style.display = 'flex';
  }

  hidePreloader() {
    this.preloader.style.display = 'none';
  }

  renderMovies(movies) {
    let moviesFragment = '';
    movies.forEach((element) => {
      moviesFragment += this.getMovieTemplate(element);
    });
    this.moviesContainer.innerHTML = '';
    this.moviesContainer.insertAdjacentHTML('afterbegin', moviesFragment);
  }

  setPageSearchTitle(value) {
    if (!this.pageDefaultTitle) this.pageDefaultTitle = this.pageTitle.textContent;
    this.pageTitle.textContent = `Search: ${value}`;
  }

  setPageInfo(value) {
    this.moviesContainer.innerHTML = `
      <h2 class="page-info page-title text-white mb-4 sc-kAzzGY duMhxZ">${value}</h2>
    `;
    this.numbersContainer.innerHTML = '';
  }

  setPageDefaultTitle() {
    this.pageTitle.textContent = this.pageDefaultTitle;
  }

  renderSearchMovies(movies) {
    this.renderMovies(movies);
    this.numbersContainer.innerHTML = '';
  }

  getMovieTemplate({
    Title, Year, Poster, imdbID,
  }) {
    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div data-id="${imdbID}" class="mb-3 movie-card sc-jzJRlG gVuklN">
          <div class="sc-VigVT htVHHo">
            <div class="sc-jTzLTM eKtFoc movie-bg"
              ${(Poster !== 'N/A') ? `style="background-image: url(${Poster});` : ''}">
              ${(Poster === 'N/A') ? `
                <i class="fas fa-film fa-5x"></i>
              ` : ''}
            </div>
          </div>
          <div class="sc-cSHVUG etTiMm">
            <div>
              <h3>${Title}</h3>
              <div class="lead">${Year}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderPageNumbers(numbers, pageNumber) {
    let buttonsFragment = `
      <button type="button" class="btn btn-first btn-outline-light">«</button>
      <button type="button" class="btn btn-previous btn-outline-light">Previous</button>
    `;
    numbers.forEach((element) => {
      if (element === pageNumber) buttonsFragment += this.getNumberTemplate(element, true);
      else buttonsFragment += this.getNumberTemplate(element, false);
    });
    buttonsFragment += `
      <button type="button" class="btn btn-next btn-outline-light">Next</button>
      <button type="button" class="btn btn-last btn-outline-light">»</button>
    `;
    this.numbersContainer.innerHTML = '';
    this.numbersContainer.insertAdjacentHTML('afterbegin', buttonsFragment);
  }

  getNumberTemplate(number, current) {
    return `
      <button type="button" data-page="${number}" class="btn btn-page ${(current) ? 'btn-light' : 'btn-outline-light'}">${number}</button>
    `;
  }

  setPageBackground(background) {
    this.pageBackground.style.backgroundImage = background;
    this.pageBackground.style.backgroundRepeat = 'no-repeat';
    this.pageBackground.style.backgroundPosition = 'center';
    this.pageBackground.style.backgroundSize = 'cover';
  }

  openMovieModal({
    Poster, Title, imdbRating, Plot, Year, Runtime, Genre, Production, Country, Director, Writer,
    Actors, Awards,
  }) {
    const genre = Genre.split(', ');
    const genreElements = genre.map((element) => `<span class="mr-2 badge badge-success">${element}</span>`).join('');
    const time = `${Math.floor(parseInt(Runtime, 10) / 60)}h ${parseInt(Runtime, 10) % 60}min`;
    let stars = '';
    for (let i = 0; i < 10; i += 1) {
      if (imdbRating - i >= 0.5) stars += '<i class="fas fa-star"></i>';
      else if (imdbRating - i > 0 && imdbRating - i < 0.5) stars += '<i class="fas fa-star-half-alt"></i>';
      else stars += '<i class="far fa-star"></i>';
    }
    this.modalContainer.innerHTML = `
      <div class="modal fade show" role="dialog" tabindex="-1">
        <div class="modal-dialog sc-EHOje hSpdwA modal-xl" role="document">
          <div class="modal-content">
            <div class="sc-bZQynM kWyGiU modal-header">
              <h5 class="modal-title">Movie view</h5>
              <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="sc-gzVnrw bwGZMA modal-body">
              <div class="row">
                <div class="col-12 col-sm-4">
                  <div class="mb-3 sc-VigVT htVHHo">
                    <div class="sc-jTzLTM eKtFoc"
                      ${(Poster !== 'N/A') ? `style="background-image: url(${Poster});` : ''}">
                      ${(Poster === 'N/A') ? `
                        <i class="fas fa-film fa-5x"></i>
                      ` : ''}
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-8">
                  <h3 class="sc-kAzzGY duMhxZ">${Title}</h3>
                  <div class="my-2 sc-chPdSV hEtnib">
                    <span class="text-warning mr-2">
                      ${stars}
                    </span>
                    ${imdbRating} / 10
                  </div>
                  <div class="lead">
                    ${Plot}
                  </div>
                  <div class="my-3 mb-4">
                    <span class="mr-2 badge badge-success">${Year}</span>
                    <span class="mr-2 badge badge-success">${time}</span>
                    ${genreElements}
                  </div>
                  <table class="table small">
                    <tbody>
                      <tr>
                        <th>Production</th>
                        <td>${Production}</td>
                      </tr>
                      <tr>
                        <th>Country</th>
                        <td>${Country}</td>
                      </tr>
                      <tr>
                        <th>Director</th>
                        <td>${Director}</td>
                      </tr>
                      <tr>
                        <th>Writer</th>
                        <td>${Writer}</td>
                      </tr>
                      <tr>
                        <th>Actors</th>
                        <td>${Actors}</td>
                      </tr>
                      <tr>
                        <th>Awards</th>
                        <td>${Awards}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    const modal = this.modalContainer.querySelector('.modal');
    modal.style.display = 'block';
    modal.style.background = 'rgba(0, 0, 0, 0.5)';
  }

  closeMovieModal() {
    this.modalContainer.innerHTML = '';
  }
}

const pageUI = new PageUI();

export default pageUI;
