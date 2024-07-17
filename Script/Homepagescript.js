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






