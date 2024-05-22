const keys = {
    api_key: '05ff3a58681f35b197970aa61e10bd68',
    session_id: '7e023a50fca8efcd5e1f734ecffd7241',
    account_id: '17228550'
};


let current_page = 1;
let total_pages = 10;
let lastQuery = '';
let clear = true;   
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight,clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1 && current_page<total_pages) {
        current_page++;
        searchMovies(lastQuery, false)
    }
});
let moviesResult = document.getElementById("moviesResult");


async function setFav(id, favBool){
    moviesResult.innerHTML="";

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmNlNzY0ZGY2MWM3ZmIwZjI5ZmQxOTIzNzA2NDk4NiIsInN1YiI6IjY2MWQ1NzljMzg5ZGExMDE4NjM2OThlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qpk5_SbqNRXTBnsXCG-jmYSXMNjJm9JnLO2EiGJ2SE4'
        },
        body: JSON.stringify({media_type: 'movie', media_id: id, favorite: favBool})
    };
    let url = `https://api.themoviedb.org/3/account/${keys.account_id}/favorite?api_key=${keys.api_key}&session_id=${keys.session_id}`;
    let response = await fetch(url, options);
    let data = await response.json();

    if (data.success) {
        console.log(`${id} marked as ${favBool}`);
        showFavs();
    } else {
        console.error(`Failed to mark ${id} as ${favBool}: ${data.status_message}`);
    }
}
async function showFavs() {
    moviesResult.innerHTML="";
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmNlNzY0ZGY2MWM3ZmIwZjI5ZmQxOTIzNzA2NDk4NiIsInN1YiI6IjY2MWQ1NzljMzg5ZGExMDE4NjM2OThlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qpk5_SbqNRXTBnsXCG-jmYSXMNjJm9JnLO2EiGJ2SE4'
        }
      };
      
    let response = await fetch('https://api.themoviedb.org/3/account/21215425/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options);
    let data = await response.json();
    console.log(data);

    // Itera sobre las películas y llama a printMovie para cada una
    let movies = data.results;
    if (movies) {
        movies.forEach(movie => printMovie(movie, true, false));
    }
}
async function searchMovies(query){
    console.log("Llega a searchMovies")
    if   (clear) {
        moviesResult.innerHTML="";
        pagina = 1;
    }
    clearInput();
    removeActive();
    ultimaQuery = query;
    const opcions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmNlNzY0ZGY2MWM3ZmIwZjI5ZmQxOTIzNzA2NDk4NiIsInN1YiI6IjY2MWQ1NzljMzg5ZGExMDE4NjM2OThlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qpk5_SbqNRXTBnsXCG-jmYSXMNjJm9JnLO2EiGJ2SE4'
        }
    };
    document.getElementById("loading").hidden = false;
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${pagina}`;
    let response = await fetch(url, opcions);
    let resultat = await response.json();

    console.log(resultat);
    pagsTotals = resultat.total_pages;
    let pelis = resultat.results;
    document.getElementById("loading").hidden = true;
    pelis.forEach(async movie => {
        let url = `https://api.themoviedb.org/3/movie/${movie.id}/account_states?session_id=${keys.session_id}`;
        let response = await fetch(url, opcions);
        let resultat = await response.json();
        if (DataTransfer.favorite) printMovie(movie, true, false);
        else  printMovie(movie, false, false);
    });
}

/* FUNCIONS D'INTERACCIÓ AMB EL DOM */

// Click Favorites
document.getElementById("showFavs").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    showFavs();
})

// Click Watchlist
document.getElementById("showWatch").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    //showWatch();
})

/* Funcions per detectar la cerca d'una pel·lícula */
// Intro a l'input
document.getElementById("search").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMovies(this.value);
    }
});

// Click a la lupa
document.querySelector(".searchBar i").addEventListener("click", ()=>searchMovies(document.getElementById("search").value));

// Netejar l'input
document.getElementById("search").addEventListener('click', ()=>clearInput()); 

function clearInput(){
    document.getElementById("search").value="";
}

// Elimina l'atribut active del menú
function removeActive(){
    document.querySelectorAll(".menu li a").forEach(el=>el.classList.remove("active"));
}

/* Funció per printar les pel·lícules */
function printMovie(movie, fav, watch){
    console.log("Llega a printMovie")

    let favIcon = fav ? 'iconActive' : 'iconNoActive';
    let watchIcon = watch ? 'iconActive' : 'iconNoActive';
    moviesResult.innerHTML += `<div class="movie">
                                    <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                                    <h3>${movie.original_title}</h3>
                                    <div class="buttons">
                                        <a id="fav" onClick="setFav(${movie.id}, ${!fav})"><i class="fa-solid fa-heart ${favIcon}"></i></a>
                                        <a id="watch" onClick="setWatch(${movie.id}, ${!watch})"><i class="fa-solid fa-eye ${watchIcon}"></i></a>
                                    </div>`;
}

