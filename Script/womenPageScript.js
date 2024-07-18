document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("categorySlider");
  const mainContent = document.getElementById("mainContent");
  const toggleButton = document.getElementById("toggleSlider");
  const sliderSection = document.getElementById("sliderSection");

  toggleButton.addEventListener("click", () => {
    if (slider.style.left === "0px") {
      slider.style.left = "-250px";
      mainContent.style.marginLeft = "0";
    } else {
      slider.style.left = "0px";
      mainContent.style.marginLeft = "250px";
    }
  });

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
  });
});


// Function to show a specific section
function showSection(sectionId) {
  console.log("showSection called with id:", sectionId); // Debugging line

  // Get all sections
  const sections = document.querySelectorAll("div > section");

  // Iterate through all sections
  sections.forEach((section) => {
    // Check if the section is the one to be shown
    if (section.id === sectionId) {
      section.style.display = "grid"; // or 'block' if preferred
    } else {
      section.style.display = "none";
    }
  });
}

// Initially show the 'newcollection' section
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("div > section");

  sections.forEach((section) => {
    section.style.display = "none"; // Hide all sections initially
  });

  document.getElementById("newcollcetion").style.display = "grid"; // Show 'newcollection' section
});
