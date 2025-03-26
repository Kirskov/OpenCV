# Student Portfolio

A modern, responsive, and accessible portfolio website built with HTML, CSS, and JavaScript.

🔗 [Live Demo](https://open-cv-nine.vercel.app/)

## Features

- 🌐 Multi-language support (English and French)
- 🎨 Multiple theme options with a theme toggle
- 📱 Fully responsive design
- ♿ Accessibility features (ARIA labels, keyboard navigation, screen reader support)
- 🔄 Dynamic content loading
- 🌙 Dark/Light mode toggle
- 🔍 SEO-friendly
- 📊 Sections for:
  - About Me
  - Education
  - Skills
  - Projects
  - Experience
  - Interests
  - Contact

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Customize the content by modifying:
   - `js/config.js` for your personal information
   - `js/translations.js` for language translations
   - `css/styles.css` for styling customization
   - `css/themes.css` for theme customization

## Detailed Configuration Guide

### Configuration Structure

The configuration in `config.js` follows this structure:

```javascript
{
    "languageSettings": {
        "primary": "en",          // Your primary language code
        "translations": ["fr"]    // Additional language codes for translations
    },
    "themeSettings": {
        "default": "default",     // Default theme to use
        "available": ["default", "dark", "light", "ocean", "forest"]
    },
    "showProfilePic": true,      // Whether to show the profile picture
    "profilePic": "images/profile-placeholder.jpg",  // Profile picture path
    "content": {
        "en": {  // Primary language content
            "personal": {
                "name": "Your Name",
                "title": "Your Title",
                "about": "About text",
                "email": "email@example.com",
                "phone": "Phone number",
                "location": "Location",
                "additionalInfo": "Additional information"
            },
            "social": {
                "linkedin": "LinkedIn URL",
                "github": "GitHub URL",
                "twitter": "Twitter URL",
                "email": "mailto:your@email.com"
            },
            "education": [
                {
                    "period": "YYYY-YYYY",
                    "degree": "Degree name",
                    "institution": "Institution name",
                    "mention": "Honors/Mention",
                    "details": ["Detail 1", "Detail 2"]
                }
            ],
            "skills": {
                "Category 1": ["Skill 1", "Skill 2"],
                "Category 2": ["Skill 3", "Skill 4"]
            },
            "projects": [
                {
                    "title": "Project name",
                    "description": "Project description",
                    "image": "path/to/project-image.jpg",
                    "demoLink": "Demo URL",
                    "sourceLink": "Source code URL"
                }
            ],
            "experience": [
                {
                    "period": "MM/YYYY",
                    "title": "Position title",
                    "company": "Company name",
                    "details": ["Responsibility 1", "Achievement 2"]
                }
            ],
            "interests": [
                {
                    "title": "Category title",
                    "items": ["Interest 1", "Interest 2", "Interest 3"]
                }
            ]
        },
        "fr": {  // Translation content (same structure as primary language)
            // ... French content with the same structure
        }
    }
}
```

### Adding Languages

To add a new language:
1. Add the language code to `translations` array in `languageSettings`
2. Create a new language object in the `content` object using the language code
3. Fill in all the content following the same structure as the English content

Example for adding Spanish:
```javascript
{
    "languageSettings": {
        "primary": "en",
        "translations": ["fr", "es"]  // Added Spanish
    },
    "content": {
        "en": { ... },
        "fr": { ... },
        "es": {  // Spanish content
            "personal": {
                "name": "Su Nombre",
                "title": "Su Título",
                // ... rest of the Spanish content
            }
        }
    }
}
```

### Profile Picture Configuration

You can configure the profile picture in two ways:

1. **Visibility Control**:
```javascript
{
    "showProfilePic": false,  // Set to false to hide the profile picture
    "profilePic": "images/your-profile-pic.jpg"
}
```

2. **Image Path**:
```javascript
{
    "showProfilePic": true,
    "profilePic": "images/your-profile-pic.jpg"  // Update with your image path
}
```

## Customization

### Adding Your Information

Edit the configuration in `js/config.js`:
- Personal information
- Education history
- Skills
- Projects
- Work experience
- Interests

### Language Support

The portfolio supports multiple languages. Currently implemented:
- English (en)
- French (fr)

To modify translations, edit `js/translations.js`.

### Themes

Available themes:
- Default
- Dark
- Light
- Ocean
- Forest
- Sunset
- Nordic
- Cyberpunk
- Pastel
- Monochrome

## File Structure

```
portfolio/
├── css/
│   ├── styles.css
│   └── themes.css
├── js/
│   ├── config.js
│   ├── main.js
│   ├── themes.js
│   └── translations.js
├── images/
├── index.html
└── README.md
```

## Accessibility Features

The portfolio is built with accessibility as a priority, implementing WCAG 2.1 guidelines to ensure the website is usable by everyone.

### Screen Reader Support
- Semantic HTML structure for better content navigation
- ARIA labels and roles for interactive elements
- Descriptive alt text for images
- Meaningful heading hierarchy (h1-h6)
- Language declaration for proper pronunciation
- Hidden descriptive text for icons and visual elements

### Keyboard Navigation
- Logical tab order through elements
- Visible focus indicators on all interactive elements
- Skip to main content link for quick navigation
- Keyboard-accessible dropdown menus
- Keyboard shortcuts for common actions:
  - `Alt + L`: Change language
  - `Alt + T`: Toggle theme
  - `Esc`: Close modals or dropdowns

### Visual Accessibility
- High contrast mode support
- Configurable color themes
- Minimum contrast ratio of 4.5:1 for text
- Text zoom support up to 200%
- No content overlap when zooming
- Consistent spacing and layout

### Motion and Animation
- Reduced motion support via `prefers-reduced-motion`
- Optional animations that don't interfere with reading
- No autoplay content
- Pausable carousels and slideshows

### Form and Input Accessibility
- Clear input labels and instructions
- Error messages that are easy to understand
- Form validation feedback
- Large clickable areas for buttons
- Input fields with sufficient spacing

### Technical Implementation

#### ARIA Labels and Roles
```html
<!-- Example of ARIA implementation -->
<button 
  aria-label="Toggle theme" 
  role="switch" 
  aria-checked="false"
>
  <span class="visually-hidden">Switch to dark theme</span>
  <i class="icon-theme"></i>
</button>
```

#### Skip Link Implementation
```html
<a 
  href="#main-content" 
  class="skip-link"
  aria-label="Skip to main content"
>
  Skip to main content
</a>
```

#### Focus Management
```css
/* Visible focus indicators */
:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* Focus visible only for keyboard users */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}
```

#### High Contrast Support
```css
@media (forced-colors: active) {
  /* High contrast mode adjustments */
  .button {
    border: 2px solid ButtonText;
    background: ButtonFace;
    color: ButtonText;
  }
}
```

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### Testing and Validation
- Regular testing with screen readers (NVDA, VoiceOver, JAWS)
- Keyboard navigation testing
- Color contrast validation
- HTML validation for proper semantics
- Automated accessibility testing tools integration
- Manual testing with users who rely on assistive technologies

### Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!