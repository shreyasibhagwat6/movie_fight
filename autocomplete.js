const createAutoComplete = ({ 
    root, 
    renderOption, 
    onOptionSelect, 
    inputValue,
    fetchData 
}) => {
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `;
    
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
    // accessing user input and making api request after timeout
    
    const onInput = async event => {
        const items = await fetchData(event.target.value);
    
        if(!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }
    
    // display the movie list received
    
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for(let item of items) {
            const option = document.createElement('a');
           
    
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
    
    // handling user clicking on a specific movie title
    
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            })
    
            resultsWrapper.appendChild(option);
        }
    };
    
    input.addEventListener('input', debounce(onInput), 500);
    
    // close the dropdown when clicked outside 
    
    document.addEventListener('click', event => {
        if(!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    })
};