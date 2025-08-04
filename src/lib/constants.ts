import { Service } from '@/types';

export const currencies = [
  {
    code: 'ARG',
    name: 'Pesos Argentinos',
    flag: '/arg-flag.png',
  },
  {
    code: 'USD',
    name: 'Dólares Estadounidenses',
    flag: '/usa-flag.png',
  },
  {
    code: 'EUR',
    name: 'Euros',
    flag: '/euro-flag.png',
  },
  {
    code: 'MEX',
    name: 'Pesos Mexicanos',
    flag: '/mex-flag.png',
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Workshop de Inteligencia Gastrointestinal',
    features: [
      'Plan Intensivo',
      'Duración 2 días',
      'Seguimiento y soporte vía WhatsApp',
    ],
    prices: [
      {
        currency: 'ARG',
        amount: 200000,
        paymentMethods: [
          {
            name: 'Mercado Pago',
            icon: '/arg-flag.png', 
          },
        ],
      },
      {
        currency: 'USD',
        amount: 200,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/usa-flag.png',
          },
        ],
      },
      {
        currency: 'EUR',
        amount: 130,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/euro-flag.png',
          },
        ],
      },
      {
        currency: 'MEX',
        amount: 110000,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/mex-flag.png',
          },
        ],
      },
    ],
    image: '/placeholder-consulta.jpg',
    description:
      '¿Sabías que tu intestino es la raíz de tu energía, emociones y equilibrio hormonal? En este workshop de 2 días aprenderás a entender la conexión intestino-cerebro y a modular tu microbiota con alimentación antiinflamatoria, técnicas de regulación nerviosa, plan de alimentación 5 días y recetario super delicioso.. Es un espacio práctico, profundo y transformador para reconectar con tu salud digestiva.',
  },
  {
    id: '2',
    title: 'Detox Grupal',
    features: [
        'Duración 28 días',
        'Plan nutricional 100% personalizado',
        'Clases grabadas y material didactico',
    ],
    prices: [
      {
        currency: 'ARG',
        amount: 150000,
        paymentMethods: [
          {
            name: 'Mercado Pago',
            icon: '/arg-flag.png',
          },
        ],
      },
      {
        currency: 'EUR',
        amount: 130,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/euro-flag.png',
          },
        ],
      },
      {
        currency: 'MEX',
        amount: 110000,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/mex-flag.png',
          },
        ],
      },
      {
        currency: 'USD',
        amount: 150,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/usa-flag.png',
          },
        ],
      },
    ],
    image: '/placeholder-consulta.jpg',
    description:
      'Un proceso profundo de 28 días para depurar tu cuerpo y modular tu microbiota acompañado de un grupo que vive el mismo camino. Incluye alimentación antiinflamatoria, desparasitación guiada, eliminación de metales pesados, limpieza renal, suplementación, clases grabadas y material necesario para ir paso a paso. Prácticas somáticas, y soporte emocional. Te sostendrás con una comunidad que te motiva día a día. Perfecta si buscas transformación, acompañamiento y energía compartida.',
  },
  {
    id: '3',
    title: 'Detox Individual',
    features: [
        'Duración 2 meses',
        'Plan nutricional 100% personalizado',
        'Pack de medicinas para personas en Mexico',
    ],
    prices: [
      {
        currency: 'ARG',
        amount: 180000,
        paymentMethods: [
          {
            name: 'Mercado Pago',
            icon: '/arg-flag.png',
          },
        ],
      },
      {
        currency: 'USD',
        amount: 180,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/usa-flag.png',
          },
        ],
      },
      {
        currency: 'EUR',
        amount: 130,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/euro-flag.png',
          },
        ],
      },
      {
        currency: 'MEX',
        amount: 110000,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/mex-flag.png',
          },
        ],
      },
    ],
    image: '/placeholder-consulta.jpg',
    description:
      'Un programa 100 % personalizado 1 a 1 conmigo, para limpiar tu organismo, equilibrar tu intestino y desinflamar desde adentro. Adaptado a tus síntomas, hábitos y ritmo de vida, con seguimiento cercano para ajustar cada etapa según tu progreso. Ideal si quieres privacidad, protocolos específicos y atención enfocada solo en ti. Incluye recetarios, suplementos sugeridos y prácticas integrativas y corporales, para una depuración profunda y consciente. Para personas que se encuentren en Mexico: Incluye Pack de medicinas para llevar al cabo tu misión: 1 gotero Microdosis Detox, 2 goteros desparasitantes, 1 gotero para eliminar metales pesados, 1 gotero de hongos adaptógenos.',
  },
];
