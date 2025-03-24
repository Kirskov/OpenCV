# Portfolio Template

A modern, responsive portfolio template with multi-language support, theme customization, and security features.

## Features

- 🌐 Multi-language support (configurable through JSON)
- 🎨 Multiple theme options (Default, Dark, Light, Blue, Green)
- 📱 Fully responsive design
- 🖼️ Sections for About, Education, Skills, Projects, Experience, Interests, and Contact
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
    "themeSettings": {
        "default": "default",     // Default theme to use
        "available": ["default", "dark", "light", "ocean", "forest"]
    },
    "showProfilePic": true,      // Whether to show the profile picture (true/false)
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
            ],
            "interests": [
                {
                    "title": "Category title",
                    "items": [
                        "Interest 1",
                        "Interest 2",
                        "Interest 3"
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

The profile picture can be configured in two ways:

1. **Visibility Control**:
   - Use `showProfilePic` in the configuration to show/hide the profile picture:
   ```javascript
   {
       "showProfilePic": false,  // Set to false to hide the profile picture
       "profilePic": "images/your-profile-pic.jpg"
   }
   ```

2. **Image Path**:
   - Add your profile picture to the `images` directory
   - Update the `profilePic` path in the configuration:
   ```javascript
   {
       "showProfilePic": true,   // Make sure this is true to show the picture
       "profilePic": "images/your-profile-pic.jpg"
   }
   ```

### Project Images

1. Add project images to the `images` directory