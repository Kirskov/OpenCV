// Utility functions module
export class Utils {
    static announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'visually-hidden';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    static handleExternalResourceError() {
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
                console.error('Failed to load stylesheet:', e.target.href);
            }
        }, true);

        const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
        if (fontAwesomeLink) {
            fontAwesomeLink.addEventListener('error', () => {
                console.error('Failed to load Font Awesome');
            });
        }
    }
} 