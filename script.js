/**
 * Ntalabula Social Media Solutions
 * Main JavaScript file for interactions and form handling
 */

// ============================================
// Form Validation & Submission
// ============================================

const contactForm = document.getElementById('contactForm');

/**
 * Initialize form event listeners
 */
function initFormHandlers() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Clear errors on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => clearErrorFor(input.id));
        });
    }
}

/**
 * Handle form submission with validation
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Reset error messages
    clearAllErrors();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    let isValid = true;
    
    if (!validateName(name)) {
        showError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateMessage(message)) {
        showError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    if (isValid) {
        submitForm(name, email, message);
    }
}

/**
 * Validate name field
 * @param {string} name - Name input value
 * @returns {boolean} - Valid or not
 */
function validateName(name) {
    return name.length >= 2;
}

/**
 * Validate email field
 * @param {string} email - Email input value
 * @returns {boolean} - Valid or not
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate message field
 * @param {string} message - Message input value
 * @returns {boolean} - Valid or not
 */
function validateMessage(message) {
    return message.length >= 10;
}

/**
 * Display error message for a specific field
 * @param {string} fieldId - Field ID
 * @param {string} errorMessage - Error message to display
 */
function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('active');
        
        // Add visual feedback to input
        const input = document.getElementById(fieldId);
        if (input) {
            input.style.borderColor = '#d32f2f';
        }
    }
}

/**
 * Clear error for specific field
 * @param {string} fieldId - Field ID
 */
function clearErrorFor(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.classList.remove('active');
        const input = document.getElementById(fieldId);
        if (input) {
            input.style.borderColor = '';
        }
    }
}

/**
 * Clear all error messages
 */
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => {
        el.classList.remove('active');
    });
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

/**
 * Submit form (simulated - in production, this would send to a server)
 * @param {string} name - Submitter name
 * @param {string} email - Submitter email
 * @param {string} message - Submitter message
 */
function submitForm(name, email, message) {
    // In production, this would send data to a backend service
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = '✓ Thank you! We\'ll get back to you soon.';
        successMessage.classList.add('active');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('active');
        }, 5000);
    }
}

// ============================================
// Navigation & Smooth Scroll
// ============================================

/**
 * Initialize smooth scroll for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Scroll Effects
// ============================================

/**
 * Add scroll effect to header (optional shadow on scroll)
 */
function initScrollEffects() {
    const header = document.querySelector('.header');
    let isScrolled = false;
    
    window.addEventListener('scroll', () => {
        const hasScrolled = window.scrollY > 10;
        
        if (hasScrolled !== isScrolled) {
            isScrolled = hasScrolled;
            if (isScrolled) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
            }
        }
    });
}

// ============================================
// Initialize on Page Load
// ============================================

/**
 * Initialize all scripts when DOM is ready
 */
function init() {
    initFormHandlers();
    initSmoothScroll();
    initScrollEffects();
    
    // Log that app is initialized
    console.log('Ntalabula app initialized');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
