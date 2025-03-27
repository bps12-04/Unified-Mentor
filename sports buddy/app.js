// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmDp_P61G-gbqKWw-z4rlA0KNVTM_OHF0",
    authDomain: "sports-buddy-bae94.firebaseapp.com",
    projectId: "sports-buddy-bae94",
    storageBucket: "sports-buddy-bae94.firebasestorage.app",
    messagingSenderId: "186432814964",
    appId: "1:186432814964:web:b9272ca364f1b80608f621",
    measurementId: "G-YQQXRG7ZP8"
};
https://console.firebase.google.com/project/sports-buddy-bae94/storage
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const authSection = document.getElementById('auth-section');
const mainSection = document.getElementById('main-section');
const adminSection = document.getElementById('admin-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// Event Listeners
loginTab.addEventListener('click', () => switchAuthTab('login.html'));
registerTab.addEventListener('click', () => switchAuthTab('register.html'));
logoutBtn.addEventListener('click', logout);
adminLogoutBtn.addEventListener('click', logout);

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginUser(email, password);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    if (password === confirmPassword) {
        registerUser(name, email, password);
    } else {
        registerError.textContent = 'Passwords do not match';
    }
});

// Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        if (user.email === 'admin@example.com') {
            showAdminSection();
        } else {
            showMainSection();
        }
    } else {
        showAuthSection();
    }
});

// Functions
function switchAuthTab(tab) {
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            loginError.textContent = '';
        })
        .catch(error => {
            loginError.textContent = error.message;
        });
}

function registerUser(name, email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                sportsPreferences: []
            }).then(() => {
                registerError.textContent = '';
            });
        })
        .catch(error => {
            registerError.textContent = error.message;
        });
}

function logout() {
    auth.signOut().then(() => {
        showAuthSection();
    });
}

function showAuthSection() {
    authSection.classList.remove('hidden');
    mainSection.classList.add('hidden');
    adminSection.classList.add('hidden');
}

function showMainSection() {
    authSection.classList.add('hidden');
    mainSection.classList.remove('hidden');
    adminSection.classList.add('hidden');
    loadUserProfile();
    loadEvents();
}

function showAdminSection() {
    authSection.classList.add('hidden');
    mainSection.classList.add('hidden');
    adminSection.classList.remove('hidden');
    loadSports();
    loadCities();
    loadAreas();
}

function loadUserProfile() {
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                document.getElementById('profile-name-display').textContent = userData.name;
                document.getElementById('profile-email-display').textContent = userData.email;
                loadSportsPreferences(user.uid);
            }
        });
    }
}

function loadSportsPreferences(userId) {
    const sportsPreferences = document.getElementById('sports-preferences');
    sportsPreferences.innerHTML = '';
    db.collection('users').doc(userId).get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            userData.sportsPreferences.forEach(preference => {
                const preferenceItem = document.createElement('div');
                preferenceItem.classList.add('preference-item');
                preferenceItem.innerHTML = `
                    <span class="preference-sport">${preference.sport}</span>
                    <span class="preference-level">${preference.level}</span>
                `;
                sportsPreferences.appendChild(preferenceItem);
            });
        }
    });
}

function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';
    db.collection('events').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const event = doc.data();
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <div class="event-header">
                    <h3>${event.title}</h3>
                    <p class="event-sport">${event.sport}</p>
                </div>
                <div class="event-body">
                    <div class="event-info">
                        <div class="event-info-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${new Date(event.date).toLocaleString()}</span>
                        </div>
                        <div class="event-info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location}</span>
                        </div>
                    </div>
                    <p class="event-description">${event.description}</p>
                </div>
                <div class="event-footer">
                    <span class="event-creator">Created by: ${event.creatorName}</span>
                    <button class="btn primary-btn">Join Event</button>
                </div>
            `;
            eventsContainer.appendChild(eventCard);
        });
    });
}

function loadSports() {
    const sportsList = document.getElementById('sports-list');
    sportsList.innerHTML = '';
    db.collection('sports').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const sport = doc.data();
            const sportItem = document.createElement('div');
            sportItem.classList.add('admin-list-item');
            sportItem.innerHTML = `
                <span>${sport.name}</span>
                <div class="admin-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            sportsList.appendChild(sportItem);
        });
    });
}

function loadCities() {
    const citiesList = document.getElementById('cities-list');
    citiesList.innerHTML = '';
    db.collection('cities').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const city = doc.data();
            const cityItem = document.createElement('div');
            cityItem.classList.add('admin-list-item');
            cityItem.innerHTML = `
                <span>${city.name}</span>
                <div class="admin-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            citiesList.appendChild(cityItem);
        });
    });
}

function loadAreas() {
    const areasList = document.getElementById('areas-list');
    areasList.innerHTML = '';
    db.collection('areas').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const area = doc.data();
            const areaItem = document.createElement('div');
            areaItem.classList.add('admin-list-item');
            areaItem.innerHTML = `
                <span>${area.name}</span>
                <div class="admin-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            areasList.appendChild(areaItem);
        });
    });
}

// Additional event listeners and functions for creating events, adding sports preferences, etc., can be added here.