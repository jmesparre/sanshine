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
    title: 'Taller de Inteligencia Gastro Intestinal',
    features: [
      'Plan Intensivo',
      'Duración 2 días Intensivos',
      '5 Días de Acompañamiento vía WhatsApp',
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
    title: 'Detox Solar Grupal',
    features: [
        'Duración 28 días',
        'Medicinas Kit de 4 Goteros (Especial México)',
        'Plan de alimentación antiinflamatorio',
        'Prácticas somáticas',
        'Recetario Delicioso',
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
        amount: 240,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/euro-flag.png',
          },
        ],
      },
      {
        currency: 'MEX',
        amount: 4500,
        paymentMethods: [
          {
            name: 'Transferencia Bancaria',
            icon: '/mex-flag.png',
          },
        ],
      },
      {
        currency: 'USD',
        amount: 240,
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
      'Un proceso profundo de 28 días para depurar tu cuerpo, desparasitar y modular tu microbiota acompañado de un grupo que vive el mismo camino. Incluye alimentación antiinflamatoria y deliciosa, desparasitación y modulación de microbiota intestinal, eliminación de metales pesados, limpieza renal, suplementación, clases grabadas y material necesario para ir paso a paso. Prácticas somáticas y soporte emocional. Te sostendrás con una comunidad que te motiva día a día. Perfecta si buscas transformación, acompañamiento y energía compartida. Una vez hagas el pago te mandaremos un cuestionario para saber sobre tu estado de salud y el domicilio si estas en mexico para enviarte las medicinas.',
    targetAudience: 'Este programa es para ti si buscas una transformación profunda y te sientes motivado por el acompañamiento y la energía de un grupo. Es ideal si quieres sanar tu microbiota, desintoxicar tu cuerpo y aprender a alimentarte de forma consciente y deliciosa.',
    faq: '¿Qué incluye el kit de medicinas? El kit incluye 4 goteros con fórmulas herbales personalizadas para la desparasitación, modulación de la microbiota, limpieza renal y eliminación de metales pesados. ¿Necesito experiencia previa? No, el programa está diseñado para guiarte paso a paso, sin importar tu nivel de conocimiento previo. ¿Qué pasa si tengo restricciones alimentarias? El plan de alimentación es adaptable a diversas necesidades y restricciones. Lo conversaremos en detalle al inicio del programa.',
  },
  {
    id: '3',
    title: 'Detox Solar Individual',
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
      'Respetamos el ritmo biológico de cada ser. Un programa 100 % personalizado 1 a 1 conmigo, para limpiar tu organismo, equilibrar tu intestino y desinflamar desde adentro. Adaptado a tus síntomas, hábitos y ritmo de vida, con seguimiento cercano para ajustar cada etapa según tu progreso. Ideal si quieres privacidad, protocolos específicos y atención enfocada solo en ti. Incluye recetarios, suplementación personalizada, clases grabadas informativas, y prácticas integrativas y corporales, para una depuración profunda y consciente.',
    targetAudience: 'Este programa es ideal para ti si prefieres un acompañamiento 100% personalizado y enfocado en tus necesidades específicas. Si valoras la privacidad y buscas un protocolo diseñado exclusivamente para ti, este es tu camino. Perfecto para quienes tienen condiciones de salud particulares o simplemente desean una atención completamente individualizada.',
    faq: '¿Cómo es el seguimiento? El seguimiento es cercano y constante a través de WhatsApp, donde puedes resolver dudas y ajustar el plan según tu progreso. ¿Las medicinas están incluidas? Para personas en México, el pack de medicinas está incluido. Para otros países, te guiaré para que puedas conseguir los suplementos necesarios. ¿Cuánto tiempo dura el programa? El programa tiene una duración de 2 meses, divididos en 4 etapas clave para una transformación profunda y sostenible.',
    accordionItems: [
      {
        title: 'Anamensis nutricional',
        content: 'Iniciamos el camino con un escaneo corporal para conocernos y conocer sobre tu historia y propósito, gustos, hábitos, historia clínica, y objetivos del plan. En esta etapa es sembrar las bases sobre las que construiremos el mejor plan para vos.',
      },
      {
        title: 'Plan personalizado',
        content: 'Entrega de plan de alimentación personalizado para construir una alimentación y nutrición ordenada, deliciosa y óptima. Con el fin de reducir síntomas y mejorar tu calidad de vida. Plan de nutrición: selección de alimentos, ideas, recetas, hierbas y suplementación.',
      },
      {
        title: 'Limpieza profunda',
        content: 'Desparasitacion, modulacion de microbiota intestinal eliminación de metales pesados, y limpieza renal e intestinal siempre en amabilidad y escuchando lo que tu cuerpo nos comunica esto puede cambiar según tus necesidades y escucha.',
      },
      {
        title: 'Regeneración',
        content: 'Continuidad en el tiempo, es un cierre abriente donde podemos combinar tu alimentación y nutrición a gustos y preferencias para poder sostenerlo en el tiempo y puedas tomar las mejores decisiones para construir salud. Suplementación para la regeneración.',
      },
    ],
  },
];
