document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    var header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // FAQ Accordion
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            var isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(function(faqItem) {
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
    var emailForms = document.querySelectorAll('.email-form');

    emailForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var emailInput = form.querySelector('input[type="email"]');
            var email = emailInput.value.trim();

            if (email) {
                var button = form.querySelector('button[type="submit"]');
                var originalHTML = button.innerHTML;

                button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="spinner"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="30 70" stroke-linecap="round"/></svg> Loading...';
                button.disabled = true;

                setTimeout(function() {
                    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg> Success!';

                    setTimeout(function() {
                        button.innerHTML = originalHTML;
                        button.disabled = false;
                        emailInput.value = '';
                    }, 2000);
                }, 1500);
            }
        });
    });

    // Smooth scroll for navigation links
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = link.getAttribute('href');

            if (href && href.startsWith('#') && href.length > 1) {
                var target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    var navLinksContainer = document.getElementById('navLinks');
                    var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (navLinksContainer) {
                        navLinksContainer.classList.remove('active');
                    }
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    var observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature rows and FAQ items
    var animatedElements = document.querySelectorAll('.feature-row, .faq-item');
    animatedElements.forEach(function(el) {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Mobile menu toggle
    var mobileMenuBtn = null;
    var navLinksContainer = document.getElementById('navLinks');
    var navLeft = document.querySelector('.nav-left');

    function createMobileButton() {
        if (mobileMenuBtn) return;
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        navLeft.insertBefore(mobileMenuBtn, navLinksContainer);
        mobileMenuBtn.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    function removeMobileButton() {
        if (mobileMenuBtn) {
            mobileMenuBtn.remove();
            mobileMenuBtn = null;
        }
        if (navLinksContainer) {
            navLinksContainer.classList.remove('active');
        }
    }

    function handleResize() {
        if (window.innerWidth <= 1024) {
            createMobileButton();
        } else {
            removeMobileButton();
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    // Add spinner animation styles
    var style = document.createElement('style');
    style.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spinner{animation:spin 1s linear infinite}@media(max-width:1024px){.nav-links{position:fixed;top:60px;left:0;right:0;background-color:rgba(20,20,20,0.98);flex-direction:column;padding:20px;gap:15px;transform:translateY(-100%);opacity:0;visibility:hidden;transition:all 0.3s ease;z-index:999}.nav-links.active{transform:translateY(0);opacity:1;visibility:visible}}';
    document.head.appendChild(style);
});
