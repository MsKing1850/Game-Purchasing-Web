  
  function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

   
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

   
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
    updateCartDisplay(); 
}


document.getElementById('reset-cart').addEventListener('click', resetCart);

function simulatePayment() {
    const totalAmount = document.getElementById('total-price').textContent;
    if (parseInt(totalAmount) === 0) {
        alert('Your cart is empty. Please add items to proceed.');
        return;
    }
    alert(`Proceeding to payment of ₹${totalAmount}. Sorry! This payment can't be done.`);
}

document.getElementById('payment-button').addEventListener('click', simulatePayment);

window.onload = updateCartDisplay;