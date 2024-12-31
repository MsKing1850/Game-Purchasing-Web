
let cart = [];

const cartCountElement = document.getElementById("cart-count");
const buyButtons = document.querySelectorAll(".buy");
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartPreloader = document.getElementById('cart-preloader'); 

function loadCartFromLocalStorage() {

    cartPreloader.style.display = 'block';
    cartItemsElement.style.display = 'none'; 

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    setTimeout(() => {
        updateCartCount();
        updateCartDisplay();
    }, 1000); 
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

function updateCartDisplay() {

    cartPreloader.style.display = 'none';
    cartItemsElement.style.display = 'block';

    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<li class="empty">Your cart is empty.</li>';
        totalPriceElement.textContent = '0';
    } else {
        let total = 0;
        cart.forEach(game => {
            const listItem = document.createElement('li');
            listItem.textContent = `${game.name} - ₹${game.price}`;
            cartItemsElement.appendChild(listItem);
            total += parseInt(game.price);
        });
        totalPriceElement.textContent = total;
    }
}

function resetCart() {
    localStorage.removeItem('cart');
    cart = [];
    updateCartCount();
    updateCartDisplay();
}

function simulatePayment() {
    const totalAmount = document.getElementById('total-price').textContent;
    if (parseInt(totalAmount) === 0) {
        alert('Your cart is empty. Please add items to proceed.');
        return;
    }
    alert(`Proceeding to payment of ₹${totalAmount}. Sorry! This payment can't be done.`);
}

document.getElementById('reset-cart').addEventListener('click', resetCart);

document.getElementById('payment-button').addEventListener('click', simulatePayment);

buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const gameElement = event.target.closest('.game');
        if (gameElement) {
            const gameId = gameElement.dataset.id;
            const gameName = gameElement.dataset.name;
            const gamePrice = gameElement.dataset.price;

            const game = {
                id: gameId,
                name: gameName,
                price: gamePrice
            };

            addToCart(game);
        }
    });
});

window.onload = loadCartFromLocalStorage;

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
        document.querySelectorAll(".hidden").forEach(el => el.classList.remove("hidden"));
    }, 2000); 
});
