document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to generate HTML for each cart item
    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear existing content

        cart.forEach((item, index) => {
            // Create elements for item details
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');

            const itemName = document.createElement('h3');
            itemName.textContent = item.itemName;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = item.itemPrice;

            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.itemDescription;

            // Append elements to itemDiv
            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(itemDescription);

            // Append itemDiv to cartItemsContainer
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // Call renderCartItems to initially display cart items
    renderCartItems();

    // Function to update cart count in navbar
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        cartCountElement.textContent = cart.length;
    }

    // Update cart count on page load
    updateCartCount();
});
