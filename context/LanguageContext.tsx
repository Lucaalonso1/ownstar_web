"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "es" | "en";

const translations = {
  es: {
    header: {
      shop: "Tienda",
      collections: "Colecciones",
      clothing: "Ropa",
      t_shirts: "Camisetas",
      hoodies: "Sudaderas",
      view_all: "Ver Todo",
      about: "Sobre Nosotros",
      account: "Mi Cuenta",
      contact: "Contacto",
      home: "Inicio",
      menu: "Menu",
    },
    hero: {
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
      subscribe: "Suscribirse",
      email_placeholder: "DIRECCIÓN DE EMAIL",
      early_access: "Acceso Anticipado + 10% Descuento Extra",
      privacy_policy: "Al suscribirte aceptas nuestra Política de Privacidad.",
    },
    footer: {
      explore: "Explorar",
      help: "Ayuda",
      newsletter: "Newsletter",
      newsletter_desc: "Suscríbete para recibir acceso anticipado a nuevos lanzamientos.",
      subscribe_btn: "Suscribirse →",
      rights: "Todos los derechos reservados.",
      faq: "Preguntas Frecuentes",
      shipping: "Envíos y Devoluciones",
      terms: "Términos y Condiciones",
      contact: "Contacto",
    },
    product: {
      new_in: "New In", // Often kept in English in streetwear
      sold_out: "Sold Out", // Often kept in English
      sold_out_es: "Agotado",
      add_to_cart: "Añadir al Carrito",
      select_option: "Seleccionar Opción",
      one_size: "Talla Única",
      worldwide_shipping: "Envío Mundial",
    },
    cart: {
      title: "Tu Cesta",
      empty: "Tu cesta está vacía",
      total: "Total Estimado",
      checkout: "Tramitar Pedido",
      taxes: "Impuestos incluidos. Envío calculado en el checkout.",
      remove: "Eliminar",
    },
    shop: {
      filter: "Filtrar",
      sort: "Ordenar",
      products: "Productos",
      no_products: "No se encontraron productos",
      filters: {
        all: "Todos",
        available: "Disponibles",
        new: "Nuevos",
      },
      sorting: {
        relevance: "Relevancia",
        newest: "Lo más nuevo",
        price_asc: "Precio: Bajo a Alto",
        price_desc: "Precio: Alto a Bajo",
      },
    },
    auth: {
      login: "Iniciar Sesión",
      register: "Registrarse",
      name: "Nombre",
      surname: "Apellido",
      email: "Email",
      password: "Contraseña",
      forgot_password: "¿Olvidaste tu contraseña?",
      submit_login: "Entrar",
      submit_register: "Crear Cuenta",
      login_desc: "Al iniciar sesión, accedes a tu historial de pedidos y detalles de envío.",
      register_desc: "Regístrate para obtener acceso anticipado a lanzamientos y gestionar tus pedidos.",
    },
  },
  en: {
    header: {
      shop: "Shop",
      collections: "Collections",
      clothing: "Clothing",
      t_shirts: "T-Shirts",
      hoodies: "Hoodies",
      view_all: "View All",
      about: "About Us",
      account: "My Account",
      contact: "Contact",
      home: "Home",
      menu: "Menu",
    },
    hero: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      subscribe: "Subscribe",
      email_placeholder: "EMAIL ADDRESS",
      early_access: "Early Access + Extra 10% Off",
      privacy_policy: "By subscribing you agree to our Privacy Policy.",
    },
    footer: {
      explore: "Explore",
      help: "Help",
      newsletter: "Newsletter",
      newsletter_desc: "Subscribe to get early access to new drops.",
      subscribe_btn: "Subscribe →",
      rights: "All rights reserved.",
      faq: "FAQ",
      shipping: "Shipping & Returns",
      terms: "Terms & Conditions",
      contact: "Contact",
    },
    product: {
      new_in: "New In",
      sold_out: "Sold Out",
      sold_out_es: "Sold Out",
      add_to_cart: "Add to Cart",
      select_option: "Select Option",
      one_size: "One Size",
      worldwide_shipping: "Worldwide Shipping",
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      total: "Estimated Total",
      checkout: "Checkout",
      taxes: "Taxes included. Shipping calculated at checkout.",
      remove: "Remove",
    },
    shop: {
      filter: "Filter",
      sort: "Sort",
      products: "Products",
      no_products: "No products found",
      filters: {
        all: "All",
        available: "Available",
        new: "New",
      },
      sorting: {
        relevance: "Relevance",
        newest: "Newest",
        price_asc: "Price: Low to High",
        price_desc: "Price: High to Low",
      },
    },
    auth: {
      login: "Log In",
      register: "Sign Up",
      name: "First Name",
      surname: "Last Name",
      email: "Email",
      password: "Password",
      forgot_password: "Forgot password?",
      submit_login: "Log In",
      submit_register: "Create Account",
      login_desc: "Sign in to access your order history and shipping details.",
      register_desc: "Sign up for early access to drops and to manage your orders.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

