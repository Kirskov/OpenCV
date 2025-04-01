// Service Worker module
export class ServiceWorker {
    static register() {
        if ('serviceWorker' in navigator && 
            (window.location.protocol === 'https:' || 
             window.location.hostname === 'localhost' || 
             window.location.hostname.includes('wsl.localhost'))) {
            
            window.addEventListener('load', () => {
                const swPath = window.location.hostname.includes('wsl.localhost') ? 
                    new URL('/sw.js', window.location.href).pathname :
                    '/sw.js';
                    
                navigator.serviceWorker.register(swPath)
                    .then(registration => {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(err => {
                        console.error('ServiceWorker registration failed: ', err);
                        console.error('Registration path attempted:', swPath);
                    });
            });
        } else {
            console.log('Service Worker is not supported or protocol is not supported.',
                        'Current hostname:', window.location.hostname,
                        'Current protocol:', window.location.protocol);
        }
    }
} 