// =====================================================
// AACU Website - Main JavaScript
// Production-Ready Static Site
// =====================================================

/**
 * Image Carousel / Slider
 * Auto-rotate through church photos with manual controls
 */
function initializeCarousel() {
    const slidesContainer = document.getElementById('carousel-slides');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!slidesContainer || !dotsContainer) return;
    
    // List of images from ./images/ folder
    const imageList = [
        './images/IMG_3737.JPG',
        './images/IMG_3738.JPG',
        './images/IMG_3739.JPG',
        './images/IMG_3740.JPG',
        './images/IMG_3741.JPG',
        './images/IMG_3742.JPG',
        './images/IMG_3743.JPG',
        './images/IMG_3744.JPG',
        './images/IMG_3745.JPG',
        './images/IMG_3746.JPG',
        './images/IMG_3748.JPG',
        './images/IMG_3749.JPG',
        './images/IMG_3752.JPG',
        './images/IMG_3753.JPG',
        './images/IMG_3754.JPG',
        './images/IMG_3755.JPG',
        './images/IMG_3756.JPG',
        './images/IMG_3757.JPG',
        './images/IMG_3758.JPG',
        './images/IMG_3759.JPG',
        './images/IMG_3760.JPG',
        './images/IMG_3761.JPG',
        './images/IMG_3762.JPG',
        './images/IMG_3763.JPG',
        './images/IMG_3764.JPG',
        './images/IMG_3765.JPG',
        './images/IMG_3766.JPG',
        './images/IMG_3768.JPG',
        './images/IMG_3769.JPG',
        './images/IMG_3770.JPG',
        './images/IMG_3771.JPG',
        './images/IMG_3772.JPG',
        './images/IMG_3773.JPG',
        './images/IMG_3774.JPG',
        './images/IMG_3775.JPG',
        './images/IMG_3776.JPG',
        './images/IMG_3777.JPG',
        './images/IMG_3778.JPG',
        './images/IMG_3779.JPG',
        './images/IMG_3780.JPG',
        './images/IMG_3781.JPG',
        './images/IMG_3782.JPG',
        './images/IMG_3783.JPG',
        './images/IMG_3784.JPG',
        './images/IMG_3785.JPG',
        './images/IMG_3786.JPG',
        './images/IMG_3787.JPG',
        './images/IMG_3788.JPG',
        './images/IMG_3789.JPG',
        './images/IMG_3790.JPG',
        './images/IMG_3791.JPG',
        './images/IMG_3792.JPG',
        './images/IMG_3793.JPG',
        './images/IMG_3794.JPG',
        './images/IMG_3795.JPG',
        './images/IMG_3796.JPG',
        './images/IMG_3797.JPG',
        './images/IMG_3798.JPG',
        './images/IMG_3799.JPG',
        './images/IMG_3800.JPG',
        './images/IMG_3801.JPG',
        './images/IMG_3802.JPG',
        './images/IMG_3803.JPG',
        './images/IMG_3804.JPG',
        './images/IMG_3805.JPG',
        './images/IMG_3806.JPG',
        './images/IMG_3807.JPG',
        './images/IMG_3808.JPG',
        './images/IMG_3809.JPG',
        './images/IMG_3810.JPG',
        './images/IMG_3811.JPG',
        './images/IMG_3812.JPG',
        './images/IMG_3813.JPG',
        './images/IMG_3814.JPG',
        './images/IMG_3815.JPG',
        './images/IMG_3816.JPG',
        './images/IMG_3817.JPG',
        './images/IMG_3818.JPG',
        './images/IMG_3819.JPG',
        './images/IMG_3820.JPG',
        './images/IMG_3821.JPG',
        './images/IMG_3822.JPG',
        './images/IMG_3823.JPG',
        './images/IMG_3824.JPG',
        './images/IMG_3825.JPG',
        './images/IMG_3826.JPG',
        './images/IMG_3827.JPG',
        './images/IMG_3828.JPG',
        './images/IMG_3829.JPG',
        './images/IMG_3830.JPG',
        './images/IMG_3831.JPG',
        './images/IMG_3832.JPG',
        './images/IMG_3833.JPG',
        './images/IMG_3834.JPG',
        './images/IMG_3835.JPG',
        './images/IMG_3836.JPG',
        './images/IMG_3837.JPG',
        './images/IMG_3838.JPG',
        './images/IMG_4423.JPG',
        './images/IMG_4679.JPG',
        './images/IMG_4680.JPG',
        './images/IMG_4681.JPG',
        './images/IMG_4682.JPG',
        './images/IMG_4683.JPG',
        './images/IMG_4684.JPG',
        './images/IMG_4689.JPG',
        './images/IMG_4690.JPG',
        './images/IMG_4691.JPG',
        './images/IMG_4692.JPG',
        './images/IMG_4693.JPG',
        './images/IMG_4694.JPG',
        './images/IMG_4695.JPG',
        './images/IMG_4696.JPG',
        './images/IMG_4697.JPG',
        './images/IMG_4698.JPG',
        './images/IMG_4699.JPG',
        './images/IMG_4700.JPG',
        './images/IMG_4701.JPG',
        './images/IMG_4702.JPG',
        './images/IMG_4703.JPG',
        './images/IMG_4704.JPG',
        './images/IMG_4705.JPG',
        './images/IMG_4706.JPG',
        './images/IMG_4707.JPG',
        './images/IMG_4708.JPG',
        './images/IMG_4709.JPG',
        './images/IMG_4710.JPG',
        './images/IMG_4711.JPG',
        './images/IMG_4713.JPG',
        './images/IMG_4714.JPG',
        './images/IMG_4715.JPG',
        './images/IMG_4716.JPG',
        './images/IMG_4717.JPG',
        './images/IMG_4718.JPG',
        './images/IMG_4719.JPG',
        './images/IMG_4720.JPG',
        './images/IMG_4721.JPG',
        './images/IMG_4722.JPG',
        './images/IMG_4723.JPG',
        './images/IMG_4724.JPG',
        './images/IMG_4725.JPG',
        './images/IMG_4726.JPG',
        './images/IMG_4727.JPG',
        './images/IMG_4728.JPG',
        './images/IMG_4729.JPG',
        './images/IMG_4730.JPG',
        './images/IMG_4731.JPG',
        './images/IMG_4732.JPG',
        './images/IMG_4733.JPG',
        './images/IMG_4734.JPG',
        './images/IMG_4735.JPG',
        './images/IMG_4736.JPG',
        './images/IMG_4737.JPG',
        './images/IMG_4738.JPG',
        './images/IMG_4739.JPG',
        './images/IMG_4740.JPG',
        './images/IMG_4741.JPG',
        './images/IMG_4742.JPG',
        './images/IMG_4743.JPG',
        './images/IMG_4744.JPG',
        './images/IMG_4745.JPG',
        './images/IMG_4746.JPG',
        './images/IMG_4747.JPG',
        './images/IMG_4748.JPG',
        './images/IMG_4749.JPG',
        './images/IMG_4750.JPG',
        './images/IMG_4751.JPG',
        './images/IMG_4752.JPG',
        './images/IMG_4753.JPG',
        './images/IMG_4754.JPG',
        './images/IMG_4755.JPG',
        './images/IMG_4756.JPG',
        './images/IMG_4757.JPG',
        './images/IMG_4758.JPG',
        './images/IMG_4759.JPG',
        './images/IMG_4760.JPG',
        './images/IMG_4761.JPG',
        './images/IMG_4762.JPG',
        './images/IMG_4763.JPG',
        './images/IMG_4764.JPG',
        './images/IMG_4765.JPG',
        './images/IMG_4766.JPG',
    ];
    
    // Build carousel slides dynamically with lazy loading
    imageList.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.setAttribute('data-index', index);
        
        // Use lazy loading for better performance
        const isNearby = index <= 2; // Preload first 3 slides
        slide.innerHTML = `
            <img src="${isNearby ? img : ''}" data-src="${img}" ${isNearby ? 'loading="lazy"' : 'loading="lazy"'} alt="AACU Community - Photo ${index + 1}">
        `;
        slidesContainer.appendChild(slide);
        
        // Create navigation dot
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', index);
        dotsContainer.appendChild(dot);
    });
    
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    // Preload nearby slide images for smooth transitions
    function preloadNearbySlides(currentIndex) {
        const preloadRange = 2;
        slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img && Math.abs(index - currentIndex) <= preloadRange) {
                if (!img.src && img.dataset.src) {
                    img.src = img.dataset.src;
                }
            }
        });
    }
    
    // Show specific slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        
        // Preload nearby images for smooth transitions
        preloadNearbySlides(n);
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        resetAutoPlay();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        resetAutoPlay();
    }
    
    // Auto-play slides every 5 seconds
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Click handlers
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoPlay();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Start auto-play and preload initial nearby slides
    startAutoPlay();
    preloadNearbySlides(0);
}

