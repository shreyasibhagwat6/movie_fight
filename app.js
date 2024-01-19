// fetching data from the api
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '57a20f74',
            s: searchTerm 
        }
    });
    console.log(response.data)
}

const input = document.querySelector('input');

// accessing user input
let timeoutId;

const onInput = event => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(()=>{
        fetchData(event.target.value);
    }, 1000)
};

input.addEventListener('input', onInput);