// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

// Create feedback elements
formGroups.forEach(group => {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'form-feedback';
    group.appendChild(feedbackDiv);
});

// Validation patterns
const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[0-9]{10,15}$/,
};

// Validation messages
const messages = {
    name: {
        pattern: 'Please enter a valid name (2-50 characters, letters only)',
        required: 'Name is required'
    },
    email: {
        pattern: 'Please enter a valid email address',
        required: 'Email is required'
    },
    phone: {
        pattern: 'Please enter a valid phone number (10-15 digits)',
        required: 'Phone number is required'
    },
    subject: {
        required: 'Please select a subject'
    },
    message: {
        required: 'Message is required',
        minLength: 'Message must be at least 10 characters long'
    }
};

// Real-time validation
function validateField(input, pattern) {
    const feedback = input.parentElement.querySelector('.form-feedback');
    const value = input.value.trim();

    if (!value) {
        feedback.textContent = messages[input.id].required;
        feedback.className = 'form-feedback error';
        input.classList.add('error');
        return false;
    }

    if (pattern && !pattern.test(value)) {
        feedback.textContent = messages[input.id].pattern;
        feedback.className = 'form-feedback error';
        input.classList.add('error');
        return false;
    }

    if (input.id === 'message' && value.length < 10) {
        feedback.textContent = messages.message.minLength;
        feedback.className = 'form-feedback error';
        input.classList.add('error');
        return false;
    }

    feedback.textContent = '';
    feedback.className = 'form-feedback';
    input.classList.remove('error');
    return true;
}

// Add validation listeners to form fields
contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        validateField(field, patterns[field.id]);
    });

    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            validateField(field, patterns[field.id]);
        }
    });
});

// Form submission handling
contactForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        if (!validateField(field, patterns[field.id])) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        contactForm.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
            </div>
        `;
    } catch (error) {
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-feedback error';
        errorDiv.textContent = 'An error occurred. Please try again later.';
        contactForm.insertBefore(errorDiv, submitBtn);

        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});