// Mobile Menu
const menuToggle = document.querySelector('.nav-toggle');
const menuLinks = document.querySelector('.menu-links');
const hamburger = document.querySelector('.hamburger');

menuToggle.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Treats Slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        slides[index].classList.add('active');
        // Fade in effect
        setTimeout(() => {
            slides[index].style.opacity = '1';
        }, 50);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function pauseSlideshow() {
        clearInterval(slideInterval);
    }

    if (prevButton && nextButton && slides.length > 0) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            pauseSlideshow();
            startSlideshow();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            pauseSlideshow();
            startSlideshow();
        });

        // Start automatic slideshow
        startSlideshow();

        // Pause slideshow when hovering over it
        const treatSlider = document.querySelector('.treats-slider');
        treatSlider.addEventListener('mouseenter', pauseSlideshow);
        treatSlider.addEventListener('mouseleave', startSlideshow);

        // Ensure first slide is shown with fade effect
        showSlide(0);
    }
});

// Treat Card Animations
const treatCards = document.querySelectorAll('.treat-card');

const treatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            // Trigger a reflow
            entry.target.offsetHeight;

            // Add animation
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            treatObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

treatCards.forEach(card => treatObserver.observe(card));

// Smooth Scroll to Top
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (scrollTopBtn.style.opacity === '0') {
                scrollTopBtn.style.display = 'none';
            }
        }, 300);
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            menuLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
const counterSpeed = 200;

function animateCounter(counter) {
    const target = +counter.dataset.target;
    let count = 0;
    const increment = target / counterSpeed;

    function updateCount() {
        if (count < target) {
            count += increment;
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            counter.textContent = target;
        }
    }

    updateCount();
}

//  function to handle counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Add animation class to feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            featureObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

featureCards.forEach(card => featureObserver.observe(card));