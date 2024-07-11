const slides = document.querySelectorAll(".slides img")
let slideIndex = 0
let intervelID = null
let intervalID = null

document.addEventListener("DOMContentLoaded", intializeSlider)

function intializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide")
        setInterval(nextSlide, 5000)
    }
}
function showSlide(index){

    if(index >= slides.length){
        slideIndex = 0
    }
    else if (index < 0){
        slideIndex = slide.length - 1
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide")
    })
    slides[slideIndex].classList.add("displaySlide")
}
function prevSlide(){
    slideIndex--
    showSlide(slideIndex)
}
function nextSlide(){
    slideIndex++
    showSlide(slideIndex)
}