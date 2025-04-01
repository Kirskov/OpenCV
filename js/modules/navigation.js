// Navigation module
export class Navigation {
    constructor() {
        this.backToTopButton = document.querySelector('.back-to-top');
        this.setupBackToTop();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    setupBackToTop() {
        // Show button when scrolling down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.backToTopButton.classList.add('visible');
            } else {
                this.backToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        this.backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupMobileMenu() {
        let resizeTimer;
        const initMobileMenu = () => {
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
                    menuToggle.addEventListener('click', () => {
                        navContent.classList.toggle('active');
                        overlay.classList.toggle('active');
                        menuToggle.innerHTML = navContent.classList.contains('active') ? 
                            '<i class="fas fa-times"></i>' : 
                            '<i class="fas fa-bars"></i>';
                    });

                    // Close menu when clicking overlay
                    overlay.addEventListener('click', () => {
                        navContent.classList.remove('active');
                        overlay.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    });

                    this.setupMobileMenuLinks(navContent, overlay, menuToggle);
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
        };

        // Initialize mobile menu
        initMobileMenu();

        // Update mobile menu on resize
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initMobileMenu, 250);
        });
    }

    setupMobileMenuLinks(navContent, overlay, menuToggle) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                // First close the menu
                navContent.classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Then scroll to the section after a small delay
                setTimeout(() => {
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
                }, 300);
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
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
    }
} 