/**
 * Navigation Toggle
 * Handles mobile menu toggle functionality
 */
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle menu visibility
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Set active link based on current page
    setActiveNavLink();
}

/**
 * Set Active Navigation Link
 * Highlights the current page in navigation
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `./${currentPage}` || (currentPage === '' && href === './index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Announcements Banner
 * Manage the display of announcements banner
 */
function initializeAnnouncementsBanner() {
    const banner = document.getElementById('announcements-banner');
    const closeBtn = document.getElementById('close-announcement');
    
    if (!banner || !closeBtn) return;
    
    // Check if banner was previously closed (in session storage)
    const bannerClosed = sessionStorage.getItem('announcementsClosed');
    if (bannerClosed) {
        banner.style.display = 'none';
    }
    
    // Handle close button click
    closeBtn.addEventListener('click', () => {
        banner.style.display = 'none';
        sessionStorage.setItem('announcementsClosed', 'true');
    });
}

/**
 * Toggle Announcements Banner
 * Public function to show/hide announcements
 * Usage: toggleAnnouncements() in browser console or programmatically
 */
function toggleAnnouncements() {
    const banner = document.getElementById('announcements-banner');
    if (!banner) return;
    
    if (banner.style.display === 'none') {
        banner.style.display = 'block';
        sessionStorage.removeItem('announcementsClosed');
    } else {
        banner.style.display = 'none';
        sessionStorage.setItem('announcementsClosed', 'true');
    }
}

