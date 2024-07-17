document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
  
    // Search functionality
    fetch("Html/data.json")
      .then(response => response.json())
      .then(items => {
        console.log("Data fetched:", items);
        const searchInput = document.getElementById("searchInput");
        const searchResults = document.getElementById("searchResults");
  
        if (searchInput) {
          console.log("Search input found");
          searchInput.addEventListener("input", function () {
            const query = this.value.toLowerCase().trim();
            console.log("Query:", query);
  
            if (query.length > 0) {
              const filteredItems = items.filter(item =>
                item.name.toLowerCase().includes(query)
              );
              displaySearchResults(filteredItems);
            } else {
              searchResults.style.display = "none";
            }
          });
        } else {
          console.error("Search input not found");
        }
  
        function displaySearchResults(results) {
          console.log("Display search results:", results);
          if (searchResults) {
            searchResults.innerHTML = "";
            if (results.length > 0) {
              results.forEach(item => {
                const resultItem = document.createElement("a");
                resultItem.href = `Html/item.html?id=${item.id}`;
                resultItem.innerHTML = `<img src="../Html/${item.images[0]}" alt="${item.name}"> ${item.name}`;
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
          } else {
            console.error("Search results container not found");
          }
        }
      })
      .catch(error => console.error("Error fetching items:", error));
  });
  


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
  