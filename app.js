// fetching data from the api

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com', {
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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search For a Movie</b></label>
<input class="input"/>
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// accessing user input and making api request after timeout

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    console.log(movies);

// display the movie list received

    dropdown.classList.add('is-active');
    for(let movie of movies) {
        const option = document.createElement('a');

        option.classList.add('dropdown-item');
        option.innerHTML = `
        <img src="${movie.Poster}"/>
        ${movie.Title}
        `;

        resultsWrapper.appendChild(option);
    }
};

input.addEventListener('input', debounce(onInput), 500);