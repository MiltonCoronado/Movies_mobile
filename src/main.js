async function getTrendingMoviesPreview(){
  const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
  const data = await response.json();

  const movie = data.results;
  
  trendingMoviesPreviewList.innerHTML = "";

  movie.forEach(item => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + item.poster_path)
    
    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
};

async function getCategoriesPreview(){
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
  const data = await response.json();

  const categories = data.genres;

  categoriesPreviewList.innerHTML = "";

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
    categoriesPreviewList.appendChild(categoryContainer);
  });
};

async function getMoviesByCategory(id){
  const response = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=' + id + '&api_key=' + API_KEY);
  const data = await response.json();

  const movie = data.results;
  
  trendingMoviesPreviewList.innerHTML = "";

  movie.forEach(item => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + item.poster_path)
    
    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
};


