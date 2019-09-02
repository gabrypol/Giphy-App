const API_KEY = 'AX5oASG5QT3uy7ov4PCORuMPoDjYqp5V';

// User Interface variables
const textField = document.querySelector('#search-text');
const searchButton = document.querySelector('#search-form');

const trendingTab = document.querySelector('#trending-btn');
const searchTab = document.querySelector('#search-btn');

const trendingGrid = document.querySelector('#trending-grid');
const searchedGrid = document.querySelector('#searched-grid');

const loadMoreButton = document.querySelector('#load-more-btn');


// Event listeners
searchButton.addEventListener('submit', getSearchData);
trendingTab.addEventListener('click', getTrending);


// Get searched Giphys and show them on the DOM
function getSearchData(e) {
    
    if(textField.value === '') {
        alert('Enter a search term!');
    } else {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `http://api.giphy.com/v1/gifs/search?q=${textField.value}&api_key=${API_KEY}&limit=50`, true);

        xhr.onload = function() {
            if(this.status === 200) {
                const giphys = JSON.parse(this.responseText).data;

                let output = '';
                giphys.forEach(element => {
                    output += `
                    <div class="giphy"><img src="${element.images.original.url}"/></div>
                    `;
                });

                // Render giphys on the DOM
                searchedGrid.innerHTML = output;
            } else {
                console.log('error');
            }
        }
        xhr.send();

        // Clear the input text field
        textField.value = '';
    };

    e.preventDefault();
}


// Get trending Giphys and show them on the DOM
function getTrending() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://api.giphy.com/v1/gifs/trending?&api_key=${API_KEY}&limit=50`, true);
    
    xhr.onload = function() {
        if(this.status === 200) {
            const giphys = JSON.parse(this.responseText).data;

            let output = '';
            giphys.forEach(element => {
                output += `
                <div class="giphy"><img src="${element.images.original.url}"/></div>
                `;
            });

            // Render giphys on the DOM
            searchedGrid.innerHTML = output;   
        } else {
            console.log('error');
        }
    }
    xhr.send();
}


