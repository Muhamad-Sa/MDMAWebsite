document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");

  // Toggle description visibility on click
  categories.forEach((category) => {
    const description = category.querySelector("p");
    category.addEventListener("click", () => {
      const isActive = category.classList.contains("active");

      // Reset all categories
      categories.forEach((cat) => {
        cat.classList.remove("active"); // Remove active class
        const desc = cat.querySelector("p");
        if (desc !== description) {
          desc.style.display = "none"; // Hide other descriptions
        }
      });

      // Toggle active class and description visibility
      if (!isActive) {
        category.classList.add("active"); // Add active class to clicked category
        description.style.display = "block"; // Show description
      } else {
        category.classList.remove("active"); // Remove active class on second click
        description.style.display = "none"; // Hide description
      }
    });

    //shop now scroll button
    document
      .getElementById("scrollButton")
      .addEventListener("click", function () {
        const productsSection = document.getElementById("categories");
        productsSection.scrollIntoView({ behavior: "smooth" });
      });
  });
});

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
    })
    .catch((error) => console.error("Error fetching items:", error));
});

// Function to send data to item page

function passItemData(event, itemId) {
  event.preventDefault();

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const itemData = data[itemId]; // Get item data by ID

      // Store item data in sessionStorage for use in item.html
      sessionStorage.setItem("itemData", JSON.stringify(itemData));

      // Navigate to item.html
      window.location.href = "../Html/item.html";
    })
    .catch((error) => console.error("Error fetching data:", error));
}
