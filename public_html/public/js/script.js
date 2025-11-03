document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navMenu = document.querySelector('.nav-menu'); // The <ul> in the header
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenuEl = document.getElementById('nav-menu');

    // Mobile menu toggle
    if (mobileMenuToggle && navMenuEl) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenuEl.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navMenuEl.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                mobileMenuToggle.classList.remove('active');
                navMenuEl.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenuEl.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenuEl.classList.remove('active');
            }
        });
    }

    function setActiveLink(page) {
        // Clear active class from all nav links in the header
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the matching nav link in the header
        const activeLink = navMenu.querySelector(`.nav-link[href='#${page}']`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    function loadContent(page) {
        // Optimizar transición
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            const filePath = `src/pages/${page}.html`;
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Página no encontrada');
                    }
                    return response.text();
                })
                .then(data => {
                    mainContent.innerHTML = data;
                    // Animate in
                    requestAnimationFrame(() => {
                        mainContent.style.opacity = '1';
                        mainContent.style.transform = 'translateY(0)';
                    });
                })
                .catch(error => {
                    mainContent.innerHTML = `<h1>Error</h1><p>Contenido no encontrado. Mostrando página de inicio.</p>`;
                    mainContent.style.opacity = '1';
                    mainContent.style.transform = 'translateY(0)';
                    console.error('Error al cargar la página:', error);
                    if (page !== 'inicio') {
                        loadContent('inicio');
                        setActiveLink('inicio');
                    }
                });
        }, 200); // Transición más rápida
    }

    // Use event delegation on the whole document body
    document.body.addEventListener('click', function(event) {
        // Check if the clicked element is a .nav-link
        const link = event.target.closest('.nav-link');
        
        if (link) {
            event.preventDefault();
            const page = link.getAttribute('href').substring(1);
            
            if(page) { // Ensure the link is not empty
                loadContent(page);
                setActiveLink(page);
            }
        }
    });

    // Initial load
    const initialPage = location.hash.substring(1) || 'inicio';
    loadContent(initialPage);
    setActiveLink(initialPage);

    // Manejo del formulario de contacto con Formspree
    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const status = document.getElementById('form-status');
        const data = new FormData(event.target);
        
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "¡Gracias por tu mensaje! Te responderemos pronto.";
                status.style.color = "var(--primary-color)";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
                    }
                    status.style.color = "red";
                })
            }
        }).catch(error => {
            status.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
            status.style.color = "red";
        });
    }

    // Adjuntar el listener al formulario cuando se carga la página de contacto
    // Usamos un observador para detectar cuando el formulario está en el DOM
    const observer = new MutationObserver((mutations_list, observer) => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
            // Una vez encontrado y adjuntado, no necesitamos seguir observando
            // observer.disconnect(); 
            // No lo desconectamos para que funcione si navega fuera y vuelve
        }
    });

    observer.observe(document.getElementById('main-content'), { childList: true, subtree: true });
});
