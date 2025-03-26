document.addEventListener('DOMContentLoaded', function() {
    // Clear any existing localStorage data
    localStorage.removeItem('portfolio-config');
    localStorage.removeItem('portfolio-language');
    localStorage.removeItem('portfolio-theme');

    const languageSelector = document.getElementById('language-selector');
    
    // Default configuration template
    const defaultConfig = {
        languageSettings: {
            primary: 'en',  // Primary language of the CV
            translations: ['fr']  // Additional languages available
        },
        themeSettings: {
            default: 'default',  // Default theme to use
            available: ['default', 'dark', 'light', 'ocean', 'forest', 'sunset', 'nordic', 'cyberpunk', 'pastel', 'monochrome']
        },
        showProfilePic: true,  // Whether to show the profile picture
        profilePic: "images/profile-placeholder.jpg",  // Profile picture path
        content: {
            en: {
                personal: {
                    name: "Your Name",
                    title: "Your Professional Title",
                    about: "👋 Welcome to my portfolio! Here you'll find information about my professional journey, skills, and projects. Feel free to explore the different sections using the navigation menu above. You can also switch languages using the dropdown in the top-right corner, and change the site's theme using the paint brush icon at the bottom-right. Don't hesitate to contact me through any of the social links above!",
                    email: "your.email@example.com",
                    phone: "Your Phone Number",
                    location: "Your Location",
                    additionalInfo: "Any additional information (e.g., Driver's License)"
                },
                social: {
                    linkedin: '#',
                    github: '#',
                    twitter: '#',
                    email: 'mailto:your.email@example.com'
                },
                contact: {
                    email: 'your.email@example.com',
                    phone: 'Your Phone Number',
                    location: 'Your Location'
                },
               education: [
                    {
                        period: "YYYY-YYYY",
                        degree: "Degree Name",
                        institution: "Institution Name",
                        mention: "Honors/Mention (if any)",
                        details: [
                            "Key achievement or subject 1",
                            "Key achievement or subject 2"
                        ]
                    }
                ],
                skills: {
                    "Category 1": [
                        "Skill 1",
                        "Skill 2"
                    ],
                    "Category 2": [
                        "Skill 1",
                        "Skill 2"
                    ]
                },
                projects: [
                    {
                        title: "Project Title",
                        description: "Project Description",
                        image: "images/project-image.jpg",
                        demoLink: "#",
                        sourceLink: "#"
                    }
                ],
                experience: [
                    {
                        period: "MM/YYYY",
                        title: "Job Title",
                        company: "Company Name",
                        details: [
                            "Key responsibility or achievement 1",
                            "Key responsibility or achievement 2"
                        ]
                    }
                ],
                interests: [
                    {
                        title: "Sports",
                        items: ["Basketball", "Football", "Swimming"]
                    },
                    {
                        title: "Travel",
                        items: ["Italy", "Spain", "France", "USA", "Japan"]
                    },
                    {
                        title: "Hobbies",
                        items: ["Reading", "Photography", "Cooking", "Music"]
                    }
                ]
            },
            fr: {
                personal: {
                    name: "Votre Nom",
                    title: "Votre Titre Professionnel",
                    about: "👋 Bienvenue sur mon portfolio ! Vous y trouverez des informations sur mon parcours professionnel, mes compétences et mes projets. N'hésitez pas à explorer les différentes sections en utilisant le menu de navigation ci-dessus. Vous pouvez également changer de langue en utilisant le menu déroulant en haut à droite, et modifier le thème du site avec l'icône du pinceau en bas à droite. N'hésitez pas à me contacter via les liens sociaux ci-dessus !",
                    email: "votre.email@example.com",
                    phone: "Votre Numéro de Téléphone",
                    location: "Votre Localisation",
                    additionalInfo: "Informations supplémentaires (ex: Permis de conduire)"
                },
                social: {
                    linkedin: '#',
                    github: '#',
                    twitter: '#',
                    email: 'mailto:votre.email@example.com'
                },
                contact: {
                    email: 'votre.email@example.com',
                    phone: 'Votre Numéro de Téléphone',
                    location: 'Votre Localisation'
                },
                education: [
                    {
                        period: "YYYY-YYYY",
                        degree: "Nom du Diplôme",
                        institution: "Nom de l'Institution",
                        mention: "Mention/Honors (si applicable)",
                        details: [
                            "Réalisation ou matière clé 1",
                            "Réalisation ou matière clé 2"
                        ]
                    }
                ],
                skills: {
                    "Catégorie 1": [
                        "Compétence 1",
                        "Compétence 2"
                    ],
                    "Catégorie 2": [
                        "Compétence 1",
                        "Compétence 2"
                    ]
                },
                projects: [
                    {
                        title: "Titre du Projet",
                        description: "Description du Projet",
                        image: "images/project-image.jpg",
                        demoLink: "#",
                        sourceLink: "#"
                    }
                ],
                experience: [
                    {
                        period: "MM/YYYY",
                        title: "Titre du Poste",
                        company: "Nom de l'Entreprise",
                        details: [
                            "Responsabilité ou réalisation clé 1",
                            "Responsabilité ou réalisation clé 2"
                        ]
                    }
                ],
                interests: [
                    {
                        title: "Sports",
                        items: ["Basketball", "Football", "Swimming"]
                    },
                    {
                        title: "Travel",
                        items: ["Italy", "Spain", "France", "USA", "Japan"]
                    },
                    {
                        title: "Hobbies",
                        items: ["Reading", "Photography", "Cooking", "Music"]
                    }
                ]
            }
        }
    };
    // Validation helper functions
    function validateBasicStructure(config) {
        return config && 
               typeof config === 'object' && 
               config.languageSettings && 
               typeof config.languageSettings === 'object' && 
               config.content && 
               typeof config.content === 'object';
    }

    function validateLanguageSettings(languageSettings) {
        return languageSettings.primary && 
               typeof languageSettings.primary === 'string' && 
               Array.isArray(languageSettings.translations);
    }

    function validateRequiredSections(langContent) {
        return langContent.personal && 
               typeof langContent.personal === 'object' && 
               langContent.social && 
               typeof langContent.social === 'object' && 
               langContent.contact && 
               typeof langContent.contact === 'object' && 
               Array.isArray(langContent.education) && 
               Array.isArray(langContent.projects) && 
               Array.isArray(langContent.experience) && 
               typeof langContent.skills === 'object';
    }

    function validateOptionalSections(langContent) {
        return !langContent.interests || Array.isArray(langContent.interests);
    }

    // Main validation function
    function validateConfig(config) {
        if (!validateBasicStructure(config)) return false;
        if (!validateLanguageSettings(config.languageSettings)) return false;
        
        const languages = [config.languageSettings.primary, ...config.languageSettings.translations];
        return languages.every(lang => {
            const langContent = config.content[lang];
            return langContent && 
                   typeof langContent === 'object' && 
                   validateRequiredSections(langContent) && 
                   validateOptionalSections(langContent);
        });
    }
    
    // Update loadConfiguration function
    function loadConfiguration() {
        const savedConfig = localStorage.getItem('portfolio-config');
        if (savedConfig) {
            try {
                const parsedConfig = JSON.parse(savedConfig);
                if (validateConfig(parsedConfig)) {
                    return parsedConfig;
                }
            } catch (e) {
                console.error('Error parsing saved configuration:', e);
            }
        }
        return defaultConfig;
    }
    
    // Add sanitization function at the top of the file
    function sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    
    // Function to populate language selector based on config
    function populateLanguageSelector(config) {
        if (!languageSelector) return;
        
        // Clear current options
        languageSelector.innerHTML = '';
        
        // Add primary language
        const primaryOption = document.createElement('option');
        primaryOption.value = config.languageSettings.primary;
        primaryOption.textContent = getLanguageName(config.languageSettings.primary);
        languageSelector.appendChild(primaryOption);
        
        // Add translation languages
        config.languageSettings.translations.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = getLanguageName(lang);
            languageSelector.appendChild(option);
        });
        
        // Set current language
        const currentLang = localStorage.getItem('portfolio-language') || config.languageSettings.primary;
        languageSelector.value = currentLang;
        
        // Hide selector if only one language is available
        if (config.languageSettings.translations.length === 0) {
            languageSelector.style.display = 'none';
        } else {
            languageSelector.style.display = 'block';
        }
    }
    
    // Helper functions for configuration application
    function updatePersonalInfo(langConfig) {
        if (langConfig.personal.name) document.getElementById('name').textContent = langConfig.personal.name;
        if (langConfig.personal.title) document.getElementById('title').textContent = langConfig.personal.title;
        if (langConfig.personal.about) document.getElementById('about-text').textContent = langConfig.personal.about;
        if (langConfig.personal.name) document.getElementById('footer-name').textContent = langConfig.personal.name;
    }

    function updateProfilePic(config) {
        const profilePic = document.getElementById('profile-pic');
        const profilePicContainer = document.querySelector('.profile-pic-container');
        if (profilePic && profilePicContainer) {
            if (config.showProfilePic) {
                profilePicContainer.style.display = 'block';
                profilePic.src = config.profilePic || 'images/profile-placeholder.jpg';
            } else {
                profilePicContainer.style.display = 'none';
            }
        }
    }

    function updateSocialLinks(langConfig) {
        const socialLinks = {
            linkedin: document.getElementById('linkedin'),
            github: document.getElementById('github'),
            twitter: document.getElementById('twitter'),
            email: document.getElementById('email')
        };

        Object.entries(langConfig.social).forEach(([platform, url]) => {
            const element = socialLinks[platform];
            if (element) {
                element.style.display = url && url !== '#' ? 'inline-block' : 'none';
                if (url && url !== '#') element.href = url;
            }
        });
    }

    function updateContactInfo(langConfig) {
        const contactInfo = document.getElementById('contact-info');
        if (!contactInfo) return;

        const contactHTML = [];
        if (langConfig.contact.email) {
            contactHTML.push(`<div class="contact-item"><i class="fas fa-envelope"></i><p>${sanitizeHTML(langConfig.contact.email)}</p></div>`);
        }
        if (langConfig.contact.phone) {
            contactHTML.push(`<div class="contact-item"><i class="fas fa-phone"></i><p>${sanitizeHTML(langConfig.contact.phone)}</p></div>`);
        }
        if (langConfig.contact.location) {
            contactHTML.push(`<div class="contact-item"><i class="fas fa-map-marker-alt"></i><p>${sanitizeHTML(langConfig.contact.location)}</p></div>`);
        }
        contactInfo.innerHTML = contactHTML.join('');
    }

    function generateDetailsList(details) {
        if (!details?.length) return '';
        const listItems = details.map(detail => `<li>${sanitizeHTML(detail)}</li>`).join('');
        return `<ul class="education-details">${listItems}</ul>`;
    }

    function updateEducation(langConfig) {
        const educationList = document.getElementById('education-list');
        if (!educationList) return;

        educationList.innerHTML = langConfig.education.map(edu => `
            <div class="education-item">
                ${edu.institution ? `<h3>${sanitizeHTML(edu.institution)}</h3>` : ''}
                ${edu.degree ? `<p class="degree">${sanitizeHTML(edu.degree)}</p>` : ''}
                ${edu.mention ? `<p class="mention">Mention : ${sanitizeHTML(edu.mention)}</p>` : ''}
                ${edu.period ? `<p class="date">${sanitizeHTML(edu.period)}</p>` : ''}
                ${generateDetailsList(edu.details)}
            </div>
        `).join('');
    }

    function updateSkills(langConfig) {
        const skillsList = document.getElementById('skills-list');
        if (!skillsList) return;

        skillsList.innerHTML = Object.entries(langConfig.skills)
            .filter(([_, skills]) => skills?.length)
            .map(([category, skills]) => `
                <div class="skill-category">
                    <h3>${sanitizeHTML(category)}</h3>
                    <ul class="skills-list">${skills.map(skill => `<li>${sanitizeHTML(skill)}</li>`).join('')}</ul>
                </div>
            `).join('');
    }

    function updateProjects(langConfig) {
        const projectsList = document.getElementById('projects-list');
        if (!projectsList) return;

        projectsList.innerHTML = langConfig.projects
            .filter(project => project.title || project.description)
            .map(project => `
                <div class="project-card">
                    <div class="project-img">
                        <img src="${project.image && project.image !== '#' ? sanitizeHTML(project.image) : 'images/project-placeholder.jpg'}" 
                             alt="${sanitizeHTML(project.title || 'Project')}">
                    </div>
                    <div class="project-info">
                        ${project.title ? `<h3>${sanitizeHTML(project.title)}</h3>` : ''}
                        ${project.description ? `<p>${sanitizeHTML(project.description)}</p>` : ''}
                        <div class="project-links">
                            ${project.demoLink && project.demoLink !== '#' ? 
                                `<a href="${sanitizeHTML(project.demoLink)}" class="btn">Live Demo</a>` : ''}
                            ${project.sourceLink && project.sourceLink !== '#' ? 
                                `<a href="${sanitizeHTML(project.sourceLink)}" class="btn">Source Code</a>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
    }

    function updateExperience(langConfig) {
        const experienceList = document.getElementById('experience-list');
        if (!experienceList) return;

        experienceList.innerHTML = langConfig.experience
            .filter(exp => exp.title || exp.company)
            .map(exp => `
                <div class="experience-item">
                    ${exp.company ? `<h3>${sanitizeHTML(exp.company)}</h3>` : ''}
                    ${exp.title ? `<p class="position">${sanitizeHTML(exp.title)}</p>` : ''}
                    ${exp.period ? `<p class="date">${sanitizeHTML(exp.period)}</p>` : ''}
                    ${exp.details?.length ? `
                        <ul class="experience-details">
                            ${exp.details.map(detail => `<li>${sanitizeHTML(detail)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('');
    }

    function updateInterests(langConfig) {
        const interestsList = document.getElementById('interests-list');
        if (!interestsList) return;

        interestsList.innerHTML = langConfig.interests
            ?.filter(interest => interest.title && interest.items?.length)
            .map(interest => `
                <div class="interest-category">
                    <h3>${sanitizeHTML(interest.title)}</h3>
                    <ul class="interests-list">
                        ${interest.items.map(item => `<li>${sanitizeHTML(item)}</li>`).join('')}
                    </ul>
                </div>
            `).join('') || '';
    }

    // Main configuration application function
    function applyConfiguration(config) {
        const currentLang = localStorage.getItem('portfolio-language') || config.languageSettings.primary;
        const langConfig = config.content[currentLang];
        
        if (!langConfig) {
            console.error(`No content available for language: ${currentLang}`);
            return;
        }

        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        updatePersonalInfo(langConfig);
        updateProfilePic(config);
        updateSocialLinks(langConfig);
        updateContactInfo(langConfig);
        updateEducation(langConfig);
        updateSkills(langConfig);
        updateProjects(langConfig);
        updateExperience(langConfig);
        updateInterests(langConfig);
    }
    
    // Language handling
    function setLanguage(lang) {
        // Validate language code
        if (!lang || typeof lang !== 'string' || !config.content[lang]) {
            console.error('Invalid language code:', lang);
            return;
        }
        
        localStorage.setItem('portfolio-language', lang);
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang]?.[key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
    
    // Initialize the page
    const config = loadConfiguration();
    populateLanguageSelector(config);
    const savedLanguage = localStorage.getItem('portfolio-language') || config.languageSettings.primary;
    languageSelector.value = savedLanguage;
    setLanguage(savedLanguage);
    applyConfiguration(config);
    
    // Language change event
    languageSelector.addEventListener('change', (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        applyConfiguration(loadConfiguration());
    });
    
    // Language helper function
    function getLanguageName(code) {
        const languages = {
            af: "Afrikaans", sq: "Albanian", ar: "Arabic", hy: "Armenian", eu: "Basque",
            bn: "Bengali", bg: "Bulgarian", ca: "Catalan", km: "Cambodian", zh: "Chinese",
            hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch", en: "English",
            et: "Estonian", fj: "Fiji", fi: "Finnish", fr: "French", ka: "Georgian",
            de: "German", el: "Greek", gu: "Gujarati", he: "Hebrew", hi: "Hindi",
            hu: "Hungarian", is: "Icelandic", id: "Indonesian", ga: "Irish", it: "Italian",
            ja: "Japanese", jw: "Javanese", ko: "Korean", la: "Latin", lv: "Latvian",
            lt: "Lithuanian", mk: "Macedonian", ms: "Malay", ml: "Malayalam", mt: "Maltese",
            mi: "Maori", mr: "Marathi", mn: "Mongolian", ne: "Nepali", no: "Norwegian",
            fa: "Persian", pl: "Polish", pt: "Portuguese", pa: "Punjabi", qu: "Quechua",
            ro: "Romanian", ru: "Russian", sm: "Samoan", sr: "Serbian", sk: "Slovak",
            sl: "Slovenian", es: "Spanish", sw: "Swahili", sv: "Swedish", ta: "Tamil",
            tt: "Tatar", te: "Telugu", th: "Thai", bo: "Tibetan", to: "Tonga",
            tr: "Turkish", uk: "Ukrainian", ur: "Urdu", uz: "Uzbek", vi: "Vietnamese",
            cy: "Welsh", xh: "Xhosa"
        };
        return languages[code] || code;
    }

    // Make sure the function is available globally
    window.getLanguageName = getLanguageName;
}); 