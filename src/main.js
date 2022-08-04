const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

//helpers's functions.
function createMovies(movies, container) {
    container.innerHTML = '';//esto es para limpiar todo el contenido antes de recargar.

    movies.forEach(item => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {//gracias a este evento, dando click cambia el location.hash='#movie=123'
            location.hash = '#movie=' + item.id;
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', item.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300/' + item.poster_path,
        );
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container){
    container.innerHTML = "";//esto es para limpiar todo el contenido antes de recargar.

    categories.forEach(item => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement('h3');

        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + item.id);
        categoryTitle.addEventListener('click', () => {//con este evento podemos navegar en las categorias.
            location.hash = `#category=${item.id}-${item.name}`;
        })
        const categoryTitleText = document.createTextNode(item.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

//llamados a la API.
async function getTrendingMoviesPreview() {//await api(aca va el end-point, asi funciona axios).
    const { data } = await api('trending/movie/day');//para axios se tiene que hacer una destructuracion de data.
    const movies = data.results;
    console.log(movies)

    createMovies(movies, trendingMoviesPreviewList);   
}

async function getCategoriesPreview() {//await api(aca va el end-point, asi funciona axios).
    const { data } = await api('genre/movie/list');//para axios se tiene que hacer una destructuracion de data.
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);    
}

async function getMoviesByCategory(id) {//await api(aca va el end-point, asi funciona axios).
    const { data } = await api('discover/movie', {//para axios se tiene que hacer una destructuracion de data.
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {//await api(aca va el end-point, asi funciona axios).
    const { data } = await api('/search/movie', {//para axios se tiene que hacer una destructuracion de data.
        params: {
            query,
        },
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getTrendingMovies() {//await api(aca va el end-point, asi funciona axios).
    const { data } = await api('trending/movie/day');//para axios se tiene que hacer una destructuracion de data.
    const movies = data.results;
    createMovies(movies, genericSection);   
}

async function getMovieById(id) {//await api(aca va el end-point, asi funciona axios).
    const { data: item } = await api('movie/' + id);//para axios se tiene que hacer una destructuracion y sacar al objeto data. si se quiere renombrar Data es data: renombre.
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;

    headerSection.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
            ),
            url(${movieImgUrl})
            `;

    movieDetailTitle.textContent = item.title;
    movieDetailDescription.textContent = item.overview;
    movieDetailScore.textContent = item.vote_average;

    createCategories(item.genres, movieDetailCategoriesList);

    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}
