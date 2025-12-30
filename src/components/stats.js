// Stats component

import { getClients } from '../utils/storage.js';

/**
 * Render stats cards
 * @param {HTMLElement} container - Container element
 */
export function renderStats(container) {
    const clients = getClients();
    const totalClients = clients.length;
    const activeClients = clients.filter(client => client.status === 'Active').length;
    const inactiveClients = totalClients - activeClients;

    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">${totalClients}</div>
                    <div class="stat-label">Total Clients</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">${activeClients}</div>
                    <div class="stat-label">Active Clients</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-user-times"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">${inactiveClients}</div>
                    <div class="stat-label">Inactive Clients</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update stats display
 */
export function updateStats() {
    const statsContainer = document.querySelector('.stats-grid');
    if (statsContainer) {
        renderStats(statsContainer.parentElement);
    }
}
