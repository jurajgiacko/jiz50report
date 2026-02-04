/**
 * ENERVIT × JIZERSKÁ 50 PARTNER REPORT
 * Slide-based Presentation with i18n
 */

const CONFIG = {
    PIN: '2026',
    defaultLang: 'cs',
    slideTitles: {
        cs: ['Úvod', 'Executive Summary', 'O Události', 'Brand Aktivace', 'Promo Zóna', 'Paralympijský tým', 'Náš tým', 'Galerie', 'Reach & Impact', 'Hodnota', 'Výhled 2027'],
        en: ['Intro', 'Executive Summary', 'About Event', 'Brand Activations', 'Promo Zone', 'Paralympic Team', 'Our Team', 'Gallery', 'Reach & Impact', 'Value', 'Outlook 2027']
    }
};

let currentSlide = 0;
let totalSlides = 0;
let currentLang = CONFIG.defaultLang;
let elements = {};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    elements = {
        pinScreen: document.getElementById('pin-screen'),
        mainContent: document.getElementById('main-content'),
        pinInput: document.getElementById('pin-input'),
        pinSubmit: document.getElementById('pin-submit'),
        pinError: document.getElementById('pin-error'),
        slidesContainer: document.getElementById('slides-container'),
        navDots: document.getElementById('nav-dots'),
        navCounter: document.getElementById('nav-counter'),
        slideTitle: document.getElementById('slide-title'),
        btnPrev: document.getElementById('btn-prev'),
        btnNext: document.getElementById('btn-next'),
        langCs: document.getElementById('lang-cs'),
        langEn: document.getElementById('lang-en')
    };
    
    initPinAuth();
});

// ========================================
// PIN AUTHENTICATION
// ========================================
function initPinAuth() {
    if (sessionStorage.getItem('enervit_authenticated') === 'true') {
        showMainContent();
        return;
    }
    
    elements.pinSubmit.addEventListener('click', validatePin);
    elements.pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validatePin();
    });
    elements.pinInput.addEventListener('input', () => {
        elements.pinError.textContent = '';
    });
    elements.pinInput.focus();
}

function validatePin() {
    const enteredPin = elements.pinInput.value.trim();
    
    if (enteredPin === CONFIG.PIN) {
        sessionStorage.setItem('enervit_authenticated', 'true');
        showMainContent();
    } else {
        elements.pinError.textContent = currentLang === 'cs' 
            ? 'Nesprávný PIN. Zkuste to znovu.' 
            : 'Incorrect PIN. Please try again.';
        elements.pinInput.value = '';
        elements.pinInput.focus();
        elements.pinInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => elements.pinInput.style.animation = '', 500);
    }
}

function showMainContent() {
    elements.pinScreen.style.opacity = '0';
    elements.pinScreen.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        elements.pinScreen.classList.add('hidden');
        elements.mainContent.classList.remove('hidden');
        elements.mainContent.style.opacity = '0';
        
        requestAnimationFrame(() => {
            elements.mainContent.style.transition = 'opacity 0.4s ease';
            elements.mainContent.style.opacity = '1';
        });
        
        initPresentation();
    }, 400);
}

// ========================================
// PRESENTATION
// ========================================
function initPresentation() {
    const slides = elements.slidesContainer.querySelectorAll('.slide');
    totalSlides = slides.length;
    
    // Create navigation dots
    createNavDots();
    
    // Init navigation
    elements.btnPrev.addEventListener('click', prevSlide);
    elements.btnNext.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Touch/swipe support
    initTouchSupport();
    
    // Language switcher
    initLanguage();
    
    // Fullscreen
    initFullscreen();
    
    // Update UI
    updateSlideUI();
}

function createNavDots() {
    elements.navDots.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        elements.navDots.appendChild(dot);
    }
}

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    updateSlideUI();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlideUI();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlideUI();
    }
}

function updateSlideUI() {
    // Move slides
    elements.slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    const dots = elements.navDots.querySelectorAll('.nav-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Update counter
    elements.navCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    
    // Update title
    elements.slideTitle.textContent = CONFIG.slideTitles[currentLang][currentSlide] || '';
    
    // Update buttons
    elements.btnPrev.disabled = currentSlide === 0;
    elements.btnNext.disabled = currentSlide === totalSlides - 1;
}

function handleKeyboard(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
    } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
    }
}

function initTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    elements.slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    elements.slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }
}

// ========================================
// LANGUAGE
// ========================================
function initLanguage() {
    elements.langCs.addEventListener('click', () => switchLanguage('cs'));
    elements.langEn.addEventListener('click', () => switchLanguage('en'));
    
    const savedLang = localStorage.getItem('enervit_lang');
    if (savedLang) switchLanguage(savedLang);
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('enervit_lang', lang);
    
    elements.langCs.classList.toggle('active', lang === 'cs');
    elements.langEn.classList.toggle('active', lang === 'en');
    
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-cs][data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (text.includes('<')) el.innerHTML = text;
            else el.textContent = text;
        }
    });
    
    // Update slide title
    if (elements.slideTitle) {
        elements.slideTitle.textContent = CONFIG.slideTitles[lang][currentSlide] || '';
    }
    
    // Update PIN placeholder
    if (elements.pinInput) {
        elements.pinInput.placeholder = 'PIN';
    }
    if (elements.pinSubmit) {
        elements.pinSubmit.textContent = lang === 'cs' ? 'Vstoupit' : 'Enter';
    }
}

// ========================================
// FULLSCREEN
// ========================================
function initFullscreen() {
    const btn = document.getElementById('fullscreen-btn');
    if (!btn) return;
    
    btn.addEventListener('click', toggleFullscreen);
    
    document.addEventListener('fullscreenchange', updateFullscreenUI);
    document.addEventListener('webkitfullscreenchange', updateFullscreenUI);
}

function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function updateFullscreenUI() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    document.body.classList.toggle('fullscreen', !!isFullscreen);
}

// ========================================
// PRINT SUPPORT
// ========================================
window.addEventListener('beforeprint', () => {
    elements.pinScreen?.classList.add('hidden');
    elements.mainContent?.classList.remove('hidden');
});
