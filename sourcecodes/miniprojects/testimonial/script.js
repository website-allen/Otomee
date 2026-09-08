const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slides = document.querySelector('.slides');
const items = document.querySelectorAll('.slide-item');
const dots = document.querySelectorAll('.dot');


let counter = 0;
const size = 100; //shift by 100% per slide
let autoSlideInterval;

//function to move and pause the slide
function updateSlide() {
    slides.style.transform = `translateX(${-size * counter}%)`;
    updatePagination();
}


//next slide logic
function nextSlide() {
    if (counter >= items.length - 1) {
        counter = 0; //loop back to start
    } else {
        counter++;
    }
    updateSlide(); 
}
//previous slide logic
function prevSlide() {
    if (counter <= 0) {
        counter = items.length - 1; //loop to end
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
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 2300); //2.3 seconds per slide
}

function resetTimer() {
    clearInterval(autoSlideInterval);
    startTimer();
}

//pause on hover (optional but recommended)
items.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval)
    });
    img.addEventListener('mouseleave', () => {startTimer()     
    });
});


//pagination
function updatePagination() {
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    dots[counter].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        counter = index;
        updateSlide();
        resetTimer();
    });
});


//Initialise
startTimer();
