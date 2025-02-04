let currentSlide = 0;
let startX = 0;
let isDragging = false;

function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length - 2; // Adjust for cloned slides
    const carouselInner = document.querySelector('.carousel-inner');
    const description = document.querySelector('.carousel-description');
    const listenButton = document.querySelector('.listen-button');
    
    // Reset scale of all slides
    slides.forEach(slide => {
        slide.style.transform = 'scale(1)';
        slide.style.objectFit = 'cover'; // Ensure the image maintains its aspect ratio
        slide.style.filter = 'brightness(0.5)'; // Dim the image
    });

    if (currentSlide === 0 && n === -1) {
        currentSlide = totalSlides - 1;
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = `translateX(-${(totalSlides) * 36}%)`;
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
            carouselInner.style.transform = `translateX(-${(currentSlide) * 34.5}%)`;
            slides[currentSlide + 1].style.transform = 'scale(1.2)';
            slides[currentSlide + 1].style.objectFit = 'contain'; // Ensure the image maintains its aspect ratio
            slides[currentSlide + 1].style.filter = 'brightness(1)'; // Reset brightness
            description.textContent = slides[currentSlide + 1].querySelector('p').textContent;
            listenButton.href = slides[currentSlide + 1].dataset.url; // Set the URL for the listen button
        }, 50);
    } else if (currentSlide === totalSlides - 1 && n === 1) {
        currentSlide = 0;
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = `translateX(36%)`;
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
            carouselInner.style.transform = `translateX(0)`;
            slides[currentSlide + 1].style.transform = 'scale(1.2)'; // Scale the current slide
            slides[currentSlide + 1].style.objectFit = 'contain'; // Ensure the image maintains its aspect ratio
            slides[currentSlide + 1].style.filter = 'brightness(1)'; // Reset brightness
            description.textContent = slides[currentSlide + 1].querySelector('p').textContent;
            listenButton.href = slides[currentSlide + 1].dataset.url; // Set the URL for the listen button
        }, 50);
    } else {
        currentSlide = (currentSlide + n + totalSlides) % totalSlides;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(-${(currentSlide) * 34.5}%)`;
        slides[currentSlide + 1].style.transform = 'scale(1.2)'; // Scale the current slide
        slides[currentSlide + 1].style.objectFit = 'contain'; // Ensure the image maintains its aspect ratio
        slides[currentSlide + 1].style.filter = 'brightness(1)'; // Reset brightness
        description.textContent = slides[currentSlide + 1].querySelector('p').textContent;
        listenButton.href = slides[currentSlide + 1].dataset.url; // Set the URL for the listen button
        console.log(listenButton.href);
    }

}

function myHref(){
    const listenButton = document.querySelector('.listen-button');
    window.location.href = listenButton.href;
}

// Initialize the carousel to show the first image in the center
document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    // Clone the first and last slides for the infinite loop effect
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[totalSlides - 1].cloneNode(true);

    carouselInner.insertBefore(lastSlide, slides[0]);
    carouselInner.appendChild(firstSlide);

    // Adjust initial position to center the first image
    carouselInner.style.transform = `translateX(-${35}%)`;

    moveSlide(0);

    // Add event listeners for dragging
    carouselInner.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    carouselInner.addEventListener('mouseup', (e) => {
        if (isDragging) {
            const endX = e.clientX;
            if (startX > endX + 50) {
                moveSlide(1);
            } else if (startX < endX - 50) {
                moveSlide(-1);
            }
            isDragging = false;
        }
    });

    carouselInner.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    carouselInner.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });

    // Prevent default drag behavior on images
    slides.forEach((slide) => {
        const img = slide.querySelector('img');
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });

    // Add event listeners for clicking
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            moveSlide(index - currentSlide);
        });
    });
});