import { Navigation } from './modules/navigation.js';
import { ServiceWorker } from './modules/service-worker.js';
import { Utils } from './modules/utils.js';
import { Translations } from './modules/translations.js';
import { Themes } from './modules/themes.js';

// Initialize service worker
ServiceWorker.register();

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    // Initialize utilities
    const utils = new Utils();
    utils.updateCurrentYear();

    // Initialize navigation
    const navigation = new Navigation();

    // Initialize translations
    const translations = new Translations();

    // Initialize themes
    const themes = new Themes();

    // Smooth scrolling with keyboard support
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!/^[a-zA-Z0-9-]+$/.test(targetId.slice(1))) {
                console.error('Invalid target ID:', targetId);
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update focus for keyboard users
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.removeAttribute('tabindex');
            }
        });
    });

    // Handle external resource loading errors
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
            console.error('Failed to load stylesheet:', e.target.href);
        }
    }, true);

    // Handle Font Awesome loading errors
    const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
    if (fontAwesomeLink) {
        fontAwesomeLink.addEventListener('error', function() {
            console.error('Failed to load Font Awesome');
        });
    }

    // Add menu toggle button to the DOM only on mobile
    function initMobileMenu() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.main-nav');
            let overlay;
            
            if (!document.querySelector('.menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-label', 'Toggle menu');
                nav.prepend(menuToggle);

                // Create overlay if it doesn't exist
                if (!document.querySelector('.menu-overlay')) {
                    overlay = document.createElement('div');
                    overlay.className = 'menu-overlay';
                    document.body.appendChild(overlay);
                } else {
                    overlay = document.querySelector('.menu-overlay');
                }

                // Menu toggle functionality
                const navContent = document.querySelector('.nav-content');
                menuToggle.addEventListener('click', function() {
                    navContent.classList.toggle('active');
                    overlay.classList.toggle('active');
                    menuToggle.innerHTML = navContent.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : 
                        '<i class="fas fa-bars"></i>';
                });

                // Close menu when clicking overlay
                overlay.addEventListener('click', function() {
                    navContent.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            }
        } else {
            // Remove mobile menu elements if screen is larger than mobile
            const menuToggle = document.querySelector('.menu-toggle');
            const overlay = document.querySelector('.menu-overlay');
            if (menuToggle) menuToggle.remove();
            if (overlay) overlay.remove();
            
            // Reset any mobile menu states
            const navContent = document.querySelector('.nav-content');
            if (navContent) {
                navContent.classList.remove('active');
                navContent.style.left = '';
            }
        }
    }

    // Initialize mobile menu
    initMobileMenu();

    // Update mobile menu on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initMobileMenu, 250);
    });

    // Back to top functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Announce changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

function updateTranslations(lang) {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang]?.[key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update tooltips for elements with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        const key = element.getAttribute('data-tooltip');
        if (translations[lang]?.[key]) {
            element.setAttribute('data-tooltip-text', translations[lang][key]);
        }
    });
} 