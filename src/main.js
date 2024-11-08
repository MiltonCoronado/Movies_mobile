//Helpers.
function createMovie(movie, container){
  container.innerHTML = '';

  movie.forEach(item => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + item.id;
    });
    
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${item.poster_path}`)
    
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  })
};

function createCategories(categories, container){
  container.innerHTML = '';

  categories.forEach(item => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + item.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${item.id}-${item.name}`;
    });
    const categoryTitleText = document.createTextNode(item.name)
    
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
};

//Llamados a la API.
async function getTrendingMoviesPreview(){
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
  const data = await response.json();
  const movie = data.results;
  
  createMovie(movie, trendingMoviesPreviewList)
};

async function getCategoriesPreview(){
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList)
};

async function getMoviesByCategory(id){
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${API_KEY}`);
  const data = await response.json();

  const movie = data.results;
  
  genericSection.innerHTML = "";

  movie.forEach(item => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${item.poster_path}`)
    
    movieContainer.appendChild(movieImg);
    genericSection.appendChild(movieContainer);
  });
};

async function searchPageByQuery(query){
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`);
  const data = await response.json();

  const movie = data.results;

  createMovie(movie, genericSection)
};

async function getTrendingMovies(){
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
  const data = await response.json();
  const movie = data.results;
  
  createMovie(movie, genericSection)
};

async function getMovieById(movieId){
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();

  const movieImgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`

  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;
  
  movieDetailTitle.textContent = data.title;
  movieDetailDescription.textContent = data.overview;
  movieDetailScore.textContent = data.vote_average;

  createCategories(data.genres, movieDetailCategoriesList);

  getRelatedMoviesId(movieId);
};

async function getRelatedMoviesId(movieId){
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`);
  const data = await response.json();

  const relatedMovies = data.results;
  console.log({data})
  createMovie(relatedMovies, relatedMoviesContainer)
};