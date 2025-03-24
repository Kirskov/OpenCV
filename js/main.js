document.addEventListener('DOMContentLoaded', function() {
    // Update current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Language selector handling
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        // Clear any existing options
        languageSelector.innerHTML = '';
        
        // Populate language selector with all available languages from translations
        Object.entries(translations).forEach(([code]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = getLanguageName(code);
            languageSelector.appendChild(option);
        });

        // Set initial language
        const currentLang = document.documentElement.lang || 'en';
        languageSelector.value = currentLang;
        updateTranslations(currentLang);

        // Handle language changes
        languageSelector.addEventListener('change', function() {
            const selectedLang = this.value;
            document.documentElement.lang = selectedLang;
            updateTranslations(selectedLang);
            
            // Announce language change to screen readers
            const langName = getLanguageName(selectedLang);
            announceToScreenReader(`Language changed to ${langName}`);
        });
    }

    // Handle navigation active states
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                
                // Update ARIA current state
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${sectionId}`;
                    link.setAttribute('aria-current', isActive ? 'true' : 'false');
                    link.classList.toggle('active', isActive);
                });
            }
        });
    }

    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check

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

    // Theme toggle handling
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !isPressed);
            announceToScreenReader(`Theme changed to ${isPressed ? 'light' : 'dark'} mode`);
        });
    }

    // Handle dynamic content loading
    function handleDynamicContent() {
        // Education items
        const educationList = document.getElementById('education-list');
        if (educationList) {
            educationList.setAttribute('role', 'list');
            educationList.querySelectorAll('.education-item').forEach(item => {
                item.setAttribute('role', 'listitem');
            });
        }

        // Skills items
        const skillsList = document.getElementById('skills-list');
        if (skillsList) {
            skillsList.setAttribute('role', 'list');
            skillsList.querySelectorAll('.skill-category').forEach(category => {
                category.setAttribute('role', 'listitem');
            });
        }

        // Projects items
        const projectsList = document.getElementById('projects-list');
        if (projectsList) {
            projectsList.setAttribute('role', 'list');
            projectsList.querySelectorAll('.project-card').forEach(project => {
                project.setAttribute('role', 'listitem');
            });
        }

        // Experience items
        const experienceList = document.getElementById('experience-list');
        if (experienceList) {
            experienceList.setAttribute('role', 'list');
            experienceList.querySelectorAll('.experience-item').forEach(item => {
                item.setAttribute('role', 'listitem');
            });
        }

        // Interests items
        const interestsList = document.getElementById('interests-list');
        if (interestsList) {
            interestsList.setAttribute('role', 'list');
            interestsList.querySelectorAll('.interest-category').forEach(category => {
                category.setAttribute('role', 'listitem');
            });
        }

        // Contact items
        const contactList = document.getElementById('contact-info');
        if (contactList) {
            contactList.setAttribute('role', 'list');
            contactList.querySelectorAll('.contact-item').forEach(item => {
                item.setAttribute('role', 'listitem');
            });
        }
    }

    // Handle dynamic content loading
    handleDynamicContent();

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
});

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
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update tooltips for elements with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        const key = element.getAttribute('data-tooltip');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('data-tooltip-text', translations[lang][key]);
        }
    });
} 