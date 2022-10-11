const searchkey = decodeURI(location.pathname.split('/').pop());

const searchSpanElement = document.querySelector('#search-key');
searchSpanElement.innerHTML = searchkey;

getProducts(searchkey).then(data => createProductCards(data, '.card-container'))