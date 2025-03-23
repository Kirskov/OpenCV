const themes = [
    { id: 'default', name: 'Pink/Purple', icon: '🎨' },
    { id: 'dark', name: 'Modern Dark', icon: '🌙' },
    { id: 'light', name: 'Light Minimalist', icon: '☀️' },
    { id: 'ocean', name: 'Ocean', icon: '🌊' },
    { id: 'forest', name: 'Forest', icon: '🌲' },
    { id: 'sunset', name: 'Sunset', icon: '🌅' },
    { id: 'nordic', name: 'Nordic', icon: '❄️' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🤖' },
    { id: 'pastel', name: 'Pastel', icon: '🎀' },
    { id: 'monochrome', name: 'Monochrome', icon: '⚫' }
];

// Initialize theme selector
function initThemeSelector() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeMenu = document.createElement('div');
    themeMenu.className = 'theme-menu';
    themeMenu.style.display = 'none';

    // Create theme options
    themes.forEach(theme => {
        const themeOption = document.createElement('div');
        themeOption.className = 'theme-option';
        themeOption.innerHTML = `${theme.icon} ${theme.name}`;
        themeOption.addEventListener('click', () => {
            setTheme(theme.id);
            themeMenu.style.display = 'none';
            localStorage.setItem('selectedTheme', theme.id);
            
            // Update the default theme in the configuration
            const config = JSON.parse(localStorage.getItem('portfolio-config') || '{}');
            if (config.themeSettings) {
                config.themeSettings.default = theme.id;
                localStorage.setItem('portfolio-config', JSON.stringify(config));
            }
        });
        themeMenu.appendChild(themeOption);
    });

    // Add theme menu to the page
    document.body.appendChild(themeMenu);

    // Toggle theme menu
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.style.display = themeMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Close theme menu when clicking outside
    document.addEventListener('click', () => {
        themeMenu.style.display = 'none';
    });

    // Load saved theme or default theme from config
    const savedTheme = localStorage.getItem('selectedTheme');
    const config = JSON.parse(localStorage.getItem('portfolio-config') || '{}');
    const defaultTheme = config.themeSettings?.default || 'default';
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(defaultTheme);
    }
}

// Set theme
function setTheme(themeId) {
    document.documentElement.setAttribute('data-theme', themeId);
    
    // Update theme toggle icon
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
        document.getElementById('theme-toggle').textContent = theme.icon;
    }

    // Add smooth transition
    document.documentElement.style.transition = 'all 0.3s ease';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initThemeSelector);

// Export for use in other files
window.setTheme = setTheme;
window.initThemeSelector = initThemeSelector; 