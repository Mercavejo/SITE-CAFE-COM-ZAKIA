/* =========================================
   CAFÉ COM ZAKIA - JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initSmoothScroll();
    initCinemaPlayer();
});

/* ---------- Navbar ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

/* ---------- Carousel ---------- */
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track) return;

    const cards = track.querySelectorAll('.reel-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, totalCards - cardsPerView);

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const dotsCount = maxIndex + 1;

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Get cards per view based on screen width
    function getCardsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    // Update carousel position
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 16; // var(--space-md) in pixels
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        prevBtn.style.opacity = currentIndex === 0 ? 0.5 : 1;
        nextBtn.style.opacity = currentIndex >= maxIndex ? 0.5 : 1;
    }

    // Navigate to specific slide
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cardsPerView = getCardsPerView();
            maxIndex = Math.max(0, totalCards - cardsPerView);
            currentIndex = Math.min(currentIndex, maxIndex);
            createDots();
            updateCarousel();
        }, 150);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Initialize
    createDots();
    updateCarousel();
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .pricing-card, ' +
        '.guest-card, .cinema-showcase, .host-content, .diferencial-content, .sponsors-marquee'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ---------- Utility Functions ---------- */

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ---------- Cinema Video Player ---------- */
function initCinemaPlayer() {
    const video = document.querySelector('.cinema-video');
    const overlay = document.querySelector('.cinema-player-overlay');
    const playBtn = document.getElementById('cinemaPlayBtn');

    if (!video || !overlay || !playBtn) return;

    let isMuted = true;

    overlay.addEventListener('click', () => {
        if (isMuted) {
            video.muted = false;
            isMuted = false;
            overlay.classList.add('hidden');
        } else {
            video.muted = true;
            isMuted = true;
            overlay.classList.remove('hidden');
        }
    });

    // Pause/play on visibility
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
                video.muted = true;
                isMuted = true;
                overlay.classList.remove('hidden');
            }
        });
    }, { threshold: 0.3 });

    videoObserver.observe(video);
}
