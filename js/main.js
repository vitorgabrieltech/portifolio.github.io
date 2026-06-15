
document.addEventListener('DOMContentLoaded', () => {


    const nav = document.getElementById('mainNav');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();


    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.getElementById('navMenu');

    if (navCollapse) {
        const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });


    document.querySelectorAll(
        '.info-card, .tech-badge, .project-card, .contact-card'
    ).forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    const yearEls = document.querySelectorAll('.footer-year');
    yearEls.forEach(el => {
        el.textContent = new Date().getFullYear();
    });


    const typingTarget = document.getElementById('typing-tech');
    if (typingTarget) {
        const techs = ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Git'];
        let techIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const type = () => {
            const current = techs[techIndex];
            if (!deleting) {
                typingTarget.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(type, 1200);
                    return;
                }
            } else {
                typingTarget.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    deleting = false;
                    techIndex = (techIndex + 1) % techs.length;
                }
            }
            setTimeout(type, deleting ? 60 : 100);
        };

        type();
    }

});


const animStyle = document.createElement('style');
animStyle.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animStyle);
