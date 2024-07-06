document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalItems = 0;
    let totalPrice = 0.0;

    // Update totals
    const updateTotals = () => {
        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    };

    // Update item quantity
    const updateQuantity = (item, delta) => {
        const input = item.querySelector('input[type="number"]');
        let quantity = parseInt(input.value) + delta;
        if (quantity < 1) quantity = 1;
        input.value = quantity;

        const price = parseFloat(item.querySelector('p').textContent.replace('Price: $', ''));
        totalPrice += delta * price;
        updateTotals();
    };

    // Initialize cart items
    cartItems.forEach(item => {
        const quantityInput = item.querySelector('input[type="number"]');
        const price = parseFloat(item.querySelector('p').textContent.replace('Price: $', ''));
        const quantity = parseInt(quantityInput.value);

        totalItems += quantity;
        totalPrice += price * quantity;

        item.querySelector('.decrease').addEventListener('click', () => {
            updateQuantity(item, -1);
            totalItems -= 1;
        });

        item.querySelector('.increase').addEventListener('click', () => {
            updateQuantity(item, 1);
            totalItems += 1;
        });

        item.querySelector('.remove-item').addEventListener('click', () => {
            const itemPrice = price * parseInt(quantityInput.value);
            totalItems -= parseInt(quantityInput.value);
            totalPrice -= itemPrice;

            item.remove();
            updateTotals();
        });
    });

    updateTotals();
});
