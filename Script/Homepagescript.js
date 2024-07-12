document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');

    // Toggle description visibility on click
    categories.forEach(category => {
        const description = category.querySelector('p');
        category.addEventListener('click', () => {
            const isActive = category.classList.contains('active');

            // Reset all categories
            categories.forEach(cat => {
                cat.classList.remove('active'); // Remove active class
                const desc = cat.querySelector('p');
                if (desc !== description) {
                    desc.style.display = 'none'; // Hide other descriptions
                }
            });

            // Toggle active class and description visibility
            if (!isActive) {
                category.classList.add('active'); // Add active class to clicked category
                description.style.display = 'block'; // Show description
            } else {
                category.classList.remove('active'); // Remove active class on second click
                description.style.display = 'none'; // Hide description
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
});
















function passItemData(event, itemId) {
    event.preventDefault();

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const itemData = data[itemId];  // Get item data by ID

            // Store item data in sessionStorage for use in item.html
            sessionStorage.setItem('itemData', JSON.stringify(itemData));

            // Navigate to item.html
            window.location.href = 'item.html';
        })
        .catch(error => console.error('Error fetching data:', error));
}