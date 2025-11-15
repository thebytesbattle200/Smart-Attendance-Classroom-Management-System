// API Base URL
const API_BASE = 'http://localhost:5000/api';

// Simple storage
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: (key) => localStorage.removeItem(key)
};

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.alert');
    existingNotifications.forEach(alert => alert.remove());
    
    // Create notification
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) alert.remove();
    }, 5000);
}

// Login function
async function handleLogin(event) {
    event.preventDefault();
    console.log('Login function called');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const result = await response.json();
        console.log('Login response:', result);
        
        if (result.success) {
            showNotification(result.message, 'success');
            // Store user data
            storage.set('currentUser', result.student);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Cannot connect to server. Make sure backend is running.', 'error');
    }
}

// Registration function
async function handleRegistration(event) {
    event.preventDefault();
    console.log('Registration function called');
    
    const formData = {
        studentId: document.getElementById('regStudentId').value,
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        class: document.getElementById('regClass').value
    };
    
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        console.log('Registration response:', result);
        
        if (result.success) {
            showNotification(result.message, 'success');
            // Clear form
            document.getElementById('registerForm').reset();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Cannot connect to server. Make sure backend is running.', 'error');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    
    // Add login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form handler attached');
    }
    
    // Add registration form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
        console.log('Registration form handler attached');
    }
    
    // Check if user is logged in (for dashboard)
    const currentUser = storage.get('currentUser');
    if (currentUser && window.location.pathname.includes('dashboard.html')) {
        document.getElementById('userInfo').innerHTML = `
            Welcome, ${currentUser.name} (${currentUser.studentId})
            <button class="btn btn-outline-light btn-sm ms-2" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
    }
});

// Logout function
function logout() {
    storage.remove('currentUser');
    window.location.href = 'login.html';
}

// Make functions available globally
window.handleLogin = handleLogin;
window.handleRegistration = handleRegistration;
window.logout = logout;