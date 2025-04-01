# OpenCV

A modern, responsive, and accessible portfolio website built with HTML, CSS, and JavaScript.

🔗 [Live Demo](https://open-cv-nine.vercel.app/)

## Features

- 🌐 Dynamic multi-language support with user-configurable languages
- 🎨 Multiple theme options with an intuitive theme picker
- 📱 Fully responsive design with improved mobile navigation
- ♿ Comprehensive accessibility features
- 🔄 Dynamic content loading
- 🌙 Theme system with 10 beautiful themes
- 🔍 SEO-friendly
- 📊 Sections for:
  - About Me
  - Education
  - Skills
  - Projects
  - Experience
  - Interests
  - Contact

## Mobile Features

- 📱 Sliding menu for better mobile navigation
- 🔄 Smooth transitions and animations
- 👆 Touch-friendly interface
- 🎯 Easy-to-tap buttons and links
- 📐 Optimized spacing for mobile screens
- 🎨 Theme picker optimized for mobile

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Customize the content by modifying:
   - `js/config.js` for your personal information
   - `js/translations.js` for language translations
   - `css/styles.css` for styling customization
   - `css/themes.css` for theme customization

## Language Support

The portfolio supports dynamic language configuration:

1. Languages are configured through the configuration panel
2. Users can add new languages and translations
3. All UI elements support translation
4. Language settings persist across sessions
5. Easy addition of new languages without code changes

### Adding a New Language

1. Open the configuration panel
2. Navigate to Language Settings
3. Add your new language
4. Provide translations for all content
5. Save your changes

The system will automatically:
- Add the language to the language picker
- Create necessary translation entries
- Update the UI to support the new language

## Themes

Available themes:
- Default (Pink/Purple)
- Modern Dark
- Light Minimalist
- Ocean
- Forest
- Sunset
- Nordic
- Cyberpunk
- Pastel
- Monochrome

Each theme includes:
- Consistent color scheme
- Dark/light variants
- Mobile-optimized styles
- Accessible contrast ratios
- Smooth transitions

## Mobile Navigation

The mobile navigation system features:
- Hamburger menu for space efficiency
- Sliding drawer navigation
- Touch-friendly tap targets
- Smooth animations
- Overlay background
- Easy section access
- Proper spacing and contrast

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

To modify translations, edit `