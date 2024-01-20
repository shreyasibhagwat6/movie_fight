// fetching data from the api

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '57a20f74',
            s: searchTerm 
        }
    });
    return response.data.Search;
}

const input = document.querySelector('input');

// accessing user input and making api request after timeout

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    console.log(movies);

// display the movie list received

    for(let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${movie.Poster}"/>
        <h1>${movie.Title}</h1>
        `;
        document.querySelector('#target').appendChild(div);
    }
};

input.addEventListener('input', debounce(onInput), 500);