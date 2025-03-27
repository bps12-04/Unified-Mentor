// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ========== Navigation Menu Functionality ==========

    // Variables
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTop = document.querySelector('.back-to-top');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navItems.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Sticky header & Back to top button visibility
    window.addEventListener('scroll', function () {
        // Add sticky class to header when scrolling
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '15px 0';
        }

        // Show back to top button when scrolling down
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }

        // Update active navigation link based on scroll position
        updateActiveLink();
    });

    // Update active link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ========== Project Filtering ==========

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Show/hide projects based on filter
            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    // ========== Form Validation ==========

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => (error.textContent = ''));

        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Validate form
        let isValid = true;

        // Validate Name
        if (name.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required.';
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required.';
            isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Subject
        if (subject.value.trim() === '') {
            document.getElementById('subjectError').textContent = 'Subject is required.';
            isValid = false;
        }

        // Validate Message
        if (message.value.trim() === '') {
            document.getElementById('messageError').textContent = 'Message is required.';
            isValid = false;
        }

        // If form is valid, submit it
        if (isValid) {
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                formSuccess.textContent = 'Your message has been sent successfully!';
                formSuccess.style.display = 'block';

                // Reset form fields
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        }
    });
});