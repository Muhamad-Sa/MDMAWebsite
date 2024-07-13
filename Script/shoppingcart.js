document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
            itemPrice.textContent = `$${item.itemPrice}`;

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

    // Function to calculate total price
    function calculateTotalPrice() {
        let totalPrice = 0;
        cart.forEach((item) => {
            // Extract numeric value from itemPrice string (assuming it's in the format "EGP 1,090")
            const numericPrice = parseFloat(item.itemPrice.replace(/[^\d.-]/g, ''));
            if (!isNaN(numericPrice)) {
                totalPrice += numericPrice;
            } else {
                console.error(`Invalid itemPrice for item: ${item.itemName}`);
            }
        });
        return totalPrice;
    }

    // Function to handle checkout button click
    function handleCheckout() {
        const totalPrice = calculateTotalPrice();
        alert(`Checkout successful!\nTotal Price: $${totalPrice.toFixed(2)}`); // Display total price with two decimal places
        
        // Empty the cart and update local storage
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Refresh the displayed cart items
        renderCartItems();
        updateCartCount();
    }

    // Function to update cart count in navbar
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        cartCountElement.textContent = cart.length;
    }

    // Call renderCartItems to initially display cart items
    renderCartItems();

    // Update cart count on page load
    updateCartCount();

    // Event listener for checkout button click
    checkoutButton.addEventListener('click', handleCheckout);

    // Debugging output
    console.log('Initial Cart Items:', cart);
    console.log('Initial Total Price:', calculateTotalPrice());
});
