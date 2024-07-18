document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");
    let cart = [];
  
    // Try parsing cart items from localStorage
    try {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Error parsing cart items from localStorage:", error);
    }
  
    // Function to render cart items
    function renderCartItems() {
      cartItemsContainer.innerHTML = ""; // Clear existing content
  
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
  
        const itemName = document.createElement("h3");
        itemName.textContent = item.itemName;
  
        const itemPrice = document.createElement("p");
        itemPrice.textContent = `$${item.itemPrice}`;
  
        const itemDescription = document.createElement("p");
        itemDescription.textContent = item.itemDescription;
  
        // Quantity controls
        const quantityLabel = document.createElement("label");
        quantityLabel.textContent = "Quantity:";
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity || 1; // Default to 1 if quantity is not set
        quantityInput.min = 1;
        quantityInput.addEventListener("change", (event) => {
          updateQuantity(index, event.target.value);
        });
  
        // Increase quantity button
        const increaseButton = document.createElement("button");
          increaseButton.classList.add("cartbuttons")
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", () => {
          increaseQuantity(index);
        });
  
        // Decrease quantity button
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener("click", () => {
          decreaseQuantity(index);
        });
  
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => {
          removeFromCart(index);
        });
  
        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(itemDescription);
        itemDiv.appendChild(quantityLabel);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(increaseButton);
        itemDiv.appendChild(decreaseButton);
        itemDiv.appendChild(deleteButton);
  
        cartItemsContainer.appendChild(itemDiv);
      });
  
      if (cart.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "Your cart is empty.";
        cartItemsContainer.appendChild(emptyCartMessage);
      }
    }
  
    // Function to increase quantity
    function increaseQuantity(index) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    }
  
    // Function to decrease quantity
    function decreaseQuantity(index) {
      cart[index].quantity = (cart[index].quantity || 1) - 1;
      if (cart[index].quantity <= 0) {
        removeFromCart(index);
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
      }
    }
  
    // Function to update quantity
    function updateQuantity(index, newQuantity) {
      cart[index].quantity = parseInt(newQuantity);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    }
  
    // Function to remove item from cart
    function removeFromCart(index) {
      cart.splice(index, 1); // Remove item from cart array
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      renderCartItems(); // Re-render cart items
      updateCartCount(); // Update cart count in navbar
    }
  
    // Function to calculate total price
    function calculateTotalPrice() {
      let totalPrice = 0;
      cart.forEach((item) => {
        const numericPrice = parseFloat(item.itemPrice.replace(/[^\d.-]/g, ""));
        const quantity = item.quantity || 1;
        if (!isNaN(numericPrice)) {
          totalPrice += numericPrice * quantity;
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
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Refresh the displayed cart items
      renderCartItems();
      updateCartCount();
    }
  
    // Function to update cart count in navbar
    function updateCartCount() {
      const cartCountElement = document.getElementById("cart-count");
      cartCountElement.textContent = cart.length;
    }
  
    // Call renderCartItems to initially display cart items
    renderCartItems();
  
    // Update cart count on page load
    updateCartCount();
  
    // Event listener for checkout button click
    checkoutButton.addEventListener("click", handleCheckout);
  
    // Debugging output
    console.log("Initial Cart Items:", cart);
    console.log("Initial Total Price:", calculateTotalPrice());
  });
  