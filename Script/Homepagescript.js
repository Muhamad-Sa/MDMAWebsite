document.getElementById("scrollButton").addEventListener("click", function () {
  const productsSection = document.getElementById("categories");
  productsSection.scrollIntoView({ behavior: "smooth" });
});
