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
        './images/IMG_3742.JPG',
        './images/IMG_3744.JPG',
        './images/IMG_3754.JPG',
        './images/IMG_3757.JPG',
        './images/IMG_3758.JPG',
        './images/IMG_3760.JPG',
        './images/IMG_3766.JPG',
        './images/IMG_3776.JPG',
        './images/IMG_3777.JPG',
        './images/IMG_3778.JPG',
        './images/IMG_3780.JPG',
        './images/IMG_3782.JPG',
        './images/IMG_3786.JPG',
        './images/IMG_3789.JPG',
        './images/IMG_3791.JPG',
        './images/IMG_3795.JPG',
        './images/IMG_3799.JPG',
        './images/IMG_3804.JPG',
        './images/IMG_3807.JPG',
        './images/IMG_3810.JPG',
        './images/IMG_3813.JPG',
        './images/IMG_3817.JPG',
        './images/IMG_3818.JPG',
        './images/IMG_3820.JPG',
        './images/IMG_3821.JPG',
        './images/IMG_3822.JPG',
        './images/IMG_3823.JPG',
        './images/IMG_3824.JPG',
        './images/IMG_3825.JPG',
        './images/IMG_3826.JPG',
        './images/IMG_3828.JPG',
        './images/IMG_3829.JPG',
        './images/IMG_3830.JPG',
        './images/IMG_3831.JPG',
        './images/IMG_3833.JPG',
        './images/IMG_3836.JPG',
        './images/IMG_3837.JPG',
        './images/IMG_4423.JPG',
        './images/IMG_4697.JPG',
        './images/IMG_4698.JPG',
        './images/IMG_4701.JPG',
        './images/IMG_4705.JPG',
        './images/IMG_4710.JPG',
        './images/IMG_4720.JPG',
        './images/IMG_4725.JPG',
        './images/IMG_4745.JPG',
        './images/IMG_4748.JPG',
        './images/IMG_4749.JPG',
        './images/IMG_4750.JPG',
        './images/IMG_4751.JPG',
        './images/IMG_4754.JPG',
        './images/IMG_4756.JPG',
        './images/IMG_4760.JPG',
        './images/IMG_4763.JPG',
        './images/IMG_4764.JPG',
        './images/IMG_4765.JPG',
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
 * Language Toggle
 * Switch between English and Swahili
 */