/**
 * Update Announcements Content
 * Dynamically update banner message
 * Usage: updateAnnouncementsContent('New message text')
 */
function updateAnnouncementsContent(message) {
    const announcementContent = document.querySelector('.announcement-content');
    if (!announcementContent) return;
    
    // Get the close button to preserve it
    const closeBtn = announcementContent.querySelector('.close-announcement');
    announcementContent.textContent = message;
    if (closeBtn) {
        announcementContent.appendChild(closeBtn);
    }
}

/**
 * Smooth Scroll Handler
 * Adds smooth scrolling for anchor links (CSS-based but enhances experience)
 */
function initializeSmoothScroll() {
    // Already handled by CSS, but can add JS for older browsers if needed
    // This is here for future enhancement if needed
}

/**
 * Form Handling
 * Enhanced form submission with client-side fallback
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Handle form submission with fallback to mailto
    form.addEventListener('submit', (e) => {
        // Allow default form submission
        // If Formspree is not configured, it will fall back to mailto link
        
        // Optional: Add client-side validation
        const email = form.querySelector('#email');
        const name = form.querySelector('#name');
        const message = form.querySelector('#message');
        
        if (email && !isValidEmail(email.value)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }
        
        if (name && name.value.trim() === '') {
            e.preventDefault();
            alert('Please enter your name.');
            return;
        }
        
        if (message && message.value.trim() === '') {
            e.preventDefault();
            alert('Please enter a message.');
            return;
        }
    });
}

/**
 * Email Validation Helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Keyboard Navigation Enhancement
 * Improve keyboard accessibility
 */
function initializeKeyboardNavigation() {
    // Focus visible style enhancement for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

/**
 * Print Page Functionality
 * Provide convenient print button functionality if needed
 */
function initializePrintFunctionality() {
    // Add print button functionality if print buttons exist
    const printButtons = document.querySelectorAll('[data-print]');
    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.print();
        });
    });
}

/**
 * Analytics Placeholder
 * Hook for future analytics integration (Google Analytics, Plausible, etc.)
 * To use: Uncomment and add your analytics code
 */
function initializeAnalytics() {
    // Example: Google Analytics
    // Replace YOUR_GA_ID with your actual Google Analytics ID
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_GA_ID');
    */
    
    // Example: Plausible Analytics
    /*
    window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
    */
}

/**
 * Performance Monitoring (Optional)
 * Log core web vitals for performance tracking
 */
function initializePerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

/**
 * Intersection Observer for Animations
 * Animate elements as they come into view
 */
function initializeIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeIn 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all cards and content sections
    document.querySelectorAll('.card, .belief-card, .leader-card, .expect-item').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

/**
 * Dark Mode Toggle (Optional)
 * Provide dark/light mode toggle if desired
 * Uncomment to enable
 */
/*
function initializeDarkModeToggle() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    const theme = storedTheme || (prefersDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add toggle button if you want user control
    const darkModeToggle = document.querySelector('[data-toggle-theme]');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}
*/

/**
 * Lazy Load Images (Optional)
 * For future use if images are added
 */
function initializeLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Initialize All Components
 * Main initialization function
 */
function initialize() {
    // Carousel (hero images)
    initializeCarousel();
    
    // Core functionality
    initializeNavigation();
    initializeAnnouncementsBanner();
    initializeContactForm();
    initializeKeyboardNavigation();
    
    // Enhancements
    initializeSmoothScroll();
    initializePrintFunctionality();
    initializeIntersectionObserver();
    initializeLazyLoading();
    
    // Optional features
    initializePerformanceMonitoring();
    initializeAnalytics();
    
    console.log('AACU Website initialized');
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

/**
 * Exported Functions for Console/External Use
 * These can be called from the browser console or programmatically
 */
window.AACU = {
    toggleAnnouncements: toggleAnnouncements,
    updateAnnouncementsContent: updateAnnouncementsContent,
    setActiveNavLink: setActiveNavLink
};
