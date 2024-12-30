let cart = [];


const cartCountElement = document.getElementById("cart-count");
const buyButtons = document.querySelectorAll(".buy");


function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart); 
    }
    updateCartCount(); 
}

function updateCartCount() {
    cartCountElement.textContent = cart.length;
}

function addToCart(game) {
    const existingGame = cart.find(item => item.id === game.id);
    
    if (!existingGame) {
        cart.push(game);
        updateCartCount();
        saveCartToLocalStorage(); 
    } else {
        
        alert(`${game.name} is already in the cart.`);
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); 
}


buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const gameElement = event.target.closest('.game');
        const gameId = gameElement.dataset.id;
        const gameName = gameElement.dataset.name;
        const gamePrice = gameElement.dataset.price;

        const game = {
            id: gameId,
            name: gameName,
            price: gamePrice
        };

        addToCart(game);
    });
});


window.onload = loadCartFromLocalStorage;
