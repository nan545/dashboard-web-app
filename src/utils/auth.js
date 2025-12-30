// Authentication utility functions

import { setLoginState, isLoggedIn, getUserEmail } from './storage.js';

/**
 * Initialize authentication
 */
export function initAuth() {
    // Check if user should be redirected based on login state
    const currentHash = window.location.hash;
    const loggedIn = isLoggedIn();

    if (loggedIn && currentHash === '#/login') {
        window.location.hash = '#/dashboard';
    } else if (!loggedIn && currentHash !== '#/login') {
        window.location.hash = '#/login';
    }
}

/**
 * Validate login credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Validation result with success and error message
 */
export function validateLogin(email, password) {
    if (!email || email.trim() === '') {
        return { success: false, message: 'Email is required' };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Please enter a valid email address' };
    }

    // Mock authentication - accept any email/password combination
    return { success: true, message: 'Login successful' };
}

/**
 * Perform login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Login result
 */
export function login(email, password) {
    const validation = validateLogin(email, password);
    if (validation.success) {
        setLoginState(true, email);
        return { success: true, message: 'Login successful' };
    }
    return validation;
}

/**
 * Perform logout
 */
export function logout() {
    setLoginState(false);
    window.location.hash = '#/login';
}

/**
 * Get current user info
 * @returns {Object} User info
 */
export function getCurrentUser() {
    return {
        isLoggedIn: isLoggedIn(),
        email: getUserEmail()
    };
}
