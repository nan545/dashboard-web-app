// Simple hash-based router

import { renderLoginPage } from '../pages/login.js';
import { renderDashboardPage } from '../pages/dashboard.js';

/**
 * Initialize router
 */
export function initRouter() {
    // Handle initial route
    handleRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', handleRoute);
}

/**
 * Handle route changes
 */
function handleRoute() {
    const hash = window.location.hash || '#/login';
    const route = hash.substring(1); // Remove #

    const app = document.getElementById('app');
    if (!app) return;

    // Clear current content
    app.innerHTML = '';

    // Route to appropriate page
    switch (route) {
        case '/login':
            renderLoginPage(app);
            break;
        case '/dashboard':
            renderDashboardPage(app);
            break;
        default:
            // Default to login
            window.location.hash = '#/login';
            break;
    }
}

/**
 * Navigate to a route
 * @param {string} route - Route to navigate to
 */
export function navigateTo(route) {
    window.location.hash = route;
}
