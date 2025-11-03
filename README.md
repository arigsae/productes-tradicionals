# Productes Tradicionals Olcina López

**El arte de lo local en cada detalle**

![Version](https://img.shields.io/badge/version-2.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Descripción

Sitio web profesional para **Productes Tradicionals Olcina López**, una empresa dedicada a la venta de productos tradicionales artesanales de máxima calidad. Nuestro catálogo incluye:

- 🍯 **Miel Artesanal** - De diferentes floraciones
- ☕ **Café Premium** - Selección de cafés de alta calidad
- 🥔 **Papes Tradicionales** - Cultivadas de forma natural
- 🍪 **Coquetes y Rosquilletes** - Elaboradas artesanalmente

---

## ✨ Características

### 🎨 Diseño Profesional
- **Interfaz moderna y elegante** con diseño responsive
- **Optimización móvil completa** - Funciona perfectamente en todos los dispositivos
- **Animaciones suaves** con hardware acceleration
- **Paleta de colores tradicional** que refleja la identidad de la marca

### 🚀 Tecnología
- **SPA (Single Page Application)** con navegación instantánea
- **JavaScript modular** con mejores prácticas
- **CSS optimizado** con variables CSS y arquitectura profesional
- **SEO optimizado** con meta tags completos
- **Accesibilidad WCAG 2.1** con atributos ARIA

### ⚡ Rendimiento
- **Carga ultrarrápida** - Transiciones optimizadas
- **Hardware acceleration** para animaciones
- **Código limpio y mantenible**
- **Responsive design perfecto** para móviles

---

## 🗂️ Estructura del Proyecto

```
productes-tradicionals/
│
├── index.html                 # Página principal
├── css/
│   └── style.css              # Estilos optimizados
├── js/
│   └── script.js              # JavaScript modular
├── src/
│   └── pages/                 # Páginas de contenido
│       ├── inicio.html
│       ├── catalogo.html
│       ├── nosotros.html
│       ├── contacto.html
│       └── productos/         # Páginas de productos
└── public/
    └── images/                # Imágenes del sitio
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript ES6+** - Lógica de aplicación modular
- **Google Fonts** - Tipografías Lato y Playfair Display

### Herramientas
- **Git** - Control de versiones
- **Formspree** - Formulario de contacto

---

## 📱 Responsive Design

El sitio está completamente optimizado para:

| Dispositivo | Breakpoint | Optimizaciones |
|-------------|------------|----------------|
| **Móvil**   | ≤ 480px    | Menú hamburguesa, layout vertical, touch optimizado |
| **Tablet**  | ≤ 768px    | Grid adaptativo, navegación mejorada |
| **Desktop** | > 768px    | Layout completo, hover effects |

---

## 🎯 Características Destacadas

### Navegación SPA
- Carga de contenido sin recargar la página
- Transiciones suaves entre secciones
- Historial del navegador funcional
- URLs amigables con hash routing

### Catálogo Interactivo
- Bandas horizontales con scroll automático al hover
- Tarjetas de productos con efectos visuales
- Animaciones optimizadas (30s uniformes)
- Enlaces funcionales a todas las páginas de productos

### Formulario de Contacto
- Integración con Formspree
- Validación de campos
- Mensajes de estado claros
- Diseño responsive

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local o hosting

### Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/usuario/productes-tradicionals.git
   cd productes-tradicionals
   ```

2. **Abrir con servidor local**

   Usando Python:
   ```bash
   python -m http.server 8000
   ```

   Usando Node.js (con http-server):
   ```bash
   npx http-server
   ```

3. **Acceder al sitio**
   ```
   http://localhost:8000
   ```

---

## 🎨 Personalización

### Colores
Los colores se definen en variables CSS en `css/style.css`:

```css
:root {
    --bg-color: #FBF8F1;           /* Fondo crema */
    --text-color: #41403E;          /* Texto gris oscuro */
    --primary-color: #3A5F42;       /* Verde principal */
    --secondary-color: #D4A017;     /* Dorado secundario */
    --accent-color: #F0EAD6;        /* Crema acentuado */
}
```

### Tipografías
```css
--heading-font: 'Playfair Display', serif;
--body-font: 'Lato', sans-serif;
```

---

## 📊 Optimizaciones Implementadas

### CSS
- ✅ Variables CSS para mantenimiento fácil
- ✅ Mobile-first approach
- ✅ Flexbox y Grid moderno
- ✅ Animaciones con `will-change` y `transform3d`
- ✅ Media queries para todos los dispositivos
- ✅ Arquitectura modular y comentada

### JavaScript
- ✅ Módulos con IIFE para evitar contaminación global
- ✅ Event delegation para mejor rendimiento
- ✅ Async/await para operaciones asíncronas
- ✅ Manejo de errores robusto
- ✅ Caché de elementos DOM
- ✅ Código documentado y mantenible

### HTML
- ✅ Estructura semántica con HTML5
- ✅ Atributos ARIA para accesibilidad
- ✅ Meta tags SEO completos
- ✅ Open Graph y Twitter Cards
- ✅ Favicon multi-resolución
- ✅ Theme color para navegadores móviles

---

## 📈 SEO

### Meta Tags Implementados
- Title y Description optimizados
- Keywords relevantes
- Open Graph para redes sociales
- Twitter Cards
- Robots meta tag
- Theme color para mejor UX móvil

### Mejores Prácticas
- URLs amigables con hash routing
- Contenido estructurado semánticamente
- Headings jerárquicos (H1-H6)
- Alt text en todas las imágenes
- Performance optimizado

---

## ♿ Accesibilidad

### WCAG 2.1 Nivel AA
- ✅ Roles ARIA apropiados (banner, navigation, main, contentinfo)
- ✅ Labels descriptivos en controles interactivos
- ✅ Contraste de color adecuado
- ✅ Navegación por teclado (Escape para cerrar menú)
- ✅ Textos alternativos descriptivos
- ✅ Estados ARIA (expanded, current, hidden)
- ✅ Menú móvil accesible

---

## 🔄 Changelog

### Version 2.0.0 (2025-01-03)
- 🎨 **Rediseño completo del CSS** - Arquitectura profesional con variables CSS
- ⚡ **JavaScript refactorizado** - Código modular con mejores prácticas
- 📱 **Responsividad perfecta** - Funciona en todos los dispositivos sin problemas
- 🐛 **Corrección de errores críticos** - Enlaces rotos en catálogo arreglados
- 🔍 **SEO profesional** - Meta tags completos + Open Graph + Twitter Cards
- ♿ **Accesibilidad WCAG 2.1** - Atributos ARIA completos
- 🚀 **Velocidades corregidas** - Animaciones uniformes (30s) y transiciones optimizadas (150-350ms)
- 💅 **Efectos visuales mejorados** - Shimmer, hover states, y animaciones suaves
- 🎯 **Menú móvil mejorado** - Hamburguesa con animación y cierre con Escape
- 📝 **Código documentado** - Comentarios y estructura clara

### Version 1.0.0 (2024-12-XX)
- 🎉 Lanzamiento inicial del sitio web

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 📞 Contacto

**Productes Tradicionals Olcina López**

- 📧 Email: [productestradicionals@gmail.com](mailto:productestradicionals@gmail.com)
- 📱 WhatsApp: [+34 622 56 00 44](https://wa.me/34622560044)
- 📷 Instagram: [@productes.tradicionals](https://www.instagram.com/productes.tradicionals)

---

## 🙏 Agradecimientos

Gracias por visitar nuestro repositorio. Si tienes sugerencias o encuentras algún problema, no dudes en contactarnos.

---

<div align="center">
  <strong>"El arte de lo local en cada detalle"</strong>
  <br><br>
  Hecho con ❤️ por Productes Tradicionals Olcina López
</div>
