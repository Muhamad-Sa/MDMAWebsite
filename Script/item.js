document.addEventListener('DOMContentLoaded', function() {
    const itemData = JSON.parse(sessionStorage.getItem('itemData'));

    if (itemData) {
        document.getElementById('item-name').textContent = itemData.name;
        document.getElementById('item-price').textContent = itemData.price;
        document.getElementById('item-colors').textContent = itemData.colors + ' Colours';
        document.getElementById('model-desc').textContent = itemData.modelDesc;
        document.getElementById('ref-num').textContent = itemData.refNum;
        document.getElementById('item-description').textContent = itemData.description;

        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = '';
        itemData.images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = itemData.name;
            imageContainer.appendChild(img);
        });

        initializeSlider();
    } else {
        console.error('No item data found in sessionStorage.');
    }
});

let slideIndex = 0;
let intervalID = null;

function initializeSlider() {
    const slides = document.querySelectorAll('.slides img');
    if (slides.length > 0) {
        slides[slideIndex].classList.add('displaySlide');
        intervalID = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slides img');
    if (slides.length === 0) return;

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove('displaySlide');
    });
    slides[slideIndex].classList.add('displaySlide');
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}
