// Dashboard page component

import { logout, getCurrentUser } from '../utils/auth.js';
import { navigateTo } from '../utils/router.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderTopbar } from '../components/topbar.js';
import { renderStats } from '../components/stats.js';
import { renderClientList } from '../components/clientList.js';
import { showClientModal } from '../components/clientModal.js';

/**
 * Render dashboard page
 * @param {HTMLElement} container - Container element
 */
export function renderDashboardPage(container) {
    const user = getCurrentUser();

    container.innerHTML = `
        <div class="dashboard">
            <aside class="sidebar" id="sidebar"></aside>
            <main class="main-content">
                <header class="topbar" id="topbar"></header>
                <div class="content" id="content">
                    <div class="dashboard-content">
                        <h1 class="page-title">Dashboard Overview</h1>
                        <div class="stats-section" id="stats-section"></div>
                        <div class="clients-section">
                            <div class="section-header">
                                <h2>Client Management</h2>
                                <button class="btn btn-primary" id="add-client-btn">
                                    <i class="fas fa-plus"></i> Add Client
                                </button>
                            </div>
                            <div class="client-list-container" id="client-list-container"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;

    // Render components
    renderSidebar(document.getElementById('sidebar'));
    renderTopbar(document.getElementById('topbar'));
    renderStats(document.getElementById('stats-section'));
    renderClientList(document.getElementById('client-list-container'));

    // Add event listeners
    document.getElementById('add-client-btn').addEventListener('click', () => showClientModal());
}

/**
 * Show clients page (for navigation)
 */
export function showClientsPage() {
    // For now, just scroll to clients section
    const clientsSection = document.querySelector('.clients-section');
    if (clientsSection) {
        clientsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