const translations = {
    en: {
        'welcome-title': 'Welcome to AACU',
        'welcome-desc': 'African Australian Christian United. Worship in Shortland, Newcastle NSW with Swahili and English services. All are welcome.',
        'join-us-title': 'Join Us Sundays & Saturdays',
        'sunday-worship': 'Sunday Worship',
        'swahili-english': 'Swahili with English translation',
        'saturday-prayer': 'Saturday Prayer',
        'community-prayer': 'Community prayer & intercession',
        'service-details-btn': 'Service Details',
        'get-in-touch-title': 'Get In Touch',
        'get-in-touch-desc': 'Whether you\'re exploring faith or looking for a spiritual home in Newcastle and Hunter Region, we\'d love to meet you. All services include Swahili and English.',
        'learn-about-us': 'Learn About Us',
        'contact-us': 'Contact Us',
        'about-us-title': 'About Us',
        'about-us-desc': 'Our story, mission, and commitment to community in Newcastle & Hunter Region',
        'who-we-are-title': 'Who We Are',
        'who-we-are-desc': 'AACU is a dynamic, multicultural African Christian community in Shortland, Newcastle NSW. We welcome believers from diverse African backgrounds, including Swahili-speaking communities and all seekers of faith. Our services are conducted in Swahili with English translation, ensuring everyone feels welcome and can participate fully.',
        'believe-title': 'What We Believe',
        'gods-love': 'God\'s Love',
        'gods-love-desc': 'We believe in the transformative power of God\'s unconditional love for all people, transcending boundaries of culture and background.',
        'christs-salvation': 'Christ\'s Salvation',
        'christs-salvation-desc': 'We trust in Jesus Christ as our Lord and Savior, and in His redemptive work through death and resurrection.',
        'community-fellowship': 'Community & Fellowship',
        'community-fellowship-desc': 'We value growing together in Christian fellowship, prayer, service, and mutual support across all languages and cultures.',
        'join-community': 'Join Our Community',
        'join-community-desc': 'Whether you\'re exploring faith, seeking a spiritual home, or want to connect with the African community in Newcastle, we welcome you. All services include Swahili and English.',
        'services-title': 'Our Services',
        'services-desc': 'Worship times, location, and what to expect at AACU in Newcastle NSW',
        'service-times': 'Service Times',
        'sunday-title': 'Sunday Worship',
        'sunday-desc': 'Weekly worship service with music, biblical teaching, and fellowship. Kids & youth programs available. Conducted in Swahili with English translation.',
        'saturday-title': 'Saturday Prayer',
        'saturday-desc': 'Community prayer and intercession. Swahili and English welcome.',
        'location-title': 'Location',
        'visit-us': 'Visit Us',
        'contact-form-title': 'Send us a message',
        'contact-form-desc': 'Services available in Swahili with English translation. Feel free to contact us in either language!',
    },
    sw: {
        'welcome-title': 'Karibu AACU',
        'welcome-desc': 'Kanisa la Wakristo wa Australia. Kumba Shortland, Newcastle NSW na huduma za Kiswahili na Kingereza. Kila mtu ana karibu.',
        'join-us-title': 'Jitokeze Siku za Jumapili & Jumamosi',
        'sunday-worship': 'Ibada ya Jumapili',
        'swahili-english': 'Kiswahili na tafsiri ya Kingereza',
        'saturday-prayer': 'Sala ya Jumamosi',
        'community-prayer': 'Sala na kuomba kwa jamii',
        'service-details-btn': 'Maelezo ya Huduma',
        'get-in-touch-title': 'Wasiliana Nasi',
        'get-in-touch-desc': 'Iwe unachunguza imani au unatafuta nyumba ya roho katika Newcastle na Hunter Region, tunataka kukuona. Huduma zote zina Kiswahili na Kingereza.',
        'learn-about-us': 'Jifunze Kuhusu Sisi',
        'contact-us': 'Wasiliana',
        'about-us-title': 'Kuhusu Sisi',
        'about-us-desc': 'Hadithi yetu, lengo letu, na hati yetu kwa jamii katika Newcastle & Hunter Region',
        'who-we-are-title': 'Nani Tunavyo Kuwa',
        'who-we-are-desc': 'AACU ni jamii ya kidini ya Wakristo wa Afrika ya nguvu katika Shortland, Newcastle NSW. Tunamkaribisha waumini kutoka nyakati mbalimbali za Afrika, ikiwa na jumuiya inayosema Kiswahili na wote wanatafuta imani. Huduma zetu zinafanywa kwa Kiswahili na tafsiri ya Kingereza, na kuhakikisha wote wanavyohisi karibu na yanaweza kushiriki kabisa.',
        'believe-title': 'Nini Tunavyoamini',
        'gods-love': 'Upendo wa Mungu',
        'gods-love-desc': 'Tunaaminiana na nguvu ya kugeuza ya upendo wa Mungu usio na masharti kwa watu wote, ukizidi mipaka ya tamaduni na asili.',
        'christs-salvation': 'Wokfu wa Kristo',
        'christs-salvation-desc': 'Tunaitegemea Yesu Kristo kuwa Bwana na Mwokozi wetu, na kazi yake ya kukomboa kupitia kifo na ufufuo.',
        'community-fellowship': 'Jamii & Ushirikiano',
        'community-fellowship-desc': 'Tunapendeza kukua pamoja katika ushirikiano wa kidini, sala, huduma, na msaada wa pande zote katika lugha na tamaduni zote.',
        'join-community': 'Jiunze Jamii Yetu',
        'join-community-desc': 'Iwe unachunguza imani, kutafuta nyumba ya roho, au unataka kuunganisha na jumuiya ya Afrika katika Newcastle, tunamkaribisha. Huduma zote zina Kiswahili na Kingereza.',
        'services-title': 'Huduma Zetu',
        'services-desc': 'Muda wa ibada, mahali, na nini kitarajiwa AACU Newcastle NSW',
        'service-times': 'Muda wa Huduma',
        'sunday-title': 'Ibada ya Jumapili',
        'sunday-desc': 'Huduma ya ibada kila wiki na muziki, ufundisho wa Biblia, na ushirikiano. Programu za watoto na vijana zinapatikana. Inafanywa kwa Kiswahili na tafsiri ya Kingereza.',
        'saturday-title': 'Sala ya Jumamosi',
        'saturday-desc': 'Sala na kuomba kwa jamii. Kiswahili na Kingereza vinakubali.',
        'location-title': 'Mahali',
        'visit-us': 'Tembelea Sisi',
        'contact-form-title': 'Tumpeleka ujumbe',
        'contact-form-desc': 'Huduma zinapatikana kwa Kiswahili na tafsiri ya Kingereza. Karibu kuwasiliana nasi katika lugha yoyote!',
    }
};

function initializeLanguageToggle() {
    const toggle = document.getElementById('language-toggle');
    if (!toggle) return;
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('aacu-language') || 'en';
    let currentLanguage = savedLanguage;
    updateLanguageButton(currentLanguage);
    
    toggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'sw' : 'en';
        localStorage.setItem('aacu-language', currentLanguage);
        updateLanguageButton(currentLanguage);
        applyTranslations(currentLanguage);
    });
    
    // Apply saved language on page load
    if (savedLanguage === 'sw') {
        applyTranslations('sw');
    }
}

function updateLanguageButton(lang) {
    const toggle = document.getElementById('language-toggle');
    if (toggle) {
        toggle.textContent = lang === 'en' ? 'Swahili' : 'English';
    }
}

function applyTranslations(lang) {
    Object.keys(translations[lang]).forEach(key => {
        const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
        elements.forEach(element => {
            element.textContent = translations[lang][key];
        });
    });
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
    initializeLanguageToggle();
    
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
    document.addEventListener('DOMContentLoaded', () => {
        initialize();
        // Apply saved language preference after everything is initialized
        const savedLanguage = localStorage.getItem('aacu-language') || 'en';
        if (savedLanguage === 'sw') {
            applyTranslations('sw');
            updateLanguageButton('sw');
        }
    });
} else {
    initialize();
    // Apply saved language preference after everything is initialized
    const savedLanguage = localStorage.getItem('aacu-language') || 'en';
    if (savedLanguage === 'sw') {
        applyTranslations('sw');
        updateLanguageButton('sw');
    }
}

/**
 * Exported Functions for Console/External Use
 * These can be called from the browser console or programmatically
 */
window.AACU = {
    toggleAnnouncements: toggleAnnouncements,
    updateAnnouncementsContent: updateAnnouncementsContent,
    setActiveNavLink: setActiveNavLink,
    initializeLanguageToggle: initializeLanguageToggle,
    applyTranslations: applyTranslations
};
