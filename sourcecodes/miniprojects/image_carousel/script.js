const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');



let counter = 0;
const size = 100; //shift by 100% per slide
let autoSlideInterval;

//function to move and pause the slide
function updateSlide() {
    slides.style.transform = `translateX(${-size * counter}%)`;
    pauseSlide(); 
}


//next slide logic
function nextSlide() {
    if (counter >= images.length - 1) {
        counter = 0; //loop back to start
    } else {
        counter++;
    }
    updateSlide();
    pauseSlide(); 
}
//previous slide logic
function prevSlide() {
    if (counter <= 0) {
        counter = images.length - 1; //loop to end
    } else {
        counter--;
    }
    updateSlide();
}
// ---event listeners---
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});

prevBtn.addEventListener('click', () => {
   prevSlide();
   resetTimer(); 
});

//--Auto rotation logic--
function startTimer() {
    autoSlideInterval = setInterval(nextSlide, 2000); //2 seconds per slide
}

function resetTimer() {
    clearInterval(autoSlideInterval);
    startTimer;
}

//pause on hover (optional but recommended)
images.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval)
    });
    img.addEventListener('mouseleave', () => {startTimer()});
});

//Initialise
startTimer();

alert('hello');