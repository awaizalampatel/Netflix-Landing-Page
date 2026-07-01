document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Email form submission
    const emailForms = document.querySelectorAll('.email-form');

    emailForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // Simulate form submission
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.innerHTML;

                button.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" class="spinner">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="30 70" stroke-linecap="round"/>
                    </svg>
                    Loading...
                `;
                button.disabled = true;

                setTimeout(() => {
                    button.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Success!
                    `;

                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        emailInput.value = '';
                    }, 2000);
                }, 1500);
            }
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature rows and FAQ items
    const animatedElements = document.querySelectorAll('.feature-row, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Mobile menu toggle (for future implementation)
    const createMobileMenu = () => {
        if (window.innerWidth <= 1024) {
            const navLeft = document.querySelector('.nav-left');
            const navLinksContainer = document.querySelector('.nav-links');

            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `;
                menuBtn.setAttribute('aria-label', 'Toggle menu');

                navLeft.insertBefore(menuBtn, navLinksContainer);

                menuBtn.addEventListener('click', () => {
                    navLinksContainer.classList.toggle('active');
                    menuBtn.classList.toggle('active');
                });
            }
        }
    };

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add spinner animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .spinner {
            animation: spin 1s linear infinite;
        }
        .mobile-menu-btn {
            display: none;
            color: white;
            padding: 8px;
        }
        @media (max-width: 1024px) {
            .mobile-menu-btn {
                display: flex;
            }
            .nav-links {
                position: fixed;
                top: 60px;
                left: 0;
                right: 0;
                background-color: rgba(20, 20, 20, 0.98);
                flex-direction: column;
                padding: 20px;
                gap: 15px;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(style);
});
