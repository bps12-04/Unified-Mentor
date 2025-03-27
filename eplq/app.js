// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEEbdCw8tph7aaqE718Vx5D5I2leVkBvc",
    authDomain: "eplq-87067.firebaseapp.com",
    projectId: "eplq-87067",
    storageBucket: "eplq-87067.firebasestorage.app",
    messagingSenderId: "617315938800",
    appId: "1:617315938800:web:77112482663fb2d2b0ad35"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// DOM Elements
const sections = {
    home: document.getElementById('homesection'),
    login: document.getElementById('loginsection'),
    register: document.getElementById('registersection'),
    adminDashboard: document.getElementById('admindashboard'),
    userDashboard: document.getElementById('userdashboard')
};

const navLinks = {
    home: document.getElementById('homelink'),
    login: document.getElementById('loginlink'),
    register: document.getElementById('registerlink'),
    logout: document.getElementById('logoutlink')
};

// Navigation event listeners
navLinks.home.addEventListener('click', () => showSection('home'));
navLinks.login.addEventListener('click', () => showSection('login'));
navLinks.register.addEventListener('click', () => showSection('register'));
navLinks.logout.addEventListener('click', handleLogout);

// Show appropriate section
function showSection(sectionName) {
    Object.keys(sections).forEach(key => {
        sections[key].style.display = 'none';
    });

    switch (sectionName) {
        case 'home':
            sections.home.style.display = 'block';
            break;
        case 'login':
            sections.login.style.display = 'block';
            break;
        case 'register':
            sections.register.style.display = 'block';
            break;
        case 'adminDashboard':
            sections.adminDashboard.style.display = 'block';
            break;
        case 'userDashboard':
            sections.userDashboard.style.display = 'block';
            break;
    }
}

// Initial section
showSection('home');

// User Authentication State
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        navLinks.login.style.display = 'none';
        navLinks.register.style.display = 'none';
        navLinks.logout.style.display = 'block';

        // Check user role
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists && doc.data().role === 'admin') {
                    showSection('adminDashboard');
                } else {
                    showSection('userDashboard');
                }
                logAction(user.uid, 'auth', 'User logged in');
            })
            .catch((error) => {
                console.error("Error getting user role:", error);
                showSection('home');
            });
    } else {
        // User is signed out
        navLinks.login.style.display = 'block';
        navLinks.register.style.display = 'block';
        navLinks.logout.style.display = 'none';
        showSection('home');
    }
});

// Login Functionality
const loginForm = document.getElementById('loginform');
const loginMessage = document.getElementById('loginmessage');
const userLoginTab = document.getElementById('userlogintab');
const adminLoginTab = document.getElementById('adminlogintab');

let isAdminLogin = false;

userLoginTab.addEventListener('click', () => {
    userLoginTab.classList.add('active');
    adminLoginTab.classList.remove('active');
    isAdminLogin = false;
});

adminLoginTab.addEventListener('click', () => {
    adminLoginTab.classList.add('active');
    userLoginTab.classList.remove('active');
    isAdminLogin = true;
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;

    loginMessage.textContent = 'Logging in...';
    loginMessage.className = 'form-message';

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Verify role
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        if (isAdminLogin && userData.role !== 'admin') {
                            // Attempting admin login but user is not admin
                            auth.signOut();
                            loginMessage.textContent = 'Access denied. You are not an admin.';
                            loginMessage.className = 'form-message error';
                        } else if (!isAdminLogin && userData.role === 'admin') {
                            // Attempting user login but user is admin
                            loginMessage.textContent = 'You are logged in as admin.';
                            loginMessage.className = 'form-message success';
                            showSection('adminDashboard');
                        } else {
                            // Correct role login
                            loginMessage.textContent = 'Login successful!';
                            loginMessage.className = 'form-message success';
                            if (userData.role === 'admin') {
                                showSection('adminDashboard');
                                loadUsers();
                                loadLogs();
                            } else {
                                showSection('userDashboard');
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error getting user data:", error);
                    loginMessage.textContent = 'Error verifying user role.';
                    loginMessage.className = 'form-message error';
                });
        })
        .catch((error) => {
            console.error("Login error:", error);
            loginMessage.textContent = 'Failed to login: ' + error.message;
            loginMessage.className = 'form-message error';
        });
});

