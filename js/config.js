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
        profilePic: "images/profile-placeholder.jpg",  // Moved to top level
        content: {
            en: {
                personal: {
                    name: "Your Name",
                    title: "Your Professional Title",
                    about: "A brief description about yourself and your professional goals.",
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
                    about: "Une brève description de vous-même et de vos objectifs professionnels.",
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
    // Add validation function
    function validateConfig(config) {
        // Basic structure validation
        if (!config || typeof config !== 'object') return false;
        if (!config.languageSettings || typeof config.languageSettings !== 'object') return false;
        if (!config.content || typeof config.content !== 'object') return false;
        
        // Language settings validation
        if (!config.languageSettings.primary || typeof config.languageSettings.primary !== 'string') return false;
        if (!Array.isArray(config.languageSettings.translations)) return false;
        
        // Content validation for each language
        for (const lang of [config.languageSettings.primary, ...config.languageSettings.translations]) {
            if (!config.content[lang] || typeof config.content[lang] !== 'object') return false;
            
            const langContent = config.content[lang];
            
            // Required sections validation
            if (!langContent.personal || typeof langContent.personal !== 'object') return false;
            if (!langContent.social || typeof langContent.social !== 'object') return false;
            if (!langContent.contact || typeof langContent.contact !== 'object') return false;
            if (!Array.isArray(langContent.education)) return false;
            if (!Array.isArray(langContent.projects)) return false;
            if (!Array.isArray(langContent.experience)) return false;
            if (typeof langContent.skills !== 'object') return false;
            // Interests section is optional
            if (langContent.interests && !Array.isArray(langContent.interests)) return false;
        }
        
        return true;
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
    
    // Apply configuration to the DOM
    function applyConfiguration(config) {
        const currentLang = localStorage.getItem('portfolio-language') || config.languageSettings.primary;
        const langConfig = config.content[currentLang];
        
        if (!langConfig) {
            console.error(`No content available for language: ${currentLang}`);
            return;
        }
        
        // Personal info - using textContent for text-only content
        if (langConfig.personal.name) document.getElementById('name').textContent = langConfig.personal.name;
        if (langConfig.personal.title) document.getElementById('title').textContent = langConfig.personal.title;
        if (langConfig.personal.about) document.getElementById('about-text').textContent = langConfig.personal.about;
        
        // Profile image handling - now using top-level config
        const profilePic = document.getElementById('profile-pic');
        if (profilePic) {
            // Set default image first
            profilePic.src = config.profilePic;
            profilePic.style.display = 'block';
            
            // Try to load custom image if specified
            if (config.profilePic && config.profilePic !== 'images/profile-placeholder.jpg') {
                const img = new Image();
                img.onload = function() {
                    profilePic.src = config.profilePic;
                };
                img.onerror = function() {
                    console.log('Failed to load custom profile image, using default');
                    profilePic.src = 'images/profile-placeholder.jpg';
                };
                img.src = config.profilePic;
            }
        }
        
        if (langConfig.personal.name) document.getElementById('footer-name').textContent = langConfig.personal.name;
        
        // Update current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Social links - only show if they have values and are not '#'
        const socialLinks = {
            linkedin: document.getElementById('linkedin'),
            github: document.getElementById('github'),
            twitter: document.getElementById('twitter'),
            email: document.getElementById('email')
        };

        Object.entries(langConfig.social).forEach(([platform, url]) => {
            const element = socialLinks[platform];
            if (element && url && url !== '#') {
                element.href = url;
                element.style.display = 'inline-block';
            } else if (element) {
                element.style.display = 'none';
            }
        });
        
        // Contact info - using sanitized HTML
        const contactInfo = document.getElementById('contact-info');
        if (contactInfo) {
            const contactHTML = [];
            
            if (langConfig.contact.email) {
                contactHTML.push(`
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <p>${sanitizeHTML(langConfig.contact.email)}</p>
                    </div>
                `);
            }
            
            if (langConfig.contact.phone) {
                contactHTML.push(`
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <p>${sanitizeHTML(langConfig.contact.phone)}</p>
                    </div>
                `);
            }
            
            if (langConfig.contact.location) {
                contactHTML.push(`
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <p>${sanitizeHTML(langConfig.contact.location)}</p>
                    </div>
                `);
            }
            
            contactInfo.innerHTML = contactHTML.join('');
        }
        
        // Education - using sanitized HTML
        const educationList = document.getElementById('education-list');
        if (educationList) {
            educationList.innerHTML = '';
            
            langConfig.education.forEach(edu => {
                if (edu.degree || edu.institution) {
                    const eduItem = document.createElement('div');
                    eduItem.className = 'education-item';
                    
                    let eduHTML = '';
                    if (edu.institution) eduHTML += `<h3>${sanitizeHTML(edu.institution)}</h3>`;
                    if (edu.degree) eduHTML += `<p class="degree">${sanitizeHTML(edu.degree)}</p>`;
                    if (edu.mention) eduHTML += `<p class="mention">Mention : ${sanitizeHTML(edu.mention)}</p>`;
                    if (edu.period) eduHTML += `<p class="date">${sanitizeHTML(edu.period)}</p>`;
                    if (edu.details && edu.details.length > 0) {
                        eduHTML += `<ul class="education-details">
                            ${edu.details.map(detail => `<li>${sanitizeHTML(detail)}</li>`).join('')}
                        </ul>`;
                    }
                    
                    eduItem.innerHTML = eduHTML;
                    educationList.appendChild(eduItem);
                }
            });
        }
        
        // Skills - using sanitized HTML
        const skillsList = document.getElementById('skills-list');
        if (skillsList) {
            skillsList.innerHTML = '';
            
            Object.entries(langConfig.skills).forEach(([category, skills]) => {
                if (skills && skills.length > 0) {
                    const skillCategory = document.createElement('div');
                    skillCategory.className = 'skill-category';
                    
                    skillCategory.innerHTML = `
                        <h3>${sanitizeHTML(category)}</h3>
                        <ul class="skills-list">
                            ${skills.map(skill => `<li>${sanitizeHTML(skill)}</li>`).join('')}
                        </ul>
                    `;
                    
                    skillsList.appendChild(skillCategory);
                }
            });
        }
        
        // Projects - using sanitized HTML
        const projectsSection = document.getElementById('projects');
        const projectsList = document.getElementById('projects-list');
        
        if (projectsSection && projectsList) {
            const hasProjects = langConfig.projects && 
                              langConfig.projects.length > 0 && 
                              langConfig.projects.some(project => project.title || project.description);
            
            projectsSection.style.display = hasProjects ? 'block' : 'none';
            
            if (hasProjects) {
                projectsList.innerHTML = '';
                langConfig.projects.forEach(project => {
                    if (project.title || project.description) {
                        const projectCard = document.createElement('div');
                        projectCard.className = 'project-card';
                        
                        // Create the image container first
                        const projectHTML = `
                            <div class="project-img">
                                <img src="${project.image && project.image !== '#' ? sanitizeHTML(project.image) : 'images/project-placeholder.jpg'}" 
                                     alt="${sanitizeHTML(project.title || 'Project')}">
                            </div>
                            <div class="project-info">
                                ${project.title ? `<h3>${sanitizeHTML(project.title)}</h3>` : ''}
                                ${project.description ? `<p>${sanitizeHTML(project.description)}</p>` : ''}
                                ${(project.demoLink || project.sourceLink) ? `
                                    <div class="project-links">
                                        ${project.demoLink && project.demoLink !== '#' ? 
                                            `<a href="${sanitizeHTML(project.demoLink)}" class="btn">Live Demo</a>` : ''}
                                        ${project.sourceLink && project.sourceLink !== '#' ? 
                                            `<a href="${sanitizeHTML(project.sourceLink)}" class="btn">Source Code</a>` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        `;
                        
                        projectCard.innerHTML = projectHTML;
                        projectsList.appendChild(projectCard);
                    }
                });
            }
        }
        
        // Experience - using sanitized HTML
        const experienceList = document.getElementById('experience-list');
        if (experienceList) {
            experienceList.innerHTML = '';
            
            if (langConfig.experience && langConfig.experience.length > 0) {
                langConfig.experience.forEach(exp => {
                    if (exp.title || exp.company) {
                        const expItem = document.createElement('div');
                        expItem.className = 'experience-item';
                        
                        let expHTML = '';
                        if (exp.company) expHTML += `<h3>${sanitizeHTML(exp.company)}</h3>`;
                        if (exp.title) expHTML += `<p class="position">${sanitizeHTML(exp.title)}</p>`;
                        if (exp.period) expHTML += `<p class="date">${sanitizeHTML(exp.period)}</p>`;
                        if (exp.details && exp.details.length > 0) {
                            expHTML += `<ul class="experience-details">
                                ${exp.details.map(detail => `<li>${sanitizeHTML(detail)}</li>`).join('')}
                            </ul>`;
                        }
                        
                        expItem.innerHTML = expHTML;
                        experienceList.appendChild(expItem);
                    }
                });
            }
        }
        
        // Interests - using sanitized HTML
        const interestsList = document.getElementById('interests-list');
        if (interestsList) {
            interestsList.innerHTML = '';
            
            if (langConfig.interests && langConfig.interests.length > 0) {
                langConfig.interests.forEach(interest => {
                    if (interest.title && interest.items && interest.items.length > 0) {
                        const interestItem = document.createElement('div');
                        interestItem.className = 'interest-category';
                        
                        let interestHTML = `<h3>${sanitizeHTML(interest.title)}</h3>`;
                        interestHTML += `<ul class="interests-list">
                            ${interest.items.map(item => `<li>${sanitizeHTML(item)}</li>`).join('')}
                        </ul>`;
                        
                        interestItem.innerHTML = interestHTML;
                        interestsList.appendChild(interestItem);
                    }
                });
            }
        }
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
            if (translations[lang] && translations[lang][key]) {
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
    
    // Helper function to get language name
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

    // Helper function to get language flag emoji
    function getLanguageFlag(code) {
        const flags = {
            en: "🇬🇧", fr: "🇫🇷", es: "🇪🇸", de: "🇩🇪", it: "🇮🇹",
            pt: "🇵🇹", ru: "🇷🇺", zh: "🇨🇳", ja: "🇯🇵", ko: "🇰🇷",
            ar: "🇸🇦", hi: "🇮🇳", bn: "🇧🇩", nl: "🇳🇱", pl: "🇵🇱",
            tr: "🇹🇷", vi: "🇻🇳", th: "🇹🇭", id: "🇮🇩", el: "🇬🇷"
        };
        return flags[code] || "🌐";
    }
}); 