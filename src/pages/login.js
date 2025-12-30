// Login page component

import { login, validateLogin } from '../utils/auth.js';
import { navigateTo } from '../utils/router.js';

/**
 * Render login page
 * @param {HTMLElement} container - Container element
 */
export function renderLoginPage(container) {
    container.innerHTML = `
        <div class="login-container">
            <div class="login-card">
                <div class="login-header">
                    <h1>Welcome Back</h1>
                    <p>Please sign in to your account</p>
                </div>
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <label for="email" class="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-input"
                            placeholder="Enter your email"
                            required
                        >
                        <div class="form-error" id="email-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-input"
                            placeholder="Enter your password"
                            required
                        >
                        <div class="form-error" id="password-error"></div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Sign In</button>
                </form>
                <div class="login-footer">
                    <p>Demo: Use any email and password to login</p>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    const form = document.getElementById('login-form');
    form.addEventListener('submit', handleLoginSubmit);
}

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
function handleLoginSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous errors
    clearErrors();

    // Validate and login
    const result = login(email, password);

    if (result.success) {
        // Redirect to dashboard
        navigateTo('#/dashboard');
    } else {
        // Show error
        showError('email', result.message);
    }
}

/**
 * Clear form errors
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => el.textContent = '');

    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => input.classList.remove('error'));
}

/**
 * Show form error
 * @param {string} field - Field name
 * @param {string} message - Error message
 */
function showError(field, message) {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);

    if (errorElement) {
        errorElement.textContent = message;
    }

    if (inputElement) {
        inputElement.classList.add('error');
    }
}
