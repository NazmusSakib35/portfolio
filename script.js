// =====================
// Loader
// =====================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// =====================
// Navigation
// =====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// =====================
// Typewriter Effect
// =====================
const typewriter = document.getElementById('typewriter');
const words = ['Graphic Designer', 'Brand Specialist', 'Visual Artist', 'UI/UX Designer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

type();

// =====================
// Counter Animation
// =====================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target + '+';
        }
    };

    updateCounter();
};

// =====================
// Skill Bar Animation
// =====================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkillBars = () => {
    if (skillsAnimated) return;
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
    skillsAnimated = true;
};

// =====================
// Scroll Reveal Animation
// =====================
const revealElements = document.querySelectorAll('.reveal');

const reveal = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });

    // Trigger counter animation
    statNumbers.forEach(stat => {
        const statTop = stat.getBoundingClientRect().top;
        if (statTop < window.innerHeight - 100 && !stat.classList.contains('counted')) {
            stat.classList.add('counted');
            animateCounter(stat);
        }
    });

    // Trigger skill bar animation
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsTop = skillsSection.getBoundingClientRect().top;
        if (skillsTop < window.innerHeight - 100) {
            animateSkillBars();
        }
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
};

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// =====================
// Portfolio Filter
// =====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// =====================
// Lightbox
// =====================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
// Select the items, not just the buttons
const portfolioItemsList = document.querySelectorAll('.portfolio-item');

portfolioItemsList.forEach(item => {
    item.addEventListener('click', (e) => {
        // 1. Check if the user clicked the External Link button or the icon inside it
        if (e.target.closest('.portfolio-link')) {
            // If they clicked the link, do nothing here (let the browser open the link)
            return;
        }

        // 2. Otherwise, open the Lightbox
        e.preventDefault();
        const img = item.querySelector('img');
        lightboxImage.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// =====================
// Testimonials Slider
// =====================
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentSlide = 0;
const totalSlides = testimonialCards.length;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto slide
let autoSlide = setInterval(nextSlide, 5000);

// Pause on hover
const testimonialSlider = document.querySelector('.testimonials-slider');
testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoSlide));
testimonialSlider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// =====================
// Contact Form
// =====================
// =====================
// Contact Form (Web3Forms - No Refresh)
// =====================
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.btn-submit');
const originalBtnText = submitBtn.innerHTML;

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from reloading

    // Change button text to indicate loading
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    
    // Create FormData object
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Send data to Web3Forms using fetch
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            // Success
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset(); // Clear the form inputs
        } else {
            // Error from API
            console.log(response);
            alert(json.message);
        }
    })
    .catch(error => {
        // Network Error
        console.log(error);
        alert('Something went wrong! Please try again later.');
    })
    .then(function() {
        // Reset button text back to original
        submitBtn.innerHTML = originalBtnText;
    });
});

// =====================
// Smooth Scroll for all anchor links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================
// Parallax Effect for Hero Shapes
// =====================
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;

    shapes[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    shapes[1].style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    shapes[2].style.transform = `translate(-50%, -50%) translate(${x * 15}px, ${y * 15}px)`;
});

// =====================
// Newsletter Form
// =====================
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    newsletterForm.reset();
});
