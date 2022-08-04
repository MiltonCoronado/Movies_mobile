searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;//.value nos devuelve el valor ingresado en un input, con esto se mostrara en la url el texto que escriban los usuarios.
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    history.back();//esto es para guardar el historial de navegacion cuando se presione el boton de back.
    // location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);//el tercer parametro es opcinal en el addEventListener.
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log(location);

    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();   
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;//scrolltop nos sirve para que cuando se cargue la pagina siempre la vista sea de arriba hacia abajo.
    document.documentElement.scrollTop = 0;//scrolltop para navegadores tipo safari.
}


function homePage() {
    console.log("Home!!")
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
  
    getTrendingMoviesPreview()
    getCategoriesPreview()
  }
  
  function categoriesPage() {//aca estammos parados en la pagina de categorias.
    console.log("Categories!!")
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    //destructuracion de array
    // [0, 1]
    // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=')//location.hash es igual a: "#category=18-Drama" 
    const [categoryId, categoryName] = categoryData.split('-')
    headerCategoryTitle.innerHTML = categoryName;//aca ponemos el nombre dinamico para cada categoria de la pagina.

    getMoviesByCategory(categoryId);
  }
  
  function movieDetailsPage() {
    console.log("Movie!!")
    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

     //destructuracion de array
    // [0, 1]
    // ['#movie', 'id']
    const [_, movieId] = location.hash.split('=')
    getMovieById(movieId);//funcion asincrona donde consumamos nuestra API.
  }
  
  function searchPage() {
    console.log("Search!!");
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //destructuracion de array
    // [0, 1]
    // ['#search', 'query']
    const [_, query] = location.hash.split('=')
    getMoviesBySearch(query);
  }
  
  function trendsPage() {
    console.log("TRENDS!!");
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
  }