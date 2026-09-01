        (function() {
            'use strict';

            // ==========================================
            // SCROLL REVEAL ANIMATIONS (Intersection Observer)
            // ==========================================
            const revealElements = document.querySelectorAll('.reveal');

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optional: stop observing after reveal
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));

            // ==========================================
            // HEADER SCROLL BEHAVIOR
            // ==========================================
            const header = document.getElementById('site-header');
            let lastScrollY = window.scrollY;

            function handleHeaderScroll() {
                const currentScrollY = window.scrollY;
                if (currentScrollY > 80) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                lastScrollY = currentScrollY;
            }

            // Throttle scroll event for performance
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        handleHeaderScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            });

            // Initial check
            handleHeaderScroll();

            // ==========================================
            // ACCORDION FUNCTIONALITY
            // ==========================================
            const accordionTriggers = document.querySelectorAll('.accordion-trigger');

            accordionTriggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const item = trigger.closest('.accordion-item');
                    const isActive = item.classList.contains('active');
                    const panel = item.querySelector('.accordion-panel');

                    // Close all accordion items
                    document.querySelectorAll('.accordion-item').forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherTrigger = otherItem.querySelector('.accordion-trigger');
                        otherTrigger.setAttribute('aria-expanded', 'false');
                    });

                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                });
            });

            // ==========================================
            // PARALLAX EFFECT ON BACKGROUND ELEMENTS
            // ==========================================
            const parallaxElements = document.querySelectorAll('.parallax-element');

            function applyParallax() {
                const scrollY = window.scrollY;
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-speed') || '0.15');
                    const rect = el.getBoundingClientRect();
                    const baseY = rect.top + scrollY;
                    const offset = (scrollY - baseY) * speed;
                    el.style.transform = `translateY(${offset}px)`;
                });
            }

            // Set data-speed attributes for elements
            document.querySelectorAll('.parallax-element').forEach((el, index) => {
                const speeds = [0.1, 0.2, 0.08, 0.15, 0.12];
                el.setAttribute('data-speed', speeds[index % speeds.length]);
            });

            let parallaxTicking = false;
            window.addEventListener('scroll', () => {
                if (!parallaxTicking) {
                    window.requestAnimationFrame(() => {
                        applyParallax();
                        parallaxTicking = false;
                    });
                    parallaxTicking = true;
                }
            });

            // Initial parallax
            applyParallax();

            // ==========================================
            // SMOOTH SCROLL FOR ALL ANCHOR LINKS
            // ==========================================
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        const headerOffset = 70;
                        const elementPosition = targetEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Update URL without jump
                        history.pushState(null, '', targetId);
                    }
                });
            });

            // ==========================================
            // KEYBOARD ENHANCEMENT FOR VALUE CARDS & TEAM CARDS
            // ==========================================
            const keyboardCards = document.querySelectorAll('.value-card, .team-card, .coming-soon-badge');
            keyboardCards.forEach(card => {
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });
            });

            // ==========================================
            // DYNAMIC FOOTER YEAR
            // ==========================================
            const footerYear = document.querySelector('.footer-bottom p:first-child');
            if (footerYear) {
                const year = new Date().getFullYear();
                footerYear.textContent = `© ${year} MELT Agency. All rights reserved.`;
            }

            // ==========================================
            // MOBILE NAV — SIMPLE RESPONSIVE TOGGLE (inline)
            // ==========================================
            // For very small screens, ensure nav links are usable
            // (The flex-wrap and smaller font sizes in CSS handle most cases)
        })();