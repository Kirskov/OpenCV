document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.querySelector('.theme-options');
    const themeOptionButtons = document.querySelectorAll('.theme-option');
    
    // Show/hide theme options
    themeToggle.addEventListener('click', function() {
        themeOptions.classList.toggle('show');
    });
    
    // Close theme options when clicking outside
    document.addEventListener('click', function(event) {
        if (!themeToggle.contains(event.target) && !themeOptions.contains(event.target)) {
            themeOptions.classList.remove('show');
        }
    });
    
    // Apply selected theme
    themeOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = this.getAttribute('data-theme');
            document.body.className = `theme-${selectedTheme}`;
            themeOptions.classList.remove('show');
            
            // Save theme preference to localStorage
            localStorage.setItem('portfolio-theme', selectedTheme);
        });
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.body.className = `theme-${savedTheme}`;
    }
}); 