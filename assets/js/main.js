// =====================================================
// AACU Website - Main JavaScript
// Production-Ready Static Site
// =====================================================

const DAILY_CAROUSEL_IMAGE_COUNT = 5;
const IMAGE_LIBRARY = [
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
    './images/IMG_4760.JPG',
    './images/IMG_4763.JPG',
    './images/IMG_4764.JPG',
    './images/IMG_4765.JPG',
    './images/image.jpeg',
    './images/image 2.jpeg'
];

function hashDateToSeed(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateKey = `${y}-${m}-${d}`;
    let hash = 0;

    for (let i = 0; i < dateKey.length; i += 1) {
        hash = ((hash << 5) - hash) + dateKey.charCodeAt(i);
        hash |= 0;
    }

    return hash >>> 0;
}

function createSeededRandom(seed) {
    let state = seed >>> 0;

    return function seededRandom() {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function getDailyShuffledImages() {
    const seed = hashDateToSeed(new Date());
    const random = createSeededRandom(seed);
    const shuffled = [...IMAGE_LIBRARY];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function getDailyCarouselImages() {
    const shuffled = getDailyShuffledImages();
    return shuffled.slice(0, Math.min(DAILY_CAROUSEL_IMAGE_COUNT, shuffled.length));
}

function getDailyGalleryImages() {
    const shuffled = getDailyShuffledImages();
    return shuffled.slice(Math.min(DAILY_CAROUSEL_IMAGE_COUNT, shuffled.length));
}

function hashString(value) {
    let hash = 0;

    for (let i = 0; i < value.length; i += 1) {
        hash = ((hash << 5) - hash) + value.charCodeAt(i);
        hash |= 0;
    }

    return hash >>> 0;
}

/**
 * Daily Section Backgrounds
 * Applies per-section daily-random background photos on non-home pages.
 */
function initializeSectionBackgrounds() {
    const sections = Array.from(document.querySelectorAll('[data-daily-bg]'));
    if (!sections.length) return;

    const imagePool = getDailyShuffledImages();
    if (!imagePool.length) return;

    const pageOffset = hashString(window.location.pathname || '') % imagePool.length;

    sections.forEach((section, index) => {
        const imagePath = imagePool[(pageOffset + index) % imagePool.length];
        section.dataset.bgSrc = imagePath;
    });

    const applyBackground = (section) => {
        const source = section.dataset.bgSrc;
        if (!source || section.classList.contains('has-daily-bg')) return;
        section.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.58)), url("${source}")`;
        section.style.backgroundPosition = 'center';
        section.style.backgroundRepeat = 'no-repeat';
        section.style.backgroundSize = 'cover';
        section.classList.add('has-daily-bg');
    };

    if (!('IntersectionObserver' in window)) {
        sections.forEach(applyBackground);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            applyBackground(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '180px 0px'
    });

    sections.forEach(section => observer.observe(section));
}

/**
 * Image Carousel / Slider
 * Auto-rotate through church photos with manual controls
 */
function initializeCarousel() {
    const slidesContainer = document.getElementById('carousel-slides');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!slidesContainer || !dotsContainer) return;

    const imageList = getDailyCarouselImages();
    
    // Build carousel slides dynamically
    imageList.forEach((img, index) => {
        const photoMeta = getPhotoMetadata(img);
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.setAttribute('data-index', index);
        
        // Keep first slide highest priority; remaining daily slides lazy-load.
        const shouldPreload = index === 0;
        slide.innerHTML = `
            <img src="${img}" alt="${photoMeta.caption}" ${shouldPreload ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
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
    
    // Show specific slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
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
    
    // Start auto-play
    startAutoPlay();
}

const PHOTO_EVENT_DETAILS = {
    '2023-12-24': {
        event: 'Church baptism service',
        eventSw: 'Huduma ya ubatizo wa kanisa',
        location: 'Newcastle Ocean Baths, Newcastle NSW'
    },
    '2024-12-22': {
        event: 'Church baptism service',
        eventSw: 'Huduma ya ubatizo wa kanisa',
        location: 'Newcastle Ocean Baths, Newcastle NSW'
    },
    '2025-04-19': {
        event: 'Church baptism service',
        eventSw: 'Huduma ya ubatizo wa kanisa',
        location: 'Newcastle Ocean Baths, Newcastle NSW'
    },
    unknown: {
        event: 'Church service or fellowship',
        eventSw: 'Ibada au ushirika wa kanisa',
        location: 'Shortland Public School, Shortland NSW'
    }
};

const PHOTOS_2024_12_22 = new Set([
    'IMG_4423.JPG'
]);

const PHOTO_METADATA_OVERRIDES = {
    'IMG_4423.JPG': {
        event: 'Sunday Service Youth Day',
        eventSw: 'Ibada ya Jumapili, Siku ya Vijana',
        location: 'Shortland Public School, Shortland NSW'
    },
    'IMG_3742.JPG': {
        event: 'Sunday Service',
        eventSw: 'Ibada ya Jumapili',
        location: 'Shortland Public School, Shortland NSW'
    },
    'image.jpeg': {
        event: 'Sunday Service',
        eventSw: 'Ibada ya Jumapili',
        location: 'Shortland Public School, Shortland NSW'
    },
    'image 2.jpeg': {
        event: 'Sunday Service',
        eventSw: 'Ibada ya Jumapili',
        location: 'Shortland Public School, Shortland NSW'
    }
};

const PHOTOS_2025_04_19 = new Set([
    'IMG_4697.JPG',
    'IMG_4698.JPG',
    'IMG_4701.JPG',
    'IMG_4705.JPG',
    'IMG_4710.JPG',
    'IMG_4720.JPG',
    'IMG_4725.JPG',
    'IMG_4745.JPG',
    'IMG_4748.JPG',
    'IMG_4749.JPG',
    'IMG_4750.JPG',
    'IMG_4751.JPG',
    'IMG_4754.JPG',
    'IMG_4760.JPG',
    'IMG_4763.JPG',
    'IMG_4764.JPG',
    'IMG_4765.JPG'
]);

function getPhotoDateKey(fileName) {
    if (PHOTOS_2024_12_22.has(fileName)) return '2024-12-22';
    if (PHOTOS_2025_04_19.has(fileName)) return '2025-04-19';
    if (/^IMG_[0-9]+\.JPG$/i.test(fileName)) return '2023-12-24';
    return 'unknown';
}

const GALLERY_UI_TEXT = {
    en: {
        loading: 'Loading image...',
        failed: 'Image failed to load.',
        close: 'Close gallery',
        dialogLabel: 'Gallery viewer',
        prev: 'Previous image',
        next: 'Next image',
        openPhoto: 'Open photo',
        photoOf: (index, total) => `Photo ${index} of ${total}.`,
        gridLabel: 'AACU photo gallery',
        noImages: 'No gallery images available today. Please check back tomorrow.'
    },
    sw: {
        loading: 'Inapakia picha...',
        failed: 'Imeshindwa kupakia picha.',
        close: 'Funga picha',
        dialogLabel: 'Kionyeshi cha picha',
        prev: 'Picha iliyotangulia',
        next: 'Picha inayofuata',
        openPhoto: 'Fungua picha',
        photoOf: (index, total) => `Picha ${index} kati ya ${total}.`,
        gridLabel: 'Mkusanyiko wa picha wa AACU',
        noImages: 'Hakuna picha za leo. Tafadhali jaribu tena kesho.'
    }
};

function getGalleryUiText(lang) {
    return GALLERY_UI_TEXT[lang] || GALLERY_UI_TEXT.en;
}

const LANGUAGE_STORAGE_KEY = 'aacu-language';
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = ['en', 'sw'];
const SEARCH_ENGINE_HOST_MARKERS = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'yandex.'];
const SWAHILI_SEARCH_KEYWORDS = [
    'kiswahili',
    'swahili',
    'kanisa',
    'ibada',
    'maombi',
    'jumapili',
    'jumamosi',
    'ubatizo',
    'mungu',
    'yesu',
    'wakristo',
    'newcastle',
    'aacu'
];

function normalizeLanguageCode(value) {
    if (!value) return null;
    const normalized = String(value).trim().toLowerCase().replace('lang_', '').split('-')[0];
    return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : null;
}

function getStoredLanguage() {
    try {
        return normalizeLanguageCode(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    } catch (_error) {
        return null;
    }
}

function setStoredLanguage(lang) {
    const normalized = normalizeLanguageCode(lang);
    if (!normalized) return;
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
    } catch (_error) {
        // Ignore storage failures in restricted/private contexts.
    }
}

function getLanguageFromQueryParam() {
    const params = new URLSearchParams(window.location.search);
    return normalizeLanguageCode(params.get('lang'));
}

function isSearchEngineReferrer(hostname) {
    return SEARCH_ENGINE_HOST_MARKERS.some((marker) => hostname.includes(marker));
}

function getLanguageFromReferrer() {
    if (!document.referrer) return null;

    try {
        const referrerUrl = new URL(document.referrer);
        if (!isSearchEngineReferrer(referrerUrl.hostname.toLowerCase())) return null;

        const params = referrerUrl.searchParams;
        const languageFromParams = normalizeLanguageCode(
            params.get('hl') || params.get('lang') || params.get('lr')
        );
        if (languageFromParams === 'sw') return 'sw';

        const searchQuery = (
            params.get('q') ||
            params.get('query') ||
            params.get('p') ||
            params.get('text') ||
            params.get('wd') ||
            ''
        ).toLowerCase();
        if (!searchQuery) return null;

        const hasSwahiliKeyword = SWAHILI_SEARCH_KEYWORDS.some((keyword) => searchQuery.includes(keyword));
        return hasSwahiliKeyword ? 'sw' : null;
    } catch (_error) {
        return null;
    }
}

function getLanguageFromBrowser() {
    const preferredLanguages = Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    const hasSwahili = preferredLanguages.some((value) => normalizeLanguageCode(value) === 'sw');
    return hasSwahili ? 'sw' : null;
}

function determineInitialLanguage() {
    const languageFromQuery = getLanguageFromQueryParam();
    if (languageFromQuery) {
        setStoredLanguage(languageFromQuery);
        return languageFromQuery;
    }

    const storedLanguage = getStoredLanguage();
    if (storedLanguage) return storedLanguage;

    const languageFromReferrer = getLanguageFromReferrer();
    if (languageFromReferrer) {
        setStoredLanguage(languageFromReferrer);
        return languageFromReferrer;
    }

    const languageFromBrowser = getLanguageFromBrowser();
    if (languageFromBrowser) {
        setStoredLanguage(languageFromBrowser);
        return languageFromBrowser;
    }

    return DEFAULT_LANGUAGE;
}

function getCurrentLanguage() {
    return normalizeLanguageCode(document.documentElement.lang) || getStoredLanguage() || DEFAULT_LANGUAGE;
}

function updateLanguageQueryParam(lang) {
    if (!window.history || typeof window.history.replaceState !== 'function') return;
    const normalized = normalizeLanguageCode(lang) || DEFAULT_LANGUAGE;
    const url = new URL(window.location.href);
    if (normalized === 'sw') {
        url.searchParams.set('lang', 'sw');
    } else {
        url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

function formatPhotoDate(dateKey, lang = 'en') {
    if (dateKey === 'unknown') {
        return lang === 'sw' ? 'Tarehe haijarekodiwa' : 'Date not recorded';
    }

    const [year, month, day] = dateKey.split('-').map((value) => Number(value));
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(lang === 'sw' ? 'sw-KE' : 'en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function getPhotoMetadata(imagePath, lang = 'en') {
    const fileName = imagePath.split('/').pop() || '';
    const dateKey = getPhotoDateKey(fileName);
    const baseDetails = PHOTO_EVENT_DETAILS[dateKey] || PHOTO_EVENT_DETAILS.unknown;
    const overrideDetails = PHOTO_METADATA_OVERRIDES[fileName];
    const details = overrideDetails ? { ...baseDetails, ...overrideDetails } : baseDetails;
    const dateLabel = formatPhotoDate(dateKey, lang);
    const event = lang === 'sw' ? (details.eventSw || details.event) : details.event;

    return {
        dateKey,
        dateLabel,
        event,
        location: details.location,
        caption: `${dateLabel}. ${event}. ${details.location}.`
    };
}

function createGalleryLightbox(galleryItems, lang = 'en') {
    const ui = getGalleryUiText(lang);
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
        <button class="gallery-lightbox-backdrop" type="button" aria-label="${ui.close}"></button>
        <div class="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="${ui.dialogLabel}">
            <button class="gallery-lightbox-close" type="button" aria-label="${ui.close}">&times;</button>
            <div class="gallery-lightbox-stage">
                <button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="${ui.prev}">&#10094;</button>
                <div class="gallery-lightbox-image-wrap">
                    <p class="gallery-lightbox-status" aria-live="polite">${ui.loading}</p>
                    <img class="gallery-lightbox-image" alt="" decoding="async">
                </div>
                <button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="${ui.next}">&#10095;</button>
            </div>
            <p class="gallery-lightbox-caption"></p>
        </div>
    `;
    document.body.appendChild(lightbox);

    const backdrop = lightbox.querySelector('.gallery-lightbox-backdrop');
    const closeBtn = lightbox.querySelector('.gallery-lightbox-close');
    const prevBtn = lightbox.querySelector('.gallery-lightbox-prev');
    const nextBtn = lightbox.querySelector('.gallery-lightbox-next');
    const imageElement = lightbox.querySelector('.gallery-lightbox-image');
    const statusElement = lightbox.querySelector('.gallery-lightbox-status');
    const captionElement = lightbox.querySelector('.gallery-lightbox-caption');
    let currentIndex = 0;
    let pendingRequestId = 0;

    function setImage(index) {
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];
        const imagePath = item.full;
        const photoMeta = item.meta;
        const requestId = pendingRequestId + 1;
        pendingRequestId = requestId;

        imageElement.classList.remove('is-loaded');
        imageElement.removeAttribute('src');
        imageElement.alt = `${photoMeta.event}. ${photoMeta.location}. ${photoMeta.dateLabel}.`;
        statusElement.textContent = ui.loading;
        statusElement.hidden = false;
        captionElement.textContent = `${ui.photoOf(currentIndex + 1, galleryItems.length)} ${photoMeta.caption}`;

        const loader = new Image();
        loader.decoding = 'async';
        loader.addEventListener('load', () => {
            if (requestId !== pendingRequestId) return;
            imageElement.src = imagePath;
            imageElement.classList.add('is-loaded');
            statusElement.hidden = true;
        });
        loader.addEventListener('error', () => {
            if (requestId !== pendingRequestId) return;
            statusElement.textContent = ui.failed;
            imageElement.classList.remove('is-loaded');
            imageElement.removeAttribute('src');
        });
        loader.src = imagePath;
    }

    function openAt(index) {
        setImage(index);
        lightbox.classList.add('open');
        document.body.classList.add('gallery-open');
        closeBtn.focus();
    }

    function close() {
        lightbox.classList.remove('open');
        document.body.classList.remove('gallery-open');
    }

    function next() {
        setImage(currentIndex + 1);
    }

    function prev() {
        setImage(currentIndex - 1);
    }

    backdrop.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    const handleKeyDown = (event) => {
        if (!lightbox.classList.contains('open')) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            close();
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            next();
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            prev();
        }
    };
    document.addEventListener('keydown', handleKeyDown);

    return {
        openAt,
        destroy() {
            document.removeEventListener('keydown', handleKeyDown);
            lightbox.remove();
        }
    };
}

function getGalleryThumbnailPath(imagePath) {
    return imagePath.replace('./images/', './images/thumbs/');
}

/**
 * Daily Gallery
 * Renders low-resolution thumbnails and loads full-resolution images on click.
 */
let activeGalleryLightbox = null;

function initializeGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    const lang = getCurrentLanguage();
    const ui = getGalleryUiText(lang);

    if (activeGalleryLightbox) {
        activeGalleryLightbox.destroy();
        activeGalleryLightbox = null;
    }

    galleryGrid.innerHTML = '';
    galleryGrid.setAttribute('aria-label', ui.gridLabel);

    const galleryImages = getDailyGalleryImages();

    if (!galleryImages.length) {
        galleryGrid.innerHTML = `<p>${ui.noImages}</p>`;
        return;
    }

    const galleryItems = galleryImages.map((imagePath) => ({
        full: imagePath,
        thumb: getGalleryThumbnailPath(imagePath),
        meta: getPhotoMetadata(imagePath, lang)
    }));

    const lightbox = createGalleryLightbox(galleryItems, lang);
    activeGalleryLightbox = lightbox;

    galleryItems.forEach((item, index) => {
        const figure = document.createElement('figure');
        figure.className = 'gallery-item';
        figure.innerHTML = `
            <button class="gallery-trigger" type="button" data-gallery-index="${index}" aria-label="${ui.openPhoto} ${index + 1}. ${item.meta.caption}">
                <img
                    class="gallery-thumb"
                    src="${item.thumb}"
                    alt="${item.meta.caption}"
                    loading="lazy"
                    decoding="async"
                >
            </button>
            <figcaption>${item.meta.caption}</figcaption>
        `;
        galleryGrid.appendChild(figure);
    });

    galleryGrid.querySelectorAll('.gallery-trigger').forEach((buttonElement) => {
        buttonElement.addEventListener('click', () => {
            const index = Number(buttonElement.dataset.galleryIndex || '0');
            lightbox.openAt(index);
        });
    });
}

/**
 * Language Toggle
 * Switch between English and Swahili
 */
const translations = {
    en: {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-services': 'Services',
        'nav-gallery': 'Gallery',
        'nav-contact': 'Contact',
        'footer-quick-links': 'Quick Links',
        'footer-home': 'Home',
        'footer-about': 'About Us',
        'footer-services': 'Services',
        'footer-gallery': 'Gallery',
        'footer-contact': 'Contact',
        'welcome-title': 'Welcome to AACU',
        'welcome-desc': 'Swahili and English worship in Shortland, Newcastle NSW.',
        'join-us-title': 'Service Times',
        'sunday-worship': 'Sunday Worship',
        'swahili-english': 'Swahili with English translation',
        'saturday-prayer': 'Saturday Prayer',
        'community-prayer': 'Prayer and intercession',
        'service-details-btn': 'Service Details',
        'get-in-touch-title': 'Contact AACU',
        'get-in-touch-desc': 'Contact AACU for service details, prayer requests, and visit information.',
        'learn-about-us': 'Learn About Us',
        'contact-us': 'Contact Us',
        'about-us-title': 'About Us',
        'about-us-desc': 'Church history and mission in Newcastle and the Hunter region.',
        'who-we-are-title': 'Who We Are',
        'who-we-are-desc': 'AACU is an African Christian church in Shortland, Newcastle NSW. Services run in Swahili with English translation.',
        'who-we-are-extra': 'AACU meets for worship, prayer, and fellowship each week.',
        'believe-title': 'What We Believe',
        'gods-love': 'God\'s Love',
        'gods-love-desc': 'God loves all people.',
        'christs-salvation': 'Christ\'s Salvation',
        'christs-salvation-desc': 'Jesus Christ is Lord and Savior. He died and rose again.',
        'community-fellowship': 'Community & Fellowship',
        'community-fellowship-desc': 'We meet for prayer, service, and fellowship in a multilingual church community.',
        'join-community': 'Join Our Community',
        'join-community-desc': 'Join AACU for worship, prayer, and fellowship in Newcastle.',
        'services-title': 'Our Services',
        'services-desc': 'Service times and location for AACU in Shortland, Newcastle NSW.',
        'service-times': 'Service Times',
        'sunday-title': 'Sunday Worship',
        'sunday-desc': 'Sunday worship at 10:00 AM. Swahili service with English translation.',
        'saturday-title': 'Saturday Prayer',
        'saturday-desc': 'Saturday prayer at 10:00 AM. Swahili and English.',
        'location-title': 'Location',
        'visit-us': 'Visit Us',
        'contact-form-title': 'Send us a message',
        'contact-form-desc': 'Write to AACU in Swahili or English.',
        'contact-page-title': 'Contact AACU',
        'contact-page-desc': 'Use this page for service details, prayer requests, and visit information.',
        'cta-get-in-touch': 'Get In Touch',
        'gallery-title': 'Gallery',
        'gallery-desc': 'AACU church event photo archive.'
    },
    sw: {
        'nav-home': 'Mwanzo',
        'nav-about': 'Kuhusu',
        'nav-services': 'Huduma',
        'nav-gallery': 'Picha',
        'nav-contact': 'Wasiliana',
        'footer-quick-links': 'Viungo vya Haraka',
        'footer-home': 'Mwanzo',
        'footer-about': 'Kuhusu Sisi',
        'footer-services': 'Huduma',
        'footer-gallery': 'Picha',
        'footer-contact': 'Wasiliana',
        'welcome-title': 'Karibu AACU',
        'welcome-desc': 'Ibada kwa Kiswahili na Kiingereza, Shortland, Newcastle NSW.',
        'join-us-title': 'Ratiba ya Ibada',
        'sunday-worship': 'Ibada ya Jumapili',
        'swahili-english': 'Kiswahili na tafsiri ya Kiingereza',
        'saturday-prayer': 'Sala ya Jumamosi',
        'community-prayer': 'Maombi na maombezi',
        'service-details-btn': 'Maelezo ya Huduma',
        'get-in-touch-title': 'Wasiliana na AACU',
        'get-in-touch-desc': 'Wasiliana na AACU kwa ratiba ya ibada, maombi, na taarifa za kutembelea.',
        'learn-about-us': 'Jifunze Kuhusu Sisi',
        'contact-us': 'Wasiliana',
        'about-us-title': 'Kuhusu Sisi',
        'about-us-desc': 'Historia ya kanisa na huduma yake Newcastle na Hunter.',
        'who-we-are-title': 'Nani Tunavyo Kuwa',
        'who-we-are-desc': 'AACU ni kanisa la Kikristo la Waafrika, Shortland, Newcastle NSW. Ibada ni kwa Kiswahili na tafsiri ya Kiingereza.',
        'who-we-are-extra': 'AACU hukutana kila wiki kwa ibada, maombi, na ushirika.',
        'believe-title': 'Nini Tunavyoamini',
        'gods-love': 'Upendo wa Mungu',
        'gods-love-desc': 'Mungu anawapenda watu wote.',
        'christs-salvation': 'Wokfu wa Kristo',
        'christs-salvation-desc': 'Yesu Kristo ni Bwana na Mwokozi. Alikufa na kufufuka.',
        'community-fellowship': 'Jamii & Ushirikiano',
        'community-fellowship-desc': 'Tunakutana kwa maombi, huduma, na ushirika katika kanisa la lugha mbili.',
        'join-community': 'Jiunze Jamii Yetu',
        'join-community-desc': 'Jiunge na AACU kwa ibada, maombi, na ushirika Newcastle.',
        'services-title': 'Huduma Zetu',
        'services-desc': 'Ratiba ya ibada na eneo la AACU, Shortland, Newcastle NSW.',
        'service-times': 'Muda wa Huduma',
        'sunday-title': 'Ibada ya Jumapili',
        'sunday-desc': 'Ibada ya Jumapili saa 10:00 asubuhi. Kiswahili na tafsiri ya Kiingereza.',
        'saturday-title': 'Sala ya Jumamosi',
        'saturday-desc': 'Maombi ya Jumamosi saa 10:00 asubuhi. Kiswahili na Kiingereza.',
        'location-title': 'Mahali',
        'visit-us': 'Tembelea Sisi',
        'contact-form-title': 'Tumpeleka ujumbe',
        'contact-form-desc': 'Andika kwa AACU kwa Kiswahili au Kiingereza.',
        'contact-page-title': 'Wasiliana na AACU',
        'contact-page-desc': 'Tumia ukurasa huu kwa ratiba ya ibada, maombi, na taarifa za kutembelea.',
        'cta-get-in-touch': 'Wasiliana Nasi',
        'gallery-title': 'Picha',
        'gallery-desc': 'Kumbukumbu ya picha za matukio ya kanisa la AACU.'
    }
};

const SEO_PAGE_CONTENT = {
    'index.html': {
        en: {
            title: 'AACU - African Church Newcastle NSW | Swahili & English Worship Services',
            description: 'AACU church in Shortland, Newcastle NSW. Swahili and English worship at 10:00 AM on Sunday and Saturday.',
            keywords: 'African church Newcastle NSW, Swahili church Australia, African Christian community, Hunter Region church, Shortland worship, multicultural church Newcastle',
            ogTitle: 'AACU - African Church Newcastle NSW',
            ogDescription: 'AACU church in Shortland, Newcastle NSW. Swahili and English worship services.',
            twitterTitle: 'AACU - African Church Newcastle NSW',
            twitterDescription: 'Swahili & English worship services. Welcoming African Christian community in Newcastle.'
        },
        sw: {
            title: 'AACU - Kanisa la Kiafrika Newcastle NSW | Ibada kwa Kiswahili na Kiingereza',
            description: 'AACU ni kanisa la Wakristo wa Afrika, Shortland Newcastle NSW. Ibada kwa Kiswahili na Kiingereza kila Jumapili na Jumamosi saa 10:00.',
            keywords: 'kanisa la kiswahili newcastle, kanisa la kiafrika australia, ibada ya kiswahili nsw, kanisa la newcastle, AACU, wakristo waafrika',
            ogTitle: 'AACU - Kanisa la Kiswahili Newcastle NSW',
            ogDescription: 'AACU ni kanisa la Wakristo wa Afrika Newcastle NSW lenye ibada kwa Kiswahili na Kiingereza.',
            twitterTitle: 'AACU - Kanisa la Kiswahili Newcastle',
            twitterDescription: 'Ibada kwa Kiswahili na Kiingereza Newcastle NSW. Karibu AACU.'
        }
    },
    'about.html': {
        en: {
            title: 'About AACU - African Church Newcastle NSW | Mission & Community Values',
            description: 'About AACU in Shortland, Newcastle NSW. Church mission, beliefs, and community information.',
            keywords: 'African church mission, AACU Newcastle, Swahili Christian community, multicultural church Australia, Christian values Hunter Region',
            ogTitle: 'About AACU - African Church Newcastle NSW',
            ogDescription: 'About AACU mission and church values in Newcastle NSW.',
            twitterTitle: 'About AACU',
            twitterDescription: 'Our mission and Christian values in Newcastle NSW'
        },
        sw: {
            title: 'Kuhusu AACU | Kanisa la Kiswahili Newcastle NSW',
            description: 'Jifunze kuhusu AACU huko Shortland, Newcastle NSW. Historia ya kanisa, imani, na huduma kwa jamii.',
            keywords: 'kuhusu kanisa la kiswahili, AACU newcastle, kanisa la waafrika nsw, imani ya kikristo newcastle',
            ogTitle: 'Kuhusu AACU - Kanisa la Kiswahili Newcastle',
            ogDescription: 'Historia na maadili ya AACU katika Newcastle NSW.',
            twitterTitle: 'Kuhusu AACU',
            twitterDescription: 'Historia na huduma ya AACU katika Newcastle NSW'
        }
    },
    'services.html': {
        en: {
            title: 'Church Services & Worship Times - AACU Newcastle | Swahili & English',
            description: 'AACU service times in Shortland, Newcastle NSW. Sunday worship and Saturday prayer at 10:00 AM with Swahili and English.',
            keywords: 'African church services Newcastle, Sunday worship Australia, Swahili service NSW, prayer meeting Hunter, church Shortland NSW, bilingual worship',
            ogTitle: 'Church Services & Worship Times - AACU Newcastle',
            ogDescription: 'AACU Sunday and Saturday services at 10:00 AM in Shortland, Newcastle NSW.',
            twitterTitle: 'Services & Worship Times - AACU',
            twitterDescription: 'Bilingual worship in Swahili & English, Sundays & Saturdays in Newcastle.'
        },
        sw: {
            title: 'Ratiba ya Ibada AACU | Kanisa la Kiswahili Newcastle NSW',
            description: 'Ratiba ya ibada ya AACU huko Shortland, Newcastle NSW. Ibada ya Jumapili na maombi ya Jumamosi saa 10:00 asubuhi.',
            keywords: 'ratiba ya ibada newcastle, ibada ya jumapili kiswahili, sala ya jumamosi nsw, kanisa la kiswahili shortland',
            ogTitle: 'Ratiba ya Ibada AACU Newcastle',
            ogDescription: 'Ibada ya Jumapili na Jumamosi saa 10:00 asubuhi katika Shortland, Newcastle NSW.',
            twitterTitle: 'Ratiba ya Ibada AACU',
            twitterDescription: 'Ibada kwa Kiswahili na Kiingereza kila wiki Newcastle.'
        }
    },
    'contact.html': {
        en: {
            title: 'Contact AACU - African Church Newcastle NSW | Phone & Location',
            description: 'Contact AACU in Shortland, Newcastle NSW. Phone, email, address, map, and contact form.',
            keywords: 'African church Newcastle contact, AACU phone, Swahili church email, Newcastle church address, Hunter Region church contact',
            ogTitle: 'Contact AACU - African Church Newcastle NSW',
            ogDescription: 'Contact AACU church in Shortland, Newcastle NSW.',
            twitterTitle: 'Contact AACU',
            twitterDescription: 'Contact our African church in Newcastle NSW'
        },
        sw: {
            title: 'Wasiliana na AACU | Kanisa la Kiswahili Newcastle NSW',
            description: 'Wasiliana na AACU huko Shortland, Newcastle NSW. Namba ya simu, barua pepe, anuani, ramani, na fomu ya mawasiliano.',
            keywords: 'mawasiliano ya kanisa newcastle, simu ya AACU, barua pepe kanisa la kiswahili, anuani ya kanisa shortland',
            ogTitle: 'Wasiliana na AACU - Kanisa la Kiswahili Newcastle',
            ogDescription: 'Mawasiliano ya AACU huko Shortland, Newcastle NSW.',
            twitterTitle: 'Wasiliana na AACU',
            twitterDescription: 'Namba, barua pepe na anuani ya AACU Newcastle NSW'
        }
    },
    'gallery.html': {
        en: {
            title: 'Gallery - AACU Event Photos | Newcastle NSW',
            description: 'AACU photo gallery with dated church events from Newcastle NSW.',
            keywords: 'AACU gallery, church photos Newcastle, African church community images, Swahili Christian fellowship',
            ogTitle: 'AACU Gallery - Event Photos',
            ogDescription: 'AACU church event photos with date, event, and location details.',
            twitterTitle: 'AACU Gallery',
            twitterDescription: 'AACU event photos with date, event, and location details.'
        },
        sw: {
            title: 'Picha za Matukio ya AACU | Newcastle NSW',
            description: 'Mkusanyiko wa picha za matukio ya kanisa la AACU katika Newcastle NSW, ukiwa na tarehe, tukio, na mahali.',
            keywords: 'picha za kanisa newcastle, picha za ubatizo, mkusanyiko wa picha AACU, kanisa la kiswahili australia',
            ogTitle: 'Picha za AACU - Matukio ya Kanisa',
            ogDescription: 'Picha za matukio ya kanisa la AACU zenye tarehe, tukio, na mahali.',
            twitterTitle: 'Picha za AACU',
            twitterDescription: 'Picha za matukio ya AACU pamoja na tarehe na mahali.'
        }
    }
};

function getCurrentPageKey() {
    const fileName = window.location.pathname.split('/').pop();
    return fileName || 'index.html';
}

function setMetaContent(selector, content) {
    const element = document.querySelector(selector);
    if (!element || !content) return;
    element.setAttribute('content', content);
}

function applySeoMetadata(lang) {
    const pageKey = getCurrentPageKey();
    const pageMetadata = SEO_PAGE_CONTENT[pageKey] || SEO_PAGE_CONTENT['index.html'];
    const localeMetadata = pageMetadata[lang] || pageMetadata.en;
    if (!localeMetadata) return;

    document.title = localeMetadata.title;
    setMetaContent('meta[name="description"]', localeMetadata.description);
    setMetaContent('meta[name="keywords"]', localeMetadata.keywords);
    setMetaContent('meta[property="og:title"]', localeMetadata.ogTitle);
    setMetaContent('meta[property="og:description"]', localeMetadata.ogDescription);
    setMetaContent('meta[name="twitter:title"]', localeMetadata.twitterTitle);
    setMetaContent('meta[name="twitter:description"]', localeMetadata.twitterDescription);
    setMetaContent('meta[property="og:locale"]', lang === 'sw' ? 'sw_KE' : 'en_AU');
}

function initializeLanguageToggle() {
    const initialLanguage = determineInitialLanguage();
    applyTranslations(initialLanguage);
    updateLanguageButton(initialLanguage);
    initializeGallery();

    const toggle = document.getElementById('language-toggle');
    if (!toggle) return;

    let currentLanguage = initialLanguage;
    toggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'sw' : 'en';
        setStoredLanguage(currentLanguage);
        updateLanguageQueryParam(currentLanguage);
        updateLanguageButton(currentLanguage);
        applyTranslations(currentLanguage);
        initializeGallery();
    });
}

function updateLanguageButton(lang) {
    const toggle = document.getElementById('language-toggle');
    if (toggle) {
        toggle.textContent = lang === 'en' ? 'Swahili' : 'English';
    }
}

function applyTranslations(lang) {
    const normalized = normalizeLanguageCode(lang) || DEFAULT_LANGUAGE;
    const dictionary = translations[normalized] || translations[DEFAULT_LANGUAGE];

    Object.keys(dictionary).forEach((key) => {
        const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
        elements.forEach((element) => {
            element.textContent = dictionary[key];
        });
    });

    document.documentElement.lang = normalized;
    setStoredLanguage(normalized);
    applySeoMetadata(normalized);
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
    // Language preference and SEO metadata
    initializeLanguageToggle();

    // Visual content
    initializeCarousel();
    initializeSectionBackgrounds();
    
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
    setActiveNavLink: setActiveNavLink,
    initializeLanguageToggle: initializeLanguageToggle,
    applyTranslations: applyTranslations
};
