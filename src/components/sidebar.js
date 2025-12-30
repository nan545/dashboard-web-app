// Sidebar component

import { navigateTo } from '../utils/router.js';
import { showClientsPage } from '../pages/dashboard.js';

/**
 * Render sidebar
 * @param {HTMLElement} container - Container element
 */
export function renderSidebar(container) {
    container.innerHTML = `
        <div class="sidebar-header">
            <i class="fas fa-chart-line"></i>
            <span class="sidebar-logo">Dashboard</span>
        </div>
        <nav>
            <ul class="sidebar-nav">
                <li class="sidebar-nav-item">
                    <a href="#/dashboard" class="sidebar-nav-link active" data-route="dashboard">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="sidebar-nav-item">
                    <a href="#/clients" class="sidebar-nav-link" data-route="clients">
                        <i class="fas fa-users"></i>
                        <span>Clients</span>
                    </a>
                </li>
            </ul>
        </nav>
    `;

    // Add event listeners
    const navLinks = container.querySelectorAll('.sidebar-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

/**
 * Handle navigation click
 * @param {Event} e - Click event
 */
function handleNavClick(e) {
    e.preventDefault();

    const route = e.currentTarget.getAttribute('data-route');

    // Update active state
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Navigate to route
    if (route === 'dashboard') {
        navigateTo('#/dashboard');
    } else if (route === 'clients') {
        // For now, just navigate to dashboard (we'll handle clients page later)
        navigateTo('#/dashboard');
        // TODO: Implement clients page navigation
    }
}
