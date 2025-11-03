/**
 * Productes Tradicionals Olcina López
 * Main JavaScript Module
 *
 * Este módulo maneja:
 * - Navegación SPA (Single Page Application)
 * - Menú móvil responsive
 * - Carga dinámica de contenido
 * - Formulario de contacto
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURACIÓN Y CONSTANTES
    // ==========================================
    const CONFIG = {
        TRANSITION_DURATION: 250,
        PAGES_PATH: 'src/pages',
        DEFAULT_PAGE: 'inicio'
    };

    // ==========================================
    // ELEMENTOS DEL DOM
    // ==========================================
    const DOM = {
        mainContent: null,
        navMenu: null,
        mobileMenuToggle: null,
        navMenuEl: null
    };

    // ==========================================
    // ESTADO DE LA APLICACIÓN
    // ==========================================
    const state = {
        currentPage: '',
        isLoading: false,
        contactFormObserver: null
    };

    // ==========================================
    // UTILIDADES
    // ==========================================
    const utils = {
        /**
         * Debounce function para optimizar eventos
         */
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Validar nombre de página
         */
        isValidPage(page) {
            return page && typeof page === 'string' && page.trim().length > 0;
        },

        /**
         * Extraer nombre de página de un hash o href
         */
        extractPageName(href) {
            if (!href) return null;
            const match = href.match(/#(.+)/);
            return match ? match[1] : null;
        }
    };

    // ==========================================
    // GESTIÓN DEL MENÚ MÓVIL
    // ==========================================
    const mobileMenu = {
        /**
         * Inicializar menú móvil
         */
        init() {
            if (!DOM.mobileMenuToggle || !DOM.navMenuEl) return;

            // Toggle del menú
            DOM.mobileMenuToggle.addEventListener('click', this.toggle.bind(this));

            // Cerrar menú al hacer clic en un enlace
            DOM.navMenuEl.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    this.close();
                }
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (this.isOpen() &&
                    !DOM.mobileMenuToggle.contains(e.target) &&
                    !DOM.navMenuEl.contains(e.target)) {
                    this.close();
                }
            });

            // Cerrar menú con tecla Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen()) {
                    this.close();
                }
            });
        },

        /**
         * Toggle del menú
         */
        toggle() {
            if (this.isOpen()) {
                this.close();
            } else {
                this.open();
            }
        },

        /**
         * Abrir menú
         */
        open() {
            DOM.mobileMenuToggle.classList.add('active');
            DOM.navMenuEl.classList.add('active');
            DOM.mobileMenuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevenir scroll mientras el menú está abierto
        },

        /**
         * Cerrar menú
         */
        close() {
            DOM.mobileMenuToggle.classList.remove('active');
            DOM.navMenuEl.classList.remove('active');
            DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        },

        /**
         * Verificar si el menú está abierto
         */
        isOpen() {
            return DOM.navMenuEl.classList.contains('active');
        }
    };

    // ==========================================
    // GESTIÓN DE NAVEGACIÓN
    // ==========================================
    const navigation = {
        /**
         * Establecer enlace activo en la navegación
         */
        setActiveLink(page) {
            if (!DOM.navMenu) return;

            // Limpiar clase active de todos los enlaces
            DOM.navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // Agregar clase active al enlace correspondiente
            const activeLink = DOM.navMenu.querySelector(`.nav-link[href='#${page}']`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', 'page');
            }
        },

        /**
         * Cargar contenido de una página
         */
        async loadContent(page) {
            // Validar página
            if (!utils.isValidPage(page)) {
                console.error('Nombre de página inválido:', page);
                return;
            }

            // Prevenir cargas múltiples
            if (state.isLoading) {
                console.log('Ya hay una carga en progreso');
                return;
            }

            // Si es la misma página, no hacer nada
            if (state.currentPage === page) {
                return;
            }

            state.isLoading = true;

            try {
                // Animación de salida
                DOM.mainContent.style.opacity = '0';
                DOM.mainContent.style.transform = 'translateY(10px)';

                // Esperar a que termine la transición
                await new Promise(resolve =>
                    setTimeout(resolve, CONFIG.TRANSITION_DURATION)
                );

                // Cargar contenido
                const filePath = `${CONFIG.PAGES_PATH}/${page}.html`;
                const response = await fetch(filePath);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const html = await response.text();

                // Insertar contenido
                DOM.mainContent.innerHTML = html;

                // Actualizar estado
                state.currentPage = page;

                // Scroll to top suave
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Animación de entrada usando requestAnimationFrame para mejor rendimiento
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        DOM.mainContent.style.opacity = '1';
                        DOM.mainContent.style.transform = 'translateY(0)';
                    });
                });

                // Actualizar URL sin recargar
                if (window.history && window.history.pushState) {
                    window.history.pushState({ page }, '', `#${page}`);
                }

            } catch (error) {
                console.error('Error al cargar la página:', error);

                // Mostrar página de error
                DOM.mainContent.innerHTML = `
                    <section style="padding: 5rem 3rem; text-align: center;">
                        <h1>Error</h1>
                        <p>No se pudo cargar el contenido. Por favor, intenta de nuevo.</p>
                        <button class="btn btn-primary nav-link" onclick="location.hash='inicio'">
                            Volver al Inicio
                        </button>
                    </section>
                `;

                // Animación de entrada del error
                requestAnimationFrame(() => {
                    DOM.mainContent.style.opacity = '1';
                    DOM.mainContent.style.transform = 'translateY(0)';
                });

                // Si hay error, intentar cargar página de inicio
                if (page !== CONFIG.DEFAULT_PAGE) {
                    setTimeout(() => {
                        this.loadContent(CONFIG.DEFAULT_PAGE);
                        this.setActiveLink(CONFIG.DEFAULT_PAGE);
                    }, 2000);
                }
            } finally {
                state.isLoading = false;
            }
        },

        /**
         * Manejar clic en enlaces de navegación
         */
        handleLinkClick(event) {
            // Buscar el enlace más cercano
            const link = event.target.closest('.nav-link');

            if (!link) return;

            // Prevenir comportamiento por defecto
            event.preventDefault();

            // Extraer nombre de página
            const page = utils.extractPageName(link.getAttribute('href'));

            if (page && utils.isValidPage(page)) {
                this.loadContent(page);
                this.setActiveLink(page);
            }
        },

        /**
         * Inicializar navegación
         */
        init() {
            // Event delegation en el document body para manejar todos los clicks en nav-links
            document.body.addEventListener('click', this.handleLinkClick.bind(this));

            // Manejar botón atrás/adelante del navegador
            window.addEventListener('popstate', (event) => {
                const page = event.state?.page || utils.extractPageName(location.hash) || CONFIG.DEFAULT_PAGE;
                this.loadContent(page);
                this.setActiveLink(page);
            });

            // Cargar página inicial
            const initialPage = utils.extractPageName(location.hash) || CONFIG.DEFAULT_PAGE;
            this.loadContent(initialPage);
            this.setActiveLink(initialPage);
        }
    };

    // ==========================================
    // GESTIÓN DEL FORMULARIO DE CONTACTO
    // ==========================================
    const contactForm = {
        /**
         * Manejar envío del formulario
         */
        async handleSubmit(event) {
            event.preventDefault();

            const form = event.target;
            const status = document.getElementById('form-status');
            const submitButton = form.querySelector('button[type="submit"]');

            if (!status) return;

            // Deshabilitar botón durante el envío
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }

            // Preparar datos
            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Éxito
                    status.innerHTML = '✓ ¡Gracias por tu mensaje! Te responderemos pronto.';
                    status.style.color = 'var(--primary-color)';
                    form.reset();
                } else {
                    // Error del servidor
                    const data = await response.json();
                    if (data.errors) {
                        status.innerHTML = '✗ ' + data.errors.map(error => error.message).join(', ');
                    } else {
                        status.innerHTML = '✗ Oops! Hubo un problema al enviar tu formulario.';
                    }
                    status.style.color = '#d32f2f';
                }
            } catch (error) {
                // Error de red
                console.error('Error al enviar formulario:', error);
                status.innerHTML = '✗ Error de conexión. Por favor, verifica tu conexión a internet.';
                status.style.color = '#d32f2f';
            } finally {
                // Rehabilitar botón
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar Mensaje';
                }
            }
        },

        /**
         * Inicializar observador del formulario
         */
        initObserver() {
            // Desconectar observador previo si existe
            if (state.contactFormObserver) {
                state.contactFormObserver.disconnect();
            }

            // Crear nuevo observador
            state.contactFormObserver = new MutationObserver(() => {
                const contactFormEl = document.getElementById('contact-form');
                if (contactFormEl) {
                    // Eliminar listener previo si existe
                    contactFormEl.removeEventListener('submit', this.handleSubmit);
                    // Agregar nuevo listener
                    contactFormEl.addEventListener('submit', this.handleSubmit.bind(this));
                }
            });

            // Observar cambios en el contenido principal
            state.contactFormObserver.observe(DOM.mainContent, {
                childList: true,
                subtree: true
            });
        }
    };

    // ==========================================
    // INICIALIZACIÓN DE LA APLICACIÓN
    // ==========================================
    function init() {
        // Cachear referencias a elementos del DOM
        DOM.mainContent = document.getElementById('main-content');
        DOM.navMenu = document.querySelector('.nav-menu');
        DOM.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        DOM.navMenuEl = document.getElementById('nav-menu');

        // Verificar elementos requeridos
        if (!DOM.mainContent) {
            console.error('Elemento main-content no encontrado');
            return;
        }

        // Inicializar módulos
        mobileMenu.init();
        navigation.init();
        contactForm.initObserver();

        // Optimizar rendimiento: remover atributo will-change después de la carga
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelectorAll('[style*="will-change"]').forEach(el => {
                    el.style.willChange = 'auto';
                });
            }, 1000);
        });

        // Log de inicialización (solo en desarrollo)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('✓ Aplicación inicializada correctamente');
        }
    }

    // ==========================================
    // INICIO DE LA APLICACIÓN
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exponer funciones públicas si es necesario (para debugging en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.PTOL = {
            navigation,
            mobileMenu,
            state
        };
    }

})();
