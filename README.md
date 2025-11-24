# OWNSTAR WEB

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Shopify](https://img.shields.io/badge/Shopify-Headless-95BF47?style=for-the-badge&logo=shopify)](https://shopify.dev/docs/api/storefront)

Web oficial de **OWNSTAR**, una marca de streetwear moderna centrada en la exclusividad y la narrativa a través de "Drops". Construida con una arquitectura **Headless** utilizando Next.js y Shopify.

## 🚀 Tecnologías

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
*   **Backend / E-commerce:** [Shopify Admin API](https://shopify.dev/docs/api/admin-rest) (Headless)
*   **Iconos:** [Lucide React](https://lucide.dev/)
*   **Fuentes:** Geist Sans (Next.js) & Code Next (Custom)

## ✨ Características Principales

*   **Diseño Minimalista & Premium:** Estética limpia inspirada en marcas de moda de alta gama.
*   **Efectos de Scroll & Parallax:** Hero section fija con efecto "cortina" al deslizar hacia los productos.
*   **Integración con Shopify:**
    *   Sincronización en tiempo real de productos y precios.
    *   Carga dinámica de colecciones ("Drops") en el menú.
*   **Header Dinámico:** Barra de navegación transparente que se adapta al scroll y al hover.
*   **Página "Sobre Nosotros" Editorial:** Layout moderno tipo revista para contar la historia de la marca.

## 🛠️ Configuración Local

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Lucaalonso1/ownstar_web.git
    cd ownstar_web
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**

    Crea un archivo `.env.local` en la raíz del proyecto y añade tus claves de Shopify:

    ```env
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=tutienda.myshopify.com
    NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_tu_token_de_acceso
    ```

    > *Nota: Se utiliza la Admin API para obtener productos y colecciones sin necesidad de la Storefront API pública.*

4.  **Ejecutar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

*   `/app`: Rutas y páginas principales (App Router).
*   `/components`: Componentes reutilizables (Header, Hero, ProductGrid...).
*   `/lib`: Utilidades y configuración del cliente de Shopify.
*   `/public`: Activos estáticos (imágenes, fuentes, logos).

## 🤝 Contribuir

1.  Haz un Fork del proyecto.
2.  Crea tu rama de funcionalidad (`git checkout -b feature/AmazingFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

---

**OWNSTAR** — *More than just a brand.*
