document.addEventListener("DOMContentLoaded", function () {
  const itemData = JSON.parse(sessionStorage.getItem("itemData"));

  if (itemData) {
    document.getElementById("item-name").textContent = itemData.name;
    document.getElementById("item-price").textContent = itemData.price;
    document.getElementById("model-desc").textContent = itemData.modelDesc;
    document.getElementById("ref-num").textContent = itemData.refNum;
    document.getElementById("item-description").textContent =
      itemData.description;

    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = "";
    itemData.images.forEach((imageUrl) => {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = itemData.name;
      imageContainer.appendChild(img);
    });

    initializeSlider();
  } else {
    console.error("No item data found in sessionStorage.");
  }
});

let slideIndex = 0;
let intervalID = null;

function initializeSlider() {
  const slides = document.querySelectorAll(".slides img");
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalID = setInterval(nextSlide, 5000);
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slides img");
  if (slides.length === 0) return;

  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

//Search by name in search bar

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((items) => {
      const searchInput = document.getElementById("searchInput");
      const searchResults = document.getElementById("searchResults");

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

      function displaySearchResults(results) {
        searchResults.innerHTML = "";
        if (results.length > 0) {
          results.forEach((item) => {
            const resultItem = document.createElement("a");
            resultItem.href = `item.html?id=${item.id}`; // Link to item page
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
    })
    .catch((error) => console.error("Error fetching items:", error));
});

// Function to update cart count in navbar
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCountElement.textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
  document
    .querySelector(".add-to-basket")
    .addEventListener("click", function () {
      addToCart();
    });

  function addToCart() {
    // For now, we'll just add a placeholder item to the cart array
    const itemName = document.getElementById("item-name").textContent.trim();
    const itemPrice = document.getElementById("item-price").textContent.trim();
    const itemDescription = document
      .getElementById("item-description")
      .textContent.trim();
    const item = { itemName, itemPrice, itemDescription };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Update cart count after adding item
  }
});
