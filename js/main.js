document.addEventListener('DOMContentLoaded', function() {
    // Update current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation links with security improvements
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Validate target ID to prevent XSS
            if (!/^[a-zA-Z0-9-]+$/.test(targetId.slice(1))) {
                console.error('Invalid target ID:', targetId);
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation items on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile navigation toggle with improved security
    if (window.innerWidth <= 768) {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const mainNav = document.querySelector('.main-nav ul');
        
        if (mobileNavToggle && mainNav) {
            mobileNavToggle.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.toggle('active');
                mainNav.classList.toggle('show');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileNavToggle.contains(e.target) && !mainNav.contains(e.target)) {
                    mobileNavToggle.classList.remove('active');
                    mainNav.classList.remove('show');
                }
            });
            
            // Close mobile menu when clicking a link
            mainNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mobileNavToggle.classList.remove('active');
                    mainNav.classList.remove('show');
                });
            });
        }
    }
    
    // Handle external resource loading errors
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
            console.error('Failed to load stylesheet:', e.target.href);
            // You could add a fallback stylesheet here
        }
    }, true);
    
    // Handle Font Awesome loading errors
    const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
    if (fontAwesomeLink) {
        fontAwesomeLink.addEventListener('error', function() {
            console.error('Failed to load Font Awesome');
            // You could add a fallback icon system here
        });
    }
}); 