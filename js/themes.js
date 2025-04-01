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
    themeMenu.style.position = 'fixed';
    themeMenu.style.bottom = '140px';
    themeMenu.style.right = '20px';
    themeMenu.style.backgroundColor = 'var(--card-bg)';
    themeMenu.style.border = '1px solid var(--border-color)';
    themeMenu.style.borderRadius = '8px';
    themeMenu.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    themeMenu.style.padding = '8px';
    themeMenu.style.maxHeight = '300px';
    themeMenu.style.overflowY = 'auto';
    themeMenu.style.zIndex = '1000';
    themeMenu.style.width = '200px';

    // Create theme options
    themes.forEach(theme => {
        const themeOption = document.createElement('div');
        themeOption.className = 'theme-option';
        themeOption.style.padding = '10px 15px';
        themeOption.style.cursor = 'pointer';
        themeOption.style.borderRadius = '4px';
        themeOption.style.display = 'flex';
        themeOption.style.alignItems = 'center';
        themeOption.style.gap = '10px';
        themeOption.style.color = 'var(--text-color)';
        themeOption.style.transition = 'all 0.2s ease';

        const themeIcon = document.createElement('span');
        themeIcon.style.fontSize = '1.2em';
        themeIcon.textContent = theme.icon;

        const themeName = document.createElement('span');
        themeName.textContent = theme.name;

        themeOption.appendChild(themeIcon);
        themeOption.appendChild(themeName);

        themeOption.addEventListener('mouseover', () => {
            themeOption.style.backgroundColor = 'var(--section-bg)';
            themeOption.style.transform = 'translateX(5px)';
        });

        themeOption.addEventListener('mouseout', () => {
            themeOption.style.backgroundColor = '';
            themeOption.style.transform = '';
        });

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
    document.addEventListener('click', (e) => {
        if (!themeMenu.contains(e.target) && e.target !== themeToggle) {
            themeMenu.style.display = 'none';
        }
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