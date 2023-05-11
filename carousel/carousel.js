const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn-next');
const prevButton = document.querySelector('.carousel-btn-previous');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Setting slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth*index}px`;
}

slides.forEach(setSlidePosition);

// Changing slides from currentSLide to targetSlide in a track
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

// Updating slide indicators
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

// Click on the 'next slide' button
nextButton.addEventListener('click', e => {
    // Moving slides
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling ?? slides[0];
    moveToSlide(track, currentSlide, nextSlide);

    // Updating the dot indicator
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling ?? dots[0];
    updateDots(currentDot, nextDot);
})

// Click on the 'previous slide' button
prevButton.addEventListener('click', e => {
    // Moving slides
    const currentSlide = track.querySelector('.current-slide');
    const previousSlide = currentSlide.previousElementSibling ?? slides[slides.length-1];
    moveToSlide(track,currentSlide,previousSlide);

    // Updating the dot indicator
    const currentDot = dotsNav.querySelector('.current-slide');
    const previousDot = currentDot.previousElementSibling ?? dots[dots.length-1];
    updateDots(currentDot, previousDot);
})

// Click on the bottom navigation
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSLide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSLide, targetSlide);

    updateDots(currentDot, targetDot);
})

