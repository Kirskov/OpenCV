# Portfolio Template

A modern, responsive portfolio template with multi-language support, theme customization, and security features.

## Features

- 🌐 Multi-language support (configurable through JSON)
- 🎨 Multiple theme options (Default, Dark, Light, Blue, Green)
- 📱 Fully responsive design
- 🖼️ Sections for About, Education, Skills, Projects, Experience, and Contact
- 🔄 Easy configuration through a single file
- 🎯 Language-independent profile picture
- 🔒 Security features (XSS protection, CSP headers, input validation)
- 🖼️ Automatic fallback for missing project images
- 💾 Local storage for configuration persistence
- 🐳 Docker support for easy deployment
- 🔒 Automated security scanning

## Quick Start with Docker

### Using Docker Compose (Recommended)

1. Clone this repository
2. Navigate to the docker directory:
   ```bash
   cd docker
   ```
3. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```
4. Access your portfolio at http://localhost

### Using Docker Directly

1. Build the Docker image:
   ```bash
   cd docker
   docker build -t portfolio -f Dockerfile ..
   ```
2. Run the container:
   ```bash
   docker run -d -p 80:80 --name portfolio portfolio
   ```
3. Access your portfolio at http://localhost

## Manual Setup

1. Clone this repository
2. Navigate to `js/config.js`
3. Modify the `defaultConfig` object to customize your portfolio

## Security Features

### Automated Security Scanning

This project includes security scanning tools:

1. **Trivy Scanner**: Comprehensive vulnerability scanner for containers
2. **Pre-commit Hooks**: Local security checks before committing code

### Setting Up Security Scanning

1. **GitHub Actions** (Automated)
   - Security scans run automatically on:
     - Push to main/docker branches
     - Pull requests to main
     - Weekly schedule
   - View results in the "Actions" tab of your repository

2. **Local Development** (Pre-commit hooks)
   ```bash
   # Install pre-commit
   pip install pre-commit

   # Install the pre-commit hooks
   pre-commit install

   # Run all checks manually
   pre-commit run --all-files
   ```

3. **Manual Docker Scanning**
   ```bash
   # Build the image
   docker build -t portfolio -f docker/Dockerfile .

   # Using Trivy
   trivy image portfolio
   ```

### Security Best Practices

1. Keep the base Nginx image updated
2. Regularly run security scans
3. Review and update dependencies
4. Monitor GitHub Security alerts
5. Use environment variables for sensitive data

## Configuration Guide

### Basic Setup

1. Clone this repository
2. Navigate to `js/config.js`
3. Modify the `defaultConfig` object to customize your portfolio

### Configuration Structure

The configuration is structured as follows:

```javascript
{
    "languageSettings": {
        "primary": "en",          // Your primary language code
        "translations": ["fr"]    // Additional language codes for translations
    },
    "profilePic": "images/profile-placeholder.jpg",  // Language-independent profile picture
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
            "contact": {
                "email": "Contact email",
                "phone": "Contact phone",
                "location": "Contact location"
            },
            "education": [
                {
                    "period": "YYYY-YYYY",
                    "degree": "Degree name",
                    "institution": "Institution name",
                    "mention": "Honors/Mention",
                    "details": [
                        "Detail 1",
                        "Detail 2"
                    ]
                }
            ],
            "skills": {
                "Category 1": [
                    "Skill 1",
                    "Skill 2"
                ],
                "Category 2": [
                    "Skill 3",
                    "Skill 4"
                ]
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
                    "details": [
                        "Responsibility 1",
                        "Achievement 2"
                    ]
                }
            ]
        },
        "fr": {  // Translation content (same structure as primary language)
            // ... French content
        }
    }
}
```

### Adding Languages

1. Add the language code to `translations` array in `languageSettings`
2. Create a new language object in the `content` object using the language code
3. Fill in all the content in the new language

Example:
```javascript
{
    "languageSettings": {
        "primary": "en",
        "translations": ["fr", "es"]  // Added Spanish
    },
    "profilePic": "images/your-profile-pic.jpg",  // Language-independent
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

### Profile Picture

1. Add your profile picture to the `images` directory
2. Update the `profilePic` path in the top-level configuration (language-independent):
```javascript
{
    "profilePic": "images/your-profile-pic.jpg",
    // ... rest of the configuration
}
```

### Project Images

1. Add project images to the `images` directory
2. Reference them in your project configurations:
```javascript
"projects": [
    {
        "image": "images/project1.jpg",
        // ... other project details
    }
]
```
If no image is specified or the image fails to load, the template will automatically use `project-placeholder.jpg` as a fallback.

### Theme Settings

The portfolio includes 10 pre-built themes:
- Pink/Purple (Default)
- Modern Dark
- Light Minimalist
- Ocean
- Forest
- Sunset
- Nordic
- Cyberpunk
- Pastel
- Monochrome

Users can:
1. Switch themes using the paint brush icon (🎨) in the bottom-right corner
2. Set their preferred default theme in the configuration
3. The selected theme will persist across page reloads

To set a default theme:
1. Open the configuration panel
2. Select your preferred theme
3. The theme will be saved as your default and automatically applied on page load

## Language Support

The template supports any language code following the ISO 639-1 standard. Some examples:
- `en` (English)
- `fr` (French)
- `es` (Spanish)
- `de` (German)
- `it` (Italian)
- `zh` (Chinese)
- `ja` (Japanese)

## File Structure

```
portfolio/
├── css/
│   ├── styles.css      # Main styles
│   └── themes.css      # Theme definitions
├── docker/            # Docker configuration
│   ├── Dockerfile     # Docker build file
│   ├── nginx.conf     # Nginx configuration
│   ├── .dockerignore  # Docker ignore file
│   └── docker-compose.yml  # Docker Compose config
├── js/
│   ├── config.js       # Portfolio configuration
│   ├── translations.js # UI translations
│   ├── themes.js       # Theme handling
│   └── main.js         # Main JavaScript
├── images/            # Image assets
└── index.html         # Main HTML file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Considerations

- All user input is sanitized to prevent XSS attacks
- Content Security Policy (CSP) headers are implemented
- External resources are loaded with integrity checks
- Configuration data is validated before use
- Local storage data is cleared on page load to prevent stale data

## License

This project is licensed under the MIT License - see the LICENSE file for details. 