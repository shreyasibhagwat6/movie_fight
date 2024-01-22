// fetching data from the api

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '57a20f74',
            s: searchTerm 
        }
    });

// handling error when no such movie is found

    if(response.data.Error) {
        return[];
    }
    return response.data.Search;
}

// select something from HTML and add JS 

createAutoComplete({
    root: document.querySelector('.autocomplete')
});
createAutoComplete({
    root: document.querySelector('.autocomplete-two')
});
createAutoComplete({
    root: document.querySelector('.autocomplete-three')
});

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '57a20f74',
            i: movie.imdbID 
        }
    });
    console.log(response.data);

    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

// select something from HTML and add JS 

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left>
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">BoxOffice</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
}
