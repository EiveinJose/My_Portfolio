/* ==========================================================================
   EIVEN JOSE - PORTFOLIO INTERACTION ENGINE
   Faithfully matching the antonyraju.netlify.app features & behaviors
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ---------------------------------------------------------
       1. CYBER TECH PRELOADER ENGINE
       --------------------------------------------------------- */
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const terminalText = document.getElementById('terminal-text');
    const loaderProgress = document.getElementById('loader-progress');
    const loaderPercentage = document.getElementById('loader-percentage');

    const bootMessages = [
        '> Initializing Core System Architecture...',
        '> Loading Full-Stack Runtime & Node.js Engine...',
        '> Establishing Database Connection (MongoDB/SQL)...',
        '> Rendering Reactive UI Modules & Assets...',
        '> System Diagnostics 100% Verified. Welcome.'
    ];

    let currentProgress = 0;
    let messageIndex = 0;

    const progressInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 4;
        if (currentProgress > 100) currentProgress = 100;

        if (loaderProgress) loaderProgress.style.width = `${currentProgress}%`;
        if (loaderPercentage) {
            const formatted = currentProgress < 10 ? `0${currentProgress}%` : `${currentProgress}%`;
            loaderPercentage.textContent = formatted;
        }

        // Change terminal status message
        const targetMsgIndex = Math.min(Math.floor((currentProgress / 100) * bootMessages.length), bootMessages.length - 1);
        if (targetMsgIndex !== messageIndex && terminalText) {
            messageIndex = targetMsgIndex;
            terminalText.textContent = bootMessages[messageIndex];
        }

        if (currentProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                if (loaderWrapper) {
                    loaderWrapper.classList.add('loaded');
                }
            }, 450);
        }
    }, 45);

    /* ---------------------------------------------------------
       2. SCROLL PROGRESS BAR
       --------------------------------------------------------- */
    const myBar = document.getElementById('myBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (myBar) {
            myBar.style.width = scrolled + '%';
        }
    }, { passive: true });

    /* ---------------------------------------------------------
       3. DARK / LIGHT THEME TOGGLE
       --------------------------------------------------------- */
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('eiven-portfolio-theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? "<i class='bx bx-moon'></i>" : "<i class='bx bx-sun'></i>";
            localStorage.setItem('eiven-portfolio-theme', isLight ? 'light' : 'dark');
        });
    }

    /* ---------------------------------------------------------
       4. MOBILE MENU TOGGLE
       --------------------------------------------------------- */
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        });

        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            });
        });
    }

    /* ---------------------------------------------------------
       5. ACTIVE NAVBAR LINK ON SCROLL
       --------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.navbar a:not(.nav-btn)');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(sec => {
            const sectionHeight = sec.offsetHeight;
            const sectionTop = sec.offsetTop - 150;
            const sectionId = sec.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });

    /* ---------------------------------------------------------
       6. TRAJECTORY TIMELINE SCROLL PROGRESS (EDUCATION)
       --------------------------------------------------------- */
    const eduTimeline = document.querySelector('.trajectory-timeline');
    const timelineProgress = document.getElementById('timeline-line-progress');
    const yearNodes = document.querySelectorAll('.trajectory-year-node');

    if (eduTimeline && timelineProgress) {
        window.addEventListener('scroll', () => {
            const rect = eduTimeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const totalHeight = rect.height;
                const visibleProgress = Math.max(0, Math.min(1, (windowHeight * 0.7 - rect.top) / totalHeight));
                timelineProgress.style.transform = `scaleY(${visibleProgress})`;

                // Highlight year nodes as line crosses them
                yearNodes.forEach(node => {
                    const nodeRect = node.getBoundingClientRect();
                    if (nodeRect.top < windowHeight * 0.7) {
                        node.classList.add('active');
                    } else {
                        node.classList.remove('active');
                    }
                });
            }
        }, { passive: true });
    }

    /* ---------------------------------------------------------
       7. PROJECT VIEW MODE TOGGLE (STACK VS SLIDE)
       --------------------------------------------------------- */
    const pvtScroll = document.getElementById('pvt-scroll');
    const pvtSlide = document.getElementById('pvt-slide');
    const projectsSliderOuter = document.querySelector('.projects-slider-outer');
    const projectCards = document.querySelectorAll('.project-stack-card');
    const projPrev = document.getElementById('proj-prev');
    const projNext = document.getElementById('proj-next');

    let currentProjectIndex = 0;

    function showProjectSlide(index) {
        projectCards.forEach((card, idx) => {
            if (idx === index) {
                card.classList.add('proj-active');
            } else {
                card.classList.remove('proj-active');
            }
        });
    }

    if (pvtScroll && pvtSlide && projectsSliderOuter) {
        pvtScroll.addEventListener('click', () => {
            pvtScroll.classList.add('active');
            pvtSlide.classList.remove('active');
            projectsSliderOuter.classList.remove('mode-slide');
            projectCards.forEach(c => c.classList.remove('proj-active'));
        });

        pvtSlide.addEventListener('click', () => {
            pvtSlide.classList.add('active');
            pvtScroll.classList.remove('active');
            projectsSliderOuter.classList.add('mode-slide');
            showProjectSlide(currentProjectIndex);
        });
    }

    if (projPrev && projNext) {
        projPrev.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + projectCards.length) % projectCards.length;
            showProjectSlide(currentProjectIndex);
        });

        projNext.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % projectCards.length;
            showProjectSlide(currentProjectIndex);
        });
    }

    /* ---------------------------------------------------------
       8. HOLOGRAPHIC CERTIFICATION CAROUSEL & PEDESTAL
       --------------------------------------------------------- */
    const certMainCards = document.querySelectorAll('.cert-main-card');
    const certPreviewCards = document.querySelectorAll('.cert-preview-card');
    const certPrevBtn = document.getElementById('cert-prev-btn');
    const certNextBtn = document.getElementById('cert-next-btn');

    let activeCertIndex = 0;

    function activateCertificate(index) {
        activeCertIndex = index;

        certMainCards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        certPreviewCards.forEach((preview, i) => {
            if (i === index) {
                preview.classList.add('active');
                preview.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                preview.classList.remove('active');
            }
        });
    }

    if (certPrevBtn && certNextBtn && certMainCards.length > 0) {
        certPrevBtn.addEventListener('click', () => {
            const nextIdx = (activeCertIndex - 1 + certMainCards.length) % certMainCards.length;
            activateCertificate(nextIdx);
        });

        certNextBtn.addEventListener('click', () => {
            const nextIdx = (activeCertIndex + 1) % certMainCards.length;
            activateCertificate(nextIdx);
        });

        certPreviewCards.forEach((card, idx) => {
            card.addEventListener('click', () => {
                activateCertificate(idx);
            });
        });
    }

    /* ---------------------------------------------------------
       9. CONTACT FORM SUBMISSION
       --------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form-ar');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Transmitting...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = "<i class='bx bx-check-circle'></i> Message Sent!";
                submitBtn.style.background = 'linear-gradient(90deg, #10b981, #00E5FF)';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1400);
        });
    }
});
