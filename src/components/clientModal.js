// Client modal component

import { getClients, saveClients } from '../utils/storage.js';
import { updateStats } from './stats.js';

/**
 * Show client modal
 * @param {Object} client - Client object to edit (optional)
 */
export function showClientModal(client = null) {
    const isEdit = client !== null;

    const modalHTML = `
        <div class="modal-overlay" id="client-modal">
            <div class="modal">
                <div class="modal-header">
                    <h3>${isEdit ? 'Edit Client' : 'Add New Client'}</h3>
                    <button class="modal-close" id="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="client-form" class="modal-body">
                    <div class="form-group">
                        <label for="client-name" class="form-label">Name *</label>
                        <input
                            type="text"
                            id="client-name"
                            name="name"
                            class="form-input"
                            value="${client ? client.name : ''}"
                            required
                        >
                        <div class="form-error" id="name-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="client-email" class="form-label">Email *</label>
                        <input
                            type="email"
                            id="client-email"
                            name="email"
                            class="form-input"
                            value="${client ? client.email : ''}"
                            required
                        >
                        <div class="form-error" id="email-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="client-phone" class="form-label">Phone</label>
                        <input
                            type="tel"
                            id="client-phone"
                            name="phone"
                            class="form-input"
                            value="${client ? client.phone : ''}"
                        >
                        <div class="form-error" id="phone-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="client-status" class="form-label">Status *</label>
                        <select id="client-status" name="status" class="form-select" required>
                            <option value="Active" ${client && client.status === 'Active' ? 'selected' : ''}>Active</option>
                            <option value="Inactive" ${client && client.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                        <div class="form-error" id="status-error"></div>
                    </div>
                </form>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
                    <button type="submit" form="client-form" class="btn btn-primary">
                        ${isEdit ? 'Update Client' : 'Add Client'}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listeners
    const modal = document.getElementById('client-modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const form = document.getElementById('client-form');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', handleModalClick);
    form.addEventListener('submit', (e) => handleClientSubmit(e, client));

    // Focus first input
    document.getElementById('client-name').focus();
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('client-modal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Handle modal overlay click
 * @param {Event} e - Click event
 */
function handleModalClick(e) {
    if (e.target.id === 'client-modal') {
        closeModal();
    }
}

/**
 * Handle client form submission
 * @param {Event} e - Form submit event
 * @param {Object} existingClient - Existing client object (for edit mode)
 */
function handleClientSubmit(e, existingClient) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const clientData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        status: formData.get('status')
    };

    // Validate form
    const validation = validateClientForm(clientData, existingClient);
    if (!validation.isValid) {
        showFormErrors(validation.errors);
        return;
    }

    // Save client
    saveClient(clientData, existingClient);

    // Close modal and update display
    closeModal();
    updateClientDisplay();
}

/**
 * Validate client form
 * @param {Object} clientData - Client data
 * @param {Object} existingClient - Existing client (for edit mode)
 * @returns {Object} Validation result
 */
function validateClientForm(clientData, existingClient) {
    const errors = {};
    let isValid = true;

    // Name validation
    if (!clientData.name) {
        errors.name = 'Name is required';
        isValid = false;
    }

    // Email validation
    if (!clientData.email) {
        errors.email = 'Email is required';
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        } else {
            // Check for duplicate email
            const clients = getClients();
            const duplicate = clients.find(client =>
                client.email === clientData.email &&
                (!existingClient || client.id !== existingClient.id)
            );
            if (duplicate) {
                errors.email = 'A client with this email already exists';
                isValid = false;
            }
        }
    }

    // Status validation
    if (!clientData.status) {
        errors.status = 'Status is required';
        isValid = false;
    }

    return { isValid, errors };
}

/**
 * Show form errors
 * @param {Object} errors - Error messages
 */
function showFormErrors(errors) {
    // Clear previous errors
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => el.textContent = '');

    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => input.classList.remove('error'));

    // Show new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(`client-${field}`);

        if (errorElement) {
            errorElement.textContent = errors[field];
        }

        if (inputElement) {
            inputElement.classList.add('error');
        }
    });
}

/**
 * Save client
 * @param {Object} clientData - Client data
 * @param {Object} existingClient - Existing client (for edit mode)
 */
function saveClient(clientData, existingClient) {
    const clients = getClients();

    if (existingClient) {
        // Update existing client
        const index = clients.findIndex(c => c.id === existingClient.id);
        if (index !== -1) {
            clients[index] = { ...existingClient, ...clientData };
        }
    } else {
        // Add new client
        const newClient = {
            id: Date.now(), // Simple ID generation
            ...clientData,
            createdAt: new Date().toISOString()
        };
        clients.push(newClient);
    }

    saveClients(clients);
}

/**
 * Update client display after save
 */
function updateClientDisplay() {
    // Re-render client list
    const clientListContainer = document.querySelector('.client-list-container');
    if (clientListContainer) {
        // Import and call renderClientList
        import('./clientList.js').then(module => {
            module.renderClientList(clientListContainer);
        });
    }

    // Update stats
    updateStats();
}