// Registration Functionality
const registerForm = document.getElementById('registerform');
const registerMessage = document.getElementById('registermessage');
const userRegisterTab = document.getElementById('userregistertab');
const adminRegisterTab = document.getElementById('adminregistertab');
const registerRoleInput = document.getElementById('registerrole');

userRegisterTab.addEventListener('click', () => {
    userRegisterTab.classList.add('active');
    adminRegisterTab.classList.remove('active');
    registerRoleInput.value = 'user';
});

adminRegisterTab.addEventListener('click', () => {
    adminRegisterTab.classList.add('active');
    userRegisterTab.classList.remove('active');
    registerRoleInput.value = 'admin';
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('registername').value;
    const email = document.getElementById('registeremail').value;
    const password = document.getElementById('registerpassword').value;
    const confirmPassword = document.getElementById('registerconfirmpassword').value;
    const role = registerRoleInput.value;

    if (password !== confirmPassword) {
        registerMessage.textContent = 'Passwords do not match.';
        registerMessage.className = 'form message error';
        return;
    }

    registerMessage.textContent = 'Creating account...';
    registerMessage.className = 'form message';

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store additional user data
            return db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                role: role,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            registerMessage.textContent = 'Registration successful!';
            registerMessage.className = 'form message success';

            // Clear form
            registerForm.reset();

            // Redirect based on role
            if (role === 'admin') {
                showSection('adminDashboard');
            } else {
                showSection('userDashboard');
            }
        })
        .catch((error) => {
            console.error("Registration error:", error);
            registerMessage.textContent
            registerMessage.textContent = 'Registration error: ' + error.message;
            registerMessage.className = 'form message error';
        });
});

// Logout Functionality
function handleLogout() {
    auth.signOut().then(() => {
        console.log("User signed out");
        showSection('home');
    }).catch((error) => {
        console.error("Logout error:", error);
    });
}

// Log Actions Functionality
function logAction(userId, actionType, details) {
    db.collection('logs').add({
        userId: userId,
        actionType: actionType,
        details: details,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Action logged successfully");
    }).catch((error) => {
        console.error("Error logging action:", error);
    });
}

// Load Users for Admin Dashboard
function loadUsers() {
    const usersList = document.getElementById('userslist');
    usersList.innerHTML = ''; // Clear existing content

    db.collection('users').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const userItem = document.createElement('div');
                userItem.className = 'user-item';
                userItem.innerHTML = `
                    <p><strong>Name:</strong> ${userData.name}</p>
                    <p><strong>Email:</strong> ${userData.email}</p>
                    <p><strong>Role:</strong> ${userData.role}</p>
                    <p><strong>Created At:</strong> ${userData.createdAt.toDate().toLocaleString()}</p>
                `;
                usersList.appendChild(userItem);
            });
        })
        .catch((error) => {
            console.error("Error loading users:", error);
        });
}

// Load Logs for Admin Dashboard
function loadLogs() {
    const logsList = document.getElementById('logs-list');
    logsList.innerHTML = ''; // Clear existing content

    db.collection('logs').orderBy('timestamp', 'desc').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const logData = doc.data();
                const logItem = document.createElement('div');
                logItem.className = 'log-item';
                logItem.innerHTML = `
                    <p><strong>User ID:</strong> ${logData.userId}</p>
                    <p><strong>Action:</strong> ${logData.actionType}</p>
                    <p><strong>Details:</strong> ${logData.details}</p>
                    <p><strong>Timestamp:</strong> ${logData.timestamp.toDate().toLocaleString()}</p>
                `;
                logsList.appendChild(logItem);
            });
        })
        .catch((error) => {
            console.error("Error loading logs:", error);
        });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Show home section by default
    showSection('home');
});