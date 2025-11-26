name: "PRD - Plataforma de Pagos para Fernanda Sarro"
description: |
  Un PRD completo para guiar el desarrollo de una plataforma de pagos web personalizada, integrando Firebase, Mercado Pago y transferencias bancarias, con un panel de administración y notificaciones por correo.

## Purpose
Este documento sirve como la única fuente de verdad para el desarrollo de la plataforma de pagos de Fernanda Sarro. Está diseñado para que un agente de IA lo ejecute, proporcionando todo el contexto necesario para una implementación exitosa y con autovalidación.

## Core Principles
1.  **Context is King**: Toda la información necesaria está incluida.
2.  **Validation Loops**: Se proporcionan comandos ejecutables para que el agente de IA pueda verificar su propio trabajo.
3.  **Progressive Success**: El plan está estructurado en fases lógicas y progresivas.
4.  **Global Rules**: Se deben seguir todas las reglas definidas en `CLAUDE.md`.

---

## Goal
Construir una plataforma web robusta y fácil de usar para que Fernanda Sarro, nutricionista, pueda recibir pagos por sus servicios. La plataforma debe manejar múltiples divisas, integrar Mercado Pago, Paypal y transferencias bancarias, y permitir a Fernanda gestionar las órdenes y la comunicación con sus clientes de manera eficiente.

## Why
-   **Para los consultantes:** Ofrecer un proceso de pago claro, seguro y centralizado que reduce la fricción y mejora la experiencia del usuario.
-   **Para Fernanda:** Automatizar y simplificar la gestión de pagos, reducir la comunicación manual, y tener un control total sobre las órdenes y los ingresos.
-   **Valor de negocio:** Crear un canal de ventas escalable que pueda crecer junto con el negocio de Fernanda, permitiendo la adición de nuevos servicios y la expansión a nuevos mercados.

## What
Una aplicación web responsive (mobile-first) construida con Next.js, TypeScript, TailwindCSS y Firebase. La aplicación permitirá a los usuarios ver los servicios, pagar a través de Mercado Pago, Paypal o transferencia bancaria, y recibir confirmaciones. Fernanda tendrá un panel de administración para gestionar las órdenes y enviar correos.

### Success Criteria
-   [ ] Los usuarios pueden iniciar sesión con su cuenta de Google.
-   [ ] Los usuarios de Argentina pueden pagar a través de un enlace de Mercado Pago.(ARS)
-   [ ] Los usuarios de Europa o USA pueden pagar a través de un enlace de Pay.Pal.(USD, EUR)
-   [ ] Los usuarios de Mexico  y recibir los datos para una transferencia bancaria.(MXR)
-   [ ] Fernanda puede ver, filtrar y actualizar el estado de todas las órdenes en un panel de administración.
-   [ ] Se envía un correo de confirmación automático cuando una orden se marca como "pagada".
-   [ ] Un formulario de contacto permite a los visitantes enviar mensajes a Fernanda a través de Resend.


## All Needed Context

### Documentation & References
```yaml
# MUST READ
- url: https://firebase.google.com/docs/auth/web/google-signin
  why: Para implementar la autenticación con Google.
- url: https://firebase.google.com/docs/firestore/quickstart
  why: Para entender cómo estructurar y gestionar los datos en Firestore.
- url: https://tailwindcss.com/docs
  why: Referencia para las clases de utilidad y configuración de TailwindCSS.
- url: https://nextjs.org/docs
  why: Documentación oficial de Next.js para entender su estructura y características.
- url: https://www.mercadopago.com.ar/developers/es/docs
  why: Para entender cómo generar y gestionar los links de pago de Mercado Pago.
- url: https://resend.com/docs/introduction
  why: Para integrar el envío de correos transaccionales.
- file: examples/web.png
  why: Diseño visual de referencia para la página principal y los componentes.
```

### Desired Codebase tree with files to be added and responsibility of file
```bash
fernanda-sarro-plataforma/
├── src/
│   ├── app/
│   │   ├── (admin)/
│   │   │   └── dashboard/
│   │   │       └── page.tsx      # Panel de administración para Fernanda
│   │   ├── pago-exitoso/
│   │   │   └── page.tsx          # Página de confirmación de pago exitoso
│   │   ├── pago-fallido/
│   │   │   └── page.tsx          # Página de error en el pago
│   │   ├── pago-pendiente/
│   │   │   └── page.tsx          # Página de pago pendiente
│   │   ├── layout.tsx            # Layout principal de la aplicación
│   │   └── page.tsx              # Página de inicio
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthButton.tsx    # Botón de inicio/cierre de sesión
│   │   ├── common/
│   │   │   ├── Button.tsx        # Componente de botón reutilizable
│   │   │   ├── Card.tsx          # Componente de tarjeta para servicios
│   │   │   └── Modal.tsx         # Componente de modal para pop-ups
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Cabecera de la aplicación
│   │   │   └── Footer.tsx        # Pie de página de la aplicación
│   │   └── payments/
│   │       ├── MercadoPagoButton.tsx # Botón específico para Mercado 
            ├── PaypalPagoButton.tsx # Botón específico para Paypal 
Pago
│   │       └── TransferForm.tsx      # Formulario para transferencias
│   ├── context/
│   │   ├── AuthContext.tsx       # Contexto para gestionar la autenticación
│   │   └── CurrencyContext.tsx   # Contexto para gestionar la moneda seleccionada
│   └── lib/
│       └── firebase.ts           # Configuración e inicialización de Firebase
└── package.json
```

```

## Implementation Blueprint

### list of tasks to be completed to fullfill the PRP in the order they should be completed
```yaml
Task 1: Project Scaffolding & Initial Setup [COMPLETED]
  - Initialize Next.js project with TypeScript and TailwindCSS.
  - Configure Firebase SDK.
  - Install dependencies: `firebase`, `framer-motion`.

Task 2: UI/UX - Core Components & Layout [COMPLETED]
  - Create Header and Footer components based on `web.png`.
  - Integrate Header and Footer into the main layout.
  - Create reusable Button, Card, Modal, and InputField components.
  - Build the static home page, services page, contact page, and dashboard mockup.
  - Change background color to #f2e7df.
  - Change fonts to Rubik and Alegreya.
  - Add FAQ and Target Audience modals to services.
  - Add Accordion component for service details.

Task 3: Authentication & User Management [COMPLETED]
  - Implement Google Sign-In using Firebase Auth.
  - Create an AuthContext to manage user state, including a global login modal.
  - Refactor the authentication UI into a dedicated `AuthButton` component.
  - Implement a client-side layout to prevent hydration errors.
  - Connect payment buttons to the authentication flow, prompting users to log in before proceeding.
  - Display user status and login/logout buttons in the Header.
  - Implement logic to identify the admin user.

Task 4: Payment Flows
  - Create the dynamic payment UI, including currency selection and payment buttons. [COMPLETED]
  - Implement global currency state management using React Context. [COMPLETED]
  - Create the UI for Mercado Pago checkouts. [COMPLETED]
  - Create the UI for Paypal checkouts. [COMPLETED]
  - Develop the UI for the bank transfer flow. [COMPLETED]
  - Implement the logic to create "order" documents in Firestore. [COMPLETED]

Task 5: Admin Dashboard - Order Management [COMPLETED]
  - Create a protected admin route and dashboard page.
  - Display and filter orders from Firestore.
  - Implement actions to update order status.

Task 6: Communication - Emails & Contact Form [COMPLETED]
  - Integrate the Resend API. [COMPLETED]
  - Implement automated email triggers. [COMPLETED]
  - Build the contact form and connect it to Resend. [COMPLETED]
```

