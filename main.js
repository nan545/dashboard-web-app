// Main application entry point
import { initAuth } from './src/utils/auth.js';
import { initRouter } from './src/utils/router.js';
import { initStorage } from './src/utils/storage.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize utilities
    initStorage();
    initAuth();

    // Initialize routing
    initRouter();

    // Check if user is logged in and route accordingly
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        window.location.hash = '#/dashboard';
    } else {
        window.location.hash = '#/login';
    }
});
