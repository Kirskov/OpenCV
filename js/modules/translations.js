// Translations module
export class Translations {
    constructor() {
        // Wait for translations to be available
        if (typeof window.translations === 'undefined') {
            console.error('Translations not loaded');
            return;
        }
        
        this.translations = window.translations;
        this.languageSelector = document.getElementById('language-selector');
        this.init();
    }

    init() {
        if (!this.languageSelector) return;
        
        // Clear existing options
        this.languageSelector.innerHTML = '';
        
        // Add language options
        if (this.translations) {
            Object.keys(this.translations).forEach(code => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = this.getLanguageName(code);
                this.languageSelector.appendChild(option);
            });

            // Set initial language
            const currentLang = document.documentElement.lang || 'en';
            this.languageSelector.value = currentLang;
            this.updateTranslations(currentLang);

            // Handle language changes
            this.languageSelector.addEventListener('change', () => {
                const selectedLang = this.languageSelector.value;
                document.documentElement.lang = selectedLang;
                this.updateTranslations(selectedLang);
                
                // Announce language change to screen readers
                const langName = this.getLanguageName(selectedLang);
                this.announceToScreenReader(`Language changed to ${langName}`);
            });
        }
    }

    updateTranslations(lang) {
        if (!this.translations || !this.translations[lang]) {
            console.error(`Translations not found for language: ${lang}`);
            return;
        }

        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[lang]?.[key]) {
                element.textContent = this.translations[lang][key];
            }
        });

        // Update tooltips
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            const key = element.getAttribute('data-tooltip');
            if (this.translations[lang]?.[key]) {
                element.setAttribute('data-tooltip-text', this.translations[lang][key]);
            }
        });

        // Dispatch event for other components that might need to know about language changes
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    getLanguageName(code) {
        return this.translations[code]?.language_name || code.toUpperCase();
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'visually-hidden';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
} 