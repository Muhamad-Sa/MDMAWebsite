// Pass item data and navigate to item.html

function passItemData(event, itemId) {
  event.preventDefault();

  fetch("../Html/data.json")
    .then((response) => response.json())
    .then((data) => {
      const itemData = data.find(item => item.id === itemId); // Get item data by ID

      if (itemData) {
        // Store item data in sessionStorage for use in item.html
        sessionStorage.setItem("itemData", JSON.stringify(itemData));

        // Navigate to item.html
        window.location.href = "../Html/item.html";
      } else {
        console.error("Item data not found.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}










// Update Cart Count in Navbar

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCountElement.textContent = cart.length;
  }
}

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const itemName = document.getElementById("item-name")?.textContent.trim();
  const itemPrice = document.getElementById("item-price")?.textContent.trim();
  const itemDescription = document.getElementById("item-description")?.textContent.trim();

  if (itemName && itemPrice && itemDescription) {
    const item = { itemName, itemPrice, itemDescription };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Update cart count after adding item
  } else {
    console.error("Failed to add to cart: item details are missing");
  }
}






document.addEventListener("DOMContentLoaded", function () {
  
  // Retrieve and display item data from sessionStorage
  const itemData = JSON.parse(sessionStorage.getItem("itemData"));

  if (itemData) {
    document.getElementById("item-name").textContent = itemData.name;
    document.getElementById("item-price").textContent = itemData.price;
    document.getElementById("model-desc").textContent = itemData.modelDesc;
    document.getElementById("ref-num").textContent = itemData.refNum;
    document.getElementById("item-description").textContent = itemData.description;

    const imageContainer = document.getElementById("image-container");
    if (imageContainer) {
      imageContainer.innerHTML = "";
      itemData.images.forEach((imageUrl) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = itemData.name;
        imageContainer.appendChild(img);
      });
    }
  } else {
    console.error("No item data found in sessionStorage.");
  }



  // Initialize cart count
  updateCartCount();
  


  // Add event listener for adding to cart
  const addToBasketButton = document.querySelector(".add-to-basket");
  if (addToBasketButton) {
    addToBasketButton.addEventListener("click", addToCart);
  } else {
    console.error("Add to basket button not found.");
  }

  
  // Search functionality
  fetch("../Html/data.json")
    .then((response) => response.json())
    .then((items) => {
      const searchInput = document.getElementById("searchInput");
      const searchResults = document.getElementById("searchResults");

      if (searchInput) {
        searchInput.addEventListener("input", function () {
          const query = this.value.toLowerCase().trim();

          if (query.length > 0) {
            const filteredItems = items.filter((item) =>
              item.name.toLowerCase().includes(query)
            );
            displaySearchResults(filteredItems);
          } else {
            searchResults.style.display = "none";
          }
        });
      }

      function displaySearchResults(results) {
        if (searchResults) {
          searchResults.innerHTML = "";
          if (results.length > 0) {
            results.forEach((item) => {
              const resultItem = document.createElement("a");
              resultItem.href = `../Html/item.html?id=${item.id}`; // Link to item page
              resultItem.innerHTML = `<img src="${item.images[0]}" alt="${item.name}"> ${item.name}`;
              resultItem.addEventListener("click", function (event) {
                event.preventDefault();
                sessionStorage.setItem("itemData", JSON.stringify(item));
                window.location.href = this.href;
              });
              searchResults.appendChild(resultItem);
            });
            searchResults.style.display = "block";
          } else {
            searchResults.style.display = "none";
          }
        }
      }
    })
    .catch((error) => console.error("Error fetching items:", error));
});
