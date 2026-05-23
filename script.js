/**
 * Ntalabula Social Media Solutions
 * Main JavaScript file for interactions and form handling
 */

// ============================================
// Mobile Navigation Toggle
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

/**
 * Initialize mobile menu
 */
function initMobileMenu() {

    if (menuToggle && navLinks) {

        menuToggle.addEventListener('click', () => {

            navLinks.classList.toggle('active');

            // Change icon
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }

        });

    }

}

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
 * @param {Event} e
 */
function handleFormSubmit(e) {

    e.preventDefault();

    clearAllErrors();

    // Get form values
    const name =
        document.getElementById('name').value.trim();

    const email =
        document.getElementById('email').value.trim();

    const message =
        document.getElementById('message').value.trim();

    let isValid = true;

    // Validate Name
    if (!validateName(name)) {

        showError(
            'name',
            'Please enter a valid name (at least 2 characters)'
        );

        isValid = false;

    }

    // Validate Email
    if (!validateEmail(email)) {

        showError(
            'email',
            'Please enter a valid email address'
        );

        isValid = false;

    }

    // Validate Message
    if (!validateMessage(message)) {

        showError(
            'message',
            'Please enter a message (at least 10 characters)'
        );

        isValid = false;

    }

    // Submit
    if (isValid) {

        submitForm(name, email, message);

    }

}

/**
 * Validate name field
 */
function validateName(name) {

    return name.length >= 2;

}

/**
 * Validate email field
 */
function validateEmail(email) {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

}

/**
 * Validate message field
 */
function validateMessage(message) {

    return message.length >= 10;

}

/**
 * Show field error
 */
function showError(fieldId, errorMessage) {

    const errorElement =
        document.getElementById(fieldId + 'Error');

    if (errorElement) {

        errorElement.textContent = errorMessage;

        errorElement.classList.add('active');

        const input =
            document.getElementById(fieldId);

        if (input) {

            input.style.borderColor = '#d32f2f';

        }

    }

}

/**
 * Clear field error
 */
function clearErrorFor(fieldId) {

    const errorElement =
        document.getElementById(fieldId + 'Error');

    if (errorElement) {

        errorElement.classList.remove('active');

        const input =
            document.getElementById(fieldId);

        if (input) {

            input.style.borderColor = '';

        }

    }

}

/**
 * Clear all errors
 */
function clearAllErrors() {

    const errorElements =
        document.querySelectorAll('.form-error');

    errorElements.forEach(el => {

        el.classList.remove('active');

    });

    const inputs =
        contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {

        input.style.borderColor = '';

    });

}

/**
 * Submit form
 */
function submitForm(name, email, message) {

    console.log('Form submitted:', {
        name,
        email,
        message
    });

    // Success message
    const successMessage =
        document.getElementById('successMessage');

    if (successMessage) {

        successMessage.textContent =
            '✓ Thank you! We will get back to you soon.';

        successMessage.classList.add('active');

        // Reset form
        contactForm.reset();

        // Hide success
        setTimeout(() => {

            successMessage.classList.remove('active');

        }, 5000);

    }

}

// ============================================
// Navigation & Smooth Scroll
// ============================================

/**
 * Initialize smooth scroll
 */
function initSmoothScroll() {

    const navLinkItems =
        document.querySelectorAll('.nav-link');

    navLinkItems.forEach(link => {

        link.addEventListener('click', (e) => {

            const href =
                link.getAttribute('href');

            // Skip external pages
            if (!href.startsWith('#')) {
                return;
            }

            e.preventDefault();

            const targetSection =
                document.querySelector(href);

            if (targetSection) {

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu after click
                navLinks.classList.remove('active');

                menuToggle.innerHTML = '☰';

            }

        });

    });

}

// ============================================
// Scroll Effects
// ============================================

/**
 * Add shadow to header on scroll
 */
function initScrollEffects() {

    const header =
        document.querySelector('.header');

    let isScrolled = false;

    window.addEventListener('scroll', () => {

        const hasScrolled =
            window.scrollY > 10;

        if (hasScrolled !== isScrolled) {

            isScrolled = hasScrolled;

            if (isScrolled) {

                header.style.boxShadow =
                    '0 4px 12px rgba(0,0,0,0.1)';

            } else {

                header.style.boxShadow =
                    '0 2px 8px rgba(0,0,0,0.06)';

            }

        }

    });

}

// ============================================
// Initialize App
// ============================================

/**
 * Initialize all scripts
 */
function init() {

    initMobileMenu();

    initFormHandlers();

    initSmoothScroll();

    initScrollEffects();

    console.log('Ntalabula app initialized');

}

// Wait for DOM
if (document.readyState === 'loading') {

    document.addEventListener(
        'DOMContentLoaded',
        init
    );

} else {

    init();

}
